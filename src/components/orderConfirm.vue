<template lang="html">
	<div class="orderConfirm">
		<div class="title-wrapper">
			<div class="border"></div>
			<div class="title">您的订单</div>
			<div class="border"></div>
		</div>
		<table class="cart" v-show="cartList.length">
			<thead>
				<tr class="cart-head">
					<td>商品信息</td>
					<td>单价</td>
					<td>数量</td>
					<td>金额</td>
				</tr>
			</thead>
			<tbody>
				<tr class="cart-list-item" v-for="(item, index) in cartList">
					<td>
						<img :src="'static/' + item.productImage" width="50" height="50">
						<span>{{item.productName}}</span>
					</td>
					<td>{{item.salePrice | currency('￥')}}</td>
					<td class="count">
						<div class="num"><input type="text" value="0" v-model="item.productNum" disabled></div>
					</td>
					<td>{{item.salePrice * item.productNum | currency('￥')}}</td>
				</tr>
			</tbody>
		</table>
		<div class="pay-wrapper" v-show="cartList.length">
			<div class="total">
				总价：<b>{{totalPrice | currency('￥')}}</b>
			</div>
      <div class="total">
        配送费：<b>{{shipping | currency('￥')}}</b>
      </div>
      <div class="total">
        折扣价：<b>{{discount | currency('￥')}}</b>
      </div>
      <div class="total">
        税：<b>{{tax | currency('￥')}}</b>
      </div>
      <div class="total">
        订单需支付：<b>{{totalPrice + shipping + tax - discount | currency('￥')}}</b>
      </div>
      <md-button class="md-accent" @click="payment()">确认</md-button>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {currency} from './../common/util/currency'
Vue.use(axios)

export default {
	data() {
		return {
			uncheck: false,
			check: true,
			selectId: '',
			cartList: [],
      shipping: 100,
      discount: 200,
      tax: 400
		}
	},
	filters: {
		currency: currency
	},
	mounted() {
		this.initCartList()
	},
	methods: {
    payment() {
      let _this = this
      axios.post('/users/payment', {
				addressId: this.$route.query.addressId,
				orderTotal: _this.totalPrice + _this.shipping + _this.tax - _this.discount
			}).then((res) => {
				if (res.data.status === '0') {
          this.$router.push({
            path: '/payment',
            query: {
              orderId: res.data.result.orderId,
              orderTotal: res.data.result.orderTotal
            }
          })
				}
			})
    },
		address() {
			if (this.checkedCount > 0) {
				this.$router.push({
					path: '/distribution'
				})
			}
		},
		initCartList() {
			axios.get('/users/cart').then((res) => {
				if (res.data.status === '0') {
					this.cartList = res.data.result
				}
			})
		},
		editCart(type, product) {
			if (type === 'add') {
				product.productNum++
			} else if (type === 'minu') {
				if (product.productNum <= 1) {
					return
				}
				product.productNum--
			} else {
				product.checked = product.checked === '1' ? '0' : '1'
			}
			axios.post('/users/cart/edit', {
				productId: product.productId,
				productNum: product.productNum,
				checked: product.checked
			}).then((res) => {
				if (res.data.status === '0') {
				}
			})
		},
		selectAll() {
			let flag = !this.selectAllFlag
			this.cartList.forEach((product, index) => {
				product.checked = flag ? '1' : '0'
			})
			axios.post('/users/cart/selectAll', {
				selectAll: flag
			}).then((res) => {
				if (res.data.status === '0') {
				}
			})
		},
		openDelete(ref, productId) {
			this.$refs[ref].open()
			this.selectId = productId
		},
		closeDelete(ref) {
			this.$refs[ref].close()
		},
		confirmDelete(ref) {
			let _this = this
			axios.post('/users/cart/del', {
				productId: _this.selectId
			}).then((res) => {
				if (res.data.status === '0') {
					this.$refs[ref].close()
					_this.initCartList()
				}
			})
		}
	},
	computed: {
		selectAllFlag() {
			return this.checkedCount === this.cartList.length
		},
		checkedCount() {
			let i = 0
			this.cartList.forEach((item) => {
				if (item.checked === '1') {
					i++
				}
			})
			return i
		},
		totalPrice() {
			var totalPrice = 0
			this.cartList.forEach((item, i) => {
				if (item.checked === '1') {
					totalPrice += item.salePrice * item.productNum
				}
			})
			return totalPrice
		}
	}
}
</script>

<style lang="scss" scoped>
$pink: #ee9db3;

	.orderConfirm {
		font-family: "微软雅黑";
		padding: 20px 150px;
		box-sizing: border-box;
		.title-wrapper {
			display: flex;
			margin-bottom: 20px;
			.border {
				flex: 1;
				margin-top: 10px;
				height: 0;
				border: 1px solid $pink;
			}
			.title {
				padding: 0 25px;
				font-size: 25px;
				font-weight: 700;
				color: $pink;
			}
		}
		.no-product {
			margin-top: 100px;
			h1 {
				font-size: 30px;
				font-weight: 700;
				text-align: center;
				color: $pink;
			}
		}
		.cart {
			width: 100%;
			border: 1px solid $pink;
			box-sizing: border-box;
			td {
				padding: 20px 0;
				text-align: center;
				vertical-align: middle;
			}
			.cart-head {
				td {
					background: $pink;
					color: #fff;
					font-size: 20px;
				}
				.radio {
					.select {
						display: inline-block;
						width: 20px;
						height: 20px;
						border: 2px solid #fff;
						border-radius: 5px;
						cursor: pointer;
						&.check {
							background: #fff;
						}
					}
				}
			}
			.cart-list-item {
				font-size: 13px;
				border-bottom: 1px solid $pink;
				.radio {
					.select {
						display: inline-block;
						width: 20px;
						height: 20px;
						background: #fff;
						border: 2px solid $pink;
						border-radius: 5px;
						cursor: pointer;
						&.check {
							background: $pink;
						}
					}
				}
				.count {
					div {
						display: inline-block;
						vertical-align: top;
						padding: 3px 7px;
						input {
							width: 25px;
							background: #fff;
							border: none;
							text-align: center;
						}
					}
					.num {
						font-size: 20px;
					}
					.increase, .decrease {
						background: $pink;
						color: #fff;
						border: 2px solid $pink;
						cursor: pointer;
						&:active {
							color: $pink;
							background: #fff;
						}
					}
				}
				.delete {
					cursor: pointer;
				}
			}
		}
		.pay-wrapper {
			text-align: right;
			font-size: 0;
			// div {
			// 	display: inline-block;
			// 	vertical-align: bottom;
			// }
			.total {
			  margin-top: 10px;
				font-size: 13px;
				b {
					font-size: 25px;
					font-weight: 700;
					color: $pink;
				}
			}
			.pay {
				padding: 15px 25px;
				margin-left: 20px;
				font-size: 25px;
				background: $pink;
				&.canPay {
					opacity: .4;
				}
				a {
					color: #fff;
					text-decoration: none;
				}
			}
		}
	}
</style>
