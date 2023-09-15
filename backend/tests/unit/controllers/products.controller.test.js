const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const services = require('../../../src/services');
const { getAll, getById, create, update, deleteOne } = require('../../../src/controllers/products.controller');
const { OK, CREATED, NO_CONTENT } = require('../../../src/utils/codes');

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
    sinon.stub(services.products, 'getAll').resolves({ code: OK, data: 'data' });
    await getAll({ query: {} }, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith('data');
  });
  it('should return a product by id', async function () {
    sinon.stub(services.products, 'getById').resolves({ code: OK, data: 'data' });
    const req = { params: { id: 3 } };
    await getById(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith('data');
  });
  it('should create a product', async function () {
    sinon.stub(services.products, 'create').resolves({ code: CREATED, data: 'data' });
    const req = { body: { name: 'New Product' } };
    await create(req, res);
    expect(res.status).to.have.been.calledOnceWith(201);
    expect(res.json).to.have.been.calledOnceWith('data');
  });
  it('should return the updated product', async function () {
    sinon.stub(services.products, 'update').resolves({ code: OK, data: 'data' });
    const req = { body: { name: 'Updated Product' }, params: { id: 1 } };
    await update(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith('data');
  });
  it('should delete a product', async function () {
    sinon.stub(services.products, 'deleteOne').resolves({ code: NO_CONTENT });
    const req = { params: { id: 1 } };
    await deleteOne(req, res);
    expect(res.status).to.have.been.calledOnceWith(204);
    expect(res.json).to.have.been.calledOnceWith(undefined);
  });
});
