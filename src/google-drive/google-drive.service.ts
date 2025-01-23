import { Injectable } from '@nestjs/common';

const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: './obrio-test-9a52368ef5fc.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const drive = google.drive({
  version: 'v3',
  auth,
});

@Injectable()
export class GoogleDriveService {

  async uploadFileToDrive(params: {
    file: ReadableStream;
    type: string;
    name: string;
  }) {
    const { file, type, name } = params;
    console.log(`Uploading file ${name} with type ${type} to Google Drive...`);
    return drive.files.create({
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

  async shareFileWithEmail(params: { fileId: string; email: string }) {
    const { fileId, email } = params;
    console.log(`Temporary measures to be able to see uploaded images in Google Drive with personal account`)
    return drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'writer',
        type: 'user',
        emailAddress: email, 
      },
    });
  }
}
