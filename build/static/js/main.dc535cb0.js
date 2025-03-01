/*! For license information please see main.dc535cb0.js.LICENSE.txt */
(() => {
  var e = {
      347: (e) => {
        "use strict";
        var t = {
          single_source_shortest_paths: function (e, n, r) {
            var o = {},
              a = {};
            a[n] = 0;
            var l,
              i,
              s,
              u,
              c,
              d,
              f,
              p = t.PriorityQueue.make();
            for (p.push(n, 0); !p.empty(); )
              for (s in ((i = (l = p.pop()).value),
              (u = l.cost),
              (c = e[i] || {})))
                c.hasOwnProperty(s) &&
                  ((d = u + c[s]),
                  (f = a[s]),
                  ("undefined" === typeof a[s] || f > d) &&
                    ((a[s] = d), p.push(s, d), (o[s] = i)));
            if ("undefined" !== typeof r && "undefined" === typeof a[r]) {
              var h = ["Could not find a path from ", n, " to ", r, "."].join(
                ""
              );
              throw new Error(h);
            }
            return o;
          },
          extract_shortest_path_from_predecessor_list: function (e, t) {
            for (var n = [], r = t; r; ) n.push(r), e[r], (r = e[r]);
            return n.reverse(), n;
          },
          find_path: function (e, n, r) {
            var o = t.single_source_shortest_paths(e, n, r);
            return t.extract_shortest_path_from_predecessor_list(o, r);
          },
          PriorityQueue: {
            make: function (e) {
              var n,
                r = t.PriorityQueue,
                o = {};
              for (n in ((e = e || {}), r))
                r.hasOwnProperty(n) && (o[n] = r[n]);
              return (
                (o.queue = []), (o.sorter = e.sorter || r.default_sorter), o
              );
            },
            default_sorter: function (e, t) {
              return e.cost - t.cost;
            },
            push: function (e, t) {
              var n = { value: e, cost: t };
              this.queue.push(n), this.queue.sort(this.sorter);
            },
            pop: function () {
              return this.queue.shift();
            },
            empty: function () {
              return 0 === this.queue.length;
            },
          },
        };
        e.exports = t;
      },
      558: (e) => {
        "use strict";
        e.exports = function (e) {
          for (var t = [], n = e.length, r = 0; r < n; r++) {
            var o = e.charCodeAt(r);
            if (o >= 55296 && o <= 56319 && n > r + 1) {
              var a = e.charCodeAt(r + 1);
              a >= 56320 &&
                a <= 57343 &&
                ((o = 1024 * (o - 55296) + a - 56320 + 65536), (r += 1));
            }
            o < 128
              ? t.push(o)
              : o < 2048
              ? (t.push((o >> 6) | 192), t.push((63 & o) | 128))
              : o < 55296 || (o >= 57344 && o < 65536)
              ? (t.push((o >> 12) | 224),
                t.push(((o >> 6) & 63) | 128),
                t.push((63 & o) | 128))
              : o >= 65536 && o <= 1114111
              ? (t.push((o >> 18) | 240),
                t.push(((o >> 12) & 63) | 128),
                t.push(((o >> 6) & 63) | 128),
                t.push((63 & o) | 128))
              : t.push(239, 191, 189);
          }
          return new Uint8Array(t).buffer;
        };
      },
      361: function (e) {
        var t;
        "undefined" !== typeof self && self,
          (t = function () {
            return (function (e) {
              var t = {};
              function n(r) {
                if (t[r]) return t[r].exports;
                var o = (t[r] = { i: r, l: !1, exports: {} });
                return (
                  e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
                );
              }
              return (
                (n.m = e),
                (n.c = t),
                (n.d = function (e, t, r) {
                  n.o(e, t) ||
                    Object.defineProperty(e, t, {
                      configurable: !1,
                      enumerable: !0,
                      get: r,
                    });
                }),
                (n.n = function (e) {
                  var t =
                    e && e.__esModule
                      ? function () {
                          return e.default;
                        }
                      : function () {
                          return e;
                        };
                  return n.d(t, "a", t), t;
                }),
                (n.o = function (e, t) {
                  return Object.prototype.hasOwnProperty.call(e, t);
                }),
                (n.p = ""),
                n((n.s = 3))
              );
            })([
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var r = (function () {
                  function e(e, t) {
                    (this.width = t),
                      (this.height = e.length / t),
                      (this.data = e);
                  }
                  return (
                    (e.createEmpty = function (t, n) {
                      return new e(new Uint8ClampedArray(t * n), t);
                    }),
                    (e.prototype.get = function (e, t) {
                      return (
                        !(
                          e < 0 ||
                          e >= this.width ||
                          t < 0 ||
                          t >= this.height
                        ) && !!this.data[t * this.width + e]
                      );
                    }),
                    (e.prototype.set = function (e, t, n) {
                      this.data[t * this.width + e] = n ? 1 : 0;
                    }),
                    (e.prototype.setRegion = function (e, t, n, r, o) {
                      for (var a = t; a < t + r; a++)
                        for (var l = e; l < e + n; l++) this.set(l, a, !!o);
                    }),
                    e
                  );
                })();
                t.BitMatrix = r;
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var r = n(2);
                t.addOrSubtractGF = function (e, t) {
                  return e ^ t;
                };
                var o = (function () {
                  function e(e, t, n) {
                    (this.primitive = e),
                      (this.size = t),
                      (this.generatorBase = n),
                      (this.expTable = new Array(this.size)),
                      (this.logTable = new Array(this.size));
                    for (var o = 1, a = 0; a < this.size; a++)
                      (this.expTable[a] = o),
                        (o *= 2) >= this.size &&
                          (o = (o ^ this.primitive) & (this.size - 1));
                    for (a = 0; a < this.size - 1; a++)
                      this.logTable[this.expTable[a]] = a;
                    (this.zero = new r.default(
                      this,
                      Uint8ClampedArray.from([0])
                    )),
                      (this.one = new r.default(
                        this,
                        Uint8ClampedArray.from([1])
                      ));
                  }
                  return (
                    (e.prototype.multiply = function (e, t) {
                      return 0 === e || 0 === t
                        ? 0
                        : this.expTable[
                            (this.logTable[e] + this.logTable[t]) %
                              (this.size - 1)
                          ];
                    }),
                    (e.prototype.inverse = function (e) {
                      if (0 === e) throw new Error("Can't invert 0");
                      return this.expTable[this.size - this.logTable[e] - 1];
                    }),
                    (e.prototype.buildMonomial = function (e, t) {
                      if (e < 0)
                        throw new Error("Invalid monomial degree less than 0");
                      if (0 === t) return this.zero;
                      var n = new Uint8ClampedArray(e + 1);
                      return (n[0] = t), new r.default(this, n);
                    }),
                    (e.prototype.log = function (e) {
                      if (0 === e) throw new Error("Can't take log(0)");
                      return this.logTable[e];
                    }),
                    (e.prototype.exp = function (e) {
                      return this.expTable[e];
                    }),
                    e
                  );
                })();
                t.default = o;
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var r = n(1),
                  o = (function () {
                    function e(e, t) {
                      if (0 === t.length) throw new Error("No coefficients.");
                      this.field = e;
                      var n = t.length;
                      if (n > 1 && 0 === t[0]) {
                        for (var r = 1; r < n && 0 === t[r]; ) r++;
                        if (r === n) this.coefficients = e.zero.coefficients;
                        else {
                          this.coefficients = new Uint8ClampedArray(n - r);
                          for (var o = 0; o < this.coefficients.length; o++)
                            this.coefficients[o] = t[r + o];
                        }
                      } else this.coefficients = t;
                    }
                    return (
                      (e.prototype.degree = function () {
                        return this.coefficients.length - 1;
                      }),
                      (e.prototype.isZero = function () {
                        return 0 === this.coefficients[0];
                      }),
                      (e.prototype.getCoefficient = function (e) {
                        return this.coefficients[
                          this.coefficients.length - 1 - e
                        ];
                      }),
                      (e.prototype.addOrSubtract = function (t) {
                        var n;
                        if (this.isZero()) return t;
                        if (t.isZero()) return this;
                        var o = this.coefficients,
                          a = t.coefficients;
                        o.length > a.length &&
                          ((o = (n = [a, o])[0]), (a = n[1]));
                        for (
                          var l = new Uint8ClampedArray(a.length),
                            i = a.length - o.length,
                            s = 0;
                          s < i;
                          s++
                        )
                          l[s] = a[s];
                        for (s = i; s < a.length; s++)
                          l[s] = r.addOrSubtractGF(o[s - i], a[s]);
                        return new e(this.field, l);
                      }),
                      (e.prototype.multiply = function (t) {
                        if (0 === t) return this.field.zero;
                        if (1 === t) return this;
                        for (
                          var n = this.coefficients.length,
                            r = new Uint8ClampedArray(n),
                            o = 0;
                          o < n;
                          o++
                        )
                          r[o] = this.field.multiply(this.coefficients[o], t);
                        return new e(this.field, r);
                      }),
                      (e.prototype.multiplyPoly = function (t) {
                        if (this.isZero() || t.isZero()) return this.field.zero;
                        for (
                          var n = this.coefficients,
                            o = n.length,
                            a = t.coefficients,
                            l = a.length,
                            i = new Uint8ClampedArray(o + l - 1),
                            s = 0;
                          s < o;
                          s++
                        )
                          for (var u = n[s], c = 0; c < l; c++)
                            i[s + c] = r.addOrSubtractGF(
                              i[s + c],
                              this.field.multiply(u, a[c])
                            );
                        return new e(this.field, i);
                      }),
                      (e.prototype.multiplyByMonomial = function (t, n) {
                        if (t < 0)
                          throw new Error("Invalid degree less than 0");
                        if (0 === n) return this.field.zero;
                        for (
                          var r = this.coefficients.length,
                            o = new Uint8ClampedArray(r + t),
                            a = 0;
                          a < r;
                          a++
                        )
                          o[a] = this.field.multiply(this.coefficients[a], n);
                        return new e(this.field, o);
                      }),
                      (e.prototype.evaluateAt = function (e) {
                        var t = 0;
                        if (0 === e) return this.getCoefficient(0);
                        var n = this.coefficients.length;
                        if (1 === e)
                          return (
                            this.coefficients.forEach(function (e) {
                              t = r.addOrSubtractGF(t, e);
                            }),
                            t
                          );
                        t = this.coefficients[0];
                        for (var o = 1; o < n; o++)
                          t = r.addOrSubtractGF(
                            this.field.multiply(e, t),
                            this.coefficients[o]
                          );
                        return t;
                      }),
                      e
                    );
                  })();
                t.default = o;
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var r = n(4),
                  o = n(5),
                  a = n(11),
                  l = n(12);
                function i(e) {
                  var t = l.locate(e);
                  if (!t) return null;
                  for (var n = 0, r = t; n < r.length; n++) {
                    var i = r[n],
                      s = a.extract(e, i),
                      u = o.decode(s.matrix);
                    if (u)
                      return {
                        binaryData: u.bytes,
                        data: u.text,
                        chunks: u.chunks,
                        version: u.version,
                        location: {
                          topRightCorner: s.mappingFunction(i.dimension, 0),
                          topLeftCorner: s.mappingFunction(0, 0),
                          bottomRightCorner: s.mappingFunction(
                            i.dimension,
                            i.dimension
                          ),
                          bottomLeftCorner: s.mappingFunction(0, i.dimension),
                          topRightFinderPattern: i.topRight,
                          topLeftFinderPattern: i.topLeft,
                          bottomLeftFinderPattern: i.bottomLeft,
                          bottomRightAlignmentPattern: i.alignmentPattern,
                        },
                      };
                  }
                  return null;
                }
                var s = { inversionAttempts: "attemptBoth" };
                function u(e, t, n, o) {
                  void 0 === o && (o = {});
                  var a = s;
                  Object.keys(a || {}).forEach(function (e) {
                    a[e] = o[e] || a[e];
                  });
                  var l =
                      "attemptBoth" === a.inversionAttempts ||
                      "invertFirst" === a.inversionAttempts,
                    u =
                      "onlyInvert" === a.inversionAttempts ||
                      "invertFirst" === a.inversionAttempts,
                    c = r.binarize(e, t, n, l),
                    d = c.binarized,
                    f = c.inverted,
                    p = i(u ? f : d);
                  return (
                    p ||
                      ("attemptBoth" !== a.inversionAttempts &&
                        "invertFirst" !== a.inversionAttempts) ||
                      (p = i(u ? d : f)),
                    p
                  );
                }
                (u.default = u), (t.default = u);
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var r = n(0);
                function o(e, t, n) {
                  return e < t ? t : e > n ? n : e;
                }
                var a = (function () {
                  function e(e, t) {
                    (this.width = e),
                      (this.data = new Uint8ClampedArray(e * t));
                  }
                  return (
                    (e.prototype.get = function (e, t) {
                      return this.data[t * this.width + e];
                    }),
                    (e.prototype.set = function (e, t, n) {
                      this.data[t * this.width + e] = n;
                    }),
                    e
                  );
                })();
                t.binarize = function (e, t, n, l) {
                  if (e.length !== t * n * 4)
                    throw new Error("Malformed data passed to binarizer.");
                  for (var i = new a(t, n), s = 0; s < t; s++)
                    for (var u = 0; u < n; u++) {
                      var c = e[4 * (u * t + s) + 0],
                        d = e[4 * (u * t + s) + 1],
                        f = e[4 * (u * t + s) + 2];
                      i.set(s, u, 0.2126 * c + 0.7152 * d + 0.0722 * f);
                    }
                  for (
                    var p = Math.ceil(t / 8),
                      h = Math.ceil(n / 8),
                      m = new a(p, h),
                      g = 0;
                    g < h;
                    g++
                  )
                    for (var v = 0; v < p; v++) {
                      var k = 0,
                        y = 1 / 0,
                        w = 0;
                      for (u = 0; u < 8; u++)
                        for (s = 0; s < 8; s++) {
                          var b = i.get(8 * v + s, 8 * g + u);
                          (k += b), (y = Math.min(y, b)), (w = Math.max(w, b));
                        }
                      var B = k / Math.pow(8, 2);
                      if (w - y <= 24 && ((B = y / 2), g > 0 && v > 0)) {
                        var C =
                          (m.get(v, g - 1) +
                            2 * m.get(v - 1, g) +
                            m.get(v - 1, g - 1)) /
                          4;
                        y < C && (B = C);
                      }
                      m.set(v, g, B);
                    }
                  var P = r.BitMatrix.createEmpty(t, n),
                    S = null;
                  for (
                    l && (S = r.BitMatrix.createEmpty(t, n)), g = 0;
                    g < h;
                    g++
                  )
                    for (v = 0; v < p; v++) {
                      for (
                        var x = o(v, 2, p - 3),
                          E = o(g, 2, h - 3),
                          M = ((k = 0), -2);
                        M <= 2;
                        M++
                      )
                        for (var N = -2; N <= 2; N++) k += m.get(x + M, E + N);
                      var _ = k / 25;
                      for (M = 0; M < 8; M++)
                        for (N = 0; N < 8; N++) {
                          (s = 8 * v + M), (u = 8 * g + N);
                          var L = i.get(s, u);
                          P.set(s, u, L <= _), l && S.set(s, u, !(L <= _));
                        }
                    }
                  return l ? { binarized: P, inverted: S } : { binarized: P };
                };
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var r = n(0),
                  o = n(6),
                  a = n(9),
                  l = n(10);
                function i(e, t) {
                  for (var n = e ^ t, r = 0; n; ) r++, (n &= n - 1);
                  return r;
                }
                function s(e, t) {
                  return (t << 1) | e;
                }
                var u = [
                    {
                      bits: 21522,
                      formatInfo: { errorCorrectionLevel: 1, dataMask: 0 },
                    },
                    {
                      bits: 20773,
                      formatInfo: { errorCorrectionLevel: 1, dataMask: 1 },
                    },
                    {
                      bits: 24188,
                      formatInfo: { errorCorrectionLevel: 1, dataMask: 2 },
                    },
                    {
                      bits: 23371,
                      formatInfo: { errorCorrectionLevel: 1, dataMask: 3 },
                    },
                    {
                      bits: 17913,
                      formatInfo: { errorCorrectionLevel: 1, dataMask: 4 },
                    },
                    {
                      bits: 16590,
                      formatInfo: { errorCorrectionLevel: 1, dataMask: 5 },
                    },
                    {
                      bits: 20375,
                      formatInfo: { errorCorrectionLevel: 1, dataMask: 6 },
                    },
                    {
                      bits: 19104,
                      formatInfo: { errorCorrectionLevel: 1, dataMask: 7 },
                    },
                    {
                      bits: 30660,
                      formatInfo: { errorCorrectionLevel: 0, dataMask: 0 },
                    },
                    {
                      bits: 29427,
                      formatInfo: { errorCorrectionLevel: 0, dataMask: 1 },
                    },
                    {
                      bits: 32170,
                      formatInfo: { errorCorrectionLevel: 0, dataMask: 2 },
                    },
                    {
                      bits: 30877,
                      formatInfo: { errorCorrectionLevel: 0, dataMask: 3 },
                    },
                    {
                      bits: 26159,
                      formatInfo: { errorCorrectionLevel: 0, dataMask: 4 },
                    },
                    {
                      bits: 25368,
                      formatInfo: { errorCorrectionLevel: 0, dataMask: 5 },
                    },
                    {
                      bits: 27713,
                      formatInfo: { errorCorrectionLevel: 0, dataMask: 6 },
                    },
                    {
                      bits: 26998,
                      formatInfo: { errorCorrectionLevel: 0, dataMask: 7 },
                    },
                    {
                      bits: 5769,
                      formatInfo: { errorCorrectionLevel: 3, dataMask: 0 },
                    },
                    {
                      bits: 5054,
                      formatInfo: { errorCorrectionLevel: 3, dataMask: 1 },
                    },
                    {
                      bits: 7399,
                      formatInfo: { errorCorrectionLevel: 3, dataMask: 2 },
                    },
                    {
                      bits: 6608,
                      formatInfo: { errorCorrectionLevel: 3, dataMask: 3 },
                    },
                    {
                      bits: 1890,
                      formatInfo: { errorCorrectionLevel: 3, dataMask: 4 },
                    },
                    {
                      bits: 597,
                      formatInfo: { errorCorrectionLevel: 3, dataMask: 5 },
                    },
                    {
                      bits: 3340,
                      formatInfo: { errorCorrectionLevel: 3, dataMask: 6 },
                    },
                    {
                      bits: 2107,
                      formatInfo: { errorCorrectionLevel: 3, dataMask: 7 },
                    },
                    {
                      bits: 13663,
                      formatInfo: { errorCorrectionLevel: 2, dataMask: 0 },
                    },
                    {
                      bits: 12392,
                      formatInfo: { errorCorrectionLevel: 2, dataMask: 1 },
                    },
                    {
                      bits: 16177,
                      formatInfo: { errorCorrectionLevel: 2, dataMask: 2 },
                    },
                    {
                      bits: 14854,
                      formatInfo: { errorCorrectionLevel: 2, dataMask: 3 },
                    },
                    {
                      bits: 9396,
                      formatInfo: { errorCorrectionLevel: 2, dataMask: 4 },
                    },
                    {
                      bits: 8579,
                      formatInfo: { errorCorrectionLevel: 2, dataMask: 5 },
                    },
                    {
                      bits: 11994,
                      formatInfo: { errorCorrectionLevel: 2, dataMask: 6 },
                    },
                    {
                      bits: 11245,
                      formatInfo: { errorCorrectionLevel: 2, dataMask: 7 },
                    },
                  ],
                  c = [
                    function (e) {
                      return (e.y + e.x) % 2 === 0;
                    },
                    function (e) {
                      return e.y % 2 === 0;
                    },
                    function (e) {
                      return e.x % 3 === 0;
                    },
                    function (e) {
                      return (e.y + e.x) % 3 === 0;
                    },
                    function (e) {
                      return (
                        (Math.floor(e.y / 2) + Math.floor(e.x / 3)) % 2 === 0
                      );
                    },
                    function (e) {
                      return ((e.x * e.y) % 2) + ((e.x * e.y) % 3) === 0;
                    },
                    function (e) {
                      return (((e.y * e.x) % 2) + ((e.y * e.x) % 3)) % 2 === 0;
                    },
                    function (e) {
                      return (((e.y + e.x) % 2) + ((e.y * e.x) % 3)) % 2 === 0;
                    },
                  ];
                function d(e, t, n) {
                  for (
                    var o = c[n.dataMask],
                      a = e.height,
                      l = (function (e) {
                        var t = 17 + 4 * e.versionNumber,
                          n = r.BitMatrix.createEmpty(t, t);
                        n.setRegion(0, 0, 9, 9, !0),
                          n.setRegion(t - 8, 0, 8, 9, !0),
                          n.setRegion(0, t - 8, 9, 8, !0);
                        for (
                          var o = 0, a = e.alignmentPatternCenters;
                          o < a.length;
                          o++
                        )
                          for (
                            var l = a[o], i = 0, s = e.alignmentPatternCenters;
                            i < s.length;
                            i++
                          ) {
                            var u = s[i];
                            (6 === l && 6 === u) ||
                              (6 === l && u === t - 7) ||
                              (l === t - 7 && 6 === u) ||
                              n.setRegion(l - 2, u - 2, 5, 5, !0);
                          }
                        return (
                          n.setRegion(6, 9, 1, t - 17, !0),
                          n.setRegion(9, 6, t - 17, 1, !0),
                          e.versionNumber > 6 &&
                            (n.setRegion(t - 11, 0, 3, 6, !0),
                            n.setRegion(0, t - 11, 6, 3, !0)),
                          n
                        );
                      })(t),
                      i = [],
                      u = 0,
                      d = 0,
                      f = !0,
                      p = a - 1;
                    p > 0;
                    p -= 2
                  ) {
                    6 === p && p--;
                    for (var h = 0; h < a; h++)
                      for (var m = f ? a - 1 - h : h, g = 0; g < 2; g++) {
                        var v = p - g;
                        if (!l.get(v, m)) {
                          d++;
                          var k = e.get(v, m);
                          o({ y: m, x: v }) && (k = !k),
                            (u = s(k, u)),
                            8 === d && (i.push(u), (d = 0), (u = 0));
                        }
                      }
                    f = !f;
                  }
                  return i;
                }
                function f(e) {
                  var t = (function (e) {
                    var t = e.height,
                      n = Math.floor((t - 17) / 4);
                    if (n <= 6) return l.VERSIONS[n - 1];
                    for (var r = 0, o = 5; o >= 0; o--)
                      for (var a = t - 9; a >= t - 11; a--)
                        r = s(e.get(a, o), r);
                    var u = 0;
                    for (a = 5; a >= 0; a--)
                      for (o = t - 9; o >= t - 11; o--) u = s(e.get(a, o), u);
                    for (
                      var c, d = 1 / 0, f = 0, p = l.VERSIONS;
                      f < p.length;
                      f++
                    ) {
                      var h = p[f];
                      if (h.infoBits === r || h.infoBits === u) return h;
                      var m = i(r, h.infoBits);
                      m < d && ((c = h), (d = m)),
                        (m = i(u, h.infoBits)) < d && ((c = h), (d = m));
                    }
                    return d <= 3 ? c : void 0;
                  })(e);
                  if (!t) return null;
                  var n = (function (e) {
                    for (var t = 0, n = 0; n <= 8; n++)
                      6 !== n && (t = s(e.get(n, 8), t));
                    for (var r = 7; r >= 0; r--)
                      6 !== r && (t = s(e.get(8, r), t));
                    var o = e.height,
                      a = 0;
                    for (r = o - 1; r >= o - 7; r--) a = s(e.get(8, r), a);
                    for (n = o - 8; n < o; n++) a = s(e.get(n, 8), a);
                    for (
                      var l = 1 / 0, c = null, d = 0, f = u;
                      d < f.length;
                      d++
                    ) {
                      var p = f[d],
                        h = p.bits,
                        m = p.formatInfo;
                      if (h === t || h === a) return m;
                      var g = i(t, h);
                      g < l && ((c = m), (l = g)),
                        t !== a && (g = i(a, h)) < l && ((c = m), (l = g));
                    }
                    return l <= 3 ? c : null;
                  })(e);
                  if (!n) return null;
                  var r = (function (e, t, n) {
                    var r = t.errorCorrectionLevels[n],
                      o = [],
                      a = 0;
                    if (
                      (r.ecBlocks.forEach(function (e) {
                        for (var t = 0; t < e.numBlocks; t++)
                          o.push({
                            numDataCodewords: e.dataCodewordsPerBlock,
                            codewords: [],
                          }),
                            (a +=
                              e.dataCodewordsPerBlock + r.ecCodewordsPerBlock);
                      }),
                      e.length < a)
                    )
                      return null;
                    e = e.slice(0, a);
                    for (
                      var l = r.ecBlocks[0].dataCodewordsPerBlock, i = 0;
                      i < l;
                      i++
                    )
                      for (var s = 0, u = o; s < u.length; s++)
                        u[s].codewords.push(e.shift());
                    if (r.ecBlocks.length > 1) {
                      var c = r.ecBlocks[0].numBlocks,
                        d = r.ecBlocks[1].numBlocks;
                      for (i = 0; i < d; i++)
                        o[c + i].codewords.push(e.shift());
                    }
                    for (; e.length > 0; )
                      for (var f = 0, p = o; f < p.length; f++)
                        p[f].codewords.push(e.shift());
                    return o;
                  })(d(e, t, n), t, n.errorCorrectionLevel);
                  if (!r) return null;
                  for (
                    var c = r.reduce(function (e, t) {
                        return e + t.numDataCodewords;
                      }, 0),
                      f = new Uint8ClampedArray(c),
                      p = 0,
                      h = 0,
                      m = r;
                    h < m.length;
                    h++
                  ) {
                    var g = m[h],
                      v = a.decode(
                        g.codewords,
                        g.codewords.length - g.numDataCodewords
                      );
                    if (!v) return null;
                    for (var k = 0; k < g.numDataCodewords; k++) f[p++] = v[k];
                  }
                  try {
                    return o.decode(f, t.versionNumber);
                  } catch (y) {
                    return null;
                  }
                }
                t.decode = function (e) {
                  if (null == e) return null;
                  var t = f(e);
                  if (t) return t;
                  for (var n = 0; n < e.width; n++)
                    for (var r = n + 1; r < e.height; r++)
                      e.get(n, r) !== e.get(r, n) &&
                        (e.set(n, r, !e.get(n, r)), e.set(r, n, !e.get(r, n)));
                  return f(e);
                };
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var r,
                  o,
                  a = n(7),
                  l = n(8);
                function i(e, t) {
                  for (
                    var n = [], r = "", o = [10, 12, 14][t], a = e.readBits(o);
                    a >= 3;

                  ) {
                    if ((u = e.readBits(10)) >= 1e3)
                      throw new Error("Invalid numeric value above 999");
                    var l = Math.floor(u / 100),
                      i = Math.floor(u / 10) % 10,
                      s = u % 10;
                    n.push(48 + l, 48 + i, 48 + s),
                      (r += l.toString() + i.toString() + s.toString()),
                      (a -= 3);
                  }
                  if (2 === a) {
                    if ((u = e.readBits(7)) >= 100)
                      throw new Error("Invalid numeric value above 99");
                    (l = Math.floor(u / 10)),
                      (i = u % 10),
                      n.push(48 + l, 48 + i),
                      (r += l.toString() + i.toString());
                  } else if (1 === a) {
                    var u;
                    if ((u = e.readBits(4)) >= 10)
                      throw new Error("Invalid numeric value above 9");
                    n.push(48 + u), (r += u.toString());
                  }
                  return { bytes: n, text: r };
                }
                !(function (e) {
                  (e.Numeric = "numeric"),
                    (e.Alphanumeric = "alphanumeric"),
                    (e.Byte = "byte"),
                    (e.Kanji = "kanji"),
                    (e.ECI = "eci");
                })((r = t.Mode || (t.Mode = {}))),
                  (function (e) {
                    (e[(e.Terminator = 0)] = "Terminator"),
                      (e[(e.Numeric = 1)] = "Numeric"),
                      (e[(e.Alphanumeric = 2)] = "Alphanumeric"),
                      (e[(e.Byte = 4)] = "Byte"),
                      (e[(e.Kanji = 8)] = "Kanji"),
                      (e[(e.ECI = 7)] = "ECI");
                  })(o || (o = {}));
                var s = [
                  "0",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "A",
                  "B",
                  "C",
                  "D",
                  "E",
                  "F",
                  "G",
                  "H",
                  "I",
                  "J",
                  "K",
                  "L",
                  "M",
                  "N",
                  "O",
                  "P",
                  "Q",
                  "R",
                  "S",
                  "T",
                  "U",
                  "V",
                  "W",
                  "X",
                  "Y",
                  "Z",
                  " ",
                  "$",
                  "%",
                  "*",
                  "+",
                  "-",
                  ".",
                  "/",
                  ":",
                ];
                function u(e, t) {
                  for (
                    var n = [], r = "", o = [9, 11, 13][t], a = e.readBits(o);
                    a >= 2;

                  ) {
                    var l = e.readBits(11),
                      i = Math.floor(l / 45),
                      u = l % 45;
                    n.push(s[i].charCodeAt(0), s[u].charCodeAt(0)),
                      (r += s[i] + s[u]),
                      (a -= 2);
                  }
                  return (
                    1 === a &&
                      ((i = e.readBits(6)),
                      n.push(s[i].charCodeAt(0)),
                      (r += s[i])),
                    { bytes: n, text: r }
                  );
                }
                function c(e, t) {
                  for (
                    var n = [],
                      r = "",
                      o = [8, 16, 16][t],
                      a = e.readBits(o),
                      l = 0;
                    l < a;
                    l++
                  ) {
                    var i = e.readBits(8);
                    n.push(i);
                  }
                  try {
                    r += decodeURIComponent(
                      n
                        .map(function (e) {
                          return "%" + ("0" + e.toString(16)).substr(-2);
                        })
                        .join("")
                    );
                  } catch (s) {}
                  return { bytes: n, text: r };
                }
                function d(e, t) {
                  for (
                    var n = [],
                      r = "",
                      o = [8, 10, 12][t],
                      a = e.readBits(o),
                      i = 0;
                    i < a;
                    i++
                  ) {
                    var s = e.readBits(13),
                      u = (Math.floor(s / 192) << 8) | s % 192;
                    (u += u < 7936 ? 33088 : 49472),
                      n.push(u >> 8, 255 & u),
                      (r += String.fromCharCode(l.shiftJISTable[u]));
                  }
                  return { bytes: n, text: r };
                }
                t.decode = function (e, t) {
                  for (
                    var n,
                      l,
                      s,
                      f,
                      p = new a.BitStream(e),
                      h = t <= 9 ? 0 : t <= 26 ? 1 : 2,
                      m = { text: "", bytes: [], chunks: [], version: t };
                    p.available() >= 4;

                  ) {
                    var g = p.readBits(4);
                    if (g === o.Terminator) return m;
                    if (g === o.ECI)
                      0 === p.readBits(1)
                        ? m.chunks.push({
                            type: r.ECI,
                            assignmentNumber: p.readBits(7),
                          })
                        : 0 === p.readBits(1)
                        ? m.chunks.push({
                            type: r.ECI,
                            assignmentNumber: p.readBits(14),
                          })
                        : 0 === p.readBits(1)
                        ? m.chunks.push({
                            type: r.ECI,
                            assignmentNumber: p.readBits(21),
                          })
                        : m.chunks.push({ type: r.ECI, assignmentNumber: -1 });
                    else if (g === o.Numeric) {
                      var v = i(p, h);
                      (m.text += v.text),
                        (n = m.bytes).push.apply(n, v.bytes),
                        m.chunks.push({ type: r.Numeric, text: v.text });
                    } else if (g === o.Alphanumeric) {
                      var k = u(p, h);
                      (m.text += k.text),
                        (l = m.bytes).push.apply(l, k.bytes),
                        m.chunks.push({ type: r.Alphanumeric, text: k.text });
                    } else if (g === o.Byte) {
                      var y = c(p, h);
                      (m.text += y.text),
                        (s = m.bytes).push.apply(s, y.bytes),
                        m.chunks.push({
                          type: r.Byte,
                          bytes: y.bytes,
                          text: y.text,
                        });
                    } else if (g === o.Kanji) {
                      var w = d(p, h);
                      (m.text += w.text),
                        (f = m.bytes).push.apply(f, w.bytes),
                        m.chunks.push({
                          type: r.Kanji,
                          bytes: w.bytes,
                          text: w.text,
                        });
                    }
                  }
                  if (0 === p.available() || 0 === p.readBits(p.available()))
                    return m;
                };
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var r = (function () {
                  function e(e) {
                    (this.byteOffset = 0),
                      (this.bitOffset = 0),
                      (this.bytes = e);
                  }
                  return (
                    (e.prototype.readBits = function (e) {
                      if (e < 1 || e > 32 || e > this.available())
                        throw new Error(
                          "Cannot read " + e.toString() + " bits"
                        );
                      var t = 0;
                      if (this.bitOffset > 0) {
                        var n = 8 - this.bitOffset,
                          r = e < n ? e : n,
                          o = (255 >> (8 - r)) << (a = n - r);
                        (t = (this.bytes[this.byteOffset] & o) >> a),
                          (e -= r),
                          (this.bitOffset += r),
                          8 === this.bitOffset &&
                            ((this.bitOffset = 0), this.byteOffset++);
                      }
                      if (e > 0) {
                        for (; e >= 8; )
                          (t = (t << 8) | (255 & this.bytes[this.byteOffset])),
                            this.byteOffset++,
                            (e -= 8);
                        var a;
                        if (e > 0)
                          (o = (255 >> (a = 8 - e)) << a),
                            (t =
                              (t << e) |
                              ((this.bytes[this.byteOffset] & o) >> a)),
                            (this.bitOffset += e);
                      }
                      return t;
                    }),
                    (e.prototype.available = function () {
                      return (
                        8 * (this.bytes.length - this.byteOffset) -
                        this.bitOffset
                      );
                    }),
                    e
                  );
                })();
                t.BitStream = r;
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.shiftJISTable = {
                    32: 32,
                    33: 33,
                    34: 34,
                    35: 35,
                    36: 36,
                    37: 37,
                    38: 38,
                    39: 39,
                    40: 40,
                    41: 41,
                    42: 42,
                    43: 43,
                    44: 44,
                    45: 45,
                    46: 46,
                    47: 47,
                    48: 48,
                    49: 49,
                    50: 50,
                    51: 51,
                    52: 52,
                    53: 53,
                    54: 54,
                    55: 55,
                    56: 56,
                    57: 57,
                    58: 58,
                    59: 59,
                    60: 60,
                    61: 61,
                    62: 62,
                    63: 63,
                    64: 64,
                    65: 65,
                    66: 66,
                    67: 67,
                    68: 68,
                    69: 69,
                    70: 70,
                    71: 71,
                    72: 72,
                    73: 73,
                    74: 74,
                    75: 75,
                    76: 76,
                    77: 77,
                    78: 78,
                    79: 79,
                    80: 80,
                    81: 81,
                    82: 82,
                    83: 83,
                    84: 84,
                    85: 85,
                    86: 86,
                    87: 87,
                    88: 88,
                    89: 89,
                    90: 90,
                    91: 91,
                    92: 165,
                    93: 93,
                    94: 94,
                    95: 95,
                    96: 96,
                    97: 97,
                    98: 98,
                    99: 99,
                    100: 100,
                    101: 101,
                    102: 102,
                    103: 103,
                    104: 104,
                    105: 105,
                    106: 106,
                    107: 107,
                    108: 108,
                    109: 109,
                    110: 110,
                    111: 111,
                    112: 112,
                    113: 113,
                    114: 114,
                    115: 115,
                    116: 116,
                    117: 117,
                    118: 118,
                    119: 119,
                    120: 120,
                    121: 121,
                    122: 122,
                    123: 123,
                    124: 124,
                    125: 125,
                    126: 8254,
                    33088: 12288,
                    33089: 12289,
                    33090: 12290,
                    33091: 65292,
                    33092: 65294,
                    33093: 12539,
                    33094: 65306,
                    33095: 65307,
                    33096: 65311,
                    33097: 65281,
                    33098: 12443,
                    33099: 12444,
                    33100: 180,
                    33101: 65344,
                    33102: 168,
                    33103: 65342,
                    33104: 65507,
                    33105: 65343,
                    33106: 12541,
                    33107: 12542,
                    33108: 12445,
                    33109: 12446,
                    33110: 12291,
                    33111: 20189,
                    33112: 12293,
                    33113: 12294,
                    33114: 12295,
                    33115: 12540,
                    33116: 8213,
                    33117: 8208,
                    33118: 65295,
                    33119: 92,
                    33120: 12316,
                    33121: 8214,
                    33122: 65372,
                    33123: 8230,
                    33124: 8229,
                    33125: 8216,
                    33126: 8217,
                    33127: 8220,
                    33128: 8221,
                    33129: 65288,
                    33130: 65289,
                    33131: 12308,
                    33132: 12309,
                    33133: 65339,
                    33134: 65341,
                    33135: 65371,
                    33136: 65373,
                    33137: 12296,
                    33138: 12297,
                    33139: 12298,
                    33140: 12299,
                    33141: 12300,
                    33142: 12301,
                    33143: 12302,
                    33144: 12303,
                    33145: 12304,
                    33146: 12305,
                    33147: 65291,
                    33148: 8722,
                    33149: 177,
                    33150: 215,
                    33152: 247,
                    33153: 65309,
                    33154: 8800,
                    33155: 65308,
                    33156: 65310,
                    33157: 8806,
                    33158: 8807,
                    33159: 8734,
                    33160: 8756,
                    33161: 9794,
                    33162: 9792,
                    33163: 176,
                    33164: 8242,
                    33165: 8243,
                    33166: 8451,
                    33167: 65509,
                    33168: 65284,
                    33169: 162,
                    33170: 163,
                    33171: 65285,
                    33172: 65283,
                    33173: 65286,
                    33174: 65290,
                    33175: 65312,
                    33176: 167,
                    33177: 9734,
                    33178: 9733,
                    33179: 9675,
                    33180: 9679,
                    33181: 9678,
                    33182: 9671,
                    33183: 9670,
                    33184: 9633,
                    33185: 9632,
                    33186: 9651,
                    33187: 9650,
                    33188: 9661,
                    33189: 9660,
                    33190: 8251,
                    33191: 12306,
                    33192: 8594,
                    33193: 8592,
                    33194: 8593,
                    33195: 8595,
                    33196: 12307,
                    33208: 8712,
                    33209: 8715,
                    33210: 8838,
                    33211: 8839,
                    33212: 8834,
                    33213: 8835,
                    33214: 8746,
                    33215: 8745,
                    33224: 8743,
                    33225: 8744,
                    33226: 172,
                    33227: 8658,
                    33228: 8660,
                    33229: 8704,
                    33230: 8707,
                    33242: 8736,
                    33243: 8869,
                    33244: 8978,
                    33245: 8706,
                    33246: 8711,
                    33247: 8801,
                    33248: 8786,
                    33249: 8810,
                    33250: 8811,
                    33251: 8730,
                    33252: 8765,
                    33253: 8733,
                    33254: 8757,
                    33255: 8747,
                    33256: 8748,
                    33264: 8491,
                    33265: 8240,
                    33266: 9839,
                    33267: 9837,
                    33268: 9834,
                    33269: 8224,
                    33270: 8225,
                    33271: 182,
                    33276: 9711,
                    33359: 65296,
                    33360: 65297,
                    33361: 65298,
                    33362: 65299,
                    33363: 65300,
                    33364: 65301,
                    33365: 65302,
                    33366: 65303,
                    33367: 65304,
                    33368: 65305,
                    33376: 65313,
                    33377: 65314,
                    33378: 65315,
                    33379: 65316,
                    33380: 65317,
                    33381: 65318,
                    33382: 65319,
                    33383: 65320,
                    33384: 65321,
                    33385: 65322,
                    33386: 65323,
                    33387: 65324,
                    33388: 65325,
                    33389: 65326,
                    33390: 65327,
                    33391: 65328,
                    33392: 65329,
                    33393: 65330,
                    33394: 65331,
                    33395: 65332,
                    33396: 65333,
                    33397: 65334,
                    33398: 65335,
                    33399: 65336,
                    33400: 65337,
                    33401: 65338,
                    33409: 65345,
                    33410: 65346,
                    33411: 65347,
                    33412: 65348,
                    33413: 65349,
                    33414: 65350,
                    33415: 65351,
                    33416: 65352,
                    33417: 65353,
                    33418: 65354,
                    33419: 65355,
                    33420: 65356,
                    33421: 65357,
                    33422: 65358,
                    33423: 65359,
                    33424: 65360,
                    33425: 65361,
                    33426: 65362,
                    33427: 65363,
                    33428: 65364,
                    33429: 65365,
                    33430: 65366,
                    33431: 65367,
                    33432: 65368,
                    33433: 65369,
                    33434: 65370,
                    33439: 12353,
                    33440: 12354,
                    33441: 12355,
                    33442: 12356,
                    33443: 12357,
                    33444: 12358,
                    33445: 12359,
                    33446: 12360,
                    33447: 12361,
                    33448: 12362,
                    33449: 12363,
                    33450: 12364,
                    33451: 12365,
                    33452: 12366,
                    33453: 12367,
                    33454: 12368,
                    33455: 12369,
                    33456: 12370,
                    33457: 12371,
                    33458: 12372,
                    33459: 12373,
                    33460: 12374,
                    33461: 12375,
                    33462: 12376,
                    33463: 12377,
                    33464: 12378,
                    33465: 12379,
                    33466: 12380,
                    33467: 12381,
                    33468: 12382,
                    33469: 12383,
                    33470: 12384,
                    33471: 12385,
                    33472: 12386,
                    33473: 12387,
                    33474: 12388,
                    33475: 12389,
                    33476: 12390,
                    33477: 12391,
                    33478: 12392,
                    33479: 12393,
                    33480: 12394,
                    33481: 12395,
                    33482: 12396,
                    33483: 12397,
                    33484: 12398,
                    33485: 12399,
                    33486: 12400,
                    33487: 12401,
                    33488: 12402,
                    33489: 12403,
                    33490: 12404,
                    33491: 12405,
                    33492: 12406,
                    33493: 12407,
                    33494: 12408,
                    33495: 12409,
                    33496: 12410,
                    33497: 12411,
                    33498: 12412,
                    33499: 12413,
                    33500: 12414,
                    33501: 12415,
                    33502: 12416,
                    33503: 12417,
                    33504: 12418,
                    33505: 12419,
                    33506: 12420,
                    33507: 12421,
                    33508: 12422,
                    33509: 12423,
                    33510: 12424,
                    33511: 12425,
                    33512: 12426,
                    33513: 12427,
                    33514: 12428,
                    33515: 12429,
                    33516: 12430,
                    33517: 12431,
                    33518: 12432,
                    33519: 12433,
                    33520: 12434,
                    33521: 12435,
                    33600: 12449,
                    33601: 12450,
                    33602: 12451,
                    33603: 12452,
                    33604: 12453,
                    33605: 12454,
                    33606: 12455,
                    33607: 12456,
                    33608: 12457,
                    33609: 12458,
                    33610: 12459,
                    33611: 12460,
                    33612: 12461,
                    33613: 12462,
                    33614: 12463,
                    33615: 12464,
                    33616: 12465,
                    33617: 12466,
                    33618: 12467,
                    33619: 12468,
                    33620: 12469,
                    33621: 12470,
                    33622: 12471,
                    33623: 12472,
                    33624: 12473,
                    33625: 12474,
                    33626: 12475,
                    33627: 12476,
                    33628: 12477,
                    33629: 12478,
                    33630: 12479,
                    33631: 12480,
                    33632: 12481,
                    33633: 12482,
                    33634: 12483,
                    33635: 12484,
                    33636: 12485,
                    33637: 12486,
                    33638: 12487,
                    33639: 12488,
                    33640: 12489,
                    33641: 12490,
                    33642: 12491,
                    33643: 12492,
                    33644: 12493,
                    33645: 12494,
                    33646: 12495,
                    33647: 12496,
                    33648: 12497,
                    33649: 12498,
                    33650: 12499,
                    33651: 12500,
                    33652: 12501,
                    33653: 12502,
                    33654: 12503,
                    33655: 12504,
                    33656: 12505,
                    33657: 12506,
                    33658: 12507,
                    33659: 12508,
                    33660: 12509,
                    33661: 12510,
                    33662: 12511,
                    33664: 12512,
                    33665: 12513,
                    33666: 12514,
                    33667: 12515,
                    33668: 12516,
                    33669: 12517,
                    33670: 12518,
                    33671: 12519,
                    33672: 12520,
                    33673: 12521,
                    33674: 12522,
                    33675: 12523,
                    33676: 12524,
                    33677: 12525,
                    33678: 12526,
                    33679: 12527,
                    33680: 12528,
                    33681: 12529,
                    33682: 12530,
                    33683: 12531,
                    33684: 12532,
                    33685: 12533,
                    33686: 12534,
                    33695: 913,
                    33696: 914,
                    33697: 915,
                    33698: 916,
                    33699: 917,
                    33700: 918,
                    33701: 919,
                    33702: 920,
                    33703: 921,
                    33704: 922,
                    33705: 923,
                    33706: 924,
                    33707: 925,
                    33708: 926,
                    33709: 927,
                    33710: 928,
                    33711: 929,
                    33712: 931,
                    33713: 932,
                    33714: 933,
                    33715: 934,
                    33716: 935,
                    33717: 936,
                    33718: 937,
                    33727: 945,
                    33728: 946,
                    33729: 947,
                    33730: 948,
                    33731: 949,
                    33732: 950,
                    33733: 951,
                    33734: 952,
                    33735: 953,
                    33736: 954,
                    33737: 955,
                    33738: 956,
                    33739: 957,
                    33740: 958,
                    33741: 959,
                    33742: 960,
                    33743: 961,
                    33744: 963,
                    33745: 964,
                    33746: 965,
                    33747: 966,
                    33748: 967,
                    33749: 968,
                    33750: 969,
                    33856: 1040,
                    33857: 1041,
                    33858: 1042,
                    33859: 1043,
                    33860: 1044,
                    33861: 1045,
                    33862: 1025,
                    33863: 1046,
                    33864: 1047,
                    33865: 1048,
                    33866: 1049,
                    33867: 1050,
                    33868: 1051,
                    33869: 1052,
                    33870: 1053,
                    33871: 1054,
                    33872: 1055,
                    33873: 1056,
                    33874: 1057,
                    33875: 1058,
                    33876: 1059,
                    33877: 1060,
                    33878: 1061,
                    33879: 1062,
                    33880: 1063,
                    33881: 1064,
                    33882: 1065,
                    33883: 1066,
                    33884: 1067,
                    33885: 1068,
                    33886: 1069,
                    33887: 1070,
                    33888: 1071,
                    33904: 1072,
                    33905: 1073,
                    33906: 1074,
                    33907: 1075,
                    33908: 1076,
                    33909: 1077,
                    33910: 1105,
                    33911: 1078,
                    33912: 1079,
                    33913: 1080,
                    33914: 1081,
                    33915: 1082,
                    33916: 1083,
                    33917: 1084,
                    33918: 1085,
                    33920: 1086,
                    33921: 1087,
                    33922: 1088,
                    33923: 1089,
                    33924: 1090,
                    33925: 1091,
                    33926: 1092,
                    33927: 1093,
                    33928: 1094,
                    33929: 1095,
                    33930: 1096,
                    33931: 1097,
                    33932: 1098,
                    33933: 1099,
                    33934: 1100,
                    33935: 1101,
                    33936: 1102,
                    33937: 1103,
                    33951: 9472,
                    33952: 9474,
                    33953: 9484,
                    33954: 9488,
                    33955: 9496,
                    33956: 9492,
                    33957: 9500,
                    33958: 9516,
                    33959: 9508,
                    33960: 9524,
                    33961: 9532,
                    33962: 9473,
                    33963: 9475,
                    33964: 9487,
                    33965: 9491,
                    33966: 9499,
                    33967: 9495,
                    33968: 9507,
                    33969: 9523,
                    33970: 9515,
                    33971: 9531,
                    33972: 9547,
                    33973: 9504,
                    33974: 9519,
                    33975: 9512,
                    33976: 9527,
                    33977: 9535,
                    33978: 9501,
                    33979: 9520,
                    33980: 9509,
                    33981: 9528,
                    33982: 9538,
                    34975: 20124,
                    34976: 21782,
                    34977: 23043,
                    34978: 38463,
                    34979: 21696,
                    34980: 24859,
                    34981: 25384,
                    34982: 23030,
                    34983: 36898,
                    34984: 33909,
                    34985: 33564,
                    34986: 31312,
                    34987: 24746,
                    34988: 25569,
                    34989: 28197,
                    34990: 26093,
                    34991: 33894,
                    34992: 33446,
                    34993: 39925,
                    34994: 26771,
                    34995: 22311,
                    34996: 26017,
                    34997: 25201,
                    34998: 23451,
                    34999: 22992,
                    35e3: 34427,
                    35001: 39156,
                    35002: 32098,
                    35003: 32190,
                    35004: 39822,
                    35005: 25110,
                    35006: 31903,
                    35007: 34999,
                    35008: 23433,
                    35009: 24245,
                    35010: 25353,
                    35011: 26263,
                    35012: 26696,
                    35013: 38343,
                    35014: 38797,
                    35015: 26447,
                    35016: 20197,
                    35017: 20234,
                    35018: 20301,
                    35019: 20381,
                    35020: 20553,
                    35021: 22258,
                    35022: 22839,
                    35023: 22996,
                    35024: 23041,
                    35025: 23561,
                    35026: 24799,
                    35027: 24847,
                    35028: 24944,
                    35029: 26131,
                    35030: 26885,
                    35031: 28858,
                    35032: 30031,
                    35033: 30064,
                    35034: 31227,
                    35035: 32173,
                    35036: 32239,
                    35037: 32963,
                    35038: 33806,
                    35039: 34915,
                    35040: 35586,
                    35041: 36949,
                    35042: 36986,
                    35043: 21307,
                    35044: 20117,
                    35045: 20133,
                    35046: 22495,
                    35047: 32946,
                    35048: 37057,
                    35049: 30959,
                    35050: 19968,
                    35051: 22769,
                    35052: 28322,
                    35053: 36920,
                    35054: 31282,
                    35055: 33576,
                    35056: 33419,
                    35057: 39983,
                    35058: 20801,
                    35059: 21360,
                    35060: 21693,
                    35061: 21729,
                    35062: 22240,
                    35063: 23035,
                    35064: 24341,
                    35065: 39154,
                    35066: 28139,
                    35067: 32996,
                    35068: 34093,
                    35136: 38498,
                    35137: 38512,
                    35138: 38560,
                    35139: 38907,
                    35140: 21515,
                    35141: 21491,
                    35142: 23431,
                    35143: 28879,
                    35144: 32701,
                    35145: 36802,
                    35146: 38632,
                    35147: 21359,
                    35148: 40284,
                    35149: 31418,
                    35150: 19985,
                    35151: 30867,
                    35152: 33276,
                    35153: 28198,
                    35154: 22040,
                    35155: 21764,
                    35156: 27421,
                    35157: 34074,
                    35158: 39995,
                    35159: 23013,
                    35160: 21417,
                    35161: 28006,
                    35162: 29916,
                    35163: 38287,
                    35164: 22082,
                    35165: 20113,
                    35166: 36939,
                    35167: 38642,
                    35168: 33615,
                    35169: 39180,
                    35170: 21473,
                    35171: 21942,
                    35172: 23344,
                    35173: 24433,
                    35174: 26144,
                    35175: 26355,
                    35176: 26628,
                    35177: 27704,
                    35178: 27891,
                    35179: 27945,
                    35180: 29787,
                    35181: 30408,
                    35182: 31310,
                    35183: 38964,
                    35184: 33521,
                    35185: 34907,
                    35186: 35424,
                    35187: 37613,
                    35188: 28082,
                    35189: 30123,
                    35190: 30410,
                    35191: 39365,
                    35192: 24742,
                    35193: 35585,
                    35194: 36234,
                    35195: 38322,
                    35196: 27022,
                    35197: 21421,
                    35198: 20870,
                    35200: 22290,
                    35201: 22576,
                    35202: 22852,
                    35203: 23476,
                    35204: 24310,
                    35205: 24616,
                    35206: 25513,
                    35207: 25588,
                    35208: 27839,
                    35209: 28436,
                    35210: 28814,
                    35211: 28948,
                    35212: 29017,
                    35213: 29141,
                    35214: 29503,
                    35215: 32257,
                    35216: 33398,
                    35217: 33489,
                    35218: 34199,
                    35219: 36960,
                    35220: 37467,
                    35221: 40219,
                    35222: 22633,
                    35223: 26044,
                    35224: 27738,
                    35225: 29989,
                    35226: 20985,
                    35227: 22830,
                    35228: 22885,
                    35229: 24448,
                    35230: 24540,
                    35231: 25276,
                    35232: 26106,
                    35233: 27178,
                    35234: 27431,
                    35235: 27572,
                    35236: 29579,
                    35237: 32705,
                    35238: 35158,
                    35239: 40236,
                    35240: 40206,
                    35241: 40644,
                    35242: 23713,
                    35243: 27798,
                    35244: 33659,
                    35245: 20740,
                    35246: 23627,
                    35247: 25014,
                    35248: 33222,
                    35249: 26742,
                    35250: 29281,
                    35251: 20057,
                    35252: 20474,
                    35253: 21368,
                    35254: 24681,
                    35255: 28201,
                    35256: 31311,
                    35257: 38899,
                    35258: 19979,
                    35259: 21270,
                    35260: 20206,
                    35261: 20309,
                    35262: 20285,
                    35263: 20385,
                    35264: 20339,
                    35265: 21152,
                    35266: 21487,
                    35267: 22025,
                    35268: 22799,
                    35269: 23233,
                    35270: 23478,
                    35271: 23521,
                    35272: 31185,
                    35273: 26247,
                    35274: 26524,
                    35275: 26550,
                    35276: 27468,
                    35277: 27827,
                    35278: 28779,
                    35279: 29634,
                    35280: 31117,
                    35281: 31166,
                    35282: 31292,
                    35283: 31623,
                    35284: 33457,
                    35285: 33499,
                    35286: 33540,
                    35287: 33655,
                    35288: 33775,
                    35289: 33747,
                    35290: 34662,
                    35291: 35506,
                    35292: 22057,
                    35293: 36008,
                    35294: 36838,
                    35295: 36942,
                    35296: 38686,
                    35297: 34442,
                    35298: 20420,
                    35299: 23784,
                    35300: 25105,
                    35301: 29273,
                    35302: 30011,
                    35303: 33253,
                    35304: 33469,
                    35305: 34558,
                    35306: 36032,
                    35307: 38597,
                    35308: 39187,
                    35309: 39381,
                    35310: 20171,
                    35311: 20250,
                    35312: 35299,
                    35313: 22238,
                    35314: 22602,
                    35315: 22730,
                    35316: 24315,
                    35317: 24555,
                    35318: 24618,
                    35319: 24724,
                    35320: 24674,
                    35321: 25040,
                    35322: 25106,
                    35323: 25296,
                    35324: 25913,
                    35392: 39745,
                    35393: 26214,
                    35394: 26800,
                    35395: 28023,
                    35396: 28784,
                    35397: 30028,
                    35398: 30342,
                    35399: 32117,
                    35400: 33445,
                    35401: 34809,
                    35402: 38283,
                    35403: 38542,
                    35404: 35997,
                    35405: 20977,
                    35406: 21182,
                    35407: 22806,
                    35408: 21683,
                    35409: 23475,
                    35410: 23830,
                    35411: 24936,
                    35412: 27010,
                    35413: 28079,
                    35414: 30861,
                    35415: 33995,
                    35416: 34903,
                    35417: 35442,
                    35418: 37799,
                    35419: 39608,
                    35420: 28012,
                    35421: 39336,
                    35422: 34521,
                    35423: 22435,
                    35424: 26623,
                    35425: 34510,
                    35426: 37390,
                    35427: 21123,
                    35428: 22151,
                    35429: 21508,
                    35430: 24275,
                    35431: 25313,
                    35432: 25785,
                    35433: 26684,
                    35434: 26680,
                    35435: 27579,
                    35436: 29554,
                    35437: 30906,
                    35438: 31339,
                    35439: 35226,
                    35440: 35282,
                    35441: 36203,
                    35442: 36611,
                    35443: 37101,
                    35444: 38307,
                    35445: 38548,
                    35446: 38761,
                    35447: 23398,
                    35448: 23731,
                    35449: 27005,
                    35450: 38989,
                    35451: 38990,
                    35452: 25499,
                    35453: 31520,
                    35454: 27179,
                    35456: 27263,
                    35457: 26806,
                    35458: 39949,
                    35459: 28511,
                    35460: 21106,
                    35461: 21917,
                    35462: 24688,
                    35463: 25324,
                    35464: 27963,
                    35465: 28167,
                    35466: 28369,
                    35467: 33883,
                    35468: 35088,
                    35469: 36676,
                    35470: 19988,
                    35471: 39993,
                    35472: 21494,
                    35473: 26907,
                    35474: 27194,
                    35475: 38788,
                    35476: 26666,
                    35477: 20828,
                    35478: 31427,
                    35479: 33970,
                    35480: 37340,
                    35481: 37772,
                    35482: 22107,
                    35483: 40232,
                    35484: 26658,
                    35485: 33541,
                    35486: 33841,
                    35487: 31909,
                    35488: 21e3,
                    35489: 33477,
                    35490: 29926,
                    35491: 20094,
                    35492: 20355,
                    35493: 20896,
                    35494: 23506,
                    35495: 21002,
                    35496: 21208,
                    35497: 21223,
                    35498: 24059,
                    35499: 21914,
                    35500: 22570,
                    35501: 23014,
                    35502: 23436,
                    35503: 23448,
                    35504: 23515,
                    35505: 24178,
                    35506: 24185,
                    35507: 24739,
                    35508: 24863,
                    35509: 24931,
                    35510: 25022,
                    35511: 25563,
                    35512: 25954,
                    35513: 26577,
                    35514: 26707,
                    35515: 26874,
                    35516: 27454,
                    35517: 27475,
                    35518: 27735,
                    35519: 28450,
                    35520: 28567,
                    35521: 28485,
                    35522: 29872,
                    35523: 29976,
                    35524: 30435,
                    35525: 30475,
                    35526: 31487,
                    35527: 31649,
                    35528: 31777,
                    35529: 32233,
                    35530: 32566,
                    35531: 32752,
                    35532: 32925,
                    35533: 33382,
                    35534: 33694,
                    35535: 35251,
                    35536: 35532,
                    35537: 36011,
                    35538: 36996,
                    35539: 37969,
                    35540: 38291,
                    35541: 38289,
                    35542: 38306,
                    35543: 38501,
                    35544: 38867,
                    35545: 39208,
                    35546: 33304,
                    35547: 20024,
                    35548: 21547,
                    35549: 23736,
                    35550: 24012,
                    35551: 29609,
                    35552: 30284,
                    35553: 30524,
                    35554: 23721,
                    35555: 32747,
                    35556: 36107,
                    35557: 38593,
                    35558: 38929,
                    35559: 38996,
                    35560: 39e3,
                    35561: 20225,
                    35562: 20238,
                    35563: 21361,
                    35564: 21916,
                    35565: 22120,
                    35566: 22522,
                    35567: 22855,
                    35568: 23305,
                    35569: 23492,
                    35570: 23696,
                    35571: 24076,
                    35572: 24190,
                    35573: 24524,
                    35574: 25582,
                    35575: 26426,
                    35576: 26071,
                    35577: 26082,
                    35578: 26399,
                    35579: 26827,
                    35580: 26820,
                    35648: 27231,
                    35649: 24112,
                    35650: 27589,
                    35651: 27671,
                    35652: 27773,
                    35653: 30079,
                    35654: 31048,
                    35655: 23395,
                    35656: 31232,
                    35657: 32e3,
                    35658: 24509,
                    35659: 35215,
                    35660: 35352,
                    35661: 36020,
                    35662: 36215,
                    35663: 36556,
                    35664: 36637,
                    35665: 39138,
                    35666: 39438,
                    35667: 39740,
                    35668: 20096,
                    35669: 20605,
                    35670: 20736,
                    35671: 22931,
                    35672: 23452,
                    35673: 25135,
                    35674: 25216,
                    35675: 25836,
                    35676: 27450,
                    35677: 29344,
                    35678: 30097,
                    35679: 31047,
                    35680: 32681,
                    35681: 34811,
                    35682: 35516,
                    35683: 35696,
                    35684: 25516,
                    35685: 33738,
                    35686: 38816,
                    35687: 21513,
                    35688: 21507,
                    35689: 21931,
                    35690: 26708,
                    35691: 27224,
                    35692: 35440,
                    35693: 30759,
                    35694: 26485,
                    35695: 40653,
                    35696: 21364,
                    35697: 23458,
                    35698: 33050,
                    35699: 34384,
                    35700: 36870,
                    35701: 19992,
                    35702: 20037,
                    35703: 20167,
                    35704: 20241,
                    35705: 21450,
                    35706: 21560,
                    35707: 23470,
                    35708: 24339,
                    35709: 24613,
                    35710: 25937,
                    35712: 26429,
                    35713: 27714,
                    35714: 27762,
                    35715: 27875,
                    35716: 28792,
                    35717: 29699,
                    35718: 31350,
                    35719: 31406,
                    35720: 31496,
                    35721: 32026,
                    35722: 31998,
                    35723: 32102,
                    35724: 26087,
                    35725: 29275,
                    35726: 21435,
                    35727: 23621,
                    35728: 24040,
                    35729: 25298,
                    35730: 25312,
                    35731: 25369,
                    35732: 28192,
                    35733: 34394,
                    35734: 35377,
                    35735: 36317,
                    35736: 37624,
                    35737: 28417,
                    35738: 31142,
                    35739: 39770,
                    35740: 20136,
                    35741: 20139,
                    35742: 20140,
                    35743: 20379,
                    35744: 20384,
                    35745: 20689,
                    35746: 20807,
                    35747: 31478,
                    35748: 20849,
                    35749: 20982,
                    35750: 21332,
                    35751: 21281,
                    35752: 21375,
                    35753: 21483,
                    35754: 21932,
                    35755: 22659,
                    35756: 23777,
                    35757: 24375,
                    35758: 24394,
                    35759: 24623,
                    35760: 24656,
                    35761: 24685,
                    35762: 25375,
                    35763: 25945,
                    35764: 27211,
                    35765: 27841,
                    35766: 29378,
                    35767: 29421,
                    35768: 30703,
                    35769: 33016,
                    35770: 33029,
                    35771: 33288,
                    35772: 34126,
                    35773: 37111,
                    35774: 37857,
                    35775: 38911,
                    35776: 39255,
                    35777: 39514,
                    35778: 20208,
                    35779: 20957,
                    35780: 23597,
                    35781: 26241,
                    35782: 26989,
                    35783: 23616,
                    35784: 26354,
                    35785: 26997,
                    35786: 29577,
                    35787: 26704,
                    35788: 31873,
                    35789: 20677,
                    35790: 21220,
                    35791: 22343,
                    35792: 24062,
                    35793: 37670,
                    35794: 26020,
                    35795: 27427,
                    35796: 27453,
                    35797: 29748,
                    35798: 31105,
                    35799: 31165,
                    35800: 31563,
                    35801: 32202,
                    35802: 33465,
                    35803: 33740,
                    35804: 34943,
                    35805: 35167,
                    35806: 35641,
                    35807: 36817,
                    35808: 37329,
                    35809: 21535,
                    35810: 37504,
                    35811: 20061,
                    35812: 20534,
                    35813: 21477,
                    35814: 21306,
                    35815: 29399,
                    35816: 29590,
                    35817: 30697,
                    35818: 33510,
                    35819: 36527,
                    35820: 39366,
                    35821: 39368,
                    35822: 39378,
                    35823: 20855,
                    35824: 24858,
                    35825: 34398,
                    35826: 21936,
                    35827: 31354,
                    35828: 20598,
                    35829: 23507,
                    35830: 36935,
                    35831: 38533,
                    35832: 20018,
                    35833: 27355,
                    35834: 37351,
                    35835: 23633,
                    35836: 23624,
                    35904: 25496,
                    35905: 31391,
                    35906: 27795,
                    35907: 38772,
                    35908: 36705,
                    35909: 31402,
                    35910: 29066,
                    35911: 38536,
                    35912: 31874,
                    35913: 26647,
                    35914: 32368,
                    35915: 26705,
                    35916: 37740,
                    35917: 21234,
                    35918: 21531,
                    35919: 34219,
                    35920: 35347,
                    35921: 32676,
                    35922: 36557,
                    35923: 37089,
                    35924: 21350,
                    35925: 34952,
                    35926: 31041,
                    35927: 20418,
                    35928: 20670,
                    35929: 21009,
                    35930: 20804,
                    35931: 21843,
                    35932: 22317,
                    35933: 29674,
                    35934: 22411,
                    35935: 22865,
                    35936: 24418,
                    35937: 24452,
                    35938: 24693,
                    35939: 24950,
                    35940: 24935,
                    35941: 25001,
                    35942: 25522,
                    35943: 25658,
                    35944: 25964,
                    35945: 26223,
                    35946: 26690,
                    35947: 28179,
                    35948: 30054,
                    35949: 31293,
                    35950: 31995,
                    35951: 32076,
                    35952: 32153,
                    35953: 32331,
                    35954: 32619,
                    35955: 33550,
                    35956: 33610,
                    35957: 34509,
                    35958: 35336,
                    35959: 35427,
                    35960: 35686,
                    35961: 36605,
                    35962: 38938,
                    35963: 40335,
                    35964: 33464,
                    35965: 36814,
                    35966: 39912,
                    35968: 21127,
                    35969: 25119,
                    35970: 25731,
                    35971: 28608,
                    35972: 38553,
                    35973: 26689,
                    35974: 20625,
                    35975: 27424,
                    35976: 27770,
                    35977: 28500,
                    35978: 31348,
                    35979: 32080,
                    35980: 34880,
                    35981: 35363,
                    35982: 26376,
                    35983: 20214,
                    35984: 20537,
                    35985: 20518,
                    35986: 20581,
                    35987: 20860,
                    35988: 21048,
                    35989: 21091,
                    35990: 21927,
                    35991: 22287,
                    35992: 22533,
                    35993: 23244,
                    35994: 24314,
                    35995: 25010,
                    35996: 25080,
                    35997: 25331,
                    35998: 25458,
                    35999: 26908,
                    36e3: 27177,
                    36001: 29309,
                    36002: 29356,
                    36003: 29486,
                    36004: 30740,
                    36005: 30831,
                    36006: 32121,
                    36007: 30476,
                    36008: 32937,
                    36009: 35211,
                    36010: 35609,
                    36011: 36066,
                    36012: 36562,
                    36013: 36963,
                    36014: 37749,
                    36015: 38522,
                    36016: 38997,
                    36017: 39443,
                    36018: 40568,
                    36019: 20803,
                    36020: 21407,
                    36021: 21427,
                    36022: 24187,
                    36023: 24358,
                    36024: 28187,
                    36025: 28304,
                    36026: 29572,
                    36027: 29694,
                    36028: 32067,
                    36029: 33335,
                    36030: 35328,
                    36031: 35578,
                    36032: 38480,
                    36033: 20046,
                    36034: 20491,
                    36035: 21476,
                    36036: 21628,
                    36037: 22266,
                    36038: 22993,
                    36039: 23396,
                    36040: 24049,
                    36041: 24235,
                    36042: 24359,
                    36043: 25144,
                    36044: 25925,
                    36045: 26543,
                    36046: 28246,
                    36047: 29392,
                    36048: 31946,
                    36049: 34996,
                    36050: 32929,
                    36051: 32993,
                    36052: 33776,
                    36053: 34382,
                    36054: 35463,
                    36055: 36328,
                    36056: 37431,
                    36057: 38599,
                    36058: 39015,
                    36059: 40723,
                    36060: 20116,
                    36061: 20114,
                    36062: 20237,
                    36063: 21320,
                    36064: 21577,
                    36065: 21566,
                    36066: 23087,
                    36067: 24460,
                    36068: 24481,
                    36069: 24735,
                    36070: 26791,
                    36071: 27278,
                    36072: 29786,
                    36073: 30849,
                    36074: 35486,
                    36075: 35492,
                    36076: 35703,
                    36077: 37264,
                    36078: 20062,
                    36079: 39881,
                    36080: 20132,
                    36081: 20348,
                    36082: 20399,
                    36083: 20505,
                    36084: 20502,
                    36085: 20809,
                    36086: 20844,
                    36087: 21151,
                    36088: 21177,
                    36089: 21246,
                    36090: 21402,
                    36091: 21475,
                    36092: 21521,
                    36160: 21518,
                    36161: 21897,
                    36162: 22353,
                    36163: 22434,
                    36164: 22909,
                    36165: 23380,
                    36166: 23389,
                    36167: 23439,
                    36168: 24037,
                    36169: 24039,
                    36170: 24055,
                    36171: 24184,
                    36172: 24195,
                    36173: 24218,
                    36174: 24247,
                    36175: 24344,
                    36176: 24658,
                    36177: 24908,
                    36178: 25239,
                    36179: 25304,
                    36180: 25511,
                    36181: 25915,
                    36182: 26114,
                    36183: 26179,
                    36184: 26356,
                    36185: 26477,
                    36186: 26657,
                    36187: 26775,
                    36188: 27083,
                    36189: 27743,
                    36190: 27946,
                    36191: 28009,
                    36192: 28207,
                    36193: 28317,
                    36194: 30002,
                    36195: 30343,
                    36196: 30828,
                    36197: 31295,
                    36198: 31968,
                    36199: 32005,
                    36200: 32024,
                    36201: 32094,
                    36202: 32177,
                    36203: 32789,
                    36204: 32771,
                    36205: 32943,
                    36206: 32945,
                    36207: 33108,
                    36208: 33167,
                    36209: 33322,
                    36210: 33618,
                    36211: 34892,
                    36212: 34913,
                    36213: 35611,
                    36214: 36002,
                    36215: 36092,
                    36216: 37066,
                    36217: 37237,
                    36218: 37489,
                    36219: 30783,
                    36220: 37628,
                    36221: 38308,
                    36222: 38477,
                    36224: 38917,
                    36225: 39321,
                    36226: 39640,
                    36227: 40251,
                    36228: 21083,
                    36229: 21163,
                    36230: 21495,
                    36231: 21512,
                    36232: 22741,
                    36233: 25335,
                    36234: 28640,
                    36235: 35946,
                    36236: 36703,
                    36237: 40633,
                    36238: 20811,
                    36239: 21051,
                    36240: 21578,
                    36241: 22269,
                    36242: 31296,
                    36243: 37239,
                    36244: 40288,
                    36245: 40658,
                    36246: 29508,
                    36247: 28425,
                    36248: 33136,
                    36249: 29969,
                    36250: 24573,
                    36251: 24794,
                    36252: 39592,
                    36253: 29403,
                    36254: 36796,
                    36255: 27492,
                    36256: 38915,
                    36257: 20170,
                    36258: 22256,
                    36259: 22372,
                    36260: 22718,
                    36261: 23130,
                    36262: 24680,
                    36263: 25031,
                    36264: 26127,
                    36265: 26118,
                    36266: 26681,
                    36267: 26801,
                    36268: 28151,
                    36269: 30165,
                    36270: 32058,
                    36271: 33390,
                    36272: 39746,
                    36273: 20123,
                    36274: 20304,
                    36275: 21449,
                    36276: 21766,
                    36277: 23919,
                    36278: 24038,
                    36279: 24046,
                    36280: 26619,
                    36281: 27801,
                    36282: 29811,
                    36283: 30722,
                    36284: 35408,
                    36285: 37782,
                    36286: 35039,
                    36287: 22352,
                    36288: 24231,
                    36289: 25387,
                    36290: 20661,
                    36291: 20652,
                    36292: 20877,
                    36293: 26368,
                    36294: 21705,
                    36295: 22622,
                    36296: 22971,
                    36297: 23472,
                    36298: 24425,
                    36299: 25165,
                    36300: 25505,
                    36301: 26685,
                    36302: 27507,
                    36303: 28168,
                    36304: 28797,
                    36305: 37319,
                    36306: 29312,
                    36307: 30741,
                    36308: 30758,
                    36309: 31085,
                    36310: 25998,
                    36311: 32048,
                    36312: 33756,
                    36313: 35009,
                    36314: 36617,
                    36315: 38555,
                    36316: 21092,
                    36317: 22312,
                    36318: 26448,
                    36319: 32618,
                    36320: 36001,
                    36321: 20916,
                    36322: 22338,
                    36323: 38442,
                    36324: 22586,
                    36325: 27018,
                    36326: 32948,
                    36327: 21682,
                    36328: 23822,
                    36329: 22524,
                    36330: 30869,
                    36331: 40442,
                    36332: 20316,
                    36333: 21066,
                    36334: 21643,
                    36335: 25662,
                    36336: 26152,
                    36337: 26388,
                    36338: 26613,
                    36339: 31364,
                    36340: 31574,
                    36341: 32034,
                    36342: 37679,
                    36343: 26716,
                    36344: 39853,
                    36345: 31545,
                    36346: 21273,
                    36347: 20874,
                    36348: 21047,
                    36416: 23519,
                    36417: 25334,
                    36418: 25774,
                    36419: 25830,
                    36420: 26413,
                    36421: 27578,
                    36422: 34217,
                    36423: 38609,
                    36424: 30352,
                    36425: 39894,
                    36426: 25420,
                    36427: 37638,
                    36428: 39851,
                    36429: 30399,
                    36430: 26194,
                    36431: 19977,
                    36432: 20632,
                    36433: 21442,
                    36434: 23665,
                    36435: 24808,
                    36436: 25746,
                    36437: 25955,
                    36438: 26719,
                    36439: 29158,
                    36440: 29642,
                    36441: 29987,
                    36442: 31639,
                    36443: 32386,
                    36444: 34453,
                    36445: 35715,
                    36446: 36059,
                    36447: 37240,
                    36448: 39184,
                    36449: 26028,
                    36450: 26283,
                    36451: 27531,
                    36452: 20181,
                    36453: 20180,
                    36454: 20282,
                    36455: 20351,
                    36456: 21050,
                    36457: 21496,
                    36458: 21490,
                    36459: 21987,
                    36460: 22235,
                    36461: 22763,
                    36462: 22987,
                    36463: 22985,
                    36464: 23039,
                    36465: 23376,
                    36466: 23629,
                    36467: 24066,
                    36468: 24107,
                    36469: 24535,
                    36470: 24605,
                    36471: 25351,
                    36472: 25903,
                    36473: 23388,
                    36474: 26031,
                    36475: 26045,
                    36476: 26088,
                    36477: 26525,
                    36478: 27490,
                    36480: 27515,
                    36481: 27663,
                    36482: 29509,
                    36483: 31049,
                    36484: 31169,
                    36485: 31992,
                    36486: 32025,
                    36487: 32043,
                    36488: 32930,
                    36489: 33026,
                    36490: 33267,
                    36491: 35222,
                    36492: 35422,
                    36493: 35433,
                    36494: 35430,
                    36495: 35468,
                    36496: 35566,
                    36497: 36039,
                    36498: 36060,
                    36499: 38604,
                    36500: 39164,
                    36501: 27503,
                    36502: 20107,
                    36503: 20284,
                    36504: 20365,
                    36505: 20816,
                    36506: 23383,
                    36507: 23546,
                    36508: 24904,
                    36509: 25345,
                    36510: 26178,
                    36511: 27425,
                    36512: 28363,
                    36513: 27835,
                    36514: 29246,
                    36515: 29885,
                    36516: 30164,
                    36517: 30913,
                    36518: 31034,
                    36519: 32780,
                    36520: 32819,
                    36521: 33258,
                    36522: 33940,
                    36523: 36766,
                    36524: 27728,
                    36525: 40575,
                    36526: 24335,
                    36527: 35672,
                    36528: 40235,
                    36529: 31482,
                    36530: 36600,
                    36531: 23437,
                    36532: 38635,
                    36533: 19971,
                    36534: 21489,
                    36535: 22519,
                    36536: 22833,
                    36537: 23241,
                    36538: 23460,
                    36539: 24713,
                    36540: 28287,
                    36541: 28422,
                    36542: 30142,
                    36543: 36074,
                    36544: 23455,
                    36545: 34048,
                    36546: 31712,
                    36547: 20594,
                    36548: 26612,
                    36549: 33437,
                    36550: 23649,
                    36551: 34122,
                    36552: 32286,
                    36553: 33294,
                    36554: 20889,
                    36555: 23556,
                    36556: 25448,
                    36557: 36198,
                    36558: 26012,
                    36559: 29038,
                    36560: 31038,
                    36561: 32023,
                    36562: 32773,
                    36563: 35613,
                    36564: 36554,
                    36565: 36974,
                    36566: 34503,
                    36567: 37034,
                    36568: 20511,
                    36569: 21242,
                    36570: 23610,
                    36571: 26451,
                    36572: 28796,
                    36573: 29237,
                    36574: 37196,
                    36575: 37320,
                    36576: 37675,
                    36577: 33509,
                    36578: 23490,
                    36579: 24369,
                    36580: 24825,
                    36581: 20027,
                    36582: 21462,
                    36583: 23432,
                    36584: 25163,
                    36585: 26417,
                    36586: 27530,
                    36587: 29417,
                    36588: 29664,
                    36589: 31278,
                    36590: 33131,
                    36591: 36259,
                    36592: 37202,
                    36593: 39318,
                    36594: 20754,
                    36595: 21463,
                    36596: 21610,
                    36597: 23551,
                    36598: 25480,
                    36599: 27193,
                    36600: 32172,
                    36601: 38656,
                    36602: 22234,
                    36603: 21454,
                    36604: 21608,
                    36672: 23447,
                    36673: 23601,
                    36674: 24030,
                    36675: 20462,
                    36676: 24833,
                    36677: 25342,
                    36678: 27954,
                    36679: 31168,
                    36680: 31179,
                    36681: 32066,
                    36682: 32333,
                    36683: 32722,
                    36684: 33261,
                    36685: 33311,
                    36686: 33936,
                    36687: 34886,
                    36688: 35186,
                    36689: 35728,
                    36690: 36468,
                    36691: 36655,
                    36692: 36913,
                    36693: 37195,
                    36694: 37228,
                    36695: 38598,
                    36696: 37276,
                    36697: 20160,
                    36698: 20303,
                    36699: 20805,
                    36700: 21313,
                    36701: 24467,
                    36702: 25102,
                    36703: 26580,
                    36704: 27713,
                    36705: 28171,
                    36706: 29539,
                    36707: 32294,
                    36708: 37325,
                    36709: 37507,
                    36710: 21460,
                    36711: 22809,
                    36712: 23487,
                    36713: 28113,
                    36714: 31069,
                    36715: 32302,
                    36716: 31899,
                    36717: 22654,
                    36718: 29087,
                    36719: 20986,
                    36720: 34899,
                    36721: 36848,
                    36722: 20426,
                    36723: 23803,
                    36724: 26149,
                    36725: 30636,
                    36726: 31459,
                    36727: 33308,
                    36728: 39423,
                    36729: 20934,
                    36730: 24490,
                    36731: 26092,
                    36732: 26991,
                    36733: 27529,
                    36734: 28147,
                    36736: 28310,
                    36737: 28516,
                    36738: 30462,
                    36739: 32020,
                    36740: 24033,
                    36741: 36981,
                    36742: 37255,
                    36743: 38918,
                    36744: 20966,
                    36745: 21021,
                    36746: 25152,
                    36747: 26257,
                    36748: 26329,
                    36749: 28186,
                    36750: 24246,
                    36751: 32210,
                    36752: 32626,
                    36753: 26360,
                    36754: 34223,
                    36755: 34295,
                    36756: 35576,
                    36757: 21161,
                    36758: 21465,
                    36759: 22899,
                    36760: 24207,
                    36761: 24464,
                    36762: 24661,
                    36763: 37604,
                    36764: 38500,
                    36765: 20663,
                    36766: 20767,
                    36767: 21213,
                    36768: 21280,
                    36769: 21319,
                    36770: 21484,
                    36771: 21736,
                    36772: 21830,
                    36773: 21809,
                    36774: 22039,
                    36775: 22888,
                    36776: 22974,
                    36777: 23100,
                    36778: 23477,
                    36779: 23558,
                    36780: 23567,
                    36781: 23569,
                    36782: 23578,
                    36783: 24196,
                    36784: 24202,
                    36785: 24288,
                    36786: 24432,
                    36787: 25215,
                    36788: 25220,
                    36789: 25307,
                    36790: 25484,
                    36791: 25463,
                    36792: 26119,
                    36793: 26124,
                    36794: 26157,
                    36795: 26230,
                    36796: 26494,
                    36797: 26786,
                    36798: 27167,
                    36799: 27189,
                    36800: 27836,
                    36801: 28040,
                    36802: 28169,
                    36803: 28248,
                    36804: 28988,
                    36805: 28966,
                    36806: 29031,
                    36807: 30151,
                    36808: 30465,
                    36809: 30813,
                    36810: 30977,
                    36811: 31077,
                    36812: 31216,
                    36813: 31456,
                    36814: 31505,
                    36815: 31911,
                    36816: 32057,
                    36817: 32918,
                    36818: 33750,
                    36819: 33931,
                    36820: 34121,
                    36821: 34909,
                    36822: 35059,
                    36823: 35359,
                    36824: 35388,
                    36825: 35412,
                    36826: 35443,
                    36827: 35937,
                    36828: 36062,
                    36829: 37284,
                    36830: 37478,
                    36831: 37758,
                    36832: 37912,
                    36833: 38556,
                    36834: 38808,
                    36835: 19978,
                    36836: 19976,
                    36837: 19998,
                    36838: 20055,
                    36839: 20887,
                    36840: 21104,
                    36841: 22478,
                    36842: 22580,
                    36843: 22732,
                    36844: 23330,
                    36845: 24120,
                    36846: 24773,
                    36847: 25854,
                    36848: 26465,
                    36849: 26454,
                    36850: 27972,
                    36851: 29366,
                    36852: 30067,
                    36853: 31331,
                    36854: 33976,
                    36855: 35698,
                    36856: 37304,
                    36857: 37664,
                    36858: 22065,
                    36859: 22516,
                    36860: 39166,
                    36928: 25325,
                    36929: 26893,
                    36930: 27542,
                    36931: 29165,
                    36932: 32340,
                    36933: 32887,
                    36934: 33394,
                    36935: 35302,
                    36936: 39135,
                    36937: 34645,
                    36938: 36785,
                    36939: 23611,
                    36940: 20280,
                    36941: 20449,
                    36942: 20405,
                    36943: 21767,
                    36944: 23072,
                    36945: 23517,
                    36946: 23529,
                    36947: 24515,
                    36948: 24910,
                    36949: 25391,
                    36950: 26032,
                    36951: 26187,
                    36952: 26862,
                    36953: 27035,
                    36954: 28024,
                    36955: 28145,
                    36956: 30003,
                    36957: 30137,
                    36958: 30495,
                    36959: 31070,
                    36960: 31206,
                    36961: 32051,
                    36962: 33251,
                    36963: 33455,
                    36964: 34218,
                    36965: 35242,
                    36966: 35386,
                    36967: 36523,
                    36968: 36763,
                    36969: 36914,
                    36970: 37341,
                    36971: 38663,
                    36972: 20154,
                    36973: 20161,
                    36974: 20995,
                    36975: 22645,
                    36976: 22764,
                    36977: 23563,
                    36978: 29978,
                    36979: 23613,
                    36980: 33102,
                    36981: 35338,
                    36982: 36805,
                    36983: 38499,
                    36984: 38765,
                    36985: 31525,
                    36986: 35535,
                    36987: 38920,
                    36988: 37218,
                    36989: 22259,
                    36990: 21416,
                    36992: 36887,
                    36993: 21561,
                    36994: 22402,
                    36995: 24101,
                    36996: 25512,
                    36997: 27700,
                    36998: 28810,
                    36999: 30561,
                    37e3: 31883,
                    37001: 32736,
                    37002: 34928,
                    37003: 36930,
                    37004: 37204,
                    37005: 37648,
                    37006: 37656,
                    37007: 38543,
                    37008: 29790,
                    37009: 39620,
                    37010: 23815,
                    37011: 23913,
                    37012: 25968,
                    37013: 26530,
                    37014: 36264,
                    37015: 38619,
                    37016: 25454,
                    37017: 26441,
                    37018: 26905,
                    37019: 33733,
                    37020: 38935,
                    37021: 38592,
                    37022: 35070,
                    37023: 28548,
                    37024: 25722,
                    37025: 23544,
                    37026: 19990,
                    37027: 28716,
                    37028: 30045,
                    37029: 26159,
                    37030: 20932,
                    37031: 21046,
                    37032: 21218,
                    37033: 22995,
                    37034: 24449,
                    37035: 24615,
                    37036: 25104,
                    37037: 25919,
                    37038: 25972,
                    37039: 26143,
                    37040: 26228,
                    37041: 26866,
                    37042: 26646,
                    37043: 27491,
                    37044: 28165,
                    37045: 29298,
                    37046: 29983,
                    37047: 30427,
                    37048: 31934,
                    37049: 32854,
                    37050: 22768,
                    37051: 35069,
                    37052: 35199,
                    37053: 35488,
                    37054: 35475,
                    37055: 35531,
                    37056: 36893,
                    37057: 37266,
                    37058: 38738,
                    37059: 38745,
                    37060: 25993,
                    37061: 31246,
                    37062: 33030,
                    37063: 38587,
                    37064: 24109,
                    37065: 24796,
                    37066: 25114,
                    37067: 26021,
                    37068: 26132,
                    37069: 26512,
                    37070: 30707,
                    37071: 31309,
                    37072: 31821,
                    37073: 32318,
                    37074: 33034,
                    37075: 36012,
                    37076: 36196,
                    37077: 36321,
                    37078: 36447,
                    37079: 30889,
                    37080: 20999,
                    37081: 25305,
                    37082: 25509,
                    37083: 25666,
                    37084: 25240,
                    37085: 35373,
                    37086: 31363,
                    37087: 31680,
                    37088: 35500,
                    37089: 38634,
                    37090: 32118,
                    37091: 33292,
                    37092: 34633,
                    37093: 20185,
                    37094: 20808,
                    37095: 21315,
                    37096: 21344,
                    37097: 23459,
                    37098: 23554,
                    37099: 23574,
                    37100: 24029,
                    37101: 25126,
                    37102: 25159,
                    37103: 25776,
                    37104: 26643,
                    37105: 26676,
                    37106: 27849,
                    37107: 27973,
                    37108: 27927,
                    37109: 26579,
                    37110: 28508,
                    37111: 29006,
                    37112: 29053,
                    37113: 26059,
                    37114: 31359,
                    37115: 31661,
                    37116: 32218,
                    37184: 32330,
                    37185: 32680,
                    37186: 33146,
                    37187: 33307,
                    37188: 33337,
                    37189: 34214,
                    37190: 35438,
                    37191: 36046,
                    37192: 36341,
                    37193: 36984,
                    37194: 36983,
                    37195: 37549,
                    37196: 37521,
                    37197: 38275,
                    37198: 39854,
                    37199: 21069,
                    37200: 21892,
                    37201: 28472,
                    37202: 28982,
                    37203: 20840,
                    37204: 31109,
                    37205: 32341,
                    37206: 33203,
                    37207: 31950,
                    37208: 22092,
                    37209: 22609,
                    37210: 23720,
                    37211: 25514,
                    37212: 26366,
                    37213: 26365,
                    37214: 26970,
                    37215: 29401,
                    37216: 30095,
                    37217: 30094,
                    37218: 30990,
                    37219: 31062,
                    37220: 31199,
                    37221: 31895,
                    37222: 32032,
                    37223: 32068,
                    37224: 34311,
                    37225: 35380,
                    37226: 38459,
                    37227: 36961,
                    37228: 40736,
                    37229: 20711,
                    37230: 21109,
                    37231: 21452,
                    37232: 21474,
                    37233: 20489,
                    37234: 21930,
                    37235: 22766,
                    37236: 22863,
                    37237: 29245,
                    37238: 23435,
                    37239: 23652,
                    37240: 21277,
                    37241: 24803,
                    37242: 24819,
                    37243: 25436,
                    37244: 25475,
                    37245: 25407,
                    37246: 25531,
                    37248: 25805,
                    37249: 26089,
                    37250: 26361,
                    37251: 24035,
                    37252: 27085,
                    37253: 27133,
                    37254: 28437,
                    37255: 29157,
                    37256: 20105,
                    37257: 30185,
                    37258: 30456,
                    37259: 31379,
                    37260: 31967,
                    37261: 32207,
                    37262: 32156,
                    37263: 32865,
                    37264: 33609,
                    37265: 33624,
                    37266: 33900,
                    37267: 33980,
                    37268: 34299,
                    37269: 35013,
                    37270: 36208,
                    37271: 36865,
                    37272: 36973,
                    37273: 37783,
                    37274: 38684,
                    37275: 39442,
                    37276: 20687,
                    37277: 22679,
                    37278: 24974,
                    37279: 33235,
                    37280: 34101,
                    37281: 36104,
                    37282: 36896,
                    37283: 20419,
                    37284: 20596,
                    37285: 21063,
                    37286: 21363,
                    37287: 24687,
                    37288: 25417,
                    37289: 26463,
                    37290: 28204,
                    37291: 36275,
                    37292: 36895,
                    37293: 20439,
                    37294: 23646,
                    37295: 36042,
                    37296: 26063,
                    37297: 32154,
                    37298: 21330,
                    37299: 34966,
                    37300: 20854,
                    37301: 25539,
                    37302: 23384,
                    37303: 23403,
                    37304: 23562,
                    37305: 25613,
                    37306: 26449,
                    37307: 36956,
                    37308: 20182,
                    37309: 22810,
                    37310: 22826,
                    37311: 27760,
                    37312: 35409,
                    37313: 21822,
                    37314: 22549,
                    37315: 22949,
                    37316: 24816,
                    37317: 25171,
                    37318: 26561,
                    37319: 33333,
                    37320: 26965,
                    37321: 38464,
                    37322: 39364,
                    37323: 39464,
                    37324: 20307,
                    37325: 22534,
                    37326: 23550,
                    37327: 32784,
                    37328: 23729,
                    37329: 24111,
                    37330: 24453,
                    37331: 24608,
                    37332: 24907,
                    37333: 25140,
                    37334: 26367,
                    37335: 27888,
                    37336: 28382,
                    37337: 32974,
                    37338: 33151,
                    37339: 33492,
                    37340: 34955,
                    37341: 36024,
                    37342: 36864,
                    37343: 36910,
                    37344: 38538,
                    37345: 40667,
                    37346: 39899,
                    37347: 20195,
                    37348: 21488,
                    37349: 22823,
                    37350: 31532,
                    37351: 37261,
                    37352: 38988,
                    37353: 40441,
                    37354: 28381,
                    37355: 28711,
                    37356: 21331,
                    37357: 21828,
                    37358: 23429,
                    37359: 25176,
                    37360: 25246,
                    37361: 25299,
                    37362: 27810,
                    37363: 28655,
                    37364: 29730,
                    37365: 35351,
                    37366: 37944,
                    37367: 28609,
                    37368: 35582,
                    37369: 33592,
                    37370: 20967,
                    37371: 34552,
                    37372: 21482,
                    37440: 21481,
                    37441: 20294,
                    37442: 36948,
                    37443: 36784,
                    37444: 22890,
                    37445: 33073,
                    37446: 24061,
                    37447: 31466,
                    37448: 36799,
                    37449: 26842,
                    37450: 35895,
                    37451: 29432,
                    37452: 40008,
                    37453: 27197,
                    37454: 35504,
                    37455: 20025,
                    37456: 21336,
                    37457: 22022,
                    37458: 22374,
                    37459: 25285,
                    37460: 25506,
                    37461: 26086,
                    37462: 27470,
                    37463: 28129,
                    37464: 28251,
                    37465: 28845,
                    37466: 30701,
                    37467: 31471,
                    37468: 31658,
                    37469: 32187,
                    37470: 32829,
                    37471: 32966,
                    37472: 34507,
                    37473: 35477,
                    37474: 37723,
                    37475: 22243,
                    37476: 22727,
                    37477: 24382,
                    37478: 26029,
                    37479: 26262,
                    37480: 27264,
                    37481: 27573,
                    37482: 30007,
                    37483: 35527,
                    37484: 20516,
                    37485: 30693,
                    37486: 22320,
                    37487: 24347,
                    37488: 24677,
                    37489: 26234,
                    37490: 27744,
                    37491: 30196,
                    37492: 31258,
                    37493: 32622,
                    37494: 33268,
                    37495: 34584,
                    37496: 36933,
                    37497: 39347,
                    37498: 31689,
                    37499: 30044,
                    37500: 31481,
                    37501: 31569,
                    37502: 33988,
                    37504: 36880,
                    37505: 31209,
                    37506: 31378,
                    37507: 33590,
                    37508: 23265,
                    37509: 30528,
                    37510: 20013,
                    37511: 20210,
                    37512: 23449,
                    37513: 24544,
                    37514: 25277,
                    37515: 26172,
                    37516: 26609,
                    37517: 27880,
                    37518: 34411,
                    37519: 34935,
                    37520: 35387,
                    37521: 37198,
                    37522: 37619,
                    37523: 39376,
                    37524: 27159,
                    37525: 28710,
                    37526: 29482,
                    37527: 33511,
                    37528: 33879,
                    37529: 36015,
                    37530: 19969,
                    37531: 20806,
                    37532: 20939,
                    37533: 21899,
                    37534: 23541,
                    37535: 24086,
                    37536: 24115,
                    37537: 24193,
                    37538: 24340,
                    37539: 24373,
                    37540: 24427,
                    37541: 24500,
                    37542: 25074,
                    37543: 25361,
                    37544: 26274,
                    37545: 26397,
                    37546: 28526,
                    37547: 29266,
                    37548: 30010,
                    37549: 30522,
                    37550: 32884,
                    37551: 33081,
                    37552: 33144,
                    37553: 34678,
                    37554: 35519,
                    37555: 35548,
                    37556: 36229,
                    37557: 36339,
                    37558: 37530,
                    37559: 38263,
                    37560: 38914,
                    37561: 40165,
                    37562: 21189,
                    37563: 25431,
                    37564: 30452,
                    37565: 26389,
                    37566: 27784,
                    37567: 29645,
                    37568: 36035,
                    37569: 37806,
                    37570: 38515,
                    37571: 27941,
                    37572: 22684,
                    37573: 26894,
                    37574: 27084,
                    37575: 36861,
                    37576: 37786,
                    37577: 30171,
                    37578: 36890,
                    37579: 22618,
                    37580: 26626,
                    37581: 25524,
                    37582: 27131,
                    37583: 20291,
                    37584: 28460,
                    37585: 26584,
                    37586: 36795,
                    37587: 34086,
                    37588: 32180,
                    37589: 37716,
                    37590: 26943,
                    37591: 28528,
                    37592: 22378,
                    37593: 22775,
                    37594: 23340,
                    37595: 32044,
                    37596: 29226,
                    37597: 21514,
                    37598: 37347,
                    37599: 40372,
                    37600: 20141,
                    37601: 20302,
                    37602: 20572,
                    37603: 20597,
                    37604: 21059,
                    37605: 35998,
                    37606: 21576,
                    37607: 22564,
                    37608: 23450,
                    37609: 24093,
                    37610: 24213,
                    37611: 24237,
                    37612: 24311,
                    37613: 24351,
                    37614: 24716,
                    37615: 25269,
                    37616: 25402,
                    37617: 25552,
                    37618: 26799,
                    37619: 27712,
                    37620: 30855,
                    37621: 31118,
                    37622: 31243,
                    37623: 32224,
                    37624: 33351,
                    37625: 35330,
                    37626: 35558,
                    37627: 36420,
                    37628: 36883,
                    37696: 37048,
                    37697: 37165,
                    37698: 37336,
                    37699: 40718,
                    37700: 27877,
                    37701: 25688,
                    37702: 25826,
                    37703: 25973,
                    37704: 28404,
                    37705: 30340,
                    37706: 31515,
                    37707: 36969,
                    37708: 37841,
                    37709: 28346,
                    37710: 21746,
                    37711: 24505,
                    37712: 25764,
                    37713: 36685,
                    37714: 36845,
                    37715: 37444,
                    37716: 20856,
                    37717: 22635,
                    37718: 22825,
                    37719: 23637,
                    37720: 24215,
                    37721: 28155,
                    37722: 32399,
                    37723: 29980,
                    37724: 36028,
                    37725: 36578,
                    37726: 39003,
                    37727: 28857,
                    37728: 20253,
                    37729: 27583,
                    37730: 28593,
                    37731: 3e4,
                    37732: 38651,
                    37733: 20814,
                    37734: 21520,
                    37735: 22581,
                    37736: 22615,
                    37737: 22956,
                    37738: 23648,
                    37739: 24466,
                    37740: 26007,
                    37741: 26460,
                    37742: 28193,
                    37743: 30331,
                    37744: 33759,
                    37745: 36077,
                    37746: 36884,
                    37747: 37117,
                    37748: 37709,
                    37749: 30757,
                    37750: 30778,
                    37751: 21162,
                    37752: 24230,
                    37753: 22303,
                    37754: 22900,
                    37755: 24594,
                    37756: 20498,
                    37757: 20826,
                    37758: 20908,
                    37760: 20941,
                    37761: 20992,
                    37762: 21776,
                    37763: 22612,
                    37764: 22616,
                    37765: 22871,
                    37766: 23445,
                    37767: 23798,
                    37768: 23947,
                    37769: 24764,
                    37770: 25237,
                    37771: 25645,
                    37772: 26481,
                    37773: 26691,
                    37774: 26812,
                    37775: 26847,
                    37776: 30423,
                    37777: 28120,
                    37778: 28271,
                    37779: 28059,
                    37780: 28783,
                    37781: 29128,
                    37782: 24403,
                    37783: 30168,
                    37784: 31095,
                    37785: 31561,
                    37786: 31572,
                    37787: 31570,
                    37788: 31958,
                    37789: 32113,
                    37790: 21040,
                    37791: 33891,
                    37792: 34153,
                    37793: 34276,
                    37794: 35342,
                    37795: 35588,
                    37796: 35910,
                    37797: 36367,
                    37798: 36867,
                    37799: 36879,
                    37800: 37913,
                    37801: 38518,
                    37802: 38957,
                    37803: 39472,
                    37804: 38360,
                    37805: 20685,
                    37806: 21205,
                    37807: 21516,
                    37808: 22530,
                    37809: 23566,
                    37810: 24999,
                    37811: 25758,
                    37812: 27934,
                    37813: 30643,
                    37814: 31461,
                    37815: 33012,
                    37816: 33796,
                    37817: 36947,
                    37818: 37509,
                    37819: 23776,
                    37820: 40199,
                    37821: 21311,
                    37822: 24471,
                    37823: 24499,
                    37824: 28060,
                    37825: 29305,
                    37826: 30563,
                    37827: 31167,
                    37828: 31716,
                    37829: 27602,
                    37830: 29420,
                    37831: 35501,
                    37832: 26627,
                    37833: 27233,
                    37834: 20984,
                    37835: 31361,
                    37836: 26932,
                    37837: 23626,
                    37838: 40182,
                    37839: 33515,
                    37840: 23493,
                    37841: 37193,
                    37842: 28702,
                    37843: 22136,
                    37844: 23663,
                    37845: 24775,
                    37846: 25958,
                    37847: 27788,
                    37848: 35930,
                    37849: 36929,
                    37850: 38931,
                    37851: 21585,
                    37852: 26311,
                    37853: 37389,
                    37854: 22856,
                    37855: 37027,
                    37856: 20869,
                    37857: 20045,
                    37858: 20970,
                    37859: 34201,
                    37860: 35598,
                    37861: 28760,
                    37862: 25466,
                    37863: 37707,
                    37864: 26978,
                    37865: 39348,
                    37866: 32260,
                    37867: 30071,
                    37868: 21335,
                    37869: 26976,
                    37870: 36575,
                    37871: 38627,
                    37872: 27741,
                    37873: 20108,
                    37874: 23612,
                    37875: 24336,
                    37876: 36841,
                    37877: 21250,
                    37878: 36049,
                    37879: 32905,
                    37880: 34425,
                    37881: 24319,
                    37882: 26085,
                    37883: 20083,
                    37884: 20837,
                    37952: 22914,
                    37953: 23615,
                    37954: 38894,
                    37955: 20219,
                    37956: 22922,
                    37957: 24525,
                    37958: 35469,
                    37959: 28641,
                    37960: 31152,
                    37961: 31074,
                    37962: 23527,
                    37963: 33905,
                    37964: 29483,
                    37965: 29105,
                    37966: 24180,
                    37967: 24565,
                    37968: 25467,
                    37969: 25754,
                    37970: 29123,
                    37971: 31896,
                    37972: 20035,
                    37973: 24316,
                    37974: 20043,
                    37975: 22492,
                    37976: 22178,
                    37977: 24745,
                    37978: 28611,
                    37979: 32013,
                    37980: 33021,
                    37981: 33075,
                    37982: 33215,
                    37983: 36786,
                    37984: 35223,
                    37985: 34468,
                    37986: 24052,
                    37987: 25226,
                    37988: 25773,
                    37989: 35207,
                    37990: 26487,
                    37991: 27874,
                    37992: 27966,
                    37993: 29750,
                    37994: 30772,
                    37995: 23110,
                    37996: 32629,
                    37997: 33453,
                    37998: 39340,
                    37999: 20467,
                    38e3: 24259,
                    38001: 25309,
                    38002: 25490,
                    38003: 25943,
                    38004: 26479,
                    38005: 30403,
                    38006: 29260,
                    38007: 32972,
                    38008: 32954,
                    38009: 36649,
                    38010: 37197,
                    38011: 20493,
                    38012: 22521,
                    38013: 23186,
                    38014: 26757,
                    38016: 26995,
                    38017: 29028,
                    38018: 29437,
                    38019: 36023,
                    38020: 22770,
                    38021: 36064,
                    38022: 38506,
                    38023: 36889,
                    38024: 34687,
                    38025: 31204,
                    38026: 30695,
                    38027: 33833,
                    38028: 20271,
                    38029: 21093,
                    38030: 21338,
                    38031: 25293,
                    38032: 26575,
                    38033: 27850,
                    38034: 30333,
                    38035: 31636,
                    38036: 31893,
                    38037: 33334,
                    38038: 34180,
                    38039: 36843,
                    38040: 26333,
                    38041: 28448,
                    38042: 29190,
                    38043: 32283,
                    38044: 33707,
                    38045: 39361,
                    38046: 40614,
                    38047: 20989,
                    38048: 31665,
                    38049: 30834,
                    38050: 31672,
                    38051: 32903,
                    38052: 31560,
                    38053: 27368,
                    38054: 24161,
                    38055: 32908,
                    38056: 30033,
                    38057: 30048,
                    38058: 20843,
                    38059: 37474,
                    38060: 28300,
                    38061: 30330,
                    38062: 37271,
                    38063: 39658,
                    38064: 20240,
                    38065: 32624,
                    38066: 25244,
                    38067: 31567,
                    38068: 38309,
                    38069: 40169,
                    38070: 22138,
                    38071: 22617,
                    38072: 34532,
                    38073: 38588,
                    38074: 20276,
                    38075: 21028,
                    38076: 21322,
                    38077: 21453,
                    38078: 21467,
                    38079: 24070,
                    38080: 25644,
                    38081: 26001,
                    38082: 26495,
                    38083: 27710,
                    38084: 27726,
                    38085: 29256,
                    38086: 29359,
                    38087: 29677,
                    38088: 30036,
                    38089: 32321,
                    38090: 33324,
                    38091: 34281,
                    38092: 36009,
                    38093: 31684,
                    38094: 37318,
                    38095: 29033,
                    38096: 38930,
                    38097: 39151,
                    38098: 25405,
                    38099: 26217,
                    38100: 30058,
                    38101: 30436,
                    38102: 30928,
                    38103: 34115,
                    38104: 34542,
                    38105: 21290,
                    38106: 21329,
                    38107: 21542,
                    38108: 22915,
                    38109: 24199,
                    38110: 24444,
                    38111: 24754,
                    38112: 25161,
                    38113: 25209,
                    38114: 25259,
                    38115: 26e3,
                    38116: 27604,
                    38117: 27852,
                    38118: 30130,
                    38119: 30382,
                    38120: 30865,
                    38121: 31192,
                    38122: 32203,
                    38123: 32631,
                    38124: 32933,
                    38125: 34987,
                    38126: 35513,
                    38127: 36027,
                    38128: 36991,
                    38129: 38750,
                    38130: 39131,
                    38131: 27147,
                    38132: 31800,
                    38133: 20633,
                    38134: 23614,
                    38135: 24494,
                    38136: 26503,
                    38137: 27608,
                    38138: 29749,
                    38139: 30473,
                    38140: 32654,
                    38208: 40763,
                    38209: 26570,
                    38210: 31255,
                    38211: 21305,
                    38212: 30091,
                    38213: 39661,
                    38214: 24422,
                    38215: 33181,
                    38216: 33777,
                    38217: 32920,
                    38218: 24380,
                    38219: 24517,
                    38220: 30050,
                    38221: 31558,
                    38222: 36924,
                    38223: 26727,
                    38224: 23019,
                    38225: 23195,
                    38226: 32016,
                    38227: 30334,
                    38228: 35628,
                    38229: 20469,
                    38230: 24426,
                    38231: 27161,
                    38232: 27703,
                    38233: 28418,
                    38234: 29922,
                    38235: 31080,
                    38236: 34920,
                    38237: 35413,
                    38238: 35961,
                    38239: 24287,
                    38240: 25551,
                    38241: 30149,
                    38242: 31186,
                    38243: 33495,
                    38244: 37672,
                    38245: 37618,
                    38246: 33948,
                    38247: 34541,
                    38248: 39981,
                    38249: 21697,
                    38250: 24428,
                    38251: 25996,
                    38252: 27996,
                    38253: 28693,
                    38254: 36007,
                    38255: 36051,
                    38256: 38971,
                    38257: 25935,
                    38258: 29942,
                    38259: 19981,
                    38260: 20184,
                    38261: 22496,
                    38262: 22827,
                    38263: 23142,
                    38264: 23500,
                    38265: 20904,
                    38266: 24067,
                    38267: 24220,
                    38268: 24598,
                    38269: 25206,
                    38270: 25975,
                    38272: 26023,
                    38273: 26222,
                    38274: 28014,
                    38275: 29238,
                    38276: 31526,
                    38277: 33104,
                    38278: 33178,
                    38279: 33433,
                    38280: 35676,
                    38281: 36e3,
                    38282: 36070,
                    38283: 36212,
                    38284: 38428,
                    38285: 38468,
                    38286: 20398,
                    38287: 25771,
                    38288: 27494,
                    38289: 33310,
                    38290: 33889,
                    38291: 34154,
                    38292: 37096,
                    38293: 23553,
                    38294: 26963,
                    38295: 39080,
                    38296: 33914,
                    38297: 34135,
                    38298: 20239,
                    38299: 21103,
                    38300: 24489,
                    38301: 24133,
                    38302: 26381,
                    38303: 31119,
                    38304: 33145,
                    38305: 35079,
                    38306: 35206,
                    38307: 28149,
                    38308: 24343,
                    38309: 25173,
                    38310: 27832,
                    38311: 20175,
                    38312: 29289,
                    38313: 39826,
                    38314: 20998,
                    38315: 21563,
                    38316: 22132,
                    38317: 22707,
                    38318: 24996,
                    38319: 25198,
                    38320: 28954,
                    38321: 22894,
                    38322: 31881,
                    38323: 31966,
                    38324: 32027,
                    38325: 38640,
                    38326: 25991,
                    38327: 32862,
                    38328: 19993,
                    38329: 20341,
                    38330: 20853,
                    38331: 22592,
                    38332: 24163,
                    38333: 24179,
                    38334: 24330,
                    38335: 26564,
                    38336: 20006,
                    38337: 34109,
                    38338: 38281,
                    38339: 38491,
                    38340: 31859,
                    38341: 38913,
                    38342: 20731,
                    38343: 22721,
                    38344: 30294,
                    38345: 30887,
                    38346: 21029,
                    38347: 30629,
                    38348: 34065,
                    38349: 31622,
                    38350: 20559,
                    38351: 22793,
                    38352: 29255,
                    38353: 31687,
                    38354: 32232,
                    38355: 36794,
                    38356: 36820,
                    38357: 36941,
                    38358: 20415,
                    38359: 21193,
                    38360: 23081,
                    38361: 24321,
                    38362: 38829,
                    38363: 20445,
                    38364: 33303,
                    38365: 37610,
                    38366: 22275,
                    38367: 25429,
                    38368: 27497,
                    38369: 29995,
                    38370: 35036,
                    38371: 36628,
                    38372: 31298,
                    38373: 21215,
                    38374: 22675,
                    38375: 24917,
                    38376: 25098,
                    38377: 26286,
                    38378: 27597,
                    38379: 31807,
                    38380: 33769,
                    38381: 20515,
                    38382: 20472,
                    38383: 21253,
                    38384: 21574,
                    38385: 22577,
                    38386: 22857,
                    38387: 23453,
                    38388: 23792,
                    38389: 23791,
                    38390: 23849,
                    38391: 24214,
                    38392: 25265,
                    38393: 25447,
                    38394: 25918,
                    38395: 26041,
                    38396: 26379,
                    38464: 27861,
                    38465: 27873,
                    38466: 28921,
                    38467: 30770,
                    38468: 32299,
                    38469: 32990,
                    38470: 33459,
                    38471: 33804,
                    38472: 34028,
                    38473: 34562,
                    38474: 35090,
                    38475: 35370,
                    38476: 35914,
                    38477: 37030,
                    38478: 37586,
                    38479: 39165,
                    38480: 40179,
                    38481: 40300,
                    38482: 20047,
                    38483: 20129,
                    38484: 20621,
                    38485: 21078,
                    38486: 22346,
                    38487: 22952,
                    38488: 24125,
                    38489: 24536,
                    38490: 24537,
                    38491: 25151,
                    38492: 26292,
                    38493: 26395,
                    38494: 26576,
                    38495: 26834,
                    38496: 20882,
                    38497: 32033,
                    38498: 32938,
                    38499: 33192,
                    38500: 35584,
                    38501: 35980,
                    38502: 36031,
                    38503: 37502,
                    38504: 38450,
                    38505: 21536,
                    38506: 38956,
                    38507: 21271,
                    38508: 20693,
                    38509: 21340,
                    38510: 22696,
                    38511: 25778,
                    38512: 26420,
                    38513: 29287,
                    38514: 30566,
                    38515: 31302,
                    38516: 37350,
                    38517: 21187,
                    38518: 27809,
                    38519: 27526,
                    38520: 22528,
                    38521: 24140,
                    38522: 22868,
                    38523: 26412,
                    38524: 32763,
                    38525: 20961,
                    38526: 30406,
                    38528: 25705,
                    38529: 30952,
                    38530: 39764,
                    38531: 40635,
                    38532: 22475,
                    38533: 22969,
                    38534: 26151,
                    38535: 26522,
                    38536: 27598,
                    38537: 21737,
                    38538: 27097,
                    38539: 24149,
                    38540: 33180,
                    38541: 26517,
                    38542: 39850,
                    38543: 26622,
                    38544: 40018,
                    38545: 26717,
                    38546: 20134,
                    38547: 20451,
                    38548: 21448,
                    38549: 25273,
                    38550: 26411,
                    38551: 27819,
                    38552: 36804,
                    38553: 20397,
                    38554: 32365,
                    38555: 40639,
                    38556: 19975,
                    38557: 24930,
                    38558: 28288,
                    38559: 28459,
                    38560: 34067,
                    38561: 21619,
                    38562: 26410,
                    38563: 39749,
                    38564: 24051,
                    38565: 31637,
                    38566: 23724,
                    38567: 23494,
                    38568: 34588,
                    38569: 28234,
                    38570: 34001,
                    38571: 31252,
                    38572: 33032,
                    38573: 22937,
                    38574: 31885,
                    38575: 27665,
                    38576: 30496,
                    38577: 21209,
                    38578: 22818,
                    38579: 28961,
                    38580: 29279,
                    38581: 30683,
                    38582: 38695,
                    38583: 40289,
                    38584: 26891,
                    38585: 23167,
                    38586: 23064,
                    38587: 20901,
                    38588: 21517,
                    38589: 21629,
                    38590: 26126,
                    38591: 30431,
                    38592: 36855,
                    38593: 37528,
                    38594: 40180,
                    38595: 23018,
                    38596: 29277,
                    38597: 28357,
                    38598: 20813,
                    38599: 26825,
                    38600: 32191,
                    38601: 32236,
                    38602: 38754,
                    38603: 40634,
                    38604: 25720,
                    38605: 27169,
                    38606: 33538,
                    38607: 22916,
                    38608: 23391,
                    38609: 27611,
                    38610: 29467,
                    38611: 30450,
                    38612: 32178,
                    38613: 32791,
                    38614: 33945,
                    38615: 20786,
                    38616: 26408,
                    38617: 40665,
                    38618: 30446,
                    38619: 26466,
                    38620: 21247,
                    38621: 39173,
                    38622: 23588,
                    38623: 25147,
                    38624: 31870,
                    38625: 36016,
                    38626: 21839,
                    38627: 24758,
                    38628: 32011,
                    38629: 38272,
                    38630: 21249,
                    38631: 20063,
                    38632: 20918,
                    38633: 22812,
                    38634: 29242,
                    38635: 32822,
                    38636: 37326,
                    38637: 24357,
                    38638: 30690,
                    38639: 21380,
                    38640: 24441,
                    38641: 32004,
                    38642: 34220,
                    38643: 35379,
                    38644: 36493,
                    38645: 38742,
                    38646: 26611,
                    38647: 34222,
                    38648: 37971,
                    38649: 24841,
                    38650: 24840,
                    38651: 27833,
                    38652: 30290,
                    38720: 35565,
                    38721: 36664,
                    38722: 21807,
                    38723: 20305,
                    38724: 20778,
                    38725: 21191,
                    38726: 21451,
                    38727: 23461,
                    38728: 24189,
                    38729: 24736,
                    38730: 24962,
                    38731: 25558,
                    38732: 26377,
                    38733: 26586,
                    38734: 28263,
                    38735: 28044,
                    38736: 29494,
                    38737: 29495,
                    38738: 30001,
                    38739: 31056,
                    38740: 35029,
                    38741: 35480,
                    38742: 36938,
                    38743: 37009,
                    38744: 37109,
                    38745: 38596,
                    38746: 34701,
                    38747: 22805,
                    38748: 20104,
                    38749: 20313,
                    38750: 19982,
                    38751: 35465,
                    38752: 36671,
                    38753: 38928,
                    38754: 20653,
                    38755: 24188,
                    38756: 22934,
                    38757: 23481,
                    38758: 24248,
                    38759: 25562,
                    38760: 25594,
                    38761: 25793,
                    38762: 26332,
                    38763: 26954,
                    38764: 27096,
                    38765: 27915,
                    38766: 28342,
                    38767: 29076,
                    38768: 29992,
                    38769: 31407,
                    38770: 32650,
                    38771: 32768,
                    38772: 33865,
                    38773: 33993,
                    38774: 35201,
                    38775: 35617,
                    38776: 36362,
                    38777: 36965,
                    38778: 38525,
                    38779: 39178,
                    38780: 24958,
                    38781: 25233,
                    38782: 27442,
                    38784: 27779,
                    38785: 28020,
                    38786: 32716,
                    38787: 32764,
                    38788: 28096,
                    38789: 32645,
                    38790: 34746,
                    38791: 35064,
                    38792: 26469,
                    38793: 33713,
                    38794: 38972,
                    38795: 38647,
                    38796: 27931,
                    38797: 32097,
                    38798: 33853,
                    38799: 37226,
                    38800: 20081,
                    38801: 21365,
                    38802: 23888,
                    38803: 27396,
                    38804: 28651,
                    38805: 34253,
                    38806: 34349,
                    38807: 35239,
                    38808: 21033,
                    38809: 21519,
                    38810: 23653,
                    38811: 26446,
                    38812: 26792,
                    38813: 29702,
                    38814: 29827,
                    38815: 30178,
                    38816: 35023,
                    38817: 35041,
                    38818: 37324,
                    38819: 38626,
                    38820: 38520,
                    38821: 24459,
                    38822: 29575,
                    38823: 31435,
                    38824: 33870,
                    38825: 25504,
                    38826: 30053,
                    38827: 21129,
                    38828: 27969,
                    38829: 28316,
                    38830: 29705,
                    38831: 30041,
                    38832: 30827,
                    38833: 31890,
                    38834: 38534,
                    38835: 31452,
                    38836: 40845,
                    38837: 20406,
                    38838: 24942,
                    38839: 26053,
                    38840: 34396,
                    38841: 20102,
                    38842: 20142,
                    38843: 20698,
                    38844: 20001,
                    38845: 20940,
                    38846: 23534,
                    38847: 26009,
                    38848: 26753,
                    38849: 28092,
                    38850: 29471,
                    38851: 30274,
                    38852: 30637,
                    38853: 31260,
                    38854: 31975,
                    38855: 33391,
                    38856: 35538,
                    38857: 36988,
                    38858: 37327,
                    38859: 38517,
                    38860: 38936,
                    38861: 21147,
                    38862: 32209,
                    38863: 20523,
                    38864: 21400,
                    38865: 26519,
                    38866: 28107,
                    38867: 29136,
                    38868: 29747,
                    38869: 33256,
                    38870: 36650,
                    38871: 38563,
                    38872: 40023,
                    38873: 40607,
                    38874: 29792,
                    38875: 22593,
                    38876: 28057,
                    38877: 32047,
                    38878: 39006,
                    38879: 20196,
                    38880: 20278,
                    38881: 20363,
                    38882: 20919,
                    38883: 21169,
                    38884: 23994,
                    38885: 24604,
                    38886: 29618,
                    38887: 31036,
                    38888: 33491,
                    38889: 37428,
                    38890: 38583,
                    38891: 38646,
                    38892: 38666,
                    38893: 40599,
                    38894: 40802,
                    38895: 26278,
                    38896: 27508,
                    38897: 21015,
                    38898: 21155,
                    38899: 28872,
                    38900: 35010,
                    38901: 24265,
                    38902: 24651,
                    38903: 24976,
                    38904: 28451,
                    38905: 29001,
                    38906: 31806,
                    38907: 32244,
                    38908: 32879,
                    38976: 34030,
                    38977: 36899,
                    38978: 37676,
                    38979: 21570,
                    38980: 39791,
                    38981: 27347,
                    38982: 28809,
                    38983: 36034,
                    38984: 36335,
                    38985: 38706,
                    38986: 21172,
                    38987: 23105,
                    38988: 24266,
                    38989: 24324,
                    38990: 26391,
                    38991: 27004,
                    38992: 27028,
                    38993: 28010,
                    38994: 28431,
                    38995: 29282,
                    38996: 29436,
                    38997: 31725,
                    38998: 32769,
                    38999: 32894,
                    39e3: 34635,
                    39001: 37070,
                    39002: 20845,
                    39003: 40595,
                    39004: 31108,
                    39005: 32907,
                    39006: 37682,
                    39007: 35542,
                    39008: 20525,
                    39009: 21644,
                    39010: 35441,
                    39011: 27498,
                    39012: 36036,
                    39013: 33031,
                    39014: 24785,
                    39015: 26528,
                    39016: 40434,
                    39017: 20121,
                    39018: 20120,
                    39019: 39952,
                    39020: 35435,
                    39021: 34241,
                    39022: 34152,
                    39023: 26880,
                    39024: 28286,
                    39025: 30871,
                    39026: 33109,
                    39071: 24332,
                    39072: 19984,
                    39073: 19989,
                    39074: 20010,
                    39075: 20017,
                    39076: 20022,
                    39077: 20028,
                    39078: 20031,
                    39079: 20034,
                    39080: 20054,
                    39081: 20056,
                    39082: 20098,
                    39083: 20101,
                    39084: 35947,
                    39085: 20106,
                    39086: 33298,
                    39087: 24333,
                    39088: 20110,
                    39089: 20126,
                    39090: 20127,
                    39091: 20128,
                    39092: 20130,
                    39093: 20144,
                    39094: 20147,
                    39095: 20150,
                    39096: 20174,
                    39097: 20173,
                    39098: 20164,
                    39099: 20166,
                    39100: 20162,
                    39101: 20183,
                    39102: 20190,
                    39103: 20205,
                    39104: 20191,
                    39105: 20215,
                    39106: 20233,
                    39107: 20314,
                    39108: 20272,
                    39109: 20315,
                    39110: 20317,
                    39111: 20311,
                    39112: 20295,
                    39113: 20342,
                    39114: 20360,
                    39115: 20367,
                    39116: 20376,
                    39117: 20347,
                    39118: 20329,
                    39119: 20336,
                    39120: 20369,
                    39121: 20335,
                    39122: 20358,
                    39123: 20374,
                    39124: 20760,
                    39125: 20436,
                    39126: 20447,
                    39127: 20430,
                    39128: 20440,
                    39129: 20443,
                    39130: 20433,
                    39131: 20442,
                    39132: 20432,
                    39133: 20452,
                    39134: 20453,
                    39135: 20506,
                    39136: 20520,
                    39137: 20500,
                    39138: 20522,
                    39139: 20517,
                    39140: 20485,
                    39141: 20252,
                    39142: 20470,
                    39143: 20513,
                    39144: 20521,
                    39145: 20524,
                    39146: 20478,
                    39147: 20463,
                    39148: 20497,
                    39149: 20486,
                    39150: 20547,
                    39151: 20551,
                    39152: 26371,
                    39153: 20565,
                    39154: 20560,
                    39155: 20552,
                    39156: 20570,
                    39157: 20566,
                    39158: 20588,
                    39159: 20600,
                    39160: 20608,
                    39161: 20634,
                    39162: 20613,
                    39163: 20660,
                    39164: 20658,
                    39232: 20681,
                    39233: 20682,
                    39234: 20659,
                    39235: 20674,
                    39236: 20694,
                    39237: 20702,
                    39238: 20709,
                    39239: 20717,
                    39240: 20707,
                    39241: 20718,
                    39242: 20729,
                    39243: 20725,
                    39244: 20745,
                    39245: 20737,
                    39246: 20738,
                    39247: 20758,
                    39248: 20757,
                    39249: 20756,
                    39250: 20762,
                    39251: 20769,
                    39252: 20794,
                    39253: 20791,
                    39254: 20796,
                    39255: 20795,
                    39256: 20799,
                    39257: 20800,
                    39258: 20818,
                    39259: 20812,
                    39260: 20820,
                    39261: 20834,
                    39262: 31480,
                    39263: 20841,
                    39264: 20842,
                    39265: 20846,
                    39266: 20864,
                    39267: 20866,
                    39268: 22232,
                    39269: 20876,
                    39270: 20873,
                    39271: 20879,
                    39272: 20881,
                    39273: 20883,
                    39274: 20885,
                    39275: 20886,
                    39276: 20900,
                    39277: 20902,
                    39278: 20898,
                    39279: 20905,
                    39280: 20906,
                    39281: 20907,
                    39282: 20915,
                    39283: 20913,
                    39284: 20914,
                    39285: 20912,
                    39286: 20917,
                    39287: 20925,
                    39288: 20933,
                    39289: 20937,
                    39290: 20955,
                    39291: 20960,
                    39292: 34389,
                    39293: 20969,
                    39294: 20973,
                    39296: 20976,
                    39297: 20981,
                    39298: 20990,
                    39299: 20996,
                    39300: 21003,
                    39301: 21012,
                    39302: 21006,
                    39303: 21031,
                    39304: 21034,
                    39305: 21038,
                    39306: 21043,
                    39307: 21049,
                    39308: 21071,
                    39309: 21060,
                    39310: 21067,
                    39311: 21068,
                    39312: 21086,
                    39313: 21076,
                    39314: 21098,
                    39315: 21108,
                    39316: 21097,
                    39317: 21107,
                    39318: 21119,
                    39319: 21117,
                    39320: 21133,
                    39321: 21140,
                    39322: 21138,
                    39323: 21105,
                    39324: 21128,
                    39325: 21137,
                    39326: 36776,
                    39327: 36775,
                    39328: 21164,
                    39329: 21165,
                    39330: 21180,
                    39331: 21173,
                    39332: 21185,
                    39333: 21197,
                    39334: 21207,
                    39335: 21214,
                    39336: 21219,
                    39337: 21222,
                    39338: 39149,
                    39339: 21216,
                    39340: 21235,
                    39341: 21237,
                    39342: 21240,
                    39343: 21241,
                    39344: 21254,
                    39345: 21256,
                    39346: 30008,
                    39347: 21261,
                    39348: 21264,
                    39349: 21263,
                    39350: 21269,
                    39351: 21274,
                    39352: 21283,
                    39353: 21295,
                    39354: 21297,
                    39355: 21299,
                    39356: 21304,
                    39357: 21312,
                    39358: 21318,
                    39359: 21317,
                    39360: 19991,
                    39361: 21321,
                    39362: 21325,
                    39363: 20950,
                    39364: 21342,
                    39365: 21353,
                    39366: 21358,
                    39367: 22808,
                    39368: 21371,
                    39369: 21367,
                    39370: 21378,
                    39371: 21398,
                    39372: 21408,
                    39373: 21414,
                    39374: 21413,
                    39375: 21422,
                    39376: 21424,
                    39377: 21430,
                    39378: 21443,
                    39379: 31762,
                    39380: 38617,
                    39381: 21471,
                    39382: 26364,
                    39383: 29166,
                    39384: 21486,
                    39385: 21480,
                    39386: 21485,
                    39387: 21498,
                    39388: 21505,
                    39389: 21565,
                    39390: 21568,
                    39391: 21548,
                    39392: 21549,
                    39393: 21564,
                    39394: 21550,
                    39395: 21558,
                    39396: 21545,
                    39397: 21533,
                    39398: 21582,
                    39399: 21647,
                    39400: 21621,
                    39401: 21646,
                    39402: 21599,
                    39403: 21617,
                    39404: 21623,
                    39405: 21616,
                    39406: 21650,
                    39407: 21627,
                    39408: 21632,
                    39409: 21622,
                    39410: 21636,
                    39411: 21648,
                    39412: 21638,
                    39413: 21703,
                    39414: 21666,
                    39415: 21688,
                    39416: 21669,
                    39417: 21676,
                    39418: 21700,
                    39419: 21704,
                    39420: 21672,
                    39488: 21675,
                    39489: 21698,
                    39490: 21668,
                    39491: 21694,
                    39492: 21692,
                    39493: 21720,
                    39494: 21733,
                    39495: 21734,
                    39496: 21775,
                    39497: 21780,
                    39498: 21757,
                    39499: 21742,
                    39500: 21741,
                    39501: 21754,
                    39502: 21730,
                    39503: 21817,
                    39504: 21824,
                    39505: 21859,
                    39506: 21836,
                    39507: 21806,
                    39508: 21852,
                    39509: 21829,
                    39510: 21846,
                    39511: 21847,
                    39512: 21816,
                    39513: 21811,
                    39514: 21853,
                    39515: 21913,
                    39516: 21888,
                    39517: 21679,
                    39518: 21898,
                    39519: 21919,
                    39520: 21883,
                    39521: 21886,
                    39522: 21912,
                    39523: 21918,
                    39524: 21934,
                    39525: 21884,
                    39526: 21891,
                    39527: 21929,
                    39528: 21895,
                    39529: 21928,
                    39530: 21978,
                    39531: 21957,
                    39532: 21983,
                    39533: 21956,
                    39534: 21980,
                    39535: 21988,
                    39536: 21972,
                    39537: 22036,
                    39538: 22007,
                    39539: 22038,
                    39540: 22014,
                    39541: 22013,
                    39542: 22043,
                    39543: 22009,
                    39544: 22094,
                    39545: 22096,
                    39546: 29151,
                    39547: 22068,
                    39548: 22070,
                    39549: 22066,
                    39550: 22072,
                    39552: 22123,
                    39553: 22116,
                    39554: 22063,
                    39555: 22124,
                    39556: 22122,
                    39557: 22150,
                    39558: 22144,
                    39559: 22154,
                    39560: 22176,
                    39561: 22164,
                    39562: 22159,
                    39563: 22181,
                    39564: 22190,
                    39565: 22198,
                    39566: 22196,
                    39567: 22210,
                    39568: 22204,
                    39569: 22209,
                    39570: 22211,
                    39571: 22208,
                    39572: 22216,
                    39573: 22222,
                    39574: 22225,
                    39575: 22227,
                    39576: 22231,
                    39577: 22254,
                    39578: 22265,
                    39579: 22272,
                    39580: 22271,
                    39581: 22276,
                    39582: 22281,
                    39583: 22280,
                    39584: 22283,
                    39585: 22285,
                    39586: 22291,
                    39587: 22296,
                    39588: 22294,
                    39589: 21959,
                    39590: 22300,
                    39591: 22310,
                    39592: 22327,
                    39593: 22328,
                    39594: 22350,
                    39595: 22331,
                    39596: 22336,
                    39597: 22351,
                    39598: 22377,
                    39599: 22464,
                    39600: 22408,
                    39601: 22369,
                    39602: 22399,
                    39603: 22409,
                    39604: 22419,
                    39605: 22432,
                    39606: 22451,
                    39607: 22436,
                    39608: 22442,
                    39609: 22448,
                    39610: 22467,
                    39611: 22470,
                    39612: 22484,
                    39613: 22482,
                    39614: 22483,
                    39615: 22538,
                    39616: 22486,
                    39617: 22499,
                    39618: 22539,
                    39619: 22553,
                    39620: 22557,
                    39621: 22642,
                    39622: 22561,
                    39623: 22626,
                    39624: 22603,
                    39625: 22640,
                    39626: 27584,
                    39627: 22610,
                    39628: 22589,
                    39629: 22649,
                    39630: 22661,
                    39631: 22713,
                    39632: 22687,
                    39633: 22699,
                    39634: 22714,
                    39635: 22750,
                    39636: 22715,
                    39637: 22712,
                    39638: 22702,
                    39639: 22725,
                    39640: 22739,
                    39641: 22737,
                    39642: 22743,
                    39643: 22745,
                    39644: 22744,
                    39645: 22757,
                    39646: 22748,
                    39647: 22756,
                    39648: 22751,
                    39649: 22767,
                    39650: 22778,
                    39651: 22777,
                    39652: 22779,
                    39653: 22780,
                    39654: 22781,
                    39655: 22786,
                    39656: 22794,
                    39657: 22800,
                    39658: 22811,
                    39659: 26790,
                    39660: 22821,
                    39661: 22828,
                    39662: 22829,
                    39663: 22834,
                    39664: 22840,
                    39665: 22846,
                    39666: 31442,
                    39667: 22869,
                    39668: 22864,
                    39669: 22862,
                    39670: 22874,
                    39671: 22872,
                    39672: 22882,
                    39673: 22880,
                    39674: 22887,
                    39675: 22892,
                    39676: 22889,
                    39744: 22904,
                    39745: 22913,
                    39746: 22941,
                    39747: 20318,
                    39748: 20395,
                    39749: 22947,
                    39750: 22962,
                    39751: 22982,
                    39752: 23016,
                    39753: 23004,
                    39754: 22925,
                    39755: 23001,
                    39756: 23002,
                    39757: 23077,
                    39758: 23071,
                    39759: 23057,
                    39760: 23068,
                    39761: 23049,
                    39762: 23066,
                    39763: 23104,
                    39764: 23148,
                    39765: 23113,
                    39766: 23093,
                    39767: 23094,
                    39768: 23138,
                    39769: 23146,
                    39770: 23194,
                    39771: 23228,
                    39772: 23230,
                    39773: 23243,
                    39774: 23234,
                    39775: 23229,
                    39776: 23267,
                    39777: 23255,
                    39778: 23270,
                    39779: 23273,
                    39780: 23254,
                    39781: 23290,
                    39782: 23291,
                    39783: 23308,
                    39784: 23307,
                    39785: 23318,
                    39786: 23346,
                    39787: 23248,
                    39788: 23338,
                    39789: 23350,
                    39790: 23358,
                    39791: 23363,
                    39792: 23365,
                    39793: 23360,
                    39794: 23377,
                    39795: 23381,
                    39796: 23386,
                    39797: 23387,
                    39798: 23397,
                    39799: 23401,
                    39800: 23408,
                    39801: 23411,
                    39802: 23413,
                    39803: 23416,
                    39804: 25992,
                    39805: 23418,
                    39806: 23424,
                    39808: 23427,
                    39809: 23462,
                    39810: 23480,
                    39811: 23491,
                    39812: 23495,
                    39813: 23497,
                    39814: 23508,
                    39815: 23504,
                    39816: 23524,
                    39817: 23526,
                    39818: 23522,
                    39819: 23518,
                    39820: 23525,
                    39821: 23531,
                    39822: 23536,
                    39823: 23542,
                    39824: 23539,
                    39825: 23557,
                    39826: 23559,
                    39827: 23560,
                    39828: 23565,
                    39829: 23571,
                    39830: 23584,
                    39831: 23586,
                    39832: 23592,
                    39833: 23608,
                    39834: 23609,
                    39835: 23617,
                    39836: 23622,
                    39837: 23630,
                    39838: 23635,
                    39839: 23632,
                    39840: 23631,
                    39841: 23409,
                    39842: 23660,
                    39843: 23662,
                    39844: 20066,
                    39845: 23670,
                    39846: 23673,
                    39847: 23692,
                    39848: 23697,
                    39849: 23700,
                    39850: 22939,
                    39851: 23723,
                    39852: 23739,
                    39853: 23734,
                    39854: 23740,
                    39855: 23735,
                    39856: 23749,
                    39857: 23742,
                    39858: 23751,
                    39859: 23769,
                    39860: 23785,
                    39861: 23805,
                    39862: 23802,
                    39863: 23789,
                    39864: 23948,
                    39865: 23786,
                    39866: 23819,
                    39867: 23829,
                    39868: 23831,
                    39869: 23900,
                    39870: 23839,
                    39871: 23835,
                    39872: 23825,
                    39873: 23828,
                    39874: 23842,
                    39875: 23834,
                    39876: 23833,
                    39877: 23832,
                    39878: 23884,
                    39879: 23890,
                    39880: 23886,
                    39881: 23883,
                    39882: 23916,
                    39883: 23923,
                    39884: 23926,
                    39885: 23943,
                    39886: 23940,
                    39887: 23938,
                    39888: 23970,
                    39889: 23965,
                    39890: 23980,
                    39891: 23982,
                    39892: 23997,
                    39893: 23952,
                    39894: 23991,
                    39895: 23996,
                    39896: 24009,
                    39897: 24013,
                    39898: 24019,
                    39899: 24018,
                    39900: 24022,
                    39901: 24027,
                    39902: 24043,
                    39903: 24050,
                    39904: 24053,
                    39905: 24075,
                    39906: 24090,
                    39907: 24089,
                    39908: 24081,
                    39909: 24091,
                    39910: 24118,
                    39911: 24119,
                    39912: 24132,
                    39913: 24131,
                    39914: 24128,
                    39915: 24142,
                    39916: 24151,
                    39917: 24148,
                    39918: 24159,
                    39919: 24162,
                    39920: 24164,
                    39921: 24135,
                    39922: 24181,
                    39923: 24182,
                    39924: 24186,
                    39925: 40636,
                    39926: 24191,
                    39927: 24224,
                    39928: 24257,
                    39929: 24258,
                    39930: 24264,
                    39931: 24272,
                    39932: 24271,
                    4e4: 24278,
                    40001: 24291,
                    40002: 24285,
                    40003: 24282,
                    40004: 24283,
                    40005: 24290,
                    40006: 24289,
                    40007: 24296,
                    40008: 24297,
                    40009: 24300,
                    40010: 24305,
                    40011: 24307,
                    40012: 24304,
                    40013: 24308,
                    40014: 24312,
                    40015: 24318,
                    40016: 24323,
                    40017: 24329,
                    40018: 24413,
                    40019: 24412,
                    40020: 24331,
                    40021: 24337,
                    40022: 24342,
                    40023: 24361,
                    40024: 24365,
                    40025: 24376,
                    40026: 24385,
                    40027: 24392,
                    40028: 24396,
                    40029: 24398,
                    40030: 24367,
                    40031: 24401,
                    40032: 24406,
                    40033: 24407,
                    40034: 24409,
                    40035: 24417,
                    40036: 24429,
                    40037: 24435,
                    40038: 24439,
                    40039: 24451,
                    40040: 24450,
                    40041: 24447,
                    40042: 24458,
                    40043: 24456,
                    40044: 24465,
                    40045: 24455,
                    40046: 24478,
                    40047: 24473,
                    40048: 24472,
                    40049: 24480,
                    40050: 24488,
                    40051: 24493,
                    40052: 24508,
                    40053: 24534,
                    40054: 24571,
                    40055: 24548,
                    40056: 24568,
                    40057: 24561,
                    40058: 24541,
                    40059: 24755,
                    40060: 24575,
                    40061: 24609,
                    40062: 24672,
                    40064: 24601,
                    40065: 24592,
                    40066: 24617,
                    40067: 24590,
                    40068: 24625,
                    40069: 24603,
                    40070: 24597,
                    40071: 24619,
                    40072: 24614,
                    40073: 24591,
                    40074: 24634,
                    40075: 24666,
                    40076: 24641,
                    40077: 24682,
                    40078: 24695,
                    40079: 24671,
                    40080: 24650,
                    40081: 24646,
                    40082: 24653,
                    40083: 24675,
                    40084: 24643,
                    40085: 24676,
                    40086: 24642,
                    40087: 24684,
                    40088: 24683,
                    40089: 24665,
                    40090: 24705,
                    40091: 24717,
                    40092: 24807,
                    40093: 24707,
                    40094: 24730,
                    40095: 24708,
                    40096: 24731,
                    40097: 24726,
                    40098: 24727,
                    40099: 24722,
                    40100: 24743,
                    40101: 24715,
                    40102: 24801,
                    40103: 24760,
                    40104: 24800,
                    40105: 24787,
                    40106: 24756,
                    40107: 24560,
                    40108: 24765,
                    40109: 24774,
                    40110: 24757,
                    40111: 24792,
                    40112: 24909,
                    40113: 24853,
                    40114: 24838,
                    40115: 24822,
                    40116: 24823,
                    40117: 24832,
                    40118: 24820,
                    40119: 24826,
                    40120: 24835,
                    40121: 24865,
                    40122: 24827,
                    40123: 24817,
                    40124: 24845,
                    40125: 24846,
                    40126: 24903,
                    40127: 24894,
                    40128: 24872,
                    40129: 24871,
                    40130: 24906,
                    40131: 24895,
                    40132: 24892,
                    40133: 24876,
                    40134: 24884,
                    40135: 24893,
                    40136: 24898,
                    40137: 24900,
                    40138: 24947,
                    40139: 24951,
                    40140: 24920,
                    40141: 24921,
                    40142: 24922,
                    40143: 24939,
                    40144: 24948,
                    40145: 24943,
                    40146: 24933,
                    40147: 24945,
                    40148: 24927,
                    40149: 24925,
                    40150: 24915,
                    40151: 24949,
                    40152: 24985,
                    40153: 24982,
                    40154: 24967,
                    40155: 25004,
                    40156: 24980,
                    40157: 24986,
                    40158: 24970,
                    40159: 24977,
                    40160: 25003,
                    40161: 25006,
                    40162: 25036,
                    40163: 25034,
                    40164: 25033,
                    40165: 25079,
                    40166: 25032,
                    40167: 25027,
                    40168: 25030,
                    40169: 25018,
                    40170: 25035,
                    40171: 32633,
                    40172: 25037,
                    40173: 25062,
                    40174: 25059,
                    40175: 25078,
                    40176: 25082,
                    40177: 25076,
                    40178: 25087,
                    40179: 25085,
                    40180: 25084,
                    40181: 25086,
                    40182: 25088,
                    40183: 25096,
                    40184: 25097,
                    40185: 25101,
                    40186: 25100,
                    40187: 25108,
                    40188: 25115,
                    40256: 25118,
                    40257: 25121,
                    40258: 25130,
                    40259: 25134,
                    40260: 25136,
                    40261: 25138,
                    40262: 25139,
                    40263: 25153,
                    40264: 25166,
                    40265: 25182,
                    40266: 25187,
                    40267: 25179,
                    40268: 25184,
                    40269: 25192,
                    40270: 25212,
                    40271: 25218,
                    40272: 25225,
                    40273: 25214,
                    40274: 25234,
                    40275: 25235,
                    40276: 25238,
                    40277: 25300,
                    40278: 25219,
                    40279: 25236,
                    40280: 25303,
                    40281: 25297,
                    40282: 25275,
                    40283: 25295,
                    40284: 25343,
                    40285: 25286,
                    40286: 25812,
                    40287: 25288,
                    40288: 25308,
                    40289: 25292,
                    40290: 25290,
                    40291: 25282,
                    40292: 25287,
                    40293: 25243,
                    40294: 25289,
                    40295: 25356,
                    40296: 25326,
                    40297: 25329,
                    40298: 25383,
                    40299: 25346,
                    40300: 25352,
                    40301: 25327,
                    40302: 25333,
                    40303: 25424,
                    40304: 25406,
                    40305: 25421,
                    40306: 25628,
                    40307: 25423,
                    40308: 25494,
                    40309: 25486,
                    40310: 25472,
                    40311: 25515,
                    40312: 25462,
                    40313: 25507,
                    40314: 25487,
                    40315: 25481,
                    40316: 25503,
                    40317: 25525,
                    40318: 25451,
                    40320: 25449,
                    40321: 25534,
                    40322: 25577,
                    40323: 25536,
                    40324: 25542,
                    40325: 25571,
                    40326: 25545,
                    40327: 25554,
                    40328: 25590,
                    40329: 25540,
                    40330: 25622,
                    40331: 25652,
                    40332: 25606,
                    40333: 25619,
                    40334: 25638,
                    40335: 25654,
                    40336: 25885,
                    40337: 25623,
                    40338: 25640,
                    40339: 25615,
                    40340: 25703,
                    40341: 25711,
                    40342: 25718,
                    40343: 25678,
                    40344: 25898,
                    40345: 25749,
                    40346: 25747,
                    40347: 25765,
                    40348: 25769,
                    40349: 25736,
                    40350: 25788,
                    40351: 25818,
                    40352: 25810,
                    40353: 25797,
                    40354: 25799,
                    40355: 25787,
                    40356: 25816,
                    40357: 25794,
                    40358: 25841,
                    40359: 25831,
                    40360: 33289,
                    40361: 25824,
                    40362: 25825,
                    40363: 25260,
                    40364: 25827,
                    40365: 25839,
                    40366: 25900,
                    40367: 25846,
                    40368: 25844,
                    40369: 25842,
                    40370: 25850,
                    40371: 25856,
                    40372: 25853,
                    40373: 25880,
                    40374: 25884,
                    40375: 25861,
                    40376: 25892,
                    40377: 25891,
                    40378: 25899,
                    40379: 25908,
                    40380: 25909,
                    40381: 25911,
                    40382: 25910,
                    40383: 25912,
                    40384: 30027,
                    40385: 25928,
                    40386: 25942,
                    40387: 25941,
                    40388: 25933,
                    40389: 25944,
                    40390: 25950,
                    40391: 25949,
                    40392: 25970,
                    40393: 25976,
                    40394: 25986,
                    40395: 25987,
                    40396: 35722,
                    40397: 26011,
                    40398: 26015,
                    40399: 26027,
                    40400: 26039,
                    40401: 26051,
                    40402: 26054,
                    40403: 26049,
                    40404: 26052,
                    40405: 26060,
                    40406: 26066,
                    40407: 26075,
                    40408: 26073,
                    40409: 26080,
                    40410: 26081,
                    40411: 26097,
                    40412: 26482,
                    40413: 26122,
                    40414: 26115,
                    40415: 26107,
                    40416: 26483,
                    40417: 26165,
                    40418: 26166,
                    40419: 26164,
                    40420: 26140,
                    40421: 26191,
                    40422: 26180,
                    40423: 26185,
                    40424: 26177,
                    40425: 26206,
                    40426: 26205,
                    40427: 26212,
                    40428: 26215,
                    40429: 26216,
                    40430: 26207,
                    40431: 26210,
                    40432: 26224,
                    40433: 26243,
                    40434: 26248,
                    40435: 26254,
                    40436: 26249,
                    40437: 26244,
                    40438: 26264,
                    40439: 26269,
                    40440: 26305,
                    40441: 26297,
                    40442: 26313,
                    40443: 26302,
                    40444: 26300,
                    40512: 26308,
                    40513: 26296,
                    40514: 26326,
                    40515: 26330,
                    40516: 26336,
                    40517: 26175,
                    40518: 26342,
                    40519: 26345,
                    40520: 26352,
                    40521: 26357,
                    40522: 26359,
                    40523: 26383,
                    40524: 26390,
                    40525: 26398,
                    40526: 26406,
                    40527: 26407,
                    40528: 38712,
                    40529: 26414,
                    40530: 26431,
                    40531: 26422,
                    40532: 26433,
                    40533: 26424,
                    40534: 26423,
                    40535: 26438,
                    40536: 26462,
                    40537: 26464,
                    40538: 26457,
                    40539: 26467,
                    40540: 26468,
                    40541: 26505,
                    40542: 26480,
                    40543: 26537,
                    40544: 26492,
                    40545: 26474,
                    40546: 26508,
                    40547: 26507,
                    40548: 26534,
                    40549: 26529,
                    40550: 26501,
                    40551: 26551,
                    40552: 26607,
                    40553: 26548,
                    40554: 26604,
                    40555: 26547,
                    40556: 26601,
                    40557: 26552,
                    40558: 26596,
                    40559: 26590,
                    40560: 26589,
                    40561: 26594,
                    40562: 26606,
                    40563: 26553,
                    40564: 26574,
                    40565: 26566,
                    40566: 26599,
                    40567: 27292,
                    40568: 26654,
                    40569: 26694,
                    40570: 26665,
                    40571: 26688,
                    40572: 26701,
                    40573: 26674,
                    40574: 26702,
                    40576: 26803,
                    40577: 26667,
                    40578: 26713,
                    40579: 26723,
                    40580: 26743,
                    40581: 26751,
                    40582: 26783,
                    40583: 26767,
                    40584: 26797,
                    40585: 26772,
                    40586: 26781,
                    40587: 26779,
                    40588: 26755,
                    40589: 27310,
                    40590: 26809,
                    40591: 26740,
                    40592: 26805,
                    40593: 26784,
                    40594: 26810,
                    40595: 26895,
                    40596: 26765,
                    40597: 26750,
                    40598: 26881,
                    40599: 26826,
                    40600: 26888,
                    40601: 26840,
                    40602: 26914,
                    40603: 26918,
                    40604: 26849,
                    40605: 26892,
                    40606: 26829,
                    40607: 26836,
                    40608: 26855,
                    40609: 26837,
                    40610: 26934,
                    40611: 26898,
                    40612: 26884,
                    40613: 26839,
                    40614: 26851,
                    40615: 26917,
                    40616: 26873,
                    40617: 26848,
                    40618: 26863,
                    40619: 26920,
                    40620: 26922,
                    40621: 26906,
                    40622: 26915,
                    40623: 26913,
                    40624: 26822,
                    40625: 27001,
                    40626: 26999,
                    40627: 26972,
                    40628: 27e3,
                    40629: 26987,
                    40630: 26964,
                    40631: 27006,
                    40632: 26990,
                    40633: 26937,
                    40634: 26996,
                    40635: 26941,
                    40636: 26969,
                    40637: 26928,
                    40638: 26977,
                    40639: 26974,
                    40640: 26973,
                    40641: 27009,
                    40642: 26986,
                    40643: 27058,
                    40644: 27054,
                    40645: 27088,
                    40646: 27071,
                    40647: 27073,
                    40648: 27091,
                    40649: 27070,
                    40650: 27086,
                    40651: 23528,
                    40652: 27082,
                    40653: 27101,
                    40654: 27067,
                    40655: 27075,
                    40656: 27047,
                    40657: 27182,
                    40658: 27025,
                    40659: 27040,
                    40660: 27036,
                    40661: 27029,
                    40662: 27060,
                    40663: 27102,
                    40664: 27112,
                    40665: 27138,
                    40666: 27163,
                    40667: 27135,
                    40668: 27402,
                    40669: 27129,
                    40670: 27122,
                    40671: 27111,
                    40672: 27141,
                    40673: 27057,
                    40674: 27166,
                    40675: 27117,
                    40676: 27156,
                    40677: 27115,
                    40678: 27146,
                    40679: 27154,
                    40680: 27329,
                    40681: 27171,
                    40682: 27155,
                    40683: 27204,
                    40684: 27148,
                    40685: 27250,
                    40686: 27190,
                    40687: 27256,
                    40688: 27207,
                    40689: 27234,
                    40690: 27225,
                    40691: 27238,
                    40692: 27208,
                    40693: 27192,
                    40694: 27170,
                    40695: 27280,
                    40696: 27277,
                    40697: 27296,
                    40698: 27268,
                    40699: 27298,
                    40700: 27299,
                    40768: 27287,
                    40769: 34327,
                    40770: 27323,
                    40771: 27331,
                    40772: 27330,
                    40773: 27320,
                    40774: 27315,
                    40775: 27308,
                    40776: 27358,
                    40777: 27345,
                    40778: 27359,
                    40779: 27306,
                    40780: 27354,
                    40781: 27370,
                    40782: 27387,
                    40783: 27397,
                    40784: 34326,
                    40785: 27386,
                    40786: 27410,
                    40787: 27414,
                    40788: 39729,
                    40789: 27423,
                    40790: 27448,
                    40791: 27447,
                    40792: 30428,
                    40793: 27449,
                    40794: 39150,
                    40795: 27463,
                    40796: 27459,
                    40797: 27465,
                    40798: 27472,
                    40799: 27481,
                    40800: 27476,
                    40801: 27483,
                    40802: 27487,
                    40803: 27489,
                    40804: 27512,
                    40805: 27513,
                    40806: 27519,
                    40807: 27520,
                    40808: 27524,
                    40809: 27523,
                    40810: 27533,
                    40811: 27544,
                    40812: 27541,
                    40813: 27550,
                    40814: 27556,
                    40815: 27562,
                    40816: 27563,
                    40817: 27567,
                    40818: 27570,
                    40819: 27569,
                    40820: 27571,
                    40821: 27575,
                    40822: 27580,
                    40823: 27590,
                    40824: 27595,
                    40825: 27603,
                    40826: 27615,
                    40827: 27628,
                    40828: 27627,
                    40829: 27635,
                    40830: 27631,
                    40832: 40638,
                    40833: 27656,
                    40834: 27667,
                    40835: 27668,
                    40836: 27675,
                    40837: 27684,
                    40838: 27683,
                    40839: 27742,
                    40840: 27733,
                    40841: 27746,
                    40842: 27754,
                    40843: 27778,
                    40844: 27789,
                    40845: 27802,
                    40846: 27777,
                    40847: 27803,
                    40848: 27774,
                    40849: 27752,
                    40850: 27763,
                    40851: 27794,
                    40852: 27792,
                    40853: 27844,
                    40854: 27889,
                    40855: 27859,
                    40856: 27837,
                    40857: 27863,
                    40858: 27845,
                    40859: 27869,
                    40860: 27822,
                    40861: 27825,
                    40862: 27838,
                    40863: 27834,
                    40864: 27867,
                    40865: 27887,
                    40866: 27865,
                    40867: 27882,
                    40868: 27935,
                    40869: 34893,
                    40870: 27958,
                    40871: 27947,
                    40872: 27965,
                    40873: 27960,
                    40874: 27929,
                    40875: 27957,
                    40876: 27955,
                    40877: 27922,
                    40878: 27916,
                    40879: 28003,
                    40880: 28051,
                    40881: 28004,
                    40882: 27994,
                    40883: 28025,
                    40884: 27993,
                    40885: 28046,
                    40886: 28053,
                    40887: 28644,
                    40888: 28037,
                    40889: 28153,
                    40890: 28181,
                    40891: 28170,
                    40892: 28085,
                    40893: 28103,
                    40894: 28134,
                    40895: 28088,
                    40896: 28102,
                    40897: 28140,
                    40898: 28126,
                    40899: 28108,
                    40900: 28136,
                    40901: 28114,
                    40902: 28101,
                    40903: 28154,
                    40904: 28121,
                    40905: 28132,
                    40906: 28117,
                    40907: 28138,
                    40908: 28142,
                    40909: 28205,
                    40910: 28270,
                    40911: 28206,
                    40912: 28185,
                    40913: 28274,
                    40914: 28255,
                    40915: 28222,
                    40916: 28195,
                    40917: 28267,
                    40918: 28203,
                    40919: 28278,
                    40920: 28237,
                    40921: 28191,
                    40922: 28227,
                    40923: 28218,
                    40924: 28238,
                    40925: 28196,
                    40926: 28415,
                    40927: 28189,
                    40928: 28216,
                    40929: 28290,
                    40930: 28330,
                    40931: 28312,
                    40932: 28361,
                    40933: 28343,
                    40934: 28371,
                    40935: 28349,
                    40936: 28335,
                    40937: 28356,
                    40938: 28338,
                    40939: 28372,
                    40940: 28373,
                    40941: 28303,
                    40942: 28325,
                    40943: 28354,
                    40944: 28319,
                    40945: 28481,
                    40946: 28433,
                    40947: 28748,
                    40948: 28396,
                    40949: 28408,
                    40950: 28414,
                    40951: 28479,
                    40952: 28402,
                    40953: 28465,
                    40954: 28399,
                    40955: 28466,
                    40956: 28364,
                    161: 65377,
                    162: 65378,
                    163: 65379,
                    164: 65380,
                    165: 65381,
                    166: 65382,
                    167: 65383,
                    168: 65384,
                    169: 65385,
                    170: 65386,
                    171: 65387,
                    172: 65388,
                    173: 65389,
                    174: 65390,
                    175: 65391,
                    176: 65392,
                    177: 65393,
                    178: 65394,
                    179: 65395,
                    180: 65396,
                    181: 65397,
                    182: 65398,
                    183: 65399,
                    184: 65400,
                    185: 65401,
                    186: 65402,
                    187: 65403,
                    188: 65404,
                    189: 65405,
                    190: 65406,
                    191: 65407,
                    192: 65408,
                    193: 65409,
                    194: 65410,
                    195: 65411,
                    196: 65412,
                    197: 65413,
                    198: 65414,
                    199: 65415,
                    200: 65416,
                    201: 65417,
                    202: 65418,
                    203: 65419,
                    204: 65420,
                    205: 65421,
                    206: 65422,
                    207: 65423,
                    208: 65424,
                    209: 65425,
                    210: 65426,
                    211: 65427,
                    212: 65428,
                    213: 65429,
                    214: 65430,
                    215: 65431,
                    216: 65432,
                    217: 65433,
                    218: 65434,
                    219: 65435,
                    220: 65436,
                    221: 65437,
                    222: 65438,
                    223: 65439,
                    57408: 28478,
                    57409: 28435,
                    57410: 28407,
                    57411: 28550,
                    57412: 28538,
                    57413: 28536,
                    57414: 28545,
                    57415: 28544,
                    57416: 28527,
                    57417: 28507,
                    57418: 28659,
                    57419: 28525,
                    57420: 28546,
                    57421: 28540,
                    57422: 28504,
                    57423: 28558,
                    57424: 28561,
                    57425: 28610,
                    57426: 28518,
                    57427: 28595,
                    57428: 28579,
                    57429: 28577,
                    57430: 28580,
                    57431: 28601,
                    57432: 28614,
                    57433: 28586,
                    57434: 28639,
                    57435: 28629,
                    57436: 28652,
                    57437: 28628,
                    57438: 28632,
                    57439: 28657,
                    57440: 28654,
                    57441: 28635,
                    57442: 28681,
                    57443: 28683,
                    57444: 28666,
                    57445: 28689,
                    57446: 28673,
                    57447: 28687,
                    57448: 28670,
                    57449: 28699,
                    57450: 28698,
                    57451: 28532,
                    57452: 28701,
                    57453: 28696,
                    57454: 28703,
                    57455: 28720,
                    57456: 28734,
                    57457: 28722,
                    57458: 28753,
                    57459: 28771,
                    57460: 28825,
                    57461: 28818,
                    57462: 28847,
                    57463: 28913,
                    57464: 28844,
                    57465: 28856,
                    57466: 28851,
                    57467: 28846,
                    57468: 28895,
                    57469: 28875,
                    57470: 28893,
                    57472: 28889,
                    57473: 28937,
                    57474: 28925,
                    57475: 28956,
                    57476: 28953,
                    57477: 29029,
                    57478: 29013,
                    57479: 29064,
                    57480: 29030,
                    57481: 29026,
                    57482: 29004,
                    57483: 29014,
                    57484: 29036,
                    57485: 29071,
                    57486: 29179,
                    57487: 29060,
                    57488: 29077,
                    57489: 29096,
                    57490: 29100,
                    57491: 29143,
                    57492: 29113,
                    57493: 29118,
                    57494: 29138,
                    57495: 29129,
                    57496: 29140,
                    57497: 29134,
                    57498: 29152,
                    57499: 29164,
                    57500: 29159,
                    57501: 29173,
                    57502: 29180,
                    57503: 29177,
                    57504: 29183,
                    57505: 29197,
                    57506: 29200,
                    57507: 29211,
                    57508: 29224,
                    57509: 29229,
                    57510: 29228,
                    57511: 29232,
                    57512: 29234,
                    57513: 29243,
                    57514: 29244,
                    57515: 29247,
                    57516: 29248,
                    57517: 29254,
                    57518: 29259,
                    57519: 29272,
                    57520: 29300,
                    57521: 29310,
                    57522: 29314,
                    57523: 29313,
                    57524: 29319,
                    57525: 29330,
                    57526: 29334,
                    57527: 29346,
                    57528: 29351,
                    57529: 29369,
                    57530: 29362,
                    57531: 29379,
                    57532: 29382,
                    57533: 29380,
                    57534: 29390,
                    57535: 29394,
                    57536: 29410,
                    57537: 29408,
                    57538: 29409,
                    57539: 29433,
                    57540: 29431,
                    57541: 20495,
                    57542: 29463,
                    57543: 29450,
                    57544: 29468,
                    57545: 29462,
                    57546: 29469,
                    57547: 29492,
                    57548: 29487,
                    57549: 29481,
                    57550: 29477,
                    57551: 29502,
                    57552: 29518,
                    57553: 29519,
                    57554: 40664,
                    57555: 29527,
                    57556: 29546,
                    57557: 29544,
                    57558: 29552,
                    57559: 29560,
                    57560: 29557,
                    57561: 29563,
                    57562: 29562,
                    57563: 29640,
                    57564: 29619,
                    57565: 29646,
                    57566: 29627,
                    57567: 29632,
                    57568: 29669,
                    57569: 29678,
                    57570: 29662,
                    57571: 29858,
                    57572: 29701,
                    57573: 29807,
                    57574: 29733,
                    57575: 29688,
                    57576: 29746,
                    57577: 29754,
                    57578: 29781,
                    57579: 29759,
                    57580: 29791,
                    57581: 29785,
                    57582: 29761,
                    57583: 29788,
                    57584: 29801,
                    57585: 29808,
                    57586: 29795,
                    57587: 29802,
                    57588: 29814,
                    57589: 29822,
                    57590: 29835,
                    57591: 29854,
                    57592: 29863,
                    57593: 29898,
                    57594: 29903,
                    57595: 29908,
                    57596: 29681,
                    57664: 29920,
                    57665: 29923,
                    57666: 29927,
                    57667: 29929,
                    57668: 29934,
                    57669: 29938,
                    57670: 29936,
                    57671: 29937,
                    57672: 29944,
                    57673: 29943,
                    57674: 29956,
                    57675: 29955,
                    57676: 29957,
                    57677: 29964,
                    57678: 29966,
                    57679: 29965,
                    57680: 29973,
                    57681: 29971,
                    57682: 29982,
                    57683: 29990,
                    57684: 29996,
                    57685: 30012,
                    57686: 30020,
                    57687: 30029,
                    57688: 30026,
                    57689: 30025,
                    57690: 30043,
                    57691: 30022,
                    57692: 30042,
                    57693: 30057,
                    57694: 30052,
                    57695: 30055,
                    57696: 30059,
                    57697: 30061,
                    57698: 30072,
                    57699: 30070,
                    57700: 30086,
                    57701: 30087,
                    57702: 30068,
                    57703: 30090,
                    57704: 30089,
                    57705: 30082,
                    57706: 30100,
                    57707: 30106,
                    57708: 30109,
                    57709: 30117,
                    57710: 30115,
                    57711: 30146,
                    57712: 30131,
                    57713: 30147,
                    57714: 30133,
                    57715: 30141,
                    57716: 30136,
                    57717: 30140,
                    57718: 30129,
                    57719: 30157,
                    57720: 30154,
                    57721: 30162,
                    57722: 30169,
                    57723: 30179,
                    57724: 30174,
                    57725: 30206,
                    57726: 30207,
                    57728: 30204,
                    57729: 30209,
                    57730: 30192,
                    57731: 30202,
                    57732: 30194,
                    57733: 30195,
                    57734: 30219,
                    57735: 30221,
                    57736: 30217,
                    57737: 30239,
                    57738: 30247,
                    57739: 30240,
                    57740: 30241,
                    57741: 30242,
                    57742: 30244,
                    57743: 30260,
                    57744: 30256,
                    57745: 30267,
                    57746: 30279,
                    57747: 30280,
                    57748: 30278,
                    57749: 30300,
                    57750: 30296,
                    57751: 30305,
                    57752: 30306,
                    57753: 30312,
                    57754: 30313,
                    57755: 30314,
                    57756: 30311,
                    57757: 30316,
                    57758: 30320,
                    57759: 30322,
                    57760: 30326,
                    57761: 30328,
                    57762: 30332,
                    57763: 30336,
                    57764: 30339,
                    57765: 30344,
                    57766: 30347,
                    57767: 30350,
                    57768: 30358,
                    57769: 30355,
                    57770: 30361,
                    57771: 30362,
                    57772: 30384,
                    57773: 30388,
                    57774: 30392,
                    57775: 30393,
                    57776: 30394,
                    57777: 30402,
                    57778: 30413,
                    57779: 30422,
                    57780: 30418,
                    57781: 30430,
                    57782: 30433,
                    57783: 30437,
                    57784: 30439,
                    57785: 30442,
                    57786: 34351,
                    57787: 30459,
                    57788: 30472,
                    57789: 30471,
                    57790: 30468,
                    57791: 30505,
                    57792: 30500,
                    57793: 30494,
                    57794: 30501,
                    57795: 30502,
                    57796: 30491,
                    57797: 30519,
                    57798: 30520,
                    57799: 30535,
                    57800: 30554,
                    57801: 30568,
                    57802: 30571,
                    57803: 30555,
                    57804: 30565,
                    57805: 30591,
                    57806: 30590,
                    57807: 30585,
                    57808: 30606,
                    57809: 30603,
                    57810: 30609,
                    57811: 30624,
                    57812: 30622,
                    57813: 30640,
                    57814: 30646,
                    57815: 30649,
                    57816: 30655,
                    57817: 30652,
                    57818: 30653,
                    57819: 30651,
                    57820: 30663,
                    57821: 30669,
                    57822: 30679,
                    57823: 30682,
                    57824: 30684,
                    57825: 30691,
                    57826: 30702,
                    57827: 30716,
                    57828: 30732,
                    57829: 30738,
                    57830: 31014,
                    57831: 30752,
                    57832: 31018,
                    57833: 30789,
                    57834: 30862,
                    57835: 30836,
                    57836: 30854,
                    57837: 30844,
                    57838: 30874,
                    57839: 30860,
                    57840: 30883,
                    57841: 30901,
                    57842: 30890,
                    57843: 30895,
                    57844: 30929,
                    57845: 30918,
                    57846: 30923,
                    57847: 30932,
                    57848: 30910,
                    57849: 30908,
                    57850: 30917,
                    57851: 30922,
                    57852: 30956,
                    57920: 30951,
                    57921: 30938,
                    57922: 30973,
                    57923: 30964,
                    57924: 30983,
                    57925: 30994,
                    57926: 30993,
                    57927: 31001,
                    57928: 31020,
                    57929: 31019,
                    57930: 31040,
                    57931: 31072,
                    57932: 31063,
                    57933: 31071,
                    57934: 31066,
                    57935: 31061,
                    57936: 31059,
                    57937: 31098,
                    57938: 31103,
                    57939: 31114,
                    57940: 31133,
                    57941: 31143,
                    57942: 40779,
                    57943: 31146,
                    57944: 31150,
                    57945: 31155,
                    57946: 31161,
                    57947: 31162,
                    57948: 31177,
                    57949: 31189,
                    57950: 31207,
                    57951: 31212,
                    57952: 31201,
                    57953: 31203,
                    57954: 31240,
                    57955: 31245,
                    57956: 31256,
                    57957: 31257,
                    57958: 31264,
                    57959: 31263,
                    57960: 31104,
                    57961: 31281,
                    57962: 31291,
                    57963: 31294,
                    57964: 31287,
                    57965: 31299,
                    57966: 31319,
                    57967: 31305,
                    57968: 31329,
                    57969: 31330,
                    57970: 31337,
                    57971: 40861,
                    57972: 31344,
                    57973: 31353,
                    57974: 31357,
                    57975: 31368,
                    57976: 31383,
                    57977: 31381,
                    57978: 31384,
                    57979: 31382,
                    57980: 31401,
                    57981: 31432,
                    57982: 31408,
                    57984: 31414,
                    57985: 31429,
                    57986: 31428,
                    57987: 31423,
                    57988: 36995,
                    57989: 31431,
                    57990: 31434,
                    57991: 31437,
                    57992: 31439,
                    57993: 31445,
                    57994: 31443,
                    57995: 31449,
                    57996: 31450,
                    57997: 31453,
                    57998: 31457,
                    57999: 31458,
                    58e3: 31462,
                    58001: 31469,
                    58002: 31472,
                    58003: 31490,
                    58004: 31503,
                    58005: 31498,
                    58006: 31494,
                    58007: 31539,
                    58008: 31512,
                    58009: 31513,
                    58010: 31518,
                    58011: 31541,
                    58012: 31528,
                    58013: 31542,
                    58014: 31568,
                    58015: 31610,
                    58016: 31492,
                    58017: 31565,
                    58018: 31499,
                    58019: 31564,
                    58020: 31557,
                    58021: 31605,
                    58022: 31589,
                    58023: 31604,
                    58024: 31591,
                    58025: 31600,
                    58026: 31601,
                    58027: 31596,
                    58028: 31598,
                    58029: 31645,
                    58030: 31640,
                    58031: 31647,
                    58032: 31629,
                    58033: 31644,
                    58034: 31642,
                    58035: 31627,
                    58036: 31634,
                    58037: 31631,
                    58038: 31581,
                    58039: 31641,
                    58040: 31691,
                    58041: 31681,
                    58042: 31692,
                    58043: 31695,
                    58044: 31668,
                    58045: 31686,
                    58046: 31709,
                    58047: 31721,
                    58048: 31761,
                    58049: 31764,
                    58050: 31718,
                    58051: 31717,
                    58052: 31840,
                    58053: 31744,
                    58054: 31751,
                    58055: 31763,
                    58056: 31731,
                    58057: 31735,
                    58058: 31767,
                    58059: 31757,
                    58060: 31734,
                    58061: 31779,
                    58062: 31783,
                    58063: 31786,
                    58064: 31775,
                    58065: 31799,
                    58066: 31787,
                    58067: 31805,
                    58068: 31820,
                    58069: 31811,
                    58070: 31828,
                    58071: 31823,
                    58072: 31808,
                    58073: 31824,
                    58074: 31832,
                    58075: 31839,
                    58076: 31844,
                    58077: 31830,
                    58078: 31845,
                    58079: 31852,
                    58080: 31861,
                    58081: 31875,
                    58082: 31888,
                    58083: 31908,
                    58084: 31917,
                    58085: 31906,
                    58086: 31915,
                    58087: 31905,
                    58088: 31912,
                    58089: 31923,
                    58090: 31922,
                    58091: 31921,
                    58092: 31918,
                    58093: 31929,
                    58094: 31933,
                    58095: 31936,
                    58096: 31941,
                    58097: 31938,
                    58098: 31960,
                    58099: 31954,
                    58100: 31964,
                    58101: 31970,
                    58102: 39739,
                    58103: 31983,
                    58104: 31986,
                    58105: 31988,
                    58106: 31990,
                    58107: 31994,
                    58108: 32006,
                    58176: 32002,
                    58177: 32028,
                    58178: 32021,
                    58179: 32010,
                    58180: 32069,
                    58181: 32075,
                    58182: 32046,
                    58183: 32050,
                    58184: 32063,
                    58185: 32053,
                    58186: 32070,
                    58187: 32115,
                    58188: 32086,
                    58189: 32078,
                    58190: 32114,
                    58191: 32104,
                    58192: 32110,
                    58193: 32079,
                    58194: 32099,
                    58195: 32147,
                    58196: 32137,
                    58197: 32091,
                    58198: 32143,
                    58199: 32125,
                    58200: 32155,
                    58201: 32186,
                    58202: 32174,
                    58203: 32163,
                    58204: 32181,
                    58205: 32199,
                    58206: 32189,
                    58207: 32171,
                    58208: 32317,
                    58209: 32162,
                    58210: 32175,
                    58211: 32220,
                    58212: 32184,
                    58213: 32159,
                    58214: 32176,
                    58215: 32216,
                    58216: 32221,
                    58217: 32228,
                    58218: 32222,
                    58219: 32251,
                    58220: 32242,
                    58221: 32225,
                    58222: 32261,
                    58223: 32266,
                    58224: 32291,
                    58225: 32289,
                    58226: 32274,
                    58227: 32305,
                    58228: 32287,
                    58229: 32265,
                    58230: 32267,
                    58231: 32290,
                    58232: 32326,
                    58233: 32358,
                    58234: 32315,
                    58235: 32309,
                    58236: 32313,
                    58237: 32323,
                    58238: 32311,
                    58240: 32306,
                    58241: 32314,
                    58242: 32359,
                    58243: 32349,
                    58244: 32342,
                    58245: 32350,
                    58246: 32345,
                    58247: 32346,
                    58248: 32377,
                    58249: 32362,
                    58250: 32361,
                    58251: 32380,
                    58252: 32379,
                    58253: 32387,
                    58254: 32213,
                    58255: 32381,
                    58256: 36782,
                    58257: 32383,
                    58258: 32392,
                    58259: 32393,
                    58260: 32396,
                    58261: 32402,
                    58262: 32400,
                    58263: 32403,
                    58264: 32404,
                    58265: 32406,
                    58266: 32398,
                    58267: 32411,
                    58268: 32412,
                    58269: 32568,
                    58270: 32570,
                    58271: 32581,
                    58272: 32588,
                    58273: 32589,
                    58274: 32590,
                    58275: 32592,
                    58276: 32593,
                    58277: 32597,
                    58278: 32596,
                    58279: 32600,
                    58280: 32607,
                    58281: 32608,
                    58282: 32616,
                    58283: 32617,
                    58284: 32615,
                    58285: 32632,
                    58286: 32642,
                    58287: 32646,
                    58288: 32643,
                    58289: 32648,
                    58290: 32647,
                    58291: 32652,
                    58292: 32660,
                    58293: 32670,
                    58294: 32669,
                    58295: 32666,
                    58296: 32675,
                    58297: 32687,
                    58298: 32690,
                    58299: 32697,
                    58300: 32686,
                    58301: 32694,
                    58302: 32696,
                    58303: 35697,
                    58304: 32709,
                    58305: 32710,
                    58306: 32714,
                    58307: 32725,
                    58308: 32724,
                    58309: 32737,
                    58310: 32742,
                    58311: 32745,
                    58312: 32755,
                    58313: 32761,
                    58314: 39132,
                    58315: 32774,
                    58316: 32772,
                    58317: 32779,
                    58318: 32786,
                    58319: 32792,
                    58320: 32793,
                    58321: 32796,
                    58322: 32801,
                    58323: 32808,
                    58324: 32831,
                    58325: 32827,
                    58326: 32842,
                    58327: 32838,
                    58328: 32850,
                    58329: 32856,
                    58330: 32858,
                    58331: 32863,
                    58332: 32866,
                    58333: 32872,
                    58334: 32883,
                    58335: 32882,
                    58336: 32880,
                    58337: 32886,
                    58338: 32889,
                    58339: 32893,
                    58340: 32895,
                    58341: 32900,
                    58342: 32902,
                    58343: 32901,
                    58344: 32923,
                    58345: 32915,
                    58346: 32922,
                    58347: 32941,
                    58348: 20880,
                    58349: 32940,
                    58350: 32987,
                    58351: 32997,
                    58352: 32985,
                    58353: 32989,
                    58354: 32964,
                    58355: 32986,
                    58356: 32982,
                    58357: 33033,
                    58358: 33007,
                    58359: 33009,
                    58360: 33051,
                    58361: 33065,
                    58362: 33059,
                    58363: 33071,
                    58364: 33099,
                    58432: 38539,
                    58433: 33094,
                    58434: 33086,
                    58435: 33107,
                    58436: 33105,
                    58437: 33020,
                    58438: 33137,
                    58439: 33134,
                    58440: 33125,
                    58441: 33126,
                    58442: 33140,
                    58443: 33155,
                    58444: 33160,
                    58445: 33162,
                    58446: 33152,
                    58447: 33154,
                    58448: 33184,
                    58449: 33173,
                    58450: 33188,
                    58451: 33187,
                    58452: 33119,
                    58453: 33171,
                    58454: 33193,
                    58455: 33200,
                    58456: 33205,
                    58457: 33214,
                    58458: 33208,
                    58459: 33213,
                    58460: 33216,
                    58461: 33218,
                    58462: 33210,
                    58463: 33225,
                    58464: 33229,
                    58465: 33233,
                    58466: 33241,
                    58467: 33240,
                    58468: 33224,
                    58469: 33242,
                    58470: 33247,
                    58471: 33248,
                    58472: 33255,
                    58473: 33274,
                    58474: 33275,
                    58475: 33278,
                    58476: 33281,
                    58477: 33282,
                    58478: 33285,
                    58479: 33287,
                    58480: 33290,
                    58481: 33293,
                    58482: 33296,
                    58483: 33302,
                    58484: 33321,
                    58485: 33323,
                    58486: 33336,
                    58487: 33331,
                    58488: 33344,
                    58489: 33369,
                    58490: 33368,
                    58491: 33373,
                    58492: 33370,
                    58493: 33375,
                    58494: 33380,
                    58496: 33378,
                    58497: 33384,
                    58498: 33386,
                    58499: 33387,
                    58500: 33326,
                    58501: 33393,
                    58502: 33399,
                    58503: 33400,
                    58504: 33406,
                    58505: 33421,
                    58506: 33426,
                    58507: 33451,
                    58508: 33439,
                    58509: 33467,
                    58510: 33452,
                    58511: 33505,
                    58512: 33507,
                    58513: 33503,
                    58514: 33490,
                    58515: 33524,
                    58516: 33523,
                    58517: 33530,
                    58518: 33683,
                    58519: 33539,
                    58520: 33531,
                    58521: 33529,
                    58522: 33502,
                    58523: 33542,
                    58524: 33500,
                    58525: 33545,
                    58526: 33497,
                    58527: 33589,
                    58528: 33588,
                    58529: 33558,
                    58530: 33586,
                    58531: 33585,
                    58532: 33600,
                    58533: 33593,
                    58534: 33616,
                    58535: 33605,
                    58536: 33583,
                    58537: 33579,
                    58538: 33559,
                    58539: 33560,
                    58540: 33669,
                    58541: 33690,
                    58542: 33706,
                    58543: 33695,
                    58544: 33698,
                    58545: 33686,
                    58546: 33571,
                    58547: 33678,
                    58548: 33671,
                    58549: 33674,
                    58550: 33660,
                    58551: 33717,
                    58552: 33651,
                    58553: 33653,
                    58554: 33696,
                    58555: 33673,
                    58556: 33704,
                    58557: 33780,
                    58558: 33811,
                    58559: 33771,
                    58560: 33742,
                    58561: 33789,
                    58562: 33795,
                    58563: 33752,
                    58564: 33803,
                    58565: 33729,
                    58566: 33783,
                    58567: 33799,
                    58568: 33760,
                    58569: 33778,
                    58570: 33805,
                    58571: 33826,
                    58572: 33824,
                    58573: 33725,
                    58574: 33848,
                    58575: 34054,
                    58576: 33787,
                    58577: 33901,
                    58578: 33834,
                    58579: 33852,
                    58580: 34138,
                    58581: 33924,
                    58582: 33911,
                    58583: 33899,
                    58584: 33965,
                    58585: 33902,
                    58586: 33922,
                    58587: 33897,
                    58588: 33862,
                    58589: 33836,
                    58590: 33903,
                    58591: 33913,
                    58592: 33845,
                    58593: 33994,
                    58594: 33890,
                    58595: 33977,
                    58596: 33983,
                    58597: 33951,
                    58598: 34009,
                    58599: 33997,
                    58600: 33979,
                    58601: 34010,
                    58602: 34e3,
                    58603: 33985,
                    58604: 33990,
                    58605: 34006,
                    58606: 33953,
                    58607: 34081,
                    58608: 34047,
                    58609: 34036,
                    58610: 34071,
                    58611: 34072,
                    58612: 34092,
                    58613: 34079,
                    58614: 34069,
                    58615: 34068,
                    58616: 34044,
                    58617: 34112,
                    58618: 34147,
                    58619: 34136,
                    58620: 34120,
                    58688: 34113,
                    58689: 34306,
                    58690: 34123,
                    58691: 34133,
                    58692: 34176,
                    58693: 34212,
                    58694: 34184,
                    58695: 34193,
                    58696: 34186,
                    58697: 34216,
                    58698: 34157,
                    58699: 34196,
                    58700: 34203,
                    58701: 34282,
                    58702: 34183,
                    58703: 34204,
                    58704: 34167,
                    58705: 34174,
                    58706: 34192,
                    58707: 34249,
                    58708: 34234,
                    58709: 34255,
                    58710: 34233,
                    58711: 34256,
                    58712: 34261,
                    58713: 34269,
                    58714: 34277,
                    58715: 34268,
                    58716: 34297,
                    58717: 34314,
                    58718: 34323,
                    58719: 34315,
                    58720: 34302,
                    58721: 34298,
                    58722: 34310,
                    58723: 34338,
                    58724: 34330,
                    58725: 34352,
                    58726: 34367,
                    58727: 34381,
                    58728: 20053,
                    58729: 34388,
                    58730: 34399,
                    58731: 34407,
                    58732: 34417,
                    58733: 34451,
                    58734: 34467,
                    58735: 34473,
                    58736: 34474,
                    58737: 34443,
                    58738: 34444,
                    58739: 34486,
                    58740: 34479,
                    58741: 34500,
                    58742: 34502,
                    58743: 34480,
                    58744: 34505,
                    58745: 34851,
                    58746: 34475,
                    58747: 34516,
                    58748: 34526,
                    58749: 34537,
                    58750: 34540,
                    58752: 34527,
                    58753: 34523,
                    58754: 34543,
                    58755: 34578,
                    58756: 34566,
                    58757: 34568,
                    58758: 34560,
                    58759: 34563,
                    58760: 34555,
                    58761: 34577,
                    58762: 34569,
                    58763: 34573,
                    58764: 34553,
                    58765: 34570,
                    58766: 34612,
                    58767: 34623,
                    58768: 34615,
                    58769: 34619,
                    58770: 34597,
                    58771: 34601,
                    58772: 34586,
                    58773: 34656,
                    58774: 34655,
                    58775: 34680,
                    58776: 34636,
                    58777: 34638,
                    58778: 34676,
                    58779: 34647,
                    58780: 34664,
                    58781: 34670,
                    58782: 34649,
                    58783: 34643,
                    58784: 34659,
                    58785: 34666,
                    58786: 34821,
                    58787: 34722,
                    58788: 34719,
                    58789: 34690,
                    58790: 34735,
                    58791: 34763,
                    58792: 34749,
                    58793: 34752,
                    58794: 34768,
                    58795: 38614,
                    58796: 34731,
                    58797: 34756,
                    58798: 34739,
                    58799: 34759,
                    58800: 34758,
                    58801: 34747,
                    58802: 34799,
                    58803: 34802,
                    58804: 34784,
                    58805: 34831,
                    58806: 34829,
                    58807: 34814,
                    58808: 34806,
                    58809: 34807,
                    58810: 34830,
                    58811: 34770,
                    58812: 34833,
                    58813: 34838,
                    58814: 34837,
                    58815: 34850,
                    58816: 34849,
                    58817: 34865,
                    58818: 34870,
                    58819: 34873,
                    58820: 34855,
                    58821: 34875,
                    58822: 34884,
                    58823: 34882,
                    58824: 34898,
                    58825: 34905,
                    58826: 34910,
                    58827: 34914,
                    58828: 34923,
                    58829: 34945,
                    58830: 34942,
                    58831: 34974,
                    58832: 34933,
                    58833: 34941,
                    58834: 34997,
                    58835: 34930,
                    58836: 34946,
                    58837: 34967,
                    58838: 34962,
                    58839: 34990,
                    58840: 34969,
                    58841: 34978,
                    58842: 34957,
                    58843: 34980,
                    58844: 34992,
                    58845: 35007,
                    58846: 34993,
                    58847: 35011,
                    58848: 35012,
                    58849: 35028,
                    58850: 35032,
                    58851: 35033,
                    58852: 35037,
                    58853: 35065,
                    58854: 35074,
                    58855: 35068,
                    58856: 35060,
                    58857: 35048,
                    58858: 35058,
                    58859: 35076,
                    58860: 35084,
                    58861: 35082,
                    58862: 35091,
                    58863: 35139,
                    58864: 35102,
                    58865: 35109,
                    58866: 35114,
                    58867: 35115,
                    58868: 35137,
                    58869: 35140,
                    58870: 35131,
                    58871: 35126,
                    58872: 35128,
                    58873: 35148,
                    58874: 35101,
                    58875: 35168,
                    58876: 35166,
                    58944: 35174,
                    58945: 35172,
                    58946: 35181,
                    58947: 35178,
                    58948: 35183,
                    58949: 35188,
                    58950: 35191,
                    58951: 35198,
                    58952: 35203,
                    58953: 35208,
                    58954: 35210,
                    58955: 35219,
                    58956: 35224,
                    58957: 35233,
                    58958: 35241,
                    58959: 35238,
                    58960: 35244,
                    58961: 35247,
                    58962: 35250,
                    58963: 35258,
                    58964: 35261,
                    58965: 35263,
                    58966: 35264,
                    58967: 35290,
                    58968: 35292,
                    58969: 35293,
                    58970: 35303,
                    58971: 35316,
                    58972: 35320,
                    58973: 35331,
                    58974: 35350,
                    58975: 35344,
                    58976: 35340,
                    58977: 35355,
                    58978: 35357,
                    58979: 35365,
                    58980: 35382,
                    58981: 35393,
                    58982: 35419,
                    58983: 35410,
                    58984: 35398,
                    58985: 35400,
                    58986: 35452,
                    58987: 35437,
                    58988: 35436,
                    58989: 35426,
                    58990: 35461,
                    58991: 35458,
                    58992: 35460,
                    58993: 35496,
                    58994: 35489,
                    58995: 35473,
                    58996: 35493,
                    58997: 35494,
                    58998: 35482,
                    58999: 35491,
                    59e3: 35524,
                    59001: 35533,
                    59002: 35522,
                    59003: 35546,
                    59004: 35563,
                    59005: 35571,
                    59006: 35559,
                    59008: 35556,
                    59009: 35569,
                    59010: 35604,
                    59011: 35552,
                    59012: 35554,
                    59013: 35575,
                    59014: 35550,
                    59015: 35547,
                    59016: 35596,
                    59017: 35591,
                    59018: 35610,
                    59019: 35553,
                    59020: 35606,
                    59021: 35600,
                    59022: 35607,
                    59023: 35616,
                    59024: 35635,
                    59025: 38827,
                    59026: 35622,
                    59027: 35627,
                    59028: 35646,
                    59029: 35624,
                    59030: 35649,
                    59031: 35660,
                    59032: 35663,
                    59033: 35662,
                    59034: 35657,
                    59035: 35670,
                    59036: 35675,
                    59037: 35674,
                    59038: 35691,
                    59039: 35679,
                    59040: 35692,
                    59041: 35695,
                    59042: 35700,
                    59043: 35709,
                    59044: 35712,
                    59045: 35724,
                    59046: 35726,
                    59047: 35730,
                    59048: 35731,
                    59049: 35734,
                    59050: 35737,
                    59051: 35738,
                    59052: 35898,
                    59053: 35905,
                    59054: 35903,
                    59055: 35912,
                    59056: 35916,
                    59057: 35918,
                    59058: 35920,
                    59059: 35925,
                    59060: 35938,
                    59061: 35948,
                    59062: 35960,
                    59063: 35962,
                    59064: 35970,
                    59065: 35977,
                    59066: 35973,
                    59067: 35978,
                    59068: 35981,
                    59069: 35982,
                    59070: 35988,
                    59071: 35964,
                    59072: 35992,
                    59073: 25117,
                    59074: 36013,
                    59075: 36010,
                    59076: 36029,
                    59077: 36018,
                    59078: 36019,
                    59079: 36014,
                    59080: 36022,
                    59081: 36040,
                    59082: 36033,
                    59083: 36068,
                    59084: 36067,
                    59085: 36058,
                    59086: 36093,
                    59087: 36090,
                    59088: 36091,
                    59089: 36100,
                    59090: 36101,
                    59091: 36106,
                    59092: 36103,
                    59093: 36111,
                    59094: 36109,
                    59095: 36112,
                    59096: 40782,
                    59097: 36115,
                    59098: 36045,
                    59099: 36116,
                    59100: 36118,
                    59101: 36199,
                    59102: 36205,
                    59103: 36209,
                    59104: 36211,
                    59105: 36225,
                    59106: 36249,
                    59107: 36290,
                    59108: 36286,
                    59109: 36282,
                    59110: 36303,
                    59111: 36314,
                    59112: 36310,
                    59113: 36300,
                    59114: 36315,
                    59115: 36299,
                    59116: 36330,
                    59117: 36331,
                    59118: 36319,
                    59119: 36323,
                    59120: 36348,
                    59121: 36360,
                    59122: 36361,
                    59123: 36351,
                    59124: 36381,
                    59125: 36382,
                    59126: 36368,
                    59127: 36383,
                    59128: 36418,
                    59129: 36405,
                    59130: 36400,
                    59131: 36404,
                    59132: 36426,
                    59200: 36423,
                    59201: 36425,
                    59202: 36428,
                    59203: 36432,
                    59204: 36424,
                    59205: 36441,
                    59206: 36452,
                    59207: 36448,
                    59208: 36394,
                    59209: 36451,
                    59210: 36437,
                    59211: 36470,
                    59212: 36466,
                    59213: 36476,
                    59214: 36481,
                    59215: 36487,
                    59216: 36485,
                    59217: 36484,
                    59218: 36491,
                    59219: 36490,
                    59220: 36499,
                    59221: 36497,
                    59222: 36500,
                    59223: 36505,
                    59224: 36522,
                    59225: 36513,
                    59226: 36524,
                    59227: 36528,
                    59228: 36550,
                    59229: 36529,
                    59230: 36542,
                    59231: 36549,
                    59232: 36552,
                    59233: 36555,
                    59234: 36571,
                    59235: 36579,
                    59236: 36604,
                    59237: 36603,
                    59238: 36587,
                    59239: 36606,
                    59240: 36618,
                    59241: 36613,
                    59242: 36629,
                    59243: 36626,
                    59244: 36633,
                    59245: 36627,
                    59246: 36636,
                    59247: 36639,
                    59248: 36635,
                    59249: 36620,
                    59250: 36646,
                    59251: 36659,
                    59252: 36667,
                    59253: 36665,
                    59254: 36677,
                    59255: 36674,
                    59256: 36670,
                    59257: 36684,
                    59258: 36681,
                    59259: 36678,
                    59260: 36686,
                    59261: 36695,
                    59262: 36700,
                    59264: 36706,
                    59265: 36707,
                    59266: 36708,
                    59267: 36764,
                    59268: 36767,
                    59269: 36771,
                    59270: 36781,
                    59271: 36783,
                    59272: 36791,
                    59273: 36826,
                    59274: 36837,
                    59275: 36834,
                    59276: 36842,
                    59277: 36847,
                    59278: 36999,
                    59279: 36852,
                    59280: 36869,
                    59281: 36857,
                    59282: 36858,
                    59283: 36881,
                    59284: 36885,
                    59285: 36897,
                    59286: 36877,
                    59287: 36894,
                    59288: 36886,
                    59289: 36875,
                    59290: 36903,
                    59291: 36918,
                    59292: 36917,
                    59293: 36921,
                    59294: 36856,
                    59295: 36943,
                    59296: 36944,
                    59297: 36945,
                    59298: 36946,
                    59299: 36878,
                    59300: 36937,
                    59301: 36926,
                    59302: 36950,
                    59303: 36952,
                    59304: 36958,
                    59305: 36968,
                    59306: 36975,
                    59307: 36982,
                    59308: 38568,
                    59309: 36978,
                    59310: 36994,
                    59311: 36989,
                    59312: 36993,
                    59313: 36992,
                    59314: 37002,
                    59315: 37001,
                    59316: 37007,
                    59317: 37032,
                    59318: 37039,
                    59319: 37041,
                    59320: 37045,
                    59321: 37090,
                    59322: 37092,
                    59323: 25160,
                    59324: 37083,
                    59325: 37122,
                    59326: 37138,
                    59327: 37145,
                    59328: 37170,
                    59329: 37168,
                    59330: 37194,
                    59331: 37206,
                    59332: 37208,
                    59333: 37219,
                    59334: 37221,
                    59335: 37225,
                    59336: 37235,
                    59337: 37234,
                    59338: 37259,
                    59339: 37257,
                    59340: 37250,
                    59341: 37282,
                    59342: 37291,
                    59343: 37295,
                    59344: 37290,
                    59345: 37301,
                    59346: 37300,
                    59347: 37306,
                    59348: 37312,
                    59349: 37313,
                    59350: 37321,
                    59351: 37323,
                    59352: 37328,
                    59353: 37334,
                    59354: 37343,
                    59355: 37345,
                    59356: 37339,
                    59357: 37372,
                    59358: 37365,
                    59359: 37366,
                    59360: 37406,
                    59361: 37375,
                    59362: 37396,
                    59363: 37420,
                    59364: 37397,
                    59365: 37393,
                    59366: 37470,
                    59367: 37463,
                    59368: 37445,
                    59369: 37449,
                    59370: 37476,
                    59371: 37448,
                    59372: 37525,
                    59373: 37439,
                    59374: 37451,
                    59375: 37456,
                    59376: 37532,
                    59377: 37526,
                    59378: 37523,
                    59379: 37531,
                    59380: 37466,
                    59381: 37583,
                    59382: 37561,
                    59383: 37559,
                    59384: 37609,
                    59385: 37647,
                    59386: 37626,
                    59387: 37700,
                    59388: 37678,
                    59456: 37657,
                    59457: 37666,
                    59458: 37658,
                    59459: 37667,
                    59460: 37690,
                    59461: 37685,
                    59462: 37691,
                    59463: 37724,
                    59464: 37728,
                    59465: 37756,
                    59466: 37742,
                    59467: 37718,
                    59468: 37808,
                    59469: 37804,
                    59470: 37805,
                    59471: 37780,
                    59472: 37817,
                    59473: 37846,
                    59474: 37847,
                    59475: 37864,
                    59476: 37861,
                    59477: 37848,
                    59478: 37827,
                    59479: 37853,
                    59480: 37840,
                    59481: 37832,
                    59482: 37860,
                    59483: 37914,
                    59484: 37908,
                    59485: 37907,
                    59486: 37891,
                    59487: 37895,
                    59488: 37904,
                    59489: 37942,
                    59490: 37931,
                    59491: 37941,
                    59492: 37921,
                    59493: 37946,
                    59494: 37953,
                    59495: 37970,
                    59496: 37956,
                    59497: 37979,
                    59498: 37984,
                    59499: 37986,
                    59500: 37982,
                    59501: 37994,
                    59502: 37417,
                    59503: 38e3,
                    59504: 38005,
                    59505: 38007,
                    59506: 38013,
                    59507: 37978,
                    59508: 38012,
                    59509: 38014,
                    59510: 38017,
                    59511: 38015,
                    59512: 38274,
                    59513: 38279,
                    59514: 38282,
                    59515: 38292,
                    59516: 38294,
                    59517: 38296,
                    59518: 38297,
                    59520: 38304,
                    59521: 38312,
                    59522: 38311,
                    59523: 38317,
                    59524: 38332,
                    59525: 38331,
                    59526: 38329,
                    59527: 38334,
                    59528: 38346,
                    59529: 28662,
                    59530: 38339,
                    59531: 38349,
                    59532: 38348,
                    59533: 38357,
                    59534: 38356,
                    59535: 38358,
                    59536: 38364,
                    59537: 38369,
                    59538: 38373,
                    59539: 38370,
                    59540: 38433,
                    59541: 38440,
                    59542: 38446,
                    59543: 38447,
                    59544: 38466,
                    59545: 38476,
                    59546: 38479,
                    59547: 38475,
                    59548: 38519,
                    59549: 38492,
                    59550: 38494,
                    59551: 38493,
                    59552: 38495,
                    59553: 38502,
                    59554: 38514,
                    59555: 38508,
                    59556: 38541,
                    59557: 38552,
                    59558: 38549,
                    59559: 38551,
                    59560: 38570,
                    59561: 38567,
                    59562: 38577,
                    59563: 38578,
                    59564: 38576,
                    59565: 38580,
                    59566: 38582,
                    59567: 38584,
                    59568: 38585,
                    59569: 38606,
                    59570: 38603,
                    59571: 38601,
                    59572: 38605,
                    59573: 35149,
                    59574: 38620,
                    59575: 38669,
                    59576: 38613,
                    59577: 38649,
                    59578: 38660,
                    59579: 38662,
                    59580: 38664,
                    59581: 38675,
                    59582: 38670,
                    59583: 38673,
                    59584: 38671,
                    59585: 38678,
                    59586: 38681,
                    59587: 38692,
                    59588: 38698,
                    59589: 38704,
                    59590: 38713,
                    59591: 38717,
                    59592: 38718,
                    59593: 38724,
                    59594: 38726,
                    59595: 38728,
                    59596: 38722,
                    59597: 38729,
                    59598: 38748,
                    59599: 38752,
                    59600: 38756,
                    59601: 38758,
                    59602: 38760,
                    59603: 21202,
                    59604: 38763,
                    59605: 38769,
                    59606: 38777,
                    59607: 38789,
                    59608: 38780,
                    59609: 38785,
                    59610: 38778,
                    59611: 38790,
                    59612: 38795,
                    59613: 38799,
                    59614: 38800,
                    59615: 38812,
                    59616: 38824,
                    59617: 38822,
                    59618: 38819,
                    59619: 38835,
                    59620: 38836,
                    59621: 38851,
                    59622: 38854,
                    59623: 38856,
                    59624: 38859,
                    59625: 38876,
                    59626: 38893,
                    59627: 40783,
                    59628: 38898,
                    59629: 31455,
                    59630: 38902,
                    59631: 38901,
                    59632: 38927,
                    59633: 38924,
                    59634: 38968,
                    59635: 38948,
                    59636: 38945,
                    59637: 38967,
                    59638: 38973,
                    59639: 38982,
                    59640: 38991,
                    59641: 38987,
                    59642: 39019,
                    59643: 39023,
                    59644: 39024,
                    59712: 39025,
                    59713: 39028,
                    59714: 39027,
                    59715: 39082,
                    59716: 39087,
                    59717: 39089,
                    59718: 39094,
                    59719: 39108,
                    59720: 39107,
                    59721: 39110,
                    59722: 39145,
                    59723: 39147,
                    59724: 39171,
                    59725: 39177,
                    59726: 39186,
                    59727: 39188,
                    59728: 39192,
                    59729: 39201,
                    59730: 39197,
                    59731: 39198,
                    59732: 39204,
                    59733: 39200,
                    59734: 39212,
                    59735: 39214,
                    59736: 39229,
                    59737: 39230,
                    59738: 39234,
                    59739: 39241,
                    59740: 39237,
                    59741: 39248,
                    59742: 39243,
                    59743: 39249,
                    59744: 39250,
                    59745: 39244,
                    59746: 39253,
                    59747: 39319,
                    59748: 39320,
                    59749: 39333,
                    59750: 39341,
                    59751: 39342,
                    59752: 39356,
                    59753: 39391,
                    59754: 39387,
                    59755: 39389,
                    59756: 39384,
                    59757: 39377,
                    59758: 39405,
                    59759: 39406,
                    59760: 39409,
                    59761: 39410,
                    59762: 39419,
                    59763: 39416,
                    59764: 39425,
                    59765: 39439,
                    59766: 39429,
                    59767: 39394,
                    59768: 39449,
                    59769: 39467,
                    59770: 39479,
                    59771: 39493,
                    59772: 39490,
                    59773: 39488,
                    59774: 39491,
                    59776: 39486,
                    59777: 39509,
                    59778: 39501,
                    59779: 39515,
                    59780: 39511,
                    59781: 39519,
                    59782: 39522,
                    59783: 39525,
                    59784: 39524,
                    59785: 39529,
                    59786: 39531,
                    59787: 39530,
                    59788: 39597,
                    59789: 39600,
                    59790: 39612,
                    59791: 39616,
                    59792: 39631,
                    59793: 39633,
                    59794: 39635,
                    59795: 39636,
                    59796: 39646,
                    59797: 39647,
                    59798: 39650,
                    59799: 39651,
                    59800: 39654,
                    59801: 39663,
                    59802: 39659,
                    59803: 39662,
                    59804: 39668,
                    59805: 39665,
                    59806: 39671,
                    59807: 39675,
                    59808: 39686,
                    59809: 39704,
                    59810: 39706,
                    59811: 39711,
                    59812: 39714,
                    59813: 39715,
                    59814: 39717,
                    59815: 39719,
                    59816: 39720,
                    59817: 39721,
                    59818: 39722,
                    59819: 39726,
                    59820: 39727,
                    59821: 39730,
                    59822: 39748,
                    59823: 39747,
                    59824: 39759,
                    59825: 39757,
                    59826: 39758,
                    59827: 39761,
                    59828: 39768,
                    59829: 39796,
                    59830: 39827,
                    59831: 39811,
                    59832: 39825,
                    59833: 39830,
                    59834: 39831,
                    59835: 39839,
                    59836: 39840,
                    59837: 39848,
                    59838: 39860,
                    59839: 39872,
                    59840: 39882,
                    59841: 39865,
                    59842: 39878,
                    59843: 39887,
                    59844: 39889,
                    59845: 39890,
                    59846: 39907,
                    59847: 39906,
                    59848: 39908,
                    59849: 39892,
                    59850: 39905,
                    59851: 39994,
                    59852: 39922,
                    59853: 39921,
                    59854: 39920,
                    59855: 39957,
                    59856: 39956,
                    59857: 39945,
                    59858: 39955,
                    59859: 39948,
                    59860: 39942,
                    59861: 39944,
                    59862: 39954,
                    59863: 39946,
                    59864: 39940,
                    59865: 39982,
                    59866: 39963,
                    59867: 39973,
                    59868: 39972,
                    59869: 39969,
                    59870: 39984,
                    59871: 40007,
                    59872: 39986,
                    59873: 40006,
                    59874: 39998,
                    59875: 40026,
                    59876: 40032,
                    59877: 40039,
                    59878: 40054,
                    59879: 40056,
                    59880: 40167,
                    59881: 40172,
                    59882: 40176,
                    59883: 40201,
                    59884: 40200,
                    59885: 40171,
                    59886: 40195,
                    59887: 40198,
                    59888: 40234,
                    59889: 40230,
                    59890: 40367,
                    59891: 40227,
                    59892: 40223,
                    59893: 40260,
                    59894: 40213,
                    59895: 40210,
                    59896: 40257,
                    59897: 40255,
                    59898: 40254,
                    59899: 40262,
                    59900: 40264,
                    59968: 40285,
                    59969: 40286,
                    59970: 40292,
                    59971: 40273,
                    59972: 40272,
                    59973: 40281,
                    59974: 40306,
                    59975: 40329,
                    59976: 40327,
                    59977: 40363,
                    59978: 40303,
                    59979: 40314,
                    59980: 40346,
                    59981: 40356,
                    59982: 40361,
                    59983: 40370,
                    59984: 40388,
                    59985: 40385,
                    59986: 40379,
                    59987: 40376,
                    59988: 40378,
                    59989: 40390,
                    59990: 40399,
                    59991: 40386,
                    59992: 40409,
                    59993: 40403,
                    59994: 40440,
                    59995: 40422,
                    59996: 40429,
                    59997: 40431,
                    59998: 40445,
                    59999: 40474,
                    6e4: 40475,
                    60001: 40478,
                    60002: 40565,
                    60003: 40569,
                    60004: 40573,
                    60005: 40577,
                    60006: 40584,
                    60007: 40587,
                    60008: 40588,
                    60009: 40594,
                    60010: 40597,
                    60011: 40593,
                    60012: 40605,
                    60013: 40613,
                    60014: 40617,
                    60015: 40632,
                    60016: 40618,
                    60017: 40621,
                    60018: 38753,
                    60019: 40652,
                    60020: 40654,
                    60021: 40655,
                    60022: 40656,
                    60023: 40660,
                    60024: 40668,
                    60025: 40670,
                    60026: 40669,
                    60027: 40672,
                    60028: 40677,
                    60029: 40680,
                    60030: 40687,
                    60032: 40692,
                    60033: 40694,
                    60034: 40695,
                    60035: 40697,
                    60036: 40699,
                    60037: 40700,
                    60038: 40701,
                    60039: 40711,
                    60040: 40712,
                    60041: 30391,
                    60042: 40725,
                    60043: 40737,
                    60044: 40748,
                    60045: 40766,
                    60046: 40778,
                    60047: 40786,
                    60048: 40788,
                    60049: 40803,
                    60050: 40799,
                    60051: 40800,
                    60052: 40801,
                    60053: 40806,
                    60054: 40807,
                    60055: 40812,
                    60056: 40810,
                    60057: 40823,
                    60058: 40818,
                    60059: 40822,
                    60060: 40853,
                    60061: 40860,
                    60062: 40864,
                    60063: 22575,
                    60064: 27079,
                    60065: 36953,
                    60066: 29796,
                    60067: 20956,
                    60068: 29081,
                  });
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var r = n(1),
                  o = n(2);
                t.decode = function (e, t) {
                  var n = new Uint8ClampedArray(e.length);
                  n.set(e);
                  for (
                    var a = new r.default(285, 256, 0),
                      l = new o.default(a, n),
                      i = new Uint8ClampedArray(t),
                      s = !1,
                      u = 0;
                    u < t;
                    u++
                  ) {
                    var c = l.evaluateAt(a.exp(u + a.generatorBase));
                    (i[i.length - 1 - u] = c), 0 !== c && (s = !0);
                  }
                  if (!s) return n;
                  var d = new o.default(a, i),
                    f = (function (e, t, n, r) {
                      var o;
                      t.degree() < n.degree() &&
                        ((t = (o = [n, t])[0]), (n = o[1]));
                      for (
                        var a = t, l = n, i = e.zero, s = e.one;
                        l.degree() >= r / 2;

                      ) {
                        var u = a,
                          c = i;
                        if (((i = s), (a = l).isZero())) return null;
                        l = u;
                        for (
                          var d = e.zero,
                            f = a.getCoefficient(a.degree()),
                            p = e.inverse(f);
                          l.degree() >= a.degree() && !l.isZero();

                        ) {
                          var h = l.degree() - a.degree(),
                            m = e.multiply(l.getCoefficient(l.degree()), p);
                          (d = d.addOrSubtract(e.buildMonomial(h, m))),
                            (l = l.addOrSubtract(a.multiplyByMonomial(h, m)));
                        }
                        if (
                          ((s = d.multiplyPoly(i).addOrSubtract(c)),
                          l.degree() >= a.degree())
                        )
                          return null;
                      }
                      var g = s.getCoefficient(0);
                      if (0 === g) return null;
                      var v = e.inverse(g);
                      return [s.multiply(v), l.multiply(v)];
                    })(a, a.buildMonomial(t, 1), d, t);
                  if (null === f) return null;
                  var p = (function (e, t) {
                    var n = t.degree();
                    if (1 === n) return [t.getCoefficient(1)];
                    for (
                      var r = new Array(n), o = 0, a = 1;
                      a < e.size && o < n;
                      a++
                    )
                      0 === t.evaluateAt(a) && ((r[o] = e.inverse(a)), o++);
                    return o !== n ? null : r;
                  })(a, f[0]);
                  if (null == p) return null;
                  for (
                    var h = (function (e, t, n) {
                        for (
                          var o = n.length, a = new Array(o), l = 0;
                          l < o;
                          l++
                        ) {
                          for (
                            var i = e.inverse(n[l]), s = 1, u = 0;
                            u < o;
                            u++
                          )
                            l !== u &&
                              (s = e.multiply(
                                s,
                                r.addOrSubtractGF(1, e.multiply(n[u], i))
                              ));
                          (a[l] = e.multiply(t.evaluateAt(i), e.inverse(s))),
                            0 !== e.generatorBase &&
                              (a[l] = e.multiply(a[l], i));
                        }
                        return a;
                      })(a, f[1], p),
                      m = 0;
                    m < p.length;
                    m++
                  ) {
                    var g = n.length - 1 - a.log(p[m]);
                    if (g < 0) return null;
                    n[g] = r.addOrSubtractGF(n[g], h[m]);
                  }
                  return n;
                };
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 }),
                  (t.VERSIONS = [
                    {
                      infoBits: null,
                      versionNumber: 1,
                      alignmentPatternCenters: [],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 7,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 19 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 10,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 16 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 13,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 13 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 17,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 9 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: null,
                      versionNumber: 2,
                      alignmentPatternCenters: [6, 18],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 10,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 34 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 16,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 28 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 22,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 22 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: null,
                      versionNumber: 3,
                      alignmentPatternCenters: [6, 22],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 15,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 55 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 44 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 18,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 17 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 22,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 13 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: null,
                      versionNumber: 4,
                      alignmentPatternCenters: [6, 26],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 20,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 80 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 18,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 32 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 24 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 16,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 9 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: null,
                      versionNumber: 5,
                      alignmentPatternCenters: [6, 30],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 108 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 43 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 18,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 15 },
                            { numBlocks: 2, dataCodewordsPerBlock: 16 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 22,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 11 },
                            { numBlocks: 2, dataCodewordsPerBlock: 12 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: null,
                      versionNumber: 6,
                      alignmentPatternCenters: [6, 34],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 18,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 68 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 16,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 27 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 19 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 15 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 31892,
                      versionNumber: 7,
                      alignmentPatternCenters: [6, 22, 38],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 20,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 78 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 18,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 31 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 18,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 14 },
                            { numBlocks: 4, dataCodewordsPerBlock: 15 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 13 },
                            { numBlocks: 1, dataCodewordsPerBlock: 14 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 34236,
                      versionNumber: 8,
                      alignmentPatternCenters: [6, 24, 42],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 97 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 22,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 38 },
                            { numBlocks: 2, dataCodewordsPerBlock: 39 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 22,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 18 },
                            { numBlocks: 2, dataCodewordsPerBlock: 19 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 14 },
                            { numBlocks: 2, dataCodewordsPerBlock: 15 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 39577,
                      versionNumber: 9,
                      alignmentPatternCenters: [6, 26, 46],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 116 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 22,
                          ecBlocks: [
                            { numBlocks: 3, dataCodewordsPerBlock: 36 },
                            { numBlocks: 2, dataCodewordsPerBlock: 37 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 20,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 16 },
                            { numBlocks: 4, dataCodewordsPerBlock: 17 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 12 },
                            { numBlocks: 4, dataCodewordsPerBlock: 13 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 42195,
                      versionNumber: 10,
                      alignmentPatternCenters: [6, 28, 50],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 18,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 68 },
                            { numBlocks: 2, dataCodewordsPerBlock: 69 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 43 },
                            { numBlocks: 1, dataCodewordsPerBlock: 44 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 6, dataCodewordsPerBlock: 19 },
                            { numBlocks: 2, dataCodewordsPerBlock: 20 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 6, dataCodewordsPerBlock: 15 },
                            { numBlocks: 2, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 48118,
                      versionNumber: 11,
                      alignmentPatternCenters: [6, 30, 54],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 20,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 81 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 50 },
                            { numBlocks: 4, dataCodewordsPerBlock: 51 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 22 },
                            { numBlocks: 4, dataCodewordsPerBlock: 23 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 3, dataCodewordsPerBlock: 12 },
                            { numBlocks: 8, dataCodewordsPerBlock: 13 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 51042,
                      versionNumber: 12,
                      alignmentPatternCenters: [6, 32, 58],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 92 },
                            { numBlocks: 2, dataCodewordsPerBlock: 93 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 22,
                          ecBlocks: [
                            { numBlocks: 6, dataCodewordsPerBlock: 36 },
                            { numBlocks: 2, dataCodewordsPerBlock: 37 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 20 },
                            { numBlocks: 6, dataCodewordsPerBlock: 21 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 7, dataCodewordsPerBlock: 14 },
                            { numBlocks: 4, dataCodewordsPerBlock: 15 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 55367,
                      versionNumber: 13,
                      alignmentPatternCenters: [6, 34, 62],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 107 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 22,
                          ecBlocks: [
                            { numBlocks: 8, dataCodewordsPerBlock: 37 },
                            { numBlocks: 1, dataCodewordsPerBlock: 38 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 8, dataCodewordsPerBlock: 20 },
                            { numBlocks: 4, dataCodewordsPerBlock: 21 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 22,
                          ecBlocks: [
                            { numBlocks: 12, dataCodewordsPerBlock: 11 },
                            { numBlocks: 4, dataCodewordsPerBlock: 12 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 58893,
                      versionNumber: 14,
                      alignmentPatternCenters: [6, 26, 46, 66],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 3, dataCodewordsPerBlock: 115 },
                            { numBlocks: 1, dataCodewordsPerBlock: 116 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 40 },
                            { numBlocks: 5, dataCodewordsPerBlock: 41 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 20,
                          ecBlocks: [
                            { numBlocks: 11, dataCodewordsPerBlock: 16 },
                            { numBlocks: 5, dataCodewordsPerBlock: 17 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 11, dataCodewordsPerBlock: 12 },
                            { numBlocks: 5, dataCodewordsPerBlock: 13 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 63784,
                      versionNumber: 15,
                      alignmentPatternCenters: [6, 26, 48, 70],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 22,
                          ecBlocks: [
                            { numBlocks: 5, dataCodewordsPerBlock: 87 },
                            { numBlocks: 1, dataCodewordsPerBlock: 88 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 5, dataCodewordsPerBlock: 41 },
                            { numBlocks: 5, dataCodewordsPerBlock: 42 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 5, dataCodewordsPerBlock: 24 },
                            { numBlocks: 7, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 11, dataCodewordsPerBlock: 12 },
                            { numBlocks: 7, dataCodewordsPerBlock: 13 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 68472,
                      versionNumber: 16,
                      alignmentPatternCenters: [6, 26, 50, 74],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 5, dataCodewordsPerBlock: 98 },
                            { numBlocks: 1, dataCodewordsPerBlock: 99 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 7, dataCodewordsPerBlock: 45 },
                            { numBlocks: 3, dataCodewordsPerBlock: 46 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 15, dataCodewordsPerBlock: 19 },
                            { numBlocks: 2, dataCodewordsPerBlock: 20 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 3, dataCodewordsPerBlock: 15 },
                            { numBlocks: 13, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 70749,
                      versionNumber: 17,
                      alignmentPatternCenters: [6, 30, 54, 78],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 107 },
                            { numBlocks: 5, dataCodewordsPerBlock: 108 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 10, dataCodewordsPerBlock: 46 },
                            { numBlocks: 1, dataCodewordsPerBlock: 47 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 22 },
                            { numBlocks: 15, dataCodewordsPerBlock: 23 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 14 },
                            { numBlocks: 17, dataCodewordsPerBlock: 15 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 76311,
                      versionNumber: 18,
                      alignmentPatternCenters: [6, 30, 56, 82],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 5, dataCodewordsPerBlock: 120 },
                            { numBlocks: 1, dataCodewordsPerBlock: 121 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 9, dataCodewordsPerBlock: 43 },
                            { numBlocks: 4, dataCodewordsPerBlock: 44 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 17, dataCodewordsPerBlock: 22 },
                            { numBlocks: 1, dataCodewordsPerBlock: 23 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 14 },
                            { numBlocks: 19, dataCodewordsPerBlock: 15 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 79154,
                      versionNumber: 19,
                      alignmentPatternCenters: [6, 30, 58, 86],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 3, dataCodewordsPerBlock: 113 },
                            { numBlocks: 4, dataCodewordsPerBlock: 114 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 3, dataCodewordsPerBlock: 44 },
                            { numBlocks: 11, dataCodewordsPerBlock: 45 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 17, dataCodewordsPerBlock: 21 },
                            { numBlocks: 4, dataCodewordsPerBlock: 22 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 9, dataCodewordsPerBlock: 13 },
                            { numBlocks: 16, dataCodewordsPerBlock: 14 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 84390,
                      versionNumber: 20,
                      alignmentPatternCenters: [6, 34, 62, 90],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 3, dataCodewordsPerBlock: 107 },
                            { numBlocks: 5, dataCodewordsPerBlock: 108 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 3, dataCodewordsPerBlock: 41 },
                            { numBlocks: 13, dataCodewordsPerBlock: 42 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 15, dataCodewordsPerBlock: 24 },
                            { numBlocks: 5, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 15, dataCodewordsPerBlock: 15 },
                            { numBlocks: 10, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 87683,
                      versionNumber: 21,
                      alignmentPatternCenters: [6, 28, 50, 72, 94],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 116 },
                            { numBlocks: 4, dataCodewordsPerBlock: 117 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 17, dataCodewordsPerBlock: 42 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 17, dataCodewordsPerBlock: 22 },
                            { numBlocks: 6, dataCodewordsPerBlock: 23 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 19, dataCodewordsPerBlock: 16 },
                            { numBlocks: 6, dataCodewordsPerBlock: 17 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 92361,
                      versionNumber: 22,
                      alignmentPatternCenters: [6, 26, 50, 74, 98],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 111 },
                            { numBlocks: 7, dataCodewordsPerBlock: 112 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 17, dataCodewordsPerBlock: 46 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 7, dataCodewordsPerBlock: 24 },
                            { numBlocks: 16, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 24,
                          ecBlocks: [
                            { numBlocks: 34, dataCodewordsPerBlock: 13 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 96236,
                      versionNumber: 23,
                      alignmentPatternCenters: [6, 30, 54, 74, 102],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 121 },
                            { numBlocks: 5, dataCodewordsPerBlock: 122 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 47 },
                            { numBlocks: 14, dataCodewordsPerBlock: 48 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 11, dataCodewordsPerBlock: 24 },
                            { numBlocks: 14, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 16, dataCodewordsPerBlock: 15 },
                            { numBlocks: 14, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 102084,
                      versionNumber: 24,
                      alignmentPatternCenters: [6, 28, 54, 80, 106],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 6, dataCodewordsPerBlock: 117 },
                            { numBlocks: 4, dataCodewordsPerBlock: 118 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 6, dataCodewordsPerBlock: 45 },
                            { numBlocks: 14, dataCodewordsPerBlock: 46 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 11, dataCodewordsPerBlock: 24 },
                            { numBlocks: 16, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 30, dataCodewordsPerBlock: 16 },
                            { numBlocks: 2, dataCodewordsPerBlock: 17 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 102881,
                      versionNumber: 25,
                      alignmentPatternCenters: [6, 32, 58, 84, 110],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 26,
                          ecBlocks: [
                            { numBlocks: 8, dataCodewordsPerBlock: 106 },
                            { numBlocks: 4, dataCodewordsPerBlock: 107 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 8, dataCodewordsPerBlock: 47 },
                            { numBlocks: 13, dataCodewordsPerBlock: 48 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 7, dataCodewordsPerBlock: 24 },
                            { numBlocks: 22, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 22, dataCodewordsPerBlock: 15 },
                            { numBlocks: 13, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 110507,
                      versionNumber: 26,
                      alignmentPatternCenters: [6, 30, 58, 86, 114],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 10, dataCodewordsPerBlock: 114 },
                            { numBlocks: 2, dataCodewordsPerBlock: 115 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 19, dataCodewordsPerBlock: 46 },
                            { numBlocks: 4, dataCodewordsPerBlock: 47 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 28, dataCodewordsPerBlock: 22 },
                            { numBlocks: 6, dataCodewordsPerBlock: 23 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 33, dataCodewordsPerBlock: 16 },
                            { numBlocks: 4, dataCodewordsPerBlock: 17 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 110734,
                      versionNumber: 27,
                      alignmentPatternCenters: [6, 34, 62, 90, 118],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 8, dataCodewordsPerBlock: 122 },
                            { numBlocks: 4, dataCodewordsPerBlock: 123 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 22, dataCodewordsPerBlock: 45 },
                            { numBlocks: 3, dataCodewordsPerBlock: 46 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 8, dataCodewordsPerBlock: 23 },
                            { numBlocks: 26, dataCodewordsPerBlock: 24 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 12, dataCodewordsPerBlock: 15 },
                            { numBlocks: 28, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 117786,
                      versionNumber: 28,
                      alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 3, dataCodewordsPerBlock: 117 },
                            { numBlocks: 10, dataCodewordsPerBlock: 118 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 3, dataCodewordsPerBlock: 45 },
                            { numBlocks: 23, dataCodewordsPerBlock: 46 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 24 },
                            { numBlocks: 31, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 11, dataCodewordsPerBlock: 15 },
                            { numBlocks: 31, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 119615,
                      versionNumber: 29,
                      alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 7, dataCodewordsPerBlock: 116 },
                            { numBlocks: 7, dataCodewordsPerBlock: 117 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 21, dataCodewordsPerBlock: 45 },
                            { numBlocks: 7, dataCodewordsPerBlock: 46 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 1, dataCodewordsPerBlock: 23 },
                            { numBlocks: 37, dataCodewordsPerBlock: 24 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 19, dataCodewordsPerBlock: 15 },
                            { numBlocks: 26, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 126325,
                      versionNumber: 30,
                      alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 5, dataCodewordsPerBlock: 115 },
                            { numBlocks: 10, dataCodewordsPerBlock: 116 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 19, dataCodewordsPerBlock: 47 },
                            { numBlocks: 10, dataCodewordsPerBlock: 48 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 15, dataCodewordsPerBlock: 24 },
                            { numBlocks: 25, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 23, dataCodewordsPerBlock: 15 },
                            { numBlocks: 25, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 127568,
                      versionNumber: 31,
                      alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 13, dataCodewordsPerBlock: 115 },
                            { numBlocks: 3, dataCodewordsPerBlock: 116 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 46 },
                            { numBlocks: 29, dataCodewordsPerBlock: 47 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 42, dataCodewordsPerBlock: 24 },
                            { numBlocks: 1, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 23, dataCodewordsPerBlock: 15 },
                            { numBlocks: 28, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 133589,
                      versionNumber: 32,
                      alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 17, dataCodewordsPerBlock: 115 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 10, dataCodewordsPerBlock: 46 },
                            { numBlocks: 23, dataCodewordsPerBlock: 47 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 10, dataCodewordsPerBlock: 24 },
                            { numBlocks: 35, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 19, dataCodewordsPerBlock: 15 },
                            { numBlocks: 35, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 136944,
                      versionNumber: 33,
                      alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 17, dataCodewordsPerBlock: 115 },
                            { numBlocks: 1, dataCodewordsPerBlock: 116 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 14, dataCodewordsPerBlock: 46 },
                            { numBlocks: 21, dataCodewordsPerBlock: 47 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 29, dataCodewordsPerBlock: 24 },
                            { numBlocks: 19, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 11, dataCodewordsPerBlock: 15 },
                            { numBlocks: 46, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 141498,
                      versionNumber: 34,
                      alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 13, dataCodewordsPerBlock: 115 },
                            { numBlocks: 6, dataCodewordsPerBlock: 116 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 14, dataCodewordsPerBlock: 46 },
                            { numBlocks: 23, dataCodewordsPerBlock: 47 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 44, dataCodewordsPerBlock: 24 },
                            { numBlocks: 7, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 59, dataCodewordsPerBlock: 16 },
                            { numBlocks: 1, dataCodewordsPerBlock: 17 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 145311,
                      versionNumber: 35,
                      alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 12, dataCodewordsPerBlock: 121 },
                            { numBlocks: 7, dataCodewordsPerBlock: 122 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 12, dataCodewordsPerBlock: 47 },
                            { numBlocks: 26, dataCodewordsPerBlock: 48 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 39, dataCodewordsPerBlock: 24 },
                            { numBlocks: 14, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 22, dataCodewordsPerBlock: 15 },
                            { numBlocks: 41, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 150283,
                      versionNumber: 36,
                      alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 6, dataCodewordsPerBlock: 121 },
                            { numBlocks: 14, dataCodewordsPerBlock: 122 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 6, dataCodewordsPerBlock: 47 },
                            { numBlocks: 34, dataCodewordsPerBlock: 48 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 46, dataCodewordsPerBlock: 24 },
                            { numBlocks: 10, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 2, dataCodewordsPerBlock: 15 },
                            { numBlocks: 64, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 152622,
                      versionNumber: 37,
                      alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 17, dataCodewordsPerBlock: 122 },
                            { numBlocks: 4, dataCodewordsPerBlock: 123 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 29, dataCodewordsPerBlock: 46 },
                            { numBlocks: 14, dataCodewordsPerBlock: 47 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 49, dataCodewordsPerBlock: 24 },
                            { numBlocks: 10, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 24, dataCodewordsPerBlock: 15 },
                            { numBlocks: 46, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 158308,
                      versionNumber: 38,
                      alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 4, dataCodewordsPerBlock: 122 },
                            { numBlocks: 18, dataCodewordsPerBlock: 123 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 13, dataCodewordsPerBlock: 46 },
                            { numBlocks: 32, dataCodewordsPerBlock: 47 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 48, dataCodewordsPerBlock: 24 },
                            { numBlocks: 14, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 42, dataCodewordsPerBlock: 15 },
                            { numBlocks: 32, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 161089,
                      versionNumber: 39,
                      alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 20, dataCodewordsPerBlock: 117 },
                            { numBlocks: 4, dataCodewordsPerBlock: 118 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 40, dataCodewordsPerBlock: 47 },
                            { numBlocks: 7, dataCodewordsPerBlock: 48 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 43, dataCodewordsPerBlock: 24 },
                            { numBlocks: 22, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 10, dataCodewordsPerBlock: 15 },
                            { numBlocks: 67, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                    {
                      infoBits: 167017,
                      versionNumber: 40,
                      alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
                      errorCorrectionLevels: [
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 19, dataCodewordsPerBlock: 118 },
                            { numBlocks: 6, dataCodewordsPerBlock: 119 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 28,
                          ecBlocks: [
                            { numBlocks: 18, dataCodewordsPerBlock: 47 },
                            { numBlocks: 31, dataCodewordsPerBlock: 48 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 34, dataCodewordsPerBlock: 24 },
                            { numBlocks: 34, dataCodewordsPerBlock: 25 },
                          ],
                        },
                        {
                          ecCodewordsPerBlock: 30,
                          ecBlocks: [
                            { numBlocks: 20, dataCodewordsPerBlock: 15 },
                            { numBlocks: 61, dataCodewordsPerBlock: 16 },
                          ],
                        },
                      ],
                    },
                  ]);
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var r = n(0);
                function o(e, t, n, r) {
                  var o = e.x - t.x + n.x - r.x,
                    a = e.y - t.y + n.y - r.y;
                  if (0 === o && 0 === a)
                    return {
                      a11: t.x - e.x,
                      a12: t.y - e.y,
                      a13: 0,
                      a21: n.x - t.x,
                      a22: n.y - t.y,
                      a23: 0,
                      a31: e.x,
                      a32: e.y,
                      a33: 1,
                    };
                  var l = t.x - n.x,
                    i = r.x - n.x,
                    s = t.y - n.y,
                    u = r.y - n.y,
                    c = l * u - i * s,
                    d = (o * u - i * a) / c,
                    f = (l * a - o * s) / c;
                  return {
                    a11: t.x - e.x + d * t.x,
                    a12: t.y - e.y + d * t.y,
                    a13: d,
                    a21: r.x - e.x + f * r.x,
                    a22: r.y - e.y + f * r.y,
                    a23: f,
                    a31: e.x,
                    a32: e.y,
                    a33: 1,
                  };
                }
                t.extract = function (e, t) {
                  for (
                    var n,
                      a,
                      l = (function (e, t, n, r) {
                        var a = o(e, t, n, r);
                        return {
                          a11: a.a22 * a.a33 - a.a23 * a.a32,
                          a12: a.a13 * a.a32 - a.a12 * a.a33,
                          a13: a.a12 * a.a23 - a.a13 * a.a22,
                          a21: a.a23 * a.a31 - a.a21 * a.a33,
                          a22: a.a11 * a.a33 - a.a13 * a.a31,
                          a23: a.a13 * a.a21 - a.a11 * a.a23,
                          a31: a.a21 * a.a32 - a.a22 * a.a31,
                          a32: a.a12 * a.a31 - a.a11 * a.a32,
                          a33: a.a11 * a.a22 - a.a12 * a.a21,
                        };
                      })(
                        { x: 3.5, y: 3.5 },
                        { x: t.dimension - 3.5, y: 3.5 },
                        { x: t.dimension - 6.5, y: t.dimension - 6.5 },
                        { x: 3.5, y: t.dimension - 3.5 }
                      ),
                      i = o(
                        t.topLeft,
                        t.topRight,
                        t.alignmentPattern,
                        t.bottomLeft
                      ),
                      s =
                        ((a = l),
                        {
                          a11:
                            (n = i).a11 * a.a11 + n.a21 * a.a12 + n.a31 * a.a13,
                          a12: n.a12 * a.a11 + n.a22 * a.a12 + n.a32 * a.a13,
                          a13: n.a13 * a.a11 + n.a23 * a.a12 + n.a33 * a.a13,
                          a21: n.a11 * a.a21 + n.a21 * a.a22 + n.a31 * a.a23,
                          a22: n.a12 * a.a21 + n.a22 * a.a22 + n.a32 * a.a23,
                          a23: n.a13 * a.a21 + n.a23 * a.a22 + n.a33 * a.a23,
                          a31: n.a11 * a.a31 + n.a21 * a.a32 + n.a31 * a.a33,
                          a32: n.a12 * a.a31 + n.a22 * a.a32 + n.a32 * a.a33,
                          a33: n.a13 * a.a31 + n.a23 * a.a32 + n.a33 * a.a33,
                        }),
                      u = r.BitMatrix.createEmpty(t.dimension, t.dimension),
                      c = function (e, t) {
                        var n = s.a13 * e + s.a23 * t + s.a33;
                        return {
                          x: (s.a11 * e + s.a21 * t + s.a31) / n,
                          y: (s.a12 * e + s.a22 * t + s.a32) / n,
                        };
                      },
                      d = 0;
                    d < t.dimension;
                    d++
                  )
                    for (var f = 0; f < t.dimension; f++) {
                      var p = c(f + 0.5, d + 0.5);
                      u.set(f, d, e.get(Math.floor(p.x), Math.floor(p.y)));
                    }
                  return { matrix: u, mappingFunction: c };
                };
              },
              function (e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var r = function (e, t) {
                  return Math.sqrt(
                    Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)
                  );
                };
                function o(e) {
                  return e.reduce(function (e, t) {
                    return e + t;
                  });
                }
                function a(e, t, n, o) {
                  var a,
                    l,
                    i,
                    s,
                    u = [{ x: Math.floor(e.x), y: Math.floor(e.y) }],
                    c = Math.abs(t.y - e.y) > Math.abs(t.x - e.x);
                  c
                    ? ((a = Math.floor(e.y)),
                      (l = Math.floor(e.x)),
                      (i = Math.floor(t.y)),
                      (s = Math.floor(t.x)))
                    : ((a = Math.floor(e.x)),
                      (l = Math.floor(e.y)),
                      (i = Math.floor(t.x)),
                      (s = Math.floor(t.y)));
                  for (
                    var d = Math.abs(i - a),
                      f = Math.abs(s - l),
                      p = Math.floor(-d / 2),
                      h = a < i ? 1 : -1,
                      m = l < s ? 1 : -1,
                      g = !0,
                      v = a,
                      k = l;
                    v !== i + h;
                    v += h
                  ) {
                    var y = c ? k : v,
                      w = c ? v : k;
                    if (
                      n.get(y, w) !== g &&
                      ((g = !g), u.push({ x: y, y: w }), u.length === o + 1)
                    )
                      break;
                    if ((p += f) > 0) {
                      if (k === s) break;
                      (k += m), (p -= d);
                    }
                  }
                  for (var b = [], B = 0; B < o; B++)
                    u[B] && u[B + 1] ? b.push(r(u[B], u[B + 1])) : b.push(0);
                  return b;
                }
                function l(e, t, n, r) {
                  var o,
                    l = t.y - e.y,
                    i = t.x - e.x,
                    s = a(e, t, n, Math.ceil(r / 2)),
                    u = a(e, { x: e.x - i, y: e.y - l }, n, Math.ceil(r / 2)),
                    c = s.shift() + u.shift() - 1;
                  return (o = u.concat(c)).concat.apply(o, s);
                }
                function i(e, t) {
                  var n = o(e) / o(t),
                    r = 0;
                  return (
                    t.forEach(function (t, o) {
                      r += Math.pow(e[o] - t * n, 2);
                    }),
                    { averageSize: n, error: r }
                  );
                }
                function s(e, t, n) {
                  try {
                    var r = l(e, { x: -1, y: e.y }, n, t.length),
                      o = l(e, { x: e.x, y: -1 }, n, t.length),
                      a = l(
                        e,
                        {
                          x: Math.max(0, e.x - e.y) - 1,
                          y: Math.max(0, e.y - e.x) - 1,
                        },
                        n,
                        t.length
                      ),
                      s = l(
                        e,
                        {
                          x: Math.min(n.width, e.x + e.y) + 1,
                          y: Math.min(n.height, e.y + e.x) + 1,
                        },
                        n,
                        t.length
                      ),
                      u = i(r, t),
                      c = i(o, t),
                      d = i(a, t),
                      f = i(s, t),
                      p = Math.sqrt(
                        u.error * u.error +
                          c.error * c.error +
                          d.error * d.error +
                          f.error * f.error
                      ),
                      h =
                        (u.averageSize +
                          c.averageSize +
                          d.averageSize +
                          f.averageSize) /
                        4;
                    return (
                      p +
                      (Math.pow(u.averageSize - h, 2) +
                        Math.pow(c.averageSize - h, 2) +
                        Math.pow(d.averageSize - h, 2) +
                        Math.pow(f.averageSize - h, 2)) /
                        h
                    );
                  } catch (m) {
                    return 1 / 0;
                  }
                }
                function u(e, t) {
                  for (var n = Math.round(t.x); e.get(n, Math.round(t.y)); )
                    n--;
                  for (var r = Math.round(t.x); e.get(r, Math.round(t.y)); )
                    r++;
                  for (
                    var o = (n + r) / 2, a = Math.round(t.y);
                    e.get(Math.round(o), a);

                  )
                    a--;
                  for (var l = Math.round(t.y); e.get(Math.round(o), l); ) l++;
                  return { x: o, y: (a + l) / 2 };
                }
                function c(e, t, n, a, i) {
                  var u, c, d;
                  try {
                    (u = (function (e, t, n, a) {
                      var i =
                        (o(l(e, n, a, 5)) / 7 +
                          o(l(e, t, a, 5)) / 7 +
                          o(l(n, e, a, 5)) / 7 +
                          o(l(t, e, a, 5)) / 7) /
                        4;
                      if (i < 1) throw new Error("Invalid module size");
                      var s = Math.round(r(e, t) / i),
                        u = Math.round(r(e, n) / i),
                        c = Math.floor((s + u) / 2) + 7;
                      switch (c % 4) {
                        case 0:
                          c++;
                          break;
                        case 2:
                          c--;
                      }
                      return { dimension: c, moduleSize: i };
                    })(a, n, i, e)),
                      (c = u.dimension),
                      (d = u.moduleSize);
                  } catch (k) {
                    return null;
                  }
                  var f = n.x - a.x + i.x,
                    p = n.y - a.y + i.y,
                    h = (r(a, i) + r(a, n)) / 2 / d,
                    m = 1 - 3 / h,
                    g = { x: a.x + m * (f - a.x), y: a.y + m * (p - a.y) },
                    v = t
                      .map(function (t) {
                        var n =
                            (t.top.startX +
                              t.top.endX +
                              t.bottom.startX +
                              t.bottom.endX) /
                            4,
                          a = (t.top.y + t.bottom.y + 1) / 2;
                        if (e.get(Math.floor(n), Math.floor(a))) {
                          var l = [
                            t.top.endX - t.top.startX,
                            t.bottom.endX - t.bottom.startX,
                            t.bottom.y - t.top.y + 1,
                          ];
                          return (
                            o(l),
                            {
                              x: n,
                              y: a,
                              score:
                                s(
                                  { x: Math.floor(n), y: Math.floor(a) },
                                  [1, 1, 1],
                                  e
                                ) + r({ x: n, y: a }, g),
                            }
                          );
                        }
                      })
                      .filter(function (e) {
                        return !!e;
                      })
                      .sort(function (e, t) {
                        return e.score - t.score;
                      });
                  return {
                    alignmentPattern: h >= 15 && v.length ? v[0] : g,
                    dimension: c,
                  };
                }
                t.locate = function (e) {
                  for (
                    var t = [],
                      n = [],
                      a = [],
                      l = [],
                      i = function (r) {
                        for (
                          var i = 0,
                            s = !1,
                            u = [0, 0, 0, 0, 0],
                            c = function (t) {
                              var a = e.get(t, r);
                              if (a === s) i++;
                              else {
                                (u = [u[1], u[2], u[3], u[4], i]),
                                  (i = 1),
                                  (s = a);
                                var c = o(u) / 7,
                                  d =
                                    Math.abs(u[0] - c) < c &&
                                    Math.abs(u[1] - c) < c &&
                                    Math.abs(u[2] - 3 * c) < 3 * c &&
                                    Math.abs(u[3] - c) < c &&
                                    Math.abs(u[4] - c) < c &&
                                    !a,
                                  f = o(u.slice(-3)) / 3,
                                  p =
                                    Math.abs(u[2] - f) < f &&
                                    Math.abs(u[3] - f) < f &&
                                    Math.abs(u[4] - f) < f &&
                                    a;
                                if (d) {
                                  var h = t - u[3] - u[4],
                                    m = h - u[2],
                                    g = { startX: m, endX: h, y: r };
                                  (v = n.filter(function (e) {
                                    return (
                                      (m >= e.bottom.startX &&
                                        m <= e.bottom.endX) ||
                                      (h >= e.bottom.startX &&
                                        m <= e.bottom.endX) ||
                                      (m <= e.bottom.startX &&
                                        h >= e.bottom.endX &&
                                        u[2] /
                                          (e.bottom.endX - e.bottom.startX) <
                                          1.5 &&
                                        u[2] /
                                          (e.bottom.endX - e.bottom.startX) >
                                          0.5)
                                    );
                                  })).length > 0
                                    ? (v[0].bottom = g)
                                    : n.push({ top: g, bottom: g });
                                }
                                if (p) {
                                  var v,
                                    k = t - u[4],
                                    y = k - u[3];
                                  (g = { startX: y, y: r, endX: k }),
                                    (v = l.filter(function (e) {
                                      return (
                                        (y >= e.bottom.startX &&
                                          y <= e.bottom.endX) ||
                                        (k >= e.bottom.startX &&
                                          y <= e.bottom.endX) ||
                                        (y <= e.bottom.startX &&
                                          k >= e.bottom.endX &&
                                          u[2] /
                                            (e.bottom.endX - e.bottom.startX) <
                                            1.5 &&
                                          u[2] /
                                            (e.bottom.endX - e.bottom.startX) >
                                            0.5)
                                      );
                                    })).length > 0
                                      ? (v[0].bottom = g)
                                      : l.push({ top: g, bottom: g });
                                }
                              }
                            },
                            d = -1;
                          d <= e.width;
                          d++
                        )
                          c(d);
                        t.push.apply(
                          t,
                          n.filter(function (e) {
                            return (
                              e.bottom.y !== r && e.bottom.y - e.top.y >= 2
                            );
                          })
                        ),
                          (n = n.filter(function (e) {
                            return e.bottom.y === r;
                          })),
                          a.push.apply(
                            a,
                            l.filter(function (e) {
                              return e.bottom.y !== r;
                            })
                          ),
                          (l = l.filter(function (e) {
                            return e.bottom.y === r;
                          }));
                      },
                      d = 0;
                    d <= e.height;
                    d++
                  )
                    i(d);
                  t.push.apply(
                    t,
                    n.filter(function (e) {
                      return e.bottom.y - e.top.y >= 2;
                    })
                  ),
                    a.push.apply(a, l);
                  var f = t
                    .filter(function (e) {
                      return e.bottom.y - e.top.y >= 2;
                    })
                    .map(function (t) {
                      var n =
                          (t.top.startX +
                            t.top.endX +
                            t.bottom.startX +
                            t.bottom.endX) /
                          4,
                        r = (t.top.y + t.bottom.y + 1) / 2;
                      if (e.get(Math.round(n), Math.round(r))) {
                        var a = [
                            t.top.endX - t.top.startX,
                            t.bottom.endX - t.bottom.startX,
                            t.bottom.y - t.top.y + 1,
                          ],
                          l = o(a) / a.length;
                        return {
                          score: s(
                            { x: Math.round(n), y: Math.round(r) },
                            [1, 1, 3, 1, 1],
                            e
                          ),
                          x: n,
                          y: r,
                          size: l,
                        };
                      }
                    })
                    .filter(function (e) {
                      return !!e;
                    })
                    .sort(function (e, t) {
                      return e.score - t.score;
                    })
                    .map(function (e, t, n) {
                      if (t > 4) return null;
                      var r = n
                        .filter(function (e, n) {
                          return t !== n;
                        })
                        .map(function (t) {
                          return {
                            x: t.x,
                            y: t.y,
                            score:
                              t.score + Math.pow(t.size - e.size, 2) / e.size,
                            size: t.size,
                          };
                        })
                        .sort(function (e, t) {
                          return e.score - t.score;
                        });
                      if (r.length < 2) return null;
                      var o = e.score + r[0].score + r[1].score;
                      return { points: [e].concat(r.slice(0, 2)), score: o };
                    })
                    .filter(function (e) {
                      return !!e;
                    })
                    .sort(function (e, t) {
                      return e.score - t.score;
                    });
                  if (0 === f.length) return null;
                  var p = (function (e, t, n) {
                      var o,
                        a,
                        l,
                        i,
                        s,
                        u,
                        c,
                        d = r(e, t),
                        f = r(t, n),
                        p = r(e, n);
                      return (
                        f >= d && f >= p
                          ? ((s = (o = [t, e, n])[0]), (u = o[1]), (c = o[2]))
                          : p >= f && p >= d
                          ? ((s = (a = [e, t, n])[0]), (u = a[1]), (c = a[2]))
                          : ((s = (l = [e, n, t])[0]), (u = l[1]), (c = l[2])),
                        (c.x - u.x) * (s.y - u.y) - (c.y - u.y) * (s.x - u.x) <
                          0 && ((s = (i = [c, s])[0]), (c = i[1])),
                        { bottomLeft: s, topLeft: u, topRight: c }
                      );
                    })(f[0].points[0], f[0].points[1], f[0].points[2]),
                    h = p.topRight,
                    m = p.topLeft,
                    g = p.bottomLeft,
                    v = c(e, a, h, m, g),
                    k = [];
                  v &&
                    k.push({
                      alignmentPattern: {
                        x: v.alignmentPattern.x,
                        y: v.alignmentPattern.y,
                      },
                      bottomLeft: { x: g.x, y: g.y },
                      dimension: v.dimension,
                      topLeft: { x: m.x, y: m.y },
                      topRight: { x: h.x, y: h.y },
                    });
                  var y = u(e, h),
                    w = u(e, m),
                    b = u(e, g),
                    B = c(e, a, y, w, b);
                  return (
                    B &&
                      k.push({
                        alignmentPattern: {
                          x: B.alignmentPattern.x,
                          y: B.alignmentPattern.y,
                        },
                        bottomLeft: { x: b.x, y: b.y },
                        topLeft: { x: w.x, y: w.y },
                        topRight: { x: y.x, y: y.y },
                        dimension: B.dimension,
                      }),
                    0 === k.length ? null : k
                  );
                };
              },
            ]).default;
          }),
          (e.exports = t());
      },
      970: (e, t, n) => {
        const r = n(116),
          o = n(772),
          a = n(182),
          l = n(487);
        function i(e, t, n, a, l) {
          const i = [].slice.call(arguments, 1),
            s = i.length,
            u = "function" === typeof i[s - 1];
          if (!u && !r()) throw new Error("Callback required as last argument");
          if (!u) {
            if (s < 1) throw new Error("Too few arguments provided");
            return (
              1 === s
                ? ((n = t), (t = a = void 0))
                : 2 !== s || t.getContext || ((a = n), (n = t), (t = void 0)),
              new Promise(function (r, l) {
                try {
                  const l = o.create(n, a);
                  r(e(l, t, a));
                } catch (i) {
                  l(i);
                }
              })
            );
          }
          if (s < 2) throw new Error("Too few arguments provided");
          2 === s
            ? ((l = n), (n = t), (t = a = void 0))
            : 3 === s &&
              (t.getContext && "undefined" === typeof l
                ? ((l = a), (a = void 0))
                : ((l = a), (a = n), (n = t), (t = void 0)));
          try {
            const r = o.create(n, a);
            l(null, e(r, t, a));
          } catch (c) {
            l(c);
          }
        }
        (t.create = o.create),
          (t.toCanvas = i.bind(null, a.render)),
          (t.toDataURL = i.bind(null, a.renderToDataURL)),
          (t.toString = i.bind(null, function (e, t, n) {
            return l.render(e, n);
          }));
      },
      116: (e) => {
        e.exports = function () {
          return (
            "function" === typeof Promise &&
            Promise.prototype &&
            Promise.prototype.then
          );
        };
      },
      382: (e, t, n) => {
        const r = n(969).getSymbolSize;
        (t.getRowColCoords = function (e) {
          if (1 === e) return [];
          const t = Math.floor(e / 7) + 2,
            n = r(e),
            o = 145 === n ? 26 : 2 * Math.ceil((n - 13) / (2 * t - 2)),
            a = [n - 7];
          for (let r = 1; r < t - 1; r++) a[r] = a[r - 1] - o;
          return a.push(6), a.reverse();
        }),
          (t.getPositions = function (e) {
            const n = [],
              r = t.getRowColCoords(e),
              o = r.length;
            for (let t = 0; t < o; t++)
              for (let e = 0; e < o; e++)
                (0 === t && 0 === e) ||
                  (0 === t && e === o - 1) ||
                  (t === o - 1 && 0 === e) ||
                  n.push([r[t], r[e]]);
            return n;
          });
      },
      642: (e, t, n) => {
        const r = n(421),
          o = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            " ",
            "$",
            "%",
            "*",
            "+",
            "-",
            ".",
            "/",
            ":",
          ];
        function a(e) {
          (this.mode = r.ALPHANUMERIC), (this.data = e);
        }
        (a.getBitsLength = function (e) {
          return 11 * Math.floor(e / 2) + (e % 2) * 6;
        }),
          (a.prototype.getLength = function () {
            return this.data.length;
          }),
          (a.prototype.getBitsLength = function () {
            return a.getBitsLength(this.data.length);
          }),
          (a.prototype.write = function (e) {
            let t;
            for (t = 0; t + 2 <= this.data.length; t += 2) {
              let n = 45 * o.indexOf(this.data[t]);
              (n += o.indexOf(this.data[t + 1])), e.put(n, 11);
            }
            this.data.length % 2 && e.put(o.indexOf(this.data[t]), 6);
          }),
          (e.exports = a);
      },
      566: (e) => {
        function t() {
          (this.buffer = []), (this.length = 0);
        }
        (t.prototype = {
          get: function (e) {
            const t = Math.floor(e / 8);
            return 1 === ((this.buffer[t] >>> (7 - (e % 8))) & 1);
          },
          put: function (e, t) {
            for (let n = 0; n < t; n++)
              this.putBit(1 === ((e >>> (t - n - 1)) & 1));
          },
          getLengthInBits: function () {
            return this.length;
          },
          putBit: function (e) {
            const t = Math.floor(this.length / 8);
            this.buffer.length <= t && this.buffer.push(0),
              e && (this.buffer[t] |= 128 >>> this.length % 8),
              this.length++;
          },
        }),
          (e.exports = t);
      },
      661: (e) => {
        function t(e) {
          if (!e || e < 1)
            throw new Error(
              "BitMatrix size must be defined and greater than 0"
            );
          (this.size = e),
            (this.data = new Uint8Array(e * e)),
            (this.reservedBit = new Uint8Array(e * e));
        }
        (t.prototype.set = function (e, t, n, r) {
          const o = e * this.size + t;
          (this.data[o] = n), r && (this.reservedBit[o] = !0);
        }),
          (t.prototype.get = function (e, t) {
            return this.data[e * this.size + t];
          }),
          (t.prototype.xor = function (e, t, n) {
            this.data[e * this.size + t] ^= n;
          }),
          (t.prototype.isReserved = function (e, t) {
            return this.reservedBit[e * this.size + t];
          }),
          (e.exports = t);
      },
      697: (e, t, n) => {
        const r = n(558),
          o = n(421);
        function a(e) {
          (this.mode = o.BYTE),
            "string" === typeof e && (e = r(e)),
            (this.data = new Uint8Array(e));
        }
        (a.getBitsLength = function (e) {
          return 8 * e;
        }),
          (a.prototype.getLength = function () {
            return this.data.length;
          }),
          (a.prototype.getBitsLength = function () {
            return a.getBitsLength(this.data.length);
          }),
          (a.prototype.write = function (e) {
            for (let t = 0, n = this.data.length; t < n; t++)
              e.put(this.data[t], 8);
          }),
          (e.exports = a);
      },
      805: (e, t, n) => {
        const r = n(272),
          o = [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4,
            4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4,
            8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16,
            6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17,
            23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29,
            35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45,
            15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19,
            37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45,
            62, 74, 24, 47, 65, 77, 25, 49, 68, 81,
          ],
          a = [
            7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26,
            48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60,
            110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260,
            308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432,
            144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196,
            364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476,
            690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870,
            1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050,
            1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290,
            1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530,
            1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770,
            2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040,
            2430,
          ];
        (t.getBlocksCount = function (e, t) {
          switch (t) {
            case r.L:
              return o[4 * (e - 1) + 0];
            case r.M:
              return o[4 * (e - 1) + 1];
            case r.Q:
              return o[4 * (e - 1) + 2];
            case r.H:
              return o[4 * (e - 1) + 3];
            default:
              return;
          }
        }),
          (t.getTotalCodewordsCount = function (e, t) {
            switch (t) {
              case r.L:
                return a[4 * (e - 1) + 0];
              case r.M:
                return a[4 * (e - 1) + 1];
              case r.Q:
                return a[4 * (e - 1) + 2];
              case r.H:
                return a[4 * (e - 1) + 3];
              default:
                return;
            }
          });
      },
      272: (e, t) => {
        (t.L = { bit: 1 }),
          (t.M = { bit: 0 }),
          (t.Q = { bit: 3 }),
          (t.H = { bit: 2 }),
          (t.isValid = function (e) {
            return e && "undefined" !== typeof e.bit && e.bit >= 0 && e.bit < 4;
          }),
          (t.from = function (e, n) {
            if (t.isValid(e)) return e;
            try {
              return (function (e) {
                if ("string" !== typeof e)
                  throw new Error("Param is not a string");
                switch (e.toLowerCase()) {
                  case "l":
                  case "low":
                    return t.L;
                  case "m":
                  case "medium":
                    return t.M;
                  case "q":
                  case "quartile":
                    return t.Q;
                  case "h":
                  case "high":
                    return t.H;
                  default:
                    throw new Error("Unknown EC Level: " + e);
                }
              })(e);
            } catch (r) {
              return n;
            }
          });
      },
      21: (e, t, n) => {
        const r = n(969).getSymbolSize;
        t.getPositions = function (e) {
          const t = r(e);
          return [
            [0, 0],
            [t - 7, 0],
            [0, t - 7],
          ];
        };
      },
      350: (e, t, n) => {
        const r = n(969),
          o = r.getBCHDigit(1335);
        t.getEncodedBits = function (e, t) {
          const n = (e.bit << 3) | t;
          let a = n << 10;
          for (; r.getBCHDigit(a) - o >= 0; )
            a ^= 1335 << (r.getBCHDigit(a) - o);
          return 21522 ^ ((n << 10) | a);
        };
      },
      166: (e, t) => {
        const n = new Uint8Array(512),
          r = new Uint8Array(256);
        !(function () {
          let e = 1;
          for (let t = 0; t < 255; t++)
            (n[t] = e), (r[e] = t), (e <<= 1), 256 & e && (e ^= 285);
          for (let t = 255; t < 512; t++) n[t] = n[t - 255];
        })(),
          (t.log = function (e) {
            if (e < 1) throw new Error("log(" + e + ")");
            return r[e];
          }),
          (t.exp = function (e) {
            return n[e];
          }),
          (t.mul = function (e, t) {
            return 0 === e || 0 === t ? 0 : n[r[e] + r[t]];
          });
      },
      200: (e, t, n) => {
        const r = n(421),
          o = n(969);
        function a(e) {
          (this.mode = r.KANJI), (this.data = e);
        }
        (a.getBitsLength = function (e) {
          return 13 * e;
        }),
          (a.prototype.getLength = function () {
            return this.data.length;
          }),
          (a.prototype.getBitsLength = function () {
            return a.getBitsLength(this.data.length);
          }),
          (a.prototype.write = function (e) {
            let t;
            for (t = 0; t < this.data.length; t++) {
              let n = o.toSJIS(this.data[t]);
              if (n >= 33088 && n <= 40956) n -= 33088;
              else {
                if (!(n >= 57408 && n <= 60351))
                  throw new Error(
                    "Invalid SJIS character: " +
                      this.data[t] +
                      "\nMake sure your charset is UTF-8"
                  );
                n -= 49472;
              }
              (n = 192 * ((n >>> 8) & 255) + (255 & n)), e.put(n, 13);
            }
          }),
          (e.exports = a);
      },
      833: (e, t) => {
        t.Patterns = {
          PATTERN000: 0,
          PATTERN001: 1,
          PATTERN010: 2,
          PATTERN011: 3,
          PATTERN100: 4,
          PATTERN101: 5,
          PATTERN110: 6,
          PATTERN111: 7,
        };
        const n = 3,
          r = 3,
          o = 40,
          a = 10;
        function l(e, n, r) {
          switch (e) {
            case t.Patterns.PATTERN000:
              return (n + r) % 2 === 0;
            case t.Patterns.PATTERN001:
              return n % 2 === 0;
            case t.Patterns.PATTERN010:
              return r % 3 === 0;
            case t.Patterns.PATTERN011:
              return (n + r) % 3 === 0;
            case t.Patterns.PATTERN100:
              return (Math.floor(n / 2) + Math.floor(r / 3)) % 2 === 0;
            case t.Patterns.PATTERN101:
              return ((n * r) % 2) + ((n * r) % 3) === 0;
            case t.Patterns.PATTERN110:
              return (((n * r) % 2) + ((n * r) % 3)) % 2 === 0;
            case t.Patterns.PATTERN111:
              return (((n * r) % 3) + ((n + r) % 2)) % 2 === 0;
            default:
              throw new Error("bad maskPattern:" + e);
          }
        }
        (t.isValid = function (e) {
          return null != e && "" !== e && !isNaN(e) && e >= 0 && e <= 7;
        }),
          (t.from = function (e) {
            return t.isValid(e) ? parseInt(e, 10) : void 0;
          }),
          (t.getPenaltyN1 = function (e) {
            const t = e.size;
            let r = 0,
              o = 0,
              a = 0,
              l = null,
              i = null;
            for (let s = 0; s < t; s++) {
              (o = a = 0), (l = i = null);
              for (let u = 0; u < t; u++) {
                let t = e.get(s, u);
                t === l
                  ? o++
                  : (o >= 5 && (r += n + (o - 5)), (l = t), (o = 1)),
                  (t = e.get(u, s)),
                  t === i
                    ? a++
                    : (a >= 5 && (r += n + (a - 5)), (i = t), (a = 1));
              }
              o >= 5 && (r += n + (o - 5)), a >= 5 && (r += n + (a - 5));
            }
            return r;
          }),
          (t.getPenaltyN2 = function (e) {
            const t = e.size;
            let n = 0;
            for (let r = 0; r < t - 1; r++)
              for (let o = 0; o < t - 1; o++) {
                const t =
                  e.get(r, o) +
                  e.get(r, o + 1) +
                  e.get(r + 1, o) +
                  e.get(r + 1, o + 1);
                (4 !== t && 0 !== t) || n++;
              }
            return n * r;
          }),
          (t.getPenaltyN3 = function (e) {
            const t = e.size;
            let n = 0,
              r = 0,
              a = 0;
            for (let o = 0; o < t; o++) {
              r = a = 0;
              for (let l = 0; l < t; l++)
                (r = ((r << 1) & 2047) | e.get(o, l)),
                  l >= 10 && (1488 === r || 93 === r) && n++,
                  (a = ((a << 1) & 2047) | e.get(l, o)),
                  l >= 10 && (1488 === a || 93 === a) && n++;
            }
            return n * o;
          }),
          (t.getPenaltyN4 = function (e) {
            let t = 0;
            const n = e.data.length;
            for (let r = 0; r < n; r++) t += e.data[r];
            return Math.abs(Math.ceil((100 * t) / n / 5) - 10) * a;
          }),
          (t.applyMask = function (e, t) {
            const n = t.size;
            for (let r = 0; r < n; r++)
              for (let o = 0; o < n; o++)
                t.isReserved(o, r) || t.xor(o, r, l(e, o, r));
          }),
          (t.getBestMask = function (e, n) {
            const r = Object.keys(t.Patterns).length;
            let o = 0,
              a = 1 / 0;
            for (let l = 0; l < r; l++) {
              n(l), t.applyMask(l, e);
              const r =
                t.getPenaltyN1(e) +
                t.getPenaltyN2(e) +
                t.getPenaltyN3(e) +
                t.getPenaltyN4(e);
              t.applyMask(l, e), r < a && ((a = r), (o = l));
            }
            return o;
          });
      },
      421: (e, t, n) => {
        const r = n(257),
          o = n(511);
        (t.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }),
          (t.ALPHANUMERIC = {
            id: "Alphanumeric",
            bit: 2,
            ccBits: [9, 11, 13],
          }),
          (t.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }),
          (t.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }),
          (t.MIXED = { bit: -1 }),
          (t.getCharCountIndicator = function (e, t) {
            if (!e.ccBits) throw new Error("Invalid mode: " + e);
            if (!r.isValid(t)) throw new Error("Invalid version: " + t);
            return t >= 1 && t < 10
              ? e.ccBits[0]
              : t < 27
              ? e.ccBits[1]
              : e.ccBits[2];
          }),
          (t.getBestModeForData = function (e) {
            return o.testNumeric(e)
              ? t.NUMERIC
              : o.testAlphanumeric(e)
              ? t.ALPHANUMERIC
              : o.testKanji(e)
              ? t.KANJI
              : t.BYTE;
          }),
          (t.toString = function (e) {
            if (e && e.id) return e.id;
            throw new Error("Invalid mode");
          }),
          (t.isValid = function (e) {
            return e && e.bit && e.ccBits;
          }),
          (t.from = function (e, n) {
            if (t.isValid(e)) return e;
            try {
              return (function (e) {
                if ("string" !== typeof e)
                  throw new Error("Param is not a string");
                switch (e.toLowerCase()) {
                  case "numeric":
                    return t.NUMERIC;
                  case "alphanumeric":
                    return t.ALPHANUMERIC;
                  case "kanji":
                    return t.KANJI;
                  case "byte":
                    return t.BYTE;
                  default:
                    throw new Error("Unknown mode: " + e);
                }
              })(e);
            } catch (r) {
              return n;
            }
          });
      },
      900: (e, t, n) => {
        const r = n(421);
        function o(e) {
          (this.mode = r.NUMERIC), (this.data = e.toString());
        }
        (o.getBitsLength = function (e) {
          return 10 * Math.floor(e / 3) + (e % 3 ? (e % 3) * 3 + 1 : 0);
        }),
          (o.prototype.getLength = function () {
            return this.data.length;
          }),
          (o.prototype.getBitsLength = function () {
            return o.getBitsLength(this.data.length);
          }),
          (o.prototype.write = function (e) {
            let t, n, r;
            for (t = 0; t + 3 <= this.data.length; t += 3)
              (n = this.data.substr(t, 3)), (r = parseInt(n, 10)), e.put(r, 10);
            const o = this.data.length - t;
            o > 0 &&
              ((n = this.data.substr(t)),
              (r = parseInt(n, 10)),
              e.put(r, 3 * o + 1));
          }),
          (e.exports = o);
      },
      312: (e, t, n) => {
        const r = n(166);
        (t.mul = function (e, t) {
          const n = new Uint8Array(e.length + t.length - 1);
          for (let o = 0; o < e.length; o++)
            for (let a = 0; a < t.length; a++) n[o + a] ^= r.mul(e[o], t[a]);
          return n;
        }),
          (t.mod = function (e, t) {
            let n = new Uint8Array(e);
            for (; n.length - t.length >= 0; ) {
              const e = n[0];
              for (let a = 0; a < t.length; a++) n[a] ^= r.mul(t[a], e);
              let o = 0;
              for (; o < n.length && 0 === n[o]; ) o++;
              n = n.slice(o);
            }
            return n;
          }),
          (t.generateECPolynomial = function (e) {
            let n = new Uint8Array([1]);
            for (let o = 0; o < e; o++)
              n = t.mul(n, new Uint8Array([1, r.exp(o)]));
            return n;
          });
      },
      772: (e, t, n) => {
        const r = n(969),
          o = n(272),
          a = n(566),
          l = n(661),
          i = n(382),
          s = n(21),
          u = n(833),
          c = n(805),
          d = n(177),
          f = n(980),
          p = n(350),
          h = n(421),
          m = n(4);
        function g(e, t, n) {
          const r = e.size,
            o = p.getEncodedBits(t, n);
          let a, l;
          for (a = 0; a < 15; a++)
            (l = 1 === ((o >> a) & 1)),
              a < 6
                ? e.set(a, 8, l, !0)
                : a < 8
                ? e.set(a + 1, 8, l, !0)
                : e.set(r - 15 + a, 8, l, !0),
              a < 8
                ? e.set(8, r - a - 1, l, !0)
                : a < 9
                ? e.set(8, 15 - a - 1 + 1, l, !0)
                : e.set(8, 15 - a - 1, l, !0);
          e.set(r - 8, 8, 1, !0);
        }
        function v(e, t, n) {
          const o = new a();
          n.forEach(function (t) {
            o.put(t.mode.bit, 4),
              o.put(t.getLength(), h.getCharCountIndicator(t.mode, e)),
              t.write(o);
          });
          const l =
            8 * (r.getSymbolTotalCodewords(e) - c.getTotalCodewordsCount(e, t));
          for (
            o.getLengthInBits() + 4 <= l && o.put(0, 4);
            o.getLengthInBits() % 8 !== 0;

          )
            o.putBit(0);
          const i = (l - o.getLengthInBits()) / 8;
          for (let r = 0; r < i; r++) o.put(r % 2 ? 17 : 236, 8);
          return (function (e, t, n) {
            const o = r.getSymbolTotalCodewords(t),
              a = c.getTotalCodewordsCount(t, n),
              l = o - a,
              i = c.getBlocksCount(t, n),
              s = o % i,
              u = i - s,
              f = Math.floor(o / i),
              p = Math.floor(l / i),
              h = p + 1,
              m = f - p,
              g = new d(m);
            let v = 0;
            const k = new Array(i),
              y = new Array(i);
            let w = 0;
            const b = new Uint8Array(e.buffer);
            for (let r = 0; r < i; r++) {
              const e = r < u ? p : h;
              (k[r] = b.slice(v, v + e)),
                (y[r] = g.encode(k[r])),
                (v += e),
                (w = Math.max(w, e));
            }
            const B = new Uint8Array(o);
            let C,
              P,
              S = 0;
            for (C = 0; C < w; C++)
              for (P = 0; P < i; P++) C < k[P].length && (B[S++] = k[P][C]);
            for (C = 0; C < m; C++) for (P = 0; P < i; P++) B[S++] = y[P][C];
            return B;
          })(o, e, t);
        }
        function k(e, t, n, o) {
          let a;
          if (Array.isArray(e)) a = m.fromArray(e);
          else {
            if ("string" !== typeof e) throw new Error("Invalid data");
            {
              let r = t;
              if (!r) {
                const t = m.rawSplit(e);
                r = f.getBestVersionForData(t, n);
              }
              a = m.fromString(e, r || 40);
            }
          }
          const c = f.getBestVersionForData(a, n);
          if (!c)
            throw new Error(
              "The amount of data is too big to be stored in a QR Code"
            );
          if (t) {
            if (t < c)
              throw new Error(
                "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " +
                  c +
                  ".\n"
              );
          } else t = c;
          const d = v(t, n, a),
            p = r.getSymbolSize(t),
            h = new l(p);
          return (
            (function (e, t) {
              const n = e.size,
                r = s.getPositions(t);
              for (let o = 0; o < r.length; o++) {
                const t = r[o][0],
                  a = r[o][1];
                for (let r = -1; r <= 7; r++)
                  if (!(t + r <= -1 || n <= t + r))
                    for (let o = -1; o <= 7; o++)
                      a + o <= -1 ||
                        n <= a + o ||
                        ((r >= 0 && r <= 6 && (0 === o || 6 === o)) ||
                        (o >= 0 && o <= 6 && (0 === r || 6 === r)) ||
                        (r >= 2 && r <= 4 && o >= 2 && o <= 4)
                          ? e.set(t + r, a + o, !0, !0)
                          : e.set(t + r, a + o, !1, !0));
              }
            })(h, t),
            (function (e) {
              const t = e.size;
              for (let n = 8; n < t - 8; n++) {
                const t = n % 2 === 0;
                e.set(n, 6, t, !0), e.set(6, n, t, !0);
              }
            })(h),
            (function (e, t) {
              const n = i.getPositions(t);
              for (let r = 0; r < n.length; r++) {
                const t = n[r][0],
                  o = n[r][1];
                for (let n = -2; n <= 2; n++)
                  for (let r = -2; r <= 2; r++)
                    -2 === n ||
                    2 === n ||
                    -2 === r ||
                    2 === r ||
                    (0 === n && 0 === r)
                      ? e.set(t + n, o + r, !0, !0)
                      : e.set(t + n, o + r, !1, !0);
              }
            })(h, t),
            g(h, n, 0),
            t >= 7 &&
              (function (e, t) {
                const n = e.size,
                  r = f.getEncodedBits(t);
                let o, a, l;
                for (let i = 0; i < 18; i++)
                  (o = Math.floor(i / 3)),
                    (a = (i % 3) + n - 8 - 3),
                    (l = 1 === ((r >> i) & 1)),
                    e.set(o, a, l, !0),
                    e.set(a, o, l, !0);
              })(h, t),
            (function (e, t) {
              const n = e.size;
              let r = -1,
                o = n - 1,
                a = 7,
                l = 0;
              for (let i = n - 1; i > 0; i -= 2)
                for (6 === i && i--; ; ) {
                  for (let n = 0; n < 2; n++)
                    if (!e.isReserved(o, i - n)) {
                      let r = !1;
                      l < t.length && (r = 1 === ((t[l] >>> a) & 1)),
                        e.set(o, i - n, r),
                        a--,
                        -1 === a && (l++, (a = 7));
                    }
                  if (((o += r), o < 0 || n <= o)) {
                    (o -= r), (r = -r);
                    break;
                  }
                }
            })(h, d),
            isNaN(o) && (o = u.getBestMask(h, g.bind(null, h, n))),
            u.applyMask(o, h),
            g(h, n, o),
            {
              modules: h,
              version: t,
              errorCorrectionLevel: n,
              maskPattern: o,
              segments: a,
            }
          );
        }
        t.create = function (e, t) {
          if ("undefined" === typeof e || "" === e)
            throw new Error("No input text");
          let n,
            a,
            l = o.M;
          return (
            "undefined" !== typeof t &&
              ((l = o.from(t.errorCorrectionLevel, o.M)),
              (n = f.from(t.version)),
              (a = u.from(t.maskPattern)),
              t.toSJISFunc && r.setToSJISFunction(t.toSJISFunc)),
            k(e, n, l, a)
          );
        };
      },
      177: (e, t, n) => {
        const r = n(312);
        function o(e) {
          (this.genPoly = void 0),
            (this.degree = e),
            this.degree && this.initialize(this.degree);
        }
        (o.prototype.initialize = function (e) {
          (this.degree = e),
            (this.genPoly = r.generateECPolynomial(this.degree));
        }),
          (o.prototype.encode = function (e) {
            if (!this.genPoly) throw new Error("Encoder not initialized");
            const t = new Uint8Array(e.length + this.degree);
            t.set(e);
            const n = r.mod(t, this.genPoly),
              o = this.degree - n.length;
            if (o > 0) {
              const e = new Uint8Array(this.degree);
              return e.set(n, o), e;
            }
            return n;
          }),
          (e.exports = o);
      },
      511: (e, t) => {
        const n = "[0-9]+";
        let r =
          "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
        r = r.replace(/u/g, "\\u");
        const o = "(?:(?![A-Z0-9 $%*+\\-./:]|" + r + ")(?:.|[\r\n]))+";
        (t.KANJI = new RegExp(r, "g")),
          (t.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g")),
          (t.BYTE = new RegExp(o, "g")),
          (t.NUMERIC = new RegExp(n, "g")),
          (t.ALPHANUMERIC = new RegExp("[A-Z $%*+\\-./:]+", "g"));
        const a = new RegExp("^" + r + "$"),
          l = new RegExp("^" + n + "$"),
          i = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
        (t.testKanji = function (e) {
          return a.test(e);
        }),
          (t.testNumeric = function (e) {
            return l.test(e);
          }),
          (t.testAlphanumeric = function (e) {
            return i.test(e);
          });
      },
      4: (e, t, n) => {
        const r = n(421),
          o = n(900),
          a = n(642),
          l = n(697),
          i = n(200),
          s = n(511),
          u = n(969),
          c = n(347);
        function d(e) {
          return unescape(encodeURIComponent(e)).length;
        }
        function f(e, t, n) {
          const r = [];
          let o;
          for (; null !== (o = e.exec(n)); )
            r.push({
              data: o[0],
              index: o.index,
              mode: t,
              length: o[0].length,
            });
          return r;
        }
        function p(e) {
          const t = f(s.NUMERIC, r.NUMERIC, e),
            n = f(s.ALPHANUMERIC, r.ALPHANUMERIC, e);
          let o, a;
          u.isKanjiModeEnabled()
            ? ((o = f(s.BYTE, r.BYTE, e)), (a = f(s.KANJI, r.KANJI, e)))
            : ((o = f(s.BYTE_KANJI, r.BYTE, e)), (a = []));
          return t
            .concat(n, o, a)
            .sort(function (e, t) {
              return e.index - t.index;
            })
            .map(function (e) {
              return { data: e.data, mode: e.mode, length: e.length };
            });
        }
        function h(e, t) {
          switch (t) {
            case r.NUMERIC:
              return o.getBitsLength(e);
            case r.ALPHANUMERIC:
              return a.getBitsLength(e);
            case r.KANJI:
              return i.getBitsLength(e);
            case r.BYTE:
              return l.getBitsLength(e);
          }
        }
        function m(e, t) {
          let n;
          const s = r.getBestModeForData(e);
          if (((n = r.from(t, s)), n !== r.BYTE && n.bit < s.bit))
            throw new Error(
              '"' +
                e +
                '" cannot be encoded with mode ' +
                r.toString(n) +
                ".\n Suggested mode is: " +
                r.toString(s)
            );
          switch (
            (n !== r.KANJI || u.isKanjiModeEnabled() || (n = r.BYTE), n)
          ) {
            case r.NUMERIC:
              return new o(e);
            case r.ALPHANUMERIC:
              return new a(e);
            case r.KANJI:
              return new i(e);
            case r.BYTE:
              return new l(e);
          }
        }
        (t.fromArray = function (e) {
          return e.reduce(function (e, t) {
            return (
              "string" === typeof t
                ? e.push(m(t, null))
                : t.data && e.push(m(t.data, t.mode)),
              e
            );
          }, []);
        }),
          (t.fromString = function (e, n) {
            const o = (function (e) {
                const t = [];
                for (let n = 0; n < e.length; n++) {
                  const o = e[n];
                  switch (o.mode) {
                    case r.NUMERIC:
                      t.push([
                        o,
                        {
                          data: o.data,
                          mode: r.ALPHANUMERIC,
                          length: o.length,
                        },
                        { data: o.data, mode: r.BYTE, length: o.length },
                      ]);
                      break;
                    case r.ALPHANUMERIC:
                      t.push([
                        o,
                        { data: o.data, mode: r.BYTE, length: o.length },
                      ]);
                      break;
                    case r.KANJI:
                      t.push([
                        o,
                        { data: o.data, mode: r.BYTE, length: d(o.data) },
                      ]);
                      break;
                    case r.BYTE:
                      t.push([
                        { data: o.data, mode: r.BYTE, length: d(o.data) },
                      ]);
                  }
                }
                return t;
              })(p(e, u.isKanjiModeEnabled())),
              a = (function (e, t) {
                const n = {},
                  o = { start: {} };
                let a = ["start"];
                for (let l = 0; l < e.length; l++) {
                  const i = e[l],
                    s = [];
                  for (let e = 0; e < i.length; e++) {
                    const u = i[e],
                      c = "" + l + e;
                    s.push(c), (n[c] = { node: u, lastCount: 0 }), (o[c] = {});
                    for (let e = 0; e < a.length; e++) {
                      const l = a[e];
                      n[l] && n[l].node.mode === u.mode
                        ? ((o[l][c] =
                            h(n[l].lastCount + u.length, u.mode) -
                            h(n[l].lastCount, u.mode)),
                          (n[l].lastCount += u.length))
                        : (n[l] && (n[l].lastCount = u.length),
                          (o[l][c] =
                            h(u.length, u.mode) +
                            4 +
                            r.getCharCountIndicator(u.mode, t)));
                    }
                  }
                  a = s;
                }
                for (let r = 0; r < a.length; r++) o[a[r]].end = 0;
                return { map: o, table: n };
              })(o, n),
              l = c.find_path(a.map, "start", "end"),
              i = [];
            for (let t = 1; t < l.length - 1; t++) i.push(a.table[l[t]].node);
            return t.fromArray(
              (function (e) {
                return e.reduce(function (e, t) {
                  const n = e.length - 1 >= 0 ? e[e.length - 1] : null;
                  return n && n.mode === t.mode
                    ? ((e[e.length - 1].data += t.data), e)
                    : (e.push(t), e);
                }, []);
              })(i)
            );
          }),
          (t.rawSplit = function (e) {
            return t.fromArray(p(e, u.isKanjiModeEnabled()));
          });
      },
      969: (e, t) => {
        let n;
        const r = [
          0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581,
          655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706,
          1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196,
          3362, 3532, 3706,
        ];
        (t.getSymbolSize = function (e) {
          if (!e) throw new Error('"version" cannot be null or undefined');
          if (e < 1 || e > 40)
            throw new Error('"version" should be in range from 1 to 40');
          return 4 * e + 17;
        }),
          (t.getSymbolTotalCodewords = function (e) {
            return r[e];
          }),
          (t.getBCHDigit = function (e) {
            let t = 0;
            for (; 0 !== e; ) t++, (e >>>= 1);
            return t;
          }),
          (t.setToSJISFunction = function (e) {
            if ("function" !== typeof e)
              throw new Error('"toSJISFunc" is not a valid function.');
            n = e;
          }),
          (t.isKanjiModeEnabled = function () {
            return "undefined" !== typeof n;
          }),
          (t.toSJIS = function (e) {
            return n(e);
          });
      },
      257: (e, t) => {
        t.isValid = function (e) {
          return !isNaN(e) && e >= 1 && e <= 40;
        };
      },
      980: (e, t, n) => {
        const r = n(969),
          o = n(805),
          a = n(272),
          l = n(421),
          i = n(257),
          s = r.getBCHDigit(7973);
        function u(e, t) {
          return l.getCharCountIndicator(e, t) + 4;
        }
        function c(e, t) {
          let n = 0;
          return (
            e.forEach(function (e) {
              const r = u(e.mode, t);
              n += r + e.getBitsLength();
            }),
            n
          );
        }
        (t.from = function (e, t) {
          return i.isValid(e) ? parseInt(e, 10) : t;
        }),
          (t.getCapacity = function (e, t, n) {
            if (!i.isValid(e)) throw new Error("Invalid QR Code version");
            "undefined" === typeof n && (n = l.BYTE);
            const a =
              8 *
              (r.getSymbolTotalCodewords(e) - o.getTotalCodewordsCount(e, t));
            if (n === l.MIXED) return a;
            const s = a - u(n, e);
            switch (n) {
              case l.NUMERIC:
                return Math.floor((s / 10) * 3);
              case l.ALPHANUMERIC:
                return Math.floor((s / 11) * 2);
              case l.KANJI:
                return Math.floor(s / 13);
              case l.BYTE:
              default:
                return Math.floor(s / 8);
            }
          }),
          (t.getBestVersionForData = function (e, n) {
            let r;
            const o = a.from(n, a.M);
            if (Array.isArray(e)) {
              if (e.length > 1)
                return (function (e, n) {
                  for (let r = 1; r <= 40; r++)
                    if (c(e, r) <= t.getCapacity(r, n, l.MIXED)) return r;
                })(e, o);
              if (0 === e.length) return 1;
              r = e[0];
            } else r = e;
            return (function (e, n, r) {
              for (let o = 1; o <= 40; o++)
                if (n <= t.getCapacity(o, r, e)) return o;
            })(r.mode, r.getLength(), o);
          }),
          (t.getEncodedBits = function (e) {
            if (!i.isValid(e) || e < 7)
              throw new Error("Invalid QR Code version");
            let t = e << 12;
            for (; r.getBCHDigit(t) - s >= 0; )
              t ^= 7973 << (r.getBCHDigit(t) - s);
            return (e << 12) | t;
          });
      },
      182: (e, t, n) => {
        const r = n(293);
        (t.render = function (e, t, n) {
          let o = n,
            a = t;
          "undefined" !== typeof o ||
            (t && t.getContext) ||
            ((o = t), (t = void 0)),
            t ||
              (a = (function () {
                try {
                  return document.createElement("canvas");
                } catch (e) {
                  throw new Error("You need to specify a canvas element");
                }
              })()),
            (o = r.getOptions(o));
          const l = r.getImageWidth(e.modules.size, o),
            i = a.getContext("2d"),
            s = i.createImageData(l, l);
          return (
            r.qrToImageData(s.data, e, o),
            (function (e, t, n) {
              e.clearRect(0, 0, t.width, t.height),
                t.style || (t.style = {}),
                (t.height = n),
                (t.width = n),
                (t.style.height = n + "px"),
                (t.style.width = n + "px");
            })(i, a, l),
            i.putImageData(s, 0, 0),
            a
          );
        }),
          (t.renderToDataURL = function (e, n, r) {
            let o = r;
            "undefined" !== typeof o ||
              (n && n.getContext) ||
              ((o = n), (n = void 0)),
              o || (o = {});
            const a = t.render(e, n, o),
              l = o.type || "image/png",
              i = o.rendererOpts || {};
            return a.toDataURL(l, i.quality);
          });
      },
      487: (e, t, n) => {
        const r = n(293);
        function o(e, t) {
          const n = e.a / 255,
            r = t + '="' + e.hex + '"';
          return n < 1
            ? r + " " + t + '-opacity="' + n.toFixed(2).slice(1) + '"'
            : r;
        }
        function a(e, t, n) {
          let r = e + t;
          return "undefined" !== typeof n && (r += " " + n), r;
        }
        t.render = function (e, t, n) {
          const l = r.getOptions(t),
            i = e.modules.size,
            s = e.modules.data,
            u = i + 2 * l.margin,
            c = l.color.light.a
              ? "<path " +
                o(l.color.light, "fill") +
                ' d="M0 0h' +
                u +
                "v" +
                u +
                'H0z"/>'
              : "",
            d =
              "<path " +
              o(l.color.dark, "stroke") +
              ' d="' +
              (function (e, t, n) {
                let r = "",
                  o = 0,
                  l = !1,
                  i = 0;
                for (let s = 0; s < e.length; s++) {
                  const u = Math.floor(s % t),
                    c = Math.floor(s / t);
                  u || l || (l = !0),
                    e[s]
                      ? (i++,
                        (s > 0 && u > 0 && e[s - 1]) ||
                          ((r += l ? a("M", u + n, 0.5 + c + n) : a("m", o, 0)),
                          (o = 0),
                          (l = !1)),
                        (u + 1 < t && e[s + 1]) || ((r += a("h", i)), (i = 0)))
                      : o++;
                }
                return r;
              })(s, i, l.margin) +
              '"/>',
            f = 'viewBox="0 0 ' + u + " " + u + '"',
            p =
              '<svg xmlns="http://www.w3.org/2000/svg" ' +
              (l.width
                ? 'width="' + l.width + '" height="' + l.width + '" '
                : "") +
              f +
              ' shape-rendering="crispEdges">' +
              c +
              d +
              "</svg>\n";
          return "function" === typeof n && n(null, p), p;
        };
      },
      293: (e, t) => {
        function n(e) {
          if (
            ("number" === typeof e && (e = e.toString()), "string" !== typeof e)
          )
            throw new Error("Color should be defined as hex string");
          let t = e.slice().replace("#", "").split("");
          if (t.length < 3 || 5 === t.length || t.length > 8)
            throw new Error("Invalid hex color: " + e);
          (3 !== t.length && 4 !== t.length) ||
            (t = Array.prototype.concat.apply(
              [],
              t.map(function (e) {
                return [e, e];
              })
            )),
            6 === t.length && t.push("F", "F");
          const n = parseInt(t.join(""), 16);
          return {
            r: (n >> 24) & 255,
            g: (n >> 16) & 255,
            b: (n >> 8) & 255,
            a: 255 & n,
            hex: "#" + t.slice(0, 6).join(""),
          };
        }
        (t.getOptions = function (e) {
          e || (e = {}), e.color || (e.color = {});
          const t =
              "undefined" === typeof e.margin ||
              null === e.margin ||
              e.margin < 0
                ? 4
                : e.margin,
            r = e.width && e.width >= 21 ? e.width : void 0,
            o = e.scale || 4;
          return {
            width: r,
            scale: r ? 4 : o,
            margin: t,
            color: {
              dark: n(e.color.dark || "#000000ff"),
              light: n(e.color.light || "#ffffffff"),
            },
            type: e.type,
            rendererOpts: e.rendererOpts || {},
          };
        }),
          (t.getScale = function (e, t) {
            return t.width && t.width >= e + 2 * t.margin
              ? t.width / (e + 2 * t.margin)
              : t.scale;
          }),
          (t.getImageWidth = function (e, n) {
            const r = t.getScale(e, n);
            return Math.floor((e + 2 * n.margin) * r);
          }),
          (t.qrToImageData = function (e, n, r) {
            const o = n.modules.size,
              a = n.modules.data,
              l = t.getScale(o, r),
              i = Math.floor((o + 2 * r.margin) * l),
              s = r.margin * l,
              u = [r.color.light, r.color.dark];
            for (let t = 0; t < i; t++)
              for (let n = 0; n < i; n++) {
                let c = 4 * (t * i + n),
                  d = r.color.light;
                if (t >= s && n >= s && t < i - s && n < i - s) {
                  d =
                    u[
                      a[Math.floor((t - s) / l) * o + Math.floor((n - s) / l)]
                        ? 1
                        : 0
                    ];
                }
                (e[c++] = d.r), (e[c++] = d.g), (e[c++] = d.b), (e[c] = d.a);
              }
          });
      },
      730: (e, t, n) => {
        "use strict";
        var r = n(43),
          o = n(853);
        function a(e) {
          for (
            var t =
                "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
              n = 1;
            n < arguments.length;
            n++
          )
            t += "&args[]=" + encodeURIComponent(arguments[n]);
          return (
            "Minified React error #" +
            e +
            "; visit " +
            t +
            " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
          );
        }
        var l = new Set(),
          i = {};
        function s(e, t) {
          u(e, t), u(e + "Capture", t);
        }
        function u(e, t) {
          for (i[e] = t, e = 0; e < t.length; e++) l.add(t[e]);
        }
        var c = !(
            "undefined" === typeof window ||
            "undefined" === typeof window.document ||
            "undefined" === typeof window.document.createElement
          ),
          d = Object.prototype.hasOwnProperty,
          f =
            /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
          p = {},
          h = {};
        function m(e, t, n, r, o, a, l) {
          (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
            (this.attributeName = r),
            (this.attributeNamespace = o),
            (this.mustUseProperty = n),
            (this.propertyName = e),
            (this.type = t),
            (this.sanitizeURL = a),
            (this.removeEmptyString = l);
        }
        var g = {};
        "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
          .split(" ")
          .forEach(function (e) {
            g[e] = new m(e, 0, !1, e, null, !1, !1);
          }),
          [
            ["acceptCharset", "accept-charset"],
            ["className", "class"],
            ["htmlFor", "for"],
            ["httpEquiv", "http-equiv"],
          ].forEach(function (e) {
            var t = e[0];
            g[t] = new m(t, 1, !1, e[1], null, !1, !1);
          }),
          ["contentEditable", "draggable", "spellCheck", "value"].forEach(
            function (e) {
              g[e] = new m(e, 2, !1, e.toLowerCase(), null, !1, !1);
            }
          ),
          [
            "autoReverse",
            "externalResourcesRequired",
            "focusable",
            "preserveAlpha",
          ].forEach(function (e) {
            g[e] = new m(e, 2, !1, e, null, !1, !1);
          }),
          "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
            .split(" ")
            .forEach(function (e) {
              g[e] = new m(e, 3, !1, e.toLowerCase(), null, !1, !1);
            }),
          ["checked", "multiple", "muted", "selected"].forEach(function (e) {
            g[e] = new m(e, 3, !0, e, null, !1, !1);
          }),
          ["capture", "download"].forEach(function (e) {
            g[e] = new m(e, 4, !1, e, null, !1, !1);
          }),
          ["cols", "rows", "size", "span"].forEach(function (e) {
            g[e] = new m(e, 6, !1, e, null, !1, !1);
          }),
          ["rowSpan", "start"].forEach(function (e) {
            g[e] = new m(e, 5, !1, e.toLowerCase(), null, !1, !1);
          });
        var v = /[\-:]([a-z])/g;
        function k(e) {
          return e[1].toUpperCase();
        }
        function y(e, t, n, r) {
          var o = g.hasOwnProperty(t) ? g[t] : null;
          (null !== o
            ? 0 !== o.type
            : r ||
              !(2 < t.length) ||
              ("o" !== t[0] && "O" !== t[0]) ||
              ("n" !== t[1] && "N" !== t[1])) &&
            ((function (e, t, n, r) {
              if (
                null === t ||
                "undefined" === typeof t ||
                (function (e, t, n, r) {
                  if (null !== n && 0 === n.type) return !1;
                  switch (typeof t) {
                    case "function":
                    case "symbol":
                      return !0;
                    case "boolean":
                      return (
                        !r &&
                        (null !== n
                          ? !n.acceptsBooleans
                          : "data-" !== (e = e.toLowerCase().slice(0, 5)) &&
                            "aria-" !== e)
                      );
                    default:
                      return !1;
                  }
                })(e, t, n, r)
              )
                return !0;
              if (r) return !1;
              if (null !== n)
                switch (n.type) {
                  case 3:
                    return !t;
                  case 4:
                    return !1 === t;
                  case 5:
                    return isNaN(t);
                  case 6:
                    return isNaN(t) || 1 > t;
                }
              return !1;
            })(t, n, o, r) && (n = null),
            r || null === o
              ? (function (e) {
                  return (
                    !!d.call(h, e) ||
                    (!d.call(p, e) &&
                      (f.test(e) ? (h[e] = !0) : ((p[e] = !0), !1)))
                  );
                })(t) &&
                (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
              : o.mustUseProperty
              ? (e[o.propertyName] = null === n ? 3 !== o.type && "" : n)
              : ((t = o.attributeName),
                (r = o.attributeNamespace),
                null === n
                  ? e.removeAttribute(t)
                  : ((n =
                      3 === (o = o.type) || (4 === o && !0 === n)
                        ? ""
                        : "" + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
        }
        "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
          .split(" ")
          .forEach(function (e) {
            var t = e.replace(v, k);
            g[t] = new m(t, 1, !1, e, null, !1, !1);
          }),
          "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
            .split(" ")
            .forEach(function (e) {
              var t = e.replace(v, k);
              g[t] = new m(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
            }),
          ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
            var t = e.replace(v, k);
            g[t] = new m(
              t,
              1,
              !1,
              e,
              "http://www.w3.org/XML/1998/namespace",
              !1,
              !1
            );
          }),
          ["tabIndex", "crossOrigin"].forEach(function (e) {
            g[e] = new m(e, 1, !1, e.toLowerCase(), null, !1, !1);
          }),
          (g.xlinkHref = new m(
            "xlinkHref",
            1,
            !1,
            "xlink:href",
            "http://www.w3.org/1999/xlink",
            !0,
            !1
          )),
          ["src", "href", "action", "formAction"].forEach(function (e) {
            g[e] = new m(e, 1, !1, e.toLowerCase(), null, !0, !0);
          });
        var w = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
          b = Symbol.for("react.element"),
          B = Symbol.for("react.portal"),
          C = Symbol.for("react.fragment"),
          P = Symbol.for("react.strict_mode"),
          S = Symbol.for("react.profiler"),
          x = Symbol.for("react.provider"),
          E = Symbol.for("react.context"),
          M = Symbol.for("react.forward_ref"),
          N = Symbol.for("react.suspense"),
          _ = Symbol.for("react.suspense_list"),
          L = Symbol.for("react.memo"),
          T = Symbol.for("react.lazy");
        Symbol.for("react.scope"), Symbol.for("react.debug_trace_mode");
        var I = Symbol.for("react.offscreen");
        Symbol.for("react.legacy_hidden"),
          Symbol.for("react.cache"),
          Symbol.for("react.tracing_marker");
        var z = Symbol.iterator;
        function R(e) {
          return null === e || "object" !== typeof e
            ? null
            : "function" === typeof (e = (z && e[z]) || e["@@iterator"])
            ? e
            : null;
        }
        var O,
          U = Object.assign;
        function A(e) {
          if (void 0 === O)
            try {
              throw Error();
            } catch (n) {
              var t = n.stack.trim().match(/\n( *(at )?)/);
              O = (t && t[1]) || "";
            }
          return "\n" + O + e;
        }
        var F = !1;
        function D(e, t) {
          if (!e || F) return "";
          F = !0;
          var n = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          try {
            if (t)
              if (
                ((t = function () {
                  throw Error();
                }),
                Object.defineProperty(t.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                "object" === typeof Reflect && Reflect.construct)
              ) {
                try {
                  Reflect.construct(t, []);
                } catch (u) {
                  var r = u;
                }
                Reflect.construct(e, [], t);
              } else {
                try {
                  t.call();
                } catch (u) {
                  r = u;
                }
                e.call(t.prototype);
              }
            else {
              try {
                throw Error();
              } catch (u) {
                r = u;
              }
              e();
            }
          } catch (u) {
            if (u && r && "string" === typeof u.stack) {
              for (
                var o = u.stack.split("\n"),
                  a = r.stack.split("\n"),
                  l = o.length - 1,
                  i = a.length - 1;
                1 <= l && 0 <= i && o[l] !== a[i];

              )
                i--;
              for (; 1 <= l && 0 <= i; l--, i--)
                if (o[l] !== a[i]) {
                  if (1 !== l || 1 !== i)
                    do {
                      if ((l--, 0 > --i || o[l] !== a[i])) {
                        var s = "\n" + o[l].replace(" at new ", " at ");
                        return (
                          e.displayName &&
                            s.includes("<anonymous>") &&
                            (s = s.replace("<anonymous>", e.displayName)),
                          s
                        );
                      }
                    } while (1 <= l && 0 <= i);
                  break;
                }
            }
          } finally {
            (F = !1), (Error.prepareStackTrace = n);
          }
          return (e = e ? e.displayName || e.name : "") ? A(e) : "";
        }
        function j(e) {
          switch (e.tag) {
            case 5:
              return A(e.type);
            case 16:
              return A("Lazy");
            case 13:
              return A("Suspense");
            case 19:
              return A("SuspenseList");
            case 0:
            case 2:
            case 15:
              return (e = D(e.type, !1));
            case 11:
              return (e = D(e.type.render, !1));
            case 1:
              return (e = D(e.type, !0));
            default:
              return "";
          }
        }
        function H(e) {
          if (null == e) return null;
          if ("function" === typeof e) return e.displayName || e.name || null;
          if ("string" === typeof e) return e;
          switch (e) {
            case C:
              return "Fragment";
            case B:
              return "Portal";
            case S:
              return "Profiler";
            case P:
              return "StrictMode";
            case N:
              return "Suspense";
            case _:
              return "SuspenseList";
          }
          if ("object" === typeof e)
            switch (e.$$typeof) {
              case E:
                return (e.displayName || "Context") + ".Consumer";
              case x:
                return (e._context.displayName || "Context") + ".Provider";
              case M:
                var t = e.render;
                return (
                  (e = e.displayName) ||
                    (e =
                      "" !== (e = t.displayName || t.name || "")
                        ? "ForwardRef(" + e + ")"
                        : "ForwardRef"),
                  e
                );
              case L:
                return null !== (t = e.displayName || null)
                  ? t
                  : H(e.type) || "Memo";
              case T:
                (t = e._payload), (e = e._init);
                try {
                  return H(e(t));
                } catch (n) {}
            }
          return null;
        }
        function V(e) {
          var t = e.type;
          switch (e.tag) {
            case 24:
              return "Cache";
            case 9:
              return (t.displayName || "Context") + ".Consumer";
            case 10:
              return (t._context.displayName || "Context") + ".Provider";
            case 18:
              return "DehydratedFragment";
            case 11:
              return (
                (e = (e = t.render).displayName || e.name || ""),
                t.displayName ||
                  ("" !== e ? "ForwardRef(" + e + ")" : "ForwardRef")
              );
            case 7:
              return "Fragment";
            case 5:
              return t;
            case 4:
              return "Portal";
            case 3:
              return "Root";
            case 6:
              return "Text";
            case 16:
              return H(t);
            case 8:
              return t === P ? "StrictMode" : "Mode";
            case 22:
              return "Offscreen";
            case 12:
              return "Profiler";
            case 21:
              return "Scope";
            case 13:
              return "Suspense";
            case 19:
              return "SuspenseList";
            case 25:
              return "TracingMarker";
            case 1:
            case 0:
            case 17:
            case 2:
            case 14:
            case 15:
              if ("function" === typeof t)
                return t.displayName || t.name || null;
              if ("string" === typeof t) return t;
          }
          return null;
        }
        function $(e) {
          switch (typeof e) {
            case "boolean":
            case "number":
            case "string":
            case "undefined":
            case "object":
              return e;
            default:
              return "";
          }
        }
        function W(e) {
          var t = e.type;
          return (
            (e = e.nodeName) &&
            "input" === e.toLowerCase() &&
            ("checkbox" === t || "radio" === t)
          );
        }
        function Q(e) {
          e._valueTracker ||
            (e._valueTracker = (function (e) {
              var t = W(e) ? "checked" : "value",
                n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                r = "" + e[t];
              if (
                !e.hasOwnProperty(t) &&
                "undefined" !== typeof n &&
                "function" === typeof n.get &&
                "function" === typeof n.set
              ) {
                var o = n.get,
                  a = n.set;
                return (
                  Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function () {
                      return o.call(this);
                    },
                    set: function (e) {
                      (r = "" + e), a.call(this, e);
                    },
                  }),
                  Object.defineProperty(e, t, { enumerable: n.enumerable }),
                  {
                    getValue: function () {
                      return r;
                    },
                    setValue: function (e) {
                      r = "" + e;
                    },
                    stopTracking: function () {
                      (e._valueTracker = null), delete e[t];
                    },
                  }
                );
              }
            })(e));
        }
        function X(e) {
          if (!e) return !1;
          var t = e._valueTracker;
          if (!t) return !0;
          var n = t.getValue(),
            r = "";
          return (
            e && (r = W(e) ? (e.checked ? "true" : "false") : e.value),
            (e = r) !== n && (t.setValue(e), !0)
          );
        }
        function K(e) {
          if (
            "undefined" ===
            typeof (e =
              e || ("undefined" !== typeof document ? document : void 0))
          )
            return null;
          try {
            return e.activeElement || e.body;
          } catch (t) {
            return e.body;
          }
        }
        function q(e, t) {
          var n = t.checked;
          return U({}, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: null != n ? n : e._wrapperState.initialChecked,
          });
        }
        function Y(e, t) {
          var n = null == t.defaultValue ? "" : t.defaultValue,
            r = null != t.checked ? t.checked : t.defaultChecked;
          (n = $(null != t.value ? t.value : n)),
            (e._wrapperState = {
              initialChecked: r,
              initialValue: n,
              controlled:
                "checkbox" === t.type || "radio" === t.type
                  ? null != t.checked
                  : null != t.value,
            });
        }
        function J(e, t) {
          null != (t = t.checked) && y(e, "checked", t, !1);
        }
        function G(e, t) {
          J(e, t);
          var n = $(t.value),
            r = t.type;
          if (null != n)
            "number" === r
              ? ((0 === n && "" === e.value) || e.value != n) &&
                (e.value = "" + n)
              : e.value !== "" + n && (e.value = "" + n);
          else if ("submit" === r || "reset" === r)
            return void e.removeAttribute("value");
          t.hasOwnProperty("value")
            ? ee(e, t.type, n)
            : t.hasOwnProperty("defaultValue") &&
              ee(e, t.type, $(t.defaultValue)),
            null == t.checked &&
              null != t.defaultChecked &&
              (e.defaultChecked = !!t.defaultChecked);
        }
        function Z(e, t, n) {
          if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
            var r = t.type;
            if (
              !(
                ("submit" !== r && "reset" !== r) ||
                (void 0 !== t.value && null !== t.value)
              )
            )
              return;
            (t = "" + e._wrapperState.initialValue),
              n || t === e.value || (e.value = t),
              (e.defaultValue = t);
          }
          "" !== (n = e.name) && (e.name = ""),
            (e.defaultChecked = !!e._wrapperState.initialChecked),
            "" !== n && (e.name = n);
        }
        function ee(e, t, n) {
          ("number" === t && K(e.ownerDocument) === e) ||
            (null == n
              ? (e.defaultValue = "" + e._wrapperState.initialValue)
              : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
        }
        var te = Array.isArray;
        function ne(e, t, n, r) {
          if (((e = e.options), t)) {
            t = {};
            for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
            for (n = 0; n < e.length; n++)
              (o = t.hasOwnProperty("$" + e[n].value)),
                e[n].selected !== o && (e[n].selected = o),
                o && r && (e[n].defaultSelected = !0);
          } else {
            for (n = "" + $(n), t = null, o = 0; o < e.length; o++) {
              if (e[o].value === n)
                return (
                  (e[o].selected = !0), void (r && (e[o].defaultSelected = !0))
                );
              null !== t || e[o].disabled || (t = e[o]);
            }
            null !== t && (t.selected = !0);
          }
        }
        function re(e, t) {
          if (null != t.dangerouslySetInnerHTML) throw Error(a(91));
          return U({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: "" + e._wrapperState.initialValue,
          });
        }
        function oe(e, t) {
          var n = t.value;
          if (null == n) {
            if (((n = t.children), (t = t.defaultValue), null != n)) {
              if (null != t) throw Error(a(92));
              if (te(n)) {
                if (1 < n.length) throw Error(a(93));
                n = n[0];
              }
              t = n;
            }
            null == t && (t = ""), (n = t);
          }
          e._wrapperState = { initialValue: $(n) };
        }
        function ae(e, t) {
          var n = $(t.value),
            r = $(t.defaultValue);
          null != n &&
            ((n = "" + n) !== e.value && (e.value = n),
            null == t.defaultValue &&
              e.defaultValue !== n &&
              (e.defaultValue = n)),
            null != r && (e.defaultValue = "" + r);
        }
        function le(e) {
          var t = e.textContent;
          t === e._wrapperState.initialValue &&
            "" !== t &&
            null !== t &&
            (e.value = t);
        }
        function ie(e) {
          switch (e) {
            case "svg":
              return "http://www.w3.org/2000/svg";
            case "math":
              return "http://www.w3.org/1998/Math/MathML";
            default:
              return "http://www.w3.org/1999/xhtml";
          }
        }
        function se(e, t) {
          return null == e || "http://www.w3.org/1999/xhtml" === e
            ? ie(t)
            : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
            ? "http://www.w3.org/1999/xhtml"
            : e;
        }
        var ue,
          ce,
          de =
            ((ce = function (e, t) {
              if (
                "http://www.w3.org/2000/svg" !== e.namespaceURI ||
                "innerHTML" in e
              )
                e.innerHTML = t;
              else {
                for (
                  (ue = ue || document.createElement("div")).innerHTML =
                    "<svg>" + t.valueOf().toString() + "</svg>",
                    t = ue.firstChild;
                  e.firstChild;

                )
                  e.removeChild(e.firstChild);
                for (; t.firstChild; ) e.appendChild(t.firstChild);
              }
            }),
            "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction
              ? function (e, t, n, r) {
                  MSApp.execUnsafeLocalFunction(function () {
                    return ce(e, t);
                  });
                }
              : ce);
        function fe(e, t) {
          if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && 3 === n.nodeType)
              return void (n.nodeValue = t);
          }
          e.textContent = t;
        }
        var pe = {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridArea: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0,
          },
          he = ["Webkit", "ms", "Moz", "O"];
        function me(e, t, n) {
          return null == t || "boolean" === typeof t || "" === t
            ? ""
            : n ||
              "number" !== typeof t ||
              0 === t ||
              (pe.hasOwnProperty(e) && pe[e])
            ? ("" + t).trim()
            : t + "px";
        }
        function ge(e, t) {
          for (var n in ((e = e.style), t))
            if (t.hasOwnProperty(n)) {
              var r = 0 === n.indexOf("--"),
                o = me(n, t[n], r);
              "float" === n && (n = "cssFloat"),
                r ? e.setProperty(n, o) : (e[n] = o);
            }
        }
        Object.keys(pe).forEach(function (e) {
          he.forEach(function (t) {
            (t = t + e.charAt(0).toUpperCase() + e.substring(1)),
              (pe[t] = pe[e]);
          });
        });
        var ve = U(
          { menuitem: !0 },
          {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0,
          }
        );
        function ke(e, t) {
          if (t) {
            if (
              ve[e] &&
              (null != t.children || null != t.dangerouslySetInnerHTML)
            )
              throw Error(a(137, e));
            if (null != t.dangerouslySetInnerHTML) {
              if (null != t.children) throw Error(a(60));
              if (
                "object" !== typeof t.dangerouslySetInnerHTML ||
                !("__html" in t.dangerouslySetInnerHTML)
              )
                throw Error(a(61));
            }
            if (null != t.style && "object" !== typeof t.style)
              throw Error(a(62));
          }
        }
        function ye(e, t) {
          if (-1 === e.indexOf("-")) return "string" === typeof t.is;
          switch (e) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
              return !1;
            default:
              return !0;
          }
        }
        var we = null;
        function be(e) {
          return (
            (e = e.target || e.srcElement || window).correspondingUseElement &&
              (e = e.correspondingUseElement),
            3 === e.nodeType ? e.parentNode : e
          );
        }
        var Be = null,
          Ce = null,
          Pe = null;
        function Se(e) {
          if ((e = wo(e))) {
            if ("function" !== typeof Be) throw Error(a(280));
            var t = e.stateNode;
            t && ((t = Bo(t)), Be(e.stateNode, e.type, t));
          }
        }
        function xe(e) {
          Ce ? (Pe ? Pe.push(e) : (Pe = [e])) : (Ce = e);
        }
        function Ee() {
          if (Ce) {
            var e = Ce,
              t = Pe;
            if (((Pe = Ce = null), Se(e), t))
              for (e = 0; e < t.length; e++) Se(t[e]);
          }
        }
        function Me(e, t) {
          return e(t);
        }
        function Ne() {}
        var _e = !1;
        function Le(e, t, n) {
          if (_e) return e(t, n);
          _e = !0;
          try {
            return Me(e, t, n);
          } finally {
            (_e = !1), (null !== Ce || null !== Pe) && (Ne(), Ee());
          }
        }
        function Te(e, t) {
          var n = e.stateNode;
          if (null === n) return null;
          var r = Bo(n);
          if (null === r) return null;
          n = r[t];
          e: switch (t) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              (r = !r.disabled) ||
                (r = !(
                  "button" === (e = e.type) ||
                  "input" === e ||
                  "select" === e ||
                  "textarea" === e
                )),
                (e = !r);
              break e;
            default:
              e = !1;
          }
          if (e) return null;
          if (n && "function" !== typeof n) throw Error(a(231, t, typeof n));
          return n;
        }
        var Ie = !1;
        if (c)
          try {
            var ze = {};
            Object.defineProperty(ze, "passive", {
              get: function () {
                Ie = !0;
              },
            }),
              window.addEventListener("test", ze, ze),
              window.removeEventListener("test", ze, ze);
          } catch (ce) {
            Ie = !1;
          }
        function Re(e, t, n, r, o, a, l, i, s) {
          var u = Array.prototype.slice.call(arguments, 3);
          try {
            t.apply(n, u);
          } catch (c) {
            this.onError(c);
          }
        }
        var Oe = !1,
          Ue = null,
          Ae = !1,
          Fe = null,
          De = {
            onError: function (e) {
              (Oe = !0), (Ue = e);
            },
          };
        function je(e, t, n, r, o, a, l, i, s) {
          (Oe = !1), (Ue = null), Re.apply(De, arguments);
        }
        function He(e) {
          var t = e,
            n = e;
          if (e.alternate) for (; t.return; ) t = t.return;
          else {
            e = t;
            do {
              0 !== (4098 & (t = e).flags) && (n = t.return), (e = t.return);
            } while (e);
          }
          return 3 === t.tag ? n : null;
        }
        function Ve(e) {
          if (13 === e.tag) {
            var t = e.memoizedState;
            if (
              (null === t &&
                null !== (e = e.alternate) &&
                (t = e.memoizedState),
              null !== t)
            )
              return t.dehydrated;
          }
          return null;
        }
        function $e(e) {
          if (He(e) !== e) throw Error(a(188));
        }
        function We(e) {
          return null !==
            (e = (function (e) {
              var t = e.alternate;
              if (!t) {
                if (null === (t = He(e))) throw Error(a(188));
                return t !== e ? null : e;
              }
              for (var n = e, r = t; ; ) {
                var o = n.return;
                if (null === o) break;
                var l = o.alternate;
                if (null === l) {
                  if (null !== (r = o.return)) {
                    n = r;
                    continue;
                  }
                  break;
                }
                if (o.child === l.child) {
                  for (l = o.child; l; ) {
                    if (l === n) return $e(o), e;
                    if (l === r) return $e(o), t;
                    l = l.sibling;
                  }
                  throw Error(a(188));
                }
                if (n.return !== r.return) (n = o), (r = l);
                else {
                  for (var i = !1, s = o.child; s; ) {
                    if (s === n) {
                      (i = !0), (n = o), (r = l);
                      break;
                    }
                    if (s === r) {
                      (i = !0), (r = o), (n = l);
                      break;
                    }
                    s = s.sibling;
                  }
                  if (!i) {
                    for (s = l.child; s; ) {
                      if (s === n) {
                        (i = !0), (n = l), (r = o);
                        break;
                      }
                      if (s === r) {
                        (i = !0), (r = l), (n = o);
                        break;
                      }
                      s = s.sibling;
                    }
                    if (!i) throw Error(a(189));
                  }
                }
                if (n.alternate !== r) throw Error(a(190));
              }
              if (3 !== n.tag) throw Error(a(188));
              return n.stateNode.current === n ? e : t;
            })(e))
            ? Qe(e)
            : null;
        }
        function Qe(e) {
          if (5 === e.tag || 6 === e.tag) return e;
          for (e = e.child; null !== e; ) {
            var t = Qe(e);
            if (null !== t) return t;
            e = e.sibling;
          }
          return null;
        }
        var Xe = o.unstable_scheduleCallback,
          Ke = o.unstable_cancelCallback,
          qe = o.unstable_shouldYield,
          Ye = o.unstable_requestPaint,
          Je = o.unstable_now,
          Ge = o.unstable_getCurrentPriorityLevel,
          Ze = o.unstable_ImmediatePriority,
          et = o.unstable_UserBlockingPriority,
          tt = o.unstable_NormalPriority,
          nt = o.unstable_LowPriority,
          rt = o.unstable_IdlePriority,
          ot = null,
          at = null;
        var lt = Math.clz32
            ? Math.clz32
            : function (e) {
                return (e >>>= 0), 0 === e ? 32 : (31 - ((it(e) / st) | 0)) | 0;
              },
          it = Math.log,
          st = Math.LN2;
        var ut = 64,
          ct = 4194304;
        function dt(e) {
          switch (e & -e) {
            case 1:
              return 1;
            case 2:
              return 2;
            case 4:
              return 4;
            case 8:
              return 8;
            case 16:
              return 16;
            case 32:
              return 32;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return 4194240 & e;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              return 130023424 & e;
            case 134217728:
              return 134217728;
            case 268435456:
              return 268435456;
            case 536870912:
              return 536870912;
            case 1073741824:
              return 1073741824;
            default:
              return e;
          }
        }
        function ft(e, t) {
          var n = e.pendingLanes;
          if (0 === n) return 0;
          var r = 0,
            o = e.suspendedLanes,
            a = e.pingedLanes,
            l = 268435455 & n;
          if (0 !== l) {
            var i = l & ~o;
            0 !== i ? (r = dt(i)) : 0 !== (a &= l) && (r = dt(a));
          } else 0 !== (l = n & ~o) ? (r = dt(l)) : 0 !== a && (r = dt(a));
          if (0 === r) return 0;
          if (
            0 !== t &&
            t !== r &&
            0 === (t & o) &&
            ((o = r & -r) >= (a = t & -t) || (16 === o && 0 !== (4194240 & a)))
          )
            return t;
          if ((0 !== (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes)))
            for (e = e.entanglements, t &= r; 0 < t; )
              (o = 1 << (n = 31 - lt(t))), (r |= e[n]), (t &= ~o);
          return r;
        }
        function pt(e, t) {
          switch (e) {
            case 1:
            case 2:
            case 4:
              return t + 250;
            case 8:
            case 16:
            case 32:
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return t + 5e3;
            default:
              return -1;
          }
        }
        function ht(e) {
          return 0 !== (e = -1073741825 & e.pendingLanes)
            ? e
            : 1073741824 & e
            ? 1073741824
            : 0;
        }
        function mt() {
          var e = ut;
          return 0 === (4194240 & (ut <<= 1)) && (ut = 64), e;
        }
        function gt(e) {
          for (var t = [], n = 0; 31 > n; n++) t.push(e);
          return t;
        }
        function vt(e, t, n) {
          (e.pendingLanes |= t),
            536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
            ((e = e.eventTimes)[(t = 31 - lt(t))] = n);
        }
        function kt(e, t) {
          var n = (e.entangledLanes |= t);
          for (e = e.entanglements; n; ) {
            var r = 31 - lt(n),
              o = 1 << r;
            (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
          }
        }
        var yt = 0;
        function wt(e) {
          return 1 < (e &= -e)
            ? 4 < e
              ? 0 !== (268435455 & e)
                ? 16
                : 536870912
              : 4
            : 1;
        }
        var bt,
          Bt,
          Ct,
          Pt,
          St,
          xt = !1,
          Et = [],
          Mt = null,
          Nt = null,
          _t = null,
          Lt = new Map(),
          Tt = new Map(),
          It = [],
          zt =
            "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
              " "
            );
        function Rt(e, t) {
          switch (e) {
            case "focusin":
            case "focusout":
              Mt = null;
              break;
            case "dragenter":
            case "dragleave":
              Nt = null;
              break;
            case "mouseover":
            case "mouseout":
              _t = null;
              break;
            case "pointerover":
            case "pointerout":
              Lt.delete(t.pointerId);
              break;
            case "gotpointercapture":
            case "lostpointercapture":
              Tt.delete(t.pointerId);
          }
        }
        function Ot(e, t, n, r, o, a) {
          return null === e || e.nativeEvent !== a
            ? ((e = {
                blockedOn: t,
                domEventName: n,
                eventSystemFlags: r,
                nativeEvent: a,
                targetContainers: [o],
              }),
              null !== t && null !== (t = wo(t)) && Bt(t),
              e)
            : ((e.eventSystemFlags |= r),
              (t = e.targetContainers),
              null !== o && -1 === t.indexOf(o) && t.push(o),
              e);
        }
        function Ut(e) {
          var t = yo(e.target);
          if (null !== t) {
            var n = He(t);
            if (null !== n)
              if (13 === (t = n.tag)) {
                if (null !== (t = Ve(n)))
                  return (
                    (e.blockedOn = t),
                    void St(e.priority, function () {
                      Ct(n);
                    })
                  );
              } else if (
                3 === t &&
                n.stateNode.current.memoizedState.isDehydrated
              )
                return void (e.blockedOn =
                  3 === n.tag ? n.stateNode.containerInfo : null);
          }
          e.blockedOn = null;
        }
        function At(e) {
          if (null !== e.blockedOn) return !1;
          for (var t = e.targetContainers; 0 < t.length; ) {
            var n = qt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
            if (null !== n)
              return null !== (t = wo(n)) && Bt(t), (e.blockedOn = n), !1;
            var r = new (n = e.nativeEvent).constructor(n.type, n);
            (we = r), n.target.dispatchEvent(r), (we = null), t.shift();
          }
          return !0;
        }
        function Ft(e, t, n) {
          At(e) && n.delete(t);
        }
        function Dt() {
          (xt = !1),
            null !== Mt && At(Mt) && (Mt = null),
            null !== Nt && At(Nt) && (Nt = null),
            null !== _t && At(_t) && (_t = null),
            Lt.forEach(Ft),
            Tt.forEach(Ft);
        }
        function jt(e, t) {
          e.blockedOn === t &&
            ((e.blockedOn = null),
            xt ||
              ((xt = !0),
              o.unstable_scheduleCallback(o.unstable_NormalPriority, Dt)));
        }
        function Ht(e) {
          function t(t) {
            return jt(t, e);
          }
          if (0 < Et.length) {
            jt(Et[0], e);
            for (var n = 1; n < Et.length; n++) {
              var r = Et[n];
              r.blockedOn === e && (r.blockedOn = null);
            }
          }
          for (
            null !== Mt && jt(Mt, e),
              null !== Nt && jt(Nt, e),
              null !== _t && jt(_t, e),
              Lt.forEach(t),
              Tt.forEach(t),
              n = 0;
            n < It.length;
            n++
          )
            (r = It[n]).blockedOn === e && (r.blockedOn = null);
          for (; 0 < It.length && null === (n = It[0]).blockedOn; )
            Ut(n), null === n.blockedOn && It.shift();
        }
        var Vt = w.ReactCurrentBatchConfig,
          $t = !0;
        function Wt(e, t, n, r) {
          var o = yt,
            a = Vt.transition;
          Vt.transition = null;
          try {
            (yt = 1), Xt(e, t, n, r);
          } finally {
            (yt = o), (Vt.transition = a);
          }
        }
        function Qt(e, t, n, r) {
          var o = yt,
            a = Vt.transition;
          Vt.transition = null;
          try {
            (yt = 4), Xt(e, t, n, r);
          } finally {
            (yt = o), (Vt.transition = a);
          }
        }
        function Xt(e, t, n, r) {
          if ($t) {
            var o = qt(e, t, n, r);
            if (null === o) $r(e, t, r, Kt, n), Rt(e, r);
            else if (
              (function (e, t, n, r, o) {
                switch (t) {
                  case "focusin":
                    return (Mt = Ot(Mt, e, t, n, r, o)), !0;
                  case "dragenter":
                    return (Nt = Ot(Nt, e, t, n, r, o)), !0;
                  case "mouseover":
                    return (_t = Ot(_t, e, t, n, r, o)), !0;
                  case "pointerover":
                    var a = o.pointerId;
                    return Lt.set(a, Ot(Lt.get(a) || null, e, t, n, r, o)), !0;
                  case "gotpointercapture":
                    return (
                      (a = o.pointerId),
                      Tt.set(a, Ot(Tt.get(a) || null, e, t, n, r, o)),
                      !0
                    );
                }
                return !1;
              })(o, e, t, n, r)
            )
              r.stopPropagation();
            else if ((Rt(e, r), 4 & t && -1 < zt.indexOf(e))) {
              for (; null !== o; ) {
                var a = wo(o);
                if (
                  (null !== a && bt(a),
                  null === (a = qt(e, t, n, r)) && $r(e, t, r, Kt, n),
                  a === o)
                )
                  break;
                o = a;
              }
              null !== o && r.stopPropagation();
            } else $r(e, t, r, null, n);
          }
        }
        var Kt = null;
        function qt(e, t, n, r) {
          if (((Kt = null), null !== (e = yo((e = be(r))))))
            if (null === (t = He(e))) e = null;
            else if (13 === (n = t.tag)) {
              if (null !== (e = Ve(t))) return e;
              e = null;
            } else if (3 === n) {
              if (t.stateNode.current.memoizedState.isDehydrated)
                return 3 === t.tag ? t.stateNode.containerInfo : null;
              e = null;
            } else t !== e && (e = null);
          return (Kt = e), null;
        }
        function Yt(e) {
          switch (e) {
            case "cancel":
            case "click":
            case "close":
            case "contextmenu":
            case "copy":
            case "cut":
            case "auxclick":
            case "dblclick":
            case "dragend":
            case "dragstart":
            case "drop":
            case "focusin":
            case "focusout":
            case "input":
            case "invalid":
            case "keydown":
            case "keypress":
            case "keyup":
            case "mousedown":
            case "mouseup":
            case "paste":
            case "pause":
            case "play":
            case "pointercancel":
            case "pointerdown":
            case "pointerup":
            case "ratechange":
            case "reset":
            case "resize":
            case "seeked":
            case "submit":
            case "touchcancel":
            case "touchend":
            case "touchstart":
            case "volumechange":
            case "change":
            case "selectionchange":
            case "textInput":
            case "compositionstart":
            case "compositionend":
            case "compositionupdate":
            case "beforeblur":
            case "afterblur":
            case "beforeinput":
            case "blur":
            case "fullscreenchange":
            case "focus":
            case "hashchange":
            case "popstate":
            case "select":
            case "selectstart":
              return 1;
            case "drag":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "mousemove":
            case "mouseout":
            case "mouseover":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "scroll":
            case "toggle":
            case "touchmove":
            case "wheel":
            case "mouseenter":
            case "mouseleave":
            case "pointerenter":
            case "pointerleave":
              return 4;
            case "message":
              switch (Ge()) {
                case Ze:
                  return 1;
                case et:
                  return 4;
                case tt:
                case nt:
                  return 16;
                case rt:
                  return 536870912;
                default:
                  return 16;
              }
            default:
              return 16;
          }
        }
        var Jt = null,
          Gt = null,
          Zt = null;
        function en() {
          if (Zt) return Zt;
          var e,
            t,
            n = Gt,
            r = n.length,
            o = "value" in Jt ? Jt.value : Jt.textContent,
            a = o.length;
          for (e = 0; e < r && n[e] === o[e]; e++);
          var l = r - e;
          for (t = 1; t <= l && n[r - t] === o[a - t]; t++);
          return (Zt = o.slice(e, 1 < t ? 1 - t : void 0));
        }
        function tn(e) {
          var t = e.keyCode;
          return (
            "charCode" in e
              ? 0 === (e = e.charCode) && 13 === t && (e = 13)
              : (e = t),
            10 === e && (e = 13),
            32 <= e || 13 === e ? e : 0
          );
        }
        function nn() {
          return !0;
        }
        function rn() {
          return !1;
        }
        function on(e) {
          function t(t, n, r, o, a) {
            for (var l in ((this._reactName = t),
            (this._targetInst = r),
            (this.type = n),
            (this.nativeEvent = o),
            (this.target = a),
            (this.currentTarget = null),
            e))
              e.hasOwnProperty(l) && ((t = e[l]), (this[l] = t ? t(o) : o[l]));
            return (
              (this.isDefaultPrevented = (
                null != o.defaultPrevented
                  ? o.defaultPrevented
                  : !1 === o.returnValue
              )
                ? nn
                : rn),
              (this.isPropagationStopped = rn),
              this
            );
          }
          return (
            U(t.prototype, {
              preventDefault: function () {
                this.defaultPrevented = !0;
                var e = this.nativeEvent;
                e &&
                  (e.preventDefault
                    ? e.preventDefault()
                    : "unknown" !== typeof e.returnValue &&
                      (e.returnValue = !1),
                  (this.isDefaultPrevented = nn));
              },
              stopPropagation: function () {
                var e = this.nativeEvent;
                e &&
                  (e.stopPropagation
                    ? e.stopPropagation()
                    : "unknown" !== typeof e.cancelBubble &&
                      (e.cancelBubble = !0),
                  (this.isPropagationStopped = nn));
              },
              persist: function () {},
              isPersistent: nn,
            }),
            t
          );
        }
        var an,
          ln,
          sn,
          un = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function (e) {
              return e.timeStamp || Date.now();
            },
            defaultPrevented: 0,
            isTrusted: 0,
          },
          cn = on(un),
          dn = U({}, un, { view: 0, detail: 0 }),
          fn = on(dn),
          pn = U({}, dn, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: Sn,
            button: 0,
            buttons: 0,
            relatedTarget: function (e) {
              return void 0 === e.relatedTarget
                ? e.fromElement === e.srcElement
                  ? e.toElement
                  : e.fromElement
                : e.relatedTarget;
            },
            movementX: function (e) {
              return "movementX" in e
                ? e.movementX
                : (e !== sn &&
                    (sn && "mousemove" === e.type
                      ? ((an = e.screenX - sn.screenX),
                        (ln = e.screenY - sn.screenY))
                      : (ln = an = 0),
                    (sn = e)),
                  an);
            },
            movementY: function (e) {
              return "movementY" in e ? e.movementY : ln;
            },
          }),
          hn = on(pn),
          mn = on(U({}, pn, { dataTransfer: 0 })),
          gn = on(U({}, dn, { relatedTarget: 0 })),
          vn = on(
            U({}, un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })
          ),
          kn = U({}, un, {
            clipboardData: function (e) {
              return "clipboardData" in e
                ? e.clipboardData
                : window.clipboardData;
            },
          }),
          yn = on(kn),
          wn = on(U({}, un, { data: 0 })),
          bn = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified",
          },
          Bn = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta",
          },
          Cn = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey",
          };
        function Pn(e) {
          var t = this.nativeEvent;
          return t.getModifierState
            ? t.getModifierState(e)
            : !!(e = Cn[e]) && !!t[e];
        }
        function Sn() {
          return Pn;
        }
        var xn = U({}, dn, {
            key: function (e) {
              if (e.key) {
                var t = bn[e.key] || e.key;
                if ("Unidentified" !== t) return t;
              }
              return "keypress" === e.type
                ? 13 === (e = tn(e))
                  ? "Enter"
                  : String.fromCharCode(e)
                : "keydown" === e.type || "keyup" === e.type
                ? Bn[e.keyCode] || "Unidentified"
                : "";
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: Sn,
            charCode: function (e) {
              return "keypress" === e.type ? tn(e) : 0;
            },
            keyCode: function (e) {
              return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
            },
            which: function (e) {
              return "keypress" === e.type
                ? tn(e)
                : "keydown" === e.type || "keyup" === e.type
                ? e.keyCode
                : 0;
            },
          }),
          En = on(xn),
          Mn = on(
            U({}, pn, {
              pointerId: 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              pointerType: 0,
              isPrimary: 0,
            })
          ),
          Nn = on(
            U({}, dn, {
              touches: 0,
              targetTouches: 0,
              changedTouches: 0,
              altKey: 0,
              metaKey: 0,
              ctrlKey: 0,
              shiftKey: 0,
              getModifierState: Sn,
            })
          ),
          _n = on(
            U({}, un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })
          ),
          Ln = U({}, pn, {
            deltaX: function (e) {
              return "deltaX" in e
                ? e.deltaX
                : "wheelDeltaX" in e
                ? -e.wheelDeltaX
                : 0;
            },
            deltaY: function (e) {
              return "deltaY" in e
                ? e.deltaY
                : "wheelDeltaY" in e
                ? -e.wheelDeltaY
                : "wheelDelta" in e
                ? -e.wheelDelta
                : 0;
            },
            deltaZ: 0,
            deltaMode: 0,
          }),
          Tn = on(Ln),
          In = [9, 13, 27, 32],
          zn = c && "CompositionEvent" in window,
          Rn = null;
        c && "documentMode" in document && (Rn = document.documentMode);
        var On = c && "TextEvent" in window && !Rn,
          Un = c && (!zn || (Rn && 8 < Rn && 11 >= Rn)),
          An = String.fromCharCode(32),
          Fn = !1;
        function Dn(e, t) {
          switch (e) {
            case "keyup":
              return -1 !== In.indexOf(t.keyCode);
            case "keydown":
              return 229 !== t.keyCode;
            case "keypress":
            case "mousedown":
            case "focusout":
              return !0;
            default:
              return !1;
          }
        }
        function jn(e) {
          return "object" === typeof (e = e.detail) && "data" in e
            ? e.data
            : null;
        }
        var Hn = !1;
        var Vn = {
          color: !0,
          date: !0,
          datetime: !0,
          "datetime-local": !0,
          email: !0,
          month: !0,
          number: !0,
          password: !0,
          range: !0,
          search: !0,
          tel: !0,
          text: !0,
          time: !0,
          url: !0,
          week: !0,
        };
        function $n(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return "input" === t ? !!Vn[e.type] : "textarea" === t;
        }
        function Wn(e, t, n, r) {
          xe(r),
            0 < (t = Qr(t, "onChange")).length &&
              ((n = new cn("onChange", "change", null, n, r)),
              e.push({ event: n, listeners: t }));
        }
        var Qn = null,
          Xn = null;
        function Kn(e) {
          Ar(e, 0);
        }
        function qn(e) {
          if (X(bo(e))) return e;
        }
        function Yn(e, t) {
          if ("change" === e) return t;
        }
        var Jn = !1;
        if (c) {
          var Gn;
          if (c) {
            var Zn = "oninput" in document;
            if (!Zn) {
              var er = document.createElement("div");
              er.setAttribute("oninput", "return;"),
                (Zn = "function" === typeof er.oninput);
            }
            Gn = Zn;
          } else Gn = !1;
          Jn = Gn && (!document.documentMode || 9 < document.documentMode);
        }
        function tr() {
          Qn && (Qn.detachEvent("onpropertychange", nr), (Xn = Qn = null));
        }
        function nr(e) {
          if ("value" === e.propertyName && qn(Xn)) {
            var t = [];
            Wn(t, Xn, e, be(e)), Le(Kn, t);
          }
        }
        function rr(e, t, n) {
          "focusin" === e
            ? (tr(), (Xn = n), (Qn = t).attachEvent("onpropertychange", nr))
            : "focusout" === e && tr();
        }
        function or(e) {
          if ("selectionchange" === e || "keyup" === e || "keydown" === e)
            return qn(Xn);
        }
        function ar(e, t) {
          if ("click" === e) return qn(t);
        }
        function lr(e, t) {
          if ("input" === e || "change" === e) return qn(t);
        }
        var ir =
          "function" === typeof Object.is
            ? Object.is
            : function (e, t) {
                return (
                  (e === t && (0 !== e || 1 / e === 1 / t)) ||
                  (e !== e && t !== t)
                );
              };
        function sr(e, t) {
          if (ir(e, t)) return !0;
          if (
            "object" !== typeof e ||
            null === e ||
            "object" !== typeof t ||
            null === t
          )
            return !1;
          var n = Object.keys(e),
            r = Object.keys(t);
          if (n.length !== r.length) return !1;
          for (r = 0; r < n.length; r++) {
            var o = n[r];
            if (!d.call(t, o) || !ir(e[o], t[o])) return !1;
          }
          return !0;
        }
        function ur(e) {
          for (; e && e.firstChild; ) e = e.firstChild;
          return e;
        }
        function cr(e, t) {
          var n,
            r = ur(e);
          for (e = 0; r; ) {
            if (3 === r.nodeType) {
              if (((n = e + r.textContent.length), e <= t && n >= t))
                return { node: r, offset: t - e };
              e = n;
            }
            e: {
              for (; r; ) {
                if (r.nextSibling) {
                  r = r.nextSibling;
                  break e;
                }
                r = r.parentNode;
              }
              r = void 0;
            }
            r = ur(r);
          }
        }
        function dr(e, t) {
          return (
            !(!e || !t) &&
            (e === t ||
              ((!e || 3 !== e.nodeType) &&
                (t && 3 === t.nodeType
                  ? dr(e, t.parentNode)
                  : "contains" in e
                  ? e.contains(t)
                  : !!e.compareDocumentPosition &&
                    !!(16 & e.compareDocumentPosition(t)))))
          );
        }
        function fr() {
          for (var e = window, t = K(); t instanceof e.HTMLIFrameElement; ) {
            try {
              var n = "string" === typeof t.contentWindow.location.href;
            } catch (r) {
              n = !1;
            }
            if (!n) break;
            t = K((e = t.contentWindow).document);
          }
          return t;
        }
        function pr(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return (
            t &&
            (("input" === t &&
              ("text" === e.type ||
                "search" === e.type ||
                "tel" === e.type ||
                "url" === e.type ||
                "password" === e.type)) ||
              "textarea" === t ||
              "true" === e.contentEditable)
          );
        }
        function hr(e) {
          var t = fr(),
            n = e.focusedElem,
            r = e.selectionRange;
          if (
            t !== n &&
            n &&
            n.ownerDocument &&
            dr(n.ownerDocument.documentElement, n)
          ) {
            if (null !== r && pr(n))
              if (
                ((t = r.start),
                void 0 === (e = r.end) && (e = t),
                "selectionStart" in n)
              )
                (n.selectionStart = t),
                  (n.selectionEnd = Math.min(e, n.value.length));
              else if (
                (e =
                  ((t = n.ownerDocument || document) && t.defaultView) ||
                  window).getSelection
              ) {
                e = e.getSelection();
                var o = n.textContent.length,
                  a = Math.min(r.start, o);
                (r = void 0 === r.end ? a : Math.min(r.end, o)),
                  !e.extend && a > r && ((o = r), (r = a), (a = o)),
                  (o = cr(n, a));
                var l = cr(n, r);
                o &&
                  l &&
                  (1 !== e.rangeCount ||
                    e.anchorNode !== o.node ||
                    e.anchorOffset !== o.offset ||
                    e.focusNode !== l.node ||
                    e.focusOffset !== l.offset) &&
                  ((t = t.createRange()).setStart(o.node, o.offset),
                  e.removeAllRanges(),
                  a > r
                    ? (e.addRange(t), e.extend(l.node, l.offset))
                    : (t.setEnd(l.node, l.offset), e.addRange(t)));
              }
            for (t = [], e = n; (e = e.parentNode); )
              1 === e.nodeType &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
            for (
              "function" === typeof n.focus && n.focus(), n = 0;
              n < t.length;
              n++
            )
              ((e = t[n]).element.scrollLeft = e.left),
                (e.element.scrollTop = e.top);
          }
        }
        var mr = c && "documentMode" in document && 11 >= document.documentMode,
          gr = null,
          vr = null,
          kr = null,
          yr = !1;
        function wr(e, t, n) {
          var r =
            n.window === n
              ? n.document
              : 9 === n.nodeType
              ? n
              : n.ownerDocument;
          yr ||
            null == gr ||
            gr !== K(r) ||
            ("selectionStart" in (r = gr) && pr(r)
              ? (r = { start: r.selectionStart, end: r.selectionEnd })
              : (r = {
                  anchorNode: (r = (
                    (r.ownerDocument && r.ownerDocument.defaultView) ||
                    window
                  ).getSelection()).anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
                }),
            (kr && sr(kr, r)) ||
              ((kr = r),
              0 < (r = Qr(vr, "onSelect")).length &&
                ((t = new cn("onSelect", "select", null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = gr))));
        }
        function br(e, t) {
          var n = {};
          return (
            (n[e.toLowerCase()] = t.toLowerCase()),
            (n["Webkit" + e] = "webkit" + t),
            (n["Moz" + e] = "moz" + t),
            n
          );
        }
        var Br = {
            animationend: br("Animation", "AnimationEnd"),
            animationiteration: br("Animation", "AnimationIteration"),
            animationstart: br("Animation", "AnimationStart"),
            transitionend: br("Transition", "TransitionEnd"),
          },
          Cr = {},
          Pr = {};
        function Sr(e) {
          if (Cr[e]) return Cr[e];
          if (!Br[e]) return e;
          var t,
            n = Br[e];
          for (t in n)
            if (n.hasOwnProperty(t) && t in Pr) return (Cr[e] = n[t]);
          return e;
        }
        c &&
          ((Pr = document.createElement("div").style),
          "AnimationEvent" in window ||
            (delete Br.animationend.animation,
            delete Br.animationiteration.animation,
            delete Br.animationstart.animation),
          "TransitionEvent" in window || delete Br.transitionend.transition);
        var xr = Sr("animationend"),
          Er = Sr("animationiteration"),
          Mr = Sr("animationstart"),
          Nr = Sr("transitionend"),
          _r = new Map(),
          Lr =
            "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
              " "
            );
        function Tr(e, t) {
          _r.set(e, t), s(t, [e]);
        }
        for (var Ir = 0; Ir < Lr.length; Ir++) {
          var zr = Lr[Ir];
          Tr(zr.toLowerCase(), "on" + (zr[0].toUpperCase() + zr.slice(1)));
        }
        Tr(xr, "onAnimationEnd"),
          Tr(Er, "onAnimationIteration"),
          Tr(Mr, "onAnimationStart"),
          Tr("dblclick", "onDoubleClick"),
          Tr("focusin", "onFocus"),
          Tr("focusout", "onBlur"),
          Tr(Nr, "onTransitionEnd"),
          u("onMouseEnter", ["mouseout", "mouseover"]),
          u("onMouseLeave", ["mouseout", "mouseover"]),
          u("onPointerEnter", ["pointerout", "pointerover"]),
          u("onPointerLeave", ["pointerout", "pointerover"]),
          s(
            "onChange",
            "change click focusin focusout input keydown keyup selectionchange".split(
              " "
            )
          ),
          s(
            "onSelect",
            "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
              " "
            )
          ),
          s("onBeforeInput", [
            "compositionend",
            "keypress",
            "textInput",
            "paste",
          ]),
          s(
            "onCompositionEnd",
            "compositionend focusout keydown keypress keyup mousedown".split(
              " "
            )
          ),
          s(
            "onCompositionStart",
            "compositionstart focusout keydown keypress keyup mousedown".split(
              " "
            )
          ),
          s(
            "onCompositionUpdate",
            "compositionupdate focusout keydown keypress keyup mousedown".split(
              " "
            )
          );
        var Rr =
            "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
              " "
            ),
          Or = new Set(
            "cancel close invalid load scroll toggle".split(" ").concat(Rr)
          );
        function Ur(e, t, n) {
          var r = e.type || "unknown-event";
          (e.currentTarget = n),
            (function (e, t, n, r, o, l, i, s, u) {
              if ((je.apply(this, arguments), Oe)) {
                if (!Oe) throw Error(a(198));
                var c = Ue;
                (Oe = !1), (Ue = null), Ae || ((Ae = !0), (Fe = c));
              }
            })(r, t, void 0, e),
            (e.currentTarget = null);
        }
        function Ar(e, t) {
          t = 0 !== (4 & t);
          for (var n = 0; n < e.length; n++) {
            var r = e[n],
              o = r.event;
            r = r.listeners;
            e: {
              var a = void 0;
              if (t)
                for (var l = r.length - 1; 0 <= l; l--) {
                  var i = r[l],
                    s = i.instance,
                    u = i.currentTarget;
                  if (((i = i.listener), s !== a && o.isPropagationStopped()))
                    break e;
                  Ur(o, i, u), (a = s);
                }
              else
                for (l = 0; l < r.length; l++) {
                  if (
                    ((s = (i = r[l]).instance),
                    (u = i.currentTarget),
                    (i = i.listener),
                    s !== a && o.isPropagationStopped())
                  )
                    break e;
                  Ur(o, i, u), (a = s);
                }
            }
          }
          if (Ae) throw ((e = Fe), (Ae = !1), (Fe = null), e);
        }
        function Fr(e, t) {
          var n = t[go];
          void 0 === n && (n = t[go] = new Set());
          var r = e + "__bubble";
          n.has(r) || (Vr(t, e, 2, !1), n.add(r));
        }
        function Dr(e, t, n) {
          var r = 0;
          t && (r |= 4), Vr(n, e, r, t);
        }
        var jr = "_reactListening" + Math.random().toString(36).slice(2);
        function Hr(e) {
          if (!e[jr]) {
            (e[jr] = !0),
              l.forEach(function (t) {
                "selectionchange" !== t &&
                  (Or.has(t) || Dr(t, !1, e), Dr(t, !0, e));
              });
            var t = 9 === e.nodeType ? e : e.ownerDocument;
            null === t || t[jr] || ((t[jr] = !0), Dr("selectionchange", !1, t));
          }
        }
        function Vr(e, t, n, r) {
          switch (Yt(t)) {
            case 1:
              var o = Wt;
              break;
            case 4:
              o = Qt;
              break;
            default:
              o = Xt;
          }
          (n = o.bind(null, t, n, e)),
            (o = void 0),
            !Ie ||
              ("touchstart" !== t && "touchmove" !== t && "wheel" !== t) ||
              (o = !0),
            r
              ? void 0 !== o
                ? e.addEventListener(t, n, { capture: !0, passive: o })
                : e.addEventListener(t, n, !0)
              : void 0 !== o
              ? e.addEventListener(t, n, { passive: o })
              : e.addEventListener(t, n, !1);
        }
        function $r(e, t, n, r, o) {
          var a = r;
          if (0 === (1 & t) && 0 === (2 & t) && null !== r)
            e: for (;;) {
              if (null === r) return;
              var l = r.tag;
              if (3 === l || 4 === l) {
                var i = r.stateNode.containerInfo;
                if (i === o || (8 === i.nodeType && i.parentNode === o)) break;
                if (4 === l)
                  for (l = r.return; null !== l; ) {
                    var s = l.tag;
                    if (
                      (3 === s || 4 === s) &&
                      ((s = l.stateNode.containerInfo) === o ||
                        (8 === s.nodeType && s.parentNode === o))
                    )
                      return;
                    l = l.return;
                  }
                for (; null !== i; ) {
                  if (null === (l = yo(i))) return;
                  if (5 === (s = l.tag) || 6 === s) {
                    r = a = l;
                    continue e;
                  }
                  i = i.parentNode;
                }
              }
              r = r.return;
            }
          Le(function () {
            var r = a,
              o = be(n),
              l = [];
            e: {
              var i = _r.get(e);
              if (void 0 !== i) {
                var s = cn,
                  u = e;
                switch (e) {
                  case "keypress":
                    if (0 === tn(n)) break e;
                  case "keydown":
                  case "keyup":
                    s = En;
                    break;
                  case "focusin":
                    (u = "focus"), (s = gn);
                    break;
                  case "focusout":
                    (u = "blur"), (s = gn);
                    break;
                  case "beforeblur":
                  case "afterblur":
                    s = gn;
                    break;
                  case "click":
                    if (2 === n.button) break e;
                  case "auxclick":
                  case "dblclick":
                  case "mousedown":
                  case "mousemove":
                  case "mouseup":
                  case "mouseout":
                  case "mouseover":
                  case "contextmenu":
                    s = hn;
                    break;
                  case "drag":
                  case "dragend":
                  case "dragenter":
                  case "dragexit":
                  case "dragleave":
                  case "dragover":
                  case "dragstart":
                  case "drop":
                    s = mn;
                    break;
                  case "touchcancel":
                  case "touchend":
                  case "touchmove":
                  case "touchstart":
                    s = Nn;
                    break;
                  case xr:
                  case Er:
                  case Mr:
                    s = vn;
                    break;
                  case Nr:
                    s = _n;
                    break;
                  case "scroll":
                    s = fn;
                    break;
                  case "wheel":
                    s = Tn;
                    break;
                  case "copy":
                  case "cut":
                  case "paste":
                    s = yn;
                    break;
                  case "gotpointercapture":
                  case "lostpointercapture":
                  case "pointercancel":
                  case "pointerdown":
                  case "pointermove":
                  case "pointerout":
                  case "pointerover":
                  case "pointerup":
                    s = Mn;
                }
                var c = 0 !== (4 & t),
                  d = !c && "scroll" === e,
                  f = c ? (null !== i ? i + "Capture" : null) : i;
                c = [];
                for (var p, h = r; null !== h; ) {
                  var m = (p = h).stateNode;
                  if (
                    (5 === p.tag &&
                      null !== m &&
                      ((p = m),
                      null !== f &&
                        null != (m = Te(h, f)) &&
                        c.push(Wr(h, m, p))),
                    d)
                  )
                    break;
                  h = h.return;
                }
                0 < c.length &&
                  ((i = new s(i, u, null, n, o)),
                  l.push({ event: i, listeners: c }));
              }
            }
            if (0 === (7 & t)) {
              if (
                ((s = "mouseout" === e || "pointerout" === e),
                (!(i = "mouseover" === e || "pointerover" === e) ||
                  n === we ||
                  !(u = n.relatedTarget || n.fromElement) ||
                  (!yo(u) && !u[mo])) &&
                  (s || i) &&
                  ((i =
                    o.window === o
                      ? o
                      : (i = o.ownerDocument)
                      ? i.defaultView || i.parentWindow
                      : window),
                  s
                    ? ((s = r),
                      null !==
                        (u = (u = n.relatedTarget || n.toElement)
                          ? yo(u)
                          : null) &&
                        (u !== (d = He(u)) || (5 !== u.tag && 6 !== u.tag)) &&
                        (u = null))
                    : ((s = null), (u = r)),
                  s !== u))
              ) {
                if (
                  ((c = hn),
                  (m = "onMouseLeave"),
                  (f = "onMouseEnter"),
                  (h = "mouse"),
                  ("pointerout" !== e && "pointerover" !== e) ||
                    ((c = Mn),
                    (m = "onPointerLeave"),
                    (f = "onPointerEnter"),
                    (h = "pointer")),
                  (d = null == s ? i : bo(s)),
                  (p = null == u ? i : bo(u)),
                  ((i = new c(m, h + "leave", s, n, o)).target = d),
                  (i.relatedTarget = p),
                  (m = null),
                  yo(o) === r &&
                    (((c = new c(f, h + "enter", u, n, o)).target = p),
                    (c.relatedTarget = d),
                    (m = c)),
                  (d = m),
                  s && u)
                )
                  e: {
                    for (f = u, h = 0, p = c = s; p; p = Xr(p)) h++;
                    for (p = 0, m = f; m; m = Xr(m)) p++;
                    for (; 0 < h - p; ) (c = Xr(c)), h--;
                    for (; 0 < p - h; ) (f = Xr(f)), p--;
                    for (; h--; ) {
                      if (c === f || (null !== f && c === f.alternate)) break e;
                      (c = Xr(c)), (f = Xr(f));
                    }
                    c = null;
                  }
                else c = null;
                null !== s && Kr(l, i, s, c, !1),
                  null !== u && null !== d && Kr(l, d, u, c, !0);
              }
              if (
                "select" ===
                  (s =
                    (i = r ? bo(r) : window).nodeName &&
                    i.nodeName.toLowerCase()) ||
                ("input" === s && "file" === i.type)
              )
                var g = Yn;
              else if ($n(i))
                if (Jn) g = lr;
                else {
                  g = or;
                  var v = rr;
                }
              else
                (s = i.nodeName) &&
                  "input" === s.toLowerCase() &&
                  ("checkbox" === i.type || "radio" === i.type) &&
                  (g = ar);
              switch (
                (g && (g = g(e, r))
                  ? Wn(l, g, n, o)
                  : (v && v(e, i, r),
                    "focusout" === e &&
                      (v = i._wrapperState) &&
                      v.controlled &&
                      "number" === i.type &&
                      ee(i, "number", i.value)),
                (v = r ? bo(r) : window),
                e)
              ) {
                case "focusin":
                  ($n(v) || "true" === v.contentEditable) &&
                    ((gr = v), (vr = r), (kr = null));
                  break;
                case "focusout":
                  kr = vr = gr = null;
                  break;
                case "mousedown":
                  yr = !0;
                  break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                  (yr = !1), wr(l, n, o);
                  break;
                case "selectionchange":
                  if (mr) break;
                case "keydown":
                case "keyup":
                  wr(l, n, o);
              }
              var k;
              if (zn)
                e: {
                  switch (e) {
                    case "compositionstart":
                      var y = "onCompositionStart";
                      break e;
                    case "compositionend":
                      y = "onCompositionEnd";
                      break e;
                    case "compositionupdate":
                      y = "onCompositionUpdate";
                      break e;
                  }
                  y = void 0;
                }
              else
                Hn
                  ? Dn(e, n) && (y = "onCompositionEnd")
                  : "keydown" === e &&
                    229 === n.keyCode &&
                    (y = "onCompositionStart");
              y &&
                (Un &&
                  "ko" !== n.locale &&
                  (Hn || "onCompositionStart" !== y
                    ? "onCompositionEnd" === y && Hn && (k = en())
                    : ((Gt = "value" in (Jt = o) ? Jt.value : Jt.textContent),
                      (Hn = !0))),
                0 < (v = Qr(r, y)).length &&
                  ((y = new wn(y, e, null, n, o)),
                  l.push({ event: y, listeners: v }),
                  k ? (y.data = k) : null !== (k = jn(n)) && (y.data = k))),
                (k = On
                  ? (function (e, t) {
                      switch (e) {
                        case "compositionend":
                          return jn(t);
                        case "keypress":
                          return 32 !== t.which ? null : ((Fn = !0), An);
                        case "textInput":
                          return (e = t.data) === An && Fn ? null : e;
                        default:
                          return null;
                      }
                    })(e, n)
                  : (function (e, t) {
                      if (Hn)
                        return "compositionend" === e || (!zn && Dn(e, t))
                          ? ((e = en()), (Zt = Gt = Jt = null), (Hn = !1), e)
                          : null;
                      switch (e) {
                        case "paste":
                        default:
                          return null;
                        case "keypress":
                          if (
                            !(t.ctrlKey || t.altKey || t.metaKey) ||
                            (t.ctrlKey && t.altKey)
                          ) {
                            if (t.char && 1 < t.char.length) return t.char;
                            if (t.which) return String.fromCharCode(t.which);
                          }
                          return null;
                        case "compositionend":
                          return Un && "ko" !== t.locale ? null : t.data;
                      }
                    })(e, n)) &&
                  0 < (r = Qr(r, "onBeforeInput")).length &&
                  ((o = new wn("onBeforeInput", "beforeinput", null, n, o)),
                  l.push({ event: o, listeners: r }),
                  (o.data = k));
            }
            Ar(l, t);
          });
        }
        function Wr(e, t, n) {
          return { instance: e, listener: t, currentTarget: n };
        }
        function Qr(e, t) {
          for (var n = t + "Capture", r = []; null !== e; ) {
            var o = e,
              a = o.stateNode;
            5 === o.tag &&
              null !== a &&
              ((o = a),
              null != (a = Te(e, n)) && r.unshift(Wr(e, a, o)),
              null != (a = Te(e, t)) && r.push(Wr(e, a, o))),
              (e = e.return);
          }
          return r;
        }
        function Xr(e) {
          if (null === e) return null;
          do {
            e = e.return;
          } while (e && 5 !== e.tag);
          return e || null;
        }
        function Kr(e, t, n, r, o) {
          for (var a = t._reactName, l = []; null !== n && n !== r; ) {
            var i = n,
              s = i.alternate,
              u = i.stateNode;
            if (null !== s && s === r) break;
            5 === i.tag &&
              null !== u &&
              ((i = u),
              o
                ? null != (s = Te(n, a)) && l.unshift(Wr(n, s, i))
                : o || (null != (s = Te(n, a)) && l.push(Wr(n, s, i)))),
              (n = n.return);
          }
          0 !== l.length && e.push({ event: t, listeners: l });
        }
        var qr = /\r\n?/g,
          Yr = /\u0000|\uFFFD/g;
        function Jr(e) {
          return ("string" === typeof e ? e : "" + e)
            .replace(qr, "\n")
            .replace(Yr, "");
        }
        function Gr(e, t, n) {
          if (((t = Jr(t)), Jr(e) !== t && n)) throw Error(a(425));
        }
        function Zr() {}
        var eo = null,
          to = null;
        function no(e, t) {
          return (
            "textarea" === e ||
            "noscript" === e ||
            "string" === typeof t.children ||
            "number" === typeof t.children ||
            ("object" === typeof t.dangerouslySetInnerHTML &&
              null !== t.dangerouslySetInnerHTML &&
              null != t.dangerouslySetInnerHTML.__html)
          );
        }
        var ro = "function" === typeof setTimeout ? setTimeout : void 0,
          oo = "function" === typeof clearTimeout ? clearTimeout : void 0,
          ao = "function" === typeof Promise ? Promise : void 0,
          lo =
            "function" === typeof queueMicrotask
              ? queueMicrotask
              : "undefined" !== typeof ao
              ? function (e) {
                  return ao.resolve(null).then(e).catch(io);
                }
              : ro;
        function io(e) {
          setTimeout(function () {
            throw e;
          });
        }
        function so(e, t) {
          var n = t,
            r = 0;
          do {
            var o = n.nextSibling;
            if ((e.removeChild(n), o && 8 === o.nodeType))
              if ("/$" === (n = o.data)) {
                if (0 === r) return e.removeChild(o), void Ht(t);
                r--;
              } else ("$" !== n && "$?" !== n && "$!" !== n) || r++;
            n = o;
          } while (n);
          Ht(t);
        }
        function uo(e) {
          for (; null != e; e = e.nextSibling) {
            var t = e.nodeType;
            if (1 === t || 3 === t) break;
            if (8 === t) {
              if ("$" === (t = e.data) || "$!" === t || "$?" === t) break;
              if ("/$" === t) return null;
            }
          }
          return e;
        }
        function co(e) {
          e = e.previousSibling;
          for (var t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data;
              if ("$" === n || "$!" === n || "$?" === n) {
                if (0 === t) return e;
                t--;
              } else "/$" === n && t++;
            }
            e = e.previousSibling;
          }
          return null;
        }
        var fo = Math.random().toString(36).slice(2),
          po = "__reactFiber$" + fo,
          ho = "__reactProps$" + fo,
          mo = "__reactContainer$" + fo,
          go = "__reactEvents$" + fo,
          vo = "__reactListeners$" + fo,
          ko = "__reactHandles$" + fo;
        function yo(e) {
          var t = e[po];
          if (t) return t;
          for (var n = e.parentNode; n; ) {
            if ((t = n[mo] || n[po])) {
              if (
                ((n = t.alternate),
                null !== t.child || (null !== n && null !== n.child))
              )
                for (e = co(e); null !== e; ) {
                  if ((n = e[po])) return n;
                  e = co(e);
                }
              return t;
            }
            n = (e = n).parentNode;
          }
          return null;
        }
        function wo(e) {
          return !(e = e[po] || e[mo]) ||
            (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
            ? null
            : e;
        }
        function bo(e) {
          if (5 === e.tag || 6 === e.tag) return e.stateNode;
          throw Error(a(33));
        }
        function Bo(e) {
          return e[ho] || null;
        }
        var Co = [],
          Po = -1;
        function So(e) {
          return { current: e };
        }
        function xo(e) {
          0 > Po || ((e.current = Co[Po]), (Co[Po] = null), Po--);
        }
        function Eo(e, t) {
          Po++, (Co[Po] = e.current), (e.current = t);
        }
        var Mo = {},
          No = So(Mo),
          _o = So(!1),
          Lo = Mo;
        function To(e, t) {
          var n = e.type.contextTypes;
          if (!n) return Mo;
          var r = e.stateNode;
          if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
            return r.__reactInternalMemoizedMaskedChildContext;
          var o,
            a = {};
          for (o in n) a[o] = t[o];
          return (
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                t),
              (e.__reactInternalMemoizedMaskedChildContext = a)),
            a
          );
        }
        function Io(e) {
          return null !== (e = e.childContextTypes) && void 0 !== e;
        }
        function zo() {
          xo(_o), xo(No);
        }
        function Ro(e, t, n) {
          if (No.current !== Mo) throw Error(a(168));
          Eo(No, t), Eo(_o, n);
        }
        function Oo(e, t, n) {
          var r = e.stateNode;
          if (
            ((t = t.childContextTypes), "function" !== typeof r.getChildContext)
          )
            return n;
          for (var o in (r = r.getChildContext()))
            if (!(o in t)) throw Error(a(108, V(e) || "Unknown", o));
          return U({}, n, r);
        }
        function Uo(e) {
          return (
            (e =
              ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
              Mo),
            (Lo = No.current),
            Eo(No, e),
            Eo(_o, _o.current),
            !0
          );
        }
        function Ao(e, t, n) {
          var r = e.stateNode;
          if (!r) throw Error(a(169));
          n
            ? ((e = Oo(e, t, Lo)),
              (r.__reactInternalMemoizedMergedChildContext = e),
              xo(_o),
              xo(No),
              Eo(No, e))
            : xo(_o),
            Eo(_o, n);
        }
        var Fo = null,
          Do = !1,
          jo = !1;
        function Ho(e) {
          null === Fo ? (Fo = [e]) : Fo.push(e);
        }
        function Vo() {
          if (!jo && null !== Fo) {
            jo = !0;
            var e = 0,
              t = yt;
            try {
              var n = Fo;
              for (yt = 1; e < n.length; e++) {
                var r = n[e];
                do {
                  r = r(!0);
                } while (null !== r);
              }
              (Fo = null), (Do = !1);
            } catch (o) {
              throw (null !== Fo && (Fo = Fo.slice(e + 1)), Xe(Ze, Vo), o);
            } finally {
              (yt = t), (jo = !1);
            }
          }
          return null;
        }
        var $o = [],
          Wo = 0,
          Qo = null,
          Xo = 0,
          Ko = [],
          qo = 0,
          Yo = null,
          Jo = 1,
          Go = "";
        function Zo(e, t) {
          ($o[Wo++] = Xo), ($o[Wo++] = Qo), (Qo = e), (Xo = t);
        }
        function ea(e, t, n) {
          (Ko[qo++] = Jo), (Ko[qo++] = Go), (Ko[qo++] = Yo), (Yo = e);
          var r = Jo;
          e = Go;
          var o = 32 - lt(r) - 1;
          (r &= ~(1 << o)), (n += 1);
          var a = 32 - lt(t) + o;
          if (30 < a) {
            var l = o - (o % 5);
            (a = (r & ((1 << l) - 1)).toString(32)),
              (r >>= l),
              (o -= l),
              (Jo = (1 << (32 - lt(t) + o)) | (n << o) | r),
              (Go = a + e);
          } else (Jo = (1 << a) | (n << o) | r), (Go = e);
        }
        function ta(e) {
          null !== e.return && (Zo(e, 1), ea(e, 1, 0));
        }
        function na(e) {
          for (; e === Qo; )
            (Qo = $o[--Wo]), ($o[Wo] = null), (Xo = $o[--Wo]), ($o[Wo] = null);
          for (; e === Yo; )
            (Yo = Ko[--qo]),
              (Ko[qo] = null),
              (Go = Ko[--qo]),
              (Ko[qo] = null),
              (Jo = Ko[--qo]),
              (Ko[qo] = null);
        }
        var ra = null,
          oa = null,
          aa = !1,
          la = null;
        function ia(e, t) {
          var n = Lu(5, null, null, 0);
          (n.elementType = "DELETED"),
            (n.stateNode = t),
            (n.return = e),
            null === (t = e.deletions)
              ? ((e.deletions = [n]), (e.flags |= 16))
              : t.push(n);
        }
        function sa(e, t) {
          switch (e.tag) {
            case 5:
              var n = e.type;
              return (
                null !==
                  (t =
                    1 !== t.nodeType ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                      ? null
                      : t) &&
                ((e.stateNode = t), (ra = e), (oa = uo(t.firstChild)), !0)
              );
            case 6:
              return (
                null !==
                  (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t) &&
                ((e.stateNode = t), (ra = e), (oa = null), !0)
              );
            case 13:
              return (
                null !== (t = 8 !== t.nodeType ? null : t) &&
                ((n = null !== Yo ? { id: Jo, overflow: Go } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                ((n = Lu(18, null, null, 0)).stateNode = t),
                (n.return = e),
                (e.child = n),
                (ra = e),
                (oa = null),
                !0)
              );
            default:
              return !1;
          }
        }
        function ua(e) {
          return 0 !== (1 & e.mode) && 0 === (128 & e.flags);
        }
        function ca(e) {
          if (aa) {
            var t = oa;
            if (t) {
              var n = t;
              if (!sa(e, t)) {
                if (ua(e)) throw Error(a(418));
                t = uo(n.nextSibling);
                var r = ra;
                t && sa(e, t)
                  ? ia(r, n)
                  : ((e.flags = (-4097 & e.flags) | 2), (aa = !1), (ra = e));
              }
            } else {
              if (ua(e)) throw Error(a(418));
              (e.flags = (-4097 & e.flags) | 2), (aa = !1), (ra = e);
            }
          }
        }
        function da(e) {
          for (
            e = e.return;
            null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

          )
            e = e.return;
          ra = e;
        }
        function fa(e) {
          if (e !== ra) return !1;
          if (!aa) return da(e), (aa = !0), !1;
          var t;
          if (
            ((t = 3 !== e.tag) &&
              !(t = 5 !== e.tag) &&
              (t =
                "head" !== (t = e.type) &&
                "body" !== t &&
                !no(e.type, e.memoizedProps)),
            t && (t = oa))
          ) {
            if (ua(e)) throw (pa(), Error(a(418)));
            for (; t; ) ia(e, t), (t = uo(t.nextSibling));
          }
          if ((da(e), 13 === e.tag)) {
            if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
              throw Error(a(317));
            e: {
              for (e = e.nextSibling, t = 0; e; ) {
                if (8 === e.nodeType) {
                  var n = e.data;
                  if ("/$" === n) {
                    if (0 === t) {
                      oa = uo(e.nextSibling);
                      break e;
                    }
                    t--;
                  } else ("$" !== n && "$!" !== n && "$?" !== n) || t++;
                }
                e = e.nextSibling;
              }
              oa = null;
            }
          } else oa = ra ? uo(e.stateNode.nextSibling) : null;
          return !0;
        }
        function pa() {
          for (var e = oa; e; ) e = uo(e.nextSibling);
        }
        function ha() {
          (oa = ra = null), (aa = !1);
        }
        function ma(e) {
          null === la ? (la = [e]) : la.push(e);
        }
        var ga = w.ReactCurrentBatchConfig;
        function va(e, t, n) {
          if (
            null !== (e = n.ref) &&
            "function" !== typeof e &&
            "object" !== typeof e
          ) {
            if (n._owner) {
              if ((n = n._owner)) {
                if (1 !== n.tag) throw Error(a(309));
                var r = n.stateNode;
              }
              if (!r) throw Error(a(147, e));
              var o = r,
                l = "" + e;
              return null !== t &&
                null !== t.ref &&
                "function" === typeof t.ref &&
                t.ref._stringRef === l
                ? t.ref
                : ((t = function (e) {
                    var t = o.refs;
                    null === e ? delete t[l] : (t[l] = e);
                  }),
                  (t._stringRef = l),
                  t);
            }
            if ("string" !== typeof e) throw Error(a(284));
            if (!n._owner) throw Error(a(290, e));
          }
          return e;
        }
        function ka(e, t) {
          throw (
            ((e = Object.prototype.toString.call(t)),
            Error(
              a(
                31,
                "[object Object]" === e
                  ? "object with keys {" + Object.keys(t).join(", ") + "}"
                  : e
              )
            ))
          );
        }
        function ya(e) {
          return (0, e._init)(e._payload);
        }
        function wa(e) {
          function t(t, n) {
            if (e) {
              var r = t.deletions;
              null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
            }
          }
          function n(n, r) {
            if (!e) return null;
            for (; null !== r; ) t(n, r), (r = r.sibling);
            return null;
          }
          function r(e, t) {
            for (e = new Map(); null !== t; )
              null !== t.key ? e.set(t.key, t) : e.set(t.index, t),
                (t = t.sibling);
            return e;
          }
          function o(e, t) {
            return ((e = Iu(e, t)).index = 0), (e.sibling = null), e;
          }
          function l(t, n, r) {
            return (
              (t.index = r),
              e
                ? null !== (r = t.alternate)
                  ? (r = r.index) < n
                    ? ((t.flags |= 2), n)
                    : r
                  : ((t.flags |= 2), n)
                : ((t.flags |= 1048576), n)
            );
          }
          function i(t) {
            return e && null === t.alternate && (t.flags |= 2), t;
          }
          function s(e, t, n, r) {
            return null === t || 6 !== t.tag
              ? (((t = Uu(n, e.mode, r)).return = e), t)
              : (((t = o(t, n)).return = e), t);
          }
          function u(e, t, n, r) {
            var a = n.type;
            return a === C
              ? d(e, t, n.props.children, r, n.key)
              : null !== t &&
                (t.elementType === a ||
                  ("object" === typeof a &&
                    null !== a &&
                    a.$$typeof === T &&
                    ya(a) === t.type))
              ? (((r = o(t, n.props)).ref = va(e, t, n)), (r.return = e), r)
              : (((r = zu(n.type, n.key, n.props, null, e.mode, r)).ref = va(
                  e,
                  t,
                  n
                )),
                (r.return = e),
                r);
          }
          function c(e, t, n, r) {
            return null === t ||
              4 !== t.tag ||
              t.stateNode.containerInfo !== n.containerInfo ||
              t.stateNode.implementation !== n.implementation
              ? (((t = Au(n, e.mode, r)).return = e), t)
              : (((t = o(t, n.children || [])).return = e), t);
          }
          function d(e, t, n, r, a) {
            return null === t || 7 !== t.tag
              ? (((t = Ru(n, e.mode, r, a)).return = e), t)
              : (((t = o(t, n)).return = e), t);
          }
          function f(e, t, n) {
            if (("string" === typeof t && "" !== t) || "number" === typeof t)
              return ((t = Uu("" + t, e.mode, n)).return = e), t;
            if ("object" === typeof t && null !== t) {
              switch (t.$$typeof) {
                case b:
                  return (
                    ((n = zu(t.type, t.key, t.props, null, e.mode, n)).ref = va(
                      e,
                      null,
                      t
                    )),
                    (n.return = e),
                    n
                  );
                case B:
                  return ((t = Au(t, e.mode, n)).return = e), t;
                case T:
                  return f(e, (0, t._init)(t._payload), n);
              }
              if (te(t) || R(t))
                return ((t = Ru(t, e.mode, n, null)).return = e), t;
              ka(e, t);
            }
            return null;
          }
          function p(e, t, n, r) {
            var o = null !== t ? t.key : null;
            if (("string" === typeof n && "" !== n) || "number" === typeof n)
              return null !== o ? null : s(e, t, "" + n, r);
            if ("object" === typeof n && null !== n) {
              switch (n.$$typeof) {
                case b:
                  return n.key === o ? u(e, t, n, r) : null;
                case B:
                  return n.key === o ? c(e, t, n, r) : null;
                case T:
                  return p(e, t, (o = n._init)(n._payload), r);
              }
              if (te(n) || R(n)) return null !== o ? null : d(e, t, n, r, null);
              ka(e, n);
            }
            return null;
          }
          function h(e, t, n, r, o) {
            if (("string" === typeof r && "" !== r) || "number" === typeof r)
              return s(t, (e = e.get(n) || null), "" + r, o);
            if ("object" === typeof r && null !== r) {
              switch (r.$$typeof) {
                case b:
                  return u(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    o
                  );
                case B:
                  return c(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    o
                  );
                case T:
                  return h(e, t, n, (0, r._init)(r._payload), o);
              }
              if (te(r) || R(r))
                return d(t, (e = e.get(n) || null), r, o, null);
              ka(t, r);
            }
            return null;
          }
          function m(o, a, i, s) {
            for (
              var u = null, c = null, d = a, m = (a = 0), g = null;
              null !== d && m < i.length;
              m++
            ) {
              d.index > m ? ((g = d), (d = null)) : (g = d.sibling);
              var v = p(o, d, i[m], s);
              if (null === v) {
                null === d && (d = g);
                break;
              }
              e && d && null === v.alternate && t(o, d),
                (a = l(v, a, m)),
                null === c ? (u = v) : (c.sibling = v),
                (c = v),
                (d = g);
            }
            if (m === i.length) return n(o, d), aa && Zo(o, m), u;
            if (null === d) {
              for (; m < i.length; m++)
                null !== (d = f(o, i[m], s)) &&
                  ((a = l(d, a, m)),
                  null === c ? (u = d) : (c.sibling = d),
                  (c = d));
              return aa && Zo(o, m), u;
            }
            for (d = r(o, d); m < i.length; m++)
              null !== (g = h(d, o, m, i[m], s)) &&
                (e &&
                  null !== g.alternate &&
                  d.delete(null === g.key ? m : g.key),
                (a = l(g, a, m)),
                null === c ? (u = g) : (c.sibling = g),
                (c = g));
            return (
              e &&
                d.forEach(function (e) {
                  return t(o, e);
                }),
              aa && Zo(o, m),
              u
            );
          }
          function g(o, i, s, u) {
            var c = R(s);
            if ("function" !== typeof c) throw Error(a(150));
            if (null == (s = c.call(s))) throw Error(a(151));
            for (
              var d = (c = null), m = i, g = (i = 0), v = null, k = s.next();
              null !== m && !k.done;
              g++, k = s.next()
            ) {
              m.index > g ? ((v = m), (m = null)) : (v = m.sibling);
              var y = p(o, m, k.value, u);
              if (null === y) {
                null === m && (m = v);
                break;
              }
              e && m && null === y.alternate && t(o, m),
                (i = l(y, i, g)),
                null === d ? (c = y) : (d.sibling = y),
                (d = y),
                (m = v);
            }
            if (k.done) return n(o, m), aa && Zo(o, g), c;
            if (null === m) {
              for (; !k.done; g++, k = s.next())
                null !== (k = f(o, k.value, u)) &&
                  ((i = l(k, i, g)),
                  null === d ? (c = k) : (d.sibling = k),
                  (d = k));
              return aa && Zo(o, g), c;
            }
            for (m = r(o, m); !k.done; g++, k = s.next())
              null !== (k = h(m, o, g, k.value, u)) &&
                (e &&
                  null !== k.alternate &&
                  m.delete(null === k.key ? g : k.key),
                (i = l(k, i, g)),
                null === d ? (c = k) : (d.sibling = k),
                (d = k));
            return (
              e &&
                m.forEach(function (e) {
                  return t(o, e);
                }),
              aa && Zo(o, g),
              c
            );
          }
          return function e(r, a, l, s) {
            if (
              ("object" === typeof l &&
                null !== l &&
                l.type === C &&
                null === l.key &&
                (l = l.props.children),
              "object" === typeof l && null !== l)
            ) {
              switch (l.$$typeof) {
                case b:
                  e: {
                    for (var u = l.key, c = a; null !== c; ) {
                      if (c.key === u) {
                        if ((u = l.type) === C) {
                          if (7 === c.tag) {
                            n(r, c.sibling),
                              ((a = o(c, l.props.children)).return = r),
                              (r = a);
                            break e;
                          }
                        } else if (
                          c.elementType === u ||
                          ("object" === typeof u &&
                            null !== u &&
                            u.$$typeof === T &&
                            ya(u) === c.type)
                        ) {
                          n(r, c.sibling),
                            ((a = o(c, l.props)).ref = va(r, c, l)),
                            (a.return = r),
                            (r = a);
                          break e;
                        }
                        n(r, c);
                        break;
                      }
                      t(r, c), (c = c.sibling);
                    }
                    l.type === C
                      ? (((a = Ru(l.props.children, r.mode, s, l.key)).return =
                          r),
                        (r = a))
                      : (((s = zu(
                          l.type,
                          l.key,
                          l.props,
                          null,
                          r.mode,
                          s
                        )).ref = va(r, a, l)),
                        (s.return = r),
                        (r = s));
                  }
                  return i(r);
                case B:
                  e: {
                    for (c = l.key; null !== a; ) {
                      if (a.key === c) {
                        if (
                          4 === a.tag &&
                          a.stateNode.containerInfo === l.containerInfo &&
                          a.stateNode.implementation === l.implementation
                        ) {
                          n(r, a.sibling),
                            ((a = o(a, l.children || [])).return = r),
                            (r = a);
                          break e;
                        }
                        n(r, a);
                        break;
                      }
                      t(r, a), (a = a.sibling);
                    }
                    ((a = Au(l, r.mode, s)).return = r), (r = a);
                  }
                  return i(r);
                case T:
                  return e(r, a, (c = l._init)(l._payload), s);
              }
              if (te(l)) return m(r, a, l, s);
              if (R(l)) return g(r, a, l, s);
              ka(r, l);
            }
            return ("string" === typeof l && "" !== l) || "number" === typeof l
              ? ((l = "" + l),
                null !== a && 6 === a.tag
                  ? (n(r, a.sibling), ((a = o(a, l)).return = r), (r = a))
                  : (n(r, a), ((a = Uu(l, r.mode, s)).return = r), (r = a)),
                i(r))
              : n(r, a);
          };
        }
        var ba = wa(!0),
          Ba = wa(!1),
          Ca = So(null),
          Pa = null,
          Sa = null,
          xa = null;
        function Ea() {
          xa = Sa = Pa = null;
        }
        function Ma(e) {
          var t = Ca.current;
          xo(Ca), (e._currentValue = t);
        }
        function Na(e, t, n) {
          for (; null !== e; ) {
            var r = e.alternate;
            if (
              ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
                : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
              e === n)
            )
              break;
            e = e.return;
          }
        }
        function _a(e, t) {
          (Pa = e),
            (xa = Sa = null),
            null !== (e = e.dependencies) &&
              null !== e.firstContext &&
              (0 !== (e.lanes & t) && (yi = !0), (e.firstContext = null));
        }
        function La(e) {
          var t = e._currentValue;
          if (xa !== e)
            if (
              ((e = { context: e, memoizedValue: t, next: null }), null === Sa)
            ) {
              if (null === Pa) throw Error(a(308));
              (Sa = e), (Pa.dependencies = { lanes: 0, firstContext: e });
            } else Sa = Sa.next = e;
          return t;
        }
        var Ta = null;
        function Ia(e) {
          null === Ta ? (Ta = [e]) : Ta.push(e);
        }
        function za(e, t, n, r) {
          var o = t.interleaved;
          return (
            null === o
              ? ((n.next = n), Ia(t))
              : ((n.next = o.next), (o.next = n)),
            (t.interleaved = n),
            Ra(e, r)
          );
        }
        function Ra(e, t) {
          e.lanes |= t;
          var n = e.alternate;
          for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; )
            (e.childLanes |= t),
              null !== (n = e.alternate) && (n.childLanes |= t),
              (n = e),
              (e = e.return);
          return 3 === n.tag ? n.stateNode : null;
        }
        var Oa = !1;
        function Ua(e) {
          e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: { pending: null, interleaved: null, lanes: 0 },
            effects: null,
          };
        }
        function Aa(e, t) {
          (e = e.updateQueue),
            t.updateQueue === e &&
              (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
              });
        }
        function Fa(e, t) {
          return {
            eventTime: e,
            lane: t,
            tag: 0,
            payload: null,
            callback: null,
            next: null,
          };
        }
        function Da(e, t, n) {
          var r = e.updateQueue;
          if (null === r) return null;
          if (((r = r.shared), 0 !== (2 & Ms))) {
            var o = r.pending;
            return (
              null === o ? (t.next = t) : ((t.next = o.next), (o.next = t)),
              (r.pending = t),
              Ra(e, n)
            );
          }
          return (
            null === (o = r.interleaved)
              ? ((t.next = t), Ia(r))
              : ((t.next = o.next), (o.next = t)),
            (r.interleaved = t),
            Ra(e, n)
          );
        }
        function ja(e, t, n) {
          if (
            null !== (t = t.updateQueue) &&
            ((t = t.shared), 0 !== (4194240 & n))
          ) {
            var r = t.lanes;
            (n |= r &= e.pendingLanes), (t.lanes = n), kt(e, n);
          }
        }
        function Ha(e, t) {
          var n = e.updateQueue,
            r = e.alternate;
          if (null !== r && n === (r = r.updateQueue)) {
            var o = null,
              a = null;
            if (null !== (n = n.firstBaseUpdate)) {
              do {
                var l = {
                  eventTime: n.eventTime,
                  lane: n.lane,
                  tag: n.tag,
                  payload: n.payload,
                  callback: n.callback,
                  next: null,
                };
                null === a ? (o = a = l) : (a = a.next = l), (n = n.next);
              } while (null !== n);
              null === a ? (o = a = t) : (a = a.next = t);
            } else o = a = t;
            return (
              (n = {
                baseState: r.baseState,
                firstBaseUpdate: o,
                lastBaseUpdate: a,
                shared: r.shared,
                effects: r.effects,
              }),
              void (e.updateQueue = n)
            );
          }
          null === (e = n.lastBaseUpdate)
            ? (n.firstBaseUpdate = t)
            : (e.next = t),
            (n.lastBaseUpdate = t);
        }
        function Va(e, t, n, r) {
          var o = e.updateQueue;
          Oa = !1;
          var a = o.firstBaseUpdate,
            l = o.lastBaseUpdate,
            i = o.shared.pending;
          if (null !== i) {
            o.shared.pending = null;
            var s = i,
              u = s.next;
            (s.next = null), null === l ? (a = u) : (l.next = u), (l = s);
            var c = e.alternate;
            null !== c &&
              (i = (c = c.updateQueue).lastBaseUpdate) !== l &&
              (null === i ? (c.firstBaseUpdate = u) : (i.next = u),
              (c.lastBaseUpdate = s));
          }
          if (null !== a) {
            var d = o.baseState;
            for (l = 0, c = u = s = null, i = a; ; ) {
              var f = i.lane,
                p = i.eventTime;
              if ((r & f) === f) {
                null !== c &&
                  (c = c.next =
                    {
                      eventTime: p,
                      lane: 0,
                      tag: i.tag,
                      payload: i.payload,
                      callback: i.callback,
                      next: null,
                    });
                e: {
                  var h = e,
                    m = i;
                  switch (((f = t), (p = n), m.tag)) {
                    case 1:
                      if ("function" === typeof (h = m.payload)) {
                        d = h.call(p, d, f);
                        break e;
                      }
                      d = h;
                      break e;
                    case 3:
                      h.flags = (-65537 & h.flags) | 128;
                    case 0:
                      if (
                        null ===
                          (f =
                            "function" === typeof (h = m.payload)
                              ? h.call(p, d, f)
                              : h) ||
                        void 0 === f
                      )
                        break e;
                      d = U({}, d, f);
                      break e;
                    case 2:
                      Oa = !0;
                  }
                }
                null !== i.callback &&
                  0 !== i.lane &&
                  ((e.flags |= 64),
                  null === (f = o.effects) ? (o.effects = [i]) : f.push(i));
              } else
                (p = {
                  eventTime: p,
                  lane: f,
                  tag: i.tag,
                  payload: i.payload,
                  callback: i.callback,
                  next: null,
                }),
                  null === c ? ((u = c = p), (s = d)) : (c = c.next = p),
                  (l |= f);
              if (null === (i = i.next)) {
                if (null === (i = o.shared.pending)) break;
                (i = (f = i).next),
                  (f.next = null),
                  (o.lastBaseUpdate = f),
                  (o.shared.pending = null);
              }
            }
            if (
              (null === c && (s = d),
              (o.baseState = s),
              (o.firstBaseUpdate = u),
              (o.lastBaseUpdate = c),
              null !== (t = o.shared.interleaved))
            ) {
              o = t;
              do {
                (l |= o.lane), (o = o.next);
              } while (o !== t);
            } else null === a && (o.shared.lanes = 0);
            (Os |= l), (e.lanes = l), (e.memoizedState = d);
          }
        }
        function $a(e, t, n) {
          if (((e = t.effects), (t.effects = null), null !== e))
            for (t = 0; t < e.length; t++) {
              var r = e[t],
                o = r.callback;
              if (null !== o) {
                if (((r.callback = null), (r = n), "function" !== typeof o))
                  throw Error(a(191, o));
                o.call(r);
              }
            }
        }
        var Wa = {},
          Qa = So(Wa),
          Xa = So(Wa),
          Ka = So(Wa);
        function qa(e) {
          if (e === Wa) throw Error(a(174));
          return e;
        }
        function Ya(e, t) {
          switch ((Eo(Ka, t), Eo(Xa, e), Eo(Qa, Wa), (e = t.nodeType))) {
            case 9:
            case 11:
              t = (t = t.documentElement) ? t.namespaceURI : se(null, "");
              break;
            default:
              t = se(
                (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
                (e = e.tagName)
              );
          }
          xo(Qa), Eo(Qa, t);
        }
        function Ja() {
          xo(Qa), xo(Xa), xo(Ka);
        }
        function Ga(e) {
          qa(Ka.current);
          var t = qa(Qa.current),
            n = se(t, e.type);
          t !== n && (Eo(Xa, e), Eo(Qa, n));
        }
        function Za(e) {
          Xa.current === e && (xo(Qa), xo(Xa));
        }
        var el = So(0);
        function tl(e) {
          for (var t = e; null !== t; ) {
            if (13 === t.tag) {
              var n = t.memoizedState;
              if (
                null !== n &&
                (null === (n = n.dehydrated) ||
                  "$?" === n.data ||
                  "$!" === n.data)
              )
                return t;
            } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
              if (0 !== (128 & t.flags)) return t;
            } else if (null !== t.child) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break;
            for (; null === t.sibling; ) {
              if (null === t.return || t.return === e) return null;
              t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
          }
          return null;
        }
        var nl = [];
        function rl() {
          for (var e = 0; e < nl.length; e++)
            nl[e]._workInProgressVersionPrimary = null;
          nl.length = 0;
        }
        var ol = w.ReactCurrentDispatcher,
          al = w.ReactCurrentBatchConfig,
          ll = 0,
          il = null,
          sl = null,
          ul = null,
          cl = !1,
          dl = !1,
          fl = 0,
          pl = 0;
        function hl() {
          throw Error(a(321));
        }
        function ml(e, t) {
          if (null === t) return !1;
          for (var n = 0; n < t.length && n < e.length; n++)
            if (!ir(e[n], t[n])) return !1;
          return !0;
        }
        function gl(e, t, n, r, o, l) {
          if (
            ((ll = l),
            (il = t),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.lanes = 0),
            (ol.current = null === e || null === e.memoizedState ? Zl : ei),
            (e = n(r, o)),
            dl)
          ) {
            l = 0;
            do {
              if (((dl = !1), (fl = 0), 25 <= l)) throw Error(a(301));
              (l += 1),
                (ul = sl = null),
                (t.updateQueue = null),
                (ol.current = ti),
                (e = n(r, o));
            } while (dl);
          }
          if (
            ((ol.current = Gl),
            (t = null !== sl && null !== sl.next),
            (ll = 0),
            (ul = sl = il = null),
            (cl = !1),
            t)
          )
            throw Error(a(300));
          return e;
        }
        function vl() {
          var e = 0 !== fl;
          return (fl = 0), e;
        }
        function kl() {
          var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null,
          };
          return (
            null === ul ? (il.memoizedState = ul = e) : (ul = ul.next = e), ul
          );
        }
        function yl() {
          if (null === sl) {
            var e = il.alternate;
            e = null !== e ? e.memoizedState : null;
          } else e = sl.next;
          var t = null === ul ? il.memoizedState : ul.next;
          if (null !== t) (ul = t), (sl = e);
          else {
            if (null === e) throw Error(a(310));
            (e = {
              memoizedState: (sl = e).memoizedState,
              baseState: sl.baseState,
              baseQueue: sl.baseQueue,
              queue: sl.queue,
              next: null,
            }),
              null === ul ? (il.memoizedState = ul = e) : (ul = ul.next = e);
          }
          return ul;
        }
        function wl(e, t) {
          return "function" === typeof t ? t(e) : t;
        }
        function bl(e) {
          var t = yl(),
            n = t.queue;
          if (null === n) throw Error(a(311));
          n.lastRenderedReducer = e;
          var r = sl,
            o = r.baseQueue,
            l = n.pending;
          if (null !== l) {
            if (null !== o) {
              var i = o.next;
              (o.next = l.next), (l.next = i);
            }
            (r.baseQueue = o = l), (n.pending = null);
          }
          if (null !== o) {
            (l = o.next), (r = r.baseState);
            var s = (i = null),
              u = null,
              c = l;
            do {
              var d = c.lane;
              if ((ll & d) === d)
                null !== u &&
                  (u = u.next =
                    {
                      lane: 0,
                      action: c.action,
                      hasEagerState: c.hasEagerState,
                      eagerState: c.eagerState,
                      next: null,
                    }),
                  (r = c.hasEagerState ? c.eagerState : e(r, c.action));
              else {
                var f = {
                  lane: d,
                  action: c.action,
                  hasEagerState: c.hasEagerState,
                  eagerState: c.eagerState,
                  next: null,
                };
                null === u ? ((s = u = f), (i = r)) : (u = u.next = f),
                  (il.lanes |= d),
                  (Os |= d);
              }
              c = c.next;
            } while (null !== c && c !== l);
            null === u ? (i = r) : (u.next = s),
              ir(r, t.memoizedState) || (yi = !0),
              (t.memoizedState = r),
              (t.baseState = i),
              (t.baseQueue = u),
              (n.lastRenderedState = r);
          }
          if (null !== (e = n.interleaved)) {
            o = e;
            do {
              (l = o.lane), (il.lanes |= l), (Os |= l), (o = o.next);
            } while (o !== e);
          } else null === o && (n.lanes = 0);
          return [t.memoizedState, n.dispatch];
        }
        function Bl(e) {
          var t = yl(),
            n = t.queue;
          if (null === n) throw Error(a(311));
          n.lastRenderedReducer = e;
          var r = n.dispatch,
            o = n.pending,
            l = t.memoizedState;
          if (null !== o) {
            n.pending = null;
            var i = (o = o.next);
            do {
              (l = e(l, i.action)), (i = i.next);
            } while (i !== o);
            ir(l, t.memoizedState) || (yi = !0),
              (t.memoizedState = l),
              null === t.baseQueue && (t.baseState = l),
              (n.lastRenderedState = l);
          }
          return [l, r];
        }
        function Cl() {}
        function Pl(e, t) {
          var n = il,
            r = yl(),
            o = t(),
            l = !ir(r.memoizedState, o);
          if (
            (l && ((r.memoizedState = o), (yi = !0)),
            (r = r.queue),
            Ol(El.bind(null, n, r, e), [e]),
            r.getSnapshot !== t ||
              l ||
              (null !== ul && 1 & ul.memoizedState.tag))
          ) {
            if (
              ((n.flags |= 2048),
              Ll(9, xl.bind(null, n, r, o, t), void 0, null),
              null === Ns)
            )
              throw Error(a(349));
            0 !== (30 & ll) || Sl(n, t, o);
          }
          return o;
        }
        function Sl(e, t, n) {
          (e.flags |= 16384),
            (e = { getSnapshot: t, value: n }),
            null === (t = il.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (il.updateQueue = t),
                (t.stores = [e]))
              : null === (n = t.stores)
              ? (t.stores = [e])
              : n.push(e);
        }
        function xl(e, t, n, r) {
          (t.value = n), (t.getSnapshot = r), Ml(t) && Nl(e);
        }
        function El(e, t, n) {
          return n(function () {
            Ml(t) && Nl(e);
          });
        }
        function Ml(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var n = t();
            return !ir(e, n);
          } catch (r) {
            return !0;
          }
        }
        function Nl(e) {
          var t = Ra(e, 1);
          null !== t && nu(t, e, 1, -1);
        }
        function _l(e) {
          var t = kl();
          return (
            "function" === typeof e && (e = e()),
            (t.memoizedState = t.baseState = e),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: wl,
              lastRenderedState: e,
            }),
            (t.queue = e),
            (e = e.dispatch = Kl.bind(null, il, e)),
            [t.memoizedState, e]
          );
        }
        function Ll(e, t, n, r) {
          return (
            (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
            null === (t = il.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (il.updateQueue = t),
                (t.lastEffect = e.next = e))
              : null === (n = t.lastEffect)
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
            e
          );
        }
        function Tl() {
          return yl().memoizedState;
        }
        function Il(e, t, n, r) {
          var o = kl();
          (il.flags |= e),
            (o.memoizedState = Ll(1 | t, n, void 0, void 0 === r ? null : r));
        }
        function zl(e, t, n, r) {
          var o = yl();
          r = void 0 === r ? null : r;
          var a = void 0;
          if (null !== sl) {
            var l = sl.memoizedState;
            if (((a = l.destroy), null !== r && ml(r, l.deps)))
              return void (o.memoizedState = Ll(t, n, a, r));
          }
          (il.flags |= e), (o.memoizedState = Ll(1 | t, n, a, r));
        }
        function Rl(e, t) {
          return Il(8390656, 8, e, t);
        }
        function Ol(e, t) {
          return zl(2048, 8, e, t);
        }
        function Ul(e, t) {
          return zl(4, 2, e, t);
        }
        function Al(e, t) {
          return zl(4, 4, e, t);
        }
        function Fl(e, t) {
          return "function" === typeof t
            ? ((e = e()),
              t(e),
              function () {
                t(null);
              })
            : null !== t && void 0 !== t
            ? ((e = e()),
              (t.current = e),
              function () {
                t.current = null;
              })
            : void 0;
        }
        function Dl(e, t, n) {
          return (
            (n = null !== n && void 0 !== n ? n.concat([e]) : null),
            zl(4, 4, Fl.bind(null, t, e), n)
          );
        }
        function jl() {}
        function Hl(e, t) {
          var n = yl();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== r && null !== t && ml(t, r[1])
            ? r[0]
            : ((n.memoizedState = [e, t]), e);
        }
        function Vl(e, t) {
          var n = yl();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== r && null !== t && ml(t, r[1])
            ? r[0]
            : ((e = e()), (n.memoizedState = [e, t]), e);
        }
        function $l(e, t, n) {
          return 0 === (21 & ll)
            ? (e.baseState && ((e.baseState = !1), (yi = !0)),
              (e.memoizedState = n))
            : (ir(n, t) ||
                ((n = mt()), (il.lanes |= n), (Os |= n), (e.baseState = !0)),
              t);
        }
        function Wl(e, t) {
          var n = yt;
          (yt = 0 !== n && 4 > n ? n : 4), e(!0);
          var r = al.transition;
          al.transition = {};
          try {
            e(!1), t();
          } finally {
            (yt = n), (al.transition = r);
          }
        }
        function Ql() {
          return yl().memoizedState;
        }
        function Xl(e, t, n) {
          var r = tu(e);
          if (
            ((n = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            }),
            ql(e))
          )
            Yl(t, n);
          else if (null !== (n = za(e, t, n, r))) {
            nu(n, e, r, eu()), Jl(n, t, r);
          }
        }
        function Kl(e, t, n) {
          var r = tu(e),
            o = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            };
          if (ql(e)) Yl(t, o);
          else {
            var a = e.alternate;
            if (
              0 === e.lanes &&
              (null === a || 0 === a.lanes) &&
              null !== (a = t.lastRenderedReducer)
            )
              try {
                var l = t.lastRenderedState,
                  i = a(l, n);
                if (((o.hasEagerState = !0), (o.eagerState = i), ir(i, l))) {
                  var s = t.interleaved;
                  return (
                    null === s
                      ? ((o.next = o), Ia(t))
                      : ((o.next = s.next), (s.next = o)),
                    void (t.interleaved = o)
                  );
                }
              } catch (u) {}
            null !== (n = za(e, t, o, r)) &&
              (nu(n, e, r, (o = eu())), Jl(n, t, r));
          }
        }
        function ql(e) {
          var t = e.alternate;
          return e === il || (null !== t && t === il);
        }
        function Yl(e, t) {
          dl = cl = !0;
          var n = e.pending;
          null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
            (e.pending = t);
        }
        function Jl(e, t, n) {
          if (0 !== (4194240 & n)) {
            var r = t.lanes;
            (n |= r &= e.pendingLanes), (t.lanes = n), kt(e, n);
          }
        }
        var Gl = {
            readContext: La,
            useCallback: hl,
            useContext: hl,
            useEffect: hl,
            useImperativeHandle: hl,
            useInsertionEffect: hl,
            useLayoutEffect: hl,
            useMemo: hl,
            useReducer: hl,
            useRef: hl,
            useState: hl,
            useDebugValue: hl,
            useDeferredValue: hl,
            useTransition: hl,
            useMutableSource: hl,
            useSyncExternalStore: hl,
            useId: hl,
            unstable_isNewReconciler: !1,
          },
          Zl = {
            readContext: La,
            useCallback: function (e, t) {
              return (kl().memoizedState = [e, void 0 === t ? null : t]), e;
            },
            useContext: La,
            useEffect: Rl,
            useImperativeHandle: function (e, t, n) {
              return (
                (n = null !== n && void 0 !== n ? n.concat([e]) : null),
                Il(4194308, 4, Fl.bind(null, t, e), n)
              );
            },
            useLayoutEffect: function (e, t) {
              return Il(4194308, 4, e, t);
            },
            useInsertionEffect: function (e, t) {
              return Il(4, 2, e, t);
            },
            useMemo: function (e, t) {
              var n = kl();
              return (
                (t = void 0 === t ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
              );
            },
            useReducer: function (e, t, n) {
              var r = kl();
              return (
                (t = void 0 !== n ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                  pending: null,
                  interleaved: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: e,
                  lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = Xl.bind(null, il, e)),
                [r.memoizedState, e]
              );
            },
            useRef: function (e) {
              return (e = { current: e }), (kl().memoizedState = e);
            },
            useState: _l,
            useDebugValue: jl,
            useDeferredValue: function (e) {
              return (kl().memoizedState = e);
            },
            useTransition: function () {
              var e = _l(!1),
                t = e[0];
              return (
                (e = Wl.bind(null, e[1])), (kl().memoizedState = e), [t, e]
              );
            },
            useMutableSource: function () {},
            useSyncExternalStore: function (e, t, n) {
              var r = il,
                o = kl();
              if (aa) {
                if (void 0 === n) throw Error(a(407));
                n = n();
              } else {
                if (((n = t()), null === Ns)) throw Error(a(349));
                0 !== (30 & ll) || Sl(r, t, n);
              }
              o.memoizedState = n;
              var l = { value: n, getSnapshot: t };
              return (
                (o.queue = l),
                Rl(El.bind(null, r, l, e), [e]),
                (r.flags |= 2048),
                Ll(9, xl.bind(null, r, l, n, t), void 0, null),
                n
              );
            },
            useId: function () {
              var e = kl(),
                t = Ns.identifierPrefix;
              if (aa) {
                var n = Go;
                (t =
                  ":" +
                  t +
                  "R" +
                  (n = (Jo & ~(1 << (32 - lt(Jo) - 1))).toString(32) + n)),
                  0 < (n = fl++) && (t += "H" + n.toString(32)),
                  (t += ":");
              } else t = ":" + t + "r" + (n = pl++).toString(32) + ":";
              return (e.memoizedState = t);
            },
            unstable_isNewReconciler: !1,
          },
          ei = {
            readContext: La,
            useCallback: Hl,
            useContext: La,
            useEffect: Ol,
            useImperativeHandle: Dl,
            useInsertionEffect: Ul,
            useLayoutEffect: Al,
            useMemo: Vl,
            useReducer: bl,
            useRef: Tl,
            useState: function () {
              return bl(wl);
            },
            useDebugValue: jl,
            useDeferredValue: function (e) {
              return $l(yl(), sl.memoizedState, e);
            },
            useTransition: function () {
              return [bl(wl)[0], yl().memoizedState];
            },
            useMutableSource: Cl,
            useSyncExternalStore: Pl,
            useId: Ql,
            unstable_isNewReconciler: !1,
          },
          ti = {
            readContext: La,
            useCallback: Hl,
            useContext: La,
            useEffect: Ol,
            useImperativeHandle: Dl,
            useInsertionEffect: Ul,
            useLayoutEffect: Al,
            useMemo: Vl,
            useReducer: Bl,
            useRef: Tl,
            useState: function () {
              return Bl(wl);
            },
            useDebugValue: jl,
            useDeferredValue: function (e) {
              var t = yl();
              return null === sl
                ? (t.memoizedState = e)
                : $l(t, sl.memoizedState, e);
            },
            useTransition: function () {
              return [Bl(wl)[0], yl().memoizedState];
            },
            useMutableSource: Cl,
            useSyncExternalStore: Pl,
            useId: Ql,
            unstable_isNewReconciler: !1,
          };
        function ni(e, t) {
          if (e && e.defaultProps) {
            for (var n in ((t = U({}, t)), (e = e.defaultProps)))
              void 0 === t[n] && (t[n] = e[n]);
            return t;
          }
          return t;
        }
        function ri(e, t, n, r) {
          (n =
            null === (n = n(r, (t = e.memoizedState))) || void 0 === n
              ? t
              : U({}, t, n)),
            (e.memoizedState = n),
            0 === e.lanes && (e.updateQueue.baseState = n);
        }
        var oi = {
          isMounted: function (e) {
            return !!(e = e._reactInternals) && He(e) === e;
          },
          enqueueSetState: function (e, t, n) {
            e = e._reactInternals;
            var r = eu(),
              o = tu(e),
              a = Fa(r, o);
            (a.payload = t),
              void 0 !== n && null !== n && (a.callback = n),
              null !== (t = Da(e, a, o)) && (nu(t, e, o, r), ja(t, e, o));
          },
          enqueueReplaceState: function (e, t, n) {
            e = e._reactInternals;
            var r = eu(),
              o = tu(e),
              a = Fa(r, o);
            (a.tag = 1),
              (a.payload = t),
              void 0 !== n && null !== n && (a.callback = n),
              null !== (t = Da(e, a, o)) && (nu(t, e, o, r), ja(t, e, o));
          },
          enqueueForceUpdate: function (e, t) {
            e = e._reactInternals;
            var n = eu(),
              r = tu(e),
              o = Fa(n, r);
            (o.tag = 2),
              void 0 !== t && null !== t && (o.callback = t),
              null !== (t = Da(e, o, r)) && (nu(t, e, r, n), ja(t, e, r));
          },
        };
        function ai(e, t, n, r, o, a, l) {
          return "function" === typeof (e = e.stateNode).shouldComponentUpdate
            ? e.shouldComponentUpdate(r, a, l)
            : !t.prototype ||
                !t.prototype.isPureReactComponent ||
                !sr(n, r) ||
                !sr(o, a);
        }
        function li(e, t, n) {
          var r = !1,
            o = Mo,
            a = t.contextType;
          return (
            "object" === typeof a && null !== a
              ? (a = La(a))
              : ((o = Io(t) ? Lo : No.current),
                (a = (r = null !== (r = t.contextTypes) && void 0 !== r)
                  ? To(e, o)
                  : Mo)),
            (t = new t(n, a)),
            (e.memoizedState =
              null !== t.state && void 0 !== t.state ? t.state : null),
            (t.updater = oi),
            (e.stateNode = t),
            (t._reactInternals = e),
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                o),
              (e.__reactInternalMemoizedMaskedChildContext = a)),
            t
          );
        }
        function ii(e, t, n, r) {
          (e = t.state),
            "function" === typeof t.componentWillReceiveProps &&
              t.componentWillReceiveProps(n, r),
            "function" === typeof t.UNSAFE_componentWillReceiveProps &&
              t.UNSAFE_componentWillReceiveProps(n, r),
            t.state !== e && oi.enqueueReplaceState(t, t.state, null);
        }
        function si(e, t, n, r) {
          var o = e.stateNode;
          (o.props = n), (o.state = e.memoizedState), (o.refs = {}), Ua(e);
          var a = t.contextType;
          "object" === typeof a && null !== a
            ? (o.context = La(a))
            : ((a = Io(t) ? Lo : No.current), (o.context = To(e, a))),
            (o.state = e.memoizedState),
            "function" === typeof (a = t.getDerivedStateFromProps) &&
              (ri(e, t, a, n), (o.state = e.memoizedState)),
            "function" === typeof t.getDerivedStateFromProps ||
              "function" === typeof o.getSnapshotBeforeUpdate ||
              ("function" !== typeof o.UNSAFE_componentWillMount &&
                "function" !== typeof o.componentWillMount) ||
              ((t = o.state),
              "function" === typeof o.componentWillMount &&
                o.componentWillMount(),
              "function" === typeof o.UNSAFE_componentWillMount &&
                o.UNSAFE_componentWillMount(),
              t !== o.state && oi.enqueueReplaceState(o, o.state, null),
              Va(e, n, o, r),
              (o.state = e.memoizedState)),
            "function" === typeof o.componentDidMount && (e.flags |= 4194308);
        }
        function ui(e, t) {
          try {
            var n = "",
              r = t;
            do {
              (n += j(r)), (r = r.return);
            } while (r);
            var o = n;
          } catch (a) {
            o = "\nError generating stack: " + a.message + "\n" + a.stack;
          }
          return { value: e, source: t, stack: o, digest: null };
        }
        function ci(e, t, n) {
          return {
            value: e,
            source: null,
            stack: null != n ? n : null,
            digest: null != t ? t : null,
          };
        }
        function di(e, t) {
          try {
            console.error(t.value);
          } catch (n) {
            setTimeout(function () {
              throw n;
            });
          }
        }
        var fi = "function" === typeof WeakMap ? WeakMap : Map;
        function pi(e, t, n) {
          ((n = Fa(-1, n)).tag = 3), (n.payload = { element: null });
          var r = t.value;
          return (
            (n.callback = function () {
              $s || (($s = !0), (Ws = r)), di(0, t);
            }),
            n
          );
        }
        function hi(e, t, n) {
          (n = Fa(-1, n)).tag = 3;
          var r = e.type.getDerivedStateFromError;
          if ("function" === typeof r) {
            var o = t.value;
            (n.payload = function () {
              return r(o);
            }),
              (n.callback = function () {
                di(0, t);
              });
          }
          var a = e.stateNode;
          return (
            null !== a &&
              "function" === typeof a.componentDidCatch &&
              (n.callback = function () {
                di(0, t),
                  "function" !== typeof r &&
                    (null === Qs ? (Qs = new Set([this])) : Qs.add(this));
                var e = t.stack;
                this.componentDidCatch(t.value, {
                  componentStack: null !== e ? e : "",
                });
              }),
            n
          );
        }
        function mi(e, t, n) {
          var r = e.pingCache;
          if (null === r) {
            r = e.pingCache = new fi();
            var o = new Set();
            r.set(t, o);
          } else void 0 === (o = r.get(t)) && ((o = new Set()), r.set(t, o));
          o.has(n) || (o.add(n), (e = Su.bind(null, e, t, n)), t.then(e, e));
        }
        function gi(e) {
          do {
            var t;
            if (
              ((t = 13 === e.tag) &&
                (t = null === (t = e.memoizedState) || null !== t.dehydrated),
              t)
            )
              return e;
            e = e.return;
          } while (null !== e);
          return null;
        }
        function vi(e, t, n, r, o) {
          return 0 === (1 & e.mode)
            ? (e === t
                ? (e.flags |= 65536)
                : ((e.flags |= 128),
                  (n.flags |= 131072),
                  (n.flags &= -52805),
                  1 === n.tag &&
                    (null === n.alternate
                      ? (n.tag = 17)
                      : (((t = Fa(-1, 1)).tag = 2), Da(n, t, 1))),
                  (n.lanes |= 1)),
              e)
            : ((e.flags |= 65536), (e.lanes = o), e);
        }
        var ki = w.ReactCurrentOwner,
          yi = !1;
        function wi(e, t, n, r) {
          t.child = null === e ? Ba(t, null, n, r) : ba(t, e.child, n, r);
        }
        function bi(e, t, n, r, o) {
          n = n.render;
          var a = t.ref;
          return (
            _a(t, o),
            (r = gl(e, t, n, r, a, o)),
            (n = vl()),
            null === e || yi
              ? (aa && n && ta(t), (t.flags |= 1), wi(e, t, r, o), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~o),
                $i(e, t, o))
          );
        }
        function Bi(e, t, n, r, o) {
          if (null === e) {
            var a = n.type;
            return "function" !== typeof a ||
              Tu(a) ||
              void 0 !== a.defaultProps ||
              null !== n.compare ||
              void 0 !== n.defaultProps
              ? (((e = zu(n.type, null, r, t, t.mode, o)).ref = t.ref),
                (e.return = t),
                (t.child = e))
              : ((t.tag = 15), (t.type = a), Ci(e, t, a, r, o));
          }
          if (((a = e.child), 0 === (e.lanes & o))) {
            var l = a.memoizedProps;
            if (
              (n = null !== (n = n.compare) ? n : sr)(l, r) &&
              e.ref === t.ref
            )
              return $i(e, t, o);
          }
          return (
            (t.flags |= 1),
            ((e = Iu(a, r)).ref = t.ref),
            (e.return = t),
            (t.child = e)
          );
        }
        function Ci(e, t, n, r, o) {
          if (null !== e) {
            var a = e.memoizedProps;
            if (sr(a, r) && e.ref === t.ref) {
              if (((yi = !1), (t.pendingProps = r = a), 0 === (e.lanes & o)))
                return (t.lanes = e.lanes), $i(e, t, o);
              0 !== (131072 & e.flags) && (yi = !0);
            }
          }
          return xi(e, t, n, r, o);
        }
        function Pi(e, t, n) {
          var r = t.pendingProps,
            o = r.children,
            a = null !== e ? e.memoizedState : null;
          if ("hidden" === r.mode)
            if (0 === (1 & t.mode))
              (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                Eo(Is, Ts),
                (Ts |= n);
            else {
              if (0 === (1073741824 & n))
                return (
                  (e = null !== a ? a.baseLanes | n : n),
                  (t.lanes = t.childLanes = 1073741824),
                  (t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null,
                  }),
                  (t.updateQueue = null),
                  Eo(Is, Ts),
                  (Ts |= e),
                  null
                );
              (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                (r = null !== a ? a.baseLanes : n),
                Eo(Is, Ts),
                (Ts |= r);
            }
          else
            null !== a
              ? ((r = a.baseLanes | n), (t.memoizedState = null))
              : (r = n),
              Eo(Is, Ts),
              (Ts |= r);
          return wi(e, t, o, n), t.child;
        }
        function Si(e, t) {
          var n = t.ref;
          ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
            ((t.flags |= 512), (t.flags |= 2097152));
        }
        function xi(e, t, n, r, o) {
          var a = Io(n) ? Lo : No.current;
          return (
            (a = To(t, a)),
            _a(t, o),
            (n = gl(e, t, n, r, a, o)),
            (r = vl()),
            null === e || yi
              ? (aa && r && ta(t), (t.flags |= 1), wi(e, t, n, o), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~o),
                $i(e, t, o))
          );
        }
        function Ei(e, t, n, r, o) {
          if (Io(n)) {
            var a = !0;
            Uo(t);
          } else a = !1;
          if ((_a(t, o), null === t.stateNode))
            Vi(e, t), li(t, n, r), si(t, n, r, o), (r = !0);
          else if (null === e) {
            var l = t.stateNode,
              i = t.memoizedProps;
            l.props = i;
            var s = l.context,
              u = n.contextType;
            "object" === typeof u && null !== u
              ? (u = La(u))
              : (u = To(t, (u = Io(n) ? Lo : No.current)));
            var c = n.getDerivedStateFromProps,
              d =
                "function" === typeof c ||
                "function" === typeof l.getSnapshotBeforeUpdate;
            d ||
              ("function" !== typeof l.UNSAFE_componentWillReceiveProps &&
                "function" !== typeof l.componentWillReceiveProps) ||
              ((i !== r || s !== u) && ii(t, l, r, u)),
              (Oa = !1);
            var f = t.memoizedState;
            (l.state = f),
              Va(t, r, l, o),
              (s = t.memoizedState),
              i !== r || f !== s || _o.current || Oa
                ? ("function" === typeof c &&
                    (ri(t, n, c, r), (s = t.memoizedState)),
                  (i = Oa || ai(t, n, i, r, f, s, u))
                    ? (d ||
                        ("function" !== typeof l.UNSAFE_componentWillMount &&
                          "function" !== typeof l.componentWillMount) ||
                        ("function" === typeof l.componentWillMount &&
                          l.componentWillMount(),
                        "function" === typeof l.UNSAFE_componentWillMount &&
                          l.UNSAFE_componentWillMount()),
                      "function" === typeof l.componentDidMount &&
                        (t.flags |= 4194308))
                    : ("function" === typeof l.componentDidMount &&
                        (t.flags |= 4194308),
                      (t.memoizedProps = r),
                      (t.memoizedState = s)),
                  (l.props = r),
                  (l.state = s),
                  (l.context = u),
                  (r = i))
                : ("function" === typeof l.componentDidMount &&
                    (t.flags |= 4194308),
                  (r = !1));
          } else {
            (l = t.stateNode),
              Aa(e, t),
              (i = t.memoizedProps),
              (u = t.type === t.elementType ? i : ni(t.type, i)),
              (l.props = u),
              (d = t.pendingProps),
              (f = l.context),
              "object" === typeof (s = n.contextType) && null !== s
                ? (s = La(s))
                : (s = To(t, (s = Io(n) ? Lo : No.current)));
            var p = n.getDerivedStateFromProps;
            (c =
              "function" === typeof p ||
              "function" === typeof l.getSnapshotBeforeUpdate) ||
              ("function" !== typeof l.UNSAFE_componentWillReceiveProps &&
                "function" !== typeof l.componentWillReceiveProps) ||
              ((i !== d || f !== s) && ii(t, l, r, s)),
              (Oa = !1),
              (f = t.memoizedState),
              (l.state = f),
              Va(t, r, l, o);
            var h = t.memoizedState;
            i !== d || f !== h || _o.current || Oa
              ? ("function" === typeof p &&
                  (ri(t, n, p, r), (h = t.memoizedState)),
                (u = Oa || ai(t, n, u, r, f, h, s) || !1)
                  ? (c ||
                      ("function" !== typeof l.UNSAFE_componentWillUpdate &&
                        "function" !== typeof l.componentWillUpdate) ||
                      ("function" === typeof l.componentWillUpdate &&
                        l.componentWillUpdate(r, h, s),
                      "function" === typeof l.UNSAFE_componentWillUpdate &&
                        l.UNSAFE_componentWillUpdate(r, h, s)),
                    "function" === typeof l.componentDidUpdate &&
                      (t.flags |= 4),
                    "function" === typeof l.getSnapshotBeforeUpdate &&
                      (t.flags |= 1024))
                  : ("function" !== typeof l.componentDidUpdate ||
                      (i === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 4),
                    "function" !== typeof l.getSnapshotBeforeUpdate ||
                      (i === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = h)),
                (l.props = r),
                (l.state = h),
                (l.context = s),
                (r = u))
              : ("function" !== typeof l.componentDidUpdate ||
                  (i === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                "function" !== typeof l.getSnapshotBeforeUpdate ||
                  (i === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (r = !1));
          }
          return Mi(e, t, n, r, a, o);
        }
        function Mi(e, t, n, r, o, a) {
          Si(e, t);
          var l = 0 !== (128 & t.flags);
          if (!r && !l) return o && Ao(t, n, !1), $i(e, t, a);
          (r = t.stateNode), (ki.current = t);
          var i =
            l && "function" !== typeof n.getDerivedStateFromError
              ? null
              : r.render();
          return (
            (t.flags |= 1),
            null !== e && l
              ? ((t.child = ba(t, e.child, null, a)),
                (t.child = ba(t, null, i, a)))
              : wi(e, t, i, a),
            (t.memoizedState = r.state),
            o && Ao(t, n, !0),
            t.child
          );
        }
        function Ni(e) {
          var t = e.stateNode;
          t.pendingContext
            ? Ro(0, t.pendingContext, t.pendingContext !== t.context)
            : t.context && Ro(0, t.context, !1),
            Ya(e, t.containerInfo);
        }
        function _i(e, t, n, r, o) {
          return ha(), ma(o), (t.flags |= 256), wi(e, t, n, r), t.child;
        }
        var Li,
          Ti,
          Ii,
          zi,
          Ri = { dehydrated: null, treeContext: null, retryLane: 0 };
        function Oi(e) {
          return { baseLanes: e, cachePool: null, transitions: null };
        }
        function Ui(e, t, n) {
          var r,
            o = t.pendingProps,
            l = el.current,
            i = !1,
            s = 0 !== (128 & t.flags);
          if (
            ((r = s) ||
              (r = (null === e || null !== e.memoizedState) && 0 !== (2 & l)),
            r
              ? ((i = !0), (t.flags &= -129))
              : (null !== e && null === e.memoizedState) || (l |= 1),
            Eo(el, 1 & l),
            null === e)
          )
            return (
              ca(t),
              null !== (e = t.memoizedState) && null !== (e = e.dehydrated)
                ? (0 === (1 & t.mode)
                    ? (t.lanes = 1)
                    : "$!" === e.data
                    ? (t.lanes = 8)
                    : (t.lanes = 1073741824),
                  null)
                : ((s = o.children),
                  (e = o.fallback),
                  i
                    ? ((o = t.mode),
                      (i = t.child),
                      (s = { mode: "hidden", children: s }),
                      0 === (1 & o) && null !== i
                        ? ((i.childLanes = 0), (i.pendingProps = s))
                        : (i = Ou(s, o, 0, null)),
                      (e = Ru(e, o, n, null)),
                      (i.return = t),
                      (e.return = t),
                      (i.sibling = e),
                      (t.child = i),
                      (t.child.memoizedState = Oi(n)),
                      (t.memoizedState = Ri),
                      e)
                    : Ai(t, s))
            );
          if (null !== (l = e.memoizedState) && null !== (r = l.dehydrated))
            return (function (e, t, n, r, o, l, i) {
              if (n)
                return 256 & t.flags
                  ? ((t.flags &= -257), Fi(e, t, i, (r = ci(Error(a(422))))))
                  : null !== t.memoizedState
                  ? ((t.child = e.child), (t.flags |= 128), null)
                  : ((l = r.fallback),
                    (o = t.mode),
                    (r = Ou(
                      { mode: "visible", children: r.children },
                      o,
                      0,
                      null
                    )),
                    ((l = Ru(l, o, i, null)).flags |= 2),
                    (r.return = t),
                    (l.return = t),
                    (r.sibling = l),
                    (t.child = r),
                    0 !== (1 & t.mode) && ba(t, e.child, null, i),
                    (t.child.memoizedState = Oi(i)),
                    (t.memoizedState = Ri),
                    l);
              if (0 === (1 & t.mode)) return Fi(e, t, i, null);
              if ("$!" === o.data) {
                if ((r = o.nextSibling && o.nextSibling.dataset))
                  var s = r.dgst;
                return (
                  (r = s), Fi(e, t, i, (r = ci((l = Error(a(419))), r, void 0)))
                );
              }
              if (((s = 0 !== (i & e.childLanes)), yi || s)) {
                if (null !== (r = Ns)) {
                  switch (i & -i) {
                    case 4:
                      o = 2;
                      break;
                    case 16:
                      o = 8;
                      break;
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                      o = 32;
                      break;
                    case 536870912:
                      o = 268435456;
                      break;
                    default:
                      o = 0;
                  }
                  0 !== (o = 0 !== (o & (r.suspendedLanes | i)) ? 0 : o) &&
                    o !== l.retryLane &&
                    ((l.retryLane = o), Ra(e, o), nu(r, e, o, -1));
                }
                return mu(), Fi(e, t, i, (r = ci(Error(a(421)))));
              }
              return "$?" === o.data
                ? ((t.flags |= 128),
                  (t.child = e.child),
                  (t = Eu.bind(null, e)),
                  (o._reactRetry = t),
                  null)
                : ((e = l.treeContext),
                  (oa = uo(o.nextSibling)),
                  (ra = t),
                  (aa = !0),
                  (la = null),
                  null !== e &&
                    ((Ko[qo++] = Jo),
                    (Ko[qo++] = Go),
                    (Ko[qo++] = Yo),
                    (Jo = e.id),
                    (Go = e.overflow),
                    (Yo = t)),
                  (t = Ai(t, r.children)),
                  (t.flags |= 4096),
                  t);
            })(e, t, s, o, r, l, n);
          if (i) {
            (i = o.fallback), (s = t.mode), (r = (l = e.child).sibling);
            var u = { mode: "hidden", children: o.children };
            return (
              0 === (1 & s) && t.child !== l
                ? (((o = t.child).childLanes = 0),
                  (o.pendingProps = u),
                  (t.deletions = null))
                : ((o = Iu(l, u)).subtreeFlags = 14680064 & l.subtreeFlags),
              null !== r
                ? (i = Iu(r, i))
                : ((i = Ru(i, s, n, null)).flags |= 2),
              (i.return = t),
              (o.return = t),
              (o.sibling = i),
              (t.child = o),
              (o = i),
              (i = t.child),
              (s =
                null === (s = e.child.memoizedState)
                  ? Oi(n)
                  : {
                      baseLanes: s.baseLanes | n,
                      cachePool: null,
                      transitions: s.transitions,
                    }),
              (i.memoizedState = s),
              (i.childLanes = e.childLanes & ~n),
              (t.memoizedState = Ri),
              o
            );
          }
          return (
            (e = (i = e.child).sibling),
            (o = Iu(i, { mode: "visible", children: o.children })),
            0 === (1 & t.mode) && (o.lanes = n),
            (o.return = t),
            (o.sibling = null),
            null !== e &&
              (null === (n = t.deletions)
                ? ((t.deletions = [e]), (t.flags |= 16))
                : n.push(e)),
            (t.child = o),
            (t.memoizedState = null),
            o
          );
        }
        function Ai(e, t) {
          return (
            ((t = Ou(
              { mode: "visible", children: t },
              e.mode,
              0,
              null
            )).return = e),
            (e.child = t)
          );
        }
        function Fi(e, t, n, r) {
          return (
            null !== r && ma(r),
            ba(t, e.child, null, n),
            ((e = Ai(t, t.pendingProps.children)).flags |= 2),
            (t.memoizedState = null),
            e
          );
        }
        function Di(e, t, n) {
          e.lanes |= t;
          var r = e.alternate;
          null !== r && (r.lanes |= t), Na(e.return, t, n);
        }
        function ji(e, t, n, r, o) {
          var a = e.memoizedState;
          null === a
            ? (e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: r,
                tail: n,
                tailMode: o,
              })
            : ((a.isBackwards = t),
              (a.rendering = null),
              (a.renderingStartTime = 0),
              (a.last = r),
              (a.tail = n),
              (a.tailMode = o));
        }
        function Hi(e, t, n) {
          var r = t.pendingProps,
            o = r.revealOrder,
            a = r.tail;
          if ((wi(e, t, r.children, n), 0 !== (2 & (r = el.current))))
            (r = (1 & r) | 2), (t.flags |= 128);
          else {
            if (null !== e && 0 !== (128 & e.flags))
              e: for (e = t.child; null !== e; ) {
                if (13 === e.tag) null !== e.memoizedState && Di(e, n, t);
                else if (19 === e.tag) Di(e, n, t);
                else if (null !== e.child) {
                  (e.child.return = e), (e = e.child);
                  continue;
                }
                if (e === t) break e;
                for (; null === e.sibling; ) {
                  if (null === e.return || e.return === t) break e;
                  e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
              }
            r &= 1;
          }
          if ((Eo(el, r), 0 === (1 & t.mode))) t.memoizedState = null;
          else
            switch (o) {
              case "forwards":
                for (n = t.child, o = null; null !== n; )
                  null !== (e = n.alternate) && null === tl(e) && (o = n),
                    (n = n.sibling);
                null === (n = o)
                  ? ((o = t.child), (t.child = null))
                  : ((o = n.sibling), (n.sibling = null)),
                  ji(t, !1, o, n, a);
                break;
              case "backwards":
                for (n = null, o = t.child, t.child = null; null !== o; ) {
                  if (null !== (e = o.alternate) && null === tl(e)) {
                    t.child = o;
                    break;
                  }
                  (e = o.sibling), (o.sibling = n), (n = o), (o = e);
                }
                ji(t, !0, n, null, a);
                break;
              case "together":
                ji(t, !1, null, null, void 0);
                break;
              default:
                t.memoizedState = null;
            }
          return t.child;
        }
        function Vi(e, t) {
          0 === (1 & t.mode) &&
            null !== e &&
            ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
        }
        function $i(e, t, n) {
          if (
            (null !== e && (t.dependencies = e.dependencies),
            (Os |= t.lanes),
            0 === (n & t.childLanes))
          )
            return null;
          if (null !== e && t.child !== e.child) throw Error(a(153));
          if (null !== t.child) {
            for (
              n = Iu((e = t.child), e.pendingProps), t.child = n, n.return = t;
              null !== e.sibling;

            )
              (e = e.sibling),
                ((n = n.sibling = Iu(e, e.pendingProps)).return = t);
            n.sibling = null;
          }
          return t.child;
        }
        function Wi(e, t) {
          if (!aa)
            switch (e.tailMode) {
              case "hidden":
                t = e.tail;
                for (var n = null; null !== t; )
                  null !== t.alternate && (n = t), (t = t.sibling);
                null === n ? (e.tail = null) : (n.sibling = null);
                break;
              case "collapsed":
                n = e.tail;
                for (var r = null; null !== n; )
                  null !== n.alternate && (r = n), (n = n.sibling);
                null === r
                  ? t || null === e.tail
                    ? (e.tail = null)
                    : (e.tail.sibling = null)
                  : (r.sibling = null);
            }
        }
        function Qi(e) {
          var t = null !== e.alternate && e.alternate.child === e.child,
            n = 0,
            r = 0;
          if (t)
            for (var o = e.child; null !== o; )
              (n |= o.lanes | o.childLanes),
                (r |= 14680064 & o.subtreeFlags),
                (r |= 14680064 & o.flags),
                (o.return = e),
                (o = o.sibling);
          else
            for (o = e.child; null !== o; )
              (n |= o.lanes | o.childLanes),
                (r |= o.subtreeFlags),
                (r |= o.flags),
                (o.return = e),
                (o = o.sibling);
          return (e.subtreeFlags |= r), (e.childLanes = n), t;
        }
        function Xi(e, t, n) {
          var r = t.pendingProps;
          switch ((na(t), t.tag)) {
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
              return Qi(t), null;
            case 1:
            case 17:
              return Io(t.type) && zo(), Qi(t), null;
            case 3:
              return (
                (r = t.stateNode),
                Ja(),
                xo(_o),
                xo(No),
                rl(),
                r.pendingContext &&
                  ((r.context = r.pendingContext), (r.pendingContext = null)),
                (null !== e && null !== e.child) ||
                  (fa(t)
                    ? (t.flags |= 4)
                    : null === e ||
                      (e.memoizedState.isDehydrated && 0 === (256 & t.flags)) ||
                      ((t.flags |= 1024),
                      null !== la && (lu(la), (la = null)))),
                Ti(e, t),
                Qi(t),
                null
              );
            case 5:
              Za(t);
              var o = qa(Ka.current);
              if (((n = t.type), null !== e && null != t.stateNode))
                Ii(e, t, n, r, o),
                  e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
              else {
                if (!r) {
                  if (null === t.stateNode) throw Error(a(166));
                  return Qi(t), null;
                }
                if (((e = qa(Qa.current)), fa(t))) {
                  (r = t.stateNode), (n = t.type);
                  var l = t.memoizedProps;
                  switch (
                    ((r[po] = t), (r[ho] = l), (e = 0 !== (1 & t.mode)), n)
                  ) {
                    case "dialog":
                      Fr("cancel", r), Fr("close", r);
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      Fr("load", r);
                      break;
                    case "video":
                    case "audio":
                      for (o = 0; o < Rr.length; o++) Fr(Rr[o], r);
                      break;
                    case "source":
                      Fr("error", r);
                      break;
                    case "img":
                    case "image":
                    case "link":
                      Fr("error", r), Fr("load", r);
                      break;
                    case "details":
                      Fr("toggle", r);
                      break;
                    case "input":
                      Y(r, l), Fr("invalid", r);
                      break;
                    case "select":
                      (r._wrapperState = { wasMultiple: !!l.multiple }),
                        Fr("invalid", r);
                      break;
                    case "textarea":
                      oe(r, l), Fr("invalid", r);
                  }
                  for (var s in (ke(n, l), (o = null), l))
                    if (l.hasOwnProperty(s)) {
                      var u = l[s];
                      "children" === s
                        ? "string" === typeof u
                          ? r.textContent !== u &&
                            (!0 !== l.suppressHydrationWarning &&
                              Gr(r.textContent, u, e),
                            (o = ["children", u]))
                          : "number" === typeof u &&
                            r.textContent !== "" + u &&
                            (!0 !== l.suppressHydrationWarning &&
                              Gr(r.textContent, u, e),
                            (o = ["children", "" + u]))
                        : i.hasOwnProperty(s) &&
                          null != u &&
                          "onScroll" === s &&
                          Fr("scroll", r);
                    }
                  switch (n) {
                    case "input":
                      Q(r), Z(r, l, !0);
                      break;
                    case "textarea":
                      Q(r), le(r);
                      break;
                    case "select":
                    case "option":
                      break;
                    default:
                      "function" === typeof l.onClick && (r.onclick = Zr);
                  }
                  (r = o), (t.updateQueue = r), null !== r && (t.flags |= 4);
                } else {
                  (s = 9 === o.nodeType ? o : o.ownerDocument),
                    "http://www.w3.org/1999/xhtml" === e && (e = ie(n)),
                    "http://www.w3.org/1999/xhtml" === e
                      ? "script" === n
                        ? (((e = s.createElement("div")).innerHTML =
                            "<script></script>"),
                          (e = e.removeChild(e.firstChild)))
                        : "string" === typeof r.is
                        ? (e = s.createElement(n, { is: r.is }))
                        : ((e = s.createElement(n)),
                          "select" === n &&
                            ((s = e),
                            r.multiple
                              ? (s.multiple = !0)
                              : r.size && (s.size = r.size)))
                      : (e = s.createElementNS(e, n)),
                    (e[po] = t),
                    (e[ho] = r),
                    Li(e, t, !1, !1),
                    (t.stateNode = e);
                  e: {
                    switch (((s = ye(n, r)), n)) {
                      case "dialog":
                        Fr("cancel", e), Fr("close", e), (o = r);
                        break;
                      case "iframe":
                      case "object":
                      case "embed":
                        Fr("load", e), (o = r);
                        break;
                      case "video":
                      case "audio":
                        for (o = 0; o < Rr.length; o++) Fr(Rr[o], e);
                        o = r;
                        break;
                      case "source":
                        Fr("error", e), (o = r);
                        break;
                      case "img":
                      case "image":
                      case "link":
                        Fr("error", e), Fr("load", e), (o = r);
                        break;
                      case "details":
                        Fr("toggle", e), (o = r);
                        break;
                      case "input":
                        Y(e, r), (o = q(e, r)), Fr("invalid", e);
                        break;
                      case "option":
                      default:
                        o = r;
                        break;
                      case "select":
                        (e._wrapperState = { wasMultiple: !!r.multiple }),
                          (o = U({}, r, { value: void 0 })),
                          Fr("invalid", e);
                        break;
                      case "textarea":
                        oe(e, r), (o = re(e, r)), Fr("invalid", e);
                    }
                    for (l in (ke(n, o), (u = o)))
                      if (u.hasOwnProperty(l)) {
                        var c = u[l];
                        "style" === l
                          ? ge(e, c)
                          : "dangerouslySetInnerHTML" === l
                          ? null != (c = c ? c.__html : void 0) && de(e, c)
                          : "children" === l
                          ? "string" === typeof c
                            ? ("textarea" !== n || "" !== c) && fe(e, c)
                            : "number" === typeof c && fe(e, "" + c)
                          : "suppressContentEditableWarning" !== l &&
                            "suppressHydrationWarning" !== l &&
                            "autoFocus" !== l &&
                            (i.hasOwnProperty(l)
                              ? null != c && "onScroll" === l && Fr("scroll", e)
                              : null != c && y(e, l, c, s));
                      }
                    switch (n) {
                      case "input":
                        Q(e), Z(e, r, !1);
                        break;
                      case "textarea":
                        Q(e), le(e);
                        break;
                      case "option":
                        null != r.value &&
                          e.setAttribute("value", "" + $(r.value));
                        break;
                      case "select":
                        (e.multiple = !!r.multiple),
                          null != (l = r.value)
                            ? ne(e, !!r.multiple, l, !1)
                            : null != r.defaultValue &&
                              ne(e, !!r.multiple, r.defaultValue, !0);
                        break;
                      default:
                        "function" === typeof o.onClick && (e.onclick = Zr);
                    }
                    switch (n) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        r = !!r.autoFocus;
                        break e;
                      case "img":
                        r = !0;
                        break e;
                      default:
                        r = !1;
                    }
                  }
                  r && (t.flags |= 4);
                }
                null !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
              }
              return Qi(t), null;
            case 6:
              if (e && null != t.stateNode) zi(e, t, e.memoizedProps, r);
              else {
                if ("string" !== typeof r && null === t.stateNode)
                  throw Error(a(166));
                if (((n = qa(Ka.current)), qa(Qa.current), fa(t))) {
                  if (
                    ((r = t.stateNode),
                    (n = t.memoizedProps),
                    (r[po] = t),
                    (l = r.nodeValue !== n) && null !== (e = ra))
                  )
                    switch (e.tag) {
                      case 3:
                        Gr(r.nodeValue, n, 0 !== (1 & e.mode));
                        break;
                      case 5:
                        !0 !== e.memoizedProps.suppressHydrationWarning &&
                          Gr(r.nodeValue, n, 0 !== (1 & e.mode));
                    }
                  l && (t.flags |= 4);
                } else
                  ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(
                    r
                  ))[po] = t),
                    (t.stateNode = r);
              }
              return Qi(t), null;
            case 13:
              if (
                (xo(el),
                (r = t.memoizedState),
                null === e ||
                  (null !== e.memoizedState &&
                    null !== e.memoizedState.dehydrated))
              ) {
                if (
                  aa &&
                  null !== oa &&
                  0 !== (1 & t.mode) &&
                  0 === (128 & t.flags)
                )
                  pa(), ha(), (t.flags |= 98560), (l = !1);
                else if (((l = fa(t)), null !== r && null !== r.dehydrated)) {
                  if (null === e) {
                    if (!l) throw Error(a(318));
                    if (
                      !(l =
                        null !== (l = t.memoizedState) ? l.dehydrated : null)
                    )
                      throw Error(a(317));
                    l[po] = t;
                  } else
                    ha(),
                      0 === (128 & t.flags) && (t.memoizedState = null),
                      (t.flags |= 4);
                  Qi(t), (l = !1);
                } else null !== la && (lu(la), (la = null)), (l = !0);
                if (!l) return 65536 & t.flags ? t : null;
              }
              return 0 !== (128 & t.flags)
                ? ((t.lanes = n), t)
                : ((r = null !== r) !==
                    (null !== e && null !== e.memoizedState) &&
                    r &&
                    ((t.child.flags |= 8192),
                    0 !== (1 & t.mode) &&
                      (null === e || 0 !== (1 & el.current)
                        ? 0 === zs && (zs = 3)
                        : mu())),
                  null !== t.updateQueue && (t.flags |= 4),
                  Qi(t),
                  null);
            case 4:
              return (
                Ja(),
                Ti(e, t),
                null === e && Hr(t.stateNode.containerInfo),
                Qi(t),
                null
              );
            case 10:
              return Ma(t.type._context), Qi(t), null;
            case 19:
              if ((xo(el), null === (l = t.memoizedState))) return Qi(t), null;
              if (((r = 0 !== (128 & t.flags)), null === (s = l.rendering)))
                if (r) Wi(l, !1);
                else {
                  if (0 !== zs || (null !== e && 0 !== (128 & e.flags)))
                    for (e = t.child; null !== e; ) {
                      if (null !== (s = tl(e))) {
                        for (
                          t.flags |= 128,
                            Wi(l, !1),
                            null !== (r = s.updateQueue) &&
                              ((t.updateQueue = r), (t.flags |= 4)),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child;
                          null !== n;

                        )
                          (e = r),
                            ((l = n).flags &= 14680066),
                            null === (s = l.alternate)
                              ? ((l.childLanes = 0),
                                (l.lanes = e),
                                (l.child = null),
                                (l.subtreeFlags = 0),
                                (l.memoizedProps = null),
                                (l.memoizedState = null),
                                (l.updateQueue = null),
                                (l.dependencies = null),
                                (l.stateNode = null))
                              : ((l.childLanes = s.childLanes),
                                (l.lanes = s.lanes),
                                (l.child = s.child),
                                (l.subtreeFlags = 0),
                                (l.deletions = null),
                                (l.memoizedProps = s.memoizedProps),
                                (l.memoizedState = s.memoizedState),
                                (l.updateQueue = s.updateQueue),
                                (l.type = s.type),
                                (e = s.dependencies),
                                (l.dependencies =
                                  null === e
                                    ? null
                                    : {
                                        lanes: e.lanes,
                                        firstContext: e.firstContext,
                                      })),
                            (n = n.sibling);
                        return Eo(el, (1 & el.current) | 2), t.child;
                      }
                      e = e.sibling;
                    }
                  null !== l.tail &&
                    Je() > Hs &&
                    ((t.flags |= 128),
                    (r = !0),
                    Wi(l, !1),
                    (t.lanes = 4194304));
                }
              else {
                if (!r)
                  if (null !== (e = tl(s))) {
                    if (
                      ((t.flags |= 128),
                      (r = !0),
                      null !== (n = e.updateQueue) &&
                        ((t.updateQueue = n), (t.flags |= 4)),
                      Wi(l, !0),
                      null === l.tail &&
                        "hidden" === l.tailMode &&
                        !s.alternate &&
                        !aa)
                    )
                      return Qi(t), null;
                  } else
                    2 * Je() - l.renderingStartTime > Hs &&
                      1073741824 !== n &&
                      ((t.flags |= 128),
                      (r = !0),
                      Wi(l, !1),
                      (t.lanes = 4194304));
                l.isBackwards
                  ? ((s.sibling = t.child), (t.child = s))
                  : (null !== (n = l.last) ? (n.sibling = s) : (t.child = s),
                    (l.last = s));
              }
              return null !== l.tail
                ? ((t = l.tail),
                  (l.rendering = t),
                  (l.tail = t.sibling),
                  (l.renderingStartTime = Je()),
                  (t.sibling = null),
                  (n = el.current),
                  Eo(el, r ? (1 & n) | 2 : 1 & n),
                  t)
                : (Qi(t), null);
            case 22:
            case 23:
              return (
                du(),
                (r = null !== t.memoizedState),
                null !== e &&
                  (null !== e.memoizedState) !== r &&
                  (t.flags |= 8192),
                r && 0 !== (1 & t.mode)
                  ? 0 !== (1073741824 & Ts) &&
                    (Qi(t), 6 & t.subtreeFlags && (t.flags |= 8192))
                  : Qi(t),
                null
              );
            case 24:
            case 25:
              return null;
          }
          throw Error(a(156, t.tag));
        }
        function Ki(e, t) {
          switch ((na(t), t.tag)) {
            case 1:
              return (
                Io(t.type) && zo(),
                65536 & (e = t.flags)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 3:
              return (
                Ja(),
                xo(_o),
                xo(No),
                rl(),
                0 !== (65536 & (e = t.flags)) && 0 === (128 & e)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 5:
              return Za(t), null;
            case 13:
              if (
                (xo(el),
                null !== (e = t.memoizedState) && null !== e.dehydrated)
              ) {
                if (null === t.alternate) throw Error(a(340));
                ha();
              }
              return 65536 & (e = t.flags)
                ? ((t.flags = (-65537 & e) | 128), t)
                : null;
            case 19:
              return xo(el), null;
            case 4:
              return Ja(), null;
            case 10:
              return Ma(t.type._context), null;
            case 22:
            case 23:
              return du(), null;
            default:
              return null;
          }
        }
        (Li = function (e, t) {
          for (var n = t.child; null !== n; ) {
            if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
            else if (4 !== n.tag && null !== n.child) {
              (n.child.return = n), (n = n.child);
              continue;
            }
            if (n === t) break;
            for (; null === n.sibling; ) {
              if (null === n.return || n.return === t) return;
              n = n.return;
            }
            (n.sibling.return = n.return), (n = n.sibling);
          }
        }),
          (Ti = function () {}),
          (Ii = function (e, t, n, r) {
            var o = e.memoizedProps;
            if (o !== r) {
              (e = t.stateNode), qa(Qa.current);
              var a,
                l = null;
              switch (n) {
                case "input":
                  (o = q(e, o)), (r = q(e, r)), (l = []);
                  break;
                case "select":
                  (o = U({}, o, { value: void 0 })),
                    (r = U({}, r, { value: void 0 })),
                    (l = []);
                  break;
                case "textarea":
                  (o = re(e, o)), (r = re(e, r)), (l = []);
                  break;
                default:
                  "function" !== typeof o.onClick &&
                    "function" === typeof r.onClick &&
                    (e.onclick = Zr);
              }
              for (c in (ke(n, r), (n = null), o))
                if (!r.hasOwnProperty(c) && o.hasOwnProperty(c) && null != o[c])
                  if ("style" === c) {
                    var s = o[c];
                    for (a in s)
                      s.hasOwnProperty(a) && (n || (n = {}), (n[a] = ""));
                  } else
                    "dangerouslySetInnerHTML" !== c &&
                      "children" !== c &&
                      "suppressContentEditableWarning" !== c &&
                      "suppressHydrationWarning" !== c &&
                      "autoFocus" !== c &&
                      (i.hasOwnProperty(c)
                        ? l || (l = [])
                        : (l = l || []).push(c, null));
              for (c in r) {
                var u = r[c];
                if (
                  ((s = null != o ? o[c] : void 0),
                  r.hasOwnProperty(c) && u !== s && (null != u || null != s))
                )
                  if ("style" === c)
                    if (s) {
                      for (a in s)
                        !s.hasOwnProperty(a) ||
                          (u && u.hasOwnProperty(a)) ||
                          (n || (n = {}), (n[a] = ""));
                      for (a in u)
                        u.hasOwnProperty(a) &&
                          s[a] !== u[a] &&
                          (n || (n = {}), (n[a] = u[a]));
                    } else n || (l || (l = []), l.push(c, n)), (n = u);
                  else
                    "dangerouslySetInnerHTML" === c
                      ? ((u = u ? u.__html : void 0),
                        (s = s ? s.__html : void 0),
                        null != u && s !== u && (l = l || []).push(c, u))
                      : "children" === c
                      ? ("string" !== typeof u && "number" !== typeof u) ||
                        (l = l || []).push(c, "" + u)
                      : "suppressContentEditableWarning" !== c &&
                        "suppressHydrationWarning" !== c &&
                        (i.hasOwnProperty(c)
                          ? (null != u && "onScroll" === c && Fr("scroll", e),
                            l || s === u || (l = []))
                          : (l = l || []).push(c, u));
              }
              n && (l = l || []).push("style", n);
              var c = l;
              (t.updateQueue = c) && (t.flags |= 4);
            }
          }),
          (zi = function (e, t, n, r) {
            n !== r && (t.flags |= 4);
          });
        var qi = !1,
          Yi = !1,
          Ji = "function" === typeof WeakSet ? WeakSet : Set,
          Gi = null;
        function Zi(e, t) {
          var n = e.ref;
          if (null !== n)
            if ("function" === typeof n)
              try {
                n(null);
              } catch (r) {
                Pu(e, t, r);
              }
            else n.current = null;
        }
        function es(e, t, n) {
          try {
            n();
          } catch (r) {
            Pu(e, t, r);
          }
        }
        var ts = !1;
        function ns(e, t, n) {
          var r = t.updateQueue;
          if (null !== (r = null !== r ? r.lastEffect : null)) {
            var o = (r = r.next);
            do {
              if ((o.tag & e) === e) {
                var a = o.destroy;
                (o.destroy = void 0), void 0 !== a && es(t, n, a);
              }
              o = o.next;
            } while (o !== r);
          }
        }
        function rs(e, t) {
          if (
            null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)
          ) {
            var n = (t = t.next);
            do {
              if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
              }
              n = n.next;
            } while (n !== t);
          }
        }
        function os(e) {
          var t = e.ref;
          if (null !== t) {
            var n = e.stateNode;
            e.tag, (e = n), "function" === typeof t ? t(e) : (t.current = e);
          }
        }
        function as(e) {
          var t = e.alternate;
          null !== t && ((e.alternate = null), as(t)),
            (e.child = null),
            (e.deletions = null),
            (e.sibling = null),
            5 === e.tag &&
              null !== (t = e.stateNode) &&
              (delete t[po],
              delete t[ho],
              delete t[go],
              delete t[vo],
              delete t[ko]),
            (e.stateNode = null),
            (e.return = null),
            (e.dependencies = null),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.pendingProps = null),
            (e.stateNode = null),
            (e.updateQueue = null);
        }
        function ls(e) {
          return 5 === e.tag || 3 === e.tag || 4 === e.tag;
        }
        function is(e) {
          e: for (;;) {
            for (; null === e.sibling; ) {
              if (null === e.return || ls(e.return)) return null;
              e = e.return;
            }
            for (
              e.sibling.return = e.return, e = e.sibling;
              5 !== e.tag && 6 !== e.tag && 18 !== e.tag;

            ) {
              if (2 & e.flags) continue e;
              if (null === e.child || 4 === e.tag) continue e;
              (e.child.return = e), (e = e.child);
            }
            if (!(2 & e.flags)) return e.stateNode;
          }
        }
        function ss(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            (e = e.stateNode),
              t
                ? 8 === n.nodeType
                  ? n.parentNode.insertBefore(e, t)
                  : n.insertBefore(e, t)
                : (8 === n.nodeType
                    ? (t = n.parentNode).insertBefore(e, n)
                    : (t = n).appendChild(e),
                  (null !== (n = n._reactRootContainer) && void 0 !== n) ||
                    null !== t.onclick ||
                    (t.onclick = Zr));
          else if (4 !== r && null !== (e = e.child))
            for (ss(e, t, n), e = e.sibling; null !== e; )
              ss(e, t, n), (e = e.sibling);
        }
        function us(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
          else if (4 !== r && null !== (e = e.child))
            for (us(e, t, n), e = e.sibling; null !== e; )
              us(e, t, n), (e = e.sibling);
        }
        var cs = null,
          ds = !1;
        function fs(e, t, n) {
          for (n = n.child; null !== n; ) ps(e, t, n), (n = n.sibling);
        }
        function ps(e, t, n) {
          if (at && "function" === typeof at.onCommitFiberUnmount)
            try {
              at.onCommitFiberUnmount(ot, n);
            } catch (i) {}
          switch (n.tag) {
            case 5:
              Yi || Zi(n, t);
            case 6:
              var r = cs,
                o = ds;
              (cs = null),
                fs(e, t, n),
                (ds = o),
                null !== (cs = r) &&
                  (ds
                    ? ((e = cs),
                      (n = n.stateNode),
                      8 === e.nodeType
                        ? e.parentNode.removeChild(n)
                        : e.removeChild(n))
                    : cs.removeChild(n.stateNode));
              break;
            case 18:
              null !== cs &&
                (ds
                  ? ((e = cs),
                    (n = n.stateNode),
                    8 === e.nodeType
                      ? so(e.parentNode, n)
                      : 1 === e.nodeType && so(e, n),
                    Ht(e))
                  : so(cs, n.stateNode));
              break;
            case 4:
              (r = cs),
                (o = ds),
                (cs = n.stateNode.containerInfo),
                (ds = !0),
                fs(e, t, n),
                (cs = r),
                (ds = o);
              break;
            case 0:
            case 11:
            case 14:
            case 15:
              if (
                !Yi &&
                null !== (r = n.updateQueue) &&
                null !== (r = r.lastEffect)
              ) {
                o = r = r.next;
                do {
                  var a = o,
                    l = a.destroy;
                  (a = a.tag),
                    void 0 !== l &&
                      (0 !== (2 & a) || 0 !== (4 & a)) &&
                      es(n, t, l),
                    (o = o.next);
                } while (o !== r);
              }
              fs(e, t, n);
              break;
            case 1:
              if (
                !Yi &&
                (Zi(n, t),
                "function" === typeof (r = n.stateNode).componentWillUnmount)
              )
                try {
                  (r.props = n.memoizedProps),
                    (r.state = n.memoizedState),
                    r.componentWillUnmount();
                } catch (i) {
                  Pu(n, t, i);
                }
              fs(e, t, n);
              break;
            case 21:
              fs(e, t, n);
              break;
            case 22:
              1 & n.mode
                ? ((Yi = (r = Yi) || null !== n.memoizedState),
                  fs(e, t, n),
                  (Yi = r))
                : fs(e, t, n);
              break;
            default:
              fs(e, t, n);
          }
        }
        function hs(e) {
          var t = e.updateQueue;
          if (null !== t) {
            e.updateQueue = null;
            var n = e.stateNode;
            null === n && (n = e.stateNode = new Ji()),
              t.forEach(function (t) {
                var r = Mu.bind(null, e, t);
                n.has(t) || (n.add(t), t.then(r, r));
              });
          }
        }
        function ms(e, t) {
          var n = t.deletions;
          if (null !== n)
            for (var r = 0; r < n.length; r++) {
              var o = n[r];
              try {
                var l = e,
                  i = t,
                  s = i;
                e: for (; null !== s; ) {
                  switch (s.tag) {
                    case 5:
                      (cs = s.stateNode), (ds = !1);
                      break e;
                    case 3:
                    case 4:
                      (cs = s.stateNode.containerInfo), (ds = !0);
                      break e;
                  }
                  s = s.return;
                }
                if (null === cs) throw Error(a(160));
                ps(l, i, o), (cs = null), (ds = !1);
                var u = o.alternate;
                null !== u && (u.return = null), (o.return = null);
              } catch (c) {
                Pu(o, t, c);
              }
            }
          if (12854 & t.subtreeFlags)
            for (t = t.child; null !== t; ) gs(t, e), (t = t.sibling);
        }
        function gs(e, t) {
          var n = e.alternate,
            r = e.flags;
          switch (e.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              if ((ms(t, e), vs(e), 4 & r)) {
                try {
                  ns(3, e, e.return), rs(3, e);
                } catch (g) {
                  Pu(e, e.return, g);
                }
                try {
                  ns(5, e, e.return);
                } catch (g) {
                  Pu(e, e.return, g);
                }
              }
              break;
            case 1:
              ms(t, e), vs(e), 512 & r && null !== n && Zi(n, n.return);
              break;
            case 5:
              if (
                (ms(t, e),
                vs(e),
                512 & r && null !== n && Zi(n, n.return),
                32 & e.flags)
              ) {
                var o = e.stateNode;
                try {
                  fe(o, "");
                } catch (g) {
                  Pu(e, e.return, g);
                }
              }
              if (4 & r && null != (o = e.stateNode)) {
                var l = e.memoizedProps,
                  i = null !== n ? n.memoizedProps : l,
                  s = e.type,
                  u = e.updateQueue;
                if (((e.updateQueue = null), null !== u))
                  try {
                    "input" === s &&
                      "radio" === l.type &&
                      null != l.name &&
                      J(o, l),
                      ye(s, i);
                    var c = ye(s, l);
                    for (i = 0; i < u.length; i += 2) {
                      var d = u[i],
                        f = u[i + 1];
                      "style" === d
                        ? ge(o, f)
                        : "dangerouslySetInnerHTML" === d
                        ? de(o, f)
                        : "children" === d
                        ? fe(o, f)
                        : y(o, d, f, c);
                    }
                    switch (s) {
                      case "input":
                        G(o, l);
                        break;
                      case "textarea":
                        ae(o, l);
                        break;
                      case "select":
                        var p = o._wrapperState.wasMultiple;
                        o._wrapperState.wasMultiple = !!l.multiple;
                        var h = l.value;
                        null != h
                          ? ne(o, !!l.multiple, h, !1)
                          : p !== !!l.multiple &&
                            (null != l.defaultValue
                              ? ne(o, !!l.multiple, l.defaultValue, !0)
                              : ne(o, !!l.multiple, l.multiple ? [] : "", !1));
                    }
                    o[ho] = l;
                  } catch (g) {
                    Pu(e, e.return, g);
                  }
              }
              break;
            case 6:
              if ((ms(t, e), vs(e), 4 & r)) {
                if (null === e.stateNode) throw Error(a(162));
                (o = e.stateNode), (l = e.memoizedProps);
                try {
                  o.nodeValue = l;
                } catch (g) {
                  Pu(e, e.return, g);
                }
              }
              break;
            case 3:
              if (
                (ms(t, e),
                vs(e),
                4 & r && null !== n && n.memoizedState.isDehydrated)
              )
                try {
                  Ht(t.containerInfo);
                } catch (g) {
                  Pu(e, e.return, g);
                }
              break;
            case 4:
            default:
              ms(t, e), vs(e);
              break;
            case 13:
              ms(t, e),
                vs(e),
                8192 & (o = e.child).flags &&
                  ((l = null !== o.memoizedState),
                  (o.stateNode.isHidden = l),
                  !l ||
                    (null !== o.alternate &&
                      null !== o.alternate.memoizedState) ||
                    (js = Je())),
                4 & r && hs(e);
              break;
            case 22:
              if (
                ((d = null !== n && null !== n.memoizedState),
                1 & e.mode
                  ? ((Yi = (c = Yi) || d), ms(t, e), (Yi = c))
                  : ms(t, e),
                vs(e),
                8192 & r)
              ) {
                if (
                  ((c = null !== e.memoizedState),
                  (e.stateNode.isHidden = c) && !d && 0 !== (1 & e.mode))
                )
                  for (Gi = e, d = e.child; null !== d; ) {
                    for (f = Gi = d; null !== Gi; ) {
                      switch (((h = (p = Gi).child), p.tag)) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                          ns(4, p, p.return);
                          break;
                        case 1:
                          Zi(p, p.return);
                          var m = p.stateNode;
                          if ("function" === typeof m.componentWillUnmount) {
                            (r = p), (n = p.return);
                            try {
                              (t = r),
                                (m.props = t.memoizedProps),
                                (m.state = t.memoizedState),
                                m.componentWillUnmount();
                            } catch (g) {
                              Pu(r, n, g);
                            }
                          }
                          break;
                        case 5:
                          Zi(p, p.return);
                          break;
                        case 22:
                          if (null !== p.memoizedState) {
                            bs(f);
                            continue;
                          }
                      }
                      null !== h ? ((h.return = p), (Gi = h)) : bs(f);
                    }
                    d = d.sibling;
                  }
                e: for (d = null, f = e; ; ) {
                  if (5 === f.tag) {
                    if (null === d) {
                      d = f;
                      try {
                        (o = f.stateNode),
                          c
                            ? "function" === typeof (l = o.style).setProperty
                              ? l.setProperty("display", "none", "important")
                              : (l.display = "none")
                            : ((s = f.stateNode),
                              (i =
                                void 0 !== (u = f.memoizedProps.style) &&
                                null !== u &&
                                u.hasOwnProperty("display")
                                  ? u.display
                                  : null),
                              (s.style.display = me("display", i)));
                      } catch (g) {
                        Pu(e, e.return, g);
                      }
                    }
                  } else if (6 === f.tag) {
                    if (null === d)
                      try {
                        f.stateNode.nodeValue = c ? "" : f.memoizedProps;
                      } catch (g) {
                        Pu(e, e.return, g);
                      }
                  } else if (
                    ((22 !== f.tag && 23 !== f.tag) ||
                      null === f.memoizedState ||
                      f === e) &&
                    null !== f.child
                  ) {
                    (f.child.return = f), (f = f.child);
                    continue;
                  }
                  if (f === e) break e;
                  for (; null === f.sibling; ) {
                    if (null === f.return || f.return === e) break e;
                    d === f && (d = null), (f = f.return);
                  }
                  d === f && (d = null),
                    (f.sibling.return = f.return),
                    (f = f.sibling);
                }
              }
              break;
            case 19:
              ms(t, e), vs(e), 4 & r && hs(e);
            case 21:
          }
        }
        function vs(e) {
          var t = e.flags;
          if (2 & t) {
            try {
              e: {
                for (var n = e.return; null !== n; ) {
                  if (ls(n)) {
                    var r = n;
                    break e;
                  }
                  n = n.return;
                }
                throw Error(a(160));
              }
              switch (r.tag) {
                case 5:
                  var o = r.stateNode;
                  32 & r.flags && (fe(o, ""), (r.flags &= -33)),
                    us(e, is(e), o);
                  break;
                case 3:
                case 4:
                  var l = r.stateNode.containerInfo;
                  ss(e, is(e), l);
                  break;
                default:
                  throw Error(a(161));
              }
            } catch (i) {
              Pu(e, e.return, i);
            }
            e.flags &= -3;
          }
          4096 & t && (e.flags &= -4097);
        }
        function ks(e, t, n) {
          (Gi = e), ys(e, t, n);
        }
        function ys(e, t, n) {
          for (var r = 0 !== (1 & e.mode); null !== Gi; ) {
            var o = Gi,
              a = o.child;
            if (22 === o.tag && r) {
              var l = null !== o.memoizedState || qi;
              if (!l) {
                var i = o.alternate,
                  s = (null !== i && null !== i.memoizedState) || Yi;
                i = qi;
                var u = Yi;
                if (((qi = l), (Yi = s) && !u))
                  for (Gi = o; null !== Gi; )
                    (s = (l = Gi).child),
                      22 === l.tag && null !== l.memoizedState
                        ? Bs(o)
                        : null !== s
                        ? ((s.return = l), (Gi = s))
                        : Bs(o);
                for (; null !== a; ) (Gi = a), ys(a, t, n), (a = a.sibling);
                (Gi = o), (qi = i), (Yi = u);
              }
              ws(e);
            } else
              0 !== (8772 & o.subtreeFlags) && null !== a
                ? ((a.return = o), (Gi = a))
                : ws(e);
          }
        }
        function ws(e) {
          for (; null !== Gi; ) {
            var t = Gi;
            if (0 !== (8772 & t.flags)) {
              var n = t.alternate;
              try {
                if (0 !== (8772 & t.flags))
                  switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Yi || rs(5, t);
                      break;
                    case 1:
                      var r = t.stateNode;
                      if (4 & t.flags && !Yi)
                        if (null === n) r.componentDidMount();
                        else {
                          var o =
                            t.elementType === t.type
                              ? n.memoizedProps
                              : ni(t.type, n.memoizedProps);
                          r.componentDidUpdate(
                            o,
                            n.memoizedState,
                            r.__reactInternalSnapshotBeforeUpdate
                          );
                        }
                      var l = t.updateQueue;
                      null !== l && $a(t, l, r);
                      break;
                    case 3:
                      var i = t.updateQueue;
                      if (null !== i) {
                        if (((n = null), null !== t.child))
                          switch (t.child.tag) {
                            case 5:
                            case 1:
                              n = t.child.stateNode;
                          }
                        $a(t, i, n);
                      }
                      break;
                    case 5:
                      var s = t.stateNode;
                      if (null === n && 4 & t.flags) {
                        n = s;
                        var u = t.memoizedProps;
                        switch (t.type) {
                          case "button":
                          case "input":
                          case "select":
                          case "textarea":
                            u.autoFocus && n.focus();
                            break;
                          case "img":
                            u.src && (n.src = u.src);
                        }
                      }
                      break;
                    case 6:
                    case 4:
                    case 12:
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                      break;
                    case 13:
                      if (null === t.memoizedState) {
                        var c = t.alternate;
                        if (null !== c) {
                          var d = c.memoizedState;
                          if (null !== d) {
                            var f = d.dehydrated;
                            null !== f && Ht(f);
                          }
                        }
                      }
                      break;
                    default:
                      throw Error(a(163));
                  }
                Yi || (512 & t.flags && os(t));
              } catch (p) {
                Pu(t, t.return, p);
              }
            }
            if (t === e) {
              Gi = null;
              break;
            }
            if (null !== (n = t.sibling)) {
              (n.return = t.return), (Gi = n);
              break;
            }
            Gi = t.return;
          }
        }
        function bs(e) {
          for (; null !== Gi; ) {
            var t = Gi;
            if (t === e) {
              Gi = null;
              break;
            }
            var n = t.sibling;
            if (null !== n) {
              (n.return = t.return), (Gi = n);
              break;
            }
            Gi = t.return;
          }
        }
        function Bs(e) {
          for (; null !== Gi; ) {
            var t = Gi;
            try {
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  var n = t.return;
                  try {
                    rs(4, t);
                  } catch (s) {
                    Pu(t, n, s);
                  }
                  break;
                case 1:
                  var r = t.stateNode;
                  if ("function" === typeof r.componentDidMount) {
                    var o = t.return;
                    try {
                      r.componentDidMount();
                    } catch (s) {
                      Pu(t, o, s);
                    }
                  }
                  var a = t.return;
                  try {
                    os(t);
                  } catch (s) {
                    Pu(t, a, s);
                  }
                  break;
                case 5:
                  var l = t.return;
                  try {
                    os(t);
                  } catch (s) {
                    Pu(t, l, s);
                  }
              }
            } catch (s) {
              Pu(t, t.return, s);
            }
            if (t === e) {
              Gi = null;
              break;
            }
            var i = t.sibling;
            if (null !== i) {
              (i.return = t.return), (Gi = i);
              break;
            }
            Gi = t.return;
          }
        }
        var Cs,
          Ps = Math.ceil,
          Ss = w.ReactCurrentDispatcher,
          xs = w.ReactCurrentOwner,
          Es = w.ReactCurrentBatchConfig,
          Ms = 0,
          Ns = null,
          _s = null,
          Ls = 0,
          Ts = 0,
          Is = So(0),
          zs = 0,
          Rs = null,
          Os = 0,
          Us = 0,
          As = 0,
          Fs = null,
          Ds = null,
          js = 0,
          Hs = 1 / 0,
          Vs = null,
          $s = !1,
          Ws = null,
          Qs = null,
          Xs = !1,
          Ks = null,
          qs = 0,
          Ys = 0,
          Js = null,
          Gs = -1,
          Zs = 0;
        function eu() {
          return 0 !== (6 & Ms) ? Je() : -1 !== Gs ? Gs : (Gs = Je());
        }
        function tu(e) {
          return 0 === (1 & e.mode)
            ? 1
            : 0 !== (2 & Ms) && 0 !== Ls
            ? Ls & -Ls
            : null !== ga.transition
            ? (0 === Zs && (Zs = mt()), Zs)
            : 0 !== (e = yt)
            ? e
            : (e = void 0 === (e = window.event) ? 16 : Yt(e.type));
        }
        function nu(e, t, n, r) {
          if (50 < Ys) throw ((Ys = 0), (Js = null), Error(a(185)));
          vt(e, n, r),
            (0 !== (2 & Ms) && e === Ns) ||
              (e === Ns && (0 === (2 & Ms) && (Us |= n), 4 === zs && iu(e, Ls)),
              ru(e, r),
              1 === n &&
                0 === Ms &&
                0 === (1 & t.mode) &&
                ((Hs = Je() + 500), Do && Vo()));
        }
        function ru(e, t) {
          var n = e.callbackNode;
          !(function (e, t) {
            for (
              var n = e.suspendedLanes,
                r = e.pingedLanes,
                o = e.expirationTimes,
                a = e.pendingLanes;
              0 < a;

            ) {
              var l = 31 - lt(a),
                i = 1 << l,
                s = o[l];
              -1 === s
                ? (0 !== (i & n) && 0 === (i & r)) || (o[l] = pt(i, t))
                : s <= t && (e.expiredLanes |= i),
                (a &= ~i);
            }
          })(e, t);
          var r = ft(e, e === Ns ? Ls : 0);
          if (0 === r)
            null !== n && Ke(n),
              (e.callbackNode = null),
              (e.callbackPriority = 0);
          else if (((t = r & -r), e.callbackPriority !== t)) {
            if ((null != n && Ke(n), 1 === t))
              0 === e.tag
                ? (function (e) {
                    (Do = !0), Ho(e);
                  })(su.bind(null, e))
                : Ho(su.bind(null, e)),
                lo(function () {
                  0 === (6 & Ms) && Vo();
                }),
                (n = null);
            else {
              switch (wt(r)) {
                case 1:
                  n = Ze;
                  break;
                case 4:
                  n = et;
                  break;
                case 16:
                default:
                  n = tt;
                  break;
                case 536870912:
                  n = rt;
              }
              n = Nu(n, ou.bind(null, e));
            }
            (e.callbackPriority = t), (e.callbackNode = n);
          }
        }
        function ou(e, t) {
          if (((Gs = -1), (Zs = 0), 0 !== (6 & Ms))) throw Error(a(327));
          var n = e.callbackNode;
          if (Bu() && e.callbackNode !== n) return null;
          var r = ft(e, e === Ns ? Ls : 0);
          if (0 === r) return null;
          if (0 !== (30 & r) || 0 !== (r & e.expiredLanes) || t) t = gu(e, r);
          else {
            t = r;
            var o = Ms;
            Ms |= 2;
            var l = hu();
            for (
              (Ns === e && Ls === t) ||
              ((Vs = null), (Hs = Je() + 500), fu(e, t));
              ;

            )
              try {
                ku();
                break;
              } catch (s) {
                pu(e, s);
              }
            Ea(),
              (Ss.current = l),
              (Ms = o),
              null !== _s ? (t = 0) : ((Ns = null), (Ls = 0), (t = zs));
          }
          if (0 !== t) {
            if (
              (2 === t && 0 !== (o = ht(e)) && ((r = o), (t = au(e, o))),
              1 === t)
            )
              throw ((n = Rs), fu(e, 0), iu(e, r), ru(e, Je()), n);
            if (6 === t) iu(e, r);
            else {
              if (
                ((o = e.current.alternate),
                0 === (30 & r) &&
                  !(function (e) {
                    for (var t = e; ; ) {
                      if (16384 & t.flags) {
                        var n = t.updateQueue;
                        if (null !== n && null !== (n = n.stores))
                          for (var r = 0; r < n.length; r++) {
                            var o = n[r],
                              a = o.getSnapshot;
                            o = o.value;
                            try {
                              if (!ir(a(), o)) return !1;
                            } catch (i) {
                              return !1;
                            }
                          }
                      }
                      if (((n = t.child), 16384 & t.subtreeFlags && null !== n))
                        (n.return = t), (t = n);
                      else {
                        if (t === e) break;
                        for (; null === t.sibling; ) {
                          if (null === t.return || t.return === e) return !0;
                          t = t.return;
                        }
                        (t.sibling.return = t.return), (t = t.sibling);
                      }
                    }
                    return !0;
                  })(o) &&
                  (2 === (t = gu(e, r)) &&
                    0 !== (l = ht(e)) &&
                    ((r = l), (t = au(e, l))),
                  1 === t))
              )
                throw ((n = Rs), fu(e, 0), iu(e, r), ru(e, Je()), n);
              switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                  throw Error(a(345));
                case 2:
                case 5:
                  bu(e, Ds, Vs);
                  break;
                case 3:
                  if (
                    (iu(e, r),
                    (130023424 & r) === r && 10 < (t = js + 500 - Je()))
                  ) {
                    if (0 !== ft(e, 0)) break;
                    if (((o = e.suspendedLanes) & r) !== r) {
                      eu(), (e.pingedLanes |= e.suspendedLanes & o);
                      break;
                    }
                    e.timeoutHandle = ro(bu.bind(null, e, Ds, Vs), t);
                    break;
                  }
                  bu(e, Ds, Vs);
                  break;
                case 4:
                  if ((iu(e, r), (4194240 & r) === r)) break;
                  for (t = e.eventTimes, o = -1; 0 < r; ) {
                    var i = 31 - lt(r);
                    (l = 1 << i), (i = t[i]) > o && (o = i), (r &= ~l);
                  }
                  if (
                    ((r = o),
                    10 <
                      (r =
                        (120 > (r = Je() - r)
                          ? 120
                          : 480 > r
                          ? 480
                          : 1080 > r
                          ? 1080
                          : 1920 > r
                          ? 1920
                          : 3e3 > r
                          ? 3e3
                          : 4320 > r
                          ? 4320
                          : 1960 * Ps(r / 1960)) - r))
                  ) {
                    e.timeoutHandle = ro(bu.bind(null, e, Ds, Vs), r);
                    break;
                  }
                  bu(e, Ds, Vs);
                  break;
                default:
                  throw Error(a(329));
              }
            }
          }
          return ru(e, Je()), e.callbackNode === n ? ou.bind(null, e) : null;
        }
        function au(e, t) {
          var n = Fs;
          return (
            e.current.memoizedState.isDehydrated && (fu(e, t).flags |= 256),
            2 !== (e = gu(e, t)) && ((t = Ds), (Ds = n), null !== t && lu(t)),
            e
          );
        }
        function lu(e) {
          null === Ds ? (Ds = e) : Ds.push.apply(Ds, e);
        }
        function iu(e, t) {
          for (
            t &= ~As,
              t &= ~Us,
              e.suspendedLanes |= t,
              e.pingedLanes &= ~t,
              e = e.expirationTimes;
            0 < t;

          ) {
            var n = 31 - lt(t),
              r = 1 << n;
            (e[n] = -1), (t &= ~r);
          }
        }
        function su(e) {
          if (0 !== (6 & Ms)) throw Error(a(327));
          Bu();
          var t = ft(e, 0);
          if (0 === (1 & t)) return ru(e, Je()), null;
          var n = gu(e, t);
          if (0 !== e.tag && 2 === n) {
            var r = ht(e);
            0 !== r && ((t = r), (n = au(e, r)));
          }
          if (1 === n) throw ((n = Rs), fu(e, 0), iu(e, t), ru(e, Je()), n);
          if (6 === n) throw Error(a(345));
          return (
            (e.finishedWork = e.current.alternate),
            (e.finishedLanes = t),
            bu(e, Ds, Vs),
            ru(e, Je()),
            null
          );
        }
        function uu(e, t) {
          var n = Ms;
          Ms |= 1;
          try {
            return e(t);
          } finally {
            0 === (Ms = n) && ((Hs = Je() + 500), Do && Vo());
          }
        }
        function cu(e) {
          null !== Ks && 0 === Ks.tag && 0 === (6 & Ms) && Bu();
          var t = Ms;
          Ms |= 1;
          var n = Es.transition,
            r = yt;
          try {
            if (((Es.transition = null), (yt = 1), e)) return e();
          } finally {
            (yt = r), (Es.transition = n), 0 === (6 & (Ms = t)) && Vo();
          }
        }
        function du() {
          (Ts = Is.current), xo(Is);
        }
        function fu(e, t) {
          (e.finishedWork = null), (e.finishedLanes = 0);
          var n = e.timeoutHandle;
          if ((-1 !== n && ((e.timeoutHandle = -1), oo(n)), null !== _s))
            for (n = _s.return; null !== n; ) {
              var r = n;
              switch ((na(r), r.tag)) {
                case 1:
                  null !== (r = r.type.childContextTypes) &&
                    void 0 !== r &&
                    zo();
                  break;
                case 3:
                  Ja(), xo(_o), xo(No), rl();
                  break;
                case 5:
                  Za(r);
                  break;
                case 4:
                  Ja();
                  break;
                case 13:
                case 19:
                  xo(el);
                  break;
                case 10:
                  Ma(r.type._context);
                  break;
                case 22:
                case 23:
                  du();
              }
              n = n.return;
            }
          if (
            ((Ns = e),
            (_s = e = Iu(e.current, null)),
            (Ls = Ts = t),
            (zs = 0),
            (Rs = null),
            (As = Us = Os = 0),
            (Ds = Fs = null),
            null !== Ta)
          ) {
            for (t = 0; t < Ta.length; t++)
              if (null !== (r = (n = Ta[t]).interleaved)) {
                n.interleaved = null;
                var o = r.next,
                  a = n.pending;
                if (null !== a) {
                  var l = a.next;
                  (a.next = o), (r.next = l);
                }
                n.pending = r;
              }
            Ta = null;
          }
          return e;
        }
        function pu(e, t) {
          for (;;) {
            var n = _s;
            try {
              if ((Ea(), (ol.current = Gl), cl)) {
                for (var r = il.memoizedState; null !== r; ) {
                  var o = r.queue;
                  null !== o && (o.pending = null), (r = r.next);
                }
                cl = !1;
              }
              if (
                ((ll = 0),
                (ul = sl = il = null),
                (dl = !1),
                (fl = 0),
                (xs.current = null),
                null === n || null === n.return)
              ) {
                (zs = 1), (Rs = t), (_s = null);
                break;
              }
              e: {
                var l = e,
                  i = n.return,
                  s = n,
                  u = t;
                if (
                  ((t = Ls),
                  (s.flags |= 32768),
                  null !== u &&
                    "object" === typeof u &&
                    "function" === typeof u.then)
                ) {
                  var c = u,
                    d = s,
                    f = d.tag;
                  if (0 === (1 & d.mode) && (0 === f || 11 === f || 15 === f)) {
                    var p = d.alternate;
                    p
                      ? ((d.updateQueue = p.updateQueue),
                        (d.memoizedState = p.memoizedState),
                        (d.lanes = p.lanes))
                      : ((d.updateQueue = null), (d.memoizedState = null));
                  }
                  var h = gi(i);
                  if (null !== h) {
                    (h.flags &= -257),
                      vi(h, i, s, 0, t),
                      1 & h.mode && mi(l, c, t),
                      (u = c);
                    var m = (t = h).updateQueue;
                    if (null === m) {
                      var g = new Set();
                      g.add(u), (t.updateQueue = g);
                    } else m.add(u);
                    break e;
                  }
                  if (0 === (1 & t)) {
                    mi(l, c, t), mu();
                    break e;
                  }
                  u = Error(a(426));
                } else if (aa && 1 & s.mode) {
                  var v = gi(i);
                  if (null !== v) {
                    0 === (65536 & v.flags) && (v.flags |= 256),
                      vi(v, i, s, 0, t),
                      ma(ui(u, s));
                    break e;
                  }
                }
                (l = u = ui(u, s)),
                  4 !== zs && (zs = 2),
                  null === Fs ? (Fs = [l]) : Fs.push(l),
                  (l = i);
                do {
                  switch (l.tag) {
                    case 3:
                      (l.flags |= 65536),
                        (t &= -t),
                        (l.lanes |= t),
                        Ha(l, pi(0, u, t));
                      break e;
                    case 1:
                      s = u;
                      var k = l.type,
                        y = l.stateNode;
                      if (
                        0 === (128 & l.flags) &&
                        ("function" === typeof k.getDerivedStateFromError ||
                          (null !== y &&
                            "function" === typeof y.componentDidCatch &&
                            (null === Qs || !Qs.has(y))))
                      ) {
                        (l.flags |= 65536),
                          (t &= -t),
                          (l.lanes |= t),
                          Ha(l, hi(l, s, t));
                        break e;
                      }
                  }
                  l = l.return;
                } while (null !== l);
              }
              wu(n);
            } catch (w) {
              (t = w), _s === n && null !== n && (_s = n = n.return);
              continue;
            }
            break;
          }
        }
        function hu() {
          var e = Ss.current;
          return (Ss.current = Gl), null === e ? Gl : e;
        }
        function mu() {
          (0 !== zs && 3 !== zs && 2 !== zs) || (zs = 4),
            null === Ns ||
              (0 === (268435455 & Os) && 0 === (268435455 & Us)) ||
              iu(Ns, Ls);
        }
        function gu(e, t) {
          var n = Ms;
          Ms |= 2;
          var r = hu();
          for ((Ns === e && Ls === t) || ((Vs = null), fu(e, t)); ; )
            try {
              vu();
              break;
            } catch (o) {
              pu(e, o);
            }
          if ((Ea(), (Ms = n), (Ss.current = r), null !== _s))
            throw Error(a(261));
          return (Ns = null), (Ls = 0), zs;
        }
        function vu() {
          for (; null !== _s; ) yu(_s);
        }
        function ku() {
          for (; null !== _s && !qe(); ) yu(_s);
        }
        function yu(e) {
          var t = Cs(e.alternate, e, Ts);
          (e.memoizedProps = e.pendingProps),
            null === t ? wu(e) : (_s = t),
            (xs.current = null);
        }
        function wu(e) {
          var t = e;
          do {
            var n = t.alternate;
            if (((e = t.return), 0 === (32768 & t.flags))) {
              if (null !== (n = Xi(n, t, Ts))) return void (_s = n);
            } else {
              if (null !== (n = Ki(n, t)))
                return (n.flags &= 32767), void (_s = n);
              if (null === e) return (zs = 6), void (_s = null);
              (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            }
            if (null !== (t = t.sibling)) return void (_s = t);
            _s = t = e;
          } while (null !== t);
          0 === zs && (zs = 5);
        }
        function bu(e, t, n) {
          var r = yt,
            o = Es.transition;
          try {
            (Es.transition = null),
              (yt = 1),
              (function (e, t, n, r) {
                do {
                  Bu();
                } while (null !== Ks);
                if (0 !== (6 & Ms)) throw Error(a(327));
                n = e.finishedWork;
                var o = e.finishedLanes;
                if (null === n) return null;
                if (
                  ((e.finishedWork = null),
                  (e.finishedLanes = 0),
                  n === e.current)
                )
                  throw Error(a(177));
                (e.callbackNode = null), (e.callbackPriority = 0);
                var l = n.lanes | n.childLanes;
                if (
                  ((function (e, t) {
                    var n = e.pendingLanes & ~t;
                    (e.pendingLanes = t),
                      (e.suspendedLanes = 0),
                      (e.pingedLanes = 0),
                      (e.expiredLanes &= t),
                      (e.mutableReadLanes &= t),
                      (e.entangledLanes &= t),
                      (t = e.entanglements);
                    var r = e.eventTimes;
                    for (e = e.expirationTimes; 0 < n; ) {
                      var o = 31 - lt(n),
                        a = 1 << o;
                      (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~a);
                    }
                  })(e, l),
                  e === Ns && ((_s = Ns = null), (Ls = 0)),
                  (0 === (2064 & n.subtreeFlags) && 0 === (2064 & n.flags)) ||
                    Xs ||
                    ((Xs = !0),
                    Nu(tt, function () {
                      return Bu(), null;
                    })),
                  (l = 0 !== (15990 & n.flags)),
                  0 !== (15990 & n.subtreeFlags) || l)
                ) {
                  (l = Es.transition), (Es.transition = null);
                  var i = yt;
                  yt = 1;
                  var s = Ms;
                  (Ms |= 4),
                    (xs.current = null),
                    (function (e, t) {
                      if (((eo = $t), pr((e = fr())))) {
                        if ("selectionStart" in e)
                          var n = {
                            start: e.selectionStart,
                            end: e.selectionEnd,
                          };
                        else
                          e: {
                            var r =
                              (n =
                                ((n = e.ownerDocument) && n.defaultView) ||
                                window).getSelection && n.getSelection();
                            if (r && 0 !== r.rangeCount) {
                              n = r.anchorNode;
                              var o = r.anchorOffset,
                                l = r.focusNode;
                              r = r.focusOffset;
                              try {
                                n.nodeType, l.nodeType;
                              } catch (b) {
                                n = null;
                                break e;
                              }
                              var i = 0,
                                s = -1,
                                u = -1,
                                c = 0,
                                d = 0,
                                f = e,
                                p = null;
                              t: for (;;) {
                                for (
                                  var h;
                                  f !== n ||
                                    (0 !== o && 3 !== f.nodeType) ||
                                    (s = i + o),
                                    f !== l ||
                                      (0 !== r && 3 !== f.nodeType) ||
                                      (u = i + r),
                                    3 === f.nodeType &&
                                      (i += f.nodeValue.length),
                                    null !== (h = f.firstChild);

                                )
                                  (p = f), (f = h);
                                for (;;) {
                                  if (f === e) break t;
                                  if (
                                    (p === n && ++c === o && (s = i),
                                    p === l && ++d === r && (u = i),
                                    null !== (h = f.nextSibling))
                                  )
                                    break;
                                  p = (f = p).parentNode;
                                }
                                f = h;
                              }
                              n =
                                -1 === s || -1 === u
                                  ? null
                                  : { start: s, end: u };
                            } else n = null;
                          }
                        n = n || { start: 0, end: 0 };
                      } else n = null;
                      for (
                        to = { focusedElem: e, selectionRange: n },
                          $t = !1,
                          Gi = t;
                        null !== Gi;

                      )
                        if (
                          ((e = (t = Gi).child),
                          0 !== (1028 & t.subtreeFlags) && null !== e)
                        )
                          (e.return = t), (Gi = e);
                        else
                          for (; null !== Gi; ) {
                            t = Gi;
                            try {
                              var m = t.alternate;
                              if (0 !== (1024 & t.flags))
                                switch (t.tag) {
                                  case 0:
                                  case 11:
                                  case 15:
                                  case 5:
                                  case 6:
                                  case 4:
                                  case 17:
                                    break;
                                  case 1:
                                    if (null !== m) {
                                      var g = m.memoizedProps,
                                        v = m.memoizedState,
                                        k = t.stateNode,
                                        y = k.getSnapshotBeforeUpdate(
                                          t.elementType === t.type
                                            ? g
                                            : ni(t.type, g),
                                          v
                                        );
                                      k.__reactInternalSnapshotBeforeUpdate = y;
                                    }
                                    break;
                                  case 3:
                                    var w = t.stateNode.containerInfo;
                                    1 === w.nodeType
                                      ? (w.textContent = "")
                                      : 9 === w.nodeType &&
                                        w.documentElement &&
                                        w.removeChild(w.documentElement);
                                    break;
                                  default:
                                    throw Error(a(163));
                                }
                            } catch (b) {
                              Pu(t, t.return, b);
                            }
                            if (null !== (e = t.sibling)) {
                              (e.return = t.return), (Gi = e);
                              break;
                            }
                            Gi = t.return;
                          }
                      (m = ts), (ts = !1);
                    })(e, n),
                    gs(n, e),
                    hr(to),
                    ($t = !!eo),
                    (to = eo = null),
                    (e.current = n),
                    ks(n, e, o),
                    Ye(),
                    (Ms = s),
                    (yt = i),
                    (Es.transition = l);
                } else e.current = n;
                if (
                  (Xs && ((Xs = !1), (Ks = e), (qs = o)),
                  (l = e.pendingLanes),
                  0 === l && (Qs = null),
                  (function (e) {
                    if (at && "function" === typeof at.onCommitFiberRoot)
                      try {
                        at.onCommitFiberRoot(
                          ot,
                          e,
                          void 0,
                          128 === (128 & e.current.flags)
                        );
                      } catch (t) {}
                  })(n.stateNode),
                  ru(e, Je()),
                  null !== t)
                )
                  for (r = e.onRecoverableError, n = 0; n < t.length; n++)
                    (o = t[n]),
                      r(o.value, { componentStack: o.stack, digest: o.digest });
                if ($s) throw (($s = !1), (e = Ws), (Ws = null), e);
                0 !== (1 & qs) && 0 !== e.tag && Bu(),
                  (l = e.pendingLanes),
                  0 !== (1 & l)
                    ? e === Js
                      ? Ys++
                      : ((Ys = 0), (Js = e))
                    : (Ys = 0),
                  Vo();
              })(e, t, n, r);
          } finally {
            (Es.transition = o), (yt = r);
          }
          return null;
        }
        function Bu() {
          if (null !== Ks) {
            var e = wt(qs),
              t = Es.transition,
              n = yt;
            try {
              if (((Es.transition = null), (yt = 16 > e ? 16 : e), null === Ks))
                var r = !1;
              else {
                if (((e = Ks), (Ks = null), (qs = 0), 0 !== (6 & Ms)))
                  throw Error(a(331));
                var o = Ms;
                for (Ms |= 4, Gi = e.current; null !== Gi; ) {
                  var l = Gi,
                    i = l.child;
                  if (0 !== (16 & Gi.flags)) {
                    var s = l.deletions;
                    if (null !== s) {
                      for (var u = 0; u < s.length; u++) {
                        var c = s[u];
                        for (Gi = c; null !== Gi; ) {
                          var d = Gi;
                          switch (d.tag) {
                            case 0:
                            case 11:
                            case 15:
                              ns(8, d, l);
                          }
                          var f = d.child;
                          if (null !== f) (f.return = d), (Gi = f);
                          else
                            for (; null !== Gi; ) {
                              var p = (d = Gi).sibling,
                                h = d.return;
                              if ((as(d), d === c)) {
                                Gi = null;
                                break;
                              }
                              if (null !== p) {
                                (p.return = h), (Gi = p);
                                break;
                              }
                              Gi = h;
                            }
                        }
                      }
                      var m = l.alternate;
                      if (null !== m) {
                        var g = m.child;
                        if (null !== g) {
                          m.child = null;
                          do {
                            var v = g.sibling;
                            (g.sibling = null), (g = v);
                          } while (null !== g);
                        }
                      }
                      Gi = l;
                    }
                  }
                  if (0 !== (2064 & l.subtreeFlags) && null !== i)
                    (i.return = l), (Gi = i);
                  else
                    e: for (; null !== Gi; ) {
                      if (0 !== (2048 & (l = Gi).flags))
                        switch (l.tag) {
                          case 0:
                          case 11:
                          case 15:
                            ns(9, l, l.return);
                        }
                      var k = l.sibling;
                      if (null !== k) {
                        (k.return = l.return), (Gi = k);
                        break e;
                      }
                      Gi = l.return;
                    }
                }
                var y = e.current;
                for (Gi = y; null !== Gi; ) {
                  var w = (i = Gi).child;
                  if (0 !== (2064 & i.subtreeFlags) && null !== w)
                    (w.return = i), (Gi = w);
                  else
                    e: for (i = y; null !== Gi; ) {
                      if (0 !== (2048 & (s = Gi).flags))
                        try {
                          switch (s.tag) {
                            case 0:
                            case 11:
                            case 15:
                              rs(9, s);
                          }
                        } catch (B) {
                          Pu(s, s.return, B);
                        }
                      if (s === i) {
                        Gi = null;
                        break e;
                      }
                      var b = s.sibling;
                      if (null !== b) {
                        (b.return = s.return), (Gi = b);
                        break e;
                      }
                      Gi = s.return;
                    }
                }
                if (
                  ((Ms = o),
                  Vo(),
                  at && "function" === typeof at.onPostCommitFiberRoot)
                )
                  try {
                    at.onPostCommitFiberRoot(ot, e);
                  } catch (B) {}
                r = !0;
              }
              return r;
            } finally {
              (yt = n), (Es.transition = t);
            }
          }
          return !1;
        }
        function Cu(e, t, n) {
          (e = Da(e, (t = pi(0, (t = ui(n, t)), 1)), 1)),
            (t = eu()),
            null !== e && (vt(e, 1, t), ru(e, t));
        }
        function Pu(e, t, n) {
          if (3 === e.tag) Cu(e, e, n);
          else
            for (; null !== t; ) {
              if (3 === t.tag) {
                Cu(t, e, n);
                break;
              }
              if (1 === t.tag) {
                var r = t.stateNode;
                if (
                  "function" === typeof t.type.getDerivedStateFromError ||
                  ("function" === typeof r.componentDidCatch &&
                    (null === Qs || !Qs.has(r)))
                ) {
                  (t = Da(t, (e = hi(t, (e = ui(n, e)), 1)), 1)),
                    (e = eu()),
                    null !== t && (vt(t, 1, e), ru(t, e));
                  break;
                }
              }
              t = t.return;
            }
        }
        function Su(e, t, n) {
          var r = e.pingCache;
          null !== r && r.delete(t),
            (t = eu()),
            (e.pingedLanes |= e.suspendedLanes & n),
            Ns === e &&
              (Ls & n) === n &&
              (4 === zs ||
              (3 === zs && (130023424 & Ls) === Ls && 500 > Je() - js)
                ? fu(e, 0)
                : (As |= n)),
            ru(e, t);
        }
        function xu(e, t) {
          0 === t &&
            (0 === (1 & e.mode)
              ? (t = 1)
              : ((t = ct), 0 === (130023424 & (ct <<= 1)) && (ct = 4194304)));
          var n = eu();
          null !== (e = Ra(e, t)) && (vt(e, t, n), ru(e, n));
        }
        function Eu(e) {
          var t = e.memoizedState,
            n = 0;
          null !== t && (n = t.retryLane), xu(e, n);
        }
        function Mu(e, t) {
          var n = 0;
          switch (e.tag) {
            case 13:
              var r = e.stateNode,
                o = e.memoizedState;
              null !== o && (n = o.retryLane);
              break;
            case 19:
              r = e.stateNode;
              break;
            default:
              throw Error(a(314));
          }
          null !== r && r.delete(t), xu(e, n);
        }
        function Nu(e, t) {
          return Xe(e, t);
        }
        function _u(e, t, n, r) {
          (this.tag = e),
            (this.key = n),
            (this.sibling =
              this.child =
              this.return =
              this.stateNode =
              this.type =
              this.elementType =
                null),
            (this.index = 0),
            (this.ref = null),
            (this.pendingProps = t),
            (this.dependencies =
              this.memoizedState =
              this.updateQueue =
              this.memoizedProps =
                null),
            (this.mode = r),
            (this.subtreeFlags = this.flags = 0),
            (this.deletions = null),
            (this.childLanes = this.lanes = 0),
            (this.alternate = null);
        }
        function Lu(e, t, n, r) {
          return new _u(e, t, n, r);
        }
        function Tu(e) {
          return !(!(e = e.prototype) || !e.isReactComponent);
        }
        function Iu(e, t) {
          var n = e.alternate;
          return (
            null === n
              ? (((n = Lu(e.tag, t, e.key, e.mode)).elementType =
                  e.elementType),
                (n.type = e.type),
                (n.stateNode = e.stateNode),
                (n.alternate = e),
                (e.alternate = n))
              : ((n.pendingProps = t),
                (n.type = e.type),
                (n.flags = 0),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
            (n.flags = 14680064 & e.flags),
            (n.childLanes = e.childLanes),
            (n.lanes = e.lanes),
            (n.child = e.child),
            (n.memoizedProps = e.memoizedProps),
            (n.memoizedState = e.memoizedState),
            (n.updateQueue = e.updateQueue),
            (t = e.dependencies),
            (n.dependencies =
              null === t
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
            (n.sibling = e.sibling),
            (n.index = e.index),
            (n.ref = e.ref),
            n
          );
        }
        function zu(e, t, n, r, o, l) {
          var i = 2;
          if (((r = e), "function" === typeof e)) Tu(e) && (i = 1);
          else if ("string" === typeof e) i = 5;
          else
            e: switch (e) {
              case C:
                return Ru(n.children, o, l, t);
              case P:
                (i = 8), (o |= 8);
                break;
              case S:
                return (
                  ((e = Lu(12, n, t, 2 | o)).elementType = S), (e.lanes = l), e
                );
              case N:
                return (
                  ((e = Lu(13, n, t, o)).elementType = N), (e.lanes = l), e
                );
              case _:
                return (
                  ((e = Lu(19, n, t, o)).elementType = _), (e.lanes = l), e
                );
              case I:
                return Ou(n, o, l, t);
              default:
                if ("object" === typeof e && null !== e)
                  switch (e.$$typeof) {
                    case x:
                      i = 10;
                      break e;
                    case E:
                      i = 9;
                      break e;
                    case M:
                      i = 11;
                      break e;
                    case L:
                      i = 14;
                      break e;
                    case T:
                      (i = 16), (r = null);
                      break e;
                  }
                throw Error(a(130, null == e ? e : typeof e, ""));
            }
          return (
            ((t = Lu(i, n, t, o)).elementType = e),
            (t.type = r),
            (t.lanes = l),
            t
          );
        }
        function Ru(e, t, n, r) {
          return ((e = Lu(7, e, r, t)).lanes = n), e;
        }
        function Ou(e, t, n, r) {
          return (
            ((e = Lu(22, e, r, t)).elementType = I),
            (e.lanes = n),
            (e.stateNode = { isHidden: !1 }),
            e
          );
        }
        function Uu(e, t, n) {
          return ((e = Lu(6, e, null, t)).lanes = n), e;
        }
        function Au(e, t, n) {
          return (
            ((t = Lu(
              4,
              null !== e.children ? e.children : [],
              e.key,
              t
            )).lanes = n),
            (t.stateNode = {
              containerInfo: e.containerInfo,
              pendingChildren: null,
              implementation: e.implementation,
            }),
            t
          );
        }
        function Fu(e, t, n, r, o) {
          (this.tag = t),
            (this.containerInfo = e),
            (this.finishedWork =
              this.pingCache =
              this.current =
              this.pendingChildren =
                null),
            (this.timeoutHandle = -1),
            (this.callbackNode = this.pendingContext = this.context = null),
            (this.callbackPriority = 0),
            (this.eventTimes = gt(0)),
            (this.expirationTimes = gt(-1)),
            (this.entangledLanes =
              this.finishedLanes =
              this.mutableReadLanes =
              this.expiredLanes =
              this.pingedLanes =
              this.suspendedLanes =
              this.pendingLanes =
                0),
            (this.entanglements = gt(0)),
            (this.identifierPrefix = r),
            (this.onRecoverableError = o),
            (this.mutableSourceEagerHydrationData = null);
        }
        function Du(e, t, n, r, o, a, l, i, s) {
          return (
            (e = new Fu(e, t, n, i, s)),
            1 === t ? ((t = 1), !0 === a && (t |= 8)) : (t = 0),
            (a = Lu(3, null, null, t)),
            (e.current = a),
            (a.stateNode = e),
            (a.memoizedState = {
              element: r,
              isDehydrated: n,
              cache: null,
              transitions: null,
              pendingSuspenseBoundaries: null,
            }),
            Ua(a),
            e
          );
        }
        function ju(e) {
          if (!e) return Mo;
          e: {
            if (He((e = e._reactInternals)) !== e || 1 !== e.tag)
              throw Error(a(170));
            var t = e;
            do {
              switch (t.tag) {
                case 3:
                  t = t.stateNode.context;
                  break e;
                case 1:
                  if (Io(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e;
                  }
              }
              t = t.return;
            } while (null !== t);
            throw Error(a(171));
          }
          if (1 === e.tag) {
            var n = e.type;
            if (Io(n)) return Oo(e, n, t);
          }
          return t;
        }
        function Hu(e, t, n, r, o, a, l, i, s) {
          return (
            ((e = Du(n, r, !0, e, 0, a, 0, i, s)).context = ju(null)),
            (n = e.current),
            ((a = Fa((r = eu()), (o = tu(n)))).callback =
              void 0 !== t && null !== t ? t : null),
            Da(n, a, o),
            (e.current.lanes = o),
            vt(e, o, r),
            ru(e, r),
            e
          );
        }
        function Vu(e, t, n, r) {
          var o = t.current,
            a = eu(),
            l = tu(o);
          return (
            (n = ju(n)),
            null === t.context ? (t.context = n) : (t.pendingContext = n),
            ((t = Fa(a, l)).payload = { element: e }),
            null !== (r = void 0 === r ? null : r) && (t.callback = r),
            null !== (e = Da(o, t, l)) && (nu(e, o, l, a), ja(e, o, l)),
            l
          );
        }
        function $u(e) {
          return (e = e.current).child
            ? (e.child.tag, e.child.stateNode)
            : null;
        }
        function Wu(e, t) {
          if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
            var n = e.retryLane;
            e.retryLane = 0 !== n && n < t ? n : t;
          }
        }
        function Qu(e, t) {
          Wu(e, t), (e = e.alternate) && Wu(e, t);
        }
        Cs = function (e, t, n) {
          if (null !== e)
            if (e.memoizedProps !== t.pendingProps || _o.current) yi = !0;
            else {
              if (0 === (e.lanes & n) && 0 === (128 & t.flags))
                return (
                  (yi = !1),
                  (function (e, t, n) {
                    switch (t.tag) {
                      case 3:
                        Ni(t), ha();
                        break;
                      case 5:
                        Ga(t);
                        break;
                      case 1:
                        Io(t.type) && Uo(t);
                        break;
                      case 4:
                        Ya(t, t.stateNode.containerInfo);
                        break;
                      case 10:
                        var r = t.type._context,
                          o = t.memoizedProps.value;
                        Eo(Ca, r._currentValue), (r._currentValue = o);
                        break;
                      case 13:
                        if (null !== (r = t.memoizedState))
                          return null !== r.dehydrated
                            ? (Eo(el, 1 & el.current), (t.flags |= 128), null)
                            : 0 !== (n & t.child.childLanes)
                            ? Ui(e, t, n)
                            : (Eo(el, 1 & el.current),
                              null !== (e = $i(e, t, n)) ? e.sibling : null);
                        Eo(el, 1 & el.current);
                        break;
                      case 19:
                        if (
                          ((r = 0 !== (n & t.childLanes)),
                          0 !== (128 & e.flags))
                        ) {
                          if (r) return Hi(e, t, n);
                          t.flags |= 128;
                        }
                        if (
                          (null !== (o = t.memoizedState) &&
                            ((o.rendering = null),
                            (o.tail = null),
                            (o.lastEffect = null)),
                          Eo(el, el.current),
                          r)
                        )
                          break;
                        return null;
                      case 22:
                      case 23:
                        return (t.lanes = 0), Pi(e, t, n);
                    }
                    return $i(e, t, n);
                  })(e, t, n)
                );
              yi = 0 !== (131072 & e.flags);
            }
          else (yi = !1), aa && 0 !== (1048576 & t.flags) && ea(t, Xo, t.index);
          switch (((t.lanes = 0), t.tag)) {
            case 2:
              var r = t.type;
              Vi(e, t), (e = t.pendingProps);
              var o = To(t, No.current);
              _a(t, n), (o = gl(null, t, r, e, o, n));
              var l = vl();
              return (
                (t.flags |= 1),
                "object" === typeof o &&
                null !== o &&
                "function" === typeof o.render &&
                void 0 === o.$$typeof
                  ? ((t.tag = 1),
                    (t.memoizedState = null),
                    (t.updateQueue = null),
                    Io(r) ? ((l = !0), Uo(t)) : (l = !1),
                    (t.memoizedState =
                      null !== o.state && void 0 !== o.state ? o.state : null),
                    Ua(t),
                    (o.updater = oi),
                    (t.stateNode = o),
                    (o._reactInternals = t),
                    si(t, r, e, n),
                    (t = Mi(null, t, r, !0, l, n)))
                  : ((t.tag = 0),
                    aa && l && ta(t),
                    wi(null, t, o, n),
                    (t = t.child)),
                t
              );
            case 16:
              r = t.elementType;
              e: {
                switch (
                  (Vi(e, t),
                  (e = t.pendingProps),
                  (r = (o = r._init)(r._payload)),
                  (t.type = r),
                  (o = t.tag =
                    (function (e) {
                      if ("function" === typeof e) return Tu(e) ? 1 : 0;
                      if (void 0 !== e && null !== e) {
                        if ((e = e.$$typeof) === M) return 11;
                        if (e === L) return 14;
                      }
                      return 2;
                    })(r)),
                  (e = ni(r, e)),
                  o)
                ) {
                  case 0:
                    t = xi(null, t, r, e, n);
                    break e;
                  case 1:
                    t = Ei(null, t, r, e, n);
                    break e;
                  case 11:
                    t = bi(null, t, r, e, n);
                    break e;
                  case 14:
                    t = Bi(null, t, r, ni(r.type, e), n);
                    break e;
                }
                throw Error(a(306, r, ""));
              }
              return t;
            case 0:
              return (
                (r = t.type),
                (o = t.pendingProps),
                xi(e, t, r, (o = t.elementType === r ? o : ni(r, o)), n)
              );
            case 1:
              return (
                (r = t.type),
                (o = t.pendingProps),
                Ei(e, t, r, (o = t.elementType === r ? o : ni(r, o)), n)
              );
            case 3:
              e: {
                if ((Ni(t), null === e)) throw Error(a(387));
                (r = t.pendingProps),
                  (o = (l = t.memoizedState).element),
                  Aa(e, t),
                  Va(t, r, null, n);
                var i = t.memoizedState;
                if (((r = i.element), l.isDehydrated)) {
                  if (
                    ((l = {
                      element: r,
                      isDehydrated: !1,
                      cache: i.cache,
                      pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                      transitions: i.transitions,
                    }),
                    (t.updateQueue.baseState = l),
                    (t.memoizedState = l),
                    256 & t.flags)
                  ) {
                    t = _i(e, t, r, n, (o = ui(Error(a(423)), t)));
                    break e;
                  }
                  if (r !== o) {
                    t = _i(e, t, r, n, (o = ui(Error(a(424)), t)));
                    break e;
                  }
                  for (
                    oa = uo(t.stateNode.containerInfo.firstChild),
                      ra = t,
                      aa = !0,
                      la = null,
                      n = Ba(t, null, r, n),
                      t.child = n;
                    n;

                  )
                    (n.flags = (-3 & n.flags) | 4096), (n = n.sibling);
                } else {
                  if ((ha(), r === o)) {
                    t = $i(e, t, n);
                    break e;
                  }
                  wi(e, t, r, n);
                }
                t = t.child;
              }
              return t;
            case 5:
              return (
                Ga(t),
                null === e && ca(t),
                (r = t.type),
                (o = t.pendingProps),
                (l = null !== e ? e.memoizedProps : null),
                (i = o.children),
                no(r, o)
                  ? (i = null)
                  : null !== l && no(r, l) && (t.flags |= 32),
                Si(e, t),
                wi(e, t, i, n),
                t.child
              );
            case 6:
              return null === e && ca(t), null;
            case 13:
              return Ui(e, t, n);
            case 4:
              return (
                Ya(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                null === e ? (t.child = ba(t, null, r, n)) : wi(e, t, r, n),
                t.child
              );
            case 11:
              return (
                (r = t.type),
                (o = t.pendingProps),
                bi(e, t, r, (o = t.elementType === r ? o : ni(r, o)), n)
              );
            case 7:
              return wi(e, t, t.pendingProps, n), t.child;
            case 8:
            case 12:
              return wi(e, t, t.pendingProps.children, n), t.child;
            case 10:
              e: {
                if (
                  ((r = t.type._context),
                  (o = t.pendingProps),
                  (l = t.memoizedProps),
                  (i = o.value),
                  Eo(Ca, r._currentValue),
                  (r._currentValue = i),
                  null !== l)
                )
                  if (ir(l.value, i)) {
                    if (l.children === o.children && !_o.current) {
                      t = $i(e, t, n);
                      break e;
                    }
                  } else
                    for (
                      null !== (l = t.child) && (l.return = t);
                      null !== l;

                    ) {
                      var s = l.dependencies;
                      if (null !== s) {
                        i = l.child;
                        for (var u = s.firstContext; null !== u; ) {
                          if (u.context === r) {
                            if (1 === l.tag) {
                              (u = Fa(-1, n & -n)).tag = 2;
                              var c = l.updateQueue;
                              if (null !== c) {
                                var d = (c = c.shared).pending;
                                null === d
                                  ? (u.next = u)
                                  : ((u.next = d.next), (d.next = u)),
                                  (c.pending = u);
                              }
                            }
                            (l.lanes |= n),
                              null !== (u = l.alternate) && (u.lanes |= n),
                              Na(l.return, n, t),
                              (s.lanes |= n);
                            break;
                          }
                          u = u.next;
                        }
                      } else if (10 === l.tag)
                        i = l.type === t.type ? null : l.child;
                      else if (18 === l.tag) {
                        if (null === (i = l.return)) throw Error(a(341));
                        (i.lanes |= n),
                          null !== (s = i.alternate) && (s.lanes |= n),
                          Na(i, n, t),
                          (i = l.sibling);
                      } else i = l.child;
                      if (null !== i) i.return = l;
                      else
                        for (i = l; null !== i; ) {
                          if (i === t) {
                            i = null;
                            break;
                          }
                          if (null !== (l = i.sibling)) {
                            (l.return = i.return), (i = l);
                            break;
                          }
                          i = i.return;
                        }
                      l = i;
                    }
                wi(e, t, o.children, n), (t = t.child);
              }
              return t;
            case 9:
              return (
                (o = t.type),
                (r = t.pendingProps.children),
                _a(t, n),
                (r = r((o = La(o)))),
                (t.flags |= 1),
                wi(e, t, r, n),
                t.child
              );
            case 14:
              return (
                (o = ni((r = t.type), t.pendingProps)),
                Bi(e, t, r, (o = ni(r.type, o)), n)
              );
            case 15:
              return Ci(e, t, t.type, t.pendingProps, n);
            case 17:
              return (
                (r = t.type),
                (o = t.pendingProps),
                (o = t.elementType === r ? o : ni(r, o)),
                Vi(e, t),
                (t.tag = 1),
                Io(r) ? ((e = !0), Uo(t)) : (e = !1),
                _a(t, n),
                li(t, r, o),
                si(t, r, o, n),
                Mi(null, t, r, !0, e, n)
              );
            case 19:
              return Hi(e, t, n);
            case 22:
              return Pi(e, t, n);
          }
          throw Error(a(156, t.tag));
        };
        var Xu =
          "function" === typeof reportError
            ? reportError
            : function (e) {
                console.error(e);
              };
        function Ku(e) {
          this._internalRoot = e;
        }
        function qu(e) {
          this._internalRoot = e;
        }
        function Yu(e) {
          return !(
            !e ||
            (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
          );
        }
        function Ju(e) {
          return !(
            !e ||
            (1 !== e.nodeType &&
              9 !== e.nodeType &&
              11 !== e.nodeType &&
              (8 !== e.nodeType ||
                " react-mount-point-unstable " !== e.nodeValue))
          );
        }
        function Gu() {}
        function Zu(e, t, n, r, o) {
          var a = n._reactRootContainer;
          if (a) {
            var l = a;
            if ("function" === typeof o) {
              var i = o;
              o = function () {
                var e = $u(l);
                i.call(e);
              };
            }
            Vu(t, l, e, o);
          } else
            l = (function (e, t, n, r, o) {
              if (o) {
                if ("function" === typeof r) {
                  var a = r;
                  r = function () {
                    var e = $u(l);
                    a.call(e);
                  };
                }
                var l = Hu(t, r, e, 0, null, !1, 0, "", Gu);
                return (
                  (e._reactRootContainer = l),
                  (e[mo] = l.current),
                  Hr(8 === e.nodeType ? e.parentNode : e),
                  cu(),
                  l
                );
              }
              for (; (o = e.lastChild); ) e.removeChild(o);
              if ("function" === typeof r) {
                var i = r;
                r = function () {
                  var e = $u(s);
                  i.call(e);
                };
              }
              var s = Du(e, 0, !1, null, 0, !1, 0, "", Gu);
              return (
                (e._reactRootContainer = s),
                (e[mo] = s.current),
                Hr(8 === e.nodeType ? e.parentNode : e),
                cu(function () {
                  Vu(t, s, n, r);
                }),
                s
              );
            })(n, t, e, o, r);
          return $u(l);
        }
        (qu.prototype.render = Ku.prototype.render =
          function (e) {
            var t = this._internalRoot;
            if (null === t) throw Error(a(409));
            Vu(e, t, null, null);
          }),
          (qu.prototype.unmount = Ku.prototype.unmount =
            function () {
              var e = this._internalRoot;
              if (null !== e) {
                this._internalRoot = null;
                var t = e.containerInfo;
                cu(function () {
                  Vu(null, e, null, null);
                }),
                  (t[mo] = null);
              }
            }),
          (qu.prototype.unstable_scheduleHydration = function (e) {
            if (e) {
              var t = Pt();
              e = { blockedOn: null, target: e, priority: t };
              for (
                var n = 0;
                n < It.length && 0 !== t && t < It[n].priority;
                n++
              );
              It.splice(n, 0, e), 0 === n && Ut(e);
            }
          }),
          (bt = function (e) {
            switch (e.tag) {
              case 3:
                var t = e.stateNode;
                if (t.current.memoizedState.isDehydrated) {
                  var n = dt(t.pendingLanes);
                  0 !== n &&
                    (kt(t, 1 | n),
                    ru(t, Je()),
                    0 === (6 & Ms) && ((Hs = Je() + 500), Vo()));
                }
                break;
              case 13:
                cu(function () {
                  var t = Ra(e, 1);
                  if (null !== t) {
                    var n = eu();
                    nu(t, e, 1, n);
                  }
                }),
                  Qu(e, 1);
            }
          }),
          (Bt = function (e) {
            if (13 === e.tag) {
              var t = Ra(e, 134217728);
              if (null !== t) nu(t, e, 134217728, eu());
              Qu(e, 134217728);
            }
          }),
          (Ct = function (e) {
            if (13 === e.tag) {
              var t = tu(e),
                n = Ra(e, t);
              if (null !== n) nu(n, e, t, eu());
              Qu(e, t);
            }
          }),
          (Pt = function () {
            return yt;
          }),
          (St = function (e, t) {
            var n = yt;
            try {
              return (yt = e), t();
            } finally {
              yt = n;
            }
          }),
          (Be = function (e, t, n) {
            switch (t) {
              case "input":
                if ((G(e, n), (t = n.name), "radio" === n.type && null != t)) {
                  for (n = e; n.parentNode; ) n = n.parentNode;
                  for (
                    n = n.querySelectorAll(
                      "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
                    ),
                      t = 0;
                    t < n.length;
                    t++
                  ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                      var o = Bo(r);
                      if (!o) throw Error(a(90));
                      X(r), G(r, o);
                    }
                  }
                }
                break;
              case "textarea":
                ae(e, n);
                break;
              case "select":
                null != (t = n.value) && ne(e, !!n.multiple, t, !1);
            }
          }),
          (Me = uu),
          (Ne = cu);
        var ec = {
            usingClientEntryPoint: !1,
            Events: [wo, bo, Bo, xe, Ee, uu],
          },
          tc = {
            findFiberByHostInstance: yo,
            bundleType: 0,
            version: "18.3.1",
            rendererPackageName: "react-dom",
          },
          nc = {
            bundleType: tc.bundleType,
            version: tc.version,
            rendererPackageName: tc.rendererPackageName,
            rendererConfig: tc.rendererConfig,
            overrideHookState: null,
            overrideHookStateDeletePath: null,
            overrideHookStateRenamePath: null,
            overrideProps: null,
            overridePropsDeletePath: null,
            overridePropsRenamePath: null,
            setErrorHandler: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: w.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (e) {
              return null === (e = We(e)) ? null : e.stateNode;
            },
            findFiberByHostInstance:
              tc.findFiberByHostInstance ||
              function () {
                return null;
              },
            findHostInstancesForRefresh: null,
            scheduleRefresh: null,
            scheduleRoot: null,
            setRefreshHandler: null,
            getCurrentFiber: null,
            reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
          };
        if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
          var rc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (!rc.isDisabled && rc.supportsFiber)
            try {
              (ot = rc.inject(nc)), (at = rc);
            } catch (ce) {}
        }
        (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ec),
          (t.createPortal = function (e, t) {
            var n =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            if (!Yu(t)) throw Error(a(200));
            return (function (e, t, n) {
              var r =
                3 < arguments.length && void 0 !== arguments[3]
                  ? arguments[3]
                  : null;
              return {
                $$typeof: B,
                key: null == r ? null : "" + r,
                children: e,
                containerInfo: t,
                implementation: n,
              };
            })(e, t, null, n);
          }),
          (t.createRoot = function (e, t) {
            if (!Yu(e)) throw Error(a(299));
            var n = !1,
              r = "",
              o = Xu;
            return (
              null !== t &&
                void 0 !== t &&
                (!0 === t.unstable_strictMode && (n = !0),
                void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
                void 0 !== t.onRecoverableError && (o = t.onRecoverableError)),
              (t = Du(e, 1, !1, null, 0, n, 0, r, o)),
              (e[mo] = t.current),
              Hr(8 === e.nodeType ? e.parentNode : e),
              new Ku(t)
            );
          }),
          (t.findDOMNode = function (e) {
            if (null == e) return null;
            if (1 === e.nodeType) return e;
            var t = e._reactInternals;
            if (void 0 === t) {
              if ("function" === typeof e.render) throw Error(a(188));
              throw ((e = Object.keys(e).join(",")), Error(a(268, e)));
            }
            return (e = null === (e = We(t)) ? null : e.stateNode);
          }),
          (t.flushSync = function (e) {
            return cu(e);
          }),
          (t.hydrate = function (e, t, n) {
            if (!Ju(t)) throw Error(a(200));
            return Zu(null, e, t, !0, n);
          }),
          (t.hydrateRoot = function (e, t, n) {
            if (!Yu(e)) throw Error(a(405));
            var r = (null != n && n.hydratedSources) || null,
              o = !1,
              l = "",
              i = Xu;
            if (
              (null !== n &&
                void 0 !== n &&
                (!0 === n.unstable_strictMode && (o = !0),
                void 0 !== n.identifierPrefix && (l = n.identifierPrefix),
                void 0 !== n.onRecoverableError && (i = n.onRecoverableError)),
              (t = Hu(t, null, e, 1, null != n ? n : null, o, 0, l, i)),
              (e[mo] = t.current),
              Hr(e),
              r)
            )
              for (e = 0; e < r.length; e++)
                (o = (o = (n = r[e])._getVersion)(n._source)),
                  null == t.mutableSourceEagerHydrationData
                    ? (t.mutableSourceEagerHydrationData = [n, o])
                    : t.mutableSourceEagerHydrationData.push(n, o);
            return new qu(t);
          }),
          (t.render = function (e, t, n) {
            if (!Ju(t)) throw Error(a(200));
            return Zu(null, e, t, !1, n);
          }),
          (t.unmountComponentAtNode = function (e) {
            if (!Ju(e)) throw Error(a(40));
            return (
              !!e._reactRootContainer &&
              (cu(function () {
                Zu(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[mo] = null);
                });
              }),
              !0)
            );
          }),
          (t.unstable_batchedUpdates = uu),
          (t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
            if (!Ju(n)) throw Error(a(200));
            if (null == e || void 0 === e._reactInternals) throw Error(a(38));
            return Zu(e, t, n, !1, r);
          }),
          (t.version = "18.3.1-next-f1338f8080-20240426");
      },
      391: (e, t, n) => {
        "use strict";
        var r = n(950);
        (t.createRoot = r.createRoot), (t.hydrateRoot = r.hydrateRoot);
      },
      950: (e, t, n) => {
        "use strict";
        !(function e() {
          if (
            "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
            } catch (t) {
              console.error(t);
            }
        })(),
          (e.exports = n(730));
      },
      29: function (e, t, n) {
        var r;
        (r = function (e) {
          return (function (e) {
            var t = {};
            function n(r) {
              if (t[r]) return t[r].exports;
              var o = (t[r] = { i: r, l: !1, exports: {} });
              return (
                e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
              );
            }
            return (
              (n.m = e),
              (n.c = t),
              (n.d = function (e, t, r) {
                n.o(e, t) ||
                  Object.defineProperty(e, t, { enumerable: !0, get: r });
              }),
              (n.r = function (e) {
                "undefined" !== typeof Symbol &&
                  Symbol.toStringTag &&
                  Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module",
                  }),
                  Object.defineProperty(e, "__esModule", { value: !0 });
              }),
              (n.t = function (e, t) {
                if ((1 & t && (e = n(e)), 8 & t)) return e;
                if (4 & t && "object" === typeof e && e && e.__esModule)
                  return e;
                var r = Object.create(null);
                if (
                  (n.r(r),
                  Object.defineProperty(r, "default", {
                    enumerable: !0,
                    value: e,
                  }),
                  2 & t && "string" != typeof e)
                )
                  for (var o in e)
                    n.d(
                      r,
                      o,
                      function (t) {
                        return e[t];
                      }.bind(null, o)
                    );
                return r;
              }),
              (n.n = function (e) {
                var t =
                  e && e.__esModule
                    ? function () {
                        return e.default;
                      }
                    : function () {
                        return e;
                      };
                return n.d(t, "a", t), t;
              }),
              (n.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
              }),
              (n.p = ""),
              n((n.s = "./src/react-webcam.tsx"))
            );
          })({
            "./src/react-webcam.tsx": function (e, t, n) {
              "use strict";
              n.r(t);
              var r = n("react"),
                o = (function () {
                  var e = function (t, n) {
                    return (
                      (e =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                          function (e, t) {
                            e.__proto__ = t;
                          }) ||
                        function (e, t) {
                          for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                        }),
                      e(t, n)
                    );
                  };
                  return function (t, n) {
                    function r() {
                      this.constructor = t;
                    }
                    e(t, n),
                      (t.prototype =
                        null === n
                          ? Object.create(n)
                          : ((r.prototype = n.prototype), new r()));
                  };
                })(),
                a = function () {
                  return (
                    (a =
                      Object.assign ||
                      function (e) {
                        for (var t, n = 1, r = arguments.length; n < r; n++)
                          for (var o in (t = arguments[n]))
                            Object.prototype.hasOwnProperty.call(t, o) &&
                              (e[o] = t[o]);
                        return e;
                      }),
                    a.apply(this, arguments)
                  );
                },
                l = function (e, t) {
                  var n = {};
                  for (var r in e)
                    Object.prototype.hasOwnProperty.call(e, r) &&
                      t.indexOf(r) < 0 &&
                      (n[r] = e[r]);
                  if (
                    null != e &&
                    "function" === typeof Object.getOwnPropertySymbols
                  ) {
                    var o = 0;
                    for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
                      t.indexOf(r[o]) < 0 &&
                        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                        (n[r[o]] = e[r[o]]);
                  }
                  return n;
                };
              function i() {
                return !(
                  !navigator.mediaDevices ||
                  !navigator.mediaDevices.getUserMedia
                );
              }
              "undefined" !== typeof window &&
                (void 0 === navigator.mediaDevices &&
                  (navigator.mediaDevices = {}),
                void 0 === navigator.mediaDevices.getUserMedia &&
                  (navigator.mediaDevices.getUserMedia = function (e) {
                    var t =
                      navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia;
                    return t
                      ? new Promise(function (n, r) {
                          t.call(navigator, e, n, r);
                        })
                      : Promise.reject(
                          new Error(
                            "getUserMedia is not implemented in this browser"
                          )
                        );
                  }));
              var s = (function (e) {
                function t(t) {
                  var n = e.call(this, t) || this;
                  return (
                    (n.canvas = null),
                    (n.ctx = null),
                    (n.requestUserMediaId = 0),
                    (n.unmounted = !1),
                    (n.state = { hasUserMedia: !1 }),
                    n
                  );
                }
                return (
                  o(t, e),
                  (t.prototype.componentDidMount = function () {
                    var e = this.state,
                      t = this.props;
                    (this.unmounted = !1),
                      i()
                        ? (e.hasUserMedia || this.requestUserMedia(),
                          t.children &&
                            "function" != typeof t.children &&
                            console.warn("children must be a function"))
                        : t.onUserMediaError("getUserMedia not supported");
                  }),
                  (t.prototype.componentDidUpdate = function (e) {
                    var t = this.props;
                    if (i()) {
                      var n =
                          JSON.stringify(e.audioConstraints) !==
                          JSON.stringify(t.audioConstraints),
                        r =
                          JSON.stringify(e.videoConstraints) !==
                          JSON.stringify(t.videoConstraints),
                        o = e.minScreenshotWidth !== t.minScreenshotWidth,
                        a = e.minScreenshotHeight !== t.minScreenshotHeight;
                      (r || o || a) &&
                        ((this.canvas = null), (this.ctx = null)),
                        (n || r) &&
                          (this.stopAndCleanup(), this.requestUserMedia());
                    } else t.onUserMediaError("getUserMedia not supported");
                  }),
                  (t.prototype.componentWillUnmount = function () {
                    (this.unmounted = !0), this.stopAndCleanup();
                  }),
                  (t.stopMediaStream = function (e) {
                    e &&
                      (e.getVideoTracks && e.getAudioTracks
                        ? (e.getVideoTracks().map(function (t) {
                            e.removeTrack(t), t.stop();
                          }),
                          e.getAudioTracks().map(function (t) {
                            e.removeTrack(t), t.stop();
                          }))
                        : e.stop());
                  }),
                  (t.prototype.stopAndCleanup = function () {
                    var e = this.state;
                    e.hasUserMedia &&
                      (t.stopMediaStream(this.stream),
                      e.src && window.URL.revokeObjectURL(e.src));
                  }),
                  (t.prototype.getScreenshot = function (e) {
                    var t = this.state,
                      n = this.props;
                    if (!t.hasUserMedia) return null;
                    var r = this.getCanvas(e);
                    return (
                      r && r.toDataURL(n.screenshotFormat, n.screenshotQuality)
                    );
                  }),
                  (t.prototype.getCanvas = function (e) {
                    var t = this.state,
                      n = this.props;
                    if (!this.video) return null;
                    if (!t.hasUserMedia || !this.video.videoHeight) return null;
                    if (!this.ctx) {
                      var r = this.video.videoWidth,
                        o = this.video.videoHeight;
                      if (!this.props.forceScreenshotSourceSize) {
                        var a = r / o;
                        (o =
                          (r = n.minScreenshotWidth || this.video.clientWidth) /
                          a),
                          n.minScreenshotHeight &&
                            o < n.minScreenshotHeight &&
                            (r = (o = n.minScreenshotHeight) * a);
                      }
                      (this.canvas = document.createElement("canvas")),
                        (this.canvas.width =
                          (null === e || void 0 === e ? void 0 : e.width) || r),
                        (this.canvas.height =
                          (null === e || void 0 === e ? void 0 : e.height) ||
                          o),
                        (this.ctx = this.canvas.getContext("2d"));
                    }
                    var l = this.ctx,
                      i = this.canvas;
                    return (
                      l &&
                        i &&
                        ((i.width =
                          (null === e || void 0 === e ? void 0 : e.width) ||
                          i.width),
                        (i.height =
                          (null === e || void 0 === e ? void 0 : e.height) ||
                          i.height),
                        n.mirrored && (l.translate(i.width, 0), l.scale(-1, 1)),
                        (l.imageSmoothingEnabled = n.imageSmoothing),
                        l.drawImage(
                          this.video,
                          0,
                          0,
                          (null === e || void 0 === e ? void 0 : e.width) ||
                            i.width,
                          (null === e || void 0 === e ? void 0 : e.height) ||
                            i.height
                        ),
                        n.mirrored &&
                          (l.scale(-1, 1), l.translate(-i.width, 0))),
                      i
                    );
                  }),
                  (t.prototype.requestUserMedia = function () {
                    var e = this,
                      n = this.props,
                      r = function (r, o) {
                        var a = { video: "undefined" === typeof o || o };
                        n.audio && (a.audio = "undefined" === typeof r || r),
                          e.requestUserMediaId++;
                        var l = e.requestUserMediaId;
                        navigator.mediaDevices
                          .getUserMedia(a)
                          .then(function (n) {
                            e.unmounted || l !== e.requestUserMediaId
                              ? t.stopMediaStream(n)
                              : e.handleUserMedia(null, n);
                          })
                          .catch(function (t) {
                            e.handleUserMedia(t);
                          });
                      };
                    if ("mediaDevices" in navigator)
                      r(n.audioConstraints, n.videoConstraints);
                    else {
                      var o = function (e) {
                          return { optional: [{ sourceId: e }] };
                        },
                        a = function (e) {
                          var t = e.deviceId;
                          return "string" === typeof t
                            ? t
                            : Array.isArray(t) && t.length > 0
                            ? t[0]
                            : "object" === typeof t && t.ideal
                            ? t.ideal
                            : null;
                        };
                      MediaStreamTrack.getSources(function (e) {
                        var t = null,
                          l = null;
                        e.forEach(function (e) {
                          "audio" === e.kind
                            ? (t = e.id)
                            : "video" === e.kind && (l = e.id);
                        });
                        var i = a(n.audioConstraints);
                        i && (t = i);
                        var s = a(n.videoConstraints);
                        s && (l = s), r(o(t), o(l));
                      });
                    }
                  }),
                  (t.prototype.handleUserMedia = function (e, t) {
                    var n = this.props;
                    if (e || !t)
                      return (
                        this.setState({ hasUserMedia: !1 }),
                        void n.onUserMediaError(e)
                      );
                    this.stream = t;
                    try {
                      this.video && (this.video.srcObject = t),
                        this.setState({ hasUserMedia: !0 });
                    } catch (r) {
                      this.setState({
                        hasUserMedia: !0,
                        src: window.URL.createObjectURL(t),
                      });
                    }
                    n.onUserMedia(t);
                  }),
                  (t.prototype.render = function () {
                    var e = this,
                      t = this.state,
                      n = this.props,
                      o = n.audio,
                      i =
                        (n.forceScreenshotSourceSize,
                        n.disablePictureInPicture),
                      s =
                        (n.onUserMedia,
                        n.onUserMediaError,
                        n.screenshotFormat,
                        n.screenshotQuality,
                        n.minScreenshotWidth,
                        n.minScreenshotHeight,
                        n.audioConstraints,
                        n.videoConstraints,
                        n.imageSmoothing,
                        n.mirrored),
                      u = n.style,
                      c = void 0 === u ? {} : u,
                      d = n.children,
                      f = l(n, [
                        "audio",
                        "forceScreenshotSourceSize",
                        "disablePictureInPicture",
                        "onUserMedia",
                        "onUserMediaError",
                        "screenshotFormat",
                        "screenshotQuality",
                        "minScreenshotWidth",
                        "minScreenshotHeight",
                        "audioConstraints",
                        "videoConstraints",
                        "imageSmoothing",
                        "mirrored",
                        "style",
                        "children",
                      ]),
                      p = s
                        ? a(a({}, c), {
                            transform: (c.transform || "") + " scaleX(-1)",
                          })
                        : c,
                      h = { getScreenshot: this.getScreenshot.bind(this) };
                    return r.createElement(
                      r.Fragment,
                      null,
                      r.createElement(
                        "video",
                        a(
                          {
                            autoPlay: !0,
                            disablePictureInPicture: i,
                            src: t.src,
                            muted: !o,
                            playsInline: !0,
                            ref: function (t) {
                              e.video = t;
                            },
                            style: p,
                          },
                          f
                        )
                      ),
                      d && d(h)
                    );
                  }),
                  (t.defaultProps = {
                    audio: !1,
                    disablePictureInPicture: !1,
                    forceScreenshotSourceSize: !1,
                    imageSmoothing: !0,
                    mirrored: !1,
                    onUserMedia: function () {},
                    onUserMediaError: function () {},
                    screenshotFormat: "image/webp",
                    screenshotQuality: 0.92,
                  }),
                  t
                );
              })(r.Component);
              t.default = s;
            },
            react: function (t, n) {
              t.exports = e;
            },
          }).default;
        }),
          (e.exports = r(n(43)));
      },
      153: (e, t, n) => {
        "use strict";
        var r = n(43),
          o = Symbol.for("react.element"),
          a = Symbol.for("react.fragment"),
          l = Object.prototype.hasOwnProperty,
          i =
            r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
              .ReactCurrentOwner,
          s = { key: !0, ref: !0, __self: !0, __source: !0 };
        function u(e, t, n) {
          var r,
            a = {},
            u = null,
            c = null;
          for (r in (void 0 !== n && (u = "" + n),
          void 0 !== t.key && (u = "" + t.key),
          void 0 !== t.ref && (c = t.ref),
          t))
            l.call(t, r) && !s.hasOwnProperty(r) && (a[r] = t[r]);
          if (e && e.defaultProps)
            for (r in (t = e.defaultProps)) void 0 === a[r] && (a[r] = t[r]);
          return {
            $$typeof: o,
            type: e,
            key: u,
            ref: c,
            props: a,
            _owner: i.current,
          };
        }
        (t.jsx = u), (t.jsxs = u);
      },
      202: (e, t) => {
        "use strict";
        var n = Symbol.for("react.element"),
          r = Symbol.for("react.portal"),
          o = Symbol.for("react.fragment"),
          a = Symbol.for("react.strict_mode"),
          l = Symbol.for("react.profiler"),
          i = Symbol.for("react.provider"),
          s = Symbol.for("react.context"),
          u = Symbol.for("react.forward_ref"),
          c = Symbol.for("react.suspense"),
          d = Symbol.for("react.memo"),
          f = Symbol.for("react.lazy"),
          p = Symbol.iterator;
        var h = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          m = Object.assign,
          g = {};
        function v(e, t, n) {
          (this.props = e),
            (this.context = t),
            (this.refs = g),
            (this.updater = n || h);
        }
        function k() {}
        function y(e, t, n) {
          (this.props = e),
            (this.context = t),
            (this.refs = g),
            (this.updater = n || h);
        }
        (v.prototype.isReactComponent = {}),
          (v.prototype.setState = function (e, t) {
            if ("object" !== typeof e && "function" !== typeof e && null != e)
              throw Error(
                "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
              );
            this.updater.enqueueSetState(this, e, t, "setState");
          }),
          (v.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, "forceUpdate");
          }),
          (k.prototype = v.prototype);
        var w = (y.prototype = new k());
        (w.constructor = y), m(w, v.prototype), (w.isPureReactComponent = !0);
        var b = Array.isArray,
          B = Object.prototype.hasOwnProperty,
          C = { current: null },
          P = { key: !0, ref: !0, __self: !0, __source: !0 };
        function S(e, t, r) {
          var o,
            a = {},
            l = null,
            i = null;
          if (null != t)
            for (o in (void 0 !== t.ref && (i = t.ref),
            void 0 !== t.key && (l = "" + t.key),
            t))
              B.call(t, o) && !P.hasOwnProperty(o) && (a[o] = t[o]);
          var s = arguments.length - 2;
          if (1 === s) a.children = r;
          else if (1 < s) {
            for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
            a.children = u;
          }
          if (e && e.defaultProps)
            for (o in (s = e.defaultProps)) void 0 === a[o] && (a[o] = s[o]);
          return {
            $$typeof: n,
            type: e,
            key: l,
            ref: i,
            props: a,
            _owner: C.current,
          };
        }
        function x(e) {
          return "object" === typeof e && null !== e && e.$$typeof === n;
        }
        var E = /\/+/g;
        function M(e, t) {
          return "object" === typeof e && null !== e && null != e.key
            ? (function (e) {
                var t = { "=": "=0", ":": "=2" };
                return (
                  "$" +
                  e.replace(/[=:]/g, function (e) {
                    return t[e];
                  })
                );
              })("" + e.key)
            : t.toString(36);
        }
        function N(e, t, o, a, l) {
          var i = typeof e;
          ("undefined" !== i && "boolean" !== i) || (e = null);
          var s = !1;
          if (null === e) s = !0;
          else
            switch (i) {
              case "string":
              case "number":
                s = !0;
                break;
              case "object":
                switch (e.$$typeof) {
                  case n:
                  case r:
                    s = !0;
                }
            }
          if (s)
            return (
              (l = l((s = e))),
              (e = "" === a ? "." + M(s, 0) : a),
              b(l)
                ? ((o = ""),
                  null != e && (o = e.replace(E, "$&/") + "/"),
                  N(l, t, o, "", function (e) {
                    return e;
                  }))
                : null != l &&
                  (x(l) &&
                    (l = (function (e, t) {
                      return {
                        $$typeof: n,
                        type: e.type,
                        key: t,
                        ref: e.ref,
                        props: e.props,
                        _owner: e._owner,
                      };
                    })(
                      l,
                      o +
                        (!l.key || (s && s.key === l.key)
                          ? ""
                          : ("" + l.key).replace(E, "$&/") + "/") +
                        e
                    )),
                  t.push(l)),
              1
            );
          if (((s = 0), (a = "" === a ? "." : a + ":"), b(e)))
            for (var u = 0; u < e.length; u++) {
              var c = a + M((i = e[u]), u);
              s += N(i, t, o, c, l);
            }
          else if (
            ((c = (function (e) {
              return null === e || "object" !== typeof e
                ? null
                : "function" === typeof (e = (p && e[p]) || e["@@iterator"])
                ? e
                : null;
            })(e)),
            "function" === typeof c)
          )
            for (e = c.call(e), u = 0; !(i = e.next()).done; )
              s += N((i = i.value), t, o, (c = a + M(i, u++)), l);
          else if ("object" === i)
            throw (
              ((t = String(e)),
              Error(
                "Objects are not valid as a React child (found: " +
                  ("[object Object]" === t
                    ? "object with keys {" + Object.keys(e).join(", ") + "}"
                    : t) +
                  "). If you meant to render a collection of children, use an array instead."
              ))
            );
          return s;
        }
        function _(e, t, n) {
          if (null == e) return e;
          var r = [],
            o = 0;
          return (
            N(e, r, "", "", function (e) {
              return t.call(n, e, o++);
            }),
            r
          );
        }
        function L(e) {
          if (-1 === e._status) {
            var t = e._result;
            (t = t()).then(
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 1), (e._result = t));
              },
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 2), (e._result = t));
              }
            ),
              -1 === e._status && ((e._status = 0), (e._result = t));
          }
          if (1 === e._status) return e._result.default;
          throw e._result;
        }
        var T = { current: null },
          I = { transition: null },
          z = {
            ReactCurrentDispatcher: T,
            ReactCurrentBatchConfig: I,
            ReactCurrentOwner: C,
          };
        function R() {
          throw Error(
            "act(...) is not supported in production builds of React."
          );
        }
        (t.Children = {
          map: _,
          forEach: function (e, t, n) {
            _(
              e,
              function () {
                t.apply(this, arguments);
              },
              n
            );
          },
          count: function (e) {
            var t = 0;
            return (
              _(e, function () {
                t++;
              }),
              t
            );
          },
          toArray: function (e) {
            return (
              _(e, function (e) {
                return e;
              }) || []
            );
          },
          only: function (e) {
            if (!x(e))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return e;
          },
        }),
          (t.Component = v),
          (t.Fragment = o),
          (t.Profiler = l),
          (t.PureComponent = y),
          (t.StrictMode = a),
          (t.Suspense = c),
          (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = z),
          (t.act = R),
          (t.cloneElement = function (e, t, r) {
            if (null === e || void 0 === e)
              throw Error(
                "React.cloneElement(...): The argument must be a React element, but you passed " +
                  e +
                  "."
              );
            var o = m({}, e.props),
              a = e.key,
              l = e.ref,
              i = e._owner;
            if (null != t) {
              if (
                (void 0 !== t.ref && ((l = t.ref), (i = C.current)),
                void 0 !== t.key && (a = "" + t.key),
                e.type && e.type.defaultProps)
              )
                var s = e.type.defaultProps;
              for (u in t)
                B.call(t, u) &&
                  !P.hasOwnProperty(u) &&
                  (o[u] = void 0 === t[u] && void 0 !== s ? s[u] : t[u]);
            }
            var u = arguments.length - 2;
            if (1 === u) o.children = r;
            else if (1 < u) {
              s = Array(u);
              for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
              o.children = s;
            }
            return {
              $$typeof: n,
              type: e.type,
              key: a,
              ref: l,
              props: o,
              _owner: i,
            };
          }),
          (t.createContext = function (e) {
            return (
              ((e = {
                $$typeof: s,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
                _defaultValue: null,
                _globalName: null,
              }).Provider = { $$typeof: i, _context: e }),
              (e.Consumer = e)
            );
          }),
          (t.createElement = S),
          (t.createFactory = function (e) {
            var t = S.bind(null, e);
            return (t.type = e), t;
          }),
          (t.createRef = function () {
            return { current: null };
          }),
          (t.forwardRef = function (e) {
            return { $$typeof: u, render: e };
          }),
          (t.isValidElement = x),
          (t.lazy = function (e) {
            return {
              $$typeof: f,
              _payload: { _status: -1, _result: e },
              _init: L,
            };
          }),
          (t.memo = function (e, t) {
            return { $$typeof: d, type: e, compare: void 0 === t ? null : t };
          }),
          (t.startTransition = function (e) {
            var t = I.transition;
            I.transition = {};
            try {
              e();
            } finally {
              I.transition = t;
            }
          }),
          (t.unstable_act = R),
          (t.useCallback = function (e, t) {
            return T.current.useCallback(e, t);
          }),
          (t.useContext = function (e) {
            return T.current.useContext(e);
          }),
          (t.useDebugValue = function () {}),
          (t.useDeferredValue = function (e) {
            return T.current.useDeferredValue(e);
          }),
          (t.useEffect = function (e, t) {
            return T.current.useEffect(e, t);
          }),
          (t.useId = function () {
            return T.current.useId();
          }),
          (t.useImperativeHandle = function (e, t, n) {
            return T.current.useImperativeHandle(e, t, n);
          }),
          (t.useInsertionEffect = function (e, t) {
            return T.current.useInsertionEffect(e, t);
          }),
          (t.useLayoutEffect = function (e, t) {
            return T.current.useLayoutEffect(e, t);
          }),
          (t.useMemo = function (e, t) {
            return T.current.useMemo(e, t);
          }),
          (t.useReducer = function (e, t, n) {
            return T.current.useReducer(e, t, n);
          }),
          (t.useRef = function (e) {
            return T.current.useRef(e);
          }),
          (t.useState = function (e) {
            return T.current.useState(e);
          }),
          (t.useSyncExternalStore = function (e, t, n) {
            return T.current.useSyncExternalStore(e, t, n);
          }),
          (t.useTransition = function () {
            return T.current.useTransition();
          }),
          (t.version = "18.3.1");
      },
      43: (e, t, n) => {
        "use strict";
        e.exports = n(202);
      },
      579: (e, t, n) => {
        "use strict";
        e.exports = n(153);
      },
      234: (e, t) => {
        "use strict";
        function n(e, t) {
          var n = e.length;
          e.push(t);
          e: for (; 0 < n; ) {
            var r = (n - 1) >>> 1,
              o = e[r];
            if (!(0 < a(o, t))) break e;
            (e[r] = t), (e[n] = o), (n = r);
          }
        }
        function r(e) {
          return 0 === e.length ? null : e[0];
        }
        function o(e) {
          if (0 === e.length) return null;
          var t = e[0],
            n = e.pop();
          if (n !== t) {
            e[0] = n;
            e: for (var r = 0, o = e.length, l = o >>> 1; r < l; ) {
              var i = 2 * (r + 1) - 1,
                s = e[i],
                u = i + 1,
                c = e[u];
              if (0 > a(s, n))
                u < o && 0 > a(c, s)
                  ? ((e[r] = c), (e[u] = n), (r = u))
                  : ((e[r] = s), (e[i] = n), (r = i));
              else {
                if (!(u < o && 0 > a(c, n))) break e;
                (e[r] = c), (e[u] = n), (r = u);
              }
            }
          }
          return t;
        }
        function a(e, t) {
          var n = e.sortIndex - t.sortIndex;
          return 0 !== n ? n : e.id - t.id;
        }
        if (
          "object" === typeof performance &&
          "function" === typeof performance.now
        ) {
          var l = performance;
          t.unstable_now = function () {
            return l.now();
          };
        } else {
          var i = Date,
            s = i.now();
          t.unstable_now = function () {
            return i.now() - s;
          };
        }
        var u = [],
          c = [],
          d = 1,
          f = null,
          p = 3,
          h = !1,
          m = !1,
          g = !1,
          v = "function" === typeof setTimeout ? setTimeout : null,
          k = "function" === typeof clearTimeout ? clearTimeout : null,
          y = "undefined" !== typeof setImmediate ? setImmediate : null;
        function w(e) {
          for (var t = r(c); null !== t; ) {
            if (null === t.callback) o(c);
            else {
              if (!(t.startTime <= e)) break;
              o(c), (t.sortIndex = t.expirationTime), n(u, t);
            }
            t = r(c);
          }
        }
        function b(e) {
          if (((g = !1), w(e), !m))
            if (null !== r(u)) (m = !0), I(B);
            else {
              var t = r(c);
              null !== t && z(b, t.startTime - e);
            }
        }
        function B(e, n) {
          (m = !1), g && ((g = !1), k(x), (x = -1)), (h = !0);
          var a = p;
          try {
            for (
              w(n), f = r(u);
              null !== f && (!(f.expirationTime > n) || (e && !N()));

            ) {
              var l = f.callback;
              if ("function" === typeof l) {
                (f.callback = null), (p = f.priorityLevel);
                var i = l(f.expirationTime <= n);
                (n = t.unstable_now()),
                  "function" === typeof i
                    ? (f.callback = i)
                    : f === r(u) && o(u),
                  w(n);
              } else o(u);
              f = r(u);
            }
            if (null !== f) var s = !0;
            else {
              var d = r(c);
              null !== d && z(b, d.startTime - n), (s = !1);
            }
            return s;
          } finally {
            (f = null), (p = a), (h = !1);
          }
        }
        "undefined" !== typeof navigator &&
          void 0 !== navigator.scheduling &&
          void 0 !== navigator.scheduling.isInputPending &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        var C,
          P = !1,
          S = null,
          x = -1,
          E = 5,
          M = -1;
        function N() {
          return !(t.unstable_now() - M < E);
        }
        function _() {
          if (null !== S) {
            var e = t.unstable_now();
            M = e;
            var n = !0;
            try {
              n = S(!0, e);
            } finally {
              n ? C() : ((P = !1), (S = null));
            }
          } else P = !1;
        }
        if ("function" === typeof y)
          C = function () {
            y(_);
          };
        else if ("undefined" !== typeof MessageChannel) {
          var L = new MessageChannel(),
            T = L.port2;
          (L.port1.onmessage = _),
            (C = function () {
              T.postMessage(null);
            });
        } else
          C = function () {
            v(_, 0);
          };
        function I(e) {
          (S = e), P || ((P = !0), C());
        }
        function z(e, n) {
          x = v(function () {
            e(t.unstable_now());
          }, n);
        }
        (t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (e) {
            e.callback = null;
          }),
          (t.unstable_continueExecution = function () {
            m || h || ((m = !0), I(B));
          }),
          (t.unstable_forceFrameRate = function (e) {
            0 > e || 125 < e
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
                )
              : (E = 0 < e ? Math.floor(1e3 / e) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return p;
          }),
          (t.unstable_getFirstCallbackNode = function () {
            return r(u);
          }),
          (t.unstable_next = function (e) {
            switch (p) {
              case 1:
              case 2:
              case 3:
                var t = 3;
                break;
              default:
                t = p;
            }
            var n = p;
            p = t;
            try {
              return e();
            } finally {
              p = n;
            }
          }),
          (t.unstable_pauseExecution = function () {}),
          (t.unstable_requestPaint = function () {}),
          (t.unstable_runWithPriority = function (e, t) {
            switch (e) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                e = 3;
            }
            var n = p;
            p = e;
            try {
              return t();
            } finally {
              p = n;
            }
          }),
          (t.unstable_scheduleCallback = function (e, o, a) {
            var l = t.unstable_now();
            switch (
              ("object" === typeof a && null !== a
                ? (a = "number" === typeof (a = a.delay) && 0 < a ? l + a : l)
                : (a = l),
              e)
            ) {
              case 1:
                var i = -1;
                break;
              case 2:
                i = 250;
                break;
              case 5:
                i = 1073741823;
                break;
              case 4:
                i = 1e4;
                break;
              default:
                i = 5e3;
            }
            return (
              (e = {
                id: d++,
                callback: o,
                priorityLevel: e,
                startTime: a,
                expirationTime: (i = a + i),
                sortIndex: -1,
              }),
              a > l
                ? ((e.sortIndex = a),
                  n(c, e),
                  null === r(u) &&
                    e === r(c) &&
                    (g ? (k(x), (x = -1)) : (g = !0), z(b, a - l)))
                : ((e.sortIndex = i), n(u, e), m || h || ((m = !0), I(B))),
              e
            );
          }),
          (t.unstable_shouldYield = N),
          (t.unstable_wrapCallback = function (e) {
            var t = p;
            return function () {
              var n = p;
              p = t;
              try {
                return e.apply(this, arguments);
              } finally {
                p = n;
              }
            };
          });
      },
      853: (e, t, n) => {
        "use strict";
        e.exports = n(234);
      },
    },
    t = {};
  function n(r) {
    var o = t[r];
    if (void 0 !== o) return o.exports;
    var a = (t[r] = { exports: {} });
    return e[r].call(a.exports, a, a.exports, n), a.exports;
  }
  (n.n = (e) => {
    var t = e && e.__esModule ? () => e.default : () => e;
    return n.d(t, { a: t }), t;
  }),
    (() => {
      var e,
        t = Object.getPrototypeOf
          ? (e) => Object.getPrototypeOf(e)
          : (e) => e.__proto__;
      n.t = function (r, o) {
        if ((1 & o && (r = this(r)), 8 & o)) return r;
        if ("object" === typeof r && r) {
          if (4 & o && r.__esModule) return r;
          if (16 & o && "function" === typeof r.then) return r;
        }
        var a = Object.create(null);
        n.r(a);
        var l = {};
        e = e || [null, t({}), t([]), t(t)];
        for (
          var i = 2 & o && r;
          "object" == typeof i && !~e.indexOf(i);
          i = t(i)
        )
          Object.getOwnPropertyNames(i).forEach((e) => (l[e] = () => r[e]));
        return (l.default = () => r), n.d(a, l), a;
      };
    })(),
    (n.d = (e, t) => {
      for (var r in t)
        n.o(t, r) &&
          !n.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (() => {
      "use strict";
      var e,
        t = n(43),
        r = n.t(t, 2),
        o = n(391),
        a = n(950),
        l = n.t(a, 2);
      function i() {
        return (
          (i = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                }
                return e;
              }),
          i.apply(this, arguments)
        );
      }
      !(function (e) {
        (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
      })(e || (e = {}));
      const s = "popstate";
      function u(e, t) {
        if (!1 === e || null === e || "undefined" === typeof e)
          throw new Error(t);
      }
      function c(e, t) {
        if (!e) {
          "undefined" !== typeof console && console.warn(t);
          try {
            throw new Error(t);
          } catch (n) {}
        }
      }
      function d(e, t) {
        return { usr: e.state, key: e.key, idx: t };
      }
      function f(e, t, n, r) {
        return (
          void 0 === n && (n = null),
          i(
            {
              pathname: "string" === typeof e ? e : e.pathname,
              search: "",
              hash: "",
            },
            "string" === typeof t ? h(t) : t,
            {
              state: n,
              key: (t && t.key) || r || Math.random().toString(36).substr(2, 8),
            }
          )
        );
      }
      function p(e) {
        let { pathname: t = "/", search: n = "", hash: r = "" } = e;
        return (
          n && "?" !== n && (t += "?" === n.charAt(0) ? n : "?" + n),
          r && "#" !== r && (t += "#" === r.charAt(0) ? r : "#" + r),
          t
        );
      }
      function h(e) {
        let t = {};
        if (e) {
          let n = e.indexOf("#");
          n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
          let r = e.indexOf("?");
          r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
            e && (t.pathname = e);
        }
        return t;
      }
      function m(t, n, r, o) {
        void 0 === o && (o = {});
        let { window: a = document.defaultView, v5Compat: l = !1 } = o,
          c = a.history,
          h = e.Pop,
          m = null,
          g = v();
        function v() {
          return (c.state || { idx: null }).idx;
        }
        function k() {
          h = e.Pop;
          let t = v(),
            n = null == t ? null : t - g;
          (g = t), m && m({ action: h, location: w.location, delta: n });
        }
        function y(e) {
          let t =
              "null" !== a.location.origin
                ? a.location.origin
                : a.location.href,
            n = "string" === typeof e ? e : p(e);
          return (
            (n = n.replace(/ $/, "%20")),
            u(
              t,
              "No window.location.(origin|href) available to create URL for href: " +
                n
            ),
            new URL(n, t)
          );
        }
        null == g && ((g = 0), c.replaceState(i({}, c.state, { idx: g }), ""));
        let w = {
          get action() {
            return h;
          },
          get location() {
            return t(a, c);
          },
          listen(e) {
            if (m)
              throw new Error("A history only accepts one active listener");
            return (
              a.addEventListener(s, k),
              (m = e),
              () => {
                a.removeEventListener(s, k), (m = null);
              }
            );
          },
          createHref: (e) => n(a, e),
          createURL: y,
          encodeLocation(e) {
            let t = y(e);
            return { pathname: t.pathname, search: t.search, hash: t.hash };
          },
          push: function (t, n) {
            h = e.Push;
            let o = f(w.location, t, n);
            r && r(o, t), (g = v() + 1);
            let i = d(o, g),
              s = w.createHref(o);
            try {
              c.pushState(i, "", s);
            } catch (u) {
              if (u instanceof DOMException && "DataCloneError" === u.name)
                throw u;
              a.location.assign(s);
            }
            l && m && m({ action: h, location: w.location, delta: 1 });
          },
          replace: function (t, n) {
            h = e.Replace;
            let o = f(w.location, t, n);
            r && r(o, t), (g = v());
            let a = d(o, g),
              i = w.createHref(o);
            c.replaceState(a, "", i),
              l && m && m({ action: h, location: w.location, delta: 0 });
          },
          go: (e) => c.go(e),
        };
        return w;
      }
      var g;
      !(function (e) {
        (e.data = "data"),
          (e.deferred = "deferred"),
          (e.redirect = "redirect"),
          (e.error = "error");
      })(g || (g = {}));
      new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
      function v(e, t, n) {
        void 0 === n && (n = "/");
        let r = L(("string" === typeof t ? h(t) : t).pathname || "/", n);
        if (null == r) return null;
        let o = k(e);
        !(function (e) {
          e.sort((e, t) =>
            e.score !== t.score
              ? t.score - e.score
              : (function (e, t) {
                  let n =
                    e.length === t.length &&
                    e.slice(0, -1).every((e, n) => e === t[n]);
                  return n ? e[e.length - 1] - t[t.length - 1] : 0;
                })(
                  e.routesMeta.map((e) => e.childrenIndex),
                  t.routesMeta.map((e) => e.childrenIndex)
                )
          );
        })(o);
        let a = null;
        for (let l = 0; null == a && l < o.length; ++l) {
          let e = _(r);
          a = M(o[l], e);
        }
        return a;
      }
      function k(e, t, n, r) {
        void 0 === t && (t = []),
          void 0 === n && (n = []),
          void 0 === r && (r = "");
        let o = (e, o, a) => {
          let l = {
            relativePath: void 0 === a ? e.path || "" : a,
            caseSensitive: !0 === e.caseSensitive,
            childrenIndex: o,
            route: e,
          };
          l.relativePath.startsWith("/") &&
            (u(
              l.relativePath.startsWith(r),
              'Absolute route path "' +
                l.relativePath +
                '" nested under path "' +
                r +
                '" is not valid. An absolute child route path must start with the combined path of all its parent routes.'
            ),
            (l.relativePath = l.relativePath.slice(r.length)));
          let i = O([r, l.relativePath]),
            s = n.concat(l);
          e.children &&
            e.children.length > 0 &&
            (u(
              !0 !== e.index,
              'Index routes must not have child routes. Please remove all child routes from route path "' +
                i +
                '".'
            ),
            k(e.children, t, s, i)),
            (null != e.path || e.index) &&
              t.push({ path: i, score: E(i, e.index), routesMeta: s });
        };
        return (
          e.forEach((e, t) => {
            var n;
            if ("" !== e.path && null != (n = e.path) && n.includes("?"))
              for (let r of y(e.path)) o(e, t, r);
            else o(e, t);
          }),
          t
        );
      }
      function y(e) {
        let t = e.split("/");
        if (0 === t.length) return [];
        let [n, ...r] = t,
          o = n.endsWith("?"),
          a = n.replace(/\?$/, "");
        if (0 === r.length) return o ? [a, ""] : [a];
        let l = y(r.join("/")),
          i = [];
        return (
          i.push(...l.map((e) => ("" === e ? a : [a, e].join("/")))),
          o && i.push(...l),
          i.map((t) => (e.startsWith("/") && "" === t ? "/" : t))
        );
      }
      const w = /^:[\w-]+$/,
        b = 3,
        B = 2,
        C = 1,
        P = 10,
        S = -2,
        x = (e) => "*" === e;
      function E(e, t) {
        let n = e.split("/"),
          r = n.length;
        return (
          n.some(x) && (r += S),
          t && (r += B),
          n
            .filter((e) => !x(e))
            .reduce((e, t) => e + (w.test(t) ? b : "" === t ? C : P), r)
        );
      }
      function M(e, t) {
        let { routesMeta: n } = e,
          r = {},
          o = "/",
          a = [];
        for (let l = 0; l < n.length; ++l) {
          let e = n[l],
            i = l === n.length - 1,
            s = "/" === o ? t : t.slice(o.length) || "/",
            u = N(
              { path: e.relativePath, caseSensitive: e.caseSensitive, end: i },
              s
            );
          if (!u) return null;
          Object.assign(r, u.params);
          let c = e.route;
          a.push({
            params: r,
            pathname: O([o, u.pathname]),
            pathnameBase: U(O([o, u.pathnameBase])),
            route: c,
          }),
            "/" !== u.pathnameBase && (o = O([o, u.pathnameBase]));
        }
        return a;
      }
      function N(e, t) {
        "string" === typeof e && (e = { path: e, caseSensitive: !1, end: !0 });
        let [n, r] = (function (e, t, n) {
            void 0 === t && (t = !1);
            void 0 === n && (n = !0);
            c(
              "*" === e || !e.endsWith("*") || e.endsWith("/*"),
              'Route path "' +
                e +
                '" will be treated as if it were "' +
                e.replace(/\*$/, "/*") +
                '" because the `*` character must always follow a `/` in the pattern. To get rid of this warning, please change the route path to "' +
                e.replace(/\*$/, "/*") +
                '".'
            );
            let r = [],
              o =
                "^" +
                e
                  .replace(/\/*\*?$/, "")
                  .replace(/^\/*/, "/")
                  .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
                  .replace(
                    /\/:([\w-]+)(\?)?/g,
                    (e, t, n) => (
                      r.push({ paramName: t, isOptional: null != n }),
                      n ? "/?([^\\/]+)?" : "/([^\\/]+)"
                    )
                  );
            e.endsWith("*")
              ? (r.push({ paramName: "*" }),
                (o += "*" === e || "/*" === e ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
              : n
              ? (o += "\\/*$")
              : "" !== e && "/" !== e && (o += "(?:(?=\\/|$))");
            let a = new RegExp(o, t ? void 0 : "i");
            return [a, r];
          })(e.path, e.caseSensitive, e.end),
          o = t.match(n);
        if (!o) return null;
        let a = o[0],
          l = a.replace(/(.)\/+$/, "$1"),
          i = o.slice(1);
        return {
          params: r.reduce((e, t, n) => {
            let { paramName: r, isOptional: o } = t;
            if ("*" === r) {
              let e = i[n] || "";
              l = a.slice(0, a.length - e.length).replace(/(.)\/+$/, "$1");
            }
            const s = i[n];
            return (
              (e[r] = o && !s ? void 0 : (s || "").replace(/%2F/g, "/")), e
            );
          }, {}),
          pathname: a,
          pathnameBase: l,
          pattern: e,
        };
      }
      function _(e) {
        try {
          return e
            .split("/")
            .map((e) => decodeURIComponent(e).replace(/\//g, "%2F"))
            .join("/");
        } catch (t) {
          return (
            c(
              !1,
              'The URL path "' +
                e +
                '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (' +
                t +
                ")."
            ),
            e
          );
        }
      }
      function L(e, t) {
        if ("/" === t) return e;
        if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
        let n = t.endsWith("/") ? t.length - 1 : t.length,
          r = e.charAt(n);
        return r && "/" !== r ? null : e.slice(n) || "/";
      }
      function T(e, t, n, r) {
        return (
          "Cannot include a '" +
          e +
          "' character in a manually specified `to." +
          t +
          "` field [" +
          JSON.stringify(r) +
          "].  Please separate it out to the `to." +
          n +
          '` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.'
        );
      }
      function I(e) {
        return e.filter(
          (e, t) => 0 === t || (e.route.path && e.route.path.length > 0)
        );
      }
      function z(e, t) {
        let n = I(e);
        return t
          ? n.map((t, n) => (n === e.length - 1 ? t.pathname : t.pathnameBase))
          : n.map((e) => e.pathnameBase);
      }
      function R(e, t, n, r) {
        let o;
        void 0 === r && (r = !1),
          "string" === typeof e
            ? (o = h(e))
            : ((o = i({}, e)),
              u(
                !o.pathname || !o.pathname.includes("?"),
                T("?", "pathname", "search", o)
              ),
              u(
                !o.pathname || !o.pathname.includes("#"),
                T("#", "pathname", "hash", o)
              ),
              u(
                !o.search || !o.search.includes("#"),
                T("#", "search", "hash", o)
              ));
        let a,
          l = "" === e || "" === o.pathname,
          s = l ? "/" : o.pathname;
        if (null == s) a = n;
        else {
          let e = t.length - 1;
          if (!r && s.startsWith("..")) {
            let t = s.split("/");
            for (; ".." === t[0]; ) t.shift(), (e -= 1);
            o.pathname = t.join("/");
          }
          a = e >= 0 ? t[e] : "/";
        }
        let c = (function (e, t) {
            void 0 === t && (t = "/");
            let {
                pathname: n,
                search: r = "",
                hash: o = "",
              } = "string" === typeof e ? h(e) : e,
              a = n
                ? n.startsWith("/")
                  ? n
                  : (function (e, t) {
                      let n = t.replace(/\/+$/, "").split("/");
                      return (
                        e.split("/").forEach((e) => {
                          ".." === e
                            ? n.length > 1 && n.pop()
                            : "." !== e && n.push(e);
                        }),
                        n.length > 1 ? n.join("/") : "/"
                      );
                    })(n, t)
                : t;
            return { pathname: a, search: A(r), hash: F(o) };
          })(o, a),
          d = s && "/" !== s && s.endsWith("/"),
          f = (l || "." === s) && n.endsWith("/");
        return c.pathname.endsWith("/") || (!d && !f) || (c.pathname += "/"), c;
      }
      const O = (e) => e.join("/").replace(/\/\/+/g, "/"),
        U = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
        A = (e) => (e && "?" !== e ? (e.startsWith("?") ? e : "?" + e) : ""),
        F = (e) => (e && "#" !== e ? (e.startsWith("#") ? e : "#" + e) : "");
      Error;
      function D(e) {
        return (
          null != e &&
          "number" === typeof e.status &&
          "string" === typeof e.statusText &&
          "boolean" === typeof e.internal &&
          "data" in e
        );
      }
      const j = ["post", "put", "patch", "delete"],
        H = (new Set(j), ["get", ...j]);
      new Set(H), new Set([301, 302, 303, 307, 308]), new Set([307, 308]);
      Symbol("deferred");
      function V() {
        return (
          (V = Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = arguments[t];
                  for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                }
                return e;
              }),
          V.apply(this, arguments)
        );
      }
      const $ = t.createContext(null);
      const W = t.createContext(null);
      const Q = t.createContext(null);
      const X = t.createContext(null);
      const K = t.createContext({ outlet: null, matches: [], isDataRoute: !1 });
      const q = t.createContext(null);
      function Y() {
        return null != t.useContext(X);
      }
      function J() {
        return Y() || u(!1), t.useContext(X).location;
      }
      function G(e) {
        t.useContext(Q).static || t.useLayoutEffect(e);
      }
      function Z() {
        let { isDataRoute: e } = t.useContext(K);
        return e
          ? (function () {
              let { router: e } = se(le.UseNavigateStable),
                n = ce(ie.UseNavigateStable),
                r = t.useRef(!1);
              return (
                G(() => {
                  r.current = !0;
                }),
                t.useCallback(
                  function (t, o) {
                    void 0 === o && (o = {}),
                      r.current &&
                        ("number" === typeof t
                          ? e.navigate(t)
                          : e.navigate(t, V({ fromRouteId: n }, o)));
                  },
                  [e, n]
                )
              );
            })()
          : (function () {
              Y() || u(!1);
              let e = t.useContext($),
                { basename: n, future: r, navigator: o } = t.useContext(Q),
                { matches: a } = t.useContext(K),
                { pathname: l } = J(),
                i = JSON.stringify(z(a, r.v7_relativeSplatPath)),
                s = t.useRef(!1);
              return (
                G(() => {
                  s.current = !0;
                }),
                t.useCallback(
                  function (t, r) {
                    if ((void 0 === r && (r = {}), !s.current)) return;
                    if ("number" === typeof t) return void o.go(t);
                    let a = R(t, JSON.parse(i), l, "path" === r.relative);
                    null == e &&
                      "/" !== n &&
                      (a.pathname =
                        "/" === a.pathname ? n : O([n, a.pathname])),
                      (r.replace ? o.replace : o.push)(a, r.state, r);
                  },
                  [n, o, i, l, e]
                )
              );
            })();
      }
      function ee(n, r, o, a) {
        Y() || u(!1);
        let { navigator: l } = t.useContext(Q),
          { matches: i } = t.useContext(K),
          s = i[i.length - 1],
          c = s ? s.params : {},
          d = (s && s.pathname, s ? s.pathnameBase : "/");
        s && s.route;
        let f,
          p = J();
        if (r) {
          var m;
          let e = "string" === typeof r ? h(r) : r;
          "/" === d ||
            (null == (m = e.pathname) ? void 0 : m.startsWith(d)) ||
            u(!1),
            (f = e);
        } else f = p;
        let g = f.pathname || "/",
          k = g;
        if ("/" !== d) {
          let e = d.replace(/^\//, "").split("/");
          k = "/" + g.replace(/^\//, "").split("/").slice(e.length).join("/");
        }
        let y = v(n, { pathname: k });
        let w = ae(
          y &&
            y.map((e) =>
              Object.assign({}, e, {
                params: Object.assign({}, c, e.params),
                pathname: O([
                  d,
                  l.encodeLocation
                    ? l.encodeLocation(e.pathname).pathname
                    : e.pathname,
                ]),
                pathnameBase:
                  "/" === e.pathnameBase
                    ? d
                    : O([
                        d,
                        l.encodeLocation
                          ? l.encodeLocation(e.pathnameBase).pathname
                          : e.pathnameBase,
                      ]),
              })
            ),
          i,
          o,
          a
        );
        return r && w
          ? t.createElement(
              X.Provider,
              {
                value: {
                  location: V(
                    {
                      pathname: "/",
                      search: "",
                      hash: "",
                      state: null,
                      key: "default",
                    },
                    f
                  ),
                  navigationType: e.Pop,
                },
              },
              w
            )
          : w;
      }
      function te() {
        let e = (function () {
            var e;
            let n = t.useContext(q),
              r = ue(ie.UseRouteError),
              o = ce(ie.UseRouteError);
            if (void 0 !== n) return n;
            return null == (e = r.errors) ? void 0 : e[o];
          })(),
          n = D(e)
            ? e.status + " " + e.statusText
            : e instanceof Error
            ? e.message
            : JSON.stringify(e),
          r = e instanceof Error ? e.stack : null,
          o = "rgba(200,200,200, 0.5)",
          a = { padding: "0.5rem", backgroundColor: o };
        return t.createElement(
          t.Fragment,
          null,
          t.createElement("h2", null, "Unexpected Application Error!"),
          t.createElement("h3", { style: { fontStyle: "italic" } }, n),
          r ? t.createElement("pre", { style: a }, r) : null,
          null
        );
      }
      const ne = t.createElement(te, null);
      class re extends t.Component {
        constructor(e) {
          super(e),
            (this.state = {
              location: e.location,
              revalidation: e.revalidation,
              error: e.error,
            });
        }
        static getDerivedStateFromError(e) {
          return { error: e };
        }
        static getDerivedStateFromProps(e, t) {
          return t.location !== e.location ||
            ("idle" !== t.revalidation && "idle" === e.revalidation)
            ? {
                error: e.error,
                location: e.location,
                revalidation: e.revalidation,
              }
            : {
                error: void 0 !== e.error ? e.error : t.error,
                location: t.location,
                revalidation: e.revalidation || t.revalidation,
              };
        }
        componentDidCatch(e, t) {
          console.error(
            "React Router caught the following error during render",
            e,
            t
          );
        }
        render() {
          return void 0 !== this.state.error
            ? t.createElement(
                K.Provider,
                { value: this.props.routeContext },
                t.createElement(q.Provider, {
                  value: this.state.error,
                  children: this.props.component,
                })
              )
            : this.props.children;
        }
      }
      function oe(e) {
        let { routeContext: n, match: r, children: o } = e,
          a = t.useContext($);
        return (
          a &&
            a.static &&
            a.staticContext &&
            (r.route.errorElement || r.route.ErrorBoundary) &&
            (a.staticContext._deepestRenderedBoundaryId = r.route.id),
          t.createElement(K.Provider, { value: n }, o)
        );
      }
      function ae(e, n, r, o) {
        var a;
        if (
          (void 0 === n && (n = []),
          void 0 === r && (r = null),
          void 0 === o && (o = null),
          null == e)
        ) {
          var l;
          if (null == (l = r) || !l.errors) return null;
          e = r.matches;
        }
        let i = e,
          s = null == (a = r) ? void 0 : a.errors;
        if (null != s) {
          let e = i.findIndex(
            (e) => e.route.id && void 0 !== (null == s ? void 0 : s[e.route.id])
          );
          e >= 0 || u(!1), (i = i.slice(0, Math.min(i.length, e + 1)));
        }
        let c = !1,
          d = -1;
        if (r && o && o.v7_partialHydration)
          for (let t = 0; t < i.length; t++) {
            let e = i[t];
            if (
              ((e.route.HydrateFallback || e.route.hydrateFallbackElement) &&
                (d = t),
              e.route.id)
            ) {
              let { loaderData: t, errors: n } = r,
                o =
                  e.route.loader &&
                  void 0 === t[e.route.id] &&
                  (!n || void 0 === n[e.route.id]);
              if (e.route.lazy || o) {
                (c = !0), (i = d >= 0 ? i.slice(0, d + 1) : [i[0]]);
                break;
              }
            }
          }
        return i.reduceRight((e, o, a) => {
          let l,
            u = !1,
            f = null,
            p = null;
          var h;
          r &&
            ((l = s && o.route.id ? s[o.route.id] : void 0),
            (f = o.route.errorElement || ne),
            c &&
              (d < 0 && 0 === a
                ? ((h = "route-fallback"),
                  !1 || de[h] || (de[h] = !0),
                  (u = !0),
                  (p = null))
                : d === a &&
                  ((u = !0), (p = o.route.hydrateFallbackElement || null))));
          let m = n.concat(i.slice(0, a + 1)),
            g = () => {
              let n;
              return (
                (n = l
                  ? f
                  : u
                  ? p
                  : o.route.Component
                  ? t.createElement(o.route.Component, null)
                  : o.route.element
                  ? o.route.element
                  : e),
                t.createElement(oe, {
                  match: o,
                  routeContext: {
                    outlet: e,
                    matches: m,
                    isDataRoute: null != r,
                  },
                  children: n,
                })
              );
            };
          return r && (o.route.ErrorBoundary || o.route.errorElement || 0 === a)
            ? t.createElement(re, {
                location: r.location,
                revalidation: r.revalidation,
                component: f,
                error: l,
                children: g(),
                routeContext: { outlet: null, matches: m, isDataRoute: !0 },
              })
            : g();
        }, null);
      }
      var le = (function (e) {
          return (
            (e.UseBlocker = "useBlocker"),
            (e.UseRevalidator = "useRevalidator"),
            (e.UseNavigateStable = "useNavigate"),
            e
          );
        })(le || {}),
        ie = (function (e) {
          return (
            (e.UseBlocker = "useBlocker"),
            (e.UseLoaderData = "useLoaderData"),
            (e.UseActionData = "useActionData"),
            (e.UseRouteError = "useRouteError"),
            (e.UseNavigation = "useNavigation"),
            (e.UseRouteLoaderData = "useRouteLoaderData"),
            (e.UseMatches = "useMatches"),
            (e.UseRevalidator = "useRevalidator"),
            (e.UseNavigateStable = "useNavigate"),
            (e.UseRouteId = "useRouteId"),
            e
          );
        })(ie || {});
      function se(e) {
        let n = t.useContext($);
        return n || u(!1), n;
      }
      function ue(e) {
        let n = t.useContext(W);
        return n || u(!1), n;
      }
      function ce(e) {
        let n = (function (e) {
            let n = t.useContext(K);
            return n || u(!1), n;
          })(),
          r = n.matches[n.matches.length - 1];
        return r.route.id || u(!1), r.route.id;
      }
      const de = {};
      r.startTransition;
      function fe(e) {
        u(!1);
      }
      function pe(n) {
        let {
          basename: r = "/",
          children: o = null,
          location: a,
          navigationType: l = e.Pop,
          navigator: i,
          static: s = !1,
          future: c,
        } = n;
        Y() && u(!1);
        let d = r.replace(/^\/*/, "/"),
          f = t.useMemo(
            () => ({
              basename: d,
              navigator: i,
              static: s,
              future: V({ v7_relativeSplatPath: !1 }, c),
            }),
            [d, c, i, s]
          );
        "string" === typeof a && (a = h(a));
        let {
            pathname: p = "/",
            search: m = "",
            hash: g = "",
            state: v = null,
            key: k = "default",
          } = a,
          y = t.useMemo(() => {
            let e = L(p, d);
            return null == e
              ? null
              : {
                  location: {
                    pathname: e,
                    search: m,
                    hash: g,
                    state: v,
                    key: k,
                  },
                  navigationType: l,
                };
          }, [d, p, m, g, v, k, l]);
        return null == y
          ? null
          : t.createElement(
              Q.Provider,
              { value: f },
              t.createElement(X.Provider, { children: o, value: y })
            );
      }
      function he(e) {
        let { children: t, location: n } = e;
        return ee(me(t), n);
      }
      new Promise(() => {});
      t.Component;
      function me(e, n) {
        void 0 === n && (n = []);
        let r = [];
        return (
          t.Children.forEach(e, (e, o) => {
            if (!t.isValidElement(e)) return;
            let a = [...n, o];
            if (e.type === t.Fragment)
              return void r.push.apply(r, me(e.props.children, a));
            e.type !== fe && u(!1), e.props.index && e.props.children && u(!1);
            let l = {
              id: e.props.id || a.join("-"),
              caseSensitive: e.props.caseSensitive,
              element: e.props.element,
              Component: e.props.Component,
              index: e.props.index,
              path: e.props.path,
              loader: e.props.loader,
              action: e.props.action,
              errorElement: e.props.errorElement,
              ErrorBoundary: e.props.ErrorBoundary,
              hasErrorBoundary:
                null != e.props.ErrorBoundary || null != e.props.errorElement,
              shouldRevalidate: e.props.shouldRevalidate,
              handle: e.props.handle,
              lazy: e.props.lazy,
            };
            e.props.children && (l.children = me(e.props.children, a)),
              r.push(l);
          }),
          r
        );
      }
      new Set([
        "application/x-www-form-urlencoded",
        "multipart/form-data",
        "text/plain",
      ]);
      try {
        window.__reactRouterVersion = "6";
      } catch (Te) {}
      new Map();
      const ge = r.startTransition;
      l.flushSync, r.useId;
      function ve(e) {
        let { basename: n, children: r, future: o, window: a } = e,
          l = t.useRef();
        var i;
        null == l.current &&
          (l.current =
            (void 0 === (i = { window: a, v5Compat: !0 }) && (i = {}),
            m(
              function (e, t) {
                let { pathname: n, search: r, hash: o } = e.location;
                return f(
                  "",
                  { pathname: n, search: r, hash: o },
                  (t.state && t.state.usr) || null,
                  (t.state && t.state.key) || "default"
                );
              },
              function (e, t) {
                return "string" === typeof t ? t : p(t);
              },
              null,
              i
            )));
        let s = l.current,
          [u, c] = t.useState({ action: s.action, location: s.location }),
          { v7_startTransition: d } = o || {},
          h = t.useCallback(
            (e) => {
              d && ge ? ge(() => c(e)) : c(e);
            },
            [c, d]
          );
        return (
          t.useLayoutEffect(() => s.listen(h), [s, h]),
          t.createElement(pe, {
            basename: n,
            children: r,
            location: u.location,
            navigationType: u.action,
            navigator: s,
            future: o,
          })
        );
      }
      "undefined" !== typeof window &&
        "undefined" !== typeof window.document &&
        window.document.createElement;
      var ke, ye;
      (function (e) {
        (e.UseScrollRestoration = "useScrollRestoration"),
          (e.UseSubmit = "useSubmit"),
          (e.UseSubmitFetcher = "useSubmitFetcher"),
          (e.UseFetcher = "useFetcher"),
          (e.useViewTransitionState = "useViewTransitionState");
      })(ke || (ke = {})),
        (function (e) {
          (e.UseFetcher = "useFetcher"),
            (e.UseFetchers = "useFetchers"),
            (e.UseScrollRestoration = "useScrollRestoration");
        })(ye || (ye = {}));
      var we = n(579);
      const be = function () {
        const e = Z();
        return (0, we.jsxs)("div", {
          className: "MainHome",
          children: [
            (0, we.jsx)("button", {
              className: "HomeNavigationButton",
              onClick: () => e("/InstructorHome"),
              children: "Instructor",
            }),
            (0, we.jsx)("button", {
              className: "HomeNavigationButton",
              onClick: () => e("/StudentHome"),
              children: "Student",
            }),
          ],
        });
      };
      var Be = n(29),
        Ce = n.n(Be),
        Pe = n(361),
        Se = n.n(Pe);
      const xe = function () {
        const e = (0, t.useRef)(null),
          [n, r] = (0, t.useState)([]),
          [o, a] = (0, t.useState)("");
        (0, t.useEffect)(() => {
          l();
          const e = setInterval(() => {
            s();
          }, 1e3);
          return () => {
            clearInterval(e), i();
          };
        }, []);
        const l = async () => {
            try {
              await navigator.mediaDevices.getUserMedia({ video: !0 }), a("");
            } catch (e) {
              console.error("Error accessing the camera: ", e),
                a(
                  "Camera access was denied. Please allow camera permissions in your browser settings."
                );
            }
          },
          i = () => {
            if (e.current && e.current.video.srcObject) {
              e.current.video.srcObject.getTracks().forEach((e) => e.stop());
            }
          },
          s = () => {
            const t = e.current.getScreenshot();
            t && u(t);
          },
          u = (e) => {
            const t = document.createElement("canvas"),
              n = t.getContext("2d"),
              o = new Image();
            (o.src = e),
              (o.onload = () => {
                (t.width = o.width),
                  (t.height = o.height),
                  n.drawImage(o, 0, 0, t.width, t.height);
                const e = n.getImageData(0, 0, t.width, t.height),
                  a = Se()(e.data, e.width, e.height, {
                    inversionAttempts: "dontInvert",
                  });
                a && r((e) => [...e, "QR Code Detected: ".concat(a.data)]);
              });
          };
        return (0, we.jsxs)("div", {
          style: { position: "relative" },
          children: [
            o
              ? (0, we.jsx)("div", { className: "error", children: o })
              : (0, we.jsx)(Ce(), {
                  className: "webcam",
                  audio: !1,
                  ref: e,
                  screenshotFormat: "image/jpeg",
                  videoConstraints: {
                    facingMode:
                      window.innerWidth < 768
                        ? { exact: "environment" }
                        : "user",
                  },
                }),
            (0, we.jsx)("div", {
              children: n.map((e, t) => (0, we.jsx)("p", { children: e }, t)),
            }),
          ],
        });
      };
      const Ee = function () {
        const e = Z();
        return (0, we.jsxs)("div", {
          className: "InstructorHome",
          children: [
            (0, we.jsx)("button", {
              className: "InstructorHome_TakeAttendance",
              onClick: () => e("/InstructorAttendance"),
              children: "Take Attendance",
            }),
            (0, we.jsx)("button", {
              className: "InstructorHome_Back",
              onClick: () => e("/"),
              children: "Back",
            }),
          ],
        });
      };
      var Me = n(970);
      const Ne = function () {
        const e = Z(),
          [n, r] = (0, t.useState)(""),
          o = (0, t.useRef)();
        return (
          (0, t.useEffect)(() => {
            o.current &&
              n &&
              Me.toCanvas(o.current, n, (e) => {
                e && console.error(e);
              });
          }, [n]),
          (0, we.jsxs)("div", {
            className: "InstructorAttendance",
            children: [
              (0, we.jsx)("canvas", { id: "qrcode", ref: o }),
              (0, we.jsx)("input", {
                id: "text",
                type: "text",
                value: n,
                onChange: (e) => {
                  r(e.target.value);
                },
                onKeyDown: (e) => {
                  13 === e.keyCode && r(e.target.value);
                },
              }),
              (0, we.jsx)("button", {
                className: "InstructorAttendance_Done",
                onClick: () => e("/InstructorHome"),
                children: "Cancel",
              }),
            ],
          })
        );
      };
      !(async function () {
        try {
          const e = await fetch("http://10.100.178.140:5000/items");
          if (!e.ok)
            throw new Error("Network response was not ok " + e.statusText);
          const t = await e.json();
          console.log(t);
        } catch (e) {
          console.error("There was a problem with the fetch operation:", e);
        }
      })();
      const _e = function () {
        const e = Z(),
          [n, r] = (0, t.useState)("tokens from ZKP"),
          [o, a] = (0, t.useState)("");
        return (0, we.jsxs)("div", {
          className: "InstructorDone",
          children: [
            (0, we.jsx)("button", {
              className: "InstructorDone_Copy",
              onClick: async () => {
                try {
                  await navigator.clipboard.writeText(n), a("Text copied!");
                } catch (e) {
                  a("Failed to copy text.");
                }
              },
              children: "Copy Tokens to Clipboard",
            }),
            (0, we.jsx)("p", { children: o }),
            " ",
            (0, we.jsx)("button", {
              className: "InstructorDone_Back",
              onClick: () => e("/"),
              children: "Done",
            }),
          ],
        });
      };
      const Le = function () {
        return (0, we.jsx)(ve, {
          children: (0, we.jsxs)(he, {
            children: [
              (0, we.jsx)(fe, { path: "/", element: (0, we.jsx)(be, {}) }),
              (0, we.jsx)(fe, {
                path: "/InstructorHome",
                element: (0, we.jsx)(Ee, {}),
              }),
              (0, we.jsx)(fe, {
                path: "/StudentHome",
                element: (0, we.jsx)(xe, {}),
              }),
              (0, we.jsx)(fe, {
                path: "/InstructorAttendance",
                element: (0, we.jsx)(Ne, {}),
              }),
              (0, we.jsx)(fe, {
                path: "/InstructorDone",
                element: (0, we.jsx)(_e, {}),
              }),
            ],
          }),
        });
      };
      o.createRoot(document.getElementById("root")).render(
        (0, we.jsx)(t.StrictMode, { children: (0, we.jsx)(Le, {}) })
      );
    })();
})();
//# sourceMappingURL=main.dc535cb0.js.map
