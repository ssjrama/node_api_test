import supertest from 'supertest';
import { expect } from 'chai';
import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const request = supertest('https://reqres.in/api');

describe('Delete User', () => {
    it('Status code is 204', async () => {
        const response = await request.delete('/users/2')
            .send();
        expect(response.status).to.equal(204);
    });
});
