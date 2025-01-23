import { Test, TestingModule } from '@nestjs/testing';
import { FilesDatabaseService } from './files-db.service';

describe('FilesService', () => {
  let service: FilesDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesDatabaseService],
    }).compile();

    service = module.get<FilesDatabaseService>(FilesDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
