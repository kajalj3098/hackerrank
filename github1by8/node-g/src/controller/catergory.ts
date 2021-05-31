import { Category } from "types/category";
import { CategoryModel, CategoryFields } from "../models/Category";
import { ProductModel, ProductFields } from "../models/Product";



export const deleteAllCategory = (input: Category.CategoryRemoveInput): Promise<NodeJS.ApiResponseType> => {
    return new Promise(async (resolve, reject) => {
        try {
            let message: string = '';
            const whereFCategory = {} as any;
            whereFCategory[CategoryFields._id] = input.categoryId;
            const data = await CategoryModel.findByIdAndDelete(whereFCategory).lean().exec();
            if (data) {
                const whereF = {} as any;
                whereF[ProductFields.categoryId] = data._id;
                const deleteProducts = await ProductModel.find(whereF).lean().exec();
                data['products'] = deleteProducts;
                await ProductModel.deleteMany(whereF);

                message = 'Category and related products are deleted';


            } else {
                message = 'Category not found';
            }

            const response: NodeJS.ApiResponseType = {
                message,
                data,
                status: 200
            }
            resolve(response)
        } catch (error) {
            global.rejector(reject, error.status || 500, error.message || '');
        }
    })

}