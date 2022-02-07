import { ApiProperty } from '@nestjs/swagger';

export class CreateForumpostDto {
  @ApiProperty({ description: 'Title of a post', example: 'Some title' })
  title: string;

  @ApiProperty({ description: 'Content of a post', example: 'Some content' })
  content: string;

  @ApiProperty({
    description: 'Hashtags of a post',
    type: [String],
    example: ['hashtag1', 'hashtag2'] as const,
  })
  hashtags: string[];
}
