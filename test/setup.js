import chai, { expect } from 'chai';
import sinon from 'sinon';
import SinonChai from 'sinon-chai';

global.expect = expect;
global.sinon = sinon;

chai.use(SinonChai);

process.env.NODE_ENV = 'test';

function noop() {
  return null;
}

// import '../server';

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.png'] = noop;
require.extensions['.gif'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.md'] = noop;
