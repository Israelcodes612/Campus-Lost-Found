import { ClaimsService } from './claims.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { ReviewClaimDto } from './dto/review-claim.dto';
export declare class ClaimsController {
    private readonly claimsService;
    constructor(claimsService: ClaimsService);
    createClaim(itemId: string, user: any, dto: CreateClaimDto): Promise<any>;
    getMyClaims(user: any): Promise<any[]>;
    reviewClaim(claimId: string, user: any, dto: ReviewClaimDto): Promise<any>;
}
