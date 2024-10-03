import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: "Login to account" })
  @ApiResponse({ status: 201, description: 'User is connected' })
  @ApiResponse({ status: 401, description: 'Email or password is incorrect' })
  @ApiBody({ type: SignInDTO, description: "Data to login" })
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

}
