
/**
 * Generate an array of `count` random strings between length (0, `wl`].
 */
exports.words = function(count, wl) {
    var out = [];
    for (var i = 0; i < count; ++i) {
        var len = Math.ceil(Math.random() * wl);
        var w = '';
        while (len--)
            w += String.fromCharCode(97 + Math.floor(Math.random() * 26))
        out.push(w);
    }
    return out;
};
