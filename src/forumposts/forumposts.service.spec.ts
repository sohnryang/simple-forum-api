import { Test, TestingModule } from '@nestjs/testing';
import { ForumpostsService } from './forumposts.service';

describe('ForumpostsService', () => {
  let service: ForumpostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForumpostsService],
    }).compile();

    service = module.get<ForumpostsService>(ForumpostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
