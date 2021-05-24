import express from 'express';
import userController from '../controller/user'
const userController__ = new userController();
const userRoutes = express.Router();

userRoutes.route("/signUp").post(userController__.signUp)

export default userRoutes
 