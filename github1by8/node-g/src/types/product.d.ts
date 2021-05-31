
export declare namespace Product {
    export interface ProductSchema {
        _id: string,
        productName: string,
        productDescription: string,
        categoryId: string,
        status?: number
    }

    export interface ProductExposedSchema extends Omit<ProductSchema, ""> { }

    export interface ProductInput extends Omit<ProductSchema, "_id"> { }


}