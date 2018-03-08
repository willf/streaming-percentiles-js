var tape = require("tape"),
    sp = require("../");

// TODO: Include enough insertions to require compress
tape("GK e=0.1 inner state", function(test) {
    var seq = [11, 20, 18, 5, 12, 6, 3, 2];
    var gk = new sp.GK(0.1);
    for (var i = 0; i < seq.length; ++i)
        gk.insert(seq[i]);
    test.equal(gk.n, seq.length);
    test.deepEqual(gk.S, [
        {v: 2, g: 1, delta:0},
        {v: 3, g: 1, delta:0},
        {v: 5, g: 1, delta:0},
        {v: 6, g: 1, delta:0},
        {v: 11, g: 1, delta:0},
        {v: 12, g: 1, delta:0},
        {v: 18, g: 1, delta:0},
        {v: 20, g: 1, delta:0}
    ]);
    test.end();
});

tape("GK e=0.1 stress", function(test) {
    var arr = [];
    for (var i = 0; i < 10000; ++i)
        arr.push(Math.random());

    var epsilon = 0.1;
    var gk = new sp.GK(epsilon);
    for (var i = 0; i < arr.length; ++i) {
        gk.insert(arr[i]);
        for (var q = 0.1; q < 1; q += 0.1) {
            var val = gk.quantile(q);
            // The 'correct' value should be q, +/- some error,
            // but the error can be huge, especially early on.
            test.ok(val > 0 && val < 1);
        }
    }
    test.end();
});

tape("GK._construct_band_lookup", function(test) {
    test.deepEquals(sp.GK._construct_band_lookup(0), [0]);
    test.deepEquals(sp.GK._construct_band_lookup(1), [sp.GK_MAX_BAND, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(2), [sp.GK_MAX_BAND, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(3), [sp.GK_MAX_BAND, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(4), [sp.GK_MAX_BAND, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(5), [sp.GK_MAX_BAND, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(6), [sp.GK_MAX_BAND, 2, 2, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(7), [sp.GK_MAX_BAND, 2, 2, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(8), [sp.GK_MAX_BAND, 3, 3, 3, 3, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(9), [sp.GK_MAX_BAND, 3, 3, 3, 3, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(10), [sp.GK_MAX_BAND, 3, 3, 3, 3, 2, 2, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(11), [sp.GK_MAX_BAND, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(12), [sp.GK_MAX_BAND, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(13), [sp.GK_MAX_BAND, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(14), [sp.GK_MAX_BAND, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(15), [sp.GK_MAX_BAND, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(16), [sp.GK_MAX_BAND, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(24), [sp.GK_MAX_BAND, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(25), [sp.GK_MAX_BAND, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 1, 1, 0]);
    test.end();
})
