import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesController } from './files/files.controller';
import { FilesModule } from './files/files.module';
import { GoogleDriveService } from './google-drive/google-drive.service';
import { FilesService } from './files/files.service';

@Module({
  imports: [FilesModule],
  controllers: [AppController, FilesController],
  providers: [AppService, GoogleDriveService, FilesService],
})
export class AppModule {}
