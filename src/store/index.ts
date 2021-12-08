import User from '@/api/entities/User'
import { createStore, Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface State {
    user: User
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export default createStore({
  state() {
    return {
      user: {},
    }
  },
  getters: {
    getUsername(): string {
      return 'Loane'
    },
  },
  mutations: {},
  actions: {},
  modules: {},
})
