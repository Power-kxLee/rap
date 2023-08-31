import { createApp } from 'vue'
import './app.scss'
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from 'pinia'
import routes from './routes'

const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes
});
const App = createApp({
  onShow (options) {
    console.log('App onShow.')
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
App.use(pinia)
App.use(router)
export default App
