import { Module } from '@nestjs/common';

import { SupabaseModule } from '../supabase/supabase.module';

import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [SupabaseModule],

  controllers: [ItemsController],

  providers: [ItemsService],
})
export class ItemsModule {}