import { Module } from '@nestjs/common';
import { ForumpostsService } from './forumposts.service';
import { ForumpostsController } from './forumposts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forumpost } from './entities/forumpost.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Forumpost])],
  controllers: [ForumpostsController],
  providers: [ForumpostsService],
})
export class ForumpostsModule {}
