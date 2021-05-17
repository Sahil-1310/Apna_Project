import Responses from '../Responses/Responses'
const responses = new Responses();
class userService {
    async SignUp(req, res) {
        try {
            const data = req.body;
            if(!data.phone && !data.email) {
                return {
                    status: false,
                    message: responses.messages.Missing_parameter1
                }
            }
            if(data.phone) {

            }
        } catch (error) {
            console.log(error);
        }
    }
}
export default userService;