import type { KoaApplication } from '../types/koa';
import config from 'config';
import koaCors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
 
const CORS_ORIGINS = config.get<string[]>('cors.origins'); 
const CORS_MAX_AGE = config.get<number>('cors.maxAge');
export default function installMiddlewares(app:KoaApplication) {
  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin!) !== -1) {
          return ctx.request.header.origin!; 
        }
        return CORS_ORIGINS[0] || '';
      },
      allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
      maxAge: CORS_MAX_AGE,
    }),
  );
      
  app.use(bodyParser());
  app.use(serve('public'));
}
