<template lang="html">
	<div class="distribution">
		<section class="info-wrapper">
			<div class="title-wrapper">
				<div class="border"></div>
				<div class="title">配送地址</div>
				<div class="border"></div>
			</div>
			<div class="address-wrapper clearfix">
				<div class="address-item" v-for="(item, index) in addressList" @click="selectAddress(item.addressId, index)">
					<div class="content" :class="{'active': currentIndex==index}">
						<p class="info-item">{{item.userName}}</p>
						<p class="info-item">{{item.streetName}}</p>
						<p class="info-item">{{item.tel}}</p>
						<!-- <p class="info-item">{{item.postCode}}</p> -->
						<p class="info-item" v-show="item.isDefault"><a href="#">默认地址</a></p>
						<p class="info-item" v-show="currentIndex==index && !item.isDefault"><a href="#" @click="setDefault(index, item.addressId)">设为默认</a></p>
						<md-button class="md-icon-button md-accent edit" @click="" v-show="currentIndex==index">
							<md-icon md-iconset="fa fa-pencil"></md-icon>
						</md-button>
						<md-button class="md-icon-button md-accent delete" @click="deleteAddress(item.addressId)" v-show="currentIndex==index">
							<md-icon md-iconset="fa fa-trash-o"></md-icon>
						</md-button>
					</div>
				</div>
				<div id="new-address" class="address-item new-address" @click="currentIndex = -1">
					<md-dialog md-open-from="#new-address" md-close-to="#new-address" ref="dialog-new-address">
	          <md-dialog-title>添加新地址</md-dialog-title>

	          <md-dialog-content>
	            <form>
	              <md-input-container>
	                <label>收件人</label>
	                <md-input type="text" required></md-input>
	              </md-input-container>
	              <md-input-container>
	                <label>地址</label>
	                <md-input type="text" required></md-input>
	              </md-input-container>
								<md-input-container>
	                <label>联系电话</label>
	                <md-input type="text" required></md-input>
	              </md-input-container>
	            </form>
	          </md-dialog-content>

	          <md-dialog-actions>
	            <md-button class="md-accent" @click="closeDialog('dialog-new-address')">取消</md-button>
	            <md-button class="md-accent" @click="addNewAddress('dialog-new-address')">添加</md-button>
	          </md-dialog-actions>
	        </md-dialog>
					<a href="#" @click="openDialog('dialog-new-address')">
						<div class="content" :class="{'active': currentIndex==-1}">
								<i class="fa fa-plus"></i>
								<br>
								添加新地址
						</div>
					</a>
				</div>
				<div class="more" v-if="address.length>3">
					<a href="#" @click="more">
						more
						<span :class="{'showMore': addressLength==address.length}"><i class="fa fa-chevron-down"></i></span>
					</a>
				</div>
			</div>
		</section>

		<section class="pay-wrapper">
			<div class="title-wrapper">
				<div class="border"></div>
				<div class="title">支付</div>
				<div class="border"></div>
			</div>
			<div style="text-align: center">
				<a @click="orderConfirm">确认订单</a>
			</div>
		</section>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'

	Vue.use(axios)

	export default {
		data() {
			return {
				addressLength: 3,
				currentIndex: -1,
				address: [],
				selectId: ''
			}
		},
		mounted() {
			this.initAddressList()
		},
		computed: {
			addressList() {
				return this.address.slice(0, this.addressLength)
			}
		},
		methods: {
			orderConfirm() {
				if (this.selectId) {
					this.$router.push({
						path: '/orderConfirm',
						query: {
							'addressId': this.selectId
						}
					})
				}
			},
			selectAddress(addressId, index) {
				this.selectId = addressId
				this.currentIndex = index
			},
			initAddressList() {
				let _this = this
				axios.get('/users/address').then((res) => {
					if (res.data.status === '0') {
						_this.address = res.data.result
					}
				})
			},
			more() {
				if (this.addressLength === 3) {
					this.addressLength = this.address.length
				} else if (this.addressLength === this.address.length) {
					this.addressLength = 3
				}
			},
			setDefault(index, addressId) {
				this.address.forEach((item, i) => {
					if (item.isDefault) {
						item.isDefault = false
					}
				})
				this.address[index].isDefault = true
				axios.post('/users/address/setDefault', {
					'addressId': addressId
				}).then((res) => {
					if (res.data.status === '0') {
						console.log('set default suc')
					}
				})
			},
			deleteAddress(addressId) {
				axios.post('/users/address/delAddress', {
					'addressId': addressId
				}).then((res) => {
					if (res.data.status === '0') {
						this.address.splice(this.currentIndex, 1)
						console.log(res.data.msg)
					}
				})
			},
			openDialog(ref) {
        this.$refs[ref].open()
      },
      closeDialog(ref) {
        this.$refs[ref].close()
      },
			addNewAddress(ref) {
				let addr = {
					name: 'cnsusu',
					address: '广东省江门市江海区',
					tel: '123456789',
					isDefault: false
				}
				this.address.push(addr)
				this.addressLength = 3
				this.$refs[ref].close()
			}
		}
	}
</script>

<style lang="scss" scoped>
$pink: #ee9db3;

	.distribution {
		font-family: "微软雅黑";
		padding: 20px 150px;
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
		.address-wrapper {
			.address-item {
				float: left;
				padding: 25px;
				width: 25%;
				box-sizing: border-box;
				cursor: pointer;
				.content {
					position: relative;
					padding: 20px;
					height: 160px;
					border: 3px solid #f5f5f5;
					border-radius: 5px;
					box-sizing: border-box;
					&.active {
						border-color: $pink;
					}
					&:hover {
						border-color: $pink;
					}
					.info-item {
						padding: 3px 0;
						font-size: 15px;
						font-weight: 700;
						&:nth-child(2) {
							margin-bottom: 15px;
						}
						a {
							color: $pink;
							text-decoration: none;
						}
					}
					.edit {
						position: absolute;
						top: 10px;
						right: 5px;
					}
					.delete {
						position: absolute;
						bottom: 20px;
						right: 5px;
					}
				}
				&.new-address {
					text-align: center;
					font-size: 25px;
					a {
						color: $pink;
						text-decoration: none;
						i {
							font-size: 100px;
						}
					}
				}
			}

			.more {
				clear: both;
				margin: 20px 0;
				text-align: center;
				a {
					color: $pink;
					text-decoration: none;
					span {
						display: inline-block;
						transition: all 1s;
						&.showMore {
							transform: rotateZ(180deg);
						}
					}
				}
			}
		}
	}
</style>
