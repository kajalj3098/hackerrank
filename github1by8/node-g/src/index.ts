import * as express from 'express';
import mongoose from 'mongoose';
import * as http from 'http';
import { serverConfig } from './init/config';
import { setUpMiddleWares } from './init/middleware';
import { startRoutes } from './routes/routes';
import { CategoryModel } from './models/Category';
import { Category } from 'types/category';
import { Product } from 'types/product';
import { ProductModel } from './models/Product';


const app: express.Application = express.default();
const server: http.Server = app.listen(serverConfig.port);

server.on('error', (error: NodeJS.ErrnoException) => {
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EADDRINUSE':
            console.error(serverConfig.port + ' is already in use,exiting process now');
            process.exit(1);
            break;
        default:
            throw error;
    }
});


global.rejector = function (reject: Function, status: number, error?: string, errorDetails?: any) {
    let e: NodeJS.ApiErrorType = { status, message: error, extraError: errorDetails }
    reject(e);
}


function onListening() {
    console.info(`Server started on  port ${serverConfig.port}`);
    mongoose.connect(serverConfig.database.uri, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });
}

onListening();



/**
 * database connection settings
 */
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)
    process.exit(1)
}); // end mongoose connection error


mongoose.connection.on('open', async function (err) {
    if (err) {
        console.log("database error");
        console.log(err);
    }
    else {
        try {
            console.log("database connection open success");
            setUpMiddleWares(app);
            startRoutes(app);


            // for (let i = 1; i <= 10; i++) {
            //     const input: Category.CategoryInput = {
            //         categoryDescription: 'Test description ' + i,
            //         categoryName: 'Test ' + i
            //     }
            //     const data = new CategoryModel(input);
            //     const savedDoc = await data.save();
            //     const categoryId = savedDoc._id;

            //     for (let j = 1; j <= 10; j++) {

            //         const productInput: Product.ProductInput = {
            //             productName: 'Test Product ' + i+' '+j,
            //             productDescription: 'Test Product Desc ' + i+' '+j,
            //             categoryId: categoryId
            //         };

            //         const productModel = new ProductModel(productInput);
            //         await productModel.save();
            //     }
            // }
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    }
});


