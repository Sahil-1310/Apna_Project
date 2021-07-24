module.exports = {
    messages: {
        Create: "Create an account sucessFully",
        Missing_parameter1: "Parameter Missing",
        AlreadyExistNumber: "This Phone Already Exist",
        AlreadyExistEmail: "This Email Already Exist",
        InValid: "The number is not a valid phone number",
        Authorization: "Please provide Valid token",
        InValidToken: "Token expired or invalid",
        Verified: "Account Verified Successfully",
        InvalidOTP: "Invalid OTP"
    },
    statusCode: {
        Success: {
            OK: 200,
            Created: 201,
            Accepted: 202,
            Non_AuthoritativeInformation: 203,
            No_Content: 204,
            Reset_Content: 205,
            Partial_Content: 206,
            Multi_Status: 207,
            Already_Reported: 208,
            IM_Used: 226
        },
        BadRequest: {
            Unauthorized: 401,
            Payment_Required: 402,
            Forbidden: 403,
            NotFound: 404,
            Method_Not_Allowed: 405,
            Not_Acceptable: 406,
            Proxy_Authentication_Required: 407,
            Request_Timeout: 408,
            Conflict: 409,
            Gone: 410
        }
        // 411 Length Required
        // 412 Precondition Failed
        // 413 Payload Too Large
        // 414 URI Too Long
        // 415 Unsupported Media Type
        // 416 Range Not Satisfiable
        // 417 Expectation Failed
        // 418 I'm a teapot
        // 420 Method Failure
        // 421 Misdirected Request
        // 422 Unprocessable Entity
        // 423 Locked
        // 424 Failed Dependency
        // 426 Upgrade Required
        // 428 Precondition Required
        // 429 Too Many Requests
        // 431 Request Header Fields Too Large
        // 451 Unavailable For Legal Reasons
        //         }
        // 5XX Server errors
        // 500 Internal Server error
        // 501 Not Implemented
        // 502 Bad Gateway
        // 503 Service Unavailable
        // 504 gateway Timeout
        // 505 Http version not supported
        // 506 Varient Also negotiate
        // 507 Insufficient Storage
        // 508 Loop Detected
        // 510 Not Extended
        // 511 Network Authentication Required
    }
}