# Streaming Percentiles

This is a reusable JavaScript library with implementations of
various approximate percentile algorithms on streams of data.

For more on stremaing percentiles, see [Calculating Percentiles on
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
</script>
```

## API Reference

### class streamingPercentiles.GK(*epsilon*)

Construct an object which implements the Greenwald-Khanna streaming
percentile algorithm from TODO.

Example:
```javascript
var gk = new streamingPercentiles.GK(0.1);
// Use gk...
```

### *gk*.insert(*value*)

Logs the observation of a value.

Example:
```javascript
var gk = ...;
gk.insert(Math.random());
```

### *gk*.quantile(*phi*)

Compute the approximate quantile $phi$.

Example:
```javascript
var gk = ...;
gk.insert(...);
var p50 = gk.quantile(0.5);
```

## License

This project is licensed under the MIT License.
