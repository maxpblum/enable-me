import {fromJS} from 'immutable'

export default {
  setLoggedInUser: (state, user) =>
    state.set('user', fromJS(JSON.parse(user))),

  setLoggedOut: state => state.delete('user'),
}
