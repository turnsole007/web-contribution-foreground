<template>
  <div class="app-container">
    <!-- 图片轮播 -->
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="(img,index) in imgList" :key="index">
        <img v-bind:src="img.url" class="img">
      </el-carousel-item>
    </el-carousel>
    <!-- news -->
    <div class="item-container">
      <div class="item-title">news</div>
      <div class="line_fenge"></div>
      <div class="news-container">
        <div class="inner-news-area">
          <div class="news_type">站内资讯</div>
          <div class="inner-news">
            <div v-for="(event, index) in events" :key="index">
              <div class="news">
                <!-- {{event}} -->
                <!-- <div class="msg_type"> msg_type:{{event.msg_type}} </div> -->
                <div class="msg"> {{event.msg}}</div>
                <!-- <div class="time"> timestamp:{{event.timestamp}}</div> -->
              </div>
            </div>
          </div>
        </div>
        <div class="out-news-area">
          <div class="news_type">综合资讯</div>
          <div class="out-news">
            <div v-for="(n, index) in news" :key="index">
              <div class="news">
                <router-link class="title" :to="{name:'News',params:{id: n.id, title: n.title, context: n.context, ref: n.ref}}">{{n.title}}</router-link>
                <div class="context"> {{n.context}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="item-container">
      <div class="item-title">about us</div>
      <div class="line_fenge"></div>
      <div class="info-container">
        <div class="info_who">
          <div class="info_title">WHO</div>
          <div class="info">
            <div class="info">我们是</div>
            <h4>中科院计算所前瞻实验室分布式组</h4>
            <p>欢迎大家对我们的网站提出建议≖‿≖✧</p>
            <p>邮箱：</p>
          </div>
        </div>
        <div class="info_what">
          <div class="info_title">WHAT</div>
          <div class="info">开源项目贡献度
            <li>1.面向高校老师和学生</li>
            <li>2.基于Github的参与度进行评分</li>
            <li>3.对Github上的行为进行统计分析</li>
            <li>4.生成周参与度报告</li>
          </div>
        </div>
        <div class="info_why">
          <div class="info_title">WHY</div>
          <div class="info">为什么我们想做这个网站？
            <li>首先开源项目含金量愈来愈高，而且开源项目可以为高校学生理解和掌握知识提供实战参考。</li>
            <li>Github作为最大的开源项目聚集地，开源项目的数目多、质量高。</li>
            <li>希望通过这个网站，使老师对学生的开源代码方面有更加直观的了解，进而对学生的能力有更全面的评估。</li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Index',
  data () {
    return {
      imgList: [
        {url: require('../assets/picture/1.png')},
        {url: require('../assets/picture/2.png')},
        // {url: require('../assets/picture/3.png')},
        {url: require('../assets/picture/4.png')}
      ],
      events: {},
      news: {},
      error: {},
      intervalid: ''
    }
  },
  created () {
    this.intervalid = setInterval(() => {
      this.getEvents()
    }, 20000)
  },
  mounted () {
    this.getEvents()
    this.getNews()
  },
  beforeDestroy () {
    clearInterval(this.intervalid)
  },
  methods: {
    getEvents: function () {
      axios.get('/api/event')
        .then(Response => {
          // window.console.log(Response)
          if (Response.data.indexOf('errors') === -1) {
            this.events = JSON.parse(Response.data)
          } else {
            this.error = JSON.parse(Response.data)
          }
        })
        .catch(error => console.log(error))
    },
    getNews: function () {
      axios.get('api/event/news')
        .then(Response => {
          // window.console.log(Response)
          if (Response.data.indexOf('errors') === -1) {
            this.news = JSON.parse(Response.data)
          } else {
            this.error = JSON.parse(Response.data)
          }
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.img {
  width: 100%;
  height: 100%;
  display: block;
}
.item-container {
  text-align: center;

  .line_fenge {
    height: 2px;
    margin-left: 45%;
    width: 10%;
    background: rgb(5, 67, 124);
  }
  .item-title {
    font-size: 28px;
    margin: 5px;
    color: rgb(35, 134, 226);
  }
}

.news-container {
  /* margin: 25px 10px; */
  margin: 1% 4% 2% 4%;
  text-align: left;
  position: relative;
  height: 300px;
  color: #062647;

  .news_type {
    font-size: 18px;
    color: black;
    font-weight: bold;
    padding: 5px;
  }

  .inner-news-area {
    position: absolute;
    width: 40%;

    .inner-news {
      height: 300px;
      padding: 10px;
      overflow-y: scroll;

      .news {
        margin-bottom:5px;
        border: 1px dotted #90959b;
        border-radius: 5px;
        padding: 5px;

        // .msg_type {
        //   font-size: 12px;
        // }

        .msg {
          font-size: 15px;
        }

        .time {
          font-size: 12px;
          margin-right: 0px;
        }
      }
    }
  }

  .out-news-area {
    position: absolute;
    margin-left: 44%;
    width: 56%;

    .out-news {
      height: 300px;
      padding: 10px;
      overflow-y: scroll;

      .news {
        margin-bottom:5px;
        border: 1px dotted #90959b;
        border-radius: 5px;
        padding: 5px;

        .title {
          font-size: 15px;
          font-weight: bold;
        }

        .context {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;//行数
          -webkit-box-orient: vertical;
        }

        a:hover {
          color: rgb(84, 164, 235);
        }
      }
    }
  }
}
/* .el-carousel__item h3 {
  color: #05080c;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #176ce2;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: rgb(165, 49, 49);
} */
.info-container {
  margin: 2% 4%;
  text-align: center;
  position: relative;
  height: 300px;

  .info_who {
    width: 30%;
    height: 300px;
    // position + margin-left 实现同行布局且缩放时不会换行
    position: absolute;
    padding: 10px;
    background: url("../assets/picture/bg1.png") no-repeat scroll 100% 100%;
    background-size: auto;
    background-size: cover;
  }

  .info_what {
    width: 30%;
    height: 300px;
    margin-left: 34.5%;
    padding: 10px;
    background: url("../assets/picture/bg2.png") no-repeat scroll 100% 100%;
    background-size: auto;
    background-size: cover;
    position: absolute;
  }
  .info_why {
    width: 30%;
    height: 300px;
    margin-left: 70%;
    padding: 10px;
    background: url("../assets/picture/bg3.png") no-repeat scroll 100% 100%;
    background-size: auto;
    background-size: cover;
    position: absolute;
  }
  .info_title {
    padding-top: 10px;
    font-size: 22px;
    color: #fff;
    text-shadow: 2px 2px 2px black;
  }
  .info {
    text-align: left;
    padding-left: 20px;
    padding-top:20px;

    p {
      font-size: 14px;
    }

    li {
      padding: 5px 20px 0px 0px;
      font-size: 15px;
    }
  }
}

</style>
