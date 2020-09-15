<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="" />
          <div class="userInfo">
            <p class="name">Nick</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登陆时间:<span>2020-09-15:17:00:00</span></p>
          <p>上次登陆地点:<span>上海市普陀区</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height:540px;margin-top:20px">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column show-overflow-tooltip v-for="(val, key) in tabelLabel" :key="key" :prop="key" :label="val"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card shadow="hover" v-for="item in constData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">￥ {{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echart style="height:280px" :chartData="echartData.order"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echart style="height:260px" :chartData="echartData.user"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart style="height:260px" :chartData="echartData.video" :isAxisChart="false"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from '../../components/Echart'
export default {
  components: {
    Echart
  },
  data() {
    return {
      userImg: require('../../assets/images/user.png'),
      constData: [
        {
          name: '今日支付订单',
          value: '34',
          icon: 'success',
          color: '#2ec7e9'
        },
        {
          name: '今日收藏订单',
          value: '12',
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '今日未支付订单',
          value: '14',
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          value: '1234',
          icon: 'success',
          color: '#2ec7e9'
        },
        {
          name: '本月收藏订单',
          value: '456',
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name: '本月未支付订单',
          value: '234',
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ],
      tableData: [],
      tabelLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.$http.get('/home/getData').then(res => {
        res = res.data
        this.tableData = res.data.tableData
        console.log(res.data)
        //订单折线图
        const order = res.data.orderData
        this.echartData.order.xData = order.data
        // 1、去除series中key
        let keyArray = Object.keys(order.data[0])

        keyArray.forEach(key => {
          this.echartData.order.series.push({
            name: key === 'wechat' ? '小程序' : key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })
        // 2、用户饼状图
        this.echartData.user.xData = res.data.userData
        let keyArray_user = Object.keys(res.data.userData[0])
        keyArray_user.forEach(key => {
          this.echartData.user.series.push({
            name: key,
            data: res.data.userData.map(item => item[key]),
            type: 'bar'
          })
        })
        // 3、饼状图
        let keyArray_video = Object.keys(res.data.videoData[0])
        keyArray_video.forEach(key => {
          this.echartData.video.series.push({
            name: key,
            data: res.data.videoData.map(item => item[key]),
            type: 'pie'
          })
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/scss/home.scss';
</style>
