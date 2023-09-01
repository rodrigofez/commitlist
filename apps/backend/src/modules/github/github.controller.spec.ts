import { GithubController } from './github.controller';
import { GithubService } from './github.service';
import { HttpService } from '@nestjs/axios';

describe('GithubController', () => {
  let controller: GithubController;
  let githubService: GithubService;
  let httpService: HttpService;

  beforeEach(async () => {
    githubService = new GithubService(httpService);
    controller = new GithubController(githubService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
