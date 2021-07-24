import express from 'express';
import userController from '../controller/user'
import commonFunction from '../../util/commonFunctions';
import userValidator  from '../Validators/userValidator'
const userController__ = new userController();
const userRoutes = express.Router();

userRoutes.route("/signUp").post(userValidator.userValidation,userController__.signUp)
userRoutes.route("/verify").get(commonFunction.authentication, userController__.otp)

export default userRoutes
