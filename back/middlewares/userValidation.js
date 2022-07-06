import Joi from "joi";

const userSignupValidation = (body) =>{
    const userSchema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments:2, tlds: {allow: ['com', 'net', 'fr']}})
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
                "string.min":"Le mot de passe doit contenir au minimum 8 caractères",
                "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
                "string.empty": "Le mot de passe est obligatoire",
            }),
        lastname: Joi.string()
            .pattern(new RegExp('^[^$=]{3,30}$'))
            .required()
            .messages({
                "string.pattern.base":"Le prénom doit contenir entre 3 et 30 caractères",
                "string.empty":"Le prénom est obligatoire"
            }),

        firstname: Joi.string()
            .pattern(new RegExp('^[^$=]{3,30}$'))
            .required()
            .messages({
                "string.pattern.base":"Le nom doit contenir entre 3 et 30 caractères",
                "string.empty":"Le nom est obligatoire"
            }),
        avatar: Joi.string()
            .min(5)
            .max(255)
    })
    return userSchema.validate(body);
}

const userLoginValidation = (body) => {
    const userSchema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments:2, tlds: {allow: ['com', 'net', 'fr']}})
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
                "string.min":"Le mot de passe doit contenir au minimum 8 caractères",
                "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
                "string.empty": "Le mot de passe est obligatoire",
            })
    })
    return userSchema.validate(body)
}

const userModifyValidation = (body) =>{
    const userSchema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments:2, tlds: {allow: ['com', 'net', 'fr']}})
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
                "string.min":"Le mot de passe actuel doit contenir au minimum 8 caractères",
                "string.pattern.base": "Le mot de passe actuel doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
                "string.empty": "Le mot de passe actuel est obligatoire",
            }),
        newPassword: Joi.string()
            .min(8)
            .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
            .required()
            .messages({
                "string.min":"Le nouveau mot de passe doit contenir au minimum 8 caractères",
                "string.pattern.base": "Le nouveau mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
                "string.empty": "Le nouveau mot de passe est obligatoire",
            }),
        lastname: Joi.string()
            .pattern(new RegExp('^[^$=]{3,30}$'))
            .required()
            .messages({
                "string.pattern.base":"Le prénom doit contenir entre 3 et 30 caractères",
                "string.empty":"Le prénom est obligatoire"
            }),

        firstname: Joi.string()
            .pattern(new RegExp('^[^$=]{3,30}$'))
            .required()
            .messages({
                "string.pattern.base":"Le nom doit contenir entre 3 et 30 caractères",
                "string.empty":"Le nom est obligatoire"
            }),
        avatar: Joi.string()
            .min(5)
            .max(255)
    })
    return userSchema.validate(body);
}
const userModifyMinValidation = (body) =>{
    const userSchema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments:2, tlds: {allow: ['com', 'net', 'fr']}})
            .required()
            .messages({
                "string.email": "l'extension doit contenir un @ et un dommaine avec minimum deux caractères",
            }),
        lastname: Joi.string()
            .pattern(new RegExp('^[^$=]{3,30}$'))
            .required()
            .messages({
                "string.pattern.base":"Le prénom doit contenir entre 3 et 30 caractères",
                "string.empty":"Le prénom est obligatoire"
            }),
        firstname: Joi.string()
            .pattern(new RegExp('^[^$=]{3,30}$'))
            .required()
            .messages({
                "string.pattern.base":"Le nom doit contenir entre 3 et 30 caractères",
                "string.empty":"Le nom est obligatoire"
            }),
        avatar: Joi.string()
            .min(5)
            .max(255)
    })
    return userSchema.validate(body);
}

export {userSignupValidation, userLoginValidation, userModifyValidation, userModifyMinValidation}