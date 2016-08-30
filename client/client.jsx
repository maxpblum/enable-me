import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'

import AuthView from 'views/auth'
import Posts from 'views/posts'
import PostInput from 'views/post-input'

import getNewStore from 'store'

import {get} from 'lib/api'

const store = getNewStore(window.BOOTSTRAP)
const fetchPosts = () =>
  get('/posts')
  .then(posts => store.dispatch({
    type: ['posts', 'setPosts'],
    data: JSON.parse(posts),
  }))

const Page = ({children}) => (
  <div>
    <AuthView store={store}/>
    {children}
  </div>
)

Page.propTypes = {children: React.PropTypes.object}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Page}>
      <IndexRoute
        onEnter={fetchPosts}
        component={() => <Posts store={store}/>}
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
