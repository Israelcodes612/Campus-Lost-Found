import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    private readonly supabaseService: SupabaseService,
  ) {}

  async create(
    userId: string,
    dto: CreateItemDto,
  ) {
     const supabase = this.supabaseService.getClient();

    const payload = {
      ...dto,
      user_id: userId,
    };

    const { data, error } = await supabase
      .from('items')
      .insert(payload)
      .select()
      .single();

      if (error) {
      throw new ForbiddenException(error.message);
    }

    return data;
  }

  async findAll() {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        users (
          full_name,
          profile_image
        ),
        campus_locations (
          name
        )
      `)
      .order('created_at', {
        ascending: false,
      });

        if (error) {
      throw new ForbiddenException(error.message);
    }

    return data;
  }

  async findOne(id: string) {
    const supabase = this.supabaseService.getClient();
    

    const { data, error } = await supabase
      .from('items')
      .select(`
        *,
        users (
          full_name,
          profile_image
        ),
        campus_locations (
          name
        )
      `)
      .eq('id', id)
      .single();

        if (error || !data) {
      throw new NotFoundException('Item not found');
    }

    return data;
  }

  async update(
    itemId: string,
    userId: string,
    dto: UpdateItemDto,
  ) {
    const supabase = this.supabaseService.getClient();

    const { data: existingItem } = await supabase
      .from('items')
      .select('*')
      .eq('id', itemId)
      .single();

    if (!existingItem) {
      throw new NotFoundException('Item not found');
    }

    if (existingItem.user_id !== userId) {
      throw new ForbiddenException(
        'You do not own this item',
      );
    }

    const { data, error } = await supabase
      .from('items')
      .update(dto)
      .eq('id', itemId)
      .select()
      .single();

    if (error) {
      throw new ForbiddenException(error.message);
    }

    return data;
  }

    async remove(
    itemId: string,
    userId: string,
  ) {
    const supabase = this.supabaseService.getClient();

    const { data: existingItem } = await supabase
      .from('items')
      .select('*')
      .eq('id', itemId)
      .single();

    if (!existingItem) {
      throw new NotFoundException('Item not found');
    }

    if (existingItem.user_id !== userId) {
      throw new ForbiddenException(
        'You do not own this item',
      );
    }

        const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', itemId);

    if (error) {
      throw new ForbiddenException(error.message);
    }

    return {
      message: 'Item deleted successfully',
    };
  }
}