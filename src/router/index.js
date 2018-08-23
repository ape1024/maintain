import Vue from 'vue'
import Router from 'vue-router'
// 登录
import login from '../components/login/login'
//   登陆空白页
import loginBlank from '../components/login/loginBlank'
// 首页
import home from '../components/home/home'
// 首页
import maintainHome from '../components/maintain-home/maintain-home'
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
//  计划
import plan from '../components/maintain-arranged/maintain-arranged'
// 系统设置
import intercalate from '../components/maintain-intercalate/maintain-intercalate'
// 系统设置-维保部门管理
import intercalateDepartment from '../components/intercalate-child/intercalateChild-department'
// 系统设置-组织结构权限管理
import intercalateStructure from '../components/intercalate-child/intercalateChild-structure'
// 系统设置-角色管理
import intercalateKarakters from '../components/intercalate-child/intercalateChild-karakters'
// 系统设置-用户设置
import tercalateConsumer from '../components/intercalate-child/tercalateChild-consumer'
// 系统设置-项目设置
import tercalateProject from '../components/intercalate-child/tercalateChild-project'
//  系统设置-任务规则
import taskrules from '../components/intercalate-child/intercalateChild-Taskrules'
Vue.use(Router)

const routes = [
  {
    // 登录
    path: '/login',
    component: login
  },
  {
    //  登陆空白页
    path: '/loginBlank',
    component: loginBlank
  },
  {
    // 首页
    path: '/home',
    component: home,
    children: [
      {
        // 设备管理
        path: 'maintain-home',
        component: maintainHome
      },
      {
        // 设备管理
        path: 'admin',
        component: admin
      },
      {
        // 日常巡检
        path: 'daily',
        component: daily
      },
      {
        // 检查测试
        path: 'inspect',
        component: inspect
      },
      {
        // 维护保养
        path: 'maintain',
        component: maintain
      },
      {
        // 故障维修
        path: 'repair',
        component: repair
      },
      {
        //  计划
        path: 'plan',
        component: plan
      },
      {
        // 档案
        path: 'archives',
        component: archives
      },
      {
        // 上报
        path: 'report',
        component: report
      },
      {
        path: 'intercalate',
        component: intercalate,
        children: [{
          path: 'department',
          component: intercalateDepartment
        }, {
          path: 'structure',
          component: intercalateStructure
        }, {
          path: 'karakters',
          component: intercalateKarakters
        }, {
          path: 'consumer',
          component: tercalateConsumer
        }, {
          path: 'project',
          component: tercalateProject
        }, {
          path: 'taskrules',
          component: taskrules
        }, {
          path: '/',
          component: intercalateStructure,
          redirect: 'structure'
        }
        ]
      },
      {
        path: '/home',
        redirect: '/home/maintain-home'
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  }
]

let router = new Router({
  routes
})

export default router
