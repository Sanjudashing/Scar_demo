const Joi = require('joi');

const authValidation = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().regex(/^[A-Za-z\s]+$/).min(2).max(100).required().messages({
            "string.base": `Please give data in json!`,
            "string.pattern.base": `Name should only contain letters and spaces`,
            "string.min": `Name should have atleast 2 characters!`,
            "string.max": `Name cannot exceed more than 100 characters!`,
            "string.empty": `Please enter Name!`
        }),
        email: Joi.string()
            .email({ minDomainSegments: 2,tlds: { allow: ['com','net'] } }),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })
    const result = schema.validate(data);
    return result;
}

module.exports = { authValidation }