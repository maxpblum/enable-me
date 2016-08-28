import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'

import AuthView from 'views/auth'
import PostInput from 'views/post-input'

import getNewStore, {connectWith} from 'store'

import {get} from 'lib/api'

const store = getNewStore(window.BOOTSTRAP)

const Page = ({children}) => (
  <div>
    <AuthView store={store}/>
    {children}
  </div>
)

Page.propTypes = {children: React.PropTypes.object}

const Posts = ({posts}) => (
  <div>
    <Link to='/create-post'>Create a post</Link>
    {posts.map(post => <p key={`post-${post.id}`}>{post.user.name} wrote: {post.text}</p>)}
  </div>
)

Posts.propTypes = {
  posts: React.PropTypes.array,
}

Posts.defaultProps = {
  posts: [],
}

const ConnectedPosts = connectWith('posts')(Posts)

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Page}>
      <IndexRoute
        onEnter={() =>
          get('/posts')
          .then(posts => store.dispatch({
            type: ['posts', 'setPosts'],
            data: JSON.parse(posts),
          }))
        }
        component={() => <ConnectedPosts store={store}/>}
      />
      <Route
        path='create-post'
        component={() =>
          <div>
            <Link to='/'>Read posts</Link>
            <PostInput store={store}/>
          </div>
        }
      />
    </Route>
  </Router>,
  document.getElementById('root')
)
