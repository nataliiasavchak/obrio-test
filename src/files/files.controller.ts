import axios from 'axios';
import { Controller, Get, Post, Body } from '@nestjs/common';
import crypto from 'crypto';

interface File {
  file: string;
  url: string;
}

const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: './obrio-test-9a52368ef5fc.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
  version: 'v3',
  auth,
});

@Controller('files')
export class FilesController {
  constructor() {} // private readonly googleDriveService: GoogleDriveService, // private readonly httpService: HttpService,
  @Get()
  findAll(): File[] {
    console.log('All files returned');
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
    console.log(`Urls received:${urls}`);
    let errors: { message: string; url: string }[] = [];
    for (let url of urls) {
      console.log(`Processing url ${url}...`);
      try {
        const downloadedFile = await axios.get(url, {
          responseType: 'stream',
        });
        const fileType = downloadedFile.headers['content-type'];
        let response;

        response = await drive.files.create({
          requestBody: {
            name: `obrio-test-${Math.floor(Math.random() * 9000) + 1000}`,
            mimeType: fileType,
            description: 'File description to make it less suspicious',
          },
          media: {
            mimeType: fileType,
            body: downloadedFile.data,
          },
        });
        // temp
        await drive.permissions.create({
          fileId: response.data.id,
          requestBody: {
            role: 'writer',
            type: 'user',
            emailAddress: 'natanatkanatalka@gmail.com', // Replace with your Google account email
          },
        });
        await drive.files.update({
          fileId: response.data.id,
          addParents: 'root',
        });
      } catch (err) {
        console.log(
          `There was an error uploading file to Google Drive: ${err}`,
        );
        errors.push({
          message: err.response?.data?.error?.message ?? err,
          url,
        });
      }
    }
    if (errors.length) {
      console.log(`There was an error during uploading files to Google Drive.`);
      errors.forEach((errorObj) => {
        console.log(
          `Failed to upload file from URL: ${errorObj.url}, error message: ${errorObj.message}`,
        );
      });
    }

    return {
      success: errors.length ? false : true,
      errors: errors.map((err) => err.url),
    };
  }
}
