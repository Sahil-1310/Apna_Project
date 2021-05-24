
class ResponseHnadling {

    static sendSuccess(res, message, code, data) {
        const responseObject = {
            code: code || 200,
            message: message || 'success',
            data: data || {}
        }
        res.send(responseObject)
    }
    static sendError (res, message, code, data){
        const responseObject = {
            code: code || 400,
            message: message || 'error',
            data: data || {}
        }
        res.status(responseObject.code).json(responseObject)
    }

    static sendWrong (res, message, code, data){
        const responseObject = {
            code: code || 500,
            message: message || 'something went wrong',
            data: data || {}
        }
        res.send(responseObject)
    }
}

export default ResponseHnadling;