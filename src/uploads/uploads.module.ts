import { Module } from '@nestjs/common';

import { SupabaseModule } from '../supabase/supabase.module';

import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [SupabaseModule],

  controllers: [UploadsController],

  providers: [UploadsService],
})
export class UploadsModule {}
