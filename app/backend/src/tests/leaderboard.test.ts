import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { fullLeaderboardMock, homeLeaderboardMock } from './mocks/leaderboardMocks';
import teamsMatchesMock from './mocks/teamsMatchesMock';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('tests for route /leaderboard/home', () => {
  afterEach(sinon.restore);

  it('should create a leaderboard with home statistics', async () => {
    sinon.stub(Match, 'findAll').resolves(teamsMatchesMock as any);

    const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(homeLeaderboardMock);
  });

  it('should create a leaderboard with all statistics', async () => {
    sinon.stub(Match, 'findAll').resolves(fullLeaderboardMock as any);

    const response = await chai.request(app).get('/leaderboard');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(fullLeaderboardMock);
  });
});