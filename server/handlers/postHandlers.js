import {Post} from '../models'
import {getLoggedInUser, handleUnauthorized} from '../utils/authUtils'

export function createPost(req, res) {
  getLoggedInUser(req, req.params.userId)
  .then(user =>
    Post.create({text: req.body.post})
    .then(post => post.setUser(user))
  )
  .then(() => res.sendStatus(200))
  .catch(handleUnauthorized(res))
}
