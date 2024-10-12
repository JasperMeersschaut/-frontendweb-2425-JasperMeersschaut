import Koa from 'koa'; //Koa 
import { getLogger } from './core/logging'; //Import de winston logger

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World from TypeScript woohoo'; // 👈 2
});

app.listen(9000, () => {
  getLogger().info('🚀 Server listening on http://127.0.0.1:9000');
});
