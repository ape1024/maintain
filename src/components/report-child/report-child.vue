<template>
  <div class="admin_child">
    <ul class="threelevel_header">
      <li class="threelevel_lithree">
        设施编码
      </li>
      <li class="threelevel_li">
        设备名称
      </li>
      <li class="threelevel_li">
        设备位置
      </li>
      <li class="threelevel_li">
        数量
      </li>
      <li class="threelevel_li">
        生成厂家
      </li>
      <li class="threelevel_li">
        规格型号
      </li>
      <li class="threelevel_li">
        生产时间
      </li>
      <li class="threelevel_li">
        运行状态
      </li>
      <li class="threelevel_li">
        审核状态
      </li>
      <li class="threelevel_litwo">
        操作
      </li>
    </ul>
    <ul class="threelevel_list">
      <li :key="dataset.id" :id="dataset.id"  v-for="(dataset, $index) in content" class="threelevel_list_li">
        <ul :id="dataset.id" class="threelevel_list_ul">
          <li class="threelevel_lithree">
            {{dataset.encoded}}
          </li>
          <li class="threelevel_li">
            {{dataset.name}}
          </li>
          <li class="threelevel_li">
            {{dataset.position}}
          </li>
          <li class="threelevel_li">
            {{dataset.number}}
          </li>
          <li class="threelevel_li">
            {{dataset.vender}}
          </li>
          <li class="threelevel_li">
            {{dataset.version}}
          </li>
          <li class="threelevel_li">
            {{dataset.timer}}
          </li>
          <li class="threelevel_li">
            {{dataset.state}}
          </li>
          <li class="threelevel_li">
            {{dataset.examine}}
          </li>
          <li class="threelevel_litwo">
            <p @click.stop="question" class="header_p_eight threelevel_litwo_p">
              审核
            </p>
            <p @click.stop="examine" class="header_p_ten">查看</p>
            <p @click.stop="modify" class="header_p_twelve">
              修改
            </p>
            <p class="header_p_eleven" @click.stop="amputate($index, content)">删除</p>
          </li>
        </ul>
      </li>
    </ul>
    <section v-if="examineBoolean" @click.stop class="review">
      <!--审核-->
      <childExamine :examine="examineBoolean" @mine="Mine"></childExamine>
    </section>
    <section v-if="lookoverBoolean" @click.stop class="review">
      <!--查看-->
      <childLookover :msg="lookoverBoolean" @look="Onlook"></childLookover>
    </section>
    <section v-if="modifyBoolean" @click.stop class="review">
      <!--修改-->
      <childModify :msg="modifyBoolean" @say="Modify"></childModify>
    </section>
  </div>

</template>

<script>
import childLookover from '../reportChild-operation/reportChild-lookover'
import childModify from '../reportChild-operation/reportChild-modify'
import childExamine from '../reportChild-operation/reportChild-examine'
export default {
  name: 'report-child',
  components: {
    childLookover,
    childModify,
    childExamine
  },
  methods: {
    amputate ($index, content) {
      // 删除
      content.splice([$index], 1)
    },
    examine () {
      // 点击查看
      this.lookoverBoolean = true
    },
    modify () {
      // 点击修改
      this.modifyBoolean = true
    },
    question () {
      // 点击审核
      this.examineBoolean = true
    },
    Mine (ev) {
      // 审核 传递的参数
      this.examineBoolean = ev
    },
    Onlook (ev) {
      this.lookoverBoolean = ev
    },
    Modify (ev) {
      this.modifyBoolean = ev
    }
  },
  data () {
    return {
      content: [{
        id: '1-1',
        encoded: 'A-001',
        name: '防火门',
        position: '地下一层',
        number: '111',
        vender: '未知',
        version: 'NIDS-021',
        timer: '2018.4',
        state: '正常',
        examine: '1'
      }, {
        id: '1-2',
        encoded: 'A-002',
        name: '防火门',
        position: '地下二层',
        number: '1111',
        vender: '未知',
        version: 'NIDS-022',
        timer: '2018.6',
        state: '正常',
        examine: '1'
      }],
      examineBoolean: false,
      lookoverBoolean: false,
      modifyBoolean: false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .admin_child
    overflow hidden
  .header_ul
    width 100%
    overflow hidden
    position relative
    color $color-header-b-normal
    font-size $font-size-medium
    padding 12px 0
    background #354d76
  .header_li
    float left
    width 7.2%
  .header_litwo
    float left
    width 10.3%
  .header_lithree
    float left
    width 6.4%
    padding-left 1%
  .header_li_four
    float left
    width 7.2%
    color $color-text-tile-project
  .header_li_five
    float left
    width 7.2%
    color  $color-text-tile-complete
  .header_li_six
    float left
    width 7.2%
    color  $color-text-tile-fault
  .header_p_one
    color $color-text-tile-state
  .header_p_two
    color $color-text-tile-state-two
  .header_p_three
    color $color-text-tile-complete
  .header_p_four
    color $color-text-tile-handle
  .header_p_six
    color $color-text-tile-complete
  .header_p_seven
    color $color-text
  .header_p_eight
    color $color-background-query
  .header_p_nine
    color #333333
  .header_p_ten
    color $color-background-newly
  .header_p_eleven
    color #83292b
  .header_p_twelve
    color $color-background-introduce
  .table_ul
    width 100%
    overflow hidden
    position relative
    color $color-text
    font-size $font-size-medium
  .table_li
    width 100%
    overflow hidden
    position relative
    .inline_ul
      width: 100%;
      overflow: hidden;
      position: relative;
      padding: 4px 0;
      line-height: 32px;
  .table_ul .table_li:nth-child(odd)
    background #1c273a
  .table_ul .table_li:nth-child(even)
    background #141D2C
  .threelevel_header
    margin: 4px;
    overflow: hidden;
    position: relative;
    padding: 12px 0;
    background: #354d76;
    .threelevel_li
      float left
      width 8.5%
    .threelevel_litwo
      float left
      width 23.5%
      overflow hidden
    .threelevel_lithree
      float left
      width 7.5%
      padding-left 1%
  .threelevel_list
    margin: 4px;
    overflow: hidden;
    position: relative;
  .threelevel_list_li
    width 100%
    overflow hidden
    position relative
    .threelevel_list_ul
      width 100%
      overflow hidden
      padding: 12px 0;
      .threelevel_li
        float left
        width 8.5%
      .threelevel_litwo
        float left
        width 23.5%
        overflow hidden
      .threelevel_lithree
        float left
        width 7.5%
        padding-left 1%
      .threelevel_litwo p
        float left
        margin-right 35px
        text-decoration underline
        cursor pointer
  .review
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background rgba(000,000,000,.4)
    z-index 11
    overflow hidden

</style>
