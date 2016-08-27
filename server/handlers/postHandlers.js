import {User, Post} from '../models'

export function createPost(req, res) {
  const userId = req.params.userId
  User.findOne({where: {id: userId}})
  .then(user =>
    Post.create({text: req.body.post})
    .then(post => post.setUser(user))
  )
  .then(() => res.sendStatus(200))
}
