import React from 'react'

export default function AuthView() {
  return (
    <form
      action='/endpoint'
    >
      <h1>This is an Auth View</h1>
      <label htmlFor='username'>Username</label>
      <input type='text' name='username'/>
      <label htmlFor='password'>Password</label>
      <input type='password' name='password'/>
      <input type='submit'/>
    </form>
  )
}
