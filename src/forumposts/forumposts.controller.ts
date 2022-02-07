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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
  OmitType,
} from '@nestjs/swagger';

@ApiTags('Posts API')
@Controller('posts')
export class ForumpostsController {
  constructor(private readonly forumpostsService: ForumpostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'A new post is successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Provided JWT token is invalid.' })
  create(@Body() createForumpostDto: CreateForumpostDto, @Request() req) {
    return this.forumpostsService.create(+req.user.id, createForumpostDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Query succeeded.',
    schema: {
      type: 'array',
      items: {
        allOf: [
          { $ref: getSchemaPath(CreateForumpostDto) },
          {
            properties: {
              id: { type: 'integer' },
              authorId: { type: 'integer' },
            },
          },
        ],
      },
    },
  })
  findAll() {
    return this.forumpostsService.findAll();
  }

  @Get('hashtags')
  @ApiOkResponse({
    description: 'Query succeeded.',
    schema: {
      type: 'array',
      items: {
        properties: { id: { type: 'number' }, name: { type: 'string' } },
      },
    },
  })
  findAllHashtags() {
    return this.forumpostsService.findAllHashtags();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Query succeeded.',
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreateForumpostDto) },
        {
          properties: {
            id: { type: 'integer' },
            authorId: { type: 'integer' },
          },
        },
      ],
    },
  })
  findOne(@Param('id') id: string) {
    return this.forumpostsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update succeeded.' })
  @ApiUnauthorizedResponse({ description: 'Provided JWT token is invalid.' })
  @ApiForbiddenResponse({
    description: 'Provided JWT token is for another user.',
  })
  update(
    @Param('id') id: string,
    @Body() updateForumpostDto: UpdateForumpostDto,
    @Request() req,
  ) {
    return this.forumpostsService.update(+id, +req.user.id, updateForumpostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Removal succeeded.' })
  @ApiUnauthorizedResponse({ description: 'Provided JWT token is invalid.' })
  @ApiForbiddenResponse({
    description: 'Provided JWT token is for another user.',
  })
  remove(@Param('id') id: string, @Request() req) {
    return this.forumpostsService.remove(+id, +req.user.id);
  }

  @Get('hashtags/:hashtagId')
  @ApiOkResponse({ description: 'Hashtag for id `:hashtagId` found.' })
  @ApiNotFoundResponse({
    description: 'Hashtag for id `:hashtagId` not found.',
  })
  filter(@Param('hashtagId') hashtagId: string) {
    return this.forumpostsService.findHashtag(+hashtagId);
  }

  @Post('hashtags/search')
  @ApiCreatedResponse({
    description: 'Search succeeded.',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'number' },
          name: { type: 'string', example: 'test_hashtag' },
        },
      },
    },
  })
  searchHashtag(@Body() searchHashtagDto: SearchHashtagDto) {
    return this.forumpostsService.searchHashtag(searchHashtagDto);
  }
}
