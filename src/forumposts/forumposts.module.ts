import { Module } from '@nestjs/common';
import { ForumpostsService } from './forumposts.service';
import { ForumpostsController } from './forumposts.controller';

@Module({
  controllers: [ForumpostsController],
  providers: [ForumpostsService]
})
export class ForumpostsModule {}
