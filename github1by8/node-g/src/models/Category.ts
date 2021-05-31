import mongoose, { Schema, Types } from 'mongoose';
import { Status } from '../utils/constants';

export const CategoryFields =
{
    _id: "_id",
    categoryName: "categoryName",
    categoryDescription: "categoryDescription",
    status: "status",
    createdAt: "createdAt",
    updatedAt: "updatedAt"
}

const categorySchema = new Schema(
    {
        categoryName: { type: String, required: true },
        categoryDescription: { type: String, required: true },
        status: { type: Number, required: true, default: Status.ACTIVE }
    }, {
    timestamps: true
})

export const CategoryModel = mongoose.model('Category', categorySchema);


