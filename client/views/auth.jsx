import React from 'react'
import {connect} from 'react-redux'

function AuthView({typedUsername, typedPassword, typeUsername, typePassword, authFormSubmit}) {
  return (
    <form
      action='/endpoint'
      onSubmit={e => {e.preventDefault(); authFormSubmit()}}
    >
      <h1>This is an Auth View</h1>
      <label htmlFor='username'>Username</label>
      <input type='text' name='username' value={typedUsername} onChange={e => typeUsername(e.target.value)}/>
      <label htmlFor='password'>Password</label>
      <input type='password' name='password' value={typedPassword} onChange={e => typePassword(e.target.value)}/>
      <input type='submit'/>
    </form>
  )
}

AuthView.propTypes = {
  authFormSubmit: React.PropTypes.func,
  typedUsername: React.PropTypes.string,
  typedPassword: React.PropTypes.string,
  typeUsername: React.PropTypes.func,
  typePassword: React.PropTypes.func,
}

AuthView.defaultProps = {
  authFormSubmit: () => null,
  typedUsername: '',
  typedPassword: '',
  typeUsername: () => null,
  typePassword: () => null,
}

const ConnectedAuthView = connect(
  state => ({
    typedUsername: state.get('typedUsername'),
    typedPassword: state.get('typedPassword'),
  }),
  dispatch => ({
    typeUsername: (username) =>
      dispatch({type: 'typeUsername', data: username}),
    typePassword: (password) =>
      dispatch({type: 'typePassword', data: password}),
    authFormSubmit: () => dispatch({type: 'authFormSubmit'}),
  }),
)(AuthView)

export default ConnectedAuthView
