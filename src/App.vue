<template>
  <div id="app">
    <header class="header">
      <div class="homepage-wrapper">
        <h1 title="Material首页"><router-link to="/">Material</router-link></h1>
      </div>

      <span style="flex:1"></span>

      <div class="search-wrapper">
        <input type="text" name="search">
        <a href="#"><i class="fa fa-search"></i></a>
      </div>

      <div class="login-wrapper" v-show="!isLoginFlag">
        <md-dialog md-open-from="#login" md-close-to="#login" ref="dialog-login">
          <md-dialog-title>登录</md-dialog-title>

          <md-dialog-content>
            <form>
              <md-input-container>
                <md-icon md-iconset="fa fa-user"></md-icon>
                <label>账号</label>
                <md-input type="text" v-model="userName" required></md-input>
              </md-input-container>
              <md-input-container>
                <md-icon md-iconset="fa fa-lock"></md-icon>
                <label>密码</label>
                <md-input type="password" v-model="userPwd" required></md-input>
              </md-input-container>
            </form>
            <span style="color:red;font-size：12px" v-show="errorTip">账号或密码错误！</span>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-accent" @click="closeDialog('dialog-login')">取消</md-button>
            <md-button class="md-accent" @click="login('dialog-login')">确认</md-button>
          </md-dialog-actions>
        </md-dialog>

        <md-dialog md-open-from="#register" md-close-to="#register" ref="dialog-register">
          <md-dialog-title>注册</md-dialog-title>

          <md-dialog-content>
            <form>
              <md-input-container>
                <label>邮箱地址</label>
                <md-input type="text" required></md-input>
              </md-input-container>
              <md-input-container>
                <label>密码</label>
                <md-input type="password" required></md-input>
              </md-input-container>
              <md-input-container>
                <label>重复密码</label>
                <md-input type="password" required></md-input>
              </md-input-container>
            </form>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-accent" @click="closeDialog('dialog-register')">取消</md-button>
            <md-button class="md-accent" @click="closeDialog('dialog-register')">提交</md-button>
          </md-dialog-actions>
        </md-dialog>

        <a href="#" id="login" title="登录" @click="openDialog('dialog-login')">登录</a>
        /
        <a href="#" id="register" title="注册" @click="openDialog('dialog-register')">注册</a>
      </div>

      <div class="user-wrapper" v-show="isLoginFlag">
        <md-avatar>
          <img src="./assets/lu.jpg" alt="Avatar">
        </md-avatar>
        <span style="color:#fff">{{nickName}}</span>
        <span style="color:#fff"><a @click="logout()">登出</a></span>
      </div>

      <div class="cart-wrapper" v-show="isLoginFlag">
        <span><a @click="showCart">CART</a></span>
        <span class="count" v-show="cartCount > 0">{{cartCount}}</span>
      </div>
    </header>

    <section class="progress">
      <md-progress class="md-accent" md-indeterminate></md-progress>
    </section>

    <section class="breadcrumbs" v-show="breadcrumbsFlag">
      <ul>
        <li v-for="item in breadcrumbs" class="bread"><a href="#">{{item}}</a></li>
      </ul>
    </section>

    <section class="router-wrapper">
      <router-view></router-view>
    </section>

    <footer class="footer">
      <div class="content">
        <md-layout>
          <md-layout v-for="item in footerList">
            <ul>
              <h4>{{item.parent}}</h4>
              <ul>
                <li v-for="child in item.child" class="child">{{child}}</li>
              </ul>
            </ul>
          </md-layout>
          <md-layout md-flex="30">
            <!-- <form> -->
              <h1 class="title">联系我们</h1>
              <md-input-container>
                <label>邮箱地址</label>
                <md-input type="text"></md-input>
              </md-input-container>
              <md-input-container>
                <label>填写内容</label>
                <md-textarea maxlength="100"></md-textarea>
              </md-input-container>
              <md-button class="md-raised md-dense">发送</md-button>
            <!-- </form> -->
          </md-layout>
        </md-layout>
      </div>
      <div class="copy">
        LU & CNsusu &copy; 1021008256@qq.com
      </div>
    </footer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import {mapState} from 'vuex'

  Vue.use(axios)

  export default {
    name: 'app',
    data() {
      return {
        isLoginFlag: false,
        footerList: [
          {
            parent: 'PRODUCT',
            child: ['site builder', 'shopping cart software', 'marketing tools', 'pricing', 'credit card processing', 'ssl certificates', 'all features']
          },
          {
            parent: 'COMPANY',
            child: ['about', 'careers', 'customers', 'experts', 'marketplace', 'developers', 'brand kit']
          },
          {
            parent: 'RESOURCES',
            child: ['blog', 'guides', 'how to sell products', 'online', 'how to start an online', 'store']
          },
          {
            parent: 'GET HELP',
            child: ['1.800.646.3517', 'help center', 'contact us', 'become a partner']
          }
        ],
        breadcrumbs: ['首页', '购物车', '支付中心'],
        breadcrumbsFlag: false,
        // name: '',
        userName: '',
        userPwd: '',
        errorTip: false
      }
    },
    mounted() {
      this.checkLogin()
    },
    computed: {
      ...mapState(['nickName', 'cartCount'])
      // name() {
      //   return this.$store.state.nickName
      // },
      // cartCount() {
      //   return this.$store.state.cartCount
      // }
    },
    methods: {
      showCart() {
        this.$router.push({
          path: '/shoppingCart'
        })
      },
      getCartCount() {
        axios.get('/users/getCartCount').then((res) => {
          if (res.data.status === '0') {
            this.$store.commit('updateCartCount', res.data.result.cartCount)
          }
        })
      },
      openDialog(ref) {
        this.$refs[ref].open()
      },
      closeDialog(ref) {
        this.$refs[ref].close()
      },
      login(ref) {
        axios.post('/users/login', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then((res) => {
          if (res.data.status === '0') {
            this.errorTip = false
            this.isLoginFlag = true
            // this.name = res.data.result.userName
            this.$store.commit('updateUserInfo', res.data.result.userName)
            this.getCartCount()
            this.closeDialog(ref)
          } else {
            this.errorTip = true
          }
        })
      },
      logout() {
        axios.post('users/logout').then((res) => {
          if (res.data.status === '0') {
            this.isLoginFlag = false
            // this.name = ''
            this.$store.commit('updateUserInfo', '')
          }
        })
      },
      checkLogin() {
        axios.get('users/checkLogin').then((res) => {
          if (res.data.status === '0') {
            this.$store.commit('updateUserInfo', res.data.result.userName)
            this.isLoginFlag = true
            this.getCartCount()
          }
        })
      }
    }
  }
</script>

<style lang="scss">
$pink: #ee9db3;
$cho: #4d4d4d;
@font-face {
    font-family: Righteous;
    src: url('./common/font/Righteous-Regular.ttf');
}
@keyframes twinkle {
  0% {
    box-shadow: none;
  }
  50% {
    box-shadow: -1px 0 10px #fff,
                0 -1px 10px #fff,
                0 1px 10px #fff,
                1px 0 10px #fff;
  }
  100% {
    box-shadow: none;
  }
}

body, html {
  /*background: #eee;*/
  // background: #e6f1ee;
}
#app {
  display: flex;
  flex-flow: column;
  margin: 0 auto;
  width: 100%;
  min-height: 100%;
  background: #fff;
  font-family: 'Righteous', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .router-wrapper {
    flex: 1;
  }
  .header {
    display: flex;
    padding: 0 50px;
    width: 100%;
    max-height: 50px;
    line-height: 50px;
    background: $pink;
    box-sizing: border-box;
    .homepage-wrapper {
      h1 {
        a {
          font-size: 35px;
          color: #fff;
          font-weight: 700;
          text-decoration: none;
          text-shadow: 2px 5px 5px #fff;
          transition: all .4s;
          &:hover {
            text-shadow: none;
          }
        }
      }
    }
    .search-wrapper {
      position: relative;
      margin-right: 15px;
      input {
        padding: 5px 15px 5px 5px;
        color: #fff;
        font-size: 15px;
        border: none;
        border-bottom: 1px solid #fff;
        background: $pink;
        transition: border .3s;
        &:focus {
          border-bottom: 3px solid #fff;
        }
      }
      a {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 15px;
        color: #fff;
      }
    }
    .cart-wrapper {
      margin-left: 15px;
      color: #fff;
      .count {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 2px solid #fff;
        border-radius: 50%;
        animation: twinkle 1s infinite linear;
      }
    }
    .login-wrapper {
      font-family: '微软雅黑';
      color: #fff;
      a {
        padding: 0 10px;
        color: #fff;
        text-decoration: none;
        font-weight: 700;
        text-shadow: 2px 2px 5px #fff;
        transition: all .4s;
        &:hover {
          text-shadow: none;
        }
      }
    }
  }
  .breadcrumbs {
    padding: 10px 150px;
    box-sizing: border-box;
    .bread {
      position: relative;
      display: inline-block;
      padding-right: 15px;
      &:after {
        content: '/';
        position: absolute;
        top: 0;
        right: 3px;
        color: $pink;
      }
      &:last-child {
          &:after {
            content: ''
          }
      }
      a {
        font-size: 13px;
        font-weight: 700;
        color: $pink;
        text-decoration: none;
        &:hover{
          color: #000;
        }
      }
    }
  }
  .footer {
    width: 100%;
    .content {
      padding: 50px 150px;
      box-sizing: border-box;
      h4 {
        padding-bottom: 10px;
        font-size: 20px;
        font-weight: 700;
      }
      .child {
        font-size: 15px;
        color: $pink;
        cursor: pointer;
        &:hover {
          opacity: .7;
        }
      }
      .title {
        font-size: 25px;
        font-weight: 700;
      }
    }
    .copy {
      padding: 5px;
      font-size: 12px;
      text-align: center;
      color: #fff;
      background: $pink;
    }
  }
}
</style>
