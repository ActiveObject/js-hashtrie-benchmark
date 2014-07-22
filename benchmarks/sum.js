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
  var add = function (p, c) {
    return p + c.value;
  };

  return function () {
    Participants.ht.fold(add, 0, h);
  };
};

var hamt = function (h) {
  var add = function (p, c) {
    return p + c.value;
  };

  return function () {
    Participants.hamt.fold(add, 0, h);
  };
};

var pht = function (h) {
  var add = function (p, c) {
    return p + c;
  };

  return function () {
    Participants.p.reduce(h, add, 0);
  };
};

var mori = function (h) {
  var add = function (p, _, c) {
    return p + c;
  };

  return function () {
    Participants.mori.reduce_kv(add, 0, h);
  };
};

var nativeForLoopSum = function (h) {
  return function () {
    var sum = 0;

    var keys = Object.keys(h);
    for (var i = 0, l = h.length; i < l; i++) {
      sum += h[keys[i]];
    }
  };
};

var nativeForInLoopSum = function (h) {
  return function () {
    var sum = 0;

    for (var key in h) {
      if (h.hasOwnProperty(key)) {
        sum += h[key];
      }
    }
  };
};

var im = function (h) {
  var add = function (p, c) {
    return p + c;
  };

  return function () {
    h.reduce(add, 0);
  };
};

var morearty = function (h) {
  var add = function (p, c) {
    return p + c;
  };

  return function () {
    h.reduce(add, 0);
  };
};


module.exports = function (sizes) {
  return sizes.reduce(function (b, size) {
    var keys = data[size].keys;
    return b
      .add('native-for-loop(' + size + ')', nativeForLoopSum(data[size]['native'], keys))
      .add('native-for-in-loop(' + size + ')', nativeForInLoopSum(data[size]['native'], keys))
      .add('ht(' + size + ')', ht(data[size]['ht'], keys))
      .add('hamt(' + size + ')', hamt(data[size]['hamt']))
      .add('persistent-hash-trie(' + size + ')', pht(data[size]['pht'], keys))
      .add('mori hash_map(' + size + ')', mori(data[size]['mori'], keys))
      .add('immutable-map(' + size + ')', im(data[size]['im'], keys))
      .add('morearty Data.Map(' + size + ')', morearty(data[size]['morearty'], keys));

  }, new Benchmark.Suite('Sum'));
};
