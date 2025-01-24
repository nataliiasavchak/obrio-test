import { Inject, Injectable } from '@nestjs/common';
import { FilesDatabaseService } from 'src/files-db/files-db.service';
import axios from 'axios';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';

@Injectable()
export class FilesApiService {
  constructor(
    private filesDatabaseService: FilesDatabaseService,
    private googleDriveService: GoogleDriveService,
  ) {}

  async create(url: string) {
    const downloadedFile = await this.downloadFromURL(url);
    const uploadedFile = await this.googleDriveService.uploadFileToDrive({
      file: downloadedFile.data,
      type: downloadedFile.headers['content-type'],
      name: `obrio-test-${Math.floor(Math.random() * 9000) + 1000}`,
    });
    const fileId = uploadedFile.data.id;

    await this.googleDriveService.setFilePublic(fileId);

    await this.filesDatabaseService.createFileRecord({
      fileUrl: url,
      googleDriveId: uploadedFile.data.id,
      googleDriveUrl: `https://drive.google.com/file/d/${fileId}/view`,
    });
  }

  async createAll(urls: string[]) {
    console.log('Processing URLs:', JSON.stringify(urls, null, 2));
    let result: { url: string; error?: string; success: boolean }[] = [];
    for (let url of urls) {
      try {
        console.log(`Processing URL ${url}`);
        await this.create(url);
      } catch (err: any) {
        return result.push({
          url,
          success: false,
          error: err,
        });
      }
      result.push({
        url,
        success: true,
      });
    }
    return result;
  }

  async findAll() {
    return this.filesDatabaseService.getAllFiles();
  }

  async downloadFromURL(url: string) {
    console.log(`Downloading image from URL ${url}...`);
    return axios.get(url, {
      responseType: 'stream',
    });
  }
}
