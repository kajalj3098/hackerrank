import mongoose, { Schema, Types } from 'mongoose';
import { Status } from '../utils/constants';

export const ProductFields =
{
    _id: "_id",
    productName: "productName",
    productDescription: "productDescription",
    status: "status",
    categoryId:"categoryId",
    createdAt: "createdAt",
    updatedAt: "updatedAt"
}

const productSchema = new Schema(
    {
        productName: { type: String, required: true },
        productDescription: { type: String, required: true },
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
        status: { type: Number, required: true, default: Status.ACTIVE }
    }, {
    timestamps: true
});

export const ProductModel = mongoose.model('Prodcut', productSchema);



