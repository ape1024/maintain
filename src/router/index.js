import Vue from 'vue'
import Router from 'vue-router'
// 登录
import login from '../components/login/login'
//   登陆空白页
import loginBlank from '../components/login/loginBlank'
// 首页
import home from '../components/home/home'
// 首页
import maintainHomeNew from '../components/maintain-home-new/maintain-home-new'
import maintainHomeMap from '../components/maintain-home-map/maintain-home-map'
import maintainHomeTable from '../components/maintain-home-table/maintain-home-table'
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
// 计划
import plan from '../components/maintain-arranged/maintain-arranged'
// 系统设置
import intercalate from '../components/maintain-intercalate/maintain-intercalate'
// 系统设置-维保部门管理
import intercalateDepartment from '../components/intercalate-child/intercalateChild-department'
// 系统设置-角色管理
import intercalateKarakters from '../components/intercalate-child/intercalateChild-karakters'
// 系统设置-用户设置
import tercalateConsumer from '../components/intercalate-child/tercalateChild-consumer'
// 系统设置-项目设置
import tercalateProject from '../components/intercalate-child/tercalateChild-project'
//  系统设置-任务规则
import taskrules from '../components/intercalate-child/intercalateChild-Taskrules'
// 我的消息
import tercalateInfo from '../components/intercalate-child/tercalateChild-info'
// 测试组织机构
import structureNew from '../components/intercalate-child/intercalateChild-structureNew'
// 消防设施归档
import adminFile from '../components/archives-child/adminFile'
// 日常巡检归档'
import dailyFile from '../components/archives-child/dailyFile'
// 检查测试归档
import inspectFile from '../components/archives-child/inspectFile'
// 维护保养归档
import maintainFile from '../components/archives-child/maintainFile'
//  基本设备管理
// import equipmentManagement from '../components/'

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
        path: 'maintain-home-new',
        component: maintainHomeNew,
        children: [
          {
            path: 'map',
            component: maintainHomeMap
          },
          {
            path: 'table',
            component: maintainHomeTable
          }
        ]
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
        component: archives,
        children: [{
          path: 'adminFile',
          component: adminFile
        }, {
          path: 'dailyFile',
          component: dailyFile
        }, {
          path: 'inspectFile',
          component: inspectFile
        }, {
          path: 'maintainFile',
          component: maintainFile
        },
        {
          path: '/',
          redirect: 'dailyFile'
        }]
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
          path: 'info',
          component: tercalateInfo
        }, {
          path: 'structureNew',
          component: structureNew
        }
          // , {
          //   path: 'equipmentManagement',
          //   component: equipmentManagement
          // }
        ]
      },
      {
        path: '/home',
        redirect: '/home/maintain-home-new'
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
