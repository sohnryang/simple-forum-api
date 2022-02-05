import { Injectable } from '@nestjs/common';
import { CreateForumpostDto } from './dto/create-forumpost.dto';
import { UpdateForumpostDto } from './dto/update-forumpost.dto';

@Injectable()
export class ForumpostsService {
  create(createForumpostDto: CreateForumpostDto) {
    return 'This action adds a new forumpost';
  }

  findAll() {
    return `This action returns all forumposts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forumpost`;
  }

  update(id: number, updateForumpostDto: UpdateForumpostDto) {
    return `This action updates a #${id} forumpost`;
  }

  remove(id: number) {
    return `This action removes a #${id} forumpost`;
  }
}
