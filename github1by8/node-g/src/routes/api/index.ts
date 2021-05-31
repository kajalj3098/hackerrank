import * as express from 'express';
import { catergory } from './category';
import * as requestResponseHandler from '../../init/requestResponseHandler';


const apiRoutes = express.Router();

apiRoutes.use('/category', catergory);


//EXPRESS ERROR HANDLER
apiRoutes.use((error: NodeJS.ApiErrorType, req: express.Request, res: express.Response, next: Function) => {
    requestResponseHandler.sendErrorResponse(req, res, error);
});

export { apiRoutes };





