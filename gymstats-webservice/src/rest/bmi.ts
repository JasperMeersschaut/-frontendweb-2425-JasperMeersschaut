import Router from '@koa/router';
import { getBmi } from '../service/bmi';
import type { GymStatsAppContext, GymStatsAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import validate from '../core/validation';
import { requireAuthentication } from '../core/auth';

const router = new Router<GymStatsAppState, GymStatsAppContext>({
  prefix: '/bmi',
});

const fetchBmi = async (ctx: KoaContext) => {
  const bmiData = await getBmi(ctx.state.session.userId);
  ctx.body = bmiData;
};

fetchBmi.validationScheme = null;

router.get('/', requireAuthentication, validate(fetchBmi.validationScheme), fetchBmi);

export default (parent: KoaRouter) => {
  parent.use(router.routes()).use(router.allowedMethods());
};
