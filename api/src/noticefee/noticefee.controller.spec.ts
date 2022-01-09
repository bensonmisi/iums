import { Test, TestingModule } from '@nestjs/testing';
import { NoticefeeController } from './noticefee.controller';
import { NoticefeeService } from './noticefee.service';

describe('NoticefeeController', () => {
  let controller: NoticefeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticefeeController],
      providers: [NoticefeeService],
    }).compile();

    controller = module.get<NoticefeeController>(NoticefeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
