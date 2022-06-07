import Joi from "joi";

const userValidation = (body) =>{
    const userSchema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments:2, tlds: {allow: ['com', 'net', 'fr']}})
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        lastname: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{2,30}$'))
            .required(),
        firstname: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(2)
            .max(30)
            .required(),
        avatar: Joi.string()
            .min(5)
            .max(255)
    })
    return userSchema.validate(body);
}

export default userValidation;