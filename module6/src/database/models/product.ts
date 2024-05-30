import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
}

const ProductSchema: Schema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true}
})

export default mongoose.model<IProduct>('Product', ProductSchema);