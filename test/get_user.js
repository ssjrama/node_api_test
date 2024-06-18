import supertest from 'supertest';
import { expect } from 'chai';
import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const request = supertest('https://reqres.in/api');

const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "User Response",
    "type": "object",
    "properties": {
        "data": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "email": {
                    "type": "string",
                    "format": "email"
                },
                "first_name": {
                    "type": "string"
                },
                "last_name": {
                    "type": "string"
                },
                "avatar": {
                    "type": "string",
                    "format": "uri"
                }
            },
            "required": ["id", "email", "first_name", "last_name", "avatar"]
        },
        "support": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "format": "uri"
                },
                "text": {
                    "type": "string"
                }
            },
            "required": ["url", "text"]
        }
    },
    "required": ["data", "support"]
};

describe('Get User', () => {
    it('Status code is 200', async () => {
        const response = await request.get('/users/2')
            .send();
        expect(response.status).to.equal(200);
    });

    it('Content-Type is present', async () => {
        const response = await request.get('/users/2')
            .send();
        expect(response.headers).to.have.property('content-type');
    });

    it('Test data', async () => {
        const response = await request.get('/users/2').send();
        const data = {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg"
        };
        expect(response.body.data).to.eql(data);
    });

    it('Test support', async () => {
        const response = await request.get('/users/2').send();
        const support = {
            "url": "https://reqres.in/#support-heading",
            "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
        };
        expect(response.body.support).to.eql(support);
    });    

    it('Schema validation', async () => {
        const response = await request.get('/users/2')
            .send();
        expect(response.body).to.be.jsonSchema(schema);
    });
});
