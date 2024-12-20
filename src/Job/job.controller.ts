import {
  Controller,
  Get,
  Inject,
  Post,
  Req,
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

  @Get('getAll')
  async getAllJobOffers() {
    return this.jobService.send({ cmd: 'getAll' }, {}).toPromise();
  }

  @Get('getByUser')
  async getAllJobOffersByUser(@Req() req: Request) {
    const token = req.headers['authorization'];
    return this.jobService.send({ cmd: 'getAllByUser' }, { token }).toPromise();
  }
}
