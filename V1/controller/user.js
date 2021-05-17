import userService from '../../services/userServices';
const userService__ = new userService();
class userController {
    async signUp (req, res){
        try {
            const result = await userService__.SignUp(req, null);
            res.json(result);
        } catch (error) {
            console.log(error)
        }
    }
}
export default userController