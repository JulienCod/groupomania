import Joi from "joi";

const formPostValidation = (body) =>{
    const userSchema = Joi.object({
        userId: Joi.number()
            .required()
            .messages({
                "number.empty":"L'identifiant de l'utilisateur n'est pas renseignée"
            }),
        description: Joi.string()
            .pattern(new RegExp('^[^$=]{3,}$'))
            .messages({
                "string.pattern.base":"Le texte doit contenir au moins 3 caractères et ne doivent pas contenir de signe = ou $"
            }),
        image: Joi.string()
            .min(5)
            .max(255)
    })
    return userSchema.validate(body);
}

const formCommentValidation = (body) =>{
    const userSchema = Joi.object({
        userId: Joi.number()
            .required()
            .messages({
                "number.empty":"L'identifiant de l'utilisateur n'est pas renseigné"
            }),
        postId: Joi.number()
            .required()
            .messages({
                "number.empty":"L'identifiant du post n'est pas renseigné"
            }),
        description: Joi.string()
            .pattern(new RegExp('^[^$=]{3,}$'))
            .messages({
                "string.pattern.base":"Le texte doit contenir au moins 3 caractères et ne doivent pas contenir de signe = ou $"
            }),
        image: Joi.string()
            .min(5)
            .max(255)
    })
    return userSchema.validate(body);
}
const formModifyValidation = (body) =>{
    const userSchema = Joi.object({
        description: Joi.string()
            .pattern(new RegExp('^[^$=]{3,}$'))
            .messages({
                "string.pattern.base":"Le texte doit contenir au moins 3 caractères et ne doivent pas contenir de signe = ou $"
            }),
        image: Joi.string()
            .min(5)
            .max(255)
    })
    return userSchema.validate(body);
}

export {formPostValidation, formCommentValidation, formModifyValidation}