import { verifyGatewayRequest } from '@irshadkhan2019/job-app-shared';
import { Application } from 'express';

const BASE_PATH = '/api/v1/gig';

const appRoutes = (app: Application): void => {
  app.use('', ()=>console.log("Health route"));
  app.use(BASE_PATH, verifyGatewayRequest, ()=>console.log("Gig route"));
};

export { appRoutes };