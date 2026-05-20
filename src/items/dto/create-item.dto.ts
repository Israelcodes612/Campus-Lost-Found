import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export enum ItemStatus {
  LOST = 'lost',
  FOUND = 'found',
}

export class CreateItemDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsOptional()
    @IsString()
    image_url?: string;

    @IsOptional()
    @IsUUID()
    location_id?: string;

    @IsEnum(ItemStatus)
    item_status: ItemStatus;

    @IsDateString()
    date_lost_or_found: string;
}