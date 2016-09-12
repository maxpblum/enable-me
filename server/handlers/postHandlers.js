import logging from 'winston'
import {Promise} from 'when'

import {Post, User, Comment} from '../models'
import {getLoggedInUser, handleUnauthorized} from '../utils/authUtils'
import firstBadSentence from '../utils/sentiment'

export function createPost(req, res) {
  getLoggedInUser(req, req.params.userId)
  .then(user =>
    Post.create({text: req.body.post, user_id: user.id})
  )
  .then(() => res.sendStatus(200))
  .catch(handleUnauthorized(res))
}

export function getPosts(req, res) {
  Post.findAll({include: [User, {model: Comment, include: [User]}]})
  .then(posts => res.status(200).send(posts))
}

export function getPost(id) {
  return Post.find({where: {id}})
}

export function createComment(req, res) {
  return getPost(req.params.postId)
  .then(post =>
    Comment.create({text: req.body.comment})
    .then(comment => {
      const badSentence = firstBadSentence(comment.text)
      if (badSentence) {
        return res.status(400).send(`Whoops, this sentence isn't positive enough: ${badSentence}`)
      }
      logging.info('comment: ', comment)
      return Promise.all([
        comment.setUser(req.user),
        comment.setPost(post),
      ])
    })
  )
  .then(() => res.sendStatus(200))
}
