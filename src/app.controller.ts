  import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
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
      console.log(token, payload);
      return this.keycloakService.send({ cmd: 'createHR' }, { token, payload }).toPromise();
    }
  }
