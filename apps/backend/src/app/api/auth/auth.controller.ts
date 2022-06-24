import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../../auth/auth.service';
import { LocalAuthGuard } from '../../auth/local-auth.guard';
import { Public } from '../../auth/public-route.decorator';
import { JwtAuth, LocalAuth, LocalAuthReq } from '../dtos/auth.dto';
import { User, UserCreate } from '../dtos/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: LocalAuthReq, @Body() data: LocalAuth) {
    // after passing the LocalAuthGuard, the auth is transformed
    const transformedReq = req.user;
    return await this.authService.login(transformedReq as unknown as User);
  }

  @Public()
  @Post('register')
  async register(@Body() data: UserCreate): Promise<JwtAuth> {
    return await this.authService.register(data);
  }
}
