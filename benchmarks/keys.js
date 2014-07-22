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

var data = require('./data').data;

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

module.exports = function (sizes) {
  return sizes.reduce(function (b, size) {
    return b
      .add('native(' + size + ')', native(data[size]['native']))
      .add('ht(' + size + ')', ht(data[size]['ht']))
      .add('hamt(' + size + ')', hamt(data[size]['hamt']))
      .add('persistent-hash-trie(' + size + ')', pht(data[size]['pht']))
      .add('mori hash_map(' + size + ')', mori(data[size]['mori']))
      .add('immutable-map(' + size + ')', im(data[size]['im']))
      .add('morearty Data.Map(' + size + ')', morearty(data[size]['morearty']));

  }, new Benchmark.Suite('Keys'));
};
