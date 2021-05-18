const express = require("express")
const routes = express.Router()

const ProfileController = require('./controllers/ProfileController')
const JobControllers = require('./controllers/JobController')
const DashboardController = require("./controllers/DashboardController")

routes.get('/', DashboardController.index)

routes.get('/job', JobControllers.create)

routes.post('/job', JobControllers.save)

routes.get('/job/:id', JobControllers.show)

routes.post('/job/:id', JobControllers.update)

routes.post('/job/delete/:id', JobControllers.delete)

routes.get('/profile', ProfileController.index)

routes.post('/profile', ProfileController.update)

module.exports = routes;