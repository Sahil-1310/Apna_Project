require('util').inspect.defaultOptions.depth = null
const twilo = require('twilio')(process.env.accountSid, process.env.authToken);

module.exports = {
    sendSms: async (payload) => {
        return await twilo.messages.create({
            body: payload.message,
            from: process.env.phonenumber,
            to: payload.phone
        }).then(message => {
            return message.status
        }).catch((err) => {
            return err;
        })
    }
}
