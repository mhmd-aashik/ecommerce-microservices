import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class AddUserAddressDto {
  @IsUUID()
  userId: string;

  @IsString()
  @MaxLength(160)
  fullName: string;

  @IsString()
  @MaxLength(30)
  phone: string;

  @IsString()
  addressLine1: string;

  @IsOptional()
  @IsString()
  addressLine2?: string;

  @IsString()
  @MaxLength(100)
  city: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @IsString()
  @MaxLength(30)
  postalCode: string;

  @IsString()
  @MaxLength(100)
  country: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
