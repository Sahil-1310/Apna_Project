import Responses from '../Responses/Responses'
import CommonFunction from '../commonFunctions'
import Schema from '../model/index'
import { json } from 'express';
const commonFunction = new CommonFunction;
class userService {
    async SignUp(req, res) {
        try {
            const data = req.body;
            if (!data.phone && !data.email) {
                return {
                    status: false,
                    message: Responses.messages.Missing_parameter1
                }
            }
            if (data.phone) {
                let otp;
                commonFunction.otpGenerate().then(res => otp = res);
                return await Schema.user.create(data).then(res => {
                    return {
                        status: true,
                        otp: otp,
                        result: res,
                    }
                }).catch(err => {
                    return err
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export default userService;