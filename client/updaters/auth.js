import {fromJS} from 'immutable'

const authUpdaters = {
  typeUsername: (state, username) =>
    state.set('typedUsername', username),

  typePassword: (state, password) =>
    state.set('typedPassword', password),

  resetAuthForm: (state) =>
    state.set('typedUsername', '').set('typedPassword', ''),

  setLoggedInUser: (state, user) =>
    state.set('user', fromJS(JSON.parse(user))),

  setLoggedOut: (state) => state.delete('user'),

  setAuthFormType: (state, newType) =>
    state.set('authFormType', newType),
}

export default authUpdaters
