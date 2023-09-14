const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const services = require('../../../src/services');
const { getAll, getById } = require('../../../src/controllers/products.controller');

use(sinonChai);

describe('products.controller()', function () {
  let res;
  beforeEach(function () {
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });
  afterEach(sinon.restore);

  it('should return all products', async function () {
    const expectedResult = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    sinon.stub(services.products, 'getAll').resolves(expectedResult);
    await getAll(undefined, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(expectedResult);
  });
  it('should return a product by id', async function () {
    const expectedResult = { id: 3, name: 'Product 3' };
    const req = { params: { id: 3 } };
    sinon.stub(services.products, 'getById').resolves(expectedResult);
    await getById(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith(expectedResult);
  });
  it('should return 404 not found given a incorrect id', async function () {
    sinon.stub(services.products, 'getById').resolves(undefined);
    const req = { params: { id: 999 } };
    await getById(req, res);
    expect(res.status).to.have.been.calledOnceWith(404);
    expect(res.json).to.have.been.calledOnceWith({ message: 'Product not found' });
  });
});
