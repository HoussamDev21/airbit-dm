import users from '~/data/users'

export const state = () => ({
    user: users.get(1)
})

export const mutations = {
    SET_USER(state, data) {
        state.user = data
    }
}