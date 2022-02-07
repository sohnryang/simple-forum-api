import { ApiProperty } from '@nestjs/swagger';

export class SearchHashtagDto {
  @ApiProperty()
  name: string;
}
