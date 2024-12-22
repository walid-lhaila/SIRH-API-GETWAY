import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from '../minio/minio.service';

@Controller('JOB')
export class JobController {
  constructor(
    @Inject('Job-offers-service') private readonly jobService: ClientProxy,
    private readonly minioService: MinioService,
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

  @Post(':id/apply')
  @UseInterceptors(FileInterceptor('cv'))
  async applyForJob(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const candidateId = uuidv4();
    const cvUrl = await this.minioService.uploadFile(file);

    return this.jobService
      .send({ cmd: 'applyForJob' }, { id, candidateId, cvUrl })
      .toPromise();
  }
}
