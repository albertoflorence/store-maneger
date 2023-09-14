const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const models = require('../../../src/models');
const { getAll, getById } = require('../../../src/services/sales.service');

use(sinonChai);

describe('sales.controller()', function () {
  afterEach(sinon.restore);
  it('should return all sales', async function () {
    const expectedResult = [{ id: 1, name: 'Sales 1' }, { id: 2, name: 'Sales 2' }];
    sinon.stub(models.sales, 'getAll').resolves(expectedResult);
    const result = await getAll();
    expect(result).to.be.deep.equal(expectedResult);
  });
  it('should return a sales by id', async function () {
    const expectedResult = [{ id: 3, name: 'Sales 3' }, { id: 4, name: 'Sales 4' }];
    const getByIdSpy = sinon.stub(models.sales, 'getById').resolves(expectedResult);

    const result = await getById(3);
    expect(result).to.be.deep.equal(expectedResult);
    expect(getByIdSpy).to.have.been.calledOnceWith(3);
  });
});
