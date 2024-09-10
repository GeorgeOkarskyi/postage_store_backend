import Joi, { ObjectSchema } from 'joi';
import { UserRole } from '../models/user.entity';
import { ORDER_STATUS } from '../models/order.entity';

const passwordPatternRegExp = new RegExp('^[a-zA-Z0-9]{3,30}$');
const passwordValidationErrorsMessages = {
  "string.pattern.base": `Password should be between 3 to 30 characters and contain letters or numbers only`,
  "string.empty": `Password cannot be empty`,
  "any.required": `Password is required`,
};
const emailDomainsList = ['com', 'net'];

const UPDATE_USER_CART_REQUEST_SCHEMA = Joi.object({
    productId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    count: Joi.number().integer().required()
});

const CHECKOUT_USER_CART_REQUEST_SCHEMA = Joi.object({
    payment: Joi.object({
      type: Joi.string().required(),
      address: Joi.alternatives().try(Joi.any(), Joi.allow(null)).optional(),
      creditCard: Joi.alternatives().try(Joi.any(), Joi.allow(null)).optional(),
    }).required(),
    delivery: Joi.object({
      type: Joi.string().required(),
      address: Joi.any().required(),
    }).required(),
    comments: Joi.string().required(),
    status: Joi.string().valid(ORDER_STATUS.CREATED, ORDER_STATUS.COMPLETED).required(),
});

const REGISTER_USER_REQUEST_SCHEMA = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: emailDomainsList } }).required(),
    password: Joi.string().pattern(passwordPatternRegExp).required().messages(passwordValidationErrorsMessages),
    role: Joi.string().valid(UserRole.ADMIN, UserRole.USER)
})

const LOGIN_USER_REQUEST_SCHEMA = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: emailDomainsList } }).required(),
    password: Joi.string().pattern(passwordPatternRegExp).required().messages(passwordValidationErrorsMessages),
})

export const VALIDATION_MAP: {[index: string]: ObjectSchema;} = {
    'PUT /api/profile/cart/': UPDATE_USER_CART_REQUEST_SCHEMA,
    'POST /api/profile/cart/checkout': CHECKOUT_USER_CART_REQUEST_SCHEMA,
    'POST /auth/register': REGISTER_USER_REQUEST_SCHEMA,
    'POST /auth/login': LOGIN_USER_REQUEST_SCHEMA
};