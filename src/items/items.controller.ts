import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/current-user.decorator';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
  ) {}

  @Post()
  @UseGuards(SupabaseAuthGuard)
  async create(
    @CurrentUser() user: any,

    @Body() dto: CreateItemDto,
  ) {
    return this.itemsService.create(
      user.id,
      dto,
    );
  }

  @Get()
  async findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ) {
    return this.itemsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(SupabaseAuthGuard)
  async update(
    @Param('id') id: string,

    @CurrentUser() user: any,

    @Body() dto: UpdateItemDto,
  ) {
    return this.itemsService.update(
      id,
      user.id,
      dto,
    );
  }

  @Delete(':id')
  @UseGuards(SupabaseAuthGuard)
  async remove(
    @Param('id') id: string,

    @CurrentUser() user: any,
  ) {
    return this.itemsService.remove(
      id,
      user.id,
    );
  }
}