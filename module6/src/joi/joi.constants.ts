import Joi from 'joi';
import path from 'path';

const UPDATE_USER_CART_REQUEST_SCHEMA = Joi.object({
    productId: Joi.string().guid({ version: 'uuidv4' }).required(),
    count: Joi.number().integer().positive().required()
});

export const VALIDATION_MAP = {
    'PUT /api/profile/cart': UPDATE_USER_CART_REQUEST_SCHEMA
};

export const PRODUCT_CSV_FILE_PATH = path.join(__dirname, './storage/products.csv');
export const CART_CSV_FILE_PATH = path.join(__dirname, './storage/cart.csv');
export const CART_ITEMS_CSV_FILE_PATH = path.join(__dirname, './storage/cartItems.csv');