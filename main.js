
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

const BottomNavFallback = {
	render(h) {
		return null
	}
}
Vue.component('BottomNav', BottomNavFallback)
Vue.component('bottom-nav', BottomNavFallback)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  const BottomNavFallback = {
    render() {
      return null
    }
  }
  app.component('BottomNav', BottomNavFallback)
  app.component('bottom-nav', BottomNavFallback)
  return {
    app
  }
}
// #endif