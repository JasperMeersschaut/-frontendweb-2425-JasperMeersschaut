import type supertest from 'supertest';
import { prisma } from '../../src/data';
import { withServer } from '../helpers/withServer';
import { login, loginAdmin } from '../helpers/login';
import testAuthHeader from '../helpers/testAuthHeader';

const data = {
  exercises: [
    {
      id: 1,
      type: 'Ex1',
      muscleGroup: 'Arms',
      description: 'Lorem1',
    },
    {
      id: 2,
      type: 'Ex2',
      muscleGroup: 'Back',
      description: 'Lorem2',
    },
    {
      id: 3,
      type: 'Ex3',
      muscleGroup: 'Chest',
      description: 'Lorem3',
    },
  ],
};

const dataToDelete = {
  exercises: [1, 2, 3],
};

describe('Exercises', () => {

  let request: supertest.Agent;
  let authHeader: string;
  let adminAuthHeader: string;
  
  withServer((r) => (request = r));
  
  beforeAll(async () => {
    authHeader = await login(request);
    adminAuthHeader = await loginAdmin(request);
  });
  
  const url = '/api/exercises';

  describe('GET /api/exercises', () => {
    beforeAll(async () => {
      await prisma.exercise.createMany({
        data: data.exercises,
      });
    });
    afterAll(async () => {
      await prisma.exercise.deleteMany({
        where: { id: { in: dataToDelete.exercises } },
      });
    });

    it('should return all exercises', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.statusCode).toBe(200);
      expect(response.body.items).toEqual(
        expect.arrayContaining([
          {
            id: 1,
            type: 'Ex1',
            muscleGroup: 'Arms',
            description: 'Lorem1',
          },
          {
            id: 2,
            type: 'Ex2',
            muscleGroup: 'Back',
            description: 'Lorem2',
          },
          {
            id: 3,
            type: 'Ex3',
            muscleGroup: 'Chest',
            description: 'Lorem3',
          },
        ]),
      );
    });
    it('should return 401 when no authorization token provided', async () => {
      const response = await request.get(url);
      expect(response.statusCode).toBe(401);
      expect(response.body.code).toBe('UNAUTHORIZED');
      expect(response.body.message).toBe('You need to be signed in');
    },
    );
    it('should 400 when given an argument', async () => {
      const response = await request.get(`${url}?invalid=true`).set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.query).toHaveProperty('invalid');
    });
    testAuthHeader(() => request.get(url));

  });

  describe('GET /api/exercises/:id',()=>{
    beforeAll(async () => {
      await prisma.exercise.createMany({ data: data.exercises });
    });
  
    afterAll(async () => {
      await prisma.exercise.deleteMany({
        where: { id: { in: dataToDelete.exercises } },
      });
    });
    it('should 200 and return the exercise with the given id', async () => {
      const response = await request.get(`${url}/1`).set('Authorization', authHeader);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(data.exercises[0]);
    });
    it('should 404 when requesting not existing exercise', async () => {
      const response = await request.get(`${url}/200`).set('Authorization', authHeader);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No exercise with this id exists',
      });
      expect(response.body.stack).toBeTruthy();
    });
  });
  testAuthHeader(() => request.get(`${url}/1`));

  describe('POST /api/exercises', () => {
    const exercisesToDelete : number[] = [];
    beforeAll(async () => {
      await prisma.exercise.createMany({ data: data.exercises });
    });
  
    afterAll(async () => {
      await prisma.exercise.deleteMany({
        where: { id: { in: exercisesToDelete } },
      });
      await prisma.exercise.deleteMany({
        where: { id: { in: dataToDelete.exercises } },
      });
    });
  
    it('should 201 and create a new exercise', async () => {
      const newExercise = {
        type: 'New Exercise',
        muscleGroup: 'New Muscle Group',
        description: 'New Description',
      };
      const response = await request.post(url).set('Authorization', adminAuthHeader).send(newExercise);
      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject(newExercise);
      exercisesToDelete.push(response.body.id);
    });
  
    it('should 400 when missing type', async () => {
      const response = await request.post(url)
        .send({
          muscleGroup: 'Arms',
          description:'lorem ipsum',
        })
        .set('Authorization', adminAuthHeader);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('type');
    });
    it('should 400 when missing muscle group', async () => {
      const response = await request.put(`${url}/1`).send({
        type: 'Updated Exercise',
        description: 'Updated Description',
      })
        .set('Authorization', adminAuthHeader);
      
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('muscleGroup');
    });
      
    it('should 400 when missing description', async () => {
      const response = await request.put(`${url}/1`).send({
        type: 'Updated Exercise',
        muscleGroup: 'Updated Muscle Group',
      })
        .set('Authorization', adminAuthHeader);
      
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('description');
    });
  });
  testAuthHeader(() => request.post(url));

  describe('PUT /api/exercises/:id', () => {
    beforeAll(async () => {
      await prisma.exercise.createMany({ data: data.exercises });
    });
  
    afterAll(async () => {
      await prisma.exercise.deleteMany({
        where: { id: { in: dataToDelete.exercises } },
      });
    });
  
    it('should 200 and return the updated exercise', async () => {
      const response = await request.put(`${url}/1`).send({
        type: 'Updated Exercise',
        muscleGroup: 'Updated Muscle Group',
        description: 'Updated Description',
      })
        .set('Authorization', adminAuthHeader);
      expect(response.statusCode).toBe(200);
      expect(response.body.type).toBe('Updated Exercise');
      expect(response.body.muscleGroup).toBe('Updated Muscle Group');
      expect(response.body.description).toBe('Updated Description');
    });
  
    it('should 404 when updating not existing exercise', async () => {
      const response = await request.put(`${url}/200`).set('Authorization', adminAuthHeader).send({
        type: 'Updated Exercise',
        muscleGroup: 'Updated Muscle Group',
        description: 'Updated Description',
      });
  
      expect(response.statusCode).toBe(404);
      expect(response.body.code).toBe('NOT_FOUND');
      expect(response.body.message).toBe('No exercise with this id exists');
    });
  
    it('should 400 when missing muscle group', async () => {
      const response = await request.put(`${url}/1`).send({
        type: 'Updated Exercise',
        description: 'Updated Description',
      })
        .set('Authorization', adminAuthHeader);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('muscleGroup');
    });
  
    it('should 400 when missing description', async () => {
      const response = await request.put(`${url}/1`).send({
        type: 'Updated Exercise',
        muscleGroup: 'Updated Muscle Group',
      })
        .set('Authorization', adminAuthHeader);
  
      expect(response.statusCode).toBe(400);
      expect(response.body.code).toBe('VALIDATION_FAILED');
      expect(response.body.details.body).toHaveProperty('description');
    });
  });
  testAuthHeader(() => request.put(`${url}/1`));

  describe('DELETE /api/exercises/:id', () => {
    beforeAll(async () => {
      await prisma.exercise.createMany({ data: data.exercises });
    });
  
    afterAll(async () => {
      await prisma.exercise.deleteMany({
        where: { id: { in: dataToDelete.exercises } },
      });
    });
  
    it('should 204 andreturn nothing', async () => {
      const response = await request.delete(`${url}/1`).set('Authorization', adminAuthHeader);
      expect(response.statusCode).toBe(204);
    });
  
    it('should 404 when deleting not existing exercise', async () => {
      const response = await request.delete(`${url}/200`).set('Authorization', adminAuthHeader);
  
      expect(response.statusCode).toBe(404);
      expect(response.body).toMatchObject({
        code: 'NOT_FOUND',
        message: 'No exercise with this id exists',
      });
      expect(response.body.stack).toBeTruthy();
    });
    testAuthHeader(() => request.delete(`${url}/1`));
  });

  describe('GET /api/exercises/muscle-groups', () => {
    beforeAll(async () => {
      await prisma.exercise.createMany({ data: data.exercises });
    });
  
    afterAll(async () => {
      await prisma.exercise.deleteMany({
        where: { id: { in: dataToDelete.exercises } },
      });
    });
  
    it('should 200 and return all muscle groups', async () => {
      const response = await request.get(`${url}/muscle-groups`).set('Authorization', authHeader);
      expect(response.statusCode).toBe(200);
      expect(response.body.items).toEqual(expect.arrayContaining(['Arms', 'Back', 'Chest']));
    });
  
    it('should 401 when no authorization token provided', async () => {
      const response = await request.get(`${url}/muscle-groups`);
      expect(response.statusCode).toBe(401);
    });
  });
});
