<template lang="html">
	<div class="search-result">
		<section class="chips-wrapper">
			<span>所有分类：</span>
			<span class="chips" v-for="item in chipsList">{{item.sort}}：{{item.value}} <a href="#" class="delete"><i class="fa fa-close"></i></a></span>
		</section>

		<section class="sort-wrapper">
			<div class="sort-item" v-for="item in sortList">
				<div class="parent-wrapper">
					<span class="parent">{{item.parent}} :</span>
				</div>
				<div class="child-wrapper">
					<ul>
						<li v-for="child in item.child" class="child"><a href="#">{{child}}</a></li>
					</ul>
				</div>
			</div>
		</section>

		<section class="screen-wrapper">
			<md-button class="screen-item">综合</md-button>
			<md-menu>
			  <md-button md-menu-trigger class="screen-item">
					销量
					<md-icon md-iconset="fa fa-sort-desc" class="sort-desc"></md-icon>
				</md-button>
			  <md-menu-content>
			    <md-menu-item>销量从高到低</md-menu-item>
			    <md-menu-item>销量从低到高</md-menu-item>
			  </md-menu-content>
			</md-menu>
			<md-menu>
			  <md-button md-menu-trigger class="screen-item">
					人气
					<md-icon md-iconset="fa fa-sort-desc" class="sort-desc"></md-icon>
				</md-button>
			  <md-menu-content>
			    <md-menu-item>人气从高到低</md-menu-item>
			    <md-menu-item>人气从低到高</md-menu-item>
			  </md-menu-content>
			</md-menu>
			<md-menu>
			  <md-button md-menu-trigger class="screen-item">
					信用
					<md-icon md-iconset="fa fa-sort-desc" class="sort-desc"></md-icon>
				</md-button>
			  <md-menu-content>
			    <md-menu-item>信用从高到低</md-menu-item>
			    <md-menu-item>信用从低到高</md-menu-item>
			  </md-menu-content>
			</md-menu>
			<md-menu>
			  <md-button md-menu-trigger class="screen-item">
					价格
					<md-icon md-iconset="fa fa-sort-desc" class="sort-desc"></md-icon>
				</md-button>
			  <md-menu-content>
			    <md-menu-item @click="priceSort(1)">价格从高到低</md-menu-item>
			    <md-menu-item @click="priceSort(0)">价格从低到高</md-menu-item>
			  </md-menu-content>
			</md-menu>
		</section>
		<a @click="priceLevelSort('all')">all</a><br/>
		<a @click="priceLevelSort('0')">0 ~ 100</a><br/>
		<a @click="priceLevelSort('1')">100 ~ 500</a><br/>
		<a @click="priceLevelSort('2')">500 ~ 1000</a><br/>
		<a @click="priceLevelSort('3')">1000 ~ 5000</a>
		<section class="products-wrapper clearfix">

			<!-- <paginate ref="paginator" name="products" :list="products" :per="4"> -->
				<div class="products-item" v-for="item in products">
					<md-card md-with-hover>
						<md-card-media>
							<img v-lazy="'static/' + item.productImage">
						</md-card-media>

						<md-card-header>
							<div class="title" v-html="item.productName">
								<!-- {{item.productName}} -->
							</div>
							<div class="price">
								￥
								<span class="now">{{item.salePrice}}元</span>
							</div>
							<div class="rating">
								<span style="flex: 1;"></span>
								<md-rating-bar v-model="ratingNum" :md-max-rating="5" class="md-primary" disabled></md-rating-bar>
							</div>
						</md-card-header>

						<md-card-actions>
							<md-button class="md-accent" @click="addCart(item.productId)">加入购物车</md-button>
							<md-button class="md-accent">立即购买</md-button>
						</md-card-actions>
					</md-card>
				</div>
			<!-- </paginate> -->
			<!-- <paginate-links for="products" :hide-single-page="true" :show-step-links="true" :async="true"></paginate-links> -->

		</section>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import lazyLoad from 'vue-lazyload'
	// import VuePaginate from 'vue-paginate'

	// Vue.use(VuePaginate)
	Vue.use(lazyLoad, {
		loading: '/static/lu.jpg'
	})

	export default {
		data() {
			return {
				chipsList: [
					{
						sort: '品牌',
						value: 'LU'
					},
					{
						sort: '价格',
						value: '100-200'
					},
					{
						sort: '颜色',
						value: '红色'
					}
				],
				sortList: [
					{
	          parent: '利元亨',
	          child: ['公司简介', '发展历程', '企业文化', '合作伙伴', '联系我们']
	        },
	        {
	          parent: '行业解决方案',
	          child: ['新能源领域装备', '汽车领域装备', '精密电子领域装备', '五金锁业领域装备', '安防领域装备', '精品包装领域装备', '整体解决方案定制', '新能源领域装备', '汽车领域装备', '精密电子领域装备', '五金锁业领域装备', '安防领域装备', '精品包装领域装备', '整体解决方案定制', '新能源领域装备', '汽车领域装备', '精密电子领域装备', '五金锁业领域装备', '安防领域装备', '精品包装领域装备', '整体解决方案定制']
	        },
	        {
	          parent: '资讯',
	          child: ['公司新闻', '行业新闻']
	        },
	        {
	          parent: '招聘',
	          child: ['人才战略', '职业发展', '员工风采', '招聘职位']
	        },
	        {
	          parent: '服务',
	          child: ['销售网络', '合作流程', '常见问题', '售后服务']
	        }
				],
				// paginate: ['products']
				ratingNum: 3.5,
				products: [],
				priceFlag: 1,
				page: 1,
				pageSize: 20,
				priceLevel: 'all'
			}
		},
		mounted() {
			this.initProducts()
		},
		methods: {
			initProducts() {
				let _this = this
				let param = {
					page: this.page,
					pageSize: this.pageSize,
					sort: this.priceFlag,
					priceLevel: this.priceLevel
				}
				axios.get('/goods/list', {
					params: param
				}).then((res) => {
					if (res.data.status === '0') {
						_this.products = res.data.result.list
					} else {
						_this.products = []
					}
				})
			},
			priceSort(flag) {
				this.priceFlag = flag ? -1 : 1
				this.initProducts()
			},
			priceLevelSort(level) {
				this.priceLevel = level
				this.page = 1
				this.initProducts()
			},
			addCart(id) {
				axios.post('/goods/addCart', {
					productId: id
				}).then((res) => {
					if (res.data.status === '0') {
						this.$store.commit('updateCartCount', 1)
						alert('加入成功')
					} else {
						alert(res.data.msg)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
$pink: #ee9db3;
	.search-result {
		padding: 20px 150px;
		width: 100%;
		box-sizing: border-box;
		.chips-wrapper {
			.chips {
				display: inline-block;
				margin-right: 5px;
				padding: 3px 10px;
				color: #fff;
				background: $pink;
				border-radius: 20px;
				.delete {
					display: inline-block;
					margin-left: 5px;
					color: #000;
					transition: all .4s;
					&:hover {
						transform: rotateZ(90deg);
					}
				}
			}
		}
		.sort-wrapper {
			margin: 10px 0;
			font-family: "微软雅黑";
			.sort-item {
				display: flex;
				padding: 10px 0;
				font-size: 0;
				border-bottom: 1px dashed $pink;
				.child-wrapper {
					flex: 1;
					padding: 0 10px;
				}
				&:last-child {
					border-bottom: none;
				}
				.parent {
					font-size: 13px;
					font-weight: 700;
					color: #000;
				}
				.child {
					display: inline;
					padding: 0 15px;
					font-size: 15px;
					a {
						color: rgba(0, 0, 0, .7);
						text-decoration: none;
						&:hover {
							color: $pink;
						}
					}
				}
			}
		}
		.screen-wrapper {
			font-family: "微软雅黑";
			border-top: 1px solid $pink;
			border-bottom: 1px solid $pink;
			.sort-desc {
				font-size: 12px;
			}
		}
		.products-wrapper {
			margin: 10px 0;
			font-size: 0;
			.products-item {
				float: left;
				padding: 15px;
				width: 25%;
				font-size: 0;
				font-family: "微软雅黑";
				box-sizing: border-box;
				.title {
					margin-bottom: 10px;
					font-size: 15px;
					font-weight: 700;
				}
				.price {
					font-size: 13px;
					color: rgba(0, 0, 0, .5);
					.now {
						font-size: 20px;
						font-weight: 700;
						color: $pink;
					}
					.past {
						padding-left: 15px;
						text-decoration:line-through;
					}
				}
				.rating {
					display: flex;
				}
			}
		}
	}
</style>
