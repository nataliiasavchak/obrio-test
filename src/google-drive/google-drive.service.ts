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
  async uploadFile(params: {
    file: ReadableStream;
    type: string;
    name: string;
  }) {
    const { file, type, name } = params;
    return drive.files.create({
      requestBody: {
        name: `obrio-test-${Math.floor(Math.random() * 9000) + 1000}`,
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
        emailAddress: email, // Replace with your Google account email
      },
    });
  }
}
