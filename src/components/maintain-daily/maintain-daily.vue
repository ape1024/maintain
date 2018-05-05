<template>
  <div class="subject">
    <section class="subject_top">
      <ul class="ul_input">
        <li class="li_input">
          <p class="div_p">区 域</p>
          <div class="div_input"><el-input v-model="input1" placeholder=""></el-input></div>
        </li>
        <li class="li_input">
          <p class="div_p">设备类型</p>
          <div class="div_input"><el-input v-model="input2" placeholder=""></el-input></div>
        </li>
        <li class="li_input">
          <p class="div_p">执行班组</p>
          <div class="div_input"><el-input v-model="input3" placeholder=""></el-input></div>
        </li>
        <li class="li_input">
          <p class="div_p">巡查状态</p>
          <div class="div_input"><el-input v-model="input4" placeholder=""></el-input></div>
        </li>
        <li class="li_input">
          <p class="div_p">审核状态</p>
          <div class="div_input"><el-input v-model="input5" placeholder=""></el-input></div>
        </li>
      </ul>
      <div class="button">
        <!--查询-->
        <div class="query">
          <el-button type="query">查 询</el-button>
        </div>
        <!--新增-->
        <div class="newly">
          <el-button type="newly">新 增</el-button>
        </div>
      </div>
    </section>
    <section class="subject_bottom">
      <table class="table">
        <tr class="table_header">
          <th>日期</th>
          <th>任务名称</th>
          <th>执行班组</th>
          <th>执行内容</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>巡查项</th>
          <th>已完成项</th>
          <th>故障问题</th>
          <th>巡查状态</th>
          <th>处理状态</th>
          <th>已分配任务项</th>
          <th>操作</th>
        </tr>
        <tr v-for="item in tableData" class="111" :key="item.id" :id="item.id" v-on:click="corresponding">
          <td>{{item.date}}</td>
          <td>{{item.name}}</td>
          <td>{{item.implement}}</td>
          <td>{{item.content}}</td>
          <td>{{item.starttime}}</td>
          <td>{{item.endtime}}</td>
          <td>{{item.project}}</td>
          <td>{{item.complete}}</td>
          <td>{{item.fault}}</td>
          <td>{{item.state}}</td>
          <td>{{item.handle}}</td>
          <td>{{item.distribution}}</td>
          <td>
            <el-button v-if="item.operation =='true'">1</el-button>
            <el-button v-if="item.operation =='false'">2</el-button>
          </td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'maintain-daily',
  methods: {
    corresponding (event) {
      // 获取当前元素的id
      this.click_id = event.currentTarget.id
      console.log(this.click_id)
    }
  },
  data () {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      // 获取点击的id
      click_id: '',
      tableData: [{
        id: '1',
        date: '2016-05-03',
        name: '王小虎',
        implement: '一班',
        content: '普陀区',
        starttime: '2018-07-07',
        endtime: '2018-07-07',
        project: '90',
        complete: '90',
        fault: '10',
        state: '未完成',
        handle: '未处理',
        distribution: '123',
        operation: 'true'
      }, {
        id: '2',
        date: '2016-05-03',
        name: '王小虎',
        implement: '一班',
        content: '普陀区',
        starttime: '2018-07-07',
        endtime: '2018-07-07',
        project: '90',
        complete: '90',
        fault: '10',
        state: '未完成',
        handle: '未处理',
        distribution: '456',
        operation: 'false'
      }]
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
     margin 12px
     overflow hidden
     position relative
    .subject_top
        margin 8px 8px 20px
        overflow hidden
      .ul_input
         overflow hidden
         float left
         position relative
        .li_input
          float left
          overflow hidden
          margin-right 20px
          .div_p
           float left
           font-size $font-size-medium
           color $color-text
           margin-right 10px
           line-height: 40px;
          .div_input
           float left
      .button
         float right
         overflow hidden
         position relative
         .query
           float left
           margin-right 30px
         .newly
          float right
     .table
       width 100%
       overflow hidden
       position relative
       color $color-text
       font-size $font-size-medium
       text-align left
       th,td
         padding 10px 0
       .table_header
         background yellowgreen
     tr:nth-child(odd)
        background rgba(255,255,255,.4)
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .has-gutter tr th
     background yellowgreen!important
     color $color-text
</style>
