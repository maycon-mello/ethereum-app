import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';

import chai, { expect, should } from '../node_modules/chai';

chai.use(chaiAsPromised);
chai.use(sinonChai);

export default chai;

export {
  expect,
  should,
};

