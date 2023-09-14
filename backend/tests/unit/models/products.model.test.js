const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { getAll, getById, create } = require('../../../src/models/products.model');

use(sinonChai);

describe('products.controller()', function () {
  afterEach(sinon.restore);
  it('should return all products', async function () {
    const expectedResult = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    sinon.stub(connection, 'execute').resolves([expectedResult]);

    const result = await getAll();
    expect(result).to.be.deep.equal(expectedResult);
  });
  it('should return a product by id', async function () {
    const expectedResult = { id: 3, name: 'Product 3' };
    sinon.stub(connection, 'execute').resolves([[expectedResult]]);

    const result = await getById(3);
    expect(result).to.be.deep.equal(expectedResult);
  });
  it('should create a product', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await create('Product 1');
    expect(result).to.equal(1);
  });
});
