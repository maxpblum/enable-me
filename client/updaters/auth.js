import {fromJS} from 'immutable'
import {post} from 'lib/api'

const authUpdaters = fromJS({
  typeUsername: (state, username) =>
    state.set('typedUsername', username),

  typePassword: (state, password) =>
    state.set('typedPassword', password),

  authFormSubmit: (state, _, store) => {
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

export default authUpdaters
