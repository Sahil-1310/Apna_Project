import Responses from '../Responses/Responses'
import CommonFunction from '../commonFunctions'
import utils from '../util/index'
import Schema from '../model/index'
import { Error } from 'mongoose';

// objects of class
const util = new utils();
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
         if (data.phone && data.countryCode) {
            let otp = commonFunction.otpGenerate();
            const payload = {
               message: `${otp} is your OTP. Do not share it with anyone.`,
               phone: data.countryCode + data.phone
            }
            return await util.sendSms(payload) === 'queued' ? await Schema.user.create(data).then(async res => {
               return {
                  status: true,
                  otp: otp,
                  result: res,
               }
            }).catch(err => { throw new Error(err) }) : "The 'To' number  is not a valid phone number"
         }
      } catch (error) {
         
         throw new Error(error);
      }
   }
}
export default userService;