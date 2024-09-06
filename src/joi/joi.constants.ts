import Joi, { ObjectSchema } from 'joi';
import { objectIdJoi } from './joi.objectId';

const UPDATE_USER_CART_REQUEST_SCHEMA = Joi.object({
    productId: objectIdJoi.objectId().required(),
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
    status: Joi.string().valid('created', 'completed').required(),
  });

export const VALIDATION_MAP: {[index: string]: ObjectSchema;} = {
    'PUT /api/profile/cart': UPDATE_USER_CART_REQUEST_SCHEMA,
    'POST /api/profile/cart': CHECKOUT_USER_CART_REQUEST_SCHEMA
};