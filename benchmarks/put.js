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

module.exports = function (datasets) {
  return datasets.reduce(function (b, dataset) {
    var keys = dataset.keys;

    return b
      .add('native(' + dataset.size + ')', native(dataset.items.native, keys))
      .add('ht(' + dataset.size + ')', ht(dataset.items.ht, keys))
      .add('hamt(' + dataset.size + ')', hamt(dataset.items.hamt, keys))
      .add('persistent-hash-trie(' + dataset.size + ')', pht(dataset.items.pht, keys))
      .add('mori hash_map(' + dataset.size + ')', mori(dataset.items.mori, keys))
      .add('immutable-map(' + dataset.size + ')', im(dataset.items.im, keys))
      .add('morearty Data.Map(' + dataset.size + ')', morearty(dataset.items.morearty, keys));

  }, new Benchmark.Suite('put nth'));
};
