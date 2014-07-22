/**
 * @fileOverview Cost to keys map of size `n`.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');
var mori = require('mori');
var Map = require('immutable-map');
var Morearty = require('morearty');

var words = require('./words').words;


var hashtrieKeys = function(keys) {
    var h = ht.empty;
    for (var i = keys.length - 1; i >= 0; --i)
        h = ht.set(keys[i], i, h);

    return function() {
        ht.keys(h);
    };
};

var hamtKeys = function(keys) {
    var h = hamt.empty;
    for (var i = keys.length - 1; i >= 0; --i)
        h = hamt.set(keys[i], i, h);

    return function() {
        hamt.keys(h);
    };
};


var pHashtrieKeys = function(keys) {
    var h = p.Trie();
    for (var i = keys.length - 1; i >= 0; --i)
        h = p.assoc(h, keys[i], i);

    return function() {
        p.keys(h);
    };
};

var moriKeys = function(keys) {
    var h = mori.hash_map();
    for (var i = keys.length - 1; i >= 0; --i)
        h = mori.assoc(h, keys[i], i);

    return function() {
        // I believe this is the closest translation
        mori.into_array(mori.keys(h));
    };
};

var nativeObjectKeys = function(keys) {
    var h = {};
    for (var i = keys.length - 1; i >= 0; --i)
        h[i] = keys[i];

    return function() {
        Object.keys(h);
    };
};

var imMap = function(keys) {
    var h = Map.Empty;
    for (var i = keys.length - 1; i >= 0; --i)
        h = h.set(keys[i], i);

    return function() {
        h.keys();
    };
};

var moreartyKeys = function(keys) {
    var h = Morearty.Data.Map;
    for (var i = keys.length - 1; i >= 0; --i)
        h = h.assoc(keys[i], i);

    return function() {
        h.keys();
    };
};



module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10);
        return b
            .add('native(' + size + ')',
                nativeObjectKeys(keys))

            .add('hashtrie(' + size+ ')',
                hashtrieKeys(keys))

            .add('hamt(' + size+ ')',
                hamtKeys(keys))

            .add('persistent-hash-trie(' + size+ ')',
                pHashtrieKeys(keys))

            .add('mori hash_map(' + size+ ')',
                moriKeys(keys))

            .add('immutable-map(' + size + ')',
                imMap(keys))

            .add('morearty Data.Map(' + size+ ')',
                moreartyKeys(keys))

    }, new Benchmark.Suite('Keys'));
};
