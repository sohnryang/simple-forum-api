import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ForumpostsService } from './forumposts.service';
import { CreateForumpostDto } from './dto/create-forumpost.dto';
import { UpdateForumpostDto } from './dto/update-forumpost.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { SearchHashtagDto } from './dto/search-hashtag.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class ForumpostsController {
  constructor(private readonly forumpostsService: ForumpostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createForumpostDto: CreateForumpostDto, @Request() req) {
    return this.forumpostsService.create(+req.user.id, createForumpostDto);
  }

  @Get()
  findAll() {
    return this.forumpostsService.findAll();
  }

  @Get('hashtags')
  findAllHashtags() {
    return this.forumpostsService.findAllHashtags();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forumpostsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateForumpostDto: UpdateForumpostDto,
    @Request() req,
  ) {
    return this.forumpostsService.update(+id, +req.user.id, updateForumpostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.forumpostsService.remove(+id, +req.user.id);
  }

  @Get('hashtags/:hashtagId')
  filter(@Param('hashtagId') hashtagId: string) {
    return this.forumpostsService.findHashtag(+hashtagId);
  }

  @Post('hashtags/search')
  searchHashtag(@Body() searchHashtagDto: SearchHashtagDto) {
    return this.forumpostsService.searchHashtag(searchHashtagDto);
  }
}
