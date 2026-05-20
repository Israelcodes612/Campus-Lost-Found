import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(
  SupabaseAuthGuard,
  RolesGuard,
)

export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

   @Patch('users/:id/suspend')
  async suspendUser(
    @Param('id') id: string,
  ) {
    return this.adminService.suspendUser(id);
  }

  @Patch('users/:id/unsuspend')
  async unsuspendUser(
    @Param('id') id: string,
  ) {
    return this.adminService.unsuspendUser(id);
  }

  @Delete('items/:id')
  async deleteItem(
    @Param('id') id: string,
  ) {
    return this.adminService.deleteItem(id);
  }

  @Patch('users/:id/role')
  async updateRole(
    @Param('id') id: string,

    @Body('role') role: string,
  ) {
    return this.adminService.updateRole(
      id,
      role,
    );
  }
}