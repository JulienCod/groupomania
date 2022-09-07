import Joi from "joi";

const userSignupValidation = (body) => {
    const userSignupSchema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
            .required()
            .messages({
                "string.email": "l'extension doit contenir un @ et un dommaine avec minimum deux caractères",
                "string.empty": "L'adresse mail est obligatoire",
            }),

        password: Joi.string()
            .min(8)
            .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
            .required()
            .messages({
                "string.empty": "Le mot de passe est obligatoire",
                "string.min": "Le mot de passe doit contenir au minimum 8 caractères",
                "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et au miminum 8 caractères",
            }),
        lastname: Joi.string()
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[^$=<>/]{3,30}$'))
            .messages({
                "string.empty": "Le prénom est obligatoire",
                "string.min": "Le prénom doit contenir au minimum 3 caractères",
                "string.max": "Le prénom ne doit pas contenir plus de 30 caractères",
                "string.pattern.base": "Le prénom ne doit pas contenir les caractères suivant  $ = < > /",
            }),
        firstname: Joi.string()
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[^$=<>/]{3,30}$'))
            .messages({
                "string.empty": "Le nom est obligatoire",
                "string.min": "Le nom doit contenir au minimum 3 caractères",
                "string.max": "Le nom ne doit pas contenir plus de 30 caractères",
                "string.pattern.base": "Le nom ne doit pas contenir les caractères suivant  $ = < > /",
            }),
        avatar: Joi.string()
            .min(5)
            .max(255)
    })
    return userSignupSchema.validate(body);
}

const userLoginValidation = (body) => {
    const userLoginSchema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
            .required()
            .messages({
                "string.email": "l'extension doit contenir un @ et un domaine avec minimum deux caractères",
                "string.empty": "L'adresse mail est obligatoire",
            }),

        password: Joi.string()
            .min(8)
            .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
            .required()
            .messages({
                "string.min": "Le mot de passe doit contenir au minimum 8 caractères",
                "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
                "string.empty": "Le mot de passe est obligatoire",
            })
    })
    return userLoginSchema.validate(body)
}

const userModifyValidation = (body) => {
    const userModifySchema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
            .required()
            .messages({
                "string.email": "l'extension doit contenir un @ et un dommaine avec minimum deux caractères",
                "string.empty": "L'adresse mail est obligatoire",
            }),

        password: Joi.string()
            .min(8)
            .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
            .required()
            .messages({
                "string.empty": "Le mot de passe est obligatoire",
                "string.min": "Le mot de passe doit contenir au minimum 8 caractères",
                "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et au miminum 8 caractères",
            }),
        newPassword: Joi.string()
            .min(8)
            .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
            .required()
            .messages({
                "string.empty": "Le mot de passe est obligatoire",
                "string.min": "Le mot de passe doit contenir au minimum 8 caractères",
                "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et au miminum 8 caractères",
            }),
        lastname: Joi.string()
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[^$=<>/]{3,30}$'))
            .messages({
                "string.empty": "Le prénom est obligatoire",
                "string.min": "Le prénom doit contenir au minimum 3 caractères",
                "string.max": "Le prénom ne doit pas contenir plus de 30 caractères",
                "string.pattern.base": "Le prénom ne doit pas contenir les caractères suivant  $ = < > /",
            }),
        firstname: Joi.string()
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[^$=<>/]{3,30}$'))
            .messages({
                "string.empty": "Le nom est obligatoire",
                "string.min": "Le nom doit contenir au minimum 3 caractères",
                "string.max": "Le nom ne doit pas contenir plus de 30 caractères",
                "string.pattern.base": "Le nom ne doit pas contenir les caractères suivant  $ = < > /",
            }),
        avatar: Joi.string()
            .min(5)
            .max(255)
    })
    return userModifySchema.validate(body);
}
const userModifyMinValidation = (body) => {
    const userModifyMinSchema = Joi.object({
        email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
            .messages({
                "string.email": "l'extension doit contenir un @ et un dommaine avec minimum deux caractères",
            }),
        lastname: Joi.string()
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[^$=<>/]{3,30}$'))
            .messages({
                "string.empty": "Le prénom est obligatoire",
                "string.min": "Le prénom doit contenir au minimum 3 caractères",
                "string.max": "Le prénom ne doit pas contenir plus de 30 caractères",
                "string.pattern.base": "Le prénom ne doit pas contenir les caractères suivant  $ = < > /",
            }),
        firstname: Joi.string()
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[^$=<>/]{3,30}$'))
            .messages({
                "string.empty": "Le nom est obligatoire",
                "string.min": "Le nom doit contenir au minimum 3 caractères",
                "string.max": "Le nom ne doit pas contenir plus de 30 caractères",
                "string.pattern.base": "Le nom ne doit pas contenir les caractères suivant  $ = < > /",
            }),
        avatar: Joi.string()
            .min(5)
            .max(255)
    })
    return userModifyMinSchema.validate(body);
}

export { userSignupValidation, userLoginValidation, userModifyValidation, userModifyMinValidation }