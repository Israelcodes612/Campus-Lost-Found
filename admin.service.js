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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let AdminService = class AdminService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async getAllUsers() {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('created_at', {
            ascending: false,
        });
        if (error) {
            throw new common_1.ForbiddenException(error.message);
        }
        return data;
    }
    async suspendUser(userId) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('users')
            .update({
            is_suspended: true,
        })
            .eq('id', userId)
            .select()
            .single();
        if (error || !data) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            message: 'User suspended successfully',
            user: data,
        };
    }
    async unsuspendUser(userId) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('users')
            .update({
            is_suspended: false,
        })
            .eq('id', userId)
            .select()
            .single();
        if (error || !data) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            message: 'User unsuspended successfully',
            user: data,
        };
    }
    async deleteItem(itemId) {
        const supabase = this.supabaseService.getClient();
        const { error } = await supabase
            .from('items')
            .delete()
            .eq('id', itemId);
        if (error) {
            throw new common_1.NotFoundException('Item not found');
        }
        return {
            message: 'Item deleted successfully',
        };
    }
    async updateRole(userId, role) {
        const allowedRoles = [
            'student',
            'moderator',
            'admin',
        ];
        if (!allowedRoles.includes(role)) {
            throw new common_1.ForbiddenException('Invalid role');
        }
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('users')
            .update({
            role,
        })
            .eq('id', userId)
            .select()
            .single();
        if (error || !data) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            message: 'Role updated successfully',
            user: data,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], AdminService);
//# sourceMappingURL=admin.service.js.map