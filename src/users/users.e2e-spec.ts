import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/nestjs-testing';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UsersModule } from './users.module';

describe('Users', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [UsersModule],
        })
            .overrideProvider(getRepositoryToken(UserEntity))
            .useValue(createMock<Repository<UserEntity>>())
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('GET /users/1', async () => {
        return request(app.getHttpServer())
            .get('/users/1')
            .expect(HttpStatus.BAD_REQUEST)
            .expect({
                message: 'Invalid user!',
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
