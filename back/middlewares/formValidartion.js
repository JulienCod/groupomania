import Joi from "joi";

const formPostValidation = (body) =>{
    const formPostSchema = Joi.object({
        userId: Joi.number()
            .required()
            .messages({
                "number.empty":"L'identifiant de l'utilisateur n'est pas renseignée"
            }),
        description: Joi.string()
            .min(3)
            .max(1000)
            .pattern(new RegExp('^[^$=]{3,}$'))
            .messages({
                "string.min":"La description doit contenir au minimum 3 caractères",
                "string.max":"La description ne doit pas contenir plus de 1000 caractères",
                "string.pattern.base":"La description ne doit pas contenir de signe = ou $",
            }),
        image: Joi.string()
            .min(5)
            .max(255)
    })
    return formPostSchema.validate(body);
}

const formCommentValidation = (body) =>{
    const formCommentSchema = Joi.object({
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
            .min(3)
            .max(1000)
            .pattern(new RegExp('^[^$=]{3,}$'))
            .messages({
                "string.min":"La description doit contenir au minimum 3 caractères",
                "string.max":"La description ne doit pas contenir plus de 1000 caractères",
                "string.pattern.base":"La description ne doit pas contenir de signe = ou $",
            }),
        image: Joi.string()
            .min(5)
            .max(255)
    })
    return formCommentSchema.validate(body);
}
const formModifyValidation = (body) =>{
    const formModifySchema = Joi.object({
        description: Joi.string()
            .min(3)
            .max(1000)
            .pattern(new RegExp('^[^$=]{3,}$'))
            .messages({
                "string.min":"La description doit contenir au minimum 3 caractères",
                "string.max":"La description ne doit pas contenir plus de 1000 caractères",
                "string.pattern.base":"La description ne doit pas contenir de signe = ou $",
            }),
        image: Joi.string()
            .min(5)
            .max(255)
    })
    return formModifySchema.validate(body);
}

export {formPostValidation, formCommentValidation, formModifyValidation}