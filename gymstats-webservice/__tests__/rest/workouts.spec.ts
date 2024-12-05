import type supertest from 'supertest'; 
import { withServer } from '../helpers/withServer';
import { login } from '../helpers/login';
import testAuthHeader from '../helpers/testAuthHeader';
import { prisma } from '../../src/data';

const data = {
  exercises: [
    {
      id: 1,
      type: 'Push Up',
      muscleGroup: 'Arms',
      description: 'A basic push-up exercise.',
    },
    {
      id: 2,
      type: 'Pull Up',
      muscleGroup: 'Arms',
      description: 'A basic pull-up exercise.',
    },
  ],
  workout: [
    {
      id: 1,
      type: 'push',
      duration: 120,
      muscleFocus: 'upper Body',
      createdBy: null,
    },
    {
      id: 2,
      type: 'pull',
      duration: 120,
      muscleFocus: 'upper Body',
      createdBy: null,
    },
    {
      id: 3,
      type: 'push',
      duration: 120,
      muscleFocus: 'upper Body',
      createdBy: 1,
    },
    {
      id: 10,
      type: 'push',
      duration: 120,
      muscleFocus: 'upper Body',
      createdBy: 99,
    },
  ],
  users: [
    {
      id: 1,
      name: 'Test User',
      lastName: 'Test',
      email: 'testuser@example.com',
      password_hash: 'password123',
      sex: 'M',
      birthdate: new Date('2000-01-01'),
      length: 180,
      weight: 80,
      roles: JSON.stringify(['USER']),
    },
    {
      id: 99,
      name: 'Admin User',
      lastName: 'Admin',
      email: 'admin@example.com',
      password_hash: 'admin123',
      sex: 'M',
      birthdate: new Date('2000-01-01'),
      length: 180,
      weight: 80,
      roles: JSON.stringify(['USER','ADMIN']),
    },
  ],
};

const dataToDelete = {
  workout: [1, 2, 3, 10],
  exercise: [1, 2],
  users: [1, 99],
};

