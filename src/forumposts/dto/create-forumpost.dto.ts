import { ApiProperty } from '@nestjs/swagger';

export class CreateForumpostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  hashtags: string[];
}
