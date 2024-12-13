import Router from '@koa/router';
import installHealthRouter from './health';
import installExerciseRouter from './exercise';
import installUserRouter from './user';
import installWorkoutRouter from './workout';
import installSessionRouter from './session';
import installBmiRouter from './bmi';
import type { GymStatsAppContext, GymStatsAppState, KoaApplication } from '../types/koa';

export default (app: KoaApplication) => {
  const router = new Router<GymStatsAppState, GymStatsAppContext>({
    prefix: '/api',
  });

  installHealthRouter(router);
  installExerciseRouter(router);
  installUserRouter(router);
  installWorkoutRouter(router);
  installSessionRouter(router);
  installBmiRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
