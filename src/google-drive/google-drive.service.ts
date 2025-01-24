import { Injectable } from '@nestjs/common';

const { google } = require('googleapis');

@Injectable()
export class GoogleDriveService {
  private drive;
  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: './obrio-test-secret-file.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    this.drive = google.drive({
      version: 'v3',
      auth,
    });
  }
  async uploadFileToDrive(params: {
    file: ReadableStream;
    type: string;
    name: string;
  }) {
    const { file, type, name } = params;
    console.log(`Uploading file ${name} with type ${type} to Google Drive...`);
    return this.drive.files.create({
      requestBody: {
        name,
        mimeType: type,
        description: 'File description to make it less suspicious',
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

  async shareFileWithEmail(params: { fileId: string; email: string }) {
    const { fileId, email } = params;
    console.log(
      `Temporary measures to be able to see uploaded images in Google Drive with personal account`,
    );
    return this.drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'writer',
        type: 'user',
        emailAddress: email,
      },
    });
  }
}
