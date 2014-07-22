/**
 * @fileOverview Cost to put the `nth` entry into a hash of size `n - 1`.
 */
var Benchmark = require('benchmark');

var Participants = {
  ht: require('hashtrie'),
  hamt: require('hamt'),
  p: require('persistent-hash-trie'),
  mori: require('mori'),
  Map: require('immutable-map'),
  Morearty: require('morearty')
};

var data = require('./data').data;

var ht = function (h, keys) {
  var key = keys[0];
  return function () {
    Participants.ht.set(key, 0, h);
  };
};

var hamt = function (h, keys) {
  var key = keys[0];
  return function () {
    Participants.hamt.set(key, 0, h);
  };
};

var pht = function (h, keys) {
  var key = keys[0];
  return function () {
    Participants.p.assoc(h, key, 0);
  };
};

var mori = function (h, keys) {
  var key = keys[0];
  return function () {
    Participants.mori.assoc(h, key, 0);
  };
};

var native = function (h, keys) {
  var key = keys[0];
  return function () {
    h[key] = 0;
  };
};

var im = function (h, keys) {
  var key = keys[0];
  return function () {
    h.set(key, 0);
  };
};

var morearty = function (h, keys) {
  var key = keys[0];
  return function () {
    h.assoc(key, 0);
  };
};

module.exports = function (sizes) {
  return sizes.reduce(function (b, size) {
    var keys = data[size].keys;
    return b
      .add('native(' + size + ')', native(data[size]['native'], keys))
      .add('ht(' + size + ')', ht(data[size]['ht'], keys))
      .add('hamt(' + size + ')', hamt(data[size]['hamt'], keys))
      .add('persistent-hash-trie(' + size + ')', pht(data[size]['pht'], keys))
      .add('mori hash_map(' + size + ')', mori(data[size]['mori'], keys))
      .add('immutable-map(' + size + ')', im(data[size]['im'], keys))
      .add('morearty Data.Map(' + size + ')', morearty(data[size]['morearty'], keys));

  }, new Benchmark.Suite('put nth'));
};
