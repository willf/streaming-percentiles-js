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
    for (var i = 0; i < 1000; ++i)
        arr.push(Math.random());

    var gk = new sp.GK(0.1);
    for (var i = 0; i < arr.length; ++i) {
        gk.insert(arr[i]);
        for (var q = 0.1; q < 1; q += 0.1) {
            var val = gk.quantile(q);
            test.ok(val > 0 && val < 1);
        }
    }
    test.end();
});

tape("GK._construct_band_lookup", function(test) {
    test.deepEquals(sp.GK._construct_band_lookup(0), [0]);
    test.deepEquals(sp.GK._construct_band_lookup(1), [-1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(2), [-1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(3), [-1, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(4), [-1, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(5), [-1, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(6), [-1, 2, 2, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(7), [-1, 2, 2, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(8), [-1, 3, 3, 3, 3, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(9), [-1, 3, 3, 3, 3, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(10), [-1, 3, 3, 3, 3, 2, 2, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(11), [-1, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(12), [-1, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(13), [-1, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(14), [-1, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(15), [-1, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 1, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(16), [-1, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(24), [-1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 1, 0]);
    test.deepEquals(sp.GK._construct_band_lookup(25), [-1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 1, 1, 0]);
    test.end();
})
