import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateForumpostDto } from './dto/create-forumpost.dto';
import { UpdateForumpostDto } from './dto/update-forumpost.dto';
import { Forumpost } from './entities/forumpost.entity';

@Injectable()
export class ForumpostsService {
  constructor(
    @InjectRepository(Forumpost)
    private forumpostRepository: Repository<Forumpost>,
  ) {}

  async create(authorId: number, createForumpostDto: CreateForumpostDto) {
    const post = new Forumpost();
    post.authorId = authorId;
    post.title = createForumpostDto.title;
    post.content = createForumpostDto.content;
    post.hashtags = createForumpostDto.hashtags.join(' ');
    post.creationTimestamp = new Date();
    post.editTimestamp = null;
    await this.forumpostRepository.save(post);
  }

  private entityToResponse(entity: Forumpost) {
    const { hashtags, ...otherProps } = entity;
    return { ...otherProps, hashtags: hashtags.split(' ') };
  }

  async findAll() {
    const entities = await this.forumpostRepository.find();
    const response = [];
    for (const entity of entities) response.push(this.entityToResponse(entity));
    return response;
  }

  async findOne(id: number) {
    const findResult = await this.forumpostRepository.findOne(id);
    if (findResult) return this.entityToResponse(findResult);
    throw new NotFoundException(`Post for id ${id} not found`);
  }

  async update(
    id: number,
    authorId: number,
    updateForumpostDto: UpdateForumpostDto,
  ) {
    const findResult = await this.forumpostRepository.findOne(id);
    if (!findResult) throw new NotFoundException();
    if (authorId != findResult.authorId) throw new ForbiddenException();
    const post = new Forumpost();
    post.title = updateForumpostDto.title;
    post.content = updateForumpostDto.content;
    post.hashtags = updateForumpostDto.hashtags.join(' ');
    post.editTimestamp = new Date();
    await this.forumpostRepository.update(id, post);
  }

  async remove(id: number, authorId: number) {
    const findResult = await this.forumpostRepository.findOne(id);
    if (!findResult) throw new NotFoundException(`Post for id ${id} not found`);
    if (authorId != findResult.authorId) throw new ForbiddenException();
    this.forumpostRepository.remove(findResult);
  }
}
