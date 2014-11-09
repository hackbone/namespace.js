var root;

if (typeof exports !== 'undefined') {
  root = global;
  root._ = require('underscore');
  require('6to5/register');
  var Namespace = require('../tmp/namespace');

  root.chai = require('chai');
  root.sinon = require('sinon');
  root.chai.use(require('sinon-chai'));

  setup();
} else {
  root = window;
  mocha.setup('bdd');
  root.onload = function() {
    mocha.checkLeaks();
    mocha.globals(['stub', 'spy']);
    mocha.run();
    setup();
  };
}

root.Namespace = Namespace;
root.expect = chai.expect;

function setup() {
  beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
    root.stub = this.sandbox.stub.bind(this.sandbox);
    root.spy  = this.sandbox.spy.bind(this.sandbox);
  });

  afterEach(function() {
    delete root.stub;
    delete root.spy;
    this.sandbox.restore();
  });
}
