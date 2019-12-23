<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
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
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data () {
    return {
      chart: null,
      weekContrb: {},
      error: {}
    }
  },
  mounted () {
    this.getWeekContrb()
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
    getWeekContrb () {
      var path = '/api/contrbscore/getweekscore'
      axios.get(path)
        .then(Response => {
          window.console.log(Response)
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
      var str = JSON.stringify(this.weekContrb)
      window.console.log('weekContrb2' + str)
      this.weekContrb.sort((a, b) => a.commit_timestap - b.commit_timestap)
      const xData = []
      const arrCodescore = []
      const arrIssuescore = []
      const arrTotalscore = []
      for (let i in this.weekContrb) {
        xData.push(this.getFormatDate(this.weekContrb[i].commit_timestap))
        arrCodescore.push(this.weekContrb[i].codescore)
        arrIssuescore.push(this.weekContrb[i].issuescore)
        arrTotalscore.push(this.weekContrb[i].codescore + this.weekContrb[i].issuescore)
      }
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: '#344b58',
        title: {
          text: '成绩变化图',
          x: '20',
          top: '20',
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
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: 150,
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        // 图例
        legend: {
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['codescore', 'issuescore', 'total']
        },
        calculable: true,
        // x坐标轴
        xAxis: [{
          type: 'category',
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
          axisLabel: {
            interval: 0

          },
          data: xData
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
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        // 图表缩放
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 10,
          end: 80,
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
          type: 'bar',
          stack: 'total',
          barMaxWidth: 35,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: 'rgba(255,144,128,1)',
              label: {
                show: true,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter  (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: arrCodescore
        },
        {
          name: 'issuescore',
          type: 'bar',
          stack: 'total',
          itemStyle: {
            normal: {
              color: 'rgba(0,191,183,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: arrIssuescore
        },
        {
          name: 'total',
          type: 'line',
          stack: 'total',
          symbolSize: 3,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: 'rgba(252,230,48,1)',
              barBorderRadius: 0,
              label: {
                show: true,
                position: 'top',
                formatter (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: arrTotalscore
        }
        ]
      })
    },
    getFormatDate (timeStamp) {
      var date = new Date(timeStamp * 1000)
      // window.console.log(date)
      return formatDate(date, 'yyyy.MM.dd')
    }
  }
}
</script>
