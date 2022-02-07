import { ApiProperty } from '@nestjs/swagger';

export class SearchHashtagDto {
  @ApiProperty({ description: 'Keyword for hashtag search' })
  keyword: string;
}
