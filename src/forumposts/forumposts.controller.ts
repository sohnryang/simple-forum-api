import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ForumpostsService } from './forumposts.service';
import { CreateForumpostDto } from './dto/create-forumpost.dto';
import { UpdateForumpostDto } from './dto/update-forumpost.dto';

@Controller('posts')
export class ForumpostsController {
  constructor(private readonly forumpostsService: ForumpostsService) {}

  @Post()
  create(@Body() createForumpostDto: CreateForumpostDto) {
    return this.forumpostsService.create(createForumpostDto);
  }

  @Get()
  findAll() {
    return this.forumpostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumpostsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateForumpostDto: UpdateForumpostDto,
  ) {
    return this.forumpostsService.update(+id, updateForumpostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forumpostsService.remove(+id);
  }
}
