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

module.exports = function (datasets) {
  return datasets.reduce(function (b, dataset) {
    var keys = dataset.keys;

    return b
      .add('native(' + dataset.size + ')', native(keys))
      .add('ht(' + dataset.size + ')', ht(keys))
      .add('hamt(' + dataset.size + ')', hamt(keys))
      .add('persistent-hash-trie(' + dataset.size + ')', pht(keys))
      .add('mori hash_map(' + dataset.size + ')', mori(keys))
      .add('immutable-map(' + dataset.size + ')', im(keys))
      .add('morearty Data.Map(' + dataset.size + ')', morearty(keys));

  }, new Benchmark.Suite('Put All'));
};
