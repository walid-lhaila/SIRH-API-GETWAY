import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { JobModule } from './Job/job.module';

@Module({
  imports: [AuthModule, JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
