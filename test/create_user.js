import supertest from 'supertest';
import { expect } from 'chai';
import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const request = supertest('https://reqres.in/api');

const name_data = "John Doe";
const job_data = "Carpenter";

const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "job": {
      "type": "string"
    },
    "id": {
      "type": "string",
      "pattern": "^[0-9]+$"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["name", "job", "id", "createdAt"]
};

describe('Create User', () => {
  it('Status code is 201', async () => {
    const response = await request.post('/users')
      .send({ name: name_data, job: job_data });
    expect(response.status).to.equal(201);
  });

  it('Content-Type is present', async () => {
    const response = await request.post('/users')
      .send({ name: name_data, job: job_data });
    expect(response.headers).to.have.property('content-type');
  });

  it('Test name', async () => {
    const response = await request.post('/users')
      .send({ name: name_data, job: job_data });
    expect(response.body.name).to.eql(name_data);
  });

  it('Test job', async () => {
    const response = await request.post('/users')
      .send({ name: name_data, job: job_data });
    expect(response.body.job).to.eql(job_data);
  });

  it('Schema validation', async () => {
    const response = await request.post('/users')
      .send({ name: name_data, job: job_data });
    expect(response.body).to.be.jsonSchema(schema);
  });
});
