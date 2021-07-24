import Joi from 'joi';

class Validtors {
    static userValidation(req, res, next) {
        let schema = Joi.object().keys({
            firstname         : Joi.string().required(),
            lastname          : Joi.string().required(),
            password          : Joi.string().required(),
            phone             : Joi.number().optional(),
            email             : Joi.array().optional(),
            countrycode       : Joi.string().optional()
        });

        const validation = schema.validate(req.body);
        if (validation.error) {
            res.send(validation.error.details[0].message);
        }
        next();
    }
}
export default Validtors;