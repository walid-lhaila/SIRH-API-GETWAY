import {Body, Controller, Delete, HttpException, HttpStatus, Inject, Param, Post, Req} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('SIRH')
export class AppController {
  constructor( @Inject('KeyCloak-Service') private readonly keycloakService: ClientProxy ) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.keycloakService.send({ cmd: 'login' }, body).toPromise();
  }

  @Post('createHR')
  async createHR(@Req() req: Request) {
    const token = req.headers['authorization'];
    const payload = req.body;
    return this.keycloakService.send({ cmd: 'createHR' }, { token, payload }).toPromise();
  }

  @Delete('/delete/:email')
  async deleteHR(@Param('email') email: string, @Req() req: Request ): Promise<any> {
    const token = req.headers['authorization'];
    if(!token) {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }
    return this.keycloakService.send({ cmd: 'deleteHR' }, { token, email }).toPromise()
  }

}
