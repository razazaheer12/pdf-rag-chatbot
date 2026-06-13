import { IsString, IsOptional } from 'class-validator';

export class UploadPdfDto {
  @IsString()
  @IsOptional()
  description?: string;
}
