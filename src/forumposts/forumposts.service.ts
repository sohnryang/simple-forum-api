import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateForumpostDto } from './dto/create-forumpost.dto';
import { SearchHashtagDto } from './dto/search-hashtag.dto';
import { UpdateForumpostDto } from './dto/update-forumpost.dto';
import { Forumpost } from './entities/forumpost.entity';
import { Hashtag } from './entities/hashtag.entity';

@Injectable()
export class ForumpostsService {
  constructor(
    @InjectRepository(Forumpost)
    private forumpostRepository: Repository<Forumpost>,
    @InjectRepository(Hashtag) private hashtagRepository: Repository<Hashtag>,
  ) {}

  async create(authorId: number, createForumpostDto: CreateForumpostDto) {
    const post = new Forumpost();
    post.authorId = authorId;
    post.title = createForumpostDto.title;
    post.content = createForumpostDto.content;
    post.hashtags = [];
    for (const hashtagName of createForumpostDto.hashtags) {
      let hashtag = await this.hashtagRepository.findOne({ name: hashtagName });
      if (!hashtag) {
        hashtag = new Hashtag();
        hashtag.name = hashtagName;
      }
      post.hashtags.push(hashtag);
    }
    post.creationTimestamp = new Date();
    post.editTimestamp = null;
    await this.forumpostRepository.save(post);
  }

  private entityToResponse(entity: Forumpost) {
    const { hashtags, ...otherProps } = entity;
    return { ...otherProps, hashtags: hashtags.map((o) => o.name) };
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
    post.hashtags = [];
    for (const hashtagName of updateForumpostDto.hashtags) {
      let hashtag = await this.hashtagRepository.findOne({ name: hashtagName });
      if (!hashtag) {
        hashtag = new Hashtag();
        hashtag.name = hashtagName;
      }
      post.hashtags.push(hashtag);
    }
    post.editTimestamp = new Date();
    await this.forumpostRepository.update(id, post);
  }

  async remove(id: number, authorId: number) {
    const findResult = await this.forumpostRepository.findOne(id);
    if (!findResult) throw new NotFoundException(`Post for id ${id} not found`);
    if (authorId != findResult.authorId) throw new ForbiddenException();
    this.forumpostRepository.remove(findResult);
  }

  async findAllHashtags() {
    const entities = this.hashtagRepository.find();
    return entities;
  }

  async findHashtag(hashtagId: number) {
    const filterResult = await this.hashtagRepository
      .createQueryBuilder('hashtag')
      .where('hashtag.id = :hashtagId', { hashtagId })
      .leftJoinAndSelect('hashtag.posts', 'posts')
      .getOne();
    if (!filterResult)
      throw new NotFoundException(`Hashtag for id ${hashtagId} not found`);
    return filterResult;
  }

  async searchHashtag(searchHashtagDto: SearchHashtagDto) {
    return await this.hashtagRepository.find({
      name: Like(`%${searchHashtagDto.keyword}%`),
    });
  }
}
