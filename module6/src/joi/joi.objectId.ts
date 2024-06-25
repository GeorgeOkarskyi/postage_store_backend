import Joi from 'joi';
import { Types } from 'mongoose';

const { ObjectId } = Types;

const objectIdJoiExtension = (joi) => ({
    type: 'objectId',
    base: joi.string(),
    messages: {
      'objectId.base': '"{{#label}}" must be a valid ObjectId'
    },
    validate(value, helpers) {
      if (!ObjectId.isValid(value)) {
        return { value, errors: helpers.error('objectId.base') };
      }
    }
});
  
export const objectIdJoi = Joi.extend(objectIdJoiExtension);