import mongoose, { Schema, Document } from 'mongoose';
import { CartItemEntity } from '../../models/cart.entity';
import { CartItemSchema } from './cartItem';

export type ORDER_STATUS = 'created' | 'completed';

interface IOrder extends Document {
    id: string,
    userId: string;
    cartId: string;
    items: CartItemEntity[]
    payment: {
        type: string,
        address?: any,
        creditCard?: any,
      },
    delivery: {
        type: string,
        address: any,
    },
    comments: string,
    status: ORDER_STATUS;
    total: number;
}

const OrderSchema: Schema = new Schema({
    userId: { type: String, required: true},
    cartId: { type: String, required: true},
    items: [CartItemSchema],
    payment: {
        type: { type: String, required: true },
        address: { type: Schema.Types.Mixed },
        creditCard: { type: Schema.Types.Mixed }
      },
    delivery: {
        type: { type: String, required: true },
        address: { type: Schema.Types.Mixed, required: true },
    },
    comments: { type: String, required: false},
    status: { type: String, enum: ['created', 'completed'], required: true},
    total: { type: Number, required: true},
})

export default mongoose.model<IOrder>('Order', OrderSchema)

