import { Test, TestingModule } from '@nestjs/testing';
import { DocumentcommentsController } from './documentcomments.controller';
import { DocumentcommentsService } from './documentcomments.service';

describe('DocumentcommentsController', () => {
  let controller: DocumentcommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentcommentsController],
      providers: [DocumentcommentsService],
    }).compile();

    controller = module.get<DocumentcommentsController>(DocumentcommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
