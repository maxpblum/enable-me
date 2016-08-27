export default {
  resetPost: state => state.set('typedPost', ''),

  typePost: (state, post) =>
    state.set('typedPost', post),
}
