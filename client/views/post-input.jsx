import React from 'react'
import {browserHistory} from 'react-router'
import {post} from 'lib/api'
import {connectWith} from 'store'

const postSubmit = ({user, typedPost, resetPost}) => {
  post(`/users/${user.id}/posts`, {post: typedPost})
  resetPost()
  browserHistory.push('/')
}

const PostInput = ({user, typePost, typedPost, resetPost}) => (
  !user.id ? null :
  <form onSubmit={e => {
    e.preventDefault()
    postSubmit({user, typedPost, resetPost})
  }}>
    <label htmlFor='post'>Type a post!</label>
    <textarea
      name='post'
      onChange={e => typePost(e.target.value)}
      value={typedPost}
    />
    <input type='submit'/>
  </form>
)

PostInput.defaultProps = {
  resetPost: () => null,
  typedPost: '',
  typePost: () => null,
  user: {},
}

PostInput.propTypes = {
  resetPost: React.PropTypes.func,
  typedPost: React.PropTypes.string,
  typePost: React.PropTypes.func,
  user: React.PropTypes.object,
}

export default connectWith('post', 'user')(PostInput)
