import type supertest from 'supertest'; 
import { withServer } from '../helpers/withServer';
import { login,loginAdmin } from '../helpers/login';
import testAuthHeader from '../helpers/testAuthHeader';
import { prisma } from '../../src/data';

const data = {
  exercises: [
    {
      id: 1,
      type: 'Exercise1',
      muscleGroup: 'Muscle1',
      description: 'Lorem1',
    },
    {
      id: 2,
      type: 'Exercise2',
      muscleGroup: 'Muscle2',
      description: 'Lorem2',
    },
  ],
  workout: [
    {
      id: 1,
      type: 'Workout1',
      duration: 1,
      muscleFocus: 'Muscle1',
      createdBy: null,
    },
    {
      id: 2,
      type: 'Workout2',
      duration: 2,
      muscleFocus: 'Muscle2',
      createdBy: null,
    },
    {
      id: 3,
      type: 'Workout3',
      duration: 3,
      muscleFocus: 'Muscle3',
      createdBy: 1,
    },
    {
      id: 4,
      type: 'Workout4',
      duration: 4,
      muscleFocus: 'Muscle4',
      createdBy: 1,
    },
  ],
  users: [
    {
      id: 3,
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
      id: 4,
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
  workout: [1, 2, 3, 4],
  exercise: [1, 2],
  users: [3, 4],
};

describe('Workouts', () => {
  let request: supertest.Agent;
  let authHeader: string;
  let adminAuthHeader: string;

  withServer((r) => request = r);

  beforeAll(async () => {
    authHeader = await login(request);
    adminAuthHeader = await loginAdmin(request);
  });

  const url = '/api/workouts';

  describe('GET /api/workouts', () => {
    beforeAll(async () => {
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

    describe('GET /api/workouts', () => {
      it('should 200 and return all workouts for the signed in user', async () => {
        const response = await request.get(url).set('Authorization', authHeader);
        expect(response.status).toBe(200);
  
        expect(response.body.items.length).toBe(4);
        expect(response.body.items).toEqual(
          expect.arrayContaining([
            {
              id: 1,
              type: 'Workout1',
              duration: 1,
              muscleFocus: 'Muscle1',
              items: [
                {
                  id: 1,
                  type: 'Exercise1',
                  muscleGroup: 'Muscle1',
                  description: 'Lorem1',
                },
              ],
              createdBy: null,
            },
            {
              id: 2,
              type: 'Workout2',
              duration: 2,
              muscleFocus: 'Muscle2',
              items: [
                {
                  id: 2,
                  type: 'Exercise2',
                  muscleGroup: 'Muscle2',
                  description: 'Lorem2',
                },
              ],
              createdBy: null,
            },
            {
              id: 3,
              type: 'Workout3',
              duration: 3,
              muscleFocus: 'Muscle3',
              items: [],
              createdBy: 1,
            },
            {
              id: 4,
              type: 'Workout4',
              duration: 4,
              muscleFocus: 'Muscle4',
              items: [],
              createdBy: 1,
            },
          ]),
        );
      });
    });

    it('should 200 and return all workouts for the signed in user', async () => {
      const response = await request.get(url).set('Authorization', adminAuthHeader);
      expect(response.status).toBe(200);

      expect(response.body.items.length).toBe(2);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            type: 'Workout1',
            duration: 1,
            muscleFocus: 'Muscle1',
            items: [
              {
                id: 1,
                type: 'Exercise1',
                muscleGroup: 'Muscle1',
                description: 'Lorem1',
              },
            ],
            createdBy: null,
          },
          {
            id: 2,
            type: 'Workout2',
            duration: 2,
            muscleFocus: 'Muscle2',
            items: [
              {
                id: 2,
                type: 'Exercise2',
                muscleGroup: 'Muscle2',
                description: 'Lorem2',
              },
            ],
            createdBy: null,
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

    it('should 200 and return the workout with the given id is default workout', async () => {
      const response = await request.get(`${url}/1`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 1,
          type: 'Workout1',
          duration: 1,
          muscleFocus: 'Muscle1',
          items: [
            {
              id: 1,
              type: 'Exercise1',
              muscleGroup: 'Muscle1',
              description: 'Lorem1',
            },
          ],
          createdBy: null,
        }),
      );
    });

    it('should 200 and return the workout with the given id is personal workout', async () => {
      const response = await request.get(`${url}/3`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        expect.objectContaining({
          id: 3,
          type: 'Workout3',
          duration: 3,
          muscleFocus: 'Muscle3',
          items: [],
          createdBy: 1,
        }),
      );
    });

    it('should 404 when the workout is not from the user', async () => {
      const response = await request.get(`${url}/3`).set('Authorization', adminAuthHeader);
      expect(response.status).toBe(404);
    });

    it('should 404 when the workout with the given id does not exist', async () => {
      const response = await request.get(`${url}/999`).set('Authorization', authHeader);
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
      await prisma.workout.deleteMany({ where: { id: { in: workoutsToDelete } } });
      await prisma.workout.deleteMany({ where: { id: { in: dataToDelete.workout } } });
      await prisma.exercise.deleteMany({ where: { id: { in: dataToDelete.exercise } } });
      await prisma.user.deleteMany({ where: { id: { in: dataToDelete.users } } });
      
    });

    it('should 201 and return the created workout by user', async () => {
      const response = await request.post(url).send({
        type: 'Workout5',
        duration: 5,
        muscleFocus: 'Muscle5',
        items: [{ id: 1 }],
      })
        .set('Authorization', authHeader);
    
      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.type).toBe('Workout5');
      expect(response.body.duration).toBe(5);
      expect(response.body.muscleFocus).toBe('Muscle5');
      expect(response.body.createdBy).toBe(1);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            type: 'Exercise1',
            muscleGroup: 'Muscle1',
            description: 'Lorem1',
          },
        ]),
      ); workoutsToDelete.push(response.body.id);
    });

    it('should 201 and return the created workout by admin', async () => {
      const response = await request.post(url).send({
        type: 'Workout5',
        duration: 5,
        muscleFocus: 'Muscle5',
        items: [{ id: 1 }],
      })
        .set('Authorization', adminAuthHeader);
    
      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.type).toBe('Workout5');
      expect(response.body.duration).toBe(5);
      expect(response.body.muscleFocus).toBe('Muscle5');
      expect(response.body.createdBy).toBe(null);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            type: 'Exercise1',
            muscleGroup: 'Muscle1',
            description: 'Lorem1',
          },
        ]),
      ); workoutsToDelete.push(response.body.id);
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
  
    it('should 200 and return the updated workout as user', async () => {
      const response = await request.put(`${url}/3`)
        .send({
          type: 'Workout31',
          duration: 31,
          muscleFocus: 'Muscle31',
          items: [{ id: 2 }],
        })
        .set('Authorization', authHeader);
    
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(3);
      expect(response.body.type).toBe('Workout31');
      expect(response.body.duration).toBe(31);
      expect(response.body.muscleFocus).toBe('Muscle31');
      expect(response.body.createdBy).toBe(1);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 2,
            type: 'Exercise2',
            muscleGroup: 'Muscle2',
            description: 'Lorem2',
          },
        ]),
      );
    });

    it('should 200 and return the updated workout as admin', async () => {
      const response = await request.put(`${url}/1`)
        .send({
          type: 'Workout11',
          duration: 11,
          muscleFocus: 'Muscle11',
          items: [{ id: 2 }],
        })
        .set('Authorization', adminAuthHeader);
    
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual(1);
      expect(response.body.type).toBe('Workout11');
      expect(response.body.duration).toBe(11);
      expect(response.body.muscleFocus).toBe('Muscle11');
      expect(response.body.createdBy).toBe(null);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 2,
            type: 'Exercise2',
            muscleGroup: 'Muscle2',
            description: 'Lorem2',
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
  
    it('should 400 when missing type', async () => {
      const response = await request.put(`${url}/1`)
        .send({
          duration: 5,
          muscleFocus: 'Muscle5',
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
          type: 'Workout5',
          muscleFocus: 'Muscle5',
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
          type: 'Workout5',
          duration: 5,
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
          type: 'Workout5',
          duration: 5,
          muscleFocus: 'Muscle5',
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
  
    it('should 204 and return nothing as user', async () => {
      const response = await request.delete(`${url}/3`)
        .set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should 204 and return nothing as admin', async () => {
      const response = await request.delete(`${url}/1`)
        .set('Authorization', adminAuthHeader);
  
      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should 404 when deleting default workout as user', async () => {
      const response = await request.delete(`${url}/1`)
        .set('Authorization', authHeader);

      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No workout with this id exists',
      });
      expect(response.body.stack).toBeTruthy();
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

  describe('GET /api/workouts/muscle-focuses', () => {
    beforeAll(async () => {
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

    it('should 200 and return all muscle focuses for the signed in user', async () => {
      const response = await request.get(`${url}/muscle-focuses`).set('Authorization', authHeader);
      expect(response.status).toBe(200);

      expect(response.body.items).toEqual(expect.arrayContaining(['Muscle1', 'Muscle2', 'Muscle3','Muscle4']));
      expect(response.body.items.length).toBe(4);
    });

    it('should 200 and return all muscle focuses for the signed in admin', async () => {
      const response = await request.get(`${url}/muscle-focuses`).set('Authorization', adminAuthHeader);
      expect(response.status).toBe(200);

      expect(response.body.items).toEqual(expect.arrayContaining(['Muscle1', 'Muscle2']));
      expect(response.body.items.length).toBe(2);
    });

    testAuthHeader(() => request.get(`${url}/muscle-focuses`));
  });
});

