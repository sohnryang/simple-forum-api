import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.birthday = createUserDto.birthday;
    user.passwordHash = await argon2.hash(createUserDto.password, {
      type: argon2.argon2id,
    });
    await this.userRepository.save(user);
  }

  async findAll() {
    const entities = await this.userRepository.find();
    const response = [];
    for (const entity of entities)
      response.push({
        id: entity.id,
        email: entity.email,
        username: entity.username,
        birthday: entity.birthday,
      });
    return response;
  }

  async findOne(id: number) {
    const findResult = await this.userRepository.findOne(id);
    if (findResult == undefined)
      throw new NotFoundException(`User for id ${id} not found`);
    return {
      email: findResult.email,
      birthday: findResult.birthday,
      username: findResult.username,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = new User();
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.birthday = updateUserDto.birthday;
    user.passwordHash = await argon2.hash(updateUserDto.password, {
      type: argon2.argon2id,
    });
    await this.userRepository.update(id, user);
  }

  async remove(id: number): Promise<User> {
    const findResult = await this.userRepository.findOne(id);
    if (findResult == undefined)
      throw new NotFoundException(`User for id ${id} not found`);
    return this.userRepository.remove(findResult);
  }
}
