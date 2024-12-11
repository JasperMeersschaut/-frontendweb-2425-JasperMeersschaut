import Router from '@koa/router';
import { getBmi } from '../service/bmi';
import type { GymStatsAppContext, GymStatsAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import Joi from 'joi';
import validate from '../core/validation';

const router = new Router<GymStatsAppState, GymStatsAppContext>({
  prefix: '/bmi',
});

const fetchBmi = async (ctx: KoaContext) => {
  const { kg, cm } = ctx.query;
  const bmiData = await getBmi(Number(kg), Number(cm));
  ctx.body = bmiData;
};

fetchBmi.validationScheme = {
  query: {
    kg: Joi.number().positive().required(),
    cm: Joi.number().positive().required(),
  },
};

router.get('/', validate(fetchBmi.validationScheme), fetchBmi);

export default (parent: KoaRouter) => {
  parent.use(router.routes()).use(router.allowedMethods());
};
