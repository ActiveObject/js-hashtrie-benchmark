/**
 * @fileOverview Cost to get the `nth` entry in a hash of size `n`.
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

var randomKey = function (keys) {
  return keys[Math.floor(Math.random() * keys.length)];
};

var ht = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    Participants.ht.get(key, h);
  };
};

var hamt = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    Participants.hamt.get(key, h);
  };
};

var pht = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    Participants.p.get(h, key);
  };
};

var mori = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    Participants.mori.get(h, key);
  };
};

var native = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    return h[key];
  };
};

var im = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    h.get(key);
  };
};

var morearty = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    h.get(key);
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

  }, new Benchmark.Suite('Get nth'));
};
