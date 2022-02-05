import { Test, TestingModule } from '@nestjs/testing';
import { ForumpostsController } from './forumposts.controller';
import { ForumpostsService } from './forumposts.service';

describe('ForumpostsController', () => {
  let controller: ForumpostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForumpostsController],
      providers: [ForumpostsService],
    }).compile();

    controller = module.get<ForumpostsController>(ForumpostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
