/**
 * @fileOverview Cost to count map of size `n`.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');
var mori = require('mori');
var Map = require('immutable-map');
var Morearty = require('morearty');

var words = require('./words').words;



var hashtrieCount = function(keys) {
    var h = ht.empty;
    for (var i = keys.length - 1; i >= 0; --i)
        h = ht.set(keys[i], i, h);

    return function() {
        ht.count(h);
    };
};

var hamtCount = function(keys) {
    var h = hamt.empty;
    for (var i = keys.length - 1; i >= 0; --i)
        h = hamt.set(keys[i], i, h);

    return function() {
        hamt.count(h);
    };
};


var pHashtrieCount = function(keys) {
    var h = p.Trie();
    for (var i = keys.length - 1; i >= 0; --i)
        h = p.assoc(h, keys[i], i);

    return function() {
        p.keys(h).length;
    };
};

var moriCount = function(keys) {
    var h = mori.hash_map();
    for (var i = keys.length - 1; i >= 0; --i)
        h = mori.assoc(h, keys[i], i);

    return function() {
        mori.count(h);
    };
};

var nativeCount = function(keys) {
    var h = {};
    for (var i = keys.length - 1; i >= 0; --i)
        h[keys[i]] = i;

    return function() {
        Object.keys(h).length;
    };
};

var imMapCount = function(keys) {
    var h = Map.Empty;
    for (var i = keys.length - 1; i >= 0; --i)
        h = h.set(keys[i], i);

    return function() {
        h.size;
    };
};


var moreartyMapCount = function(keys) {
    var h = Morearty.Data.Map;
    for (var i = keys.length - 1; i >= 0; --i)
        h = h.assoc(keys[i], i);

    return function() {
        h.size();
    };
};


module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10);
        return b
            .add('native(' + size+ ')',
                nativeCount(keys))

            .add('hashtrie(' + size+ ')',
                hashtrieCount(keys))

            .add('hamt(' + size+ ')',
                hamtCount(keys))

            .add('persistent-hash-trie(' + size+ ')',
                pHashtrieCount(keys))

            .add('mori hash_map(' + size+ ')',
                moriCount(keys))

            .add('immutable-map(' + size+ ')',
                imMapCount(keys))

            .add('morearty Data.Map(' + size+ ')',
                moreartyMapCount(keys))

    }, new Benchmark.Suite('Count'));
};
