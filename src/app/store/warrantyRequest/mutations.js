import set from 'lodash/set'
import merge from 'lodash/merge'

export default {
  set(state, { path, payload }) {
    set(state, path, payload)
  },
  merge(state, payload) {
    merge(state, payload)
  }
}
