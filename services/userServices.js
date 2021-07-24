import Responses from '../Responses/Responses'
import CommonFunction from '../util/commonFunctions'
import Schema from '../model/index'
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
         if (data.phone && data.countrycode) {
            const isExist = await Schema.user.findByPhone(data);
            if (isExist == true) throw new Error(Responses.messages.AlreadyExistNumber)


            let otp = await CommonFunction.otpGenerate();

            const payload = {
               message: `${otp} is your OTP. Do not share it with anyone.`,
               phone: data.countryCode + data.phone
            }
            //return await utils.basicFunction.sendSms(payload) === 'queued' ?
            return await Schema.user.create(data).then(async res => {
               const token = await CommonFunction.jwtIssue(res._id);
               await Schema.otp.create({ user: res._id, phone: res.phone, otp: otp });
               return {
                  otp: otp,
                  token: `Bareer ${token}`
               }
            }).catch(err => { throw err })
            // : { status: false, message: Responses.messages.InValid }
         }
      } catch (error) {
         throw error
      }
   }
   async opt(req, res) {
      try {
         const body = req.body;
         if (!body.otp)
            return {
               status: false,
               message: Responses.messages.Missing_parameter1
            }

         if (body.otp) {
            const result = await Schema.otp.find({ user: req.decoded });
            if (result[0].isVerified == true) {
               return {
                  message: "User Already Verified"
               }
            }

            return result[0].otp == body.otp ? await Schema.user.findByIdAndUpdate(result[0].user, { $set: { isVerified: true } }, { new: true }).then(async res => {
               if (res.isVerified == true) {
                  await Schema.otp.findByIdAndUpdate(result[0]._id, { $set: { isVerified: true } });
                  return {
                     message: Responses.messages.Verified
                  }
               }
            }).catch(err => { throw err }) : { status: false, message: Responses.messages.InvalidOTP, code: Responses.statusCode.Success.No_Content }
         }
      } catch (error) {
         throw error
      }
   }
}
export default userService;