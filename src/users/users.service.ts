import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { format } from 'path';
import { formatDate } from 'src/utils/date';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const newUser = this.usersRepository.create({
      ...createUserDto,
      role: createUserDto.role ?? Role.USER,
      password: await bcrypt.hash(createUserDto.password, saltOrRounds),
      createdAt: formatDate(new Date()),
    });
    const createdUser = await this.usersRepository.save(newUser);
    delete createdUser.password;
    return createdUser;

  }

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }


  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
