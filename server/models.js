import Sequelize from 'sequelize'
import logging from 'winston'

const PG_STRING = process.env.DATABASE_URL
const PG_HOST = process.env.PG_HOST || 'localhost'
const PG_USER = process.env.PG_USER || 'default'
const PG_PASSWORD = process.env.PG_PASSWORD || 'password'
const PG_DB = process.env.PG_DB || 'default'

const db = PG_STRING
? new Sequelize(PG_STRING, {dialect: 'postgres', pool: {max: 5, min: 0, idle: 10000}})
: new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
})

const User = db.define(
  'user',
  {
    name: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    hashedPassword: {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'hashed_password',
    },
  },
  {underscored: true},
)

const Session = db.define(
  'session',
  {
    token: {
      allowNull: false,
      type: Sequelize.STRING(512),
      unique: true,
    },
    ttl: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  },
  {underscored: true},
)

const Post = db.define(
  'post',
  {
    text: {
      allowNull: false,
      type: Sequelize.STRING(10000),
    },
  },
  {underscored: true},
)

const Comment = db.define(
  'comment',
  {
    text: {
      allowNull: false,
      type: Sequelize.STRING(10000),
    },
  },
  {underscored: true},
)

Session.belongsTo(User)

Post.belongsTo(User)
Post.hasMany(Comment)

Comment.belongsTo(User)
Comment.belongsTo(Post)

const sync = ({force=false}) => db.sync({force, logging: info => logging.info(info)})

export { User, Session, Post, Comment, sync }
