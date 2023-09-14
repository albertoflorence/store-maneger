const { expect, use } = require('chai');
const sinonChai = require('sinon-chai');
const camelize = require('../../../src/utils/camelize');

use(sinonChai);

describe('camelize()', function () {
  it('should return a camelized object', function () {
    const object = JSON.parse('{"first_name":"John","last_name":"Doe"}'); // need to parse because the linter does not allow camel case.
    const result = camelize(object);

    expect(result).to.be.deep.equal({
      firstName: 'John',
      lastName: 'Doe',
    });
  });
});
