import axios from 'axios'
// const loginUrl = '/api/login'
// const userUrl = '/api/user'


export const user = {
    namespaced: true,
    state: {
        user: null
    },
    //mutations: commitでstateを更新したり、ブラウザ上のデブツールでstateの変化を追うことが可能
    mutations: {
        setUser(state, payload) {
            state.user = payload
        }
    },
    //actions: 通常のVue.jsのmethodsに相当。非同期の処理を入れることが可能。
    actions: {
        login: async({ commit }, user) => {
            try {
                let response = await axios.post('http://localhost:5000/api/login', {
                    username: user.userName,
                    password: user.password,
                })

                console.log(response);
                const token = response.data.token
                console.log(token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                res = await axios.get('http://localhost:5000/api/user')
                commit('setUser', res.data)
                return res
            } catch (err) {
                throw new Error(err.res)
            }
        }
    }
}