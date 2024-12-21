import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { JobModule } from './Job/job.module';
import { EmployesModule } from './Employes/employes.module';

@Module({
  imports: [AuthModule, JobModule, EmployesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
