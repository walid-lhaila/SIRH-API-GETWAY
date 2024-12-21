import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EmployesController } from './employes.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Employes-service',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: 6000,
        },
      },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [EmployesController],
  providers: [],
})
export class EmployesModule {}
