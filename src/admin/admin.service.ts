import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly supabaseService: SupabaseService,
  ) {}

  async getAllUsers() {
    const supabase =
      this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', {
        ascending: false,
      });

    if (error) {
      throw new ForbiddenException(
        error.message,
      );
    }

    return data;
  }

  async suspendUser(userId: string) {
    const supabase =
      this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('users')
      .update({
        is_suspended: true,
      })
      .eq('id', userId)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return {
      message: 'User suspended successfully',
      user: data,
    };
  }

  async unsuspendUser(userId: string) {
    const supabase =
      this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('users')
      .update({
        is_suspended: false,
      })
      .eq('id', userId)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return {
      message: 'User unsuspended successfully',
      user: data,
    };
  }

  async deleteItem(itemId: string) {
    const supabase =
      this.supabaseService.getClient();

    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', itemId);

    if (error) {
      throw new NotFoundException(
        'Item not found',
      );
    }

    return {
      message: 'Item deleted successfully',
    };
  }

  async updateRole(
    userId: string,
    role: string,
  ) {
    const allowedRoles = [
      'student',
      'moderator',
      'admin',
    ];

    if (!allowedRoles.includes(role)) {
      throw new ForbiddenException(
        'Invalid role',
      );
    }

    const supabase =
      this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('users')
      .update({
        role,
      })
      .eq('id', userId)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return {
      message: 'Role updated successfully',
      user: data,
    };
  }
}