"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let ItemsService = class ItemsService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async create(userId, dto) {
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
            throw new common_1.ForbiddenException(error.message);
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
            throw new common_1.ForbiddenException(error.message);
        }
        return data;
    }
    async findOne(id) {
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
            throw new common_1.NotFoundException('Item not found');
        }
        return data;
    }
    async update(itemId, userId, dto) {
        const supabase = this.supabaseService.getClient();
        const { data: existingItem } = await supabase
            .from('items')
            .select('*')
            .eq('id', itemId)
            .single();
        if (!existingItem) {
            throw new common_1.NotFoundException('Item not found');
        }
        if (existingItem.user_id !== userId) {
            throw new common_1.ForbiddenException('You do not own this item');
        }
        const { data, error } = await supabase
            .from('items')
            .update(dto)
            .eq('id', itemId)
            .select()
            .single();
        if (error) {
            throw new common_1.ForbiddenException(error.message);
        }
        return data;
    }
    async remove(itemId, userId) {
        const supabase = this.supabaseService.getClient();
        const { data: existingItem } = await supabase
            .from('items')
            .select('*')
            .eq('id', itemId)
            .single();
        if (!existingItem) {
            throw new common_1.NotFoundException('Item not found');
        }
        if (existingItem.user_id !== userId) {
            throw new common_1.ForbiddenException('You do not own this item');
        }
        const { error } = await supabase
            .from('items')
            .delete()
            .eq('id', itemId);
        if (error) {
            throw new common_1.ForbiddenException(error.message);
        }
        return {
            message: 'Item deleted successfully',
        };
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], ItemsService);
//# sourceMappingURL=items.service.js.map