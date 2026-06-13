import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class QueryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  question: string;

  @IsString()
  @IsNotEmpty()
  namespace: string;
}
