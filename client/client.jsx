import React from 'react'
import ReactDOM from 'react-dom'

import AuthView from 'views/auth'
import PostInput from 'views/post-input'

import getNewStore from 'store'

const store = getNewStore(window.BOOTSTRAP)

ReactDOM.render(
  <div>
    <AuthView store={store}/>
    <PostInput store={store}/>
  </div>,
  document.getElementById('root')
)
