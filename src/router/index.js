import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { ZCatch } from 'src/utils/z-catch'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function () {
  let createHistory

  if (process.env.SERVER) {
    createHistory = createMemoryHistory
  } else if (process.env.VUE_ROUTER_MODE === 'history') {
    createHistory = createWebHistory
  } else {
    createHistory = createWebHashHistory
  }

  try {
    const Router = createRouter({
      scrollBehavior: () => ({ left: 0, top: 0 }),
      routes,

      // Leave this as is and make changes in quasar.conf.js instead!
      // quasar.conf.js -> build -> vueRouterMode
      // quasar.conf.js -> build -> publicPath
      history: createHistory(process.env.VUE_ROUTER_BASE)
    })

    return Router
  } catch {
    ZCatch('Failed to create router')
  }
})
