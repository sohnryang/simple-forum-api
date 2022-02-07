import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  OmitType,
  PickType,
} from '@nestjs/swagger';

@ApiTags('Users API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'A new user is successfully created.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  @ApiCreatedResponse({
    description: 'Login succeeded. JWT token is provided in the response body.',
    schema: {
      properties: {
        token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Could not log in with provided email address and password.',
  })
  @ApiConsumes('text/json')
  @ApiBody({
    description: 'Email and password.',
    type: PickType(CreateUserDto, ['email', 'password'] as const),
  })
  login(@Request() req) {
    return this.usersService.login(req.user);
  }

  @Get()
  @ApiOkResponse({
    description: 'Query succeeded.',
    type: [OmitType(CreateUserDto, ['password'] as const)],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Query succeeded.',
    type: [OmitType(CreateUserDto, ['password'] as const)],
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
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
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.id != id) throw new ForbiddenException();
    return this.usersService.update(+id, updateUserDto);
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
    if (req.user.id != id) throw new ForbiddenException();
    return this.usersService.remove(+id);
  }
}
