<template>
  <div class="hello">
    <nav class="navbar-wrapper">
      <ul>
        <li v-for="item in navList" class="nav-item">
          <router-link to="/">{{item}}</router-link>
        </li>
      </ul>
    </nav>
    <div class="banner">
      <img src="../assets/banner-1.jpg">
    </div>
    <nav class="navbar-expand">
      <div class="phone-viewport">
        <md-list>
          <md-list-item v-for='parent in navListExpand'>
            <span class="parent">{{parent.parent}}</span>
            <md-list-expand>
              <md-list>
                <md-list-item v-for='child in parent.child' class="child">{{child}}</md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
        </md-list>
      </div>
    </nav>
    <section class="gallery-wrapper">
      <md-layout>
        <md-layout><img src="../assets/banner-2.jpg" class="gallery-header"></md-layout>
      </md-layout>

      <md-layout>
        <md-layout>
          <div class="gallery">
            <img src="../assets/img.png">
            <div class="desc">
              <h1>121212121212</h1>
              <h2>2121212121</h2>
            </div>
          </div>
        </md-layout>
        <md-layout>
          <div class="gallery">
            <img src="../assets/img.png">
            <div class="desc">
              <h1>121212121212</h1>
              <h2>2121212121</h2>
            </div>
          </div>
        </md-layout>
      </md-layout>

      <md-layout>
        <md-layout>
          <div class="gallery">
            <img src="../assets/img.png">
            <div class="desc">
              <h1>121212121212</h1>
              <h2>2121212121</h2>
            </div>
          </div>
        </md-layout>
        <md-layout>
          <div class="gallery">
            <img src="../assets/img.png">
            <div class="desc">
              <h1>121212121212</h1>
              <h2>2121212121</h2>
            </div>
          </div>
        </md-layout>
      </md-layout>
    </section>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      navList: ['全部', 'T恤', '夹克', '卫衣', '衬衫', '风衣', '裤子', '鞋子', '其他'],
      navListExpand: [
        {
          parent: '利元亨',
          child: ['公司简介', '发展历程', '企业文化', '合作伙伴', '联系我们']
        },
        {
          parent: '行业解决方案',
          child: ['新能源领域装备', '汽车领域装备', '精密电子领域装备', '五金锁业领域装备', '安防领域装备', '精品包装领域装备', '整体解决方案定制']
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
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$pink: #ee9db3;
@keyframes move {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}
  .hello {
    .navbar-wrapper {
      flex: 1;
      background: #fff;
      font-size: 0;
      text-align: center;
      li {
        display: inline-block;
        padding: 5px 15px;
        a {
          text-decoration: none;
          font-size: 15px;
          font-weight: 700;
          font-family: '微软雅黑';
          color: #4d4d4d;
          &:before {
            content: "<";
            padding-right: 5px;
            visibility: hidden;
          }
          &:after {
            content: ">";
            padding-left: 5px;
            visibility: hidden;
          }
          &:hover {
            color: $pink;
            &:before {
              visibility: visible;
            }
            &:after {
              visibility: visible;
            }
          }
        }
      }
    }

    .banner {
      width: 100%;
      height: 550px;
      img {
        width: inherit;
        height: inherit;
      }
    }

    .navbar-expand {
      position: fixed;
      top: 300px;
      left: 150px;
      width: 250px;
      height: auto;
      font-family: "微软雅黑";
      box-shadow: 2px 2px 4px #eee;
      .parent {
        font-weight: 700;
        font-size: 15px;
        .child {
          font-size: 12px;
        }
      }
    }
    .gallery-wrapper {
      padding: 15px 150px 15px 550px;
      width: 100%;
      box-sizing: border-box;
      .gallery-header {
        padding: 0 20px;
        width: 100%;
        height: 250px;
      }
      .gallery {
        position: relative;
        padding: 20px;
        width: 100%;
        height: 500px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
          .desc {
            display: block;
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
        .desc {
          position: absolute;
          left: 100px;
          bottom: 100px;
          padding: 20px;
          border-radius: 10px;
          background: rgba(255, 255, 255, .5);
          animation: move .3s ease-in;
          display: none;
          &:before {
            content: '';
            position: absolute;
            left: -30px;
            bottom: 20px;
            width: 0;
            height: 0;
            border-top: 15px solid rgba(255, 255, 255, 0);
            border-right: 15px solid rgba(255, 255, 255, .5);
            border-bottom: 15px solid rgba(255, 255, 255, 0);
            border-left: 15px solid rgba(255, 255, 255, 0);
          }
          h1 {
            padding: 10px;
            font-size: 30px;
            font-weight: 700;
          }
          h2 {
            padding: 10px;
            font-size: 25px;
            font-weight: 500;
          }
        }
      }
    }
  }
</style>
