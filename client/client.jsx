import React from 'react'
import ReactDOM from 'react-dom'

import AuthView from 'views/auth'

import store from 'store'

ReactDOM.render(
  <AuthView store={store}/>,
  document.getElementById('root')
)
