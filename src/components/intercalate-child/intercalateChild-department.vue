<template>
    <div class="subject">
      <section class="subjectLeft">
        <header class="leftHeader">
          <img class="subjectImg" src="../../../static/img/department.png" alt="">
          <p class="subjectP">维护组织信息信息</p>
        </header>
        <div class="leftBottom">
          <div class="leftDiv">
            <el-tree
              :data="data5"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false">
        <span @click="fn(node, data)" class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(node, data)">
            编辑
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
            </el-tree>
          </div>
        </div>
      </section>
      <section class="subjectRight">
        <header class="rightHeader">
          <img class="subjectImg" src="../../../static/img/department.png" alt="">
          <p class="subjectP">维护组织信息信息</p>
        </header>
        <div class="rightDiv">
         <div class="rightDate">
           <div class="structure">
             <p v-for="item in dom" class="structureP">
               <span class="structureStair">{{item}}</span> <span class="structurExcision"> > </span>
             </p>
           </div>
           <div class="superinduce">
             <ul class="superinduceUl">
               <li class="superinduceLi" v-for="amoutItem in amoutItem">
                 <div class="superinduceLiDiv">
                   <el-input v-model="amoutItem.input" placeholder=""></el-input>
                 </div>
                 <div class="addto" v-if="amoutItem.judge" @click="superinduce(amoutItem)">
                   <img src="../../../static/img/superinduce.png" alt="">
                 </div>
               </li>
             </ul>
             <div class="subjectBottom">
               <div @click="preservation(amoutItem, dom)" class="conserve">
                 保存
               </div>
               <div class="closedown">
                 关闭
               </div>
             </div>
           </div>
         </div>
        </div>
      </section>
    </div>
</template>

<script>
export default {
  name: 'intercalateChild-department',
  data () {
    let data = [{
      id: '1',
      label: '项目一',
      children: [{
        id: '1|2|1',
        label: '研发部',
        children: [{
          id: '1|2|1|1',
          label: '张三'
        }, {
          id: '1|2|1|2',
          label: '李四'
        }]
      }]
    }, {
      id: '2',
      label: '项目二',
      children: [{
        id: '2|1|1',
        label: '人事部'
      }, {
        id: '2|1|2',
        label: '后勤部'
      }]
    }, {
      id: '3',
      label: '项目三',
      children: [{
        id: '3|1|1',
        label: '研发部'
      }, {
        id: '3|1|2',
        label: '后勤部'
      }]
    }]
    return {
      data5: JSON.parse(JSON.stringify(data)),
      dom: '',
      amoutItem: [{
        input: '',
        judge: false
      }, {
        input: '',
        judge: false
      }, {
        input: '',
        judge: false
      }, {
        input: '',
        judge: false
      }, {
        input: '',
        judge: false
      }, {
        input: '',
        judge: false
      }, {
        input: '',
        judge: false
      }, {
        input: '',
        judge: false
      }, {
        input: '',
        judge: true
      }]
    }
  },

  methods: {
    append (node, data) {
      // const newChild = { id: id++, label: 'testtest', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
      console.log(node)
    },
    fn (node, data) {
      let nodeId = data.id
      let arr = null
      arr = nodeId.split('|')
      let array = []
      // let Dom = ''
      let nodeDate = node.label

      if (node.parent.parent !== null) {
        // 如不是第一级 走这里，
        for (let i = arr.length; i > 1; i--) {
          array.push(node.parent.label)
          node = node.parent
        }
        array.pop()
        array.push(nodeDate)
      } else {
        // 如果是第一级 走这里
        array.push(nodeDate)
      }
      this.dom = array
      // 点击 左侧 子级数据渲染到input里，实现编辑
      if (data.children !== undefined) {
        let childrenIndex = data.children.length
        console.log(data.children)
        // 首先把所有的input框清空
        for (let i = 0; i < this.amoutItem.length; i++) {
          this.amoutItem[i].input = ''
        }
        for (let i = 0; i < childrenIndex; i++) {
          var childrenDate = data.children[i].label
          this.amoutItem[i].input = childrenDate
        }
      } else {
        // 如果没有子级节点， 把input框清空
        for (let i = 0; i < this.amoutItem.length; i++) {
          this.amoutItem[i].input = ''
        }
      }
      console.log()
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent (h, {node, data, store}) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' on-click={ () => this.append(data) }>Append</el-button>
            <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
        </span>)
    },
    superinduce (data, node) {
      console.log(data)
      data.judge = false
      var superindeuceDate = {input: '', judge: true}
      this.amoutItem.push(superindeuceDate)
      console.log(this.amoutItem)
    },
    preservation (node, data) {
      console.log(this.dom)
      // let arrAy = []
      // for (let i = 0; i<data.length; i++){
      //   if (this.amoutItem[i].input !==''){
      //     arrAy.push(this.amoutItem[i].input)
      //   }
      // }
      // console.log(arrAy)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .subject
    init()
   .subjectLeft
     float left
     width 368px
     position relative
     margin-right 56px
     .leftHeader
       width 100%
       overflow hidden
       position relative
       height 40px
       line-height 40px
       background #354d76
    .subjectImg
      margin 0 4px
      display inline-block
      width 40px
      float left
      height 40px
    .subjectP
      float left
      color $color-text
      line-height 40px
    .leftBottom
       width 100%
       min-height 800px
       max-height 800px
       overflow hidden
       position relative
       background #101826
       height calc(100% - 50px)
       overflow-y auto
       overflow-x hidden
    .leftDiv
       overflow hidden
       margin 15px 20px
       position relative
   .subjectRight
     overflow hidden
     position relative
     .rightHeader
       init()
       height 40px
       line-height 40px
       background #354d76
     .rightDiv
       min-height 800px
       max-height 800px
       overflow hidden
       position relative
       background #101826
       height calc(100% - 50px)
       overflow-y auto
       overflow-x hidden
       .rightDate
         margin 100px 0
         overflow hidden
       .structure
         float left
         min-width 400px
         margin-top 190px
         overflow hidden
         margin-left 60px
         font-size $font-size-small
         color $color-text-title
         .structureStair
           margin-right 25px
         .structurExcision
           margin-right 25px
           color #3e4755
       .superinduce
         float left
         overflow hidden
       .structureP
          float left
       .superinduceUl
          overflow hidden
          position relative
         .superinduceLiDiv
            float left
            width 300px
          .superinduceLi
            width 347px
            overflow hidden
            margin-bottom 15px
            .addto
              border-radius 5px
              background $color-background-query
              width 27px
              height 27px
              float right
              margin 7px
              transition .2s
              img
                display inline-block
                cursor pointer
                width 27px
                height 27px
              &:hover
                background: #4b92bf;
          .subjectBottom
             init()
             color $color-text
             text-align center
             margin-top 20px
            .conserve
              conserve()
              margin-right 40px
            .closedown
              closedown()
  .el-tree
    background transparent
  .custom-tree-node
    color $color-text
  .el-button--text
    color $color-border-b-fault
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
