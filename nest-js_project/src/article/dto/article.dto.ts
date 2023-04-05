import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ArticleDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  title: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  topic: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  content: string;
}
