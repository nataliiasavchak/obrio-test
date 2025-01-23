import { Module } from '@nestjs/common';
import { FilesApiService } from './files-api.service';
import { FilesApiController } from './files-api.controller';
import { FilesDatabaseService } from 'src/files-db/files-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from 'src/files-db/files-db.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  controllers: [FilesApiController],
  providers: [FilesApiService, FilesDatabaseService],
})
export class FilesApiModule {}
