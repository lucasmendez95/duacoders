import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Duacoder } from './duacoders.entity';
import { CreateDuacoderDto } from './dto/create-duacoder.dto';
import { UpdateDuacoderDto } from './dto/update-duacoder.dto';

@Injectable()
export class DuacodersService {
  constructor(
    @InjectRepository(Duacoder)
    private readonly duacoderRepository: Repository<Duacoder>,
  ) {}

  // Crear un nuevo duacoder
  async create(createDuacoderDto: CreateDuacoderDto): Promise<Duacoder> {
    const duacoder = this.duacoderRepository.create(createDuacoderDto);
    return await this.duacoderRepository.save(duacoder);
  }

  // Obtener todos los duacoders con paginación
  async findAll(page: number = 1, limit: number = 10): Promise<Duacoder[]> {
    const skip = (page - 1) * limit;
    return await this.duacoderRepository.find({
      skip,
      take: limit,
    });
  }

  // Obtener un duacoder por su ID
  async findOne(id: number): Promise<Duacoder> {
    const duacoder = await this.duacoderRepository.findOne({ where: { id } });
    if (!duacoder) {
      throw new NotFoundException(`Duacoder con ID ${id} no encontrado`);
    }
    return duacoder;
  }

  // Actualizar un duacoder existente
  async update(id: number, updateDuacoderDto: UpdateDuacoderDto): Promise<Duacoder> {
    const duacoder = await this.findOne(id); // Verifica si el duacoder existe
    Object.assign(duacoder, updateDuacoderDto); // Actualiza los campos
    return await this.duacoderRepository.save(duacoder);
  }

  // Eliminar un duacoder
  async remove(id: number): Promise<void> {
    const duacoder = await this.findOne(id);
    await this.duacoderRepository.delete(id);
  }
}