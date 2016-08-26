import React from 'react'
import {connect} from 'react-redux'
import {Map} from 'immutable'

function Switch({currentType, setAuthFormType}) {
  const {copy, otherType} = currentType === 'login' ?
    {copy: 'Want to sign up?', otherType: 'signup'} :
    {copy: 'Want to log in?', otherType: 'login'}
  return (
    <a
      href='*'
      onClick={e => {
        e.preventDefault()
        setAuthFormType(otherType)
      }}
    >
      {copy}
    </a>
  )
}

Switch.propTypes = {
  currentType: React.PropTypes.string,
  setAuthFormType: React.PropTypes.func,
}

Switch.defaultProps = {
  currentType: 'signup',
  setAuthFormType: () => null,
}

function AuthView({authFormType, typedUsername, typedPassword, typeUsername, typePassword, authFormSubmit, user, setAuthFormType}) {
  const username = user.get('name')
  const authText = authFormType === 'login' ? 'Log in' : 'Sign up'
  const switchProps = {setAuthFormType, currentType: authFormType}
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
    <input type='submit' value={authText}/>,
    <Switch {...switchProps}/>,
  ]
  return (
    <form onSubmit={e => {e.preventDefault(); authFormSubmit()}}>
      {username ? loggedInForm : loggedOutForm}
    </form>
  )
}

AuthView.propTypes = {
  authFormSubmit: React.PropTypes.func,
  authFormType: React.PropTypes.string,
  setAuthFormType: React.PropTypes.func,
  typedUsername: React.PropTypes.string,
  typedPassword: React.PropTypes.string,
  typeUsername: React.PropTypes.func,
  typePassword: React.PropTypes.func,
  user: React.PropTypes.object,
}

AuthView.defaultProps = {
  authFormSubmit: () => null,
  authFormType: '',
  setAuthFormType: () => null,
  typedUsername: '',
  typedPassword: '',
  typeUsername: () => null,
  typePassword: () => null,
  user: Map(),
}

const ConnectedAuthView = connect(
  state => ({
    authFormType: state.get('authFormType'),
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
    setAuthFormType: (newType) =>
      dispatch({type: 'setAuthFormType', data: newType}),
  }),
)(AuthView)

export default ConnectedAuthView
