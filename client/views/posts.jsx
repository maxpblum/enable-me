import React from 'react'
import {Link} from 'react-router'

import {connectWith} from 'store'

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

const Post = ({user, text, comments}) => (
  <div>
    {user.name} wrote: {text}
    {comments.map((comment) => <Comment {...comment}/>)}
  </div>
)

Post.propTypes = {
  user: React.PropTypes.object,
  text: React.PropTypes.string,
  comments: React.PropTypes.array,
}

Post.defaultProps = {
  user: {},
  text: '',
  comments: [],
}

const Posts = ({posts}) => (
  <div>
    <Link to='/create-post'>Create a post</Link>
    {posts.map(post => <Post key={`post-${post.id}`} {...post}/>)}
  </div>
)

Posts.propTypes = {
  posts: React.PropTypes.array,
}

Posts.defaultProps = {
  posts: [],
}

export default connectWith('posts')(Posts)
