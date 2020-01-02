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
      <div class="card-container">
        <el-row type="flex" justify="space-around">
          <!-- <el-col :span="6" v-for="o in 3" :key="o">
            <el-card :body-style="{ padding: '0px'}">
              <img src="../assets/picture/wenyan-lang.png" class="img">
              <div style="padding: 14px;">
                <span>文言文编程语言来了，可是好像比英文更难写了！该语言名为“文言（wenyan-lang）”，这是一门采用文言文输入的编程语言，该语言不包括英文字符，仅包含繁体中文字符，并保留繁体引号「」。</span>
                <div class="bottom clearfix">
                  <a href="https://www.oschina.net/news/112175/wenyan-lang?utm_source=wechat&utm_medium=zaobao">详情请戳</a>
                </div>
              </div>
            </el-card>
          </el-col> -->
          <el-col :span="8">
            <el-card class="el-card-news" :body-style="{ padding: '0px'}">
              <div class="news_title">通知公告</div>
              <div v-for="(event, index) in events" :key="index">
                <div class="news">
                  <!-- {{event}} -->
                  <!-- <div class="msg_type"> msg_type:{{event.msg_type}} </div> -->
                  <div class="msg"> {{event.msg}}</div>
                  <!-- <div class="time"> timestamp:{{event.timestamp}}</div> -->
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="el-card-news" :body-style="{ padding: '0px'}">
              <img src="../assets/picture/wenyan-lang.png" class="img">
              <div style="padding: 14px;">
                <span>文言文编程语言来了，可是好像比英文更难写了！该语言名为“文言（wenyan-lang）”，这是一门采用文言文输入的编程语言，该语言不包括英文字符，仅包含繁体中文字符，并保留繁体引号「」。</span>
                <div class="bottom clearfix">
                  <a href="https://www.oschina.net/news/112175/wenyan-lang?utm_source=wechat&utm_medium=zaobao" target="_blank">详情请戳</a>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="el-card-news" :body-style="{ padding: '0px'}">
              <img src="../assets/picture/wenyan-lang.png" class="img">
              <div style="padding: 14px;">
                <span>开源推动者与 Android 专家 Jack Wallen 近日发表了一篇文章，预测了未来的开源局势，他认为 2020 年的开源前途一片光明。他从六个方面进行了总结，包括Deepin Linux 将改变开源格局、等。</span>
                <div class="bottom clearfix">
                  <a href="https://www.oschina.net/news/112177/open-source-in-2020-the-future-looks-bright?utm_source=wechat&utm_medium=zaobao" target="_blank">详情请戳</a>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="item-container">
      <div class="item-title">about us</div>
      <div class="line_fenge"></div>
      <div class="card-container">
        <el-row type="flex" justify="space-around">
          <el-col :span="6" v-for="o in 3" :key="o">
            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 16px;">
                <li>愿景：为您展示可靠的开源项目贡献度</li>
                <li>价值观：多元化、创造力、公平性</li>
              </div>
            </el-card>
          </el-col>
        </el-row>
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
  },
  beforeDestroy () {
    clearInterval(this.intervalid)
  },
  methods: {
    getEvents: function () {
      axios.get('/api/event')
        .then(Response => {
          window.console.log(Response)
          if (Response.data.indexOf('errors') === -1) {
            this.events = JSON.parse(Response.data)
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

.card-container {
  /* margin: 25px 10px; */
  margin: 3% 10px;
  text-align: left;

  .el-card-news {
    height: 300px;
    border: 1px dotted rgb(206, 207, 209);
  }

  a {
  float: right;
  font-size: 14px;
  }

  a:hover {
    color: rgb(27, 135, 230);
  }

  .news_title {
    font-size: 17px;
    padding: 5px 5px 5px 10px;
  }

  .news {
    margin:0 5px 5px 5px;
    border: 1px solid #545c64;
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

</style>
