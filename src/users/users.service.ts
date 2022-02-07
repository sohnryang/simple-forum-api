import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
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
      id: findResult.id,
      email: findResult.email,
      birthday: findResult.birthday,
      username: findResult.username,
    };
  }

  async findByEmail(email: string) {
    const findResult = await this.userRepository.findOne({ email: email });
    return findResult;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email: email });
    if (user && (await argon2.verify(user.passwordHash, password)))
      return { id: user.id };
    return null;
  }

  async login(user: any) {
    return { token: this.jwtService.sign({ sub: user.id }) };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (!this.userRepository.findOne(id)) throw new NotFoundException();
    const user = new User();
    user.username = updateUserDto.username;
    user.birthday = updateUserDto.birthday;
    user.passwordHash = await argon2.hash(updateUserDto.password, {
      type: argon2.argon2id,
    });
    await this.userRepository.update(id, user);
  }

  async remove(id: number) {
    const findResult = await this.userRepository.findOne(id);
    if (findResult == undefined)
      throw new NotFoundException(`User for id ${id} not found`);
    this.userRepository.remove(findResult);
  }
}
