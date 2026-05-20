import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';

import { CreateClaimDto } from './dto/create-claim.dto';
import {
  ClaimDecision,
  ReviewClaimDto,
} from './dto/review-claim.dto';

@Injectable()
export class ClaimsService {
  constructor(
    private readonly supabaseService: SupabaseService,
  ) {}

  async createClaim(
    itemId: string,
    claimantId: string,
    dto: CreateClaimDto,
  ) {
    const supabase =
      this.supabaseService.getClient();

    const { data: item } = await supabase
      .from('items')
      .select('*')
      .eq('id', itemId)
      .single();


    if (!item) {
      throw new NotFoundException(
        'Item not found',
      );
    }

    if (item.user_id === claimantId) {
      throw new ForbiddenException(
        'You cannot claim your own item',
      );
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
      throw new ForbiddenException(
        error.message,
      );
    }

    return data;
  }

   async getMyClaims(userId: string) {
    const supabase =
      this.supabaseService.getClient();

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
      throw new ForbiddenException(
        error.message,
      );
    }

    return data;
  }

  async reviewClaim(
    claimId: string,
    reviewerId: string,
    dto: ReviewClaimDto,
  ) {
    const supabase =
      this.supabaseService.getClient();

    const { data: claim } = await supabase
      .from('claims')
      .select(`
        *,
        items (*)
      `)
      .eq('id', claimId)
      .single();

    if (!claim) {
      throw new NotFoundException(
        'Claim not found',
      );
    }

     const item = claim.items;

    if (item.user_id !== reviewerId) {
      throw new ForbiddenException(
        'Only item owner can review claims',
      );
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
      throw new ForbiddenException(
        error.message,
      );
    }

    // If approved -> resolve item
    if (
      dto.decision === ClaimDecision.APPROVED
    ) {
      await supabase
        .from('items')
        .update({
          is_resolved: true,
          item_status: 'claimed',
        })
        .eq('id', item.id);

      // Reject all other claims
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
}