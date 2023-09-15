const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const connection = require('../../../src/models/connection');
const { create } = require('../../../src/models/sales.model');

use(sinonChai);

describe('sales.model()', function () {
  afterEach(sinon.restore);
  it('should create a sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await create([1, 2]);
    expect(result).to.equal(1);
  });
});
