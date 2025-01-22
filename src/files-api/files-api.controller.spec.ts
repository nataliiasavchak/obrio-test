import { Test, TestingModule } from '@nestjs/testing';
import { FilesApiController } from './files-api.controller';
import { FilesApiService } from './files-api.service';

describe('FilesApiController', () => {
  let controller: FilesApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesApiController],
      providers: [FilesApiService],
    }).compile();

    controller = module.get<FilesApiController>(FilesApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
