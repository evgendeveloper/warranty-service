export default {
  async getTypesService({ commit }) {
    try {
      const res = await this.app.$http.$get('/grntwork')
      const payload = res.sort((a, b) => a.name.localeCompare(b.name))
      commit('setByPath', { path: 'typesService', payload: res })
      return Promise.resolve()
    }
    catch(error) {
      return Promise.reject(error)
    }
  },

  async getTypesProperty({ commit }) {
    try {
      const res = await this.app.$http.$get('/estate_kinds')
      commit('setByPath', { path: 'typesProperty', payload: res })
      return Promise.resolve()
    }
    catch(error) {
      return Promise.reject(error)
    }
  },

  async selectDistrict({ dispatch }, id) {
    try {
      let params = {}
      if (id) params = { type: 'Район', id }

      const res = await this.app.$http.$get(this.app.$config.objectSrc, { params })
      dispatch('setDate', res)
      return Promise.resolve()
    }
    catch(error) {
      console.warn(error)
      return Promise.reject(error)
    }
  },

  async selectObject({ dispatch }, id) {
    try {
      const res = await this.app.$http.$get(this.app.$config.objectSrc, {
        params: { type: 'ОбъектСтроительства', id }
      })
      dispatch('setDate', res)
    }
    catch(error) {
      console.warn(error)
    }
  },

  setDate({ commit }, payload) {
    const districts = payload['Районы'] || []
    const objects = payload['ОбъектыСтроительства'] || []
    const sections = payload['Секции'] || []
    const properties = payload['ОбъектыНедвижимости'] || []
    commit('set', { districts, objects, sections, properties })
  },

  selectPropterty({ commit, rootState }, id) {
    const oldId = (rootState.infoPanel.property || {}).id
    commit('selectProperty', { id, oldId })
  },
}
