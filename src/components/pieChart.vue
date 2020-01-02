<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
import resize from '../assets/js/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'pieChart'
    },
    id: {
      type: String,
      default: 'pieChart'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    }
  },
  data () {
    return {
      chart: null,
      repoContrb: {},
      error: {}
    }
  },
  mounted () {
    this.getUserContrbScore()
    // this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getUserContrbScore () {
      let path = '/api/contrbscore'
      if (JSON.stringify(this.$route.params).search('username') !== -1) {
        path = path + '?username=' + this.$route.params.username
      }
      axios.get(path)
        .then(Response => {
          window.console.log(Response)
          if (Response.status === 200) {
            this.repoContrb = JSON.parse(Response.data)
            this.initChart()
          } else {
            this.error = Response.error
          }
        })
        .catch(error => console.log(error))
    },
    initChart () {
      // var str = JSON.stringify(this.weekContrb)
      // window.console.log('weekContrb2' + str)
      // this.weekContrb.sort((a, b) => a.commit_timestap - b.commit_timestap)
      const Data = []
      var item = {}
      for (let i in this.repoContrb.contrbdetail) {
        item = {}
        // 计算成绩
        item.value = this.repoContrb.contrbdetail[i].AddCodeLine + this.repoContrb.contrbdetail[i].DelCodeLine * 0.01 + this.repoContrb.contrbdetail[i].IssueContrb
        if (item.value === 0) { continue }
        item.name = this.repoContrb.contrbdetail[i].RepoName
        Data.push(item)
      }
      window.console.log(JSON.stringify(Data))
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: '#2c343c',

        title: {
          text: '仓库贡献度',
          left: 20,
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },

        // visualMap: {
        //   show: false,
        //   min: 0,
        //   max: 60000,
        //   inRange: {
        //     colorLightness: [0, 1]
        //   }
        // },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            // data: [
            //   {value: 335, name: '直接访问'},
            //   {value: 310, name: '邮件营销'},
            //   {value: 274, name: '联盟广告'},
            //   {value: 235, name: '视频广告'},
            //   {value: 400, name: '搜索引擎'}
            // ].sort(function (a, b) { return a.value - b.value }),
            data: Data.sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: '#B68814',
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
              return Math.random() * 200
            }
          }]
      })
    }
  }
}
</script>
