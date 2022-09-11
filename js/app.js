/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        i = t.dataset.da.trim().split(","),
        s = {};
      (s.element = t),
        (s.parent = t.parentNode),
        (s.destination = document.querySelector(i[0].trim())),
        (s.breakpoint = i[1] ? i[1].trim() : "767"),
        (s.place = i[2] ? i[2].trim() : "last"),
        (s.index = this.indexInParent(s.parent, s.element)),
        this.оbjects.push(s);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, i) {
          return Array.prototype.indexOf.call(i, e) === t;
        }
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const i = this.mediaQueries[t],
        s = String.prototype.split.call(i, ","),
        n = window.matchMedia(s[0]),
        o = s[1],
        r = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === o;
        });
      n.addListener(function () {
        e.mediaHandler(n, r);
      }),
        this.mediaHandler(n, r);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const i = t[e];
          (i.index = this.indexInParent(i.parent, i.element)),
            this.moveTo(i.place, i.element, i.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const i = t[e];
          i.element.classList.contains(this.daClassname) &&
            this.moveBack(i.parent, i.element, i.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, i) {
      t.classList.add(this.daClassname),
        "last" === e || e >= i.children.length
          ? i.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? i.children[e].insertAdjacentElement("beforebegin", t)
          : i.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, i) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[i]
          ? e.children[i].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const i = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(i, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  let t = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
      );
    },
  };
  let i = (e, t = 500, i = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = i ? `${i}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !i),
            !i && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !i && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
        }, t));
    },
    s = (e, t = 500, i = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          i && e.style.removeProperty("height");
        let s = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = i ? `${i}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = s + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t);
      }
    },
    n = !0,
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let i = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    },
    r = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let i = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < i.length; e++) {
          i[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    };
  function l(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  let a = (e, t = !1, i = 500, s = 0) => {
    const n = document.querySelector(e);
    if (n) {
      let r = "",
        a = 0;
      t &&
        ((r = "header.header"), (a = document.querySelector(r).offsetHeight));
      let d = {
        speedAsDuration: !0,
        speed: i,
        header: r,
        offset: s,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (o(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(n, "", d);
      else {
        let e = n.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: a ? e - a : e, behavior: "smooth" });
      }
      l(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else l(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  const d = { inputMaskModule: null, selectModule: null };
  let c = {
    getErrors(e) {
      let t = 0,
        i = e.querySelectorAll("*[data-required]");
      return (
        i.length &&
          i.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let t = e.querySelectorAll("input,textarea");
          for (let e = 0; e < t.length; e++) {
            const i = t[e];
            i.parentElement.classList.remove("_form-focus"),
              i.classList.remove("_form-focus"),
              c.removeError(i),
              (i.value = i.dataset.placeholder);
          }
          let i = e.querySelectorAll(".checkbox__input");
          if (i.length > 0)
            for (let e = 0; e < i.length; e++) {
              i[e].checked = !1;
            }
          if (d.selectModule) {
            let t = e.querySelectorAll(".select");
            if (t.length)
              for (let e = 0; e < t.length; e++) {
                const i = t[e].querySelector("select");
                d.selectModule.selectBuild(i);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  function p(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function u(e = {}, t = {}) {
    Object.keys(t).forEach((i) => {
      void 0 === e[i]
        ? (e[i] = t[i])
        : p(t[i]) && p(e[i]) && Object.keys(t[i]).length > 0 && u(e[i], t[i]);
    });
  }
  const h = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function g() {
    const e = "undefined" != typeof document ? document : {};
    return u(e, h), e;
  }
  const f = {
    document: h,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function m() {
    const e = "undefined" != typeof window ? window : {};
    return u(e, f), e;
  }
  class v extends Array {
    constructor(e) {
      super(...(e || [])),
        (function (e) {
          const t = e.__proto__;
          Object.defineProperty(e, "__proto__", {
            get: () => t,
            set(e) {
              t.__proto__ = e;
            },
          });
        })(this);
    }
  }
  function y(e = []) {
    const t = [];
    return (
      e.forEach((e) => {
        Array.isArray(e) ? t.push(...y(e)) : t.push(e);
      }),
      t
    );
  }
  function w(e, t) {
    return Array.prototype.filter.call(e, t);
  }
  function b(e, t) {
    const i = m(),
      s = g();
    let n = [];
    if (!t && e instanceof v) return e;
    if (!e) return new v(n);
    if ("string" == typeof e) {
      const i = e.trim();
      if (i.indexOf("<") >= 0 && i.indexOf(">") >= 0) {
        let e = "div";
        0 === i.indexOf("<li") && (e = "ul"),
          0 === i.indexOf("<tr") && (e = "tbody"),
          (0 !== i.indexOf("<td") && 0 !== i.indexOf("<th")) || (e = "tr"),
          0 === i.indexOf("<tbody") && (e = "table"),
          0 === i.indexOf("<option") && (e = "select");
        const t = s.createElement(e);
        t.innerHTML = i;
        for (let e = 0; e < t.childNodes.length; e += 1)
          n.push(t.childNodes[e]);
      } else
        n = (function (e, t) {
          if ("string" != typeof e) return [e];
          const i = [],
            s = t.querySelectorAll(e);
          for (let e = 0; e < s.length; e += 1) i.push(s[e]);
          return i;
        })(e.trim(), t || s);
    } else if (e.nodeType || e === i || e === s) n.push(e);
    else if (Array.isArray(e)) {
      if (e instanceof v) return e;
      n = e;
    }
    return new v(
      (function (e) {
        const t = [];
        for (let i = 0; i < e.length; i += 1)
          -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t;
      })(n)
    );
  }
  b.fn = v.prototype;
  const S = "resize scroll".split(" ");
  function C(e) {
    return function (...t) {
      if (void 0 === t[0]) {
        for (let t = 0; t < this.length; t += 1)
          S.indexOf(e) < 0 &&
            (e in this[t] ? this[t][e]() : b(this[t]).trigger(e));
        return this;
      }
      return this.on(e, ...t);
    };
  }
  C("click"),
    C("blur"),
    C("focus"),
    C("focusin"),
    C("focusout"),
    C("keyup"),
    C("keydown"),
    C("keypress"),
    C("submit"),
    C("change"),
    C("mousedown"),
    C("mousemove"),
    C("mouseup"),
    C("mouseenter"),
    C("mouseleave"),
    C("mouseout"),
    C("mouseover"),
    C("touchstart"),
    C("touchend"),
    C("touchmove"),
    C("resize"),
    C("scroll");
  const T = {
    addClass: function (...e) {
      const t = y(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.add(...t);
        }),
        this
      );
    },
    removeClass: function (...e) {
      const t = y(e.map((e) => e.split(" ")));
      return (
        this.forEach((e) => {
          e.classList.remove(...t);
        }),
        this
      );
    },
    hasClass: function (...e) {
      const t = y(e.map((e) => e.split(" ")));
      return (
        w(this, (e) => t.filter((t) => e.classList.contains(t)).length > 0)
          .length > 0
      );
    },
    toggleClass: function (...e) {
      const t = y(e.map((e) => e.split(" ")));
      this.forEach((e) => {
        t.forEach((t) => {
          e.classList.toggle(t);
        });
      });
    },
    attr: function (e, t) {
      if (1 === arguments.length && "string" == typeof e)
        return this[0] ? this[0].getAttribute(e) : void 0;
      for (let i = 0; i < this.length; i += 1)
        if (2 === arguments.length) this[i].setAttribute(e, t);
        else
          for (const t in e) (this[i][t] = e[t]), this[i].setAttribute(t, e[t]);
      return this;
    },
    removeAttr: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    transform: function (e) {
      for (let t = 0; t < this.length; t += 1) this[t].style.transform = e;
      return this;
    },
    transition: function (e) {
      for (let t = 0; t < this.length; t += 1)
        this[t].style.transitionDuration = "string" != typeof e ? `${e}ms` : e;
      return this;
    },
    on: function (...e) {
      let [t, i, s, n] = e;
      function o(e) {
        const t = e.target;
        if (!t) return;
        const n = e.target.dom7EventData || [];
        if ((n.indexOf(e) < 0 && n.unshift(e), b(t).is(i))) s.apply(t, n);
        else {
          const e = b(t).parents();
          for (let t = 0; t < e.length; t += 1)
            b(e[t]).is(i) && s.apply(e[t], n);
        }
      }
      function r(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), s.apply(this, t);
      }
      "function" == typeof e[1] && (([t, s, n] = e), (i = void 0)),
        n || (n = !1);
      const l = t.split(" ");
      let a;
      for (let e = 0; e < this.length; e += 1) {
        const t = this[e];
        if (i)
          for (a = 0; a < l.length; a += 1) {
            const e = l[a];
            t.dom7LiveListeners || (t.dom7LiveListeners = {}),
              t.dom7LiveListeners[e] || (t.dom7LiveListeners[e] = []),
              t.dom7LiveListeners[e].push({ listener: s, proxyListener: o }),
              t.addEventListener(e, o, n);
          }
        else
          for (a = 0; a < l.length; a += 1) {
            const e = l[a];
            t.dom7Listeners || (t.dom7Listeners = {}),
              t.dom7Listeners[e] || (t.dom7Listeners[e] = []),
              t.dom7Listeners[e].push({ listener: s, proxyListener: r }),
              t.addEventListener(e, r, n);
          }
      }
      return this;
    },
    off: function (...e) {
      let [t, i, s, n] = e;
      "function" == typeof e[1] && (([t, s, n] = e), (i = void 0)),
        n || (n = !1);
      const o = t.split(" ");
      for (let e = 0; e < o.length; e += 1) {
        const t = o[e];
        for (let e = 0; e < this.length; e += 1) {
          const o = this[e];
          let r;
          if (
            (!i && o.dom7Listeners
              ? (r = o.dom7Listeners[t])
              : i && o.dom7LiveListeners && (r = o.dom7LiveListeners[t]),
            r && r.length)
          )
            for (let e = r.length - 1; e >= 0; e -= 1) {
              const i = r[e];
              (s && i.listener === s) ||
              (s &&
                i.listener &&
                i.listener.dom7proxy &&
                i.listener.dom7proxy === s)
                ? (o.removeEventListener(t, i.proxyListener, n), r.splice(e, 1))
                : s ||
                  (o.removeEventListener(t, i.proxyListener, n),
                  r.splice(e, 1));
            }
        }
      }
      return this;
    },
    trigger: function (...e) {
      const t = m(),
        i = e[0].split(" "),
        s = e[1];
      for (let n = 0; n < i.length; n += 1) {
        const o = i[n];
        for (let i = 0; i < this.length; i += 1) {
          const n = this[i];
          if (t.CustomEvent) {
            const i = new t.CustomEvent(o, {
              detail: s,
              bubbles: !0,
              cancelable: !0,
            });
            (n.dom7EventData = e.filter((e, t) => t > 0)),
              n.dispatchEvent(i),
              (n.dom7EventData = []),
              delete n.dom7EventData;
          }
        }
      }
      return this;
    },
    transitionEnd: function (e) {
      const t = this;
      return (
        e &&
          t.on("transitionend", function i(s) {
            s.target === this && (e.call(this, s), t.off("transitionend", i));
          }),
        this
      );
    },
    outerWidth: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(e.getPropertyValue("margin-right")) +
            parseFloat(e.getPropertyValue("margin-left"))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function (e) {
      if (this.length > 0) {
        if (e) {
          const e = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(e.getPropertyValue("margin-top")) +
            parseFloat(e.getPropertyValue("margin-bottom"))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    styles: function () {
      const e = m();
      return this[0] ? e.getComputedStyle(this[0], null) : {};
    },
    offset: function () {
      if (this.length > 0) {
        const e = m(),
          t = g(),
          i = this[0],
          s = i.getBoundingClientRect(),
          n = t.body,
          o = i.clientTop || n.clientTop || 0,
          r = i.clientLeft || n.clientLeft || 0,
          l = i === e ? e.scrollY : i.scrollTop,
          a = i === e ? e.scrollX : i.scrollLeft;
        return { top: s.top + l - o, left: s.left + a - r };
      }
      return null;
    },
    css: function (e, t) {
      const i = m();
      let s;
      if (1 === arguments.length) {
        if ("string" != typeof e) {
          for (s = 0; s < this.length; s += 1)
            for (const t in e) this[s].style[t] = e[t];
          return this;
        }
        if (this[0])
          return i.getComputedStyle(this[0], null).getPropertyValue(e);
      }
      if (2 === arguments.length && "string" == typeof e) {
        for (s = 0; s < this.length; s += 1) this[s].style[e] = t;
        return this;
      }
      return this;
    },
    each: function (e) {
      return e
        ? (this.forEach((t, i) => {
            e.apply(t, [t, i]);
          }),
          this)
        : this;
    },
    html: function (e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : null;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function (e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function (e) {
      const t = m(),
        i = g(),
        s = this[0];
      let n, o;
      if (!s || void 0 === e) return !1;
      if ("string" == typeof e) {
        if (s.matches) return s.matches(e);
        if (s.webkitMatchesSelector) return s.webkitMatchesSelector(e);
        if (s.msMatchesSelector) return s.msMatchesSelector(e);
        for (n = b(e), o = 0; o < n.length; o += 1) if (n[o] === s) return !0;
        return !1;
      }
      if (e === i) return s === i;
      if (e === t) return s === t;
      if (e.nodeType || e instanceof v) {
        for (n = e.nodeType ? [e] : e, o = 0; o < n.length; o += 1)
          if (n[o] === s) return !0;
        return !1;
      }
      return !1;
    },
    index: function () {
      let e,
        t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); )
          1 === t.nodeType && (e += 1);
        return e;
      }
    },
    eq: function (e) {
      if (void 0 === e) return this;
      const t = this.length;
      if (e > t - 1) return b([]);
      if (e < 0) {
        const i = t + e;
        return b(i < 0 ? [] : [this[i]]);
      }
      return b([this[e]]);
    },
    append: function (...e) {
      let t;
      const i = g();
      for (let s = 0; s < e.length; s += 1) {
        t = e[s];
        for (let e = 0; e < this.length; e += 1)
          if ("string" == typeof t) {
            const s = i.createElement("div");
            for (s.innerHTML = t; s.firstChild; )
              this[e].appendChild(s.firstChild);
          } else if (t instanceof v)
            for (let i = 0; i < t.length; i += 1) this[e].appendChild(t[i]);
          else this[e].appendChild(t);
      }
      return this;
    },
    prepend: function (e) {
      const t = g();
      let i, s;
      for (i = 0; i < this.length; i += 1)
        if ("string" == typeof e) {
          const n = t.createElement("div");
          for (n.innerHTML = e, s = n.childNodes.length - 1; s >= 0; s -= 1)
            this[i].insertBefore(n.childNodes[s], this[i].childNodes[0]);
        } else if (e instanceof v)
          for (s = 0; s < e.length; s += 1)
            this[i].insertBefore(e[s], this[i].childNodes[0]);
        else this[i].insertBefore(e, this[i].childNodes[0]);
      return this;
    },
    next: function (e) {
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && b(this[0].nextElementSibling).is(e)
            ? b([this[0].nextElementSibling])
            : b([])
          : this[0].nextElementSibling
          ? b([this[0].nextElementSibling])
          : b([])
        : b([]);
    },
    nextAll: function (e) {
      const t = [];
      let i = this[0];
      if (!i) return b([]);
      for (; i.nextElementSibling; ) {
        const s = i.nextElementSibling;
        e ? b(s).is(e) && t.push(s) : t.push(s), (i = s);
      }
      return b(t);
    },
    prev: function (e) {
      if (this.length > 0) {
        const t = this[0];
        return e
          ? t.previousElementSibling && b(t.previousElementSibling).is(e)
            ? b([t.previousElementSibling])
            : b([])
          : t.previousElementSibling
          ? b([t.previousElementSibling])
          : b([]);
      }
      return b([]);
    },
    prevAll: function (e) {
      const t = [];
      let i = this[0];
      if (!i) return b([]);
      for (; i.previousElementSibling; ) {
        const s = i.previousElementSibling;
        e ? b(s).is(e) && t.push(s) : t.push(s), (i = s);
      }
      return b(t);
    },
    parent: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1)
        null !== this[i].parentNode &&
          (e
            ? b(this[i].parentNode).is(e) && t.push(this[i].parentNode)
            : t.push(this[i].parentNode));
      return b(t);
    },
    parents: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        let s = this[i].parentNode;
        for (; s; ) e ? b(s).is(e) && t.push(s) : t.push(s), (s = s.parentNode);
      }
      return b(t);
    },
    closest: function (e) {
      let t = this;
      return void 0 === e ? b([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        const s = this[i].querySelectorAll(e);
        for (let e = 0; e < s.length; e += 1) t.push(s[e]);
      }
      return b(t);
    },
    children: function (e) {
      const t = [];
      for (let i = 0; i < this.length; i += 1) {
        const s = this[i].children;
        for (let i = 0; i < s.length; i += 1)
          (e && !b(s[i]).is(e)) || t.push(s[i]);
      }
      return b(t);
    },
    filter: function (e) {
      return b(w(this, e));
    },
    remove: function () {
      for (let e = 0; e < this.length; e += 1)
        this[e].parentNode && this[e].parentNode.removeChild(this[e]);
      return this;
    },
  };
  Object.keys(T).forEach((e) => {
    Object.defineProperty(b.fn, e, { value: T[e], writable: !0 });
  });
  const x = b;
  function k(e, t = 0) {
    return setTimeout(e, t);
  }
  function E() {
    return Date.now();
  }
  function I(e, t = "x") {
    const i = m();
    let s, n, o;
    const r = (function (e) {
      const t = m();
      let i;
      return (
        t.getComputedStyle && (i = t.getComputedStyle(e, null)),
        !i && e.currentStyle && (i = e.currentStyle),
        i || (i = e.style),
        i
      );
    })(e);
    return (
      i.WebKitCSSMatrix
        ? ((n = r.transform || r.webkitTransform),
          n.split(",").length > 6 &&
            (n = n
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (o = new i.WebKitCSSMatrix("none" === n ? "" : n)))
        : ((o =
            r.MozTransform ||
            r.OTransform ||
            r.MsTransform ||
            r.msTransform ||
            r.transform ||
            r
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (s = o.toString().split(","))),
      "x" === t &&
        (n = i.WebKitCSSMatrix
          ? o.m41
          : 16 === s.length
          ? parseFloat(s[12])
          : parseFloat(s[4])),
      "y" === t &&
        (n = i.WebKitCSSMatrix
          ? o.m42
          : 16 === s.length
          ? parseFloat(s[13])
          : parseFloat(s[5])),
      n || 0
    );
  }
  function L(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function A(...e) {
    const t = Object(e[0]),
      i = ["__proto__", "constructor", "prototype"];
    for (let n = 1; n < e.length; n += 1) {
      const o = e[n];
      if (
        null != o &&
        ((s = o),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const e = Object.keys(Object(o)).filter((e) => i.indexOf(e) < 0);
        for (let i = 0, s = e.length; i < s; i += 1) {
          const s = e[i],
            n = Object.getOwnPropertyDescriptor(o, s);
          void 0 !== n &&
            n.enumerable &&
            (L(t[s]) && L(o[s])
              ? o[s].__swiper__
                ? (t[s] = o[s])
                : A(t[s], o[s])
              : !L(t[s]) && L(o[s])
              ? ((t[s] = {}), o[s].__swiper__ ? (t[s] = o[s]) : A(t[s], o[s]))
              : (t[s] = o[s]));
        }
      }
    }
    var s;
    return t;
  }
  function P(e, t, i) {
    e.style.setProperty(t, i);
  }
  function M({ swiper: e, targetPosition: t, side: i }) {
    const s = m(),
      n = -e.translate;
    let o,
      r = null;
    const l = e.params.speed;
    (e.wrapperEl.style.scrollSnapType = "none"),
      s.cancelAnimationFrame(e.cssModeFrameID);
    const a = t > n ? "next" : "prev",
      d = (e, t) => ("next" === a && e >= t) || ("prev" === a && e <= t),
      c = () => {
        (o = new Date().getTime()), null === r && (r = o);
        const a = Math.max(Math.min((o - r) / l, 1), 0),
          p = 0.5 - Math.cos(a * Math.PI) / 2;
        let u = n + p * (t - n);
        if ((d(u, t) && (u = t), e.wrapperEl.scrollTo({ [i]: u }), d(u, t)))
          return (
            (e.wrapperEl.style.overflow = "hidden"),
            (e.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (e.wrapperEl.style.overflow = ""),
                e.wrapperEl.scrollTo({ [i]: u });
            }),
            void s.cancelAnimationFrame(e.cssModeFrameID)
          );
        e.cssModeFrameID = s.requestAnimationFrame(c);
      };
    c();
  }
  let O, z, D;
  function _() {
    return (
      O ||
        (O = (function () {
          const e = m(),
            t = g();
          return {
            smoothScroll:
              t.documentElement && "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
            passiveListener: (function () {
              let t = !1;
              try {
                const i = Object.defineProperty({}, "passive", {
                  get() {
                    t = !0;
                  },
                });
                e.addEventListener("testPassiveListener", null, i);
              } catch (e) {}
              return t;
            })(),
            gestures: "ongesturestart" in e,
          };
        })()),
      O
    );
  }
  function H(e = {}) {
    return (
      z ||
        (z = (function ({ userAgent: e } = {}) {
          const t = _(),
            i = m(),
            s = i.navigator.platform,
            n = e || i.navigator.userAgent,
            o = { ios: !1, android: !1 },
            r = i.screen.width,
            l = i.screen.height,
            a = n.match(/(Android);?[\s\/]+([\d.]+)?/);
          let d = n.match(/(iPad).*OS\s([\d_]+)/);
          const c = n.match(/(iPod)(.*OS\s([\d_]+))?/),
            p = !d && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            u = "Win32" === s;
          let h = "MacIntel" === s;
          return (
            !d &&
              h &&
              t.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${r}x${l}`) >= 0 &&
              ((d = n.match(/(Version)\/([\d.]+)/)),
              d || (d = [0, 1, "13_0_0"]),
              (h = !1)),
            a && !u && ((o.os = "android"), (o.android = !0)),
            (d || p || c) && ((o.os = "ios"), (o.ios = !0)),
            o
          );
        })(e)),
      z
    );
  }
  function B() {
    return (
      D ||
        (D = (function () {
          const e = m();
          return {
            isSafari: (function () {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            })(),
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent
            ),
          };
        })()),
      D
    );
  }
  const G = {
    on(e, t, i) {
      const s = this;
      if ("function" != typeof t) return s;
      const n = i ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          s.eventsListeners[e] || (s.eventsListeners[e] = []),
            s.eventsListeners[e][n](t);
        }),
        s
      );
    },
    once(e, t, i) {
      const s = this;
      if ("function" != typeof t) return s;
      function n(...i) {
        s.off(e, n), n.__emitterProxy && delete n.__emitterProxy, t.apply(s, i);
      }
      return (n.__emitterProxy = t), s.on(e, n, i);
    },
    onAny(e, t) {
      const i = this;
      if ("function" != typeof e) return i;
      const s = t ? "unshift" : "push";
      return (
        i.eventsAnyListeners.indexOf(e) < 0 && i.eventsAnyListeners[s](e), i
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsAnyListeners) return t;
      const i = t.eventsAnyListeners.indexOf(e);
      return i >= 0 && t.eventsAnyListeners.splice(i, 1), t;
    },
    off(e, t) {
      const i = this;
      return i.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (i.eventsListeners[e] = [])
              : i.eventsListeners[e] &&
                i.eventsListeners[e].forEach((s, n) => {
                  (s === t || (s.__emitterProxy && s.__emitterProxy === t)) &&
                    i.eventsListeners[e].splice(n, 1);
                });
          }),
          i)
        : i;
    },
    emit(...e) {
      const t = this;
      if (!t.eventsListeners) return t;
      let i, s, n;
      "string" == typeof e[0] || Array.isArray(e[0])
        ? ((i = e[0]), (s = e.slice(1, e.length)), (n = t))
        : ((i = e[0].events), (s = e[0].data), (n = e[0].context || t)),
        s.unshift(n);
      return (
        (Array.isArray(i) ? i : i.split(" ")).forEach((e) => {
          t.eventsAnyListeners &&
            t.eventsAnyListeners.length &&
            t.eventsAnyListeners.forEach((t) => {
              t.apply(n, [e, ...s]);
            }),
            t.eventsListeners &&
              t.eventsListeners[e] &&
              t.eventsListeners[e].forEach((e) => {
                e.apply(n, s);
              });
        }),
        t
      );
    },
  };
  const N = {
    updateSize: function () {
      const e = this;
      let t, i;
      const s = e.$el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : s[0].clientWidth),
        (i =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : s[0].clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === i && e.isVertical()) ||
          ((t =
            t -
            parseInt(s.css("padding-left") || 0, 10) -
            parseInt(s.css("padding-right") || 0, 10)),
          (i =
            i -
            parseInt(s.css("padding-top") || 0, 10) -
            parseInt(s.css("padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(i) && (i = 0),
          Object.assign(e, {
            width: t,
            height: i,
            size: e.isHorizontal() ? t : i,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function i(e, i) {
        return parseFloat(e.getPropertyValue(t(i)) || 0);
      }
      const s = e.params,
        { $wrapperEl: n, size: o, rtlTranslate: r, wrongRTL: l } = e,
        a = e.virtual && s.virtual.enabled,
        d = a ? e.virtual.slides.length : e.slides.length,
        c = n.children(`.${e.params.slideClass}`),
        p = a ? e.virtual.slides.length : c.length;
      let u = [];
      const h = [],
        g = [];
      let f = s.slidesOffsetBefore;
      "function" == typeof f && (f = s.slidesOffsetBefore.call(e));
      let m = s.slidesOffsetAfter;
      "function" == typeof m && (m = s.slidesOffsetAfter.call(e));
      const v = e.snapGrid.length,
        y = e.slidesGrid.length;
      let w = s.spaceBetween,
        b = -f,
        S = 0,
        C = 0;
      if (void 0 === o) return;
      "string" == typeof w &&
        w.indexOf("%") >= 0 &&
        (w = (parseFloat(w.replace("%", "")) / 100) * o),
        (e.virtualSize = -w),
        r
          ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
          : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
        s.centeredSlides &&
          s.cssMode &&
          (P(e.wrapperEl, "--swiper-centered-offset-before", ""),
          P(e.wrapperEl, "--swiper-centered-offset-after", ""));
      const T = s.grid && s.grid.rows > 1 && e.grid;
      let x;
      T && e.grid.initSlides(p);
      const k =
        "auto" === s.slidesPerView &&
        s.breakpoints &&
        Object.keys(s.breakpoints).filter(
          (e) => void 0 !== s.breakpoints[e].slidesPerView
        ).length > 0;
      for (let n = 0; n < p; n += 1) {
        x = 0;
        const r = c.eq(n);
        if (
          (T && e.grid.updateSlide(n, r, p, t), "none" !== r.css("display"))
        ) {
          if ("auto" === s.slidesPerView) {
            k && (c[n].style[t("width")] = "");
            const o = getComputedStyle(r[0]),
              l = r[0].style.transform,
              a = r[0].style.webkitTransform;
            if (
              (l && (r[0].style.transform = "none"),
              a && (r[0].style.webkitTransform = "none"),
              s.roundLengths)
            )
              x = e.isHorizontal() ? r.outerWidth(!0) : r.outerHeight(!0);
            else {
              const e = i(o, "width"),
                t = i(o, "padding-left"),
                s = i(o, "padding-right"),
                n = i(o, "margin-left"),
                l = i(o, "margin-right"),
                a = o.getPropertyValue("box-sizing");
              if (a && "border-box" === a) x = e + n + l;
              else {
                const { clientWidth: i, offsetWidth: o } = r[0];
                x = e + t + s + n + l + (o - i);
              }
            }
            l && (r[0].style.transform = l),
              a && (r[0].style.webkitTransform = a),
              s.roundLengths && (x = Math.floor(x));
          } else
            (x = (o - (s.slidesPerView - 1) * w) / s.slidesPerView),
              s.roundLengths && (x = Math.floor(x)),
              c[n] && (c[n].style[t("width")] = `${x}px`);
          c[n] && (c[n].swiperSlideSize = x),
            g.push(x),
            s.centeredSlides
              ? ((b = b + x / 2 + S / 2 + w),
                0 === S && 0 !== n && (b = b - o / 2 - w),
                0 === n && (b = b - o / 2 - w),
                Math.abs(b) < 0.001 && (b = 0),
                s.roundLengths && (b = Math.floor(b)),
                C % s.slidesPerGroup == 0 && u.push(b),
                h.push(b))
              : (s.roundLengths && (b = Math.floor(b)),
                (C - Math.min(e.params.slidesPerGroupSkip, C)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(b),
                h.push(b),
                (b = b + x + w)),
            (e.virtualSize += x + w),
            (S = x),
            (C += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, o) + m),
        r &&
          l &&
          ("slide" === s.effect || "coverflow" === s.effect) &&
          n.css({ width: `${e.virtualSize + s.spaceBetween}px` }),
        s.setWrapperSize &&
          n.css({ [t("width")]: `${e.virtualSize + s.spaceBetween}px` }),
        T && e.grid.updateWrapperSize(x, u, t),
        !s.centeredSlides)
      ) {
        const t = [];
        for (let i = 0; i < u.length; i += 1) {
          let n = u[i];
          s.roundLengths && (n = Math.floor(n)),
            u[i] <= e.virtualSize - o && t.push(n);
        }
        (u = t),
          Math.floor(e.virtualSize - o) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - o);
      }
      if ((0 === u.length && (u = [0]), 0 !== s.spaceBetween)) {
        const i = e.isHorizontal() && r ? "marginLeft" : t("marginRight");
        c.filter((e, t) => !s.cssMode || t !== c.length - 1).css({
          [i]: `${w}px`,
        });
      }
      if (s.centeredSlides && s.centeredSlidesBounds) {
        let e = 0;
        g.forEach((t) => {
          e += t + (s.spaceBetween ? s.spaceBetween : 0);
        }),
          (e -= s.spaceBetween);
        const t = e - o;
        u = u.map((e) => (e < 0 ? -f : e > t ? t + m : e));
      }
      if (s.centerInsufficientSlides) {
        let e = 0;
        if (
          (g.forEach((t) => {
            e += t + (s.spaceBetween ? s.spaceBetween : 0);
          }),
          (e -= s.spaceBetween),
          e < o)
        ) {
          const t = (o - e) / 2;
          u.forEach((e, i) => {
            u[i] = e - t;
          }),
            h.forEach((e, i) => {
              h[i] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: u,
          slidesGrid: h,
          slidesSizesGrid: g,
        }),
        s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
      ) {
        P(e.wrapperEl, "--swiper-centered-offset-before", -u[0] + "px"),
          P(
            e.wrapperEl,
            "--swiper-centered-offset-after",
            e.size / 2 - g[g.length - 1] / 2 + "px"
          );
        const t = -e.snapGrid[0],
          i = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + i));
      }
      p !== d && e.emit("slidesLengthChange"),
        u.length !== v &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        h.length !== y && e.emit("slidesGridLengthChange"),
        s.watchSlidesProgress && e.updateSlidesOffset();
    },
    updateAutoHeight: function (e) {
      const t = this,
        i = [],
        s = t.virtual && t.params.virtual.enabled;
      let n,
        o = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const r = (e) =>
        s
          ? t.slides.filter(
              (t) =>
                parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
            )[0]
          : t.slides.eq(e)[0];
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          t.visibleSlides.each((e) => {
            i.push(e);
          });
        else
          for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
            const e = t.activeIndex + n;
            if (e > t.slides.length && !s) break;
            i.push(r(e));
          }
      else i.push(r(t.activeIndex));
      for (n = 0; n < i.length; n += 1)
        if (void 0 !== i[n]) {
          const e = i[n].offsetHeight;
          o = e > o ? e : o;
        }
      (o || 0 === o) && t.$wrapperEl.css("height", `${o}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset = e.isHorizontal()
          ? t[i].offsetLeft
          : t[i].offsetTop;
    },
    updateSlidesProgress: function (e = (this && this.translate) || 0) {
      const t = this,
        i = t.params,
        { slides: s, rtlTranslate: n, snapGrid: o } = t;
      if (0 === s.length) return;
      void 0 === s[0].swiperSlideOffset && t.updateSlidesOffset();
      let r = -e;
      n && (r = e),
        s.removeClass(i.slideVisibleClass),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      for (let e = 0; e < s.length; e += 1) {
        const l = s[e];
        let a = l.swiperSlideOffset;
        i.cssMode && i.centeredSlides && (a -= s[0].swiperSlideOffset);
        const d =
            (r + (i.centeredSlides ? t.minTranslate() : 0) - a) /
            (l.swiperSlideSize + i.spaceBetween),
          c =
            (r - o[0] + (i.centeredSlides ? t.minTranslate() : 0) - a) /
            (l.swiperSlideSize + i.spaceBetween),
          p = -(r - a),
          u = p + t.slidesSizesGrid[e];
        ((p >= 0 && p < t.size - 1) ||
          (u > 1 && u <= t.size) ||
          (p <= 0 && u >= t.size)) &&
          (t.visibleSlides.push(l),
          t.visibleSlidesIndexes.push(e),
          s.eq(e).addClass(i.slideVisibleClass)),
          (l.progress = n ? -d : d),
          (l.originalProgress = n ? -c : c);
      }
      t.visibleSlides = x(t.visibleSlides);
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const i = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * i) || 0;
      }
      const i = t.params,
        s = t.maxTranslate() - t.minTranslate();
      let { progress: n, isBeginning: o, isEnd: r } = t;
      const l = o,
        a = r;
      0 === s
        ? ((n = 0), (o = !0), (r = !0))
        : ((n = (e - t.minTranslate()) / s), (o = n <= 0), (r = n >= 1)),
        Object.assign(t, { progress: n, isBeginning: o, isEnd: r }),
        (i.watchSlidesProgress || (i.centeredSlides && i.autoHeight)) &&
          t.updateSlidesProgress(e),
        o && !l && t.emit("reachBeginning toEdge"),
        r && !a && t.emit("reachEnd toEdge"),
        ((l && !o) || (a && !r)) && t.emit("fromEdge"),
        t.emit("progress", n);
    },
    updateSlidesClasses: function () {
      const e = this,
        {
          slides: t,
          params: i,
          $wrapperEl: s,
          activeIndex: n,
          realIndex: o,
        } = e,
        r = e.virtual && i.virtual.enabled;
      let l;
      t.removeClass(
        `${i.slideActiveClass} ${i.slideNextClass} ${i.slidePrevClass} ${i.slideDuplicateActiveClass} ${i.slideDuplicateNextClass} ${i.slideDuplicatePrevClass}`
      ),
        (l = r
          ? e.$wrapperEl.find(
              `.${i.slideClass}[data-swiper-slide-index="${n}"]`
            )
          : t.eq(n)),
        l.addClass(i.slideActiveClass),
        i.loop &&
          (l.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  `.${i.slideClass}:not(.${i.slideDuplicateClass})[data-swiper-slide-index="${o}"]`
                )
                .addClass(i.slideDuplicateActiveClass)
            : s
                .children(
                  `.${i.slideClass}.${i.slideDuplicateClass}[data-swiper-slide-index="${o}"]`
                )
                .addClass(i.slideDuplicateActiveClass));
      let a = l.nextAll(`.${i.slideClass}`).eq(0).addClass(i.slideNextClass);
      i.loop && 0 === a.length && ((a = t.eq(0)), a.addClass(i.slideNextClass));
      let d = l.prevAll(`.${i.slideClass}`).eq(0).addClass(i.slidePrevClass);
      i.loop &&
        0 === d.length &&
        ((d = t.eq(-1)), d.addClass(i.slidePrevClass)),
        i.loop &&
          (a.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  `.${i.slideClass}:not(.${
                    i.slideDuplicateClass
                  })[data-swiper-slide-index="${a.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicateNextClass)
            : s
                .children(
                  `.${i.slideClass}.${
                    i.slideDuplicateClass
                  }[data-swiper-slide-index="${a.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicateNextClass),
          d.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  `.${i.slideClass}:not(.${
                    i.slideDuplicateClass
                  })[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicatePrevClass)
            : s
                .children(
                  `.${i.slideClass}.${
                    i.slideDuplicateClass
                  }[data-swiper-slide-index="${d.attr(
                    "data-swiper-slide-index"
                  )}"]`
                )
                .addClass(i.slideDuplicatePrevClass)),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        i = t.rtlTranslate ? t.translate : -t.translate,
        {
          slidesGrid: s,
          snapGrid: n,
          params: o,
          activeIndex: r,
          realIndex: l,
          snapIndex: a,
        } = t;
      let d,
        c = e;
      if (void 0 === c) {
        for (let e = 0; e < s.length; e += 1)
          void 0 !== s[e + 1]
            ? i >= s[e] && i < s[e + 1] - (s[e + 1] - s[e]) / 2
              ? (c = e)
              : i >= s[e] && i < s[e + 1] && (c = e + 1)
            : i >= s[e] && (c = e);
        o.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
      }
      if (n.indexOf(i) >= 0) d = n.indexOf(i);
      else {
        const e = Math.min(o.slidesPerGroupSkip, c);
        d = e + Math.floor((c - e) / o.slidesPerGroup);
      }
      if ((d >= n.length && (d = n.length - 1), c === r))
        return void (d !== a && ((t.snapIndex = d), t.emit("snapIndexChange")));
      const p = parseInt(
        t.slides.eq(c).attr("data-swiper-slide-index") || c,
        10
      );
      Object.assign(t, {
        snapIndex: d,
        realIndex: p,
        previousIndex: r,
        activeIndex: c,
      }),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        l !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        i = t.params,
        s = x(e).closest(`.${i.slideClass}`)[0];
      let n,
        o = !1;
      if (s)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === s) {
            (o = !0), (n = e);
            break;
          }
      if (!s || !o)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = s),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              x(s).attr("data-swiper-slide-index"),
              10
            ))
          : (t.clickedIndex = n),
        i.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const j = {
    getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
      const { params: t, rtlTranslate: i, translate: s, $wrapperEl: n } = this;
      if (t.virtualTranslate) return i ? -s : s;
      if (t.cssMode) return s;
      let o = I(n[0], e);
      return i && (o = -o), o || 0;
    },
    setTranslate: function (e, t) {
      const i = this,
        {
          rtlTranslate: s,
          params: n,
          $wrapperEl: o,
          wrapperEl: r,
          progress: l,
        } = i;
      let a,
        d = 0,
        c = 0;
      i.isHorizontal() ? (d = s ? -e : e) : (c = e),
        n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
        n.cssMode
          ? (r[i.isHorizontal() ? "scrollLeft" : "scrollTop"] = i.isHorizontal()
              ? -d
              : -c)
          : n.virtualTranslate ||
            o.transform(`translate3d(${d}px, ${c}px, 0px)`),
        (i.previousTranslate = i.translate),
        (i.translate = i.isHorizontal() ? d : c);
      const p = i.maxTranslate() - i.minTranslate();
      (a = 0 === p ? 0 : (e - i.minTranslate()) / p),
        a !== l && i.updateProgress(e),
        i.emit("setTranslate", i.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e = 0, t = this.params.speed, i = !0, s = !0, n) {
      const o = this,
        { params: r, wrapperEl: l } = o;
      if (o.animating && r.preventInteractionOnTransition) return !1;
      const a = o.minTranslate(),
        d = o.maxTranslate();
      let c;
      if (
        ((c = s && e > a ? a : s && e < d ? d : e),
        o.updateProgress(c),
        r.cssMode)
      ) {
        const e = o.isHorizontal();
        if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!o.support.smoothScroll)
            return (
              M({ swiper: o, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (o.setTransition(0),
            o.setTranslate(c),
            i &&
              (o.emit("beforeTransitionStart", t, n), o.emit("transitionEnd")))
          : (o.setTransition(t),
            o.setTranslate(c),
            i &&
              (o.emit("beforeTransitionStart", t, n),
              o.emit("transitionStart")),
            o.animating ||
              ((o.animating = !0),
              o.onTranslateToWrapperTransitionEnd ||
                (o.onTranslateToWrapperTransitionEnd = function (e) {
                  o &&
                    !o.destroyed &&
                    e.target === this &&
                    (o.$wrapperEl[0].removeEventListener(
                      "transitionend",
                      o.onTranslateToWrapperTransitionEnd
                    ),
                    o.$wrapperEl[0].removeEventListener(
                      "webkitTransitionEnd",
                      o.onTranslateToWrapperTransitionEnd
                    ),
                    (o.onTranslateToWrapperTransitionEnd = null),
                    delete o.onTranslateToWrapperTransitionEnd,
                    i && o.emit("transitionEnd"));
                }),
              o.$wrapperEl[0].addEventListener(
                "transitionend",
                o.onTranslateToWrapperTransitionEnd
              ),
              o.$wrapperEl[0].addEventListener(
                "webkitTransitionEnd",
                o.onTranslateToWrapperTransitionEnd
              ))),
        !0
      );
    },
  };
  function F({ swiper: e, runCallbacks: t, direction: i, step: s }) {
    const { activeIndex: n, previousIndex: o } = e;
    let r = i;
    if (
      (r || (r = n > o ? "next" : n < o ? "prev" : "reset"),
      e.emit(`transition${s}`),
      t && n !== o)
    ) {
      if ("reset" === r) return void e.emit(`slideResetTransition${s}`);
      e.emit(`slideChangeTransition${s}`),
        "next" === r
          ? e.emit(`slideNextTransition${s}`)
          : e.emit(`slidePrevTransition${s}`);
    }
  }
  const q = {
    slideTo: function (e = 0, t = this.params.speed, i = !0, s, n) {
      if ("number" != typeof e && "string" != typeof e)
        throw new Error(
          `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`
        );
      if ("string" == typeof e) {
        const t = parseInt(e, 10);
        if (!isFinite(t))
          throw new Error(
            `The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`
          );
        e = t;
      }
      const o = this;
      let r = e;
      r < 0 && (r = 0);
      const {
        params: l,
        snapGrid: a,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: g,
      } = o;
      if ((o.animating && l.preventInteractionOnTransition) || (!g && !s && !n))
        return !1;
      const f = Math.min(o.params.slidesPerGroupSkip, r);
      let m = f + Math.floor((r - f) / o.params.slidesPerGroup);
      m >= a.length && (m = a.length - 1),
        (p || l.initialSlide || 0) === (c || 0) &&
          i &&
          o.emit("beforeSlideChangeStart");
      const v = -a[m];
      if ((o.updateProgress(v), l.normalizeSlideIndex))
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            i = Math.floor(100 * d[e]),
            s = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= i && t < s - (s - i) / 2
              ? (r = e)
              : t >= i && t < s && (r = e + 1)
            : t >= i && (r = e);
        }
      if (o.initialized && r !== p) {
        if (!o.allowSlideNext && v < o.translate && v < o.minTranslate())
          return !1;
        if (
          !o.allowSlidePrev &&
          v > o.translate &&
          v > o.maxTranslate() &&
          (p || 0) !== r
        )
          return !1;
      }
      let y;
      if (
        ((y = r > p ? "next" : r < p ? "prev" : "reset"),
        (u && -v === o.translate) || (!u && v === o.translate))
      )
        return (
          o.updateActiveIndex(r),
          l.autoHeight && o.updateAutoHeight(),
          o.updateSlidesClasses(),
          "slide" !== l.effect && o.setTranslate(v),
          "reset" !== y && (o.transitionStart(i, y), o.transitionEnd(i, y)),
          !1
        );
      if (l.cssMode) {
        const e = o.isHorizontal(),
          i = u ? v : -v;
        if (0 === t) {
          const t = o.virtual && o.params.virtual.enabled;
          t &&
            ((o.wrapperEl.style.scrollSnapType = "none"),
            (o._immediateVirtual = !0)),
            (h[e ? "scrollLeft" : "scrollTop"] = i),
            t &&
              requestAnimationFrame(() => {
                (o.wrapperEl.style.scrollSnapType = ""),
                  (o._swiperImmediateVirtual = !1);
              });
        } else {
          if (!o.support.smoothScroll)
            return (
              M({ swiper: o, targetPosition: i, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: i, behavior: "smooth" });
        }
        return !0;
      }
      return (
        o.setTransition(t),
        o.setTranslate(v),
        o.updateActiveIndex(r),
        o.updateSlidesClasses(),
        o.emit("beforeTransitionStart", t, s),
        o.transitionStart(i, y),
        0 === t
          ? o.transitionEnd(i, y)
          : o.animating ||
            ((o.animating = !0),
            o.onSlideToWrapperTransitionEnd ||
              (o.onSlideToWrapperTransitionEnd = function (e) {
                o &&
                  !o.destroyed &&
                  e.target === this &&
                  (o.$wrapperEl[0].removeEventListener(
                    "transitionend",
                    o.onSlideToWrapperTransitionEnd
                  ),
                  o.$wrapperEl[0].removeEventListener(
                    "webkitTransitionEnd",
                    o.onSlideToWrapperTransitionEnd
                  ),
                  (o.onSlideToWrapperTransitionEnd = null),
                  delete o.onSlideToWrapperTransitionEnd,
                  o.transitionEnd(i, y));
              }),
            o.$wrapperEl[0].addEventListener(
              "transitionend",
              o.onSlideToWrapperTransitionEnd
            ),
            o.$wrapperEl[0].addEventListener(
              "webkitTransitionEnd",
              o.onSlideToWrapperTransitionEnd
            )),
        !0
      );
    },
    slideToLoop: function (e = 0, t = this.params.speed, i = !0, s) {
      const n = this;
      let o = e;
      return n.params.loop && (o += n.loopedSlides), n.slideTo(o, t, i, s);
    },
    slideNext: function (e = this.params.speed, t = !0, i) {
      const s = this,
        { animating: n, enabled: o, params: r } = s;
      if (!o) return s;
      let l = r.slidesPerGroup;
      "auto" === r.slidesPerView &&
        1 === r.slidesPerGroup &&
        r.slidesPerGroupAuto &&
        (l = Math.max(s.slidesPerViewDynamic("current", !0), 1));
      const a = s.activeIndex < r.slidesPerGroupSkip ? 1 : l;
      if (r.loop) {
        if (n && r.loopPreventsSlide) return !1;
        s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
      }
      return r.rewind && s.isEnd
        ? s.slideTo(0, e, t, i)
        : s.slideTo(s.activeIndex + a, e, t, i);
    },
    slidePrev: function (e = this.params.speed, t = !0, i) {
      const s = this,
        {
          params: n,
          animating: o,
          snapGrid: r,
          slidesGrid: l,
          rtlTranslate: a,
          enabled: d,
        } = s;
      if (!d) return s;
      if (n.loop) {
        if (o && n.loopPreventsSlide) return !1;
        s.loopFix(), (s._clientLeft = s.$wrapperEl[0].clientLeft);
      }
      function c(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const p = c(a ? s.translate : -s.translate),
        u = r.map((e) => c(e));
      let h = r[u.indexOf(p) - 1];
      if (void 0 === h && n.cssMode) {
        let e;
        r.forEach((t, i) => {
          p >= t && (e = i);
        }),
          void 0 !== e && (h = r[e > 0 ? e - 1 : e]);
      }
      let g = 0;
      return (
        void 0 !== h &&
          ((g = l.indexOf(h)),
          g < 0 && (g = s.activeIndex - 1),
          "auto" === n.slidesPerView &&
            1 === n.slidesPerGroup &&
            n.slidesPerGroupAuto &&
            ((g = g - s.slidesPerViewDynamic("previous", !0) + 1),
            (g = Math.max(g, 0)))),
        n.rewind && s.isBeginning
          ? s.slideTo(s.slides.length - 1, e, t, i)
          : s.slideTo(g, e, t, i)
      );
    },
    slideReset: function (e = this.params.speed, t = !0, i) {
      return this.slideTo(this.activeIndex, e, t, i);
    },
    slideToClosest: function (e = this.params.speed, t = !0, i, s = 0.5) {
      const n = this;
      let o = n.activeIndex;
      const r = Math.min(n.params.slidesPerGroupSkip, o),
        l = r + Math.floor((o - r) / n.params.slidesPerGroup),
        a = n.rtlTranslate ? n.translate : -n.translate;
      if (a >= n.snapGrid[l]) {
        const e = n.snapGrid[l];
        a - e > (n.snapGrid[l + 1] - e) * s && (o += n.params.slidesPerGroup);
      } else {
        const e = n.snapGrid[l - 1];
        a - e <= (n.snapGrid[l] - e) * s && (o -= n.params.slidesPerGroup);
      }
      return (
        (o = Math.max(o, 0)),
        (o = Math.min(o, n.slidesGrid.length - 1)),
        n.slideTo(o, e, t, i)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, $wrapperEl: i } = e,
        s =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let n,
        o = e.clickedIndex;
      if (t.loop) {
        if (e.animating) return;
        (n = parseInt(x(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
          t.centeredSlides
            ? o < e.loopedSlides - s / 2 ||
              o > e.slides.length - e.loopedSlides + s / 2
              ? (e.loopFix(),
                (o = i
                  .children(
                    `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                  )
                  .eq(0)
                  .index()),
                k(() => {
                  e.slideTo(o);
                }))
              : e.slideTo(o)
            : o > e.slides.length - s
            ? (e.loopFix(),
              (o = i
                .children(
                  `.${t.slideClass}[data-swiper-slide-index="${n}"]:not(.${t.slideDuplicateClass})`
                )
                .eq(0)
                .index()),
              k(() => {
                e.slideTo(o);
              }))
            : e.slideTo(o);
      } else e.slideTo(o);
    },
  };
  const W = {
    loopCreate: function () {
      const e = this,
        t = g(),
        { params: i, $wrapperEl: s } = e,
        n = s.children().length > 0 ? x(s.children()[0].parentNode) : s;
      n.children(`.${i.slideClass}.${i.slideDuplicateClass}`).remove();
      let o = n.children(`.${i.slideClass}`);
      if (i.loopFillGroupWithBlank) {
        const e = i.slidesPerGroup - (o.length % i.slidesPerGroup);
        if (e !== i.slidesPerGroup) {
          for (let s = 0; s < e; s += 1) {
            const e = x(t.createElement("div")).addClass(
              `${i.slideClass} ${i.slideBlankClass}`
            );
            n.append(e);
          }
          o = n.children(`.${i.slideClass}`);
        }
      }
      "auto" !== i.slidesPerView ||
        i.loopedSlides ||
        (i.loopedSlides = o.length),
        (e.loopedSlides = Math.ceil(
          parseFloat(i.loopedSlides || i.slidesPerView, 10)
        )),
        (e.loopedSlides += i.loopAdditionalSlides),
        e.loopedSlides > o.length && (e.loopedSlides = o.length);
      const r = [],
        l = [];
      o.each((t, i) => {
        const s = x(t);
        i < e.loopedSlides && l.push(t),
          i < o.length && i >= o.length - e.loopedSlides && r.push(t),
          s.attr("data-swiper-slide-index", i);
      });
      for (let e = 0; e < l.length; e += 1)
        n.append(x(l[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
      for (let e = r.length - 1; e >= 0; e -= 1)
        n.prepend(x(r[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
    },
    loopFix: function () {
      const e = this;
      e.emit("beforeLoopFix");
      const {
        activeIndex: t,
        slides: i,
        loopedSlides: s,
        allowSlidePrev: n,
        allowSlideNext: o,
        snapGrid: r,
        rtlTranslate: l,
      } = e;
      let a;
      (e.allowSlidePrev = !0), (e.allowSlideNext = !0);
      const d = -r[t] - e.getTranslate();
      if (t < s) {
        (a = i.length - 3 * s + t), (a += s);
        e.slideTo(a, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((l ? -e.translate : e.translate) - d);
      } else if (t >= i.length - s) {
        (a = -i.length + t + s), (a += s);
        e.slideTo(a, 0, !1, !0) &&
          0 !== d &&
          e.setTranslate((l ? -e.translate : e.translate) - d);
      }
      (e.allowSlidePrev = n), (e.allowSlideNext = o), e.emit("loopFix");
    },
    loopDestroy: function () {
      const { $wrapperEl: e, params: t, slides: i } = this;
      e
        .children(
          `.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.${t.slideBlankClass}`
        )
        .remove(),
        i.removeAttr("data-swiper-slide-index");
    },
  };
  function V(e) {
    const t = this,
      i = g(),
      s = m(),
      n = t.touchEventsData,
      { params: o, touches: r, enabled: l } = t;
    if (!l) return;
    if (t.animating && o.preventInteractionOnTransition) return;
    !t.animating && o.cssMode && o.loop && t.loopFix();
    let a = e;
    a.originalEvent && (a = a.originalEvent);
    let d = x(a.target);
    if ("wrapper" === o.touchEventsTarget && !d.closest(t.wrapperEl).length)
      return;
    if (
      ((n.isTouchEvent = "touchstart" === a.type),
      !n.isTouchEvent && "which" in a && 3 === a.which)
    )
      return;
    if (!n.isTouchEvent && "button" in a && a.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    !!o.noSwipingClass &&
      "" !== o.noSwipingClass &&
      a.target &&
      a.target.shadowRoot &&
      e.path &&
      e.path[0] &&
      (d = x(e.path[0]));
    const c = o.noSwipingSelector
        ? o.noSwipingSelector
        : `.${o.noSwipingClass}`,
      p = !(!a.target || !a.target.shadowRoot);
    if (
      o.noSwiping &&
      (p
        ? (function (e, t = this) {
            return (function t(i) {
              return i && i !== g() && i !== m()
                ? (i.assignedSlot && (i = i.assignedSlot),
                  i.closest(e) || t(i.getRootNode().host))
                : null;
            })(t);
          })(c, a.target)
        : d.closest(c)[0])
    )
      return void (t.allowClick = !0);
    if (o.swipeHandler && !d.closest(o.swipeHandler)[0]) return;
    (r.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX),
      (r.currentY =
        "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY);
    const u = r.currentX,
      h = r.currentY,
      f = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
      v = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
    if (f && (u <= v || u >= s.innerWidth - v)) {
      if ("prevent" !== f) return;
      e.preventDefault();
    }
    if (
      (Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
      (r.startX = u),
      (r.startY = h),
      (n.touchStartTime = E()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      o.threshold > 0 && (n.allowThresholdMove = !1),
      "touchstart" !== a.type)
    ) {
      let e = !0;
      d.is(n.focusableElements) && (e = !1),
        i.activeElement &&
          x(i.activeElement).is(n.focusableElements) &&
          i.activeElement !== d[0] &&
          i.activeElement.blur();
      const s = e && t.allowTouchMove && o.touchStartPreventDefault;
      (!o.touchStartForcePreventDefault && !s) ||
        d[0].isContentEditable ||
        a.preventDefault();
    }
    t.emit("touchStart", a);
  }
  function R(e) {
    const t = g(),
      i = this,
      s = i.touchEventsData,
      { params: n, touches: o, rtlTranslate: r, enabled: l } = i;
    if (!l) return;
    let a = e;
    if ((a.originalEvent && (a = a.originalEvent), !s.isTouched))
      return void (
        s.startMoving &&
        s.isScrolling &&
        i.emit("touchMoveOpposite", a)
      );
    if (s.isTouchEvent && "touchmove" !== a.type) return;
    const d =
        "touchmove" === a.type &&
        a.targetTouches &&
        (a.targetTouches[0] || a.changedTouches[0]),
      c = "touchmove" === a.type ? d.pageX : a.pageX,
      p = "touchmove" === a.type ? d.pageY : a.pageY;
    if (a.preventedByNestedSwiper) return (o.startX = c), void (o.startY = p);
    if (!i.allowTouchMove)
      return (
        (i.allowClick = !1),
        void (
          s.isTouched &&
          (Object.assign(o, { startX: c, startY: p, currentX: c, currentY: p }),
          (s.touchStartTime = E()))
        )
      );
    if (s.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
      if (i.isVertical()) {
        if (
          (p < o.startY && i.translate <= i.maxTranslate()) ||
          (p > o.startY && i.translate >= i.minTranslate())
        )
          return (s.isTouched = !1), void (s.isMoved = !1);
      } else if (
        (c < o.startX && i.translate <= i.maxTranslate()) ||
        (c > o.startX && i.translate >= i.minTranslate())
      )
        return;
    if (
      s.isTouchEvent &&
      t.activeElement &&
      a.target === t.activeElement &&
      x(a.target).is(s.focusableElements)
    )
      return (s.isMoved = !0), void (i.allowClick = !1);
    if (
      (s.allowTouchCallbacks && i.emit("touchMove", a),
      a.targetTouches && a.targetTouches.length > 1)
    )
      return;
    (o.currentX = c), (o.currentY = p);
    const u = o.currentX - o.startX,
      h = o.currentY - o.startY;
    if (i.params.threshold && Math.sqrt(u ** 2 + h ** 2) < i.params.threshold)
      return;
    if (void 0 === s.isScrolling) {
      let e;
      (i.isHorizontal() && o.currentY === o.startY) ||
      (i.isVertical() && o.currentX === o.startX)
        ? (s.isScrolling = !1)
        : u * u + h * h >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(h), Math.abs(u))) / Math.PI),
          (s.isScrolling = i.isHorizontal()
            ? e > n.touchAngle
            : 90 - e > n.touchAngle));
    }
    if (
      (s.isScrolling && i.emit("touchMoveOpposite", a),
      void 0 === s.startMoving &&
        ((o.currentX === o.startX && o.currentY === o.startY) ||
          (s.startMoving = !0)),
      s.isScrolling)
    )
      return void (s.isTouched = !1);
    if (!s.startMoving) return;
    (i.allowClick = !1),
      !n.cssMode && a.cancelable && a.preventDefault(),
      n.touchMoveStopPropagation && !n.nested && a.stopPropagation(),
      s.isMoved ||
        (n.loop && !n.cssMode && i.loopFix(),
        (s.startTranslate = i.getTranslate()),
        i.setTransition(0),
        i.animating &&
          i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
        (s.allowMomentumBounce = !1),
        !n.grabCursor ||
          (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
          i.setGrabCursor(!0),
        i.emit("sliderFirstMove", a)),
      i.emit("sliderMove", a),
      (s.isMoved = !0);
    let f = i.isHorizontal() ? u : h;
    (o.diff = f),
      (f *= n.touchRatio),
      r && (f = -f),
      (i.swipeDirection = f > 0 ? "prev" : "next"),
      (s.currentTranslate = f + s.startTranslate);
    let m = !0,
      v = n.resistanceRatio;
    if (
      (n.touchReleaseOnEdges && (v = 0),
      f > 0 && s.currentTranslate > i.minTranslate()
        ? ((m = !1),
          n.resistance &&
            (s.currentTranslate =
              i.minTranslate() -
              1 +
              (-i.minTranslate() + s.startTranslate + f) ** v))
        : f < 0 &&
          s.currentTranslate < i.maxTranslate() &&
          ((m = !1),
          n.resistance &&
            (s.currentTranslate =
              i.maxTranslate() +
              1 -
              (i.maxTranslate() - s.startTranslate - f) ** v)),
      m && (a.preventedByNestedSwiper = !0),
      !i.allowSlideNext &&
        "next" === i.swipeDirection &&
        s.currentTranslate < s.startTranslate &&
        (s.currentTranslate = s.startTranslate),
      !i.allowSlidePrev &&
        "prev" === i.swipeDirection &&
        s.currentTranslate > s.startTranslate &&
        (s.currentTranslate = s.startTranslate),
      i.allowSlidePrev ||
        i.allowSlideNext ||
        (s.currentTranslate = s.startTranslate),
      n.threshold > 0)
    ) {
      if (!(Math.abs(f) > n.threshold || s.allowThresholdMove))
        return void (s.currentTranslate = s.startTranslate);
      if (!s.allowThresholdMove)
        return (
          (s.allowThresholdMove = !0),
          (o.startX = o.currentX),
          (o.startY = o.currentY),
          (s.currentTranslate = s.startTranslate),
          void (o.diff = i.isHorizontal()
            ? o.currentX - o.startX
            : o.currentY - o.startY)
        );
    }
    n.followFinger &&
      !n.cssMode &&
      (((n.freeMode && n.freeMode.enabled && i.freeMode) ||
        n.watchSlidesProgress) &&
        (i.updateActiveIndex(), i.updateSlidesClasses()),
      i.params.freeMode &&
        n.freeMode.enabled &&
        i.freeMode &&
        i.freeMode.onTouchMove(),
      i.updateProgress(s.currentTranslate),
      i.setTranslate(s.currentTranslate));
  }
  function X(e) {
    const t = this,
      i = t.touchEventsData,
      { params: s, touches: n, rtlTranslate: o, slidesGrid: r, enabled: l } = t;
    if (!l) return;
    let a = e;
    if (
      (a.originalEvent && (a = a.originalEvent),
      i.allowTouchCallbacks && t.emit("touchEnd", a),
      (i.allowTouchCallbacks = !1),
      !i.isTouched)
    )
      return (
        i.isMoved && s.grabCursor && t.setGrabCursor(!1),
        (i.isMoved = !1),
        void (i.startMoving = !1)
      );
    s.grabCursor &&
      i.isMoved &&
      i.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const d = E(),
      c = d - i.touchStartTime;
    if (t.allowClick) {
      const e = a.path || (a.composedPath && a.composedPath());
      t.updateClickedSlide((e && e[0]) || a.target),
        t.emit("tap click", a),
        c < 300 &&
          d - i.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", a);
    }
    if (
      ((i.lastClickTime = E()),
      k(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !i.isTouched ||
        !i.isMoved ||
        !t.swipeDirection ||
        0 === n.diff ||
        i.currentTranslate === i.startTranslate)
    )
      return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
    let p;
    if (
      ((i.isTouched = !1),
      (i.isMoved = !1),
      (i.startMoving = !1),
      (p = s.followFinger
        ? o
          ? t.translate
          : -t.translate
        : -i.currentTranslate),
      s.cssMode)
    )
      return;
    if (t.params.freeMode && s.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: p });
    let u = 0,
      h = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < r.length;
      e += e < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
    ) {
      const t = e < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
      void 0 !== r[e + t]
        ? p >= r[e] && p < r[e + t] && ((u = e), (h = r[e + t] - r[e]))
        : p >= r[e] && ((u = e), (h = r[r.length - 1] - r[r.length - 2]));
    }
    const g = (p - r[u]) / h,
      f = u < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
    if (c > s.longSwipesMs) {
      if (!s.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (g >= s.longSwipesRatio ? t.slideTo(u + f) : t.slideTo(u)),
        "prev" === t.swipeDirection &&
          (g > 1 - s.longSwipesRatio ? t.slideTo(u + f) : t.slideTo(u));
    } else {
      if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (a.target === t.navigation.nextEl || a.target === t.navigation.prevEl)
        ? a.target === t.navigation.nextEl
          ? t.slideTo(u + f)
          : t.slideTo(u)
        : ("next" === t.swipeDirection && t.slideTo(u + f),
          "prev" === t.swipeDirection && t.slideTo(u));
    }
  }
  function Y() {
    const e = this,
      { params: t, el: i } = e;
    if (i && 0 === i.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: s, allowSlidePrev: n, snapGrid: o } = e;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses(),
      ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
      e.isEnd &&
      !e.isBeginning &&
      !e.params.centeredSlides
        ? e.slideTo(e.slides.length - 1, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0),
      e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(),
      (e.allowSlidePrev = n),
      (e.allowSlideNext = s),
      e.params.watchOverflow && o !== e.snapGrid && e.checkOverflow();
  }
  function U(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function K() {
    const e = this,
      { wrapperEl: t, rtlTranslate: i, enabled: s } = e;
    if (!s) return;
    let n;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      -0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const o = e.maxTranslate() - e.minTranslate();
    (n = 0 === o ? 0 : (e.translate - e.minTranslate()) / o),
      n !== e.progress && e.updateProgress(i ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  let Q = !1;
  function Z() {}
  const J = (e, t) => {
    const i = g(),
      {
        params: s,
        touchEvents: n,
        el: o,
        wrapperEl: r,
        device: l,
        support: a,
      } = e,
      d = !!s.nested,
      c = "on" === t ? "addEventListener" : "removeEventListener",
      p = t;
    if (a.touch) {
      const t = !(
        "touchstart" !== n.start ||
        !a.passiveListener ||
        !s.passiveListeners
      ) && { passive: !0, capture: !1 };
      o[c](n.start, e.onTouchStart, t),
        o[c](
          n.move,
          e.onTouchMove,
          a.passiveListener ? { passive: !1, capture: d } : d
        ),
        o[c](n.end, e.onTouchEnd, t),
        n.cancel && o[c](n.cancel, e.onTouchEnd, t);
    } else
      o[c](n.start, e.onTouchStart, !1),
        i[c](n.move, e.onTouchMove, d),
        i[c](n.end, e.onTouchEnd, !1);
    (s.preventClicks || s.preventClicksPropagation) &&
      o[c]("click", e.onClick, !0),
      s.cssMode && r[c]("scroll", e.onScroll),
      s.updateOnWindowResize
        ? e[p](
            l.ios || l.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            Y,
            !0
          )
        : e[p]("observerUpdate", Y, !0);
  };
  const ee = {
      attachEvents: function () {
        const e = this,
          t = g(),
          { params: i, support: s } = e;
        (e.onTouchStart = V.bind(e)),
          (e.onTouchMove = R.bind(e)),
          (e.onTouchEnd = X.bind(e)),
          i.cssMode && (e.onScroll = K.bind(e)),
          (e.onClick = U.bind(e)),
          s.touch && !Q && (t.addEventListener("touchstart", Z), (Q = !0)),
          J(e, "on");
      },
      detachEvents: function () {
        J(this, "off");
      },
    },
    te = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  const ie = {
    setBreakpoint: function () {
      const e = this,
        {
          activeIndex: t,
          initialized: i,
          loopedSlides: s = 0,
          params: n,
          $el: o,
        } = e,
        r = n.breakpoints;
      if (!r || (r && 0 === Object.keys(r).length)) return;
      const l = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
      if (!l || e.currentBreakpoint === l) return;
      const a = (l in r ? r[l] : void 0) || e.originalParams,
        d = te(e, n),
        c = te(e, a),
        p = n.enabled;
      d && !c
        ? (o.removeClass(
            `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
          ),
          e.emitContainerClasses())
        : !d &&
          c &&
          (o.addClass(`${n.containerModifierClass}grid`),
          ((a.grid.fill && "column" === a.grid.fill) ||
            (!a.grid.fill && "column" === n.grid.fill)) &&
            o.addClass(`${n.containerModifierClass}grid-column`),
          e.emitContainerClasses());
      const u = a.direction && a.direction !== n.direction,
        h = n.loop && (a.slidesPerView !== n.slidesPerView || u);
      u && i && e.changeDirection(), A(e.params, a);
      const g = e.params.enabled;
      Object.assign(e, {
        allowTouchMove: e.params.allowTouchMove,
        allowSlideNext: e.params.allowSlideNext,
        allowSlidePrev: e.params.allowSlidePrev,
      }),
        p && !g ? e.disable() : !p && g && e.enable(),
        (e.currentBreakpoint = l),
        e.emit("_beforeBreakpoint", a),
        h &&
          i &&
          (e.loopDestroy(),
          e.loopCreate(),
          e.updateSlides(),
          e.slideTo(t - s + e.loopedSlides, 0, !1)),
        e.emit("breakpoint", a);
    },
    getBreakpoint: function (e, t = "window", i) {
      if (!e || ("container" === t && !i)) return;
      let s = !1;
      const n = m(),
        o = "window" === t ? n.innerHeight : i.clientHeight,
        r = Object.keys(e).map((e) => {
          if ("string" == typeof e && 0 === e.indexOf("@")) {
            const t = parseFloat(e.substr(1));
            return { value: o * t, point: e };
          }
          return { value: e, point: e };
        });
      r.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
      for (let e = 0; e < r.length; e += 1) {
        const { point: o, value: l } = r[e];
        "window" === t
          ? n.matchMedia(`(min-width: ${l}px)`).matches && (s = o)
          : l <= i.clientWidth && (s = o);
      }
      return s || "max";
    },
  };
  const se = {
    addClasses: function () {
      const e = this,
        { classNames: t, params: i, rtl: s, $el: n, device: o, support: r } = e,
        l = (function (e, t) {
          const i = [];
          return (
            e.forEach((e) => {
              "object" == typeof e
                ? Object.keys(e).forEach((s) => {
                    e[s] && i.push(t + s);
                  })
                : "string" == typeof e && i.push(t + e);
            }),
            i
          );
        })(
          [
            "initialized",
            i.direction,
            { "pointer-events": !r.touch },
            { "free-mode": e.params.freeMode && i.freeMode.enabled },
            { autoheight: i.autoHeight },
            { rtl: s },
            { grid: i.grid && i.grid.rows > 1 },
            {
              "grid-column":
                i.grid && i.grid.rows > 1 && "column" === i.grid.fill,
            },
            { android: o.android },
            { ios: o.ios },
            { "css-mode": i.cssMode },
            { centered: i.cssMode && i.centeredSlides },
          ],
          i.containerModifierClass
        );
      t.push(...l), n.addClass([...t].join(" ")), e.emitContainerClasses();
    },
    removeClasses: function () {
      const { $el: e, classNames: t } = this;
      e.removeClass(t.join(" ")), this.emitContainerClasses();
    },
  };
  const ne = {
    loadImage: function (e, t, i, s, n, o) {
      const r = m();
      let l;
      function a() {
        o && o();
      }
      x(e).parent("picture")[0] || (e.complete && n)
        ? a()
        : t
        ? ((l = new r.Image()),
          (l.onload = a),
          (l.onerror = a),
          s && (l.sizes = s),
          i && (l.srcset = i),
          t && (l.src = t))
        : a();
    },
    preloadImages: function () {
      const e = this;
      function t() {
        null != e &&
          e &&
          !e.destroyed &&
          (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
          e.imagesLoaded === e.imagesToLoad.length &&
            (e.params.updateOnImagesReady && e.update(),
            e.emit("imagesReady")));
      }
      e.imagesToLoad = e.$el.find("img");
      for (let i = 0; i < e.imagesToLoad.length; i += 1) {
        const s = e.imagesToLoad[i];
        e.loadImage(
          s,
          s.currentSrc || s.getAttribute("src"),
          s.srcset || s.getAttribute("srcset"),
          s.sizes || s.getAttribute("sizes"),
          !0,
          t
        );
      }
    },
  };
  const oe = {
    init: !0,
    direction: "horizontal",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 0,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    preloadImages: !0,
    updateOnImagesReady: !0,
    loop: !1,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: !1,
    loopPreventsSlide: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-invisible-blank",
    slideActiveClass: "swiper-slide-active",
    slideDuplicateActiveClass: "swiper-slide-duplicate-active",
    slideVisibleClass: "swiper-slide-visible",
    slideDuplicateClass: "swiper-slide-duplicate",
    slideNextClass: "swiper-slide-next",
    slideDuplicateNextClass: "swiper-slide-duplicate-next",
    slidePrevClass: "swiper-slide-prev",
    slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
    wrapperClass: "swiper-wrapper",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function re(e, t) {
    return function (i = {}) {
      const s = Object.keys(i)[0],
        n = i[s];
      "object" == typeof n && null !== n
        ? (["navigation", "pagination", "scrollbar"].indexOf(s) >= 0 &&
            !0 === e[s] &&
            (e[s] = { auto: !0 }),
          s in e && "enabled" in n
            ? (!0 === e[s] && (e[s] = { enabled: !0 }),
              "object" != typeof e[s] ||
                "enabled" in e[s] ||
                (e[s].enabled = !0),
              e[s] || (e[s] = { enabled: !1 }),
              A(t, i))
            : A(t, i))
        : A(t, i);
    };
  }
  const le = {
      eventsEmitter: G,
      update: N,
      translate: j,
      transition: {
        setTransition: function (e, t) {
          const i = this;
          i.params.cssMode || i.$wrapperEl.transition(e),
            i.emit("setTransition", e, t);
        },
        transitionStart: function (e = !0, t) {
          const i = this,
            { params: s } = i;
          s.cssMode ||
            (s.autoHeight && i.updateAutoHeight(),
            F({ swiper: i, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e = !0, t) {
          const i = this,
            { params: s } = i;
          (i.animating = !1),
            s.cssMode ||
              (i.setTransition(0),
              F({ swiper: i, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: q,
      loop: W,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            t.support.touch ||
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const i =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          (i.style.cursor = "move"),
            (i.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
            (i.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
            (i.style.cursor = e ? "grabbing" : "grab");
        },
        unsetGrabCursor: function () {
          const e = this;
          e.support.touch ||
            (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = "");
        },
      },
      events: ee,
      breakpoints: ie,
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: i } = e,
            { slidesOffsetBefore: s } = i;
          if (s) {
            const t = e.slides.length - 1,
              i = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * s;
            e.isLocked = e.size > i;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === i.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === i.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: se,
      images: ne,
    },
    ae = {};
  class de {
    constructor(...e) {
      let t, i;
      if (
        (1 === e.length &&
        e[0].constructor &&
        "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
          ? (i = e[0])
          : ([t, i] = e),
        i || (i = {}),
        (i = A({}, i)),
        t && !i.el && (i.el = t),
        i.el && x(i.el).length > 1)
      ) {
        const e = [];
        return (
          x(i.el).each((t) => {
            const s = A({}, i, { el: t });
            e.push(new de(s));
          }),
          e
        );
      }
      const s = this;
      (s.__swiper__ = !0),
        (s.support = _()),
        (s.device = H({ userAgent: i.userAgent })),
        (s.browser = B()),
        (s.eventsListeners = {}),
        (s.eventsAnyListeners = []),
        (s.modules = [...s.__modules__]),
        i.modules && Array.isArray(i.modules) && s.modules.push(...i.modules);
      const n = {};
      s.modules.forEach((e) => {
        e({
          swiper: s,
          extendParams: re(i, n),
          on: s.on.bind(s),
          once: s.once.bind(s),
          off: s.off.bind(s),
          emit: s.emit.bind(s),
        });
      });
      const o = A({}, oe, n);
      return (
        (s.params = A({}, o, ae, i)),
        (s.originalParams = A({}, s.params)),
        (s.passedParams = A({}, i)),
        s.params &&
          s.params.on &&
          Object.keys(s.params.on).forEach((e) => {
            s.on(e, s.params.on[e]);
          }),
        s.params && s.params.onAny && s.onAny(s.params.onAny),
        (s.$ = x),
        Object.assign(s, {
          enabled: s.params.enabled,
          el: t,
          classNames: [],
          slides: x(),
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === s.params.direction,
          isVertical: () => "vertical" === s.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          allowSlideNext: s.params.allowSlideNext,
          allowSlidePrev: s.params.allowSlidePrev,
          touchEvents: (function () {
            const e = ["touchstart", "touchmove", "touchend", "touchcancel"],
              t = ["pointerdown", "pointermove", "pointerup"];
            return (
              (s.touchEventsTouch = {
                start: e[0],
                move: e[1],
                end: e[2],
                cancel: e[3],
              }),
              (s.touchEventsDesktop = { start: t[0], move: t[1], end: t[2] }),
              s.support.touch || !s.params.simulateTouch
                ? s.touchEventsTouch
                : s.touchEventsDesktop
            );
          })(),
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: s.params.focusableElements,
            lastClickTime: E(),
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            isTouchEvent: void 0,
            startMoving: void 0,
          },
          allowClick: !0,
          allowTouchMove: s.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        s.emit("_swiper"),
        s.params.init && s.init(),
        s
      );
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const i = this;
      e = Math.min(Math.max(e, 0), 1);
      const s = i.minTranslate(),
        n = (i.maxTranslate() - s) * e + s;
      i.translateTo(n, void 0 === t ? 0 : t),
        i.updateActiveIndex(),
        i.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass)
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return e.className
        .split(" ")
        .filter(
          (e) =>
            0 === e.indexOf("swiper-slide") ||
            0 === e.indexOf(t.params.slideClass)
        )
        .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.each((i) => {
        const s = e.getSlideClasses(i);
        t.push({ slideEl: i, classNames: s }), e.emit("_slideClass", i, s);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e = "current", t = !1) {
      const {
        params: i,
        slides: s,
        slidesGrid: n,
        slidesSizesGrid: o,
        size: r,
        activeIndex: l,
      } = this;
      let a = 1;
      if (i.centeredSlides) {
        let e,
          t = s[l].swiperSlideSize;
        for (let i = l + 1; i < s.length; i += 1)
          s[i] &&
            !e &&
            ((t += s[i].swiperSlideSize), (a += 1), t > r && (e = !0));
        for (let i = l - 1; i >= 0; i -= 1)
          s[i] &&
            !e &&
            ((t += s[i].swiperSlideSize), (a += 1), t > r && (e = !0));
      } else if ("current" === e)
        for (let e = l + 1; e < s.length; e += 1) {
          (t ? n[e] + o[e] - n[l] < r : n[e] - n[l] < r) && (a += 1);
        }
      else
        for (let e = l - 1; e >= 0; e -= 1) {
          n[l] - n[e] < r && (a += 1);
        }
      return a;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: i } = e;
      function s() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let n;
      i.breakpoints && e.setBreakpoint(),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        e.params.freeMode && e.params.freeMode.enabled
          ? (s(), e.params.autoHeight && e.updateAutoHeight())
          : ((n =
              ("auto" === e.params.slidesPerView ||
                e.params.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0)),
            n || s()),
        i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t = !0) {
      const i = this,
        s = i.params.direction;
      return (
        e || (e = "horizontal" === s ? "vertical" : "horizontal"),
        e === s ||
          ("horizontal" !== e && "vertical" !== e) ||
          (i.$el
            .removeClass(`${i.params.containerModifierClass}${s}`)
            .addClass(`${i.params.containerModifierClass}${e}`),
          i.emitContainerClasses(),
          (i.params.direction = e),
          i.slides.each((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          i.emit("changeDirection"),
          t && i.update()),
        i
      );
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      const i = x(e || t.params.el);
      if (!(e = i[0])) return !1;
      e.swiper = t;
      const s = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let n = (() => {
        if (e && e.shadowRoot && e.shadowRoot.querySelector) {
          const t = x(e.shadowRoot.querySelector(s()));
          return (t.children = (e) => i.children(e)), t;
        }
        return i.children(s());
      })();
      if (0 === n.length && t.params.createElements) {
        const e = g().createElement("div");
        (n = x(e)),
          (e.className = t.params.wrapperClass),
          i.append(e),
          i.children(`.${t.params.slideClass}`).each((e) => {
            n.append(e);
          });
      }
      return (
        Object.assign(t, {
          $el: i,
          el: e,
          $wrapperEl: n,
          wrapperEl: n[0],
          mounted: !0,
          rtl: "rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === e.dir.toLowerCase() || "rtl" === i.css("direction")),
          wrongRTL: "-webkit-box" === n.css("display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      return (
        !1 === t.mount(e) ||
          (t.emit("beforeInit"),
          t.params.breakpoints && t.setBreakpoint(),
          t.addClasses(),
          t.params.loop && t.loopCreate(),
          t.updateSize(),
          t.updateSlides(),
          t.params.watchOverflow && t.checkOverflow(),
          t.params.grabCursor && t.enabled && t.setGrabCursor(),
          t.params.preloadImages && t.preloadImages(),
          t.params.loop
            ? t.slideTo(
                t.params.initialSlide + t.loopedSlides,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              )
            : t.slideTo(
                t.params.initialSlide,
                0,
                t.params.runCallbacksOnInit,
                !1,
                !0
              ),
          t.attachEvents(),
          (t.initialized = !0),
          t.emit("init"),
          t.emit("afterInit")),
        t
      );
    }
    destroy(e = !0, t = !0) {
      const i = this,
        { params: s, $el: n, $wrapperEl: o, slides: r } = i;
      return (
        void 0 === i.params ||
          i.destroyed ||
          (i.emit("beforeDestroy"),
          (i.initialized = !1),
          i.detachEvents(),
          s.loop && i.loopDestroy(),
          t &&
            (i.removeClasses(),
            n.removeAttr("style"),
            o.removeAttr("style"),
            r &&
              r.length &&
              r
                .removeClass(
                  [
                    s.slideVisibleClass,
                    s.slideActiveClass,
                    s.slideNextClass,
                    s.slidePrevClass,
                  ].join(" ")
                )
                .removeAttr("style")
                .removeAttr("data-swiper-slide-index")),
          i.emit("destroy"),
          Object.keys(i.eventsListeners).forEach((e) => {
            i.off(e);
          }),
          !1 !== e &&
            ((i.$el[0].swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(i)),
          (i.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      A(ae, e);
    }
    static get extendedDefaults() {
      return ae;
    }
    static get defaults() {
      return oe;
    }
    static installModule(e) {
      de.prototype.__modules__ || (de.prototype.__modules__ = []);
      const t = de.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => de.installModule(e)), de)
        : (de.installModule(e), de);
    }
  }
  Object.keys(le).forEach((e) => {
    Object.keys(le[e]).forEach((t) => {
      de.prototype[t] = le[e][t];
    });
  }),
    de.use([
      function ({ swiper: e, on: t, emit: i }) {
        const s = m();
        let n = null;
        const o = () => {
            e &&
              !e.destroyed &&
              e.initialized &&
              (i("beforeResize"), i("resize"));
          },
          r = () => {
            e && !e.destroyed && e.initialized && i("orientationchange");
          };
        t("init", () => {
          e.params.resizeObserver && void 0 !== s.ResizeObserver
            ? e &&
              !e.destroyed &&
              e.initialized &&
              ((n = new ResizeObserver((t) => {
                const { width: i, height: s } = e;
                let n = i,
                  r = s;
                t.forEach(
                  ({ contentBoxSize: t, contentRect: i, target: s }) => {
                    (s && s !== e.el) ||
                      ((n = i ? i.width : (t[0] || t).inlineSize),
                      (r = i ? i.height : (t[0] || t).blockSize));
                  }
                ),
                  (n === i && r === s) || o();
              })),
              n.observe(e.el))
            : (s.addEventListener("resize", o),
              s.addEventListener("orientationchange", r));
        }),
          t("destroy", () => {
            n && n.unobserve && e.el && (n.unobserve(e.el), (n = null)),
              s.removeEventListener("resize", o),
              s.removeEventListener("orientationchange", r);
          });
      },
      function ({ swiper: e, extendParams: t, on: i, emit: s }) {
        const n = [],
          o = m(),
          r = (e, t = {}) => {
            const i = new (o.MutationObserver || o.WebkitMutationObserver)(
              (e) => {
                if (1 === e.length) return void s("observerUpdate", e[0]);
                const t = function () {
                  s("observerUpdate", e[0]);
                };
                o.requestAnimationFrame
                  ? o.requestAnimationFrame(t)
                  : o.setTimeout(t, 0);
              }
            );
            i.observe(e, {
              attributes: void 0 === t.attributes || t.attributes,
              childList: void 0 === t.childList || t.childList,
              characterData: void 0 === t.characterData || t.characterData,
            }),
              n.push(i);
          };
        t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (e.params.observer) {
              if (e.params.observeParents) {
                const t = e.$el.parents();
                for (let e = 0; e < t.length; e += 1) r(t[e]);
              }
              r(e.$el[0], { childList: e.params.observeSlideChildren }),
                r(e.$wrapperEl[0], { attributes: !1 });
            }
          }),
          i("destroy", () => {
            n.forEach((e) => {
              e.disconnect();
            }),
              n.splice(0, n.length);
          });
      },
    ]);
  const ce = de;
  function pe(e, t, i, s) {
    const n = g();
    return (
      e.params.createElements &&
        Object.keys(s).forEach((o) => {
          if (!i[o] && !0 === i.auto) {
            let r = e.$el.children(`.${s[o]}`)[0];
            r ||
              ((r = n.createElement("div")),
              (r.className = s[o]),
              e.$el.append(r)),
              (i[o] = r),
              (t[o] = r);
          }
        }),
      i
    );
  }
  function ue({ swiper: e, extendParams: t, on: i, emit: s }) {
    function n(t) {
      let i;
      return (
        t &&
          ((i = x(t)),
          e.params.uniqueNavElements &&
            "string" == typeof t &&
            i.length > 1 &&
            1 === e.$el.find(t).length &&
            (i = e.$el.find(t))),
        i
      );
    }
    function o(t, i) {
      const s = e.params.navigation;
      t &&
        t.length > 0 &&
        (t[i ? "addClass" : "removeClass"](s.disabledClass),
        t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = i),
        e.params.watchOverflow &&
          e.enabled &&
          t[e.isLocked ? "addClass" : "removeClass"](s.lockClass));
    }
    function r() {
      if (e.params.loop) return;
      const { $nextEl: t, $prevEl: i } = e.navigation;
      o(i, e.isBeginning && !e.params.rewind),
        o(t, e.isEnd && !e.params.rewind);
    }
    function l(t) {
      t.preventDefault(),
        (!e.isBeginning || e.params.loop || e.params.rewind) && e.slidePrev();
    }
    function a(t) {
      t.preventDefault(),
        (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
    }
    function d() {
      const t = e.params.navigation;
      if (
        ((e.params.navigation = pe(
          e,
          e.originalParams.navigation,
          e.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
        )),
        !t.nextEl && !t.prevEl)
      )
        return;
      const i = n(t.nextEl),
        s = n(t.prevEl);
      i && i.length > 0 && i.on("click", a),
        s && s.length > 0 && s.on("click", l),
        Object.assign(e.navigation, {
          $nextEl: i,
          nextEl: i && i[0],
          $prevEl: s,
          prevEl: s && s[0],
        }),
        e.enabled ||
          (i && i.addClass(t.lockClass), s && s.addClass(t.lockClass));
    }
    function c() {
      const { $nextEl: t, $prevEl: i } = e.navigation;
      t &&
        t.length &&
        (t.off("click", a), t.removeClass(e.params.navigation.disabledClass)),
        i &&
          i.length &&
          (i.off("click", l), i.removeClass(e.params.navigation.disabledClass));
    }
    t({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
      },
    }),
      (e.navigation = {
        nextEl: null,
        $nextEl: null,
        prevEl: null,
        $prevEl: null,
      }),
      i("init", () => {
        d(), r();
      }),
      i("toEdge fromEdge lock unlock", () => {
        r();
      }),
      i("destroy", () => {
        c();
      }),
      i("enable disable", () => {
        const { $nextEl: t, $prevEl: i } = e.navigation;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.navigation.lockClass
          ),
          i &&
            i[e.enabled ? "removeClass" : "addClass"](
              e.params.navigation.lockClass
            );
      }),
      i("click", (t, i) => {
        const { $nextEl: n, $prevEl: o } = e.navigation,
          r = i.target;
        if (e.params.navigation.hideOnClick && !x(r).is(o) && !x(r).is(n)) {
          if (
            e.pagination &&
            e.params.pagination &&
            e.params.pagination.clickable &&
            (e.pagination.el === r || e.pagination.el.contains(r))
          )
            return;
          let t;
          n
            ? (t = n.hasClass(e.params.navigation.hiddenClass))
            : o && (t = o.hasClass(e.params.navigation.hiddenClass)),
            s(!0 === t ? "navigationShow" : "navigationHide"),
            n && n.toggleClass(e.params.navigation.hiddenClass),
            o && o.toggleClass(e.params.navigation.hiddenClass);
        }
      }),
      Object.assign(e.navigation, { update: r, init: d, destroy: c });
  }
  function he(e = "") {
    return `.${e
      .trim()
      .replace(/([\.:!\/])/g, "\\$1")
      .replace(/ /g, ".")}`;
  }
  function ge({ swiper: e, extendParams: t, on: i, emit: s }) {
    const n = "swiper-pagination";
    let o;
    t({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${n}-bullet`,
        bulletActiveClass: `${n}-bullet-active`,
        modifierClass: `${n}-`,
        currentClass: `${n}-current`,
        totalClass: `${n}-total`,
        hiddenClass: `${n}-hidden`,
        progressbarFillClass: `${n}-progressbar-fill`,
        progressbarOppositeClass: `${n}-progressbar-opposite`,
        clickableClass: `${n}-clickable`,
        lockClass: `${n}-lock`,
        horizontalClass: `${n}-horizontal`,
        verticalClass: `${n}-vertical`,
      },
    }),
      (e.pagination = { el: null, $el: null, bullets: [] });
    let r = 0;
    function l() {
      return (
        !e.params.pagination.el ||
        !e.pagination.el ||
        !e.pagination.$el ||
        0 === e.pagination.$el.length
      );
    }
    function a(t, i) {
      const { bulletActiveClass: s } = e.params.pagination;
      t[i]().addClass(`${s}-${i}`)[i]().addClass(`${s}-${i}-${i}`);
    }
    function d() {
      const t = e.rtl,
        i = e.params.pagination;
      if (l()) return;
      const n =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length,
        d = e.pagination.$el;
      let c;
      const p = e.params.loop
        ? Math.ceil((n - 2 * e.loopedSlides) / e.params.slidesPerGroup)
        : e.snapGrid.length;
      if (
        (e.params.loop
          ? ((c = Math.ceil(
              (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
            )),
            c > n - 1 - 2 * e.loopedSlides && (c -= n - 2 * e.loopedSlides),
            c > p - 1 && (c -= p),
            c < 0 && "bullets" !== e.params.paginationType && (c = p + c))
          : (c = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
        "bullets" === i.type &&
          e.pagination.bullets &&
          e.pagination.bullets.length > 0)
      ) {
        const s = e.pagination.bullets;
        let n, l, p;
        if (
          (i.dynamicBullets &&
            ((o = s.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
            d.css(
              e.isHorizontal() ? "width" : "height",
              o * (i.dynamicMainBullets + 4) + "px"
            ),
            i.dynamicMainBullets > 1 &&
              void 0 !== e.previousIndex &&
              ((r += c - (e.previousIndex - e.loopedSlides || 0)),
              r > i.dynamicMainBullets - 1
                ? (r = i.dynamicMainBullets - 1)
                : r < 0 && (r = 0)),
            (n = Math.max(c - r, 0)),
            (l = n + (Math.min(s.length, i.dynamicMainBullets) - 1)),
            (p = (l + n) / 2)),
          s.removeClass(
            ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
              .map((e) => `${i.bulletActiveClass}${e}`)
              .join(" ")
          ),
          d.length > 1)
        )
          s.each((e) => {
            const t = x(e),
              s = t.index();
            s === c && t.addClass(i.bulletActiveClass),
              i.dynamicBullets &&
                (s >= n && s <= l && t.addClass(`${i.bulletActiveClass}-main`),
                s === n && a(t, "prev"),
                s === l && a(t, "next"));
          });
        else {
          const t = s.eq(c),
            o = t.index();
          if ((t.addClass(i.bulletActiveClass), i.dynamicBullets)) {
            const t = s.eq(n),
              r = s.eq(l);
            for (let e = n; e <= l; e += 1)
              s.eq(e).addClass(`${i.bulletActiveClass}-main`);
            if (e.params.loop)
              if (o >= s.length) {
                for (let e = i.dynamicMainBullets; e >= 0; e -= 1)
                  s.eq(s.length - e).addClass(`${i.bulletActiveClass}-main`);
                s.eq(s.length - i.dynamicMainBullets - 1).addClass(
                  `${i.bulletActiveClass}-prev`
                );
              } else a(t, "prev"), a(r, "next");
            else a(t, "prev"), a(r, "next");
          }
        }
        if (i.dynamicBullets) {
          const n = Math.min(s.length, i.dynamicMainBullets + 4),
            r = (o * n - o) / 2 - p * o,
            l = t ? "right" : "left";
          s.css(e.isHorizontal() ? l : "top", `${r}px`);
        }
      }
      if (
        ("fraction" === i.type &&
          (d.find(he(i.currentClass)).text(i.formatFractionCurrent(c + 1)),
          d.find(he(i.totalClass)).text(i.formatFractionTotal(p))),
        "progressbar" === i.type)
      ) {
        let t;
        t = i.progressbarOpposite
          ? e.isHorizontal()
            ? "vertical"
            : "horizontal"
          : e.isHorizontal()
          ? "horizontal"
          : "vertical";
        const s = (c + 1) / p;
        let n = 1,
          o = 1;
        "horizontal" === t ? (n = s) : (o = s),
          d
            .find(he(i.progressbarFillClass))
            .transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${o})`)
            .transition(e.params.speed);
      }
      "custom" === i.type && i.renderCustom
        ? (d.html(i.renderCustom(e, c + 1, p)), s("paginationRender", d[0]))
        : s("paginationUpdate", d[0]),
        e.params.watchOverflow &&
          e.enabled &&
          d[e.isLocked ? "addClass" : "removeClass"](i.lockClass);
    }
    function c() {
      const t = e.params.pagination;
      if (l()) return;
      const i =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length,
        n = e.pagination.$el;
      let o = "";
      if ("bullets" === t.type) {
        let s = e.params.loop
          ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
          : e.snapGrid.length;
        e.params.freeMode &&
          e.params.freeMode.enabled &&
          !e.params.loop &&
          s > i &&
          (s = i);
        for (let i = 0; i < s; i += 1)
          t.renderBullet
            ? (o += t.renderBullet.call(e, i, t.bulletClass))
            : (o += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
        n.html(o), (e.pagination.bullets = n.find(he(t.bulletClass)));
      }
      "fraction" === t.type &&
        ((o = t.renderFraction
          ? t.renderFraction.call(e, t.currentClass, t.totalClass)
          : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
        n.html(o)),
        "progressbar" === t.type &&
          ((o = t.renderProgressbar
            ? t.renderProgressbar.call(e, t.progressbarFillClass)
            : `<span class="${t.progressbarFillClass}"></span>`),
          n.html(o)),
        "custom" !== t.type && s("paginationRender", e.pagination.$el[0]);
    }
    function p() {
      e.params.pagination = pe(
        e,
        e.originalParams.pagination,
        e.params.pagination,
        { el: "swiper-pagination" }
      );
      const t = e.params.pagination;
      if (!t.el) return;
      let i = x(t.el);
      0 !== i.length &&
        (e.params.uniqueNavElements &&
          "string" == typeof t.el &&
          i.length > 1 &&
          ((i = e.$el.find(t.el)),
          i.length > 1 &&
            (i = i.filter((t) => x(t).parents(".swiper")[0] === e.el))),
        "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
        i.addClass(t.modifierClass + t.type),
        i.addClass(t.modifierClass + e.params.direction),
        "bullets" === t.type &&
          t.dynamicBullets &&
          (i.addClass(`${t.modifierClass}${t.type}-dynamic`),
          (r = 0),
          t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
        "progressbar" === t.type &&
          t.progressbarOpposite &&
          i.addClass(t.progressbarOppositeClass),
        t.clickable &&
          i.on("click", he(t.bulletClass), function (t) {
            t.preventDefault();
            let i = x(this).index() * e.params.slidesPerGroup;
            e.params.loop && (i += e.loopedSlides), e.slideTo(i);
          }),
        Object.assign(e.pagination, { $el: i, el: i[0] }),
        e.enabled || i.addClass(t.lockClass));
    }
    function u() {
      const t = e.params.pagination;
      if (l()) return;
      const i = e.pagination.$el;
      i.removeClass(t.hiddenClass),
        i.removeClass(t.modifierClass + t.type),
        i.removeClass(t.modifierClass + e.params.direction),
        e.pagination.bullets &&
          e.pagination.bullets.removeClass &&
          e.pagination.bullets.removeClass(t.bulletActiveClass),
        t.clickable && i.off("click", he(t.bulletClass));
    }
    i("init", () => {
      p(), c(), d();
    }),
      i("activeIndexChange", () => {
        (e.params.loop || void 0 === e.snapIndex) && d();
      }),
      i("snapIndexChange", () => {
        e.params.loop || d();
      }),
      i("slidesLengthChange", () => {
        e.params.loop && (c(), d());
      }),
      i("snapGridLengthChange", () => {
        e.params.loop || (c(), d());
      }),
      i("destroy", () => {
        u();
      }),
      i("enable disable", () => {
        const { $el: t } = e.pagination;
        t &&
          t[e.enabled ? "removeClass" : "addClass"](
            e.params.pagination.lockClass
          );
      }),
      i("lock unlock", () => {
        d();
      }),
      i("click", (t, i) => {
        const n = i.target,
          { $el: o } = e.pagination;
        if (
          e.params.pagination.el &&
          e.params.pagination.hideOnClick &&
          o.length > 0 &&
          !x(n).hasClass(e.params.pagination.bulletClass)
        ) {
          if (
            e.navigation &&
            ((e.navigation.nextEl && n === e.navigation.nextEl) ||
              (e.navigation.prevEl && n === e.navigation.prevEl))
          )
            return;
          const t = o.hasClass(e.params.pagination.hiddenClass);
          s(!0 === t ? "paginationShow" : "paginationHide"),
            o.toggleClass(e.params.pagination.hiddenClass);
        }
      }),
      Object.assign(e.pagination, {
        render: c,
        update: d,
        init: p,
        destroy: u,
      });
  }
  function fe() {
    let e = document.querySelectorAll(
      '[class*="_swiper"]:not(.swiper-wrapper)'
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  var me;
  window.addEventListener("load", function (e) {
    fe(),
      document.querySelector(".swiper") &&
        new ce(".slider-rooms__body", {
          modules: [ue, ge],
          observer: !0,
          observeParents: !0,
          slidesPerView: "auto",
          spaceBetween: 24,
          speed: 800,
          loop: !0,
          loopAdditionalSlides: 5,
          watchOverflow: !0,
          preloadImages: !1,
          parallax: !0,
          pagination: { el: ".slider-rooms__dotts", clickable: !0 },
          navigation: {
            nextEl: ".slider-rooms .slider-arrow_next",
            prevEl: ".slider-rooms .slider-arrow_prev",
          },
        }),
      document.querySelector(".swiper") &&
        new ce(".slider-tips__body", {
          observer: !0,
          observeParents: !0,
          slidesPerView: 3,
          spaceBetween: 32,
          speed: 800,
          loop: !0,
          watchOverflow: !0,
          modules: [ue, ge],
          pagination: { el: ".slider-tips__dotts", clickable: !0 },
          navigation: {
            nextEl: ".slider-tips .slider-arrow_next",
            prevEl: ".slider-tips .slider-arrow_prev",
          },
          breakpoints: {
            320: { slidesPerView: 1.1, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            992: { slidesPerView: 3, spaceBetween: 32 },
          },
        });
  }),
    (me = function (e) {
      var t = window.Slick || {};
      ((t = (function () {
        var t = 0;
        return function (i, s) {
          var n,
            o = this;
          (o.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: e(i),
            appendDots: e(i),
            arrows: !0,
            asNavFor: null,
            prevArrow:
              '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow:
              '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function (t, i) {
              return e('<button type="button" />').text(i + 1);
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: 0.35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3,
          }),
            (o.initials = {
              animating: !1,
              dragging: !1,
              autoPlayTimer: null,
              currentDirection: 0,
              currentLeft: null,
              currentSlide: 0,
              direction: 1,
              $dots: null,
              listWidth: null,
              listHeight: null,
              loadIndex: 0,
              $nextArrow: null,
              $prevArrow: null,
              scrolling: !1,
              slideCount: null,
              slideWidth: null,
              $slideTrack: null,
              $slides: null,
              sliding: !1,
              slideOffset: 0,
              swipeLeft: null,
              swiping: !1,
              $list: null,
              touchObject: {},
              transformsEnabled: !1,
              unslicked: !1,
            }),
            e.extend(o, o.initials),
            (o.activeBreakpoint = null),
            (o.animType = null),
            (o.animProp = null),
            (o.breakpoints = []),
            (o.breakpointSettings = []),
            (o.cssTransitions = !1),
            (o.focussed = !1),
            (o.interrupted = !1),
            (o.hidden = "hidden"),
            (o.paused = !0),
            (o.positionProp = null),
            (o.respondTo = null),
            (o.rowCount = 1),
            (o.shouldClick = !0),
            (o.$slider = e(i)),
            (o.$slidesCache = null),
            (o.transformType = null),
            (o.transitionType = null),
            (o.visibilityChange = "visibilitychange"),
            (o.windowWidth = 0),
            (o.windowTimer = null),
            (n = e(i).data("slick") || {}),
            (o.options = e.extend({}, o.defaults, s, n)),
            (o.currentSlide = o.options.initialSlide),
            (o.originalSettings = o.options),
            void 0 !== document.mozHidden
              ? ((o.hidden = "mozHidden"),
                (o.visibilityChange = "mozvisibilitychange"))
              : void 0 !== document.webkitHidden &&
                ((o.hidden = "webkitHidden"),
                (o.visibilityChange = "webkitvisibilitychange")),
            (o.autoPlay = e.proxy(o.autoPlay, o)),
            (o.autoPlayClear = e.proxy(o.autoPlayClear, o)),
            (o.autoPlayIterator = e.proxy(o.autoPlayIterator, o)),
            (o.changeSlide = e.proxy(o.changeSlide, o)),
            (o.clickHandler = e.proxy(o.clickHandler, o)),
            (o.selectHandler = e.proxy(o.selectHandler, o)),
            (o.setPosition = e.proxy(o.setPosition, o)),
            (o.swipeHandler = e.proxy(o.swipeHandler, o)),
            (o.dragHandler = e.proxy(o.dragHandler, o)),
            (o.keyHandler = e.proxy(o.keyHandler, o)),
            (o.instanceUid = t++),
            (o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
            o.registerBreakpoints(),
            o.init(!0);
        };
      })()).prototype.activateADA = function () {
        this.$slideTrack
          .find(".slick-active")
          .attr({ "aria-hidden": "false" })
          .find("a, input, button, select")
          .attr({ tabindex: "0" });
      }),
        (t.prototype.addSlide = t.prototype.slickAdd =
          function (t, i, s) {
            var n = this;
            if ("boolean" == typeof i) (s = i), (i = null);
            else if (i < 0 || i >= n.slideCount) return !1;
            n.unload(),
              "number" == typeof i
                ? 0 === i && 0 === n.$slides.length
                  ? e(t).appendTo(n.$slideTrack)
                  : s
                  ? e(t).insertBefore(n.$slides.eq(i))
                  : e(t).insertAfter(n.$slides.eq(i))
                : !0 === s
                ? e(t).prependTo(n.$slideTrack)
                : e(t).appendTo(n.$slideTrack),
              (n.$slides = n.$slideTrack.children(this.options.slide)),
              n.$slideTrack.children(this.options.slide).detach(),
              n.$slideTrack.append(n.$slides),
              n.$slides.each(function (t, i) {
                e(i).attr("data-slick-index", t);
              }),
              (n.$slidesCache = n.$slides),
              n.reinit();
          }),
        (t.prototype.animateHeight = function () {
          var e = this;
          if (
            1 === e.options.slidesToShow &&
            !0 === e.options.adaptiveHeight &&
            !1 === e.options.vertical
          ) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.animate({ height: t }, e.options.speed);
          }
        }),
        (t.prototype.animateSlide = function (t, i) {
          var s = {},
            n = this;
          n.animateHeight(),
            !0 === n.options.rtl && !1 === n.options.vertical && (t = -t),
            !1 === n.transformsEnabled
              ? !1 === n.options.vertical
                ? n.$slideTrack.animate(
                    { left: t },
                    n.options.speed,
                    n.options.easing,
                    i
                  )
                : n.$slideTrack.animate(
                    { top: t },
                    n.options.speed,
                    n.options.easing,
                    i
                  )
              : !1 === n.cssTransitions
              ? (!0 === n.options.rtl && (n.currentLeft = -n.currentLeft),
                e({ animStart: n.currentLeft }).animate(
                  { animStart: t },
                  {
                    duration: n.options.speed,
                    easing: n.options.easing,
                    step: function (e) {
                      (e = Math.ceil(e)),
                        !1 === n.options.vertical
                          ? ((s[n.animType] = "translate(" + e + "px, 0px)"),
                            n.$slideTrack.css(s))
                          : ((s[n.animType] = "translate(0px," + e + "px)"),
                            n.$slideTrack.css(s));
                    },
                    complete: function () {
                      i && i.call();
                    },
                  }
                ))
              : (n.applyTransition(),
                (t = Math.ceil(t)),
                !1 === n.options.vertical
                  ? (s[n.animType] = "translate3d(" + t + "px, 0px, 0px)")
                  : (s[n.animType] = "translate3d(0px," + t + "px, 0px)"),
                n.$slideTrack.css(s),
                i &&
                  setTimeout(function () {
                    n.disableTransition(), i.call();
                  }, n.options.speed));
        }),
        (t.prototype.getNavTarget = function () {
          var t = this.options.asNavFor;
          return t && null !== t && (t = e(t).not(this.$slider)), t;
        }),
        (t.prototype.asNavFor = function (t) {
          var i = this.getNavTarget();
          null !== i &&
            "object" == typeof i &&
            i.each(function () {
              var i = e(this).slick("getSlick");
              i.unslicked || i.slideHandler(t, !0);
            });
        }),
        (t.prototype.applyTransition = function (e) {
          var t = this,
            i = {};
          !1 === t.options.fade
            ? (i[t.transitionType] =
                t.transformType +
                " " +
                t.options.speed +
                "ms " +
                t.options.cssEase)
            : (i[t.transitionType] =
                "opacity " + t.options.speed + "ms " + t.options.cssEase),
            !1 === t.options.fade
              ? t.$slideTrack.css(i)
              : t.$slides.eq(e).css(i);
        }),
        (t.prototype.autoPlay = function () {
          var e = this;
          e.autoPlayClear(),
            e.slideCount > e.options.slidesToShow &&
              (e.autoPlayTimer = setInterval(
                e.autoPlayIterator,
                e.options.autoplaySpeed
              ));
        }),
        (t.prototype.autoPlayClear = function () {
          this.autoPlayTimer && clearInterval(this.autoPlayTimer);
        }),
        (t.prototype.autoPlayIterator = function () {
          var e = this,
            t = e.currentSlide + e.options.slidesToScroll;
          e.paused ||
            e.interrupted ||
            e.focussed ||
            (!1 === e.options.infinite &&
              (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1
                ? (e.direction = 0)
                : 0 === e.direction &&
                  ((t = e.currentSlide - e.options.slidesToScroll),
                  e.currentSlide - 1 == 0 && (e.direction = 1))),
            e.slideHandler(t));
        }),
        (t.prototype.buildArrows = function () {
          var t = this;
          !0 === t.options.arrows &&
            ((t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow")),
            (t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow")),
            t.slideCount > t.options.slidesToShow
              ? (t.$prevArrow
                  .removeClass("slick-hidden")
                  .removeAttr("aria-hidden tabindex"),
                t.$nextArrow
                  .removeClass("slick-hidden")
                  .removeAttr("aria-hidden tabindex"),
                t.htmlExpr.test(t.options.prevArrow) &&
                  t.$prevArrow.prependTo(t.options.appendArrows),
                t.htmlExpr.test(t.options.nextArrow) &&
                  t.$nextArrow.appendTo(t.options.appendArrows),
                !0 !== t.options.infinite &&
                  t.$prevArrow
                    .addClass("slick-disabled")
                    .attr("aria-disabled", "true"))
              : t.$prevArrow
                  .add(t.$nextArrow)
                  .addClass("slick-hidden")
                  .attr({ "aria-disabled": "true", tabindex: "-1" }));
        }),
        (t.prototype.buildDots = function () {
          var t,
            i,
            s = this;
          if (!0 === s.options.dots) {
            for (
              s.$slider.addClass("slick-dotted"),
                i = e("<ul />").addClass(s.options.dotsClass),
                t = 0;
              t <= s.getDotCount();
              t += 1
            )
              i.append(
                e("<li />").append(s.options.customPaging.call(this, s, t))
              );
            (s.$dots = i.appendTo(s.options.appendDots)),
              s.$dots.find("li").first().addClass("slick-active");
          }
        }),
        (t.prototype.buildOut = function () {
          var t = this;
          (t.$slides = t.$slider
            .children(t.options.slide + ":not(.slick-cloned)")
            .addClass("slick-slide")),
            (t.slideCount = t.$slides.length),
            t.$slides.each(function (t, i) {
              e(i)
                .attr("data-slick-index", t)
                .data("originalStyling", e(i).attr("style") || "");
            }),
            t.$slider.addClass("slick-slider"),
            (t.$slideTrack =
              0 === t.slideCount
                ? e('<div class="slick-track"/>').appendTo(t.$slider)
                : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
            (t.$list = t.$slideTrack
              .wrap('<div class="slick-list"/>')
              .parent()),
            t.$slideTrack.css("opacity", 0),
            (!0 !== t.options.centerMode && !0 !== t.options.swipeToSlide) ||
              (t.options.slidesToScroll = 1),
            e("img[data-lazy]", t.$slider)
              .not("[src]")
              .addClass("slick-loading"),
            t.setupInfinite(),
            t.buildArrows(),
            t.buildDots(),
            t.updateDots(),
            t.setSlideClasses(
              "number" == typeof t.currentSlide ? t.currentSlide : 0
            ),
            !0 === t.options.draggable && t.$list.addClass("draggable");
        }),
        (t.prototype.buildRows = function () {
          var e,
            t,
            i,
            s,
            n,
            o,
            r,
            l = this;
          if (
            ((s = document.createDocumentFragment()),
            (o = l.$slider.children()),
            l.options.rows > 1)
          ) {
            for (
              r = l.options.slidesPerRow * l.options.rows,
                n = Math.ceil(o.length / r),
                e = 0;
              e < n;
              e++
            ) {
              var a = document.createElement("div");
              for (t = 0; t < l.options.rows; t++) {
                var d = document.createElement("div");
                for (i = 0; i < l.options.slidesPerRow; i++) {
                  var c = e * r + (t * l.options.slidesPerRow + i);
                  o.get(c) && d.appendChild(o.get(c));
                }
                a.appendChild(d);
              }
              s.appendChild(a);
            }
            l.$slider.empty().append(s),
              l.$slider
                .children()
                .children()
                .children()
                .css({
                  width: 100 / l.options.slidesPerRow + "%",
                  display: "inline-block",
                });
          }
        }),
        (t.prototype.checkResponsive = function (t, i) {
          var s,
            n,
            o,
            r = this,
            l = !1,
            a = r.$slider.width(),
            d = window.innerWidth || e(window).width();
          if (
            ("window" === r.respondTo
              ? (o = d)
              : "slider" === r.respondTo
              ? (o = a)
              : "min" === r.respondTo && (o = Math.min(d, a)),
            r.options.responsive &&
              r.options.responsive.length &&
              null !== r.options.responsive)
          ) {
            for (s in ((n = null), r.breakpoints))
              r.breakpoints.hasOwnProperty(s) &&
                (!1 === r.originalSettings.mobileFirst
                  ? o < r.breakpoints[s] && (n = r.breakpoints[s])
                  : o > r.breakpoints[s] && (n = r.breakpoints[s]));
            null !== n
              ? null !== r.activeBreakpoint
                ? (n !== r.activeBreakpoint || i) &&
                  ((r.activeBreakpoint = n),
                  "unslick" === r.breakpointSettings[n]
                    ? r.unslick(n)
                    : ((r.options = e.extend(
                        {},
                        r.originalSettings,
                        r.breakpointSettings[n]
                      )),
                      !0 === t && (r.currentSlide = r.options.initialSlide),
                      r.refresh(t)),
                  (l = n))
                : ((r.activeBreakpoint = n),
                  "unslick" === r.breakpointSettings[n]
                    ? r.unslick(n)
                    : ((r.options = e.extend(
                        {},
                        r.originalSettings,
                        r.breakpointSettings[n]
                      )),
                      !0 === t && (r.currentSlide = r.options.initialSlide),
                      r.refresh(t)),
                  (l = n))
              : null !== r.activeBreakpoint &&
                ((r.activeBreakpoint = null),
                (r.options = r.originalSettings),
                !0 === t && (r.currentSlide = r.options.initialSlide),
                r.refresh(t),
                (l = n)),
              t || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
          }
        }),
        (t.prototype.changeSlide = function (t, i) {
          var s,
            n,
            o = this,
            r = e(t.currentTarget);
          switch (
            (r.is("a") && t.preventDefault(),
            r.is("li") || (r = r.closest("li")),
            (s =
              o.slideCount % o.options.slidesToScroll != 0
                ? 0
                : (o.slideCount - o.currentSlide) % o.options.slidesToScroll),
            t.data.message)
          ) {
            case "previous":
              (n =
                0 === s
                  ? o.options.slidesToScroll
                  : o.options.slidesToShow - s),
                o.slideCount > o.options.slidesToShow &&
                  o.slideHandler(o.currentSlide - n, !1, i);
              break;
            case "next":
              (n = 0 === s ? o.options.slidesToScroll : s),
                o.slideCount > o.options.slidesToShow &&
                  o.slideHandler(o.currentSlide + n, !1, i);
              break;
            case "index":
              var l =
                0 === t.data.index
                  ? 0
                  : t.data.index || r.index() * o.options.slidesToScroll;
              o.slideHandler(o.checkNavigable(l), !1, i),
                r.children().trigger("focus");
              break;
            default:
              return;
          }
        }),
        (t.prototype.checkNavigable = function (e) {
          var t, i;
          if (((i = 0), e > (t = this.getNavigableIndexes())[t.length - 1]))
            e = t[t.length - 1];
          else
            for (var s in t) {
              if (e < t[s]) {
                e = i;
                break;
              }
              i = t[s];
            }
          return e;
        }),
        (t.prototype.cleanUpEvents = function () {
          var t = this;
          t.options.dots &&
            null !== t.$dots &&
            (e("li", t.$dots)
              .off("click.slick", t.changeSlide)
              .off("mouseenter.slick", e.proxy(t.interrupt, t, !0))
              .off("mouseleave.slick", e.proxy(t.interrupt, t, !1)),
            !0 === t.options.accessibility &&
              t.$dots.off("keydown.slick", t.keyHandler)),
            t.$slider.off("focus.slick blur.slick"),
            !0 === t.options.arrows &&
              t.slideCount > t.options.slidesToShow &&
              (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
              t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide),
              !0 === t.options.accessibility &&
                (t.$prevArrow &&
                  t.$prevArrow.off("keydown.slick", t.keyHandler),
                t.$nextArrow &&
                  t.$nextArrow.off("keydown.slick", t.keyHandler))),
            t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
            t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
            t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
            t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
            t.$list.off("click.slick", t.clickHandler),
            e(document).off(t.visibilityChange, t.visibility),
            t.cleanUpSlideEvents(),
            !0 === t.options.accessibility &&
              t.$list.off("keydown.slick", t.keyHandler),
            !0 === t.options.focusOnSelect &&
              e(t.$slideTrack).children().off("click.slick", t.selectHandler),
            e(window).off(
              "orientationchange.slick.slick-" + t.instanceUid,
              t.orientationChange
            ),
            e(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
            e("[draggable!=true]", t.$slideTrack).off(
              "dragstart",
              t.preventDefault
            ),
            e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
        }),
        (t.prototype.cleanUpSlideEvents = function () {
          var t = this;
          t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
            t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1));
        }),
        (t.prototype.cleanUpRows = function () {
          var e,
            t = this;
          t.options.rows > 1 &&
            ((e = t.$slides.children().children()).removeAttr("style"),
            t.$slider.empty().append(e));
        }),
        (t.prototype.clickHandler = function (e) {
          !1 === this.shouldClick &&
            (e.stopImmediatePropagation(),
            e.stopPropagation(),
            e.preventDefault());
        }),
        (t.prototype.destroy = function (t) {
          var i = this;
          i.autoPlayClear(),
            (i.touchObject = {}),
            i.cleanUpEvents(),
            e(".slick-cloned", i.$slider).detach(),
            i.$dots && i.$dots.remove(),
            i.$prevArrow &&
              i.$prevArrow.length &&
              (i.$prevArrow
                .removeClass("slick-disabled slick-arrow slick-hidden")
                .removeAttr("aria-hidden aria-disabled tabindex")
                .css("display", ""),
              i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
            i.$nextArrow &&
              i.$nextArrow.length &&
              (i.$nextArrow
                .removeClass("slick-disabled slick-arrow slick-hidden")
                .removeAttr("aria-hidden aria-disabled tabindex")
                .css("display", ""),
              i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
            i.$slides &&
              (i.$slides
                .removeClass(
                  "slick-slide slick-active slick-center slick-visible slick-current"
                )
                .removeAttr("aria-hidden")
                .removeAttr("data-slick-index")
                .each(function () {
                  e(this).attr("style", e(this).data("originalStyling"));
                }),
              i.$slideTrack.children(this.options.slide).detach(),
              i.$slideTrack.detach(),
              i.$list.detach(),
              i.$slider.append(i.$slides)),
            i.cleanUpRows(),
            i.$slider.removeClass("slick-slider"),
            i.$slider.removeClass("slick-initialized"),
            i.$slider.removeClass("slick-dotted"),
            (i.unslicked = !0),
            t || i.$slider.trigger("destroy", [i]);
        }),
        (t.prototype.disableTransition = function (e) {
          var t = this,
            i = {};
          (i[t.transitionType] = ""),
            !1 === t.options.fade
              ? t.$slideTrack.css(i)
              : t.$slides.eq(e).css(i);
        }),
        (t.prototype.fadeSlide = function (e, t) {
          var i = this;
          !1 === i.cssTransitions
            ? (i.$slides.eq(e).css({ zIndex: i.options.zIndex }),
              i.$slides
                .eq(e)
                .animate({ opacity: 1 }, i.options.speed, i.options.easing, t))
            : (i.applyTransition(e),
              i.$slides.eq(e).css({ opacity: 1, zIndex: i.options.zIndex }),
              t &&
                setTimeout(function () {
                  i.disableTransition(e), t.call();
                }, i.options.speed));
        }),
        (t.prototype.fadeSlideOut = function (e) {
          var t = this;
          !1 === t.cssTransitions
            ? t.$slides
                .eq(e)
                .animate(
                  { opacity: 0, zIndex: t.options.zIndex - 2 },
                  t.options.speed,
                  t.options.easing
                )
            : (t.applyTransition(e),
              t.$slides
                .eq(e)
                .css({ opacity: 0, zIndex: t.options.zIndex - 2 }));
        }),
        (t.prototype.filterSlides = t.prototype.slickFilter =
          function (e) {
            var t = this;
            null !== e &&
              ((t.$slidesCache = t.$slides),
              t.unload(),
              t.$slideTrack.children(this.options.slide).detach(),
              t.$slidesCache.filter(e).appendTo(t.$slideTrack),
              t.reinit());
          }),
        (t.prototype.focusHandler = function () {
          var t = this;
          t.$slider
            .off("focus.slick blur.slick")
            .on("focus.slick blur.slick", "*", function (i) {
              i.stopImmediatePropagation();
              var s = e(this);
              setTimeout(function () {
                t.options.pauseOnFocus &&
                  ((t.focussed = s.is(":focus")), t.autoPlay());
              }, 0);
            });
        }),
        (t.prototype.getCurrent = t.prototype.slickCurrentSlide =
          function () {
            return this.currentSlide;
          }),
        (t.prototype.getDotCount = function () {
          var e = this,
            t = 0,
            i = 0,
            s = 0;
          if (!0 === e.options.infinite)
            if (e.slideCount <= e.options.slidesToShow) ++s;
            else
              for (; t < e.slideCount; )
                ++s,
                  (t = i + e.options.slidesToScroll),
                  (i +=
                    e.options.slidesToScroll <= e.options.slidesToShow
                      ? e.options.slidesToScroll
                      : e.options.slidesToShow);
          else if (!0 === e.options.centerMode) s = e.slideCount;
          else if (e.options.asNavFor)
            for (; t < e.slideCount; )
              ++s,
                (t = i + e.options.slidesToScroll),
                (i +=
                  e.options.slidesToScroll <= e.options.slidesToShow
                    ? e.options.slidesToScroll
                    : e.options.slidesToShow);
          else
            s =
              1 +
              Math.ceil(
                (e.slideCount - e.options.slidesToShow) /
                  e.options.slidesToScroll
              );
          return s - 1;
        }),
        (t.prototype.getLeft = function (e) {
          var t,
            i,
            s,
            n,
            o = this,
            r = 0;
          return (
            (o.slideOffset = 0),
            (i = o.$slides.first().outerHeight(!0)),
            !0 === o.options.infinite
              ? (o.slideCount > o.options.slidesToShow &&
                  ((o.slideOffset = o.slideWidth * o.options.slidesToShow * -1),
                  (n = -1),
                  !0 === o.options.vertical &&
                    !0 === o.options.centerMode &&
                    (2 === o.options.slidesToShow
                      ? (n = -1.5)
                      : 1 === o.options.slidesToShow && (n = -2)),
                  (r = i * o.options.slidesToShow * n)),
                o.slideCount % o.options.slidesToScroll != 0 &&
                  e + o.options.slidesToScroll > o.slideCount &&
                  o.slideCount > o.options.slidesToShow &&
                  (e > o.slideCount
                    ? ((o.slideOffset =
                        (o.options.slidesToShow - (e - o.slideCount)) *
                        o.slideWidth *
                        -1),
                      (r =
                        (o.options.slidesToShow - (e - o.slideCount)) * i * -1))
                    : ((o.slideOffset =
                        (o.slideCount % o.options.slidesToScroll) *
                        o.slideWidth *
                        -1),
                      (r =
                        (o.slideCount % o.options.slidesToScroll) * i * -1))))
              : e + o.options.slidesToShow > o.slideCount &&
                ((o.slideOffset =
                  (e + o.options.slidesToShow - o.slideCount) * o.slideWidth),
                (r = (e + o.options.slidesToShow - o.slideCount) * i)),
            o.slideCount <= o.options.slidesToShow &&
              ((o.slideOffset = 0), (r = 0)),
            !0 === o.options.centerMode &&
            o.slideCount <= o.options.slidesToShow
              ? (o.slideOffset =
                  (o.slideWidth * Math.floor(o.options.slidesToShow)) / 2 -
                  (o.slideWidth * o.slideCount) / 2)
              : !0 === o.options.centerMode && !0 === o.options.infinite
              ? (o.slideOffset +=
                  o.slideWidth * Math.floor(o.options.slidesToShow / 2) -
                  o.slideWidth)
              : !0 === o.options.centerMode &&
                ((o.slideOffset = 0),
                (o.slideOffset +=
                  o.slideWidth * Math.floor(o.options.slidesToShow / 2))),
            (t =
              !1 === o.options.vertical
                ? e * o.slideWidth * -1 + o.slideOffset
                : e * i * -1 + r),
            !0 === o.options.variableWidth &&
              ((s =
                o.slideCount <= o.options.slidesToShow ||
                !1 === o.options.infinite
                  ? o.$slideTrack.children(".slick-slide").eq(e)
                  : o.$slideTrack
                      .children(".slick-slide")
                      .eq(e + o.options.slidesToShow)),
              (t =
                !0 === o.options.rtl
                  ? s[0]
                    ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width())
                    : 0
                  : s[0]
                  ? -1 * s[0].offsetLeft
                  : 0),
              !0 === o.options.centerMode &&
                ((s =
                  o.slideCount <= o.options.slidesToShow ||
                  !1 === o.options.infinite
                    ? o.$slideTrack.children(".slick-slide").eq(e)
                    : o.$slideTrack
                        .children(".slick-slide")
                        .eq(e + o.options.slidesToShow + 1)),
                (t =
                  !0 === o.options.rtl
                    ? s[0]
                      ? -1 *
                        (o.$slideTrack.width() - s[0].offsetLeft - s.width())
                      : 0
                    : s[0]
                    ? -1 * s[0].offsetLeft
                    : 0),
                (t += (o.$list.width() - s.outerWidth()) / 2))),
            t
          );
        }),
        (t.prototype.getOption = t.prototype.slickGetOption =
          function (e) {
            return this.options[e];
          }),
        (t.prototype.getNavigableIndexes = function () {
          var e,
            t = this,
            i = 0,
            s = 0,
            n = [];
          for (
            !1 === t.options.infinite
              ? (e = t.slideCount)
              : ((i = -1 * t.options.slidesToScroll),
                (s = -1 * t.options.slidesToScroll),
                (e = 2 * t.slideCount));
            i < e;

          )
            n.push(i),
              (i = s + t.options.slidesToScroll),
              (s +=
                t.options.slidesToScroll <= t.options.slidesToShow
                  ? t.options.slidesToScroll
                  : t.options.slidesToShow);
          return n;
        }),
        (t.prototype.getSlick = function () {
          return this;
        }),
        (t.prototype.getSlideCount = function () {
          var t,
            i,
            s = this;
          return (
            (i =
              !0 === s.options.centerMode
                ? s.slideWidth * Math.floor(s.options.slidesToShow / 2)
                : 0),
            !0 === s.options.swipeToSlide
              ? (s.$slideTrack.find(".slick-slide").each(function (n, o) {
                  if (
                    o.offsetLeft - i + e(o).outerWidth() / 2 >
                    -1 * s.swipeLeft
                  )
                    return (t = o), !1;
                }),
                Math.abs(e(t).attr("data-slick-index") - s.currentSlide) || 1)
              : s.options.slidesToScroll
          );
        }),
        (t.prototype.goTo = t.prototype.slickGoTo =
          function (e, t) {
            this.changeSlide(
              { data: { message: "index", index: parseInt(e) } },
              t
            );
          }),
        (t.prototype.init = function (t) {
          var i = this;
          e(i.$slider).hasClass("slick-initialized") ||
            (e(i.$slider).addClass("slick-initialized"),
            i.buildRows(),
            i.buildOut(),
            i.setProps(),
            i.startLoad(),
            i.loadSlider(),
            i.initializeEvents(),
            i.updateArrows(),
            i.updateDots(),
            i.checkResponsive(!0),
            i.focusHandler()),
            t && i.$slider.trigger("init", [i]),
            !0 === i.options.accessibility && i.initADA(),
            i.options.autoplay && ((i.paused = !1), i.autoPlay());
        }),
        (t.prototype.initADA = function () {
          var t = this,
            i = Math.ceil(t.slideCount / t.options.slidesToShow),
            s = t.getNavigableIndexes().filter(function (e) {
              return e >= 0 && e < t.slideCount;
            });
          t.$slides
            .add(t.$slideTrack.find(".slick-cloned"))
            .attr({ "aria-hidden": "true", tabindex: "-1" })
            .find("a, input, button, select")
            .attr({ tabindex: "-1" }),
            null !== t.$dots &&
              (t.$slides
                .not(t.$slideTrack.find(".slick-cloned"))
                .each(function (i) {
                  var n = s.indexOf(i);
                  e(this).attr({
                    role: "tabpanel",
                    id: "slick-slide" + t.instanceUid + i,
                    tabindex: -1,
                  }),
                    -1 !== n &&
                      e(this).attr({
                        "aria-describedby":
                          "slick-slide-control" + t.instanceUid + n,
                      });
                }),
              t.$dots
                .attr("role", "tablist")
                .find("li")
                .each(function (n) {
                  var o = s[n];
                  e(this).attr({ role: "presentation" }),
                    e(this)
                      .find("button")
                      .first()
                      .attr({
                        role: "tab",
                        id: "slick-slide-control" + t.instanceUid + n,
                        "aria-controls": "slick-slide" + t.instanceUid + o,
                        "aria-label": n + 1 + " of " + i,
                        "aria-selected": null,
                        tabindex: "-1",
                      });
                })
                .eq(t.currentSlide)
                .find("button")
                .attr({ "aria-selected": "true", tabindex: "0" })
                .end());
          for (
            var n = t.currentSlide, o = n + t.options.slidesToShow;
            n < o;
            n++
          )
            t.$slides.eq(n).attr("tabindex", 0);
          t.activateADA();
        }),
        (t.prototype.initArrowEvents = function () {
          var e = this;
          !0 === e.options.arrows &&
            e.slideCount > e.options.slidesToShow &&
            (e.$prevArrow
              .off("click.slick")
              .on("click.slick", { message: "previous" }, e.changeSlide),
            e.$nextArrow
              .off("click.slick")
              .on("click.slick", { message: "next" }, e.changeSlide),
            !0 === e.options.accessibility &&
              (e.$prevArrow.on("keydown.slick", e.keyHandler),
              e.$nextArrow.on("keydown.slick", e.keyHandler)));
        }),
        (t.prototype.initDotEvents = function () {
          var t = this;
          !0 === t.options.dots &&
            (e("li", t.$dots).on(
              "click.slick",
              { message: "index" },
              t.changeSlide
            ),
            !0 === t.options.accessibility &&
              t.$dots.on("keydown.slick", t.keyHandler)),
            !0 === t.options.dots &&
              !0 === t.options.pauseOnDotsHover &&
              e("li", t.$dots)
                .on("mouseenter.slick", e.proxy(t.interrupt, t, !0))
                .on("mouseleave.slick", e.proxy(t.interrupt, t, !1));
        }),
        (t.prototype.initSlideEvents = function () {
          var t = this;
          t.options.pauseOnHover &&
            (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)),
            t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)));
        }),
        (t.prototype.initializeEvents = function () {
          var t = this;
          t.initArrowEvents(),
            t.initDotEvents(),
            t.initSlideEvents(),
            t.$list.on(
              "touchstart.slick mousedown.slick",
              { action: "start" },
              t.swipeHandler
            ),
            t.$list.on(
              "touchmove.slick mousemove.slick",
              { action: "move" },
              t.swipeHandler
            ),
            t.$list.on(
              "touchend.slick mouseup.slick",
              { action: "end" },
              t.swipeHandler
            ),
            t.$list.on(
              "touchcancel.slick mouseleave.slick",
              { action: "end" },
              t.swipeHandler
            ),
            t.$list.on("click.slick", t.clickHandler),
            e(document).on(t.visibilityChange, e.proxy(t.visibility, t)),
            !0 === t.options.accessibility &&
              t.$list.on("keydown.slick", t.keyHandler),
            !0 === t.options.focusOnSelect &&
              e(t.$slideTrack).children().on("click.slick", t.selectHandler),
            e(window).on(
              "orientationchange.slick.slick-" + t.instanceUid,
              e.proxy(t.orientationChange, t)
            ),
            e(window).on(
              "resize.slick.slick-" + t.instanceUid,
              e.proxy(t.resize, t)
            ),
            e("[draggable!=true]", t.$slideTrack).on(
              "dragstart",
              t.preventDefault
            ),
            e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
            e(t.setPosition);
        }),
        (t.prototype.initUI = function () {
          var e = this;
          !0 === e.options.arrows &&
            e.slideCount > e.options.slidesToShow &&
            (e.$prevArrow.show(), e.$nextArrow.show()),
            !0 === e.options.dots &&
              e.slideCount > e.options.slidesToShow &&
              e.$dots.show();
        }),
        (t.prototype.keyHandler = function (e) {
          var t = this;
          e.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
            (37 === e.keyCode && !0 === t.options.accessibility
              ? t.changeSlide({
                  data: { message: !0 === t.options.rtl ? "next" : "previous" },
                })
              : 39 === e.keyCode &&
                !0 === t.options.accessibility &&
                t.changeSlide({
                  data: { message: !0 === t.options.rtl ? "previous" : "next" },
                }));
        }),
        (t.prototype.lazyLoad = function () {
          function t(t) {
            e("img[data-lazy]", t).each(function () {
              var t = e(this),
                i = e(this).attr("data-lazy"),
                s = e(this).attr("data-srcset"),
                n = e(this).attr("data-sizes") || o.$slider.attr("data-sizes"),
                r = document.createElement("img");
              (r.onload = function () {
                t.animate({ opacity: 0 }, 100, function () {
                  s && (t.attr("srcset", s), n && t.attr("sizes", n)),
                    t.attr("src", i).animate({ opacity: 1 }, 200, function () {
                      t.removeAttr(
                        "data-lazy data-srcset data-sizes"
                      ).removeClass("slick-loading");
                    }),
                    o.$slider.trigger("lazyLoaded", [o, t, i]);
                });
              }),
                (r.onerror = function () {
                  t
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                    o.$slider.trigger("lazyLoadError", [o, t, i]);
                }),
                (r.src = i);
            });
          }
          var i,
            s,
            n,
            o = this;
          if (
            (!0 === o.options.centerMode
              ? !0 === o.options.infinite
                ? (n =
                    (s = o.currentSlide + (o.options.slidesToShow / 2 + 1)) +
                    o.options.slidesToShow +
                    2)
                : ((s = Math.max(
                    0,
                    o.currentSlide - (o.options.slidesToShow / 2 + 1)
                  )),
                  (n = o.options.slidesToShow / 2 + 1 + 2 + o.currentSlide))
              : ((s = o.options.infinite
                  ? o.options.slidesToShow + o.currentSlide
                  : o.currentSlide),
                (n = Math.ceil(s + o.options.slidesToShow)),
                !0 === o.options.fade &&
                  (s > 0 && s--, n <= o.slideCount && n++)),
            (i = o.$slider.find(".slick-slide").slice(s, n)),
            "anticipated" === o.options.lazyLoad)
          )
            for (
              var r = s - 1, l = n, a = o.$slider.find(".slick-slide"), d = 0;
              d < o.options.slidesToScroll;
              d++
            )
              r < 0 && (r = o.slideCount - 1),
                (i = (i = i.add(a.eq(r))).add(a.eq(l))),
                r--,
                l++;
          t(i),
            o.slideCount <= o.options.slidesToShow
              ? t(o.$slider.find(".slick-slide"))
              : o.currentSlide >= o.slideCount - o.options.slidesToShow
              ? t(
                  o.$slider
                    .find(".slick-cloned")
                    .slice(0, o.options.slidesToShow)
                )
              : 0 === o.currentSlide &&
                t(
                  o.$slider
                    .find(".slick-cloned")
                    .slice(-1 * o.options.slidesToShow)
                );
        }),
        (t.prototype.loadSlider = function () {
          var e = this;
          e.setPosition(),
            e.$slideTrack.css({ opacity: 1 }),
            e.$slider.removeClass("slick-loading"),
            e.initUI(),
            "progressive" === e.options.lazyLoad && e.progressiveLazyLoad();
        }),
        (t.prototype.next = t.prototype.slickNext =
          function () {
            this.changeSlide({ data: { message: "next" } });
          }),
        (t.prototype.orientationChange = function () {
          this.checkResponsive(), this.setPosition();
        }),
        (t.prototype.pause = t.prototype.slickPause =
          function () {
            this.autoPlayClear(), (this.paused = !0);
          }),
        (t.prototype.play = t.prototype.slickPlay =
          function () {
            var e = this;
            e.autoPlay(),
              (e.options.autoplay = !0),
              (e.paused = !1),
              (e.focussed = !1),
              (e.interrupted = !1);
          }),
        (t.prototype.postSlide = function (t) {
          var i = this;
          i.unslicked ||
            (i.$slider.trigger("afterChange", [i, t]),
            (i.animating = !1),
            i.slideCount > i.options.slidesToShow && i.setPosition(),
            (i.swipeLeft = null),
            i.options.autoplay && i.autoPlay(),
            !0 === i.options.accessibility &&
              (i.initADA(),
              i.options.focusOnChange &&
                e(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus()));
        }),
        (t.prototype.prev = t.prototype.slickPrev =
          function () {
            this.changeSlide({ data: { message: "previous" } });
          }),
        (t.prototype.preventDefault = function (e) {
          e.preventDefault();
        }),
        (t.prototype.progressiveLazyLoad = function (t) {
          t = t || 1;
          var i,
            s,
            n,
            o,
            r,
            l = this,
            a = e("img[data-lazy]", l.$slider);
          a.length
            ? ((i = a.first()),
              (s = i.attr("data-lazy")),
              (n = i.attr("data-srcset")),
              (o = i.attr("data-sizes") || l.$slider.attr("data-sizes")),
              ((r = document.createElement("img")).onload = function () {
                n && (i.attr("srcset", n), o && i.attr("sizes", o)),
                  i
                    .attr("src", s)
                    .removeAttr("data-lazy data-srcset data-sizes")
                    .removeClass("slick-loading"),
                  !0 === l.options.adaptiveHeight && l.setPosition(),
                  l.$slider.trigger("lazyLoaded", [l, i, s]),
                  l.progressiveLazyLoad();
              }),
              (r.onerror = function () {
                t < 3
                  ? setTimeout(function () {
                      l.progressiveLazyLoad(t + 1);
                    }, 500)
                  : (i
                      .removeAttr("data-lazy")
                      .removeClass("slick-loading")
                      .addClass("slick-lazyload-error"),
                    l.$slider.trigger("lazyLoadError", [l, i, s]),
                    l.progressiveLazyLoad());
              }),
              (r.src = s))
            : l.$slider.trigger("allImagesLoaded", [l]);
        }),
        (t.prototype.refresh = function (t) {
          var i,
            s,
            n = this;
          (s = n.slideCount - n.options.slidesToShow),
            !n.options.infinite && n.currentSlide > s && (n.currentSlide = s),
            n.slideCount <= n.options.slidesToShow && (n.currentSlide = 0),
            (i = n.currentSlide),
            n.destroy(!0),
            e.extend(n, n.initials, { currentSlide: i }),
            n.init(),
            t || n.changeSlide({ data: { message: "index", index: i } }, !1);
        }),
        (t.prototype.registerBreakpoints = function () {
          var t,
            i,
            s,
            n = this,
            o = n.options.responsive || null;
          if ("array" === e.type(o) && o.length) {
            for (t in ((n.respondTo = n.options.respondTo || "window"), o))
              if (((s = n.breakpoints.length - 1), o.hasOwnProperty(t))) {
                for (i = o[t].breakpoint; s >= 0; )
                  n.breakpoints[s] &&
                    n.breakpoints[s] === i &&
                    n.breakpoints.splice(s, 1),
                    s--;
                n.breakpoints.push(i),
                  (n.breakpointSettings[i] = o[t].settings);
              }
            n.breakpoints.sort(function (e, t) {
              return n.options.mobileFirst ? e - t : t - e;
            });
          }
        }),
        (t.prototype.reinit = function () {
          var t = this;
          (t.$slides = t.$slideTrack
            .children(t.options.slide)
            .addClass("slick-slide")),
            (t.slideCount = t.$slides.length),
            t.currentSlide >= t.slideCount &&
              0 !== t.currentSlide &&
              (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
            t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
            t.registerBreakpoints(),
            t.setProps(),
            t.setupInfinite(),
            t.buildArrows(),
            t.updateArrows(),
            t.initArrowEvents(),
            t.buildDots(),
            t.updateDots(),
            t.initDotEvents(),
            t.cleanUpSlideEvents(),
            t.initSlideEvents(),
            t.checkResponsive(!1, !0),
            !0 === t.options.focusOnSelect &&
              e(t.$slideTrack).children().on("click.slick", t.selectHandler),
            t.setSlideClasses(
              "number" == typeof t.currentSlide ? t.currentSlide : 0
            ),
            t.setPosition(),
            t.focusHandler(),
            (t.paused = !t.options.autoplay),
            t.autoPlay(),
            t.$slider.trigger("reInit", [t]);
        }),
        (t.prototype.resize = function () {
          var t = this;
          e(window).width() !== t.windowWidth &&
            (clearTimeout(t.windowDelay),
            (t.windowDelay = window.setTimeout(function () {
              (t.windowWidth = e(window).width()),
                t.checkResponsive(),
                t.unslicked || t.setPosition();
            }, 50)));
        }),
        (t.prototype.removeSlide = t.prototype.slickRemove =
          function (e, t, i) {
            var s = this;
            if (
              ((e =
                "boolean" == typeof e
                  ? !0 === (t = e)
                    ? 0
                    : s.slideCount - 1
                  : !0 === t
                  ? --e
                  : e),
              s.slideCount < 1 || e < 0 || e > s.slideCount - 1)
            )
              return !1;
            s.unload(),
              !0 === i
                ? s.$slideTrack.children().remove()
                : s.$slideTrack.children(this.options.slide).eq(e).remove(),
              (s.$slides = s.$slideTrack.children(this.options.slide)),
              s.$slideTrack.children(this.options.slide).detach(),
              s.$slideTrack.append(s.$slides),
              (s.$slidesCache = s.$slides),
              s.reinit();
          }),
        (t.prototype.setCSS = function (e) {
          var t,
            i,
            s = this,
            n = {};
          !0 === s.options.rtl && (e = -e),
            (t = "left" == s.positionProp ? Math.ceil(e) + "px" : "0px"),
            (i = "top" == s.positionProp ? Math.ceil(e) + "px" : "0px"),
            (n[s.positionProp] = e),
            !1 === s.transformsEnabled
              ? s.$slideTrack.css(n)
              : ((n = {}),
                !1 === s.cssTransitions
                  ? ((n[s.animType] = "translate(" + t + ", " + i + ")"),
                    s.$slideTrack.css(n))
                  : ((n[s.animType] = "translate3d(" + t + ", " + i + ", 0px)"),
                    s.$slideTrack.css(n)));
        }),
        (t.prototype.setDimensions = function () {
          var e = this;
          !1 === e.options.vertical
            ? !0 === e.options.centerMode &&
              e.$list.css({ padding: "0px " + e.options.centerPadding })
            : (e.$list.height(
                e.$slides.first().outerHeight(!0) * e.options.slidesToShow
              ),
              !0 === e.options.centerMode &&
                e.$list.css({ padding: e.options.centerPadding + " 0px" })),
            (e.listWidth = e.$list.width()),
            (e.listHeight = e.$list.height()),
            !1 === e.options.vertical && !1 === e.options.variableWidth
              ? ((e.slideWidth = Math.ceil(
                  e.listWidth / e.options.slidesToShow
                )),
                e.$slideTrack.width(
                  Math.ceil(
                    e.slideWidth * e.$slideTrack.children(".slick-slide").length
                  )
                ))
              : !0 === e.options.variableWidth
              ? e.$slideTrack.width(5e3 * e.slideCount)
              : ((e.slideWidth = Math.ceil(e.listWidth)),
                e.$slideTrack.height(
                  Math.ceil(
                    e.$slides.first().outerHeight(!0) *
                      e.$slideTrack.children(".slick-slide").length
                  )
                ));
          var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
          !1 === e.options.variableWidth &&
            e.$slideTrack.children(".slick-slide").width(e.slideWidth - t);
        }),
        (t.prototype.setFade = function () {
          var t,
            i = this;
          i.$slides.each(function (s, n) {
            (t = i.slideWidth * s * -1),
              !0 === i.options.rtl
                ? e(n).css({
                    position: "relative",
                    right: t,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0,
                  })
                : e(n).css({
                    position: "relative",
                    left: t,
                    top: 0,
                    zIndex: i.options.zIndex - 2,
                    opacity: 0,
                  });
          }),
            i.$slides
              .eq(i.currentSlide)
              .css({ zIndex: i.options.zIndex - 1, opacity: 1 });
        }),
        (t.prototype.setHeight = function () {
          var e = this;
          if (
            1 === e.options.slidesToShow &&
            !0 === e.options.adaptiveHeight &&
            !1 === e.options.vertical
          ) {
            var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
            e.$list.css("height", t);
          }
        }),
        (t.prototype.setOption = t.prototype.slickSetOption =
          function () {
            var t,
              i,
              s,
              n,
              o,
              r = this,
              l = !1;
            if (
              ("object" === e.type(arguments[0])
                ? ((s = arguments[0]), (l = arguments[1]), (o = "multiple"))
                : "string" === e.type(arguments[0]) &&
                  ((s = arguments[0]),
                  (n = arguments[1]),
                  (l = arguments[2]),
                  "responsive" === arguments[0] &&
                  "array" === e.type(arguments[1])
                    ? (o = "responsive")
                    : void 0 !== arguments[1] && (o = "single")),
              "single" === o)
            )
              r.options[s] = n;
            else if ("multiple" === o)
              e.each(s, function (e, t) {
                r.options[e] = t;
              });
            else if ("responsive" === o)
              for (i in n)
                if ("array" !== e.type(r.options.responsive))
                  r.options.responsive = [n[i]];
                else {
                  for (t = r.options.responsive.length - 1; t >= 0; )
                    r.options.responsive[t].breakpoint === n[i].breakpoint &&
                      r.options.responsive.splice(t, 1),
                      t--;
                  r.options.responsive.push(n[i]);
                }
            l && (r.unload(), r.reinit());
          }),
        (t.prototype.setPosition = function () {
          var e = this;
          e.setDimensions(),
            e.setHeight(),
            !1 === e.options.fade
              ? e.setCSS(e.getLeft(e.currentSlide))
              : e.setFade(),
            e.$slider.trigger("setPosition", [e]);
        }),
        (t.prototype.setProps = function () {
          var e = this,
            t = document.body.style;
          (e.positionProp = !0 === e.options.vertical ? "top" : "left"),
            "top" === e.positionProp
              ? e.$slider.addClass("slick-vertical")
              : e.$slider.removeClass("slick-vertical"),
            (void 0 === t.WebkitTransition &&
              void 0 === t.MozTransition &&
              void 0 === t.msTransition) ||
              (!0 === e.options.useCSS && (e.cssTransitions = !0)),
            e.options.fade &&
              ("number" == typeof e.options.zIndex
                ? e.options.zIndex < 3 && (e.options.zIndex = 3)
                : (e.options.zIndex = e.defaults.zIndex)),
            void 0 !== t.OTransform &&
              ((e.animType = "OTransform"),
              (e.transformType = "-o-transform"),
              (e.transitionType = "OTransition"),
              void 0 === t.perspectiveProperty &&
                void 0 === t.webkitPerspective &&
                (e.animType = !1)),
            void 0 !== t.MozTransform &&
              ((e.animType = "MozTransform"),
              (e.transformType = "-moz-transform"),
              (e.transitionType = "MozTransition"),
              void 0 === t.perspectiveProperty &&
                void 0 === t.MozPerspective &&
                (e.animType = !1)),
            void 0 !== t.webkitTransform &&
              ((e.animType = "webkitTransform"),
              (e.transformType = "-webkit-transform"),
              (e.transitionType = "webkitTransition"),
              void 0 === t.perspectiveProperty &&
                void 0 === t.webkitPerspective &&
                (e.animType = !1)),
            void 0 !== t.msTransform &&
              ((e.animType = "msTransform"),
              (e.transformType = "-ms-transform"),
              (e.transitionType = "msTransition"),
              void 0 === t.msTransform && (e.animType = !1)),
            void 0 !== t.transform &&
              !1 !== e.animType &&
              ((e.animType = "transform"),
              (e.transformType = "transform"),
              (e.transitionType = "transition")),
            (e.transformsEnabled =
              e.options.useTransform &&
              null !== e.animType &&
              !1 !== e.animType);
        }),
        (t.prototype.setSlideClasses = function (e) {
          var t,
            i,
            s,
            n,
            o = this;
          if (
            ((i = o.$slider
              .find(".slick-slide")
              .removeClass("slick-active slick-center slick-current")
              .attr("aria-hidden", "true")),
            o.$slides.eq(e).addClass("slick-current"),
            !0 === o.options.centerMode)
          ) {
            var r = o.options.slidesToShow % 2 == 0 ? 1 : 0;
            (t = Math.floor(o.options.slidesToShow / 2)),
              !0 === o.options.infinite &&
                (e >= t && e <= o.slideCount - 1 - t
                  ? o.$slides
                      .slice(e - t + r, e + t + 1)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")
                  : ((s = o.options.slidesToShow + e),
                    i
                      .slice(s - t + 1 + r, s + t + 2)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")),
                0 === e
                  ? i
                      .eq(i.length - 1 - o.options.slidesToShow)
                      .addClass("slick-center")
                  : e === o.slideCount - 1 &&
                    i.eq(o.options.slidesToShow).addClass("slick-center")),
              o.$slides.eq(e).addClass("slick-center");
          } else
            e >= 0 && e <= o.slideCount - o.options.slidesToShow
              ? o.$slides
                  .slice(e, e + o.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : i.length <= o.options.slidesToShow
              ? i.addClass("slick-active").attr("aria-hidden", "false")
              : ((n = o.slideCount % o.options.slidesToShow),
                (s =
                  !0 === o.options.infinite ? o.options.slidesToShow + e : e),
                o.options.slidesToShow == o.options.slidesToScroll &&
                o.slideCount - e < o.options.slidesToShow
                  ? i
                      .slice(s - (o.options.slidesToShow - n), s + n)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false")
                  : i
                      .slice(s, s + o.options.slidesToShow)
                      .addClass("slick-active")
                      .attr("aria-hidden", "false"));
          ("ondemand" !== o.options.lazyLoad &&
            "anticipated" !== o.options.lazyLoad) ||
            o.lazyLoad();
        }),
        (t.prototype.setupInfinite = function () {
          var t,
            i,
            s,
            n = this;
          if (
            (!0 === n.options.fade && (n.options.centerMode = !1),
            !0 === n.options.infinite &&
              !1 === n.options.fade &&
              ((i = null), n.slideCount > n.options.slidesToShow))
          ) {
            for (
              s =
                !0 === n.options.centerMode
                  ? n.options.slidesToShow + 1
                  : n.options.slidesToShow,
                t = n.slideCount;
              t > n.slideCount - s;
              t -= 1
            )
              (i = t - 1),
                e(n.$slides[i])
                  .clone(!0)
                  .attr("id", "")
                  .attr("data-slick-index", i - n.slideCount)
                  .prependTo(n.$slideTrack)
                  .addClass("slick-cloned");
            for (t = 0; t < s + n.slideCount; t += 1)
              (i = t),
                e(n.$slides[i])
                  .clone(!0)
                  .attr("id", "")
                  .attr("data-slick-index", i + n.slideCount)
                  .appendTo(n.$slideTrack)
                  .addClass("slick-cloned");
            n.$slideTrack
              .find(".slick-cloned")
              .find("[id]")
              .each(function () {
                e(this).attr("id", "");
              });
          }
        }),
        (t.prototype.interrupt = function (e) {
          e || this.autoPlay(), (this.interrupted = e);
        }),
        (t.prototype.selectHandler = function (t) {
          var i = this,
            s = e(t.target).is(".slick-slide")
              ? e(t.target)
              : e(t.target).parents(".slick-slide"),
            n = parseInt(s.attr("data-slick-index"));
          n || (n = 0),
            i.slideCount <= i.options.slidesToShow
              ? i.slideHandler(n, !1, !0)
              : i.slideHandler(n);
        }),
        (t.prototype.slideHandler = function (e, t, i) {
          var s,
            n,
            o,
            r,
            l,
            a = null,
            d = this;
          if (
            ((t = t || !1),
            !(
              (!0 === d.animating && !0 === d.options.waitForAnimate) ||
              (!0 === d.options.fade && d.currentSlide === e)
            ))
          )
            if (
              (!1 === t && d.asNavFor(e),
              (s = e),
              (a = d.getLeft(s)),
              (r = d.getLeft(d.currentSlide)),
              (d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft),
              !1 === d.options.infinite &&
                !1 === d.options.centerMode &&
                (e < 0 || e > d.getDotCount() * d.options.slidesToScroll))
            )
              !1 === d.options.fade &&
                ((s = d.currentSlide),
                !0 !== i
                  ? d.animateSlide(r, function () {
                      d.postSlide(s);
                    })
                  : d.postSlide(s));
            else if (
              !1 === d.options.infinite &&
              !0 === d.options.centerMode &&
              (e < 0 || e > d.slideCount - d.options.slidesToScroll)
            )
              !1 === d.options.fade &&
                ((s = d.currentSlide),
                !0 !== i
                  ? d.animateSlide(r, function () {
                      d.postSlide(s);
                    })
                  : d.postSlide(s));
            else {
              if (
                (d.options.autoplay && clearInterval(d.autoPlayTimer),
                (n =
                  s < 0
                    ? d.slideCount % d.options.slidesToScroll != 0
                      ? d.slideCount - (d.slideCount % d.options.slidesToScroll)
                      : d.slideCount + s
                    : s >= d.slideCount
                    ? d.slideCount % d.options.slidesToScroll != 0
                      ? 0
                      : s - d.slideCount
                    : s),
                (d.animating = !0),
                d.$slider.trigger("beforeChange", [d, d.currentSlide, n]),
                (o = d.currentSlide),
                (d.currentSlide = n),
                d.setSlideClasses(d.currentSlide),
                d.options.asNavFor &&
                  (l = (l = d.getNavTarget()).slick("getSlick")).slideCount <=
                    l.options.slidesToShow &&
                  l.setSlideClasses(d.currentSlide),
                d.updateDots(),
                d.updateArrows(),
                !0 === d.options.fade)
              )
                return (
                  !0 !== i
                    ? (d.fadeSlideOut(o),
                      d.fadeSlide(n, function () {
                        d.postSlide(n);
                      }))
                    : d.postSlide(n),
                  void d.animateHeight()
                );
              !0 !== i
                ? d.animateSlide(a, function () {
                    d.postSlide(n);
                  })
                : d.postSlide(n);
            }
        }),
        (t.prototype.startLoad = function () {
          var e = this;
          !0 === e.options.arrows &&
            e.slideCount > e.options.slidesToShow &&
            (e.$prevArrow.hide(), e.$nextArrow.hide()),
            !0 === e.options.dots &&
              e.slideCount > e.options.slidesToShow &&
              e.$dots.hide(),
            e.$slider.addClass("slick-loading");
        }),
        (t.prototype.swipeDirection = function () {
          var e,
            t,
            i,
            s,
            n = this;
          return (
            (e = n.touchObject.startX - n.touchObject.curX),
            (t = n.touchObject.startY - n.touchObject.curY),
            (i = Math.atan2(t, e)),
            (s = Math.round((180 * i) / Math.PI)) < 0 &&
              (s = 360 - Math.abs(s)),
            (s <= 45 && s >= 0) || (s <= 360 && s >= 315)
              ? !1 === n.options.rtl
                ? "left"
                : "right"
              : s >= 135 && s <= 225
              ? !1 === n.options.rtl
                ? "right"
                : "left"
              : !0 === n.options.verticalSwiping
              ? s >= 35 && s <= 135
                ? "down"
                : "up"
              : "vertical"
          );
        }),
        (t.prototype.swipeEnd = function (e) {
          var t,
            i,
            s = this;
          if (((s.dragging = !1), (s.swiping = !1), s.scrolling))
            return (s.scrolling = !1), !1;
          if (
            ((s.interrupted = !1),
            (s.shouldClick = !(s.touchObject.swipeLength > 10)),
            void 0 === s.touchObject.curX)
          )
            return !1;
          if (
            (!0 === s.touchObject.edgeHit &&
              s.$slider.trigger("edge", [s, s.swipeDirection()]),
            s.touchObject.swipeLength >= s.touchObject.minSwipe)
          ) {
            switch ((i = s.swipeDirection())) {
              case "left":
              case "down":
                (t = s.options.swipeToSlide
                  ? s.checkNavigable(s.currentSlide + s.getSlideCount())
                  : s.currentSlide + s.getSlideCount()),
                  (s.currentDirection = 0);
                break;
              case "right":
              case "up":
                (t = s.options.swipeToSlide
                  ? s.checkNavigable(s.currentSlide - s.getSlideCount())
                  : s.currentSlide - s.getSlideCount()),
                  (s.currentDirection = 1);
            }
            "vertical" != i &&
              (s.slideHandler(t),
              (s.touchObject = {}),
              s.$slider.trigger("swipe", [s, i]));
          } else
            s.touchObject.startX !== s.touchObject.curX &&
              (s.slideHandler(s.currentSlide), (s.touchObject = {}));
        }),
        (t.prototype.swipeHandler = function (e) {
          var t = this;
          if (
            !(
              !1 === t.options.swipe ||
              ("ontouchend" in document && !1 === t.options.swipe) ||
              (!1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))
            )
          )
            switch (
              ((t.touchObject.fingerCount =
                e.originalEvent && void 0 !== e.originalEvent.touches
                  ? e.originalEvent.touches.length
                  : 1),
              (t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold),
              !0 === t.options.verticalSwiping &&
                (t.touchObject.minSwipe =
                  t.listHeight / t.options.touchThreshold),
              e.data.action)
            ) {
              case "start":
                t.swipeStart(e);
                break;
              case "move":
                t.swipeMove(e);
                break;
              case "end":
                t.swipeEnd(e);
            }
        }),
        (t.prototype.swipeMove = function (e) {
          var t,
            i,
            s,
            n,
            o,
            r,
            l = this;
          return (
            (o = void 0 !== e.originalEvent ? e.originalEvent.touches : null),
            !(!l.dragging || l.scrolling || (o && 1 !== o.length)) &&
              ((t = l.getLeft(l.currentSlide)),
              (l.touchObject.curX = void 0 !== o ? o[0].pageX : e.clientX),
              (l.touchObject.curY = void 0 !== o ? o[0].pageY : e.clientY),
              (l.touchObject.swipeLength = Math.round(
                Math.sqrt(
                  Math.pow(l.touchObject.curX - l.touchObject.startX, 2)
                )
              )),
              (r = Math.round(
                Math.sqrt(
                  Math.pow(l.touchObject.curY - l.touchObject.startY, 2)
                )
              )),
              !l.options.verticalSwiping && !l.swiping && r > 4
                ? ((l.scrolling = !0), !1)
                : (!0 === l.options.verticalSwiping &&
                    (l.touchObject.swipeLength = r),
                  (i = l.swipeDirection()),
                  void 0 !== e.originalEvent &&
                    l.touchObject.swipeLength > 4 &&
                    ((l.swiping = !0), e.preventDefault()),
                  (n =
                    (!1 === l.options.rtl ? 1 : -1) *
                    (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
                  !0 === l.options.verticalSwiping &&
                    (n = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
                  (s = l.touchObject.swipeLength),
                  (l.touchObject.edgeHit = !1),
                  !1 === l.options.infinite &&
                    ((0 === l.currentSlide && "right" === i) ||
                      (l.currentSlide >= l.getDotCount() && "left" === i)) &&
                    ((s = l.touchObject.swipeLength * l.options.edgeFriction),
                    (l.touchObject.edgeHit = !0)),
                  !1 === l.options.vertical
                    ? (l.swipeLeft = t + s * n)
                    : (l.swipeLeft =
                        t + s * (l.$list.height() / l.listWidth) * n),
                  !0 === l.options.verticalSwiping && (l.swipeLeft = t + s * n),
                  !0 !== l.options.fade &&
                    !1 !== l.options.touchMove &&
                    (!0 === l.animating
                      ? ((l.swipeLeft = null), !1)
                      : void l.setCSS(l.swipeLeft))))
          );
        }),
        (t.prototype.swipeStart = function (e) {
          var t,
            i = this;
          if (
            ((i.interrupted = !0),
            1 !== i.touchObject.fingerCount ||
              i.slideCount <= i.options.slidesToShow)
          )
            return (i.touchObject = {}), !1;
          void 0 !== e.originalEvent &&
            void 0 !== e.originalEvent.touches &&
            (t = e.originalEvent.touches[0]),
            (i.touchObject.startX = i.touchObject.curX =
              void 0 !== t ? t.pageX : e.clientX),
            (i.touchObject.startY = i.touchObject.curY =
              void 0 !== t ? t.pageY : e.clientY),
            (i.dragging = !0);
        }),
        (t.prototype.unfilterSlides = t.prototype.slickUnfilter =
          function () {
            var e = this;
            null !== e.$slidesCache &&
              (e.unload(),
              e.$slideTrack.children(this.options.slide).detach(),
              e.$slidesCache.appendTo(e.$slideTrack),
              e.reinit());
          }),
        (t.prototype.unload = function () {
          var t = this;
          e(".slick-cloned", t.$slider).remove(),
            t.$dots && t.$dots.remove(),
            t.$prevArrow &&
              t.htmlExpr.test(t.options.prevArrow) &&
              t.$prevArrow.remove(),
            t.$nextArrow &&
              t.htmlExpr.test(t.options.nextArrow) &&
              t.$nextArrow.remove(),
            t.$slides
              .removeClass(
                "slick-slide slick-active slick-visible slick-current"
              )
              .attr("aria-hidden", "true")
              .css("width", "");
        }),
        (t.prototype.unslick = function (e) {
          var t = this;
          t.$slider.trigger("unslick", [t, e]), t.destroy();
        }),
        (t.prototype.updateArrows = function () {
          var e = this;
          Math.floor(e.options.slidesToShow / 2),
            !0 === e.options.arrows &&
              e.slideCount > e.options.slidesToShow &&
              !e.options.infinite &&
              (e.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"),
              e.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"),
              0 === e.currentSlide
                ? (e.$prevArrow
                    .addClass("slick-disabled")
                    .attr("aria-disabled", "true"),
                  e.$nextArrow
                    .removeClass("slick-disabled")
                    .attr("aria-disabled", "false"))
                : ((e.currentSlide >= e.slideCount - e.options.slidesToShow &&
                    !1 === e.options.centerMode) ||
                    (e.currentSlide >= e.slideCount - 1 &&
                      !0 === e.options.centerMode)) &&
                  (e.$nextArrow
                    .addClass("slick-disabled")
                    .attr("aria-disabled", "true"),
                  e.$prevArrow
                    .removeClass("slick-disabled")
                    .attr("aria-disabled", "false")));
        }),
        (t.prototype.updateDots = function () {
          var e = this;
          null !== e.$dots &&
            (e.$dots.find("li").removeClass("slick-active").end(),
            e.$dots
              .find("li")
              .eq(Math.floor(e.currentSlide / e.options.slidesToScroll))
              .addClass("slick-active"));
        }),
        (t.prototype.visibility = function () {
          var e = this;
          e.options.autoplay &&
            (document[e.hidden] ? (e.interrupted = !0) : (e.interrupted = !1));
        }),
        (e.fn.slick = function () {
          var e,
            i,
            s = this,
            n = arguments[0],
            o = Array.prototype.slice.call(arguments, 1),
            r = s.length;
          for (e = 0; e < r; e++)
            if (
              ("object" == typeof n || void 0 === n
                ? (s[e].slick = new t(s[e], n))
                : (i = s[e].slick[n].apply(s[e].slick, o)),
              void 0 !== i)
            )
              return i;
          return s;
        });
    }),
    "function" == typeof define && define.amd
      ? define(["jquery"], me)
      : "undefined" != typeof exports
      ? (module.exports = me(require("jquery")))
      : me(jQuery);
  let ve = !1;
  setTimeout(() => {
    if (ve) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  var ye = function () {
    return (
      (ye =
        Object.assign ||
        function (e) {
          for (var t, i = 1, s = arguments.length; i < s; i++)
            for (var n in (t = arguments[i]))
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
          return e;
        }),
      ye.apply(this, arguments)
    );
  };
  var we = (function () {
    function e(e) {
      return (
        (this.cssVenderPrefixes = [
          "TransitionDuration",
          "TransitionTimingFunction",
          "Transform",
          "Transition",
        ]),
        (this.selector = this._getSelector(e)),
        (this.firstElement = this._getFirstEl()),
        this
      );
    }
    return (
      (e.generateUUID = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (e) {
            var t = (16 * Math.random()) | 0;
            return ("x" == e ? t : (3 & t) | 8).toString(16);
          }
        );
      }),
      (e.prototype._getSelector = function (e, t) {
        return (
          void 0 === t && (t = document),
          "string" != typeof e
            ? e
            : ((t = t || document),
              "#" === e.substring(0, 1)
                ? t.querySelector(e)
                : t.querySelectorAll(e))
        );
      }),
      (e.prototype._each = function (e) {
        return this.selector
          ? (void 0 !== this.selector.length
              ? [].forEach.call(this.selector, e)
              : e(this.selector, 0),
            this)
          : this;
      }),
      (e.prototype._setCssVendorPrefix = function (e, t, i) {
        var s = t.replace(/-([a-z])/gi, function (e, t) {
          return t.toUpperCase();
        });
        -1 !== this.cssVenderPrefixes.indexOf(s)
          ? ((e.style[s.charAt(0).toLowerCase() + s.slice(1)] = i),
            (e.style["webkit" + s] = i),
            (e.style["moz" + s] = i),
            (e.style["ms" + s] = i),
            (e.style["o" + s] = i))
          : (e.style[s] = i);
      }),
      (e.prototype._getFirstEl = function () {
        return this.selector && void 0 !== this.selector.length
          ? this.selector[0]
          : this.selector;
      }),
      (e.prototype.isEventMatched = function (e, t) {
        var i = t.split(".");
        return e
          .split(".")
          .filter(function (e) {
            return e;
          })
          .every(function (e) {
            return -1 !== i.indexOf(e);
          });
      }),
      (e.prototype.attr = function (e, t) {
        return void 0 === t
          ? this.firstElement
            ? this.firstElement.getAttribute(e)
            : ""
          : (this._each(function (i) {
              i.setAttribute(e, t);
            }),
            this);
      }),
      (e.prototype.find = function (e) {
        return be(this._getSelector(e, this.selector));
      }),
      (e.prototype.first = function () {
        return this.selector && void 0 !== this.selector.length
          ? be(this.selector[0])
          : be(this.selector);
      }),
      (e.prototype.eq = function (e) {
        return be(this.selector[e]);
      }),
      (e.prototype.parent = function () {
        return be(this.selector.parentElement);
      }),
      (e.prototype.get = function () {
        return this._getFirstEl();
      }),
      (e.prototype.removeAttr = function (e) {
        var t = e.split(" ");
        return (
          this._each(function (e) {
            t.forEach(function (t) {
              return e.removeAttribute(t);
            });
          }),
          this
        );
      }),
      (e.prototype.wrap = function (e) {
        if (!this.firstElement) return this;
        var t = document.createElement("div");
        return (
          (t.className = e),
          this.firstElement.parentNode.insertBefore(t, this.firstElement),
          this.firstElement.parentNode.removeChild(this.firstElement),
          t.appendChild(this.firstElement),
          this
        );
      }),
      (e.prototype.addClass = function (e) {
        return (
          void 0 === e && (e = ""),
          this._each(function (t) {
            e.split(" ").forEach(function (e) {
              e && t.classList.add(e);
            });
          }),
          this
        );
      }),
      (e.prototype.removeClass = function (e) {
        return (
          this._each(function (t) {
            e.split(" ").forEach(function (e) {
              e && t.classList.remove(e);
            });
          }),
          this
        );
      }),
      (e.prototype.hasClass = function (e) {
        return !!this.firstElement && this.firstElement.classList.contains(e);
      }),
      (e.prototype.hasAttribute = function (e) {
        return !!this.firstElement && this.firstElement.hasAttribute(e);
      }),
      (e.prototype.toggleClass = function (e) {
        return this.firstElement
          ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this)
          : this;
      }),
      (e.prototype.css = function (e, t) {
        var i = this;
        return (
          this._each(function (s) {
            i._setCssVendorPrefix(s, e, t);
          }),
          this
        );
      }),
      (e.prototype.on = function (t, i) {
        var s = this;
        return this.selector
          ? (t.split(" ").forEach(function (t) {
              Array.isArray(e.eventListeners[t]) || (e.eventListeners[t] = []),
                e.eventListeners[t].push(i),
                s.selector.addEventListener(t.split(".")[0], i);
            }),
            this)
          : this;
      }),
      (e.prototype.once = function (e, t) {
        var i = this;
        return (
          this.on(e, function () {
            i.off(e), t(e);
          }),
          this
        );
      }),
      (e.prototype.off = function (t) {
        var i = this;
        return this.selector
          ? (Object.keys(e.eventListeners).forEach(function (s) {
              i.isEventMatched(t, s) &&
                (e.eventListeners[s].forEach(function (e) {
                  i.selector.removeEventListener(s.split(".")[0], e);
                }),
                (e.eventListeners[s] = []));
            }),
            this)
          : this;
      }),
      (e.prototype.trigger = function (e, t) {
        if (!this.firstElement) return this;
        var i = new CustomEvent(e.split(".")[0], { detail: t || null });
        return this.firstElement.dispatchEvent(i), this;
      }),
      (e.prototype.load = function (e) {
        var t = this;
        return (
          fetch(e).then(function (e) {
            t.selector.innerHTML = e;
          }),
          this
        );
      }),
      (e.prototype.html = function (e) {
        return void 0 === e
          ? this.firstElement
            ? this.firstElement.innerHTML
            : ""
          : (this._each(function (t) {
              t.innerHTML = e;
            }),
            this);
      }),
      (e.prototype.append = function (e) {
        return (
          this._each(function (t) {
            "string" == typeof e
              ? t.insertAdjacentHTML("beforeend", e)
              : t.appendChild(e);
          }),
          this
        );
      }),
      (e.prototype.prepend = function (e) {
        return (
          this._each(function (t) {
            t.insertAdjacentHTML("afterbegin", e);
          }),
          this
        );
      }),
      (e.prototype.remove = function () {
        return (
          this._each(function (e) {
            e.parentNode.removeChild(e);
          }),
          this
        );
      }),
      (e.prototype.empty = function () {
        return (
          this._each(function (e) {
            e.innerHTML = "";
          }),
          this
        );
      }),
      (e.prototype.scrollTop = function (e) {
        return void 0 !== e
          ? ((document.body.scrollTop = e),
            (document.documentElement.scrollTop = e),
            this)
          : window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;
      }),
      (e.prototype.scrollLeft = function (e) {
        return void 0 !== e
          ? ((document.body.scrollLeft = e),
            (document.documentElement.scrollLeft = e),
            this)
          : window.pageXOffset ||
              document.documentElement.scrollLeft ||
              document.body.scrollLeft ||
              0;
      }),
      (e.prototype.offset = function () {
        if (!this.firstElement) return { left: 0, top: 0 };
        var e = this.firstElement.getBoundingClientRect(),
          t = be("body").style().marginLeft;
        return {
          left: e.left - parseFloat(t) + this.scrollLeft(),
          top: e.top + this.scrollTop(),
        };
      }),
      (e.prototype.style = function () {
        return this.firstElement
          ? this.firstElement.currentStyle ||
              window.getComputedStyle(this.firstElement)
          : {};
      }),
      (e.prototype.width = function () {
        var e = this.style();
        return (
          this.firstElement.clientWidth -
          parseFloat(e.paddingLeft) -
          parseFloat(e.paddingRight)
        );
      }),
      (e.prototype.height = function () {
        var e = this.style();
        return (
          this.firstElement.clientHeight -
          parseFloat(e.paddingTop) -
          parseFloat(e.paddingBottom)
        );
      }),
      (e.eventListeners = {}),
      e
    );
  })();
  function be(e) {
    return (
      (function () {
        if ("function" == typeof window.CustomEvent) return !1;
        window.CustomEvent = function (e, t) {
          t = t || { bubbles: !1, cancelable: !1, detail: null };
          var i = document.createEvent("CustomEvent");
          return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i;
        };
      })(),
      Element.prototype.matches ||
        (Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector),
      new we(e)
    );
  }
  var Se = [
    "src",
    "sources",
    "subHtml",
    "subHtmlUrl",
    "html",
    "video",
    "poster",
    "slideName",
    "responsive",
    "srcset",
    "sizes",
    "iframe",
    "downloadUrl",
    "download",
    "width",
    "facebookShareUrl",
    "tweetText",
    "iframeTitle",
    "twitterShareUrl",
    "pinterestShareUrl",
    "pinterestText",
    "fbHtml",
    "disqusIdentifier",
    "disqusUrl",
  ];
  function Ce(e) {
    return "href" === e
      ? "src"
      : (e = (e =
          (e = e.replace("data-", "")).charAt(0).toLowerCase() +
          e.slice(1)).replace(/-([a-z])/g, function (e) {
          return e[1].toUpperCase();
        }));
  }
  var Te = function (e, t, i, s) {
      void 0 === i && (i = 0);
      var n = be(e).attr("data-lg-size") || s;
      if (n) {
        var o = n.split(",");
        if (o[1])
          for (var r = window.innerWidth, l = 0; l < o.length; l++) {
            var a = o[l];
            if (parseInt(a.split("-")[2], 10) > r) {
              n = a;
              break;
            }
            l === o.length - 1 && (n = a);
          }
        var d = n.split("-"),
          c = parseInt(d[0], 10),
          p = parseInt(d[1], 10),
          u = t.width(),
          h = t.height() - i,
          g = Math.min(u, c),
          f = Math.min(h, p),
          m = Math.min(g / c, f / p);
        return { width: c * m, height: p * m };
      }
    },
    xe = function (e, t, i, s, n) {
      if (n) {
        var o = be(e).find("img").first();
        if (o.get()) {
          var r = t.get().getBoundingClientRect(),
            l = r.width,
            a = t.height() - (i + s),
            d = o.width(),
            c = o.height(),
            p = o.style(),
            u =
              (l - d) / 2 -
              o.offset().left +
              (parseFloat(p.paddingLeft) || 0) +
              (parseFloat(p.borderLeft) || 0) +
              be(window).scrollLeft() +
              r.left,
            h =
              (a - c) / 2 -
              o.offset().top +
              (parseFloat(p.paddingTop) || 0) +
              (parseFloat(p.borderTop) || 0) +
              be(window).scrollTop() +
              i;
          return (
            "translate3d(" +
            (u *= -1) +
            "px, " +
            (h *= -1) +
            "px, 0) scale3d(" +
            d / n.width +
            ", " +
            c / n.height +
            ", 1)"
          );
        }
      }
    },
    ke = function (e, t, i, s, n, o) {
      return (
        '<div class="lg-video-cont lg-has-iframe" style="width:' +
        e +
        "; max-width:" +
        i +
        "; height: " +
        t +
        "; max-height:" +
        s +
        '">\n                    <iframe class="lg-object" frameborder="0" ' +
        (o ? 'title="' + o + '"' : "") +
        ' src="' +
        n +
        '"  allowfullscreen="true"></iframe>\n                </div>'
      );
    },
    Ee = function (e, t, i, s, n, o) {
      var r =
          "<img " +
          i +
          " " +
          (s ? 'srcset="' + s + '"' : "") +
          "  " +
          (n ? 'sizes="' + n + '"' : "") +
          ' class="lg-object lg-image" data-index="' +
          e +
          '" src="' +
          t +
          '" />',
        l = "";
      o &&
        (l = ("string" == typeof o ? JSON.parse(o) : o).map(function (e) {
          var t = "";
          return (
            Object.keys(e).forEach(function (i) {
              t += " " + i + '="' + e[i] + '"';
            }),
            "<source " + t + "></source>"
          );
        }));
      return "" + l + r;
    },
    $e = function (e) {
      for (var t = [], i = [], s = "", n = 0; n < e.length; n++) {
        var o = e[n].split(" ");
        "" === o[0] && o.splice(0, 1), i.push(o[0]), t.push(o[1]);
      }
      for (var r = window.innerWidth, l = 0; l < t.length; l++)
        if (parseInt(t[l], 10) > r) {
          s = i[l];
          break;
        }
      return s;
    },
    Ie = function (e) {
      return !!e && !!e.complete && 0 !== e.naturalWidth;
    },
    Le = function (e, t, i, s) {
      return (
        '<div class="lg-video-cont ' +
        (s && s.youtube
          ? "lg-has-youtube"
          : s && s.vimeo
          ? "lg-has-vimeo"
          : "lg-has-html5") +
        '" style="' +
        i +
        '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="Play video"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>Play video</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
        (t || "") +
        '\n            <img class="lg-object lg-video-poster" src="' +
        e +
        '" />\n        </div>'
      );
    },
    Ae = function (e, t, i, s) {
      var n = [],
        o = (function () {
          for (var e = 0, t = 0, i = arguments.length; t < i; t++)
            e += arguments[t].length;
          var s = Array(e),
            n = 0;
          for (t = 0; t < i; t++)
            for (var o = arguments[t], r = 0, l = o.length; r < l; r++, n++)
              s[n] = o[r];
          return s;
        })(Se, t);
      return (
        [].forEach.call(e, function (e) {
          for (var t = {}, r = 0; r < e.attributes.length; r++) {
            var l = e.attributes[r];
            if (l.specified) {
              var a = Ce(l.name),
                d = "";
              o.indexOf(a) > -1 && (d = a), d && (t[d] = l.value);
            }
          }
          var c = be(e),
            p = c.find("img").first().attr("alt"),
            u = c.attr("title"),
            h = s ? c.attr(s) : c.find("img").first().attr("src");
          (t.thumb = h),
            i && !t.subHtml && (t.subHtml = u || p || ""),
            (t.alt = p || u || ""),
            n.push(t);
        }),
        n
      );
    },
    Pe = function () {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    Me = function (e, t, i) {
      if (!e)
        return t
          ? { html5: !0 }
          : void console.error(
              "lightGallery :- data-src is not provided on slide item " +
                (i + 1) +
                ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
            );
      var s = e.match(
          /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
        ),
        n = e.match(
          /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
        ),
        o = e.match(
          /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
        );
      return s ? { youtube: s } : n ? { vimeo: n } : o ? { wistia: o } : void 0;
    },
    Oe = {
      mode: "lg-slide",
      easing: "ease",
      speed: 400,
      licenseKey: "0000-0000-000-0000",
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 300,
      container: "",
      startAnimationDuration: 400,
      zoomFromOrigin: !0,
      hideBarsDelay: 0,
      showBarsAfter: 1e4,
      slideDelay: 0,
      supportLegacyBrowser: !0,
      allowMediaOverlap: !1,
      videoMaxSize: "1280-720",
      loadYouTubePoster: !0,
      defaultCaptionHeight: 0,
      ariaLabelledby: "",
      ariaDescribedby: "",
      closable: !0,
      swipeToClose: !0,
      closeOnTap: !0,
      showCloseIcon: !0,
      showMaximizeIcon: !1,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      controls: !0,
      slideEndAnimation: !0,
      hideControlOnEnd: !1,
      mousewheel: !1,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 2,
      numberOfSlideItemsInDom: 10,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: 0,
      iframeWidth: "100%",
      iframeHeight: "100%",
      iframeMaxWidth: "100%",
      iframeMaxHeight: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      extraProps: [],
      exThumbImage: "",
      isMobile: void 0,
      mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
      plugins: [],
    },
    ze = "lgAfterAppendSlide",
    De = "lgInit",
    _e = "lgHasVideo",
    He = "lgContainerResize",
    Be = "lgUpdateSlides",
    Ge = "lgAfterAppendSubHtml",
    Ne = "lgBeforeOpen",
    je = "lgAfterOpen",
    Fe = "lgSlideItemLoad",
    qe = "lgBeforeSlide",
    We = "lgAfterSlide",
    Ve = "lgPosterClick",
    Re = "lgDragStart",
    Xe = "lgDragMove",
    Ye = "lgDragEnd",
    Ue = "lgBeforeNextSlide",
    Ke = "lgBeforePrevSlide",
    Qe = "lgBeforeClose",
    Ze = "lgAfterClose",
    Je = 0,
    et = (function () {
      function e(e, t) {
        if (
          ((this.lgOpened = !1),
          (this.index = 0),
          (this.plugins = []),
          (this.lGalleryOn = !1),
          (this.lgBusy = !1),
          (this.currentItemsInDom = []),
          (this.prevScrollTop = 0),
          (this.isDummyImageRemoved = !1),
          (this.dragOrSwipeEnabled = !1),
          (this.mediaContainerPosition = { top: 0, bottom: 0 }),
          !e)
        )
          return this;
        if (
          (Je++,
          (this.lgId = Je),
          (this.el = e),
          (this.LGel = be(e)),
          this.generateSettings(t),
          this.buildModules(),
          this.settings.dynamic &&
            void 0 !== this.settings.dynamicEl &&
            !Array.isArray(this.settings.dynamicEl))
        )
          throw "When using dynamic mode, you must also define dynamicEl as an Array.";
        return (
          (this.galleryItems = this.getItems()),
          this.normalizeSettings(),
          this.init(),
          this.validateLicense(),
          this
        );
      }
      return (
        (e.prototype.generateSettings = function (e) {
          if (
            ((this.settings = ye(ye({}, Oe), e)),
            this.settings.isMobile &&
            "function" == typeof this.settings.isMobile
              ? this.settings.isMobile()
              : Pe())
          ) {
            var t = ye(
              ye({}, this.settings.mobileSettings),
              this.settings.mobileSettings
            );
            this.settings = ye(ye({}, this.settings), t);
          }
        }),
        (e.prototype.normalizeSettings = function () {
          this.settings.slideEndAnimation &&
            (this.settings.hideControlOnEnd = !1),
            this.settings.closable || (this.settings.swipeToClose = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            this.settings.dynamic && (this.zoomFromOrigin = !1),
            this.settings.container ||
              (this.settings.container = document.body),
            (this.settings.preload = Math.min(
              this.settings.preload,
              this.galleryItems.length
            ));
        }),
        (e.prototype.init = function () {
          var e = this;
          this.addSlideVideoInfo(this.galleryItems),
            this.buildStructure(),
            this.LGel.trigger(De, { instance: this }),
            this.settings.keyPress && this.keyPress(),
            setTimeout(function () {
              e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
            }, 50),
            this.arrow(),
            this.settings.mousewheel && this.mousewheel(),
            this.settings.dynamic || this.openGalleryOnItemClick();
        }),
        (e.prototype.openGalleryOnItemClick = function () {
          for (
            var e = this,
              t = function (t) {
                var s = i.items[t],
                  n = be(s),
                  o = we.generateUUID();
                n.attr("data-lg-id", o).on(
                  "click.lgcustom-item-" + o,
                  function (i) {
                    i.preventDefault();
                    var n = e.settings.index || t;
                    e.openGallery(n, s);
                  }
                );
              },
              i = this,
              s = 0;
            s < this.items.length;
            s++
          )
            t(s);
        }),
        (e.prototype.buildModules = function () {
          var e = this;
          this.settings.plugins.forEach(function (t) {
            e.plugins.push(new t(e, be));
          });
        }),
        (e.prototype.validateLicense = function () {
          this.settings.licenseKey
            ? "0000-0000-000-0000" === this.settings.licenseKey &&
              console.warn(
                "lightGallery: " +
                  this.settings.licenseKey +
                  " license key is not valid for production use"
              )
            : console.error("Please provide a valid license key");
        }),
        (e.prototype.getSlideItem = function (e) {
          return be(this.getSlideItemId(e));
        }),
        (e.prototype.getSlideItemId = function (e) {
          return "#lg-item-" + this.lgId + "-" + e;
        }),
        (e.prototype.getIdName = function (e) {
          return e + "-" + this.lgId;
        }),
        (e.prototype.getElementById = function (e) {
          return be("#" + this.getIdName(e));
        }),
        (e.prototype.manageSingleSlideClassName = function () {
          this.galleryItems.length < 2
            ? this.outer.addClass("lg-single-item")
            : this.outer.removeClass("lg-single-item");
        }),
        (e.prototype.buildStructure = function () {
          var e = this;
          if (!(this.$container && this.$container.get())) {
            var t = "",
              i = "";
            this.settings.controls &&
              (t =
                '<button type="button" id="' +
                this.getIdName("lg-prev") +
                '" aria-label="Previous slide" class="lg-prev lg-icon"> ' +
                this.settings.prevHtml +
                ' </button>\n                <button type="button" id="' +
                this.getIdName("lg-next") +
                '" aria-label="Next slide" class="lg-next lg-icon"> ' +
                this.settings.nextHtml +
                " </button>"),
              ".lg-item" !== this.settings.appendSubHtmlTo &&
                (i =
                  '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
            var s = "";
            this.settings.allowMediaOverlap && (s += "lg-media-overlap ");
            var n = this.settings.ariaLabelledby
                ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                : "",
              o = this.settings.ariaDescribedby
                ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                : "",
              r =
                "lg-container " +
                this.settings.addClass +
                " " +
                (document.body !== this.settings.container ? "lg-inline" : ""),
              l =
                this.settings.closable && this.settings.showCloseIcon
                  ? '<button type="button" aria-label="Close gallery" id="' +
                    this.getIdName("lg-close") +
                    '" class="lg-close lg-icon"></button>'
                  : "",
              a = this.settings.showMaximizeIcon
                ? '<button type="button" aria-label="Toggle maximize" id="' +
                  this.getIdName("lg-maximize") +
                  '" class="lg-maximize lg-icon"></button>'
                : "",
              d =
                '\n        <div class="' +
                r +
                '" id="' +
                this.getIdName("lg-container") +
                '" tabindex="-1" aria-modal="true" ' +
                n +
                " " +
                o +
                ' role="dialog"\n        >\n            <div id="' +
                this.getIdName("lg-backdrop") +
                '" class="lg-backdrop"></div>\n\n            <div id="' +
                this.getIdName("lg-outer") +
                '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                s +
                ' ">\n\n              <div id="' +
                this.getIdName("lg-content") +
                '" class="lg-content">\n                <div id="' +
                this.getIdName("lg-inner") +
                '" class="lg-inner">\n                </div>\n                ' +
                t +
                '\n              </div>\n                <div id="' +
                this.getIdName("lg-toolbar") +
                '" class="lg-toolbar lg-group">\n                    ' +
                a +
                "\n                    " +
                l +
                "\n                    </div>\n                    " +
                (".lg-outer" === this.settings.appendSubHtmlTo ? i : "") +
                '\n                <div id="' +
                this.getIdName("lg-components") +
                '" class="lg-components">\n                    ' +
                (".lg-sub-html" === this.settings.appendSubHtmlTo ? i : "") +
                "\n                </div>\n            </div>\n        </div>\n        ";
            be(this.settings.container).css("position", "relative").append(d),
              (this.outer = this.getElementById("lg-outer")),
              (this.$lgComponents = this.getElementById("lg-components")),
              (this.$backdrop = this.getElementById("lg-backdrop")),
              (this.$container = this.getElementById("lg-container")),
              (this.$inner = this.getElementById("lg-inner")),
              (this.$content = this.getElementById("lg-content")),
              (this.$toolbar = this.getElementById("lg-toolbar")),
              this.$backdrop.css(
                "transition-duration",
                this.settings.backdropDuration + "ms"
              );
            var c = this.settings.mode + " ";
            this.manageSingleSlideClassName(),
              this.settings.enableDrag && (c += "lg-grab "),
              this.outer.addClass(c),
              this.$inner.css(
                "transition-timing-function",
                this.settings.easing
              ),
              this.$inner.css(
                "transition-duration",
                this.settings.speed + "ms"
              ),
              this.settings.download &&
                this.$toolbar.append(
                  '<a id="' +
                    this.getIdName("lg-download") +
                    '" target="_blank" rel="noopener" aria-label="Download" download class="lg-download lg-icon"></a>'
                ),
              this.counter(),
              be(window).on(
                "resize.lg.global" +
                  this.lgId +
                  " orientationchange.lg.global" +
                  this.lgId,
                function () {
                  e.refreshOnResize();
                }
              ),
              this.hideBars(),
              this.manageCloseGallery(),
              this.toggleMaximize(),
              this.initModules();
          }
        }),
        (e.prototype.refreshOnResize = function () {
          if (this.lgOpened) {
            var e = this.galleryItems[this.index].__slideVideoInfo;
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var t = this.mediaContainerPosition,
              i = t.top,
              s = t.bottom;
            if (
              ((this.currentImageSize = Te(
                this.items[this.index],
                this.outer,
                i + s,
                e && this.settings.videoMaxSize
              )),
              e && this.resizeVideoSlide(this.index, this.currentImageSize),
              this.zoomFromOrigin && !this.isDummyImageRemoved)
            ) {
              var n = this.getDummyImgStyles(this.currentImageSize);
              this.outer
                .find(".lg-current .lg-dummy-img")
                .first()
                .attr("style", n);
            }
            this.LGel.trigger(He);
          }
        }),
        (e.prototype.resizeVideoSlide = function (e, t) {
          var i = this.getVideoContStyle(t);
          this.getSlideItem(e).find(".lg-video-cont").attr("style", i);
        }),
        (e.prototype.updateSlides = function (e, t) {
          if (
            (this.index > e.length - 1 && (this.index = e.length - 1),
            1 === e.length && (this.index = 0),
            e.length)
          ) {
            var i = this.galleryItems[t].src;
            (this.galleryItems = e),
              this.updateControls(),
              this.$inner.empty(),
              (this.currentItemsInDom = []);
            var s = 0;
            this.galleryItems.some(function (e, t) {
              return e.src === i && ((s = t), !0);
            }),
              (this.currentItemsInDom = this.organizeSlideItems(s, -1)),
              this.loadContent(s, !0),
              this.getSlideItem(s).addClass("lg-current"),
              (this.index = s),
              this.updateCurrentCounter(s),
              this.LGel.trigger(Be);
          } else this.closeGallery();
        }),
        (e.prototype.getItems = function () {
          if (((this.items = []), this.settings.dynamic))
            return this.settings.dynamicEl || [];
          if ("this" === this.settings.selector) this.items.push(this.el);
          else if (this.settings.selector)
            if ("string" == typeof this.settings.selector)
              if (this.settings.selectWithin) {
                var e = be(this.settings.selectWithin);
                this.items = e.find(this.settings.selector).get();
              } else
                this.items = this.el.querySelectorAll(this.settings.selector);
            else this.items = this.settings.selector;
          else this.items = this.el.children;
          return Ae(
            this.items,
            this.settings.extraProps,
            this.settings.getCaptionFromTitleOrAlt,
            this.settings.exThumbImage
          );
        }),
        (e.prototype.openGallery = function (e, t) {
          var i = this;
          if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
            (this.lgOpened = !0),
              this.outer.get().focus(),
              this.outer.removeClass("lg-hide-items"),
              this.$container.addClass("lg-show");
            var s = this.getItemsToBeInsertedToDom(e, e);
            this.currentItemsInDom = s;
            var n = "";
            s.forEach(function (e) {
              n = n + '<div id="' + e + '" class="lg-item"></div>';
            }),
              this.$inner.append(n),
              this.addHtml(e);
            var o = "";
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var r = this.mediaContainerPosition,
              l = r.top,
              a = r.bottom;
            this.settings.allowMediaOverlap ||
              this.setMediaContainerPosition(l, a);
            var d = this.galleryItems[e].__slideVideoInfo;
            this.zoomFromOrigin &&
              t &&
              ((this.currentImageSize = Te(
                t,
                this.outer,
                l + a,
                d && this.settings.videoMaxSize
              )),
              (o = xe(t, this.outer, l, a, this.currentImageSize))),
              (this.zoomFromOrigin && o) ||
                (this.outer.addClass(this.settings.startClass),
                this.getSlideItem(e).removeClass("lg-complete"));
            var c = this.settings.zoomFromOrigin
              ? 100
              : this.settings.backdropDuration;
            setTimeout(function () {
              i.outer.addClass("lg-components-open");
            }, c),
              (this.index = e),
              this.LGel.trigger(Ne),
              this.getSlideItem(e).addClass("lg-current"),
              (this.lGalleryOn = !1),
              (this.prevScrollTop = be(window).scrollTop()),
              setTimeout(function () {
                if (i.zoomFromOrigin && o) {
                  var t = i.getSlideItem(e);
                  t.css("transform", o),
                    setTimeout(function () {
                      t
                        .addClass("lg-start-progress lg-start-end-progress")
                        .css(
                          "transition-duration",
                          i.settings.startAnimationDuration + "ms"
                        ),
                        i.outer.addClass("lg-zoom-from-image");
                    }),
                    setTimeout(function () {
                      t.css("transform", "translate3d(0, 0, 0)");
                    }, 100);
                }
                setTimeout(function () {
                  i.$backdrop.addClass("in"),
                    i.$container.addClass("lg-show-in");
                }, 10),
                  (i.zoomFromOrigin && o) ||
                    setTimeout(function () {
                      i.outer.addClass("lg-visible");
                    }, i.settings.backdropDuration),
                  i.slide(e, !1, !1, !1),
                  i.LGel.trigger(je);
              }),
              document.body === this.settings.container &&
                be("html").addClass("lg-on");
          }
        }),
        (e.prototype.getMediaContainerPosition = function () {
          if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
          var e = this.$toolbar.get().clientHeight || 0,
            t = this.outer.find(".lg-components .lg-sub-html").get(),
            i =
              this.settings.defaultCaptionHeight || (t && t.clientHeight) || 0,
            s = this.outer.find(".lg-thumb-outer").get();
          return { top: e, bottom: (s ? s.clientHeight : 0) + i };
        }),
        (e.prototype.setMediaContainerPosition = function (e, t) {
          void 0 === e && (e = 0),
            void 0 === t && (t = 0),
            this.$content.css("top", e + "px").css("bottom", t + "px");
        }),
        (e.prototype.hideBars = function () {
          var e = this;
          setTimeout(function () {
            e.outer.removeClass("lg-hide-items"),
              e.settings.hideBarsDelay > 0 &&
                (e.outer.on("mousemove.lg click.lg touchstart.lg", function () {
                  e.outer.removeClass("lg-hide-items"),
                    clearTimeout(e.hideBarTimeout),
                    (e.hideBarTimeout = setTimeout(function () {
                      e.outer.addClass("lg-hide-items");
                    }, e.settings.hideBarsDelay));
                }),
                e.outer.trigger("mousemove.lg"));
          }, this.settings.showBarsAfter);
        }),
        (e.prototype.initPictureFill = function (e) {
          if (this.settings.supportLegacyBrowser)
            try {
              picturefill({ elements: [e.get()] });
            } catch (e) {
              console.warn(
                "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
              );
            }
        }),
        (e.prototype.counter = function () {
          if (this.settings.counter) {
            var e =
              '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
              this.getIdName("lg-counter-current") +
              '" class="lg-counter-current">' +
              (this.index + 1) +
              ' </span> /\n                <span id="' +
              this.getIdName("lg-counter-all") +
              '" class="lg-counter-all">' +
              this.galleryItems.length +
              " </span></div>";
            this.outer.find(this.settings.appendCounterTo).append(e);
          }
        }),
        (e.prototype.addHtml = function (e) {
          var t, i;
          if (
            (this.galleryItems[e].subHtmlUrl
              ? (i = this.galleryItems[e].subHtmlUrl)
              : (t = this.galleryItems[e].subHtml),
            !i)
          )
            if (t) {
              var s = t.substring(0, 1);
              ("." !== s && "#" !== s) ||
                (t =
                  this.settings.subHtmlSelectorRelative &&
                  !this.settings.dynamic
                    ? be(this.items).eq(e).find(t).first().html()
                    : be(t).first().html());
            } else t = "";
          if (".lg-item" !== this.settings.appendSubHtmlTo)
            i
              ? this.outer.find(".lg-sub-html").load(i)
              : this.outer.find(".lg-sub-html").html(t);
          else {
            var n = be(this.getSlideItemId(e));
            i
              ? n.load(i)
              : n.append('<div class="lg-sub-html">' + t + "</div>");
          }
          null != t &&
            ("" === t
              ? this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
            this.LGel.trigger(Ge, { index: e });
        }),
        (e.prototype.preload = function (e) {
          for (
            var t = 1;
            t <= this.settings.preload && !(t >= this.galleryItems.length - e);
            t++
          )
            this.loadContent(e + t, !1);
          for (var i = 1; i <= this.settings.preload && !(e - i < 0); i++)
            this.loadContent(e - i, !1);
        }),
        (e.prototype.getDummyImgStyles = function (e) {
          return e
            ? "width:" +
                e.width +
                "px;\n                margin-left: -" +
                e.width / 2 +
                "px;\n                margin-top: -" +
                e.height / 2 +
                "px;\n                height:" +
                e.height +
                "px"
            : "";
        }),
        (e.prototype.getVideoContStyle = function (e) {
          return e
            ? "width:" +
                e.width +
                "px;\n                height:" +
                e.height +
                "px"
            : "";
        }),
        (e.prototype.getDummyImageContent = function (e, t, i) {
          var s;
          if ((this.settings.dynamic || (s = be(this.items).eq(t)), s)) {
            var n = void 0;
            if (
              !(n = this.settings.exThumbImage
                ? s.attr(this.settings.exThumbImage)
                : s.find("img").first().attr("src"))
            )
              return "";
            var o =
              "<img " +
              i +
              ' style="' +
              this.getDummyImgStyles(this.currentImageSize) +
              '" class="lg-dummy-img" src="' +
              n +
              '" />';
            return (
              e.addClass("lg-first-slide"),
              this.outer.addClass("lg-first-slide-loading"),
              o
            );
          }
          return "";
        }),
        (e.prototype.setImgMarkup = function (e, t, i) {
          var s = this.galleryItems[i],
            n = s.alt,
            o = s.srcset,
            r = s.sizes,
            l = s.sources,
            a = n ? 'alt="' + n + '"' : "",
            d =
              '<picture class="lg-img-wrap"> ' +
              (this.isFirstSlideWithZoomAnimation()
                ? this.getDummyImageContent(t, i, a)
                : Ee(i, e, a, o, r, l)) +
              "</picture>";
          t.prepend(d);
        }),
        (e.prototype.onSlideObjectLoad = function (e, t, i, s) {
          var n = e.find(".lg-object").first();
          Ie(n.get()) || t
            ? i()
            : (n.on("load.lg error.lg", function () {
                i && i();
              }),
              n.on("error.lg", function () {
                s && s();
              }));
        }),
        (e.prototype.onLgObjectLoad = function (e, t, i, s, n, o) {
          var r = this;
          this.onSlideObjectLoad(
            e,
            o,
            function () {
              r.triggerSlideItemLoad(e, t, i, s, n);
            },
            function () {
              e.addClass("lg-complete lg-complete_"),
                e.html(
                  '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                );
            }
          );
        }),
        (e.prototype.triggerSlideItemLoad = function (e, t, i, s, n) {
          var o = this,
            r = this.galleryItems[t],
            l = n && "video" === this.getSlideType(r) && !r.poster ? s : 0;
          setTimeout(function () {
            e.addClass("lg-complete lg-complete_"),
              o.LGel.trigger(Fe, { index: t, delay: i || 0, isFirstSlide: n });
          }, l);
        }),
        (e.prototype.isFirstSlideWithZoomAnimation = function () {
          return !(
            this.lGalleryOn ||
            !this.zoomFromOrigin ||
            !this.currentImageSize
          );
        }),
        (e.prototype.addSlideVideoInfo = function (e) {
          var t = this;
          e.forEach(function (e, i) {
            (e.__slideVideoInfo = Me(e.src, !!e.video, i)),
              e.__slideVideoInfo &&
                t.settings.loadYouTubePoster &&
                !e.poster &&
                e.__slideVideoInfo.youtube &&
                (e.poster =
                  "//img.youtube.com/vi/" +
                  e.__slideVideoInfo.youtube[1] +
                  "/maxresdefault.jpg");
          });
        }),
        (e.prototype.loadContent = function (e, t) {
          var i = this,
            s = this.galleryItems[e],
            n = be(this.getSlideItemId(e)),
            o = s.poster,
            r = s.srcset,
            l = s.sizes,
            a = s.sources,
            d = s.src,
            c = s.video,
            p = c && "string" == typeof c ? JSON.parse(c) : c;
          if (s.responsive) {
            var u = s.responsive.split(",");
            d = $e(u) || d;
          }
          var h = s.__slideVideoInfo,
            g = "",
            f = !!s.iframe,
            m = !this.lGalleryOn,
            v = 0;
          if (
            (m &&
              (v =
                this.zoomFromOrigin && this.currentImageSize
                  ? this.settings.startAnimationDuration + 10
                  : this.settings.backdropDuration + 10),
            !n.hasClass("lg-loaded"))
          ) {
            if (h) {
              var y = this.mediaContainerPosition,
                w = y.top,
                b = y.bottom,
                S = Te(
                  this.items[e],
                  this.outer,
                  w + b,
                  h && this.settings.videoMaxSize
                );
              g = this.getVideoContStyle(S);
            }
            if (f) {
              var C = ke(
                this.settings.iframeWidth,
                this.settings.iframeHeight,
                this.settings.iframeMaxWidth,
                this.settings.iframeMaxHeight,
                d,
                s.iframeTitle
              );
              n.prepend(C);
            } else if (o) {
              var T = "";
              m &&
                this.zoomFromOrigin &&
                this.currentImageSize &&
                (T = this.getDummyImageContent(n, e, ""));
              C = Le(o, T || "", g, h);
              n.prepend(C);
            } else if (h) {
              C = '<div class="lg-video-cont " style="' + g + '"></div>';
              n.prepend(C);
            } else if ((this.setImgMarkup(d, n, e), r || a)) {
              var x = n.find(".lg-object");
              this.initPictureFill(x);
            }
            (o || h) &&
              this.LGel.trigger(_e, {
                index: e,
                src: d,
                html5Video: p,
                hasPoster: !!o,
              }),
              this.LGel.trigger(ze, { index: e }),
              this.lGalleryOn &&
                ".lg-item" === this.settings.appendSubHtmlTo &&
                this.addHtml(e);
          }
          var k = 0;
          v && !be(document.body).hasClass("lg-from-hash") && (k = v),
            this.isFirstSlideWithZoomAnimation() &&
              (setTimeout(function () {
                n.removeClass(
                  "lg-start-end-progress lg-start-progress"
                ).removeAttr("style");
              }, this.settings.startAnimationDuration + 100),
              n.hasClass("lg-loaded") ||
                setTimeout(function () {
                  if (
                    "image" === i.getSlideType(s) &&
                    (n
                      .find(".lg-img-wrap")
                      .append(Ee(e, d, "", r, l, s.sources)),
                    r || a)
                  ) {
                    var t = n.find(".lg-object");
                    i.initPictureFill(t);
                  }
                  ("image" === i.getSlideType(s) ||
                    ("video" === i.getSlideType(s) && o)) &&
                    (i.onLgObjectLoad(n, e, v, k, !0, !1),
                    i.onSlideObjectLoad(
                      n,
                      !(!h || !h.html5 || o),
                      function () {
                        i.loadContentOnFirstSlideLoad(e, n, k);
                      },
                      function () {
                        i.loadContentOnFirstSlideLoad(e, n, k);
                      }
                    ));
                }, this.settings.startAnimationDuration + 100)),
            n.addClass("lg-loaded"),
            (this.isFirstSlideWithZoomAnimation() &&
              ("video" !== this.getSlideType(s) || o)) ||
              this.onLgObjectLoad(n, e, v, k, m, !(!h || !h.html5 || o)),
            (this.zoomFromOrigin && this.currentImageSize) ||
              !n.hasClass("lg-complete_") ||
              this.lGalleryOn ||
              setTimeout(function () {
                n.addClass("lg-complete");
              }, this.settings.backdropDuration),
            (this.lGalleryOn = !0),
            !0 === t &&
              (n.hasClass("lg-complete_")
                ? this.preload(e)
                : n
                    .find(".lg-object")
                    .first()
                    .on("load.lg error.lg", function () {
                      i.preload(e);
                    }));
        }),
        (e.prototype.loadContentOnFirstSlideLoad = function (e, t, i) {
          var s = this;
          setTimeout(function () {
            t.find(".lg-dummy-img").remove(),
              t.removeClass("lg-first-slide"),
              s.outer.removeClass("lg-first-slide-loading"),
              (s.isDummyImageRemoved = !0),
              s.preload(e);
          }, i + 300);
        }),
        (e.prototype.getItemsToBeInsertedToDom = function (e, t, i) {
          var s = this;
          void 0 === i && (i = 0);
          var n = [],
            o = Math.max(i, 3);
          o = Math.min(o, this.galleryItems.length);
          var r = "lg-item-" + this.lgId + "-" + t;
          if (this.galleryItems.length <= 3)
            return (
              this.galleryItems.forEach(function (e, t) {
                n.push("lg-item-" + s.lgId + "-" + t);
              }),
              n
            );
          if (e < (this.galleryItems.length - 1) / 2) {
            for (var l = e; l > e - o / 2 && l >= 0; l--)
              n.push("lg-item-" + this.lgId + "-" + l);
            var a = n.length;
            for (l = 0; l < o - a; l++)
              n.push("lg-item-" + this.lgId + "-" + (e + l + 1));
          } else {
            for (l = e; l <= this.galleryItems.length - 1 && l < e + o / 2; l++)
              n.push("lg-item-" + this.lgId + "-" + l);
            for (a = n.length, l = 0; l < o - a; l++)
              n.push("lg-item-" + this.lgId + "-" + (e - l - 1));
          }
          return (
            this.settings.loop &&
              (e === this.galleryItems.length - 1
                ? n.push("lg-item-" + this.lgId + "-0")
                : 0 === e &&
                  n.push(
                    "lg-item-" +
                      this.lgId +
                      "-" +
                      (this.galleryItems.length - 1)
                  )),
            -1 === n.indexOf(r) && n.push("lg-item-" + this.lgId + "-" + t),
            n
          );
        }),
        (e.prototype.organizeSlideItems = function (e, t) {
          var i = this,
            s = this.getItemsToBeInsertedToDom(
              e,
              t,
              this.settings.numberOfSlideItemsInDom
            );
          return (
            s.forEach(function (e) {
              -1 === i.currentItemsInDom.indexOf(e) &&
                i.$inner.append('<div id="' + e + '" class="lg-item"></div>');
            }),
            this.currentItemsInDom.forEach(function (e) {
              -1 === s.indexOf(e) && be("#" + e).remove();
            }),
            s
          );
        }),
        (e.prototype.getPreviousSlideIndex = function () {
          var e = 0;
          try {
            var t = this.outer.find(".lg-current").first().attr("id");
            e = parseInt(t.split("-")[3]) || 0;
          } catch (t) {
            e = 0;
          }
          return e;
        }),
        (e.prototype.setDownloadValue = function (e) {
          if (this.settings.download) {
            var t = this.galleryItems[e];
            if (!1 === t.downloadUrl || "false" === t.downloadUrl)
              this.outer.addClass("lg-hide-download");
            else {
              var i = this.getElementById("lg-download");
              this.outer.removeClass("lg-hide-download"),
                i.attr("href", t.downloadUrl || t.src),
                t.download && i.attr("download", t.download);
            }
          }
        }),
        (e.prototype.makeSlideAnimation = function (e, t, i) {
          var s = this;
          this.lGalleryOn && i.addClass("lg-slide-progress"),
            setTimeout(
              function () {
                s.outer.addClass("lg-no-trans"),
                  s.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-next-slide"),
                  "prev" === e
                    ? (t.addClass("lg-prev-slide"), i.addClass("lg-next-slide"))
                    : (t.addClass("lg-next-slide"),
                      i.addClass("lg-prev-slide")),
                  setTimeout(function () {
                    s.outer.find(".lg-item").removeClass("lg-current"),
                      t.addClass("lg-current"),
                      s.outer.removeClass("lg-no-trans");
                  }, 50);
              },
              this.lGalleryOn ? this.settings.slideDelay : 0
            );
        }),
        (e.prototype.slide = function (e, t, i, s) {
          var n = this,
            o = this.getPreviousSlideIndex();
          if (
            ((this.currentItemsInDom = this.organizeSlideItems(e, o)),
            !this.lGalleryOn || o !== e)
          ) {
            var r = this.galleryItems.length;
            if (!this.lgBusy) {
              this.settings.counter && this.updateCurrentCounter(e);
              var l = this.getSlideItem(e),
                a = this.getSlideItem(o),
                d = this.galleryItems[e],
                c = d.__slideVideoInfo;
              if (
                (this.outer.attr("data-lg-slide-type", this.getSlideType(d)),
                this.setDownloadValue(e),
                c)
              ) {
                var p = this.mediaContainerPosition,
                  u = p.top,
                  h = p.bottom,
                  g = Te(
                    this.items[e],
                    this.outer,
                    u + h,
                    c && this.settings.videoMaxSize
                  );
                this.resizeVideoSlide(e, g);
              }
              if (
                (this.LGel.trigger(qe, {
                  prevIndex: o,
                  index: e,
                  fromTouch: !!t,
                  fromThumb: !!i,
                }),
                (this.lgBusy = !0),
                clearTimeout(this.hideBarTimeout),
                this.arrowDisable(e),
                s || (e < o ? (s = "prev") : e > o && (s = "next")),
                t)
              ) {
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-prev-slide lg-current lg-next-slide");
                var f = void 0,
                  m = void 0;
                r > 2
                  ? ((f = e - 1),
                    (m = e + 1),
                    ((0 === e && o === r - 1) || (e === r - 1 && 0 === o)) &&
                      ((m = 0), (f = r - 1)))
                  : ((f = 0), (m = 1)),
                  "prev" === s
                    ? this.getSlideItem(m).addClass("lg-next-slide")
                    : this.getSlideItem(f).addClass("lg-prev-slide"),
                  l.addClass("lg-current");
              } else this.makeSlideAnimation(s, l, a);
              this.lGalleryOn
                ? setTimeout(function () {
                    n.loadContent(e, !0),
                      ".lg-item" !== n.settings.appendSubHtmlTo && n.addHtml(e);
                  }, this.settings.speed +
                    50 +
                    (t ? 0 : this.settings.slideDelay))
                : this.loadContent(e, !0),
                setTimeout(function () {
                  (n.lgBusy = !1),
                    a.removeClass("lg-slide-progress"),
                    n.LGel.trigger(We, {
                      prevIndex: o,
                      index: e,
                      fromTouch: t,
                      fromThumb: i,
                    });
                }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                  (t ? 0 : this.settings.slideDelay));
            }
            this.index = e;
          }
        }),
        (e.prototype.updateCurrentCounter = function (e) {
          this.getElementById("lg-counter-current").html(e + 1 + "");
        }),
        (e.prototype.updateCounterTotal = function () {
          this.getElementById("lg-counter-all").html(
            this.galleryItems.length + ""
          );
        }),
        (e.prototype.getSlideType = function (e) {
          return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
        }),
        (e.prototype.touchMove = function (e, t, i) {
          var s = t.pageX - e.pageX,
            n = t.pageY - e.pageY,
            o = !1;
          if (
            (this.swipeDirection
              ? (o = !0)
              : Math.abs(s) > 15
              ? ((this.swipeDirection = "horizontal"), (o = !0))
              : Math.abs(n) > 15 &&
                ((this.swipeDirection = "vertical"), (o = !0)),
            o)
          ) {
            var r = this.getSlideItem(this.index);
            if ("horizontal" === this.swipeDirection) {
              null == i || i.preventDefault(),
                this.outer.addClass("lg-dragging"),
                this.setTranslate(r, s, 0);
              var l = r.get().offsetWidth,
                a = (15 * l) / 100 - Math.abs((10 * s) / 100);
              this.setTranslate(
                this.outer.find(".lg-prev-slide").first(),
                -l + s - a,
                0
              ),
                this.setTranslate(
                  this.outer.find(".lg-next-slide").first(),
                  l + s + a,
                  0
                );
            } else if (
              "vertical" === this.swipeDirection &&
              this.settings.swipeToClose
            ) {
              null == i || i.preventDefault(),
                this.$container.addClass("lg-dragging-vertical");
              var d = 1 - Math.abs(n) / window.innerHeight;
              this.$backdrop.css("opacity", d);
              var c = 1 - Math.abs(n) / (2 * window.innerWidth);
              this.setTranslate(r, 0, n, c, c),
                Math.abs(n) > 100 &&
                  this.outer
                    .addClass("lg-hide-items")
                    .removeClass("lg-components-open");
            }
          }
        }),
        (e.prototype.touchEnd = function (e, t, i) {
          var s,
            n = this;
          "lg-slide" !== this.settings.mode && this.outer.addClass("lg-slide"),
            setTimeout(function () {
              n.$container.removeClass("lg-dragging-vertical"),
                n.outer
                  .removeClass("lg-dragging lg-hide-items")
                  .addClass("lg-components-open");
              var o = !0;
              if ("horizontal" === n.swipeDirection) {
                s = e.pageX - t.pageX;
                var r = Math.abs(e.pageX - t.pageX);
                s < 0 && r > n.settings.swipeThreshold
                  ? (n.goToNextSlide(!0), (o = !1))
                  : s > 0 &&
                    r > n.settings.swipeThreshold &&
                    (n.goToPrevSlide(!0), (o = !1));
              } else if ("vertical" === n.swipeDirection) {
                if (
                  ((s = Math.abs(e.pageY - t.pageY)),
                  n.settings.closable && n.settings.swipeToClose && s > 100)
                )
                  return void n.closeGallery();
                n.$backdrop.css("opacity", 1);
              }
              if (
                (n.outer.find(".lg-item").removeAttr("style"),
                o && Math.abs(e.pageX - t.pageX) < 5)
              ) {
                var l = be(i.target);
                n.isPosterElement(l) && n.LGel.trigger(Ve);
              }
              n.swipeDirection = void 0;
            }),
            setTimeout(function () {
              n.outer.hasClass("lg-dragging") ||
                "lg-slide" === n.settings.mode ||
                n.outer.removeClass("lg-slide");
            }, this.settings.speed + 100);
        }),
        (e.prototype.enableSwipe = function () {
          var e = this,
            t = {},
            i = {},
            s = !1,
            n = !1;
          this.settings.enableSwipe &&
            (this.$inner.on("touchstart.lg", function (i) {
              e.dragOrSwipeEnabled = !0;
              var s = e.getSlideItem(e.index);
              (!be(i.target).hasClass("lg-item") &&
                !s.get().contains(i.target)) ||
                e.outer.hasClass("lg-zoomed") ||
                e.lgBusy ||
                1 !== i.targetTouches.length ||
                ((n = !0),
                (e.touchAction = "swipe"),
                e.manageSwipeClass(),
                (t = {
                  pageX: i.targetTouches[0].pageX,
                  pageY: i.targetTouches[0].pageY,
                }));
            }),
            this.$inner.on("touchmove.lg", function (o) {
              n &&
                "swipe" === e.touchAction &&
                1 === o.targetTouches.length &&
                ((i = {
                  pageX: o.targetTouches[0].pageX,
                  pageY: o.targetTouches[0].pageY,
                }),
                e.touchMove(t, i, o),
                (s = !0));
            }),
            this.$inner.on("touchend.lg", function (o) {
              if ("swipe" === e.touchAction) {
                if (s) (s = !1), e.touchEnd(i, t, o);
                else if (n) {
                  var r = be(o.target);
                  e.isPosterElement(r) && e.LGel.trigger(Ve);
                }
                (e.touchAction = void 0), (n = !1);
              }
            }));
        }),
        (e.prototype.enableDrag = function () {
          var e = this,
            t = {},
            i = {},
            s = !1,
            n = !1;
          this.settings.enableDrag &&
            (this.outer.on("mousedown.lg", function (i) {
              e.dragOrSwipeEnabled = !0;
              var n = e.getSlideItem(e.index);
              (be(i.target).hasClass("lg-item") ||
                n.get().contains(i.target)) &&
                (e.outer.hasClass("lg-zoomed") ||
                  e.lgBusy ||
                  (i.preventDefault(),
                  e.lgBusy ||
                    (e.manageSwipeClass(),
                    (t = { pageX: i.pageX, pageY: i.pageY }),
                    (s = !0),
                    (e.outer.get().scrollLeft += 1),
                    (e.outer.get().scrollLeft -= 1),
                    e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                    e.LGel.trigger(Re))));
            }),
            be(window).on("mousemove.lg.global" + this.lgId, function (o) {
              s &&
                e.lgOpened &&
                ((n = !0),
                (i = { pageX: o.pageX, pageY: o.pageY }),
                e.touchMove(t, i),
                e.LGel.trigger(Xe));
            }),
            be(window).on("mouseup.lg.global" + this.lgId, function (o) {
              if (e.lgOpened) {
                var r = be(o.target);
                n
                  ? ((n = !1), e.touchEnd(i, t, o), e.LGel.trigger(Ye))
                  : e.isPosterElement(r) && e.LGel.trigger(Ve),
                  s &&
                    ((s = !1),
                    e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
              }
            }));
        }),
        (e.prototype.triggerPosterClick = function () {
          var e = this;
          this.$inner.on("click.lg", function (t) {
            !e.dragOrSwipeEnabled &&
              e.isPosterElement(be(t.target)) &&
              e.LGel.trigger(Ve);
          });
        }),
        (e.prototype.manageSwipeClass = function () {
          var e = this.index + 1,
            t = this.index - 1;
          this.settings.loop &&
            this.galleryItems.length > 2 &&
            (0 === this.index
              ? (t = this.galleryItems.length - 1)
              : this.index === this.galleryItems.length - 1 && (e = 0)),
            this.outer
              .find(".lg-item")
              .removeClass("lg-next-slide lg-prev-slide"),
            t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
            this.getSlideItem(e).addClass("lg-next-slide");
        }),
        (e.prototype.goToNextSlide = function (e) {
          var t = this,
            i = this.settings.loop;
          e && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index + 1 < this.galleryItems.length
                ? (this.index++,
                  this.LGel.trigger(Ue, { index: this.index }),
                  this.slide(this.index, !!e, !1, "next"))
                : i
                ? ((this.index = 0),
                  this.LGel.trigger(Ue, { index: this.index }),
                  this.slide(this.index, !!e, !1, "next"))
                : this.settings.slideEndAnimation &&
                  !e &&
                  (this.outer.addClass("lg-right-end"),
                  setTimeout(function () {
                    t.outer.removeClass("lg-right-end");
                  }, 400)));
        }),
        (e.prototype.goToPrevSlide = function (e) {
          var t = this,
            i = this.settings.loop;
          e && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index > 0
                ? (this.index--,
                  this.LGel.trigger(Ke, { index: this.index, fromTouch: e }),
                  this.slide(this.index, !!e, !1, "prev"))
                : i
                ? ((this.index = this.galleryItems.length - 1),
                  this.LGel.trigger(Ke, { index: this.index, fromTouch: e }),
                  this.slide(this.index, !!e, !1, "prev"))
                : this.settings.slideEndAnimation &&
                  !e &&
                  (this.outer.addClass("lg-left-end"),
                  setTimeout(function () {
                    t.outer.removeClass("lg-left-end");
                  }, 400)));
        }),
        (e.prototype.keyPress = function () {
          var e = this;
          be(window).on("keydown.lg.global" + this.lgId, function (t) {
            e.lgOpened &&
              !0 === e.settings.escKey &&
              27 === t.keyCode &&
              (t.preventDefault(),
              e.settings.allowMediaOverlap &&
              e.outer.hasClass("lg-can-toggle") &&
              e.outer.hasClass("lg-components-open")
                ? e.outer.removeClass("lg-components-open")
                : e.closeGallery()),
              e.lgOpened &&
                e.galleryItems.length > 1 &&
                (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()),
                39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()));
          });
        }),
        (e.prototype.arrow = function () {
          var e = this;
          this.getElementById("lg-prev").on("click.lg", function () {
            e.goToPrevSlide();
          }),
            this.getElementById("lg-next").on("click.lg", function () {
              e.goToNextSlide();
            });
        }),
        (e.prototype.arrowDisable = function (e) {
          if (!this.settings.loop && this.settings.hideControlOnEnd) {
            var t = this.getElementById("lg-prev"),
              i = this.getElementById("lg-next");
            e + 1 === this.galleryItems.length
              ? i.attr("disabled", "disabled").addClass("disabled")
              : i.removeAttr("disabled").removeClass("disabled"),
              0 === e
                ? t.attr("disabled", "disabled").addClass("disabled")
                : t.removeAttr("disabled").removeClass("disabled");
          }
        }),
        (e.prototype.setTranslate = function (e, t, i, s, n) {
          void 0 === s && (s = 1),
            void 0 === n && (n = 1),
            e.css(
              "transform",
              "translate3d(" +
                t +
                "px, " +
                i +
                "px, 0px) scale3d(" +
                s +
                ", " +
                n +
                ", 1)"
            );
        }),
        (e.prototype.mousewheel = function () {
          var e = this,
            t = 0;
          this.outer.on("wheel.lg", function (i) {
            if (i.deltaY && !(e.galleryItems.length < 2)) {
              i.preventDefault();
              var s = new Date().getTime();
              s - t < 1e3 ||
                ((t = s),
                i.deltaY > 0
                  ? e.goToNextSlide()
                  : i.deltaY < 0 && e.goToPrevSlide());
            }
          });
        }),
        (e.prototype.isSlideElement = function (e) {
          return (
            e.hasClass("lg-outer") ||
            e.hasClass("lg-item") ||
            e.hasClass("lg-img-wrap")
          );
        }),
        (e.prototype.isPosterElement = function (e) {
          var t = this.getSlideItem(this.index)
            .find(".lg-video-play-button")
            .get();
          return (
            e.hasClass("lg-video-poster") ||
            e.hasClass("lg-video-play-button") ||
            (t && t.contains(e.get()))
          );
        }),
        (e.prototype.toggleMaximize = function () {
          var e = this;
          this.getElementById("lg-maximize").on("click.lg", function () {
            e.$container.toggleClass("lg-inline"), e.refreshOnResize();
          });
        }),
        (e.prototype.invalidateItems = function () {
          for (var e = 0; e < this.items.length; e++) {
            var t = be(this.items[e]);
            t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
          }
        }),
        (e.prototype.manageCloseGallery = function () {
          var e = this;
          if (this.settings.closable) {
            var t = !1;
            this.getElementById("lg-close").on("click.lg", function () {
              e.closeGallery();
            }),
              this.settings.closeOnTap &&
                (this.outer.on("mousedown.lg", function (i) {
                  var s = be(i.target);
                  t = !!e.isSlideElement(s);
                }),
                this.outer.on("mousemove.lg", function () {
                  t = !1;
                }),
                this.outer.on("mouseup.lg", function (i) {
                  var s = be(i.target);
                  e.isSlideElement(s) &&
                    t &&
                    (e.outer.hasClass("lg-dragging") || e.closeGallery());
                }));
          }
        }),
        (e.prototype.closeGallery = function (e) {
          var t = this;
          if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
          this.LGel.trigger(Qe), be(window).scrollTop(this.prevScrollTop);
          var i,
            s = this.items[this.index];
          if (this.zoomFromOrigin && s) {
            var n = this.mediaContainerPosition,
              o = n.top,
              r = n.bottom,
              l = this.galleryItems[this.index],
              a = l.__slideVideoInfo,
              d = l.poster,
              c = Te(
                s,
                this.outer,
                o + r,
                a && d && this.settings.videoMaxSize
              );
            i = xe(s, this.outer, o, r, c);
          }
          this.zoomFromOrigin && i
            ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
              this.getSlideItem(this.index)
                .addClass("lg-start-end-progress")
                .css(
                  "transition-duration",
                  this.settings.startAnimationDuration + "ms"
                )
                .css("transform", i))
            : (this.outer.addClass("lg-hide-items"),
              this.outer.removeClass("lg-zoom-from-image")),
            this.destroyModules(),
            (this.lGalleryOn = !1),
            (this.isDummyImageRemoved = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            clearTimeout(this.hideBarTimeout),
            (this.hideBarTimeout = !1),
            be("html").removeClass("lg-on"),
            this.outer.removeClass("lg-visible lg-components-open"),
            this.$backdrop.removeClass("in").css("opacity", 0);
          var p =
            this.zoomFromOrigin && i
              ? Math.max(
                  this.settings.startAnimationDuration,
                  this.settings.backdropDuration
                )
              : this.settings.backdropDuration;
          return (
            this.$container.removeClass("lg-show-in"),
            setTimeout(function () {
              t.zoomFromOrigin &&
                i &&
                t.outer.removeClass("lg-zoom-from-image"),
                t.$container.removeClass("lg-show"),
                t.$backdrop
                  .removeAttr("style")
                  .css(
                    "transition-duration",
                    t.settings.backdropDuration + "ms"
                  ),
                t.outer.removeClass("lg-closing " + t.settings.startClass),
                t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
                t.$inner.empty(),
                t.lgOpened && t.LGel.trigger(Ze, { instance: t }),
                t.outer.get() && t.outer.get().blur(),
                (t.lgOpened = !1);
            }, p + 100),
            p + 100
          );
        }),
        (e.prototype.initModules = function () {
          this.plugins.forEach(function (e) {
            try {
              e.init();
            } catch (e) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly initiated"
              );
            }
          });
        }),
        (e.prototype.destroyModules = function (e) {
          this.plugins.forEach(function (t) {
            try {
              e ? t.destroy() : t.closeGallery && t.closeGallery();
            } catch (e) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly destroyed"
              );
            }
          });
        }),
        (e.prototype.refresh = function (e) {
          this.settings.dynamic || this.invalidateItems(),
            (this.galleryItems = e || this.getItems()),
            this.updateControls(),
            this.openGalleryOnItemClick(),
            this.LGel.trigger(Be);
        }),
        (e.prototype.updateControls = function () {
          this.addSlideVideoInfo(this.galleryItems),
            this.updateCounterTotal(),
            this.manageSingleSlideClassName();
        }),
        (e.prototype.destroy = function () {
          var e = this,
            t = this.closeGallery(!0);
          return (
            setTimeout(function () {
              e.destroyModules(!0),
                e.settings.dynamic || e.invalidateItems(),
                be(window).off(".lg.global" + e.lgId),
                e.LGel.off(".lg"),
                e.$container.remove();
            }, t),
            t
          );
        }),
        e
      );
    })();
  const tt = function (e, t) {
      return new et(e, t);
    },
    it = document.querySelectorAll("[data-gallery]");
  it.length &&
    it.forEach((e) => {
      tt(e, { licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E", speed: 500 });
    }),
    (function () {
      let e = document.querySelectorAll(".ibg");
      for (var t = 0; t < e.length; t++)
        e[t].querySelector("img") &&
          (e[t].style.backgroundImage =
            "url(" + e[t].querySelector("img").getAttribute("src") + ")");
    })(),
    (window.onload = function () {
      document.addEventListener("click", function (e) {
        const i = e.target;
        window.innerWidth > 768 &&
          t.any() &&
          (i.classList.contains("menu__arrow") &&
            i.closest(".menu__item").classList.toggle("_hover"),
          !i.closest(".menu__item") &&
            document.querySelectorAll(".menu__item._hover").length > 0 &&
            (function (e, t) {
              for (var i = 0; i < e.length; i++) e[i].classList.remove(t);
            })(document.querySelectorAll(".menu__item._hover"), "_hover"));
        i.classList.contains("search-form__icon")
          ? document.querySelector(".search-form").classList.toggle("_active")
          : !i.closest(".search-form") &&
            document.querySelector(".search-form._active") &&
            document.querySelector(".search-form").classList.remove("_active");
      });
      const e = document.querySelector(".header");
      new IntersectionObserver(function (t, i) {
        t[0].isIntersecting
          ? e.classList.remove("_scroll")
          : e.classList.add("_scroll");
      }).observe(e);
    }),
    $(document).ready(function () {
      $(".slider").slick({
        prevArrow: ".slider-arrow_prev",
        nextArrow: ".slider-arrow_next",
        dots: !0,
        speed: 800,
        verticalSwiping: 0,
        customPaging: 32,
        lazyLoad: !0,
        infinite: !0,
        slidesToShow: 1,
        variableWidth: !0,
        autoplay: !0,
        autoplaySpeed: 2e3,
        swipeToSlide: !0,
        appendDots: ".controls-slider-main__dotts",
        customPaging: function (e, t) {
          $(e.$slides[t]).data();
          return "<button></button>";
        },
        breakpoint: 992,
        settings: {},
      });
    }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          n &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? o(e) : r(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, i) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length > 0 && o(t);
        const n = Array.from(e).filter(function (e, t, i) {
          return e.dataset.spollers.split(",")[0];
        });
        if (n.length > 0) {
          const e = [];
          n.forEach((t) => {
            const i = {},
              s = t.dataset.spollers.split(",");
            (i.value = s[0]),
              (i.type = s[1] ? s[1].trim() : "max"),
              (i.item = t),
              e.push(i);
          });
          let t = e.map(function (e) {
            return (
              "(" +
              e.type +
              "-width: " +
              e.value +
              "px)," +
              e.value +
              "," +
              e.type
            );
          });
          (t = t.filter(function (e, t, i) {
            return i.indexOf(e) === t;
          })),
            t.forEach((t) => {
              const i = t.split(","),
                s = i[1],
                n = i[2],
                r = window.matchMedia(i[0]),
                l = e.filter(function (e) {
                  if (e.value === s && e.type === n) return !0;
                });
              r.addEventListener("change", function () {
                o(l, r);
              }),
                o(l, r);
            });
        }
        function o(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  r(e),
                  e.addEventListener("click", l))
                : (e.classList.remove("_spoller-init"),
                  r(e, !1),
                  e.removeEventListener("click", l));
          });
        }
        function r(e, t = !0) {
          const i = e.querySelectorAll("[data-spoller]");
          i.length > 0 &&
            i.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            });
        }
        function l(e) {
          const t = e.target;
          if (t.hasAttribute("data-spoller") || t.closest("[data-spoller]")) {
            const n = t.hasAttribute("data-spoller")
                ? t
                : t.closest("[data-spoller]"),
              o = n.closest("[data-spollers]"),
              r = !!o.hasAttribute("data-one-spoller");
            o.querySelectorAll("._slide").length ||
              (r && !n.classList.contains("_spoller-active") && a(o),
              n.classList.toggle("_spoller-active"),
              ((e, t = 500) => {
                e.hidden ? s(e, t) : i(e, t);
              })(n.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function a(e) {
          const t = e.querySelector("[data-spoller]._spoller-active");
          t &&
            (t.classList.remove("_spoller-active"),
            i(t.nextElementSibling, 500));
        }
      }
    })(),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            c.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && c.validateInput(t));
        });
    })(),
    (function (e) {
      const t = document.forms;
      if (t.length)
        for (const e of t)
          e.addEventListener("submit", function (e) {
            i(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              c.formClean(t);
            });
      async function i(t, i) {
        if (0 === (e ? c.getErrors(t) : 0)) {
          if (t.hasAttribute("data-ajax")) {
            i.preventDefault();
            const e = t.getAttribute("action")
                ? t.getAttribute("action").trim()
                : "#",
              n = t.getAttribute("method")
                ? t.getAttribute("method").trim()
                : "GET",
              o = new FormData(t);
            t.classList.add("_sending");
            const r = await fetch(e, { method: n, body: o });
            if (r.ok) {
              await r.json();
              t.classList.remove("_sending"), s(t);
            } else alert("Ошибка"), t.classList.remove("_sending");
          } else t.hasAttribute("data-dev") && (i.preventDefault(), s(t));
        } else {
          i.preventDefault();
          const e = t.querySelector("._form-error");
          e && t.hasAttribute("data-goto-error") && a(e, !0, 1e3);
        }
      }
      function s(e) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: e } })
        ),
          c.formClean(e),
          l(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0);
})();
