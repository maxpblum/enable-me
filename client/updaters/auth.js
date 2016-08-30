const authUpdaters = {
  typeUsername: (state, username) =>
    state.set('typedUsername', username),

  typePassword: (state, password) =>
    state.set('typedPassword', password),

  resetAuthForm: (state) =>
    state.set('typedUsername', '').set('typedPassword', ''),

  setAuthFormType: (state, newType) =>
    state.set('authFormType', newType),
}

export default authUpdaters
