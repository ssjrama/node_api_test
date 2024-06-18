import supertest from 'supertest';
import { expect } from 'chai';
import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const request = supertest('https://reqres.in/api');

const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "User List Response",
    "type": "object",
    "properties": {
        "page": {
            "type": "integer"
        },
        "per_page": {
            "type": "integer"
        },
        "total": {
            "type": "integer"
        },
        "total_pages": {
            "type": "integer"
        },
        "data": {
            "type": "array",
            "items": {
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
            }
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
    "required": ["page", "per_page", "total", "total_pages", "data", "support"]
}

describe('Get Users', () => {
    it('Status code is 200', async () => {
        const response = await request.get('/users?page=1')
            .send();
        expect(response.status).to.equal(200);
    });

    it('Content-Type is present', async () => {
        const response = await request.get('/users?page=1')
            .send();
        expect(response.headers).to.have.property('content-type');
    });

    it('Schema validation', async () => {
        const response = await request.get('/users?page=1')
            .send();
        expect(response.body).to.be.jsonSchema(schema);
    });
});
