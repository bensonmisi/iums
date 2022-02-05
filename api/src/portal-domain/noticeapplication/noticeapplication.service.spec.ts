import { Test, TestingModule } from '@nestjs/testing';
import { NoticeapplicationService } from './noticeapplication.service';

describe('NoticeapplicationService', () => {
  let service: NoticeapplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoticeapplicationService],
    }).compile();

    service = module.get<NoticeapplicationService>(NoticeapplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
