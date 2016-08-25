import {createStore} from 'redux'
import {fromJS} from 'immutable'

import {post} from 'lib/api'

export default function getNewStore(bootstrapData) {
  const updaters = fromJS({
    typeUsername: (state, username) =>
      state.set('typedUsername', username),
    typePassword: (state, password) =>
      state.set('typedPassword', password),
    authFormSubmit: state => {
      post('/users', {
        username: state.get('typedUsername'),
        password: state.get('typedPassword'),
      }).then(user => store.dispatch({
        type: 'setLoggedInUser',
        data: user
      }))
      return state
    },
    setLoggedInUser: (state, user) =>
      state.set('user', fromJS(JSON.parse(user))),
  })

  function update(state = fromJS(bootstrapData), action) {
    return updaters.get(action.type, s => s)(state, action.data)
  }

  const store = createStore(update)

  return store
}
