import {createStore} from 'redux'
import {fromJS, Map} from 'immutable'

import {post} from 'lib/api'

export default function getNewStore(bootstrapData) {
  const updaters = fromJS({
    typeUsername: (state, username) =>
      state.set('typedUsername', username),
    typePassword: (state, password) =>
      state.set('typedPassword', password),
    authFormSubmit: state => {
      const authEndpoint = state.get('authFormType') === 'signup'
        ? '/users' : '/login'
      if (state.getIn(['user', 'name'])) {
        post('/logout')
        .then(() => store.dispatch({type: 'setLoggedOut'}))
      } else {
        post(authEndpoint, {
          username: state.get('typedUsername'),
          password: state.get('typedPassword'),
        }).then(user => store.dispatch({
          type: 'setLoggedInUser',
          data: user
        }))
      }
      return state
    },
    setLoggedInUser: (state, user) =>
      state.set('user', fromJS(JSON.parse(user))),
    setLoggedOut: (state) => state.delete('user'),
    setAuthFormType: (state, newType) =>
      state.set('authFormType', newType),
  })

  function update(
    state = Map().merge({
      authFormType: 'signup',
    }, bootstrapData),
    action,
  ) {
    return updaters.get(action.type, s => s)(state, action.data)
  }

  const store = createStore(update)

  return store
}
