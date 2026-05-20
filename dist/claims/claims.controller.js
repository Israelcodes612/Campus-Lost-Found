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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimsController = void 0;
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const supabase_auth_guard_1 = require("../auth/supabase-auth.guard");
const claims_service_1 = require("./claims.service");
const create_claim_dto_1 = require("./dto/create-claim.dto");
const review_claim_dto_1 = require("./dto/review-claim.dto");
let ClaimsController = class ClaimsController {
    claimsService;
    constructor(claimsService) {
        this.claimsService = claimsService;
    }
    async createClaim(itemId, user, dto) {
        return this.claimsService.createClaim(itemId, user.id, dto);
    }
    async getMyClaims(user) {
        return this.claimsService.getMyClaims(user.id);
    }
    async reviewClaim(claimId, user, dto) {
        return this.claimsService.reviewClaim(claimId, user.id, dto);
    }
};
exports.ClaimsController = ClaimsController;
__decorate([
    (0, common_1.Post)(':itemId'),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_claim_dto_1.CreateClaimDto]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "createClaim", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "getMyClaims", null);
__decorate([
    (0, common_1.Patch)(':claimId/review'),
    __param(0, (0, common_1.Param)('claimId')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, review_claim_dto_1.ReviewClaimDto]),
    __metadata("design:returntype", Promise)
], ClaimsController.prototype, "reviewClaim", null);
exports.ClaimsController = ClaimsController = __decorate([
    (0, common_1.Controller)('claims'),
    (0, common_1.UseGuards)(supabase_auth_guard_1.SupabaseAuthGuard),
    __metadata("design:paramtypes", [claims_service_1.ClaimsService])
], ClaimsController);
//# sourceMappingURL=claims.controller.js.map