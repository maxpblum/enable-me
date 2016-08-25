import Sequelize from 'sequelize'
import logging from 'winston'

const db = new Sequelize('max', 'max', 'password', {
  host: 'localhost',
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
      field: 'name',
    },
    hashedPassword: {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'hashed_password',
    },
    passwordSalt: {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'password_salt',
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
      field: 'token',
    },
    ttl: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  },
  {underscored: true},
)

Session.belongsTo(User)

const sync = () => db.sync({
  force: true,
  logging: info => logging.info(info)
})

export { User, Session, sync }
