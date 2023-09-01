import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { GithubModule } from '../src/modules/github/github.module';
import { GithubService } from '../src/modules/github/github.service';
import { INestApplication } from '@nestjs/common';

describe('Commits', () => {
  let app: INestApplication;
  const githubService = {
    getCommitList: () => [{ sha: 'b32af9032fj0a', message: 'feat: message' }],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [GithubModule],
    })
      .overrideProvider(GithubService)
      .useValue(githubService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET commits`, () => {
    return request(app.getHttpServer())
      .get('/github/commits')
      .query({
        owner: 'rodrigofez',
        repo: 'commitlist',
        branch: 'main',
        page: 1,
        take: 1,
      })
      .expect(200)
      .expect(githubService.getCommitList());
  });

  afterAll(async () => {
    await app.close();
  });
});
