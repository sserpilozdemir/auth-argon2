import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';

describe('end to end test cases for online order project', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    app.listen(3000);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Signup test', () => {
    it('should throw if email is empty', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          firstname: 'test',
          lastname: 'test',
          password: '123',
          balance: 300,
        })
        .expectStatus(400);
    });
    it('should throw if password is empty', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          firstname: 'test',
          lastname: 'test',
          email: 'test@test.com',
          balance: 300,
        })
        .expectStatus(400);
    });
    it('should throw if firstname is empty', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          lastname: 'test',
          email: 'test_test@test.com',
          password: '123',
          balance: 300,
        })
        .expectStatus(400);
    });
    it('should throw if no body provided', () => {
      return pactum.spec().post('/auth/signup').expectStatus(400);
    });
    it('should signup', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          firstname: 'test1',
          lastname: 'test1',
          email: 'test1@test.com',
          password: '123',
          balance: 300,
        })
        .expectStatus(201);
    });
    it('should throw if email already exists', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          firstname: 'test1',
          lastname: 'test1',
          email: 'test1@test.com',
          password: '123',
          balance: 300,
        })
        .expectStatus(403);
    });
    it('should throw if email is invalid', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          firstname: 'test1',
          lastname: 'test1',
          email: 'test1test.com',
          password: '123',
          balance: 300,
        })
        .expectStatus(400);
    });
    it('should throw if password is invalid', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          firstname: 'test1',
          lastname: 'test1',
          email: 'test1test.com',
          password: '12',
          balance: 300,
        })
        .expectStatus(400);
    });
    it('should throw if firstname is invalid', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          firstname: 'test1',
          lastname: 'test1',
          email: 'test1test.com',
          password: '12',
          balance: 300,
        })
        .expectStatus(400);
    });
    it('should throw if lastname is invalid', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          firstname: 'test1',
          lastname: 'test1',
          email: 'test1test.com',
          password: '12',
          balance: 300,
        })
        .expectStatus(400);
    });
    it('should throw if balance is invalid', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          firstname: 'test1',
          lastname: 'test1',
          email: 'test1@test.com',
          password: '12',
          balance: -300,
        })
        .expectStatus(403);
    });
    it('should throw if balance is invalid', () => {
      return pactum
        .spec()
        .post('/auth/signup')
        .withBody({
          firstname: 'test1',
          lastname: 'test1',
          email: 'test1test.com',
          password: '12',
          balance: '300',
        })
        .expectStatus(400);
    });
  });

  it('should throw if email is empty', () => {
    return pactum
      .spec()
      .post('/auth/signin')
      .withBody({
        password: '123',
      })
      .expectStatus(400);
  });
  it('should throw if password is empty', () => {
    return pactum
      .spec()
      .post('/auth/signin')
      .withBody({
        email: 'test-test@test.com',
      })
      .expectStatus(400);
  });
  it('should throw if no body provided', () => {
    return pactum.spec().post('/auth/signin').expectStatus(400);
  });
});
