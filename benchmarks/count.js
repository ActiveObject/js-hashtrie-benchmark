/**
 * @fileOverview Cost to count map of size `n`.
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
    return Participants.ht.count(h);
  };
};

var hamt = function (h) {
  return function () {
    return Participants.hamt.count(h);
  };
};


var pht = function (h) {
  return function () {
    return Participants.p.keys(h).length;
  };
};

var mori = function (h) {
  return function () {
    return Participants.mori.count(h);
  };
};

var native = function (h) {
  return function () {
    return Object.keys(h).length;
  };
};

var im = function (h) {
  return function () {
    return h.size;
  };
};


var morearty = function (h) {
  return function () {
    h.size();
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
  }, new Benchmark.Suite('Count'));
};
