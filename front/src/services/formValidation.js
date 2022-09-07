import Joi from 'joi';

const signupSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .messages({
            "string.empty": "L'adresse mail est obligatoire",
            "string.email": "l'extension doit contenir un @ et un domaine en '.com' '.net' ou '.fr'",
        }),

    password: Joi.string()
        .required()
        .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
        .min(8)
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
            "string.empty": "Le nom est obligatoire",
            "string.min": "Le nom doit contenir au minimum 3 caractères",
            "string.max": "Le nom ne doit pas contenir plus de 30 caractères",
            "string.pattern.base": "Le nom ne doit pas contenir les caractères suivant  $ = < > /",
        }),
    firstname: Joi.string()
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
    avatar: Joi.object()
})

const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .messages({
            "string.empty": "L'adresse mail est obligatoire",
            "string.email": "l'extension doit contenir un @ et un domaine avec minimum deux caractères",
        }),

    password: Joi.string()
        .required()
        .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
        .min(8)
        .messages({
            "string.empty": "Le mot de passe est obligatoire",
            "string.min": "Le mot de passe doit contenir au minimum 8 caractères",
            "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et au miminum 8 caractères",
        })
})

const formValidationPost = (body) => {
    const formPostSchema = Joi.object({
        description: Joi.string()
            .empty('')
            .default('default value')
            .min(3)
            .max(1000)
            .pattern(new RegExp('^[^$=]{3,}$'))
            .messages({
                "string.min": "La description doit contenir au minimum 3 caractères",
                "string.max": "La description ne doit pas contenir plus de 1000 caractères",
                "string.pattern.base": "La description ne doit pas contenir de signe = ou $",
            }),
    })
    return formPostSchema.validate(body)
}
const formValidationComment = (body) => {
    const formCommentSchema = Joi.object({
        postId: Joi.number()
            .required()
            .messages({
                "number.empty": "L'identifiant du post n'est pas renseigné"
            }),
        description: Joi.string()
            .empty('')
            .default('default value')
            .min(3)
            .max(1000)
            .pattern(new RegExp('^[^$=]{3,}$'))
            .messages({
                "string.min": "La description doit contenir au minimum 3 caractères",
                "string.max": "La description ne doit pas contenir plus de 1000 caractères",
                "string.pattern.base": "La description ne doit pas contenir de signe = ou $",
            }),
    })
    return formCommentSchema.validate(body)
}

const formModifyValidation = (body) => {
    const formModifySchema = Joi.object({
        description: Joi.string()
            .empty('')
            .default('default value')
            .min(3)
            .max(1000)
            .pattern(new RegExp('^[^$=]{3,}$'))
            .messages({
                "string.min": "La description doit contenir au minimum 3 caractères",
                "string.max": "La description ne doit pas contenir plus de 1000 caractères",
                "string.pattern.base": "La description ne doit pas contenir de signe = ou $",
            }),
        image: Joi.string()
            .min(5)
            .max(255)
    })
    return formModifySchema.validate(body);
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
                "string.empty": "Le nom est obligatoire",
                "string.min": "Le nom doit contenir au minimum 3 caractères",
                "string.max": "Le nom ne doit pas contenir plus de 30 caractères",
                "string.pattern.base": "Le nom ne doit pas contenir les caractères suivant  $ = < > /",
            }),
        firstname: Joi.string()
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
        avatar: Joi.string()
            .min(5)
            .max(255)
    })
    return userModifySchema.validate(body);
}
const userModifyMinValidation = (body) => {
    const userModifySchema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
            .required()
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
    return userModifySchema.validate(body);
}

export { signupSchema, loginSchema, formValidationPost, formValidationComment, formModifyValidation, userModifyValidation, userModifyMinValidation }