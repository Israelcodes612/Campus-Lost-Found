import { SupabaseService } from '../supabase/supabase.service';
import { CreateClaimDto } from './dto/create-claim.dto';
import { ReviewClaimDto } from './dto/review-claim.dto';
export declare class ClaimsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    createClaim(itemId: string, claimantId: string, dto: CreateClaimDto): Promise<any>;
    getMyClaims(userId: string): Promise<any[]>;
    reviewClaim(claimId: string, reviewerId: string, dto: ReviewClaimDto): Promise<any>;
}
