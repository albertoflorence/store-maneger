const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validate = require('../../../src/middlewares/validate.product');

use(sinonChai);

describe('validate.product.create()', function () {
  let res;
  let next;
  beforeEach(function () {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });
  afterEach(sinon.restore);

  it('should return 400 status if the name is missing', async function () {
    await validate.create({ body: {} }, res, next);
    expect(res.status).to.have.been.calledOnceWith(400);
    expect(res.json).to.have.been.calledOnceWith({ message: '"name" is required' });
    expect(next).to.have.not.been.calledOnceWith();
  });
  it('should return 422 if the name is 5 character shorter', async function () {
    await validate.create({ body: { name: 'less' } }, res, next);
    expect(res.status).to.have.been.calledOnceWith(422);
    expect(res.json).to.have.been.calledOnceWith({ message: '"name" length must be at least 5 characters long' });
    expect(next).to.have.not.been.calledOnceWith();
  });
  it('should call next if the name is valid', async function () {
    await validate.create({ body: { name: 'valid_name' } }, res, next);
    expect(next).to.have.been.calledOnceWith();
  });
});
