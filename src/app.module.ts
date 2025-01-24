import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleDriveService } from './google-drive/google-drive.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './files-db/files-db.entity';
import { FilesApiModule } from './files-api/files-api.module';
import { FilesApiService } from './files-api/files-api.service';
import { FilesApiController } from './files-api/files-api.controller';
import { FilesDatabaseModule } from './files-db/files-db.module';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: process.env.DATABASE_HOST,
      type: 'postgres',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [File],
      database: process.env.POSTGRES_DB,
      synchronize: true,
      logging: true,
    }),
    FilesApiModule,
    FilesDatabaseModule,
  ],
  controllers: [AppController, FilesApiController],
  providers: [AppService, GoogleDriveService, FilesApiService],
})
export class AppModule {}
