<template>
  <div class="layer">
    <el-button type="info" @click="next">下一页</el-button>
    <div class="Home" v-loading='loading'>
      <div class="bookcase">
        <div class="bookcase-charts">
          <div style="text-align:center">
            <span>书柜统计</span>
            <div class="bookcase-chart">
              <div class="pieChart">
                <pieChart :PieScienceList="chartData" style="width:100%" tit="书柜在线"></pieChart>
              </div>
              <!-- <div class="pieChart">
                <pieChart :PieScienceList="chartData" style="width:100%" tit="书柜使用频次"></pieChart>
              </div> -->
            </div>
            <div class="bookcase-table">
              <el-table :data="bookcaseTable" border style="width: 100%">
                <el-table-column prop="name" label="厂商"></el-table-column>
                <el-table-column prop="total" label="总数"></el-table-column>
                <el-table-column prop="count" label="在线数量"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="bookcase-recent" style="text-align:center">
          <span>近期借阅</span>
          <el-table :data="borrowingTable" border style="width: 100%">
            <el-table-column prop="cabinet" label="柜子"></el-table-column>
            <el-table-column prop="name" label="借阅信息（借阅人图书）"></el-table-column>
            <el-table-column prop="time" label="借阅时间"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="school-statistics" style="text-align:center">
        <span>学校借阅</span>
        <el-table :data="schooleTable" border style="width: 100%">
          <el-table-column prop="name" label="学校"></el-table-column>
          <el-table-column prop="cabinetNum" label="柜子数量"></el-table-column>
          <el-table-column prop="studentNum" label="学生数量"></el-table-column>
          <el-table-column prop="refundNum" label="借阅统计"></el-table-column>
          <el-table-column prop="depositNum" label="押金缴纳"></el-table-column>
          <el-table-column label="退款统计">
            <template slot-scope="scope">{{scope.row.borrowingNum === null ?'0': Math.ceil(scope.row.borrowingNum)}}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from '@/api/home'
import { formatDateTime } from '@/utils/index'
import $ from 'jquery'
import pieChart from '@/components/Charts/PieScienceChart'
export default {
  name: 'Toplist',
  components: {
    pieChart
  },
  data () {
    return {
      chartData: [],
      bookcaseTable: [],
      borrowingTable: [],
      schooleTable: [],
      loading: false
    }
  },
  methods: {
    next () {
      this.$router.push({
        path: '/statistical'
      })
    },
    getData () {
      this.loading = true
      let data = {
        access_token: 'dc28e916633d6d7346a684187c4cf028',
        p: '115533'
      }
      let that = this
      $.ajax({
        type: 'post',
        url: 'http://118.31.23.47:12480/api/manage/countinfo',
        data: data,
        dataType: 'json',
        success: function (res) {
          let list = res.data.data
          list.category_data.forEach((item, index) => {
            let temp = {
              name: item.manufacturer || '标记',
              total: item.bookcasecount,
              count: item.bookcasecount - item.offlinecount
            }
            that.chartData.push(temp)
            that.bookcaseTable.push(temp)
          })
          list.lend_now_data.forEach((item, index) => {
            if (index > 20) {
              return false
            }
            let time = new Date(parseInt(item.lend_time + '000'))
            let temp = {
              cabinet: item.lend_bookcase_no,
              name: item.reader_name,
              time: formatDateTime(time, 'yyyy-MM-dd hh:mm')
            }
            that.borrowingTable.push(temp)
          })
          list.school_data.forEach((item, index) => {
            let temp = {
              name: item.name,
              cabinetNum: item.bookcaseinfo[0].bookcasecount,
              studentNum: item.studentinfo[0].studentcount,
              borrowingNum: item.depositreturninfo[0].depositreturncount,
              depositNum: item.depositinfo[0].studentdepositcount,
              refundNum: item.lendinfo[0].lendcount
            }
            that.schooleTable.push(temp)
          })
          that.loading = false
        }
      })
      // getData(data).then(res => {
      //   let list = res.data.data
      //   list.category_data.forEach((item, index) => {
      //     let temp = {
      //       name: item.manufacturer || '标记',
      //       count: item.bookcasecount
      //     }
      //     this.chartData.push(temp)
      //     this.bookcaseTable.push(temp)
      //   })
      //   list.lend_now_data.forEach((item, index) => {
      //     if (index > 20) {
      //       return false
      //     }
      //     let time = new Date(parseInt(item.lend_time + '000'))
      //     let temp = {
      //       cabinet: item.lend_bookcase_no,
      //       name: item.reader_name,
      //       time: formatDateTime(time, 'yyyy-MM-dd hh:mm')
      //     }
      //     this.borrowingTable.push(temp)
      //   })
      //   list.school_data.forEach((item, index) => {
      //     let temp = {
      //       name: item.name,
      //       cabinetNum: item.bookcaseinfo[0].bookcasecount,
      //       studentNum: item.studentinfo[0].studentcount,
      //       borrowingNum: item.depositreturninfo[0].returnamount,
      //       depositNum: item.depositinfo[0].studentdepositcount,
      //       refundNum: item.lendinfo[0].lendcount
      //     }
      //     this.schooleTable.push(temp)
      //   })
      //   console.log(this.bookcaseTable)
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
