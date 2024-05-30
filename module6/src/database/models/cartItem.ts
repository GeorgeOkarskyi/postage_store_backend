import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem extends Document{
    cartId: string,
    productId: string,
    count: number
}

export const CartItemSchema: Schema = new Schema({
    cartId: { type: String, required: true},
    productId: { type: String, required: true},
    count: { type: Number, required: true}
})

export default mongoose.model<ICartItem>('CartItem', CartItemSchema);