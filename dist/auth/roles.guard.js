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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let RolesGuard = class RolesGuard {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('Unauthorized');
        }
        const supabase = this.supabaseService.getClient();
        const { data } = await supabase
            .from('users')
            .select('role,is_suspended')
            .eq('id', user.id)
            .single();
        if (!data) {
            throw new common_1.ForbiddenException('User not found');
        }
        if (data.is_suspended) {
            throw new common_1.ForbiddenException('Account suspended');
        }
        if (data.role !== 'admin' &&
            data.role !== 'moderator') {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        request.currentRole = data.role;
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map