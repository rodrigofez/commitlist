import { BadRequestException, Injectable } from '@nestjs/common';

import { GetCommitListDto } from './dto/get-commit-list.dto';
import { CommitTree, ListBranches, ListCommits } from './types/responses';
import { GetBranchesDto } from './dto/get-branches-list.dto';
import { GetCommitTreeDto } from './dto/get-commit-tree.dto';
import { HttpService } from '@nestjs/axios';

import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class GithubService {
  private githubUrl: string;

  constructor(private readonly httpService: HttpService) {}

  async getCommitList(
    data: GetCommitListDto,
  ): Promise<{ results: ListCommits; page: number }> {
    const { data: results } = await firstValueFrom(
      this.httpService
        .get<ListCommits>(
          `${this.githubUrl}/repos/${data.owner}/${data.repo}/commits`,
          {
            params: { page: data.page, per_page: data.take, sha: data.branch },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new BadRequestException(error.response.statusText);
          }),
        ),
    );

    return { results, page: data.page };
  }

  async getBranches({ owner, repo }: GetBranchesDto): Promise<ListBranches> {
    const { data: results } = await firstValueFrom(
      this.httpService
        .get<ListBranches>(`${this.githubUrl}/repos/${owner}/${repo}/branches`)
        .pipe(
          catchError((error: AxiosError) => {
            throw new BadRequestException(error.response.statusText);
          }),
        ),
    );

    return results;
  }

  async getCommitTree({ owner, repo }: GetCommitTreeDto): Promise<CommitTree> {
    try {
      const branches = (await this.getBranches({ owner, repo })).map(
        (branch) => branch.name,
      );
      const index = branches.indexOf('main');

      if (index !== -1) {
        branches.splice(index, 1);
        branches.unshift('main');
      }

      const commits: CommitTree = [];

      for (const branch of branches) {
        const { results: branchCommits } = await this.getCommitList({
          owner,
          repo,
          branch,
          page: 1,
          take: 100,
        });

        branchCommits.every((commit) => {
          if (commits.some((val) => val.sha == commit.sha)) return false;
          commits.push({
            ...commit,
            branch,
            branchOrder: branches.indexOf(branch),
          });
          return true;
        });
      }

      commits.sort(
        (a, b) =>
          new Date(b.commit.author.date).getTime() -
          new Date(a.commit.author.date).getTime(),
      );

      return commits;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
