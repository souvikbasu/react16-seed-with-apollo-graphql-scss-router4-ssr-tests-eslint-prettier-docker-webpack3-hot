// This file is written in ES5 since it's not transpiled by Babel.
/* This file does the following:
 1. Sets Node environment variable
 2. Registers babel for transpiling our code for testing
 3. Disables Webpack-specific features that Mocha doesn't understand.
 4. Requires jsdom so we can test via an in-memory DOM in Node
 5. Sets up global vars that mimic a browser. */

var Enzyme = require('enzyme');
var Adapter = require('enzyme-adapter-react-16');
var Chai = require('chai');
var jsdom = require('jsdom');

const { expect, assert } = Chai;
const { JSDOM } = jsdom;

process.env.NODE_ENV = 'test'
// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Make Enzyme and Chai functions available in all test files without importing
global.assert = assert;
global.expect = expect;

// Register babel so that it will transpile ES6 to ES5 before our tests run. 
require('babel-register')({
  babelrc: false,
  presets: ['react', 'es2015', 'stage-0'],
  plugins: ['istanbul']
});

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.

const noop = () => { };

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.png'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;
require.extensions['.svg'] = noop;

// Configure JSDOM and set global variables
// to simulate a browser environment for tests.
const { window } = (new JSDOM('<!doctype html><html><body></body></html>'));
global.window = window;
global.navigator = { userAgent: 'node.js' };
global.document = window.document;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}
copyProps(window, global);