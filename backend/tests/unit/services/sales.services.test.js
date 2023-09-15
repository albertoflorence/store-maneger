const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const models = require('../../../src/models');
const { getAll, getById, create } = require('../../../src/services/sales.service');

use(sinonChai);

describe('sales.services()', function () {
  afterEach(sinon.restore);
  it('should return all sales', async function () {
    const expectedResult = [{ id: 1, name: 'Sales 1' }, { id: 2, name: 'Sales 2' }];
    sinon.stub(models.salesProducts, 'getAll').resolves(expectedResult);
    const result = await getAll();
    expect(result).to.be.deep.equal(expectedResult);
  });
  it('should return a sales by id', async function () {
    const expectedResult = [{ id: 3, name: 'Sales 3' }, { id: 4, name: 'Sales 4' }];
    const getByIdSpy = sinon.stub(models.salesProducts, 'getById').resolves(expectedResult);

    const result = await getById(3);
    expect(result).to.be.deep.equal(expectedResult);
    expect(getByIdSpy).to.have.been.calledOnceWith(3);
  });
  it('should create a sale', async function () {
    sinon.stub(models.sales, 'create').resolves(5);
    sinon.stub(models.salesProducts, 'create').resolves();
    const products = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];
    const result = await create(products);
    expect(result).to.be.deep.equal({ id: 5, itemsSold: products });
  });
});
