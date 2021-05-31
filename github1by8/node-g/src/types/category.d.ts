
export declare namespace Category {
    export interface CategorySchema {
        _id: string,
        categoryName: string,
        categoryDescription: string,
        status?: number
    }

    export interface CategoryExposedSchema extends Omit<CategorySchema, ""> { }
    export interface CategoryInput extends Omit<CategorySchema, "_id"> { }

    export interface CategoryRemoveInput{
        categoryId: string
    }
}