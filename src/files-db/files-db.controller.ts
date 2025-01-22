import { Controller, Get, Post, Body } from '@nestjs/common';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { FilesDatabaseService } from './files-db.service';
import { File } from './files-db.entity';
import { FilesApiService } from 'src/files-api/files-api.service';

@Controller('files')
export class FilesController {
  constructor(
    private googleDriveService: GoogleDriveService,
    private filesApiService: FilesApiService,
  ) {}
  @Get()
  async findAll(): Promise<File[]> {
    return this.filesApiService.findAll();
  }

  @Post()
  async uploadFiles(@Body() urls: string[]): Promise<any> {
    console.log(`Urls received:${JSON.stringify(urls, null, 2)}.`);
    let errors: { message: string; url: string }[] = [];

    for (let url of urls) {
      console.log(`Processing url ${url}...`);
      try {
        const downloadedFile = await this.filesApiService.downloadFromURL(url);

        const response = await this.googleDriveService.uploadFile({
          file: downloadedFile.data,
          type: downloadedFile.headers['content-type'],
          name: `obrio-test-${Math.floor(Math.random() * 9000) + 1000}`,
        });

        await this.googleDriveService.shareFileWithEmail({
          fileId: response.data.id,
          email: 'natanatkanatalka@gmail.com',
        });

        await this.filesApiService.create({
          fileUrl: url,
          googleDriveId: response.data.id,
        });

        // TODO: insert into db here
      } catch (err) {
        errors.push({
          message: err.response?.data?.error?.message ?? err,
          url,
        });
      }
    }
    if (errors.length) {
      console.log(
        `There was an error during processing files to Google Drive.`,
      );
      errors.forEach((errorObj) => {
        console.log(
          `Failed to process file from URL: ${errorObj.url}, error message: ${errorObj.message}`,
        );
      });
    }

    return {
      success: errors.length ? false : true,
      errors: errors.map((err) => err.url),
    };
  }
}
