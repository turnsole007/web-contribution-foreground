<template>
  <div class="chart-container">
    <!-- <el-select class="chart-select" v-model="chartType" placeholder="请选择图表">
      <el-option key="得分变化图" value="得分变化图" label="得分变化图"/>
      <el-option key="周得分图" value="周得分图" label="周得分图"/>
    </el-select> -->
    <el-option key="得分变化图" value="得分变化图" label="得分变化图"/>
    <div :id="id" :class="className" :style="{height:height,width:width}"/>
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from '../assets/js/resize'
import axios from 'axios'
import { formatDate } from '@/utils/date.js'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'weekScoreChart'
    },
    id: {
      type: String,
      default: 'weekScoreChart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data () {
    return {
      chart: null,
      weekContrb: {},
      error: {},
      chartType: '',
      // optionOfWeekChart: {},
      optionOfTotalChart: {}
    }
  },
  mounted () {
    this.getWeekContrb()
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  /* watch: {
    chartType (val, oldVal) {
      window.console.log('chartType', val)
      if (val === '周得分图') {
        // 解决图标切换时数据跳变
        this.chart.clear()// 先清掉图表，再重绘图表
        this.chart.setOption(this.optionOfWeekChart, true)// 设置为true可以是图表切换数据时重新渲染
      } else {
        this.chart.clear()
        this.chart.setOption(this.optionOfTotalChart, true)
      }
    }
  }, */
  methods: {
    getWeekContrb () {
      var path = '/api/contrbscore/getweekscore'
      if (JSON.stringify(this.$route.params).search('username') !== -1) {
        path = path + '?username=' + this.$route.params.username
      }
      axios.get(path)
        .then(Response => {
          // window.console.log(Response)
          if (Response.data.indexOf('errors') === -1) {
            this.weekContrb = JSON.parse(Response.data)
            this.initChart()
          } else {
            this.error = JSON.parse(Response.data)
          }
        })
        .catch(error => console.log(error))
    },
    initChart () {
      // var str = JSON.stringify(this.weekContrb)
      // window.console.log('weekContrb2' + str)
      this.initOption()
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption(this.optionOfTotalChart)
    },
    initOption: function () {
      // 构建数据数组
      this.weekContrb.sort((a, b) => a.commit_timestap - b.commit_timestap)
      /* const dataOfWeekChart = {
        xData: [],
        arrCodescore: [],
        arrIssuescore: [],
        arrTotalscore: []
      } */
      const dataOfTotalChart = {
        xData: [],
        arrCodescore: [],
        arrIssuescore: [],
        arrTotalscore: []
      }
      var temp1 = 0
      // var temp11 = []
      var temp2 = 0
      // var temp22 = []
      var temp3 = 0
      // var temp33 = []
      for (let i in this.weekContrb) {
        // 构建周得分图的数据
        /* dataOfWeekChart.xData.push(this.getFormatDate(this.weekContrb[i].commit_timestap))
        dataOfWeekChart.arrCodescore.push(this.weekContrb[i].codescore)
        dataOfWeekChart.arrIssuescore.push(this.weekContrb[i].issuescore)
        dataOfWeekChart.arrTotalscore.push(this.weekContrb[i].codescore + this.weekContrb[i].issuescore) */
        // 构造得分图的数据
        dataOfTotalChart.xData.push(this.getFormatDate(this.weekContrb[i].commit_timestap))
        temp1 += Math.round(this.weekContrb[i].codescore)
        dataOfTotalChart.arrCodescore.push(temp1)
        temp2 += Math.round(this.weekContrb[i].issuescore)
        dataOfTotalChart.arrIssuescore.push(temp2)
        temp3 += Math.round(this.weekContrb[i].codescore + this.weekContrb[i].issuescore)
        dataOfTotalChart.arrTotalscore.push(temp3)
        // 构造二维数组
        // var date = new Date(this.weekContrb[i].commit_timestap * 1000)
        // temp1 += this.weekContrb[i].codescore
        // temp11 = []
        // temp11.push(date)
        // temp11.push(temp1)
        // dataOfTotalChart.arrCodescore.push(temp11)
        // temp2 += this.weekContrb[i].issuescore
        // temp22 = []
        // temp22.push(date)
        // temp22.push(temp2)
        // dataOfTotalChart.arrIssuescore.push(temp22)
        // temp3 += this.weekContrb[i].codescore + this.weekContrb[i].issuescore
        // temp33 = []
        // temp33.push(date)
        // temp33.push(temp3)
        // dataOfTotalChart.arrTotalscore.push(temp33)
      }
      // this.optionOfWeekChart = {
      //   backgroundColor: '#344b58',
      //   title: {
      //     text: '周得分图',
      //     x: '20',
      //     top: '10',
      //     textStyle: {
      //       color: '#fff',
      //       fontSize: '22'
      //     },
      //     subtextStyle: {
      //       color: '#90979c',
      //       fontSize: '16'
      //     }
      //   },
      //   // 图的类型
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       textStyle: {
      //         color: '#fff'
      //       }
      //     }
      //   },
      //   grid: {
      //     left: '6%',
      //     right: '5%',
      //     borderWidth: 0,
      //     top: 80,
      //     bottom: 95,
      //     textStyle: {
      //       color: '#fff'
      //     }
      //   },
      //   // 图例
      //   legend: {
      //     x: 'center',
      //     top: '14',
      //     textStyle: {
      //       color: '#90979c',
      //       fontSize: '15'
      //     },
      //     data: ['codescore', 'issuescore', 'total']
      //   },
      //   calculable: true,
      //   // x坐标轴
      //   xAxis: [{
      //     type: 'category',
      //     axisLine: {
      //       lineStyle: {
      //         color: '#90979c'
      //       }
      //     },
      //     splitLine: {
      //       show: false
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     splitArea: {
      //       show: false
      //     },
      //     axisLabel: {
      //       interval: 'auto'
      //       // 每隔4个显示一个label,解决x轴过密导致显示不全
      //       /* formatter: function (params, index) {
      //         if (index % 4 === 0) {
      //           return params
      //         } else {
      //           return ''
      //         }
      //       } */
      //     },
      //     data: dataOfWeekChart.xData
      //   }],
      //   yAxis: [{
      //     type: 'value',
      //     splitLine: {
      //       show: false
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: '#90979c'
      //       }
      //     },
      //     axisTick: {
      //       show: false
      //     },
      //     axisLabel: {
      //       interval: 0
      //     },
      //     splitArea: {
      //       show: false
      //     }
      //   }],
      //   // 图表缩放
      //   dataZoom: [{
      //     show: true,
      //     height: 25,
      //     xAxisIndex: [
      //       0
      //     ],
      //     bottom: 30,
      //     start: 30,
      //     end: 90,
      //     handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
      //     handleSize: '110%',
      //     handleStyle: {
      //       color: '#d3dee5'

      //     },
      //     textStyle: {
      //       color: '#fff' },
      //     borderColor: '#90979c'

      //   }, {
      //     type: 'inside',
      //     show: true,
      //     height: 15,
      //     start: 1,
      //     end: 35
      //   }],
      //   series: [{
      //     name: 'codescore',
      //     type: 'bar',
      //     stack: 'total',
      //     barMaxWidth: 35,
      //     barGap: '10%',
      //     itemStyle: {
      //       normal: {
      //         color: 'rgba(255,144,128,1)',
      //         label: {
      //           show: true,
      //           textStyle: {
      //             color: '#fff'
      //           },
      //           position: 'insideTop',
      //           formatter  (p) {
      //             return p.value > 0 ? p.value : ''
      //           }
      //         }
      //       }
      //     },
      //     data: dataOfWeekChart.arrCodescore
      //   },
      //   {
      //     name: 'issuescore',
      //     type: 'bar',
      //     stack: 'total',
      //     itemStyle: {
      //       normal: {
      //         color: 'rgba(0,191,183,1)',
      //         barBorderRadius: 0,
      //         label: {
      //           show: true,
      //           position: 'top',
      //           formatter (p) {
      //             return p.value > 0 ? p.value : ''
      //           }
      //         }
      //       }
      //     },
      //     data: dataOfWeekChart.arrIssuescore
      //   },
      //   {
      //     name: 'total',
      //     type: 'line',
      //     stack: 'total',
      //     symbolSize: 3,
      //     symbol: 'circle',
      //     itemStyle: {
      //       normal: {
      //         color: 'rgba(252,230,48,1)',
      //         barBorderRadius: 0,
      //         label: {
      //           show: true,
      //           position: 'top',
      //           formatter (p) {
      //             return p.value > 0 ? p.value : ''
      //           }
      //         }
      //       }
      //     },
      //     data: dataOfWeekChart.arrTotalscore
      //   }
      //   ]
      // }
      this.optionOfTotalChart = {
        backgroundColor: '#344b58',
        title: {
          text: '得 分 变 化 图',
          x: '20',
          top: '10',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        // 图的类型
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }/* ,
          formatter: function (value) {
            // 这里的value[2].value就是我需要每次显示在图上的数据
            if (value[2].value <= 0) {
              value[2].value = '0'
            } else {
              var k = 1000
              var sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
              // 这里是取自然对数，也就是log（k）（value[2].value），求出以k为底的多少次方是value[2].value
              var c = Math.floor(Math.log(value[2].value) / Math.log(k))
              value[2].value = (value[2].value / Math.pow(k, c)).toPrecision(3) + ' ' + sizes[c]
            }
            // 这里的value[2].name就是每次显示的name
            return value[2].name + value[2].value
          } */
        },
        grid: {
          left: '6%',
          right: '5%',
          borderWidth: 0,
          top: 80,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        // 图例
        legend: {
          x: 'center',
          top: '14',
          textStyle: {
            color: '#90979c',
            fontSize: '15'
          },
          data: ['codescore', 'issuescore', 'total']
        },
        calculable: true,
        // x坐标轴
        xAxis: [{
          type: 'category',
          // type: 'time',
          // min: new Date('2019/01/01'),
          // max: new Date('2019/12/31'),
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          // 坐标轴刻度标签的相关设置
          axisLabel: {
            interval: 'auto'
            // 每隔5个显示一个label
            /* formatter: function (params, index) {
              if (index % 4 === 0) {
                return params
              } else {
                return ''
              }
            } */
          },
          data: dataOfTotalChart.xData
        }],
        yAxis: [{
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            // interval: 0
            formatter: function (value) {
              var txt = []
              /* if (value >= 1000 && value <= 10000) {
                txt.push(value / 1000 + 'k')
              } else if (value >= 10000) {
                txt.push(value / 10000 + 'w')
              } else {
                txt.push(value)
              } */
              var k = 1000
              var sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
              // 这里是取自然对数，也就是log（k）（value），求出以k为底的多少次方是value
              var c = Math.floor(Math.log(value) / Math.log(k))
              txt.push((value / Math.pow(k, c)) + ' ' + sizes[c])
              return txt
            }
          },
          splitArea: {
            show: false
          }
        }],
        // 图表缩放
        dataZoom: [{
          show: true,
          height: 20,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 90,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [{
          name: 'codescore',
          type: 'line',
          symbolSize: 3,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              barBorderRadius: 0,
              label: {
                show: false,
                position: 'top',
                formatter (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: dataOfTotalChart.arrCodescore
        },
        {
          name: 'issuescore',
          type: 'line',
          symbolSize: 3,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: false,
                position: 'top',
                formatter (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: dataOfTotalChart.arrIssuescore
        },
        {
          name: 'total',
          type: 'line',
          stack: 'total', // 折线图堆叠,后一条折线图的数据等于stack值相同的前一条折线数据+本身数据
          // smooth: true,
          symbolSize: 3,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: false,
                position: 'top',
                formatter (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: dataOfTotalChart.arrTotalscore
        }
        ]
      }
    },
    getFormatDate (timeStamp) {
      var date = new Date(timeStamp * 1000)
      // window.console.log(date)
      return formatDate(date, 'yyyy.MM.dd')
    }
  }
}
</script>

<style scoped>
.chart-container {
  height: 500px;
  margin-top: 40px;
}
.chart-select {
  margin: 20px;
  display: inline-block;
  vertical-align: middle;
}
</style>
