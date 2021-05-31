import * as express from 'express';
import * as requestResponseHandler from '../../init/requestResponseHandler';
import { Category } from 'types/category';
import * as categoryController from '../../controller/catergory';

import {param, validationResult } from 'express-validator';
import { ERROR_MESSAGES } from '../../utils/constants';
const router = express.Router();
//get all pending for review

router.delete('/:categoryId', 
    param('categoryId').isMongoId().withMessage(ERROR_MESSAGES.INVALID_MONGO_ID),
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const error = validationResult(req);
            if (!error.isEmpty())
            {
                const resError: NodeJS.ApiErrorType = { status: 404, message:"",extraError: error.array() };
                next(resError);
                return;
            }
            const userInput= requestResponseHandler.getParams(req) as Category.CategoryRemoveInput;
            console.log({userInput});
            
            const data= await categoryController.deleteAllCategory(userInput);
            requestResponseHandler.sendSuccessResponse(req, res, data);
        }
        catch (e) {
            next(e);
        }
    }
    );

export { router as catergory };
