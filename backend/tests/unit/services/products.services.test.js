const { expect, use } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const models = require('../../../src/models');
const { getAll, getById, create, update, deleteOne } = require('../../../src/services/products.service');
const { OK, CREATED, NOT_FOUND, NO_CONTENT } = require('../../../src/utils/codes');

use(sinonChai);

describe('products.services()', function () {
  afterEach(sinon.restore);
  it('should return all products', async function () {
    const data = ['data1', 'data2'];
    sinon.stub(models.products, 'getAll').resolves(data);
    const result = await getAll();
    expect(result).to.be.deep.equal({ code: OK, data });
  });
  it('should return a product by id', async function () {
    const data = { id: 3, name: 'Product 3' };
    sinon.stub(models.products, 'getById').resolves(data);
    const result = await getById(3);
    expect(result).to.be.deep.equal({ code: OK, data });
  });
  it('should return 404 not found given a incorrect id', async function () {
    sinon.stub(models.products, 'getById').resolves();
    const result = await getById();
    expect(result).to.deep.equal({ code: NOT_FOUND, data: { message: 'Product not found' } });
  });
  it('should create a product', async function () {
    sinon.stub(models.products, 'create').resolves(3);
    const result = await create('New Product');
    expect(result).to.be.deep.equal({ code: CREATED, data: { id: 3, name: 'New Product' } });
  });
  it('should not be able to update a non existing product', async function () {
    sinon.stub(models.products, 'getById').resolves();
    const result = await update(1, 'Updated Product');
    expect(result).to.deep.equal({ code: NOT_FOUND, data: { message: 'Product not found' } });
  });
  it('should update a product', async function () {
    sinon.stub(models.products, 'getById').resolves(1);
    sinon.stub(models.products, 'update').resolves(1, 'Updated Product');

    const result = await update(1, 'Updated Product');
    expect(result).to.deep.equal({ code: OK, data: { id: 1, name: 'Updated Product' } });
  });
  it('should not be able to delete a non existing product', async function () {
    sinon.stub(models.products, 'getById').resolves();
    const result = await deleteOne(1);
    expect(result).to.deep.equal({ code: NOT_FOUND, data: { message: 'Product not found' } });
  });
  it('should delete a product', async function () {
    sinon.stub(models.products, 'getById').resolves(1);
    sinon.stub(models.products, 'deleteOne').resolves(1);
    const result = await deleteOne(1);
    expect(result).to.be.deep.equal({ code: NO_CONTENT });
  });
});
