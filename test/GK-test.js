var tape = require("tape"),
    streamingPercentiles = require("../");

tape("GK e=0.1 inner state", function(test) {
    var seq = [11, 20, 18, 5, 12, 6, 3, 2];
    var gk = new streamingPercentiles.GK(0.1);
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
    var gk = new streamingPercentiles.GK(0.1);
    for (var i = 0; i < arr.length; ++i) {
        gk.insert(arr[i]);
        var q = gk.quantile(0.5);
        console.log(q);
    }
    test.end();
})