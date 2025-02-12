import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Duacoder } from './duacoders.entity';
import { DuacodersService } from './duacoders.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('DuacodersService', () => {
  let service: DuacodersService;
  let repository: Repository<Duacoder>;
  const mockDuacoders = [
    { id: 1, nif: '12345678A', name: 'Duacoder 1', bio: 'aaaaa', department: 'a', position: 'a', photo: 'a', likesOnionTortilla: true, birthDate: '1999-11-11', skills: ['js'] },
    { id: 2, nif: '87654321B', name: 'Duacoder 2', bio: 'bbbbb', department: 'b', position: 'b', photo: 'b', likesOnionTortilla: true, birthDate: '1999-11-11', skills: ['ts'] },
  ];
  const mockDuacoder = mockDuacoders[0]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DuacodersService,
        {
          provide: getRepositoryToken(Duacoder),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DuacodersService>(DuacodersService);
    repository = module.get<Repository<Duacoder>>(getRepositoryToken(Duacoder));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });
  

  describe('findAll', () => {
    it('debería retornar una lista de duacoders', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(mockDuacoders);

      const result = await service.findAll();
      expect(result).toEqual(mockDuacoders);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería retornar un duacoder por su ID', async () => { 
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockDuacoder);

      const result = await service.findOne(1);
      expect(result).toEqual(mockDuacoder);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('debería lanzar una excepción si el duacoder no existe', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow('Duacoder con ID 1 no encontrado');
    });
  });

  describe('create', () => {
    it('debería crear un nuevo duacoder', async () => {  
      jest.spyOn(repository, 'create').mockReturnValue(mockDuacoder);
      jest.spyOn(repository, 'save').mockResolvedValue(mockDuacoder);

      const result = await service.create(mockDuacoder);
      expect(result).toEqual(mockDuacoder);
      expect(repository.create).toHaveBeenCalledWith(mockDuacoder);
      expect(repository.save).toHaveBeenCalledWith(mockDuacoder);
    });
  });

  describe('update', () => {
    it('debería actualizar un duacoder existente', async () => {
      const updateData = { name: 'Duacoder Actualizado' };
  
      jest.spyOn(service, 'findOne').mockResolvedValue(mockDuacoder);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...mockDuacoder, ...updateData });

      const result = await service.update(1, updateData);
      expect(result).toEqual({ ...mockDuacoder, ...updateData });
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(repository.save).toHaveBeenCalledWith({ ...mockDuacoder, ...updateData });
    });
  });

  describe('remove', () => {
    it('debería eliminar un duacoder existente', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockDuacoder);
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

      await service.remove(1);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    })
    it('debería lanzar un error si el duacoder no existe', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException('Duacoder no encontrado'));
  
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      expect(repository.delete).not.toHaveBeenCalled();
    });
  })
});