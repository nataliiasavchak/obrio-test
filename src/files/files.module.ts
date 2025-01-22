import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';

@Module({
    imports: [HttpModule],
    exports: [HttpModule],
    controllers: [FilesController],
    providers: [FilesService, GoogleDriveService],
})
export class FilesModule {}
