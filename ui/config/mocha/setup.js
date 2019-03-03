import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { JSDOM } from 'jsdom';
import sinonChai from 'sinon-chai';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import localStorage from './localStorage';
import { createCanvas } from 'canvas';
import Web3 from 'web3';
import ganache from 'ganache-cli';

process.env.NODE_ENV = 'test';

chai.use(chaiAsPromised);
chai.use(sinonChai);

global.localStorage = localStorage;
global.sessionStorage = localStorage;
global.web3 = new Web3(ganache.provider({}));

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

dom.window.HTMLCanvasElement.prototype.getContext = function(type) {
  return createCanvas(200, 200).getContext(type);
};

global.window = dom.window;
global.document = dom.window.document;

Object.keys(dom.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

const noop = () => null;

require.extensions['.scss'] = noop;
require.extensions['.css'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.png'] = noop;

Enzyme.configure({ adapter: new EnzymeAdapter() });
