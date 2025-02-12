import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import * as request from 'supertest';
import { DuacodersModule } from './duacoders.module';
import { DuacodersService } from './duacoders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Duacoder } from './duacoders.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

describe('DuacodersController (e2e)', () => {
  let app: INestApplication;
  let duacodersService: DuacodersService;
  const mockDuacoders = [
    { id: 1, nif: '12345678A', name: 'Duacoder 1', bio: 'aaaaa', department: 'a', position: 'a', photo: 'a', likesOnionTortilla: true, birthDate: '1999-11-11', skills: ['js'] },
    { id: 2, nif: '87654321B', name: 'Duacoder 2', bio: 'bbbbb', department: 'b', position: 'b', photo: 'b', likesOnionTortilla: true, birthDate: '1999-11-11', skills: ['ts'] },
  ];
  const mockDuacoder = mockDuacoders[0]

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DuacodersModule],
    })
      .overrideProvider(getRepositoryToken(Duacoder))
      .useValue({
        find: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true }) // Permite el acceso sin autenticación
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    duacodersService = moduleFixture.get<DuacodersService>(DuacodersService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /duacoders', () => {
    it('debería retornar una lista de duacoders', async () => {
      
      jest.spyOn(duacodersService, 'findAll').mockResolvedValue(mockDuacoders);

      const response = await request(app.getHttpServer())
        .get('/duacoders')
        .expect(200);

      expect(response.body).toEqual(mockDuacoders);
    });
  });

  describe('GET /duacoders/:id', () => {
    it('debería retornar un duacoder por su ID', async () => {
      jest.spyOn(duacodersService, 'findOne').mockResolvedValue(mockDuacoder);

      const response = await request(app.getHttpServer())
        .get('/duacoders/1')
        .expect(200);

      expect(response.body).toEqual(mockDuacoder);
    });

    it('debería retornar un error 404 si el duacoder no existe', async () => {
      jest.spyOn(duacodersService, 'findOne').mockRejectedValue(new NotFoundException('Duacoder no encontrado'));

      const response = await request(app.getHttpServer())
        .get('/duacoders/9999')
        .expect(404);

      expect(response.body.message).toEqual('Duacoder no encontrado');
    });
  });

  describe('POST /duacoders', () => {
    it('debería crear un nuevo duacoder', async () => {
      jest.spyOn(duacodersService, 'create').mockResolvedValue(mockDuacoder);

      const response = await request(app.getHttpServer())
        .post('/duacoders')
        .send({ nif: '12345678A', name: 'Duacoder 1' })
        .expect(201);

      expect(response.body).toEqual(mockDuacoder);
    });
  });

  describe('PUT /duacoders/:id', () => {
    it('debería actualizar un duacoder existente', async () => {
      jest.spyOn(duacodersService, 'update').mockResolvedValue(mockDuacoder);

      const response = await request(app.getHttpServer())
        .put('/duacoders/1')
        .send({ name: 'Duacoder Actualizado' })
        .expect(200);

      expect(response.body).toEqual(mockDuacoder);
    });
  });

  describe('DELETE /duacoders/:id', () => {
    it('debería eliminar un duacoder', async () => {
      jest.spyOn(duacodersService, 'remove').mockResolvedValue(undefined);

      await request(app.getHttpServer())
        .delete('/duacoders/1')
        .expect(200);
    });
  });
});