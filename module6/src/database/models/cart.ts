import mongoose, { Schema, Document } from 'mongoose';

interface ICart extends Document {
    userId: string;
    isDeleted: boolean;
}

const CartSchema: Schema = new Schema({
    userId: { type: String, required: true },
    isDeleted: { type: Boolean, required: true }
})

export default mongoose.model<ICart>('Cart', CartSchema);