import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './files-db.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesDatabaseService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
  ) {}

  async createFile(params: {
    fileUrl: string;
    googleDriveId: string;
  }): Promise<File> {
    const { fileUrl, googleDriveId } = params;

    const file = this.filesRepository.create({
      file_url: fileUrl,
      google_drive_id: googleDriveId,
      created_dt: new Date(),
    });

    return this.filesRepository.save(file);
  }

  async getAllFiles(): Promise<File[]> {
    return this.filesRepository.find();
  }
}
