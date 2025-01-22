import { Test, TestingModule } from '@nestjs/testing';
import { FilesApiService } from './files-api.service';

describe('FilesApiService', () => {
  let service: FilesApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesApiService],
    }).compile();

    service = module.get<FilesApiService>(FilesApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
