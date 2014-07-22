/**
 * @fileOverview Cost to remove entry from hash of size `n`.
 */
var Benchmark = require('benchmark');

var ht = require('hashtrie');
var hamt = require('hamt');
var p = require('persistent-hash-trie');
var mori = require('mori');
var Map = require('immutable-map');
var Morearty = require('morearty');

var words = require('./words').words;



var hashtrieRemove = function(keys) {
    var h = ht.empty;
    for (var i = 0; i < keys.length; ++i)
        h = ht.set(keys[i], i, h);

    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        ht.remove(key, h);
    };
};

var hamtRemove = function(keys) {
    var h = hamt.empty;
    for (var i = 0; i < keys.length; ++i)
        h = hamt.set(keys[i], i, h);

    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        hamt.remove(key, h);
    };
};

var pHashtrieRemove = function(keys) {
    var h = p.Trie();
    for (var i = 0; i < keys.length; ++i)
        h = p.assoc(h, keys[i], i);

    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        p.dissoc(h, key);
    };
};

var moriRemove = function(keys) {
    var h = mori.hash_map();
    for (var i = 0; i < keys.length; ++i)
        h = mori.assoc(h, keys[i], i);

    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        mori.dissoc(h, key);
    };
};


var nativeRemove = function(keys) {
    var h = {};
    for (var i = 0; i < keys.length; ++i)
        h = h[keys[i]] = i;

    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        delete h[key];
    };
};


var imMapRemove = function(keys) {
    var h = Map.Empty;
    for (var i = 0; i < keys.length; ++i)
        h = h.set(keys[i], i);

    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        h.delete(key);
    };
};

var moreartyMapRemove = function(keys) {
    var h = Morearty.Data.Map;
    for (var i = 0; i < keys.length; ++i)
        h = h.assoc(keys[i], i);

    return function() {
        var key = keys[Math.floor(Math.random() * keys.length)];
        h.dissoc(key);
    };
};



module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10);
        return b
            .add('native(' + size+ ')',
                nativeRemove(keys))

            .add('hashtrie(' + size+ ')',
                hashtrieRemove(keys))

            .add('hamt(' + size+ ')',
                hamtRemove(keys))

            .add('persistent-hash-trie(' + size+ ')',
                pHashtrieRemove(keys))

            .add('mori hash_map(' + size+ ')',
                moriRemove(keys))

            .add('immutable-map(' + size+ ')',
                imMapRemove(keys))

            .add('morearty Data.Map(' + size+ ')',
                moreartyMapRemove(keys))

    }, new Benchmark.Suite('remove nth'));
};
