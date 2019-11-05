import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		list: [],
		loading: false,
	},
	mutations: {
		GETALL(state, payload) {
			state.list = payload.list.map(item => {
				if (item.moban) {
					item.moban = "是";
				} else {
					item.moban = "否";
				}
				return item
			})
		},
		ADDSTUDENT(state, payload){
			state.list = payload.list
		},
		DEL(state, payload){
			state.list = payload.list
		},
		ISLOADING(state, payload) {
			state.loading = payload
		}
	},
	actions: {
		async GETALL({ commit }) {
			var data = await fetch('/api/getall').then(res => res.json())
			// console.log(data);
			commit('GETALL', data)

			commit('ISLOADING', false)
		},
		async ADDSTUDENT({ commit }, payload) {
			var data = await fetch('/api/addstudent', {
				method: "POST",
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(payload)
			}).then(res => res.json());
			console.log("ADDSTUDENT: ", data);
			commit("ADDSTUDENT", data);
			setTimeout(() => {
				payload.cb()
			}, 800)
		},
		async DEL({ commit }, payload) {
			var data = await fetch('/api/del', {
				method: "POST",
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(payload)
			}).then(res => res.json());
			console.log("DEL: ", data);
			commit("DEL", data);

			commit('ISLOADING', false)
		}
	}
})
