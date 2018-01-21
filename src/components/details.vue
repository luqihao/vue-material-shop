<template lang="html">
	<div class="details" name="details">
		<section class="detail-header clearfix">
			<div class="left-wrapper">
				<div class="head-photograph">
					<img src="../assets/img.png">
				</div>
				<div class="photograph-list">
					<ul class="clearfix">
						<li><a href="#"><img src="../assets/img.png"></a></li>
						<li><a href="#"><img src="../assets/img.png"></a></li>
						<li><a href="#"><img src="../assets/img.png"></a></li>
						<li><a href="#"><img src="../assets/img.png"></a></li>
						<li><a href="#"><img src="../assets/img.png"></a></li>
					</ul>
				</div>
			</div>
			<div class="right-wrapper">
				<div class="title">
					<h1>日系夏季男士卡通印花短袖t恤圆领半袖简约修身情侣学生上衣潮流</h1>
				</div>
				<div class="price">
					<p>
						<span>价格：</span>
						<span  class="pricePast">￥68.00</span>
					</p>
					<p>
						<span>现价：</span>
						<span  class="priceNow">￥56.00</span>
					</p>
				</div>
				<div class="discount">
					<span>优惠：</span>
					<span>本商品暂无优惠</span>
				</div>
				<div class="delivery">
					<span>配送：</span>
					<span>广东江门</span>
					<span style="padding: 0 10px;font-size: 12px;color: rgba(0, 0, 0, .5)">至</span>
					<div class="select-wrapper">
	          <h3 class="select-option" @click="deliveryFlag=!deliveryFlag">
							申通
							<div class="more">
								<a href="#" :class="{'active': deliveryFlag}"><i class="fa fa-sort-desc"></i></a>
							</div>
						</h3>
	          <transition name="move">
	            <div class="option-wrapper" v-show="deliveryFlag">
	              <h3 v-for="(option, index) in delivery" @click="deliveryFlag=!deliveryFlag"><a href="#">{{option}}</a></h3>
	            </div>
	          </transition>
	        </div>
				</div>
				<div class="express">
					<span>快递：</span>
					<div class="select-wrapper">
	          <h3 class="select-option" @click="expressFlag=!expressFlag">
							申通
							<div class="more">
								<a href="#" :class="{'active': expressFlag}"><i class="fa fa-sort-desc"></i></a>
							</div>
						</h3>
	          <transition name="move">
	            <div class="option-wrapper" v-show="expressFlag">
	              <h3 v-for="(option, index) in express" @click="expressFlag=!expressFlag"><a href="#">{{option}}</a></h3>
	            </div>
	          </transition>
	        </div>
				</div>
				<div class="size">
					<span>尺码：</span>
					<ul>
						<li><a href="#">s</a></li>
						<li><a href="#">m</a></li>
						<li><a href="#">l</a></li>
						<li><a href="#">xl</a></li>
					</ul>
				</div>
				<div class="color">
					<span>颜色：</span>
					<ul>
						<li><a href="#">黑色</a></li>
						<li><a href="#">红色</a></li>
					</ul>
				</div>
				<div class="count">
					<span>数量：</span>
					<div class="decrease" @click="decrease()"><i class="fa fa-minus"></i></div>
					<div class="num"><input type="text" value="0" disabled></div>
					<div class="increase" @click="increase()"><i class="fa fa-plus"></i></div>
				</div>
				<div class="btn-wrapper">
					<md-button class="md-accent btn">立即购买</md-button>
					<md-button class="md-accent btn">加入购物车</md-button>
				</div>
			</div>
		</section>

		<section class="detail-body">
			<md-tabs class="md-transparent">
			  <md-tab md-label="商品详情">
					<div class="info-wrapper">
						<div class="content">
							<div class="parameter">
								<ul class="clearfix">
									<li v-for="item in parameter">{{item.name}}:{{item.value}}</li>
								</ul>
							</div>
							<div class="gallery">
								<h1 class="title">商品图片展示</h1>
								<img src="../assets/gallery.jpg">
							</div>
						</div>
					</div>
			  </md-tab>

			  <md-tab md-label="商品评价">
			    <div class="rating-wrapper" ref="ratingWrapper">
						<div class="content">
							<div class="rating-item clearfix" v-for="item in ratingList">
								<div class="left">
									<md-avatar class="md-large">
										<img src="../assets/lu.jpg">
									</md-avatar>
									<h3>{{item.name}}</h3>
								</div>
								<div class="right">
									<p>{{item.rating}}</p>
									<ul class="clearfix">
										<li><a href="#"><img src="../assets/img.png"></a></li>
										<li><a href="#"><img src="../assets/img.png"></a></li>
									</ul>
									<p>
										<span class="color">颜色：{{item.color}}</span>
										<span class="size">尺码：{{item.size}}</span>
										<span class="date">{{item.date}}</span>
									</p>
								</div>
							</div>
							<div class="more">
								<a href="#" @click="more">
									more
									<span :class="{'showMore': ratingLength == rating.length}"><i class="fa fa-chevron-down"></i></span>
								</a>
							</div>
						</div>
			    </div>
			  </md-tab>
			</md-tabs>
		</section>
	</div>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				express: ['申通', '韵达', '顺丰', '圆通'],
				expressFlag: false,
				delivery: ['申通', '韵达', '顺丰', '圆通'],
				deliveryFlag: false,
				parameter: [
					{
						name: '厚薄',
						value: '常规'
					},
					{
						name: '厚薄',
						value: '常规'
					},
					{
						name: '厚薄',
						value: '常规'
					},
					{
						name: '厚薄',
						value: '常规'
					},
					{
						name: '厚薄',
						value: '常规'
					},
					{
						name: '厚薄',
						value: '常规'
					},
					{
						name: '厚薄',
						value: '常规'
					},
					{
						name: '厚薄',
						value: '常规'
					},
					{
						name: '厚薄',
						value: '常规'
					}
				],
				rating: [
					{
						name: 'LU',
						rating: '度覅不分开八块腹肌把空间风暴卡随便覅设备房间卡随便扣积分把身份不卡就随便发了节哀顺变放假卡巴斯基看房了解as',
						color: '黄色',
						size: 'L',
						date: '2017年7月30日'
					},
					{
						name: 'LU',
						rating: '度覅不分开八块腹肌把空间风暴卡随便覅设备房间卡随便扣积分把身份不卡就随便发了节哀顺变放假卡巴斯基看房了解as',
						color: '黄色',
						size: 'L',
						date: '2017年7月30日'
					},
					{
						name: 'LU',
						rating: '度覅不分开八块腹肌把空间风暴卡随便覅设备房间卡随便扣积分把身份不卡就随便发了节哀顺变放假卡巴斯基看房了解as',
						color: '黄色',
						size: 'L',
						date: '2017年7月30日'
					},
					{
						name: 'LU',
						rating: '度覅不分开八块腹肌把空间风暴卡随便覅设备房间卡随便扣积分把身份不卡就随便发了节哀顺变放假卡巴斯基看房了解as',
						color: '黄色',
						size: 'L',
						date: '2017年7月30日'
					},
					{
						name: 'LU',
						rating: '度覅不分开八块腹肌把空间风暴卡随便覅设备房间卡随便扣积分把身份不卡就随便发了节哀顺变放假卡巴斯基看房了解as',
						color: '黄色',
						size: 'L',
						date: '2017年7月30日'
					},
					{
						name: 'LU',
						rating: '度覅不分开八块腹肌把空间风暴卡随便覅设备房间卡随便扣积分把身份不卡就随便发了节哀顺变放假卡巴斯基看房了解as',
						color: '黄色',
						size: 'L',
						date: '2017年7月30日'
					},
					{
						name: 'LU',
						rating: '度覅不分开八块腹肌把空间风暴卡随便覅设备房间卡随便扣积分把身份不卡就随便发了节哀顺变放假卡巴斯基看房了解as',
						color: '黄色',
						size: 'L',
						date: '2017年7月30日'
					}
				],
				ratingLength: 3
			}
		},
		computed: {
			ratingList() {
				return this.rating.slice(0, this.ratingLength)
			}
		},
		methods: {
			decrease() {},
			increase() {},
			more() {
				if (this.ratingLength !== this.rating.length) {
					this.ratingLength += 3
				}
				if (this.ratingLength > this.rating.length) {
					this.ratingLength = this.rating.length
				} else if (this.ratingLength === this.rating.length) {
					this.ratingLength = 3
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
$pink: #ee9db3;

	.details {
		padding: 20px 150px;
		font-family: "微软雅黑";
		.detail-header {
			.left-wrapper {
				float: left;
				padding: 20px;
				width: 30%;
				box-sizing: border-box;
				.head-photograph {
					position: relative;
					width: 100%;
					height: 0;
					padding-top: 100%;
					img {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
				}
				.photograph-list {
					li {
						float: left;
						margin-top: 5px;
						margin-left: 0;
						padding: 5px;
						width: 20%;
						box-sizing: border-box;
						a {
							display: block;
							border: 3px solid #f5f5f5;
							&:hover, &.active {
								border-color: $pink;
							}
						}
					}
				}
			}
			.right-wrapper {
				float: left;
				padding: 20px;
				width: 70%;
				div {
					margin-bottom: 20px;
					span {
						&:first-child {
							padding-right: 20px;
							font-size: 15px;
							color: rgba(0, 0, 0, .5);
						}
					}
				}
				.title {
					font-size: 25px;
					line-height: 30px;
					font-weight: 700;
				}
				.price {
					p {
						&:first-child {
							margin-bottom: 10px;
						}
					}
					.pricePast {
						text-decoration: line-through;
					}
					.priceNow {
						font-size: 25px;
						color: $pink;
					}
				}
				.discount {

				}
				.delivery, .express {
					.select-wrapper {
						position: relative;
						display: inline-block;
						width: 150px;
						font-size: 15px;
						text-align: center;
						.select-option {
							position: relative;
							border-bottom: 1px solid #000;
							cursor: pointer;
							.more {
								position: absolute;
								top: 0;
								right: 0;
								a {
									display: inline-block;
									font-size: 15px;
									color: #000;
									transition: all .4s;
									&.active {
										transform: rotateZ(90deg);
									}
								}
							}
						}
						.option-wrapper {
							position: absolute;
							z-index: 1;
							right: 0;
							width: 100%;
							background: #fff;
							box-shadow: 1px 1px 2px rgba(7, 17, 27, 0.2);
							transform: translate3d(0, 0, 0);
							transition: all .4s;
							&.move-enter, &.move-leave-to {
								transform: translate3d(0, 10%, 0);
								opacity: 0;
							}
							h3 {
								padding: 5px 0;
								cursor: pointer;
								&:hover {
									color: #fff;
									background: $pink;
								}
								a {
									color: #000;
									text-decoration: none;
								}
							}
						}
					}
				}
				.size, .color {
					ul {
						display: inline-block;
						li {
							display: inline-block;
							a {
								display: block;
								padding: 5px 10px;
								color: #000;
								border: 2px solid #f5f5f5;
								text-decoration: none;
								&:hover, &.active {
									border-color: $pink;
									background: $pink;
									color: #fff;
								}
							}
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
				.btn-wrapper {
					.btn {
						padding: 5px 10px;
						font-size: 25px;
					}
				}
			}
		}
		.detail-body {
			.info-wrapper {
				.content {
					margin: 0 auto;
					width: 50%;
					text-align: center;
					div {
						margin-bottom: 50px;
					}
					.parameter {
						padding-bottom: 50px;
						border-bottom: 1px solid rgba(0, 0, 0, .1);
						li {
							float: left;
							margin-top: 10px;
							width: 33.3%;
							font-size: 15px;
						}
					}
					.gallery {
						padding-bottom: 50px;
						border-bottom: 1px solid rgba(0, 0, 0, .1);
						.title {
							font-size: 25px;
							color: $pink;
							text-align: center;
							margin-bottom: 20px;
						}
					}
				}
			}
			.rating-wrapper {
				.content {
					margin: 0 auto;
					width: 50%;
					text-align: center;
					.rating-item {
						padding: 10px 0;
						// border-bottom: thin solid rgba(0, 0, 0, .1);
						// &:last-child {
						// 	border-bottom: none;
						// }
						.left, .right {
							float: left;
							margin-top: 0;
							padding: 5px 10px;
							box-sizing: border-box;
						}
						.left {
							width: 20%;
						}
						.right {
							width: 80%;
							text-align: left;
							border-left: 1px dashed $pink;
							p {
								line-height: 25px;
								&:last-child {
									text-align: right;
								}
							}
							span {
								padding-right: 20px;
								font-size: 12px;
								color: rgba(0, 0, 0, .4);
							}
							li {
								float: left;
								margin-top: 10px;
								margin-right: 10px;
								padding: 5px;
								width: 50px;
								height: 50px;
								a {
									display: block;
									border: 3px solid #f5f5f5;
									&:hover, &.active {
										border-color: $pink;
									}
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
		}
	}
</style>
