import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';

import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    private readonly supabaseService: SupabaseService,
  ) {}

    async getProfile(userId: string) {
        const supabase = this.supabaseService.getClient();

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (error || !data) {
            throw new NotFoundException('User not found');
    }

    return data;
  }

    async updateProfile(
        userId: string,
        dto: UpdateUserDto,
  ) {
    const supabase = this.supabaseService.getClient()

    const { data, error } = await supabase
        .from('users')
        .update(dto)
        .eq('id', userId)
        .select()
        .single();

    if (error || !data) {
        throw new NotFoundException('Failed to update user')
    }

    return data
  }
}