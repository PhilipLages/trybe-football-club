import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { oneTeamMock, teamsMock } from '../tests/mocks/teamMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('tests for route /teams', () => {
  afterEach(sinon.restore);

  it('should get all teams', async () => {
    sinon.stub(Team, 'findAll').resolves(teamsMock as any);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teamsMock);
  });

  it('should get one team based on its id', async () => {
    sinon.stub(Team, 'findByPk').resolves(oneTeamMock as any);

    const response = await chai.request(app).get('/teams/16');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(oneTeamMock);
  });

  it('should return not found if no team is found', async () => {
    sinon.stub(Team, 'findByPk').resolves(null as any);

    const response = await chai.request(app).get('/teams/32');

    expect(response.status).to.be.equal(404);
  });

});