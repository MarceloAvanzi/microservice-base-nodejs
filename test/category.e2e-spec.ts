import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Category (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/categories/')
      .expect(200)
      .expect([]);
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/categories/')
      .send({ name: 'Category 1' })
      .expect(201);
  });

  it('/ (POST) - invalid body', () => {
    return request(app.getHttpServer())
      .post('/categories/')
      .send({ invalid: 'body' })
      .expect(500);
  });
});
