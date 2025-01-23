import { Controller, Get, Post, Body } from '@nestjs/common';
import { FilesApiService } from './files-api.service';

@Controller('files')
export class FilesApiController {
  constructor(private readonly filesApiService: FilesApiService) {}

  @Post()
  createAll(@Body() urls: string[]) {
    return this.filesApiService.createAll(urls);
  }

  @Get()
  findAll() {
    return this.filesApiService.findAll();
  }

}
