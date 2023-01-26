import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { 
  incorrectPasswordMock, 
  loginMock, 
  tokenMock, 
  userMock,  
} from './mocks/userMock';
import { secret } from '../utils/jwt';

chai.use(chaiHttp);

const { expect } = chai;

describe('tests for route /login', () => {
  afterEach(sinon.restore);

  it('should create a token if email and password are correct', async () => {
    sinon.stub(User, 'findOne').resolves(userMock as any);

    const response = await chai.request(app).post('/login').send(loginMock);
    const token = response.body.token;

    const validToken = jwt.verify(token, secret) as jwt.JwtPayload;

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
    expect(validToken.username).to.be.equal('Admin');
  });

  it('should return error if password is incorrect', async () => {
    sinon.stub(User, 'findOne').resolves(userMock as any);

    const response = await chai.request(app).post('/login').send(incorrectPasswordMock);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });    
  });

  it('should return user role', async () => {
    sinon.stub(User, 'findOne').resolves(userMock as User);
    sinon.stub(jwt, 'verify').returns(tokenMock as any);

    const response = await chai.request(app).get('/login/validate').set('Authorization', 'asdasdasd');

    // expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('role');
    expect(response.body).to.be.deep.equal({ role: 'admin' });    
  });

  it('should User not found', async () => {
    sinon.stub(User, 'findOne').resolves(null);
    sinon.stub(jwt, 'verify').returns(tokenMock as any);

    const response = await chai.request(app).get('/login/validate').set('Authorization', 'asdasdasd');

    expect(response.status).to.be.equal(404);
    expect(response.body).to.be.deep.equal({ message: 'User not found' });    
  });
});