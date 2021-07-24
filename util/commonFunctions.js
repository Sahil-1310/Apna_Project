import { sign, verify } from 'jsonwebtoken';
import response from '../Responses/Responses';
import responseHandling from '../Responses/responseHandling';
class commonFunction {
    static otpGenerate() {
        let value = ''
        for (var i = 0; i < 4; i++) {
            const randValue = Math.floor((Math.random() * 10) % 10);
            value += randValue;
        }
        return value;
    }
    static async jwtIssue(payload) {
        console.log(payload);
        return await sign({ _id: payload._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    }

    static authentication(req, res, next) {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return responseHandling.sendError(res, response.messages.Authorization, response.statusCode.Success.Non_AuthoritativeInformation, null)

        verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return responseHandling.sendError(res, response.messages.InValidToken, response.statusCode.BadRequest.Forbidden, null)
            req.decoded = decoded;
        })
        next();
    }
}
export default commonFunction