import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesMock from './mocks/matchMocks';
import Match from '../database/models/Match';
import { newMatchMock, newMatchRequest } from './mocks/newMatchMock';
import User from '../database/models/User';
import { loginMock, userMock } from './mocks/userMock';
import { secret } from '../utils/jwt';
import JwtTokenProps from '../modules/interfaces/jwtTokenProps';

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

  // it('should create a new match', async () => {
  //   sinon.stub(Match, 'create').resolves(newMatchMock as any);
  //   sinon.stub(User, 'findOne').resolves(userMock as any);

  //   const responseLogin = await chai.request(app).post('/login').send(loginMock);    
    
  //   const token = responseLogin.body.token;
    
  //   const validToken = jwt.verify(token, secret) as JwtTokenProps;

  //   const response = await chai.request(app).post('/matches').send(newMatchRequest);
    
  //   expect(validToken.username).to.be.equal('Admin');
  //   expect(response.status).to.be.equal(201);
  //   expect(response.body).to.be.deep.equal(newMatchMock);
  // });

  it('should finish a match in progress', async () => {
    sinon.stub(Match, 'update').resolves(null as any);
    
    const response = await chai.request(app).patch('/matches/41/finish');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Finished' });
  });

  it('should update a match in progress', async () => {
    sinon.stub(Match, 'update').resolves(null as any);
    
    const response = await chai.request(app).patch('/matches/41');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal({ message: 'Match updated' });
  });
});