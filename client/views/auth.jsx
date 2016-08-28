import React from 'react'
import {connectWith} from 'store'
import {post} from 'lib/api'

const authFormSubmit = ({setLoggedOut, setLoggedInUser, resetAuthForm, authFormType, user, typedUsername, typedPassword}) => {
  const authEndpoint = authFormType === 'signup'
    ? '/users' : '/login'
  if (user && user.name) {
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
  currentType: React.PropTypes.string.isRequired,
  setAuthFormType: React.PropTypes.func.isRequired,
}

function AuthView(props) {
  if (props.user && props.user.name) {
    return <LoggedInForm {...props}/>
  }
  if (props.authFormType === 'login') {
    return <LoginForm {...props}/>
  }
  return <SignupForm {...props}/>
}

AuthView.propTypes = {
  authFormType: React.PropTypes.string,
  user: React.PropTypes.object,
}

function LoggedInForm(props) {
  return (
    <form onSubmit={e => {
      e.preventDefault()
      authFormSubmit(props)
    }}>
      <span>{`Hi, ${props.user.name}!`}</span>
      <input type='submit' value='Log out'/>
    </form>
  )
}

LoggedInForm.propTypes = {
  user: React.PropTypes.object,
}

const LoginForm = props => <AuthForm authText='Log In' {...props}/>
const SignupForm = props => <AuthForm authText='Sign Up' {...props}/>

function AuthForm(props) {
  const switchProps = {setAuthFormType: props.setAuthFormType, currentType: props.authFormType}
  return (
    <form onSubmit={e => {
      e.preventDefault()
      authFormSubmit(props)
    }}>
      <h1>This is an Auth View</h1>
      <label htmlFor='username'>Username</label>
      <input
        type='text'
        name='username'
        value={props.typedUsername}
        onChange={e => props.typeUsername(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        name='password'
        value={props.typedPassword}
        onChange={e => props.typePassword(e.target.value)}
      />
      <input type='submit' value={props.authText}/>
      <Switch {...switchProps}/>
    </form>
  )
}

AuthForm.propTypes = {
  authText: React.PropTypes.string.isRequired,
  typePassword: React.PropTypes.func.isRequired,
  typeUsername: React.PropTypes.func.isRequired,
  typedPassword: React.PropTypes.string.isRequired,
  typedUsername: React.PropTypes.string.isRequired,
}

export default connectWith('auth')(AuthView)
