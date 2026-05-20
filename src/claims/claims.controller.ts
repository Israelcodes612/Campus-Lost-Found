import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/current-user.decorator';
import { SupabaseAuthGuard } from '../auth/supabase-auth.guard';

import { ClaimsService } from './claims.service';

import { CreateClaimDto } from './dto/create-claim.dto';
import { ReviewClaimDto } from './dto/review-claim.dto';

@Controller('claims')
@UseGuards(SupabaseAuthGuard)
export class ClaimsController {
  constructor(
    private readonly claimsService: ClaimsService,
  ) {}

  @Post(':itemId')
  async createClaim(
    @Param('itemId') itemId: string,

    @CurrentUser() user: any,

    @Body() dto: CreateClaimDto,
  ) {
    return this.claimsService.createClaim(
      itemId,
      user.id,
      dto,
    );
  }

  @Get('me')
  async getMyClaims(
    @CurrentUser() user: any,
  ) {
    return this.claimsService.getMyClaims(
      user.id,
    );
  }

  @Patch(':claimId/review')
  async reviewClaim(
    @Param('claimId') claimId: string,

    @CurrentUser() user: any,

    @Body() dto: ReviewClaimDto,
  ) {
    return this.claimsService.reviewClaim(
      claimId,
      user.id,
      dto,
    );
  }
}