import User from '@/api/entities/User'
import { createStore, Store } from 'vuex'
import { session, SESSION_USER, SESSION_TOKEN } from '@/services/session/Session'
import { State } from '@vue/runtime-core'
import { Http } from '@/api/connector/Http'

declare module '@vue/runtime-core' {
  interface State {
    user: User | null
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export default createStore({
  state(): State {
    return <State>{
      user: null,
    }
  },
  getters: {
    hasUser(state: State) {
      return state.user !== null
    },
    hasUserSession() {
      return session.has(SESSION_USER)
    },
    getUsername(state) {
      return state.user !== null ? state.user.username : ''
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user
    },
  },
  actions: {
    async authenticate({ commit }, payload) {
      const response = await Http.getClient().post('auth/login', {
        username: payload.username,
        password: payload.password,
      })

      commit({ type: 'setUser', user: response.data.user })
      session.set(SESSION_USER, response.data.user.id)
      session.set(SESSION_TOKEN, response.data.token)
      Http.setJwt(response.data.token)
    },

    async refreshSessionData({ commit }) {
      const token = session.get(SESSION_TOKEN)
      if (token !== null) Http.setJwt(token)

      const userId = session.get(SESSION_USER)
      const response = await Http.getClient().get(`users/${userId}`)
      commit({ type: 'setUser', user: response.data })
    },
  },
  modules: {},
})
