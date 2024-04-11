// schema.js
const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().optional(),
});

const commentSchema = Joi.object({
    comment : Joi.object({
        comment: Joi.string().required(),
    }).required(),
});

const noticeSchema = Joi.object({
  notice : Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
  }).required(),
});

const userSchema = Joi.object({
  username: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().regex(/^[a-zA-Z0-9._-]+@vit\.edu$/).required(),
  password: Joi.string().required(),
  idCard: Joi.string().required(),
  contact: Joi.number(),
  status: Joi.string().default('Not Verified'),
  branch: Joi.string().required(),
  year: Joi.string().required(),
  type: Joi.string().required(),
});

module.exports = {
  postSchema,
  commentSchema,
  noticeSchema,
  userSchema,
};
