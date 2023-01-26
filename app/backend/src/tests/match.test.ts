import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesMock from './mocks/matchMocks';
import Match from '../database/models/Match';
import { 
  equalTeamsRequest,
  invalidTeamRequest, 
  newMatchMock, 
  newMatchRequest 
} from './mocks/newMatchMock';
import { tokenMock } from './mocks/userMock';


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
    sinon.stub(Match, 'create').resolves(newMatchMock as Match);
    sinon.stub(jwt, 'verify').returns(tokenMock as any);

    const response = await chai.request(app).post('/matches')
      .send(newMatchRequest).set('Authorization', 'huashusahu');
    
    expect(response.status).to.be.equal(201);
    expect(response.body).to.be.deep.equal(newMatchMock);
  });

  it('should return not found', async () => {
    sinon.stub(Match, 'create').resolves(newMatchMock as Match);
    sinon.stub(jwt, 'verify').returns(tokenMock as any);

    const response = await chai.request(app).post('/matches')
      .send(invalidTeamRequest).set('Authorization', 'huashusahu');
    
    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
  });

  // it('should return invalid, if request for two equal teams', async () => {
  //   sinon.stub(Match, 'create').resolves(newMatchMock as Match);
  //   sinon.stub(jwt, 'verify').returns(tokenMock as any);

  //   const response = await chai.request(app).post('/matches')
  //     .send(equalTeamsRequest).set('Authorization', 'huashusahu');
    
  //   expect(response.status).to.be.equal(422);
  //   expect(response.body).to.be.deep.equal({ 
  //     message: 'It is not possible to create a match with two equal teams' 
  //   });
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