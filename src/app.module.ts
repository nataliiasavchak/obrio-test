import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesController } from './files-db/files-db.controller';
import { FilesModule } from './files-db/files-db.module';
import { GoogleDriveService } from './google-drive/google-drive.service';
import { FilesDatabaseService } from './files-db/files-db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './files-db/files-db.entity';
import { FilesApiModule } from './files-api/files-api.module';
import { FilesApiService } from './files-api/files-api.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1111',
      username: 'postgres',
      entities: [File],
      database: 'obriofiles',
      synchronize: true,
      logging: true,
    }),
    FilesModule,
    FilesApiModule,
  ],
  controllers: [AppController, FilesController],
  providers: [AppService, GoogleDriveService, FilesDatabaseService, FilesApiService],
})
export class AppModule {}
