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
exports.ClaimsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const review_claim_dto_1 = require("./dto/review-claim.dto");
let ClaimsService = class ClaimsService {
    supabaseService;
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async createClaim(itemId, claimantId, dto) {
        const supabase = this.supabaseService.getClient();
        const { data: item } = await supabase
            .from('items')
            .select('*')
            .eq('id', itemId)
            .single();
        if (!item) {
            throw new common_1.NotFoundException('Item not found');
        }
        if (item.user_id === claimantId) {
            throw new common_1.ForbiddenException('You cannot claim your own item');
        }
        const { data, error } = await supabase
            .from('claims')
            .insert({
            item_id: itemId,
            claimant_id: claimantId,
            message: dto.message,
        })
            .select()
            .single();
        if (error) {
            throw new common_1.ForbiddenException(error.message);
        }
        return data;
    }
    async getMyClaims(userId) {
        const supabase = this.supabaseService.getClient();
        const { data, error } = await supabase
            .from('claims')
            .select(`
        *,
        items (
          title,
          image_url,
          item_status
        )
      `)
            .eq('claimant_id', userId)
            .order('created_at', {
            ascending: false,
        });
        if (error) {
            throw new common_1.ForbiddenException(error.message);
        }
        return data;
    }
    async reviewClaim(claimId, reviewerId, dto) {
        const supabase = this.supabaseService.getClient();
        const { data: claim } = await supabase
            .from('claims')
            .select(`
        *,
        items (*)
      `)
            .eq('id', claimId)
            .single();
        if (!claim) {
            throw new common_1.NotFoundException('Claim not found');
        }
        const item = claim.items;
        if (item.user_id !== reviewerId) {
            throw new common_1.ForbiddenException('Only item owner can review claims');
        }
        const { data, error } = await supabase
            .from('claims')
            .update({
            claim_status: dto.decision,
            reviewed_by: reviewerId,
            reviewed_at: new Date(),
        })
            .eq('id', claimId)
            .select()
            .single();
        if (error) {
            throw new common_1.ForbiddenException(error.message);
        }
        if (dto.decision === review_claim_dto_1.ClaimDecision.APPROVED) {
            await supabase
                .from('items')
                .update({
                is_resolved: true,
                item_status: 'claimed',
            })
                .eq('id', item.id);
            await supabase
                .from('claims')
                .update({
                claim_status: 'rejected',
            })
                .eq('item_id', item.id)
                .neq('id', claimId);
        }
        return data;
    }
};
exports.ClaimsService = ClaimsService;
exports.ClaimsService = ClaimsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], ClaimsService);
//# sourceMappingURL=claims.service.js.map