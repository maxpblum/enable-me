import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router'

import AuthView from 'views/auth'
import PostInput from 'views/post-input'

import getNewStore from 'store'

const store = getNewStore(window.BOOTSTRAP)

const Page = ({children}) => (
  <div>
    <AuthView store={store}/>
    {children}
  </div>
)

Page.propTypes = {children: React.PropTypes.object}

const Posts = () => (
  <Link to='/create-post'>Create a post</Link>
)

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Page}>
      <IndexRoute component={Posts}/>
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
