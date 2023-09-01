import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';
import { GetCommitListDto } from './dto/get-commit-list.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetBranchesDto } from './dto/get-branches-list.dto';
import { GetCommitTreeDto } from './dto/get-commit-tree.dto';

@ApiTags('Github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @ApiOperation({ summary: 'Get paginated list of commits' })
  @Get('/commits')
  async getCommitList(@Query() dto: GetCommitListDto): Promise<object> {
    return await this.githubService.getCommitList(dto);
  }

  @ApiOperation({ summary: 'Get all branches by repo' })
  @Get('/branches')
  async getBranches(@Query() dto: GetBranchesDto): Promise<object> {
    return await this.githubService.getBranches(dto);
  }

  @ApiOperation({ summary: 'Get commits with branches' })
  @Get('/commit-tree')
  async getBranchTree(@Query() dto: GetCommitTreeDto): Promise<object> {
    return await this.githubService.getCommitTree(dto);
  }
}
