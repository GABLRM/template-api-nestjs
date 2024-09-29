import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private readonly usersService: UsersService) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getOneByUsername(username);
    console.log('user = ' + JSON.stringify(user))
    console.log('user.password = ' + user.password)
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException("email or password incorrect");
    }
    const { password, ...result } = user;
    return result;
  }
}
