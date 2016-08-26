import React from 'react'
import {connect} from 'react-redux'
import {Map} from 'immutable'

function AuthView({typedUsername, typedPassword, typeUsername, typePassword, authFormSubmit, user}) {
  const username = user.get('name')
  const loggedInForm = [
    <span>{`Hi, ${username}!`}</span>,
    <input type='submit' value='Log out'/>,
  ]
  const loggedOutForm = [
    <h1>This is an Auth View</h1>,
    <label htmlFor='username'>Username</label>,
    <input
      type='text'
      name='username'
      value={typedUsername}
      onChange={e => typeUsername(e.target.value)}
    />,
    <label htmlFor='password'>Password</label>,
    <input
      type='password'
      name='password'
      value={typedPassword}
      onChange={e => typePassword(e.target.value)}
    />,
    <input type='submit'/>,
  ]
  return (
    <form onSubmit={e => {e.preventDefault(); authFormSubmit()}}>
      {username ? loggedInForm : loggedOutForm}
    </form>
  )
}

AuthView.propTypes = {
  authFormSubmit: React.PropTypes.func,
  typedUsername: React.PropTypes.string,
  typedPassword: React.PropTypes.string,
  typeUsername: React.PropTypes.func,
  typePassword: React.PropTypes.func,
  user: React.PropTypes.object,
}

AuthView.defaultProps = {
  authFormSubmit: () => null,
  typedUsername: '',
  typedPassword: '',
  typeUsername: () => null,
  typePassword: () => null,
  user: Map(),
}

const ConnectedAuthView = connect(
  state => ({
    typedUsername: state.get('typedUsername'),
    typedPassword: state.get('typedPassword'),
    user: state.get('user'),
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
