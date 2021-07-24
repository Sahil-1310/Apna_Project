import userService from '../../services/userServices';
import responseHandling from '../../Responses/responseHandling'
const userService__ = new userService();
class userController {
    async signUp(req, res) {
        try {
            const result = await userService__.SignUp(req, res);
            if (result.status == false)
                return responseHandling.sendError(res, result.message, result.code, null)

            return responseHandling.sendSuccess(res, null, 201, result);
        } catch (error) {
            return responseHandling.sendError(res, error.message, error.status, null)
        }
    }
    async otp(req, res) {
        try {
            if (req.decoded) {
                const result = await userService__.opt(req, res);
                if (result.status == false)
                    return responseHandling.sendError(res, result.message, result.code, null)

                return responseHandling.sendSuccess(res, result.message, null, null);
            }
        } catch (error) {
            return responseHandling.sendError(res, error.message, error.status, null)
        }

    }
}
export default userController