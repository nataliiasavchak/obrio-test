import { Module } from '@nestjs/common';
import { FilesApiService } from './files-api.service';
import { FilesApiController } from './files-api.controller';
import { FilesDatabaseService } from 'src/files-db/files-db.service';

@Module({
  controllers: [FilesApiController],
  providers: [FilesApiService, FilesDatabaseService],
})
export class FilesApiModule {}
