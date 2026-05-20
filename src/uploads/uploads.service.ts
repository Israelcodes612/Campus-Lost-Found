import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { randomUUID } from 'crypto';

import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UploadsService {
  constructor(
    private readonly supabaseService: SupabaseService,
  ) {}

  async uploadItemImage(
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'No file uploaded',
      );
    }

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ];

    if (
      !allowedMimeTypes.includes(file.mimetype)
    ) {
      throw new BadRequestException(
        'Invalid file type',
      );
    }

    const supabase =
      this.supabaseService.getClient();

    const fileExtension =
      file.originalname.split('.').pop();

    const fileName = `${randomUUID()}.${fileExtension}`;

    const filePath = `items/${fileName}`;

    const { error } = await supabase.storage
      .from('items')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new BadRequestException(
        error.message,
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from('items')
      .getPublicUrl(filePath);

    return {
      message: 'Image uploaded successfully',
      image_url: publicUrl,
    };
  }
}