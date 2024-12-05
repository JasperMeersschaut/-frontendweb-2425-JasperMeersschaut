import Koa from 'koa';
import { getLogger } from './core/logging'; 
import installRest from './rest';
import { initializeData, shutdownData } from './data';
import type { GymStatsAppState, GymStatsAppContext, KoaApplication } from './types/koa';
import installMiddlewares from './core/installMiddlewares';
import config from 'config';

const PORT = config.get<number>('port');

export interface Server{
  getApp()  : KoaApplication,
  start(): Promise<void>,
  stop(): Promise<void>
}

export default async function createServer(): Promise<Server> {
  const app = new Koa<GymStatsAppState, GymStatsAppContext>();
  installMiddlewares(app);
  await initializeData(); 

  installRest(app);

  return {
    getApp() {
      return app;
    },
    start(){
      return new Promise<void>((resolve) => {
        app.listen(PORT, () => {
          getLogger().info(`🚀 Server listening on http://localhost:${PORT}`);
        });
        resolve();
      });
    
    },
    async stop() {
      app.removeAllListeners();
      shutdownData();
      getLogger().info('bye');

    }};
}
