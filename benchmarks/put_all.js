/**
 * @fileOverview Cost to put `n` entries into the hash.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');
var mori = require('mori');
var Map = require('immutable-map');
var Morearty = require('morearty');

var words = require('./words').words;


var hashtriePutAll = function(keys) {
    return function() {
        var h = ht.empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = ht.set(keys[i], i, h);
    };
};

var hamtPutAll = function(keys) {
    return function() {
        var h = hamt.empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = hamt.set(keys[i], i, h);
    };
};

var pHashtriePutAll = function(keys) {
    return function() {
        var h = p.Trie();
        for (var i = 0, len = keys.length; i < len; ++i)
            h = p.assoc(h, keys[i], i);
    };
};

var moriPutAll = function(keys) {
    return function() {
        var h = mori.hash_map();
        for (var i = 0, len = keys.length; i < len; ++i)
            h = mori.assoc(h, keys[i], i);
    };
};

var nativePutAll = function(keys) {
    return function() {
        var h = {};
        for (var i = 0, len = keys.length; i < len; ++i)
            h[keys[i], i];
    };
};

var imMapPutAll = function(keys) {
    return function() {
        var h = Map.Empty;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = h.set(keys[i], i);
    };
};

var moreartyMapPutAll = function(keys) {
    return function() {
        var h = Morearty.Data.Map;
        for (var i = 0, len = keys.length; i < len; ++i)
            h = h.assoc(keys[i], i);
    };
};


module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10);
        return b
            .add('native(' + size+ ')',
                nativePutAll(keys))

            .add('hashtrie(' + size+ ')',
                hashtriePutAll(keys))

            .add('hamt(' + size+ ')',
                hamtPutAll(keys))

            .add('persistent-hash-trie(' + size+ ')',
                pHashtriePutAll(keys))

            .add('mori hash_map(' + size+ ')',
                moriPutAll(keys))

            .add('immutable-map(' + size+ ')',
                imMapPutAll(keys))

            .add('morearty Data.Map(' + size+ ')',
                moreartyMapPutAll(keys))

    }, new Benchmark.Suite('Put All'));
};
