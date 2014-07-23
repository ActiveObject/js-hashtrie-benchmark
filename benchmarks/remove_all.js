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

module.exports = function (datasets) {
  return datasets.reduce(function (b, dataset) {
    var keys = dataset.keys;
    var order = range(0, dataset.size);

    return b
      .add('native(' + dataset.size + ')', native(dataset.items.native, keys, order))
      .add('ht(' + dataset.size + ')', ht(dataset.items.ht, keys, order))
      .add('hamt(' + dataset.size + ')', hamt(dataset.items.hamt, keys, order))
      .add('persistent-hash-trie(' + dataset.size + ')', pht(dataset.items.pht, keys, order))
      .add('mori hash_map(' + dataset.size + ')', mori(dataset.items.mori, keys, order))
      .add('immutable-map(' + dataset.size + ')', im(dataset.items.im, keys, order))
      .add('morearty Data.Map(' + dataset.size + ')', morearty(dataset.items.morearty, keys, order));

  }, new Benchmark.Suite('Remove All'));
};
