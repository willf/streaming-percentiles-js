# Streaming Percentiles

This is a reusable JavaScript library with implementations of various
percentile algorithms on streams of data.  These algorithms all
calculate only approximate percentiles, not exact percentiles.

For more on streaming percentiles, see [Calculating Percentiles on
Streaming Data](https://stevenengelhardt.com/post-series/calculating-percentiles-on-streaming-data-2018/).

## Installing

If you use NPM, `npm install streaming-percentiles`.  Otherwise,
download the [latest release
binaries](https://sengelha.github.io/streaming-percentiles-js/streamingPercentiles.v1.zip)
or the [latest release source
code](https://github.com/sengelha/streaming-percentiles-js/releases/latest).
You can also load directly from
[unpkg.com](https://unpkg.com/streaming-percentiles/).

For convenience, you can also use the [latest release
binaries](https://sengelha.github.io/streaming-percentiles-js/streamingPercentiles.v1.zip)
directly from a web browser:

```html
<script src="//sengelha.github.io/streaming-percentiles-js/streamingPercentiles.v1.min.js"></script>
<script>
var gk = new streamingPercentiles.GK(0.1);
...
</script>
```

## Example

Here's a simple example on how to use the Greenwald-Khanna streaming
percentile algorithm:

```javascript
var sp = require('streaming-percentiles');

// epsilon is allowable error.  As epsilon becomes smaller, the
// accuracy of the approximations improves, but the class consumes
// more memory.
var epsilon = 0.1;
var gk = new sp.GK(epsilon);
for (var i = 0; i < 1000; ++i)
    gk.insert(Math.random());
var p50 = gk.quantile(0.5); // Approx. median
var p95 = gk.quantile(0.95); // Approx. 95th percentile
```

## API Reference

### class GK(*epsilon*)

Construct an object which implements the Greenwald-Khanna streaming
percentile algorithm with allowable error *epsilon*.

Example:
```javascript
var sp = require('streaming-percentiles');
var gk = new sp.GK(0.1);
```

### *gk*.insert(*value*)

Logs the observation of a value.

Example:
```javascript
gk.insert(Math.random());
```

### *gk*.quantile(*phi*)

Compute the approximate quantile at *phi*.  For example, the 95th
percentile corresponds to *phi* = 0.95.

Example:
```javascript
var p50 = gk.quantile(0.5);
```

## License

This project is licensed under the MIT License.
