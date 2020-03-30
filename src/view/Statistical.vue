<template>
  <div class="layer">
    <el-button type="info" @click="back">返回</el-button>
    <div class="statistical" v-loading='loading'>
      <div class="deposit">
        <div class="deposit-charts">
          <div style="text-align:center">
            <span>借阅统计-按时间</span>
            <lineChart :lienList="lendcount"></lineChart>
            <span>借阅统计-按学校</span>
            <barChart :barData="barData"></barChart>
          </div>
        </div>
        <div class="deposit-table" style="text-align:center">
           <span >借阅统计-最受欢迎图书</span>
          <el-table  :data="bookcaseTable" border style="width: 100%;margin-top:20px;">
            <el-table-column prop="title" label="书名"></el-table-column>
            <el-table-column prop="marc_id" label="ISBN"></el-table-column>
            <el-table-column prop="lendcount" label="借阅次数"></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="borrowing">
        <div class="borrowinginfo" style="text-align:center">
          <span>押金统计</span>
          <div class="info">
            <div>
              <span>总押金</span>
              <p>{{Math.ceil(deposit)}}</p>
            </div>
            <div>
              <span>退款</span>
              <p>{{Math.ceil(channel)}}</p>
            </div>
          </div>
        </div>
        <div class="borrowingchart">
          <lineChart height="400px" style="margin-top:40px" :lienList="depositcount" tit='押金'></lineChart>
          <lineChart height="400px" style="margin-top:40px" :lienList="channelcount" tit='退款'></lineChart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from '@/api/Statistical'
import lineChart from '@/components/Charts/LineChart'

import pieChart from '@/components/Charts/PieScienceChart'
import barChart from '@/components/Charts/barChart'
import $ from 'jquery'
export default {
  name: 'Statistical',
  components: {
    pieChart,
    barChart,
    lineChart
  },
  data () {
    return {
      lendcount: { countVal: [], countYear: [] },
      barData: { xData: [], yData: [] },
      chartData: [
        { name: 'ada', count: 5 },
        { name: 'ada', count: 6 },
        { name: 'ada', count: 7 },
        { name: 'ada', count: 8 }
      ],
      bookcaseTable: [],
      depositcount: { countVal: [], countYear: [] },
      channelcount: { countVal: [], countYear: [] },
      deposit: 0,
      channel: 0,
      loading: false
    }
  },
  methods: {
    back () {
      this.$router.push({
        path: '/'
      })
    },
    getData () {
      let that = this
      this.loading = true
      let data = {
        p: '115533',
        access_token: 'ecbbeee3af52a5c92d04de31c969636d',
        type: 2
      }
      $.ajax({
        type: 'post',
        url: 'http://118.31.23.47:12480/api/manage/countinfo',
        data: data,
        dataType: 'json',
        success: function (res) {
          that.loading = false
          res.data.data.time_data.forEach((item, index) => {
            that.lendcount.countVal.push(item.lendcount)
            that.lendcount.countYear.push(item.day)
            that.depositcount.countVal.push(item.depositcount)
            that.depositcount.countYear.push(item.day)
            that.channelcount.countVal.push(item.channelcount)
            that.channelcount.countYear.push(item.day)
          })
          res.data.data.school_data.forEach((item, index) => {
            that.barData.xData.push(item.name)
            that.barData.yData.push(item.lendinfo)
          })
          that.bookcaseTable = res.data.data.lend_marc_data
          that.deposit = res.data.data.deposit_count[0].deposit
          that.channel = res.data.data.channel_count[0].channel
        }
      }) 

      // getData(data).then(res => {
      //   res.data.data.time_data.forEach((item, index) => {
      //     this.lendcount.countVal.push(item.lendcount)
      //     this.lendcount.countYear.push(item.day)
      //     this.depositcount.countVal.push(item.depositcount)
      //     this.depositcount.countYear.push(item.day)
      //     this.channelcount.countVal.push(item.channelcount)
      //     this.channelcount.countYear.push(item.day)
      //   })
      //   res.data.data.school_data.forEach((item, index) => {
      //     this.barData.xData.push(item.name)
      //     this.barData.yData.push(item.lendinfo)
      //   })
      //   this.bookcaseTable = res.data.data.lend_marc_data
      //   this.deposit = res.data.data.deposit_count[0].deposit
      //   this.channel = res.data.data.channel_count[0].channel
      // })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="scss">
</style>
