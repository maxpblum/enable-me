import React from 'react'

import {post} from 'lib/api'

export default function AuthView({typedUsername, typedPassword}) {
  return (
    <form
      action='/endpoint'
      onSubmit={e => {
        e.preventDefault()
        post('/some-endpoint', {username: typedUsername, password: typedPassword})
      }}
    >
      <h1>This is an Auth View</h1>
      <label htmlFor='username'>Username</label>
      <input type='text' name='username' value={typedUsername}/>
      <label htmlFor='password'>Password</label>
      <input type='password' name='password' value={typedPassword}/>
      <input type='submit'/>
    </form>
  )
}

AuthView.propTypes = {
  typedUsername: React.PropTypes.string,
  typedPassword: React.PropTypes.string,
}

AuthView.defaultProps = {
  typedUsername: '',
  typedPassword: '',
}
