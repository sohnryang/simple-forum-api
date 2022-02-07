import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address of a user',
    example: 'abcd@abcd.com',
  })
  email: string;

  @ApiProperty({ description: 'Password of a user', example: 'thisisinsecure' })
  password: string;

  @ApiProperty({ description: "User's name", example: 'John Doe' })
  username: string;

  @ApiProperty({ type: [Date], description: 'Birthday of a user' })
  birthday: string;
}
