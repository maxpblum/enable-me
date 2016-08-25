import {createStore} from 'redux'
import {Map, fromJS} from 'immutable'

import {post} from 'lib/api'

const updaters = fromJS({
  typeUsername: (state, username) =>
    state.set('typedUsername', username),
  typePassword: (state, password) =>
    state.set('typedPassword', password),
  authFormSubmit: state => {
    post('/some-endpoint', {
      username: state.get('typedUsername'),
      password: state.get('typedPassword'),
    })
    return state
  }
})

function update(state = Map(), action) {
  return updaters.get(action.type, s => s)(state, action.data)
}

const store = createStore(update)

export default store
