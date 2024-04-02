!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.rive = e())
    : (t.rive = e());
})(this, () =>
  (() => {
    "use strict";
    var t = [
        ,
        (t, e, n) => {
          var a;
          n.r(e), n.d(e, { default: () => r });
          const r =
            ((a =
              "undefined" != typeof document && document.currentScript
                ? document.currentScript.src
                : void 0),
            function (t = {}) {
              var e,
                n,
                r = t;
              function i() {
                function t(t) {
                  const i = a;
                  (n = e = 0),
                    (a = new Map()),
                    i.forEach((e) => {
                      try {
                        e(t);
                      } catch (t) {
                        console.error(t);
                      }
                    }),
                    this.fb(),
                    r && r.Db();
                }
                let e = 0,
                  n = 0,
                  a = new Map(),
                  r = null,
                  i = null;
                (this.requestAnimationFrame = function (r) {
                  e || (e = requestAnimationFrame(t.bind(this)));
                  const i = ++n;
                  return a.set(i, r), i;
                }),
                  (this.cancelAnimationFrame = function (t) {
                    a.delete(t),
                      e && 0 == a.size && (cancelAnimationFrame(e), (e = 0));
                  }),
                  (this.Bb = function (t) {
                    i && (document.body.remove(i), (i = null)),
                      t ||
                        ((i = document.createElement("div")),
                        (i.style.backgroundColor = "black"),
                        (i.style.position = "fixed"),
                        (i.style.right = 0),
                        (i.style.top = 0),
                        (i.style.color = "white"),
                        (i.style.padding = "4px"),
                        (i.innerHTML = "RIVE FPS"),
                        (t = function (t) {
                          i.innerHTML = "RIVE FPS " + t.toFixed(1);
                        }),
                        document.body.appendChild(i)),
                      (r = new (function () {
                        let e = 0,
                          n = 0;
                        this.Db = function () {
                          var a = performance.now();
                          n
                            ? (++e,
                              1e3 < (a -= n) && (t((1e3 * e) / a), (e = n = 0)))
                            : ((n = a), (e = 0));
                        };
                      })());
                  }),
                  (this.yb = function () {
                    i && (document.body.remove(i), (i = null)), (r = null);
                  }),
                  (this.fb = function () {});
              }
              function o(t) {
                console.assert(!0);
                const e = new Map();
                let n = -1 / 0;
                this.push = function (a) {
                  return (
                    (a = (a + ((1 << t) - 1)) >> t),
                    e.has(a) && clearTimeout(e.get(a)),
                    e.set(
                      a,
                      setTimeout(function () {
                        e.delete(a),
                          0 == e.length
                            ? (n = -1 / 0)
                            : a == n &&
                              ((n = Math.max(...e.keys())),
                              console.assert(n < a));
                      }, 1e3)
                    ),
                    (n = Math.max(a, n)),
                    n << t
                  );
                };
              }
              r.ready = new Promise((t, a) => {
                (e = t), (n = a);
              });
              const s =
                  "createConicGradient createImageData createLinearGradient createPattern createRadialGradient getContextAttributes getImageData getLineDash getTransform isContextLost isPointInPath isPointInStroke measureText".split(
                    " "
                  ),
                u = new (function () {
                  function t() {
                    if (!e) {
                      var t = document.createElement("canvas"),
                        o = {
                          alpha: 1,
                          depth: 0,
                          stencil: 0,
                          antialias: 0,
                          premultipliedAlpha: 1,
                          preserveDrawingBuffer: 0,
                          preferLowPowerToHighPerformance: 0,
                          failIfMajorPerformanceCaveat: 0,
                          enableExtensionsByDefault: 1,
                          explicitSwapControl: 1,
                          renderViaOffscreenBackBuffer: 1,
                        };
                      let s = t.getContext("webgl2", o);
                      if (s) n = 2;
                      else {
                        if (!(s = t.getContext("webgl", o)))
                          return (
                            console.log(
                              "No WebGL support. Image mesh will not be drawn."
                            ),
                            !1
                          );
                        n = 1;
                      }
                      function u(t, e, n) {
                        if (
                          ((e = s.createShader(e)),
                          s.shaderSource(e, n),
                          s.compileShader(e),
                          0 < (n = s.getShaderInfoLog(e)).length)
                        )
                          throw n;
                        s.attachShader(t, e);
                      }
                      if (
                        ((a = Math.min(
                          s.getParameter(s.MAX_RENDERBUFFER_SIZE),
                          s.getParameter(s.MAX_TEXTURE_SIZE)
                        )),
                        u(
                          (t = s.createProgram()),
                          s.VERTEX_SHADER,
                          "attribute vec2 vertex;\n                attribute vec2 uv;\n                uniform vec4 mat;\n                uniform vec2 translate;\n                varying vec2 st;\n                void main() {\n                    st = uv;\n                    gl_Position = vec4(mat2(mat) * vertex + translate, 0, 1);\n                }"
                        ),
                        u(
                          t,
                          s.FRAGMENT_SHADER,
                          "precision highp float;\n                uniform sampler2D image;\n                varying vec2 st;\n                void main() {\n                    gl_FragColor = texture2D(image, st);\n                }"
                        ),
                        s.bindAttribLocation(t, 0, "vertex"),
                        s.bindAttribLocation(t, 1, "uv"),
                        s.linkProgram(t),
                        0 < (o = s.getProgramInfoLog(t)).trim().length)
                      )
                        throw o;
                      (r = s.getUniformLocation(t, "mat")),
                        (i = s.getUniformLocation(t, "translate")),
                        s.useProgram(t),
                        s.bindBuffer(s.ARRAY_BUFFER, s.createBuffer()),
                        s.enableVertexAttribArray(0),
                        s.enableVertexAttribArray(1),
                        s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, s.createBuffer()),
                        s.uniform1i(s.getUniformLocation(t, "image"), 0),
                        s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
                        (e = s);
                    }
                    return !0;
                  }
                  let e = null,
                    n = 0,
                    a = 0,
                    r = null,
                    i = null,
                    s = 0,
                    u = 0;
                  (this.Mb = function () {
                    return t(), a;
                  }),
                    (this.vb = function (a) {
                      if (!t()) return null;
                      const r = e.createTexture();
                      return (
                        e.bindTexture(e.TEXTURE_2D, r),
                        e.texImage2D(
                          e.TEXTURE_2D,
                          0,
                          e.RGBA,
                          e.RGBA,
                          e.UNSIGNED_BYTE,
                          a
                        ),
                        e.texParameteri(
                          e.TEXTURE_2D,
                          e.TEXTURE_WRAP_S,
                          e.CLAMP_TO_EDGE
                        ),
                        e.texParameteri(
                          e.TEXTURE_2D,
                          e.TEXTURE_WRAP_T,
                          e.CLAMP_TO_EDGE
                        ),
                        e.texParameteri(
                          e.TEXTURE_2D,
                          e.TEXTURE_MAG_FILTER,
                          e.LINEAR
                        ),
                        2 == n
                          ? (e.texParameteri(
                              e.TEXTURE_2D,
                              e.TEXTURE_MIN_FILTER,
                              e.LINEAR_MIPMAP_LINEAR
                            ),
                            e.generateMipmap(e.TEXTURE_2D))
                          : e.texParameteri(
                              e.TEXTURE_2D,
                              e.TEXTURE_MIN_FILTER,
                              e.LINEAR
                            ),
                        r
                      );
                    });
                  const c = new o(8),
                    l = new o(8),
                    h = new o(10),
                    f = new o(10);
                  (this.Ab = function (n, a, o, d, p) {
                    if (t()) {
                      var m = c.push(n),
                        v = l.push(a);
                      for (var g of ((e.canvas.width == m &&
                        e.canvas.height == v) ||
                        ((e.canvas.width = m), (e.canvas.height = v)),
                      e.viewport(0, v - a, n, a),
                      e.disable(e.SCISSOR_TEST),
                      e.clearColor(0, 0, 0, 0),
                      e.clear(e.COLOR_BUFFER_BIT),
                      e.enable(e.SCISSOR_TEST),
                      o.sort((t, e) => e.jb - t.jb),
                      (m = h.push(d)),
                      s != m &&
                        (e.bufferData(e.ARRAY_BUFFER, 8 * m, e.DYNAMIC_DRAW),
                        (s = m)),
                      (m = 0),
                      o))
                        e.bufferSubData(e.ARRAY_BUFFER, m, g.Ra),
                          (m += 4 * g.Ra.length);
                      for (var b of (console.assert(m == 4 * d), o))
                        e.bufferSubData(e.ARRAY_BUFFER, m, b.mb),
                          (m += 4 * b.mb.length);
                      for (var y of (console.assert(m == 8 * d),
                      (m = f.push(p)),
                      u != m &&
                        (e.bufferData(
                          e.ELEMENT_ARRAY_BUFFER,
                          2 * m,
                          e.DYNAMIC_DRAW
                        ),
                        (u = m)),
                      (g = 0),
                      o))
                        e.bufferSubData(e.ELEMENT_ARRAY_BUFFER, g, y.indices),
                          (g += 2 * y.indices.length);
                      console.assert(g == 2 * p),
                        (y = 0),
                        (b = !0),
                        (m = g = 0);
                      for (const t of o) {
                        t.image.Ma != y &&
                          (e.bindTexture(e.TEXTURE_2D, t.image.rb || null),
                          (y = t.image.Ma)),
                          t.Pb
                            ? (e.scissor(t.Va, v - t.Wa - t.cb, t.$b, t.cb),
                              (b = !0))
                            : b && (e.scissor(0, v - a, n, a), (b = !1)),
                          (o = 2 / n);
                        const s = -2 / a;
                        e.uniform4f(
                          r,
                          t.xa[0] * o * t.Ga,
                          t.xa[1] * s * t.Ha,
                          t.xa[2] * o * t.Ga,
                          t.xa[3] * s * t.Ha
                        ),
                          e.uniform2f(
                            i,
                            t.xa[4] * o * t.Ga + o * (t.Va - t.Nb * t.Ga) - 1,
                            t.xa[5] * s * t.Ha + s * (t.Wa - t.Ob * t.Ha) + 1
                          ),
                          e.vertexAttribPointer(0, 2, e.FLOAT, !1, 0, m),
                          e.vertexAttribPointer(
                            1,
                            2,
                            e.FLOAT,
                            !1,
                            0,
                            m + 4 * d
                          ),
                          e.drawElements(
                            e.TRIANGLES,
                            t.indices.length,
                            e.UNSIGNED_SHORT,
                            g
                          ),
                          (m += 4 * t.Ra.length),
                          (g += 2 * t.indices.length);
                      }
                      console.assert(m == 4 * d), console.assert(g == 2 * p);
                    }
                  }),
                    (this.canvas = function () {
                      return t() && e.canvas;
                    });
                })(),
                c = r.onRuntimeInitialized;
              r.onRuntimeInitialized = function () {
                function t(t) {
                  switch (t) {
                    case p.srcOver:
                      return "source-over";
                    case p.screen:
                      return "screen";
                    case p.overlay:
                      return "overlay";
                    case p.darken:
                      return "darken";
                    case p.lighten:
                      return "lighten";
                    case p.colorDodge:
                      return "color-dodge";
                    case p.colorBurn:
                      return "color-burn";
                    case p.hardLight:
                      return "hard-light";
                    case p.softLight:
                      return "soft-light";
                    case p.difference:
                      return "difference";
                    case p.exclusion:
                      return "exclusion";
                    case p.multiply:
                      return "multiply";
                    case p.hue:
                      return "hue";
                    case p.saturation:
                      return "saturation";
                    case p.color:
                      return "color";
                    case p.luminosity:
                      return "luminosity";
                  }
                }
                function e(t) {
                  return (
                    "rgba(" +
                    ((16711680 & t) >>> 16) +
                    "," +
                    ((65280 & t) >>> 8) +
                    "," +
                    ((255 & t) >>> 0) +
                    "," +
                    ((4278190080 & t) >>> 24) / 255 +
                    ")"
                  );
                }
                function n() {
                  0 < C.length &&
                    (u.Ab(T.drawWidth(), T.drawHeight(), C, P, E),
                    (C = []),
                    (E = P = 0),
                    T.reset(512, 512));
                  for (const t of R) {
                    for (const e of t.ja) e();
                    t.ja = [];
                  }
                  R.clear();
                }
                c && c();
                var a = r.RenderPaintStyle;
                const o = r.RenderPath,
                  l = r.RenderPaint,
                  h = r.Renderer,
                  f = r.StrokeCap,
                  d = r.StrokeJoin,
                  p = r.BlendMode,
                  m = a.fill,
                  v = a.stroke,
                  g = r.FillRule.evenOdd;
                let b = 1;
                var y = r.RenderImage.extend("CanvasRenderImage", {
                    __construct: function ({ Aa: t, Fa: e } = {}) {
                      this.__parent.__construct.call(this),
                        (this.Ma = b),
                        (b = (b + 1) & 2147483647 || 1),
                        (this.Aa = t),
                        (this.Fa = e);
                    },
                    decode: function (t) {
                      var e = this;
                      e.Fa && e.Fa(e);
                      var n = new Image();
                      (n.src = URL.createObjectURL(
                        new Blob([t], { type: "image/png" })
                      )),
                        (n.onload = function () {
                          (e.ob = n),
                            (e.rb = u.vb(n)),
                            e.size(n.width, n.height),
                            e.Aa && e.Aa(e);
                        });
                    },
                  }),
                  w = o.extend("CanvasRenderPath", {
                    __construct: function () {
                      this.__parent.__construct.call(this),
                        (this.pa = new Path2D());
                    },
                    rewind: function () {
                      this.pa = new Path2D();
                    },
                    addPath: function (t, e, n, a, r, i, o) {
                      var s = this.pa,
                        u = s.addPath;
                      t = t.pa;
                      const c = new DOMMatrix();
                      (c.a = e),
                        (c.b = n),
                        (c.c = a),
                        (c.d = r),
                        (c.e = i),
                        (c.f = o),
                        u.call(s, t, c);
                    },
                    fillRule: function (t) {
                      this.Ta = t;
                    },
                    moveTo: function (t, e) {
                      this.pa.moveTo(t, e);
                    },
                    lineTo: function (t, e) {
                      this.pa.lineTo(t, e);
                    },
                    cubicTo: function (t, e, n, a, r, i) {
                      this.pa.bezierCurveTo(t, e, n, a, r, i);
                    },
                    close: function () {
                      this.pa.closePath();
                    },
                  }),
                  A = l.extend("CanvasRenderPaint", {
                    color: function (t) {
                      this.Ua = e(t);
                    },
                    thickness: function (t) {
                      this.sb = t;
                    },
                    join: function (t) {
                      switch (t) {
                        case d.miter:
                          this.La = "miter";
                          break;
                        case d.round:
                          this.La = "round";
                          break;
                        case d.bevel:
                          this.La = "bevel";
                      }
                    },
                    cap: function (t) {
                      switch (t) {
                        case f.butt:
                          this.Ka = "butt";
                          break;
                        case f.round:
                          this.Ka = "round";
                          break;
                        case f.square:
                          this.Ka = "square";
                      }
                    },
                    style: function (t) {
                      this.qb = t;
                    },
                    blendMode: function (e) {
                      this.nb = t(e);
                    },
                    clearGradient: function () {
                      this.za = null;
                    },
                    linearGradient: function (t, e, n, a) {
                      this.za = { kb: t, lb: e, Za: n, $a: a, Pa: [] };
                    },
                    radialGradient: function (t, e, n, a) {
                      this.za = { kb: t, lb: e, Za: n, $a: a, Pa: [], Kb: !0 };
                    },
                    addStop: function (t, e) {
                      this.za.Pa.push({ color: t, stop: e });
                    },
                    completeGradient: function () {},
                    draw: function (t, n, a) {
                      let r = this.qb;
                      var i = this.Ua,
                        o = this.za;
                      if (((t.globalCompositeOperation = this.nb), null != o)) {
                        i = o.kb;
                        var s = o.lb;
                        const n = o.Za;
                        var u = o.$a;
                        const a = o.Pa;
                        o.Kb
                          ? ((o = n - i),
                            (u -= s),
                            (i = t.createRadialGradient(
                              i,
                              s,
                              0,
                              i,
                              s,
                              Math.sqrt(o * o + u * u)
                            )))
                          : (i = t.createLinearGradient(i, s, n, u));
                        for (let t = 0, n = a.length; t < n; t++)
                          (s = a[t]), i.addColorStop(s.stop, e(s.color));
                        (this.Ua = i), (this.za = null);
                      }
                      switch (r) {
                        case v:
                          (t.strokeStyle = i),
                            (t.lineWidth = this.sb),
                            (t.lineCap = this.Ka),
                            (t.lineJoin = this.La),
                            t.stroke(n);
                          break;
                        case m:
                          (t.fillStyle = i), t.fill(n, a);
                      }
                    },
                  });
                const R = new Set();
                let T = null,
                  C = [],
                  P = 0,
                  E = 0;
                var M = (r.CanvasRenderer = h.extend("Renderer", {
                  __construct: function (t) {
                    this.__parent.__construct.call(this),
                      (this.oa = [1, 0, 0, 1, 0, 0]),
                      (this.ha = t.getContext("2d")),
                      (this.Sa = t),
                      (this.ja = []);
                  },
                  save: function () {
                    this.oa.push(...this.oa.slice(this.oa.length - 6)),
                      this.ja.push(this.ha.save.bind(this.ha));
                  },
                  restore: function () {
                    const t = this.oa.length - 6;
                    if (6 > t)
                      throw "restore() called without matching save().";
                    this.oa.splice(t),
                      this.ja.push(this.ha.restore.bind(this.ha));
                  },
                  transform: function (t, e, n, a, r, i) {
                    const o = this.oa,
                      s = o.length - 6;
                    o.splice(
                      s,
                      6,
                      o[s] * t + o[s + 2] * e,
                      o[s + 1] * t + o[s + 3] * e,
                      o[s] * n + o[s + 2] * a,
                      o[s + 1] * n + o[s + 3] * a,
                      o[s] * r + o[s + 2] * i + o[s + 4],
                      o[s + 1] * r + o[s + 3] * i + o[s + 5]
                    ),
                      this.ja.push(
                        this.ha.transform.bind(this.ha, t, e, n, a, r, i)
                      );
                  },
                  rotate: function (t) {
                    const e = Math.sin(t);
                    (t = Math.cos(t)), this.transform(t, e, -e, t, 0, 0);
                  },
                  _drawPath: function (t, e) {
                    this.ja.push(
                      e.draw.bind(
                        e,
                        this.ha,
                        t.pa,
                        t.Ta === g ? "evenodd" : "nonzero"
                      )
                    );
                  },
                  _drawRiveImage: function (e, n, a) {
                    var r = e.ob;
                    if (r) {
                      var i = this.ha,
                        o = t(n);
                      this.ja.push(function () {
                        (i.globalCompositeOperation = o),
                          (i.globalAlpha = a),
                          i.drawImage(r, 0, 0),
                          (i.globalAlpha = 1);
                      });
                    }
                  },
                  _getMatrix: function (t) {
                    const e = this.oa,
                      n = e.length - 6;
                    for (let a = 0; 6 > a; ++a) t[a] = e[n + a];
                  },
                  _drawImageMesh: function (e, a, i, o, s, c, l, h, f, d) {
                    var p = this.ha.canvas.width,
                      m = this.ha.canvas.height;
                    const v = f - l,
                      g = d - h;
                    (l = Math.max(l, 0)),
                      (h = Math.max(h, 0)),
                      (f = Math.min(f, p)),
                      (d = Math.min(d, m));
                    const b = f - l,
                      y = d - h;
                    if (
                      (console.assert(b <= Math.min(v, p)),
                      console.assert(y <= Math.min(g, m)),
                      !(0 >= b || 0 >= y))
                    ) {
                      (f = b < v || y < g), (p = d = 1);
                      var w = Math.ceil(b * d),
                        A = Math.ceil(y * p);
                      (m = u.Mb()),
                        w > m && ((d *= m / w), (w = m)),
                        A > m && ((p *= m / A), (A = m)),
                        T ||
                          ((T = new r.DynamicRectanizer(m)), T.reset(512, 512)),
                        0 > (m = T.addRect(w, A)) &&
                          (n(),
                          R.add(this),
                          (m = T.addRect(w, A)),
                          console.assert(0 <= m));
                      var M = 65535 & m,
                        L = m >> 16;
                      C.push({
                        xa: this.oa.slice(this.oa.length - 6),
                        image: e,
                        Va: M,
                        Wa: L,
                        Nb: l,
                        Ob: h,
                        $b: w,
                        cb: A,
                        Ga: d,
                        Ha: p,
                        Ra: new Float32Array(o),
                        mb: new Float32Array(s),
                        indices: new Uint16Array(c),
                        Pb: f,
                        jb: (e.Ma << 1) | (f ? 1 : 0),
                      }),
                        (P += o.length),
                        (E += c.length);
                      var F = this.ha,
                        _ = t(a);
                      this.ja.push(function () {
                        F.save(),
                          F.resetTransform(),
                          (F.globalCompositeOperation = _),
                          (F.globalAlpha = i),
                          F.drawImage(u.canvas(), M, L, w, A, l, h, b, y),
                          F.restore();
                      });
                    }
                  },
                  _clipPath: function (t) {
                    this.ja.push(
                      this.ha.clip.bind(
                        this.ha,
                        t.pa,
                        t.Ta === g ? "evenodd" : "nonzero"
                      )
                    );
                  },
                  clear: function () {
                    R.add(this),
                      this.ja.push(
                        this.ha.clearRect.bind(
                          this.ha,
                          0,
                          0,
                          this.Sa.width,
                          this.Sa.height
                        )
                      );
                  },
                  flush: function () {},
                  translate: function (t, e) {
                    this.transform(1, 0, 0, 1, t, e);
                  },
                }));
                (r.makeRenderer = function (t) {
                  const e = new M(t),
                    n = e.ha;
                  return new Proxy(e, {
                    get(t, a) {
                      if ("function" == typeof t[a])
                        return function (...e) {
                          return t[a].apply(t, e);
                        };
                      if ("function" == typeof n[a]) {
                        if (-1 < s.indexOf(a))
                          throw Error(
                            "RiveException: Method call to '" +
                              a +
                              "()' is not allowed, as the renderer cannot immediately pass through the return                 values of any canvas 2d context methods."
                          );
                        return function (...t) {
                          e.ja.push(n[a].bind(n, ...t));
                        };
                      }
                      return t[a];
                    },
                    set(t, e, a) {
                      if (e in n) return (n[e] = a), !0;
                    },
                  });
                }),
                  (r.decodeImage = function (t, e) {
                    new y({ Aa: e }).decode(t);
                  }),
                  (r.renderFactory = {
                    makeRenderPaint: function () {
                      return new A();
                    },
                    makeRenderPath: function () {
                      return new w();
                    },
                    makeRenderImage: function () {
                      let t = F;
                      return new y({
                        Fa: () => {
                          t.total++;
                        },
                        Aa: () => {
                          if ((t.loaded++, t.loaded === t.total)) {
                            const e = t.ready;
                            e && (e(), (t.ready = null));
                          }
                        },
                      });
                    },
                  });
                let L = r.load,
                  F = null;
                (r.load = function (t, e, n = !0) {
                  const a = new r.FallbackFileAssetLoader();
                  return (
                    void 0 !== e && a.addLoader(e),
                    n && ((e = new r.CDNFileAssetLoader()), a.addLoader(e)),
                    new Promise(function (e) {
                      let n = null;
                      (F = {
                        total: 0,
                        loaded: 0,
                        ready: function () {
                          e(n);
                        },
                      }),
                        (n = L(t, a)),
                        0 == F.total && e(n);
                    })
                  );
                }),
                  (a = new i()),
                  (r.requestAnimationFrame = a.requestAnimationFrame.bind(a)),
                  (r.cancelAnimationFrame = a.cancelAnimationFrame.bind(a)),
                  (r.enableFPSCounter = a.Bb.bind(a)),
                  (r.disableFPSCounter = a.yb),
                  (a.fb = n),
                  (r.cleanup = function () {
                    T && T.delete();
                  });
              };
              const l = r.onRuntimeInitialized;
              r.onRuntimeInitialized = function () {
                l && l();
                let t = r.decodeFont;
                r.decodeFont = function (e, n) {
                  n((e = t(e)));
                };
                const e = r.FileAssetLoader;
                (r.ptrToAsset = (t) => {
                  let e = r.ptrToFileAsset(t);
                  return e.isImage
                    ? r.ptrToImageAsset(t)
                    : e.isFont
                    ? r.ptrToFontAsset(t)
                    : e;
                }),
                  (r.CustomFileAssetLoader = e.extend("CustomFileAssetLoader", {
                    __construct: function ({ loadContents: t }) {
                      this.__parent.__construct.call(this), (this.pb = t);
                    },
                    loadContents: function (t, e) {
                      return (t = r.ptrToAsset(t)), this.pb(t, e);
                    },
                  })),
                  (r.CDNFileAssetLoader = e.extend("CDNFileAssetLoader", {
                    __construct: function () {
                      this.__parent.__construct.call(this);
                    },
                    loadContents: function (t) {
                      let e = r.ptrToAsset(t);
                      return (
                        "" !== (t = e.cdnUuid) &&
                        ((n = e.cdnBaseUrl + "/" + t),
                        ((a = new XMLHttpRequest()).responseType =
                          "arraybuffer"),
                        (a.onreadystatechange = function () {
                          4 == a.readyState &&
                            200 == a.status &&
                            ((t) => {
                              e.decode(new Uint8Array(t.response));
                            })(a);
                        }),
                        a.open("GET", n, !0),
                        a.send(null),
                        !0)
                      );
                      var n, a;
                    },
                  })),
                  (r.FallbackFileAssetLoader = e.extend(
                    "FallbackFileAssetLoader",
                    {
                      __construct: function () {
                        this.__parent.__construct.call(this), (this.eb = []);
                      },
                      addLoader: function (t) {
                        this.eb.push(t);
                      },
                      loadContents: function (t, e) {
                        for (let n of this.eb)
                          if (n.loadContents(t, e)) return !0;
                        return !1;
                      },
                    }
                  ));
              };
              var h,
                f,
                d = Object.assign({}, r),
                p = "./this.program",
                m = "object" == typeof window,
                v = "function" == typeof importScripts,
                g = "";
              (m || v) &&
                (v
                  ? (g = self.location.href)
                  : "undefined" != typeof document &&
                    document.currentScript &&
                    (g = document.currentScript.src),
                a && (g = a),
                (g =
                  0 !== g.indexOf("blob:")
                    ? g.substr(0, g.replace(/[?#].*/, "").lastIndexOf("/") + 1)
                    : ""),
                v &&
                  (f = (t) => {
                    var e = new XMLHttpRequest();
                    return (
                      e.open("GET", t, !1),
                      (e.responseType = "arraybuffer"),
                      e.send(null),
                      new Uint8Array(e.response)
                    );
                  }),
                (h = (t, e, n) => {
                  var a = new XMLHttpRequest();
                  a.open("GET", t, !0),
                    (a.responseType = "arraybuffer"),
                    (a.onload = () => {
                      200 == a.status || (0 == a.status && a.response)
                        ? e(a.response)
                        : n();
                    }),
                    (a.onerror = n),
                    a.send(null);
                }));
              var b,
                y = r.print || console.log.bind(console),
                w = r.printErr || console.error.bind(console);
              Object.assign(r, d),
                (d = null),
                r.thisProgram && (p = r.thisProgram),
                r.wasmBinary && (b = r.wasmBinary),
                r.noExitRuntime,
                "object" != typeof WebAssembly &&
                  Y("no native wasm support detected");
              var A,
                R,
                T,
                C,
                P,
                E,
                M,
                L,
                F,
                _,
                S = !1;
              function x() {
                var t = A.buffer;
                (r.HEAP8 = T = new Int8Array(t)),
                  (r.HEAP16 = P = new Int16Array(t)),
                  (r.HEAP32 = M = new Int32Array(t)),
                  (r.HEAPU8 = C = new Uint8Array(t)),
                  (r.HEAPU16 = E = new Uint16Array(t)),
                  (r.HEAPU32 = L = new Uint32Array(t)),
                  (r.HEAPF32 = F = new Float32Array(t)),
                  (r.HEAPF64 = _ = new Float64Array(t));
              }
              var I,
                O = [],
                k = [],
                j = [];
              function D() {
                var t = r.preRun.shift();
                O.unshift(t);
              }
              var U,
                W = 0,
                $ = null,
                B = null;
              function Y(t) {
                throw (
                  (r.onAbort && r.onAbort(t),
                  w((t = "Aborted(" + t + ")")),
                  (S = !0),
                  (t = new WebAssembly.RuntimeError(
                    t + ". Build with -sASSERTIONS for more info."
                  )),
                  n(t),
                  t)
                );
              }
              function N(t) {
                return t.startsWith("data:application/octet-stream;base64,");
              }
              if (!N((U = "canvas_advanced.wasm"))) {
                var X = U;
                U = r.locateFile ? r.locateFile(X, g) : g + X;
              }
              function H(t) {
                if (t == U && b) return new Uint8Array(b);
                if (f) return f(t);
                throw "both async and sync fetching of the wasm failed";
              }
              function q(t, e, n) {
                return (function (t) {
                  if (!b && (m || v)) {
                    if ("function" == typeof fetch && !t.startsWith("file://"))
                      return fetch(t, { credentials: "same-origin" })
                        .then((e) => {
                          if (!e.ok)
                            throw (
                              "failed to load wasm binary file at '" + t + "'"
                            );
                          return e.arrayBuffer();
                        })
                        .catch(() => H(t));
                    if (h)
                      return new Promise((e, n) => {
                        h(t, (t) => e(new Uint8Array(t)), n);
                      });
                  }
                  return Promise.resolve().then(() => H(t));
                })(t)
                  .then((t) => WebAssembly.instantiate(t, e))
                  .then((t) => t)
                  .then(n, (t) => {
                    w("failed to asynchronously prepare wasm: " + t), Y(t);
                  });
              }
              var z = (t) => {
                for (; 0 < t.length; ) t.shift()(r);
              };
              function V(t) {
                if (void 0 === t) return "_unknown";
                var e = (t = t.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
                return 48 <= e && 57 >= e ? `_${t}` : t;
              }
              function G(t, e) {
                return {
                  [(t = V(t))]: function () {
                    return e.apply(this, arguments);
                  },
                }[t];
              }
              function Q() {
                (this.qa = [void 0]), (this.bb = []);
              }
              var J = new Q(),
                K = void 0;
              function Z(t) {
                throw new K(t);
              }
              var tt = (t) => (
                  t || Z("Cannot use deleted val. handle = " + t),
                  J.get(t).value
                ),
                et = (t) => {
                  switch (t) {
                    case void 0:
                      return 1;
                    case null:
                      return 2;
                    case !0:
                      return 3;
                    case !1:
                      return 4;
                    default:
                      return J.tb({ ib: 1, value: t });
                  }
                };
              function nt(t) {
                var e = Error,
                  n = G(t, function (e) {
                    (this.name = t),
                      (this.message = e),
                      void 0 !== (e = Error(e).stack) &&
                        (this.stack =
                          this.toString() +
                          "\n" +
                          e.replace(/^Error(:[^\n]*)?\n/, ""));
                  });
                return (
                  (n.prototype = Object.create(e.prototype)),
                  (n.prototype.constructor = n),
                  (n.prototype.toString = function () {
                    return void 0 === this.message
                      ? this.name
                      : `${this.name}: ${this.message}`;
                  }),
                  n
                );
              }
              var at = void 0,
                rt = void 0;
              function it(t) {
                for (var e = ""; C[t]; ) e += rt[C[t++]];
                return e;
              }
              var ot = [];
              function st() {
                for (; ot.length; ) {
                  var t = ot.pop();
                  (t.ba.wa = !1), t.delete();
                }
              }
              var ut = void 0,
                ct = {};
              function lt(t, e) {
                for (void 0 === e && Z("ptr should not be undefined"); t.fa; )
                  (e = t.Ba(e)), (t = t.fa);
                return e;
              }
              var ht = {};
              function ft(t) {
                var e = it((t = Le(t)));
                return Ee(t), e;
              }
              function dt(t, e) {
                var n = ht[t];
                return void 0 === n && Z(e + " has unknown type " + ft(t)), n;
              }
              function pt() {}
              var mt = !1;
              function vt(t) {
                --t.count.value,
                  0 === t.count.value &&
                    (t.ia ? t.la.ra(t.ia) : t.ea.ca.ra(t.da));
              }
              function gt(t, e, n) {
                return e === n
                  ? t
                  : void 0 === n.fa || null === (t = gt(t, e, n.fa))
                  ? null
                  : n.zb(t);
              }
              var bt = {},
                yt = void 0;
              function wt(t) {
                throw new yt(t);
              }
              function At(t, e) {
                return (
                  (e.ea && e.da) ||
                    wt("makeClassHandle requires ptr and ptrType"),
                  !!e.la != !!e.ia &&
                    wt("Both smartPtrType and smartPtr must be specified"),
                  (e.count = { value: 1 }),
                  Rt(Object.create(t, { ba: { value: e } }))
                );
              }
              function Rt(t) {
                return "undefined" == typeof FinalizationRegistry
                  ? ((Rt = (t) => t), t)
                  : ((mt = new FinalizationRegistry((t) => {
                      vt(t.ba);
                    })),
                    (pt = (t) => {
                      mt.unregister(t);
                    }),
                    (Rt = (t) => {
                      var e = t.ba;
                      return e.ia && mt.register(t, { ba: e }, t), t;
                    })(t));
              }
              var Tt = {};
              function Ct(t) {
                for (; t.length; ) {
                  var e = t.pop();
                  t.pop()(e);
                }
              }
              function Pt(t) {
                return this.fromWireType(M[t >> 2]);
              }
              var Et = {},
                Mt = {};
              function Lt(t, e, n) {
                function a(e) {
                  (e = n(e)).length !== t.length &&
                    wt("Mismatched type converter count");
                  for (var a = 0; a < t.length; ++a) _t(t[a], e[a]);
                }
                t.forEach(function (t) {
                  Mt[t] = e;
                });
                var r = Array(e.length),
                  i = [],
                  o = 0;
                e.forEach((t, e) => {
                  ht.hasOwnProperty(t)
                    ? (r[e] = ht[t])
                    : (i.push(t),
                      Et.hasOwnProperty(t) || (Et[t] = []),
                      Et[t].push(() => {
                        (r[e] = ht[t]), ++o === i.length && a(r);
                      }));
                }),
                  0 === i.length && a(r);
              }
              function Ft(t) {
                switch (t) {
                  case 1:
                    return 0;
                  case 2:
                    return 1;
                  case 4:
                    return 2;
                  case 8:
                    return 3;
                  default:
                    throw new TypeError(`Unknown type size: ${t}`);
                }
              }
              function _t(t, e, n = {}) {
                if (!("argPackAdvance" in e))
                  throw new TypeError(
                    "registerType registeredInstance requires argPackAdvance"
                  );
                !(function (t, e, n = {}) {
                  var a = e.name;
                  if (
                    (t ||
                      Z(
                        `type "${a}" must have a positive integer typeid pointer`
                      ),
                    ht.hasOwnProperty(t))
                  ) {
                    if (n.Jb) return;
                    Z(`Cannot register type '${a}' twice`);
                  }
                  (ht[t] = e),
                    delete Mt[t],
                    Et.hasOwnProperty(t) &&
                      ((e = Et[t]), delete Et[t], e.forEach((t) => t()));
                })(t, e, n);
              }
              function St(t) {
                Z(t.ba.ea.ca.name + " instance already deleted");
              }
              function xt() {}
              function It(t, e, n) {
                if (void 0 === t[e].ga) {
                  var a = t[e];
                  (t[e] = function () {
                    return (
                      t[e].ga.hasOwnProperty(arguments.length) ||
                        Z(
                          `Function '${n}' called with an invalid number of arguments (${arguments.length}) - expects one of (${t[e].ga})!`
                        ),
                      t[e].ga[arguments.length].apply(this, arguments)
                    );
                  }),
                    (t[e].ga = []),
                    (t[e].ga[a.va] = a);
                }
              }
              function Ot(t, e, n) {
                r.hasOwnProperty(t)
                  ? ((void 0 === n ||
                      (void 0 !== r[t].ga && void 0 !== r[t].ga[n])) &&
                      Z(`Cannot register public name '${t}' twice`),
                    It(r, t, t),
                    r.hasOwnProperty(n) &&
                      Z(
                        `Cannot register multiple overloads of a function with the same number of arguments (${n})!`
                      ),
                    (r[t].ga[n] = e))
                  : ((r[t] = e), void 0 !== n && (r[t].ac = n));
              }
              function kt(t, e, n, a, r, i, o, s) {
                (this.name = t),
                  (this.constructor = e),
                  (this.ma = n),
                  (this.ra = a),
                  (this.fa = r),
                  (this.Eb = i),
                  (this.Ba = o),
                  (this.zb = s),
                  (this.gb = []);
              }
              function jt(t, e, n) {
                for (; e !== n; )
                  e.Ba ||
                    Z(
                      `Expected null or instance of ${n.name}, got an instance of ${e.name}`
                    ),
                    (t = e.Ba(t)),
                    (e = e.fa);
                return t;
              }
              function Dt(t, e) {
                return null === e
                  ? (this.Na && Z(`null is not a valid ${this.name}`), 0)
                  : (e.ba || Z(`Cannot pass "${Qt(e)}" as a ${this.name}`),
                    e.ba.da ||
                      Z(
                        `Cannot pass deleted object as a pointer of type ${this.name}`
                      ),
                    jt(e.ba.da, e.ba.ea.ca, this.ca));
              }
              function Ut(t, e) {
                if (null === e) {
                  if (
                    (this.Na && Z(`null is not a valid ${this.name}`), this.Ea)
                  ) {
                    var n = this.Oa();
                    return null !== t && t.push(this.ra, n), n;
                  }
                  return 0;
                }
                if (
                  (e.ba || Z(`Cannot pass "${Qt(e)}" as a ${this.name}`),
                  e.ba.da ||
                    Z(
                      `Cannot pass deleted object as a pointer of type ${this.name}`
                    ),
                  !this.Da &&
                    e.ba.ea.Da &&
                    Z(
                      `Cannot convert argument of type ${
                        e.ba.la ? e.ba.la.name : e.ba.ea.name
                      } to parameter type ${this.name}`
                    ),
                  (n = jt(e.ba.da, e.ba.ea.ca, this.ca)),
                  this.Ea)
                )
                  switch (
                    (void 0 === e.ba.ia &&
                      Z("Passing raw pointer to smart pointer is illegal"),
                    this.Vb)
                  ) {
                    case 0:
                      e.ba.la === this
                        ? (n = e.ba.ia)
                        : Z(
                            `Cannot convert argument of type ${
                              e.ba.la ? e.ba.la.name : e.ba.ea.name
                            } to parameter type ${this.name}`
                          );
                      break;
                    case 1:
                      n = e.ba.ia;
                      break;
                    case 2:
                      if (e.ba.la === this) n = e.ba.ia;
                      else {
                        var a = e.clone();
                        (n = this.Rb(
                          n,
                          et(function () {
                            a.delete();
                          })
                        )),
                          null !== t && t.push(this.ra, n);
                      }
                      break;
                    default:
                      Z("Unsupporting sharing policy");
                  }
                return n;
              }
              function Wt(t, e) {
                return null === e
                  ? (this.Na && Z(`null is not a valid ${this.name}`), 0)
                  : (e.ba || Z(`Cannot pass "${Qt(e)}" as a ${this.name}`),
                    e.ba.da ||
                      Z(
                        `Cannot pass deleted object as a pointer of type ${this.name}`
                      ),
                    e.ba.ea.Da &&
                      Z(
                        `Cannot convert argument of type ${e.ba.ea.name} to parameter type ${this.name}`
                      ),
                    jt(e.ba.da, e.ba.ea.ca, this.ca));
              }
              function $t(t, e, n, a) {
                (this.name = t),
                  (this.ca = e),
                  (this.Na = n),
                  (this.Da = a),
                  (this.Ea = !1),
                  (this.ra =
                    this.Rb =
                    this.Oa =
                    this.hb =
                    this.Vb =
                    this.Qb =
                      void 0),
                  void 0 !== e.fa
                    ? (this.toWireType = Ut)
                    : ((this.toWireType = a ? Dt : Wt), (this.ka = null));
              }
              function Bt(t, e, n) {
                r.hasOwnProperty(t) ||
                  wt("Replacing nonexistant public symbol"),
                  void 0 !== r[t].ga && void 0 !== n
                    ? (r[t].ga[n] = e)
                    : ((r[t] = e), (r[t].va = n));
              }
              function Yt(t, e) {
                var n = (t = it(t)).includes("j")
                  ? ((t, e) => {
                      var n = [];
                      return function () {
                        if (
                          ((n.length = 0),
                          Object.assign(n, arguments),
                          t.includes("j"))
                        ) {
                          var a = r["dynCall_" + t];
                          a =
                            n && n.length
                              ? a.apply(null, [e].concat(n))
                              : a.call(null, e);
                        } else a = I.get(e).apply(null, n);
                        return a;
                      };
                    })(t, e)
                  : I.get(e);
                return (
                  "function" != typeof n &&
                    Z(`unknown function pointer with signature ${t}: ${e}`),
                  n
                );
              }
              var Nt = void 0;
              function Xt(t, e) {
                var n = [],
                  a = {};
                throw (
                  (e.forEach(function t(e) {
                    a[e] ||
                      ht[e] ||
                      (Mt[e] ? Mt[e].forEach(t) : (n.push(e), (a[e] = !0)));
                  }),
                  new Nt(`${t}: ` + n.map(ft).join([", "])))
                );
              }
              function Ht(t, e, n, a, r) {
                var i = e.length;
                2 > i &&
                  Z(
                    "argTypes array size mismatch! Must at least get return value and 'this' types!"
                  );
                var o = null !== e[1] && null !== n,
                  s = !1;
                for (n = 1; n < e.length; ++n)
                  if (null !== e[n] && void 0 === e[n].ka) {
                    s = !0;
                    break;
                  }
                var u = "void" !== e[0].name,
                  c = i - 2,
                  l = Array(c),
                  h = [],
                  f = [];
                return function () {
                  if (
                    (arguments.length !== c &&
                      Z(
                        `function ${t} called with ${arguments.length} arguments, expected ${c} args!`
                      ),
                    (f.length = 0),
                    (h.length = o ? 2 : 1),
                    (h[0] = r),
                    o)
                  ) {
                    var n = e[1].toWireType(f, this);
                    h[1] = n;
                  }
                  for (var i = 0; i < c; ++i)
                    (l[i] = e[i + 2].toWireType(f, arguments[i])), h.push(l[i]);
                  if (((i = a.apply(null, h)), s)) Ct(f);
                  else
                    for (var d = o ? 1 : 2; d < e.length; d++) {
                      var p = 1 === d ? n : l[d - 2];
                      null !== e[d].ka && e[d].ka(p);
                    }
                  return (n = u ? e[0].fromWireType(i) : void 0);
                };
              }
              function qt(t, e) {
                for (var n = [], a = 0; a < t; a++) n.push(L[(e + 4 * a) >> 2]);
                return n;
              }
              function zt(t, e, n) {
                return (
                  t instanceof Object || Z(`${n} with invalid "this": ${t}`),
                  t instanceof e.ca.constructor ||
                    Z(
                      `${n} incompatible with "this" of type ${t.constructor.name}`
                    ),
                  t.ba.da ||
                    Z(
                      `cannot call emscripten binding method ${n} on deleted object`
                    ),
                  jt(t.ba.da, t.ba.ea.ca, e.ca)
                );
              }
              function Vt(t) {
                t >= J.Xa && 0 == --J.get(t).ib && J.wb(t);
              }
              function Gt(t, e, n) {
                switch (e) {
                  case 0:
                    return function (t) {
                      return this.fromWireType((n ? T : C)[t]);
                    };
                  case 1:
                    return function (t) {
                      return this.fromWireType((n ? P : E)[t >> 1]);
                    };
                  case 2:
                    return function (t) {
                      return this.fromWireType((n ? M : L)[t >> 2]);
                    };
                  default:
                    throw new TypeError("Unknown integer type: " + t);
                }
              }
              function Qt(t) {
                if (null === t) return "null";
                var e = typeof t;
                return "object" === e || "array" === e || "function" === e
                  ? t.toString()
                  : "" + t;
              }
              function Jt(t, e) {
                switch (e) {
                  case 2:
                    return function (t) {
                      return this.fromWireType(F[t >> 2]);
                    };
                  case 3:
                    return function (t) {
                      return this.fromWireType(_[t >> 3]);
                    };
                  default:
                    throw new TypeError("Unknown float type: " + t);
                }
              }
              function Kt(t, e, n) {
                switch (e) {
                  case 0:
                    return n
                      ? function (t) {
                          return T[t];
                        }
                      : function (t) {
                          return C[t];
                        };
                  case 1:
                    return n
                      ? function (t) {
                          return P[t >> 1];
                        }
                      : function (t) {
                          return E[t >> 1];
                        };
                  case 2:
                    return n
                      ? function (t) {
                          return M[t >> 2];
                        }
                      : function (t) {
                          return L[t >> 2];
                        };
                  default:
                    throw new TypeError("Unknown integer type: " + t);
                }
              }
              var Zt = (t, e, n, a) => {
                  if (0 < a) {
                    a = n + a - 1;
                    for (var r = 0; r < t.length; ++r) {
                      var i = t.charCodeAt(r);
                      if (
                        (55296 <= i &&
                          57343 >= i &&
                          (i =
                            (65536 + ((1023 & i) << 10)) |
                            (1023 & t.charCodeAt(++r))),
                        127 >= i)
                      ) {
                        if (n >= a) break;
                        e[n++] = i;
                      } else {
                        if (2047 >= i) {
                          if (n + 1 >= a) break;
                          e[n++] = 192 | (i >> 6);
                        } else {
                          if (65535 >= i) {
                            if (n + 2 >= a) break;
                            e[n++] = 224 | (i >> 12);
                          } else {
                            if (n + 3 >= a) break;
                            (e[n++] = 240 | (i >> 18)),
                              (e[n++] = 128 | ((i >> 12) & 63));
                          }
                          e[n++] = 128 | ((i >> 6) & 63);
                        }
                        e[n++] = 128 | (63 & i);
                      }
                    }
                    e[n] = 0;
                  }
                },
                te = (t) => {
                  for (var e = 0, n = 0; n < t.length; ++n) {
                    var a = t.charCodeAt(n);
                    127 >= a
                      ? e++
                      : 2047 >= a
                      ? (e += 2)
                      : 55296 <= a && 57343 >= a
                      ? ((e += 4), ++n)
                      : (e += 3);
                  }
                  return e;
                },
                ee =
                  "undefined" != typeof TextDecoder
                    ? new TextDecoder("utf8")
                    : void 0,
                ne = (t, e, n) => {
                  var a = e + n;
                  for (n = e; t[n] && !(n >= a); ) ++n;
                  if (16 < n - e && t.buffer && ee)
                    return ee.decode(t.subarray(e, n));
                  for (a = ""; e < n; ) {
                    var r = t[e++];
                    if (128 & r) {
                      var i = 63 & t[e++];
                      if (192 == (224 & r))
                        a += String.fromCharCode(((31 & r) << 6) | i);
                      else {
                        var o = 63 & t[e++];
                        65536 >
                        (r =
                          224 == (240 & r)
                            ? ((15 & r) << 12) | (i << 6) | o
                            : ((7 & r) << 18) |
                              (i << 12) |
                              (o << 6) |
                              (63 & t[e++]))
                          ? (a += String.fromCharCode(r))
                          : ((r -= 65536),
                            (a += String.fromCharCode(
                              55296 | (r >> 10),
                              56320 | (1023 & r)
                            )));
                      }
                    } else a += String.fromCharCode(r);
                  }
                  return a;
                },
                ae =
                  "undefined" != typeof TextDecoder
                    ? new TextDecoder("utf-16le")
                    : void 0,
                re = (t, e) => {
                  for (var n = t >> 1, a = n + e / 2; !(n >= a) && E[n]; ) ++n;
                  if (32 < (n <<= 1) - t && ae)
                    return ae.decode(C.subarray(t, n));
                  for (n = "", a = 0; !(a >= e / 2); ++a) {
                    var r = P[(t + 2 * a) >> 1];
                    if (0 == r) break;
                    n += String.fromCharCode(r);
                  }
                  return n;
                },
                ie = (t, e, n) => {
                  if ((void 0 === n && (n = 2147483647), 2 > n)) return 0;
                  var a = e;
                  n = (n -= 2) < 2 * t.length ? n / 2 : t.length;
                  for (var r = 0; r < n; ++r)
                    (P[e >> 1] = t.charCodeAt(r)), (e += 2);
                  return (P[e >> 1] = 0), e - a;
                },
                oe = (t) => 2 * t.length,
                se = (t, e) => {
                  for (var n = 0, a = ""; !(n >= e / 4); ) {
                    var r = M[(t + 4 * n) >> 2];
                    if (0 == r) break;
                    ++n,
                      65536 <= r
                        ? ((r -= 65536),
                          (a += String.fromCharCode(
                            55296 | (r >> 10),
                            56320 | (1023 & r)
                          )))
                        : (a += String.fromCharCode(r));
                  }
                  return a;
                },
                ue = (t, e, n) => {
                  if ((void 0 === n && (n = 2147483647), 4 > n)) return 0;
                  var a = e;
                  n = a + n - 4;
                  for (var r = 0; r < t.length; ++r) {
                    var i = t.charCodeAt(r);
                    if (
                      (55296 <= i &&
                        57343 >= i &&
                        (i =
                          (65536 + ((1023 & i) << 10)) |
                          (1023 & t.charCodeAt(++r))),
                      (M[e >> 2] = i),
                      (e += 4) + 4 > n)
                    )
                      break;
                  }
                  return (M[e >> 2] = 0), e - a;
                },
                ce = (t) => {
                  for (var e = 0, n = 0; n < t.length; ++n) {
                    var a = t.charCodeAt(n);
                    55296 <= a && 57343 >= a && ++n, (e += 4);
                  }
                  return e;
                },
                le = {};
              function he(t) {
                var e = le[t];
                return void 0 === e ? it(t) : e;
              }
              var fe,
                de = [],
                pe = [],
                me = {},
                ve = () => {
                  if (!fe) {
                    var t,
                      e = {
                        USER: "web_user",
                        LOGNAME: "web_user",
                        PATH: "/",
                        PWD: "/",
                        HOME: "/home/web_user",
                        LANG:
                          (
                            ("object" == typeof navigator &&
                              navigator.languages &&
                              navigator.languages[0]) ||
                            "C"
                          ).replace("-", "_") + ".UTF-8",
                        _: p || "./this.program",
                      };
                    for (t in me)
                      void 0 === me[t] ? delete e[t] : (e[t] = me[t]);
                    var n = [];
                    for (t in e) n.push(`${t}=${e[t]}`);
                    fe = n;
                  }
                  return fe;
                },
                ge = [null, [], []],
                be = (t) => 0 == t % 4 && (0 != t % 100 || 0 == t % 400),
                ye = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                we = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                Ae = (t, e, n, a) => {
                  function r(t, e, n) {
                    for (
                      t = "number" == typeof t ? t.toString() : t || "";
                      t.length < e;

                    )
                      t = n[0] + t;
                    return t;
                  }
                  function i(t, e) {
                    return r(t, e, "0");
                  }
                  function o(t, e) {
                    function n(t) {
                      return 0 > t ? -1 : 0 < t ? 1 : 0;
                    }
                    var a;
                    return (
                      0 === (a = n(t.getFullYear() - e.getFullYear())) &&
                        0 === (a = n(t.getMonth() - e.getMonth())) &&
                        (a = n(t.getDate() - e.getDate())),
                      a
                    );
                  }
                  function s(t) {
                    switch (t.getDay()) {
                      case 0:
                        return new Date(t.getFullYear() - 1, 11, 29);
                      case 1:
                        return t;
                      case 2:
                        return new Date(t.getFullYear(), 0, 3);
                      case 3:
                        return new Date(t.getFullYear(), 0, 2);
                      case 4:
                        return new Date(t.getFullYear(), 0, 1);
                      case 5:
                        return new Date(t.getFullYear() - 1, 11, 31);
                      case 6:
                        return new Date(t.getFullYear() - 1, 11, 30);
                    }
                  }
                  function u(t) {
                    var e = t.ta;
                    for (
                      t = new Date(new Date(t.ua + 1900, 0, 1).getTime());
                      0 < e;

                    ) {
                      var n = t.getMonth(),
                        a = (be(t.getFullYear()) ? ye : we)[n];
                      if (!(e > a - t.getDate())) {
                        t.setDate(t.getDate() + e);
                        break;
                      }
                      (e -= a - t.getDate() + 1),
                        t.setDate(1),
                        11 > n
                          ? t.setMonth(n + 1)
                          : (t.setMonth(0), t.setFullYear(t.getFullYear() + 1));
                    }
                    return (
                      (n = new Date(t.getFullYear() + 1, 0, 4)),
                      (e = s(new Date(t.getFullYear(), 0, 4))),
                      (n = s(n)),
                      0 >= o(e, t)
                        ? 0 >= o(n, t)
                          ? t.getFullYear() + 1
                          : t.getFullYear()
                        : t.getFullYear() - 1
                    );
                  }
                  var c = M[(a + 40) >> 2];
                  for (var l in ((a = {
                    Yb: M[a >> 2],
                    Xb: M[(a + 4) >> 2],
                    Ia: M[(a + 8) >> 2],
                    Qa: M[(a + 12) >> 2],
                    Ja: M[(a + 16) >> 2],
                    ua: M[(a + 20) >> 2],
                    na: M[(a + 24) >> 2],
                    ta: M[(a + 28) >> 2],
                    bc: M[(a + 32) >> 2],
                    Wb: M[(a + 36) >> 2],
                    Zb: c && c ? ne(C, c) : "",
                  }),
                  (n = n ? ne(C, n) : ""),
                  (c = {
                    "%c": "%a %b %d %H:%M:%S %Y",
                    "%D": "%m/%d/%y",
                    "%F": "%Y-%m-%d",
                    "%h": "%b",
                    "%r": "%I:%M:%S %p",
                    "%R": "%H:%M",
                    "%T": "%H:%M:%S",
                    "%x": "%m/%d/%y",
                    "%X": "%H:%M:%S",
                    "%Ec": "%c",
                    "%EC": "%C",
                    "%Ex": "%m/%d/%y",
                    "%EX": "%H:%M:%S",
                    "%Ey": "%y",
                    "%EY": "%Y",
                    "%Od": "%d",
                    "%Oe": "%e",
                    "%OH": "%H",
                    "%OI": "%I",
                    "%Om": "%m",
                    "%OM": "%M",
                    "%OS": "%S",
                    "%Ou": "%u",
                    "%OU": "%U",
                    "%OV": "%V",
                    "%Ow": "%w",
                    "%OW": "%W",
                    "%Oy": "%y",
                  })))
                    n = n.replace(new RegExp(l, "g"), c[l]);
                  var h =
                      "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
                        " "
                      ),
                    f =
                      "January February March April May June July August September October November December".split(
                        " "
                      );
                  for (l in ((c = {
                    "%a": (t) => h[t.na].substring(0, 3),
                    "%A": (t) => h[t.na],
                    "%b": (t) => f[t.Ja].substring(0, 3),
                    "%B": (t) => f[t.Ja],
                    "%C": (t) => i(((t.ua + 1900) / 100) | 0, 2),
                    "%d": (t) => i(t.Qa, 2),
                    "%e": (t) => r(t.Qa, 2, " "),
                    "%g": (t) => u(t).toString().substring(2),
                    "%G": (t) => u(t),
                    "%H": (t) => i(t.Ia, 2),
                    "%I": (t) => (
                      0 == (t = t.Ia) ? (t = 12) : 12 < t && (t -= 12), i(t, 2)
                    ),
                    "%j": (t) => {
                      for (
                        var e = 0, n = 0;
                        n <= t.Ja - 1;
                        e += (be(t.ua + 1900) ? ye : we)[n++]
                      );
                      return i(t.Qa + e, 3);
                    },
                    "%m": (t) => i(t.Ja + 1, 2),
                    "%M": (t) => i(t.Xb, 2),
                    "%n": () => "\n",
                    "%p": (t) => (0 <= t.Ia && 12 > t.Ia ? "AM" : "PM"),
                    "%S": (t) => i(t.Yb, 2),
                    "%t": () => "\t",
                    "%u": (t) => t.na || 7,
                    "%U": (t) => i(Math.floor((t.ta + 7 - t.na) / 7), 2),
                    "%V": (t) => {
                      var e = Math.floor((t.ta + 7 - ((t.na + 6) % 7)) / 7);
                      if ((2 >= (t.na + 371 - t.ta - 2) % 7 && e++, e))
                        53 == e &&
                          (4 == (n = (t.na + 371 - t.ta) % 7) ||
                            (3 == n && be(t.ua)) ||
                            (e = 1));
                      else {
                        e = 52;
                        var n = (t.na + 7 - t.ta - 1) % 7;
                        (4 == n || (5 == n && be((t.ua % 400) - 1))) && e++;
                      }
                      return i(e, 2);
                    },
                    "%w": (t) => t.na,
                    "%W": (t) =>
                      i(Math.floor((t.ta + 7 - ((t.na + 6) % 7)) / 7), 2),
                    "%y": (t) => (t.ua + 1900).toString().substring(2),
                    "%Y": (t) => t.ua + 1900,
                    "%z": (t) => {
                      var e = 0 <= (t = t.Wb);
                      return (
                        (t = Math.abs(t) / 60),
                        (e ? "+" : "-") +
                          String("0000" + ((t / 60) * 100 + (t % 60))).slice(-4)
                      );
                    },
                    "%Z": (t) => t.Zb,
                    "%%": () => "%",
                  }),
                  (n = n.replace(/%%/g, "\0\0")),
                  c))
                    n.includes(l) &&
                      (n = n.replace(new RegExp(l, "g"), c[l](a)));
                  return (
                    (l = (function (t) {
                      var e = Array(te(t) + 1);
                      return Zt(t, e, 0, e.length), e;
                    })((n = n.replace(/\0\0/g, "%")))),
                    l.length > e ? 0 : (T.set(l, t), l.length - 1)
                  );
                };
              Object.assign(Q.prototype, {
                get(t) {
                  return this.qa[t];
                },
                has(t) {
                  return void 0 !== this.qa[t];
                },
                tb(t) {
                  var e = this.bb.pop() || this.qa.length;
                  return (this.qa[e] = t), e;
                },
                wb(t) {
                  (this.qa[t] = void 0), this.bb.push(t);
                },
              }),
                (K = r.BindingError =
                  class extends Error {
                    constructor(t) {
                      super(t), (this.name = "BindingError");
                    }
                  }),
                J.qa.push(
                  { value: void 0 },
                  { value: null },
                  { value: !0 },
                  { value: !1 }
                ),
                (J.Xa = J.qa.length),
                (r.count_emval_handles = function () {
                  for (var t = 0, e = J.Xa; e < J.qa.length; ++e)
                    void 0 !== J.qa[e] && ++t;
                  return t;
                }),
                (at = r.PureVirtualError = nt("PureVirtualError"));
              for (var Re = Array(256), Te = 0; 256 > Te; ++Te)
                Re[Te] = String.fromCharCode(Te);
              (rt = Re),
                (r.getInheritedInstanceCount = function () {
                  return Object.keys(ct).length;
                }),
                (r.getLiveInheritedInstances = function () {
                  var t,
                    e = [];
                  for (t in ct) ct.hasOwnProperty(t) && e.push(ct[t]);
                  return e;
                }),
                (r.flushPendingDeletes = st),
                (r.setDelayFunction = function (t) {
                  (ut = t), ot.length && ut && ut(st);
                }),
                (yt = r.InternalError =
                  class extends Error {
                    constructor(t) {
                      super(t), (this.name = "InternalError");
                    }
                  }),
                (xt.prototype.isAliasOf = function (t) {
                  if (!(this instanceof xt && t instanceof xt)) return !1;
                  var e = this.ba.ea.ca,
                    n = this.ba.da,
                    a = t.ba.ea.ca;
                  for (t = t.ba.da; e.fa; ) (n = e.Ba(n)), (e = e.fa);
                  for (; a.fa; ) (t = a.Ba(t)), (a = a.fa);
                  return e === a && n === t;
                }),
                (xt.prototype.clone = function () {
                  if ((this.ba.da || St(this), this.ba.ya))
                    return (this.ba.count.value += 1), this;
                  var t = Rt,
                    e = Object,
                    n = e.create,
                    a = Object.getPrototypeOf(this),
                    r = this.ba;
                  return (
                    ((t = t(
                      n.call(e, a, {
                        ba: {
                          value: {
                            count: r.count,
                            wa: r.wa,
                            ya: r.ya,
                            da: r.da,
                            ea: r.ea,
                            ia: r.ia,
                            la: r.la,
                          },
                        },
                      })
                    )).ba.count.value += 1),
                    (t.ba.wa = !1),
                    t
                  );
                }),
                (xt.prototype.delete = function () {
                  this.ba.da || St(this),
                    this.ba.wa &&
                      !this.ba.ya &&
                      Z("Object already scheduled for deletion"),
                    pt(this),
                    vt(this.ba),
                    this.ba.ya ||
                      ((this.ba.ia = void 0), (this.ba.da = void 0));
                }),
                (xt.prototype.isDeleted = function () {
                  return !this.ba.da;
                }),
                (xt.prototype.deleteLater = function () {
                  return (
                    this.ba.da || St(this),
                    this.ba.wa &&
                      !this.ba.ya &&
                      Z("Object already scheduled for deletion"),
                    ot.push(this),
                    1 === ot.length && ut && ut(st),
                    (this.ba.wa = !0),
                    this
                  );
                }),
                ($t.prototype.Fb = function (t) {
                  return this.hb && (t = this.hb(t)), t;
                }),
                ($t.prototype.Ya = function (t) {
                  this.ra && this.ra(t);
                }),
                ($t.prototype.argPackAdvance = 8),
                ($t.prototype.readValueFromPointer = Pt),
                ($t.prototype.deleteObject = function (t) {
                  null !== t && t.delete();
                }),
                ($t.prototype.fromWireType = function (t) {
                  function e() {
                    return this.Ea
                      ? At(this.ca.ma, { ea: this.Qb, da: n, la: this, ia: t })
                      : At(this.ca.ma, { ea: this, da: t });
                  }
                  var n = this.Fb(t);
                  if (!n) return this.Ya(t), null;
                  var a = (function (t, e) {
                    return (e = lt(t, e)), ct[e];
                  })(this.ca, n);
                  if (void 0 !== a)
                    return 0 === a.ba.count.value
                      ? ((a.ba.da = n), (a.ba.ia = t), a.clone())
                      : ((a = a.clone()), this.Ya(t), a);
                  if (((a = this.ca.Eb(n)), !(a = bt[a]))) return e.call(this);
                  a = this.Da ? a.ub : a.pointerType;
                  var r = gt(n, this.ca, a.ca);
                  return null === r
                    ? e.call(this)
                    : this.Ea
                    ? At(a.ca.ma, { ea: a, da: r, la: this, ia: t })
                    : At(a.ca.ma, { ea: a, da: r });
                }),
                (Nt = r.UnboundTypeError = nt("UnboundTypeError"));
              var Ce = {
                N: function (t, e, n) {
                  (t = it(t)), (e = dt(e, "wrapper")), (n = tt(n));
                  var a = [].slice,
                    r = e.ca,
                    i = r.ma,
                    o = r.fa.ma,
                    s = r.fa.constructor;
                  for (var u in ((t = G(t, function () {
                    r.fa.gb.forEach(
                      function (t) {
                        if (this[t] === o[t])
                          throw new at(
                            `Pure virtual function ${t} must be implemented in JavaScript`
                          );
                      }.bind(this)
                    ),
                      Object.defineProperty(this, "__parent", { value: i }),
                      this.__construct.apply(this, a.call(arguments));
                  })),
                  (i.__construct = function () {
                    this === i && Z("Pass correct 'this' to __construct");
                    var t = s.implement.apply(
                      void 0,
                      [this].concat(a.call(arguments))
                    );
                    pt(t);
                    var e = t.ba;
                    t.notifyOnDestruction(),
                      (e.ya = !0),
                      Object.defineProperties(this, { ba: { value: e } }),
                      Rt(this),
                      (t = e.da),
                      (t = lt(r, t)),
                      ct.hasOwnProperty(t)
                        ? Z(`Tried to register registered instance: ${t}`)
                        : (ct[t] = this);
                  }),
                  (i.__destruct = function () {
                    this === i && Z("Pass correct 'this' to __destruct"),
                      pt(this);
                    var t = this.ba.da;
                    (t = lt(r, t)),
                      ct.hasOwnProperty(t)
                        ? delete ct[t]
                        : Z(`Tried to unregister unregistered instance: ${t}`);
                  }),
                  (t.prototype = Object.create(i)),
                  n))
                    t.prototype[u] = n[u];
                  return et(t);
                },
                O: function (t) {
                  var e = Tt[t];
                  delete Tt[t];
                  var n = e.Oa,
                    a = e.ra,
                    r = e.ab;
                  Lt(
                    [t],
                    r.map((t) => t.Ib).concat(r.map((t) => t.Tb)),
                    (t) => {
                      var i = {};
                      return (
                        r.forEach((e, n) => {
                          var a = t[n],
                            o = e.Gb,
                            s = e.Hb,
                            u = t[n + r.length],
                            c = e.Sb,
                            l = e.Ub;
                          i[e.Cb] = {
                            read: (t) => a.fromWireType(o(s, t)),
                            write: (t, e) => {
                              var n = [];
                              c(l, t, u.toWireType(n, e)), Ct(n);
                            },
                          };
                        }),
                        [
                          {
                            name: e.name,
                            fromWireType: function (t) {
                              var e,
                                n = {};
                              for (e in i) n[e] = i[e].read(t);
                              return a(t), n;
                            },
                            toWireType: function (t, e) {
                              for (var r in i)
                                if (!(r in e))
                                  throw new TypeError(`Missing field: "${r}"`);
                              var o = n();
                              for (r in i) i[r].write(o, e[r]);
                              return null !== t && t.push(a, o), o;
                            },
                            argPackAdvance: 8,
                            readValueFromPointer: Pt,
                            ka: a,
                          },
                        ]
                      );
                    }
                  );
                },
                C: function () {},
                K: function (t, e, n, a, r) {
                  var i = Ft(n);
                  _t(t, {
                    name: (e = it(e)),
                    fromWireType: function (t) {
                      return !!t;
                    },
                    toWireType: function (t, e) {
                      return e ? a : r;
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: function (t) {
                      if (1 === n) var a = T;
                      else if (2 === n) a = P;
                      else {
                        if (4 !== n)
                          throw new TypeError(
                            "Unknown boolean type size: " + e
                          );
                        a = M;
                      }
                      return this.fromWireType(a[t >> i]);
                    },
                    ka: null,
                  });
                },
                f: function (t, e, n, a, r, i, o, s, u, c, l, h, f) {
                  (l = it(l)),
                    (i = Yt(r, i)),
                    s && (s = Yt(o, s)),
                    c && (c = Yt(u, c)),
                    (f = Yt(h, f));
                  var d = V(l);
                  Ot(d, function () {
                    Xt(`Cannot construct ${l} due to unbound types`, [a]);
                  }),
                    Lt([t, e, n], a ? [a] : [], function (e) {
                      if (((e = e[0]), a))
                        var n = e.ca,
                          r = n.ma;
                      else r = xt.prototype;
                      e = G(d, function () {
                        if (Object.getPrototypeOf(this) !== o)
                          throw new K("Use 'new' to construct " + l);
                        if (void 0 === u.sa)
                          throw new K(l + " has no accessible constructor");
                        var t = u.sa[arguments.length];
                        if (void 0 === t)
                          throw new K(
                            `Tried to invoke ctor of ${l} with invalid number of parameters (${
                              arguments.length
                            }) - expected (${Object.keys(
                              u.sa
                            ).toString()}) parameters instead!`
                          );
                        return t.apply(this, arguments);
                      });
                      var o = Object.create(r, { constructor: { value: e } });
                      e.prototype = o;
                      var u = new kt(l, e, o, f, n, i, s, c);
                      u.fa &&
                        (void 0 === u.fa.Ca && (u.fa.Ca = []), u.fa.Ca.push(u)),
                        (n = new $t(l, u, !0, !1)),
                        (r = new $t(l + "*", u, !1, !1));
                      var h = new $t(l + " const*", u, !1, !0);
                      return (
                        (bt[t] = { pointerType: r, ub: h }), Bt(d, e), [n, r, h]
                      );
                    });
                },
                j: function (t, e, n, a, r, i, o) {
                  var s = qt(n, a);
                  (e = it(e)),
                    (i = Yt(r, i)),
                    Lt([], [t], function (t) {
                      function a() {
                        Xt(`Cannot call ${r} due to unbound types`, s);
                      }
                      var r = `${(t = t[0]).name}.${e}`;
                      e.startsWith("@@") && (e = Symbol[e.substring(2)]);
                      var u = t.ca.constructor;
                      return (
                        void 0 === u[e]
                          ? ((a.va = n - 1), (u[e] = a))
                          : (It(u, e, r), (u[e].ga[n - 1] = a)),
                        Lt([], s, function (a) {
                          if (
                            ((a = Ht(
                              r,
                              [a[0], null].concat(a.slice(1)),
                              null,
                              i,
                              o
                            )),
                            void 0 === u[e].ga
                              ? ((a.va = n - 1), (u[e] = a))
                              : (u[e].ga[n - 1] = a),
                            t.ca.Ca)
                          )
                            for (const n of t.ca.Ca)
                              n.constructor.hasOwnProperty(e) ||
                                (n.constructor[e] = a);
                          return [];
                        }),
                        []
                      );
                    });
                },
                x: function (t, e, n, a, r, i, o, s) {
                  (e = it(e)),
                    (i = Yt(r, i)),
                    Lt([], [t], function (t) {
                      var r = `${(t = t[0]).name}.${e}`,
                        u = {
                          get() {
                            Xt(`Cannot access ${r} due to unbound types`, [n]);
                          },
                          enumerable: !0,
                          configurable: !0,
                        };
                      return (
                        (u.set = s
                          ? () => {
                              Xt(`Cannot access ${r} due to unbound types`, [
                                n,
                              ]);
                            }
                          : () => {
                              Z(`${r} is a read-only property`);
                            }),
                        Object.defineProperty(t.ca.constructor, e, u),
                        Lt([], [n], function (n) {
                          n = n[0];
                          var r = {
                            get: () => n.fromWireType(i(a)),
                            enumerable: !0,
                          };
                          return (
                            s &&
                              ((s = Yt(o, s)),
                              (r.set = (t) => {
                                var e = [];
                                s(a, n.toWireType(e, t)), Ct(e);
                              })),
                            Object.defineProperty(t.ca.constructor, e, r),
                            []
                          );
                        }),
                        []
                      );
                    });
                },
                s: function (t, e, n, a, r, i) {
                  var o = qt(e, n);
                  (r = Yt(a, r)),
                    Lt([], [t], function (t) {
                      var n = `constructor ${(t = t[0]).name}`;
                      if (
                        (void 0 === t.ca.sa && (t.ca.sa = []),
                        void 0 !== t.ca.sa[e - 1])
                      )
                        throw new K(
                          `Cannot register multiple constructors with identical number of parameters (${
                            e - 1
                          }) for class '${
                            t.name
                          }'! Overload resolution is currently only performed using the parameter count, not actual type info!`
                        );
                      return (
                        (t.ca.sa[e - 1] = () => {
                          Xt(
                            `Cannot construct ${t.name} due to unbound types`,
                            o
                          );
                        }),
                        Lt([], o, function (a) {
                          return (
                            a.splice(1, 0, null),
                            (t.ca.sa[e - 1] = Ht(n, a, null, r, i)),
                            []
                          );
                        }),
                        []
                      );
                    });
                },
                a: function (t, e, n, a, r, i, o, s) {
                  var u = qt(n, a);
                  (e = it(e)),
                    (i = Yt(r, i)),
                    Lt([], [t], function (t) {
                      function a() {
                        Xt(`Cannot call ${r} due to unbound types`, u);
                      }
                      var r = `${(t = t[0]).name}.${e}`;
                      e.startsWith("@@") && (e = Symbol[e.substring(2)]),
                        s && t.ca.gb.push(e);
                      var c = t.ca.ma,
                        l = c[e];
                      return (
                        void 0 === l ||
                        (void 0 === l.ga &&
                          l.className !== t.name &&
                          l.va === n - 2)
                          ? ((a.va = n - 2), (a.className = t.name), (c[e] = a))
                          : (It(c, e, r), (c[e].ga[n - 2] = a)),
                        Lt([], u, function (a) {
                          return (
                            (a = Ht(r, a, t, i, o)),
                            void 0 === c[e].ga
                              ? ((a.va = n - 2), (c[e] = a))
                              : (c[e].ga[n - 2] = a),
                            []
                          );
                        }),
                        []
                      );
                    });
                },
                e: function (t, e, n, a, r, i, o, s, u, c) {
                  (e = it(e)),
                    (r = Yt(a, r)),
                    Lt([], [t], function (t) {
                      var a = `${(t = t[0]).name}.${e}`,
                        l = {
                          get() {
                            Xt(`Cannot access ${a} due to unbound types`, [
                              n,
                              o,
                            ]);
                          },
                          enumerable: !0,
                          configurable: !0,
                        };
                      return (
                        (l.set = u
                          ? () => {
                              Xt(`Cannot access ${a} due to unbound types`, [
                                n,
                                o,
                              ]);
                            }
                          : () => {
                              Z(a + " is a read-only property");
                            }),
                        Object.defineProperty(t.ca.ma, e, l),
                        Lt([], u ? [n, o] : [n], function (n) {
                          var o = n[0],
                            l = {
                              get() {
                                var e = zt(this, t, a + " getter");
                                return o.fromWireType(r(i, e));
                              },
                              enumerable: !0,
                            };
                          if (u) {
                            u = Yt(s, u);
                            var h = n[1];
                            l.set = function (e) {
                              var n = zt(this, t, a + " setter"),
                                r = [];
                              u(c, n, h.toWireType(r, e)), Ct(r);
                            };
                          }
                          return Object.defineProperty(t.ca.ma, e, l), [];
                        }),
                        []
                      );
                    });
                },
                J: function (t, e) {
                  _t(t, {
                    name: (e = it(e)),
                    fromWireType: function (t) {
                      var e = tt(t);
                      return Vt(t), e;
                    },
                    toWireType: function (t, e) {
                      return et(e);
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: Pt,
                    ka: null,
                  });
                },
                p: function (t, e, n, a) {
                  function r() {}
                  (n = Ft(n)),
                    (e = it(e)),
                    (r.values = {}),
                    _t(t, {
                      name: e,
                      constructor: r,
                      fromWireType: function (t) {
                        return this.constructor.values[t];
                      },
                      toWireType: function (t, e) {
                        return e.value;
                      },
                      argPackAdvance: 8,
                      readValueFromPointer: Gt(e, n, a),
                      ka: null,
                    }),
                    Ot(e, r);
                },
                d: function (t, e, n) {
                  var a = dt(t, "enum");
                  (e = it(e)),
                    (t = a.constructor),
                    (a = Object.create(a.constructor.prototype, {
                      value: { value: n },
                      constructor: {
                        value: G(`${a.name}_${e}`, function () {}),
                      },
                    })),
                    (t.values[n] = a),
                    (t[e] = a);
                },
                y: function (t, e, n) {
                  (n = Ft(n)),
                    _t(t, {
                      name: (e = it(e)),
                      fromWireType: function (t) {
                        return t;
                      },
                      toWireType: function (t, e) {
                        return e;
                      },
                      argPackAdvance: 8,
                      readValueFromPointer: Jt(e, n),
                      ka: null,
                    });
                },
                m: function (t, e, n, a, r, i) {
                  var o = qt(e, n);
                  (t = it(t)),
                    (r = Yt(a, r)),
                    Ot(
                      t,
                      function () {
                        Xt(`Cannot call ${t} due to unbound types`, o);
                      },
                      e - 1
                    ),
                    Lt([], o, function (n) {
                      return (
                        Bt(
                          t,
                          Ht(t, [n[0], null].concat(n.slice(1)), null, r, i),
                          e - 1
                        ),
                        []
                      );
                    });
                },
                l: function (t, e, n, a, r) {
                  (e = it(e)), -1 === r && (r = 4294967295), (r = Ft(n));
                  var i = (t) => t;
                  if (0 === a) {
                    var o = 32 - 8 * n;
                    i = (t) => (t << o) >>> o;
                  }
                  (n = e.includes("unsigned")
                    ? function (t, e) {
                        return e >>> 0;
                      }
                    : function (t, e) {
                        return e;
                      }),
                    _t(t, {
                      name: e,
                      fromWireType: i,
                      toWireType: n,
                      argPackAdvance: 8,
                      readValueFromPointer: Kt(e, r, 0 !== a),
                      ka: null,
                    });
                },
                g: function (t, e, n) {
                  function a(t) {
                    t >>= 2;
                    var e = L;
                    return new r(e.buffer, e[t + 1], e[t]);
                  }
                  var r = [
                    Int8Array,
                    Uint8Array,
                    Int16Array,
                    Uint16Array,
                    Int32Array,
                    Uint32Array,
                    Float32Array,
                    Float64Array,
                  ][e];
                  _t(
                    t,
                    {
                      name: (n = it(n)),
                      fromWireType: a,
                      argPackAdvance: 8,
                      readValueFromPointer: a,
                    },
                    { Jb: !0 }
                  );
                },
                z: function (t, e) {
                  var n = "std::string" === (e = it(e));
                  _t(t, {
                    name: e,
                    fromWireType: function (t) {
                      var e = L[t >> 2],
                        a = t + 4;
                      if (n)
                        for (var r = a, i = 0; i <= e; ++i) {
                          var o = a + i;
                          if (i == e || 0 == C[o]) {
                            if (((r = r ? ne(C, r, o - r) : ""), void 0 === s))
                              var s = r;
                            else (s += String.fromCharCode(0)), (s += r);
                            r = o + 1;
                          }
                        }
                      else {
                        for (s = Array(e), i = 0; i < e; ++i)
                          s[i] = String.fromCharCode(C[a + i]);
                        s = s.join("");
                      }
                      return Ee(t), s;
                    },
                    toWireType: function (t, e) {
                      e instanceof ArrayBuffer && (e = new Uint8Array(e));
                      var a = "string" == typeof e;
                      a ||
                        e instanceof Uint8Array ||
                        e instanceof Uint8ClampedArray ||
                        e instanceof Int8Array ||
                        Z("Cannot pass non-string to std::string");
                      var r = n && a ? te(e) : e.length,
                        i = Me(4 + r + 1),
                        o = i + 4;
                      if (((L[i >> 2] = r), n && a)) Zt(e, C, o, r + 1);
                      else if (a)
                        for (a = 0; a < r; ++a) {
                          var s = e.charCodeAt(a);
                          255 < s &&
                            (Ee(o),
                            Z(
                              "String has UTF-16 code units that do not fit in 8 bits"
                            )),
                            (C[o + a] = s);
                        }
                      else for (a = 0; a < r; ++a) C[o + a] = e[a];
                      return null !== t && t.push(Ee, i), i;
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: Pt,
                    ka: function (t) {
                      Ee(t);
                    },
                  });
                },
                u: function (t, e, n) {
                  if (((n = it(n)), 2 === e))
                    var a = re,
                      r = ie,
                      i = oe,
                      o = () => E,
                      s = 1;
                  else
                    4 === e &&
                      ((a = se), (r = ue), (i = ce), (o = () => L), (s = 2));
                  _t(t, {
                    name: n,
                    fromWireType: function (t) {
                      for (
                        var n, r = L[t >> 2], i = o(), u = t + 4, c = 0;
                        c <= r;
                        ++c
                      ) {
                        var l = t + 4 + c * e;
                        (c != r && 0 != i[l >> s]) ||
                          ((u = a(u, l - u)),
                          void 0 === n
                            ? (n = u)
                            : ((n += String.fromCharCode(0)), (n += u)),
                          (u = l + e));
                      }
                      return Ee(t), n;
                    },
                    toWireType: function (t, a) {
                      "string" != typeof a &&
                        Z(`Cannot pass non-string to C++ string type ${n}`);
                      var o = i(a),
                        u = Me(4 + o + e);
                      return (
                        (L[u >> 2] = o >> s),
                        r(a, u + 4, o + e),
                        null !== t && t.push(Ee, u),
                        u
                      );
                    },
                    argPackAdvance: 8,
                    readValueFromPointer: Pt,
                    ka: function (t) {
                      Ee(t);
                    },
                  });
                },
                Q: function (t, e, n, a, r, i) {
                  Tt[t] = { name: it(e), Oa: Yt(n, a), ra: Yt(r, i), ab: [] };
                },
                P: function (t, e, n, a, r, i, o, s, u, c) {
                  Tt[t].ab.push({
                    Cb: it(e),
                    Ib: n,
                    Gb: Yt(a, r),
                    Hb: i,
                    Tb: o,
                    Sb: Yt(s, u),
                    Ub: c,
                  });
                },
                L: function (t, e) {
                  _t(t, {
                    Lb: !0,
                    name: (e = it(e)),
                    argPackAdvance: 0,
                    fromWireType: function () {},
                    toWireType: function () {},
                  });
                },
                v: function (t, e, n) {
                  (t = tt(t)), (e = dt(e, "emval::as"));
                  var a = [],
                    r = et(a);
                  return (L[n >> 2] = r), e.toWireType(a, t);
                },
                w: function (t, e, n, a, r) {
                  (t = de[t]), (e = tt(e)), (n = he(n));
                  var i = [];
                  return (L[a >> 2] = et(i)), t(e, n, i, r);
                },
                i: function (t, e, n, a) {
                  (t = de[t])((e = tt(e)), (n = he(n)), null, a);
                },
                c: Vt,
                h: function (t, e) {
                  var n = (function (t, e) {
                      for (var n = Array(t), a = 0; a < t; ++a)
                        n[a] = dt(L[(e + 4 * a) >> 2], "parameter " + a);
                      return n;
                    })(t, e),
                    a = n[0];
                  e =
                    a.name +
                    "_$" +
                    n
                      .slice(1)
                      .map(function (t) {
                        return t.name;
                      })
                      .join("_") +
                    "$";
                  var r = pe[e];
                  if (void 0 !== r) return r;
                  var i = Array(t - 1);
                  return (
                    (r = (function (t) {
                      var e = de.length;
                      return de.push(t), e;
                    })((e, r, o, s) => {
                      for (var u = 0, c = 0; c < t - 1; ++c)
                        (i[c] = n[c + 1].readValueFromPointer(s + u)),
                          (u += n[c + 1].argPackAdvance);
                      for (e = e[r].apply(e, i), c = 0; c < t - 1; ++c)
                        n[c + 1].xb && n[c + 1].xb(i[c]);
                      if (!a.Lb) return a.toWireType(o, e);
                    })),
                    (pe[e] = r)
                  );
                },
                t: function (t) {
                  return (t = he(t)), et(r[t]);
                },
                M: function (t, e) {
                  return (t = tt(t)), (e = tt(e)), et(t[e]);
                },
                n: function (t) {
                  4 < t && (J.get(t).ib += 1);
                },
                o: function (t) {
                  return et(he(t));
                },
                A: function () {
                  return et({});
                },
                q: function (t) {
                  Ct(tt(t)), Vt(t);
                },
                k: function (t, e, n) {
                  (t = tt(t)), (e = tt(e)), (n = tt(n)), (t[e] = n);
                },
                r: function (t, e) {
                  return (
                    (t = (t = dt(t, "_emval_take_value")).readValueFromPointer(
                      e
                    )),
                    et(t)
                  );
                },
                b: () => {
                  Y("");
                },
                E: (t) => {
                  var e = C.length;
                  if (2147483648 < (t >>>= 0)) return !1;
                  for (var n = 1; 4 >= n; n *= 2) {
                    var a = e * (1 + 0.2 / n);
                    a = Math.min(a, t + 100663296);
                    var r = Math;
                    a = Math.max(t, a);
                    t: {
                      r =
                        (r.min.call(
                          r,
                          2147483648,
                          a + ((65536 - (a % 65536)) % 65536)
                        ) -
                          A.buffer.byteLength +
                          65535) >>>
                        16;
                      try {
                        A.grow(r), x();
                        var i = 1;
                        break t;
                      } catch (t) {}
                      i = void 0;
                    }
                    if (i) return !0;
                  }
                  return !1;
                },
                F: (t, e) => {
                  var n = 0;
                  return (
                    ve().forEach(function (a, r) {
                      var i = e + n;
                      for (
                        r = L[(t + 4 * r) >> 2] = i, i = 0;
                        i < a.length;
                        ++i
                      )
                        T[r++ >> 0] = a.charCodeAt(i);
                      (T[r >> 0] = 0), (n += a.length + 1);
                    }),
                    0
                  );
                },
                G: (t, e) => {
                  var n = ve();
                  L[t >> 2] = n.length;
                  var a = 0;
                  return (
                    n.forEach(function (t) {
                      a += t.length + 1;
                    }),
                    (L[e >> 2] = a),
                    0
                  );
                },
                H: () => 52,
                B: function () {
                  return 70;
                },
                I: (t, e, n, a) => {
                  for (var r = 0, i = 0; i < n; i++) {
                    var o = L[e >> 2],
                      s = L[(e + 4) >> 2];
                    e += 8;
                    for (var u = 0; u < s; u++) {
                      var c = C[o + u],
                        l = ge[t];
                      0 === c || 10 === c
                        ? ((1 === t ? y : w)(ne(l, 0)), (l.length = 0))
                        : l.push(c);
                    }
                    r += s;
                  }
                  return (L[a >> 2] = r), 0;
                },
                D: (t, e, n, a) => Ae(t, e, n, a),
              };
              !(function () {
                function t(t) {
                  if (
                    ((R = t = t.exports),
                    (A = R.R),
                    x(),
                    (I = R.X),
                    k.unshift(R.S),
                    W--,
                    r.monitorRunDependencies && r.monitorRunDependencies(W),
                    0 == W && (null !== $ && (clearInterval($), ($ = null)), B))
                  ) {
                    var e = B;
                    (B = null), e();
                  }
                  return t;
                }
                var e = { a: Ce };
                if (
                  (W++,
                  r.monitorRunDependencies && r.monitorRunDependencies(W),
                  r.instantiateWasm)
                )
                  try {
                    return r.instantiateWasm(e, t);
                  } catch (t) {
                    w(
                      "Module.instantiateWasm callback failed with error: " + t
                    ),
                      n(t);
                  }
                (function (t, e) {
                  var n = U;
                  return b ||
                    "function" != typeof WebAssembly.instantiateStreaming ||
                    N(n) ||
                    n.startsWith("file://") ||
                    "function" != typeof fetch
                    ? q(n, t, e)
                    : fetch(n, { credentials: "same-origin" }).then((a) =>
                        WebAssembly.instantiateStreaming(a, t).then(
                          e,
                          function (a) {
                            return (
                              w("wasm streaming compile failed: " + a),
                              w("falling back to ArrayBuffer instantiation"),
                              q(n, t, e)
                            );
                          }
                        )
                      );
                })(e, function (e) {
                  t(e.instance);
                }).catch(n);
              })();
              var Pe,
                Ee = (t) => (Ee = R.T)(t),
                Me = (t) => (Me = R.U)(t),
                Le = (t) => (Le = R.V)(t);
              function Fe() {
                function t() {
                  if (!Pe && ((Pe = !0), (r.calledRun = !0), !S)) {
                    if (
                      (z(k),
                      e(r),
                      r.onRuntimeInitialized && r.onRuntimeInitialized(),
                      r.postRun)
                    )
                      for (
                        "function" == typeof r.postRun &&
                        (r.postRun = [r.postRun]);
                        r.postRun.length;

                      ) {
                        var t = r.postRun.shift();
                        j.unshift(t);
                      }
                    z(j);
                  }
                }
                if (!(0 < W)) {
                  if (r.preRun)
                    for (
                      "function" == typeof r.preRun && (r.preRun = [r.preRun]);
                      r.preRun.length;

                    )
                      D();
                  z(O),
                    0 < W ||
                      (r.setStatus
                        ? (r.setStatus("Running..."),
                          setTimeout(function () {
                            setTimeout(function () {
                              r.setStatus("");
                            }, 1),
                              t();
                          }, 1))
                        : t());
                }
              }
              if (
                ((r.__embind_initialize_bindings = () =>
                  (r.__embind_initialize_bindings = R.W)()),
                (r.dynCall_jiji = (t, e, n, a, i) =>
                  (r.dynCall_jiji = R.Y)(t, e, n, a, i)),
                (r.dynCall_viijii = (t, e, n, a, i, o, s) =>
                  (r.dynCall_viijii = R.Z)(t, e, n, a, i, o, s)),
                (r.dynCall_iiiiij = (t, e, n, a, i, o, s) =>
                  (r.dynCall_iiiiij = R._)(t, e, n, a, i, o, s)),
                (r.dynCall_iiiiijj = (t, e, n, a, i, o, s, u, c) =>
                  (r.dynCall_iiiiijj = R.$)(t, e, n, a, i, o, s, u, c)),
                (r.dynCall_iiiiiijj = (t, e, n, a, i, o, s, u, c, l) =>
                  (r.dynCall_iiiiiijj = R.aa)(t, e, n, a, i, o, s, u, c, l)),
                (B = function t() {
                  Pe || Fe(), Pe || (B = t);
                }),
                r.preInit)
              )
                for (
                  "function" == typeof r.preInit && (r.preInit = [r.preInit]);
                  0 < r.preInit.length;

                )
                  r.preInit.pop()();
              return Fe(), t.ready;
            });
        },
        (t) => {
          t.exports = JSON.parse(
            '{"name":"@rive-app/canvas","version":"2.7.7","description":"Rive\'s canvas based web api.","main":"rive.js","homepage":"https://rive.app","repository":{"type":"git","url":"https://github.com/rive-app/rive-wasm/tree/master/js"},"keywords":["rive","animation"],"author":"Rive","contributors":["Luigi Rosso <luigi@rive.app> (https://rive.app)","Maxwell Talbot <max@rive.app> (https://rive.app)","Arthur Vivian <arthur@rive.app> (https://rive.app)","Umberto Sonnino <umberto@rive.app> (https://rive.app)","Matthew Sullivan <matt.j.sullivan@gmail.com> (mailto:matt.j.sullivan@gmail.com)"],"license":"MIT","files":["rive.js","rive.js.map","rive.wasm","rive.d.ts","rive_advanced.mjs.d.ts"],"typings":"rive.d.ts","dependencies":{},"browser":{"fs":false,"path":false}}'
          );
        },
        (t, e, n) => {
          n.r(e),
            n.d(e, {
              BLANK_URL: () => r.BLANK_URL,
              registerTouchInteractions: () => a.registerTouchInteractions,
              sanitizeUrl: () => r.sanitizeUrl,
            });
          var a = n(4),
            r = n(5);
        },
        (t, e, n) => {
          n.r(e), n.d(e, { registerTouchInteractions: () => a });
          var a = function (t) {
            var e = t.canvas,
              n = t.artboard,
              a = t.stateMachines,
              r = void 0 === a ? [] : a,
              i = t.renderer,
              o = t.rive,
              s = t.fit,
              u = t.alignment;
            if (!(e && r.length && i && o && n && "undefined" != typeof window))
              return null;
            var c = function (t) {
              var e = t.currentTarget.getBoundingClientRect(),
                a = (function (t) {
                  var e, n;
                  return ["touchstart", "touchmove"].indexOf(t.type) > -1 &&
                    (null === (e = t.touches) || void 0 === e
                      ? void 0
                      : e.length)
                    ? (t.preventDefault(),
                      {
                        clientX: t.touches[0].clientX,
                        clientY: t.touches[0].clientY,
                      })
                    : "touchend" === t.type &&
                      (null === (n = t.changedTouches) || void 0 === n
                        ? void 0
                        : n.length)
                    ? {
                        clientX: t.changedTouches[0].clientX,
                        clientY: t.changedTouches[0].clientY,
                      }
                    : { clientX: t.clientX, clientY: t.clientY };
                })(t),
                i = a.clientX,
                c = a.clientY;
              if (i || c) {
                var l = i - e.left,
                  h = c - e.top,
                  f = o.computeAlignment(
                    s,
                    u,
                    { minX: 0, minY: 0, maxX: e.width, maxY: e.height },
                    n.bounds
                  ),
                  d = new o.Mat2D();
                f.invert(d);
                var p = new o.Vec2D(l, h),
                  m = o.mapXY(d, p),
                  v = m.x(),
                  g = m.y();
                switch (
                  (m.delete(), d.delete(), p.delete(), f.delete(), t.type)
                ) {
                  case "mouseout":
                    for (var b = 0, y = r; b < y.length; b++) {
                      y[b].pointerMove(
                        v < 0 ? v - 1e4 : v + 1e4,
                        g < 0 ? g - 1e4 : g + 1e4
                      );
                    }
                    break;
                  case "touchmove":
                  case "mouseover":
                  case "mousemove":
                    for (var w = 0, A = r; w < A.length; w++) {
                      A[w].pointerMove(v, g);
                    }
                    break;
                  case "touchstart":
                  case "mousedown":
                    for (var R = 0, T = r; R < T.length; R++) {
                      T[R].pointerDown(v, g);
                    }
                    break;
                  case "touchend":
                  case "mouseup":
                    for (var C = 0, P = r; C < P.length; C++) {
                      P[C].pointerUp(v, g);
                    }
                }
              }
            }.bind(undefined);
            return (
              e.addEventListener("mouseover", c),
              e.addEventListener("mouseout", c),
              e.addEventListener("mousemove", c),
              e.addEventListener("mousedown", c),
              e.addEventListener("mouseup", c),
              e.addEventListener("touchmove", c),
              e.addEventListener("touchstart", c),
              e.addEventListener("touchend", c),
              function () {
                e.removeEventListener("mouseover", c),
                  e.removeEventListener("mouseout", c),
                  e.removeEventListener("mousemove", c),
                  e.removeEventListener("mousedown", c),
                  e.removeEventListener("mouseup", c),
                  e.removeEventListener("touchmove", c),
                  e.removeEventListener("touchstart", c),
                  e.removeEventListener("touchend", c);
              }
            );
          };
        },
        (t, e, n) => {
          n.r(e), n.d(e, { BLANK_URL: () => c, sanitizeUrl: () => l });
          var a = /^([^\w]*)(javascript|data|vbscript)/im,
            r = /&#(\w+)(^\w|;)?/g,
            i = /&(newline|tab);/gi,
            o = /[\u0000-\u001F\u007F-\u009F\u2000-\u200D\uFEFF]/gim,
            s = /^.+(:|&colon;)/gim,
            u = [".", "/"],
            c = "about:blank";
          function l(t) {
            if (!t) return c;
            var e,
              n = ((e = t),
              e.replace(o, "").replace(r, function (t, e) {
                return String.fromCharCode(e);
              }))
                .replace(i, "")
                .replace(o, "")
                .trim();
            if (!n) return c;
            if (
              (function (t) {
                return u.indexOf(t[0]) > -1;
              })(n)
            )
              return n;
            var l = n.match(s);
            if (!l) return n;
            var h = l[0];
            return a.test(h) ? c : n;
          }
        },
      ],
      e = {};
    function n(a) {
      var r = e[a];
      if (void 0 !== r) return r.exports;
      var i = (e[a] = { exports: {} });
      return t[a](i, i.exports, n), i.exports;
    }
    (n.d = (t, e) => {
      for (var a in e)
        n.o(e, a) &&
          !n.o(t, a) &&
          Object.defineProperty(t, a, { enumerable: !0, get: e[a] });
    }),
      (n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (n.r = (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      });
    var a = {};
    return (
      (() => {
        n.r(a),
          n.d(a, {
            Alignment: () => e,
            EventType: () => m,
            Fit: () => t,
            Layout: () => l,
            LoopType: () => v,
            Rive: () => A,
            RiveEventType: () => d,
            RuntimeLoader: () => h,
            StateMachineInput: () => p,
            StateMachineInputType: () => c,
            Testing: () => C,
            decodeFont: () => E,
            decodeImage: () => P,
          });
        var t,
          e,
          r = n(1),
          i = n(2),
          o = n(3),
          s = function (t, e, n, a) {
            return new (n || (n = Promise))(function (r, i) {
              function o(t) {
                try {
                  u(a.next(t));
                } catch (t) {
                  i(t);
                }
              }
              function s(t) {
                try {
                  u(a.throw(t));
                } catch (t) {
                  i(t);
                }
              }
              function u(t) {
                var e;
                t.done
                  ? r(t.value)
                  : ((e = t.value),
                    e instanceof n
                      ? e
                      : new n(function (t) {
                          t(e);
                        })).then(o, s);
              }
              u((a = a.apply(t, e || [])).next());
            });
          },
          u = function (t, e) {
            var n,
              a,
              r,
              i,
              o = {
                label: 0,
                sent: function () {
                  if (1 & r[0]) throw r[1];
                  return r[1];
                },
                trys: [],
                ops: [],
              };
            return (
              (i = { next: s(0), throw: s(1), return: s(2) }),
              "function" == typeof Symbol &&
                (i[Symbol.iterator] = function () {
                  return this;
                }),
              i
            );
            function s(s) {
              return function (u) {
                return (function (s) {
                  if (n) throw new TypeError("Generator is already executing.");
                  for (; i && ((i = 0), s[0] && (o = 0)), o; )
                    try {
                      if (
                        ((n = 1),
                        a &&
                          (r =
                            2 & s[0]
                              ? a.return
                              : s[0]
                              ? a.throw || ((r = a.return) && r.call(a), 0)
                              : a.next) &&
                          !(r = r.call(a, s[1])).done)
                      )
                        return r;
                      switch (((a = 0), r && (s = [2 & s[0], r.value]), s[0])) {
                        case 0:
                        case 1:
                          r = s;
                          break;
                        case 4:
                          return o.label++, { value: s[1], done: !1 };
                        case 5:
                          o.label++, (a = s[1]), (s = [0]);
                          continue;
                        case 7:
                          (s = o.ops.pop()), o.trys.pop();
                          continue;
                        default:
                          if (
                            !((r = o.trys),
                            (r = r.length > 0 && r[r.length - 1]) ||
                              (6 !== s[0] && 2 !== s[0]))
                          ) {
                            o = 0;
                            continue;
                          }
                          if (
                            3 === s[0] &&
                            (!r || (s[1] > r[0] && s[1] < r[3]))
                          ) {
                            o.label = s[1];
                            break;
                          }
                          if (6 === s[0] && o.label < r[1]) {
                            (o.label = r[1]), (r = s);
                            break;
                          }
                          if (r && o.label < r[2]) {
                            (o.label = r[2]), o.ops.push(s);
                            break;
                          }
                          r[2] && o.ops.pop(), o.trys.pop();
                          continue;
                      }
                      s = e.call(t, o);
                    } catch (t) {
                      (s = [6, t]), (a = 0);
                    } finally {
                      n = r = 0;
                    }
                  if (5 & s[0]) throw s[1];
                  return { value: s[0] ? s[1] : void 0, done: !0 };
                })([s, u]);
              };
            }
          };
        !(function (t) {
          (t.Cover = "cover"),
            (t.Contain = "contain"),
            (t.Fill = "fill"),
            (t.FitWidth = "fitWidth"),
            (t.FitHeight = "fitHeight"),
            (t.None = "none"),
            (t.ScaleDown = "scaleDown");
        })(t || (t = {})),
          (function (t) {
            (t.Center = "center"),
              (t.TopLeft = "topLeft"),
              (t.TopCenter = "topCenter"),
              (t.TopRight = "topRight"),
              (t.CenterLeft = "centerLeft"),
              (t.CenterRight = "centerRight"),
              (t.BottomLeft = "bottomLeft"),
              (t.BottomCenter = "bottomCenter"),
              (t.BottomRight = "bottomRight");
          })(e || (e = {}));
        var c,
          l = (function () {
            function n(n) {
              var a, r, i, o, s, u;
              (this.fit =
                null !== (a = null == n ? void 0 : n.fit) && void 0 !== a
                  ? a
                  : t.Contain),
                (this.alignment =
                  null !== (r = null == n ? void 0 : n.alignment) &&
                  void 0 !== r
                    ? r
                    : e.Center),
                (this.minX =
                  null !== (i = null == n ? void 0 : n.minX) && void 0 !== i
                    ? i
                    : 0),
                (this.minY =
                  null !== (o = null == n ? void 0 : n.minY) && void 0 !== o
                    ? o
                    : 0),
                (this.maxX =
                  null !== (s = null == n ? void 0 : n.maxX) && void 0 !== s
                    ? s
                    : 0),
                (this.maxY =
                  null !== (u = null == n ? void 0 : n.maxY) && void 0 !== u
                    ? u
                    : 0);
            }
            return (
              (n.new = function (t) {
                var e = t.fit,
                  a = t.alignment,
                  r = t.minX,
                  i = t.minY,
                  o = t.maxX,
                  s = t.maxY;
                return (
                  console.warn(
                    "This function is deprecated: please use `new Layout({})` instead"
                  ),
                  new n({
                    fit: e,
                    alignment: a,
                    minX: r,
                    minY: i,
                    maxX: o,
                    maxY: s,
                  })
                );
              }),
              (n.prototype.copyWith = function (t) {
                var e = t.fit,
                  a = t.alignment,
                  r = t.minX,
                  i = t.minY,
                  o = t.maxX,
                  s = t.maxY;
                return new n({
                  fit: null != e ? e : this.fit,
                  alignment: null != a ? a : this.alignment,
                  minX: null != r ? r : this.minX,
                  minY: null != i ? i : this.minY,
                  maxX: null != o ? o : this.maxX,
                  maxY: null != s ? s : this.maxY,
                });
              }),
              (n.prototype.runtimeFit = function (e) {
                return this.cachedRuntimeFit
                  ? this.cachedRuntimeFit
                  : ((n =
                      this.fit === t.Cover
                        ? e.Fit.cover
                        : this.fit === t.Contain
                        ? e.Fit.contain
                        : this.fit === t.Fill
                        ? e.Fit.fill
                        : this.fit === t.FitWidth
                        ? e.Fit.fitWidth
                        : this.fit === t.FitHeight
                        ? e.Fit.fitHeight
                        : this.fit === t.ScaleDown
                        ? e.Fit.scaleDown
                        : e.Fit.none),
                    (this.cachedRuntimeFit = n),
                    n);
                var n;
              }),
              (n.prototype.runtimeAlignment = function (t) {
                return this.cachedRuntimeAlignment
                  ? this.cachedRuntimeAlignment
                  : ((n =
                      this.alignment === e.TopLeft
                        ? t.Alignment.topLeft
                        : this.alignment === e.TopCenter
                        ? t.Alignment.topCenter
                        : this.alignment === e.TopRight
                        ? t.Alignment.topRight
                        : this.alignment === e.CenterLeft
                        ? t.Alignment.centerLeft
                        : this.alignment === e.CenterRight
                        ? t.Alignment.centerRight
                        : this.alignment === e.BottomLeft
                        ? t.Alignment.bottomLeft
                        : this.alignment === e.BottomCenter
                        ? t.Alignment.bottomCenter
                        : this.alignment === e.BottomRight
                        ? t.Alignment.bottomRight
                        : t.Alignment.center),
                    (this.cachedRuntimeAlignment = n),
                    n);
                var n;
              }),
              n
            );
          })(),
          h = (function () {
            function t() {}
            return (
              (t.loadRuntime = function () {
                r.default({
                  locateFile: function () {
                    return t.wasmURL;
                  },
                })
                  .then(function (e) {
                    var n;
                    for (t.runtime = e; t.callBackQueue.length > 0; )
                      null === (n = t.callBackQueue.shift()) ||
                        void 0 === n ||
                        n(t.runtime);
                  })
                  .catch(function () {
                    var e = "https://cdn.jsdelivr.net/npm/"
                      .concat(i.name, "@")
                      .concat(i.version, "/rive.wasm");
                    t.wasmURL.toLowerCase() !== e
                      ? (console.warn(
                          "Failed to load WASM from ".concat(
                            t.wasmURL,
                            ", trying jsdelivr as a backup"
                          )
                        ),
                        t.setWasmUrl(e),
                        t.loadRuntime())
                      : console.error(
                          "Could not load Rive WASM file from unpkg or jsdelivr, network connection may be down, or         you may need to call set a new WASM source via RuntimeLoader.setWasmUrl() and call         RuntimeLoader.loadRuntime() again"
                        );
                  });
              }),
              (t.getInstance = function (e) {
                t.isLoading || ((t.isLoading = !0), t.loadRuntime()),
                  t.runtime ? e(t.runtime) : t.callBackQueue.push(e);
              }),
              (t.awaitInstance = function () {
                return new Promise(function (e) {
                  return t.getInstance(function (t) {
                    return e(t);
                  });
                });
              }),
              (t.setWasmUrl = function (e) {
                t.wasmURL = e;
              }),
              (t.isLoading = !1),
              (t.callBackQueue = []),
              (t.wasmURL = "https://unpkg.com/"
                .concat(i.name, "@")
                .concat(i.version, "/rive.wasm")),
              t
            );
          })(),
          f = (function () {
            function t(t, e, n, a) {
              (this.animation = t),
                (this.artboard = e),
                (this.playing = a),
                (this.loopCount = 0),
                (this.scrubTo = null),
                (this.instance = new n.LinearAnimationInstance(t, e));
            }
            return (
              Object.defineProperty(t.prototype, "name", {
                get: function () {
                  return this.animation.name;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "time", {
                get: function () {
                  return this.instance.time;
                },
                set: function (t) {
                  this.instance.time = t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "loopValue", {
                get: function () {
                  return this.animation.loopValue;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.advance = function (t) {
                null === this.scrubTo
                  ? this.instance.advance(t)
                  : ((this.instance.time = 0),
                    this.instance.advance(this.scrubTo),
                    (this.scrubTo = null));
              }),
              (t.prototype.apply = function (t) {
                this.instance.apply(t);
              }),
              Object.defineProperty(t.prototype, "needsScrub", {
                get: function () {
                  return null !== this.scrubTo;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.cleanup = function () {
                this.instance.delete();
              }),
              t
            );
          })();
        !(function (t) {
          (t[(t.Number = 56)] = "Number"),
            (t[(t.Trigger = 58)] = "Trigger"),
            (t[(t.Boolean = 59)] = "Boolean");
        })(c || (c = {}));
        var d,
          p = (function () {
            function t(t, e) {
              (this.type = t), (this.runtimeInput = e);
            }
            return (
              Object.defineProperty(t.prototype, "name", {
                get: function () {
                  return this.runtimeInput.name;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "value", {
                get: function () {
                  return this.runtimeInput.value;
                },
                set: function (t) {
                  this.runtimeInput.value = t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.fire = function () {
                this.type === c.Trigger && this.runtimeInput.fire();
              }),
              t
            );
          })();
        !(function (t) {
          (t[(t.General = 128)] = "General"),
            (t[(t.OpenUrl = 131)] = "OpenUrl");
        })(d || (d = {}));
        var m,
          v,
          g = (function () {
            function t(t, e, n, a) {
              (this.stateMachine = t),
                (this.playing = n),
                (this.artboard = a),
                (this.inputs = []),
                (this.instance = new e.StateMachineInstance(t, a)),
                this.initInputs(e);
            }
            return (
              Object.defineProperty(t.prototype, "name", {
                get: function () {
                  return this.stateMachine.name;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "statesChanged", {
                get: function () {
                  for (
                    var t = [], e = 0;
                    e < this.instance.stateChangedCount();
                    e++
                  )
                    t.push(this.instance.stateChangedNameByIndex(e));
                  return t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.advance = function (t) {
                this.instance.advance(t);
              }),
              (t.prototype.reportedEventCount = function () {
                return this.instance.reportedEventCount();
              }),
              (t.prototype.reportedEventAt = function (t) {
                return this.instance.reportedEventAt(t);
              }),
              (t.prototype.initInputs = function (t) {
                for (var e = 0; e < this.instance.inputCount(); e++) {
                  var n = this.instance.input(e);
                  this.inputs.push(this.mapRuntimeInput(n, t));
                }
              }),
              (t.prototype.mapRuntimeInput = function (t, e) {
                return t.type === e.SMIInput.bool
                  ? new p(c.Boolean, t.asBool())
                  : t.type === e.SMIInput.number
                  ? new p(c.Number, t.asNumber())
                  : t.type === e.SMIInput.trigger
                  ? new p(c.Trigger, t.asTrigger())
                  : void 0;
              }),
              (t.prototype.cleanup = function () {
                this.instance.delete();
              }),
              t
            );
          })(),
          b = (function () {
            function t(t, e, n, a, r) {
              void 0 === a && (a = []),
                void 0 === r && (r = []),
                (this.runtime = t),
                (this.artboard = e),
                (this.eventManager = n),
                (this.animations = a),
                (this.stateMachines = r);
            }
            return (
              (t.prototype.add = function (t, e, n) {
                if ((void 0 === n && (n = !0), 0 === (t = T(t)).length))
                  this.animations.forEach(function (t) {
                    return (t.playing = e);
                  }),
                    this.stateMachines.forEach(function (t) {
                      return (t.playing = e);
                    });
                else
                  for (
                    var a = this.animations.map(function (t) {
                        return t.name;
                      }),
                      r = this.stateMachines.map(function (t) {
                        return t.name;
                      }),
                      i = 0;
                    i < t.length;
                    i++
                  ) {
                    var o = a.indexOf(t[i]),
                      s = r.indexOf(t[i]);
                    if (o >= 0 || s >= 0)
                      o >= 0
                        ? (this.animations[o].playing = e)
                        : (this.stateMachines[s].playing = e);
                    else {
                      var u = this.artboard.animationByName(t[i]);
                      if (u) {
                        var c = new f(u, this.artboard, this.runtime, e);
                        c.advance(0), c.apply(1), this.animations.push(c);
                      } else {
                        var l = this.artboard.stateMachineByName(t[i]);
                        if (l) {
                          var h = new g(l, this.runtime, e, this.artboard);
                          this.stateMachines.push(h);
                        }
                      }
                    }
                  }
                return (
                  n &&
                    (e
                      ? this.eventManager.fire({
                          type: m.Play,
                          data: this.playing,
                        })
                      : this.eventManager.fire({
                          type: m.Pause,
                          data: this.paused,
                        })),
                  e ? this.playing : this.paused
                );
              }),
              (t.prototype.initLinearAnimations = function (t, e) {
                for (
                  var n = this.animations.map(function (t) {
                      return t.name;
                    }),
                    a = 0;
                  a < t.length;
                  a++
                ) {
                  var r = n.indexOf(t[a]);
                  if (r >= 0) this.animations[r].playing = e;
                  else {
                    var i = this.artboard.animationByName(t[a]);
                    if (i) {
                      var o = new f(i, this.artboard, this.runtime, e);
                      o.advance(0), o.apply(1), this.animations.push(o);
                    }
                  }
                }
              }),
              (t.prototype.initStateMachines = function (t, e) {
                for (
                  var n = this.stateMachines.map(function (t) {
                      return t.name;
                    }),
                    a = 0;
                  a < t.length;
                  a++
                ) {
                  var r = n.indexOf(t[a]);
                  if (r >= 0) this.stateMachines[r].playing = e;
                  else {
                    var i = this.artboard.stateMachineByName(t[a]);
                    if (i) {
                      var o = new g(i, this.runtime, e, this.artboard);
                      this.stateMachines.push(o);
                    } else this.initLinearAnimations([t[a]], e);
                  }
                }
              }),
              (t.prototype.play = function (t) {
                return this.add(t, !0);
              }),
              (t.prototype.pause = function (t) {
                return this.add(t, !1);
              }),
              (t.prototype.scrub = function (t, e) {
                var n = this.animations.filter(function (e) {
                  return t.includes(e.name);
                });
                return (
                  n.forEach(function (t) {
                    return (t.scrubTo = e);
                  }),
                  n.map(function (t) {
                    return t.name;
                  })
                );
              }),
              Object.defineProperty(t.prototype, "playing", {
                get: function () {
                  return this.animations
                    .filter(function (t) {
                      return t.playing;
                    })
                    .map(function (t) {
                      return t.name;
                    })
                    .concat(
                      this.stateMachines
                        .filter(function (t) {
                          return t.playing;
                        })
                        .map(function (t) {
                          return t.name;
                        })
                    );
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "paused", {
                get: function () {
                  return this.animations
                    .filter(function (t) {
                      return !t.playing;
                    })
                    .map(function (t) {
                      return t.name;
                    })
                    .concat(
                      this.stateMachines
                        .filter(function (t) {
                          return !t.playing;
                        })
                        .map(function (t) {
                          return t.name;
                        })
                    );
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.stop = function (t) {
                var e = this,
                  n = [];
                if (0 === (t = T(t)).length)
                  (n = this.animations
                    .map(function (t) {
                      return t.name;
                    })
                    .concat(
                      this.stateMachines.map(function (t) {
                        return t.name;
                      })
                    )),
                    this.animations.forEach(function (t) {
                      return t.cleanup();
                    }),
                    this.stateMachines.forEach(function (t) {
                      return t.cleanup();
                    }),
                    this.animations.splice(0, this.animations.length),
                    this.stateMachines.splice(0, this.stateMachines.length);
                else {
                  var a = this.animations.filter(function (e) {
                    return t.includes(e.name);
                  });
                  a.forEach(function (t) {
                    t.cleanup(),
                      e.animations.splice(e.animations.indexOf(t), 1);
                  });
                  var r = this.stateMachines.filter(function (e) {
                    return t.includes(e.name);
                  });
                  r.forEach(function (t) {
                    t.cleanup(),
                      e.stateMachines.splice(e.stateMachines.indexOf(t), 1);
                  }),
                    (n = a
                      .map(function (t) {
                        return t.name;
                      })
                      .concat(
                        r.map(function (t) {
                          return t.name;
                        })
                      ));
                }
                return this.eventManager.fire({ type: m.Stop, data: n }), n;
              }),
              Object.defineProperty(t.prototype, "isPlaying", {
                get: function () {
                  return (
                    this.animations.reduce(function (t, e) {
                      return t || e.playing;
                    }, !1) ||
                    this.stateMachines.reduce(function (t, e) {
                      return t || e.playing;
                    }, !1)
                  );
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "isPaused", {
                get: function () {
                  return (
                    !this.isPlaying &&
                    (this.animations.length > 0 ||
                      this.stateMachines.length > 0)
                  );
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "isStopped", {
                get: function () {
                  return (
                    0 === this.animations.length &&
                    0 === this.stateMachines.length
                  );
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.atLeastOne = function (t, e) {
                var n;
                return (
                  void 0 === e && (e = !0),
                  0 === this.animations.length &&
                    0 === this.stateMachines.length &&
                    (this.artboard.animationCount() > 0
                      ? this.add(
                          [(n = this.artboard.animationByIndex(0).name)],
                          t,
                          e
                        )
                      : this.artboard.stateMachineCount() > 0 &&
                        this.add(
                          [(n = this.artboard.stateMachineByIndex(0).name)],
                          t,
                          e
                        )),
                  n
                );
              }),
              (t.prototype.handleLooping = function () {
                for (
                  var t = 0,
                    e = this.animations.filter(function (t) {
                      return t.playing;
                    });
                  t < e.length;
                  t++
                ) {
                  var n = e[t];
                  0 === n.loopValue && n.loopCount
                    ? ((n.loopCount = 0), this.stop(n.name))
                    : 1 === n.loopValue && n.loopCount
                    ? (this.eventManager.fire({
                        type: m.Loop,
                        data: { animation: n.name, type: v.Loop },
                      }),
                      (n.loopCount = 0))
                    : 2 === n.loopValue &&
                      n.loopCount > 1 &&
                      (this.eventManager.fire({
                        type: m.Loop,
                        data: { animation: n.name, type: v.PingPong },
                      }),
                      (n.loopCount = 0));
                }
              }),
              (t.prototype.handleStateChanges = function () {
                for (
                  var t = [],
                    e = 0,
                    n = this.stateMachines.filter(function (t) {
                      return t.playing;
                    });
                  e < n.length;
                  e++
                ) {
                  var a = n[e];
                  t.push.apply(t, a.statesChanged);
                }
                t.length > 0 &&
                  this.eventManager.fire({ type: m.StateChange, data: t });
              }),
              (t.prototype.handleAdvancing = function (t) {
                this.eventManager.fire({ type: m.Advance, data: t });
              }),
              t
            );
          })();
        !(function (t) {
          (t.Load = "load"),
            (t.LoadError = "loaderror"),
            (t.Play = "play"),
            (t.Pause = "pause"),
            (t.Stop = "stop"),
            (t.Loop = "loop"),
            (t.Draw = "draw"),
            (t.Advance = "advance"),
            (t.StateChange = "statechange"),
            (t.RiveEvent = "riveevent");
        })(m || (m = {})),
          (function (t) {
            (t.OneShot = "oneshot"),
              (t.Loop = "loop"),
              (t.PingPong = "pingpong");
          })(v || (v = {}));
        var y = (function () {
            function t(t) {
              void 0 === t && (t = []), (this.listeners = t);
            }
            return (
              (t.prototype.getListeners = function (t) {
                return this.listeners.filter(function (e) {
                  return e.type === t;
                });
              }),
              (t.prototype.add = function (t) {
                this.listeners.includes(t) || this.listeners.push(t);
              }),
              (t.prototype.remove = function (t) {
                for (var e = 0; e < this.listeners.length; e++) {
                  var n = this.listeners[e];
                  if (n.type === t.type && n.callback === t.callback) {
                    this.listeners.splice(e, 1);
                    break;
                  }
                }
              }),
              (t.prototype.removeAll = function (t) {
                var e = this;
                t
                  ? this.listeners
                      .filter(function (e) {
                        return e.type === t;
                      })
                      .forEach(function (t) {
                        return e.remove(t);
                      })
                  : this.listeners.splice(0, this.listeners.length);
              }),
              (t.prototype.fire = function (t) {
                this.getListeners(t.type).forEach(function (e) {
                  return e.callback(t);
                });
              }),
              t
            );
          })(),
          w = (function () {
            function t(t) {
              (this.eventManager = t), (this.queue = []);
            }
            return (
              (t.prototype.add = function (t) {
                this.queue.push(t);
              }),
              (t.prototype.process = function () {
                for (; this.queue.length > 0; ) {
                  var t = this.queue.shift();
                  (null == t ? void 0 : t.action) && t.action(),
                    (null == t ? void 0 : t.event) &&
                      this.eventManager.fire(t.event);
                }
              }),
              t
            );
          })(),
          A = (function () {
            function t(t) {
              var e;
              (this.loaded = !1),
                (this.readyForPlaying = !1),
                (this.artboard = null),
                (this.eventCleanup = null),
                (this.shouldDisableRiveListeners = !1),
                (this.automaticallyHandleEvents = !1),
                (this.enableRiveAssetCDN = !0),
                (this.durations = []),
                (this.frameTimes = []),
                (this.frameCount = 0),
                (this.renderSecondTimer = 0),
                (this.canvas = t.canvas),
                (this.src = t.src),
                (this.buffer = t.buffer),
                (this.layout =
                  null !== (e = t.layout) && void 0 !== e ? e : new l()),
                (this.shouldDisableRiveListeners =
                  !!t.shouldDisableRiveListeners),
                (this.automaticallyHandleEvents =
                  !!t.automaticallyHandleEvents),
                (this.enableRiveAssetCDN =
                  void 0 === t.enableRiveAssetCDN || t.enableRiveAssetCDN),
                (this.eventManager = new y()),
                t.onLoad && this.on(m.Load, t.onLoad),
                t.onLoadError && this.on(m.LoadError, t.onLoadError),
                t.onPlay && this.on(m.Play, t.onPlay),
                t.onPause && this.on(m.Pause, t.onPause),
                t.onStop && this.on(m.Stop, t.onStop),
                t.onLoop && this.on(m.Loop, t.onLoop),
                t.onStateChange && this.on(m.StateChange, t.onStateChange),
                t.onAdvance && this.on(m.Advance, t.onAdvance),
                t.onload && !t.onLoad && this.on(m.Load, t.onload),
                t.onloaderror &&
                  !t.onLoadError &&
                  this.on(m.LoadError, t.onloaderror),
                t.onplay && !t.onPlay && this.on(m.Play, t.onplay),
                t.onpause && !t.onPause && this.on(m.Pause, t.onpause),
                t.onstop && !t.onStop && this.on(m.Stop, t.onstop),
                t.onloop && !t.onLoop && this.on(m.Loop, t.onloop),
                t.onstatechange &&
                  !t.onStateChange &&
                  this.on(m.StateChange, t.onstatechange),
                t.assetLoader && (this.assetLoader = t.assetLoader),
                (this.taskQueue = new w(this.eventManager)),
                this.init({
                  src: this.src,
                  buffer: this.buffer,
                  autoplay: t.autoplay,
                  animations: t.animations,
                  stateMachines: t.stateMachines,
                  artboard: t.artboard,
                  useOffscreenRenderer: t.useOffscreenRenderer,
                });
            }
            return (
              (t.new = function (e) {
                return (
                  console.warn(
                    "This function is deprecated: please use `new Rive({})` instead"
                  ),
                  new t(e)
                );
              }),
              (t.prototype.init = function (e) {
                var n = this,
                  a = e.src,
                  r = e.buffer,
                  i = e.animations,
                  o = e.stateMachines,
                  s = e.artboard,
                  u = e.autoplay,
                  c = void 0 !== u && u,
                  l = e.useOffscreenRenderer,
                  f = void 0 !== l && l;
                if (
                  ((this.src = a), (this.buffer = r), !this.src && !this.buffer)
                )
                  throw new Error(t.missingErrorMessage);
                var d = T(i),
                  p = T(o);
                (this.loaded = !1),
                  (this.readyForPlaying = !1),
                  h
                    .awaitInstance()
                    .then(function (t) {
                      (n.runtime = t),
                        (n.renderer = n.runtime.makeRenderer(n.canvas, f)),
                        n.canvas.width ||
                          n.canvas.height ||
                          n.resizeDrawingSurfaceToCanvas(),
                        n
                          .initData(s, d, p, c)
                          .then(function () {
                            return n.setupRiveListeners();
                          })
                          .catch(function (t) {
                            console.error(t);
                          });
                    })
                    .catch(function (t) {
                      console.error(t);
                    });
              }),
              (t.prototype.setupRiveListeners = function () {
                var t = this;
                if (!this.shouldDisableRiveListeners) {
                  var e = (this.animator.stateMachines || [])
                    .filter(function (e) {
                      return e.playing && t.runtime.hasListeners(e.instance);
                    })
                    .map(function (t) {
                      return t.instance;
                    });
                  this.eventCleanup = (0, o.registerTouchInteractions)({
                    canvas: this.canvas,
                    artboard: this.artboard,
                    stateMachines: e,
                    renderer: this.renderer,
                    rive: this.runtime,
                    fit: this._layout.runtimeFit(this.runtime),
                    alignment: this._layout.runtimeAlignment(this.runtime),
                  });
                }
              }),
              (t.prototype.initData = function (t, e, n, a) {
                var r;
                return s(this, void 0, void 0, function () {
                  var i, o, s, c;
                  return u(this, function (u) {
                    switch (u.label) {
                      case 0:
                        return this.src
                          ? ((i = this), [4, R(this.src)])
                          : [3, 2];
                      case 1:
                        (i.buffer = u.sent()), (u.label = 2);
                      case 2:
                        return (
                          this.assetLoader &&
                            (o = new this.runtime.CustomFileAssetLoader({
                              loadContents: this.assetLoader,
                            })),
                          (s = this),
                          [
                            4,
                            this.runtime.load(
                              new Uint8Array(this.buffer),
                              o,
                              this.enableRiveAssetCDN
                            ),
                          ]
                        );
                      case 3:
                        return (
                          (s.file = u.sent()),
                          this.file
                            ? (this.initArtboard(t, e, n, a),
                              (this.loaded = !0),
                              this.eventManager.fire({
                                type: m.Load,
                                data:
                                  null !== (r = this.src) && void 0 !== r
                                    ? r
                                    : "buffer",
                              }),
                              (this.readyForPlaying = !0),
                              this.taskQueue.process(),
                              this.drawFrame(),
                              [2, Promise.resolve()])
                            : ((c = "Problem loading file; may be corrupt!"),
                              console.warn(c),
                              this.eventManager.fire({
                                type: m.LoadError,
                                data: c,
                              }),
                              [2, Promise.reject(c)])
                        );
                    }
                  });
                });
              }),
              (t.prototype.initArtboard = function (t, e, n, a) {
                var r,
                  i = t
                    ? this.file.artboardByName(t)
                    : this.file.defaultArtboard();
                if (!i) {
                  var o = "Invalid artboard name or no default artboard";
                  return (
                    console.warn(o),
                    void this.eventManager.fire({ type: m.LoadError, data: o })
                  );
                }
                if (((this.artboard = i), this.artboard.animationCount() < 1)) {
                  o = "Artboard has no animations";
                  throw (
                    (this.eventManager.fire({ type: m.LoadError, data: o }), o)
                  );
                }
                (this.animator = new b(
                  this.runtime,
                  this.artboard,
                  this.eventManager
                )),
                  e.length > 0 || n.length > 0
                    ? ((r = e.concat(n)),
                      this.animator.initLinearAnimations(e, a),
                      this.animator.initStateMachines(n, a))
                    : (r = [this.animator.atLeastOne(a, !1)]),
                  this.taskQueue.add({
                    event: { type: a ? m.Play : m.Pause, data: r },
                  });
              }),
              (t.prototype.drawFrame = function () {
                this.startRendering();
              }),
              (t.prototype.draw = function (t, e) {
                var n = performance.now();
                (this.frameRequestId = null),
                  this.lastRenderTime || (this.lastRenderTime = t),
                  (this.renderSecondTimer += t - this.lastRenderTime),
                  this.renderSecondTimer > 5e3 &&
                    ((this.renderSecondTimer = 0), null == e || e());
                var a = (t - this.lastRenderTime) / 1e3;
                this.lastRenderTime = t;
                for (
                  var r = 0,
                    i = this.animator.animations
                      .filter(function (t) {
                        return t.playing || t.needsScrub;
                      })
                      .sort(function (t) {
                        return t.needsScrub ? -1 : 1;
                      });
                  r < i.length;
                  r++
                ) {
                  var s = i[r];
                  s.advance(a),
                    s.instance.didLoop && (s.loopCount += 1),
                    s.apply(1);
                }
                for (
                  var u = 0,
                    c = this.animator.stateMachines.filter(function (t) {
                      return t.playing;
                    });
                  u < c.length;
                  u++
                ) {
                  var l = c[u],
                    h = l.reportedEventCount();
                  if (h)
                    for (var f = 0; f < h; f++) {
                      var p = l.reportedEventAt(f);
                      if (p)
                        if (p.type === d.OpenUrl) {
                          if (
                            (this.eventManager.fire({
                              type: m.RiveEvent,
                              data: p,
                            }),
                            this.automaticallyHandleEvents)
                          ) {
                            var v = document.createElement("a"),
                              g = p,
                              b = g.url,
                              y = g.target,
                              w = (0, o.sanitizeUrl)(b);
                            b && v.setAttribute("href", w),
                              y && v.setAttribute("target", y),
                              w && w !== o.BLANK_URL && v.click();
                          }
                        } else
                          this.eventManager.fire({
                            type: m.RiveEvent,
                            data: p,
                          });
                    }
                  l.advance(a);
                }
                this.artboard.advance(a);
                var A = this.renderer;
                A.clear(),
                  A.save(),
                  this.alignRenderer(),
                  this.artboard.draw(A),
                  A.restore(),
                  A.flush(),
                  this.animator.handleLooping(),
                  this.animator.handleStateChanges(),
                  this.animator.handleAdvancing(a),
                  this.frameCount++;
                var R = performance.now();
                for (
                  this.frameTimes.push(R), this.durations.push(R - n);
                  this.frameTimes[0] <= R - 1e3;

                )
                  this.frameTimes.shift(), this.durations.shift();
                this.animator.isPlaying
                  ? this.startRendering()
                  : (this.animator.isPaused || this.animator.isStopped) &&
                    (this.lastRenderTime = 0);
              }),
              (t.prototype.alignRenderer = function () {
                var t = this,
                  e = t.renderer,
                  n = t.runtime,
                  a = t._layout,
                  r = t.artboard;
                e.align(
                  a.runtimeFit(n),
                  a.runtimeAlignment(n),
                  { minX: a.minX, minY: a.minY, maxX: a.maxX, maxY: a.maxY },
                  r.bounds
                );
              }),
              Object.defineProperty(t.prototype, "fps", {
                get: function () {
                  return this.durations.length;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "frameTime", {
                get: function () {
                  return 0 === this.durations.length
                    ? 0
                    : (
                        this.durations.reduce(function (t, e) {
                          return t + e;
                        }, 0) / this.durations.length
                      ).toFixed(4);
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.cleanup = function () {
                var t, e, n;
                this.stopRendering(),
                  this.cleanupInstances(),
                  (null === (t = this.runtime) || void 0 === t
                    ? void 0
                    : t.CanvasRenderer) &&
                    (null === (e = this.renderer) ||
                      void 0 === e ||
                      e.delete()),
                  (this.renderer = null),
                  null === (n = this.file) || void 0 === n || n.delete(),
                  (this.file = null);
              }),
              (t.prototype.cleanupInstances = function () {
                null !== this.eventCleanup && this.eventCleanup(),
                  this.stop(),
                  this.artboard &&
                    (this.artboard.delete(), (this.artboard = null));
              }),
              (t.prototype.retrieveTextRun = function (t) {
                var e;
                if (t)
                  if (this.artboard) {
                    var n = this.artboard.textRun(t);
                    if (n) return n;
                    console.warn(
                      "Could not access a text run with name '"
                        .concat(t, "' in the '")
                        .concat(
                          null === (e = this.artboard) || void 0 === e
                            ? void 0
                            : e.name,
                          "' Artboard. Note that you must rename a text run node in the Rive editor to make it queryable at runtime."
                        )
                    );
                  } else
                    console.warn(
                      "Tried to access text run, but the Artboard is null"
                    );
                else console.warn("No text run name provided");
              }),
              (t.prototype.getTextRunValue = function (t) {
                var e = this.retrieveTextRun(t);
                return e ? e.text : void 0;
              }),
              (t.prototype.setTextRunValue = function (t, e) {
                var n = this.retrieveTextRun(t);
                n && (n.text = e);
              }),
              (t.prototype.play = function (t, e) {
                var n = this;
                (t = T(t)),
                  this.readyForPlaying
                    ? (this.animator.play(t),
                      this.eventCleanup && this.eventCleanup(),
                      this.setupRiveListeners(),
                      this.startRendering())
                    : this.taskQueue.add({
                        action: function () {
                          return n.play(t, e);
                        },
                      });
              }),
              (t.prototype.pause = function (t) {
                var e = this;
                (t = T(t)),
                  this.readyForPlaying
                    ? (this.eventCleanup && this.eventCleanup(),
                      this.animator.pause(t))
                    : this.taskQueue.add({
                        action: function () {
                          return e.pause(t);
                        },
                      });
              }),
              (t.prototype.scrub = function (t, e) {
                var n = this;
                (t = T(t)),
                  this.readyForPlaying
                    ? (this.animator.scrub(t, e || 0), this.drawFrame())
                    : this.taskQueue.add({
                        action: function () {
                          return n.scrub(t, e);
                        },
                      });
              }),
              (t.prototype.stop = function (t) {
                var e = this;
                (t = T(t)),
                  this.readyForPlaying
                    ? (this.animator.stop(t),
                      this.eventCleanup && this.eventCleanup())
                    : this.taskQueue.add({
                        action: function () {
                          return e.stop(t);
                        },
                      });
              }),
              (t.prototype.reset = function (t) {
                var e,
                  n = null == t ? void 0 : t.artboard,
                  a = T(null == t ? void 0 : t.animations),
                  r = T(null == t ? void 0 : t.stateMachines),
                  i =
                    null !== (e = null == t ? void 0 : t.autoplay) &&
                    void 0 !== e &&
                    e;
                this.cleanupInstances(),
                  this.initArtboard(n, a, r, i),
                  this.taskQueue.process();
              }),
              (t.prototype.load = function (t) {
                this.stop(), this.init(t);
              }),
              Object.defineProperty(t.prototype, "layout", {
                get: function () {
                  return this._layout;
                },
                set: function (t) {
                  (this._layout = t),
                    (t.maxX && t.maxY) || this.resizeToCanvas(),
                    this.loaded && !this.animator.isPlaying && this.drawFrame();
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.resizeToCanvas = function () {
                this._layout = this.layout.copyWith({
                  minX: 0,
                  minY: 0,
                  maxX: this.canvas.width,
                  maxY: this.canvas.height,
                });
              }),
              (t.prototype.resizeDrawingSurfaceToCanvas = function () {
                if (this.canvas instanceof HTMLCanvasElement && window) {
                  var t = this.canvas.getBoundingClientRect(),
                    e = t.width,
                    n = t.height,
                    a = window.devicePixelRatio || 1;
                  (this.canvas.width = a * e),
                    (this.canvas.height = a * n),
                    this.startRendering(),
                    this.resizeToCanvas();
                }
              }),
              Object.defineProperty(t.prototype, "source", {
                get: function () {
                  return this.src;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "activeArtboard", {
                get: function () {
                  return this.artboard ? this.artboard.name : "";
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "animationNames", {
                get: function () {
                  if (!this.loaded) return [];
                  for (
                    var t = [], e = 0;
                    e < this.artboard.animationCount();
                    e++
                  )
                    t.push(this.artboard.animationByIndex(e).name);
                  return t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "stateMachineNames", {
                get: function () {
                  if (!this.loaded) return [];
                  for (
                    var t = [], e = 0;
                    e < this.artboard.stateMachineCount();
                    e++
                  )
                    t.push(this.artboard.stateMachineByIndex(e).name);
                  return t;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.stateMachineInputs = function (t) {
                if (this.loaded) {
                  var e = this.animator.stateMachines.find(function (e) {
                    return e.name === t;
                  });
                  return null == e ? void 0 : e.inputs;
                }
              }),
              Object.defineProperty(t.prototype, "playingStateMachineNames", {
                get: function () {
                  return this.loaded
                    ? this.animator.stateMachines
                        .filter(function (t) {
                          return t.playing;
                        })
                        .map(function (t) {
                          return t.name;
                        })
                    : [];
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "playingAnimationNames", {
                get: function () {
                  return this.loaded
                    ? this.animator.animations
                        .filter(function (t) {
                          return t.playing;
                        })
                        .map(function (t) {
                          return t.name;
                        })
                    : [];
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "pausedAnimationNames", {
                get: function () {
                  return this.loaded
                    ? this.animator.animations
                        .filter(function (t) {
                          return !t.playing;
                        })
                        .map(function (t) {
                          return t.name;
                        })
                    : [];
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "pausedStateMachineNames", {
                get: function () {
                  return this.loaded
                    ? this.animator.stateMachines
                        .filter(function (t) {
                          return !t.playing;
                        })
                        .map(function (t) {
                          return t.name;
                        })
                    : [];
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "isPlaying", {
                get: function () {
                  return this.animator.isPlaying;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "isPaused", {
                get: function () {
                  return this.animator.isPaused;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "isStopped", {
                get: function () {
                  return this.animator.isStopped;
                },
                enumerable: !1,
                configurable: !0,
              }),
              Object.defineProperty(t.prototype, "bounds", {
                get: function () {
                  return this.artboard ? this.artboard.bounds : void 0;
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.prototype.on = function (t, e) {
                this.eventManager.add({ type: t, callback: e });
              }),
              (t.prototype.off = function (t, e) {
                this.eventManager.remove({ type: t, callback: e });
              }),
              (t.prototype.unsubscribe = function (t, e) {
                console.warn(
                  "This function is deprecated: please use `off()` instead."
                ),
                  this.off(t, e);
              }),
              (t.prototype.removeAllRiveEventListeners = function (t) {
                this.eventManager.removeAll(t);
              }),
              (t.prototype.unsubscribeAll = function (t) {
                console.warn(
                  "This function is deprecated: please use `removeAllRiveEventListeners()` instead."
                ),
                  this.removeAllRiveEventListeners(t);
              }),
              (t.prototype.stopRendering = function () {
                this.loaded &&
                  this.frameRequestId &&
                  (this.runtime.cancelAnimationFrame
                    ? this.runtime.cancelAnimationFrame(this.frameRequestId)
                    : cancelAnimationFrame(this.frameRequestId),
                  (this.frameRequestId = null));
              }),
              (t.prototype.startRendering = function () {
                this.loaded &&
                  this.artboard &&
                  !this.frameRequestId &&
                  (this.runtime.requestAnimationFrame
                    ? (this.frameRequestId = this.runtime.requestAnimationFrame(
                        this.draw.bind(this)
                      ))
                    : (this.frameRequestId = requestAnimationFrame(
                        this.draw.bind(this)
                      )));
              }),
              (t.prototype.enableFPSCounter = function (t) {
                this.runtime.enableFPSCounter(t);
              }),
              (t.prototype.disableFPSCounter = function () {
                this.runtime.disableFPSCounter();
              }),
              Object.defineProperty(t.prototype, "contents", {
                get: function () {
                  if (this.loaded) {
                    for (
                      var t = { artboards: [] }, e = 0;
                      e < this.file.artboardCount();
                      e++
                    ) {
                      for (
                        var n = this.file.artboardByIndex(e),
                          a = {
                            name: n.name,
                            animations: [],
                            stateMachines: [],
                          },
                          r = 0;
                        r < n.animationCount();
                        r++
                      ) {
                        var i = n.animationByIndex(r);
                        a.animations.push(i.name);
                      }
                      for (var o = 0; o < n.stateMachineCount(); o++) {
                        for (
                          var s = n.stateMachineByIndex(o),
                            u = s.name,
                            c = new this.runtime.StateMachineInstance(s, n),
                            l = [],
                            h = 0;
                          h < c.inputCount();
                          h++
                        ) {
                          var f = c.input(h);
                          l.push({ name: f.name, type: f.type });
                        }
                        a.stateMachines.push({ name: u, inputs: l });
                      }
                      t.artboards.push(a);
                    }
                    return t;
                  }
                },
                enumerable: !1,
                configurable: !0,
              }),
              (t.missingErrorMessage =
                "Rive source file or data buffer required"),
              t
            );
          })(),
          R = function (t) {
            return s(void 0, void 0, void 0, function () {
              var e;
              return u(this, function (n) {
                switch (n.label) {
                  case 0:
                    return (e = new Request(t)), [4, fetch(e)];
                  case 1:
                    return [4, n.sent().arrayBuffer()];
                  case 2:
                    return [2, n.sent()];
                }
              });
            });
          },
          T = function (t) {
            return "string" == typeof t ? [t] : t instanceof Array ? t : [];
          },
          C = { EventManager: y, TaskQueueManager: w },
          P = function (t) {
            return new Promise(function (e) {
              return h.getInstance(function (n) {
                n.decodeImage(t, e);
              });
            });
          },
          E = function (t) {
            return new Promise(function (e) {
              return h.getInstance(function (n) {
                n.decodeFont(t, e);
              });
            });
          };
      })(),
      a
    );
  })()
);
