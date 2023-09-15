const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const models = require('../../../src/models');
const { getAll, getById, create } = require('../../../src/services/sales.service');
const { NOT_FOUND, CREATED, OK } = require('../../../src/utils/codes');

use(sinonChai);

describe('sales.services()', function () {
  afterEach(sinon.restore);
  it('should return all sales', async function () {
    const expectedResult = [{ id: 1, name: 'Sales 1' }, { id: 2, name: 'Sales 2' }];
    sinon.stub(models.salesProducts, 'getAll').resolves(expectedResult);
    const result = await getAll();
    expect(result).to.be.deep.equal({ data: expectedResult, code: OK });
  });
  it('should return a sales by id', async function () {
    const expectedResult = [{ id: 3, name: 'Sales 3' }, { id: 4, name: 'Sales 4' }];
    const getByIdSpy = sinon.stub(models.salesProducts, 'getById').resolves(expectedResult);

    const result = await getById(3);
    expect(result).to.be.deep.equal({ data: expectedResult, code: OK });
    expect(getByIdSpy).to.have.been.calledOnceWith(3);
  });

  it('should return 404 NOT_FOUND given a incorrect id', async function () {
    sinon.stub(models.salesProducts, 'getById').resolves([]);
    const result = await getById();
    expect(result).to.be.deep.equal({ data: { message: 'Sale not found' }, code: NOT_FOUND });
  });
  it('should create a sale', async function () {
    sinon.stub(models.sales, 'create').resolves(5);
    sinon.stub(models.salesProducts, 'create').resolves();
    const products = [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 3 },
    ];
    const result = await create(products);
    expect(result).to.be.deep.equal({ data: { id: 5, itemsSold: products }, code: CREATED });
  });
  it('should return 404 NOT_FOUND given a incorrect productId', async function () {
    sinon.stub(models.products, 'getById').resolves();

    const result = await create([]);
    expect(result).to.be.deep.equal({ data: { message: 'Product not found' }, code: NOT_FOUND });
  });
});
