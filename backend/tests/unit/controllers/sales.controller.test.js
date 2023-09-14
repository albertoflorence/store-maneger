const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const services = require('../../../src/services');
const { getAll, getById } = require('../../../src/controllers/sales.controller');

use(sinonChai);

describe('sales.controller()', function () {
  let res;
  beforeEach(function () {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });
  afterEach(sinon.restore);

  it('should return all sales', async function () {
    const expectedResult = [{ saleId: 1, name: 'Sale 1' }, { saleId: 2, name: 'Sale 2' }];
    sinon.stub(services.sales, 'getAll').resolves(expectedResult);
    await getAll(undefined, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(expectedResult);
  });
  it('should return a sale by id', async function () {
    const expectedResult = [{ productId: 3, name: 'Sale 1' }, { productId: 4, name: 'Sale 2' }];
    const req = { params: { id: 3 } };
    sinon.stub(services.sales, 'getById').resolves(expectedResult);
    await getById(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(expectedResult);
  });
  it('should return 404 not found given a incorrect id', async function () {
    sinon.stub(services.sales, 'getById').resolves([]);
    const req = { params: { id: 999 } };
    await getById(req, res);
    expect(res.status).to.have.been.calledOnceWith(404);
    expect(res.json).to.have.been.calledOnceWith({ message: 'Sale not found' });
  });
});
