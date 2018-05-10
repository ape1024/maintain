import Vue from 'vue'
import Router from 'vue-router'
// 首页
import home from '../components/maintain-home/maintain-home'
// 设备管理
import admin from '../components/maintain-admin/maintain-admin'
// 日常巡检
import daily from '../components/maintain-daily/maintain-daily'
// 检查测试
import inspect from '../components/maintain-inspect/maintain-inspect'
// 维护保养
import maintain from '../components/maintain-maintain/maintain-maintain'
// 故障维修
import repair from '../components/maintain-repair/maintain-repair'
// 档案
import archives from '../components/maintain-archives/maintain-archives'
// 上报问题
import report from '../components/maintain-report/maintain-report'
// 系统设置
import intercalate from '../components/maintain-intercalate/maintain-intercalate'

Vue.use(Router)

const routes = [
  {
    // 首页
    path: '/home',
    component: home
  },
  {
    // 设备管理
    path: '/admin',
    component: admin
  },
  {
    // 日常巡检
    path: '/daily',
    component: daily
  },
  {
    // 检查测试
    path: '/inspect',
    component: inspect
  },
  {
    // 维护保养
    path: '/maintain',
    component: maintain
  },
  {
    // 故障维修
    path: '/repair',
    component: repair
  },
  {
    // 档案
    path: '/archives',
    component: archives
  },
  {
    // 上报
    path: '/report',
    component: report
  },
  {
    path: '/intercalate',
    component: intercalate
  },
  {
    path: '/',
    redirect: '/home'
  }
]

var router = new Router({
  routes
})

export default router
