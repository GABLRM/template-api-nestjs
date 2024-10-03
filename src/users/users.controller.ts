import { Controller, Get, Post, Body, Param, Put, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UniqueConstraintFilter } from 'src/filters/unique-constraint-filter';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@UseFilters(UniqueConstraintFilter)
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // User creation
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad request (email or username already exists)' })
  @ApiBody({ type: CreateUserDto, description: "Data to create user" })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // User update by id
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: "User is updated" })
  @ApiResponse({ status: 404, description: "User not found" })
  @ApiParam({ name: 'id', description: "User id" })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // list of all users
  @ApiOperation({ summary: 'List of all users' })
  @ApiResponse({ status: 200, description: "list of all users" })
  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  // User data by id
  @ApiOperation({ summary: 'User data by id' })
  @ApiResponse({ status: 200, description: 'All the data of specifi user' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: "User id" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getOne(id);
  }

  // Soft delete user by id
  @ApiOperation({ summary: 'Soft delete User' })
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: 'User id' })
  @Put('delete/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}