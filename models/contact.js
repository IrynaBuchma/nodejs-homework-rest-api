const { Schema, model } = require("mongoose");

const Joi = require('joi');

const { handleMongooseError } = require("../helpers");

const phoneFormat = /\d{3}-\d{3}-\d{4}/;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    validate: {
      validator: function(v) {
        return phoneFormat.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required']
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {versionKey: false, timestamps:true});

contactSchema.post("save", handleMongooseError);

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().pattern(phoneFormat).required(),
    favorite: Joi.boolean(),
  });

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    schema,
    updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};