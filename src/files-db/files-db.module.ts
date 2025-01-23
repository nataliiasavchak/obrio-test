import { Module } from '@nestjs/common';
import { FilesDatabaseService } from './files-db.service';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './files-db.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  exports: [TypeOrmModule],
  providers: [FilesDatabaseService, GoogleDriveService],
})
export class FilesDatabaseModule {}
