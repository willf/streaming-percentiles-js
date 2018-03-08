export const GK_MAX_BAND = 999999;

export default class GK {
  constructor(epsilon) {
    this.epsilon = epsilon;
    this.one_over_2e = 1 / (2 * epsilon);
    this.S = [];
    this.n = 0;
  }

  insert(v) {
    if (this.n % this.one_over_2e == 0)
      this._compress();
    this._do_insert(v);
    ++this.n;
  }

  quantile(phi) {
    var en = this.epsilon * this.n;
    var r = Math.ceil(phi * this.n);
    var rmin = 0;
    for (var i = 0; i < this.S.length; ++i) {
      rmin += this.S[i].g;
      var rmax = rmin + this.S[i].delta;
      if (r - rmin <= en && rmax - r <= en)
        return this.S[i].v;
    }
    throw "Could not resolve quantile";
  }

  _compress() {
    var two_epsilon_n = 2 * this.epsilon * this.n;
    var bands = GK._construct_band_lookup(two_epsilon_n);
    // We must always keep the first & last nodes as those
    // are global min/max
    for (var i = this.S.length - 2; i >= 1; --i) {
      if (bands[this.S[i].delta] <= bands[this.S[i+1].delta]) {
        var start_indx = i;
        var g_i_star = this.S[i].g;
        while (start_indx >= 2 && bands[this.S[start_indx-1].delta] < bands[this.S[i].delta]) {
          --start_indx;
          g_i_star += this.S[start_indx].g;
        }
        if ((g_i_star + this.S[i+1].g + this.S[i+1].delta) < two_epsilon_n) {
          // The below is a delete_tuples([start_indx, i]) operation
          var merged = {v: this.S[i+1].v, g: g_i_star + this.S[i+1].g, delta: this.S[i+1].delta};
          this.S.splice(start_indx, 2 + (i - start_indx), merged);
          i = start_indx;
        }
      }
    }
  }

  static _construct_band_lookup(two_epsilon_n) {
    var bands = Array(two_epsilon_n + 1);
    bands[0] = GK_MAX_BAND; // delta = 0 is its own band
    bands[two_epsilon_n] = 0; // delta = two_epsilon_n is band 0 by definition

    var p = Math.floor(two_epsilon_n);
    // Need to go from [1, ceil(log(2en)) + 1] to handle 2en = 16 cases (among others)
    for (var alpha = 1; alpha <= Math.ceil(Math.log(two_epsilon_n)) + 1; ++alpha) {
        var two_alpha_minus_1 = Math.pow(2, alpha-1);
        var two_alpha = Math.pow(2, alpha);
        var lower = p - two_alpha - (p % two_alpha);
        if (lower < 0)
            lower = 0;
        var upper = p - two_alpha_minus_1 - (p % two_alpha_minus_1);
        for (var i = lower + 1; i <= upper; ++i) {
            bands[i] = alpha;
        }
    }
    
    return bands;
  }

  _do_insert(v) {
    var i = this._find_insertion_index(v);
    var delta = this._determine_delta(i);
    var tuple = {v: v, g: 1, delta: delta};
    this.S.splice(i, 0, tuple);
  }

  _find_insertion_index(v) {
    var i = 0;
    while (i < this.S.length && v >= this.S[i].v)
      ++i;
    return i;
  }

  _determine_delta(i) {
    if (this.n < this.one_over_2e)
      return 0;
    else if (i == 0 || i == this.S.length)
      return 0;
    else
      return Math.floor(2 * this.epsilon * this.n) - 1;
  }
}
