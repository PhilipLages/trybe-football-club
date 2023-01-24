import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import matchesMock from './mocks/matchMocks';
import Match from '../database/models/Match';
import matchesInProgressMock from './mocks/matchesInProgress';

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

  // it('should get all matches with inProgress equals true', async () => {
  //   sinon.stub(Match, 'findAll').resolves(matchesInProgressMock as any);
    
  //   const response = await chai.request(app).get('/matches').query('inProgress=true');

  //   expect(response.status).to.be.equal(200);
  //   expect(response.body).to.be.deep.equal(matchesInProgressMock);
  // });
});