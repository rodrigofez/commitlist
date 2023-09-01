import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetCommitListDto {
  @ApiProperty({
    description: 'Owner of repo',
  })
  @IsString()
  owner: string = '';

  @ApiProperty({
    description: 'Repo name',
  })
  @IsString()
  repo: string = '';

  @ApiProperty({
    description: 'Branch name',
  })
  @IsString()
  branch: string = '';

  @ApiProperty({
    default: 1,
  })
  @IsNumber()
  @IsOptional()
  page: number;

  @ApiProperty({
    default: 10,
  })
  @IsNumber()
  @IsOptional()
  take: number;
}
