var tape = require("tape"),
    sp = require("../");

tape("GK e=0.1 inner state", function(test) {
    var seq = [11, 20, 18, 5, 12, 6, 3, 2, 1, 8, 14, 19, 15, 4, 10, 7, 9, 13, 16, 17];
    var gk = new sp.GK(0.1);
    for (var i = 0; i < seq.length; ++i)
        gk.insert(seq[i]);
    test.equal(gk.n, seq.length);
    test.deepEqual(gk.S, [
        {v: 1, g: 1, delta:0},
        {v: 3, g: 2, delta:0},
        {v: 5, g: 2, delta:0},
        {v: 7, g: 1, delta:2},
        {v: 8, g: 2, delta:0},
        {v: 9, g: 1, delta:2},
        {v: 11, g: 2, delta:0},
        {v: 12, g: 1, delta:0},
        {v: 13, g: 1, delta:2},
        {v: 14, g: 1, delta:1},
        {v: 16, g: 1, delta:2},
        {v: 17, g: 1, delta:2},
        {v: 18, g: 2, delta:0},
        {v: 20, g: 2, delta:0}
    ]);
    test.end();
});

tape("GK e=0.1 quantiles", function(test) {
    var seq = [];
    for (var i = 0; i < 100000; ++i)
        seq.push(Math.random());

    var gk = new sp.GK(0.01);
    for (var i = 0; i < seq.length; ++i)
        gk.insert(seq[i]);
    test.ok(gk.quantile(0.1) >= 0.07 && gk.quantile(0.1) <= 0.13);
    test.ok(gk.quantile(0.5) >= 0.47 && gk.quantile(0.5) <= 0.53);
    test.ok(gk.quantile(0.9) >= 0.87 && gk.quantile(0.9) <= 0.93);
    test.end();
});

tape("GK e=0.1 stress", function(test) {
    var gk = new sp.GK(0.1);
    for (var i = 0; i < 10000; ++i) {
        gk.insert(Math.random());
        for (var q = 0.01; q < 1; q += 0.01) {
            var val = gk.quantile(q);
            // We're just trying to make sure gk.quantile
            // doesn't throw an exception.
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
