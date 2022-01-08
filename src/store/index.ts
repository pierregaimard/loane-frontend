import User from '@/services/api/entities/User'
import { createStore, Store } from 'vuex'
import { session, SESSION_USER } from '@/services/session/Session'
import { State } from '@vue/runtime-core'
import { Article } from '@/services/api/entities/Article'
import { UserManager } from '@/services/api/managers/UserManager'
import { UserSession } from '@/services/security/UserSession'
import { ArticleManager } from '@/services/api/managers/ArticleManager'
import { Http } from '@/services/api/client/Http'

declare module '@vue/runtime-core' {
  interface State {
    user: User | null
    articles: Article[]
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export default createStore({
  state(): State {
    return <State>{
      user: null,
      articles: [],
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
    setArticles(state, payload) {
      state.articles = payload.articles
    },
  },
  actions: {
    async authenticate({ commit }, payload) {
      const { user, token } = await UserManager.login(payload.username, payload.password)
      commit({ type: 'setUser', user: user })
      UserSession.set(user.id, token)
      Http.setJwt(token)
    },

    async refreshSessionData({ commit }) {
      const userSession = UserSession.get()
      if (userSession === false) return Promise.reject(Error('User session is missing'))
      Http.setJwt(userSession.token)
      const user = await UserManager.findOne(userSession.userId)
      commit({ type: 'setUser', user: user })
    },

    async setArticles({ commit }, payload?) {
      const articles = (payload)
        ? await ArticleManager.findByCategory(payload.category)
        : await ArticleManager.find()
      commit({ type: 'setArticles', articles: articles })
    },
  },
  modules: {},
})
