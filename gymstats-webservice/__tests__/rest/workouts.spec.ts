import supertest from 'supertest'; 
import createServer from '../../src/createServer'; 
import type { Server } from '../../src/createServer';

describe('Workout', () => {
let server:Server;
let request: supertest.Agent;

beforeAll(async () => {
  server = await createServer();
  request = supertest.agent(server.getApp().callback());
})
afterAll(async () => {
    await server.stop();
    });
    const url = 'api/workouts';

    describe('GET /api/workouts', () => {
        it('should 200 and return a list of workouts', async () => {
            const response = await request.get(url);
            expect(response.status).toBe(200);
        })
})})

