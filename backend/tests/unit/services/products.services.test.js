const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const models = require('../../../src/models');
const { getAll, getById } = require('../../../src/services/products.service');

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
    const getByIdSpy = sinon.stub(models.products, 'getById').resolves(expectedResult);

    const result = await getById(3);
    expect(result).to.be.deep.equal(expectedResult);
    expect(getByIdSpy).to.have.been.calledOnceWith(3);
  });
});
