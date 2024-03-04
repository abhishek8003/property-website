const Joi = require("joi");

const vSchema = Joi.object(
    {
        listing: {
            price: Joi.number().min(1).required(),
            title: Joi.string().allow("").min(4),
            description: Joi.string().min(1).max(200).required(),
            image: Joi.object({
                filename: Joi.string().allow(""),
                url: Joi.string().allow("", '') // Allowing an empty string for image.url
            }),
            
            location: Joi.string().allow(""),
            country: Joi.string().allow("")
        }
    });

module.exports = vSchema;
