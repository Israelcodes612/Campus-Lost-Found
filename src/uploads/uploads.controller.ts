import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';

import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
  ) {}

  @Post('item-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadItemImage(
    @UploadedFile() file: Express.Multer.File,
  ) {
     return this.uploadsService.uploadItemImage(
      file,
    );
  }
}