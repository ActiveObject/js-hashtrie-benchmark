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
    var add = function(p, c) { return p + c.value; };

    var h = ht.empty;
    for (var i = 0; i < keys.length; ++i)
        h = ht.set(keys[i], i, h);

    return function() {
        ht.fold(add, 0, h);
    };
};

var hamtKeys = function(keys) {
    var add = function(p, c) { return p + c.value; };

    var h = hamt.empty;
    for (var i = 0; i < keys.length; ++i)
        h = hamt.set(keys[i], i, h);

    return function() {
        hamt.fold(add, 0, h);
    };
};


var pHashtrieKeys = function(keys) {
    var add = function(p, c) { return p + c; };

    var h = p.Trie();
    for (var i = 0; i < keys.length; ++i)
        h = p.assoc(h, keys[i], i);

    return function() {
        p.reduce(h, add, 0);
    };
};

var moriKeys = function(keys) {
    var add = function(p, _, c) { return p + c; };

    var h = mori.hash_map();
    for (var i = 0; i < keys.length; ++i)
        h = mori.assoc(h, keys[i], i);

    return function() {
        mori.reduce_kv(add, 0, h);
    };
};

// var itrieKeys = function(keys) {
//     var add = function(p, c) { return p + c; };

//     var h = Trie.Empty;
//     for (var i = 0; i < keys.length; ++i)
//         h = h.assoc(keys[i], i);

//     return function() {
//         h.reduce(add, 0);
//     };
// };

var nativeForLoopSum = function(keys) {
    var add = function(p, c) { return p + c; };

    var h = {};
    for (var i = 0; i < keys.length; ++i)
        h[keys[i]] = i;

    return function() {
        var sum = 0;

        for (var i = 0, l = keys.length; i < l; i++) {
            sum += h[keys[i]];
        }
    };
};

var nativeForInLoopSum = function(keys) {
    var add = function(p, c) { return p + c; };

    var h = {};
    for (var i = 0; i < keys.length; ++i)
        h[keys[i]] = i;

    return function() {
        var sum = 0;

        for (var key in h) {
            if (h.hasOwnProperty(key)) {
                sum += h[keys[i]];
            }
        }
    };
};

var imMapSum = function(keys) {
    var add = function(p, c) { return p + c; };

    var h = Map.Empty;
    for (var i = 0; i < keys.length; ++i)
        h = h.set(keys[i], i);

    return function() {
        h.reduce(add, 0);
    };
};

var moreartyMapSum = function(keys) {
    var add = function(p, c) { return p + c; };

    var h = Morearty.Data.Map;
    for (var i = 0; i < keys.length; ++i)
        h = h.assoc(keys[i], i);

    return function() {
        h.reduce(add, 0);
    };
};


module.exports = function(sizes) {
    return sizes.reduce(function(b,size) {
        var keys = words(size, 10);
        return b
            .add('native-for-loop(' + size+ ')',
                nativeForLoopSum(keys))

            .add('native-for-in-loop(' + size+ ')',
                nativeForInLoopSum(keys))

            .add('hashtrie(' + size+ ')',
                hashtrieKeys(keys))

            .add('hamt(' + size+ ')',
                hamtKeys(keys))

            .add('persistent-hash-trie(' + size+ ')',
                pHashtrieKeys(keys))

            .add('mori hash_map(' + size+ ')',
                moriKeys(keys))

            .add('immutable-map(' + size+ ')',
                imMapSum(keys))

            .add('morearty Data.Map(' + size+ ')',
                moreartyMapSum(keys))

    }, new Benchmark.Suite('Sum'));
};
