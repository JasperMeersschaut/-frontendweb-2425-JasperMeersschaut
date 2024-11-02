import Router from '@koa/router';
import installTransactionRouter from './exercise';
import type { GymStatsAppContext, GymStatsAppState, KoaApplication } from '../types/koa';

export default (app: KoaApplication) => {
  const router = new Router<GymStatsAppState, GymStatsAppContext>({
    prefix: '/api',
  });

  installTransactionRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
