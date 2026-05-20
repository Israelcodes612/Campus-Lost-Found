import {
  IsEnum,
} from 'class-validator';


export enum ClaimDecision {
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class ReviewClaimDto {
  @IsEnum(ClaimDecision)
  decision: ClaimDecision;
}