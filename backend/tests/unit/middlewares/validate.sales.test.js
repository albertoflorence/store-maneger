const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validate = require('../../../src/middlewares/validate.sales');

use(sinonChai);

describe('validate.sales.create()', function () {
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

  it('should return 400 status if the productId is missing', async function () {
    await validate.create({ body: [{ quantity: 1 }] }, res, next);
    expect(res.status).to.have.been.calledOnceWith(400);
    expect(res.json).to.have.been.calledOnceWith({ message: '"productId" is required' });
    expect(next).to.have.not.been.calledOnceWith();
  });
  it('should return 400 status if the quantity is missing', async function () {
    await validate.create({ body: [{ productId: 1 }] }, res, next);
    expect(res.status).to.have.been.calledOnceWith(400);
    expect(res.json).to.have.been.calledOnceWith({ message: '"quantity" is required' });
    expect(next).to.have.not.been.calledOnceWith();
  });
  it('should return 422 status if the quantity is less than 1', async function () {
    await validate.create({ body: [{ productId: 1, quantity: 0 }] }, res, next);
    expect(res.status).to.have.been.calledOnceWith(422);
    expect(res.json).to.have.been.calledOnceWith({ message: '"quantity" must be greater than or equal to 1' });
    expect(next).to.have.not.been.calledOnceWith();
  });
  it('should call next() if the request is valid', async function () {
    await validate.create({ body: [{ quantity: 1, productId: 1 }] }, res, next);
    expect(next).to.have.been.calledOnceWith();
  });
});
