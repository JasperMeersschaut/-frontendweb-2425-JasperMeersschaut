import type supertest from 'supertest';
import { prisma } from '../../src/data';
import { withServer } from '../helpers/withServer';
import { login, loginAdmin } from '../helpers/login';
import testAuthHeader from '../helpers/testAuthHeader';

describe('Users', () => {

  let request: supertest.Agent;
  let authHeader: string;
  let adminAuthHeader: string;

  withServer((r) => (request = r));

  beforeAll(async () => {
    authHeader = await login(request);
    adminAuthHeader = await loginAdmin(request);
  });

  const url = '/api/users';

  describe('GET /api/users', () => {

    it('should 200 and return all users for an admin', async () => {
      const response = await request.get(url).set('Authorization', adminAuthHeader);
    
      expect(response.statusCode).toBe(200);
      expect(response.body.items.length).toBe(2);
      expect(response.body.items).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          name: 'Test User',
          email: 'test.user@hogent.be',
        }),
        expect.objectContaining({
          id: 2,
          name: 'Admin User',
          email: 'admin.user@hogent.be',
        }),
      ]));
    });

    it('should 400 when given an argument', async () => {
      const response = await request.get(`${url}?invalid=true`).set('Authorization', adminAuthHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.query).toHaveProperty('invalid');
    });

    it('should 403 when not an admin', async () => {
      const response = await request.get(url).set('Authorization', authHeader);

      expect(response.statusCode).toBe(403);
      expect(response.body).toMatchObject({
        code: 'FORBIDDEN',
        message: 'You are not allowed to view this part of the application',
      });
    });

    testAuthHeader(() => request.get(url));
  });

  describe('GET /api/user/:id', () => {

    it('should 200 and return the requested user', async () => {
      const response = await request.get(`${url}/1`).set('Authorization', authHeader);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: 1,
        name: 'Test User',
      });
    });

    it('should 200 and return my user info when passing \'me\' as id', async () => {
      const response = await request.get(`${url}/me`).set('Authorization', authHeader);

      expect(response.statusCode).toBe(200);
      expect(response.body).toMatchObject({
        id: 1,
        name: 'Test User',
      });
    });

    it('should 404 with not existing user (and admin user requesting)', async () => {
      const response = await request.get(`${url}/123`).set('Authorization', adminAuthHeader);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No user with this id exists',
      });
      expect(response.body.stack).toBeTruthy();
    });

    it('should 400 with invalid user id (and admin user requesting)', async () => {
      const response = await request.get(`${url}/invalid`).set('Authorization', adminAuthHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });

    it('should 403 when not an admin and not own user id', async () => {
      const response = await request.get(`${url}/2`).set('Authorization', authHeader);

      expect(response.statusCode).toBe(403);
      expect(response.body).toMatchObject({
        code: 'FORBIDDEN',
        message: 'You are not allowed to view this user\'s information',
      });
    });

    testAuthHeader(() => request.get(`${url}/1`));
  });

  describe('POST /api/users', () => {

    afterAll(async () => {
      await prisma.user.deleteMany({
        where: {
          email: 'new.user@hogent.be',
        },
      });
    });

    it('should 200 and return the registered user', async () => {
      const response = await request.post(url)
        .send({
          name: 'Test User',
          lastName: 'Test',
          email: 'testuser@example.com',
          password: 'password123',
          sex: 'Male',
          birthdate: '2000-01-01',
          length: 180,
          weight: 80,
        })
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(201);
      expect(response.body.token).toBeDefined();
    });
  });

  describe('PUT /api/users/:id', () => {

    it('should 200 and return the updated user', async () => {
      const response = await request.put(`${url}/1`)
        .send({
          name: 'Test User',
          lastName: 'Test',
          email: 'blabla@example.com',
          sex: 'Male',
          birthdate: '2000-01-01',
          length: 180,
          weight: 80,
        })
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        name: 'Test User',
        lastName: 'Test',
        email: 'blabla@example.com',
        sex: 'Male',
        birthdate: '2000-01-01T00:00:00.000Z',
        length: 180,
        weight: 80,
        roles: '["user"]',
      });
    });

    it('should 403 when not an admin and not own user id', async () => {
      const response = await request.put(`${url}/2`)
        .send({
          name: 'Test User',
          lastName: 'Test',
          email: 'testuser@example.com',
          sex: 'Male',
          birthdate: '2000-01-01',
          length: 180,
          weight: 80,
        })
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(403);
      expect(response.body).toMatchObject({
        code: 'FORBIDDEN',
        message: 'You are not allowed to view this user\'s information',
      });
    });

    testAuthHeader(() => request.put(`${url}/1`));
  });

  describe('DELETE /api/users/:id', () => {

    it('should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/1`).set('Authorization', authHeader);

      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should 404 with not existing user', async () => {
      const response = await request.delete(`${url}/123`).set('Authorization', adminAuthHeader);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No user with this id exists',
      });
      expect(response.body.stack).toBeTruthy();
    });

    it('should 403 when not an admin and not own user id', async () => {
      const response = await request.delete(`${url}/2`).set('Authorization', authHeader);

      expect(response.statusCode).toBe(403);
      expect(response.body).toMatchObject({
        code: 'FORBIDDEN',
        message: 'You are not allowed to view this user\'s information',
      });
    });

    testAuthHeader(() => request.delete(`${url}/1`));
  });
});
