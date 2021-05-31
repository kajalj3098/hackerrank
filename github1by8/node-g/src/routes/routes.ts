import * as express from 'express';
import {apiRoutes} from './api';

export function startRoutes(app:express.Application)
{
    app.use('/api',apiRoutes);
    
};