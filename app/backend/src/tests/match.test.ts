import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesMock from './mocks/matchMocks';
import Match from '../database/models/Match';
import { newMatchMock, newMatchRequest } from './mocks/newMatchMock';
import User from '../database/models/User';
import { loginMock, userMock } from './mocks/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('tests for route /matches', () => {
  afterEach(sinon.restore);

  it('should get all matches', async () => {
    sinon.stub(Match, 'findAll').resolves(matchesMock as any);
    
    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matchesMock);
  });

  it('should create a new match', async () => {
    sinon.stub(Match, 'create').resolves(newMatchMock as any);
    sinon.stub(User, 'findOne').resolves(userMock as any);

    await chai.request(app).post('/login').send(loginMock);
    
    const response = await chai.request(app).post('/matches').send(newMatchRequest);

    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(newMatchMock);
  });
});