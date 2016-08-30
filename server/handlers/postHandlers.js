import {Promise} from 'when'

import {Post, User, Comment} from '../models'
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

export function getPosts(req, res) {
  Post.findAll({include: [User]})
  .then(posts => res.status(200).send(posts))
}

export function getPost(id) {
  return Post.find({where: {id}})
}

export function createComment(req, res) {
  return Promise.all([
    getLoggedInUser(req, req.params.userId),
    getPost(req.params.postId),
  ])
  .then(([user, post]) =>
    Comment.create({text: req.body.comment})
    .then(comment => Promise.all([
      comment.setUser(user),
      comment.setPost(post),
    ]))
  )
  .then(() => res.sendStatus(200))
}
