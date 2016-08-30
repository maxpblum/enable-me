import {createStore} from 'redux'
import {connect} from 'react-redux'
import {fromJS, Map} from 'immutable'
import authUpdaters from 'updaters/auth'
import postUpdaters from 'updaters/post'
import postsUpdaters from 'updaters/posts'
import userUpdaters from 'updaters/user'

const updaters = fromJS({
  auth: authUpdaters,
  post: postUpdaters,
  posts: postsUpdaters,
  user: userUpdaters,
})
.map((updaterGroup, key) =>
  updaterGroup
  .map(updater =>
    (state, data) =>
      state.set(
        key,
        updater(state.get(key), data)
      )
  )
)

export default function getNewStore(bootstrapData) {
  const initialState = fromJS({
    auth: {
      authFormType: 'signup',
      typedUsername: '',
      typedPassword: '',
    },
    post: {
      typedPost: '',
    },
    posts: {
      posts: {},
    },
    user: {...bootstrapData},
  })

  const update = (state = initialState, action) =>
    updaters.getIn(action.type, s => s)(state, action.data)

  const store = createStore(update)

  return store
}

export const connectWith = (...keys) => connect(
  state => Map().merge(...keys.map(key => state.get(key))).toJS(),
  dispatch => Map().merge(...keys.map(key =>
    updaters
    .get(key)
    .map((_, deepKey) =>
      data => dispatch({
        type: [key, deepKey],
        data,
      })
    )
  )).toJS(),
)
