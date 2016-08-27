import {createStore} from 'redux'
import {Map} from 'immutable'
import authUpdaters from 'updaters/auth'

export default function getNewStore(bootstrapData) {
  const updaters = authUpdaters

  const initialState = Map().merge({
    authFormType: 'signup',
  }, bootstrapData)

  function update(state = initialState, action) {
    return updaters.get(action.type, s => s)(state, action.data, store)
  }

  const store = createStore(update)

  return store
}
