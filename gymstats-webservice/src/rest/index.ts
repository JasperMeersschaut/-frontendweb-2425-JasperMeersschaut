import Router from '@koa/router';
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

  /**
 * @swagger
 * components:
 *   schemas:
 *     Base:
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           format: "int32"
 *   parameters:
 *     idParam:
 *       in: path
 *       name: id
 *       description: Id of the item to fetch/update/delete
 *       required: true
 *       schema:
 *         type: integer
 *         format: "int32"
 *   securitySchemes:
 *     bearerAuth: # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT # optional, arbitrary value for documentation purposes
 *   responses:
 *     400BadRequest:
 *       description: You provided invalid data
 *     401Unauthorized:
 *       description: You need to be authenticated to access this resource
 *     403Forbidden:
 *       description: You don't have access to this resource
 *     404NotFound:
 *       description: The requested resource could not be found
 */

  installExerciseRouter(router);
  installUserRouter(router);
  installWorkoutRouter(router);
  installSessionRouter(router);
  installBmiRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
};
