import { Controller, Get, Post, Body } from '@nestjs/common';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { FilesService } from './files.service';

interface File {
  file: string;
  url: string;
}

@Controller('files')
export class FilesController {
  constructor(
    private googleDriveService: GoogleDriveService,
    private filesService: FilesService,
  ) {}
  @Get()
  findAll(): File[] {
    console.log('All files returned');

    // TODO: read files from db 
    return [
      {
        file: '123456',
        url: 'http://test.com',
      },
      {
        file: '456789',
        url: 'http://test1.com',
      },
    ];
  }

  @Post()
  async uploadFiles(@Body() urls: string[]): Promise<any> {
    console.log(`Urls received:${JSON.stringify(urls, null, 2)}.`);
    let errors: { message: string; url: string }[] = [];

    for (let url of urls) {
      console.log(`Processing url ${url}...`);
      try {
        const downloadedFile = await this.filesService.downloadFromURL(url);

        const response = await this.googleDriveService.uploadFile({
          file: downloadedFile.data,
          type: downloadedFile.headers['content-type'],
          name: `obrio-test-${Math.floor(Math.random() * 9000) + 1000}`,
        });

        await this.googleDriveService.shareFileWithEmail({
          fileId: response.data.id,
          email: 'natanatkanatalka@gmail.com',
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
        `There was an error during downloading or uploading some files to Google Drive.`,
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
