import supertest from 'supertest';
import type { Server } from '../../src/createServer';
import createServer from '../../src/createServer';
import { prisma } from '../../src/data';
import { hashPassword } from '../../src/core/password';
import Role from '../../src/core/roles';

export function withServer(setter:(r:supertest.Agent)=>void):void{
  let server:Server;

  beforeAll(async () => {
    server = await createServer();
    const passwordHash = await hashPassword('12345678');
    await prisma.user.createMany({
      data: [
        {
          id: 1,
          name: 'Test User',
          lastName: 'Test',
          email: 'test.user@hogent.be',
          sex: 'M',
          birthdate: new Date('2000-01-01'),
          length: 180,
          weight: 80,
          password_hash: passwordHash,
          roles: JSON.stringify([Role.USER]),
        },
        {
          id: 2,
          name: 'Admin User',
          lastName: 'Admin',
          email: 'admin.user@hogent.be',
          sex: 'M',
          birthdate: new Date('2000-01-01'),
          length: 180,
          weight: 80,
          password_hash: passwordHash,
          roles: JSON.stringify([Role.ADMIN, Role.USER]),
        },
      ],
    });

    setter( supertest.agent(server.getApp().callback()));
  });
  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.exercise.deleteMany();
    await prisma.workout.deleteMany();
    await server.stop();
  });
}
