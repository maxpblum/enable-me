import {fromJS, Map} from 'immutable'

export default {
  setPosts: (state, posts) => state
    .set(
      'posts',
      state
        .get('posts')
        .merge(
          Map(
            posts.map(post =>
              [post.id, fromJS({typedComment: '', ...post})]
            )))),
  typeComment: (state, {id, comment}) => state
    .setIn(['posts', id, 'typedComment'], comment)
  ,
  resetComment: (state, id) => state
    .setIn(['posts', id, 'typedComment'], '')
}
