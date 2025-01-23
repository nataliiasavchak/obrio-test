import { Module } from '@nestjs/common';
import { FilesApiService } from './files-api.service';
import { FilesApiController } from './files-api.controller';
import { FilesDatabaseModule } from 'src/files-db/files-db.module';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';

@Module({
  imports: [FilesDatabaseModule],
  controllers: [FilesApiController],
  providers: [FilesApiService, GoogleDriveService],
})
export class FilesApiModule {}
