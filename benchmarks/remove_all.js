/**
 * @fileOverview Cost to removed all entries from a hashtrie of size `n`.
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

var range = function (start, end) {
  var indicies = [], out = [];
  for (var i = start; i < end; ++i)
    indicies.push(i);
  while (indicies.length) {
    var index = Math.floor(Math.random() * indicies.length);
    out.push(indicies[index]);
    indicies.splice(index, 1);
  }
  return out;
};

var ht = function (h, keys, order) {
  return function () {
    var c = h;
    for (var i = 0, len = order.length; i < len; ++i)
      c = Participants.ht.remove(keys[order[i]], c);
  };
};

var hamt = function (h, keys, order) {
  return function () {
    var c = h;
    for (var i = 0, len = order.length; i < len; ++i)
      c = Participants.hamt.remove(keys[order[i]], c);
  };
};

var pht = function (h, keys, order) {
  return function () {
    var c = h;
    for (var i = 0, len = order.length; i < len; ++i)
      c = Participants.p.dissoc(c, keys[order[i]]);
  };
};

var mori = function (h, keys, order) {
  return function () {
    var c = h;
    for (var i = 0, len = order.length; i < len; ++i)
      c = Participants.mori.dissoc(c, keys[order[i]]);
  };
};

var native = function (h, keys, order) {
  return function () {
    for (var i = 0, len = order.length; i < len; ++i)
      delete h[keys[order[i]]];
  };
};


var im = function (h, keys, order) {
  return function () {
    var c = h;
    for (var i = 0, len = order.length; i < len; ++i)
      c = h.delete(keys[order[i]]);
  };
};

var morearty = function (h, keys, order) {
  return function () {
    var c = h;
    for (var i = 0, len = order.length; i < len; ++i)
      c = h.dissoc(keys[order[i]]);
  };
};

module.exports = function (sizes) {
  return sizes.reduce(function (b, size) {
    var keys = data[size].keys;
    var order = range(0, size);
    return b
      .add('native(' + size + ')', native(data[size]['native'], keys, order))
      .add('ht(' + size + ')', ht(data[size]['ht'], keys, order))
      .add('hamt(' + size + ')', hamt(data[size]['hamt'], keys, order))
      .add('persistent-hash-trie(' + size + ')', pht(data[size]['pht'], keys, order))
      .add('mori hash_map(' + size + ')', mori(data[size]['mori'], keys, order))
      .add('immutable-map(' + size + ')', im(data[size]['im'], keys, order))
      .add('morearty Data.Map(' + size + ')', morearty(data[size]['morearty'], keys, order));

  }, new Benchmark.Suite('Remove All'));
};
