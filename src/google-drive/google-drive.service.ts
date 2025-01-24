import { Injectable } from '@nestjs/common';

const { google } = require('googleapis');

interface IFileToUpload {
  file: ReadableStream;
  type: string;
  name: string;
}

@Injectable()
export class GoogleDriveService {
  private drive;
  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_API_CREDENTIALS_JSON_PATH,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    this.drive = google.drive({
      version: 'v3',
      auth,
    });
  }
  async uploadFileToDrive(fileToUpload: IFileToUpload) {
    const { file, type, name } = fileToUpload;
    console.log(`Uploading file ${name} with type ${type} to Google Drive...`);
    return this.drive.files.create({
      requestBody: {
        name,
        mimeType: type,
      },
      media: {
        mimeType: type,
        body: file,
      },
    });
  }

  async setFilePublic(fileId: string) {
    await this.drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
  }
}
