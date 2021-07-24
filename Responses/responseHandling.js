class ResponseHnadling {
    static sendSuccess(res, message, code, data) {
        const responseObject = {
            status: true,
            message: message || 'success',
            data: data || {}
        }
        let statuscode = code || 200;
        res.status(statuscode).json(responseObject)
    }
    static sendError(res, message, code, data) {
        const responseObject = {
            status: false,
            message: message || 'error',
            data: data || {}
        }
        let statuscode = code || 400;
        res.status(statuscode).json(responseObject)
    }

    static sendWrong(res, message, code, data) {
        const responseObject = {
            code: code || 500,
            message: message || 'something went wrong',
            data: data || {}
        }
        res.send(responseObject)
    }
}
export default ResponseHnadling;