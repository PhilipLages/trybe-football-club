import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';
import { 
  incorrectPasswordMock, 
  loginMock, 
  noEmailMock, 
  userMock,  
} from './mocks/userMock';
import { secret } from '../utils/jwt';
import JwtTokenProps from '../modules/interfaces/jwtTokenProps'

chai.use(chaiHttp);

const { expect } = chai;

describe('tests for route /login', () => {
  afterEach(sinon.restore);

  it('should create a token if email and password are correct', async () => {
    sinon.stub(User, 'findOne').resolves(userMock as any);

    const response = await chai.request(app).post('/login').send(loginMock);
    const token = response.body.token;

    const validToken = jwt.verify(token, secret) as JwtTokenProps;

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('token');
    expect(validToken.username).to.be.equal('Admin');
  });

  it('should return error if password is incorrect', async () => {
    sinon.stub(User, 'findOne').resolves(userMock as any);
    sinon.stub(bcrypt, 'compare').resolves(false);

    const response = await chai.request(app).post('/login').send(incorrectPasswordMock);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body).to.be.deep.equal({ message: 'Incorrect email or password' });    
  });

  it('should return error if email/password are missing', async () => {
    sinon.stub(User, 'findOne').resolves(userMock as any);

    const response = await chai.request(app).post('/login').send(noEmailMock);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('message');
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });    
  });
});