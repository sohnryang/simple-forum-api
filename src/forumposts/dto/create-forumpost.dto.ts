import { ApiProperty } from '@nestjs/swagger';

export class CreateForumpostDto {
  @ApiProperty({ description: 'Title of a post' })
  title: string;

  @ApiProperty({ description: 'Content of a post' })
  content: string;

  @ApiProperty({ description: 'Hashtags of a post', type: [String] })
  hashtags: string[];
}
