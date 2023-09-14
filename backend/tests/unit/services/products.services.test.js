const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const models = require('../../../src/models');
const { getAll, getById, create } = require('../../../src/services/products.service');

use(sinonChai);

describe('products.controller()', function () {
  afterEach(sinon.restore);
  it('should return all products', async function () {
    const expectedResult = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    sinon.stub(models.products, 'getAll').resolves(expectedResult);
    const result = await getAll();
    expect(result).to.be.deep.equal(expectedResult);
  });
  it('should return a product by id', async function () {
    const expectedResult = { id: 3, name: 'Product 3' };
    sinon.stub(models.products, 'getById').resolves(expectedResult);
    const result = await getById(3);
    expect(result).to.be.deep.equal(expectedResult);
  });
  it('should create a product', async function () {
    sinon.stub(models.products, 'create').resolves(3);
    const result = await create('New Product');
    expect(result).to.be.deep.equal({ id: 3, name: 'New Product' });
  });
});
