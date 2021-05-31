import { Application } from "express-serve-static-core";
import * as express from 'express';
import * as  bodyParser from 'body-parser';
import * as cors from 'cors';

export function setUpMiddleWares(app: Application) {
    app.get('', function (req: express.Request, res: express.Response) {
        res.status(500).send("OOPS!!!You are lost.")
    })
    app.use(cors.default({ origin: '*' }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
}