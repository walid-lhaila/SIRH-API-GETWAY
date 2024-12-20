import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JobController } from './job.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Job-offers-service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 1000,
        },
      },
    ]),
  ],
  controllers: [JobController],
  providers: [],
})
export class JobModule {}
