<template lang="html">
	<div class="shoppingCart">
		<div class="title-wrapper">
			<div class="border"></div>
			<div class="title">购物车</div>
			<div class="border"></div>
		</div>
		<md-dialog ref="confirmDelete">
		  <md-dialog-title>提示</md-dialog-title>

		  <md-dialog-content>你确定要删除该商品吗？</md-dialog-content>

		  <md-dialog-actions>
		    <md-button class="md-accent" @click="closeDelete('confirmDelete')">取消</md-button>
		    <md-button class="md-accent" @click="confirmDelete('confirmDelete')">确定</md-button>
		  </md-dialog-actions>
		</md-dialog>
		<div class="no-product" v-show="!cartList.length">
			<h1>购物车暂时没有商品</h1>
		</div>
		<table class="cart" v-show="cartList.length">
			<thead>
				<tr class="cart-head">
					<td>
						<div class="radio">
							<a class="select" :class="{'check': selectAllFlag}" @click="selectAll()"></a>
						</div>
					</td>
					<td>商品信息</td>
					<td>单价</td>
					<td>数量</td>
					<td>金额</td>
					<td>操作</td>
				</tr>
			</thead>
			<tbody>
				<tr class="cart-list-item" v-for="(item, index) in cartList">
					<td>
						<div class="radio">
							<a class="select" :class="{'check': item.checked === '1'}" @click="editCart('select', item)"></a>
						</div>
					</td>
					<td>
						<img :src="'static/' + item.productImage" width="50" height="50">
						<span>{{item.productName}}</span>
					</td>
					<td>{{item.salePrice | currency('￥')}}</td>
					<td class="count">
						<div class="decrease" @click="editCart('minu', item)"><i class="fa fa-minus"></i></div>
						<div class="num"><input type="text" value="0" v-model="item.productNum" disabled></div>
						<div class="increase" @click="editCart('add', item)"><i class="fa fa-plus"></i></div>
					</td>
					<td>{{item.salePrice * item.productNum | currency('￥')}}</td>
					<td>
						<md-button class="md-icon-button" @click="openDelete('confirmDelete', item.productId)">
							<md-icon md-iconset="fa fa-trash-o"></md-icon>
						</md-button>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="pay-wrapper" v-show="cartList.length">
			<div class="total">
				金额：<b>{{totalPrice | currency('￥')}}</b>
			</div>
			<div class="pay" :class="{'canPay': totalPrice <= 0}">
				<a @click="address">结算</a>
			</div>
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
			cartList: []
		}
	},
	filters: {
		currency: currency
	},
	mounted() {
		this.initCartList()
	},
	methods: {
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
				this.$store.commit('updateCartCount', 1)
			} else if (type === 'minu') {
				if (product.productNum <= 1) {
					return
				}
				product.productNum--
				this.$store.commit('updateCartCount', -1)
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
					_this.$refs[ref].close()
					_this.initCartList()
					_this.cartList.forEach((item) => {
						if (item.productId === _this.selectId) {
							_this.$store.commit('updateCartCount', -parseInt(item.productNum))
						}
					})
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

	.shoppingCart {
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
			div {
				display: inline-block;
				vertical-align: bottom;
			}
			.total {
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
