import { Test, TestingModule } from '@nestjs/testing';
import { NoticeapplicationController } from './noticeapplication.controller';
import { NoticeapplicationService } from './noticeapplication.service';

describe('NoticeapplicationController', () => {
  let controller: NoticeapplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticeapplicationController],
      providers: [NoticeapplicationService],
    }).compile();

    controller = module.get<NoticeapplicationController>(NoticeapplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
