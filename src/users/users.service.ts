import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.usersRepository.update(id, updateUserDto);

    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return { message: `User ${id} updated successfully` };
  }

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }


  remove(id: string) {
    return this.usersRepository.update(id, { isActive: false });
  }
}
