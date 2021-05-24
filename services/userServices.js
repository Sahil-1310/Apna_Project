import Responses from '../Responses/Responses'
import CommonFunction from '../commonFunctions'
import responseHandling from '../Responses/errorHandling'
import utils from '../util/index'
import Schema from '../model/index'
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
            const isExist = await Schema.user.findByPhone(data);
            if (isExist == true) throw new Error("This Phone Already Exist")

            let otp = commonFunction.otpGenerate();

            const payload = {
               message: `${otp} is your OTP. Do not share it with anyone.`,
               phone: data.countryCode + data.phone
            }

            return await utils.basicFunction.sendSms(payload) === 'queued' ? await Schema.user.create(data).then(async res => {
               return {
                  status: true,
                  otp: otp,
                  result: res,
               }
            }).catch(err => { throw err }) :  {status: false, message: "The 'To' number  is not a valid phone number"}
         }
      } catch (error) {
         throw error
      }
   }
}
export default userService;