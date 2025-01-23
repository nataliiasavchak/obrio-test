import { Injectable } from '@nestjs/common';
import { CreateFilesApiDto } from './dto/create-files-api.dto';
import { FilesDatabaseService } from 'src/files-db/files-db.service';
import axios from 'axios';

@Injectable()
export class FilesApiService {
  constructor(private filesDatabaseService: FilesDatabaseService) {}

  async create(createFilesApiDto: CreateFilesApiDto) {
    const { fileUrl, googleDriveId } = createFilesApiDto;
    await this.filesDatabaseService.createFile({ fileUrl, googleDriveId });
  }

  async findAll() {
    return this.filesDatabaseService.getAllFiles();
  }

  async downloadFromURL(url: string) {
    return axios.get(url, {
      responseType: 'stream',
    });
  }
}
