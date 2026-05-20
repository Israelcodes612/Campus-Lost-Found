import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/current-user.decorator'
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';

import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

@Get('me')
@UseGuards(SupabaseAuthGuard)
async getMe(@CurrentUser() user: any) {
    return this.usersService.getProfile(user.id);
}

@Patch('me')
@UseGuards(SupabaseAuthGuard)
async updateMe(
    @CurrentUser() user: any,

    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateProfile(
      user.id,
      dto,
    );
  }
}