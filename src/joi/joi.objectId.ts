import Joi, { CustomHelpers, Root } from 'joi';
import { Types } from 'mongoose';

const { ObjectId } = Types;

const objectIdJoiExtension = (joi: Root) => ({
    type: 'objectId',
    base: joi.string(),
    messages: {
      'objectId.base': '"{{#label}}" must be a valid ObjectId'
    },
    validate(value: any, helpers: CustomHelpers) {
      if (!ObjectId.isValid(value)) {
        return { value, errors: helpers.error('objectId.base') };
      }
    }
});
  
export const objectIdJoi = Joi.extend(objectIdJoiExtension);