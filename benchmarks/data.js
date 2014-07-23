var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');
var mori = require('mori');
var Map = require('immutable-map');
var Morearty = require('morearty');

var words = require('./words').words;

exports.prepare = function (sizes) {
  var prepareHashtrie = function (keys) {
    var map = ht.empty;
    for (var i = keys.length - 1; i >= 0; --i) map = ht.set(keys[i], i, map);
    return map;
  };

  var prepareHamt = function (keys) {
    var map = hamt.empty;
    for (var i = keys.length - 1; i >= 0; --i) map = hamt.set(keys[i], i, map);
    return map;
  };

  var preparePersistentHashTrie = function (keys) {
    var map = p.Trie();
    for (var i = keys.length - 1; i >= 0; --i) map = p.assoc(map, keys[i], i);
    return map;
  };

  var prepareMori = function (keys) {
    var map = mori.hash_map();
    for (var i = keys.length - 1; i >= 0; --i) map = mori.assoc(map, keys[i], i);
    return map;
  };

  var prepareNative = function (keys) {
    var map = {};
    for (var i = keys.length - 1; i >= 0; --i) map[keys[i]] = i;
    return map;
  };

  var prepareImmutableMap = function (keys) {
    var map = Map.Empty;
    for (var i = keys.length - 1; i >= 0; --i) map = map.set(keys[i], i);
    return map;
  };

  var prepareMorearty = function (keys) {
    var map = Morearty.Data.Map;
    for (var i = keys.length - 1; i >= 0; --i) map = map.assoc(keys[i], i);
    return map;
  };

  return sizes.map(function (size) {
    var keys = words(size, 10);

    return {
      size: size,
      keys: keys,
      items: {
        ht: prepareHashtrie(keys),
        hamt: prepareHamt(keys),
        pht: preparePersistentHashTrie(keys),
        mori: prepareMori(keys),
        native: prepareNative(keys),
        im: prepareImmutableMap(keys),
        morearty: prepareMorearty(keys)
      }
    };
  });
};
