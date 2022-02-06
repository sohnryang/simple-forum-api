import { Module } from '@nestjs/common';
import { ForumpostsService } from './forumposts.service';
import { ForumpostsController } from './forumposts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forumpost } from './entities/forumpost.entity';
import { Hashtag } from './entities/hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Forumpost, Hashtag])],
  controllers: [ForumpostsController],
  providers: [ForumpostsService],
})
export class ForumpostsModule {}
