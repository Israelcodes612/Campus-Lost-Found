import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SupabaseModule } from './supabase/supabase.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { UploadsModule } from './uploads/uploads.module';
import { ClaimsModule } from './claims/claims.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SupabaseModule,

    UsersModule,

    ItemsModule,

    UploadsModule,

    ClaimsModule,

    AdminModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}