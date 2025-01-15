import { Controller, Get, Post, Body, Param, Put, UseFilters, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UniqueConstraintFilter } from 'src/filters/unique-constraint-filter';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@UseFilters(UniqueConstraintFilter)
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // User creation
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({
    status: 201,
    description: 'User created',
    schema: {
      example: {
        "id": '090f206d-c052-40f2-986e-e398f033c06d',
        "username": 'UserExample',
        "email": 'user.example@gmail.com',
        "role": 'USER',
        "isActive": true,
        "createdAt": '01-01-2025',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (email or username already exists)',
    schema: {
      example: {
        "statusCode": '400',
        "error": 'Bad Request',
        "message": 'This email address is already registered. Please use a different one.',
      },
    },
  })
  @ApiBody({ type: CreateUserDto, description: "Data to create user" })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // User update by id
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: "User is updated",
    schema: {
      example: {
        "message": "User 090f206d-c052-40f2-986e-e398f033c06d updated successfully"
      },
    },
  })
  // TODO : Add Bearer Token
  // TODO: Add only ADMIN Permissions
  // TODO: Add Another Filter for Not Found (404) 

  @ApiResponse({ status: 404, description: "User not found" })
  @ApiParam({ name: 'id', description: "User id" })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // list of all users
  @ApiOperation({ summary: 'List of all users' })
  @ApiResponse({
    status: 200,
    description: "list of all users",
    schema: {
      example: [
        {
          "id": "090f206d-c052-40f2-986e-e398f033c06d",
          "username": "UserExample",
          "email": "user.example@gmail.com",
          "role": "User",
          "isActive": true,
          "createdAt": "15-01-2025"
        },
        {
          "id": "a370f563-6b45-4852-9a76-55badefd32c9",
          "username": "UserExample2",
          "email": "user.example2@gmail.com",
          "role": "USER",
          "isActive": true,
          "createdAt": "15-01-2025"
        }
      ]
    },
  })
  @Get()
  findAll() {
    return this.usersService.getAll();
  }

  // User data by id
  @ApiOperation({ summary: 'User data by id' })
  @ApiResponse({
    status: 200,
    description: 'All the data of specific user',
    schema: {
      example: {
        "id": "090f206d-c052-40f2-986e-e398f033c06d",
        "username": "UserExample",
        "email": "user.example@gmail.com",
        "role": "User",
        "isActive": true,
        "createdAt": "15-01-2025"
      }
    },
  })
  // TODO: Add Another Filter for Not Found (404) 
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', description: "User id" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getOne(id);
  }

  // TODO : Add Bearer Token
  // TODO: Add only ADMIN Permissions
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