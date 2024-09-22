import { Controller, Get, Post, Body, Param, Put, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UniqueConstraintFilter } from 'src/filters/unique-constraint-filter';

@Controller('users')
@UseFilters(UniqueConstraintFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Creation d'un utilisateur
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Mise à jour d'un utilisateur à partir de son id
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // liste de tout les utilisateurs dans la base de données
  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  // Liste des données d'un utilisateur à partir de son id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getOne(id);
  }

  // Soft delete d'un utilisateur à partir de son id
  @Put('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}