import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JobController } from './job.controller';
import { MinioService } from '../minio/minio.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Job-offers-service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 7000,
        },
      },
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [JobController],
  providers: [MinioService],
})
export class JobModule {}
