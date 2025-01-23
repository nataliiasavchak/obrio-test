import { Module } from '@nestjs/common';
import { FilesDatabaseService } from './files-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './files-db.entity';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  exports: [FilesDatabaseService],
  providers: [FilesDatabaseService],
})
export class FilesDatabaseModule {}
