/**
 * @fileOverview Cost to put `n` entries into the hash.
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

var ht = function (keys) {
  return function () {
    var h = Participants.ht.empty;
    for (var i = 0, len = keys.length; i < len; ++i)
      h = Participants.ht.set(keys[i], i, h);
  };
};

var hamt = function (keys) {
  return function () {
    var h = Participants.hamt.empty;
    for (var i = 0, len = keys.length; i < len; ++i)
      h = Participants.hamt.set(keys[i], i, h);
  };
};

var pht = function (keys) {
  return function () {
    var h = Participants.p.Trie();
    for (var i = 0, len = keys.length; i < len; ++i)
      h = Participants.p.assoc(h, keys[i], i);
  };
};

var mori = function (keys) {
  return function () {
    var h = Participants.mori.hash_map();
    for (var i = 0, len = keys.length; i < len; ++i)
      h = Participants.mori.assoc(h, keys[i], i);
  };
};

var native = function (keys) {
  return function () {
    var h = {};
    for (var i = 0, len = keys.length; i < len; ++i)
      h[keys[i]] = i;
  };
};

var im = function (keys) {
  return function () {
    var h = Participants.Map.Empty;
    for (var i = 0, len = keys.length; i < len; ++i)
      h = h.set(keys[i], i);
  };
};

var morearty = function (keys) {
  return function () {
    var h = Participants.Morearty.Data.Map;
    for (var i = 0, len = keys.length; i < len; ++i)
      h = h.assoc(keys[i], i);
  };
};

module.exports = function (sizes) {
  return sizes.reduce(function (b, size) {
    var keys = data[size].keys;
    return b
      .add('native(' + size + ')', native(keys))
      .add('ht(' + size + ')', ht(keys))
      .add('hamt(' + size + ')', hamt(keys))
      .add('persistent-hash-trie(' + size + ')', pht(keys))
      .add('mori hash_map(' + size + ')', mori(keys))
      .add('immutable-map(' + size + ')', im(keys))
      .add('morearty Data.Map(' + size + ')', morearty(keys));

  }, new Benchmark.Suite('Put All'));
};
