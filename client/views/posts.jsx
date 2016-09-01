import React from 'react'
import {Link} from 'react-router'

import _ from 'lodash'

import {connectWith} from 'store'
import {get, post} from 'lib/api'

const Comment = ({user, text}) => (
  <div>{user.name} commented: {text}</div>
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
  <form onSubmit={e => {
    e.preventDefault()
    submitComment(typedComment)
  }}>
    {user.name} wrote: {text}
    {comments.map((comment) => <Comment key={`comment-${comment.id}`} {...comment}/>)}
    <label htmlFor='comment'>Write a comment</label>
    <input
      type='text'
      name='comment'
      value={typedComment}
      onChange={e => typeComment(e.target.value)}
    />
    <input type='submit'/>
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

const Posts = ({posts, resetComment, typeComment, setPosts}) => (
  <div>
    <Link to='/create-post'>Create a post</Link>
    {_.values(posts).map(post =>
      <Post
        key={`post-${post.id}`}
        typeComment={comment => typeComment({id: post.id, comment})}
        submitComment={comment =>
          submitComment(post.id, comment)
          .then(() => resetComment(post.id))
          .then(get('/posts'))
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
  setPosts: React.PropTypes.func,
  typeComment: React.PropTypes.func,
}

Posts.defaultProps = {
  posts: {},
  submitComment: () => null,
  typeComment: () => null,
}

export default connectWith('posts')(Posts)
