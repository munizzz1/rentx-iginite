import request from 'supertest';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;

describe('List Category Controller', () => {
   
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuid();
        const password = await hash('admin', 8);

        await connection.query(`
            INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
             values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX')
        `);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should be able to list all categories', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx.com.br',
            password: 'admin',
        });

        const { token } = responseToken.body;

        await request(app).post('/categories').send({
            name: 'Category Test',
            description: 'Category Test'
        }).set({
            Authorization: `Bearer ${token}`,
        });

        await request(app).post('/categories').send({
            name: 'Category Test2',
            description: 'Category Test2'
        }).set({
            Authorization: `Bearer ${token}`,
        });

        const responseListCategories = await request(app).get('/categories')

        expect(responseListCategories.status).toBe(200);
        expect(responseListCategories.body.length).toBe(2);
    });
});