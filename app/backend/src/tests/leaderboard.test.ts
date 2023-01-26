// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';

// import Team from '../database/models/Team';
// import homeLeaderboardMock from './mocks/leaderboardMocks';
// import teamsMatchesMock from './mocks/teamsMatchesMock';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('tests for route /leaderboard/home', () => {
//   afterEach(sinon.restore);

//   it('should create a leaderboard with home and away statistics', async () => {
//     sinon.stub(Team, 'findAll').resolves(teamsMatchesMock as any);

//     const response = await chai.request(app).get('/leaderboard');

//     expect(response.status).to.be.equal(200);
//     expect(response.body).to.be.deep.equal(homeLeaderboardMock);
//   });

// });