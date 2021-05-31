import { Request, Response } from 'express'

export function getInputBody(req: Request): any {
    return req.body;
}

export function getParams(req: Request): any {
    return req.params;
}

export function sendSuccessResponse(req: Request, res: Response, r: { message: string, data: any, status?: number }) {
    let response: NodeJS.ApiResponse = { status: r.status || 200, message: r.message, data: r.data }
    sendResponse(res, response);
}

export function sendErrorResponse(req: Request, res: Response, e: any) {

    console.log("ERROR", e);
    let response: NodeJS.ApiResponse = { status: e.status || 0, message: e.message || 'Something bad happened', data: {}, extraError:e.extraError };

    sendResponse(res, response);
}


function sendResponse(res: Response, body: any) {
    res.send(body);
}