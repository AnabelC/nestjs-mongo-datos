import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { CreateCategoryDto } from './category.dtos';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `product's description` })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `product's price` })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `product's stock` })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `product's image` })
  readonly image: string;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({ description: `product's category` })
  readonly category: CreateCategoryDto;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ description: `product's brand` })
  readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
