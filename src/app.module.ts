import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleDriveService } from './google-drive/google-drive.service';
import { FilesDatabaseService } from './files-db/files-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './files-db/files-db.entity';
import { FilesApiModule } from './files-api/files-api.module';
import { FilesApiService } from './files-api/files-api.service';
import { FilesApiController } from './files-api/files-api.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      password: '1111',
      username: 'postgres',
      entities: [File],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    FilesApiModule
  ],
  controllers: [AppController, FilesApiController],
  providers: [
    AppService,
    GoogleDriveService,
    FilesDatabaseService,
    FilesApiService,
  ],
})
export class AppModule {}
