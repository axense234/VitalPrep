(() => {
  var e = {
      470: function (e, t, i) {
        var n;
        (n = function () {
          var e = !0;
          function t(t) {
            function i(e) {
              var i = t.match(e);
              return (i && i.length > 1 && i[1]) || "";
            }
            var n,
              o,
              s,
              r = i(/(ipod|iphone|ipad)/i).toLowerCase(),
              a = !/like android/i.test(t) && /android/i.test(t),
              c = /nexus\s*[0-6]\s*/i.test(t),
              d = !c && /nexus\s*[0-9]+/i.test(t),
              l = /CrOS/.test(t),
              u = /silk/i.test(t),
              g = /sailfish/i.test(t),
              p = /tizen/i.test(t),
              f = /(web|hpw)os/i.test(t),
              h = /windows phone/i.test(t),
              v = (/SamsungBrowser/i.test(t), !h && /windows/i.test(t)),
              m = !r && !u && /macintosh/i.test(t),
              b = !a && !g && !p && !f && /linux/i.test(t),
              S = i(/edge\/(\d+(\.\d+)?)/i),
              y = i(/version\/(\d+(\.\d+)?)/i),
              w = /tablet/i.test(t) && !/tablet pc/i.test(t),
              O = !w && /[^-]mobi/i.test(t),
              I = /xbox/i.test(t);
            /opera/i.test(t)
              ? (n = {
                  name: "Opera",
                  opera: e,
                  version: y || i(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i),
                })
              : /opr\/|opios/i.test(t)
                ? (n = {
                    name: "Opera",
                    opera: e,
                    version: i(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || y,
                  })
                : /SamsungBrowser/i.test(t)
                  ? (n = {
                      name: "Samsung Internet for Android",
                      samsungBrowser: e,
                      version: y || i(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i),
                    })
                  : /coast/i.test(t)
                    ? (n = {
                        name: "Opera Coast",
                        coast: e,
                        version: y || i(/(?:coast)[\s\/](\d+(\.\d+)?)/i),
                      })
                    : /yabrowser/i.test(t)
                      ? (n = {
                          name: "Yandex Browser",
                          yandexbrowser: e,
                          version: y || i(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i),
                        })
                      : /ucbrowser/i.test(t)
                        ? (n = {
                            name: "UC Browser",
                            ucbrowser: e,
                            version: i(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i),
                          })
                        : /mxios/i.test(t)
                          ? (n = {
                              name: "Maxthon",
                              maxthon: e,
                              version: i(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i),
                            })
                          : /epiphany/i.test(t)
                            ? (n = {
                                name: "Epiphany",
                                epiphany: e,
                                version: i(
                                  /(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i
                                ),
                              })
                            : /puffin/i.test(t)
                              ? (n = {
                                  name: "Puffin",
                                  puffin: e,
                                  version: i(
                                    /(?:puffin)[\s\/](\d+(?:\.\d+)?)/i
                                  ),
                                })
                              : /sleipnir/i.test(t)
                                ? (n = {
                                    name: "Sleipnir",
                                    sleipnir: e,
                                    version: i(
                                      /(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i
                                    ),
                                  })
                                : /k-meleon/i.test(t)
                                  ? (n = {
                                      name: "K-Meleon",
                                      kMeleon: e,
                                      version: i(
                                        /(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i
                                      ),
                                    })
                                  : h
                                    ? ((n = {
                                        name: "Windows Phone",
                                        windowsphone: e,
                                      }),
                                      S
                                        ? ((n.msedge = e), (n.version = S))
                                        : ((n.msie = e),
                                          (n.version = i(
                                            /iemobile\/(\d+(\.\d+)?)/i
                                          ))))
                                    : /msie|trident/i.test(t)
                                      ? (n = {
                                          name: "Internet Explorer",
                                          msie: e,
                                          version: i(
                                            /(?:msie |rv:)(\d+(\.\d+)?)/i
                                          ),
                                        })
                                      : l
                                        ? (n = {
                                            name: "Chrome",
                                            chromeos: e,
                                            chromeBook: e,
                                            chrome: e,
                                            version: i(
                                              /(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i
                                            ),
                                          })
                                        : /chrome.+? edge/i.test(t)
                                          ? (n = {
                                              name: "Microsoft Edge",
                                              msedge: e,
                                              version: S,
                                            })
                                          : /vivaldi/i.test(t)
                                            ? (n = {
                                                name: "Vivaldi",
                                                vivaldi: e,
                                                version:
                                                  i(
                                                    /vivaldi\/(\d+(\.\d+)?)/i
                                                  ) || y,
                                              })
                                            : g
                                              ? (n = {
                                                  name: "Sailfish",
                                                  sailfish: e,
                                                  version: i(
                                                    /sailfish\s?browser\/(\d+(\.\d+)?)/i
                                                  ),
                                                })
                                              : /seamonkey\//i.test(t)
                                                ? (n = {
                                                    name: "SeaMonkey",
                                                    seamonkey: e,
                                                    version: i(
                                                      /seamonkey\/(\d+(\.\d+)?)/i
                                                    ),
                                                  })
                                                : /firefox|iceweasel|fxios/i.test(
                                                      t
                                                    )
                                                  ? ((n = {
                                                      name: "Firefox",
                                                      firefox: e,
                                                      version: i(
                                                        /(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i
                                                      ),
                                                    }),
                                                    /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(
                                                      t
                                                    ) && (n.firefoxos = e))
                                                  : u
                                                    ? (n = {
                                                        name: "Amazon Silk",
                                                        silk: e,
                                                        version:
                                                          i(
                                                            /silk\/(\d+(\.\d+)?)/i
                                                          ),
                                                      })
                                                    : /phantom/i.test(t)
                                                      ? (n = {
                                                          name: "PhantomJS",
                                                          phantom: e,
                                                          version: i(
                                                            /phantomjs\/(\d+(\.\d+)?)/i
                                                          ),
                                                        })
                                                      : /slimerjs/i.test(t)
                                                        ? (n = {
                                                            name: "SlimerJS",
                                                            slimer: e,
                                                            version: i(
                                                              /slimerjs\/(\d+(\.\d+)?)/i
                                                            ),
                                                          })
                                                        : /blackberry|\bbb\d+/i.test(
                                                              t
                                                            ) ||
                                                            /rim\stablet/i.test(
                                                              t
                                                            )
                                                          ? (n = {
                                                              name: "BlackBerry",
                                                              blackberry: e,
                                                              version:
                                                                y ||
                                                                i(
                                                                  /blackberry[\d]+\/(\d+(\.\d+)?)/i
                                                                ),
                                                            })
                                                          : f
                                                            ? ((n = {
                                                                name: "WebOS",
                                                                webos: e,
                                                                version:
                                                                  y ||
                                                                  i(
                                                                    /w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i
                                                                  ),
                                                              }),
                                                              /touchpad\//i.test(
                                                                t
                                                              ) &&
                                                                (n.touchpad =
                                                                  e))
                                                            : /bada/i.test(t)
                                                              ? (n = {
                                                                  name: "Bada",
                                                                  bada: e,
                                                                  version: i(
                                                                    /dolfin\/(\d+(\.\d+)?)/i
                                                                  ),
                                                                })
                                                              : p
                                                                ? (n = {
                                                                    name: "Tizen",
                                                                    tizen: e,
                                                                    version:
                                                                      i(
                                                                        /(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i
                                                                      ) || y,
                                                                  })
                                                                : /qupzilla/i.test(
                                                                      t
                                                                    )
                                                                  ? (n = {
                                                                      name: "QupZilla",
                                                                      qupzilla:
                                                                        e,
                                                                      version:
                                                                        i(
                                                                          /(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i
                                                                        ) || y,
                                                                    })
                                                                  : /chromium/i.test(
                                                                        t
                                                                      )
                                                                    ? (n = {
                                                                        name: "Chromium",
                                                                        chromium:
                                                                          e,
                                                                        version:
                                                                          i(
                                                                            /(?:chromium)[\s\/](\d+(?:\.\d+)?)/i
                                                                          ) ||
                                                                          y,
                                                                      })
                                                                    : /chrome|crios|crmo/i.test(
                                                                          t
                                                                        )
                                                                      ? (n = {
                                                                          name: "Chrome",
                                                                          chrome:
                                                                            e,
                                                                          version:
                                                                            i(
                                                                              /(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i
                                                                            ),
                                                                        })
                                                                      : a
                                                                        ? (n = {
                                                                            name: "Android",
                                                                            version:
                                                                              y,
                                                                          })
                                                                        : /safari|applewebkit/i.test(
                                                                              t
                                                                            )
                                                                          ? ((n =
                                                                              {
                                                                                name: "Safari",
                                                                                safari:
                                                                                  e,
                                                                              }),
                                                                            y &&
                                                                              (n.version =
                                                                                y))
                                                                          : r
                                                                            ? ((n =
                                                                                {
                                                                                  name:
                                                                                    "iphone" ==
                                                                                    r
                                                                                      ? "iPhone"
                                                                                      : "ipad" ==
                                                                                          r
                                                                                        ? "iPad"
                                                                                        : "iPod",
                                                                                }),
                                                                              y &&
                                                                                (n.version =
                                                                                  y))
                                                                            : (n =
                                                                                /googlebot/i.test(
                                                                                  t
                                                                                )
                                                                                  ? {
                                                                                      name: "Googlebot",
                                                                                      googlebot:
                                                                                        e,
                                                                                      version:
                                                                                        i(
                                                                                          /googlebot\/(\d+(\.\d+))/i
                                                                                        ) ||
                                                                                        y,
                                                                                    }
                                                                                  : {
                                                                                      name: i(
                                                                                        /^(.*)\/(.*) /
                                                                                      ),
                                                                                      version:
                                                                                        ((o =
                                                                                          /^(.*)\/(.*) /),
                                                                                        (s =
                                                                                          t.match(
                                                                                            o
                                                                                          )),
                                                                                        (s &&
                                                                                          s.length >
                                                                                            1 &&
                                                                                          s[2]) ||
                                                                                          ""),
                                                                                    }),
              !n.msedge && /(apple)?webkit/i.test(t)
                ? (/(apple)?webkit\/537\.36/i.test(t)
                    ? ((n.name = n.name || "Blink"), (n.blink = e))
                    : ((n.name = n.name || "Webkit"), (n.webkit = e)),
                  !n.version && y && (n.version = y))
                : !n.opera &&
                  /gecko\//i.test(t) &&
                  ((n.name = n.name || "Gecko"),
                  (n.gecko = e),
                  (n.version = n.version || i(/gecko\/(\d+(\.\d+)?)/i))),
              n.windowsphone || n.msedge || (!a && !n.silk)
                ? n.windowsphone || n.msedge || !r
                  ? m
                    ? (n.mac = e)
                    : I
                      ? (n.xbox = e)
                      : v
                        ? (n.windows = e)
                        : b && (n.linux = e)
                  : ((n[r] = e), (n.ios = e))
                : (n.android = e);
            var k = "";
            n.windows
              ? (k = (function (e) {
                  switch (e) {
                    case "NT":
                      return "NT";
                    case "XP":
                    case "NT 5.1":
                      return "XP";
                    case "NT 5.0":
                      return "2000";
                    case "NT 5.2":
                      return "2003";
                    case "NT 6.0":
                      return "Vista";
                    case "NT 6.1":
                      return "7";
                    case "NT 6.2":
                      return "8";
                    case "NT 6.3":
                      return "8.1";
                    case "NT 10.0":
                      return "10";
                    default:
                      return;
                  }
                })(i(/Windows ((NT|XP)( \d\d?.\d)?)/i)))
              : n.windowsphone
                ? (k = i(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i))
                : n.mac
                  ? (k = (k = i(/Mac OS X (\d+([_\.\s]\d+)*)/i)).replace(
                      /[_\s]/g,
                      "."
                    ))
                  : r
                    ? (k = (k = i(
                        /os (\d+([_\s]\d+)*) like mac os x/i
                      )).replace(/[_\s]/g, "."))
                    : a
                      ? (k = i(/android[ \/-](\d+(\.\d+)*)/i))
                      : n.webos
                        ? (k = i(/(?:web|hpw)os\/(\d+(\.\d+)*)/i))
                        : n.blackberry
                          ? (k = i(/rim\stablet\sos\s(\d+(\.\d+)*)/i))
                          : n.bada
                            ? (k = i(/bada\/(\d+(\.\d+)*)/i))
                            : n.tizen && (k = i(/tizen[\/\s](\d+(\.\d+)*)/i)),
              k && (n.osversion = k);
            var P = !n.windows && k.split(".")[0];
            return (
              w ||
              d ||
              "ipad" == r ||
              (a && (3 == P || (P >= 4 && !O))) ||
              n.silk
                ? (n.tablet = e)
                : (O ||
                    "iphone" == r ||
                    "ipod" == r ||
                    a ||
                    c ||
                    n.blackberry ||
                    n.webos ||
                    n.bada) &&
                  (n.mobile = e),
              n.msedge ||
              (n.msie && n.version >= 10) ||
              (n.yandexbrowser && n.version >= 15) ||
              (n.vivaldi && n.version >= 1) ||
              (n.chrome && n.version >= 20) ||
              (n.samsungBrowser && n.version >= 4) ||
              (n.firefox && n.version >= 20) ||
              (n.safari && n.version >= 6) ||
              (n.opera && n.version >= 10) ||
              (n.ios && n.osversion && n.osversion.split(".")[0] >= 6) ||
              (n.blackberry && n.version >= 10.1) ||
              (n.chromium && n.version >= 20)
                ? (n.a = e)
                : (n.msie && n.version < 10) ||
                    (n.chrome && n.version < 20) ||
                    (n.firefox && n.version < 20) ||
                    (n.safari && n.version < 6) ||
                    (n.opera && n.version < 10) ||
                    (n.ios && n.osversion && n.osversion.split(".")[0] < 6) ||
                    (n.chromium && n.version < 20)
                  ? (n.c = e)
                  : (n.x = e),
              n
            );
          }
          var i = t(
            ("undefined" != typeof navigator && navigator.userAgent) || ""
          );
          function n(e) {
            return e.split(".").length;
          }
          function o(e, t) {
            var i,
              n = [];
            if (Array.prototype.map) return Array.prototype.map.call(e, t);
            for (i = 0; i < e.length; i++) n.push(t(e[i]));
            return n;
          }
          function s(e) {
            for (
              var t = Math.max(n(e[0]), n(e[1])),
                i = o(e, function (e) {
                  var i = t - n(e);
                  return o(
                    (e += new Array(i + 1).join(".0")).split("."),
                    function (e) {
                      return new Array(20 - e.length).join("0") + e;
                    }
                  ).reverse();
                });
              --t >= 0;

            ) {
              if (i[0][t] > i[1][t]) return 1;
              if (i[0][t] !== i[1][t]) return -1;
              if (0 === t) return 0;
            }
          }
          function r(e, n, o) {
            var r = i;
            "string" == typeof n && ((o = n), (n = void 0)),
              void 0 === n && (n = !1),
              o && (r = t(o));
            var a = "" + r.version;
            for (var c in e)
              if (e.hasOwnProperty(c) && r[c]) {
                if ("string" != typeof e[c])
                  throw new Error(
                    "Browser version in the minVersion map should be a string: " +
                      c +
                      ": " +
                      String(e)
                  );
                return s([a, e[c]]) < 0;
              }
            return n;
          }
          return (
            (i.test = function (e) {
              for (var t = 0; t < e.length; ++t) {
                var n = e[t];
                if ("string" == typeof n && n in i) return !0;
              }
              return !1;
            }),
            (i.isUnsupportedBrowser = r),
            (i.compareVersions = s),
            (i.check = function (e, t, i) {
              return !r(e, t, i);
            }),
            (i._detect = t),
            i
          );
        }),
          e.exports ? (e.exports = n()) : i.amdD("bowser", n);
      },
    },
    t = {};
  function i(n) {
    var o = t[n];
    if (void 0 !== o) return o.exports;
    var s = (t[n] = { exports: {} });
    return e[n].call(s.exports, s, s.exports, i), s.exports;
  }
  (i.amdD = function () {
    throw new Error("define cannot be used indirect");
  }),
    (i.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return i.d(t, { a: t }), t;
    }),
    (i.d = (e, t) => {
      for (var n in t)
        i.o(t, n) &&
          !i.o(e, n) &&
          Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (i.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (e) {
        if ("object" == typeof window) return window;
      }
    })()),
    (i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      "use strict";
      function e(e, t, i, n) {
        return new (i || (i = Promise))(function (o, s) {
          function r(e) {
            try {
              c(n.next(e));
            } catch (e) {
              s(e);
            }
          }
          function a(e) {
            try {
              c(n.throw(e));
            } catch (e) {
              s(e);
            }
          }
          function c(e) {
            var t;
            e.done
              ? o(e.value)
              : ((t = e.value),
                t instanceof i
                  ? t
                  : new i(function (e) {
                      e(t);
                    })).then(r, a);
          }
          c((n = n.apply(e, t || [])).next());
        });
      }
      Object.create;
      var t, n, o;
      Object.create;
      !(function (e) {
        (e.Development = "Development"),
          (e.Staging = "Staging"),
          (e.Production = "Production");
      })(t || (t = {})),
        (function (e) {
          (e.ServiceWorker = "ServiceWorker"), (e.Host = "Host");
        })(n || (n = {}));
      class s extends Error {
        constructor(e = "") {
          super(e),
            Object.defineProperty(this, "message", {
              configurable: !0,
              enumerable: !1,
              value: e,
              writable: !0,
            }),
            Object.defineProperty(this, "name", {
              configurable: !0,
              enumerable: !1,
              value: this.constructor.name,
              writable: !0,
            }),
            Error.hasOwnProperty("captureStackTrace")
              ? Error.captureStackTrace(this, this.constructor)
              : (Object.defineProperty(this, "stack", {
                  configurable: !0,
                  enumerable: !1,
                  value: new Error(e).stack,
                  writable: !0,
                }),
                Object.setPrototypeOf(this, s.prototype));
        }
      }
      !(function (e) {
        (e[(e.Empty = 0)] = "Empty"),
          (e[(e.Malformed = 1)] = "Malformed"),
          (e[(e.EnumOutOfRange = 2)] = "EnumOutOfRange"),
          (e[(e.WrongType = 3)] = "WrongType");
      })(o || (o = {}));
      class InvalidArgumentError extends s {
        constructor(e, t, i) {
          let n;
          switch (t) {
            case o.Empty:
              n = `Supply a non-empty value to '${e}'. ${i}`;
              break;
            case o.Malformed:
              n = `The value for '${e}' was malformed. ${i}`;
              break;
            case o.EnumOutOfRange:
              n = `The value for '${e}' was out of range of the expected input enum. ${i}`;
              break;
            case o.WrongType:
              n = `The value for '${e}' was of the wrong type. ${i}`;
          }
          super(n),
            (this.argument = e),
            (this.reason = o[t]),
            Object.setPrototypeOf(this, InvalidArgumentError.prototype);
        }
      }
      const r = ["outcomes", "on_focus"];
      class a {
        static getBuildEnv() {
          return t.Production;
        }
        static getApiEnv() {
          return t.Production;
        }
        static getOrigin() {
          return p.isBrowser()
            ? window.location.origin
            : "undefined" != typeof self &&
                "undefined" != typeof ServiceWorkerGlobalScope
              ? self.location.origin
              : "Unknown";
        }
        static getWindowEnv() {
          if ("undefined" == typeof window) {
            if (
              "undefined" != typeof self &&
              "undefined" != typeof ServiceWorkerGlobalScope
            )
              return n.ServiceWorker;
            throw Error("OneSignalSDK: Unsupported JS runtime!");
          }
          return n.Host;
        }
        static getBuildEnvPrefix(e = a.getBuildEnv()) {
          switch (e) {
            case t.Development:
              return "Dev-";
            case t.Staging:
              return "Staging-";
            case t.Production:
              return "";
            default:
              throw new InvalidArgumentError("buildEnv", o.EnumOutOfRange);
          }
        }
        static getOneSignalApiUrl(e = a.getApiEnv(), i) {
          const n = "localhost";
          switch (e) {
            case t.Development:
              return a.isTurbineEndpoint(i)
                ? new URL(`https://${n}:18080/api/v1`)
                : new URL(`https://${n}:3001/api/v1`);
            case t.Staging:
              return new URL(`https://${n}/api/v1`);
            case t.Production:
              return new URL("https://onesignal.com/api/v1");
            default:
              throw new InvalidArgumentError("buildEnv", o.EnumOutOfRange);
          }
        }
        static getOneSignalStaticResourcesUrl() {
          return new URL("https://media.onesignal.com/web-sdk");
        }
        static getOneSignalResourceUrlPath(e = a.getBuildEnv()) {
          const i = "localhost";
          let n;
          switch (e) {
            case t.Development:
              n = `http://${i}:4000`;
              break;
            case t.Staging:
              n = `https://${i}`;
              break;
            case t.Production:
              n = "https://onesignal.com";
              break;
            default:
              throw new InvalidArgumentError("buildEnv", o.EnumOutOfRange);
          }
          return new URL(`${n}/sdks/web/v16`);
        }
        static getOneSignalCssFileName(e = a.getBuildEnv()) {
          const i = "OneSignalSDK.page.styles.css";
          switch (e) {
            case t.Development:
              return `Dev-${i}`;
            case t.Staging:
              return `Staging-${i}`;
            case t.Production:
              return i;
            default:
              throw new InvalidArgumentError("buildEnv", o.EnumOutOfRange);
          }
        }
        static isTurbineEndpoint(e) {
          return !!e && r.some((t) => e.indexOf(t) > -1);
        }
      }
      var c,
        d = i(470),
        l = i.n(d);
      function u() {
        return {
          mobile: d.mobile,
          tablet: d.tablet,
          name: d.name.toLowerCase(),
          version: d.version,
        };
      }
      function g() {
        return (
          "undefined" != typeof PushSubscriptionOptions &&
          PushSubscriptionOptions.prototype.hasOwnProperty(
            "applicationServerKey"
          )
        );
      }
      class p {
        static isBrowser() {
          return "undefined" != typeof window;
        }
        static useSafariLegacyPush() {
          var e;
          return (
            this.isBrowser() &&
            null !=
              (null === (e = window.safari) || void 0 === e
                ? void 0
                : e.pushNotification)
          );
        }
        static useSafariVapidPush() {
          return "safari" == u().name && g() && !this.useSafariLegacyPush();
        }
        static version() {
          return Number(160200);
        }
        static get TRADITIONAL_CHINESE_LANGUAGE_TAG() {
          return ["tw", "hant"];
        }
        static get SIMPLIFIED_CHINESE_LANGUAGE_TAG() {
          return ["cn", "hans"];
        }
        static getLanguage() {
          let e = navigator.language;
          if (e) {
            e = e.toLowerCase();
            const t = e.split("-");
            if ("zh" == t[0]) {
              for (const e of p.TRADITIONAL_CHINESE_LANGUAGE_TAG)
                if (-1 !== t.indexOf(e)) return "zh-Hant";
              for (const e of p.SIMPLIFIED_CHINESE_LANGUAGE_TAG)
                if (-1 !== t.indexOf(e)) return "zh-Hans";
              return "zh-Hant";
            }
            return t[0].substring(0, 2);
          }
          return "en";
        }
        static supportsServiceWorkers() {
          return (
            a.getWindowEnv() === n.ServiceWorker ||
            ("undefined" != typeof navigator && "serviceWorker" in navigator)
          );
        }
        static getSdkStylesVersionHash() {
          return "undefined" == typeof __SRC_STYLESHEETS_MD5_HASH__
            ? "2"
            : __SRC_STYLESHEETS_MD5_HASH__;
        }
      }
      class f {
        static shouldLog() {
          try {
            if ("undefined" == typeof window || void 0 === window.localStorage)
              return !1;
            const e = window.localStorage.getItem("loglevel");
            return !(!e || "trace" !== e.toLowerCase());
          } catch (e) {
            return !1;
          }
        }
        static setLevel(e) {
          if ("undefined" != typeof window && void 0 !== window.localStorage)
            try {
              window.localStorage.setItem("loglevel", e),
                (f.proxyMethodsCreated = void 0),
                f.createProxyMethods();
            } catch (e) {
              return;
            }
        }
        static createProxyMethods() {
          if (void 0 !== f.proxyMethodsCreated) return;
          f.proxyMethodsCreated = !0;
          const e = {
            log: "debug",
            trace: "trace",
            info: "info",
            warn: "warn",
            error: "error",
          };
          for (const t of Object.keys(e)) {
            const i = void 0 !== console[t],
              n = e[t],
              o = i && (f.shouldLog() || "error" === n);
            f[n] = o ? console[t].bind(console) : function () {};
          }
        }
      }
      f.createProxyMethods();
      class h {
        static getRegistration(t) {
          return e(this, void 0, void 0, function* () {
            try {
              const e = location.origin + t;
              return yield navigator.serviceWorker.getRegistration(e);
            } catch (e) {
              return (
                f.warn(
                  "[Service Worker Status] Error Checking service worker registration",
                  t,
                  e
                ),
                null
              );
            }
          });
        }
        static getAvailableServiceWorker(e) {
          const t = e.active || e.installing || e.waiting;
          return (
            t || f.warn("Could not find an available ServiceWorker instance!"),
            t
          );
        }
        static waitUntilActive(e) {
          return new Promise((t) => {
            const i = e.installing || e.waiting;
            i &&
              i.addEventListener("statechange", () => {
                f.debug("OneSignal Service Worker state changed:", i.state),
                  e.active && t();
              }),
              e.active && t();
          });
        }
      }
      !(function (e) {
        (e.WorkerVersion = "GetWorkerVersion"),
          (e.Subscribe = "Subscribe"),
          (e.SubscribeNew = "SubscribeNew"),
          (e.AmpSubscriptionState = "amp-web-push-subscription-state"),
          (e.AmpSubscribe = "amp-web-push-subscribe"),
          (e.AmpUnsubscribe = "amp-web-push-unsubscribe"),
          (e.NotificationWillDisplay = "notification.willDisplay"),
          (e.NotificationClicked = "notification.clicked"),
          (e.NotificationDismissed = "notification.dismissed"),
          (e.RedirectPage = "command.redirect"),
          (e.SessionUpsert = "os.session.upsert"),
          (e.SessionDeactivate = "os.session.deactivate"),
          (e.AreYouVisible = "os.page_focused_request"),
          (e.AreYouVisibleResponse = "os.page_focused_response"),
          (e.SetLogging = "os.set_sw_logging");
      })(c || (c = {}));
      class v {
        constructor() {
          this.replies = {};
        }
        addListener(e, t, i) {
          const n = { callback: t, onceListenerOnly: i },
            o = this.replies[e.toString()];
          o ? o.push(n) : (this.replies[e.toString()] = [n]);
        }
        findListenersForMessage(e) {
          return this.replies[e.toString()] || [];
        }
        deleteListenerRecords(e) {
          this.replies[e.toString()] = null;
        }
        deleteAllListenerRecords() {
          this.replies = {};
        }
        deleteListenerRecord(e, t) {
          const i = this.replies[e.toString()];
          if (null != i)
            for (let e = i.length - 1; e >= 0; e--) {
              i[e] === t && i.splice(e, 1);
            }
        }
      }
      class m {
        constructor(e, t = new v()) {
          (this.context = e), (this.replies = t);
        }
        broadcast(t, i) {
          return e(this, void 0, void 0, function* () {
            if (a.getWindowEnv() !== n.ServiceWorker) return;
            const e = yield self.clients.matchAll({
              type: "window",
              includeUncontrolled: !0,
            });
            for (const n of e)
              f.debug(
                `[Worker Messenger] [SW -> Page] Broadcasting '${t.toString()}' to window client ${n.url}.`
              ),
                n.postMessage({ command: t, payload: i });
          });
        }
        unicast(t, i, s) {
          return e(this, void 0, void 0, function* () {
            if (a.getWindowEnv() === n.ServiceWorker) {
              if (!s) throw new InvalidArgumentError("windowClient", o.Empty);
              f.debug(
                `[Worker Messenger] [SW -> Page] Unicasting '${t.toString()}' to window client ${s.url}.`
              ),
                s.postMessage({ command: t, payload: i });
            } else
              f.debug(
                `[Worker Messenger] [Page -> SW] Unicasting '${t.toString()}' to service worker.`
              ),
                this.directPostMessageToSW(t, i);
          });
        }
        directPostMessageToSW(t, i) {
          return e(this, void 0, void 0, function* () {
            var e;
            f.debug(
              `[Worker Messenger] [Page -> SW] Direct command '${t.toString()}' to service worker.`
            );
            const n = yield null === (e = this.context) || void 0 === e
              ? void 0
              : e.serviceWorkerManager.getRegistration();
            if (!n)
              return void f.error(
                "`[Worker Messenger] [Page -> SW] Could not get ServiceWorkerRegistration to postMessage!"
              );
            const o = h.getAvailableServiceWorker(n);
            o
              ? o.postMessage({ command: t, payload: i })
              : f.error(
                  "`[Worker Messenger] [Page -> SW] Could not get ServiceWorker to postMessage!"
                );
          });
        }
        listen() {
          return e(this, void 0, void 0, function* () {
            if (!p.supportsServiceWorkers()) return;
            a.getWindowEnv() === n.ServiceWorker
              ? (self.addEventListener(
                  "message",
                  this.onWorkerMessageReceivedFromPage.bind(this)
                ),
                f.debug(
                  "[Worker Messenger] Service worker is now listening for messages."
                ))
              : yield this.listenForPage();
          });
        }
        listenForPage() {
          return e(this, void 0, void 0, function* () {
            navigator.serviceWorker.addEventListener(
              "message",
              this.onPageMessageReceivedFromServiceWorker.bind(this)
            ),
              f.debug(
                `(${location.origin}) [Worker Messenger] Page is now listening for messages.`
              );
          });
        }
        onWorkerMessageReceivedFromPage(e) {
          const t = e.data;
          if (!t || !t.command) return;
          const i = this.replies.findListenersForMessage(t.command),
            n = [],
            o = [];
          f.debug(
            "[Worker Messenger] Service worker received message:",
            e.data
          );
          for (const e of i) e.onceListenerOnly && n.push(e), o.push(e);
          for (let e = n.length - 1; e >= 0; e--) {
            const i = n[e];
            this.replies.deleteListenerRecord(t.command, i);
          }
          for (const e of o) e.callback.apply(null, [t.payload]);
        }
        onPageMessageReceivedFromServiceWorker(e) {
          const t = e.data;
          if (!t || !t.command) return;
          const i = this.replies.findListenersForMessage(t.command),
            n = [],
            o = [];
          f.debug("[Worker Messenger] Page received message:", e.data);
          for (const e of i) e.onceListenerOnly && n.push(e), o.push(e);
          for (let e = n.length - 1; e >= 0; e--) {
            const i = n[e];
            this.replies.deleteListenerRecord(t.command, i);
          }
          for (const e of o) e.callback.apply(null, [t.payload]);
        }
        on(e, t) {
          this.replies.addListener(e, t, !1);
        }
        once(e, t) {
          this.replies.addListener(e, t, !0);
        }
        off(e) {
          e
            ? this.replies.deleteListenerRecords(e)
            : this.replies.deleteAllListenerRecords();
        }
      }
      const b = "os_pageViews",
        S = "requiresPrivacyConsent";
      class y {
        static removeLegacySubscriptionOptions() {
          localStorage.removeItem("isOptedOut"),
            localStorage.removeItem("isPushNotificationsEnabled");
        }
        static setConsentRequired(e) {
          localStorage.setItem(S, e.toString());
        }
        static getConsentRequired() {
          return "true" === localStorage.getItem(S);
        }
        static setLocalPageViewCount(e) {
          localStorage.setItem(b, e.toString());
        }
        static getLocalPageViewCount() {
          return Number(localStorage.getItem(b));
        }
      }
      class w {
        constructor() {
          this.incrementedPageViewCount = !1;
        }
        getPageViewCount() {
          try {
            const e = sessionStorage.getItem(w.SESSION_STORAGE_KEY_NAME),
              t = e ? parseInt(e) : 0;
            return isNaN(t) ? 0 : t;
          } catch (e) {
            return 0;
          }
        }
        setPageViewCount(e) {
          try {
            sessionStorage.setItem(w.SESSION_STORAGE_KEY_NAME, e.toString());
          } catch (e) {}
        }
        incrementPageViewCount() {
          if (this.incrementedPageViewCount) return;
          const e = this.getPageViewCount() + 1,
            t = this.getLocalPageViewCount() + 1;
          this.setPageViewCount(e),
            this.setLocalPageViewCount(t),
            (this.incrementedPageViewCount = !0),
            f.debug(
              `Incremented page view count: newCountSingleTab: ${e},\n      newCountAccrossTabs: ${t}.`
            );
        }
        simulatePageNavigationOrRefresh() {
          this.incrementedPageViewCount = !1;
        }
        isFirstPageView() {
          return 1 === this.getPageViewCount();
        }
        getLocalPageViewCount() {
          return y.getLocalPageViewCount();
        }
        setLocalPageViewCount(e) {
          y.setLocalPageViewCount(e);
        }
      }
      w.SESSION_STORAGE_KEY_NAME = "onesignal-pageview-count";
      class O {
        static get STORED_PERMISSION_KEY() {
          return "storedNotificationPermission";
        }
        getPermissionStatus() {
          return e(this, void 0, void 0, function* () {
            if (!OneSignal.context)
              throw new s(
                "OneSignal.context is undefined. Make sure to call OneSignal.init() before calling getPermissionStatus()."
              );
            return yield OneSignal.context.permissionManager.getNotificationPermission(
              OneSignal.config.safariWebId
            );
          });
        }
        getNotificationPermission(t) {
          return e(this, void 0, void 0, function* () {
            return p.useSafariLegacyPush()
              ? O.getLegacySafariNotificationPermission(t)
              : this.getW3cNotificationPermission();
          });
        }
        static getLegacySafariNotificationPermission(e) {
          if (e) return window.safari.pushNotification.permission(e).permission;
          throw new InvalidArgumentError("safariWebId", o.Empty);
        }
        getW3cNotificationPermission() {
          return Notification.permission;
        }
      }
      class I {
        constructor(e) {
          if (!e) throw new InvalidArgumentError("path", o.Empty);
          this.path = e.trim();
        }
        getQueryString() {
          const e = this.path.indexOf("?");
          return -1 === e
            ? null
            : this.path.length > e
              ? this.path.substring(e + 1)
              : null;
        }
        getWithoutQueryString() {
          return this.path.split(I.QUERY_STRING)[0];
        }
        getFileName() {
          var e;
          return null ===
            (e = this.getWithoutQueryString().split("\\").pop()) || void 0 === e
            ? void 0
            : e.split("/").pop();
        }
        getFileNameWithQuery() {
          var e;
          return null === (e = this.path.split("\\").pop()) || void 0 === e
            ? void 0
            : e.split("/").pop();
        }
        getFullPath() {
          return this.path;
        }
        getPathWithoutFileName() {
          const e = this.getWithoutQueryString(),
            t = e.lastIndexOf(this.getFileName());
          let i = e.substring(0, t);
          return (i = i.replace(/[\\/]$/, "")), i;
        }
      }
      I.QUERY_STRING = "?";
      class k {
        constructor() {
          this._events = {};
        }
        on(e, t) {
          return (
            (this._events[e] = this._events[e] || []),
            this._events[e].push(t),
            this
          );
        }
        once(e, t) {
          const i = this;
          function n() {
            i.off(e, n), t.apply(this, arguments);
          }
          return (n.listener = t), this.on(e, n), this;
        }
        off(e, t) {
          const i = this._events[e];
          if (void 0 !== i) {
            for (let e = 0; e < i.length; e += 1)
              if (i[e] === t || i[e].listener === t) {
                i.splice(e, 1);
                break;
              }
            0 === i.length && this.removeAllListeners(e);
          }
          return this;
        }
        removeAllListeners(e) {
          return e ? delete this._events[e] : (this._events = {}), this;
        }
        listeners(e) {
          try {
            return this._events[e];
          } catch (e) {
            return;
          }
        }
        numberOfListeners(e) {
          const t = this.listeners(e);
          return t ? t.length : 0;
        }
        emit(...t) {
          return e(this, void 0, void 0, function* () {
            const e = t.shift();
            let i = this._events[e];
            if (void 0 !== i) {
              i = i.slice(0);
              const e = i.length;
              for (let n = 0; n < e; n += 1) yield i[n].apply(this, t);
            }
            return this;
          });
        }
      }
      var P;
      !(function (e) {
        (e.Identity = "identity"),
          (e.Properties = "properties"),
          (e.PushSubscriptions = "pushSubscriptions"),
          (e.EmailSubscriptions = "emailSubscriptions"),
          (e.SmsSubscriptions = "smsSubscriptions");
      })(P || (P = {}));
      class TimeoutError extends s {
        constructor(e = "The asynchronous operation has timed out.") {
          super(e),
            (this.message = e),
            Object.setPrototypeOf(this, TimeoutError.prototype);
        }
      }
      class x {
        static contains(e, t) {
          return !!e && -1 !== e.indexOf(t);
        }
        static trimUndefined(e) {
          for (const t in e) void 0 === e[t] && delete e[t];
          return e;
        }
        static capitalize(e) {
          return e.charAt(0).toUpperCase() + e.slice(1);
        }
        static isNullOrUndefined(e) {
          return null == e;
        }
        static valueOrDefault(e, t) {
          return null == e ? t : e;
        }
        static stringify(e) {
          return JSON.stringify(
            e,
            (e, t) => ("function" == typeof t ? "[Function]" : t),
            4
          );
        }
        static encodeHashAsUriComponent(e) {
          let t = "";
          const i = Object.keys(e);
          for (const n of i) {
            const i = e[n];
            t += `${encodeURIComponent(n)}=${encodeURIComponent(i)}`;
          }
          return t;
        }
        static timeoutPromise(e, t) {
          const i = new Promise((e, i) => {
            setTimeout(() => {
              i(new TimeoutError());
            }, t);
          });
          return Promise.race([e, i]);
        }
        static getValueOrDefault(e, t) {
          return null != e ? e : t;
        }
        static padStart(e, t, i) {
          let n = e;
          for (; n.length < t; ) n = i + n;
          return n;
        }
        static parseVersionString(e) {
          const t = e.toString().split("."),
            i = x.padStart(t[0], 2, "0");
          let n;
          return (
            (n = t[1] ? x.padStart(t[1], 2, "0") : "00"), Number(`${i}.${n}`)
          );
        }
        static lastParts(e, t, i) {
          const n = e.split(t),
            o = Math.max(n.length - i, 0);
          return n.slice(o).join(t);
        }
        static enforceAppId(e) {
          if (!e) throw new Error("App id cannot be empty");
        }
        static enforceAlias(e) {
          if (!e.label) throw new Error("Alias label cannot be empty");
          if (!e.id) throw new Error("Alias id cannot be empty");
        }
        static sortArrayOfObjects(e, t, i = !1, n = !0) {
          const o = n ? e : e.slice();
          return (
            o.sort((e, n) => {
              const o = t(e),
                s = t(n);
              return o > s ? (i ? -1 : 1) : o < s ? (i ? 1 : -1) : 0;
            }),
            o
          );
        }
      }
      const C = x;
      class N {
        constructor(e, t = 5) {
          (this.databaseName = e),
            (this.dbVersion = t),
            (this.emitter = new k());
        }
        open(e) {
          return new Promise((t) => {
            let i;
            try {
              i = indexedDB.open(e, this.dbVersion);
            } catch (e) {}
            if (!i) return null;
            (i.onerror = this.onDatabaseOpenError.bind(this)),
              (i.onblocked = this.onDatabaseOpenBlocked.bind(this)),
              (i.onupgradeneeded = this.onDatabaseUpgradeNeeded.bind(this)),
              (i.onsuccess = () => {
                (this.database = i.result),
                  (this.database.onerror = this.onDatabaseError),
                  (this.database.onversionchange =
                    this.onDatabaseVersionChange),
                  t(this.database);
              });
          });
        }
        close() {
          return e(this, void 0, void 0, function* () {
            var e;
            (yield this.ensureDatabaseOpen()).close(),
              null === (e = this.database) || void 0 === e || e.close();
          });
        }
        ensureDatabaseOpen() {
          return e(this, void 0, void 0, function* () {
            return (
              this.openLock || (this.openLock = this.open(this.databaseName)),
              yield this.openLock
            );
          });
        }
        onDatabaseOpenError(e) {
          e.preventDefault();
          const t = e.target.error;
          C.contains(
            t.message,
            "The operation failed for reasons unrelated to the database itself and not covered by any other error code"
          ) ||
          C.contains(
            t.message,
            "A mutation operation was attempted on a database that did not allow mutations"
          )
            ? f.warn(
                "OneSignal: IndexedDb web storage is not available on this origin since this profile's IndexedDb schema has been upgraded in a newer version of Firefox. See: https://bugzilla.mozilla.org/show_bug.cgi?id=1236557#c6"
              )
            : f.warn("OneSignal: Fatal error opening IndexedDb database:", t);
        }
        onDatabaseError(e) {
          f.debug("IndexedDb: Generic database error", e.target.errorCode);
        }
        onDatabaseOpenBlocked() {
          f.debug("IndexedDb: Blocked event");
        }
        onDatabaseVersionChange(e) {
          f.debug("IndexedDb: versionchange event");
        }
        onDatabaseUpgradeNeeded(e) {
          f.debug(
            "IndexedDb: Database is being rebuilt or upgraded (upgradeneeded event)."
          );
          const t = e.target,
            i = t.transaction;
          if (!i) throw Error("Can't migrate DB without a transaction");
          const n = t.result,
            o = e.newVersion || Number.MAX_SAFE_INTEGER;
          o >= 1 &&
            e.oldVersion < 1 &&
            (n.createObjectStore("Ids", { keyPath: "type" }),
            n.createObjectStore("NotificationOpened", { keyPath: "url" }),
            n.createObjectStore("Options", { keyPath: "key" })),
            o >= 2 &&
              e.oldVersion < 2 &&
              (n.createObjectStore("Sessions", { keyPath: "sessionKey" }),
              n.createObjectStore("NotificationReceived", {
                keyPath: "notificationId",
              }),
              n.createObjectStore("NotificationClicked", {
                keyPath: "notificationId",
              })),
            o >= 3 &&
              e.oldVersion < 3 &&
              n.createObjectStore("SentUniqueOutcome", {
                keyPath: "outcomeName",
              }),
            o >= 4 &&
              e.oldVersion < 4 &&
              (n.createObjectStore(P.Identity, { keyPath: "modelId" }),
              n.createObjectStore(P.Properties, { keyPath: "modelId" }),
              n.createObjectStore(P.PushSubscriptions, { keyPath: "modelId" }),
              n.createObjectStore(P.SmsSubscriptions, { keyPath: "modelId" }),
              n.createObjectStore(P.EmailSubscriptions, {
                keyPath: "modelId",
              })),
            o >= 5 &&
              e.oldVersion < 5 &&
              (this.migrateOutcomesNotificationClickedTableForV5(n, i),
              this.migrateOutcomesNotificationReceivedTableForV5(n, i)),
            o >= 6 && e.oldVersion,
            "undefined" != typeof OneSignal && (OneSignal._isNewVisitor = !0);
        }
        migrateOutcomesNotificationClickedTableForV5(e, t) {
          const i = "Outcomes.NotificationClicked";
          e.createObjectStore(i, { keyPath: "notificationId" });
          const n = "NotificationClicked",
            o = t.objectStore(n).openCursor();
          (o.onsuccess = () => {
            if (!o.result) return void e.deleteObjectStore(n);
            const s = o.result.value;
            t
              .objectStore(i)
              .put({
                notificationId: s.notificationId || s.notification.id,
                appId: s.appId,
                timestamp: s.timestamp,
              }),
              o.result.continue();
          }),
            (o.onerror = () => {
              console.error(
                "Could not migrate NotificationClicked records",
                o.error
              );
            });
        }
        migrateOutcomesNotificationReceivedTableForV5(e, t) {
          const i = "Outcomes.NotificationReceived";
          e.createObjectStore(i, { keyPath: "notificationId" });
          const n = "NotificationReceived",
            o = t.objectStore(n).openCursor();
          (o.onsuccess = () => {
            o.result
              ? (t.objectStore(i).put(o.result.value), o.result.continue())
              : e.deleteObjectStore(n);
          }),
            (o.onerror = () => {
              console.error(
                "Could not migrate NotificationReceived records",
                o.error
              );
            });
        }
        get(t, i) {
          return e(this, void 0, void 0, function* () {
            const e = yield this.ensureDatabaseOpen();
            return i
              ? yield new Promise((n, o) => {
                  const s = e.transaction(t).objectStore(t).get(i);
                  (s.onsuccess = () => {
                    n(s.result);
                  }),
                    (s.onerror = () => {
                      o(s.error);
                    });
                })
              : yield new Promise((i, n) => {
                  const o = {},
                    s = e.transaction(t).objectStore(t).openCursor();
                  (s.onsuccess = (e) => {
                    const t = e.target.result;
                    if (t) {
                      const e = t.key;
                      (o[e] = t.value), t.continue();
                    } else i(o);
                  }),
                    (s.onerror = () => {
                      n(s.error);
                    });
                });
          });
        }
        getAll(t) {
          return e(this, void 0, void 0, function* () {
            const e = yield this.ensureDatabaseOpen();
            return yield new Promise((i, n) => {
              const o = e.transaction(t).objectStore(t).openCursor(),
                s = [];
              (o.onsuccess = (e) => {
                const t = e.target.result;
                t ? (s.push(t.value), t.continue()) : i(s);
              }),
                (o.onerror = () => {
                  n(o.error);
                });
            });
          });
        }
        put(t, i) {
          return e(this, void 0, void 0, function* () {
            return (
              yield this.ensureDatabaseOpen(),
              yield new Promise((e, n) => {
                try {
                  const o = this.database
                    .transaction([t], "readwrite")
                    .objectStore(t)
                    .put(i);
                  (o.onsuccess = () => {
                    e(i);
                  }),
                    (o.onerror = (e) => {
                      f.error("Database PUT Transaction Error:", e), n(e);
                    });
                } catch (e) {
                  f.error("Database PUT Error:", e), n(e);
                }
              })
            );
          });
        }
        remove(t, i) {
          return e(this, void 0, void 0, function* () {
            const e = yield this.ensureDatabaseOpen();
            return new Promise((n, o) => {
              try {
                const s = e.transaction([t], "readwrite").objectStore(t),
                  r = i ? s.delete(i) : s.clear();
                (r.onsuccess = () => {
                  n(i);
                }),
                  (r.onerror = (e) => {
                    f.error("Database REMOVE Transaction Error:", e), o(e);
                  });
              } catch (e) {
                f.error("Database REMOVE Error:", e), o(e);
              }
            });
          });
        }
      }
      class T {
        constructor() {
          this.lastKnownOptedIn = !0;
        }
      }
      class E {}
      class A {
        serialize() {
          return {
            deviceId: this.deviceId,
            subscriptionToken: this.subscriptionToken,
            optedOut: this.optedOut,
            createdAt: this.createdAt,
            expirationTime: this.expirationTime,
          };
        }
        static deserialize(e) {
          const t = new A();
          return (
            (t.deviceId = e.deviceId),
            (t.subscriptionToken = e.subscriptionToken),
            (t.optedOut = e.optedOut),
            (t.createdAt = e.createdAt),
            (t.expirationTime = e.expirationTime),
            t
          );
        }
      }
      var D, U;
      !(function (e) {
        (e.Active = "active"), (e.Inactive = "inactive");
      })(D || (D = {})),
        (function (e) {
          (e[(e.UserCreate = 1)] = "UserCreate"),
            (e[(e.UserNewSession = 2)] = "UserNewSession"),
            (e[(e.VisibilityVisible = 3)] = "VisibilityVisible"),
            (e[(e.VisibilityHidden = 4)] = "VisibilityHidden"),
            (e[(e.BeforeUnload = 5)] = "BeforeUnload"),
            (e[(e.PageRefresh = 6)] = "PageRefresh"),
            (e[(e.Focus = 7)] = "Focus"),
            (e[(e.Blur = 8)] = "Blur");
        })(U || (U = {}));
      const M = "oneSignalSession";
      function W(e) {
        const t = new Date().getTime(),
          i = (e && e.notificationId) || null;
        return {
          sessionKey: M,
          appId: e.appId,
          startTimestamp: t,
          accumulatedDuration: 0,
          notificationId: i,
          status: D.Active,
          lastDeactivatedTimestamp: null,
          lastActivatedTimestamp: t,
        };
      }
      class _ {
        static toDatabase(e) {
          const t = e.notification,
            i = e.result;
          return {
            id: t.notificationId,
            heading: t.title,
            content: t.body,
            data: t.additionalData,
            url: i.url,
            rr: t.confirmDelivery,
            icon: t.icon,
            image: t.image,
            tag: t.topic,
            badge: t.badgeIcon,
            action: i.actionId,
            buttons: this.toDatabaseButtons(t.actionButtons),
            timestamp: e.timestamp,
          };
        }
        static toDatabaseButtons(e) {
          return null == e
            ? void 0
            : e.map((e) => ({
                action: e.actionId,
                title: e.text,
                icon: e.icon,
                url: e.launchURL,
              }));
        }
        static fromDatabase(e) {
          return {
            result: { actionId: e.action, url: e.url },
            notification: {
              notificationId: e.id,
              title: e.heading,
              body: e.content,
              additionalData: e.data,
              launchURL: e.url,
              confirmDelivery: e.rr,
              icon: e.icon,
              image: e.image,
              topic: e.tag,
              badgeIcon: e.badge,
              actionButtons: this.toOSNotificationButtons(e.buttons),
            },
            timestamp: e.timestamp,
          };
        }
        static toOSNotificationButtons(e) {
          return null == e
            ? void 0
            : e.map((e) => ({
                actionId: e.action,
                text: e.title,
                icon: e.icon,
                launchURL: e.url,
              }));
        }
      }
      class R {
        static toDatabase(e, t) {
          return {
            appId: e,
            notificationId: t.notification.notificationId,
            timestamp: t.timestamp,
          };
        }
        static fromDatabase(e) {
          return {
            appId: e.appId,
            notificationId: e.notificationId,
            timestamp: e.timestamp,
          };
        }
      }
      class V {
        static toDatabase(e, t, i) {
          return { appId: e, notificationId: t.notificationId, timestamp: i };
        }
        static fromDatabase(e) {
          return {
            appId: e.appId,
            notificationId: e.notificationId,
            timestamp: e.timestamp,
          };
        }
      }
      var L;
      !(function (e) {
        e[(e.SET = 0)] = "SET";
      })(L || (L = {}));
      const B = "Outcomes.NotificationClicked",
        F = "Outcomes.NotificationReceived";
      class $ {
        constructor(e) {
          (this.databaseName = e),
            (this.emitter = new k()),
            (this.database = new N(this.databaseName));
        }
        static resetInstance() {
          $.databaseInstance = null;
        }
        static get singletonInstance() {
          return (
            $.databaseInstanceName ||
              ($.databaseInstanceName = "ONE_SIGNAL_SDK_DB"),
            $.databaseInstance ||
              ($.databaseInstance = new $($.databaseInstanceName)),
            $.databaseInstance
          );
        }
        static applyDbResultFilter(e, t, i) {
          switch (e) {
            case "Options":
              return i && t ? i.value : i && !t ? i : null;
            case "Ids":
              return i && t ? i.id : i && !t ? i : null;
            default:
              return i || null;
          }
        }
        get(t, i) {
          return e(this, void 0, void 0, function* () {
            const e = yield this.database.get(t, i);
            return $.applyDbResultFilter(t, i, e);
          });
        }
        getAll(t) {
          return e(this, void 0, void 0, function* () {
            return yield this.database.getAll(t);
          });
        }
        put(t, i) {
          return e(this, void 0, void 0, function* () {
            yield new Promise((e, n) => {
              this.database.put(t, i).then(() => e());
            }),
              this.emitter.emit($.EVENTS.SET, i);
          });
        }
        remove(e, t) {
          return this.database.remove(e, t);
        }
        getAppConfig() {
          return e(this, void 0, void 0, function* () {
            const e = {},
              t = yield this.get("Ids", "appId");
            return (
              (e.appId = t),
              (e.vapidPublicKey = yield this.get("Options", "vapidPublicKey")),
              e
            );
          });
        }
        setAppConfig(t) {
          return e(this, void 0, void 0, function* () {
            t.appId && (yield this.put("Ids", { type: "appId", id: t.appId })),
              t.vapidPublicKey &&
                (yield this.put("Options", {
                  key: "vapidPublicKey",
                  value: t.vapidPublicKey,
                }));
          });
        }
        getAppState() {
          return e(this, void 0, void 0, function* () {
            const e = new T();
            return (
              (e.defaultNotificationUrl = yield this.get(
                "Options",
                "defaultUrl"
              )),
              (e.defaultNotificationTitle = yield this.get(
                "Options",
                "defaultTitle"
              )),
              (e.lastKnownPushEnabled = yield this.get(
                "Options",
                "isPushEnabled"
              )),
              (e.pendingNotificationClickEvents =
                yield this.getAllPendingNotificationClickEvents()),
              (e.lastKnownPushId = yield this.get("Options", "lastPushId")),
              (e.lastKnownPushToken = yield this.get(
                "Options",
                "lastPushToken"
              )),
              (e.lastKnownOptedIn = yield this.get("Options", "lastOptedIn")),
              e
            );
          });
        }
        setIsPushEnabled(t) {
          return e(this, void 0, void 0, function* () {
            yield this.put("Options", { key: "isPushEnabled", value: t });
          });
        }
        setAppState(t) {
          return e(this, void 0, void 0, function* () {
            if (
              (t.defaultNotificationUrl &&
                (yield this.put("Options", {
                  key: "defaultUrl",
                  value: t.defaultNotificationUrl,
                })),
              (t.defaultNotificationTitle ||
                "" === t.defaultNotificationTitle) &&
                (yield this.put("Options", {
                  key: "defaultTitle",
                  value: t.defaultNotificationTitle,
                })),
              null != t.lastKnownPushEnabled &&
                (yield this.setIsPushEnabled(t.lastKnownPushEnabled)),
              null != t.lastKnownPushId &&
                (yield this.put("Options", {
                  key: "lastPushId",
                  value: t.lastKnownPushId,
                })),
              null != t.lastKnownPushToken &&
                (yield this.put("Options", {
                  key: "lastPushToken",
                  value: t.lastKnownPushToken,
                })),
              null != t.lastKnownOptedIn &&
                (yield this.put("Options", {
                  key: "lastOptedIn",
                  value: t.lastKnownOptedIn,
                })),
              t.pendingNotificationClickEvents)
            ) {
              const e = Object.keys(t.pendingNotificationClickEvents);
              for (const i of e) {
                const e = t.pendingNotificationClickEvents[i];
                e
                  ? yield this.put("NotificationOpened", {
                      url: i,
                      data: e.data,
                      timestamp: e.timestamp,
                    })
                  : null === e && (yield this.remove("NotificationOpened", i));
              }
            }
          });
        }
        getUserState() {
          return e(this, void 0, void 0, function* () {
            const e = new E();
            return (
              (e.previousOneSignalId = ""),
              (e.previousExternalId = ""),
              (e.previousOneSignalId = yield this.get(
                "Options",
                "previousOneSignalId"
              )),
              (e.previousExternalId = yield this.get(
                "Options",
                "previousExternalId"
              )),
              e
            );
          });
        }
        setUserState(t) {
          return e(this, void 0, void 0, function* () {
            yield this.put("Options", {
              key: "previousOneSignalId",
              value: t.previousOneSignalId,
            }),
              yield this.put("Options", {
                key: "previousExternalId",
                value: t.previousExternalId,
              });
          });
        }
        getSubscription() {
          return e(this, void 0, void 0, function* () {
            const e = new A();
            (e.deviceId = yield this.get("Ids", "userId")),
              (e.subscriptionToken = yield this.get("Ids", "registrationId"));
            const t = yield this.get("Options", "optedOut"),
              i = yield this.get("Options", "subscription"),
              n = yield this.get("Options", "subscriptionCreatedAt"),
              o = yield this.get("Options", "subscriptionExpirationTime");
            return (
              (e.optedOut = null != t ? t : null != i && !i),
              (e.createdAt = n),
              (e.expirationTime = o),
              e
            );
          });
        }
        setDeviceId(t) {
          return e(this, void 0, void 0, function* () {
            yield this.put("Ids", { type: "userId", id: t });
          });
        }
        setSubscription(t) {
          return e(this, void 0, void 0, function* () {
            t.deviceId && (yield this.setDeviceId(t.deviceId)),
              void 0 !== t.subscriptionToken &&
                (yield this.put("Ids", {
                  type: "registrationId",
                  id: t.subscriptionToken,
                })),
              null != t.optedOut &&
                (yield this.put("Options", {
                  key: "optedOut",
                  value: t.optedOut,
                })),
              null != t.createdAt &&
                (yield this.put("Options", {
                  key: "subscriptionCreatedAt",
                  value: t.createdAt,
                })),
              null != t.expirationTime
                ? yield this.put("Options", {
                    key: "subscriptionExpirationTime",
                    value: t.expirationTime,
                  })
                : yield this.remove("Options", "subscriptionExpirationTime");
          });
        }
        setJWTToken(t) {
          return e(this, void 0, void 0, function* () {
            yield this.put("Ids", { type: "jwtToken", id: t });
          });
        }
        getJWTToken() {
          return e(this, void 0, void 0, function* () {
            return yield this.get("Ids", "jwtToken");
          });
        }
        setProvideUserConsent(t) {
          return e(this, void 0, void 0, function* () {
            yield this.put("Options", { key: "userConsent", value: t });
          });
        }
        getConsentGiven() {
          return e(this, void 0, void 0, function* () {
            return yield this.get("Options", "userConsent");
          });
        }
        getSession(t) {
          return e(this, void 0, void 0, function* () {
            return yield this.get("Sessions", t);
          });
        }
        setSession(t) {
          return e(this, void 0, void 0, function* () {
            yield this.put("Sessions", t);
          });
        }
        removeSession(t) {
          return e(this, void 0, void 0, function* () {
            yield this.remove("Sessions", t);
          });
        }
        getLastNotificationClickedForOutcomes(t) {
          return e(this, void 0, void 0, function* () {
            let e = [];
            try {
              e = yield this.getAllNotificationClickedForOutcomes();
            } catch (e) {
              f.error("Database.getLastNotificationClickedForOutcomes", e);
            }
            return e.find((e) => e.appId === t) || null;
          });
        }
        getAllNotificationClickedForOutcomes() {
          return e(this, void 0, void 0, function* () {
            return (yield this.getAll(B)).map((e) => R.fromDatabase(e));
          });
        }
        putNotificationClickedForOutcomes(t, i) {
          return e(this, void 0, void 0, function* () {
            yield this.put(B, R.toDatabase(t, i));
          });
        }
        putNotificationClickedEventPendingUrlOpening(t) {
          return e(this, void 0, void 0, function* () {
            yield this.put("NotificationOpened", _.toDatabase(t));
          });
        }
        getAllPendingNotificationClickEvents() {
          return e(this, void 0, void 0, function* () {
            const e = {},
              t = yield this.getAll("NotificationOpened");
            for (const i of t) {
              const t = _.fromDatabase(i),
                n = t.result.url;
              n && (e[n] = t);
            }
            return e;
          });
        }
        removeAllNotificationClickedForOutcomes() {
          return e(this, void 0, void 0, function* () {
            yield this.remove(B);
          });
        }
        getAllNotificationReceivedForOutcomes() {
          return e(this, void 0, void 0, function* () {
            return (yield this.getAll(F)).map((e) => V.fromDatabase(e));
          });
        }
        putNotificationReceivedForOutcomes(t, i) {
          return e(this, void 0, void 0, function* () {
            yield this.put(F, V.toDatabase(t, i, new Date().getTime()));
          });
        }
        resetSentUniqueOutcomes() {
          return e(this, void 0, void 0, function* () {
            const e = (yield this.getAll("SentUniqueOutcome")).map(
              (e) => (
                (e.sentDuringSession = null), $.put("SentUniqueOutcome", e)
              )
            );
            yield Promise.all(e);
          });
        }
        static rebuild() {
          return e(this, void 0, void 0, function* () {
            return Promise.all([
              $.singletonInstance.remove("Ids"),
              $.singletonInstance.remove("NotificationOpened"),
              $.singletonInstance.remove("Options"),
              $.singletonInstance.remove(F),
              $.singletonInstance.remove(B),
              $.singletonInstance.remove("SentUniqueOutcome"),
            ]);
          });
        }
        static on(...t) {
          return e(this, void 0, void 0, function* () {
            return $.singletonInstance.emitter.on.apply(
              $.singletonInstance.emitter,
              t
            );
          });
        }
        static setIsPushEnabled(t) {
          return e(this, void 0, void 0, function* () {
            return $.singletonInstance.setIsPushEnabled(t);
          });
        }
        static getCurrentSession() {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.getSession(M);
          });
        }
        static upsertSession(t) {
          return e(this, void 0, void 0, function* () {
            yield $.singletonInstance.setSession(t);
          });
        }
        static cleanupCurrentSession() {
          return e(this, void 0, void 0, function* () {
            yield $.singletonInstance.removeSession(M);
          });
        }
        static setSubscription(t) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.setSubscription(t);
          });
        }
        static getSubscription() {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.getSubscription();
          });
        }
        static setJWTToken(t) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.setJWTToken(t);
          });
        }
        static getJWTToken() {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.getJWTToken();
          });
        }
        static setConsentGiven(t) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.setProvideUserConsent(t);
          });
        }
        static getConsentGiven() {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.getConsentGiven();
          });
        }
        static setAppState(t) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.setAppState(t);
          });
        }
        static getAppState() {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.getAppState();
          });
        }
        static setUserState(t) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.setUserState(t);
          });
        }
        static getUserState() {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.getUserState();
          });
        }
        static setAppConfig(t) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.setAppConfig(t);
          });
        }
        static getAppConfig() {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.getAppConfig();
          });
        }
        static getLastNotificationClickedForOutcomes(t) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.getLastNotificationClickedForOutcomes(
              t
            );
          });
        }
        static removeAllNotificationClickedForOutcomes() {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.removeAllNotificationClickedForOutcomes();
          });
        }
        static getAllNotificationReceivedForOutcomes() {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.getAllNotificationReceivedForOutcomes();
          });
        }
        static putNotificationReceivedForOutcomes(t, i) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.putNotificationReceivedForOutcomes(
              t,
              i
            );
          });
        }
        static getAllNotificationClickedForOutcomes() {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.getAllNotificationClickedForOutcomes();
          });
        }
        static putNotificationClickedForOutcomes(t, i) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.putNotificationClickedForOutcomes(
              t,
              i
            );
          });
        }
        static putNotificationClickedEventPendingUrlOpening(t) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.putNotificationClickedEventPendingUrlOpening(
              t
            );
          });
        }
        static resetSentUniqueOutcomes() {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.resetSentUniqueOutcomes();
          });
        }
        static setDeviceId(t) {
          return e(this, void 0, void 0, function* () {
            yield $.singletonInstance.setDeviceId(t);
          });
        }
        static remove(t, i) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.remove(t, i);
          });
        }
        static put(t, i) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.put(t, i);
          });
        }
        static get(t, i) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.get(t, i);
          });
        }
        static getAll(t) {
          return e(this, void 0, void 0, function* () {
            return yield $.singletonInstance.getAll(t);
          });
        }
      }
      $.EVENTS = L;
      const j = [
        "notifyButtonHovering",
        "notifyButtonHover",
        "notifyButtonButtonClick",
        "notifyButtonLauncherClick",
        "animatedElementHiding",
        "animatedElementHidden",
        "animatedElementShowing",
        "animatedElementShown",
        "activeAnimatedElementActivating",
        "activeAnimatedElementActive",
        "activeAnimatedElementInactivating",
        "activeAnimatedElementInactive",
      ];
      class H {
        static trigger(t, i, n) {
          return e(this, void 0, void 0, function* () {
            if (!C.contains(j, t)) {
              const e = i;
              let n = C.capitalize(a.getWindowEnv().toString());
              e || !1 === e
                ? f.debug(`(${n}) Â» ${t}:`, e)
                : f.debug(`(${n}) Â» ${t}`);
            }
            if (p.isBrowser()) {
              if (t === OneSignal.EVENTS.SDK_INITIALIZED) {
                if (OneSignal.initialized) return;
                OneSignal.initialized = !0;
              }
              n ? yield n.emit(t, i) : yield OneSignal.emitter.emit(t, i);
            }
          });
        }
      }
      class K extends s {
        constructor(e, t) {
          super("Registration of a Service Worker failed."),
            (this.status = e),
            (this.statusText = t),
            Object.setPrototypeOf(this, K.prototype);
        }
      }
      const z = K;
      class q {
        static getBaseUrl() {
          return location.origin;
        }
        static isLocalhostAllowedAsSecureOrigin() {
          return (
            OneSignal.config &&
            OneSignal.config.userConfig &&
            !0 === OneSignal.config.userConfig.allowLocalhostAsSecureOrigin
          );
        }
        static redetectBrowserUserAgent() {
          return "" === u().name && "" === u().version
            ? l()._detect(navigator.userAgent)
            : l();
        }
        static isValidUuid(e) {
          return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
            e
          );
        }
        static getRandomUuid() {
          const e =
            "undefined" == typeof window
              ? i.g.crypto
              : window.crypto || window.msCrypto;
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (t) {
              const i = e.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
              return ("x" == t ? i : (3 & i) | 8).toString(16);
            }
          );
        }
        static logMethodCall(e, ...t) {
          return f.debug(`Called ${e}(${t.map(x.stringify).join(", ")})`);
        }
        static isSafari() {
          return p.isBrowser() && void 0 !== window.safari;
        }
      }
      const G = q;
      class J {
        static debug(...e) {
          self.shouldLog && console.debug(...e);
        }
        static trace(...e) {
          self.shouldLog && console.trace(...e);
        }
        static info(...e) {
          self.shouldLog && console.info(...e);
        }
        static warn(...e) {
          self.shouldLog && console.warn(...e);
        }
        static error(...e) {
          self.shouldLog && console.error(...e);
        }
      }
      const Y = () => {
        J.debug("Do nothing");
      };
      function Q(t, i) {
        const n = 1e3 * i;
        let o, s;
        const r = new Promise((i, r) => {
          let a = !1;
          (o = self.setTimeout(
            () =>
              e(this, void 0, void 0, function* () {
                a = !0;
                try {
                  yield t(), i();
                } catch (e) {
                  J.error("Failed to execute callback", e), r();
                }
              }),
            n
          )),
            (s = () => {
              J.debug("Cancel called"), self.clearTimeout(o), a || i();
            });
        });
        return s
          ? { promise: r, cancel: s }
          : (J.warn("clearTimeoutHandle was not assigned."),
            { promise: r, cancel: Y });
      }
      var X;
      !(function (e) {
        (e[(e.Direct = 1)] = "Direct"),
          (e[(e.Indirect = 2)] = "Indirect"),
          (e[(e.Unattributed = 3)] = "Unattributed"),
          (e[(e.NotSupported = 4)] = "NotSupported");
      })(X || (X = {}));
      class Z {
        static triggerNotificationPermissionChanged(t = !1) {
          return e(this, void 0, void 0, function* () {
            if (!Z.executing) {
              Z.executing = !0;
              try {
                yield Z.privateTriggerNotificationPermissionChanged(t);
              } finally {
                Z.executing = !1;
              }
            }
          });
        }
        static privateTriggerNotificationPermissionChanged(t) {
          return e(this, void 0, void 0, function* () {
            const e =
                yield OneSignal.context.permissionManager.getPermissionStatus(),
              i = yield $.get("Options", "notificationPermission");
            (e !== i || t) &&
              (yield $.put("Options", {
                key: "notificationPermission",
                value: e,
              }),
              H.trigger(
                OneSignal.EVENTS.NOTIFICATION_PERMISSION_CHANGED_AS_STRING,
                e
              ),
              this.triggerBooleanPermissionChangeEvent(i, e, t));
          });
        }
        static triggerBooleanPermissionChangeEvent(e, t, i) {
          const n = "granted" === t;
          (n !== ("granted" === e) || i) &&
            H.trigger(
              OneSignal.EVENTS.NOTIFICATION_PERMISSION_CHANGED_AS_BOOLEAN,
              n
            );
        }
      }
      function ee() {
        return e(this, void 0, void 0, function* () {
          return new Promise((e) => {
            OneSignal.initialized
              ? e()
              : OneSignal.emitter.once(OneSignal.EVENTS.SDK_INITIALIZED, e);
          });
        });
      }
      function te(e, ...t) {
        return q.logMethodCall(e, ...t);
      }
      function ie(e, t) {
        if ("string" == typeof e) {
          const i = document.querySelector(e);
          if (null === i)
            throw new Error(`Cannot find element with selector "${e}"`);
          i.classList.add(t);
        } else {
          if ("object" != typeof e)
            throw new Error(
              `${e} must be a CSS selector string or DOM Element object.`
            );
          e.classList.add(t);
        }
      }
      function ne(e) {
        return q.isValidUuid(e);
      }
      function oe(e) {
        return JSON.parse(JSON.stringify(e));
      }
      Z.executing = !1;
      class se {
        constructor(e, t, i, n) {
          (this.outcomeName = i),
            (this.config = t),
            (this.appId = e),
            (this.isUnique = n);
        }
        getAttribution() {
          return e(this, void 0, void 0, function* () {
            return yield se.getAttribution(this.config);
          });
        }
        beforeOutcomeSend() {
          return e(this, void 0, void 0, function* () {
            if (
              (te(
                this.isUnique ? "sendUniqueOutcome" : "sendOutcome",
                this.outcomeName
              ),
              !this.config)
            )
              return (
                f.debug(
                  "Outcomes feature not supported by main application yet."
                ),
                !1
              );
            if (!this.outcomeName)
              return f.error("Outcome name is required"), !1;
            yield ee();
            return (
              !!(yield OneSignal.context.subscriptionManager.isPushNotificationsEnabled()) ||
              (f.warn(
                "Reporting outcomes is supported only for subscribed users."
              ),
              !1)
            );
          });
        }
        getAttributedNotifsByUniqueOutcomeName() {
          return e(this, void 0, void 0, function* () {
            return (yield $.getAll("SentUniqueOutcome"))
              .filter((e) => e.outcomeName === this.outcomeName)
              .reduce((e, t) => [...e, ...(t.notificationIds || [])], []);
          });
        }
        getNotifsToAttributeWithUniqueOutcome(t) {
          return e(this, void 0, void 0, function* () {
            const e = yield this.getAttributedNotifsByUniqueOutcomeName();
            return t.filter((t) => -1 === e.indexOf(t));
          });
        }
        shouldSendUnique(e, t) {
          return e.type === X.Unattributed || t.length > 0;
        }
        saveSentUniqueOutcome(t) {
          return e(this, void 0, void 0, function* () {
            const e = this.outcomeName,
              i = yield $.get("SentUniqueOutcome", e),
              n = yield $.getCurrentSession(),
              o = [...(i ? i.notificationIds : []), ...t],
              s = n ? n.startTimestamp : null;
            yield $.put("SentUniqueOutcome", {
              outcomeName: e,
              notificationIds: o,
              sentDuringSession: s,
            });
          });
        }
        wasSentDuringSession() {
          return e(this, void 0, void 0, function* () {
            const e = yield $.get("SentUniqueOutcome", this.outcomeName);
            if (!e) return !1;
            const t = yield $.getCurrentSession(),
              i = t && e.sentDuringSession === t.startTimestamp,
              n = !t && !!e.sentDuringSession;
            return i || n;
          });
        }
        send(t) {
          return e(this, void 0, void 0, function* () {
            const { type: e, notificationIds: i, weight: n } = t;
            switch (e) {
              case X.Direct:
                return (
                  this.isUnique && (yield this.saveSentUniqueOutcome(i)),
                  void (yield OneSignal.context.updateManager.sendOutcomeDirect(
                    this.appId,
                    i,
                    this.outcomeName,
                    n
                  ))
                );
              case X.Indirect:
                return (
                  this.isUnique && (yield this.saveSentUniqueOutcome(i)),
                  void (yield OneSignal.context.updateManager.sendOutcomeInfluenced(
                    this.appId,
                    i,
                    this.outcomeName,
                    n
                  ))
                );
              case X.Unattributed:
                if (this.isUnique) {
                  if (yield this.wasSentDuringSession())
                    return void f.warn(
                      "(Unattributed) unique outcome was already sent during this session"
                    );
                  yield this.saveSentUniqueOutcome([]);
                }
                return void (yield OneSignal.context.updateManager.sendOutcomeUnattributed(
                  this.appId,
                  this.outcomeName,
                  n
                ));
              default:
                return void f.warn(
                  "You are on a free plan. Please upgrade to use this functionality."
                );
            }
          });
        }
        static getAttribution(t) {
          return e(this, void 0, void 0, function* () {
            if (t.direct && t.direct.enabled) {
              const e = yield $.getAllNotificationClickedForOutcomes();
              if (e.length > 0)
                return {
                  type: X.Direct,
                  notificationIds: [e[0].notificationId],
                };
            }
            if (t.indirect && t.indirect.enabled) {
              const e = 60 * t.indirect.influencedTimePeriodMin * 1e3,
                i = new Date(new Date().getTime() - e).getTime(),
                n = yield $.getAllNotificationReceivedForOutcomes();
              if (
                (f.debug(`\tFound total of ${n.length} received notifications`),
                n.length > 0)
              ) {
                const e = t.indirect.influencedNotificationsLimit,
                  o = x.sortArrayOfObjects(n, (e) => e.timestamp, !0, !1),
                  s = o
                    .filter((e) => e.timestamp >= i)
                    .slice(0, e)
                    .map((e) => e.notificationId);
                f.debug(
                  `\tTotal of ${s.length} received notifications are within reporting window.`
                );
                const r = o
                  .filter((e) => -1 === s.indexOf(e.notificationId))
                  .map((e) => e.notificationId);
                if (
                  (r.forEach((e) => $.remove(F, e)),
                  f.debug(
                    `\t${r.length} received notifications will be deleted.`
                  ),
                  s.length > 0)
                )
                  return { type: X.Indirect, notificationIds: s };
              }
            }
            return t.unattributed && t.unattributed.enabled
              ? { type: X.Unattributed, notificationIds: [] }
              : { type: X.NotSupported, notificationIds: [] };
          });
        }
      }
      var re, ae, ce, de, le;
      !(function (e) {
        (e.ChromePush = "ChromePush"),
          (e.SafariPush = "SafariPush"),
          (e.SafariLegacyPush = "SafariLegacyPush"),
          (e.FirefoxPush = "FirefoxPush"),
          (e.Email = "Email"),
          (e.SMS = "SMS");
      })(re || (re = {})),
        (function (e) {
          (e.Safari = "safari"),
            (e.Firefox = "firefox"),
            (e.Chrome = "chrome"),
            (e.Opera = "opera"),
            (e.Edge = "edge"),
            (e.Other = "other");
        })(ae || (ae = {}));
      class ue {
        static getEnvironmentInfo() {
          return {
            browserType: this.getBrowser(),
            browserVersion: this.getBrowserVersion(),
            isBrowserAndSupportsServiceWorkers: this.supportsServiceWorkers(),
            requiresUserInteraction: this.requiresUserInteraction(),
            osVersion: this.getOsVersion(),
          };
        }
        static getBrowser() {
          return "chrome" === u().name
            ? ae.Chrome
            : "msedge" === u().name
              ? ae.Edge
              : "opera" === u().name
                ? ae.Opera
                : "firefox" === u().name
                  ? ae.Firefox
                  : this.isMacOSSafari()
                    ? ae.Safari
                    : ae.Other;
        }
        static isMacOSSafari() {
          return void 0 !== window.safari;
        }
        static getBrowserVersion() {
          return C.parseVersionString(u().version);
        }
        static supportsServiceWorkers() {
          return window.navigator && "serviceWorker" in window.navigator;
        }
        static requiresUserInteraction() {
          return (
            ("firefox" === this.getBrowser() &&
              this.getBrowserVersion() >= 72) ||
            ("safari" === this.getBrowser() && this.getBrowserVersion() >= 12.1)
          );
        }
        static getOsVersion() {
          return l().osversion;
        }
      }
      !(function (e) {
        (e[(e.NoNativePermission = 0)] = "NoNativePermission"),
          (e[(e.Subscribed = 1)] = "Subscribed"),
          (e[(e.UserOptedOut = -2)] = "UserOptedOut"),
          (e[(e.NotSubscribed = -10)] = "NotSubscribed"),
          (e[(e.TemporaryWebRecord = -20)] = "TemporaryWebRecord"),
          (e[(e.PermissionRevoked = -21)] = "PermissionRevoked"),
          (e[(e.PushSubscriptionRevoked = -22)] = "PushSubscriptionRevoked"),
          (e[(e.ServiceWorkerStatus403 = -23)] = "ServiceWorkerStatus403"),
          (e[(e.ServiceWorkerStatus404 = -24)] = "ServiceWorkerStatus404");
      })(ce || (ce = {})),
        (function (e) {
          (e[(e.ChromeLike = 5)] = "ChromeLike"),
            (e[(e.SafariLegacy = 7)] = "SafariLegacy"),
            (e[(e.Firefox = 8)] = "Firefox"),
            (e[(e.Email = 11)] = "Email"),
            (e[(e.Edge = 12)] = "Edge"),
            (e[(e.SMS = 14)] = "SMS"),
            (e[(e.SafariVapid = 17)] = "SafariVapid");
        })(de || (de = {}));
      class ge {
        constructor(e) {
          const t = ue.getEnvironmentInfo();
          (this.token = this._getToken(e)),
            (this.type = ge.getSubscriptionType()),
            (this.notificationTypes = ce.Subscribed),
            (this.sdk = String(160200)),
            (this.deviceModel = navigator.platform),
            (this.deviceOs = isNaN(t.browserVersion) ? -1 : t.browserVersion),
            (this.webAuth = e.w3cAuth),
            (this.webp256 = e.w3cP256dh);
        }
        _getToken(e) {
          return e.w3cEndpoint ? e.w3cEndpoint.toString() : e.safariDeviceToken;
        }
        serialize() {
          return {
            type: this.type,
            token: this.token,
            enabled: this.enabled,
            notification_types: this.notificationTypes,
            sdk: this.sdk,
            device_model: this.deviceModel,
            device_os: this.deviceOs,
            web_auth: this.webAuth,
            web_p256: this.webp256,
          };
        }
        static getSubscriptionType() {
          return G.redetectBrowserUserAgent().firefox
            ? re.FirefoxPush
            : p.useSafariVapidPush()
              ? re.SafariPush
              : p.useSafariLegacyPush()
                ? re.SafariLegacyPush
                : re.ChromePush;
        }
        static getDeviceType() {
          switch (this.getSubscriptionType()) {
            case re.FirefoxPush:
              return de.Firefox;
            case re.SafariLegacyPush:
              return de.SafariLegacy;
            case re.SafariPush:
              return de.SafariVapid;
          }
          return de.ChromeLike;
        }
      }
      class pe {
        constructor(e, t) {
          (this.label = e), (this.id = t);
        }
      }
      (pe.ONESIGNAL_ID = "onesignal_id"),
        (pe.EXTERNAL_ID = "external_id"),
        (function (e) {
          (e[(e.MissingAppId = 0)] = "MissingAppId"),
            (e[(e.RetryLimitReached = 1)] = "RetryLimitReached");
        })(le || (le = {}));
      class fe extends s {
        constructor(e) {
          let t;
          switch (e) {
            case le.MissingAppId:
              t = "The API call is missing an app ID.";
              break;
            case le.RetryLimitReached:
              t = "The API call has reached the retry limit.";
          }
          super(t), Object.setPrototypeOf(this, fe.prototype);
        }
      }
      function he(e) {
        return new Promise((t) => setTimeout(t, e));
      }
      const ve = { 5: 1e4, 4: 2e4, 3: 3e4, 2: 3e4, 1: 3e4 };
      class me {
        static get(e, t, i) {
          return me.call("GET", e, t, i);
        }
        static post(e, t, i) {
          return me.call("POST", e, t, i);
        }
        static put(e, t, i) {
          return me.call("PUT", e, t, i);
        }
        static delete(e, t, i) {
          return me.call("DELETE", e, t, i);
        }
        static patch(e, t, i) {
          return me.call("PATCH", e, t, i);
        }
        static call(e, t, i, n) {
          if (!this.requestHasAppId(t, i))
            return Promise.reject(new fe(le.MissingAppId));
          const o = new Headers();
          if (
            (o.append("Origin", a.getOrigin()),
            o.append("SDK-Version", `onesignal/web/${p.version()}`),
            o.append("Content-Type", "application/json;charset=UTF-8"),
            n)
          )
            for (const e of Object.keys(n)) o.append(e, n[e]);
          const s = {
            method: e || "NO_METHOD_SPECIFIED",
            headers: o,
            cache: "no-cache",
          };
          i && (s.body = JSON.stringify(i));
          const r = `${a.getOneSignalApiUrl(void 0, t).toString()}/${t}`;
          return me.executeFetch(r, s);
        }
        static executeFetch(t, i, n = 5) {
          return e(this, void 0, void 0, function* () {
            if (0 === n) return Promise.reject(new fe(le.RetryLimitReached));
            try {
              const e = yield fetch(t, i),
                { status: n } = e;
              return { result: yield e.json(), status: n };
            } catch (e) {
              if ("TypeError" === e.name)
                return (
                  yield he(ve[n]),
                  f.error(
                    `OneSignal: Network timed out while calling ${t}. Retrying...`
                  ),
                  me.executeFetch(t, i, n - 1)
                );
              throw new s(
                `OneSignalApiBase: failed to execute HTTP call: ${e}`
              );
            }
          });
        }
        static requestHasAppId(e, t) {
          if (e.startsWith("apps/")) {
            return ne(e.split("/")[1]);
          }
          return !(!t || "string" != typeof t.app_id) && ne(t.app_id);
        }
      }
      const be = me;
      function Se(e) {
        return encodeURIComponent(e).replace(
          /[!'()*]/g,
          (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`
        );
      }
      var ye;
      !(function (e) {
        (e[(e.InvalidAppId = 0)] = "InvalidAppId"),
          (e[(e.AppNotConfiguredForWebPush = 1)] =
            "AppNotConfiguredForWebPush"),
          (e[(e.WrongSiteUrl = 2)] = "WrongSiteUrl"),
          (e[(e.MultipleInitialization = 3)] = "MultipleInitialization"),
          (e[(e.MissingSafariWebId = 4)] = "MissingSafariWebId"),
          (e[(e.Unknown = 5)] = "Unknown");
      })(ye || (ye = {}));
      class SdkInitError extends s {
        constructor(e, t) {
          let i;
          switch (e) {
            case ye.InvalidAppId:
              i =
                "OneSignal: This app ID does not match any existing app. Double check your app ID.";
              break;
            case ye.AppNotConfiguredForWebPush:
              i =
                "OneSignal: This app ID does not have any web platforms enabled. Double check your app ID, or see step 1 on our setup guide (https://tinyurl.com/2x5jzk83).";
              break;
            case ye.WrongSiteUrl:
              i =
                t && t.siteUrl
                  ? `OneSignal: This web push config can only be used on ${new URL(t.siteUrl).origin}. Your current origin is ${location.origin}.`
                  : "OneSignal: This web push config can not be used on the current site.";
              break;
            case ye.MultipleInitialization:
              i =
                "OneSignal: The OneSignal web SDK can only be initialized once. Extra initializations are ignored. Please remove calls initializing the SDK more than once.";
              break;
            case ye.MissingSafariWebId:
              i =
                "OneSignal: Safari browser support on Mac OS X requires the Safari web platform to be enabled. Please see the Safari Support steps in our web setup guide.";
              break;
            case ye.Unknown:
              i = "OneSignal: An unknown initialization error occurred.";
          }
          super(i),
            (this.reason = ye[e]),
            Object.setPrototypeOf(this, SdkInitError.prototype);
        }
      }
      class we {
        static createUser(t, i) {
          return e(this, void 0, void 0, function* () {
            const { appId: e, subscriptionId: n } = t,
              o = n ? { "OneSignal-Subscription-Id": n } : void 0;
            let s = {};
            return (
              o && (s = Object.assign(Object.assign({}, s), o)),
              t.jwtHeader &&
                (s = Object.assign(Object.assign({}, s), t.jwtHeader)),
              (i.refresh_device_metadata = !0),
              be.post(`apps/${e}/users`, i, s)
            );
          });
        }
        static getUser(t, i) {
          return e(this, void 0, void 0, function* () {
            const { appId: e } = t;
            return be.get(`apps/${e}/users/by/${i.label}/${i.id}`, t.jwtHeader);
          });
        }
        static updateUser(t, i, n) {
          return e(this, void 0, void 0, function* () {
            const { appId: e, subscriptionId: o } = t;
            if (!G.isValidUuid(e)) throw new SdkInitError(ye.InvalidAppId);
            const s = o ? { "OneSignal-Subscription-Id": o } : void 0;
            let r = {};
            s && (r = Object.assign(Object.assign({}, r), s)),
              t.jwtHeader &&
                (r = Object.assign(Object.assign({}, r), t.jwtHeader));
            const a = Se(i.label),
              c = Se(i.id);
            return be.patch(`apps/${e}/users/by/${a}/${c}`, n, r);
          });
        }
        static deleteUser(t, i) {
          return e(this, void 0, void 0, function* () {
            const { appId: e } = t;
            return be.delete(
              `apps/${e}/users/by/${i.label}/${i.id}`,
              t.jwtHeader
            );
          });
        }
        static addAlias(t, i, n) {
          return e(this, void 0, void 0, function* () {
            const { appId: e } = t;
            return be.patch(
              `apps/${e}/users/by/${i.label}/${i.id}/identity`,
              { identity: n },
              t.jwtHeader
            );
          });
        }
        static getUserIdentity(t, i) {
          return e(this, void 0, void 0, function* () {
            const { appId: e } = t;
            return be.get(
              `apps/${e}/users/by/${i.label}/${i.id}/identity`,
              t.jwtHeader
            );
          });
        }
        static deleteAlias(t, i, n) {
          return e(this, void 0, void 0, function* () {
            const { appId: e } = t;
            return be.delete(
              `apps/${e}/users/by/${i.label}/${i.id}/identity/${n}`,
              t.jwtHeader
            );
          });
        }
        static createSubscription(t, i, n) {
          return e(this, void 0, void 0, function* () {
            const { appId: e } = t;
            return be.post(
              `apps/${e}/users/by/${i.label}/${i.id}/subscriptions`,
              n,
              t.jwtHeader
            );
          });
        }
        static updateSubscription(t, i, n) {
          return e(this, void 0, void 0, function* () {
            const { appId: e } = t;
            return be.patch(`apps/${e}/subscriptions/${i}`, {
              subscription: n,
            });
          });
        }
        static deleteSubscription(t, i) {
          return e(this, void 0, void 0, function* () {
            const { appId: e } = t;
            return be.delete(`apps/${e}/subscriptions/${i}`);
          });
        }
        static fetchAliasesForSubscription(t, i) {
          return e(this, void 0, void 0, function* () {
            const { appId: e } = t;
            return be.get(`apps/${e}/subscriptions/${i}/identity`);
          });
        }
        static identifyUserForSubscription(t, i, n) {
          return e(this, void 0, void 0, function* () {
            const { appId: e } = t;
            return be.patch(
              `apps/${e}/users/by/subscriptions/${i}/identity`,
              { identity: n },
              t.jwtHeader
            );
          });
        }
        static transferSubscription(t, i, n, o) {
          return e(this, void 0, void 0, function* () {
            const { appId: e } = t;
            return be.patch(
              `apps/${e}/subscriptions/${i}/owner`,
              { identity: Object.assign({}, n), retain_previous_owner: o },
              t.jwtHeader
            );
          });
        }
      }
      class Oe {
        static sendNotification(e, t, i, n, o, s, r, a) {
          const c = {
            app_id: e,
            contents: n,
            include_player_ids: t,
            isAnyWeb: !0,
            data: r,
            web_buttons: a,
          };
          return (
            i && (c.headings = i),
            o && (c.url = o),
            s && ((c.chrome_web_icon = s), (c.firefox_icon = s)),
            C.trimUndefined(c),
            be.post("notifications", c)
          );
        }
        static sendOutcome(t) {
          return e(this, void 0, void 0, function* () {
            f.info("Outcome payload:", t);
            try {
              yield be.post("outcomes/measure", t);
            } catch (e) {
              f.error("sendOutcome", e);
            }
          });
        }
      }
      const Ie = class {
        static downloadServerAppConfig(t) {
          return e(this, void 0, void 0, function* () {
            C.enforceAppId(t);
            const e = yield me.get(`sync/${t}/web`, null);
            return null == e ? void 0 : e.result;
          });
        }
        static getUserIdFromSubscriptionIdentifier(e, t, i) {
          return (
            C.enforceAppId(e),
            me
              .post("players", {
                app_id: e,
                device_type: t,
                identifier: i,
                notification_types: ce.TemporaryWebRecord,
              })
              .then((e) => (e && e.id ? e.id : null))
              .catch(
                (e) => (
                  f.debug(
                    "Error getting user ID from subscription identifier:",
                    e
                  ),
                  null
                )
              )
          );
        }
        static updateUserSession(t, i, n) {
          return e(this, void 0, void 0, function* () {
            const e = new pe(pe.ONESIGNAL_ID, i),
              o = { refresh_device_metadata: !0, deltas: { session_count: 1 } };
            C.enforceAppId(t), C.enforceAlias(e);
            try {
              yield we.updateUser({ appId: t, subscriptionId: n }, e, o);
            } catch (e) {
              f.debug("Error updating user session:", e);
            }
          });
        }
        static sendSessionDuration(t, i, n, o, s) {
          return e(this, void 0, void 0, function* () {
            const e = {
                refresh_device_metadata: !0,
                deltas: { session_time: o },
              },
              r = new pe(pe.ONESIGNAL_ID, i),
              a = {
                id: "os__session_duration",
                app_id: t,
                session_time: o,
                notification_ids: s.notificationIds,
                subscription: { id: n, type: ge.getSubscriptionType() },
                onesignal_id: i,
              };
            a.direct = s.type === X.Direct;
            try {
              yield we.updateUser({ appId: t, subscriptionId: n }, r, e),
                a.notification_ids &&
                  a.notification_ids.length > 0 &&
                  (yield Oe.sendOutcome(a));
            } catch (e) {
              f.debug("Error sending session duration:", e);
            }
          });
        }
      };
      class ke {
        static getServiceWorkerHref(e, t, i) {
          return ke.appendServiceWorkerParams(e.workerPath.getFullPath(), t, i);
        }
        static appendServiceWorkerParams(e, t, i) {
          return `${new URL(e, q.getBaseUrl()).href}?${C.encodeHashAsUriComponent({ appId: t })}&${C.encodeHashAsUriComponent({ sdkVersion: i })}`;
        }
        static upsertSession(t, i, n, o, s, r, a) {
          return e(this, void 0, void 0, function* () {
            const e = yield $.getCurrentSession();
            if (!e) {
              const e = W({ appId: t }),
                o = yield $.getLastNotificationClickedForOutcomes(t);
              return (
                o && (e.notificationId = o.notificationId),
                yield $.upsertSession(e),
                void (yield ke.sendOnSessionCallIfNotPlayerCreate(
                  t,
                  i,
                  n,
                  r,
                  e
                ))
              );
            }
            if (e.status === D.Active)
              return void J.debug("Session already active", e);
            if (!e.lastDeactivatedTimestamp)
              return void J.debug("Session is in invalid state", e);
            const c = new Date().getTime();
            if (
              ke.timeInSecondsBetweenTimestamps(
                c,
                e.lastDeactivatedTimestamp
              ) <= o
            )
              return (
                (e.status = D.Active),
                (e.lastActivatedTimestamp = c),
                (e.lastDeactivatedTimestamp = null),
                void (yield $.upsertSession(e))
              );
            yield ke.finalizeSession(t, i, n, e, s, a);
            const d = W({ appId: t });
            yield $.upsertSession(d),
              yield ke.sendOnSessionCallIfNotPlayerCreate(t, i, n, r, d);
          });
        }
        static deactivateSession(t, i, n, o, s, r) {
          return e(this, void 0, void 0, function* () {
            const e = yield $.getCurrentSession();
            if (!e)
              return void J.debug(
                "No active session found. Cannot deactivate."
              );
            const a = () => ke.finalizeSession(t, i, n, e, s, r);
            if (e.status === D.Inactive) return Q(a, o);
            if (e.status !== D.Active)
              return void J.warn(
                `Session in invalid state ${e.status}. Cannot deactivate.`
              );
            const c = new Date().getTime(),
              d = ke.timeInSecondsBetweenTimestamps(
                c,
                e.lastActivatedTimestamp
              );
            (e.lastDeactivatedTimestamp = c),
              (e.accumulatedDuration += d),
              (e.status = D.Inactive);
            const l = Q(a, o);
            return yield $.upsertSession(e), l;
          });
        }
        static sendOnSessionCallIfNotPlayerCreate(t, i, n, o, s) {
          return e(this, void 0, void 0, function* () {
            o !== U.UserCreate &&
              ($.upsertSession(s),
              $.resetSentUniqueOutcomes(),
              yield Ie.updateUserSession(t, i, n));
          });
        }
        static finalizeSession(t, i, n, o, s, r) {
          return e(this, void 0, void 0, function* () {
            if (
              (J.debug(
                "Finalize session",
                `started: ${new Date(o.startTimestamp)}`,
                `duration: ${o.accumulatedDuration}s`
              ),
              s)
            ) {
              J.debug(
                `send on_focus reporting session duration -> ${o.accumulatedDuration}s`
              );
              const e = yield se.getAttribution(r);
              J.debug("send on_focus with attribution", e),
                yield Ie.sendSessionDuration(t, i, n, o.accumulatedDuration, e);
            }
            yield Promise.all([
              $.cleanupCurrentSession(),
              $.removeAllNotificationClickedForOutcomes(),
            ]),
              J.debug(
                "Finalize session finished",
                `started: ${new Date(o.startTimestamp)}`
              );
          });
        }
        static timeInSecondsBetweenTimestamps(e, t) {
          return e <= t ? 0 : Math.floor((e - t) / 1e3);
        }
      }
      var Pe;
      !(function (e) {
        (e.OneSignalWorker = "OneSignal Worker"),
          (e.ThirdParty = "3rd Party"),
          (e.None = "None"),
          (e.Indeterminate = "Indeterminate");
      })(Pe || (Pe = {}));
      const xe = "onesignal-customlink-subscribe",
        Ce = "onesignal-customlink-explanation",
        Ne = "onesignal-reset",
        Te = "hide",
        Ee = {
          subscribed: "state-subscribed",
          unsubscribed: "state-unsubscribed",
        },
        Ae = {
          containerSelector: `.${"onesignal-customlink-container"}`,
          subscribeSelector: `.${xe}`,
          explanationSelector: `.${Ce}`,
        };
      class De {
        constructor(e) {
          this.config = e;
        }
        initialize() {
          return e(this, void 0, void 0, function* () {
            var e, t;
            if (
              !(null === (e = this.config) || void 0 === e ? void 0 : e.enabled)
            )
              return;
            if (!(yield this.loadSdkStyles())) return;
            f.info("OneSignal: initializing customlink");
            const i =
              yield OneSignal.context.subscriptionManager.isPushNotificationsEnabled();
            if (
              (null === (t = this.config) || void 0 === t
                ? void 0
                : t.unsubscribeEnabled) ||
              !i
            )
              for (let e = 0; e < this.customlinkContainerElements.length; e++)
                yield this.injectMarkup(this.customlinkContainerElements[e]);
            else this.hideCustomLinkContainers();
          });
        }
        injectMarkup(t) {
          return e(this, void 0, void 0, function* () {
            (t.innerHTML = ""),
              yield this.mountExplanationNode(t),
              yield this.mountSubscriptionNode(t);
          });
        }
        mountExplanationNode(t) {
          return e(this, void 0, void 0, function* () {
            var e;
            if (null === (e = this.config) || void 0 === e ? void 0 : e.text) {
              if (this.config.text.explanation) {
                const e = document.createElement("p");
                (e.textContent = this.config.text.explanation),
                  ie(e, Ne),
                  ie(e, Ce),
                  this.config.size && ie(e, this.config.size),
                  (yield OneSignal.context.subscriptionManager.isPushNotificationsEnabled())
                    ? ie(e, Ee.subscribed)
                    : ie(e, Ee.unsubscribed),
                  t.appendChild(e);
              }
            } else
              f.error(
                "CustomLink: required property 'text' is missing in the config"
              );
          });
        }
        mountSubscriptionNode(t) {
          return e(this, void 0, void 0, function* () {
            var i;
            if (null === (i = this.config) || void 0 === i ? void 0 : i.text) {
              if (this.config.text.subscribe) {
                const i = document.createElement("button");
                ie(i, Ne),
                  ie(i, xe),
                  this.config.size && ie(i, this.config.size),
                  this.config.style && ie(i, this.config.style),
                  (yield OneSignal.context.subscriptionManager.isPushNotificationsEnabled())
                    ? ie(i, Ee.subscribed)
                    : ie(i, Ee.unsubscribed),
                  this.setCustomColors(i),
                  yield this.setTextFromPushStatus(i),
                  i.addEventListener("click", () =>
                    e(this, void 0, void 0, function* () {
                      f.info("CustomLink: subscribe clicked"),
                        yield this.handleClick(i);
                    })
                  ),
                  t.appendChild(i);
              }
            } else
              f.error(
                "CustomLink: required property 'text' is missing in the config"
              );
          });
        }
        loadSdkStyles() {
          return e(this, void 0, void 0, function* () {
            return (
              0 ===
                (yield OneSignal.context.dynamicResourceLoader.loadSdkStylesheet()) ||
              (f.debug(
                "Not initializing custom link button because styles failed to load."
              ),
              !1)
            );
          });
        }
        hideElement(e) {
          ie(e, Te);
        }
        hideCustomLinkContainers() {
          this.customlinkContainerElements.forEach((e) => {
            this.hideElement(e);
          });
        }
        handleClick(t) {
          return e(this, void 0, void 0, function* () {
            var e;
            if (!OneSignal.User.PushSubscription.optedIn)
              return (
                yield OneSignal.User.PushSubscription.optIn(),
                void (
                  (null === (e = this.config) || void 0 === e
                    ? void 0
                    : e.unsubscribeEnabled) || this.hideCustomLinkContainers()
                )
              );
            yield OneSignal.User.PushSubscription.optOut(),
              yield this.setTextFromPushStatus(t);
          });
        }
        setTextFromPushStatus(t) {
          return e(this, void 0, void 0, function* () {
            var e, i, n, o;
            (null ===
              (i =
                null === (e = this.config) || void 0 === e ? void 0 : e.text) ||
            void 0 === i
              ? void 0
              : i.subscribe) &&
              ((yield OneSignal.context.subscriptionManager.isPushNotificationsEnabled()) ||
                (t.textContent = this.config.text.subscribe)),
              (null ===
                (o =
                  null === (n = this.config) || void 0 === n
                    ? void 0
                    : n.text) || void 0 === o
                ? void 0
                : o.unsubscribe) &&
                (yield OneSignal.context.subscriptionManager.isPushNotificationsEnabled()) &&
                (t.textContent = this.config.text.unsubscribe);
          });
        }
        setCustomColors(e) {
          var t, i, n, o, s, r, a;
          (null === (t = this.config) || void 0 === t ? void 0 : t.color) &&
            this.config.color.text &&
            ("button" ===
              (null === (i = this.config) || void 0 === i ? void 0 : i.style) &&
            (null === (n = this.config) || void 0 === n
              ? void 0
              : n.color.button)
              ? ((e.style.backgroundColor =
                  null === (o = this.config) || void 0 === o
                    ? void 0
                    : o.color.button),
                (e.style.color =
                  null === (s = this.config) || void 0 === s
                    ? void 0
                    : s.color.text))
              : "link" ===
                  (null === (r = this.config) || void 0 === r
                    ? void 0
                    : r.style) &&
                (e.style.color =
                  null === (a = this.config) || void 0 === a
                    ? void 0
                    : a.color.text));
        }
        get customlinkContainerElements() {
          const e = document.querySelectorAll(Ae.containerSelector);
          return Array.prototype.slice.call(e);
        }
      }
      class Ue {
        static put(e, t) {
          return (
            void 0 === Ue.store[e] && (Ue.store[e] = [null, null]),
            Ue.store[e].push(t),
            Ue.store[e].length == Ue.LIMIT + 1 && Ue.store[e].shift(),
            Ue.store[e]
          );
        }
        static get(e) {
          return (
            void 0 === Ue.store[e] && (Ue.store[e] = [null, null]), Ue.store[e]
          );
        }
        static getFirst(e) {
          return Ue.get(e)[0];
        }
        static getLast(e) {
          return Ue.get(e)[1];
        }
        static remove(e) {
          delete Ue.store[e];
        }
        static isEmpty(e) {
          const t = Ue.get(e);
          return null === t[0] && null === t[1];
        }
      }
      (Ue.store = {}), (Ue.LIMIT = 2);
      const Me = class {
        static decodeHtmlEntities(e) {
          if ("undefined" == typeof DOMParser) return e;
          return (
            new DOMParser().parseFromString(e, "text/html").documentElement
              .textContent || ""
          );
        }
      };
      var We, _e, Re, Ve, Le, Be, Fe;
      !(function (e) {
        (e.Native = "native"),
          (e.Push = "push"),
          (e.Category = "category"),
          (e.Sms = "sms"),
          (e.Email = "email"),
          (e.SmsAndEmail = "smsAndEmail");
      })(We || (We = {}));
      class $e {
        static isCategorySlidedownConfigured(e) {
          if (!e) return !1;
          const t = $e.getFirstSlidedownPromptOptionsWithType(e, We.Category);
          return !!t && !!t.categories && t.categories.length > 0;
        }
        static isCategorySlidedownConfiguredVersion1(e) {
          var t, i;
          return (
            ((null ===
              (i =
                null === (t = null == e ? void 0 : e.categories) || void 0 === t
                  ? void 0
                  : t.tags) || void 0 === i
              ? void 0
              : i.length) || 0) > 0
          );
        }
        static getFirstSlidedownPromptOptionsWithType(e, t) {
          return e ? e.filter((e) => e.type === t)[0] : void 0;
        }
        static isSlidedownAutoPromptConfigured(e) {
          if (!e) return !1;
          for (let t = 0; t < e.length; t++) if (e[t].autoPrompt) return !0;
          return !1;
        }
        static isSlidedownPushDependent(e) {
          return e === We.Push || e === We.Category;
        }
      }
      !(function (e) {
        (e[(e.HttpsPermissionRequest = "HTTPS permission request")] =
          "HttpsPermissionRequest"),
          (e[(e.SlidedownPermissionMessage = "slidedown permission message")] =
            "SlidedownPermissionMessage"),
          (e[(e.SubscriptionBell = "subscription bell")] = "SubscriptionBell");
      })(_e || (_e = {})),
        (function (e) {
          (e[(e.MissingAppId = 0)] = "MissingAppId"),
            (e[(e.RedundantPermissionMessage = 1)] =
              "RedundantPermissionMessage"),
            (e[(e.PushPermissionAlreadyGranted = 2)] =
              "PushPermissionAlreadyGranted"),
            (e[(e.UnsupportedEnvironment = 3)] = "UnsupportedEnvironment"),
            (e[(e.MissingDomElement = 4)] = "MissingDomElement"),
            (e[(e.ServiceWorkerNotActivated = 5)] =
              "ServiceWorkerNotActivated");
        })(Re || (Re = {}));
      class InvalidStateError extends s {
        constructor(e, t) {
          let i;
          switch (e) {
            case Re.MissingAppId:
              i = "Missing required app ID.";
              break;
            case Re.RedundantPermissionMessage: {
              let e = "";
              t &&
                t.permissionPromptType &&
                (e = `(${_e[t.permissionPromptType]})`),
                (i = `Another permission message ${e} is being displayed.`);
              break;
            }
            case Re.PushPermissionAlreadyGranted:
              i = "Push permission has already been granted.";
              break;
            case Re.UnsupportedEnvironment:
              i = "The current environment does not support this operation.";
              break;
            case Re.ServiceWorkerNotActivated:
              i = "The service worker must be activated first.";
          }
          super(i),
            (this.description = Re[e]),
            (this.reason = e),
            Object.setPrototypeOf(this, InvalidStateError.prototype);
        }
      }
      class je {
        static checkAndTriggerNotificationPermissionChanged() {
          return e(this, void 0, void 0, function* () {
            const e = yield $.get("Options", "notificationPermission"),
              t =
                yield OneSignal.context.permissionManager.getPermissionStatus();
            e !== t &&
              (yield Z.triggerNotificationPermissionChanged(),
              yield $.put("Options", {
                key: "notificationPermission",
                value: t,
              }));
          });
        }
        static getNotificationIcons() {
          return e(this, void 0, void 0, function* () {
            const e = yield je.getAppId();
            if (!e) throw new InvalidStateError(Re.MissingAppId);
            const t = `${a.getOneSignalApiUrl().toString()}/apps/${e}/icon`,
              i = yield fetch(t),
              n = yield i.json();
            if (n.errors)
              throw (
                (f.error(`API call ${t}`, "failed with:", n.errors),
                new Error("Failed to get notification icons."))
              );
            return n;
          });
        }
        static getSlidedownOptions(e) {
          return C.getValueOrDefault(e.slidedown, { prompts: [] });
        }
        static getFullscreenPermissionMessageOptions(e) {
          return e
            ? e.fullscreen
              ? {
                  autoAcceptTitle: e.fullscreen.autoAcceptTitle,
                  actionMessage: e.fullscreen.actionMessage,
                  exampleNotificationTitleDesktop: e.fullscreen.title,
                  exampleNotificationTitleMobile: e.fullscreen.title,
                  exampleNotificationMessageDesktop: e.fullscreen.message,
                  exampleNotificationMessageMobile: e.fullscreen.message,
                  exampleNotificationCaption: e.fullscreen.caption,
                  acceptButton: e.fullscreen.acceptButton,
                  cancelButton: e.fullscreen.cancelButton,
                }
              : e
            : null;
        }
        static getPromptOptionsQueryString() {
          let e = "";
          if (
            je.getFullscreenPermissionMessageOptions(
              OneSignal.config.userConfig.promptOptions
            )
          ) {
            const t = je.getPromptOptionsPostHash();
            for (const i of Object.keys(t)) {
              e += "&" + i + "=" + t[i];
            }
          }
          return e;
        }
        static getPromptOptionsPostHash() {
          const e = je.getFullscreenPermissionMessageOptions(
              OneSignal.config.userConfig.promptOptions
            ),
            t = {};
          if (e) {
            const i = {
              exampleNotificationTitleDesktop: "exampleNotificationTitle",
              exampleNotificationMessageDesktop: "exampleNotificationMessage",
              exampleNotificationTitleMobile: "exampleNotificationTitle",
              exampleNotificationMessageMobile: "exampleNotificationMessage",
            };
            for (const t of Object.keys(i)) {
              const n = i[t];
              e[t] && (e[n] = e[t]);
            }
            const n = [
              "autoAcceptTitle",
              "siteName",
              "autoAcceptTitle",
              "subscribeText",
              "showGraphic",
              "actionMessage",
              "exampleNotificationTitle",
              "exampleNotificationMessage",
              "exampleNotificationCaption",
              "acceptButton",
              "cancelButton",
              "timeout",
            ];
            for (let i = 0; i < n.length; i++) {
              const o = n[i],
                s = e[o],
                r = encodeURIComponent(s);
              (s || !1 === s || "" === s) && (t[o] = r);
            }
          }
          return t;
        }
        static getAppId() {
          return e(this, void 0, void 0, function* () {
            if (OneSignal.config.appId)
              return Promise.resolve(OneSignal.config.appId);
            return yield $.get("Ids", "appId");
          });
        }
        static getDeviceId() {
          return e(this, void 0, void 0, function* () {
            return (
              (yield OneSignal.database.getSubscription()).deviceId || void 0
            );
          });
        }
        static getCurrentPushToken() {
          return e(this, void 0, void 0, function* () {
            var e, t;
            if (p.useSafariLegacyPush()) {
              const i =
                null ===
                  (t =
                    null === (e = window.safari) || void 0 === e
                      ? void 0
                      : e.pushNotification) || void 0 === t
                  ? void 0
                  : t.permission(OneSignal.config.safariWebId).deviceToken;
              return (null == i ? void 0 : i.toLowerCase()) || void 0;
            }
            const i =
              yield OneSignal.context.serviceWorkerManager.getRegistration();
            if (!i) return;
            const n = yield i.pushManager.getSubscription();
            return null == n ? void 0 : n.endpoint;
          });
        }
      }
      class He {
        constructor(e, t, i, n) {
          (this.model = e),
            (this.property = t),
            (this.oldValue = i),
            (this.newValue = n);
        }
      }
      class Ke {
        constructor() {
          this.subscribers = new Set();
        }
        subscribe(e) {
          return this.subscribers.add(e), () => this.subscribers.delete(e);
        }
        broadcast(e) {
          this.subscribers.forEach((t) => {
            t(e);
          });
        }
      }
      !(function (e) {
        (e.Add = "add"),
          (e.Remove = "remove"),
          (e.Update = "update"),
          (e.Hydrate = "hydrate");
      })(Ve || (Ve = {}));
      class ze {
        constructor(e, t) {
          (this.modelId = e), (this.payload = t), (this.type = Ve.Update);
        }
      }
      class qe {
        constructor(e, t) {
          (this.modelId = e), (this.payload = t), (this.type = Ve.Hydrate);
        }
      }
      class Ge extends Ke {
        constructor(e, t, i) {
          super(),
            (this.modelName = e),
            (this.modelId =
              null != i ? i : Math.random().toString(36).substring(2)),
            (this.modelName = e),
            (this.data = t),
            (this.onesignalId = void 0),
            (this.awaitOneSignalIdAvailable = new Promise((e) => {
              this.onesignalIdAvailableCallback = e;
            }));
        }
        setOneSignalId(e) {
          var t;
          te("setOneSignalId", { onesignalId: e }),
            (this.onesignalId = e),
            e &&
              (null === (t = this.onesignalIdAvailableCallback) ||
                void 0 === t ||
                t.call(this, e));
        }
        set(e, t, i = !0) {
          let n;
          if (
            (te("set", { property: e, newValue: t }),
            this.data && ((n = this.data[e]), (this.data[e] = t)),
            i)
          ) {
            const i = new ze(this.modelId, new He(this, e, n, t));
            this.broadcast(i);
          }
        }
        hydrate(e) {
          te("hydrate", { data: e }),
            (this.data = e),
            this.broadcast(new qe(this.modelId, this));
        }
        encode() {
          const e = this.modelId,
            t = this.modelName,
            i = this.onesignalId;
          return Object.assign(
            { modelId: e, modelName: t, onesignalId: i },
            this.data
          );
        }
        static decode(e) {
          te("decode", { encodedModel: e });
          const { modelId: t, modelName: i, onesignalId: n } = e,
            o = (function (e, t) {
              var i = {};
              for (var n in e)
                Object.prototype.hasOwnProperty.call(e, n) &&
                  t.indexOf(n) < 0 &&
                  (i[n] = e[n]);
              if (
                null != e &&
                "function" == typeof Object.getOwnPropertySymbols
              ) {
                var o = 0;
                for (n = Object.getOwnPropertySymbols(e); o < n.length; o++)
                  t.indexOf(n[o]) < 0 &&
                    Object.prototype.propertyIsEnumerable.call(e, n[o]) &&
                    (i[n[o]] = e[n[o]]);
              }
              return i;
            })(e, ["modelId", "modelName", "onesignalId"]),
            s = new Ge(i, o, t);
          return s.setOneSignalId(n), s;
        }
      }
      function Je(e) {
        return (
          void 0 !== (null == e ? void 0 : e.type) &&
          void 0 !== (null == e ? void 0 : e.id)
        );
      }
      class Ye {
        static initializeUser(t) {
          return e(this, void 0, void 0, function* () {
            te("initializeUser", { isTemporary: t });
            const e = OneSignal.coreDirector.getIdentityModel(),
              i = OneSignal.coreDirector.getPropertiesModel();
            !e || !i
              ? (Ye.createUserPropertiesModel(),
                yield Ye.createAnonymousUser(t))
              : f.debug("User already exists, skipping initialization.");
          });
        }
        static resetUserMetaProperties() {
          const e = Qe.createOrGetInstance();
          (e.hasOneSignalId = !1),
            (e.awaitOneSignalIdAvailable = void 0),
            (e.isCreatingUser = !1);
        }
        static createAnonymousUser(t) {
          return e(this, void 0, void 0, function* () {
            let e;
            if (t) e = {};
            else {
              const t = yield Ye.createUserOnServer();
              if (!t) return;
              (e = t.identity), OneSignal.coreDirector.hydrateUser(t);
            }
            const i = new Ge(P.Identity, e);
            i.setOneSignalId(e.onesignal_id),
              OneSignal.coreDirector.add(P.Identity, i, !1),
              yield this.copyOneSignalIdPromiseFromIdentityModel();
          });
        }
        static createUserPropertiesModel() {
          const e = {
              language: p.getLanguage(),
              timezone_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
            },
            t = new Ge(P.Properties, e);
          return OneSignal.coreDirector.add(P.Properties, t, !1), t;
        }
        static createUserOnServer() {
          return e(this, void 0, void 0, function* () {
            const e = Qe.createOrGetInstance();
            if (!e.isCreatingUser) {
              e.isCreatingUser = !0;
              try {
                const t = yield je.getAppId(),
                  i = yield OneSignal.coreDirector.getPushSubscriptionModel();
                let n;
                Je(null == i ? void 0 : i.data) &&
                  (n = null == i ? void 0 : i.data.id);
                const o = yield Ye.getAllUserData(),
                  s = yield we.createUser({ appId: t, subscriptionId: n }, o);
                return (e.isCreatingUser = !1), s.result;
              } catch (e) {
                f.error(e);
              }
            }
          });
        }
        static createAndHydrateUser() {
          return e(this, void 0, void 0, function* () {
            const e = yield Ye.createUserOnServer();
            e && OneSignal.coreDirector.hydrateUser(e);
          });
        }
        static getAllUserData() {
          return e(this, void 0, void 0, function* () {
            te("LoginManager.getAllUserData");
            const e = OneSignal.coreDirector.getIdentityModel(),
              t = OneSignal.coreDirector.getPropertiesModel(),
              i = yield OneSignal.coreDirector.getAllSubscriptionsModels(),
              n = {};
            return (
              (n.identity = null == e ? void 0 : e.data),
              (n.properties = null == t ? void 0 : t.data),
              (n.subscriptions = null == i ? void 0 : i.map((e) => e.data)),
              n
            );
          });
        }
        static copyOneSignalIdPromiseFromIdentityModel() {
          return e(this, void 0, void 0, function* () {
            var e;
            const t = Qe.createOrGetInstance(),
              i = OneSignal.coreDirector.getIdentityModel();
            (t.awaitOneSignalIdAvailable =
              null == i ? void 0 : i.awaitOneSignalIdAvailable),
              null === (e = t.awaitOneSignalIdAvailable) ||
                void 0 === e ||
                e.then((e) => {
                  (t.hasOneSignalId = !0), (t.onesignalId = e);
                });
          });
        }
        static updateModelWithCurrentUserOneSignalId(t) {
          return e(this, void 0, void 0, function* () {
            const e = Qe.createOrGetInstance();
            yield e.awaitOneSignalIdAvailable, t.setOneSignalId(e.onesignalId);
          });
        }
      }
      class Qe {
        constructor() {
          (this.hasOneSignalId = !1), (this.isCreatingUser = !1);
        }
        static createOrGetInstance() {
          return (
            Qe.singletonInstance ||
              ((Qe.singletonInstance = new Qe()),
              Ye.initializeUser(!0)
                .then(() => {
                  Ye.copyOneSignalIdPromiseFromIdentityModel().catch((e) => {
                    console.error(e);
                  });
                })
                .catch((e) => {
                  console.error(e);
                })),
            Qe.singletonInstance
          );
        }
        addAlias(e, t) {
          if ((te("addAlias", { label: e, id: t }), "string" != typeof e))
            throw new InvalidArgumentError("label", o.WrongType);
          if ("string" != typeof t)
            throw new InvalidArgumentError("id", o.WrongType);
          if (!e) throw new InvalidArgumentError("label", o.Empty);
          if (!t) throw new InvalidArgumentError("id", o.Empty);
          this.addAliases({ [e]: t });
        }
        addAliases(t) {
          if (
            (te("addAliases", { aliases: t }),
            !t || 0 === Object.keys(t).length)
          )
            throw new InvalidArgumentError("aliases", o.Empty);
          Object.keys(t).forEach((t) =>
            e(this, void 0, void 0, function* () {
              if ("string" != typeof t)
                throw new InvalidArgumentError("label", o.WrongType);
            })
          ),
            Object.keys(t).forEach((i) =>
              e(this, void 0, void 0, function* () {
                const e = OneSignal.coreDirector.getIdentityModel();
                null == e || e.set(i, t[i]);
              })
            );
        }
        removeAlias(e) {
          if ((te("removeAlias", { label: e }), "string" != typeof e))
            throw new InvalidArgumentError("label", o.WrongType);
          if (!e) throw new InvalidArgumentError("label", o.Empty);
          this.removeAliases([e]);
        }
        removeAliases(t) {
          if ((te("removeAliases", { aliases: t }), !t || 0 === t.length))
            throw new InvalidArgumentError("aliases", o.Empty);
          t.forEach((t) =>
            e(this, void 0, void 0, function* () {
              const e = OneSignal.coreDirector.getIdentityModel();
              null == e || e.set(t, void 0);
            })
          );
        }
        addEmail(t) {
          return e(this, void 0, void 0, function* () {
            var e, i, n;
            if ((te("addEmail", { email: t }), "string" != typeof t))
              throw new InvalidArgumentError("email", o.WrongType);
            if (!t) throw new InvalidArgumentError("email", o.Empty);
            if (
              !(function (e) {
                return (
                  !!e &&
                  !!e.match(
                    /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/
                  )
                );
              })(t)
            )
              throw new InvalidArgumentError("email", o.Malformed);
            const s = { type: re.Email, token: t },
              r = new Ge(P.EmailSubscriptions, s);
            (null === (e = Qe.singletonInstance) || void 0 === e
              ? void 0
              : e.isCreatingUser) ||
            (null === (i = Qe.singletonInstance) || void 0 === i
              ? void 0
              : i.hasOneSignalId)
              ? (r.setOneSignalId(
                  null === (n = Qe.singletonInstance) || void 0 === n
                    ? void 0
                    : n.onesignalId
                ),
                OneSignal.coreDirector.add(P.EmailSubscriptions, r, !0))
              : (OneSignal.coreDirector.add(P.EmailSubscriptions, r, !1),
                yield Ye.createAndHydrateUser()),
              Ye.updateModelWithCurrentUserOneSignalId(r).catch((e) => {
                throw e;
              });
          });
        }
        addSms(t) {
          return e(this, void 0, void 0, function* () {
            var e, i, n;
            if ((te("addSms", { sms: t }), "string" != typeof t))
              throw new InvalidArgumentError("sms", o.WrongType);
            if (!t) throw new InvalidArgumentError("sms", o.Empty);
            const s = { type: re.SMS, token: t },
              r = new Ge(P.SmsSubscriptions, s);
            (null === (e = Qe.singletonInstance) || void 0 === e
              ? void 0
              : e.isCreatingUser) ||
            (null === (i = Qe.singletonInstance) || void 0 === i
              ? void 0
              : i.hasOneSignalId)
              ? (r.setOneSignalId(
                  null === (n = Qe.singletonInstance) || void 0 === n
                    ? void 0
                    : n.onesignalId
                ),
                OneSignal.coreDirector.add(P.SmsSubscriptions, r, !0))
              : (OneSignal.coreDirector.add(P.SmsSubscriptions, r, !1),
                yield Ye.createAndHydrateUser()),
              Ye.updateModelWithCurrentUserOneSignalId(r).catch((e) => {
                throw e;
              });
          });
        }
        removeEmail(t) {
          if ((te("removeEmail", { email: t }), "string" != typeof t))
            throw new InvalidArgumentError("email", o.WrongType);
          if (!t) throw new InvalidArgumentError("email", o.Empty);
          const i = OneSignal.coreDirector.getEmailSubscriptionModels();
          Object.keys(i).forEach((n) =>
            e(this, void 0, void 0, function* () {
              var e;
              (null === (e = i[n].data) || void 0 === e ? void 0 : e.token) ===
                t && OneSignal.coreDirector.remove(P.EmailSubscriptions, n);
            })
          );
        }
        removeSms(t) {
          if ((te("removeSms", { smsNumber: t }), "string" != typeof t))
            throw new InvalidArgumentError("smsNumber", o.WrongType);
          if (!t) throw new InvalidArgumentError("smsNumber", o.Empty);
          const i = OneSignal.coreDirector.getSmsSubscriptionModels();
          Object.keys(i).forEach((n) =>
            e(this, void 0, void 0, function* () {
              var e;
              (null === (e = i[n].data) || void 0 === e ? void 0 : e.token) ===
                t && OneSignal.coreDirector.remove(P.SmsSubscriptions, n);
            })
          );
        }
        addTag(e, t) {
          if ((te("addTag", { key: e, value: t }), "string" != typeof e))
            throw new InvalidArgumentError("key", o.WrongType);
          if ("string" != typeof t)
            throw new InvalidArgumentError("value", o.WrongType);
          if (!e) throw new InvalidArgumentError("key", o.Empty);
          if (!t)
            throw new InvalidArgumentError(
              "value",
              o.Empty,
              "Did you mean to call removeTag?"
            );
          this.addTags({ [e]: t });
        }
        addTags(e) {
          var t;
          if ((te("addTags", { tags: e }), "object" != typeof e))
            throw new InvalidArgumentError("tags", o.WrongType);
          if (!e) throw new InvalidArgumentError("tags", o.Empty);
          const i = OneSignal.coreDirector.getPropertiesModel();
          (e = Object.assign(
            Object.assign(
              {},
              null === (t = null == i ? void 0 : i.data) || void 0 === t
                ? void 0
                : t.tags
            ),
            e
          )),
            null == i || i.set("tags", e);
        }
        removeTag(e) {
          if ((te("removeTag", { tagKey: e }), "string" != typeof e))
            throw new InvalidArgumentError("tagKey", o.WrongType);
          if (void 0 === e) throw new InvalidArgumentError("tagKey", o.Empty);
          this.removeTags([e]);
        }
        removeTags(e) {
          var t;
          if ((te("removeTags", { tagKeys: e }), !e || 0 === e.length))
            throw new InvalidArgumentError("tagKeys", o.Empty);
          const i = OneSignal.coreDirector.getPropertiesModel(),
            n = JSON.parse(
              JSON.stringify(
                null === (t = null == i ? void 0 : i.data) || void 0 === t
                  ? void 0
                  : t.tags
              )
            );
          n &&
            (e.forEach((e) => {
              n[e] = "";
            }),
            null == i || i.set("tags", n));
        }
        getTags() {
          var e, t;
          return (
            te("getTags"),
            null ===
              (t =
                null === (e = OneSignal.coreDirector.getPropertiesModel()) ||
                void 0 === e
                  ? void 0
                  : e.data) || void 0 === t
              ? void 0
              : t.tags
          );
        }
      }
      Qe.singletonInstance = void 0;
      class Xe {
        static isValidUrl(e, t) {
          if (t && t.allowNull && null === e) return !0;
          if (t && t.allowEmpty && null == e) return !0;
          try {
            const i = new URL(e);
            return !t || !t.requireHttps || "https:" === i.protocol;
          } catch (e) {
            return !1;
          }
        }
        static isValidBoolean(e, t) {
          return !(!t || !t.allowNull || null !== e) || !0 === e || !1 === e;
        }
        static isValidArray(e, t) {
          return (
            !(!t || !t.allowNull || null !== e) ||
            !(!t || !t.allowEmpty || null != e) ||
            e instanceof Array
          );
        }
      }
      class Ze {}
      class et extends Ze {
        constructor(t, i, n) {
          super(),
            t && i
              ? ((this._optedIn = !i.optedOut),
                (this._permission = n),
                (this._token = i.subscriptionToken),
                OneSignal.coreDirector
                  .getPushSubscriptionModel()
                  .then((e) => {
                    e && Je(e.data) && (this._id = e.data.id);
                  })
                  .catch((e) => {
                    f.error(e);
                  }),
                OneSignal.emitter.on(
                  OneSignal.EVENTS.SUBSCRIPTION_CHANGED,
                  (t) =>
                    e(this, void 0, void 0, function* () {
                      (this._id = null == t ? void 0 : t.current.id),
                        (this._token = null == t ? void 0 : t.current.token);
                    })
                ),
                OneSignal.emitter.on(
                  OneSignal.EVENTS.NOTIFICATION_PERMISSION_CHANGED_AS_STRING,
                  (t) =>
                    e(this, void 0, void 0, function* () {
                      this._permission = t;
                    })
                ))
              : f.warn(
                  `PushSubscriptionNamespace: skipping initialization. One or more required params are falsy: initialize: ${t}, subscription: ${i}`
                );
        }
        get id() {
          return this._id;
        }
        get token() {
          return this._token;
        }
        get optedIn() {
          return !!this._optedIn && "granted" === this._permission;
        }
        optIn() {
          return e(this, void 0, void 0, function* () {
            te("optIn"), yield ee(), (this._optedIn = !0);
            "granted" ===
            (yield OneSignal.context.permissionManager.getPermissionStatus())
              ? yield this._enable(!0)
              : yield OneSignal.Notifications.requestPermission();
          });
        }
        optOut() {
          return e(this, void 0, void 0, function* () {
            te("optOut"),
              yield ee(),
              (this._optedIn = !1),
              yield this._enable(!1);
          });
        }
        addEventListener(e, t) {
          OneSignal.emitter.on(e, t);
        }
        removeEventListener(e, t) {
          OneSignal.emitter.off(e, t);
        }
        _enable(t) {
          return e(this, void 0, void 0, function* () {
            yield ee();
            const e = yield $.getAppConfig(),
              i = yield $.getSubscription();
            if (!e.appId) throw new InvalidStateError(Re.MissingAppId);
            if (!Xe.isValidBoolean(t))
              throw new InvalidArgumentError("enabled", o.Malformed);
            (i.optedOut = !t),
              yield $.setSubscription(i),
              it.onInternalSubscriptionSet(i.optedOut).catch((e) => {
                f.error(e);
              }),
              it.checkAndTriggerSubscriptionChanged().catch((e) => {
                f.error(e);
              });
          });
        }
      }
      class tt extends Ze {
        constructor(e, t, i) {
          super(),
            (this.PushSubscription = new et(!1)),
            e &&
              ((this._currentUser = Qe.createOrGetInstance()),
              (this.PushSubscription = new et(!0, t, i)));
        }
        get onesignalId() {
          var e;
          return null === (e = this._currentUser) || void 0 === e
            ? void 0
            : e.onesignalId;
        }
        get externalId() {
          var e;
          const t = OneSignal.coreDirector.getIdentityModel();
          return null === (e = null == t ? void 0 : t.data) || void 0 === e
            ? void 0
            : e.external_id;
        }
        addAlias(e, t) {
          var i;
          null === (i = this._currentUser) || void 0 === i || i.addAlias(e, t);
        }
        addAliases(e) {
          var t;
          null === (t = this._currentUser) || void 0 === t || t.addAliases(e);
        }
        removeAlias(e) {
          var t;
          null === (t = this._currentUser) || void 0 === t || t.removeAlias(e);
        }
        removeAliases(e) {
          var t;
          null === (t = this._currentUser) ||
            void 0 === t ||
            t.removeAliases(e);
        }
        addEmail(e) {
          var t;
          null === (t = this._currentUser) || void 0 === t || t.addEmail(e);
        }
        removeEmail(e) {
          var t;
          null === (t = this._currentUser) || void 0 === t || t.removeEmail(e);
        }
        addSms(e) {
          var t;
          null === (t = this._currentUser) || void 0 === t || t.addSms(e);
        }
        removeSms(e) {
          var t;
          null === (t = this._currentUser) || void 0 === t || t.removeSms(e);
        }
        addTag(e, t) {
          var i;
          null === (i = this._currentUser) || void 0 === i || i.addTag(e, t);
        }
        addTags(e) {
          var t;
          null === (t = this._currentUser) || void 0 === t || t.addTags(e);
        }
        removeTag(e) {
          var t;
          null === (t = this._currentUser) || void 0 === t || t.removeTag(e);
        }
        removeTags(e) {
          var t;
          null === (t = this._currentUser) || void 0 === t || t.removeTags(e);
        }
        getTags() {
          var e;
          return (
            (null === (e = this._currentUser) || void 0 === e
              ? void 0
              : e.getTags()) || {}
          );
        }
        addEventListener(e, t) {
          tt.emitter.on(e, t);
        }
        removeEventListener(e, t) {
          tt.emitter.on(e, t);
        }
      }
      tt.emitter = new k();
      class it {
        static onNotificationPermissionChange() {
          it.checkAndTriggerSubscriptionChanged();
        }
        static onInternalSubscriptionSet(t) {
          return e(this, void 0, void 0, function* () {
            Ue.put("subscription.optedOut", t);
          });
        }
        static checkAndTriggerSubscriptionChanged() {
          return e(this, void 0, void 0, function* () {
            var e;
            G.logMethodCall("checkAndTriggerSubscriptionChanged");
            const t = OneSignal.context,
              i =
                yield OneSignal.context.subscriptionManager.isPushNotificationsEnabled(),
              n = yield OneSignal.context.subscriptionManager.isOptedIn(),
              o = yield $.getAppState(),
              {
                lastKnownPushEnabled: s,
                lastKnownPushId: r,
                lastKnownPushToken: a,
                lastKnownOptedIn: c,
              } = o,
              d = yield je.getCurrentPushToken(),
              l = yield OneSignal.coreDirector.getPushSubscriptionModel(),
              u =
                null === (e = null == l ? void 0 : l.data) || void 0 === e
                  ? void 0
                  : e.id;
            if (!(null === s || i !== s || d !== a || u !== r)) return;
            yield t.subscriptionManager.updateNotificationTypes(),
              (o.lastKnownPushEnabled = i),
              (o.lastKnownPushToken = d),
              (o.lastKnownPushId = u),
              (o.lastKnownOptedIn = n),
              yield $.setAppState(o);
            const g = {
              previous: { id: r, token: a, optedIn: null == c || c },
              current: { id: u, token: d, optedIn: n },
            };
            f.info("Push Subscription state changed: ", g),
              it.triggerSubscriptionChanged(g);
          });
        }
        static _onSubscriptionChanged(t) {
          return e(this, void 0, void 0, function* () {
            var e, i, n;
            it.onSubscriptionChanged_showWelcomeNotification(
              null === (e = null == t ? void 0 : t.current) || void 0 === e
                ? void 0
                : e.optedIn,
              null === (i = null == t ? void 0 : t.current) || void 0 === i
                ? void 0
                : i.id
            ),
              it.onSubscriptionChanged_sendCategorySlidedownTags(
                null === (n = null == t ? void 0 : t.current) || void 0 === n
                  ? void 0
                  : n.optedIn
              ),
              it.onSubscriptionChanged_evaluateNotifyButtonDisplayPredicate(),
              it.onSubscriptionChanged_updateCustomLink();
          });
        }
        static onSubscriptionChanged_sendCategorySlidedownTags(t) {
          return e(this, void 0, void 0, function* () {
            var e, i;
            if (!0 !== t) return;
            const n =
              null ===
                (i =
                  null ===
                    (e =
                      OneSignal.context.appConfig.userConfig.promptOptions) ||
                  void 0 === e
                    ? void 0
                    : e.slidedown) || void 0 === i
                ? void 0
                : i.prompts;
            $e.isCategorySlidedownConfigured(n) &&
              (yield OneSignal.context.tagManager.sendTags());
          });
        }
        static onSubscriptionChanged_showWelcomeNotification(t, i) {
          return e(this, void 0, void 0, function* () {
            var e;
            if (OneSignal.__doNotShowWelcomeNotification)
              return void f.debug(
                "Not showing welcome notification because user has previously subscribed."
              );
            const n =
              null === (e = OneSignal.config) || void 0 === e
                ? void 0
                : e.userConfig.welcomeNotification;
            if (void 0 !== n && !0 === n.disable) return;
            if (!0 !== t) return;
            if (!i) return;
            const { appId: o } = yield $.getAppConfig();
            let s =
                void 0 !== n && void 0 !== n.title && null !== n.title
                  ? n.title
                  : "",
              r =
                void 0 !== n &&
                void 0 !== n.message &&
                null !== n.message &&
                n.message.length > 0
                  ? n.message
                  : "Thanks for subscribing!";
            const a = new URL(location.href).origin + "?_osp=do_not_open",
              c = n && n.url && n.url.length > 0 ? n.url : a;
            (s = Me.decodeHtmlEntities(s)),
              (r = Me.decodeHtmlEntities(r)),
              f.debug("Sending welcome notification."),
              Oe.sendNotification(
                o,
                [i],
                { en: s },
                { en: r },
                c,
                null,
                { __isOneSignalWelcomeNotification: !0 },
                void 0
              ),
              H.trigger(OneSignal.EVENTS.WELCOME_NOTIFICATION_SENT, {
                title: s,
                message: r,
                url: c,
              });
          });
        }
        static onSubscriptionChanged_evaluateNotifyButtonDisplayPredicate() {
          return e(this, void 0, void 0, function* () {
            if (!OneSignal.config.userConfig.notifyButton) return;
            const e = OneSignal.config.userConfig.notifyButton.displayPredicate;
            if (e && "function" == typeof e && OneSignal.notifyButton) {
              !1 !== (yield e())
                ? (f.debug(
                    "Showing notify button because display predicate returned true."
                  ),
                  OneSignal.notifyButton.launcher.show())
                : (f.debug(
                    "Hiding notify button because display predicate returned false."
                  ),
                  OneSignal.notifyButton.launcher.hide());
            }
          });
        }
        static onSubscriptionChanged_updateCustomLink() {
          return e(this, void 0, void 0, function* () {
            OneSignal.config.userConfig.promptOptions &&
              new De(
                OneSignal.config.userConfig.promptOptions.customlink
              ).initialize();
          });
        }
        static triggerSubscriptionChanged(e) {
          H.trigger(OneSignal.EVENTS.SUBSCRIPTION_CHANGED, e);
        }
        static triggerUserChanged(e) {
          H.trigger(OneSignal.EVENTS.SUBSCRIPTION_CHANGED, e, tt.emitter);
        }
        static triggerNotificationClick(e) {
          const t = { notification: e.notification, result: e.result };
          return H.trigger(OneSignal.EVENTS.NOTIFICATION_CLICKED, t);
        }
        static fireStoredNotificationClicks() {
          return e(this, void 0, void 0, function* () {
            yield ee();
            const t =
              OneSignal.config.pageUrl ||
              OneSignal.config.userConfig.pageUrl ||
              document.URL;
            function i(t) {
              return e(this, void 0, void 0, function* () {
                const e = yield $.getAppState();
                (e.pendingNotificationClickEvents[t.result.url] = null),
                  yield $.setAppState(e);
                const i = t.timestamp;
                if (i) {
                  if ((Date.now() - i) / 1e3 / 60 > 5) return;
                }
                it.triggerNotificationClick(t);
              });
            }
            const n = yield $.getAppState();
            if (
              "origin" ===
              (yield $.get("Options", "notificationClickHandlerMatch"))
            ) {
              for (const e of Object.keys(n.pendingNotificationClickEvents))
                if (new URL(e).origin === location.origin) {
                  const t = n.pendingNotificationClickEvents[e];
                  yield i(t);
                }
            } else {
              let e = n.pendingNotificationClickEvents[t];
              if (e) yield i(e);
              else if (!e && t.endsWith("/")) {
                const o = t.substring(0, t.length - 1);
                (e = n.pendingNotificationClickEvents[o]), e && (yield i(e));
              }
            }
          });
        }
        static checkAndTriggerUserChanged() {
          return e(this, void 0, void 0, function* () {
            var e;
            G.logMethodCall("checkAndTriggerUserChanged");
            const t = yield $.getUserState(),
              { previousOneSignalId: i, previousExternalId: n } = t,
              o = yield OneSignal.coreDirector.getIdentityModel(),
              s = null == o ? void 0 : o.onesignalId,
              r =
                null === (e = null == o ? void 0 : o.data) || void 0 === e
                  ? void 0
                  : e.external_id;
            if (!(s !== i || r !== n)) return;
            (t.previousOneSignalId = s),
              (t.previousExternalId = r),
              yield $.setUserState(t);
            const a = { current: { onesignalId: s, externalId: r } };
            f.info("User state changed: ", a), it.triggerUserChanged(a);
          });
        }
      }
      class nt {
        constructor(e, t) {
          (this.context = e), (this.config = t);
        }
        getRegistration() {
          return e(this, void 0, void 0, function* () {
            return yield h.getRegistration(
              this.config.registrationOptions.scope
            );
          });
        }
        getActiveState() {
          return e(this, void 0, void 0, function* () {
            const e = yield this.context.serviceWorkerManager.getRegistration();
            if (!e) return Pe.None;
            const t = nt.activeSwFileName(e);
            return this.swActiveStateByFileName(t);
          });
        }
        static activeSwFileName(e) {
          const t = h.getAvailableServiceWorker(e);
          if (!t) return null;
          const i = new URL(t.scriptURL).pathname,
            n = new I(i).getFileName();
          if ("akam-sw.js" == n) {
            const e = new URLSearchParams(new URL(t.scriptURL).search).get(
              "othersw"
            );
            if (e)
              return (
                f.debug(
                  "Found a ServiceWorker under Akamai's akam-sw.js?othersw=",
                  e
                ),
                new I(new URL(e).pathname).getFileName()
              );
          }
          return n;
        }
        swActiveStateByFileName(e) {
          if (!e) return Pe.None;
          return e == this.config.workerPath.getFileName() ||
            "OneSignalSDK.sw.js" == e
            ? Pe.OneSignalWorker
            : Pe.ThirdParty;
        }
        getWorkerVersion() {
          return e(this, void 0, void 0, function* () {
            return new Promise((t) =>
              e(this, void 0, void 0, function* () {
                this.context.workerMessenger.once(c.WorkerVersion, (e) => {
                  t(e);
                }),
                  yield this.context.workerMessenger.unicast(c.WorkerVersion);
              })
            );
          });
        }
        shouldInstallWorker() {
          return e(this, void 0, void 0, function* () {
            if (!p.supportsServiceWorkers()) return !1;
            if (!OneSignal.config) return !1;
            const e = yield this.getActiveState();
            if (
              (f.debug("[shouldInstallWorker] workerState", e),
              e === Pe.None || e === Pe.ThirdParty)
            ) {
              const e =
                "granted" ===
                (yield OneSignal.context.permissionManager.getNotificationPermission(
                  OneSignal.config.safariWebId
                ));
              return (
                e &&
                  f.info(
                    "[shouldInstallWorker] Notification Permissions enabled, will install ServiceWorker"
                  ),
                e
              );
            }
            return (
              !!(yield this.haveParamsChanged()) || this.workerNeedsUpdate()
            );
          });
        }
        haveParamsChanged() {
          return e(this, void 0, void 0, function* () {
            const e = yield this.context.serviceWorkerManager.getRegistration();
            if (!e)
              return (
                f.info(
                  "[changedServiceWorkerParams] workerRegistration not found at scope",
                  this.config.registrationOptions.scope
                ),
                !0
              );
            const t = new URL(e.scope).pathname,
              i = this.config.registrationOptions.scope;
            if (t != i)
              return (
                f.info(
                  "[changedServiceWorkerParams] ServiceWorker scope changing",
                  { a_old: t, b_new: i }
                ),
                !0
              );
            const n = h.getAvailableServiceWorker(e),
              o = ke.getServiceWorkerHref(
                this.config,
                this.context.appConfig.appId,
                p.version()
              );
            return (
              !(null == n ? void 0 : n.scriptURL) ||
              (o !== n.scriptURL &&
                (f.info(
                  "[changedServiceWorkerParams] ServiceWorker href changing:",
                  { a_old: null == n ? void 0 : n.scriptURL, b_new: o }
                ),
                !0))
            );
          });
        }
        workerNeedsUpdate() {
          return e(this, void 0, void 0, function* () {
            let e;
            f.info(
              "[Service Worker Update] Checking service worker version..."
            );
            try {
              e = yield x.timeoutPromise(this.getWorkerVersion(), 2e3);
            } catch (e) {
              return (
                f.info(
                  "[Service Worker Update] Worker did not reply to version query; assuming older version and updating."
                ),
                !0
              );
            }
            return e !== p.version()
              ? (f.info(
                  `[Service Worker Update] Updating service worker from ${e} --\x3e ${p.version()}.`
                ),
                !0)
              : (f.info(
                  `[Service Worker Update] Service worker version is current at ${e} (no update required).`
                ),
                !1);
          });
        }
        establishServiceWorkerChannel() {
          return e(this, void 0, void 0, function* () {
            f.debug("establishServiceWorkerChannel");
            const t = this.context.workerMessenger;
            t.off(),
              t.on(c.NotificationWillDisplay, (t) =>
                e(this, void 0, void 0, function* () {
                  f.debug(
                    location.origin,
                    "Received notification display event from service worker."
                  );
                  const e = {
                    notification: t.notification,
                    preventDefault: function () {
                      throw new Error(
                        "Browser does not support preventing display."
                      );
                    },
                  };
                  yield H.trigger(
                    OneSignal.EVENTS.NOTIFICATION_WILL_DISPLAY,
                    e
                  );
                })
              ),
              t.on(c.NotificationClicked, (t) =>
                e(this, void 0, void 0, function* () {
                  if (
                    0 ===
                    OneSignal.emitter.numberOfListeners(
                      OneSignal.EVENTS.NOTIFICATION_CLICKED
                    )
                  ) {
                    f.debug(
                      "notification.clicked event received, but no event listeners; storing event in IndexedDb for later retrieval."
                    );
                    let e = t.result.url;
                    e || (e = location.href),
                      yield $.putNotificationClickedEventPendingUrlOpening(t);
                  } else yield it.triggerNotificationClick(t);
                })
              ),
              t.on(c.NotificationDismissed, (t) =>
                e(this, void 0, void 0, function* () {
                  yield H.trigger(OneSignal.EVENTS.NOTIFICATION_DISMISSED, t);
                })
              );
            const i = G.isSafari();
            t.on(c.AreYouVisible, (n) =>
              e(this, void 0, void 0, function* () {
                if (i) {
                  const e = {
                    timestamp: n.timestamp,
                    focused: document.hasFocus(),
                  };
                  yield t.directPostMessageToSW(c.AreYouVisibleResponse, e);
                }
              })
            );
          });
        }
        installWorker() {
          return e(this, void 0, void 0, function* () {
            if (!(yield this.shouldInstallWorker()))
              return this.getRegistration();
            f.info("Installing worker...");
            (yield this.getActiveState()) === Pe.ThirdParty &&
              f.info(
                "[Service Worker Installation] 3rd party service worker detected."
              );
            const e = ke.getServiceWorkerHref(
                this.config,
                this.context.appConfig.appId,
                p.version()
              ),
              t = `${G.getBaseUrl()}${this.config.registrationOptions.scope}`;
            let i;
            f.info(
              `[Service Worker Installation] Installing service worker ${e} ${t}.`
            );
            try {
              i = yield navigator.serviceWorker.register(e, { scope: t });
            } catch (e) {
              f.error(
                `[Service Worker Installation] Installing service worker failed ${e}`
              ),
                (i = yield this.fallbackToUserModelBetaWorker());
            }
            return (
              f.debug(
                "[Service Worker Installation] Service worker installed. Waiting for activation"
              ),
              yield h.waitUntilActive(i),
              f.debug("[Service Worker Installation] Service worker active"),
              yield this.establishServiceWorkerChannel(),
              i
            );
          });
        }
        fallbackToUserModelBetaWorker() {
          return e(this, void 0, void 0, function* () {
            const e = "OneSignalSDK.sw.js",
              t = {
                workerPath: new I(`/${e}`),
                registrationOptions: this.config.registrationOptions,
              },
              i = ke.getServiceWorkerHref(
                t,
                this.context.appConfig.appId,
                p.version()
              ),
              n = `${G.getBaseUrl()}${this.config.registrationOptions.scope}`;
            f.info(
              `[Service Worker Installation] Attempting to install v16 Beta Worker ${i} ${n}.`
            );
            try {
              const t = yield navigator.serviceWorker.register(i, { scope: n }),
                o = `\n        [Service Worker Installation] Successfully installed v16 Beta Worker.\n        Deprecation warning: support for the v16 beta worker name of ${e}\n        will be removed May 5 2024. We have decided to keep the v15 name.\n        To avoid breaking changes for your users, please host both worker files:\n        OneSignalSDK.sw.js & OneSignalSDKWorker.js.\n      `;
              return f.error(o), t;
            } catch (e) {
              const t = yield fetch(i);
              if (403 === t.status || 404 === t.status)
                throw new z(t.status, t.statusText);
              throw e;
            }
          });
        }
      }
      !(function (e) {
        (e.Default = "default"), (e.Granted = "granted"), (e.Denied = "denied");
      })(Le || (Le = {}));
      class ot extends s {
        constructor() {
          super("This code is not implemented yet."),
            Object.setPrototypeOf(this, ot.prototype);
        }
      }
      !(function (e) {
        (e[(e.Blocked = 0)] = "Blocked"),
          (e[(e.Dismissed = 1)] = "Dismissed"),
          (e[(e.Default = 2)] = "Default");
      })(Be || (Be = {}));
      class PushPermissionNotGrantedError extends s {
        constructor(e) {
          let t;
          switch (e) {
            case Be.Dismissed:
              t = "The user dismissed the permission prompt.";
              break;
            case Be.Blocked:
              t = "Notification permissions are blocked.";
              break;
            case Be.Default:
              t = "Notification permissions have not been granted yet.";
          }
          super(t),
            (this.reason = e),
            Object.setPrototypeOf(
              this,
              PushPermissionNotGrantedError.prototype
            );
        }
      }
      !(function (e) {
        (e[(e.InvalidSafariSetup = 0)] = "InvalidSafariSetup"),
          (e[(e.Blocked = 1)] = "Blocked"),
          (e[(e.Dismissed = 2)] = "Dismissed");
      })(Fe || (Fe = {}));
      class st extends s {
        constructor(e) {
          let t;
          switch (e) {
            case Fe.InvalidSafariSetup:
              t =
                "The Safari site URL, icon size, or push certificate is invalid, or Safari is in a private session.";
              break;
            case Fe.Blocked:
              t = "Notification permissions are blocked.";
              break;
            case Fe.Dismissed:
              t = "The notification permission prompt was dismissed.";
          }
          super(t), Object.setPrototypeOf(this, st.prototype);
        }
      }
      class rt {
        static setFromW3cSubscription(e) {
          const t = new rt();
          if (e && ((t.w3cEndpoint = new URL(e.endpoint)), e.getKey)) {
            let i = null;
            try {
              i = e.getKey("p256dh");
            } catch (e) {}
            let n = null;
            try {
              n = e.getKey("auth");
            } catch (e) {}
            if (i) {
              const e = btoa(
                String.fromCharCode.apply(null, new Uint8Array(i))
              );
              t.w3cP256dh = e;
            }
            if (n) {
              const e = btoa(
                String.fromCharCode.apply(null, new Uint8Array(n))
              );
              t.w3cAuth = e;
            }
          }
          return t;
        }
        setFromSafariSubscription(e) {
          e && (this.safariDeviceToken = e);
        }
        serialize() {
          return {
            w3cEndpoint: this.w3cEndpoint ? this.w3cEndpoint.toString() : null,
            w3cP256dh: this.w3cP256dh,
            w3cAuth: this.w3cAuth,
            safariDeviceToken: this.safariDeviceToken,
          };
        }
        static deserialize(e) {
          const t = new rt();
          if (!e) return t;
          try {
            t.w3cEndpoint = new URL(e.w3cEndpoint);
          } catch (e) {}
          return (
            (t.w3cP256dh = e.w3cP256dh),
            (t.w3cAuth = e.w3cAuth),
            (t.safariDeviceToken = e.safariDeviceToken),
            t
          );
        }
      }
      class at {
        constructor(e, t) {
          (this.safariPermissionPromptFailed = !1),
            (this.context = e),
            (this.config = t);
        }
        isPushNotificationsEnabled() {
          return e(this, void 0, void 0, function* () {
            const e = yield this.getSubscriptionState();
            return e.subscribed && !e.optedOut;
          });
        }
        isOptedIn() {
          return e(this, void 0, void 0, function* () {
            const e = yield this.getSubscriptionState();
            return (
              "granted" ===
                (yield OneSignal.context.permissionManager.getPermissionStatus()) &&
              !e.optedOut
            );
          });
        }
        isOptedOut(t) {
          return e(this, void 0, void 0, function* () {
            te("isOptedOut", t);
            const { optedOut: e } = yield $.getSubscription();
            return (
              (function (e, ...t) {
                if (e) e.apply(null, t);
              })(t, e),
              e
            );
          });
        }
        subscribe(t) {
          return e(this, void 0, void 0, function* () {
            let e;
            switch (a.getWindowEnv()) {
              case n.ServiceWorker:
                e = yield this.subscribeFcmFromWorker(t);
                break;
              case n.Host:
                if (
                  (yield OneSignal.context.permissionManager.getPermissionStatus()) ===
                  Le.Denied
                )
                  throw new PushPermissionNotGrantedError(Be.Blocked);
                if (p.useSafariLegacyPush()) {
                  (e = yield this.subscribeSafari()),
                    yield this._updatePushSubscriptionModelWithRawSubscription(
                      e
                    ),
                    f.info("Installing SW on Safari");
                  try {
                    yield this.context.serviceWorkerManager.installWorker(),
                      f.info("SW on Safari successfully installed");
                  } catch (e) {
                    f.error("SW on Safari failed to install.");
                  }
                } else
                  (e = yield this.subscribeFcmFromPage(t)),
                    yield this._updatePushSubscriptionModelWithRawSubscription(
                      e
                    );
                break;
              default:
                throw new InvalidStateError(Re.UnsupportedEnvironment);
            }
            return e;
          });
        }
        _updatePushSubscriptionModelWithRawSubscription(t) {
          return e(this, void 0, void 0, function* () {
            const e = yield OneSignal.coreDirector.getPushSubscriptionModel();
            if (!e)
              return (
                OneSignal.coreDirector.generatePushSubscriptionModel(t),
                void (yield Ye.createAndHydrateUser())
              );
            {
              const i = new ge(t).serialize(),
                n = Object.keys(i);
              for (let t = 0; t < n.length; t++) {
                const o = n[t];
                i[o] && e.set(o, i[o]);
              }
            }
          });
        }
        updateNotificationTypes() {
          return e(this, void 0, void 0, function* () {
            const e = yield this.getNotificationTypes();
            yield this.updatePushSubscriptionNotificationTypes(e);
          });
        }
        getNotificationTypes() {
          return e(this, void 0, void 0, function* () {
            const { optedOut: e } = yield $.getSubscription();
            if (e) return ce.UserOptedOut;
            return "granted" ===
              (yield OneSignal.context.permissionManager.getPermissionStatus())
              ? ce.Subscribed
              : ce.NoNativePermission;
          });
        }
        updatePushSubscriptionNotificationTypes(t) {
          return e(this, void 0, void 0, function* () {
            const e = yield OneSignal.coreDirector.getPushSubscriptionModel();
            e
              ? (e.set("notification_types", t),
                e.set("enabled", t === ce.Subscribed))
              : f.info(
                  "No Push Subscription yet to update notification_types."
                );
          });
        }
        registerSubscription(t, i) {
          return e(this, void 0, void 0, function* () {
            t && (t = rt.deserialize(t)),
              (yield this.isAlreadyRegisteredWithOneSignal())
                ? yield this.context.updateManager.sendPushDeviceRecordUpdate()
                : this.context.sessionManager.upsertSession(U.UserCreate);
            const e = yield $.getSubscription();
            return (
              (e.deviceId = "99999999-9999-9999-9999-999999999999"),
              (e.optedOut = !1),
              t
                ? p.useSafariLegacyPush()
                  ? (e.subscriptionToken = t.safariDeviceToken)
                  : (e.subscriptionToken = t.w3cEndpoint
                      ? t.w3cEndpoint.toString()
                      : null)
                : (e.subscriptionToken = null),
              yield $.setSubscription(e),
              a.getWindowEnv() !== n.ServiceWorker &&
                H.trigger(OneSignal.EVENTS.REGISTERED),
              "undefined" != typeof OneSignal &&
                (OneSignal._sessionInitAlreadyRunning = !1),
              e
            );
          });
        }
        static requestPresubscribeNotificationPermission() {
          return e(this, void 0, void 0, function* () {
            return yield at.requestNotificationPermission();
          });
        }
        unsubscribe(t) {
          return e(this, void 0, void 0, function* () {
            if (0 === t) throw new ot();
            if (1 !== t) throw new ot();
            if (a.getWindowEnv() !== n.ServiceWorker) throw new ot();
            yield $.put("Options", { key: "optedOut", value: !0 });
          });
        }
        static requestNotificationPermission() {
          return e(this, void 0, void 0, function* () {
            const e = yield window.Notification.requestPermission();
            return Le[e];
          });
        }
        isAlreadyRegisteredWithOneSignal() {
          return e(this, void 0, void 0, function* () {
            const { deviceId: e } = yield $.getSubscription();
            return !!e;
          });
        }
        subscribeSafariPromptPermission() {
          return e(this, void 0, void 0, function* () {
            const e = (e) =>
              new Promise((t) => {
                window.safari.pushNotification.requestPermission(
                  e,
                  this.config.safariWebId,
                  { app_id: this.config.appId },
                  (e) => {
                    e && e.deviceToken
                      ? t(e.deviceToken.toLowerCase())
                      : t(null);
                  }
                );
              });
            return this.safariPermissionPromptFailed
              ? e(`${a.getOneSignalApiUrl().toString()}/safari`)
              : e(
                  `${a.getOneSignalApiUrl().toString()}/safari/apps/${this.config.appId}`
                );
          });
        }
        subscribeSafari() {
          return e(this, void 0, void 0, function* () {
            const e = new rt();
            if (!this.config.safariWebId)
              throw new SdkInitError(ye.MissingSafariWebId);
            const { deviceToken: t } =
              window.safari.pushNotification.permission(
                this.config.safariWebId
              );
            if (t) return e.setFromSafariSubscription(t.toLowerCase()), e;
            H.trigger(OneSignal.EVENTS.PERMISSION_PROMPT_DISPLAYED);
            const i = yield this.subscribeSafariPromptPermission();
            if ((Z.triggerNotificationPermissionChanged(), !i))
              throw (
                ((this.safariPermissionPromptFailed = !0),
                new st(Fe.InvalidSafariSetup))
              );
            return e.setFromSafariSubscription(i), e;
          });
        }
        subscribeFcmFromPage(t) {
          return e(this, void 0, void 0, function* () {
            if (
              a.getWindowEnv() === n.Host &&
              Notification.permission === Le.Default
            ) {
              yield H.trigger(OneSignal.EVENTS.PERMISSION_PROMPT_DISPLAYED);
              const e = yield at.requestPresubscribeNotificationPermission(),
                t = e === Le.Default;
              switch ((yield Z.triggerNotificationPermissionChanged(t), e)) {
                case Le.Default:
                  throw (
                    (f.debug(
                      "Exiting subscription and not registering worker because the permission was dismissed."
                    ),
                    (OneSignal._sessionInitAlreadyRunning = !1),
                    new PushPermissionNotGrantedError(Be.Dismissed))
                  );
                case Le.Denied:
                  throw (
                    (f.debug(
                      "Exiting subscription and not registering worker because the permission was blocked."
                    ),
                    (OneSignal._sessionInitAlreadyRunning = !1),
                    new PushPermissionNotGrantedError(Be.Blocked))
                  );
              }
            }
            let e;
            try {
              e = yield this.context.serviceWorkerManager.installWorker();
            } catch (e) {
              throw (
                (e instanceof z &&
                  (403 === e.status
                    ? yield this.context.subscriptionManager.registerFailedSubscription(
                        ce.ServiceWorkerStatus403,
                        this.context
                      )
                    : 404 === e.status &&
                      (yield this.context.subscriptionManager.registerFailedSubscription(
                        ce.ServiceWorkerStatus404,
                        this.context
                      ))),
                e)
              );
            }
            if (!e) throw new Error("OneSignal service worker not found!");
            return (
              f.debug(
                "[Subscription Manager] Service worker is ready to continue subscribing."
              ),
              yield this.subscribeWithVapidKey(e.pushManager, t)
            );
          });
        }
        subscribeFcmFromWorker(t) {
          return e(this, void 0, void 0, function* () {
            const e = self.registration;
            if (!e.active && "firefox" !== u().name)
              throw new InvalidStateError(Re.ServiceWorkerNotActivated);
            const i = yield e.pushManager.permissionState({
              userVisibleOnly: !0,
            });
            if ("denied" === i)
              throw new PushPermissionNotGrantedError(Be.Blocked);
            if ("prompt" === i)
              throw new PushPermissionNotGrantedError(Be.Default);
            return yield this.subscribeWithVapidKey(e.pushManager, t);
          });
        }
        getVapidKeyForBrowser() {
          let e;
          return (
            (e =
              "firefox" === u().name
                ? this.config.onesignalVapidPublicKey
                : this.config.vapidPublicKey),
            e
              ? (function (e) {
                  const t = (e + "=".repeat((4 - (e.length % 4)) % 4))
                      .replace(/-/g, "+")
                      .replace(/_/g, "/"),
                    i = atob(t),
                    n = new Uint8Array(i.length);
                  for (let e = 0; e < i.length; ++e) n[e] = i.charCodeAt(e);
                  return n;
                })(e).buffer
              : void 0
          );
        }
        subscribeWithVapidKey(t, i) {
          return e(this, void 0, void 0, function* () {
            const e = yield t.getSubscription();
            switch (i) {
              case 0:
                if (!e) break;
                e.options
                  ? f.debug(
                      "[Subscription Manager] An existing push subscription exists and it's options is not null."
                    )
                  : (f.debug(
                      "[Subscription Manager] An existing push subscription exists and options is null. Unsubscribing from push first now."
                    ),
                    yield at.doPushUnsubscribe(e));
                break;
              case 1:
                e && (yield at.doPushUnsubscribe(e));
            }
            const [n, o] = yield at.doPushSubscribe(
              t,
              this.getVapidKeyForBrowser()
            );
            yield at.updateSubscriptionTime(o, n.expirationTime);
            return rt.setFromW3cSubscription(n);
          });
        }
        static updateSubscriptionTime(t, i) {
          return e(this, void 0, void 0, function* () {
            const e = yield $.getSubscription();
            t && (e.createdAt = new Date().getTime()),
              (e.expirationTime = i),
              yield $.setSubscription(e);
          });
        }
        static doPushUnsubscribe(t) {
          return e(this, void 0, void 0, function* () {
            f.debug(
              "[Subscription Manager] Unsubscribing existing push subscription."
            );
            const e = yield t.unsubscribe();
            return (
              f.debug(
                `[Subscription Manager] Unsubscribing existing push subscription result: ${e}`
              ),
              e
            );
          });
        }
        static doPushSubscribe(t, i) {
          return e(this, void 0, void 0, function* () {
            if (!i)
              throw new Error(
                "Missing required 'applicationServerKey' to subscribe for push notifications!"
              );
            const e = { userVisibleOnly: !0, applicationServerKey: i };
            f.debug(
              "[Subscription Manager] Subscribing to web push with these options:",
              e
            );
            try {
              const i = yield t.getSubscription();
              return [yield t.subscribe(e), !i];
            } catch (i) {
              if ("InvalidStateError" == i.name) {
                f.warn(
                  "[Subscription Manager] Couldn't re-subscribe due to applicationServerKey changing, unsubscribe and attempting to subscribe with new key.",
                  i
                );
                const n = yield t.getSubscription();
                return (
                  n && (yield at.doPushUnsubscribe(n)),
                  [yield t.subscribe(e), !0]
                );
              }
              throw i;
            }
          });
        }
        isSubscriptionExpiring() {
          return e(this, void 0, void 0, function* () {
            if (
              (yield this.context.serviceWorkerManager.getActiveState()) !==
              Pe.OneSignalWorker
            )
              return !1;
            const e = yield this.context.serviceWorkerManager.getRegistration();
            if (!e) return !1;
            if (!e.pushManager) return !1;
            const t = yield e.pushManager.getSubscription();
            if (!t) return !1;
            if (!t.expirationTime) return !1;
            let { createdAt: i } = yield $.getSubscription();
            if (!i) {
              const e = 31536e6;
              i = new Date().getTime() + e;
            }
            const n = i + (t.expirationTime - i) / 2;
            return (
              !!t.expirationTime &&
              (new Date().getTime() >= t.expirationTime ||
                new Date().getTime() >= n)
            );
          });
        }
        getSubscriptionState() {
          return e(this, void 0, void 0, function* () {
            if (a.getWindowEnv() === n.ServiceWorker) {
              const e = yield self.registration.pushManager.getSubscription(),
                { optedOut: t } = yield $.getSubscription();
              return { subscribed: !!e, optedOut: !!t };
            }
            return this.getSubscriptionStateFromBrowserContext();
          });
        }
        getSubscriptionStateFromBrowserContext() {
          return e(this, void 0, void 0, function* () {
            var e, t;
            const { optedOut: i, subscriptionToken: n } =
                yield $.getSubscription(),
              o = yield OneSignal.coreDirector.getPushSubscriptionModel(),
              s =
                Je(null == o ? void 0 : o.data) &&
                !!(null == o ? void 0 : o.onesignalId);
            if (p.useSafariLegacyPush()) {
              const o =
                null ===
                  (t =
                    null === (e = window.safari) || void 0 === e
                      ? void 0
                      : e.pushNotification) || void 0 === t
                  ? void 0
                  : t.permission(this.config.safariWebId);
              return {
                subscribed: !!(
                  s &&
                  n &&
                  "granted" === (null == o ? void 0 : o.permission) &&
                  (null == o ? void 0 : o.deviceToken)
                ),
                optedOut: !!i,
              };
            }
            const r = yield this.context.serviceWorkerManager.getActiveState(),
              a = yield this.context.serviceWorkerManager.getRegistration(),
              c =
                yield this.context.permissionManager.getNotificationPermission(
                  this.context.appConfig.safariWebId
                ),
              d = r === Pe.OneSignalWorker;
            if (!a) return { subscribed: !1, optedOut: !!i };
            return {
              subscribed: !!(s && n && c === Le.Granted && d),
              optedOut: !!i,
            };
          });
        }
        registerFailedSubscription(t, i) {
          return e(this, void 0, void 0, function* () {
            i.pageViewManager.isFirstPageView() &&
              (i.subscriptionManager.registerSubscription(new rt(), t),
              i.pageViewManager.incrementPageViewCount());
          });
        }
      }
      const ct = class {
        static getServiceWorkerManager(e) {
          const t = e.appConfig,
            i = {
              workerPath: new I("OneSignalSDKWorker.js"),
              registrationOptions: { scope: "/" },
            };
          return (
            t.userConfig &&
              (t.userConfig.path &&
                (i.workerPath = new I(
                  `${t.userConfig.path}${t.userConfig.serviceWorkerPath}`
                )),
              t.userConfig.serviceWorkerParam &&
                (i.registrationOptions = t.userConfig.serviceWorkerParam)),
            new nt(e, i)
          );
        }
        static getSubscriptionManager(e) {
          const t = e.appConfig,
            i = {
              safariWebId: t.safariWebId,
              appId: t.appId,
              vapidPublicKey: t.vapidPublicKey,
              onesignalVapidPublicKey: t.onesignalVapidPublicKey,
            };
          return new at(e, i);
        }
      };
      class dt {
        constructor(e) {
          (this.context = e),
            (this.onSessionSent = e.pageViewManager.getPageViewCount() > 1);
        }
        sendPushDeviceRecordUpdate() {
          return e(this, void 0, void 0, function* () {
            var e;
            (
              null === (e = Qe.singletonInstance) || void 0 === e
                ? void 0
                : e.hasOneSignalId
            )
              ? this.onSessionSent || (yield this.sendOnSessionUpdate())
              : f.debug(
                  "Not sending the update because user is not registered with OneSignal (no onesignal_id)"
                );
          });
        }
        sendOnSessionUpdate() {
          return e(this, void 0, void 0, function* () {
            var e;
            if (this.onSessionSent) return;
            if (!this.context.pageViewManager.isFirstPageView()) return;
            if (
              !(yield this.context.subscriptionManager.isAlreadyRegisteredWithOneSignal())
            )
              return void f.debug(
                "Not sending the on session because user is not registered with OneSignal (no device id)"
              );
            const t = yield OneSignal.coreDirector.getPushSubscriptionModel();
            if (
              (null == t ? void 0 : t.data.notification_types) ===
                ce.Subscribed ||
              !0 ===
                (null === (e = OneSignal.config) || void 0 === e
                  ? void 0
                  : e.enableOnSession)
            )
              try {
                this.context.sessionManager.upsertSession(U.UserNewSession),
                  (this.onSessionSent = !0);
              } catch (e) {
                f.error(
                  `Failed to update user session. Error "${e.message}" ${e.stack}`
                );
              }
          });
        }
        sendOutcomeDirect(t, i, n, o) {
          return e(this, void 0, void 0, function* () {
            te("sendOutcomeDirect");
            const e = yield OneSignal.coreDirector.getPushSubscriptionModel();
            if (e && Je(null == e ? void 0 : e.data)) {
              const s = {
                id: n,
                app_id: t,
                notification_ids: i,
                direct: !0,
                subscription: { id: e.data.id, type: ge.getSubscriptionType() },
              };
              return (
                void 0 !== o && (s.weight = o), void (yield Oe.sendOutcome(s))
              );
            }
            f.warn(
              "Send outcome aborted because pushSubscriptionModel is not available."
            );
          });
        }
        sendOutcomeInfluenced(t, i, n, o) {
          return e(this, void 0, void 0, function* () {
            te("sendOutcomeInfluenced");
            const e = yield OneSignal.coreDirector.getPushSubscriptionModel();
            if (e && Je(null == e ? void 0 : e.data)) {
              const s = {
                id: n,
                app_id: t,
                notification_ids: i,
                direct: !1,
                subscription: { id: e.data.id, type: ge.getSubscriptionType() },
              };
              return (
                void 0 !== o && (s.weight = o), void (yield Oe.sendOutcome(s))
              );
            }
            f.warn(
              "Send outcome aborted because pushSubscriptionModel is not available."
            );
          });
        }
        sendOutcomeUnattributed(t, i, n) {
          return e(this, void 0, void 0, function* () {
            te("sendOutcomeUnattributed");
            const e = yield OneSignal.coreDirector.getPushSubscriptionModel();
            if (e && Je(null == e ? void 0 : e.data)) {
              const o = {
                id: i,
                app_id: t,
                subscription: { id: e.data.id, type: ge.getSubscriptionType() },
              };
              return (
                void 0 !== n && (o.weight = n), void (yield Oe.sendOutcome(o))
              );
            }
            f.warn(
              "Send outcome aborted because pushSubscriptionModel is not available."
            );
          });
        }
      }
      class lt {
        upsertSession(t) {
          return e(this, void 0, void 0, function* () {});
        }
        setupSessionEventListeners() {
          return e(this, void 0, void 0, function* () {});
        }
      }
      class ut {
        constructor(e) {
          (this.appConfig = e),
            (this.subscriptionManager = ct.getSubscriptionManager(this)),
            (this.serviceWorkerManager = ct.getServiceWorkerManager(this)),
            (this.pageViewManager = new w()),
            (this.sessionManager = new lt()),
            (this.permissionManager = new O()),
            (this.workerMessenger = new m(this)),
            (this.updateManager = new dt(this));
        }
      }
      const gt = 30,
        pt = !1,
        ft = !0,
        ht = { pageViews: 1, timeDelay: 0 },
        vt =
          "We'd like to show you notifications for the latest news and updates.",
        mt = "Allow",
        bt = "Cancel",
        St = {
          updateMessage:
            "Update your push notification subscription preferences.",
          positiveUpdateButton: "Save Preferences",
          negativeUpdateButton: "Cancel",
        },
        yt = "Thank You!",
        wt = {
          type: We.Push,
          text: { actionMessage: vt, acceptButton: mt, cancelButton: bt },
          autoPrompt: !1,
          delay: ht,
        };
      class Ot {
        static convertTagsApiToBooleans(e) {
          const t = {};
          return (
            Object.keys(e).forEach((i) => {
              t[i] = "1" === e[i];
            }),
            t
          );
        }
        static convertTagsBooleansToApi(e) {
          const t = {};
          return (
            Object.keys(e).forEach((i) => {
              t[i] = !0 === e[i] ? "1" : "0";
            }),
            t
          );
        }
        static getObjectDifference(e, t) {
          const i = {};
          return (
            Object.keys(e).forEach((n) => {
              t[n] !== e[n] && (i[n] = e[n]);
            }),
            i
          );
        }
        static markAllTagsAsSpecified(e, t) {
          e.forEach((e) => {
            e.checked = t;
          });
        }
        static isTagObjectEmpty(e) {
          return 0 === Object.keys(e).length;
        }
        static getCheckedTagCategories(e, t) {
          if (!t) return e;
          if (Ot.isTagObjectEmpty(t)) {
            const t = oe(e);
            return Ot.markAllTagsAsSpecified(t, !0), t;
          }
          return oe(e).map((e) => {
            const i = t[e.tag];
            return (e.checked = Ot.getCheckedStatusForTagValue(i)), e;
          });
        }
        static getCheckedStatusForTagValue(e) {
          return void 0 === e || e;
        }
        static limitCategoriesToMaxCount(e, t) {
          let i = oe(e);
          return (i = e.slice(0, t)), i;
        }
      }
      class It {
        static upgradeConfigToVersionTwo(e) {
          var t, i, n;
          It.isPromptOptionsVersion0(e.promptOptions) &&
            (e.promptOptions = It.convertConfigToVersionOne(e.promptOptions)),
            It.isSlidedownConfigVersion1(
              null === (t = e.promptOptions) || void 0 === t
                ? void 0
                : t.slidedown
            ) &&
              (null === (i = e.promptOptions) || void 0 === i
                ? void 0
                : i.slidedown) &&
              (e.promptOptions.slidedown = It.convertConfigToVersionTwo(
                null === (n = e.promptOptions) || void 0 === n
                  ? void 0
                  : n.slidedown
              ));
        }
        static convertConfigToVersionOne(e) {
          e.slidedown || (e.slidedown = {});
          const {
              acceptButtonText: t,
              cancelButtonText: i,
              actionMessage: n,
            } = e.slidedown,
            o = e.acceptButtonText || e.acceptButton,
            s = e.cancelButtonText || e.cancelButton;
          return (
            (e.slidedown.acceptButtonText = t || o),
            (e.slidedown.cancelButtonText = i || s),
            (e.slidedown.actionMessage = n || e.actionMessage),
            e
          );
        }
        static convertConfigToVersionTwo(e) {
          var t, i, n, o;
          const s = $e.isCategorySlidedownConfiguredVersion1(e)
            ? We.Category
            : We.Push;
          let r, a;
          s === We.Category &&
            ((r =
              null === (t = e.categories) || void 0 === t
                ? void 0
                : t.positiveUpdateButton),
            (a =
              null === (i = e.categories) || void 0 === i
                ? void 0
                : i.negativeUpdateButton));
          return {
            prompts: [
              ...(e.prompts || []),
              {
                type: s,
                autoPrompt: e.autoPrompt,
                text: {
                  actionMessage: e.actionMessage,
                  acceptButton: e.acceptButton || e.acceptButtonText,
                  cancelButton: e.cancelButton || e.cancelButtonText,
                  positiveUpdateButton: r,
                  negativeUpdateButton: a,
                  updateMessage:
                    null === (n = null == e ? void 0 : e.categories) ||
                    void 0 === n
                      ? void 0
                      : n.updateMessage,
                },
                delay: { pageViews: e.pageViews, timeDelay: e.timeDelay },
                categories:
                  null === (o = null == e ? void 0 : e.categories) ||
                  void 0 === o
                    ? void 0
                    : o.tags,
              },
            ],
          };
        }
        static isPromptOptionsVersion0(e) {
          if (e) {
            const t = ["acceptButtonText", "cancelButtonText", "actionMessage"];
            for (let i = 0; i < t.length; i++)
              if (e.hasOwnProperty(t[i])) return !0;
          }
          return !1;
        }
        static isSlidedownConfigVersion1(e) {
          if (e) {
            const t = [
              "enabled",
              "autoPrompt",
              "pageViews",
              "timeDelay",
              "acceptButton",
              "acceptButtonText",
              "cancelButton",
              "cancelButtonText",
              "actionMessage",
              "customizeTextEnabled",
              "categories",
            ];
            for (let i = 0; i < t.length; i++)
              if (e.hasOwnProperty(t[i])) return !0;
          }
          return !1;
        }
      }
      var kt, Pt, xt, Ct;
      !(function (e) {
        (e.TypicalSite = "typical"),
          (e.WordPress = "wordpress"),
          (e.Shopify = "shopify"),
          (e.Blogger = "blogger"),
          (e.Magento = "magento"),
          (e.Drupal = "drupal"),
          (e.SquareSpace = "squarespace"),
          (e.Joomla = "joomla"),
          (e.Weebly = "weebly"),
          (e.Wix = "wix"),
          (e.Custom = "custom");
      })(kt || (kt = {})),
        (function (e) {
          (e.Exact = "exact"), (e.Origin = "origin");
        })(Pt || (Pt = {})),
        (function (e) {
          (e.Navigate = "navigate"), (e.Focus = "focus");
        })(xt || (xt = {})),
        (function (e) {
          (e[(e.Dashboard = 0)] = "Dashboard"),
            (e[(e.JavaScript = 1)] = "JavaScript");
        })(Ct || (Ct = {}));
      class Nt {
        static getAppConfig(t, i) {
          return e(this, void 0, void 0, function* () {
            try {
              if (!t || !t.appId || !G.isValidUuid(t.appId))
                throw new SdkInitError(ye.InvalidAppId);
              const e = yield i(t.appId);
              It.upgradeConfigToVersionTwo(t);
              const n = this.getMergedConfig(t, e);
              return (
                this.checkUnsupportedSubdomain(n),
                this.checkRestrictedOrigin(n),
                n
              );
            } catch (e) {
              if (e) {
                if (1 === e.code) throw new SdkInitError(ye.InvalidAppId);
                if (2 === e.code)
                  throw new SdkInitError(ye.AppNotConfiguredForWebPush);
              }
              throw e;
            }
          });
        }
        static checkUnsupportedSubdomain(e) {
          const t = !window.isSecureContext;
          if (e.hasUnsupportedSubdomain || t)
            throw t
              ? new Error(
                  "OneSignalSDK: HTTP sites are no longer supported starting with version 16 (User Model), your public site must start with https://. Please visit the OneSignal dashboard's Settings > Web Configuration to find this option."
                )
              : new Error(
                  'OneSignalSDK: The "My site is not fully HTTPS" option is no longer supported starting with version 16 (User Model) of the OneSignal SDK. Please visit the OneSignal dashboard\'s Settings > Web Configuration to find this option.'
                );
        }
        static checkRestrictedOrigin(e) {
          if (
            e.restrictedOriginEnabled &&
            a.getWindowEnv() === n.Host &&
            !this.doesCurrentOriginMatchConfigOrigin(e.origin)
          )
            throw new SdkInitError(ye.WrongSiteUrl, { siteUrl: e.origin });
        }
        static doesCurrentOriginMatchConfigOrigin(e) {
          try {
            return location.origin === new URL(e).origin;
          } catch (e) {
            return !1;
          }
        }
        static getIntegrationCapabilities(e) {
          switch (e) {
            case kt.Custom:
            case kt.WordPress:
              return { configuration: Ct.JavaScript };
            default:
              return { configuration: Ct.Dashboard };
          }
        }
        static getMergedConfig(e, t) {
          const i = this.getConfigIntegrationKind(t),
            n = this.hasUnsupportedSubdomainForConfigIntegrationKind(i, e, t),
            o = this.getUserConfigForConfigIntegrationKind(i, e, t);
          return {
            appId: t.app_id,
            hasUnsupportedSubdomain: n,
            siteName: t.config.siteInfo.name,
            origin: t.config.origin,
            restrictedOriginEnabled:
              t.features.restrict_origin && t.features.restrict_origin.enable,
            safariWebId: t.config.safari_web_id,
            vapidPublicKey: t.config.vapid_public_key,
            onesignalVapidPublicKey: t.config.onesignal_vapid_public_key,
            userConfig: o,
            enableOnSession: C.valueOrDefault(t.features.enable_on_session, pt),
            sessionThreshold: C.valueOrDefault(
              t.features.session_threshold,
              gt
            ),
            enableSessionDuration: C.valueOrDefault(
              t.features.web_on_focus_enabled,
              ft
            ),
          };
        }
        static getConfigIntegrationKind(e) {
          return e.config.integration ? e.config.integration.kind : kt.Custom;
        }
        static getCustomLinkConfig(e) {
          const t = {
            enabled: !1,
            style: "button",
            size: "medium",
            unsubscribeEnabled: !1,
            text: { explanation: "", subscribe: "", unsubscribe: "" },
            color: { button: "", text: "" },
          };
          if (
            !(
              e &&
              e.config &&
              e.config.staticPrompts &&
              e.config.staticPrompts.customlink &&
              e.config.staticPrompts.customlink.enabled
            )
          )
            return t;
          const i = e.config.staticPrompts.customlink;
          return {
            enabled: i.enabled,
            style: i.style,
            size: i.size,
            unsubscribeEnabled: i.unsubscribeEnabled,
            text: i.text
              ? {
                  subscribe: i.text.subscribe,
                  unsubscribe: i.text.unsubscribe,
                  explanation: i.text.explanation,
                }
              : t.text,
            color: i.color
              ? { button: i.color.button, text: i.color.text }
              : t.color,
          };
        }
        static injectDefaultsIntoPromptOptions(e, t, i) {
          var n, o;
          let s = { enabled: !1 };
          e && e.customlink && (s = e.customlink);
          const r = t.customlink,
            a = Object.assign(Object.assign({}, e), {
              customlink: {
                enabled: C.getValueOrDefault(s.enabled, r.enabled),
                style: C.getValueOrDefault(s.style, r.style),
                size: C.getValueOrDefault(s.size, r.size),
                unsubscribeEnabled: C.getValueOrDefault(
                  s.unsubscribeEnabled,
                  r.unsubscribeEnabled
                ),
                text: {
                  subscribe: C.getValueOrDefault(
                    s.text ? s.text.subscribe : void 0,
                    r.text.subscribe
                  ),
                  unsubscribe: C.getValueOrDefault(
                    s.text ? s.text.unsubscribe : void 0,
                    r.text.unsubscribe
                  ),
                  explanation: C.getValueOrDefault(
                    s.text ? s.text.explanation : void 0,
                    r.text.explanation
                  ),
                },
                color: {
                  button: C.getValueOrDefault(
                    s.color ? s.color.button : void 0,
                    r.color.button
                  ),
                  text: C.getValueOrDefault(
                    s.color ? s.color.text : void 0,
                    r.color.text
                  ),
                },
              },
            });
          return (
            a.slidedown
              ? (a.slidedown.prompts =
                  null ===
                    (o =
                      null === (n = a.slidedown) || void 0 === n
                        ? void 0
                        : n.prompts) || void 0 === o
                    ? void 0
                    : o.map((e) => {
                        var t, i, n, o, s, r, a, c, d;
                        if (
                          ((e.type = C.getValueOrDefault(e.type, We.Push)),
                          e.type === We.Category &&
                            (e.text = Object.assign(Object.assign({}, e.text), {
                              positiveUpdateButton: C.getValueOrDefault(
                                null === (t = e.text) || void 0 === t
                                  ? void 0
                                  : t.positiveUpdateButton,
                                St.positiveUpdateButton
                              ),
                              negativeUpdateButton: C.getValueOrDefault(
                                null === (i = e.text) || void 0 === i
                                  ? void 0
                                  : i.negativeUpdateButton,
                                St.negativeUpdateButton
                              ),
                              updateMessage: C.getValueOrDefault(
                                null === (n = e.text) || void 0 === n
                                  ? void 0
                                  : n.updateMessage,
                                St.updateMessage
                              ),
                            })),
                          (e.text = Object.assign(Object.assign({}, e.text), {
                            actionMessage: C.getValueOrDefault(
                              null === (o = e.text) || void 0 === o
                                ? void 0
                                : o.actionMessage,
                              vt
                            ),
                            acceptButton: C.getValueOrDefault(
                              null === (s = e.text) || void 0 === s
                                ? void 0
                                : s.acceptButton,
                              mt
                            ),
                            cancelButton: C.getValueOrDefault(
                              null === (r = e.text) || void 0 === r
                                ? void 0
                                : r.cancelButton,
                              bt
                            ),
                            confirmMessage: C.getValueOrDefault(
                              null === (a = e.text) || void 0 === a
                                ? void 0
                                : a.confirmMessage,
                              yt
                            ),
                          })),
                          (e.autoPrompt = C.getValueOrDefault(
                            e.autoPrompt,
                            !0
                          )),
                          (e.delay = {
                            pageViews: C.getValueOrDefault(
                              null === (c = e.delay) || void 0 === c
                                ? void 0
                                : c.pageViews,
                              ht.pageViews
                            ),
                            timeDelay: C.getValueOrDefault(
                              null === (d = e.delay) || void 0 === d
                                ? void 0
                                : d.timeDelay,
                              ht.timeDelay
                            ),
                          }),
                          e.categories)
                        ) {
                          const { categories: t } = e;
                          e.categories = Ot.limitCategoriesToMaxCount(t, 10);
                        }
                        return e;
                      }))
              : ((a.slidedown = { prompts: [] }), (a.slidedown.prompts = [wt])),
            a.native
              ? ((a.native.enabled = !!a.native.enabled),
                (a.native.autoPrompt = a.native.hasOwnProperty("autoPrompt")
                  ? !!a.native.enabled && !!a.native.autoPrompt
                  : !!a.native.enabled),
                (a.native.pageViews = C.getValueOrDefault(
                  a.native.pageViews,
                  ht.pageViews
                )),
                (a.native.timeDelay = C.getValueOrDefault(
                  a.native.timeDelay,
                  ht.timeDelay
                )))
              : (a.native = {
                  enabled: !1,
                  autoPrompt: !1,
                  pageViews: ht.pageViews,
                  timeDelay: ht.timeDelay,
                }),
            !0 === i.autoRegister &&
              ((a.native.enabled = !0), (a.native.autoPrompt = !0)),
            (a.autoPrompt =
              a.native.autoPrompt ||
              $e.isSlidedownAutoPromptConfigured(a.slidedown.prompts)),
            a
          );
        }
        static getPromptOptionsForDashboardConfiguration(e) {
          const t = e.config.staticPrompts,
            i = t.native
              ? {
                  enabled: t.native.enabled,
                  autoPrompt: t.native.enabled && !1 !== t.native.autoPrompt,
                  pageViews: C.getValueOrDefault(
                    t.native.pageViews,
                    ht.pageViews
                  ),
                  timeDelay: C.getValueOrDefault(
                    t.native.timeDelay,
                    ht.timeDelay
                  ),
                }
              : {
                  enabled: !1,
                  autoPrompt: !1,
                  pageViews: ht.pageViews,
                  timeDelay: ht.timeDelay,
                },
            { prompts: n } = t.slidedown;
          return {
            autoPrompt: i.autoPrompt || $e.isSlidedownAutoPromptConfigured(n),
            native: i,
            slidedown: { prompts: n },
            fullscreen: {
              enabled: t.fullscreen.enabled,
              actionMessage: t.fullscreen.actionMessage,
              acceptButton: t.fullscreen.acceptButton,
              cancelButton: t.fullscreen.cancelButton,
              title: t.fullscreen.title,
              message: t.fullscreen.message,
              caption: t.fullscreen.caption,
              autoAcceptTitle: t.fullscreen.autoAcceptTitle,
            },
            customlink: this.getCustomLinkConfig(e),
          };
        }
        static getUserConfigForConfigIntegrationKind(e, t, i) {
          switch (this.getIntegrationCapabilities(e).configuration) {
            case Ct.Dashboard:
              return {
                appId: i.app_id,
                autoRegister: !1,
                autoResubscribe: i.config.autoResubscribe,
                path: i.config.serviceWorker.path,
                serviceWorkerPath: i.config.serviceWorker.workerName,
                serviceWorkerParam: {
                  scope: i.config.serviceWorker.registrationScope,
                },
                subdomainName: i.config.siteInfo.proxyOrigin,
                promptOptions:
                  this.getPromptOptionsForDashboardConfiguration(i),
                welcomeNotification: {
                  disable: !i.config.welcomeNotification.enable,
                  title: i.config.welcomeNotification.title,
                  message: i.config.welcomeNotification.message,
                  url: i.config.welcomeNotification.url,
                },
                notifyButton: {
                  enable: i.config.staticPrompts.bell.enabled,
                  displayPredicate: i.config.staticPrompts.bell
                    .hideWhenSubscribed
                    ? () => !OneSignal.User.PushSubscription.optedIn
                    : null,
                  size: i.config.staticPrompts.bell.size,
                  position: i.config.staticPrompts.bell.location,
                  showCredit: !1,
                  offset: {
                    bottom: `${i.config.staticPrompts.bell.offset.bottom}px`,
                    left: `${i.config.staticPrompts.bell.offset.left}px`,
                    right: `${i.config.staticPrompts.bell.offset.right}px`,
                  },
                  colors: {
                    "circle.background": i.config.staticPrompts.bell.color.main,
                    "circle.foreground":
                      i.config.staticPrompts.bell.color.accent,
                    "badge.background": "black",
                    "badge.foreground": "white",
                    "badge.bordercolor": "black",
                    "pulse.color": i.config.staticPrompts.bell.color.accent,
                    "dialog.button.background.hovering":
                      i.config.staticPrompts.bell.color.main,
                    "dialog.button.background.active":
                      i.config.staticPrompts.bell.color.main,
                    "dialog.button.background":
                      i.config.staticPrompts.bell.color.main,
                    "dialog.button.foreground": "white",
                  },
                  text: {
                    "tip.state.unsubscribed":
                      i.config.staticPrompts.bell.tooltip.unsubscribed,
                    "tip.state.subscribed":
                      i.config.staticPrompts.bell.tooltip.subscribed,
                    "tip.state.blocked":
                      i.config.staticPrompts.bell.tooltip.blocked,
                    "message.prenotify":
                      i.config.staticPrompts.bell.tooltip.unsubscribed,
                    "message.action.subscribing":
                      i.config.staticPrompts.bell.message.subscribing,
                    "message.action.subscribed":
                      i.config.staticPrompts.bell.message.subscribing,
                    "message.action.resubscribed":
                      i.config.staticPrompts.bell.message.subscribing,
                    "message.action.unsubscribed":
                      i.config.staticPrompts.bell.message.unsubscribing,
                    "dialog.main.title":
                      i.config.staticPrompts.bell.dialog.main.title,
                    "dialog.main.button.subscribe":
                      i.config.staticPrompts.bell.dialog.main.subscribeButton,
                    "dialog.main.button.unsubscribe":
                      i.config.staticPrompts.bell.dialog.main.unsubscribeButton,
                    "dialog.blocked.title":
                      i.config.staticPrompts.bell.dialog.blocked.title,
                    "dialog.blocked.message":
                      i.config.staticPrompts.bell.dialog.blocked.message,
                  },
                },
                persistNotification: i.config.notificationBehavior
                  ? i.config.notificationBehavior.display.persist
                  : void 0,
                webhooks: {
                  cors: i.config.webhooks.corsEnable,
                  "notification.willDisplay":
                    i.config.webhooks.notificationWillDisplayHook,
                  "notification.clicked":
                    i.config.webhooks.notificationClickedHook,
                  "notification.dismissed":
                    i.config.webhooks.notificationDismissedHook,
                },
                notificationClickHandlerMatch: i.config.notificationBehavior
                  ? i.config.notificationBehavior.click.match
                  : void 0,
                notificationClickHandlerAction: i.config.notificationBehavior
                  ? i.config.notificationBehavior.click.action
                  : void 0,
                allowLocalhostAsSecureOrigin: i.config.setupBehavior
                  ? i.config.setupBehavior.allowLocalhostAsSecureOrigin
                  : void 0,
                outcomes: {
                  direct: i.config.outcomes.direct,
                  indirect: {
                    enabled: i.config.outcomes.indirect.enabled,
                    influencedTimePeriodMin:
                      i.config.outcomes.indirect.notification_attribution
                        .minutes_since_displayed,
                    influencedNotificationsLimit:
                      i.config.outcomes.indirect.notification_attribution.limit,
                  },
                  unattributed: i.config.outcomes.unattributed,
                },
              };
            case Ct.JavaScript: {
              const e = { scope: "/" },
                n = "OneSignalSDKWorker.js",
                o = Object.assign(
                  Object.assign(
                    Object.assign(Object.assign({}, t), {
                      promptOptions: this.injectDefaultsIntoPromptOptions(
                        t.promptOptions,
                        i.config.staticPrompts,
                        t
                      ),
                    }),
                    {
                      serviceWorkerParam: t.serviceWorkerParam
                        ? t.serviceWorkerParam
                        : e,
                      serviceWorkerPath: t.serviceWorkerPath
                        ? t.serviceWorkerPath
                        : n,
                      path: t.path ? t.path : "/",
                    }
                  ),
                  {
                    outcomes: {
                      direct: i.config.outcomes.direct,
                      indirect: {
                        enabled: i.config.outcomes.indirect.enabled,
                        influencedTimePeriodMin:
                          i.config.outcomes.indirect.notification_attribution
                            .minutes_since_displayed,
                        influencedNotificationsLimit:
                          i.config.outcomes.indirect.notification_attribution
                            .limit,
                      },
                      unattributed: i.config.outcomes.unattributed,
                    },
                  }
                );
              return (
                t.hasOwnProperty("autoResubscribe")
                  ? (o.autoResubscribe = !!t.autoResubscribe)
                  : t.hasOwnProperty("autoRegister")
                    ? (o.autoResubscribe = !!t.autoRegister)
                    : (o.autoResubscribe = !!i.config.autoResubscribe),
                o
              );
            }
          }
        }
        static hasUnsupportedSubdomainForConfigIntegrationKind(e, t, i) {
          switch (this.getIntegrationCapabilities(e).configuration) {
            case Ct.Dashboard:
              return i.config.siteInfo.proxyOriginEnabled;
            case Ct.JavaScript:
              return !!t.subdomainName;
          }
        }
      }
      class Tt {
        static toOSNotification(e) {
          return {
            notificationId: e.custom.i,
            title: e.title,
            body: e.alert,
            additionalData: e.custom.a,
            launchURL: e.custom.u,
            confirmDelivery: "y" === e.custom.rr,
            icon: e.icon,
            image: e.image,
            actionButtons: this.convertButtons(e.o),
            topic: e.tag,
            badgeIcon: e.badge,
          };
        }
        static convertButtons(e) {
          return null == e
            ? void 0
            : e.map((e) => ({
                actionId: e.i,
                text: e.n,
                icon: e.p,
                launchURL: e.u,
              }));
        }
        static isValid(e) {
          var t;
          return (
            "string" ==
            typeof (null === (t = null == e ? void 0 : e.custom) || void 0 === t
              ? void 0
              : t.i)
          );
        }
      }
      class Et {
        send(t) {
          return e(this, void 0, void 0, function* () {
            const e = yield $.get("Options", `webhooks.${t.event}`);
            if (!e) return;
            const i = yield $.get("Options", "webhooks.cors"),
              n = { method: "post", mode: "no-cors", body: JSON.stringify(t) };
            i &&
              ((n.mode = "cors"),
              (n.headers = {
                "X-OneSignal-Event": t.event,
                "Content-Type": "application/json",
              })),
              J.debug(
                `Executing ${t.event} webhook ${i ? "with" : "without"} CORS POST ${e}`,
                t
              ),
              yield fetch(e, n);
          });
        }
      }
      class At {
        constructor(e) {
          this.event = "notification.clicked";
          const t = e.notification;
          (this.notificationId = t.notificationId),
            (this.heading = t.title),
            (this.content = t.body),
            (this.additionalData = t.additionalData),
            (this.actionId = e.result.actionId);
        }
      }
      class Dt {
        constructor(e) {
          (this.event = "notification.willDisplay"),
            (this.notificationId = e.notificationId),
            (this.heading = e.title),
            (this.content = e.body),
            (this.additionalData = e.additionalData);
        }
      }
      class Ut {
        constructor(e) {
          (this.event = "notification.dismiss"),
            (this.notificationId = e.notificationId),
            (this.heading = e.title),
            (this.content = e.body),
            (this.additionalData = e.additionalData);
        }
      }
      class Mt {
        constructor(e = new Et()) {
          this.sender = e;
        }
        click(t) {
          return e(this, void 0, void 0, function* () {
            return yield this.sender.send(new At(t));
          });
        }
        willDisplay(t) {
          return e(this, void 0, void 0, function* () {
            return yield this.sender.send(new Dt(t));
          });
        }
        dismiss(t) {
          return e(this, void 0, void 0, function* () {
            return yield this.sender.send(new Ut(t));
          });
        }
      }
      class Wt {
        static toNative(e) {
          return null == e
            ? void 0
            : e.map((e) => ({
                action: e.actionId,
                title: e.text,
                icon: e.icon,
              }));
        }
      }
      class _t {
        static getPushSubscriptionIdByToken(t) {
          return e(this, void 0, void 0, function* () {
            const e = yield $.getAll(P.PushSubscriptions);
            for (const i of e) if (i.token === t) return i.id;
          });
        }
      }
      class Rt {
        static get VERSION() {
          return p.version();
        }
        static get environment() {
          return p;
        }
        static get log() {
          return J;
        }
        static get database() {
          return $;
        }
        static get webhookNotificationEventSender() {
          return new Mt();
        }
        static getPushSubscriptionId() {
          return e(this, void 0, void 0, function* () {
            const e = yield self.registration.pushManager.getSubscription(),
              t = null == e ? void 0 : e.endpoint;
            if (t) return _t.getPushSubscriptionIdByToken(t);
          });
        }
        static get workerMessenger() {
          return (
            self.workerMessenger || (self.workerMessenger = new m()),
            self.workerMessenger
          );
        }
        static run() {
          self.addEventListener("activate", Rt.onServiceWorkerActivated),
            self.addEventListener("push", Rt.onPushReceived),
            self.addEventListener("notificationclose", Rt.onNotificationClosed),
            self.addEventListener("notificationclick", (e) =>
              e.waitUntil(Rt.onNotificationClicked(e))
            ),
            self.addEventListener("pushsubscriptionchange", (e) => {
              e.waitUntil(Rt.onPushSubscriptionChange(e));
            }),
            self.addEventListener("message", (e) => {
              const t = e.data;
              if (!t || !t.command) return;
              const i = t.payload;
              switch (t.command) {
                case c.SessionUpsert:
                  J.debug("[Service Worker] Received SessionUpsert", i),
                    Rt.debounceRefreshSession(e, i);
                  break;
                case c.SessionDeactivate:
                  J.debug("[Service Worker] Received SessionDeactivate", i),
                    Rt.debounceRefreshSession(e, i);
                  break;
                default:
                  return;
              }
            }),
            J.debug("Setting up message listeners."),
            Rt.workerMessenger.listen(),
            Rt.setupMessageListeners();
        }
        static getAppId() {
          return e(this, void 0, void 0, function* () {
            if (self.location.search) {
              const e = self.location.search.match(/appId=([0-9a-z-]+)&?/i);
              if (e && e.length > 1) {
                return e[1];
              }
            }
            const { appId: e } = yield $.getAppConfig();
            return e;
          });
        }
        static setupMessageListeners() {
          Rt.workerMessenger.on(c.WorkerVersion, (e) => {
            J.debug("[Service Worker] Received worker version message."),
              Rt.workerMessenger.broadcast(c.WorkerVersion, p.version());
          }),
            Rt.workerMessenger.on(c.Subscribe, (t) =>
              e(this, void 0, void 0, function* () {
                const e = t;
                J.debug("[Service Worker] Received subscribe message.");
                const i = new ut(e),
                  n = yield i.subscriptionManager.subscribe(0),
                  o = yield i.subscriptionManager.registerSubscription(n);
                Rt.workerMessenger.broadcast(c.Subscribe, o.serialize());
              })
            ),
            Rt.workerMessenger.on(c.SubscribeNew, (t) =>
              e(this, void 0, void 0, function* () {
                const e = t;
                J.debug("[Service Worker] Received subscribe new message.");
                const i = new ut(e),
                  n = yield i.subscriptionManager.subscribe(1),
                  o = yield i.subscriptionManager.registerSubscription(n);
                Rt.workerMessenger.broadcast(c.SubscribeNew, o.serialize());
              })
            ),
            Rt.workerMessenger.on(c.AmpSubscriptionState, (t) =>
              e(this, void 0, void 0, function* () {
                J.debug(
                  "[Service Worker] Received AMP subscription state message."
                );
                const e = yield self.registration.pushManager.getSubscription();
                if (e) {
                  const t = yield self.registration.pushManager.permissionState(
                      e.options
                    ),
                    { optedOut: i } = yield $.getSubscription(),
                    n = !!e && "granted" === t && !0 !== i;
                  yield Rt.workerMessenger.broadcast(c.AmpSubscriptionState, n);
                } else
                  yield Rt.workerMessenger.broadcast(
                    c.AmpSubscriptionState,
                    !1
                  );
              })
            ),
            Rt.workerMessenger.on(c.AmpSubscribe, () =>
              e(this, void 0, void 0, function* () {
                J.debug("[Service Worker] Received AMP subscribe message.");
                const e = yield Rt.getAppId(),
                  t = yield Nt.getAppConfig(
                    { appId: e },
                    Ie.downloadServerAppConfig
                  ),
                  i = new ut(t),
                  n = yield i.subscriptionManager.subscribe(0),
                  o = yield i.subscriptionManager.registerSubscription(n);
                yield $.put("Ids", { type: "appId", id: e }),
                  Rt.workerMessenger.broadcast(c.AmpSubscribe, o.deviceId);
              })
            ),
            Rt.workerMessenger.on(c.AmpUnsubscribe, () =>
              e(this, void 0, void 0, function* () {
                J.debug("[Service Worker] Received AMP unsubscribe message.");
                const e = yield Rt.getAppId(),
                  t = yield Nt.getAppConfig(
                    { appId: e },
                    Ie.downloadServerAppConfig
                  ),
                  i = new ut(t);
                yield i.subscriptionManager.unsubscribe(1),
                  Rt.workerMessenger.broadcast(c.AmpUnsubscribe, null);
              })
            ),
            Rt.workerMessenger.on(c.AreYouVisibleResponse, (t) =>
              e(this, void 0, void 0, function* () {
                if (
                  (J.debug(
                    "[Service Worker] Received response for AreYouVisible",
                    t
                  ),
                  !self.clientsStatus)
                )
                  return;
                const e = t.timestamp;
                self.clientsStatus.timestamp === e &&
                  (self.clientsStatus.receivedResponsesCount++,
                  t.focused && (self.clientsStatus.hasAnyActiveSessions = !0));
              })
            ),
            Rt.workerMessenger.on(c.SetLogging, (t) =>
              e(this, void 0, void 0, function* () {
                t.shouldLog ? (self.shouldLog = !0) : (self.shouldLog = void 0);
              })
            );
        }
        static onPushReceived(t) {
          J.debug(`Called onPushReceived(${JSON.stringify(t, null, 4)}):`, t),
            t.waitUntil(
              Rt.parseOrFetchNotifications(t)
                .then((t) =>
                  e(this, void 0, void 0, function* () {
                    const i = [],
                      n = [],
                      o = yield Rt.getAppId();
                    for (const s of t) {
                      J.debug("Raw Notification from OneSignal:", s);
                      const t = Tt.toOSNotification(s);
                      n.push($.putNotificationReceivedForOutcomes(o, t)),
                        i.push(
                          ((t) =>
                            e(this, void 0, void 0, function* () {
                              const e = { notification: t };
                              return (
                                yield Rt.workerMessenger
                                  .broadcast(c.NotificationWillDisplay, e)
                                  .catch((e) => J.error(e)),
                                Rt.webhookNotificationEventSender.willDisplay(
                                  t
                                ),
                                Rt.displayNotification(t)
                                  .then(() => Rt.sendConfirmedDelivery(t))
                                  .catch((e) => J.error(e))
                              );
                            })).bind(null, t)
                        );
                    }
                    return i.reduce((e, t) => e.then(t), Promise.resolve());
                  })
                )
                .catch((e) => {
                  J.debug("Failed to display a notification:", e),
                    Rt.UNSUBSCRIBED_FROM_NOTIFICATIONS &&
                      J.debug(
                        "Because we have just unsubscribed from notifications, we will not show anything."
                      );
                })
            );
        }
        static sendConfirmedDelivery(t) {
          return e(this, void 0, void 0, function* () {
            if (!t) return;
            if (!Rt.browserSupportsConfirmedDelivery()) return null;
            if (!t.confirmDelivery) return;
            const e = yield Rt.getAppId(),
              i = yield this.getPushSubscriptionId();
            if (!!(!e || !t.notificationId)) return;
            const n = {
              player_id: i,
              app_id: e,
              device_type: ge.getDeviceType(),
            };
            J.debug(
              `Called sendConfirmedDelivery(${JSON.stringify(t, null, 4)})`
            ),
              yield he(Math.floor(25 * Math.random() * 1e3)),
              yield be.put(
                `notifications/${t.notificationId}/report_received`,
                n
              );
          });
        }
        static browserSupportsConfirmedDelivery() {
          return "safari" !== u().name;
        }
        static getWindowClients() {
          return e(this, void 0, void 0, function* () {
            return yield self.clients.matchAll({
              type: "window",
              includeUncontrolled: !0,
            });
          });
        }
        static updateSessionBasedOnHasActive(t, i, n) {
          return e(this, void 0, void 0, function* () {
            if (i)
              yield ke.upsertSession(
                n.appId,
                n.onesignalId,
                n.subscriptionId,
                n.sessionThreshold,
                n.enableSessionDuration,
                n.sessionOrigin,
                n.outcomesConfig
              );
            else {
              const e = yield ke.deactivateSession(
                n.appId,
                n.onesignalId,
                n.subscriptionId,
                n.sessionThreshold,
                n.enableSessionDuration,
                n.outcomesConfig
              );
              e && ((self.cancel = e.cancel), t.waitUntil(e.promise));
            }
          });
        }
        static refreshSession(t, i) {
          return e(this, void 0, void 0, function* () {
            J.debug("[Service Worker] refreshSession");
            const e = yield this.getWindowClients();
            if (i.isSafari)
              yield Rt.checkIfAnyClientsFocusedAndUpdateSession(t, e, i);
            else {
              const n = e.some((e) => e.focused);
              J.debug("[Service Worker] hasAnyActiveSessions", n),
                yield Rt.updateSessionBasedOnHasActive(t, n, i);
            }
          });
        }
        static checkIfAnyClientsFocusedAndUpdateSession(t, i, n) {
          return e(this, void 0, void 0, function* () {
            const o = new Date().getTime();
            self.clientsStatus = {
              timestamp: o,
              sentRequestsCount: 0,
              receivedResponsesCount: 0,
              hasAnyActiveSessions: !1,
            };
            const s = { timestamp: o };
            i.forEach((e) => {
              self.clientsStatus && self.clientsStatus.sentRequestsCount++,
                e.postMessage({ command: c.AreYouVisible, payload: s });
            });
            const r = Q(
              () =>
                e(this, void 0, void 0, function* () {
                  self.clientsStatus &&
                    self.clientsStatus.timestamp === o &&
                    (J.debug(
                      "updateSessionBasedOnHasActive",
                      self.clientsStatus
                    ),
                    yield Rt.updateSessionBasedOnHasActive(
                      t,
                      self.clientsStatus.hasAnyActiveSessions,
                      n
                    ),
                    (self.clientsStatus = void 0));
                }),
              0.5
            );
            (self.cancel = r.cancel), t.waitUntil(r.promise);
          });
        }
        static debounceRefreshSession(t, i) {
          J.debug("[Service Worker] debounceRefreshSession", i),
            self.cancel && (self.cancel(), (self.cancel = void 0));
          const n = Q(
            () =>
              e(this, void 0, void 0, function* () {
                yield Rt.refreshSession(t, i);
              }),
            1
          );
          (self.cancel = n.cancel), t.waitUntil(n.promise);
        }
        static ensureImageResourceHttps(e) {
          if (!e) return null;
          try {
            const t = new URL(e);
            if (
              "localhost" === t.hostname ||
              -1 !== t.hostname.indexOf("192.168") ||
              "127.0.0.1" === t.hostname ||
              "https:" === t.protocol
            )
              return e;
            if (
              "i0.wp.com" === t.hostname ||
              "i1.wp.com" === t.hostname ||
              "i2.wp.com" === t.hostname ||
              "i3.wp.com" === t.hostname
            )
              return `https://${t.hostname}${t.pathname}`;
            return `https://i0.wp.com/${t.host + t.pathname}`;
          } catch (e) {
            J.error("ensureImageResourceHttps: ", e);
          }
        }
        static ensureNotificationResourcesHttps(e) {
          if (
            e &&
            (e.icon && (e.icon = Rt.ensureImageResourceHttps(e.icon)),
            e.image && (e.image = Rt.ensureImageResourceHttps(e.image)),
            e.actionButtons && e.actionButtons.length > 0)
          )
            for (const t of e.actionButtons)
              t.icon && (t.icon = Rt.ensureImageResourceHttps(t.icon));
        }
        static displayNotification(t) {
          return e(this, void 0, void 0, function* () {
            J.debug(
              `Called displayNotification(${JSON.stringify(t, null, 4)}):`,
              t
            );
            const e = yield Rt._getTitle(),
              i = yield $.get("Options", "defaultIcon"),
              n = yield $.get("Options", "persistNotification"),
              o = yield Rt.getAppId();
            (t.title = t.title ? t.title : e),
              (t.icon = t.icon ? t.icon : i || void 0),
              Rt.ensureNotificationResourcesHttps(t);
            const s = {
              body: t.body,
              icon: t.icon,
              image: t.image,
              data: t,
              actions: Wt.toNative(t.actionButtons),
              tag: t.topic || o,
              requireInteraction: !1 !== n,
              renotify: !0,
              badge: t.badgeIcon,
            };
            return self.registration.showNotification(t.title, s);
          });
        }
        static shouldOpenNotificationUrl(e) {
          return (
            "javascript:void(0);" !== e &&
            "do_not_open" !== e &&
            !x.contains(e, "_osp=do_not_open")
          );
        }
        static onNotificationClosed(e) {
          J.debug(
            `Called onNotificationClosed(${JSON.stringify(e, null, 4)}):`,
            e
          );
          const t = e.notification.data;
          Rt.workerMessenger
            .broadcast(c.NotificationDismissed, t)
            .catch((e) => J.error(e)),
            e.waitUntil(Rt.webhookNotificationEventSender.dismiss(t));
        }
        static getNotificationUrlToOpen(t, i) {
          return e(this, void 0, void 0, function* () {
            var e;
            if (i) {
              const n =
                null === (e = null == t ? void 0 : t.actionButtons) ||
                void 0 === e
                  ? void 0
                  : e.find((e) => e.actionId === i);
              if ((null == n ? void 0 : n.launchURL) && "" !== n.launchURL)
                return n.launchURL;
            }
            if (t.launchURL && "" !== t.launchURL) return t.launchURL;
            const { defaultNotificationUrl: n } = yield $.getAppState();
            return n || location.origin;
          });
        }
        static onNotificationClicked(t) {
          return e(this, void 0, void 0, function* () {
            J.debug(
              `Called onNotificationClicked(${JSON.stringify(t, null, 4)}):`,
              t
            ),
              t.notification.close();
            const i = t.notification.data;
            let n = "exact",
              o = "navigate";
            const s = yield $.get("Options", "notificationClickHandlerMatch");
            s && (n = s);
            const r = yield this.database.get(
              "Options",
              "notificationClickHandlerAction"
            );
            r && (o = r);
            const a = yield Rt.getNotificationUrlToOpen(i, t.action),
              d = Rt.shouldOpenNotificationUrl(a),
              l = yield Rt.getAppId(),
              u = ge.getDeviceType(),
              g = {
                notification: i,
                result: { actionId: t.action, url: a },
                timestamp: new Date().getTime(),
              };
            J.info("NotificationClicked", g);
            const p = ((t) =>
                e(this, void 0, void 0, function* () {
                  try {
                    const e = yield $.getCurrentSession();
                    if (e && e.status === D.Active) return;
                    yield $.putNotificationClickedForOutcomes(l, t),
                      e &&
                        ((e.notificationId = t.notification.notificationId),
                        yield $.upsertSession(e));
                  } catch (e) {
                    J.error("Failed to save clicked notification.", e);
                  }
                }))(g),
              f = yield this.getPushSubscriptionId(),
              h = Rt.sendConvertedAPIRequests(l, f, g, u),
              v = yield Rt.getWindowClients();
            let m = !1;
            for (const e of v) {
              const t = e.url;
              let i = "";
              try {
                i = new URL(t).origin;
              } catch (e) {
                J.error("Failed to get the HTTP site's actual origin:", e);
              }
              let s = null;
              try {
                s = new URL(a).origin;
              } catch (e) {
                J.error("Failed parse launchUrl:", e);
              }
              if (("exact" === n && t === a) || ("origin" === n && i === s)) {
                if (e.url === a || ("focus" === o && i === s)) {
                  Rt.workerMessenger.unicast(c.NotificationClicked, g, e);
                  try {
                    e instanceof WindowClient && (yield e.focus());
                  } catch (t) {
                    J.error("Failed to focus:", e, t);
                  }
                } else if (e instanceof WindowClient && e.navigate) {
                  try {
                    J.debug(
                      "Client is standard HTTPS site. Attempting to focus() client."
                    ),
                      e instanceof WindowClient && (yield e.focus());
                  } catch (t) {
                    J.error("Failed to focus:", e, t);
                  }
                  try {
                    d
                      ? (J.debug(`Redirecting HTTPS site to (${a}).`),
                        yield $.putNotificationClickedEventPendingUrlOpening(g),
                        yield e.navigate(a))
                      : J.debug("Not navigating because link is special.");
                  } catch (t) {
                    J.error("Failed to navigate:", e, a, t);
                  }
                } else
                  yield $.putNotificationClickedEventPendingUrlOpening(g),
                    yield Rt.openUrl(a);
                m = !0;
                break;
              }
            }
            return (
              d &&
                !m &&
                (yield $.putNotificationClickedEventPendingUrlOpening(g),
                yield Rt.openUrl(a)),
              p && (yield p),
              yield h
            );
          });
        }
        static sendConvertedAPIRequests(t, i, n, o) {
          return e(this, void 0, void 0, function* () {
            const e = n.notification;
            if (!e.notificationId)
              return void console.error(
                "No notification id, skipping networks calls to report open!"
              );
            let s;
            t
              ? (s = be.put(`notifications/${e.notificationId}`, {
                  app_id: t,
                  player_id: i,
                  opened: !0,
                  device_type: o,
                }))
              : console.error(
                  "No app Id, skipping OneSignal API call for notification open!"
                ),
              yield Rt.webhookNotificationEventSender.click(n),
              s && (yield s);
          });
        }
        static openUrl(t) {
          return e(this, void 0, void 0, function* () {
            J.debug("Opening notification URL:", t);
            try {
              return yield self.clients.openWindow(t);
            } catch (e) {
              return J.warn(`Failed to open the URL '${t}':`, e), null;
            }
          });
        }
        static onServiceWorkerActivated(e) {
          J.info(`OneSignal Service Worker activated (version ${p.version()})`),
            e.waitUntil(self.clients.claim());
        }
        static onPushSubscriptionChange(t) {
          return e(this, void 0, void 0, function* () {
            J.debug(
              `Called onPushSubscriptionChange(${JSON.stringify(t, null, 4)}):`,
              t
            );
            const e = yield Rt.getAppId();
            if (!e) return;
            const i = yield Nt.getAppConfig(
              { appId: e },
              Ie.downloadServerAppConfig
            );
            if (!i) return;
            const n = new ut(i);
            let o, s;
            {
              let { deviceId: i } = yield $.getSubscription();
              if (((o = !!i), !o && t.oldSubscription)) {
                i = yield Ie.getUserIdFromSubscriptionIdentifier(
                  e,
                  ge.getDeviceType(),
                  t.oldSubscription.endpoint
                );
                const n = yield $.getSubscription();
                (n.deviceId = i), yield $.setSubscription(n);
              }
              o = !!i;
            }
            const r = t.newSubscription;
            if (r) s = rt.setFromW3cSubscription(r);
            else
              try {
                s = yield n.subscriptionManager.subscribe(1);
              } catch (e) {}
            if (o || !!s) {
              let e = null;
              "granted" !== Notification.permission
                ? (e = ce.PermissionRevoked)
                : s || (e = ce.PushSubscriptionRevoked),
                yield n.subscriptionManager.registerSubscription(s, e);
            } else
              yield $.remove("Ids", "userId"),
                yield $.remove("Ids", "registrationId");
          });
        }
        static _getTitle() {
          return new Promise((e) => {
            Promise.all([
              $.get("Options", "defaultTitle"),
              $.get("Options", "pageTitle"),
            ]).then(([t, i]) => {
              e(null !== t ? t : null != i ? i : "");
            });
          });
        }
        static parseOrFetchNotifications(e) {
          if (!e || !e.data)
            return Promise.reject("Missing event.data on push payload!");
          if (Rt.isValidPushPayload(e.data)) {
            J.debug("Received a valid encrypted push payload.");
            const t = e.data.json();
            return Promise.resolve([t]);
          }
          return Promise.reject(
            `Unexpected push message payload received: ${e.data}`
          );
        }
        static isValidPushPayload(e) {
          try {
            const t = e.json();
            return (
              !!Tt.isValid(t) ||
              (J.debug(
                "isValidPushPayload: Valid JSON but missing notification UUID:",
                t
              ),
              !1)
            );
          } catch (e) {
            return (
              J.debug("isValidPushPayload: Parsing to JSON failed with:", e), !1
            );
          }
        }
      }
      "undefined" == typeof self && void 0 !== i.g
        ? (i.g.OneSignalWorker = Rt)
        : (self.OneSignalWorker = Rt),
        "undefined" != typeof self && Rt.run(),
        (self.OneSignal = Rt);
    })();
})();
