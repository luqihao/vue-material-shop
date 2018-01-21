var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')
var User = require('../models/users')

//连接数据库
mongoose.connect('mongodb://10.10.31.5:27017/imoocmall')

mongoose.connection.on('connected', () => {
	console.log('Mongodb connect success')
})

mongoose.connection.on('error', () => {
	console.log('Mongodb connect fail')
})

mongoose.connection.on('disconnected', () => {
	console.log('Mongodb connect dissuccess')
})

//查询商品列表
router.get('/list', (req, res, next) => {
	// res.send('come on baby')
	let page = parseInt(req.param("page"))
	let pageSize = parseInt(req.param("pageSize"))
	let priceLevel = req.param("priceLevel")
	let sort = req.param("sort")
	let skip = (page - 1) * pageSize
	let priceGt = '', priceLte = ''
	let params = {}
	if (priceLevel !== 'all') {
		switch (priceLevel) {
			case '0': priceGt = 0; priceLte = 100; break;
			case '1': priceGt = 100; priceLte = 500; break;
			case '2': priceGt = 500; priceLte = 1000; break;
			case '3': priceGt = 1000; priceLte = 5000; break;
			default: console.log('err')
		}
		params = {
			salePrice: {
				$gt: priceGt,
				$lte: priceLte
			}
		}
	}
	let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
	goodsModel.sort({
		'salePrice': sort
	})
	goodsModel.exec({}, (err, doc) => {
		if (err) {
			res.json({
				status: '1',
				msg: err.message
			})
		} else {
			res.json({
				status: '0',
				msg: '',
				result: {
					count: doc.length,
					list: doc
				}
			})
		}
	})
})

//加入购物车
router.post('/addCart', (req, res, next) => {
	let userId = req.cookies.userId, productId = req.body.productId

	User.findOne({userId: userId}, (err1, userDoc) => {
		if (err1) {
			res.json({
				status: '1',
				meg: err1.message
			})
		} else {
			if (userDoc) {
				let goodsItem = ''
				userDoc.cartList.forEach((item) => {
					if (item.productId === productId) {
						goodsItem = item
						item.productNum++
					}
				})
				if (goodsItem) {
					userDoc.save((err4, doc4) => {
						if (err4) {
							res.json({
								status: '1',
								meg: err4.message
							})
						} else {
							res.json({
								status: '0',
								meg: '',
								result: doc4
							})
						}
					})
				} else {
					Goods.findOne({productId: productId}, (err2, doc2) => {
						if (err2) {
							res.json({
								status: '1',
								meg: err2.message
							})
						} else {
							if (doc2) {
								doc2.productNum = 1
								doc2.checked = 1
								console.log(doc2)
								console.log(doc2.productNum)
								console.log(doc2.checked)
								console.log('doc2')
								userDoc.cartList.push(doc2)
								userDoc.save((err3, doc3) => {
									if (err3) {
										res.json({
											status: '1',
											meg: err3.message,
											result: ''
										})
									} else {
										res.json({
											status: '0',
											meg: '',
											result: doc3
										})
									}
								})
							}
						}
					})
				}
			}
		}
	})
})

module.exports = router
