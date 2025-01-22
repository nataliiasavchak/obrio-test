import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FilesService {
  async downloadFromURL(url: string) {
    return axios.get(url, {
      responseType: 'stream',
    });
  }
}
