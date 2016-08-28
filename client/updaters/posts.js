import {fromJS} from 'immutable'

export default {
  setPosts: (state, posts) => state.set('posts', fromJS(posts)),
}
