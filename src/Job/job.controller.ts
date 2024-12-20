import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('JOB')
export class JobController {
  constructor(
    @Inject('Job-offers-service') private readonly jobService: ClientProxy,
  ) {}

  @Post('create')
  async createJobOffers(@Req() req: Request) {
    const token = req.headers['authorization'];
    const payload = req.body;
    return this.jobService
      .send({ cmd: 'createJobOffers' }, { token, payload })
      .toPromise();
  }
}
