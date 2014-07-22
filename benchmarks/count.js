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

var data = require('./data').data;

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
  }, new Benchmark.Suite('Count'));
};
