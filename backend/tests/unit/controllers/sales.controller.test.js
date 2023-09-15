const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const services = require('../../../src/services');
const { getAll, getById, create, deleteOne } = require('../../../src/controllers/sales.controller');
const { CREATED, OK, NO_CONTENT } = require('../../../src/utils/codes');

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
    sinon.stub(services.sales, 'getAll').resolves({ code: OK, data: 'data' });
    await getAll(undefined, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith('data');
  });
  it('should return a sale by id', async function () {
    const req = { params: { id: 3 } };
    sinon.stub(services.sales, 'getById').resolves({ code: OK, data: 'data' });
    await getById(req, res);
    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledOnceWith('data');
  });
  it('should return the created sale', async function () {
    sinon.stub(services.sales, 'create').resolves({ code: CREATED, data: 'data' });
    const req = { body: [] };
    await create(req, res);
    expect(res.status).to.have.been.calledOnceWith(201);
    expect(res.json).to.have.been.calledOnceWith('data');
  });
  it('should delete a sale', async function () {
    sinon.stub(services.sales, 'deleteOne').resolves({ code: NO_CONTENT });
    const req = { params: { id: 1 } };
    await deleteOne(req, res);
    expect(res.status).to.have.been.calledOnceWith(204);
    expect(res.json).to.have.been.calledOnceWith(undefined);
  });
});
