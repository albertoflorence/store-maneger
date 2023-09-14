const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { getAll, getById } = require('../../../src/models/sales.model');

use(sinonChai);

describe('sales.controller()', function () {
  afterEach(sinon.restore);
  it('should return all sales', async function () {
    const expectedResult = [{ id: 1, name: 'Sales 1' }, { id: 2, name: 'Sales 2' }];
    sinon.stub(connection, 'execute').resolves([expectedResult]);

    const result = await getAll();
    expect(result).to.be.deep.equal(expectedResult);
  });
  it('should return a sale by id', async function () {
    const expectedResult = [{ id: 3, name: 'Sales 3' }, { id: 4, name: 'Sales 4' }];
    sinon.stub(connection, 'execute').resolves([expectedResult]);

    const result = await getById(3);
    expect(result).to.be.deep.equal(expectedResult);
  });
});