describe('Workouts', () => {
  let request: supertest.Agent;
  let authHeader: string;

  withServer((r) => {
    request = r;
  });

  beforeAll(async () => {
    authHeader = await login(request);
  });

  const url = '/api/workouts';

  describe('GET /api/workouts', () => {
    beforeAll(async () => {
      await prisma.workout.deleteMany({ where: { id: { in: dataToDelete.workout } } });
      await prisma.exercise.deleteMany({ where: { id: { in: dataToDelete.exercise } } });
      await prisma.user.deleteMany({ where: { id: { in: dataToDelete.users } } });

      await prisma.user.createMany({ data: data.users });
      await prisma.exercise.createMany({ data: data.exercises });
      await prisma.workout.createMany({ data: data.workout });

      await prisma.workout.update({
        where: { id: 1 },
        data: {
          items: {
            connect: [{ id: 1 }],
          },
        },
      });
      await prisma.workout.update({
        where: { id: 2 },
        data: {
          items: {
            connect: [{ id: 2 }],
          },
        },
      });
    });

    afterAll(async () => {
      await prisma.workout.deleteMany({ where: { id: { in: dataToDelete.workout } } });
      await prisma.exercise.deleteMany({ where: { id: { in: dataToDelete.exercise } } });
      await prisma.user.deleteMany({ where: { id: { in: dataToDelete.users } } });
    });

    it('should 200 and return all workouts for the signed in user', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);

      expect(response.body.items.length).toBe(3);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            type: 'push',
            duration: 120,
            muscleFocus: 'upper Body',
            items: [
              {
                id: 1,
                type: 'Push Up',
                muscleGroup: 'Arms',
                description: 'A basic push-up exercise.',
              },
            ],
            createdBy: null,
          },
          {
            id: 2,
            type: 'pull',
            duration: 120,
            muscleFocus: 'upper Body',
            items: [
              {
                id: 2,
                type: 'Pull Up',
                muscleGroup: 'Arms',
                description: 'A basic pull-up exercise.',
              },
            ],
            createdBy: null,
          },
          {
            id: 3,
            type: 'push',
            duration: 120,
            muscleFocus: 'upper Body',
            items: [],
            createdBy: 1,
          },
        ]),
      );
    });

    it('should 400 when given an argument', async () => {
      const response = await request.get(`${url}?invalid=true`).set('Authorization', authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.query).toHaveProperty('invalid');
    });

    testAuthHeader(() => request.get(url));
  });

  describe('GET /api/workouts/:id', () => {
    beforeAll(async () => {
      await prisma.workout.deleteMany({ where: { id: { in: dataToDelete.workout } } });
      await prisma.exercise.deleteMany({ where: { id: { in: dataToDelete.exercise } } });
      await prisma.user.deleteMany({ where: { id: { in: dataToDelete.users } } });

      await prisma.user.createMany({ data: data.users });
      await prisma.exercise.createMany({ data: data.exercises });
      await prisma.workout.createMany({ data: data.workout });

      await prisma.workout.update({
        where: { id: 1 },
        data: {
          items: {
            connect: [{ id: 1 }],
          },
        },
      });
      await prisma.workout.update({
        where: { id: 2 },
        data: {
          items: {
            connect: [{ id: 2 }],
          },
        },
      });
    });

    afterAll(async () => {
      await prisma.workout.deleteMany({ where: { id: { in: dataToDelete.workout } } });
      await prisma.exercise.deleteMany({ where: { id: { in: dataToDelete.exercise } } });
      await prisma.user.deleteMany({ where: { id: { in: dataToDelete.users } } });
    });

    it('should 200 and return the workout with the given id', async () => {
      const response = await request.get(`${url}/1`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 1,
          type: 'push',
          duration: 120,
          muscleFocus: 'upper Body',
          items: [
            {
              id: 1,
              type: 'Push Up',
              muscleGroup: 'Arms',
              description: 'A basic push-up exercise.',
            },
          ],
          createdBy: null,
        }),
      );
    });

    it('should 404 when the workout with the given id does not exist', async () => {
      const response = await request.get(`${url}/999`).set('Authorization', authHeader);
      expect(response.status).toBe(404);
    });

    it('should 404 when the workout with the given id is not created by the signed in user', async () => {
      const response = await request.get(`${url}/10`).set('Authorization', authHeader);
      expect(response.status).toBe(404);
    });

    it('should 400 with invalid workout id', async () => {
      const response = await request.get(`${url}/invalid`).set('Authorization', authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });
   
    testAuthHeader(() => request.get(`${url}/1`));
  });
  describe('POST /api/workouts', () => {
    const workoutsToDelete: number[] = [];

    beforeAll(async () => {
      await prisma.exercise.createMany({ data: data.exercises });
    });

    afterAll(async () => {
      await prisma.workout.deleteMany({
        where: { id: { in: workoutsToDelete } },
      });

      await prisma.exercise.deleteMany({
        where: { id: { in: dataToDelete.exercise } },
      });
    });

    it('should 201 and return the created workout', async () => {
      const response = await request.post(url).send({
        type: 'push',
        duration: 120,
        muscleFocus: 'upper Body',
        createdBy: 1,
        items: [{ id: 1 }],
      })
        .set('Authorization', authHeader);
    
      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.type).toBe('push');
      expect(response.body.duration).toBe(120);
      expect(response.body.muscleFocus).toBe('upper Body');
      expect(response.body.createdBy).toBe(1);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            type: 'Push Up',
            muscleGroup: 'Arms',
            description: 'A basic push-up exercise.',
          },
        ]),
      );
    
      workoutsToDelete.push(response.body.id);
    });

    it('should 404 when exercise does not exist', async () => {
      const response = await request.post(url)
        .send({
          type: 'push',
          duration: 120,
          muscleFocus: 'upper Body',
          createdBy: 1,
          items: [{ id: 999 }],
        })
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No exercise with this id exists',
      });
      expect(response.body.stack).toBeTruthy();
    });

    it('should 400 when missing type', async () => {
      const response = await request.post(url)
        .send({
          duration: 120,
          muscleFocus: 'upper Body',
          createdBy: 1,
          items: [{ id: 1 }],
        })
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('type');
    });

    it('should 400 when missing duration', async () => {
      const response = await request.post(url)
        .send({
          type: 'push',
          muscleFocus: 'upper Body',
          createdBy: 1,
          items: [{ id: 1 }],
        })
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('duration');
    });

    it('should 400 when missing muscleFocus', async () => {
      const response = await request.post(url)
        .send({
          type: 'push',
          duration: 120,
          createdBy: 1,
          items: [{ id: 1 }],
        })
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('muscleFocus');
    });

    it('should 400 when missing items', async () => {
      const response = await request.post(url)
        .send({
          type: 'push',
          duration: 120,
          muscleFocus: 'upper Body',
          createdBy: 1,
        })
        .set('Authorization', authHeader);

      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('items');
    });

    testAuthHeader(() => request.post(url));
  });
  describe('PUT /api/workouts/:id', () => {
    beforeAll(async () => {
      await prisma.exercise.createMany({ data: data.exercises });
      await prisma.workout.createMany({ data: data.workout });
    });
  
    afterAll(async () => {
      await prisma.workout.deleteMany({
        where: { id: { in: dataToDelete.workout } },
      });
  
      await prisma.exercise.deleteMany({
        where: { id: { in: dataToDelete.exercise } },
      });
    });
  
    it('should 200 and return the updated workout', async () => {
      const response = await request.put(`${url}/1`)
        .send({
          type: 'pull',
          duration: 150,
          muscleFocus: 'lower Body',
          createdBy: 1,
          items: [{ id: 2 }],
        })
        .set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(1);
      expect(response.body.type).toBe('pull');
      expect(response.body.duration).toBe(150);
      expect(response.body.muscleFocus).toBe('lower Body');
      expect(response.body.createdBy).toBe(1);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 2,
            type: 'Pull Up',
            muscleGroup: 'Arms',
            description: 'A basic pull-up exercise.',
          },
        ]),
      );
    });
  
    it('should 404 when updating not existing workout', async () => {
      const response = await request.put(`${url}/200`)
        .send({
          type: 'pull',
          duration: 150,
          muscleFocus: 'lower Body',
          createdBy: 1,
          items: [{ id: 2 }],
        })
        .set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No workout with this id exists',
      });
      expect(response.body.stack).toBeTruthy();
    });
  
    it('should 404 when exercise does not exist', async () => {
      const response = await request.put(`${url}/1`)
        .send({
          type: 'pull',
          duration: 150,
          muscleFocus: 'lower Body',
          createdBy: 1,
          items: [{ id: 999 }],
        })
        .set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No exercise with this id exists',
      });
      expect(response.body.stack).toBeTruthy();
    });
  
    it('should 400 when missing type', async () => {
      const response = await request.put(`${url}/1`)
        .send({
          duration: 150,
          muscleFocus: 'lower Body',
          createdBy: 1,
          items: [{ id: 2 }],
        })
        .set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('type');
    });
  
    it('should 400 when missing duration', async () => {
      const response = await request.put(`${url}/1`)
        .send({
          type: 'pull',
          muscleFocus: 'lower Body',
          createdBy: 1,
          items: [{ id: 2 }],
        })
        .set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('duration');
    });
  
    it('should 400 when missing muscleFocus', async () => {
      const response = await request.put(`${url}/1`)
        .send({
          type: 'pull',
          duration: 150,
          createdBy: 1,
          items: [{ id: 2 }],
        })
        .set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('muscleFocus');
    });
  
    it('should 400 when missing items', async () => {
      const response = await request.put(`${url}/1`)
        .send({
          type: 'pull',
          duration: 150,
          muscleFocus: 'lower Body',
          createdBy: 1,
        })
        .set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('items');
    });
  
    testAuthHeader(() => request.put(`${url}/1`));
  });
  
  describe('DELETE /api/workouts/:id', () => {
    beforeAll(async () => {
      await prisma.exercise.createMany({ data: data.exercises });
      await prisma.workout.create({ data: data.workout[0]! });
    });
  
    afterAll(async () => {
      await prisma.workout.deleteMany({
        where: { id: { in: dataToDelete.workout } },
      });
  
      await prisma.exercise.deleteMany({
        where: { id: { in: dataToDelete.exercise } },
      });
    });
  
    it('should 204 and return nothing', async () => {
      const response = await request.delete(`${url}/1`)
        .set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });
  
    it('should 404 with not existing workout', async () => {
      const response = await request.delete(`${url}/999`)
        .set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No workout with this id exists',
      });
      expect(response.body.stack).toBeTruthy();
    });
  
    it('should 400 with invalid workout id', async () => {
      const response = await request.delete(`${url}/invalid`)
        .set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.params).toHaveProperty('id');
    });
  
    testAuthHeader(() => request.delete(`${url}/1`));
  });
});

