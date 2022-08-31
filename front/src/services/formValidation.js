import Joi from 'joi';

const signupSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({minDomainSegments:2, tlds: {allow: ['com', 'net', 'fr']}})
        .messages({
            "string.empty": "L'adresse mail est obligatoire",
            "string.email": "l'extension doit contenir un @ et un dommaine avec minimum deux caractères",
        }),
        
    password: Joi.string()
        .required()
        .pattern(new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/))
        .min(8)
        .messages({
            "string.empty": "Le mot de passe est obligatoire",
            "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
            "string.min":"Le mot de passe doit contenir au minimum 8 caractères",
        }),
    lastname: Joi.string()
        .required()
        .min(3)
        .max(30)
        .pattern(new RegExp('^[^$=]{3,30}$'))
        .messages({
            "string.empty":"Le prénom est obligatoire",
            "string.min":"Le prénom doit contenir au minimum 3 caractères",
            "string.max":"Le prénom ne doit pas contenir plus de 30 caractères",
            "string.pattern.base":"Le prénom ne doit pas contenir les caractères $ ou =",
        }),
    firstname: Joi.string()
        .required()
        .min(3)
        .max(30)
        .pattern(new RegExp('^[^$=]{3,30}$'))
        .messages({
            "string.empty":"Le nom est obligatoire",
            "string.min":"Le nom doit contenir au minimum 3 caractères",
            "string.max":"Le nom ne doit pas contenir plus de 30 caractères",
            "string.pattern.base":"Le nom ne doit pas contenir les caractères $ ou =",
        }),
    avatar: Joi.object()
})

const loginSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({minDomainSegments:2, tlds: {allow: ['com', 'net', 'fr']}})
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
            "string.pattern.base": "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
            "string.min":"Le mot de passe doit contenir au minimum 8 caractères",
        })
})

const formValidationPost = (body) =>{
    const formSchema = Joi.object({
        description: Joi.string()
        .empty('')
        .default('default value')
        .min(3)
        .max(1000)
        .pattern(new RegExp('^[^$=]{3,}$'))
        .messages({
            "string.min":"La description doit contenir au minimum 3 caractères",
            "string.max":"La description ne doit pas contenir plus de 1000 caractères",
            "string.pattern.base":"La description ne doit pas contenir de signe = ou $",
        }),
    })
    return formSchema.validate(body)
}
const formValidationComment = (body) =>{
    const formSchema = Joi.object({
        postId: Joi.number()
            .required()
            .messages({
                "number.empty":"L'identifiant du post n'est pas renseigné"
            }),
        description: Joi.string()
        .empty('')
        .default('default value')
        .min(3)
        .max(1000)
        .pattern(new RegExp('^[^$=]{3,}$'))
        .messages({
            "string.min":"La description doit contenir au minimum 3 caractères",
            "string.max":"La description ne doit pas contenir plus de 1000 caractères",
            "string.pattern.base":"La description ne doit pas contenir de signe = ou $",
        }),
    })
    return formSchema.validate(body)
}

const formModifyValidation = (body) =>{
    const userSchema = Joi.object({
        description: Joi.string()
            .empty('')
            .default('default value')
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
    return userSchema.validate(body);
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
        .required()
        .min(3)
        .max(30)
        .pattern(new RegExp('^[^$=]{3,30}$'))
        .messages({
            "string.empty":"Le prénom est obligatoire",
            "string.min":"Le prénom doit contenir au minimum 3 caractères",
            "string.max":"Le prénom ne doit pas contenir plus de 30 caractères",
            "string.pattern.base":"Le prénom ne doit pas contenir les caractères $ ou =",
        }),
        firstname: Joi.string()
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[^$=]{3,30}$'))
            .messages({
                "string.empty":"Le nom est obligatoire",
                "string.min":"Le nom doit contenir au minimum 3 caractères",
                "string.max":"Le nom ne doit pas contenir plus de 30 caractères",
                "string.pattern.base":"Le nom ne doit pas contenir les caractères $ ou =",
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
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[^$=]{3,30}$'))
            .messages({
                "string.empty":"Le prénom est obligatoire",
                "string.min":"Le prénom doit contenir au minimum 3 caractères",
                "string.max":"Le prénom ne doit pas contenir plus de 30 caractères",
                "string.pattern.base":"Le prénom ne doit pas contenir les caractères $ ou =",
            }),
        firstname: Joi.string()
            .required()
            .min(3)
            .max(30)
            .pattern(new RegExp('^[^$=]{3,30}$'))
            .messages({
                "string.empty":"Le nom est obligatoire",
                "string.min":"Le nom doit contenir au minimum 3 caractères",
                "string.max":"Le nom ne doit pas contenir plus de 30 caractères",
                "string.pattern.base":"Le nom ne doit pas contenir les caractères $ ou =",
            }),
        avatar: Joi.string()
            .min(5)
            .max(255)
    })
    return userSchema.validate(body);
}

export {signupSchema, loginSchema, formValidationPost, formValidationComment, formModifyValidation, userModifyValidation, userModifyMinValidation}