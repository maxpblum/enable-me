import Sequelize from 'sequelize'

const db = new Sequelize('max', 'max', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    field: 'name',
  },
})

const sync = () => [
  User,
].map(model => model.sync({force: true}))

export { User, sync }
