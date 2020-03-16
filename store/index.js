import users from '~/data/users'

export const actions = {
    async nuxtServerInit ({ commit }, { app }) {
        commit('Auth/SET_USER', users.get(Number(app.$cookies.get('userId')) || 1))
    }
}