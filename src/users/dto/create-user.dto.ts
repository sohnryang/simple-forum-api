import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Email address of a user' })
  email: string;

  @ApiProperty({ description: 'Password of a user' })
  password: string;

  @ApiProperty({ description: "User's name" })
  username: string;

  @ApiProperty({ type: [Date], description: 'Birthday of a user' })
  birthday: string;
}
