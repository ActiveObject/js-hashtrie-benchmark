/**
 * @fileOverview Cost to keys map of size `n`.
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

var ht = function (h) {
  return function () {
    Participants.ht.keys(h);
  };
};

var hamt = function (h) {
  return function () {
    Participants.hamt.keys(h);
  };
};

var pht = function (h) {
  return function () {
    Participants.p.keys(h);
  };
};

var mori = function (h) {
  return function () {
    // I believe this is the closest translation
    Participants.mori.into_array(Participants.mori.keys(h));
  };
};

var native = function (h) {
  return function () {
    Object.keys(h);
  };
};

var im = function (h) {
  return function () {
    h.keys();
  };
};

var morearty = function (h) {
  return function () {
    h.keys();
  };
};

module.exports = function (datasets) {
  return datasets.reduce(function (b, dataset) {
    return b
      .add('native(' + dataset.size + ')', native(dataset.items.native))
      .add('ht(' + dataset.size + ')', ht(dataset.items.ht))
      .add('hamt(' + dataset.size + ')', hamt(dataset.items.hamt))
      .add('persistent-hash-trie(' + dataset.size + ')', pht(dataset.items.pht))
      .add('mori hash_map(' + dataset.size + ')', mori(dataset.items.mori))
      .add('immutable-map(' + dataset.size + ')', im(dataset.items.im))
      .add('morearty Data.Map(' + dataset.size + ')', morearty(dataset.items.morearty));

  }, new Benchmark.Suite('Keys'));
};
