var express = require('express');
var router = express.Router();
var User = require('../models/users')
require('./../util/util')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//登录
router.post('/login', (req, res, next) => {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        meg: err.message
      })
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.json({
          status: '0',
          meg: '',
          result: {
            userName: doc.userName
          }
        })
      } else {
        res.json({
          status: '1',
          meg: '用户不存在'
        })
      }
    }
  })
})
//登出
router.post('/logout', (req, res, next) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})
//检查是否为登录状态
router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: {
        userName: req.cookies.userName
      }
    })
  } else {
    res.json({
      status: '1',
      meg: '未登录',
      result: ''
    })
  }
})
//查询购物车商品数量
router.get('/getCartCount', (req,res,next) => {
  if (req.cookies && req.cookies.userId) {
    let userId = req.cookies.userId
    User.findOne({userId: userId}, (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        if (doc) {
          let cartList = doc.cartList
          let cartCount = 0
          cartList.forEach((item) => {
            cartCount += parseInt(item.productNum)
          })
          res.json({
            status: '0',
            msg: '',
            result: {
              cartCount: cartCount
            }
          })
        }
      }
    })
  }
})
//查询当前用户的购物车
router.get('/cart', (req,res,next) => {
  let userId = req.cookies.userId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})
//购物车删除
router.post('/cart/del', (req, res, next) => {
  let userId = req.cookies.userId,
      productId = req.body.productId
  User.update({userId: userId}, {$pull: {'cartList': {'productId': productId}}}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '删除成功',
          result: 'suc'
        })
      }
    }
  })
})
//修改商品数量
router.post('/cart/edit', (req, res, next) => {
  let userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked = req.body.checked
  User.update({'userId': userId, "cartList.productId": productId}, {"cartList.$.productNum": productNum, "cartList.$.checked": checked}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: 'suc'
        })
      }
    }
  })
})
//选择全部
router.post('/cart/selectAll', (req, res, next) => {
  let userId = req.cookies.userId,
      selectAll = req.body.selectAll ? '1' : '0'
  User.findOne({'userId': userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        doc.cartList.forEach((item) => {
          item.checked = selectAll
        })
        doc.save((err1, doc1) => {
          if (err1) {
            res.json({
              status: '1',
              msg: err1.message,
              result: ''
            })
          } else {
            if (doc1) {
              res.json({
                status: '0',
                msg: '',
                result: 'suc'
              })
            }
          }
        })
      }
    }
  })
})
//查询地址列表
router.get('/address', (req, res, next) => {
  let userId = req.cookies.userId
  User.findOne({'userId': userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.addressList
        })
      }
    }
  })
})
//设置默认地址
router.post('/address/setDefault', (req, res, next) => {
  let userId = req.cookies.userId,
      addressId = req.body.addressId
  if (!addressId) {
      res.json({
        status: '10003',
        msg: '没有这个地址',
        result: ''
      })
  } else {
    User.findOne({'userId': userId}, (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      } else {
        if (doc) {
          let addressList = doc.addressList
          addressList.forEach((item) => {
            if (item.addressId == addressId) {
              item.isDefault = true
            } else {
              item.isDefault = false
            }
          })
          doc.save((err1, doc1) => {
            if (err1) {
              res.json({
                status: '1',
                msg: err1.message,
                result: ''
              })
            } else {
              if (doc1) {
                res.json({
                  status: '0',
                  msg: '',
                  result: ''
                })
              }
            }
          })
        }
      }
    })
  }
})
//删除地址
router.post('/address/delAddress', (req, res, next) => {
  let userId = req.cookies.userId,
      addressId = req.body.addressId
  User.update({userId: userId}, {$pull: {'addressList': {'addressId': addressId}}}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '删除地址成功',
          result: 'suc'
        })
      }
    }
  })
})
//生成订单
router.post('/payment', (req, res, next) => {
  let userId = req.cookies.userId,
      orderTotal = req.body.orderTotal
      addressId = req.body.addressId
  User.findOne({'userId': userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let address = '',
          goodsList = []
      //获取当前用户的地址信息
      doc.addressList.forEach((item) => {
        if (addressId === item.addressId) {
          address = item
        }
      })
      //获取用户购物车的购买信息
      doc.cartList.filter((item) => {
        if (item.checked === '1') {
          goodsList.push(item)
        }
      })

      let platform = 'lyric'
      let r1 = Math.floor(Math.random() * 10)
      let r2 = Math.floor(Math.random() * 10)
      let sysDate = new Date().Format('yyyyMMddhhmmss')
      let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
      let orderId = platform + r1 + sysDate + r2

      let order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '1',
        createDate: createDate
      }

      doc.orderList.push(order)
      doc.save((err1, doc1) => {
        if (err1) {
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        } else {
          if (doc) {
            res.json({
              status: '0',
              msg: '',
              result: {
                orderId: order.orderId,
                orderTotal: order.orderTotal
              }
            })
          }
        }
      })
    }
  })
})
module.exports = router;
