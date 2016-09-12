import React from 'react'
import {Link} from 'react-router'

import _ from 'lodash'

import {connectWith} from 'store'
import {get, post} from 'lib/api'

const Comment = ({user, text}) => (
  <div>At 6:24 PM, {user.name} commented: {text}</div>
)

Comment.propTypes = {
  user: React.PropTypes.object,
  text: React.PropTypes.string,
}

Comment.defaultProps = {
  user: {},
  text: '',
}

const Post = ({
  user,
  text,
  comments,
  typedComment,
  typeComment,
  submitComment,
}) => (
  <form className='post' onSubmit={e => {
    e.preventDefault()
    submitComment(typedComment)
  }}>
    At 6:23 PM, {user.name} wrote: {text}
    {comments.map((comment) => <Comment className='comment' key={`comment-${comment.id}`} {...comment}/>)}
    <div className='comment-input'>
      <label htmlFor='comment'>Write a comment</label>
      <input
        type='text'
        name='comment'
        value={typedComment}
        onChange={e => typeComment(e.target.value)}
      />
      <input type='submit'/>
    </div>
  </form>
)

Post.propTypes = {
  user: React.PropTypes.object,
  text: React.PropTypes.string,
  comments: React.PropTypes.array,
  typedComment: React.PropTypes.string,
  typeComment: React.PropTypes.func,
  submitComment: React.PropTypes.func,
}

Post.defaultProps = {
  user: {},
  text: '',
  comments: [],
  typedComment: '',
}

const submitComment = (postId, comment) =>
  post(`/posts/${postId}/comments`, {comment})

const Posts = ({posts, resetComment, typeComment, setError, setPosts}) => (
  <div>
    <Link to='/create-post'>Create a post</Link>
    {_.values(posts).map(post =>
      <Post
        key={`post-${post.id}`}
        typeComment={comment => typeComment({id: post.id, comment})}
        submitComment={comment =>
          submitComment(post.id, comment)
          .catch(e => setError(e.message))
          .then(() => resetComment(post.id))
          .then(() => get('/posts'))
          .then(posts => setPosts(JSON.parse(posts)))
        }
        {...post}
      />
    )}
  </div>
)

Posts.propTypes = {
  posts: React.PropTypes.object,
  resetComment: React.PropTypes.func,
  setError: React.PropTypes.func,
  setPosts: React.PropTypes.func,
  typeComment: React.PropTypes.func,
}

Posts.defaultProps = {
  posts: {},
  submitComment: () => null,
  typeComment: () => null,
}

export default connectWith('posts', 'error')(Posts)
