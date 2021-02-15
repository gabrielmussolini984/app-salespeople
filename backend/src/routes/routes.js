const express = require('express')
const Session = require('./session.routes')
const Sale = require('./sale.routes')


const routes = express.Router()

routes.use('/session', Session)
routes.use('/sale', Sale)

module.exports = routes;