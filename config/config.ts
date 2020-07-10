// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  history: {
    type: 'hash',
  },
  base: '/yjsb/',
  publicPath: '/yjsb/',
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          //authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              //redirect: './Approval/Approval/Approval/Submitted',
              redirect: './Approval/Submitted',
            },
            // {
            //   path: '/welcome',
            //   name: '首页', 
            //   icon: 'smile',
            //   component: './Welcome',
            // },
            {
              path: 'Approval',
              name: '审批',
              icon: 'crown',
              //component: './Approval',
              // authority: ['admin'],
              routes: [
                {
                  path: 'Approval',
                  name: '雨季上报',
                  icon: 'smile',
                  //component: './Approval/RainSeaReport1',
                  // authority: ['admin'],
                  routes: [
                    {
                      path: 'Approval/Submitted',
                      name: '已提交',
                      icon: 'smile',
                      component: './Approval/Submitted', // authority: ['admin'],
                    },
                    {
                      path: 'Approval/ApprovalC',
                      name: '我审批的',
                      icon: 'table',
                      component: './Approval/ApprovalC', // authority: ['admin'],
                    },
                  ],
                },
                {
                  path: 'urgentRepair',
                  name: '紧急维修',
                  icon: 'table',
                  routes: [
                    {
                      path: 'urgentRepair/Submitted',
                      name: '已提交',
                      icon: 'smile',
                      component: './urgentRepair/Submitted', // authority: ['admin'],
                    },
                    {
                      path: 'urgentRepair/ApprovalC',
                      name: '我审批的',
                      icon: 'table',
                      component: './urgentRepair/ApprovalC', // authority: ['admin'],
                    },
                  ],
                },
              ],
            },
            // {
            //   name: '搜索列表',
            //   icon: 'smile',
            //   path: '/listsearch',
            //   component: './ListSearch',
            // }, 
            // {
            //   name: 'list.table-list',
            //   icon: 'table',
            //   path: '/list',
            //   component: './ListTableList',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: './',
  },
});
