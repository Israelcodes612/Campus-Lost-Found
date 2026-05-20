import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    full_name?: string

    @IsOptional()
    @IsString()
    @MaxLength(50)
    matric_number?: string

    @IsOptional()
    @IsString()
    @MaxLength(20)
    phone_number?: string

    @IsOptional()
    @IsString()
    profile_image?: string

}