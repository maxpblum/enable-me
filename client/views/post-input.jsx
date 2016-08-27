import React from 'react'

const PostInput = () => (
  <form onSubmit={e => e.preventDefault()}>
    <label htmlFor='post'>Type a post!</label>
    <textarea name='post'/>
    <input type='submit'/>
  </form>
)

export default PostInput
