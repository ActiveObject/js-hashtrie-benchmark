/**
 * @fileOverview Cost to remove entry from hash of size `n`.
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

var randomKey = function (keys) {
  return keys[Math.floor(Math.random() * keys.length)];
};

var ht = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    Participants.ht.remove(key, h);
  };
};

var hamt = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    Participants.hamt.remove(key, h);
  };
};

var pht = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    Participants.p.dissoc(h, key);
  };
};

var mori = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    Participants.mori.dissoc(h, key);
  };
};


var native = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    delete h[key];
  };
};


var im = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    h.delete(key);
  };
};

var morearty = function (h, keys) {
  return function () {
    var key = randomKey(keys);
    h.dissoc(key);
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

  }, new Benchmark.Suite('remove nth'));
};
