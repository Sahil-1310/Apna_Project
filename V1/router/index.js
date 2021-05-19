import user from './user';
import express from 'express';
const routes = express.Router();
routes.use("/user",user)

module.exports = routes;