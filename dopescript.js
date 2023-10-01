'use strict';
!function (e, t) {
  var r = 5;
  function n(e) {
    r-- <= 0 ||
    'undefined' != typeof fetch &&
    fetch(
      '/report-error?error='.concat(encodeURIComponent(e), '&room=').concat(ROOM_NAME, '&t=').concat(Date.now())
    )
  }
  e.onerror = function (e, t, r, a, i) {
    n(''.concat(e, '\n').concat(i && i.stack))
  },
  e.onunhandledrejection = function (e) {
    var t = e.reason;
    n('[rejection] '.concat(t && t.message, '\n').concat(t && t.stack))
  };
  var a = navigator.userAgent,
  i = /Macintosh/.test(a),
  o = /iPad/.test(a) ||
  !!(/Macintosh/.test(a) && navigator.maxTouchPoints > 2),
  s = /iPhone/.test(a),
  l = o ||
  s;
  l &&
  t.body.classList.add('is-ios');
  var c = 1.5,
  u = 2 * Math.PI,
  d = 'M391.17,103.47H352.54v109.7h38.63ZM285,103H246.37V212.75H285ZM120.83,0,24.31,91.42V420.58H140.14V512l96.53-91.42h77.25L487.69,256V0ZM449.07,237.75l-77.22,73.12H294.61l-67.6,64v-64H140.14V36.58H449.07Z',
  h = 123,
  f = {},
  v = [],
  g = [],
  p = ea('session') ||
  '',
  m = ea('name') ||
  '',
  x = '',
  w = ea('color') ||
  '#ff5bb6',
  y = ea('bg') ||
  '#222222',
  T = ea('pick') ||
  'hold',
  b = 'y' === ea('hideusers'),
  E = 'y' === ea('hidechat'),
  C = 'y' === ea('mutesounds'),
  R = jn(y),
  M = 0,
  k = !1,
  _ = 0,
  D = wn(ra('preview-scale', 1), 0.5, 4),
  U = performance.now(),
  A = 0,
  X = 0,
  O = !1,
  P = 0,
  S = 0,
  I = void 0,
  F = new Uint8Array(1024),
  z = new DataView(F.buffer),
  N = !0,
  Y = !0,
  L = l ||
  'cpu' !== ea('renderer'),
  B = [],
  H = [],
  W = [],
  G = [],
  V = [],
  q = [],
  K = 0,
  j = 0,
  J = 0,
  Z = 0,
  $ = 0,
  Q = 0,
  ee = void 0,
  te = !1,
  re = !0,
  ne = 0,
  ae = 0,
  ie = 0,
  oe = 1;
  ea('viewRoom') === ROOM_NAME &&
  (ae = ra('viewX', 0), ie = ra('viewY', 0), oe = ra('viewScale', 1));
  var se = !1,
  le = 0,
  ce = 0,
  ue = 0,
  de = 0,
  he = 0,
  fe = 0,
  ve = 0,
  ge = 0,
  pe = 0,
  me = 0,
  xe = [],
  we = !1,
  ye = !1,
  Te = !1,
  be = 10,
  Ee = 10,
  Ce = 100,
  Re = 100;
  try {
    g = JSON.parse(ea('views') || '[]')
  } catch (e) {
    console.error(e)
  }
  var Me = na('fullroom-form'),
  ke = na('authrequired-form'),
  _e = na('authrequired-signin'),
  De = na('start-help-message');
  ea('help-dismissed') ||
  (
    De.style.display = 'block',
    la(
      na('close-help-button'),
      (
        function () {
          De.style.display = 'none',
          ta('help-dismissed', 'yes')
        }
      )
    )
  ),
  ROOM_NAME &&
  ROOM_SECRET &&
  ta('secret:'.concat(ROOM_NAME), ROOM_SECRET),
  i &&
  (na('ctrl-key').textContent = '⌘+Z');
  var Ue = na('users'),
  Ae = na('chat'),
  Xe = na('room-form');
  sa(Xe);
  var Oe = ea('secret:'.concat(ROOM_NAME));
  if (Oe) {
    var Pe = na('room-settings');
    Pe.style.display = 'block',
    la(
      Pe,
      (
        function () {
          Xe.style.display = 'flex',
          Xe.scrollTop = 0,
          Xe.preview.checked = !!f.hidePreview,
          Xe.nomultiselect.checked = !!f.nomultiselect,
          Xe.nolockunlock.checked = !!f.nolockunlock,
          Xe.onlyoauth.checked = !!f.onlyoauth
        }
      )
    ),
    la(na('room-form-button'), (function () {
      Xe.style.display = 'none'
    }));
    var Se = na('unkickall-button');
    la(
      Se,
      (
        function () {
          Cn({
            type: 'unkickall',
            secret: Oe
          }),
          Se.innerText = 'cleared block list',
          Se.disabled = !0,
          setTimeout(
            (
              function () {
                Se.innerText = 'unblock all blocked users',
                Se.disabled = !1
              }
            ),
            5000
          )
        }
      )
    ),
    la(na('revert-10s'), (function () {
      return Fe(10000)
    })),
    la(na('revert-1m'), (function () {
      return Fe(60000)
    })),
    la(na('revert-5m'), (function () {
      return Fe(300000)
    })),
    ca(
      Xe,
      'submit',
      (
        function (e) {
          e.preventDefault(),
          Xe.style.display = 'none',
          Cn({
            type: 'options',
            secret: Oe,
            hidePreview: Xe.preview.checked,
            nomultiselect: Xe.nomultiselect.checked,
            nolockunlock: Xe.nolockunlock.checked,
            onlyoauth: Xe.onlyoauth.checked
          })
        }
      )
    );
    var Ie = na('confirmdelete-form');
    la(
      na('delete-yes-button'),
      (
        function () {
          Cn({
            type: 'delete',
            secret: Oe
          }),
          Ie.style.display = 'none',
          Xe.style.display = 'none'
        }
      )
    ),
    la(na('delete-no-button'), (function () {
      Ie.style.display = 'none'
    })),
    la(
      na('deleteroom-button'),
      (function () {
        Ie.style.display = 'flex'
      })
    )
  }
  function Fe(e) {
    Cn({
      type: 'revert',
      time: e
    }),
    Xe.style.display = 'none'
  }
  function ze() {
    return !f.nomultiselect ||
    !!Oe
  }
  function Ne() {
    return !f.nolockunlock ||
    !!Oe
  }
  function Ye() {
    return false
  }
  var Le = na('preview-box'),
  Be = na('preview-buttons');
  la(
    na('preview-zoom-in'),
    (function () {
      ta('preview-scale', D = Math.min(1.2 * D, 5)),
      N = !0
    })
  ),
  la(
    na('preview-zoom-out'),
    (function () {
      ta('preview-scale', D = Math.max(0.8 * D, 0.2)),
      N = !0
    })
  );
  var He = na('preview-next');
  function We() {
    Ve(),
    f.hidePreview ||
    (k = !k, Be.style.display = k ? 'block' : 'none'),
    N = !0
  }
  function Ge(e, t) {
    var r = e.querySelector('.dropdown-toggle'),
    n = e.querySelector('.dropdown-menu'),
    a = !1;
    function i() {
      a ||
      Ve(),
      a = !a,
      n.style.display = a ? 'block' : 'none',
      a ? (t && t(), e.classList.add('open')) : e.classList.remove('open')
    }
    la(r, i),
    la(n, i),
    H.push((function () {
      return a &&
      i()
    }))
  }
  function Ve() {
    H.forEach((function (e) {
      return e()
    }))
  }
  la(He, (function () {
    v.length > 1 &&
    (_ = (_ + 1) % v.length, N = !0)
  })),
  la(na('preview-button'), We),
  Ge(
    na('menu'),
    (
      function () {
        De.style.display = 'none',
        ta('help-dismissed', 'yes')
      }
    )
  ),
  Ge(na('locked-box'));
  var qe = na('locked-box'),
  Ke = na('locked-count');
  function je() {
    for (var e = 0, t = 0, r = G; t < r.length; t++) {
      r[t].locked &&
      e++
    }
    Ke.textContent = ''.concat(e),
    qe.style.display = e ? 'block' : 'none'
  }
  la(
    na('unlock-all'),
    (
      function () {
        var e = G.filter((function (e) {
          return e.locked
        }));
        e.length &&
        Ne() &&
        (
          e.forEach((function (e) {
            return e.locked = !1
          })),
          _n(9, e),
          yt(mt),
          je()
        )
      }
    )
  );
  var Je = na('help-form');
  if (
    sa(Je),
    la(
      na('show-help'),
      (function () {
        Je.style.display = 'flex',
        Je.scrollTop = 0
      })
    ),
    la(
      na('help-form-button'),
      (function () {
        return Je.style.display = 'none'
      })
    ),
    'share' in navigator
  ) {
    var Ze = na('share-link');
    Ze.style.display = 'block',
    la(
      Ze,
      (
        function () {
          var e = navigator.share({
            title: t.title,
            url: location.href
          });
          e &&
          e.catch &&
          e.catch((function () {
          }))
        }
      )
    )
  }
  var $e = na('user-form'),
  Qe = na('user-form-from-oauth'),
  et = na('userFormTwitchSignIn'),
  tt = na('userFormTwitchSignOut');
  sa($e),
  la(
    na('chat-button'),
    (function () {
      'block' === rt.style.display ? $n() : Zn()
    })
  );
  var rt = na('chat-input'),
  nt = na('chat-log'),
  at = na('chat-messages');
  function it() {
    for (; at.lastElementChild; ) at.removeChild(at.lastElementChild)
  }
  ca(
    nt,
    [
      'wheel',
      'touchstart',
      'touchmove',
      'touchend'
    ],
    (
      function (e) {
        e.target !== nt &&
        e.target !== at &&
        e.stopPropagation()
      }
    )
  ),
  ca(
    rt,
    'keydown',
    (
      function (e) {
        13 === e.keyCode &&
        Ye() ? (
          '/clear' === rt.value ? it() : rt.value &&
          An(rt.value),
          $n(),
          setTimeout((function () {
            return nt.scrollTop = 1000000
          }))
        ) : 27 === e.keyCode &&
        $n()
      }
    )
  ),
  la(na('clear-chat'), it),
  sa(rt);
  var ot = na('pieceBox'),
  st = na('pieceCount'),
  lt = na('loading'),
  ct = na('loading-text'),
  ut = na('new-room-same-image'),
  dt = na('canvas'),
  ht = 1;
  dt.width = e.innerWidth,
  dt.height = e.innerHeight;
  var ft = void 0,
  vt = void 0,
  gt = void 0,
  pt = void 0,
  mt = void 0,
  xt = void 0;
  function wt() {
    try {
      var t = function (e, t) {
        var n = '/assets/'.concat(e, '.').concat(r ? 'webm' : 'mp3'),
        a = new XMLHttpRequest;
        a.open('GET', n, !0),
        a.responseType = 'arraybuffer',
        a.onload = function () {
          try {
            var e = vt.decodeAudioData(a.response, t, (function (e) {
              return console.error(e)
            }));
            e &&
            e.catch((function (e) {
              return console.error(e)
            }))
          } catch (e) {
            console.error(e)
          }
        },
        a.send()
      };
      if (vt) return;
      var r = (new Audio).canPlayType('audio/webm'),
      n = e.AudioContext ||
      e.webkitAudioContext;
      if (!('decodeAudioData' in (vt = new n))) return;
      t('click', (function (e) {
        var t = yt(gt = e);
        t &&
        t.disconnect()
      })),
      t('chat', (function (e) {
        return pt = e
      })),
      t('lock', (function (e) {
        return mt = e
      })),
      t('complete', (function (e) {
        return xt = e
      }))
    } catch (e) {
    }
  }
  function yt(e, t) {
    if (vt && 'createBufferSource' in vt && !C) {
      var r = vt.createBufferSource();
      if (r.buffer = e, t) {
        var n = vt.createGain();
        n.gain.value = t,
        n.connect(vt.destination),
        r.connect(n)
      } else r.connect(vt.destination);
      return r.start(0),
      r
    }
  }
  var Tt,
  bt = {
    alpha: !1,
    antialias: !1,
    desynchronized: !0,
    preserveDrawingBuffer: !0
  },
  Et = !1;
  L &&
  (
    Tt = dt.getContext('webgl2', bt),
    Et = !!Tt,
    (
      Tt = Tt ||
      dt.getContext('webgl', bt) ||
      dt.getContext('experimental-webgl', bt)
    ) &&
    Tt.pixelStorei(Tt.UNPACK_ALIGNMENT, 1)
  ),
  Tt ||
  (L = !1, ft = dt.getContext('2d'));
  var Ct = new Float32Array([111,
  0,
  0,
  0,
  0,
  222,
  0,
  0,
  0,
  0,
  1,
  0,
  - 1,
  1,
  0,
  1]),
  Rt = L &&
  Tn({
    vertex: '\n  attribute vec2 position;\n  attribute vec4 texCoord;\n  attribute vec4 vertexColor;\n\n  uniform mat4 transform;\n  uniform vec2 shadowOffset;\n\n  varying vec4 vTexCoord;\n  varying vec2 vColor;\n  varying vec2 vShadowOffset;\n\n  void main() {\n    vTexCoord = texCoord;\n    vColor = vertexColor.xy;\n\n    float angle = -vertexColor.z;\n    float cosa = cos(angle);\n    float sina = sin(angle);\n    vec2 s = shadowOffset;\n    vShadowOffset = vec2(\n      cosa * s.x - sina * s.y,\n      sina * s.x + cosa * s.y\n    );\n\n    gl_Position = transform * vec4(position, 0, 1);\n  }\n  ',
    fragment: 'precision mediump float;\n\n  uniform sampler2D sampler1;\n  uniform sampler2D sampler2;\n  uniform sampler2D sampler3;\n\n  uniform float viewScale;\n  uniform vec2 shadowSpread;\n  uniform vec4 highlightColor;\n\n  varying vec4 vTexCoord;\n  varying vec2 vColor;\n  varying vec2 vShadowOffset;\n\n  void main() {\n    vec4 image = texture2D(sampler1, vTexCoord.xy);\n    vec4 mask = texture2D(sampler2, vTexCoord.zw);\n    vec4 mask2 = texture2D(sampler2, vTexCoord.zw, 1.0 * viewScale);\n    image.rgb *= min((mask.a * 0.33 + mask2.a * 0.66) + (1.0 - viewScale) * 0.1, 1.0);\n    image *= mask.a * vColor.x;\n\n    if ((vColor.x + vColor.y) == 0.0) {\n      if (mask.a == 1.0) {\n        gl_FragColor = vec4(0);\n        return;\n      }\n\n      vec2 sd = shadowSpread * 0.2;\n      float a1 = texture2D(sampler2, vTexCoord.zw + vec2(0, -sd.y)).a;\n      float a2 = texture2D(sampler2, vTexCoord.zw + vec2(sd.x, 0)).a;\n      float a3 = texture2D(sampler2, vTexCoord.zw + vec2(0, sd.y)).a;\n      float a4 = texture2D(sampler2, vTexCoord.zw + vec2(-sd.x, 0)).a;\n      float b1 = texture2D(sampler2, vTexCoord.zw + vec2(-sd.x, -sd.y)).a * 0.75;\n      float b2 = texture2D(sampler2, vTexCoord.zw + vec2(sd.x, sd.y)).a * 0.75;\n      float b3 = texture2D(sampler2, vTexCoord.zw + vec2(-sd.x, sd.y)).a * 0.75;\n      float b4 = texture2D(sampler2, vTexCoord.zw + vec2(sd.x, -sd.y)).a * 0.75;\n      gl_FragColor = highlightColor * max(mask.a, max(max(max(a1, a2), max(a3, a4)), max(max(b1, b2), max(b3, b4))));\n      return;\n    }\n\n    float shadow = 0.0;\n\n    if (mask.a != 1.0 && vColor.y > 0.0) {\n      shadow = texture2D(sampler3, vTexCoord.zw + vShadowOffset).r * vColor.y * (1.0 - image.a);\n    }\n\n    gl_FragColor = vec4(0, 0, 0, shadow) + image;\n  }\n  '
  }),
  Mt = L &&
  Tn({
    vertex: '\n  attribute vec2 position;\n  attribute vec4 texCoord;\n\n  uniform mat4 transform;\n  varying vec4 vTexCoord;\n\n  void main() {\n    vTexCoord = texCoord;\n    gl_Position = transform * vec4(position, 0, 1);\n  }\n  ',
    fragment: 'precision mediump float;\n\n  uniform sampler2D sampler1;\n\n  varying vec4 vTexCoord;\n\n  void main() {\n    gl_FragColor = texture2D(sampler1, vTexCoord.xy);\n  }\n  '
  }),
  kt = L &&
  Tn({
    vertex: '\n  attribute vec2 position;\n  attribute vec4 texCoord;\n  attribute vec4 vertexColor;\n\n  uniform mat4 transform;\n  varying vec4 vColor;\n\n  void main() {\n    vColor = vertexColor;\n    gl_Position = transform * vec4(position, 0, 1);\n  }\n  ',
    fragment: 'precision mediump float;\n\n  varying vec4 vColor;\n\n  void main() {\n    gl_FragColor = vColor;\n  }\n  '
  }),
  _t = L &&
  Tn({
    vertex: '\n  attribute vec2 position;\n  attribute vec4 texCoord;\n\n  varying vec2 vTexCoord;\n\n  void main() {\n    vTexCoord = texCoord.xy;\n    gl_Position = vec4(position, 0, 1);\n  }\n  ',
    fragment: 'precision mediump float;\n\n  uniform sampler2D sampler1;\n  \n  uniform vec2 shadowOffset;\n  uniform vec2 shadowSpread;\n\n  varying vec2 vTexCoord;\n\n  void main() {\n    vec2 shadowOff = vTexCoord - shadowOffset;\n    vec2 sd = shadowSpread;\n    vec2 sd2 = shadowSpread * 2.0;\n    float bias = 1.0;\n\n    float shadow = 0.0;\n\n    shadow += texture2D(sampler1, shadowOff, bias).a * 0.15018315018315018;\n\n    shadow += texture2D(sampler1, shadowOff + vec2(0, -sd.y), bias).a * 0.0952380;\n    shadow += texture2D(sampler1, shadowOff + vec2(sd.x, 0), bias).a * 0.0952380;\n    shadow += texture2D(sampler1, shadowOff + vec2(0, sd.y), bias).a * 0.0952380;\n    shadow += texture2D(sampler1, shadowOff + vec2(-sd.x, 0), bias).a * 0.0952380;\n\n    shadow += texture2D(sampler1, shadowOff + vec2(-sd.x, -sd.y), bias).a * 0.0586080;\n    shadow += texture2D(sampler1, shadowOff + vec2(sd.x, sd.y), bias).a * 0.0586080;\n    shadow += texture2D(sampler1, shadowOff + vec2(-sd.x, sd.y), bias).a * 0.0586080;\n    shadow += texture2D(sampler1, shadowOff + vec2(sd.x, -sd.y), bias).a * 0.0586080;\n\n    shadow += texture2D(sampler1, shadowOff + vec2(0, -sd2.y), bias).a * 0.0256410;\n    shadow += texture2D(sampler1, shadowOff + vec2(sd2.x, 0), bias).a * 0.0256410;\n    shadow += texture2D(sampler1, shadowOff + vec2(0, sd2.y), bias).a * 0.0256410;\n    shadow += texture2D(sampler1, shadowOff + vec2(-sd2.x, 0), bias).a * 0.0256410;\n\n    shadow += texture2D(sampler1, shadowOff + vec2(-sd2.x, -sd.y), bias).a * 0.01465201;\n    shadow += texture2D(sampler1, shadowOff + vec2(sd2.x, sd.y), bias).a * 0.01465201;\n    shadow += texture2D(sampler1, shadowOff + vec2(-sd2.x, sd.y), bias).a * 0.01465201;\n    shadow += texture2D(sampler1, shadowOff + vec2(sd2.x, -sd.y), bias).a * 0.01465201;\n    shadow += texture2D(sampler1, shadowOff + vec2(-sd.x, -sd2.y), bias).a * 0.01465201;\n    shadow += texture2D(sampler1, shadowOff + vec2(sd.x, sd2.y), bias).a * 0.01465201;\n    shadow += texture2D(sampler1, shadowOff + vec2(-sd.x, sd2.y), bias).a * 0.01465201;\n    shadow += texture2D(sampler1, shadowOff + vec2(sd.x, -sd2.y), bias).a * 0.01465201;\n\n    shadow += texture2D(sampler1, shadowOff + vec2(-sd2.x, -sd2.y), bias).a * 0.00366300;\n    shadow += texture2D(sampler1, shadowOff + vec2(sd2.x, sd2.y), bias).a * 0.00366300;\n    shadow += texture2D(sampler1, shadowOff + vec2(-sd2.x, sd2.y), bias).a * 0.00366300;\n    shadow += texture2D(sampler1, shadowOff + vec2(sd2.x, -sd2.y), bias).a * 0.00366300;\n\n    gl_FragColor = vec4(shadow * 0.5);\n  }\n  '
  }),
  Dt = L &&
  function () {
    for (
      var e = 8192,
      t = new Float32Array(327680),
      r = new Uint16Array(49152),
      n = 0,
      a = 0;
      n < r.length;
      a = a + 4 | 0
    ) r[n++] = a + 0 | 0,
    r[n++] = a + 1 | 0,
    r[n++] = a + 2 | 0,
    r[n++] = a + 0 | 0,
    r[n++] = a + 2 | 0,
    r[n++] = a + 3 | 0;
    var i = Tt.createBuffer();
    return Tt.bindBuffer(Tt.ELEMENT_ARRAY_BUFFER, i),
    Tt.bufferData(Tt.ELEMENT_ARRAY_BUFFER, r, Tt.STATIC_DRAW),
    Tt.bindBuffer(Tt.ELEMENT_ARRAY_BUFFER, null),
    {
      vertices: t,
      indexBuffer: i,
      buffers: [],
      currentBuffer: 0,
      index: 0,
      count: 0,
      capacity: e
    }
  }(),
  Ut = null,
  At = null,
  Xt = null,
  Ot = null,
  Pt = [
    c,
    c,
    c,
    c
  ],
  St = void 0,
  It = new Float32Array([1,
  0,
  0,
  1,
  0,
  0]),
  Ft = 0,
  zt = 0,
  Nt = void 0,
  Yt = aa('canvas'),
  Lt = Yt.getContext('2d'),
  Bt = !L &&
  aa('canvas'),
  Ht = Bt &&
  Bt.getContext('2d'),
  Wt = !L &&
  aa('canvas'),
  Gt = Wt &&
  Wt.getContext('2d'),
  Vt = 'white';
  function qt(e, t, r, n) {
    var a = t - r / oe,
    i = - (a + n);
    return i > n ? - a / 2 : wn(e, i, n)
  }
  function Kt() {
    var t = Math.max(500, Math.ceil(0.5 * (e.innerWidth - J * oe) / oe));
    ae = qt(ae, J, e.innerWidth, t),
    ie = qt(ie, Z, e.innerHeight, t),
    ta('viewRoom', ROOM_NAME),
    ta('viewX', ae),
    ta('viewY', ie),
    ta('viewScale', oe)
  }
  function jt(e, t) {
    e.style.display = t ? 'unset' : 'none'
  }
  function Jt() {
    $e.userName.value = m,
    $e.userName.readOnly = !!x,
    jt(Qe, x),
    jt(et, !x),
    jt(tt, x),
    ke.style.display = Ye() ? 'none' : 'block',
    Le.style.display = f.hidePreview ? 'none' : 'flex'
  }
  function Zt() {
    $e.style.display = 'flex',
    $e.scrollTop = 0,
    Jt(),
    $e.color.value = w,
    $e.bg.value = y,
    $e.hideusers.checked = b,
    $e.hidechat.checked = E,
    $e.mutesounds.checked = C,
    $e.click.value = 'click' === T ? 'click' : 'hold',
    $e.renderer.value = L ? 'gpu' : 'cpu',
    setTimeout((function () {
      return $e.userName.focus()
    }), 100)
  }
  function $t() {
    jt(Ue, !b),
    jt(Ae, !E)
  }
  function Qt() {
    Cn({
      type: 'user',
      session: p,
      name: m,
      color: w,
      room: ROOM_NAME,
      secret: Oe
    })
  }
  function er() {
    $e.userName.value &&
    (
      $e.style.display = 'none',
      ta('name', m = $e.userName.value),
      ta('color', w = $e.color.value),
      ta('bg', y = $e.bg.value),
      ta('hideusers', (b = $e.hideusers.checked) ? 'y' : ''),
      ta('hidechat', (E = $e.hidechat.checked) ? 'y' : ''),
      ta('mutesounds', (C = $e.mutesounds.checked) ? 'y' : ''),
      ta('pick', T = $e.click.value),
      ta('renderer', $e.renderer.value),
      R = jn(y),
      L !== ('gpu' === $e.renderer.value) &&
      location.reload(),
      te &&
      ee ? Qt() : Hn(),
      N = Y = !0,
      $t()
    )
  }
  requestAnimationFrame(
    (
      function t() {
        requestAnimationFrame(t);
        var r = performance.now();
        0;
        var n = e.devicePixelRatio ||
        1,
        a = Math.max(1, Math.ceil(e.innerWidth * n)),
        i = Math.max(1, Math.ceil(e.innerHeight * n));
        dt.width === a &&
        dt.height === i &&
        ht === n ||
        (
          dt.width = a,
          dt.height = i,
          dt.style.width = ''.concat(a / n, 'px'),
          dt.style.height = ''.concat(i / n, 'px'),
          ht = n,
          N = !0,
          Y = !0
        );
        L ||
        Bt.width === a &&
        Bt.height === i ||
        (Bt.width = a, Bt.height = i, Y = !0);
        if (ue || de) {
          sr(ae + ue * (r - U) * 1, ie + de * (r - U) * 1, oe)
        }
        var o = r - U;
        if (U = r, f.rotation) for (var s = 0, l = G; s < l.length; s++) {
          var c = l[s];
          if (c.angle !== c.targetAngle) {
            xn(c);
            var u = 0.01 * o;
            c.angle < c.targetAngle ? c.angle = Math.min(c.angle + u, c.targetAngle) : c.angle = Math.max(c.angle - u, c.targetAngle),
            N = !0,
            xn(c)
          }
        }
        var d = oe * n;
        if (A = a / d, X = i / d, L) {
          if (
            Qr &&
            G.length &&
            $r.every((function (e) {
              return e
            })) &&
            (
              Tt.bindTexture(Tt.TEXTURE_2D, Ut),
              Tt.texImage2D(Tt.TEXTURE_2D, 0, Tt.RGB, Tt.RGB, Tt.UNSIGNED_BYTE, $r[0]),
              Tt.generateMipmap(Tt.TEXTURE_2D),
              Tt.bindTexture(Tt.TEXTURE_2D, null),
              N = !0
            ),
            Dt.currentBuffer = 0,
            !N
          ) return void (
            e.chrome &&
            (
              Tt.enable(Tt.SCISSOR_TEST),
              Tt.scissor(0, 0, 1, 1),
              Tt.activeTexture(Tt.TEXTURE0),
              Tt.bindTexture(Tt.TEXTURE_2D, Ut),
              Tt.activeTexture(Tt.TEXTURE1),
              Tt.bindTexture(Tt.TEXTURE_2D, At),
              Tt.activeTexture(Tt.TEXTURE2),
              Tt.bindTexture(Tt.TEXTURE_2D, Xt),
              Tt.useProgram(Rt.program),
              or(Dt, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
              ar(Dt),
              Tt.activeTexture(Tt.TEXTURE2),
              Tt.bindTexture(Tt.TEXTURE_2D, null),
              Tt.activeTexture(Tt.TEXTURE1),
              Tt.bindTexture(Tt.TEXTURE_2D, null),
              Tt.activeTexture(Tt.TEXTURE0),
              Tt.bindTexture(Tt.TEXTURE_2D, null),
              Tt.disable(Tt.SCISSOR_TEST)
            )
          );
          Ct[0] = d * (2 / Tt.drawingBufferWidth),
          Ct[5] = d * ( - 2 / Tt.drawingBufferHeight),
          Tt.viewport(0, 0, Tt.drawingBufferWidth, Tt.drawingBufferHeight),
          Tt.clearColor(0.1, 0.1, 0.1, 1),
          Tt.clear(Tt.COLOR_BUFFER_BIT),
          Tt.enable(Tt.BLEND),
          Tt.blendEquation(Tt.FUNC_ADD),
          Tt.blendFunc(Tt.ONE, Tt.ONE_MINUS_SRC_ALPHA),
          Tt.useProgram(kt.program),
          Tt.uniformMatrix4fv(kt.uniforms.transform, !1, Ct),
          or(Dt, ae, ie, J, Z, 0, 0, 0, 0, 0, 0, 0, 0, R[0], R[1], R[2], 1),
          ar(Dt),
          Tt.activeTexture(Tt.TEXTURE0),
          Tt.bindTexture(Tt.TEXTURE_2D, Ut),
          Tt.activeTexture(Tt.TEXTURE1),
          Tt.bindTexture(Tt.TEXTURE_2D, At),
          Tt.activeTexture(Tt.TEXTURE2),
          Tt.bindTexture(Tt.TEXTURE_2D, Xt),
          Tt.useProgram(Rt.program),
          Tt.uniformMatrix4fv(Rt.uniforms.transform, !1, Ct),
          Tt.uniform1f(Rt.uniforms.viewScale, d),
          Tt.uniform2f(Rt.uniforms.shadowOffset, - 3 / K, - 3 / j),
          Tt.uniform2f(Rt.uniforms.shadowSpread, 10 / K, 10 / j),
          fn(Rt.uniforms.highlightColor, St = Pt);
          for (var h = 0, g = G; h < g.length; h++) {
            var p = g[h];
            p.dragged ||
            vn(p)
          }
          for (var m = 0, x = xe; m < x.length; m++) {
            vn(x[m])
          }
          if (
            It[0] = 1,
            It[1] = 0,
            It[2] = 0,
            It[3] = 1,
            It[4] = 0,
            It[5] = 0,
            ar(Dt),
            Tt.activeTexture(Tt.TEXTURE2),
            Tt.bindTexture(Tt.TEXTURE_2D, null),
            Tt.activeTexture(Tt.TEXTURE1),
            Tt.bindTexture(Tt.TEXTURE_2D, null),
            k &&
            !f.hidePreview
          ) {
            Tt.useProgram(Mt.program),
            Tt.uniformMatrix4fv(Mt.uniforms.transform, !1, Ct);
            for (
              var w = Math.min(600, e.innerHeight / 2),
              T = D / d,
              b = 10 * n / d,
              E = 40 * n / d,
              C = 0,
              M = _,
              O = _ + v.length;
              M < O;
              M++
            ) {
              var P = v[M % v.length],
              S = P.width,
              I = P.height,
              F = P.tx,
              z = P.ty,
              H = P.tw,
              W = P.th,
              V = w * (S / I);
              or(Dt, b + C, E, V * T, w * T, F, z, H, W, 0, 0, 0, 0, 0, 0, 0, 0),
              C += V * T + b
            }
            ar(Dt)
          }
          if (
            Tt.activeTexture(Tt.TEXTURE0),
            Tt.bindTexture(Tt.TEXTURE_2D, null),
            Te &&
            Ce &&
            Re
          ) {
            Tt.useProgram(kt.program),
            Tt.uniformMatrix4fv(kt.uniforms.transform, !1, Ct);
            var q = 0.2;
            or(Dt, be + ae, Ee + ie, Ce, Re, 0, 0, 0, 0, 0, 0, 0, 0, q, q, q, q),
            ar(Dt)
          }
        } else {
          if (
            Qr &&
            G.length &&
            $r.every((function (e) {
              return e
            })) &&
            (N = !0, Y = !0),
            !N
          ) return;
          Y &&
          (B.length = 0, B.push({
            x: 0,
            y: 0,
            w: dt.width,
            h: dt.height
          }));
          for (var $ = 0; $ < B.length; $++) {
            var Q = B[$];
            if (Q.w && Q.h) {
              Wt.width = Q.w,
              Wt.height = Q.h,
              Gt.fillStyle = '#191919',
              Gt.fillRect(0, 0, Q.w, Q.h),
              Gt.save(),
              Gt.translate( - Q.x, - Q.y),
              Gt.scale(d, d),
              Gt.fillStyle = y,
              Gt.fillRect(ae, ie, J, Z),
              Gt.lineWidth = 5,
              Gt.strokeStyle = Vt = 'white';
              for (
                var ee = Q.x / d,
                te = Q.y / d,
                re = ee + Q.w / d,
                ne = te + Q.h / d,
                se = 0,
                le = G;
                se < le.length;
                se++
              ) {
                var ce = le[se];
                ce.dragged ||
                ce.user ||
                gn(Gt, ce, ee, te, re, ne)
              }
              Gt.restore(),
              Ht.drawImage(Wt, Q.x, Q.y)
            }
          }
          B.length = 0,
          ft.drawImage(Bt, 0, 0),
          ft.save(),
          ft.scale(d, d),
          ft.lineWidth = 5,
          ft.strokeStyle = Vt = 'white';
          for (var he = dt.width / d, fe = dt.height / d, ve = 0, ge = G; ve < ge.length; ve++) {
            var pe = ge[ve];
            pe.user &&
            gn(ft, pe, 0, 0, he, fe)
          }
          for (var me = 0, we = xe; me < we.length; me++) {
            var ye = we[me];
            gn(ft, ye, 0, 0, he, fe)
          }
          if (ft.restore(), k && !f.hidePreview && Nt) for (
            var Me = Math.min(600, e.innerHeight / 2),
            ke = D,
            _e = 10 * n,
            De = 40 * n,
            Ue = 0,
            Ae = 0,
            Xe = _,
            Oe = _ + v.length;
            Xe < Oe;
            Xe++
          ) {
            var Pe = v[Xe % v.length],
            Se = Pe.imageWidth,
            Ie = Pe.imageHeight,
            Fe = Me * (Se / Ie);
            ft.drawImage(Nt, Ue, 0, Se, Ie, _e + Ae, De, Fe * ke, Me * ke),
            Ue += Se,
            Ae += Fe * ke + _e
          }
          Te &&
          Ce &&
          Re &&
          (
            ft.save(),
            ft.fillStyle = 'rgba(255, 255, 255, 0.2)',
            ft.scale(d, d),
            ft.fillRect(be + ae, Ee + ie, Ce, Re),
            ft.restore()
          )
        }
        N = !1,
        Y = !1
      }
    )
  ),
  m ? Hn() : Zt(),
  la(na('user-settings'), Zt),
  $t();
  var tr = void 0;
  function rr(r) {
    if (tr && tr.close(), p) {
      var n,
      a,
      i = void 0 !== e.screenLeft ? e.screenLeft : e.screenX,
      o = void 0 !== e.screenTop ? e.screenTop : e.screenY,
      s = t.documentElement,
      l = i + (
        (
          e.innerWidth ? e.innerWidth : s.clientWidth ? s.clientWidth : screen.width
        ) - 500
      ) / 2,
      c = o + (
        (
          e.innerHeight ? e.innerHeight : s.clientHeight ? s.clientHeight : screen.height
        ) - 800
      ) / 2;
      n = 'session',
      a = p,
      t.cookie = ''.concat(encodeURIComponent(n), '=').concat(encodeURIComponent(a), ';sameSite=Lax;'),
      tr = e.open(
        '/auth/'.concat(r),
        '_blank',
        'scrollbars=yes,width='.concat(500, ',height=').concat(800, ',top=').concat(c, ',left=').concat(l)
      )
    }
  }
  ca($e, 'submit', (function (e) {
    e.preventDefault(),
    er()
  })),
  la(na('userFormButton'), er),
  la(et, (function () {
    return rr('twitch')
  })),
  la(_e, (function () {
    return rr('twitch')
  })),
  la(tt, (function () {
    ta('session', p = ''),
    Qt(),
    $e.userName.focus()
  })),
  ca(
    e,
    'resize',
    (
      function () {
        Kt();
        setTimeout((function () {
          return nt.scrollTop = 1000000
        }))
      }
    )
  );
  var nr = 5000;
  function ar(e) {
    if (e.count) {
      if (e.buffers.length <= e.currentBuffer) {
        var t = Tt.createBuffer();
        Tt.bindBuffer(Tt.ARRAY_BUFFER, t),
        Tt.bufferData(Tt.ARRAY_BUFFER, e.vertices.byteLength, Tt.DYNAMIC_DRAW),
        e.buffers.push(t)
      }
      Tt.bindBuffer(Tt.ARRAY_BUFFER, e.buffers[e.currentBuffer]),
      Tt.bindBuffer(Tt.ELEMENT_ARRAY_BUFFER, e.indexBuffer),
      Tt.bufferSubData(Tt.ARRAY_BUFFER, 0, e.vertices.subarray(0, e.index)),
      Tt.enableVertexAttribArray(0),
      Tt.enableVertexAttribArray(1),
      Tt.enableVertexAttribArray(2),
      Tt.vertexAttribPointer(0, 2, Tt.FLOAT, !1, 40, 0),
      Tt.vertexAttribPointer(1, 4, Tt.FLOAT, !1, 40, 8),
      Tt.vertexAttribPointer(2, 4, Tt.FLOAT, !1, 40, 24),
      Tt.drawElements(Tt.TRIANGLES, 6 * e.count, Tt.UNSIGNED_SHORT, 0),
      Tt.bindBuffer(Tt.ARRAY_BUFFER, null),
      Tt.bindBuffer(Tt.ELEMENT_ARRAY_BUFFER, null),
      e.index = 0,
      e.count = 0,
      e.currentBuffer++
    }
  }
  function ir(e, t, r, n, a, i, o, s, l, c, u, d) {
    e[t + 0 | 0] = r * It[0] + n * It[2] + It[4],
    e[t + 1 | 0] = r * It[1] + n * It[3] + It[5],
    e[t + 2 | 0] = a,
    e[t + 3 | 0] = i,
    e[t + 4 | 0] = o,
    e[t + 5 | 0] = s,
    e[t + 6 | 0] = l,
    e[t + 7 | 0] = c,
    e[t + 8 | 0] = u,
    e[t + 9 | 0] = d
  }
  function or(e, t, r, n, a, i, o, s, l, c, u, d, h, f, v, g, p) {
    e.count >= e.capacity &&
    ar(e);
    var m = e.vertices,
    x = e.index,
    w = t + n,
    y = r + a,
    T = i + s,
    b = o + l,
    E = c + d,
    C = u + h;
    ir(m, x + 0 | 0, t, r, i, o, c, u, f, v, g, p),
    ir(m, x + 10 | 0, w, r, T, o, E, u, f, v, g, p),
    ir(m, x + 20 | 0, w, y, T, b, E, C, f, v, g, p),
    ir(m, x + 30 | 0, t, y, i, b, c, C, f, v, g, p),
    e.count++,
    e.index += 40
  }
  function sr(e, t, r) {
    var n = ae,
    a = ie,
    i = oe,
    o = he / oe - ae,
    s = fe / oe - ie;
    ae = e,
    ie = t,
    oe = r,
    Kt(),
    he = (o + ae) * oe,
    fe = (s + ie) * oe,
    _r(P, S, !0),
    N = Y = Y ||
    n !== ae ||
    a !== ie ||
    i !== oe
  }
  function lr(e, t, r) {
    sr(ae + (t / e - t / oe), ie + (r / e - r / oe), e)
  }
  function cr() {
    var t = 1 / (e.devicePixelRatio || 1);
    sr(t * - (J - e.innerWidth) / 2, t * - (Z - e.innerHeight) / 2, t)
  }
  function ur(t, r) {
    sr(
      1 === t ? $ : 2 === t ? - J / 2 + e.innerWidth / (2 * oe) : - J + e.innerWidth / oe - $,
      1 === r ? Q : 2 === r ? - Z / 2 + e.innerHeight / (2 * oe) : - Z + e.innerHeight / oe - Q,
      oe
    )
  }
  function dr(t) {
    for (var r = 0, n = 0, a = 0, i = v; a < i.length; a++) {
      var o = i[a];
      r += o.width,
      n += o.height
    }
    return wn(t, Math.min(0.3, e.innerWidth / (1.5 * r), e.innerHeight / (1.5 * n)), 1)
  }
  function hr(e) {
    try {
      return e.touches
    } catch (e) {
      return
    }
  }
  ca(
    e,
    'keydown',
    (
      function (t) {
        if (
          te &&
          !re &&
          (
            !t.target ||
            !/^(input|textarea|select|button)$/i.test(t.target.tagName)
          )
        ) {
          if (t.ctrlKey || t.metaKey) 90 === t.keyCode &&
          Oe &&
          (
            Cn({
              type: 'revert',
              time: nr
            }),
            nr += 5000,
            setTimeout((function () {
              return nr = 5000
            }), 5000)
          );
           else switch (t.keyCode) {
            case 13:
              Ye() &&
              Zn();
              break;
            case 27:
              Je.style.display = 'none',
              $e.style.display = 'none',
              Xe.style.display = 'none';
              break;
            case 32:
              if (xe.length || Te || !Ye()) return;
              var r = G.filter((function (e) {
                return e.selected
              }));
              if (r.length > 1) {
                for (var n = ($ + Q) / 4, a = 0; a < r.length; a++) {
                  for (var i = r[a], o = 0, s = 0, l = 0; l < r.length; l++) {
                    var c = r[l];
                    if (c !== i) {
                      var u = i.x - c.x,
                      d = i.y - c.y,
                      h = u * u + d * d;
                      if (h) {
                        var v = 1 / (h * h);
                        o += u * v,
                        s += d * v
                      }
                    }
                  }
                  0 === o &&
                  (o = 2 * (Math.random() - 0.5)),
                  0 === s &&
                  (s = 2 * (Math.random() - 0.5));
                  var p = Math.sqrt(o * o + s * s) ||
                  1;
                  i.x += o / p * n,
                  i.y += s / p * n,
                  Mr(i),
                  Nr(i)
                }
                Dn(2, r),
                N = !0
              }
              break;
            case 36:
              cr();
              break;
            case 35:
              for (var m = 1000000, x = 0, w = 1000000, y = 0, T = 0, b = G; T < b.length; T++) {
                var E = b[T];
                m = Math.min(m, E.x - E.w / 2),
                x = Math.max(x, E.x + E.w / 2),
                w = Math.min(w, E.y - E.h / 2),
                y = Math.max(y, E.y + E.h / 2)
              }
              var C = x - m,
              R = y - w,
              M = dr(0.9 * Math.min(e.innerWidth / C, e.innerHeight / R));
              sr( - (m + x) / 2 + e.innerWidth / M / 2, - (w + y) / 2 + e.innerHeight / M / 2, M);
              break;
            case 46:
              it();
              break;
            case 65:
              ur(1, 2);
              break;
            case 67:
              ur(3, 3);
              break;
            case 68:
              ur(3, 2);
              break;
            case 69:
              ur(3, 1);
              break;
            case 70:
            case 71:
            case 37:
            case 39:
              if (f.rotation && Ye()) {
                var k = xe;
                if (
                  k.length ||
                  (k = G.filter((function (e) {
                    return e.selected
                  }))),
                  !k.length
                ) break;
                Yr(k, 71 === t.keyCode || 39 === t.keyCode)
              }
              break;
            case 81:
              ur(1, 1);
              break;
            case 82:
              We();
              break;
            case 83:
              ur(2, 2);
              break;
            case 87:
              ur(2, 1);
              break;
            case 88:
              ur(2, 3);
              break;
            case 90:
              ur(1, 3);
              break;
            case 107:
            case 187:
              lr(dr(1.2 * oe), e.innerWidth / 2, e.innerHeight / 2);
              break;
            case 109:
            case 189:
              lr(dr(0.8 * oe), e.innerWidth / 2, e.innerHeight / 2)
          }
          if (t.ctrlKey && 90 === t.keyCode && I) {
            for (var _ = [], D = 0, U = I; D < U.length; D++) {
              var A = U[D],
              X = V[A.id];
              X &&
              !X.user &&
              X.pieces.length === A.pieces &&
              X.x === A.endX &&
              X.y === A.endY &&
              _.push({
                id: X.id,
                x: A.startX,
                y: A.startY
              })
            }
            if (_.length) {
              for (var O = 0; O < _.length; O++) {
                var P = _[O],
                S = V[P.id];
                S.x = P.x,
                S.y = P.y,
                Nr(S)
              }
              Dn(1, _),
              Dn(3, _),
              N = !0
            }
          }
          if (t.keyCode >= 49 && t.keyCode <= 57 || t.keyCode >= 97 && t.keyCode <= 105) {
            t.preventDefault();
            var F = t.keyCode - (t.keyCode >= 97 ? 97 : 49);
            t.ctrlKey ? (g[F] = {
              x: ae,
              y: ie,
              scale: oe
            }, ta('views', JSON.stringify(g))) : g[F] &&
            sr(g[F].x, g[F].y, g[F].scale)
          }
        }
      }
    )
  ),
  ca(
    e,
    'wheel',
    (
      function (e) {
        if (e.deltaY) {
          var t = hr(e),
          r = t ? t[0] : e,
          n = r.pageX,
          a = r.pageY,
          i = e.deltaY > 0 ? 0.9 : 1.1;
          lr(dr(oe * i), n, a)
        }
      }
    )
  );
  var fr = !1;
  function vr(e, t, r, n) {
    for (var a = G.length - 1; a >= 0; a--) {
      var i = G[a];
      if ((r || !i.locked) && (Vr(e, t, i) && (fr = !0, !i.user || n))) return i
    }
    for (var o = G.length - 1; o >= 0; o--) {
      var s = G[o];
      if ((r || !s.locked) && (qr(e, t, s) && (fr = !0, !s.user || n))) return s
    }
  }
  function gr() {
    O ||
    (t.body.classList.add('is-mobile'), O = !0)
  }
  ca(
    e,
    [
      'mousedown',
      'touchstart'
    ],
    (
      function (e) {
        e.preventDefault(),
        Ve(),
        'touchstart' === e.type &&
        gr();
        if (wt(), !te || re || !Ye()) return;
        var t = e.button ||
        0,
        r = hr(e);
        if (r && r.length > 1) if (xe.length) {
          var n = Tr(r, xr);
          if (!n) return;
          mr = !0,
          wr = n.identifier,
          yr(n.pageX, n.pageY)
        } else Te = !1,
        pr = oe,
        xr = r[0].identifier,
        he = pe = r[0].pageX,
        fe = me = r[0].pageY,
        wr = r[1].identifier,
        yr(r[1].pageX, r[1].pageY);
         else if (0 === t) {
          if (!r && 'click' === T && xe.length) return void Dr();
          if (r) {
            var a = Tr(r, wr);
            if (!a) return;
            xr = a.identifier,
            he = a.pageX,
            fe = a.pageY
          } else he = e.pageX,
          fe = e.pageY;
          we = !1,
          fr = !1,
          ye = !1;
          var i = he / oe - ae,
          o = fe / oe - ie,
          s = vr(i, o, e.ctrlKey);
          s ? e.ctrlKey ? Ne() &&
          (
            s.locked = !s.locked,
            s.selected &&
            (s.selected = !1, _n(5, [
              s
            ])),
            _n(s.locked ? 8 : 9, [
              s
            ]),
            yt(mt),
            je()
          ) : e.shiftKey &&
          ze() ? (s.selected = !s.selected, xn(s), _n(s.selected ? 4 : 5, [
            s
          ])) : function (e) {
            if (!e.locked) {
              if (!e.selected) {
                for (var t = [], r = 0, n = G; r < n.length; r++) {
                  var a = n[r];
                  a.selected &&
                  (a.selected = !1, t.push(a), xn(a))
                }
                t.length &&
                (_n(5, t), ye = !0)
              }
              if (e.selected) for (var i = 0, o = G; i < o.length; i++) {
                var s = o[i];
                s.selected &&
                s !== e &&
                (s.startX = s.x, s.startY = s.y, s.dragged = !0, xe.push(s))
              }
              e.startX = e.x,
              e.startY = e.y,
              e.dragged = !0,
              xe.push(e);
              for (var l = 0, c = xe; l < c.length; l++) Gn(c[l]);
              Dn(1, xe),
              N = !0
            }
          }(s) : !fr &&
          ze() &&
          (Te = !0, be = i, Ee = o, Ce = 0, Re = 0)
        } else 1 !== t &&
        2 !== t ||
        yr(e.pageX, e.pageY)
      }
    )
  ),
  ca(
    e,
    [
      'mousemove',
      'touchmove'
    ],
    (
      function (e) {
        var t = hr(e);
        if (t) {
          var r = br(t, xr),
          n = br(t, wr);
          if (se) {
            if (!mr) {
              if (n && r) {
                var a = (ve + pe) / 2,
                i = (ge + me) / 2,
                o = Er(ve, ge, pe, me),
                s = (r.pageX + n.pageX) / 2,
                l = (r.pageY + n.pageY) / 2,
                c = Er(r.pageX, r.pageY, n.pageX, n.pageY),
                u = dr(pr * (c / o));
                sr(le + (s / u - a / pr), ce + (l / u - i / pr), u)
              }
              return
            }
            if (n) {
              var d = (n.pageX - ve) / oe,
              h = (n.pageY - ge) / oe;
              sr(le + d, ce + h, oe)
            }
          }
          r &&
          _r(P = Math.max(0, r.pageX), S = Math.max(0, r.pageY), !0)
        } else _r(P = e.pageX, S = e.pageY)
      }
    )
  ),
  ca(
    e,
    [
      'mouseup',
      'touchend'
    ],
    (
      function (e) {
        e.preventDefault();
        var t = hr(e);
        if (t) {
          var r = br(t, xr),
          n = br(t, wr);
          !Te &&
          !xe.length ||
          r ||
          (Dr(), Ur(e.shiftKey), xr = - 1),
          se &&
          (mr && !n && (se = !1, mr = !1, wr = - 1), mr || n && r || (se = !1, n = - 1, r = - 1))
        } else {
          var a,
          i = e.button,
          o = !1,
          s = !1,
          l = e.pageX / oe - ae,
          c = e.pageY / oe - ie,
          u = vr(l, c);
          if (
            e.ctrlKey ||
            e.shiftKey ||
            (
              0 !== i ||
              we ||
              'click' === T ||
              e.pageX !== he ||
              e.pageY !== fe ? 2 === i &&
              e.pageX === ve &&
              e.pageY === ge &&
              (o = !0, s = !0, we = !0) : o = !0
            ),
            o
          ) xe.length &&
          !ye ? a = xe : u &&
          u.selected ? a = G.filter((function (e) {
            return e.selected
          })) : u &&
          !ye &&
          (a = [
            u
          ]),
          a &&
          a.length &&
          Yr(a, s);
          if (0 === i) {
            if ('click' !== T && Dr(), Ur(e.shiftKey), Date.now() - Cr < 300) {
              var d = vr(l, c, !1, !0);
              d &&
              d.user &&
              _n(10, [
                d
              ])
            }
          } else 1 !== i &&
          2 !== i ||
          (se = !1)
        }
        N = !0,
        ye = !1,
        Cr = Date.now()
      }
    )
  ),
  ca(e, 'blur', (function () {
    Dr(),
    Te = !1,
    se = !1
  })),
  ca(e, 'contextmenu', (function (e) {
    return e.preventDefault()
  }));
  var pr = 0,
  mr = !1,
  xr = - 1,
  wr = - 1;
  function yr(e, t) {
    se = !0,
    ve = e,
    ge = t,
    le = ae,
    ce = ie
  }
  function Tr(e, t) {
    for (var r = 0; r < e.length; r++) if (e[r].identifier !== t) return e[r]
  }
  function br(e, t) {
    for (var r = 0; r < e.length; r++) if (e[r].identifier === t) return e[r]
  }
  function Er(e, t, r, n) {
    var a = e - r,
    i = t - n;
    return Math.sqrt(a * a + i * i)
  }
  var Cr = 0;
  function Rr(e, t) {
    return e <= 1 ? wn( - e / 200, 1, 10) : e >= t - 1 ? wn( - (e - t) / 200, - 10, - 1) : 0
  }
  function Mr(e) {
    var t = 1 === e.rot ||
    3 === e.rot,
    r = t ? e.h : e.w,
    n = t ? e.w : e.h;
    e.x = yn(wn(e.x, r / 2, J - r / 2)),
    e.y = yn(wn(e.y, n / 2, Z - n / 2))
  }
  var kr = 0;
  function _r(t, r, n) {
    var a = (t - he) / oe,
    i = (r - fe) / oe;
    if (xe.length) {
      for (var o = 0, s = xe; o < s.length; o++) {
        var l = s[o];
        l.x = l.startX + a,
        l.y = l.startY + i,
        Mr(l)
      }
      var c = performance.now();
      c - kr > (q.length < 5 ? 1000 / 60 : q.length < 25 ? 1000 / 30 : 100) &&
      (Dn(2, xe), kr = c),
      N = !0
    } else Te &&
    (Ce = a, Re = i, N = !0);
    n ||
    (
      se ? sr(le + (t - ve) / oe, ce + (r - ge) / oe, oe) : (xe.length || Te) &&
      (ue = Rr(t, e.innerWidth) / oe, de = Rr(r, e.innerHeight) / oe)
    )
  }
  function Dr() {
    if (xe.length) {
      for (var e = 0, t = xe; e < t.length; e++) {
        var r = t[e];
        r.dragged = !1,
        Nr(r),
        xn(r)
      }
      Dn(3, xe),
      I = xe.map(
        (
          function (e) {
            return {
              id: e.id,
              pieces: e.pieces.length,
              startX: e.startX,
              startY: e.startY,
              endX: e.x,
              endY: e.y
            }
          }
        )
      ),
      1 === xe.length &&
      function (e) {
        Hr = !1;
        for (
          var t = v[e.set],
          r = t.cols,
          n = t.rows,
          a = 0,
          i = e.pieces.slice();
          a < i.length;
          a++
        ) {
          var o = i[a];
          o.xi > 0 &&
          (e = Wr(e, o, - 1, 0)),
          o.yi > 0 &&
          (e = Wr(e, o, 0, - 1)),
          o.xi < r - 1 &&
          (e = Wr(e, o, 1, 0)),
          o.yi < n - 1 &&
          (e = Wr(e, o, 0, 1))
        }
        Gn(e),
        Hr &&
        yt(gt);
        Hr &&
        G.length === v.length &&
        yt(xt);
        return Hr
      }(xe[0]) &&
      (I = void 0),
      xe.length = 0
    }
    ue = de = 0,
    ze() ||
    Ar()
  }
  function Ur(e) {
    if (Te) {
      for (var t = [], r = [], n = 0, a = G; n < a.length; n++) {
        var i = a[n];
        if (!i.user && !i.locked) {
          var o = Kr(i, be, Ee, Ce, Re);
          e &&
          (o = i.selected || o),
          i.selected !== o &&
          (i.selected = o, xn(i), o ? t.push(i) : r.push(i))
        }
      }
      r.length &&
      _n(5, r),
      t.length &&
      _n(4, t),
      Te = !1
    }
  }
  function Ar() {
    for (var e = [], t = 0, r = G; t < r.length; t++) {
      var n = r[t];
      n.selected &&
      (n.selected = !1, e.push(n))
    }
    e.length &&
    _n(5, e)
  }
  function Xr() {
    var e = 10000 * Math.sin(h);
    return h += 1,
    e - Math.floor(e)
  }
  function Or(e, t) {
    return e + (Xr() + Xr() + Xr() + Xr()) / 4 * (t - e)
  }
  function Pr(e) {
    return {
      flip: Xr() > 0.5,
      a: Or( - e, 0.9 * e),
      b: Or( - e, 0.9 * e),
      c: Or( - e, 0.9 * e),
      d: Or( - e, 0.9 * e),
      e: Or( - e, 0.9 * e)
    }
  }
  function Sr(e, t, r, n, a, i, o, s, l, c, u, d) {
    var h = !i,
    f = h ? a : n,
    v = h ? n : a,
    g = h ? r : t,
    p = h ? t : r,
    m = s &&
    s.flip ? - 1 : 1,
    x = 0 + (h ? c.y : c.x),
    w = 0 + (h ? c.x : c.y),
    y = 1 + (h ? u.y : u.x),
    T = 0 + (h ? u.x : u.y);
    function b(e, t) {
      var r = g + e;
      return {
        l: f * (r * (y - x) + x),
        w: v * (r * (T - w) + (p + t * m) + w)
      }
    }
    var E = b(0, 0),
    C = b(1, 0);
    if (d && e.moveTo(E.l, E.w), s) {
      var R = s.a,
      M = s.b,
      k = s.c,
      _ = s.d,
      D = s.e,
      U = b(0.2, R),
      A = b(0.5 + M + _, - l + k),
      X = b(0.5 - l + M, l + k),
      O = b(0.5 - 2 * l + M - _, 3 * l + k),
      P = b(0.5 + 2 * l + M - _, 3 * l + k),
      S = b(0.5 + l + M, l + k),
      I = b(0.5 + M + _, - l + k),
      F = b(0.8, D);
      i ? o ? (
        e.bezierCurveTo(F.l, F.w, I.l, I.w, S.l, S.w),
        e.bezierCurveTo(P.l, P.w, O.l, O.w, X.l, X.w),
        e.bezierCurveTo(A.l, A.w, U.l, U.w, E.l, E.w)
      ) : (
        e.bezierCurveTo(U.l, U.w, A.l, A.w, X.l, X.w),
        e.bezierCurveTo(O.l, O.w, P.l, P.w, S.l, S.w),
        e.bezierCurveTo(I.l, I.w, F.l, F.w, C.l, C.w)
      ) : o ? (
        e.bezierCurveTo(F.w, F.l, I.w, I.l, S.w, S.l),
        e.bezierCurveTo(P.w, P.l, O.w, O.l, X.w, X.l),
        e.bezierCurveTo(A.w, A.l, U.w, U.l, E.w, E.l)
      ) : (
        e.bezierCurveTo(U.w, U.l, A.w, A.l, X.w, X.l),
        e.bezierCurveTo(O.w, O.l, P.w, P.l, S.w, S.l),
        e.bezierCurveTo(I.w, I.l, F.w, F.l, C.w, C.l)
      )
    } else i ? o ? e.lineTo(E.l, E.w) : e.lineTo(C.l, C.w) : o ? e.lineTo(E.w, E.l) : e.lineTo(C.w, C.l)
  }
  function Ir(e, t, r, n) {
    e.save(),
    e.translate(t, r),
    Sr(e, 0, 0, n.width, n.height, !0, !1, n.top, f.tabSize, n.tl, n.tr, !0),
    Sr(e, 1, 0, n.width, n.height, !1, !1, n.right, f.tabSize, n.tr, n.br),
    Sr(e, 0, 1, n.width, n.height, !0, !0, n.bottom, f.tabSize, n.bl, n.br),
    Sr(e, 0, 0, n.width, n.height, !1, !0, n.left, f.tabSize, n.tl, n.bl),
    e.closePath(),
    e.restore()
  }
  function Fr(e, t, r) {
    switch (e) {
      case 0:
        return t;
      case 1:
        return - r;
      case 2:
        return - t;
      case 3:
        return r;
      default:
        return 0
    }
  }
  function zr(e, t, r) {
    switch (e) {
      case 0:
        return r;
      case 1:
        return t;
      case 2:
        return - r;
      case 3:
        return - t;
      default:
        return 0
    }
  }
  function Nr(e) {
    for (var t = 0, r = e.pieces; t < r.length; t++) {
      var n = r[t];
      n.globalX = e.x + Fr(e.rot, n.x, n.y),
      n.globalY = e.y + zr(e.rot, n.x, n.y),
      n.rot = e.rot
    }
  }
  function Yr(e, t) {
    if (f.rotation) {
      for (var r = t ? Math.PI / 2 : - Math.PI / 2, n = t ? 1 : 3, a = 0; a < e.length; a++) {
        var i = e[a];
        i.targetAngle += r,
        i.rot = (i.rot + n) % 4,
        Nr(i)
      }
      !function (e) {
        var t = 5 + 3 * e.length;
        kn(7, t),
        z.setUint16(3, e.length, !0);
        for (var r = 0, n = 5; r < e.length; r++, n += 3) z.setUint16(n, e[r].id, !0),
        z.setUint8(n + 2, e[r].rot);
        Mn(F.subarray(0, t))
      }(e)
    }
  }
  function Lr(e) {
    for (var t = 1000000, r = 1000000, n = 0, a = 0, i = 0, o = e.pieces; i < o.length; i++) {
      var s = o[i];
      t = Math.min(t, s.xi),
      r = Math.min(r, s.yi),
      n = Math.max(n, s.xi),
      a = Math.max(a, s.yi)
    }
    for (
      var l = v[e.set],
      c = l.pieceWidth,
      u = l.pieceHeight,
      d = - (n - t) * c / 2,
      h = - (a - r) * u / 2,
      f = 0,
      g = e.pieces;
      f < g.length;
      f++
    ) {
      (s = g[f]).x = (s.xi - t) * c + d,
      s.y = (s.yi - r) * u + h
    }
    e.w = (n - t + 1) * c,
    e.h = (a - r + 1) * u
  }
  function Br(e, t, r) {
    for (
      var n = 1000000,
      a = 1000000,
      i = 0,
      o = 0,
      s = r &&
      e.pieces.length > t.pieces.length ? e : t,
      l = 0,
      c = s.pieces;
      l < c.length;
      l++
    ) {
      var u = c[l];
      n = Math.min(n, u.xi),
      a = Math.min(a, u.yi),
      i = Math.max(i, u.xi),
      o = Math.max(o, u.yi)
    }
    for (var d = 0, h = e.pieces; d < h.length; d++) {
      var f = h[d];
      t.pieces.push(f)
    }
    var g = s.w,
    p = s.h;
    Lr(t);
    for (var m = 1000000, x = 1000000, w = 0, y = 0, T = 0, b = t.pieces; T < b.length; T++) {
      var E = b[T];
      m = Math.min(m, E.xi),
      x = Math.min(x, E.yi),
      w = Math.max(w, E.xi),
      y = Math.max(y, E.yi)
    }
    var C = v[t.set],
    R = C.pieceWidth,
    M = C.pieceHeight,
    k = - g / 2 + (m - n) * R + t.w / 2,
    _ = - p / 2 + (x - a) * M + t.h / 2,
    D = Fr(t.rot, k, _),
    U = zr(t.rot, k, _);
    t.x = s.x + D,
    t.y = s.y + U,
    Mr(t),
    Nr(t),
    Kn(G, e),
    xn(e);
    for (var A = 0, X = e.ids; A < X.length; A++) {
      var O = X[A];
      t.ids.push(O)
    }
    t.ids.push(Math.min(e.id, t.id)),
    t.id = Math.max(e.id, t.id),
    t.locked = e.locked ||
    t.locked,
    t.user = void 0,
    t.selectedByOther = !1,
    V[t.id] = t;
    for (var P = 0, S = t.ids; P < S.length; P++) {
      var I = S[P];
      V[I] = t
    }
    return Qn(),
    t
  }
  var Hr = !1;
  function Wr(e, t, r, n) {
    var a = v[e.set];
    if (a) {
      var i = W[e.set][t.xi + r + (t.yi + n) * a.cols];
      if ( - 1 === e.pieces.indexOf(i) && t.rot === i.rot) {
        var o = r * a.pieceWidth,
        s = n * a.pieceHeight,
        l = Fr(t.rot, o, s),
        c = zr(t.rot, o, s);
        if (Er(i.globalX, i.globalY, t.globalX + l, t.globalY + c) < 15) {
          var u = G.find((function (e) {
            return - 1 !== e.pieces.indexOf(i)
          }));
          if (!u) throw new Error('no group');
          if (!u.user) {
            var d = e.id,
            h = u.id;
            if (d !== h) {
              var f = t.globalX,
              g = t.globalY,
              p = i.globalX,
              m = i.globalY;
              (
                function (e, t, r, n, a, i, o, s, l, c, u, d) {
                  var h = 37;
                  kn(6, h),
                  z.setUint16(3, e, !0),
                  z.setUint16(5, t, !0),
                  z.setFloat32(7, r, !0),
                  z.setFloat32(11, n, !0),
                  z.setUint16(15, a, !0),
                  z.setUint8(17, i),
                  z.setFloat32(18, o, !0),
                  z.setFloat32(22, s, !0),
                  z.setUint16(26, l, !0),
                  z.setUint8(28, c),
                  z.setFloat32(29, u, !0),
                  z.setFloat32(33, d, !0),
                  Mn(F.subarray(0, h))
                }
              ) (d, h, (e = Br(e, u, Hr)).x, e.y, t.index, t.rot, f, g, i.index, i.rot, p, m),
              Hr = !0
            }
          }
        }
      }
    }
    return e
  }
  function Gr(e, t, r) {
    var n = r.x + r.spriteX,
    a = r.y + r.spriteY,
    i = n + r.spriteW,
    o = a + r.spriteH;
    return e > n &&
    t > a &&
    e < i &&
    t < o
  }
  function Vr(e, t, r) {
    e -= r.x,
    t -= r.y;
    for (
      var n = (4 - r.rot) % 4,
      a = Fr(n, e, t),
      i = zr(n, e, t),
      o = 0,
      s = r.pieces;
      o < s.length;
      o++
    ) {
      var l = s[o];
      if (
        Gr(a, i, l) &&
        (
          Lt.beginPath(),
          Ir(Lt, l.x + l.puzzleX, l.y + l.puzzleY, l.puzzle),
          Lt.isPointInPath(a, i)
        )
      ) return !0
    }
    return !1
  }
  function qr(e, t, r) {
    e -= r.x,
    t -= r.y;
    for (
      var n = (4 - r.rot) % 4,
      a = Fr(n, e, t),
      i = zr(n, e, t),
      o = v[r.set],
      s = o.pieceWidth,
      l = o.pieceHeight,
      c = 0,
      u = r.pieces;
      c < u.length;
      c++
    ) {
      var d = u[c];
      if (Gr(a, i, d)) {
        var h = d.x + d.puzzleX - 5,
        f = d.y + d.puzzleY - 5;
        if (a > h && i > f && a < h + s + 10 && i < f + l + 10) return !0
      }
    }
    return !1
  }
  function Kr(e, t, r, n, a) {
    n < 0 &&
    (t += n, n = - n),
    a < 0 &&
    (r += a, a = - a);
    for (
      var i = 1 === e.rot ||
      3 === e.rot,
      o = v[e.set],
      s = o.pieceWidth,
      l = o.pieceHeight,
      c = i ? l : s,
      u = i ? s : l,
      d = 0,
      h = e.pieces;
      d < h.length;
      d++
    ) {
      var f = h[d],
      g = f.globalX + f.puzzleX,
      p = f.globalY + f.puzzleY;
      if (t <= g + c && t + n >= g && r <= p + u && r + a >= p) return !0
    }
    return !1
  }
  var jr = !1,
  Jr = !1,
  Zr = !1,
  $r = [],
  Qr = !1;
  function en(e, t) {
    if ($r[t] = e, $r.every((function (e) {
      return e
    }))) try {
      if (Zr) return;
      re = !1,
      lt.style.display = 'none',
      L ? function () {
        jr = !0;
        var e = $r.length > 1,
        t = an(),
        r = t.wCount,
        n = t.hCount;
        on($r),
        Yt.width = Ft,
        Yt.height = zt,
        Lt.fillStyle = 'white',
        Lt.fillRect(0, 0, Yt.width, Yt.height);
        for (var a = 0; a < $r.length; a++) {
          var i = $r[a];
          if (i.width && i.height) if (e) {
            var o = 8,
            s = Ft / r,
            l = zt / n,
            c = s - o,
            u = l - o,
            d = s * (a % 2),
            h = l * Math.floor(a / 2);
            Lt.drawImage(i, 0, 0, 1, 1, d, h, o / 2, o / 2),
            Lt.drawImage(i, i.width - 1, 0, 1, 1, d + c + o / 2, h, o / 2, o / 2),
            Lt.drawImage(i, 0, i.height - 1, 1, 1, d, h + u + o / 2, o / 2, o / 2),
            Lt.drawImage(i, i.width - 1, i.height - 1, 1, 1, d + c + o / 2, h + u + o / 2, o / 2, o / 2),
            Lt.drawImage(i, 0, 0, 1, i.height, d, h + o / 2, o / 2, u),
            Lt.drawImage(i, i.width - 1, 0, 1, i.height, d + c + o / 2, h + o / 2, o / 2, u),
            Lt.drawImage(i, 0, 0, i.width, 1, d + o / 2, h, c, o / 2),
            Lt.drawImage(i, 0, i.height - 1, i.width, 1, d + o / 2, h + u + o / 2, c, o / 2),
            Lt.drawImage(i, 0, 0, i.width, i.height, d + o / 2, h + o / 2, c, u)
          } else {
            var f = Ft / r,
            v = zt / n,
            g = f * (a % 2),
            p = v * Math.floor(a / 2);
            Lt.drawImage(i, 0, 0, i.width, i.height, g, p, f, v)
          }
        }
        Ut = Ut ||
        Jn(),
        Tt.bindTexture(Tt.TEXTURE_2D, Ut),
        Tt.texImage2D(Tt.TEXTURE_2D, 0, Tt.RGB, Tt.RGB, Tt.UNSIGNED_BYTE, Yt),
        Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_MAG_FILTER, Tt.LINEAR),
        Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_MIN_FILTER, Tt.LINEAR_MIPMAP_LINEAR),
        Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_WRAP_S, Tt.CLAMP_TO_EDGE),
        Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_WRAP_T, Tt.CLAMP_TO_EDGE),
        Tt.generateMipmap(Tt.TEXTURE_2D),
        Tt.bindTexture(Tt.TEXTURE_2D, null),
        N = !0
      }() : un()
    } catch (e) {
      nn(e)
    }
  }
  function tn(e, r) {
    if (e.endsWith('.webm')) {
      Qr = !0;
      var n = t.createElement('video');
      n.autoplay = !0,
      n.controls = !1,
      n.muted = !0,
      n.loop = !0,
      n.onloadedmetadata = function () {
        n.play(),
        n.width = n.videoWidth,
        n.height = n.videoHeight,
        en(n, r)
      },
      n.onerror = nn,
      n.src = e
    } else {
      var a = new Image;
      a.onload = function () {
        return en(a, r)
      },
      a.onerror = nn,
      a.src = e
    }
  }
  function rn() {
    try {
      if (Jr) return re = !1,
      lt.style.display = 'none',
      void dn();
      Jr = !0,
      lt.style.display = 'block',
      ct.textContent = 'Loading...',
      jr = !1,
      Zr = !1,
      $r = f.sets.map((function () {
      }));
      for (var e = 0; e < f.sets.length; e++) tn('/assets/pictures/'.concat(f.sets[e].image), e);
      if (L) try {
        un()
      } catch (e) {
        Zr = !0,
        nn(e)
      }
    } catch (e) {
      nn(e)
    }
  }
  function nn(e) {
    console.error(e);
    var t = 'Error occurred, reload to continue';
    'NS_ERROR_FAILURE' === e.name &&
    (
      t = 'Error while initializing graphics, try smaller piece count'
    ),
    ct.textContent = t
  }
  function an() {
    return {
      wCount: f.sets.length > 1 ? 2 : 1,
      hCount: f.sets.length > 2 ? 2 : 1
    }
  }
  function on(e) {
    for (
      var t = 4096,
      r = an(),
      n = r.wCount,
      a = r.hCount,
      i = 0,
      o = 0,
      s = 0;
      s < e.length;
      s++
    ) {
      var l = e[s];
      i = Math.max(i, l.width),
      o = Math.max(o, l.height)
    }
    if (Et && 1 === e.length) {
      var c = e[0],
      u = c.width,
      d = c.height;
      u < d ? (zt = Math.min(d, t), Ft = Math.round(u * zt / d)) : (Ft = Math.min(u, t), zt = Math.round(d * Ft / u))
    } else Ft = Math.min(En(i * n), t),
    zt = Math.min(En(o * a), t)
  }
  function sn() {
    return Or( - 0.1, 0.1)
  }
  function ln() {
    return {
      x: sn(),
      y: 0
    }
  }
  function cn() {
    return {
      x: 0,
      y: sn()
    }
  }
  function un() {
    v = f.sets.slice();
    var e = Et ||
    !L,
    r = an(),
    n = r.wCount,
    a = r.hCount;
    $ = 0,
    Q = 0;
    for (var i = 0, o = 0, s = 0, l = 0, c = 0, u = v; c < u.length; c++) {
      var d = u[c],
      h = Math.round(d.width / d.cols),
      g = Math.round(d.height / d.rows),
      p = Math.round(0.4 * Math.min(h, g)),
      m = g + 2 * p,
      x = (h + 2 * p) * d.cols,
      w = m * d.rows;
      if (
        $ = Math.max($, h),
        Q = Math.max(Q, g),
        i + x > 16384 &&
        (i = 0, (o = l) + w > 16384)
      ) throw new Error('Exceeded texture size limit');
      d.maskX = i,
      d.maskY = o,
      d.pieceWidth = h,
      d.pieceHeight = g,
      l = Math.max(l, o + w),
      s = Math.max(s, i + x),
      i += x
    }
    K = e ? s : En(s),
    j = e ? l : En(l),
    Yt.width = K,
    Yt.height = j,
    Lt.fillStyle = 'white',
    Lt.strokeStyle = L ? 'black' : 'rgba(0, 0, 0, 0.3)',
    Lt.lineWidth = 1.2,
    W = [],
    v.length > 1 &&
    on(
      v.map(
        (function (e) {
          return {
            width: e.imageWidth,
            height: e.imageHeight
          }
        })
      )
    );
    for (var y = 0, T = v; y < T.length; y++) {
      var b = T[y],
      E = v.indexOf(b),
      C = $r[E],
      R = b.pieceWidth,
      M = b.pieceHeight,
      k = Math.round(0.4 * Math.min(R, M)),
      _ = R + 2 * k,
      D = M + 2 * k;
      L &&
      v.length > 1 ? (
        b.tx = 1 / n * (E % 2) + 4 / Ft,
        b.ty = 1 / a * Math.floor(E / 2) + 4 / zt,
        b.tw = 1 / n - 8 / Ft,
        b.th = 1 / a - 8 / zt
      ) : (b.tx = 1 / n * (E % 2), b.ty = 1 / a * Math.floor(E / 2), b.tw = 1 / n, b.th = 1 / a);
      for (
        var U = b.tw / b.cols,
        A = b.th / b.rows,
        X = U * (_ / R),
        O = A * (D / M),
        P = - (X - U) / 2,
        S = - (O - A) / 2,
        I = _ / K,
        F = D / j,
        z = {
          x: 0,
          y: 0
        },
        B = [],
        H = 0,
        G = 0,
        V = 0,
        q = 0;
        V < b.rows;
        V++
      ) for (var J = 0; J < b.cols; J++, q++) {
        var Z = B[J - 1 + V * b.cols],
        ee = B[J + (V - 1) * b.cols],
        te = 0 === J,
        re = J === b.cols - 1,
        ne = 0 === V,
        oe = V === b.rows - 1,
        se = ne ? void 0 : ee.puzzle.bottom,
        le = oe ? void 0 : Pr(f.jitter),
        ce = te ? void 0 : Z.puzzle.right,
        ue = re ? void 0 : Pr(f.jitter),
        de = {
          width: R,
          height: M,
          top: se,
          bottom: le,
          left: ce,
          right: ue,
          tl: te ? ne ? z : ee.puzzle.bl : Z.puzzle.tr,
          tr: ne ? re ? z : ln() : ee.puzzle.br,
          bl: te ? oe ? z : cn() : Z.puzzle.br,
          br: re ? oe ? z : cn() : oe ? ln() : {
            x: sn(),
            y: sn()
          }
        },
        he = (ce && ce.flip ? - 1 : 1) * (0.05 + (ce ? 0.5 * ce.c : 0)),
        fe = (ue && ue.flip ? 1 : - 1) * (0.05 + (ue ? 0.5 * ue.c : 0)),
        ve = (se && se.flip ? - 1 : 1) * (0.05 + (se ? 0.5 * se.c : 0)),
        ge = (le && le.flip ? 1 : - 1) * (0.05 + (le ? 0.5 * le.c : 0));
        he += (de.tl.x + de.bl.x) / 2 * 0.5,
        fe -= (de.tr.x + de.br.x) / 2 * 0.5,
        ve += (de.tl.y + de.tr.y) / 2 * 0.5,
        ge -= (de.bl.y + de.br.y) / 2 * 0.5,
        Lt.save(),
        Lt.translate(b.maskX + _ * H, b.maskY + D * G),
        Lt.beginPath(),
        Ir(Lt, k, k, de),
        Lt.closePath(),
        Lt.fill();
        var pe = 0,
        me = 0,
        xe = 1,
        we = 1,
        ye = 0,
        Te = 0,
        be = 0,
        Ee = 0;
        if (L) pe = he,
        me = ve,
        xe = 1 - (he + fe),
        we = 1 - (ve + ge),
        ye = b.tx + (P + U * J + X * pe),
        Te = b.ty + (S + A * V + O * me),
        be = X * xe,
        Ee = O * we;
         else {
          Lt.globalCompositeOperation = 'source-atop';
          var Ce = C.width / b.cols,
          Re = C.height / b.rows,
          Me = Math.round(Ce * (_ / R)),
          ke = Math.round(Re * (D / M)),
          _e = Me,
          De = ke,
          Ue = J * Ce - Math.round((_e - Ce) / 2),
          Ae = V * Re - Math.round((De - Re) / 2),
          Xe = 0,
          Oe = 0,
          Pe = _,
          Se = D;
          if (Ue < 0) {
            var Ie = _ * - Ue / Me;
            _e += Ue,
            Xe += Ie,
            Pe -= Ie,
            Ue = 0
          }
          if (Ue < 0) {
            var Fe = D * - Ae / ke;
            De += Ae,
            Oe += Fe,
            Se -= Fe,
            Ae = 0
          }
          if (Ue + _e > C.width) {
            var ze = C.width - (Ue + _e);
            _e -= ze,
            Pe -= _ * ze / Me
          }
          if (Ae + De > C.height) {
            var Ne = C.height - (Ae + De);
            De -= Ne,
            Se -= D * Ne / ke
          }
          ye = b.maskX + J * _,
          Te = b.maskY + V * D,
          be = _,
          Ee = D,
          Lt.drawImage(C, Ue, Ae, _e, De, Xe, Oe, Pe, Se),
          Lt.globalCompositeOperation = 'source-over'
        }
        Lt.stroke(),
        Lt.restore();
        var Ye = b.maskX / K + I * H + I * pe,
        Le = b.maskY / j + F * G + F * me,
        Be = I * xe,
        He = F * we;
        B.push({
          index: q,
          xi: J,
          yi: V,
          rot: 0,
          x: 0,
          y: 0,
          spriteX: - _ / 2 + _ * pe,
          spriteY: - D / 2 + D * me,
          spriteW: _ * xe,
          spriteH: D * we,
          tx: ye,
          ty: Te,
          tw: be,
          th: Ee,
          tx2: Ye,
          ty2: Le,
          tw2: Be,
          th2: He,
          puzzle: de,
          puzzleX: - R / 2,
          puzzleY: - M / 2,
          globalX: 0,
          globalY: 0
        }),
        ++H >= b.cols &&
        (H = 0, G++)
      }
      W.push(B)
    }
    if (L) {
      t.hidden &&
      Lt.getImageData(0, 0, 1, 1),
      At = At ||
      Jn(),
      Tt.bindTexture(Tt.TEXTURE_2D, At),
      Tt.texImage2D(Tt.TEXTURE_2D, 0, Tt.ALPHA, Tt.ALPHA, Tt.UNSIGNED_BYTE, Yt),
      Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_MAG_FILTER, Tt.LINEAR),
      Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_MIN_FILTER, Tt.LINEAR_MIPMAP_LINEAR),
      Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_WRAP_S, Tt.CLAMP_TO_EDGE),
      Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_WRAP_T, Tt.CLAMP_TO_EDGE),
      Tt.generateMipmap(Tt.TEXTURE_2D);
      var We = Math.round(K / 2),
      Ge = Math.round(j / 2);
      if (
        Ot = Tt.createFramebuffer(),
        Xt = Xt ||
        Jn(),
        Tt.bindTexture(Tt.TEXTURE_2D, Xt),
        Et ? Tt.texImage2D(Tt.TEXTURE_2D, 0, Tt.R8, We, Ge, 0, Tt.RED, Tt.UNSIGNED_BYTE, null) : Tt.texImage2D(
          Tt.TEXTURE_2D,
          0,
          Tt.RGBA,
          We,
          Ge,
          0,
          Tt.RGBA,
          Tt.UNSIGNED_BYTE,
          null
        ),
        Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_MAG_FILTER, Tt.LINEAR),
        Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_MIN_FILTER, Tt.LINEAR_MIPMAP_LINEAR),
        Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_WRAP_S, Tt.CLAMP_TO_EDGE),
        Tt.texParameteri(Tt.TEXTURE_2D, Tt.TEXTURE_WRAP_T, Tt.CLAMP_TO_EDGE),
        Tt.bindTexture(Tt.TEXTURE_2D, null),
        Ot &&
        (
          Tt.bindFramebuffer(Tt.FRAMEBUFFER, Ot),
          Tt.framebufferTexture2D(Tt.FRAMEBUFFER, Tt.COLOR_ATTACHMENT0, Tt.TEXTURE_2D, Xt, 0),
          Tt.viewport(0, 0, We, Ge),
          Tt.clearColor(0, 0, 0, 0),
          Tt.clear(Tt.COLOR_BUFFER_BIT),
          Tt.useProgram(_t.program),
          Tt.uniform2f(_t.uniforms.shadowOffset, 0, 0),
          Tt.uniform2f(_t.uniforms.shadowSpread, 5 / K, 5 / j),
          Tt.bindTexture(Tt.TEXTURE_2D, At),
          or(Dt, - 1, - 1, 2, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0),
          ar(Dt),
          Tt.bindTexture(Tt.TEXTURE_2D, null),
          Tt.framebufferTexture2D(Tt.FRAMEBUFFER, Tt.COLOR_ATTACHMENT0, Tt.TEXTURE_2D, null, 0),
          Tt.bindFramebuffer(Tt.FRAMEBUFFER, null),
          Tt.deleteFramebuffer(Ot),
          Tt.bindTexture(Tt.TEXTURE_2D, Xt),
          Tt.generateMipmap(Tt.TEXTURE_2D),
          Tt.bindTexture(Tt.TEXTURE_2D, null)
        ),
        !jr
      ) {
        var Ve = new Uint8Array([220,
        220,
        220,
        255]);
        Ut = Ut ||
        Jn(),
        Tt.bindTexture(Tt.TEXTURE_2D, Ut),
        Tt.texImage2D(Tt.TEXTURE_2D, 0, Tt.RGB, 1, 1, 0, Tt.RGB, Tt.UNSIGNED_BYTE, Ve),
        Tt.bindTexture(Tt.TEXTURE_2D, null)
      }
      Yt.width = 500,
      Yt.height = 500
    } else {
      var qe = aa('canvas');
      qe.width = $r.reduce((function (e, t) {
        return e + t.width
      }), 0),
      qe.height = $r.reduce((function (e, t) {
        return Math.max(e, t.height)
      }), 0);
      for (
        var Ke = qe.getContext('2d'),
        je = 0,
        Je = 0,
        Ze = 0,
        $e = $r;
        Ze < $e.length;
        Ze++
      ) {
        var Qe = $e[Ze];
        Ke.drawImage(Qe, je, 0),
        je += Qe.width,
        v[Je].imageWidth = Qe.width,
        v[Je].imageHeight = Qe.height,
        Je++
      }
      Nt = qe
    }
    0 === ae &&
    0 === ie &&
    cr(),
    N = Y = !0,
    dn()
  }
  function dn() {
    xe = [],
    Te = !1,
    se = !1,
    G = f.groups.map(
      (
        function (e) {
          return {
            set: 0 | e.set,
            id: e.id,
            ids: e.ids ||
            [],
            x: e.x,
            y: e.y,
            w: 0,
            h: 0,
            locked: !!e.locked,
            rot: 0 | e.rot,
            angle: (0 | e.rot) * Math.PI * 0.5,
            targetAngle: (0 | e.rot) * Math.PI * 0.5,
            pieces: e.indices.map((function (t) {
              return W[0 | e.set][t]
            })),
            user: qn(q, e.dragged || e.selected),
            selectedByOther: !!e.selected,
            selected: !1,
            dragged: !1,
            startX: 0,
            startY: 0
          }
        }
      )
    ),
    V = [];
    for (var e = 0, t = W; e < t.length; e++) for (var r = t[e], n = 0; n < r.length; n++) {
      r[n];
      V.push(void 0)
    }
    for (var a = 0, i = G; a < i.length; a++) {
      var o = i[a];
      Lr(o),
      Nr(o),
      V[o.id] = o;
      for (var s = 0, l = o.ids; s < l.length; s++) {
        var c = l[s];
        V[c] = o
      }
    }
    je(),
    Qn()
  }
  function hn(e, t, r, n) {
    or(
      Dt,
      e.x + e.spriteX,
      e.y + e.spriteY,
      e.spriteW,
      e.spriteH,
      e.tx,
      e.ty,
      e.tw,
      e.th,
      e.tx2,
      e.ty2,
      e.tw2,
      e.th2,
      t,
      r,
      n,
      0
    )
  }
  function fn(e, t) {
    Tt.uniform4f(e, t[0], t[1], t[2], t[3])
  }
  function vn(e) {
    var t = v[e.set],
    r = t.pieceWidth,
    n = t.pieceHeight,
    a = e.x + ae,
    i = e.y + ie,
    o = (e.w + r) / 2,
    s = (e.h + n) / 2;
    if (!(a - o > A || i - s > X || a + o < 0 || i + s < 0)) {
      var l = e.angle,
      c = (e.dragged || e.user ? 0.7 : 0.4) * wn(r / 100, 0.1, 1),
      u = Math.sin(l),
      d = Math.cos(l);
      It[0] = d,
      It[1] = u,
      It[2] = - u,
      It[3] = d,
      It[4] = a,
      It[5] = i;
      for (var h = 0, f = e.pieces; h < f.length; h++) {
        hn(f[h], 0, c, l)
      }
      if (!e.dragged && e.user || e.selected) {
        var g = e.selected ? Pt : e.user.highlight;
        St !== g &&
        (ar(Dt), fn(Rt.uniforms.highlightColor, St = g));
        for (var p = 0, m = e.pieces; p < m.length; p++) {
          hn(m[p], 0, 0, l)
        }
      }
      for (var x = 0, w = e.pieces; x < w.length; x++) {
        hn(w[x], 1, 0, l)
      }
    }
  }
  function gn(e, t, r, n, a, i) {
    var o,
    s,
    l = v[t.set],
    c = l.pieceWidth,
    u = l.pieceHeight,
    d = t.x + ae,
    h = t.y + ie,
    g = (t.w + c) / 2,
    p = (t.h + u) / 2;
    if (t.angle !== t.targetAngle) o = s = Math.sqrt(g * g + p * p);
     else {
      var m = 1 === t.rot ||
      3 === t.rot;
      o = m ? p : g,
      s = m ? g : p
    }
    if (!(d - o > a || h - s > i || d + o < r || h + s < n)) {
      var x = !t.dragged &&
      t.user ||
      t.selected;
      if (x) {
        var w = t.user ? t.user.color : 'white';
        Vt !== w &&
        (e.strokeStyle = Vt = w)
      }
      if (e.save(), e.translate(d, h), e.rotate(t.angle), x) {
        e.beginPath();
        for (var y = 0, T = t.pieces; y < T.length; y++) {
          var b = T[y];
          if (!f.rotation) {
            var E = d + b.x,
            C = h + b.y,
            R = E + b.spriteX,
            M = C + b.spriteY;
            if (R > a || M > i || R + b.spriteW < r || M + b.spriteH < n) continue
          }
          Ir(e, b.x + b.puzzleX, b.y + b.puzzleY, b.puzzle)
        }
        e.stroke()
      }
      for (var k = 0, _ = t.pieces; k < _.length; k++) {
        var D = _[k];
        if (!f.rotation) {
          var U = d + D.x,
          A = h + D.y,
          X = U + D.spriteX,
          O = A + D.spriteY;
          if (X > a || O > i || X + D.spriteW < r || O + D.spriteH < n) continue
        }
        e.drawImage(
          Yt,
          D.tx,
          D.ty,
          D.tw,
          D.th,
          D.x + D.spriteX,
          D.y + D.spriteY,
          D.spriteW,
          D.spriteH
        )
      }
      e.restore()
    }
  }
  function pn() {
    for (var e = 0, t = q; e < t.length; e++) {
      var r = t[e];
      r.heldPiecesOld = r.heldPieces,
      r.heldPieces = 0
    }
    for (var n = 0, a = G; n < a.length; n++) {
      var i = a[n];
      i.user &&
      (i.user.heldPieces += i.pieces.length)
    }
    for (var o = 0, s = q; o < s.length; o++) {
      var l = s[o];
      l.heldPieces !== l.heldPiecesOld &&
      (l.heldPiecesText.textContent = l.heldPieces.toString())
    }
  }
  function mn(t, r, n, a) {
    var i = Math.max(Math.floor((t + ae) * oe), 0),
    o = Math.max(Math.floor((r + ie) * oe), 0);
    !function (t, r, n, a) {
      if (!L && !Y && 0 !== n && 0 !== a) {
        if (a < 0 && console.warn('invalid redraw', t, r, n, a), B.length > 20) return Y = !0,
        void (B.length = 0);
        var i = e.devicePixelRatio ||
        1,
        o = t + n,
        s = r + a;
        t = Math.floor(t * i),
        r = Math.floor(r * i),
        n = Math.ceil(o * i) - t,
        a = Math.ceil(s * i) - r;
        var l = !1;
        do {
          l = !1;
          for (var c = 0; c < B.length; c++) {
            var u = B[c];
            if (t < u.x + u.w && t + n > u.x && r < u.y + u.h && r + a > u.y) {
              var d = Math.min(t, u.x);
              n = Math.max(t + n, u.x + u.w) - d;
              var h = Math.min(r, u.y);
              a = Math.max(r + a, u.y + u.h) - h,
              t = d,
              r = h,
              B[c] = B[B.length - 1],
              B.length--,
              l = !0;
              break
            }
          }
        } while (l);
        n &&
        a &&
        B.push({
          x: t,
          y: r,
          w: n,
          h: a
        })
      }
    }(
      i,
      o,
      wn(Math.ceil((t + ae + n) * oe) - i, 0, Math.max(e.innerWidth - i, 0)),
      wn(Math.ceil((r + ie + a) * oe) - o, 0, Math.max(e.innerHeight - o, 0))
    )
  }
  function xn(e) {
    if (!L) {
      var t,
      r,
      n = v[e.set],
      a = n.pieceWidth,
      i = n.pieceHeight,
      o = (e.w + a) / 2,
      s = (e.h + i) / 2;
      if (e.angle !== e.targetAngle) t = r = Math.sqrt(o * o + s * s);
       else {
        var l = 1 === e.rot ||
        3 === e.rot;
        t = l ? s : o,
        r = l ? o : s
      }
      mn(e.x - t, e.y - r, 2 * t, 2 * r)
    }
  }
  function wn(e, t, r) {
    return e > t ? e < r ? e : r : t
  }
  function yn(e) {
    return Math.round(100 * e) / 100
  }
  function Tn(e) {
    return function (e, t, r) {
      var n = Tt.createProgram();
      if (!n) throw new Error('Failed to create program');
      Tt.attachShader(n, e),
      Tt.attachShader(n, t),
      Tt.bindAttribLocation(n, 0, 'position'),
      Tt.bindAttribLocation(n, 1, 'texcoords'),
      Tt.bindAttribLocation(n, 2, 'vertexColor'),
      Tt.linkProgram(n),
      Tt.deleteShader(e),
      Tt.deleteShader(t),
      !1;
      var a = function (e, t) {
        Tt.useProgram(e);
        for (
          var r = {},
          n = [],
          a = ''.concat(t.vertex, '\n').concat(t.fragment).match(/uniform [a-z0-9_]+ [a-z_][a-z0-9_]*/gi) ||
          [],
          i = 0;
          i < a.length;
          i++
        ) {
          var o = a[i].split(' '),
          s = o[1],
          l = o[2],
          c = Tt.getUniformLocation(e, l);
          c &&
          (r[l] = c, 'sampler2D' === s && n.push(l))
        }
        return n.sort().forEach((function (e, t) {
          return Tt.uniform1i(r[e], t)
        })),
        r
      }(n, r);
      return {
        program: n,
        uniforms: a
      }
    }(
      bn(Tt.VERTEX_SHADER, e.vertex),
      bn(Tt.FRAGMENT_SHADER, e.fragment),
      e
    )
  }
  function bn(e, t) {
    var r = Tt.createShader(e);
    if (!r) throw new Error('Failed to create shader');
    return Tt.shaderSource(r, t),
    Tt.compileShader(r),
    r
  }
  function En(e) {
    for (var t = 1; t < e; ) t *= 2;
    return t
  }
  function Cn(e) {
    te &&
    ee &&
    ee.send(JSON.stringify(e))
  }
  var Rn = /MSIE 10|Trident\/7/.test(navigator.userAgent);
  function Mn(e, t) {
    if (Rn) {
      var r = new ArrayBuffer(e.byteLength);
      new Uint8Array(r).set(data),
      e = r
    }
    te &&
    ee &&
    (M || t) &&
    ee.send(e)
  }
  function kn(e, t) {
    !function (e) {
      for (; e > F.byteLength; ) F = new Uint8Array(2 * F.byteLength),
      z = new DataView(F.buffer)
    }(t),
    z.setUint8(0, e),
    z.setUint16(1, M, !0)
  }
  function _n(e, t) {
    var r = 5 + 2 * t.length;
    kn(e, r),
    z.setUint16(3, t.length, !0);
    for (var n = 0, a = 5; n < t.length; n++, a += 2) z.setUint16(a, t[n].id, !0);
    Mn(F.subarray(0, r))
  }
  function Dn(e, t) {
    var r = 5 + 10 * t.length;
    kn(e, r),
    z.setUint16(3, t.length, !0);
    for (var n = 0, a = 5; n < t.length; n++, a += 10) z.setUint16(a, t[n].id, !0),
    z.setFloat32(a + 2, t[n].x, !0),
    z.setFloat32(a + 6, t[n].y, !0);
    Mn(F.subarray(0, r))
  }
  function Un(e) {
    var t = '' + JSON.stringify(e),
    r = 3 + pa(t);
    kn(12, r),
    xa(z, 3, t),
    Mn(F.subarray(0, r), !0)
  }
  function An(e) {
    var t = 3 + pa(e);
    kn(16, t),
    xa(z, 3, e),
    Mn(F.subarray(0, t), !0)
  }
  var Xn = void 0,
  On = void 0,
  Pn = 0;
  function Sn() {
    Xn &&
    (t.body.removeChild(Xn), Xn = void 0, On = void 0, Pn = 0)
  }
  function In() {
    if (Xn && On) {
      var t = On.getBoundingClientRect();
      Xn.style.right = ''.concat(e.innerWidth - t.right, 'px'),
      Xn.style.top = ''.concat(t.bottom + 8, 'px')
    }
  }
  ca(Ue, 'wheel', ua),
  ca(Ue, 'scroll', In),
  ca(t, 'mousedown', Sn);
  var Fn = 'n' !== ea('timer'),
  zn = na('timer-box'),
  Nn = na('timer-text');
  function Yn() {
    Fn ? zn.classList.remove('is-hidden') : zn.classList.add('is-hidden')
  }
  function Ln(e) {
    return e < 10 ? '0'.concat(e) : e
  }
  function Bn() {
    var e = f.startTime,
    t = f.endTime ||
    Date.now(),
    r = e ? Math.floor(Math.max(0, t - e) / 1000) : 0,
    n = r % 60,
    a = Math.floor(r / 60) % 60,
    i = Math.floor(r / 3600) % 24,
    o = Math.floor(r / 86400),
    s = ''.concat(Ln(a), ':').concat(Ln(n));
    (o || i) &&
    (s = ''.concat(Ln(i), ':').concat(s)),
    o &&
    (s = ''.concat(o, ' ').concat(1 === o ? 'day' : 'days', ' ').concat(s)),
    Nn.innerText = s
  }
  function Hn() {
    clearTimeout(ne),
    ne = void 0,
    (ee = new WebSocket(location.origin.replace(/^http/, 'ws') + '/ws')).binaryType = 'arraybuffer',
    lt.style.display = 'block',
    ct.textContent = 'Connecting...',
    ee.onopen = function () {
      Date.now(),
      ct.textContent = 'Loading...',
      te = !0
    },
    ee.onmessage = function (e) {
      var r = e.data;
      if (Date.now(), r) {
        if ('string' == typeof r) {
          var n = JSON.parse(r);
          switch (n.type) {
            case 'version':
              break;
            case 'me':
              ta('session', p = n.session),
              x = n.oauth,
              m = n.name,
              Jt(),
              tr &&
              tr.close();
              break;
            case 'users':
              for (; Ue.lastElementChild; ) Ue.removeChild(Ue.lastElementChild);
              var a = qn(n.users, M);
              a &&
              n.users.unshift(n.users.splice(n.users.indexOf(a), 1) [0]),
              q = n.users,
              Pn &&
              !q.some((function (e) {
                return e.id === Pn
              })) &&
              Sn();
              for (
                var i = function (e, r) {
                  var n = r[e];
                  n.heldPieces = 0,
                  n.heldPiecesOld = 0,
                  n.heldPiecesText = ia('0'),
                  n.highlight = jn(n.color);
                  var a = aa('div', 'user'),
                  i = aa('span', 'user-color');
                  i.style.backgroundColor = n.color;
                  var o = aa('span', 'user-name');
                  if ('twitch' === n.oauth) {
                    var s = oa('0 0 512 512', d);
                    o.title = 'Signed-in with Twitch',
                    o.appendChild(s)
                  }
                  if (
                    o.appendChild(ia(n.name)),
                    a.appendChild(i),
                    a.appendChild(o),
                    n.id !== M &&
                    Oe
                  ) {
                    var l = aa('span', 'user-pieces');
                    l.title = 'Pieces held by user',
                    l.appendChild(n.heldPiecesText),
                    l.appendChild(
                      oa(
                        '0 0 576 512',
                        'M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z'
                      )
                    ),
                    a.appendChild(l)
                  }
                  if (n.id === M) {
                    var c = aa('div', 'user-button');
                    c.title = 'User options';
                    var u = oa(
                      '0 0 512 512',
                      'M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z'
                    );
                    c.style.marginRight = '2px',
                    c.appendChild(u),
                    la(c, Zt),
                    a.appendChild(c)
                  } else if (Oe) {
                    var h = aa('div', 'user-button');
                    h.title = 'Admin actions';
                    var f = oa(
                      '0 0 640 512',
                      'M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z'
                    );
                    h.appendChild(f),
                    la(
                      h,
                      (
                        function () {
                          return function (e, r) {
                            if (Pn !== r.id) {
                              Sn();
                              var n = aa('div', 'dropdown-menu right dropdown-menu-user'),
                              a = aa('button', 'dropdown-item');
                              a.appendChild(ia('kick & block user')),
                              la(a, (function () {
                                Cn({
                                  type: 'kick',
                                  user: r.id,
                                  secret: Oe
                                }),
                                Sn()
                              })),
                              n.appendChild(a),
                              n.style.display = 'block',
                              t.body.append(n),
                              sa(n),
                              Xn = n,
                              On = e,
                              Pn = r.id,
                              In()
                            } else Sn()
                          }(h, n)
                        }
                      )
                    ),
                    a.appendChild(h),
                    Pn === n.id &&
                    (On = h)
                  }
                  Ue.appendChild(a)
                },
                o = 0,
                s = q;
                o < s.length;
                o++
              ) i(o, s);
              for (var l = 0, c = G; l < c.length; l++) {
                var g = c[l];
                g.user &&
                (g.user = qn(q, g.user.id))
              }
              pn(),
              In();
              break;
            case 'room':
              f = n.room,
              h = f.seed,
              J = f.boardWidth,
              Z = f.boardHeight,
              st.textContent = f.sets.reduce((function (e, t) {
                return e + t.cols * t.rows
              }), 0).toString();
              var y = '/?image='.concat(f.sets.map((function (e) {
                return e.image
              })).join(';'), '&name=').concat(encodeURIComponent(f.name), '&pieces=').concat(f.pieces);
              f.rotation &&
              (y += '&rotation=yes'),
              f.hidePreview &&
              (y += '&preview=hide'),
              ut.href = y,
              ut.style.display = f.hidePreview ? 'none' : 'flex',
              He.style.display = f.sets.length > 1 ? 'inline' : 'none',
              Jt(),
              setTimeout(rn),
              Bn();
              break;
            case 'update':
              Object.assign(f, n.room),
              ze() ||
              Ar(),
              ut.style.display = f.hidePreview ? 'none' : 'flex',
              Jt()
          }
        } else for (var T = {
          view: new DataView(r),
          offset: 0
        }; T.offset < r.byteLength; ) {
          var b = da(T),
          E = ha(T);
          switch (b) {
            case 1:
            case 2:
            case 3:
              for (var C = ha(T), R = 0; R < C; R++) {
                var k = ha(T),
                _ = fa(T),
                D = fa(T),
                U = V[k];
                U &&
                (
                  U.x = _,
                  U.y = D,
                  Nr(U),
                  1 === b ? (Vn(U), U.user = qn(q, E), Gn(U)) : 3 !== b ||
                  U.selectedByOther ||
                  (U.user = void 0, xn(U))
                )
              }
              pn();
              break;
            case 4:
            case 5:
            case 8:
            case 9:
            case 10:
              for (var A = ha(T), X = 0; X < A; X++) {
                var O = ha(T),
                P = V[O];
                if (P) switch (b) {
                  case 4:
                    Vn(P),
                    P.user = qn(q, E),
                    P.selectedByOther = !0,
                    xn(P);
                    break;
                  case 5:
                  case 10:
                    P.user = void 0,
                    P.selectedByOther = !1,
                    xn(P);
                    break;
                  case 10:
                    Vn(P);
                    break;
                  case 8:
                  case 9:
                    P.locked = 8 === b,
                    Vn(P),
                    je()
                }
              }
              pn();
              break;
            case 6:
              var S = ha(T),
              I = ha(T),
              z = V[S],
              Y = V[I];
              if (z && Y && z !== Y) {
                Vn(z),
                Vn(Y, !0);
                var L = Br(z, Y);
                L.x = fa(T),
                L.y = fa(T),
                Nr(L),
                Gn(L),
                yt(gt, 0.5),
                T.offset += 22
              } else T.offset += 30;
              G.length === v.length &&
              yt(xt),
              pn();
              break;
            case 7:
              for (var B = ha(T), H = 0; H < B; H++) {
                var W = ha(T),
                K = da(T),
                j = V[W];
                if (j) {
                  var $ = K * u / 4;
                  if (K === (j.rot + 1) % 4) {
                    for (; $ < j.angle; ) $ += u;
                    for (; $ - u > j.angle; ) $ -= u
                  } else {
                    for (; $ > j.angle; ) $ -= u;
                    for (; $ + u < j.angle; ) $ += u
                  }
                  j.targetAngle = $,
                  j.rot = K,
                  Nr(j)
                }
              }
              break;
            case 11:
              kn(11, 3),
              Mn(F.subarray(0, 3));
              break;
            case 12:
              var Q = va(T),
              te = va(T);
              if (Q !== APP_VERSION) return void location.reload();
              Un(new Function('a', 'b', te) (123, 765)),
              Cn({
                type: 'user',
                session: p,
                name: m,
                color: w,
                room: ROOM_NAME,
                secret: Oe
              });
              break;
            case 13:
              //location.reload();
              break;
            case 14:
              Me.style.display = 'block',
              ee.onclose = function () {
              },
              ee.close();
              break;
            case 15:
              M = E;
              break;
            case 16:
              Wn(va(T), va(T), va(T), va(T)),
              E !== M &&
              yt(pt)
          }
        }
        N = !0
      }
    },
    ee.onclose = function () {
      lt.style.display = 'block',
      ct.textContent = 'Connecting...',
      te = !1,
      M = 0,
      ne = setTimeout(Hn, 100)
    }
  }
  function Wn(e, t, r, n) {
    for (; at.childElementCount > 100; ) at.removeChild(at.firstChild);
    var a = aa('div', 'chat-message'),
    i = aa('div'),
    o = new Date,
    s = o.getHours(),
    l = o.getMinutes(),
    c = aa('div', 'chat-date');
    c.appendChild(
      ia(
        ''.concat(s < 10 ? '0'.concat(s) : s, ':').concat(l < 10 ? '0'.concat(l) : l)
      )
    ),
    i.appendChild(c);
    var u = aa('div', 'chat-user');
    u.style.color = t,
    'twitch' === r &&
    (
      u.appendChild(oa('0 0 512 512', d)),
      u.title = 'Signed-in with Twitch'
    ),
    u.appendChild(ia(e)),
    i.appendChild(u);
    var h = aa('div', 'chat-content');
    h.appendChild(ia(n)),
    i.appendChild(h),
    a.appendChild(i),
    at.appendChild(a),
    setTimeout((function () {
      return nt.scrollTop = 1000000
    }))
  }
  function Gn(e) {
    xn(e),
    Kn(G, e);
    for (var t = G.length; t > 0; t--) if (G[t - 1].pieces.length >= e.pieces.length) return void G.splice(t, 0, e);
    G.unshift(e)
  }
  function Vn(e, t) {
    if (e.dragged) {
      for (var r = 0; r < xe.length; r++) if (xe[r] === e) {
        xe.splice(r, 1);
        break
      }
      e.dragged = !1
    }
    t ||
    (e.selected = !1),
    xn(e)
  }
  function qn(e, t) {
    for (var r = 0; r < e.length; r++) if (e[r].id === t) return e[r]
  }
  function Kn(e, t) {
    var r = e.indexOf(t);
    - 1 !== r &&
    e.splice(r, 1)
  }
  function jn(e) {
    var t = parseInt(e.substr(1), 16);
    return [(t >> 16 & 255) / 255,
    (t >> 8 & 255) / 255,
    (t >> 0 & 255) / 255,
    1]
  }
  function Jn() {
    var e = Tt.createTexture();
    if (!e) throw new Error('Failed to create texture');
    return e
  }
  function Zn() {
    rt.style.display = 'block',
    rt.focus()
  }
  function $n() {
    rt.blur(),
    rt.value = '',
    rt.style.display = 'none'
  }
  function Qn() {
    var e = W.reduce((function (e, t) {
      return e + t.length
    }), 0),
    t = 100 * (1 - (G.length - v.length) / (e - 1));
    ot.title = ''.concat(e, ' pieces, ').concat(t.toFixed(), '% done')
  }
  function ea(e) {
    try {
      return localStorage.getItem(e)
    } catch (e) {
      return
    }
  }
  function ta(e, t) {
    try {
      localStorage.setItem(e, t)
    } catch (e) {
    }
  }
  function ra(e, t) {
    var r = parseFloat(ea(e));
    return Number.isNaN(r) ? t : r
  }
  function na(e) {
    return t.getElementById(e)
  }
  function aa(e, r) {
    var n = t.createElement(e);
    return r &&
    (n.className = r),
    n
  }
  function ia(e) {
    return t.createTextNode(e)
  }
  function oa(e, r) {
    var n = 'http://www.w3.org/2000/svg',
    a = t.createElementNS(n, 'svg');
    a.setAttribute('class', 'svg-icon'),
    a.setAttribute('viewBox', e);
    var i = t.createElementNS(n, 'path');
    return i.setAttribute('fill', 'currentColor'),
    i.setAttribute('d', r),
    a.appendChild(i),
    a
  }
  function sa(e) {
    ca(
      e,
      [
        'mousedown',
        'mousemove',
        'mouseup',
        'touchstart',
        'touchmove',
        'touchend',
        'wheel'
      ],
      ua
    )
  }
  function la(e, t) {
    ca(e, 'click', t),
    sa(e)
  }
  function ca(e, t, r) {
    'string' == typeof t ? e.addEventListener(t, r, {
      passive: !1
    }) : t.map((function (t) {
      return e.addEventListener(t, r, {
        passive: !1
      })
    }))
  }
  function ua(e) {
    'touchstart' === e.type &&
    gr(),
    'touchstart' !== e.type &&
    'mousedown' !== e.type ||
    wt(),
    e.stopPropagation()
  }
  function da(e) {
    return e.offset += 1,
    e.view.getUint8(e.offset - 1)
  }
  function ha(e) {
    return e.offset += 2,
    e.view.getUint16(e.offset - 2, !0)
  }
  function fa(e) {
    return e.offset += 4,
    e.view.getFloat32(e.offset - 4, !0)
  }
  function va(e) {
    var t = ha(e),
    r = function (e, t, r) {
      if (null == e) return null;
      for (var n = '', a = t + r, i = t; i < a; ) {
        var o = e.getUint8(i++),
        s = void 0;
        if (0 == (128 & o)) s = o;
         else if (192 == (224 & o)) {
          if ((s = (31 & o) << 6 | wa(e, i++, a)) < 128) throw Error('Invalid continuation byte')
        } else if (224 == (240 & o)) {
          if ((s = (15 & o) << 12 | wa(e, i++, a) << 6 | wa(e, i++, a)) < 2048) throw Error('Invalid continuation byte');
          if (s >= 55296 && s <= 57343) throw Error(
            'Lone surrogate U+'.concat(s.toString(16).toUpperCase(), ' is not a scalar value')
          )
        } else {
          if (240 != (248 & o)) throw Error('Invalid UTF-8 detected');
          if (
            (s = (15 & o) << 18 | wa(e, i++, a) << 12 | wa(e, i++, a) << 6 | wa(e, i++, a)) < 65536 ||
            s > 1114111
          ) throw Error('Invalid continuation byte')
        }
        s > 65535 &&
        (
          s -= 65536,
          n += String.fromCharCode(s >>> 10 & 1023 | 55296),
          s = 56320 | 1023 & s
        ),
        n += String.fromCharCode(s)
      }
      return n
    }(e.view, e.offset, t);
    return e.offset += t,
    r
  }
  function ga(e) {
    return 0 == (4294967168 & e) ? 1 : 0 == (4294965248 & e) ? 2 : 0 == (4294901760 & e) ? 3 : 4
  }
  function pa(e) {
    for (var t = 0, r = 0; r < e.length; r++) {
      var n = e.charCodeAt(r);
      if (n >= 55296 && n <= 56319) {
        if (r + 1 < e.length) {
          var a = e.charCodeAt(r + 1);
          56320 == (64512 & a) &&
          (r++, t += ga(((1023 & n) << 10) + (1023 & a) + 65536))
        }
      } else t += ga(n)
    }
    return t
  }
  function ma(e, t, r) {
    var n = ga(r);
    switch (n) {
      case 1:
        e.setUint8(t, r);
        break;
      case 2:
        e.setUint8(t, r >> 6 & 31 | 192),
        e.setUint8(t + 1, 63 & r | 128);
        break;
      case 3:
        e.setUint8(t, r >> 12 & 15 | 224),
        e.setUint8(t + 1, r >> 6 & 63 | 128),
        e.setUint8(t + 2, 63 & r | 128);
        break;
      default:
        e.setUint8(t, r >> 18 & 7 | 240),
        e.setUint8(t + 1, r >> 12 & 63 | 128),
        e.setUint8(t + 2, r >> 6 & 63 | 128),
        e.setUint8(t + 3, 63 & r | 128)
    }
    return n
  }
  function xa(e, t, r) {
    for (var n = 0; n < r.length; n++) {
      var a = r.charCodeAt(n);
      if (a >= 55296 && a <= 56319) {
        if (n + 1 < r.length) {
          var i = r.charCodeAt(n + 1);
          if (56320 == (64512 & i)) n++,
          t += ma(e, t, ((1023 & a) << 10) + (1023 & i) + 65536)
        }
      } else t += ma(e, t, a)
    }
    return t
  }
  function wa(e, t, r) {
    if (t >= r) throw Error('Invalid byte index');
    var n = e.getUint8(t);
    if (128 == (192 & n)) return 63 & n;
    throw Error('Invalid continuation byte')
  }
  Yn(),
  la(zn, (function () {
    ta('timer', (Fn = !Fn) ? 'y' : 'n'),
    Yn()
  })),
  setInterval(Bn, 1000)
}(window, document);
