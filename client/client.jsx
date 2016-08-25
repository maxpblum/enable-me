import React from 'react'
import ReactDOM from 'react-dom'

import AuthView from 'views/auth'

import getNewStore from 'store'

const store = getNewStore(window.BOOTSTRAP)

ReactDOM.render(
  <AuthView store={store}/>,
  document.getElementById('root')
)
