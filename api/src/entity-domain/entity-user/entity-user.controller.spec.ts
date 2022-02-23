import { Test, TestingModule } from '@nestjs/testing';
import { EntityUserController } from './entity-user.controller';
import { EntityUserService } from './entity-user.service';

describe('EntityUserController', () => {
  let controller: EntityUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntityUserController],
      providers: [EntityUserService],
    }).compile();

    controller = module.get<EntityUserController>(EntityUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
