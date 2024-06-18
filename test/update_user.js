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
      "updatedAt": {
        "type": "string",
        "format": "date-time"
      }
    },
    "required": ["name", "job", "updatedAt"]
  };

describe('Update User', () => {
  it('Status code is 200', async () => {
    const response = await request.put('/users/2')
      .send({ name: name_data, job: job_data });
    expect(response.status).to.equal(200);
  });

  it('Content-Type is present', async () => {
    const response = await request.put('/users/2')
      .send({ name: name_data, job: job_data });
    expect(response.headers).to.have.property('content-type');
  });

  it('Test name', async () => {
    const response = await request.put('/users/2')
      .send({ name: name_data, job: job_data });
    expect(response.body.name).to.eql(name_data);
  });

  it('Test job', async () => {
    const response = await request.put('/users/2')
      .send({ name: name_data, job: job_data });
    expect(response.body.job).to.eql(job_data);
  });

  it('Schema validation', async () => {
    const response = await request.put('/users/2')
      .send({ name: name_data, job: job_data });
    expect(response.body).to.be.jsonSchema(schema);
  });
});
