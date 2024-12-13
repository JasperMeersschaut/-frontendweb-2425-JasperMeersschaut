import Router from '@koa/router';
import { getBmi } from '../service/bmi';
import type { GymStatsAppContext, GymStatsAppState } from '../types/koa';
import type { KoaContext, KoaRouter } from '../types/koa';
import validate from '../core/validation';
import { requireAuthentication } from '../core/auth';

/**
 * @swagger
 * tags:
 *   name: BMI
 *   description: BMI management
 */

/**
 * @swagger
 * /api/bmi:
 *   get:
 *     summary: Get BMI data
 *     tags:
 *      - BMI
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The BMI data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bmi:
 *                   type: number
 *                   example: 23.301094832264035
 *                 height_in_cm:
 *                   type: number
 *                   example: 177
 *                 weight_in_kg:
 *                   type: number
 *                   example: 73
 *                 bmiCategoryForAdults:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: string
 *                       example: "Normal"
 *                     range:
 *                       type: string
 *                       example: "18.5 - 25"
 *                     normalRange:
 *                       type: string
 *                       example: "18.5 - 25"
 *       400:
 *         $ref: '#/components/responses/400BadRequest'
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
 */
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
