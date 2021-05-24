import userService from '../../services/userServices';
import responseHandling from '../../Responses/errorHandling'
const userService__ = new userService();
class userController {
    async signUp(req, res) {
        try {
            const result = await userService__.SignUp(req, null);
            if (result.status == false)
               return responseHandling.sendError(res, result.message, 403, null)

           return responseHandling.sendSuccess(res, null, 201, result);
        } catch (error) {
           return responseHandling.sendError(res, error.message, 403, null)
        }
    }
}
export default userController