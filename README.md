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

For convenience, you can use the [latest release
binaries](https://sengelha.github.io/streaming-percentiles-js/streamingPercentiles.v1.zip):

```html
TODO
```

## Example

Here's a simple example on how to use the Greenwald-Khanna streaming
percentile algorithm:

```javascript
var sp = require('streaming-percentiles');

var epsilon = 0.1; // Allowable error.
var gk = new sp.GK(epsilon);
for (var i = 0; i < 1000; ++i)
    gk.insert(Math.random());
var p50 = gk.quantile(0.5); // Approx. median
var p95 = gk.quantile(0.95); // Approx. 95th percentile
```

## API Reference

### class GK(*epsilon*)

Construct an object which implements the Greenwald-Khanna streaming
percentile algorithm from TODO (cite paper).

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

Compute the approximate quantile $phi$.

Example:
```javascript
var p50 = gk.quantile(0.5);
```

## License

This project is licensed under the MIT License.
