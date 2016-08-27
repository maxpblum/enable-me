import {createStore} from 'redux'
import {connect} from 'react-redux'
import {fromJS} from 'immutable'
import authUpdaters from 'updaters/auth'

const updaters = fromJS({
  auth: authUpdaters,
})
.map((updaterGroup, key) =>
  updaterGroup
  .map(updater =>
    (state, ...args) =>
      state.set(
        key,
        updater(state.get(key), ...args)
      )
  )
)

export default function getNewStore(bootstrapData) {
  const initialState = fromJS({
    auth: {
      authFormType: 'signup',
      ...bootstrapData,
    },
    post: {
      typedPost: '',
    },
  })

  const update = (state = initialState, action) =>
    updaters.getIn(action.type, s => s)(state, action.data, store)

  const store = createStore(update)

  return store
}

export const connectWith = key => connect(
  state => state.get(key).toJS(),
  dispatch =>
    updaters
    .get(key)
    .map((_, deepKey) =>
      data => dispatch({
        type: [key, deepKey],
        data,
      })
    )
    .toJS(),
)
