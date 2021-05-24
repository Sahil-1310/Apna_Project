import userService from '../../services/userServices';
const userService__ = new userService();
class userController {
    async signUp (req, res){
        try {
            const result = await userService__.SignUp(req, null);
            res.json(result);
        } catch (error) {
            res.json(error)
        }
    }
}
export default userController