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
    // const res = await drive.files.get();
    // console.log('nata');
    // console.log(res);

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
