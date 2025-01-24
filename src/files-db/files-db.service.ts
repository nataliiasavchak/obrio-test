import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './files-db.entity';
import { Repository } from 'typeorm';

interface ICreateFileRecord {
  fileUrl: string;
  googleDriveId: string;
  googleDriveUrl: string;
}

@Injectable()
export class FilesDatabaseService {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async createFileRecord(createFileRecord: ICreateFileRecord): Promise<File> {
    console.log(
      `Inserting file record into file table with data: ${JSON.stringify(createFileRecord, null, 2)}`,
    );

    const { fileUrl, googleDriveId, googleDriveUrl } = createFileRecord;

    const file = this.fileRepository.create({
      file_url: fileUrl,
      google_drive_id: googleDriveId,
      google_drive_url: googleDriveUrl,
    });

    return this.fileRepository.save(file);
  }

  async getAllFiles(): Promise<File[]> {
    return this.fileRepository.find();
  }
}
