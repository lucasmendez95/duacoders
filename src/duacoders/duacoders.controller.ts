import { Controller, Get, Post, Body, Param, Delete, Put, Query, UseGuards, Res } from '@nestjs/common';
import { Response } from "express";
import { DuacodersService } from './duacoders.service';
import { CreateDuacoderDto } from './dto/create-duacoder.dto';
import { UpdateDuacoderDto } from './dto/update-duacoder.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as exceljs from 'exceljs';
import * as pdfkit from 'pdfkit';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Duacoder } from './duacoders.entity';

@Controller('duacoders')
@UseGuards(JwtAuthGuard)
export class DuacodersController {
  constructor(private readonly duacodersService: DuacodersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo duacoder' })
  @ApiResponse({
    status: 201,
    description: 'Duacoder creado correctamente',
    type: CreateDuacoderDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos no válidos',
  })
  create(@Body() createDuacoderDto: CreateDuacoderDto) {
    return this.duacodersService.create(createDuacoderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar los duacoders' })
  @ApiResponse({
    status: 200,
    description: 'Duacoders obtenidos correctamente',
    type: Duacoder,
  })
  @ApiResponse({
    status: 404,
    description: 'No hay datos',
  })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.duacodersService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listar los datos de un duacoder' })
  @ApiResponse({
    status: 200,
    description: 'Duacoder obtenido correctamente',
    type: Duacoder,
  })
  @ApiResponse({
    status: 404,
    description: 'Duacoder no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.duacodersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar duacoder' })
  @ApiResponse({
    status: 200,
    description: 'Duacoder actualizado correctamente',
    type: CreateDuacoderDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos no válidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Duacoder no encontrado',
  })
  update(@Param('id') id: string, @Body() updateDuacoderDto: UpdateDuacoderDto) {
    return this.duacodersService.update(+id, updateDuacoderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar duacoder' })
  @ApiResponse({
    status: 200,
    description: 'Duacoder eliminado correctamente'
  })
  @ApiResponse({
    status: 404,
    description: 'Duacoder no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.duacodersService.remove(+id);
  }

  @Get('export/excel')
  @ApiOperation({ summary: 'Exportar excel con los duacoders' })
  async exportExcel(@Res() res: Response, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Duacoders');
    worksheet.addRow(['NIF', 'Name', 'Department', 'Position', 'Skills', 'Likes Onion Tortilla']);

    const duacoders = await this.duacodersService.findAll(page, limit);
    duacoders.forEach(duacoder => {
      worksheet.addRow([duacoder.nif, duacoder.name, duacoder.department, duacoder.position, duacoder.skills.join(', '), duacoder.likesOnionTortilla]);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=duacoders.xlsx');
    await workbook.xlsx.write(res);
    res.end();
  }

  @Get('export/pdf/:id')
  @ApiOperation({ summary: 'Exportar pdf con los datos de un duacoder' })
  async exportPdf(@Param('id') id: string, @Res() res: Response) {
    const duacoder = await this.duacodersService.findOne(+id);
    const doc = new pdfkit();
    doc.pipe(res);

    doc.text(`NIF: ${duacoder.nif}`);
    doc.text(`Name: ${duacoder.name}`);
    doc.text(`Department: ${duacoder.department}`);
    doc.text(`Position: ${duacoder.position}`);
    doc.text(`Skills: ${duacoder.skills.join(', ')}`);
    doc.text(`Likes Onion: ${duacoder.likesOnionTortilla ? 'Yes' : 'No'}`);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=duacoder_${duacoder.nif}.pdf`);
    doc.end();
  }
}