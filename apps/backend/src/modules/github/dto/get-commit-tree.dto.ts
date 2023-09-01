import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetCommitTreeDto {
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
}
