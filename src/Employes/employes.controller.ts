import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('EMPLOYEES')
export class EmployesController {
  constructor(
    @Inject('Employes-service') private readonly employesService: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.employesService.send({ cmd: 'login' }, body).toPromise();
  }

  @Post('importEmploye')
  @UseInterceptors(FileInterceptor('file'))
  async importEmployees(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const token = req.headers['authorization'];
    try {
      const filePath = path.resolve(file.path);
      const fileContent = fs.readFileSync(filePath);
      const result = await this.employesService
        .send(
          { cmd: 'importEmployees' },
          { token, file: fileContent.toString('base64') },
        )
        .toPromise();

      return result;
    } catch {
      throw new Error('Internal server error');
    }
  }
}
