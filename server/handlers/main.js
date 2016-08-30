import express from 'express'

import {logIn, logOut, signUp, getSessionUser} from './authHandlers'
import {createPost, getPosts, createComment} from './postHandlers'
import {indexPage} from './pageHandlers'

export default function attachEndpoints(app) {
  app.set('view engine', 'pug')
  app.use(getSessionUser)
  app.use('/build', express.static('build'))
  app.get('/', indexPage)
  app.get('/create-post', indexPage)
  app.post('/users', signUp)
  app.post('/users/:userId/posts', createPost)
  app.post('/login', logIn)
  app.post('/logout', logOut)
  app.get('/posts', getPosts)
  app.post('/posts/:postId/comments', createComment)
}
