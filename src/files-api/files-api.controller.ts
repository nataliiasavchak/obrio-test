import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FilesApiService } from './files-api.service';
import { CreateFilesApiDto } from './dto/create-files-api.dto';
import { UpdateFilesApiDto } from './dto/update-files-api.dto';

@Controller('files-api')
export class FilesApiController {
  constructor(private readonly filesApiService: FilesApiService) {}

  @Post()
  create(@Body() createFilesApiDto: CreateFilesApiDto) {
    return this.filesApiService.create(createFilesApiDto);
  }

  @Get()
  findAll() {
    return this.filesApiService.findAll();
  }

}
