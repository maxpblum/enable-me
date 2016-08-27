import React from 'react'
import {connectWith} from 'store'
import {post} from 'lib/api'

const authFormSubmit = ({setLoggedOut, setLoggedInUser, resetAuthForm, authFormType, user, typedUsername, typedPassword}) => {
  const authEndpoint = authFormType === 'signup'
    ? '/users' : '/login'
  if (user.name) {
    post('/logout')
    .then(setLoggedOut)
  } else {
    post(authEndpoint, {
      username: typedUsername,
      password: typedPassword,
    }).then(setLoggedInUser)
  }
  resetAuthForm()
}

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

function AuthView({
  authFormType,
  typedUsername,
  typedPassword,
  typeUsername,
  typePassword,
  user,
  setAuthFormType,
  setLoggedOut,
  setLoggedInUser,
  resetAuthForm
}) {
  const username = user.name
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
    <form onSubmit={e => {
      e.preventDefault()
      authFormSubmit({
        setLoggedOut,
        setLoggedInUser,
        resetAuthForm,
        authFormType,
        user,
        typedUsername,
        typedPassword
      })
    }}>
      {username ? loggedInForm : loggedOutForm}
    </form>
  )
}

AuthView.propTypes = {
  authFormSubmit: React.PropTypes.func,
  authFormType: React.PropTypes.string,
  resetAuthForm: React.PropTypes.func,
  setAuthFormType: React.PropTypes.func,
  setLoggedInUser: React.PropTypes.func,
  setLoggedOut: React.PropTypes.func,
  typedUsername: React.PropTypes.string,
  typedPassword: React.PropTypes.string,
  typeUsername: React.PropTypes.func,
  typePassword: React.PropTypes.func,
  user: React.PropTypes.object,
}

AuthView.defaultProps = {
  authFormSubmit: () => null,
  authFormType: '',
  resetAuthForm: () => null,
  setAuthFormType: () => null,
  setLoggedInUser: () => null,
  setLoggedOut: () => null,
  typedUsername: '',
  typedPassword: '',
  typeUsername: () => null,
  typePassword: () => null,
  user: {},
}

export default connectWith('auth')(AuthView)
