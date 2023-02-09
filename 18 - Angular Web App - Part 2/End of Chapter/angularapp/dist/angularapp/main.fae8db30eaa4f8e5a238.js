;(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb")
    },
    zUnb: function (t, e, n) {
      "use strict"
      function r(t) {
        return "function" == typeof t
      }
      n.r(e)
      let s = !1
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error()
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack,
            )
          } else
            s &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3",
              )
          s = t
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s
        },
      }
      function o(t) {
        setTimeout(() => {
          throw t
        }, 0)
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (i.useDeprecatedSynchronousErrorHandling) throw t
            o(t)
          },
          complete() {},
        },
        l = (() => Array.isArray || (t => t && "number" == typeof t.length))()
      function u(t) {
        return null !== t && "object" == typeof t
      }
      const c = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          )
        }
        return (t.prototype = Object.create(Error.prototype)), t
      })()
      let h = (() => {
        class t {
          constructor(t) {
            ;(this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t))
          }
          unsubscribe() {
            let e
            if (this.closed) return
            let {
              _parentOrParents: n,
              _ctorUnsubscribe: s,
              _unsubscribe: i,
              _subscriptions: o,
            } = this
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this)
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this)
            if (r(i)) {
              s && (this._unsubscribe = void 0)
              try {
                i.call(this)
              } catch (a) {
                e = a instanceof c ? d(a.errors) : [a]
              }
            }
            if (l(o)) {
              let t = -1,
                n = o.length
              for (; ++t < n; ) {
                const n = o[t]
                if (u(n))
                  try {
                    n.unsubscribe()
                  } catch (a) {
                    ;(e = e || []),
                      a instanceof c ? (e = e.concat(d(a.errors))) : e.push(a)
                  }
              }
            }
            if (e) throw new c(e)
          }
          add(e) {
            let n = e
            if (!e) return t.EMPTY
            switch (typeof e) {
              case "function":
                n = new t(e)
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n
                if (this.closed) return n.unsubscribe(), n
                if (!(n instanceof t)) {
                  const e = n
                  ;(n = new t()), (n._subscriptions = [e])
                }
                break
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription.",
                )
            }
            let { _parentOrParents: r } = n
            if (null === r) n._parentOrParents = this
            else if (r instanceof t) {
              if (r === this) return n
              n._parentOrParents = [r, this]
            } else {
              if (-1 !== r.indexOf(this)) return n
              r.push(this)
            }
            const s = this._subscriptions
            return null === s ? (this._subscriptions = [n]) : s.push(n), n
          }
          remove(t) {
            const e = this._subscriptions
            if (e) {
              const n = e.indexOf(t)
              ;-1 !== n && e.splice(n, 1)
            }
          }
        }
        return (
          (t.EMPTY = (function (t) {
            return (t.closed = !0), t
          })(new t())),
          t
        )
      })()
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof c ? e.errors : e), [])
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())()
      class f extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a
              break
            case 1:
              if (!t) {
                this.destination = a
                break
              }
              if ("object" == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, t)))
                break
              }
            default:
              ;(this.syncErrorThrowable = !0),
                (this.destination = new g(this, t, e, n))
          }
        }
        [p]() {
          return this
        }
        static create(t, e, n) {
          const r = new f(t, e, n)
          return (r.syncErrorThrowable = !1), r
        }
        next(t) {
          this.isStopped || this._next(t)
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t))
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete())
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe())
        }
        _next(t) {
          this.destination.next(t)
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe()
        }
        _complete() {
          this.destination.complete(), this.unsubscribe()
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          )
        }
      }
      class g extends f {
        constructor(t, e, n, s) {
          let i
          super(), (this._parentSubscriber = t)
          let o = this
          r(e)
            ? (i = e)
            : e &&
              ((i = e.next),
              (n = e.error),
              (s = e.complete),
              e !== a &&
                ((o = Object.create(e)),
                r(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = s)
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this
            i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t)
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe())
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t),
                this.unsubscribe()
            else {
              if ((this.unsubscribe(), n)) throw t
              o(t)
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this
            if (this._complete) {
              const e = () => this._complete.call(this._context)
              i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe())
            } else this.unsubscribe()
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e)
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling))
              throw n
            o(n)
          }
        }
        __tryOrSetError(t, e, n) {
          if (!i.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call")
          try {
            e.call(this._context, n)
          } catch (r) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (o(r), !0)
          }
          return !1
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this
          ;(this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe()
        }
      }
      const m = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")()
      function y(t) {
        return t
      }
      let _ = (() => {
        class t {
          constructor(t) {
            ;(this._isScalar = !1), t && (this._subscribe = t)
          }
          lift(e) {
            const n = new t()
            return (n.source = this), (n.operator = e), n
          }
          subscribe(t, e, n) {
            const { operator: r } = this,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof f) return t
                  if (t[p]) return t[p]()
                }
                return t || e || n ? new f(t, e, n) : new f(a)
              })(t, e, n)
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source ||
                    (i.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s),
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue
            return s
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t)
            } catch (e) {
              i.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t
                    if (e || r) return !1
                    t = n && n instanceof f ? n : null
                  }
                  return !0
                })(t)
                  ? t.error(e)
                  : console.warn(e)
            }
          }
          forEach(t, e) {
            return new (e = v(e))((e, n) => {
              let r
              r = this.subscribe(
                e => {
                  try {
                    t(e)
                  } catch (s) {
                    n(s), r && r.unsubscribe()
                  }
                },
                n,
                e,
              )
            })
          }
          _subscribe(t) {
            const { source: e } = this
            return e && e.subscribe(t)
          }
          [m]() {
            return this
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? y
                  : 1 === e.length
                  ? e[0]
                  : function (t) {
                      return e.reduce((t, e) => e(t), t)
                    })(this)
            var e
          }
          toPromise(t) {
            return new (t = v(t))((t, e) => {
              let n
              this.subscribe(
                t => (n = t),
                t => e(t),
                () => t(n),
              )
            })
          }
        }
        return (t.create = e => new t(e)), t
      })()
      function v(t) {
        if ((t || (t = i.Promise || Promise), !t))
          throw new Error("no Promise impl found")
        return t
      }
      const w = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          )
        }
        return (t.prototype = Object.create(Error.prototype)), t
      })()
      class b extends h {
        constructor(t, e) {
          super(), (this.subject = t), (this.subscriber = e), (this.closed = !1)
        }
        unsubscribe() {
          if (this.closed) return
          this.closed = !0
          const t = this.subject,
            e = t.observers
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return
          const n = e.indexOf(this.subscriber)
          ;-1 !== n && e.splice(n, 1)
        }
      }
      class C extends f {
        constructor(t) {
          super(t), (this.destination = t)
        }
      }
      let S = (() => {
        class t extends _ {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null)
          }
          [p]() {
            return new C(this)
          }
          lift(t) {
            const e = new x(this, this)
            return (e.operator = t), e
          }
          next(t) {
            if (this.closed) throw new w()
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice()
              for (let s = 0; s < n; s++) r[s].next(t)
            }
          }
          error(t) {
            if (this.closed) throw new w()
            ;(this.hasError = !0), (this.thrownError = t), (this.isStopped = !0)
            const { observers: e } = this,
              n = e.length,
              r = e.slice()
            for (let s = 0; s < n; s++) r[s].error(t)
            this.observers.length = 0
          }
          complete() {
            if (this.closed) throw new w()
            this.isStopped = !0
            const { observers: t } = this,
              e = t.length,
              n = t.slice()
            for (let r = 0; r < e; r++) n[r].complete()
            this.observers.length = 0
          }
          unsubscribe() {
            ;(this.isStopped = !0), (this.closed = !0), (this.observers = null)
          }
          _trySubscribe(t) {
            if (this.closed) throw new w()
            return super._trySubscribe(t)
          }
          _subscribe(t) {
            if (this.closed) throw new w()
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new b(this, t))
          }
          asObservable() {
            const t = new _()
            return (t.source = this), t
          }
        }
        return (t.create = (t, e) => new x(t, e)), t
      })()
      class x extends S {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e)
        }
        next(t) {
          const { destination: e } = this
          e && e.next && e.next(t)
        }
        error(t) {
          const { destination: e } = this
          e && e.error && this.destination.error(t)
        }
        complete() {
          const { destination: t } = this
          t && t.complete && this.destination.complete()
        }
        _subscribe(t) {
          const { source: e } = this
          return e ? this.source.subscribe(t) : h.EMPTY
        }
      }
      function E(t) {
        return t && "function" == typeof t.schedule
      }
      function T(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?",
            )
          return n.lift(new A(t, e))
        }
      }
      class A {
        constructor(t, e) {
          ;(this.project = t), (this.thisArg = e)
        }
        call(t, e) {
          return e.subscribe(new k(t, this.project, this.thisArg))
        }
      }
      class k extends f {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this)
        }
        _next(t) {
          let e
          try {
            e = this.project.call(this.thisArg, t, this.count++)
          } catch (n) {
            return void this.destination.error(n)
          }
          this.destination.next(e)
        }
      }
      const O = t => e => {
        for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n])
        e.complete()
      }
      function R() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator"
      }
      const P = R(),
        I = t => t && "number" == typeof t.length && "function" != typeof t
      function V(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        )
      }
      const j = t => {
        if (t && "function" == typeof t[m])
          return (
            (r = t),
            t => {
              const e = r[m]()
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable",
                )
              return e.subscribe(t)
            }
          )
        if (I(t)) return O(t)
        if (V(t))
          return (
            (n = t),
            t => (
              n
                .then(
                  e => {
                    t.closed || (t.next(e), t.complete())
                  },
                  e => t.error(e),
                )
                .then(null, o),
              t
            )
          )
        if (t && "function" == typeof t[P])
          return (
            (e = t),
            t => {
              const n = e[P]()
              for (;;) {
                let e
                try {
                  e = n.next()
                } catch (r) {
                  return t.error(r), t
                }
                if (e.done) {
                  t.complete()
                  break
                }
                if ((t.next(e.value), t.closed)) break
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return()
                  }),
                t
              )
            }
          )
        {
          const e = u(t) ? "an invalid object" : `'${t}'`
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`,
          )
        }
        var e, n, r
      }
      function D(t, e) {
        return new _(n => {
          const r = new h()
          let s = 0
          return (
            r.add(
              e.schedule(function () {
                s !== t.length
                  ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                  : n.complete()
              }),
            ),
            r
          )
        })
      }
      function N(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[m]
                  })(t)
                )
                  return (function (t, e) {
                    return new _(n => {
                      const r = new h()
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[m]()
                            r.add(
                              s.subscribe({
                                next(t) {
                                  r.add(e.schedule(() => n.next(t)))
                                },
                                error(t) {
                                  r.add(e.schedule(() => n.error(t)))
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()))
                                },
                              }),
                            )
                          }),
                        ),
                        r
                      )
                    })
                  })(t, e)
                if (V(t))
                  return (function (t, e) {
                    return new _(n => {
                      const r = new h()
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              t => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      r.add(e.schedule(() => n.complete()))
                                  }),
                                )
                              },
                              t => {
                                r.add(e.schedule(() => n.error(t)))
                              },
                            ),
                          ),
                        ),
                        r
                      )
                    })
                  })(t, e)
                if (I(t)) return D(t, e)
                if (
                  (function (t) {
                    return t && "function" == typeof t[P]
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null")
                    return new _(n => {
                      const r = new h()
                      let s
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return()
                        }),
                        r.add(
                          e.schedule(() => {
                            ;(s = t[P]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return
                                  let t, e
                                  try {
                                    const n = s.next()
                                    ;(t = n.value), (e = n.done)
                                  } catch (r) {
                                    return void n.error(r)
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule())
                                }),
                              )
                          }),
                        ),
                        r
                      )
                    })
                  })(t, e)
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable",
              )
            })(t, e)
          : t instanceof _
          ? t
          : new _(j(t))
      }
      class U extends f {
        constructor(t) {
          super(), (this.parent = t)
        }
        _next(t) {
          this.parent.notifyNext(t)
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe()
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe()
        }
      }
      class M extends f {
        notifyNext(t) {
          this.destination.next(t)
        }
        notifyError(t) {
          this.destination.error(t)
        }
        notifyComplete() {
          this.destination.complete()
        }
      }
      function F(t, e) {
        if (!e.closed) return t instanceof _ ? t.subscribe(e) : j(t)(e)
      }
      function H(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? r =>
              r.pipe(
                H((n, r) => N(t(n, r)).pipe(T((t, s) => e(n, t, r, s))), n),
              )
          : ("number" == typeof e && (n = e), e => e.lift(new L(t, n)))
      }
      class L {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          ;(this.project = t), (this.concurrent = e)
        }
        call(t, e) {
          return e.subscribe(new $(t, this.project, this.concurrent))
        }
      }
      class $ extends M {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0)
        }
        _next(t) {
          this.active < this.concurrent ? this._tryNext(t) : this.buffer.push(t)
        }
        _tryNext(t) {
          let e
          const n = this.index++
          try {
            e = this.project(t, n)
          } catch (r) {
            return void this.destination.error(r)
          }
          this.active++, this._innerSub(e)
        }
        _innerSub(t) {
          const e = new U(this),
            n = this.destination
          n.add(e)
          const r = F(t, e)
          r !== e && n.add(r)
        }
        _complete() {
          ;(this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe()
        }
        notifyNext(t) {
          this.destination.next(t)
        }
        notifyComplete() {
          const t = this.buffer
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete()
        }
      }
      function z(t = Number.POSITIVE_INFINITY) {
        return H(y, t)
      }
      function B(t, e) {
        return e ? D(t, e) : new _(O(t))
      }
      function q() {
        return function (t) {
          return t.lift(new W(t))
        }
      }
      class W {
        constructor(t) {
          this.connectable = t
        }
        call(t, e) {
          const { connectable: n } = this
          n._refCount++
          const r = new Z(t, n),
            s = e.subscribe(r)
          return r.closed || (r.connection = n.connect()), s
        }
      }
      class Z extends f {
        constructor(t, e) {
          super(t), (this.connectable = e)
        }
        _unsubscribe() {
          const { connectable: t } = this
          if (!t) return void (this.connection = null)
          this.connectable = null
          const e = t._refCount
          if (e <= 0) return void (this.connection = null)
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null)
          const { connection: n } = this,
            r = t._connection
          ;(this.connection = null), !r || (n && r !== n) || r.unsubscribe()
        }
      }
      class G extends _ {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1)
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t)
        }
        getSubject() {
          const t = this._subject
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          )
        }
        connect() {
          let t = this._connection
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new K(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          )
        }
        refCount() {
          return q()(this)
        }
      }
      const Q = (() => {
        const t = G.prototype
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        }
      })()
      class K extends C {
        constructor(t, e) {
          super(t), (this.connectable = e)
        }
        _error(t) {
          this._unsubscribe(), super._error(t)
        }
        _complete() {
          ;(this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete()
        }
        _unsubscribe() {
          const t = this.connectable
          if (t) {
            this.connectable = null
            const e = t._connection
            ;(t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe()
          }
        }
      }
      function J() {
        return new S()
      }
      function X(t) {
        for (let e in t) if (t[e] === X) return e
        throw Error("Could not find renamed property on target object.")
      }
      function Y(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n])
      }
      function tt(t) {
        if ("string" == typeof t) return t
        if (Array.isArray(t)) return "[" + t.map(tt).join(", ") + "]"
        if (null == t) return "" + t
        if (t.overriddenName) return `${t.overriddenName}`
        if (t.name) return `${t.name}`
        const e = t.toString()
        if (null == e) return "" + e
        const n = e.indexOf("\n")
        return -1 === n ? e : e.substring(0, n)
      }
      function et(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e
      }
      const nt = X({ __forward_ref__: X })
      function rt(t) {
        return (
          (t.__forward_ref__ = rt),
          (t.toString = function () {
            return tt(this())
          }),
          t
        )
      }
      function st(t) {
        return it(t) ? t() : t
      }
      function it(t) {
        return (
          "function" == typeof t &&
          t.hasOwnProperty(nt) &&
          t.__forward_ref__ === rt
        )
      }
      function ot(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        }
      }
      function at(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || [],
        }
      }
      function lt(t) {
        return ut(t, ht) || ut(t, pt)
      }
      function ut(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null
      }
      function ct(t) {
        return t && (t.hasOwnProperty(dt) || t.hasOwnProperty(ft))
          ? t[dt]
          : null
      }
      const ht = X({ "\u0275prov": X }),
        dt = X({ "\u0275inj": X }),
        pt = X({ ngInjectableDef: X }),
        ft = X({ ngInjectorDef: X })
      var gt = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        )
      })({})
      let mt
      function yt(t) {
        const e = mt
        return (mt = t), e
      }
      function _t(t, e, n) {
        const r = lt(t)
        if (r && "root" == r.providedIn)
          return void 0 === r.value ? (r.value = r.factory()) : r.value
        if (n & gt.Optional) return null
        if (void 0 !== e) return e
        throw new Error(`Injector: NOT_FOUND [${tt(t)}]`)
      }
      function vt(t) {
        return { toString: t }.toString()
      }
      var wt = (function (t) {
          return (
            (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t
          )
        })({}),
        bt = (function (t) {
          return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
          )
        })({})
      const Ct = "undefined" != typeof globalThis && globalThis,
        St = "undefined" != typeof window && window,
        xt =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Et = "undefined" != typeof global && global,
        Tt = Ct || Et || St || xt,
        At = {},
        kt = [],
        Ot = X({ "\u0275cmp": X }),
        Rt = X({ "\u0275dir": X }),
        Pt = X({ "\u0275pipe": X }),
        It = X({ "\u0275mod": X }),
        Vt = X({ "\u0275loc": X }),
        jt = X({ "\u0275fac": X }),
        Dt = X({ __NG_ELEMENT_ID__: X })
      let Nt = 0
      function Ut(t) {
        return vt(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === wt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || kt,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || bt.Emulated,
              id: "c",
              styles: t.styles || kt,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            r = t.directives,
            s = t.features,
            i = t.pipes
          return (
            (n.id += Nt++),
            (n.inputs = $t(t.inputs, e)),
            (n.outputs = $t(t.outputs)),
            s && s.forEach(t => t(n)),
            (n.directiveDefs = r
              ? () => ("function" == typeof r ? r() : r).map(Mt)
              : null),
            (n.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Ft)
              : null),
            n
          )
        })
      }
      function Mt(t) {
        return (
          Bt(t) ||
          (function (t) {
            return t[Rt] || null
          })(t)
        )
      }
      function Ft(t) {
        return (function (t) {
          return t[Pt] || null
        })(t)
      }
      const Ht = {}
      function Lt(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || kt,
          declarations: t.declarations || kt,
          imports: t.imports || kt,
          exports: t.exports || kt,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        }
        return (
          null != t.id &&
            vt(() => {
              Ht[t.id] = t.type
            }),
          e
        )
      }
      function $t(t, e) {
        if (null == t) return At
        const n = {}
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              i = s
            Array.isArray(s) && ((i = s[1]), (s = s[0])),
              (n[s] = r),
              e && (e[s] = i)
          }
        return n
      }
      const zt = Ut
      function Bt(t) {
        return t[Ot] || null
      }
      function qt(t, e) {
        const n = t[It] || null
        if (!n && !0 === e)
          throw new Error(`Type ${tt(t)} does not have '\u0275mod' property.`)
        return n
      }
      const Wt = 20,
        Zt = 10
      function Gt(t) {
        return Array.isArray(t) && "object" == typeof t[1]
      }
      function Qt(t) {
        return Array.isArray(t) && !0 === t[1]
      }
      function Kt(t) {
        return 0 != (8 & t.flags)
      }
      function Jt(t) {
        return 2 == (2 & t.flags)
      }
      function Xt(t) {
        return 1 == (1 & t.flags)
      }
      function Yt(t) {
        return null !== t.template
      }
      function te(t, e) {
        return t.hasOwnProperty(jt) ? t[jt] : null
      }
      class ee extends Error {
        constructor(t, e) {
          super(
            (function (t, e) {
              return `${t ? `NG0${t}: ` : ""}${e}`
            })(t, e),
          ),
            (this.code = t)
        }
      }
      function ne(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t)
      }
      function re(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : ne(t)
      }
      function se(t, e) {
        const n = e ? ` in ${e}` : ""
        throw new ee("201", `No provider for ${re(t)} found${n}`)
      }
      class ie {
        constructor(t, e, n) {
          ;(this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n)
        }
        isFirstChange() {
          return this.firstChange
        }
      }
      function oe() {
        return ae
      }
      function ae(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = ue), le
      }
      function le() {
        const t = ce(this),
          e = null == t ? void 0 : t.current
        if (e) {
          const n = t.previous
          if (n === At) t.previous = e
          else for (let t in e) n[t] = e[t]
          ;(t.current = null), this.ngOnChanges(e)
        }
      }
      function ue(t, e, n, r) {
        const s =
            ce(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e)
            })(t, { previous: At, current: null }),
          i = s.current || (s.current = {}),
          o = s.previous,
          a = this.declaredInputs[n],
          l = o[a]
        ;(i[a] = new ie(l && l.currentValue, e, o === At)), (t[r] = e)
      }
      function ce(t) {
        return t.__ngSimpleChanges__ || null
      }
      let he
      function de(t) {
        return !!t.listen
      }
      oe.ngInherit = !0
      const pe = {
        createRenderer: (t, e) =>
          void 0 !== he
            ? he
            : "undefined" != typeof document
            ? document
            : void 0,
      }
      function fe(t) {
        for (; Array.isArray(t); ) t = t[0]
        return t
      }
      function ge(t, e) {
        return fe(e[t])
      }
      function me(t, e) {
        return fe(e[t.index])
      }
      function ye(t, e) {
        return t.data[e]
      }
      function _e(t, e) {
        const n = e[t]
        return Gt(n) ? n : n[0]
      }
      function ve(t) {
        const e = (function (t) {
          return t.__ngContext__ || null
        })(t)
        return e ? (Array.isArray(e) ? e : e.lView) : null
      }
      function we(t) {
        return 128 == (128 & t[2])
      }
      function be(t, e) {
        return null == e ? null : t[e]
      }
      function Ce(t) {
        t[18] = 0
      }
      function Se(t, e) {
        t[5] += e
        let n = t,
          r = t[3]
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3])
      }
      const xe = {
        lFrame: Be(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      }
      function Ee() {
        return xe.bindingsEnabled
      }
      function Te() {
        return xe.lFrame.lView
      }
      function Ae() {
        return xe.lFrame.tView
      }
      function ke(t) {
        xe.lFrame.contextLView = t
      }
      function Oe() {
        let t = Re()
        for (; null !== t && 64 === t.type; ) t = t.parent
        return t
      }
      function Re() {
        return xe.lFrame.currentTNode
      }
      function Pe(t, e) {
        const n = xe.lFrame
        ;(n.currentTNode = t), (n.isParent = e)
      }
      function Ie() {
        return xe.lFrame.isParent
      }
      function Ve() {
        return xe.isInCheckNoChangesMode
      }
      function je(t) {
        xe.isInCheckNoChangesMode = t
      }
      function De() {
        return xe.lFrame.bindingIndex++
      }
      function Ne(t) {
        const e = xe.lFrame,
          n = e.bindingIndex
        return (e.bindingIndex = e.bindingIndex + t), n
      }
      function Ue(t, e) {
        const n = xe.lFrame
        ;(n.bindingIndex = n.bindingRootIndex = t), Me(e)
      }
      function Me(t) {
        xe.lFrame.currentDirectiveIndex = t
      }
      function Fe(t) {
        xe.lFrame.currentQueryIndex = t
      }
      function He(t) {
        const e = t[1]
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null
      }
      function Le(t, e, n) {
        if (n & gt.SkipSelf) {
          let r = e,
            s = t
          for (
            ;
            (r = r.parent),
              !(
                null !== r ||
                n & gt.Host ||
                ((r = He(s)), null === r) ||
                ((s = s[15]), 10 & r.type)
              );

          );
          if (null === r) return !1
          ;(e = r), (t = s)
        }
        const r = (xe.lFrame = ze())
        return (r.currentTNode = e), (r.lView = t), !0
      }
      function $e(t) {
        const e = ze(),
          n = t[1]
        ;(xe.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1)
      }
      function ze() {
        const t = xe.lFrame,
          e = null === t ? null : t.child
        return null === e ? Be(t) : e
      }
      function Be(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        }
        return null !== t && (t.child = e), e
      }
      function qe() {
        const t = xe.lFrame
        return (
          (xe.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        )
      }
      const We = qe
      function Ze() {
        const t = qe()
        ;(t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0)
      }
      function Ge() {
        return xe.lFrame.selectedIndex
      }
      function Qe(t) {
        xe.lFrame.selectedIndex = t
      }
      function Ke(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: r,
              ngAfterContentChecked: s,
              ngAfterViewInit: i,
              ngAfterViewChecked: o,
              ngOnDestroy: a,
            } = e
          r && (t.contentHooks || (t.contentHooks = [])).push(-n, r),
            s &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, s),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, s)),
            i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
            o &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, o),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
            null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a)
        }
      }
      function Je(t, e, n) {
        tn(t, e, 3, n)
      }
      function Xe(t, e, n, r) {
        ;(3 & t[2]) === n && tn(t, e, n, r)
      }
      function Ye(t, e) {
        let n = t[2]
        ;(3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n))
      }
      function tn(t, e, n, r) {
        const s = null != r ? r : -1,
          i = e.length - 1
        let o = 0
        for (let a = void 0 !== r ? 65535 & t[18] : 0; a < i; a++)
          if ("number" == typeof e[a + 1]) {
            if (((o = e[a]), null != r && o >= r)) break
          } else
            e[a] < 0 && (t[18] += 65536),
              (o < s || -1 == s) &&
                (en(t, n, e, a), (t[18] = (4294901760 & t[18]) + a + 2)),
              a++
      }
      function en(t, e, n, r) {
        const s = n[r] < 0,
          i = n[r + 1],
          o = t[s ? -n[r] : n[r]]
        s
          ? t[2] >> 11 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 2048), i.call(o))
          : i.call(o)
      }
      const nn = -1
      class rn {
        constructor(t, e, n) {
          ;(this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n)
        }
      }
      function sn(t, e, n) {
        const r = de(t)
        let s = 0
        for (; s < n.length; ) {
          const i = n[s]
          if ("number" == typeof i) {
            if (0 !== i) break
            s++
            const o = n[s++],
              a = n[s++],
              l = n[s++]
            r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l)
          } else {
            const o = i,
              a = n[++s]
            an(o)
              ? r && t.setProperty(e, o, a)
              : r
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              s++
          }
        }
        return s
      }
      function on(t) {
        return 3 === t || 4 === t || 6 === t
      }
      function an(t) {
        return 64 === t.charCodeAt(0)
      }
      function ln(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice()
        else {
          let n = -1
          for (let r = 0; r < e.length; r++) {
            const s = e[r]
            "number" == typeof s
              ? (n = s)
              : 0 === n ||
                un(t, n, s, null, -1 === n || 2 === n ? e[++r] : null)
          }
        }
        return t
      }
      function un(t, e, n, r, s) {
        let i = 0,
          o = t.length
        if (-1 === e) o = -1
        else
          for (; i < t.length; ) {
            const n = t[i++]
            if ("number" == typeof n) {
              if (n === e) {
                o = -1
                break
              }
              if (n > e) {
                o = i - 1
                break
              }
            }
          }
        for (; i < t.length; ) {
          const e = t[i]
          if ("number" == typeof e) break
          if (e === n) {
            if (null === r) return void (null !== s && (t[i + 1] = s))
            if (r === t[i + 1]) return void (t[i + 2] = s)
          }
          i++, null !== r && i++, null !== s && i++
        }
        ;-1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== r && t.splice(i++, 0, r),
          null !== s && t.splice(i++, 0, s)
      }
      function cn(t) {
        return t !== nn
      }
      function hn(t) {
        return 32767 & t
      }
      function dn(t, e) {
        let n = t >> 16,
          r = e
        for (; n > 0; ) (r = r[15]), n--
        return r
      }
      let pn = !0
      function fn(t) {
        const e = pn
        return (pn = t), e
      }
      let gn = 0
      function mn(t, e) {
        const n = _n(t, e)
        if (-1 !== n) return n
        const r = e[1]
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          yn(r.data, t),
          yn(e, null),
          yn(r.blueprint, null))
        const s = vn(t, e),
          i = t.injectorIndex
        if (cn(s)) {
          const t = hn(s),
            n = dn(s, e),
            r = n[1].data
          for (let s = 0; s < 8; s++) e[i + s] = n[t + s] | r[t + s]
        }
        return (e[i + 8] = s), i
      }
      function yn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e)
      }
      function _n(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex
      }
      function vn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex
        let n = 0,
          r = null,
          s = e
        for (; null !== s; ) {
          const t = s[1],
            e = t.type
          if (((r = 2 === e ? t.declTNode : 1 === e ? s[6] : null), null === r))
            return nn
          if ((n++, (s = s[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16)
        }
        return nn
      }
      function wn(t, e, n) {
        !(function (t, e, n) {
          let r
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Dt) && (r = n[Dt]),
            null == r && (r = n[Dt] = gn++)
          const s = 255 & r,
            i = 1 << s,
            o = 64 & s,
            a = 32 & s,
            l = e.data
          128 & s
            ? o
              ? a
                ? (l[t + 7] |= i)
                : (l[t + 6] |= i)
              : a
              ? (l[t + 5] |= i)
              : (l[t + 4] |= i)
            : o
            ? a
              ? (l[t + 3] |= i)
              : (l[t + 2] |= i)
            : a
            ? (l[t + 1] |= i)
            : (l[t] |= i)
        })(t, e, n)
      }
      function bn(t, e, n) {
        if (n & gt.Optional) return t
        se(e, "NodeInjector")
      }
      function Cn(t, e, n, r) {
        if (
          (n & gt.Optional && void 0 === r && (r = null),
          0 == (n & (gt.Self | gt.Host)))
        ) {
          const s = t[9],
            i = yt(void 0)
          try {
            return s ? s.get(e, r, n & gt.Optional) : _t(e, r, n & gt.Optional)
          } finally {
            yt(i)
          }
        }
        return bn(r, e, n)
      }
      function Sn(t, e, n, r = gt.Default, s) {
        if (null !== t) {
          const i = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0
            const e = t.hasOwnProperty(Dt) ? t[Dt] : void 0
            return "number" == typeof e ? (e >= 0 ? 255 & e : En) : e
          })(n)
          if ("function" == typeof i) {
            if (!Le(e, t, r)) return r & gt.Host ? bn(s, n, r) : Cn(e, n, r, s)
            try {
              const t = i()
              if (null != t || r & gt.Optional) return t
              se(n)
            } finally {
              We()
            }
          } else if ("number" == typeof i) {
            let s = null,
              o = _n(t, e),
              a = nn,
              l = r & gt.Host ? e[16][6] : null
            for (
              (-1 === o || r & gt.SkipSelf) &&
              ((a = -1 === o ? vn(t, e) : e[o + 8]),
              a !== nn && On(r, !1)
                ? ((s = e[1]), (o = hn(a)), (e = dn(a, e)))
                : (o = -1));
              -1 !== o;

            ) {
              const t = e[1]
              if (kn(i, o, t.data)) {
                const t = Tn(o, e, n, s, r, l)
                if (t !== xn) return t
              }
              ;(a = e[o + 8]),
                a !== nn && On(r, e[1].data[o + 8] === l) && kn(i, o, e)
                  ? ((s = t), (o = hn(a)), (e = dn(a, e)))
                  : (o = -1)
            }
          }
        }
        return Cn(e, n, r, s)
      }
      const xn = {}
      function En() {
        return new Rn(Oe(), Te())
      }
      function Tn(t, e, n, r, s, i) {
        const o = e[1],
          a = o.data[t + 8],
          l = (function (t, e, n, r, s) {
            const i = t.providerIndexes,
              o = e.data,
              a = 1048575 & i,
              l = t.directiveStart,
              u = i >> 20,
              c = s ? a + u : t.directiveEnd
            for (let h = r ? a : a + u; h < c; h++) {
              const t = o[h]
              if ((h < l && n === t) || (h >= l && t.type === n)) return h
            }
            if (s) {
              const t = o[l]
              if (t && Yt(t) && t.type === n) return l
            }
            return null
          })(
            a,
            o,
            n,
            null == r ? Jt(a) && pn : r != o && 0 != (3 & a.type),
            s & gt.Host && i === a,
          )
        return null !== l ? An(e, o, l, a) : xn
      }
      function An(t, e, n, r) {
        let s = t[n]
        const i = e.data
        if (s instanceof rn) {
          const o = s
          o.resolving &&
            (function (t, e) {
              throw new ee("200", `Circular dependency in DI detected for ${t}`)
            })(re(i[n]))
          const a = fn(o.canSeeViewProviders)
          o.resolving = !0
          const l = o.injectImpl ? yt(o.injectImpl) : null
          Le(t, r, gt.Default)
          try {
            ;(s = t[n] = o.factory(void 0, i, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: s,
                    ngDoCheck: i,
                  } = e.type.prototype
                  if (r) {
                    const r = ae(e)
                    ;(n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, r)
                  }
                  s &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, i))
                })(n, i[n], e)
          } finally {
            null !== l && yt(l), fn(a), (o.resolving = !1), We()
          }
        }
        return s
      }
      function kn(t, e, n) {
        const r = 64 & t,
          s = 32 & t
        let i
        return (
          (i =
            128 & t
              ? r
                ? s
                  ? n[e + 7]
                  : n[e + 6]
                : s
                ? n[e + 5]
                : n[e + 4]
              : r
              ? s
                ? n[e + 3]
                : n[e + 2]
              : s
              ? n[e + 1]
              : n[e]),
          !!(i & (1 << t))
        )
      }
      function On(t, e) {
        return !(t & gt.Self || (t & gt.Host && e))
      }
      class Rn {
        constructor(t, e) {
          ;(this._tNode = t), (this._lView = e)
        }
        get(t, e) {
          return Sn(this._tNode, this._lView, t, void 0, e)
        }
      }
      function Pn(t) {
        const e = t
        if (it(t))
          return () => {
            const t = Pn(st(e))
            return t ? t() : null
          }
        let n = te(e)
        if (null === n) {
          const t = ct(e)
          n = t && t.factory
        }
        return n || null
      }
      function In(t) {
        return vt(() => {
          const e = t.prototype.constructor,
            n = e[jt] || Pn(e),
            r = Object.prototype
          let s = Object.getPrototypeOf(t.prototype).constructor
          for (; s && s !== r; ) {
            const t = s[jt] || Pn(s)
            if (t && t !== n) return t
            s = Object.getPrototypeOf(s)
          }
          return t => new t()
        })
      }
      function Vn(t) {
        return (function (t, e) {
          if ("class" === e) return t.classes
          if ("style" === e) return t.styles
          const n = t.attrs
          if (n) {
            const t = n.length
            let r = 0
            for (; r < t; ) {
              const s = n[r]
              if (on(s)) break
              if (0 === s) r += 2
              else if ("number" == typeof s)
                for (r++; r < t && "string" == typeof n[r]; ) r++
              else {
                if (s === e) return n[r + 1]
                r += 2
              }
            }
          }
          return null
        })(Oe(), t)
      }
      const jn = "__parameters__"
      function Dn(t, e, n) {
        return vt(() => {
          const r = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e)
                for (const t in n) this[t] = n[t]
              }
            }
          })(e)
          function s(...t) {
            if (this instanceof s) return r.apply(this, t), this
            const e = new s(...t)
            return (n.annotation = e), n
            function n(t, n, r) {
              const s = t.hasOwnProperty(jn)
                ? t[jn]
                : Object.defineProperty(t, jn, { value: [] })[jn]
              for (; s.length <= r; ) s.push(null)
              return (s[r] = s[r] || []).push(e), t
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)),
            (s.prototype.ngMetadataName = t),
            (s.annotationCls = s),
            s
          )
        })
      }
      class Nn {
        constructor(t, e) {
          ;(this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = ot({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }))
        }
        toString() {
          return `InjectionToken ${this._desc}`
        }
      }
      const Un = new Nn("AnalyzeForEntryComponents"),
        Mn = Function
      function Fn(t, e) {
        t.forEach(t => (Array.isArray(t) ? Fn(t, e) : e(t)))
      }
      function Hn(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n)
      }
      function Ln(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0]
      }
      function $n(t, e, n) {
        let r = Bn(t, e)
        return (
          r >= 0
            ? (t[1 | r] = n)
            : ((r = ~r),
              (function (t, e, n, r) {
                let s = t.length
                if (s == e) t.push(n, r)
                else if (1 === s) t.push(r, t[0]), (t[0] = n)
                else {
                  for (s--, t.push(t[s - 1], t[s]); s > e; )
                    (t[s] = t[s - 2]), s--
                  ;(t[e] = n), (t[e + 1] = r)
                }
              })(t, r, e, n)),
          r
        )
      }
      function zn(t, e) {
        const n = Bn(t, e)
        if (n >= 0) return t[1 | n]
      }
      function Bn(t, e) {
        return (function (t, e, n) {
          let r = 0,
            s = t.length >> 1
          for (; s !== r; ) {
            const n = r + ((s - r) >> 1),
              i = t[n << 1]
            if (e === i) return n << 1
            i > e ? (s = n) : (r = n + 1)
          }
          return ~(s << 1)
        })(t, e)
      }
      const qn = {},
        Wn = /\n/gm,
        Zn = "__source",
        Gn = X({ provide: String, useValue: X })
      let Qn
      function Kn(t) {
        const e = Qn
        return (Qn = t), e
      }
      function Jn(t, e = gt.Default) {
        if (void 0 === Qn)
          throw new Error("inject() must be called from an injection context")
        return null === Qn
          ? _t(t, void 0, e)
          : Qn.get(t, e & gt.Optional ? null : void 0, e)
      }
      function Xn(t, e = gt.Default) {
        return (mt || Jn)(st(t), e)
      }
      function Yn(t) {
        const e = []
        for (let n = 0; n < t.length; n++) {
          const r = st(t[n])
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.")
            let t,
              n = gt.Default
            for (let e = 0; e < r.length; e++) {
              const s = r[e],
                i = s.__NG_DI_FLAG__
              "number" == typeof i
                ? -1 === i
                  ? (t = s.token)
                  : (n |= i)
                : (t = s)
            }
            e.push(Xn(t, n))
          } else e.push(Xn(r))
        }
        return e
      }
      function tr(t, e) {
        return (t.__NG_DI_FLAG__ = e), (t.prototype.__NG_DI_FLAG__ = e), t
      }
      const er = tr(
          Dn("Inject", t => ({ token: t })),
          -1,
        ),
        nr = tr(Dn("Optional"), 8),
        rr = tr(Dn("SkipSelf"), 4)
      function sr(t) {
        return t instanceof
          class {
            constructor(t) {
              this.changingThisBreaksApplicationSecurity = t
            }
            toString() {
              return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
            }
          }
          ? t.changingThisBreaksApplicationSecurity
          : t
      }
      function ir(t) {
        return t.ngDebugContext
      }
      function or(t) {
        return t.ngOriginalError
      }
      function ar(t, ...e) {
        t.error(...e)
      }
      class lr {
        constructor() {
          this._console = console
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return t.ngErrorLogger || ar
            })(t)
          r(this._console, "ERROR", t),
            e && r(this._console, "ORIGINAL ERROR", e),
            n && r(this._console, "ERROR CONTEXT", n)
        }
        _findContext(t) {
          return t ? (ir(t) ? ir(t) : this._findContext(or(t))) : null
        }
        _findOriginalError(t) {
          let e = or(t)
          for (; e && or(e); ) e = or(e)
          return e
        }
      }
      function ur(t, e) {
        t.__ngContext__ = e
      }
      const cr = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Tt))()
      function hr(t) {
        return t instanceof Function ? t() : t
      }
      var dr = (function (t) {
        return (
          (t[(t.Important = 1)] = "Important"),
          (t[(t.DashCase = 2)] = "DashCase"),
          t
        )
      })({})
      function pr(t, e) {
        return (void 0)(t, e)
      }
      function fr(t) {
        const e = t[3]
        return Qt(e) ? e[3] : e
      }
      function gr(t) {
        return yr(t[13])
      }
      function mr(t) {
        return yr(t[4])
      }
      function yr(t) {
        for (; null !== t && !Qt(t); ) t = t[4]
        return t
      }
      function _r(t, e, n, r, s) {
        if (null != r) {
          let i,
            o = !1
          Qt(r) ? (i = r) : Gt(r) && ((o = !0), (r = r[0]))
          const a = fe(r)
          0 === t && null !== n
            ? null == s
              ? Er(e, n, a)
              : xr(e, n, a, s || null, !0)
            : 1 === t && null !== n
            ? xr(e, n, a, s || null, !0)
            : 2 === t
            ? (function (t, e, n) {
                const r = Ar(t, e)
                r &&
                  (function (t, e, n, r) {
                    de(t) ? t.removeChild(e, n, r) : e.removeChild(n)
                  })(t, r, e, n)
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != i &&
              (function (t, e, n, r, s) {
                const i = n[7]
                i !== fe(n) && _r(e, t, r, i, s)
                for (let o = Zt; o < n.length; o++) {
                  const s = n[o]
                  Ir(s[1], s, t, e, r, i)
                }
              })(e, t, i, n, s)
        }
      }
      function vr(t, e, n) {
        return de(t)
          ? t.createElement(e, n)
          : null === n
          ? t.createElement(e)
          : t.createElementNS(n, e)
      }
      function wr(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          s = e[3]
        1024 & e[2] && ((e[2] &= -1025), Se(s, -1)), n.splice(r, 1)
      }
      function br(t, e) {
        if (t.length <= Zt) return
        const n = Zt + e,
          r = t[n]
        if (r) {
          const i = r[17]
          null !== i && i !== t && wr(i, r), e > 0 && (t[n - 1][4] = r[4])
          const o = Ln(t, Zt + e)
          Ir(r[1], (s = r), s[11], 2, null, null), (s[0] = null), (s[6] = null)
          const a = o[19]
          null !== a && a.detachView(o[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129)
        }
        var s
        return r
      }
      function Cr(t, e) {
        if (!(256 & e[2])) {
          const n = e[11]
          de(n) && n.destroyNode && Ir(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13]
              if (!e) return Sr(t[1], t)
              for (; e; ) {
                let n = null
                if (Gt(e)) n = e[13]
                else {
                  const t = e[10]
                  t && (n = t)
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    Gt(e) && Sr(e[1], e), (e = e[3])
                  null === e && (e = t), Gt(e) && Sr(e[1], e), (n = e && e[4])
                }
                e = n
              }
            })(e)
        }
      }
      function Sr(t, e) {
        if (!(256 & e[2])) {
          ;(e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]]
                  if (!(t instanceof rn)) {
                    const e = n[r + 1]
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]])
                    else e.call(t)
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup,
                r = e[7]
              let s = -1
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const t = n[i + 1],
                      o = "function" == typeof t ? t(e) : fe(e[t]),
                      a = r[(s = n[i + 2])],
                      l = n[i + 3]
                    "boolean" == typeof l
                      ? o.removeEventListener(n[i], a, l)
                      : l >= 0
                      ? r[(s = l)]()
                      : r[(s = -l)].unsubscribe(),
                      (i += 2)
                  } else {
                    const t = r[(s = n[i + 1])]
                    n[i].call(t)
                  }
              if (null !== r) {
                for (let t = s + 1; t < r.length; t++) (0, r[t])()
                e[7] = null
              }
            })(t, e),
            1 === e[1].type && de(e[11]) && e[11].destroy()
          const n = e[17]
          if (null !== n && Qt(e[3])) {
            n !== e[3] && wr(n, e)
            const r = e[19]
            null !== r && r.detachView(t)
          }
        }
      }
      function xr(t, e, n, r, s) {
        de(t) ? t.insertBefore(e, n, r, s) : e.insertBefore(n, r, s)
      }
      function Er(t, e, n) {
        de(t) ? t.appendChild(e, n) : e.appendChild(n)
      }
      function Tr(t, e, n, r, s) {
        null !== r ? xr(t, e, n, r, s) : Er(t, e, n)
      }
      function Ar(t, e) {
        return de(t) ? t.parentNode(e) : e.parentNode
      }
      function kr(t, e, n, r) {
        const s = (function (t, e, n) {
            return (function (t, e, n) {
              let r = e
              for (; null !== r && 40 & r.type; ) r = (e = r).parent
              if (null === r) return n[0]
              if (2 & r.flags) {
                const e = t.data[r.directiveStart].encapsulation
                if (e === bt.None || e === bt.Emulated) return null
              }
              return me(r, n)
            })(t, e.parent, n)
          })(t, r, e),
          i = e[11],
          o = (function (t, e, n) {
            return (function (t, e, n) {
              return 40 & t.type ? me(t, n) : null
            })(t, 0, n)
          })(r.parent || e[6], 0, e)
        if (null != s)
          if (Array.isArray(n))
            for (let a = 0; a < n.length; a++) Tr(i, s, n[a], o, !1)
          else Tr(i, s, n, o, !1)
      }
      function Or(t, e) {
        if (null !== e) {
          const n = e.type
          if (3 & n) return me(e, t)
          if (4 & n) return Rr(-1, t[e.index])
          if (8 & n) {
            const n = e.child
            if (null !== n) return Or(t, n)
            {
              const n = t[e.index]
              return Qt(n) ? Rr(-1, n) : fe(n)
            }
          }
          if (32 & n) return pr(e, t)() || fe(t[e.index])
          {
            const n = t[16],
              r = n[6],
              s = fr(n),
              i = r.projection[e.projection]
            return null != i ? Or(s, i) : Or(t, e.next)
          }
        }
        return null
      }
      function Rr(t, e) {
        const n = Zt + t + 1
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild
          if (null !== r) return Or(t, r)
        }
        return e[7]
      }
      function Pr(t, e, n, r, s, i, o) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type
          if (
            (o && 0 === e && (a && ur(fe(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) Pr(t, e, n.child, r, s, i, !1), _r(e, t, s, a, i)
            else if (32 & l) {
              const o = pr(n, r)
              let l
              for (; (l = o()); ) _r(e, t, s, l, i)
              _r(e, t, s, a, i)
            } else 16 & l ? Vr(t, e, r, n, s, i) : _r(e, t, s, a, i)
          n = o ? n.projectionNext : n.next
        }
      }
      function Ir(t, e, n, r, s, i) {
        Pr(n, r, t.firstChild, e, s, i, !1)
      }
      function Vr(t, e, n, r, s, i) {
        const o = n[16],
          a = o[6].projection[r.projection]
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) _r(e, t, s, a[l], i)
        else Pr(t, e, a, o[3], s, i, !0)
      }
      function jr(t, e, n) {
        de(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n)
      }
      function Dr(t, e, n) {
        de(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n)
      }
      function Nr(t, e, n) {
        let r = t.length
        for (;;) {
          const s = t.indexOf(e, n)
          if (-1 === s) return s
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s
          }
          n = s + 1
        }
      }
      const Ur = "ng-template"
      function Mr(t, e, n) {
        let r = 0
        for (; r < t.length; ) {
          let s = t[r++]
          if (n && "class" === s) {
            if (((s = t[r]), -1 !== Nr(s.toLowerCase(), e, 0))) return !0
          } else if (1 === s) {
            for (; r < t.length && "string" == typeof (s = t[r++]); )
              if (s.toLowerCase() === e) return !0
            return !1
          }
        }
        return !1
      }
      function Fr(t) {
        return 4 === t.type && t.value !== Ur
      }
      function Hr(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Ur)
      }
      function Lr(t, e, n) {
        let r = 4
        const s = t.attrs || [],
          i = (function (t) {
            for (let e = 0; e < t.length; e++) if (on(t[e])) return e
            return t.length
          })(s)
        let o = !1
        for (let a = 0; a < e.length; a++) {
          const l = e[a]
          if ("number" != typeof l) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !Hr(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if ($r(r)) return !1
                  o = !0
                }
              } else {
                const u = 8 & r ? l : e[++a]
                if (8 & r && null !== t.attrs) {
                  if (!Mr(t.attrs, u, n)) {
                    if ($r(r)) return !1
                    o = !0
                  }
                  continue
                }
                const c = zr(8 & r ? "class" : l, s, Fr(t), n)
                if (-1 === c) {
                  if ($r(r)) return !1
                  o = !0
                  continue
                }
                if ("" !== u) {
                  let t
                  t = c > i ? "" : s[c + 1].toLowerCase()
                  const e = 8 & r ? t : null
                  if ((e && -1 !== Nr(e, u, 0)) || (2 & r && u !== t)) {
                    if ($r(r)) return !1
                    o = !0
                  }
                }
              }
          } else {
            if (!o && !$r(r) && !$r(l)) return !1
            if (o && $r(l)) continue
            ;(o = !1), (r = l | (1 & r))
          }
        }
        return $r(r) || o
      }
      function $r(t) {
        return 0 == (1 & t)
      }
      function zr(t, e, n, r) {
        if (null === e) return -1
        let s = 0
        if (r || !n) {
          let n = !1
          for (; s < e.length; ) {
            const r = e[s]
            if (r === t) return s
            if (3 === r || 6 === r) n = !0
            else {
              if (1 === r || 2 === r) {
                let t = e[++s]
                for (; "string" == typeof t; ) t = e[++s]
                continue
              }
              if (4 === r) break
              if (0 === r) {
                s += 4
                continue
              }
            }
            s += n ? 1 : 2
          }
          return -1
        }
        return (function (t, e) {
          let n = t.indexOf(4)
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n]
              if ("number" == typeof r) return -1
              if (r === e) return n
              n++
            }
          return -1
        })(e, t)
      }
      function Br(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (Lr(t, e[r], n)) return !0
        return !1
      }
      function qr(t, e) {
        return t ? ":not(" + e.trim() + ")" : e
      }
      function Wr(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = "",
          i = !1
        for (; n < t.length; ) {
          let o = t[n]
          if ("string" == typeof o)
            if (2 & r) {
              const e = t[++n]
              s += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]"
            } else 8 & r ? (s += "." + o) : 4 & r && (s += " " + o)
          else
            "" === s || $r(o) || ((e += qr(i, s)), (s = "")),
              (r = o),
              (i = i || !$r(r))
          n++
        }
        return "" !== s && (e += qr(i, s)), e
      }
      const Zr = {}
      function Gr(t) {
        Qr(Ae(), Te(), Ge() + t, Ve())
      }
      function Qr(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks
            null !== r && Je(e, r, n)
          } else {
            const r = t.preOrderHooks
            null !== r && Xe(e, r, 0, n)
          }
        Qe(n)
      }
      function Kr(t, e) {
        return (t << 17) | (e << 2)
      }
      function Jr(t) {
        return (t >> 17) & 32767
      }
      function Xr(t) {
        return 2 | t
      }
      function Yr(t) {
        return (131068 & t) >> 2
      }
      function ts(t, e) {
        return (-131069 & t) | (e << 2)
      }
      function es(t) {
        return 1 | t
      }
      function ns(t, e) {
        const n = t.contentQueries
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              i = n[r + 1]
            if (-1 !== i) {
              const n = t.data[i]
              Fe(s), n.contentQueries(2, e[i], i)
            }
          }
      }
      function rs(t, e, n, r, s, i, o, a, l, u) {
        const c = e.blueprint.slice()
        return (
          (c[0] = s),
          (c[2] = 140 | r),
          Ce(c),
          (c[3] = c[15] = t),
          (c[8] = n),
          (c[10] = o || (t && t[10])),
          (c[11] = a || (t && t[11])),
          (c[12] = l || (t && t[12]) || null),
          (c[9] = u || (t && t[9]) || null),
          (c[6] = i),
          (c[16] = 2 == e.type ? t[16] : c),
          c
        )
      }
      function ss(t, e, n, r, s) {
        let i = t.data[e]
        if (null === i)
          (i = (function (t, e, n, r, s) {
            const i = Re(),
              o = Ie(),
              a = (t.data[e] = (function (t, e, n, r, s, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: s,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                }
              })(0, o ? i : i && i.parent, n, e, r, s))
            return (
              null === t.firstChild && (t.firstChild = a),
              null !== i &&
                (o
                  ? null == i.child && null !== a.parent && (i.child = a)
                  : null === i.next && (i.next = a)),
              a
            )
          })(t, e, n, r, s)),
            xe.lFrame.inI18n && (i.flags |= 64)
        else if (64 & i.type) {
          ;(i.type = n), (i.value = r), (i.attrs = s)
          const t = (function () {
            const t = xe.lFrame,
              e = t.currentTNode
            return t.isParent ? e : e.parent
          })()
          i.injectorIndex = null === t ? -1 : t.injectorIndex
        }
        return Pe(i, !0), i
      }
      function is(t, e, n, r) {
        if (0 === n) return -1
        const s = e.length
        for (let i = 0; i < n; i++)
          e.push(r), t.blueprint.push(r), t.data.push(null)
        return s
      }
      function os(t, e, n) {
        $e(e)
        try {
          const r = t.viewQuery
          null !== r && Vs(1, r, n)
          const s = t.template
          null !== s && us(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && ns(t, e),
            t.staticViewQueries && Vs(2, t.viewQuery, n)
          const i = t.components
          null !== i &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) ks(t, e[n])
            })(e, i)
        } catch (r) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), r)
        } finally {
          ;(e[2] &= -5), Ze()
        }
      }
      function as(t, e, n, r) {
        const s = e[2]
        if (256 == (256 & s)) return
        $e(e)
        const i = Ve()
        try {
          Ce(e),
            (xe.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && us(t, e, n, 2, r)
          const o = 3 == (3 & s)
          if (!i)
            if (o) {
              const n = t.preOrderCheckHooks
              null !== n && Je(e, n, null)
            } else {
              const n = t.preOrderHooks
              null !== n && Xe(e, n, 0, null), Ye(e, 0)
            }
          if (
            ((function (t) {
              for (let e = gr(t); null !== e; e = mr(e)) {
                if (!e[2]) continue
                const t = e[9]
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    r = n[3]
                  0 == (1024 & n[2]) && Se(r, 1), (n[2] |= 1024)
                }
              }
            })(e),
            (function (t) {
              for (let e = gr(t); null !== e; e = mr(e))
                for (let t = Zt; t < e.length; t++) {
                  const n = e[t],
                    r = n[1]
                  we(n) && as(r, n, r.template, n[8])
                }
            })(e),
            null !== t.contentQueries && ns(t, e),
            !i)
          )
            if (o) {
              const n = t.contentCheckHooks
              null !== n && Je(e, n)
            } else {
              const n = t.contentHooks
              null !== n && Xe(e, n, 1), Ye(e, 1)
            }
          !(function (t, e) {
            const n = t.hostBindingOpCodes
            if (null !== n)
              try {
                for (let t = 0; t < n.length; t++) {
                  const r = n[t]
                  if (r < 0) Qe(~r)
                  else {
                    const s = r,
                      i = n[++t],
                      o = n[++t]
                    Ue(i, s), o(2, e[s])
                  }
                }
              } finally {
                Qe(-1)
              }
          })(t, e)
          const a = t.components
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) Ts(t, e[n])
            })(e, a)
          const l = t.viewQuery
          if ((null !== l && Vs(2, l, r), !i))
            if (o) {
              const n = t.viewCheckHooks
              null !== n && Je(e, n)
            } else {
              const n = t.viewHooks
              null !== n && Xe(e, n, 2), Ye(e, 2)
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), Se(e[3], -1))
        } finally {
          Ze()
        }
      }
      function ls(t, e, n, r) {
        const s = e[10],
          i = !Ve(),
          o = 4 == (4 & e[2])
        try {
          i && !o && s.begin && s.begin(), o && os(t, e, r), as(t, e, n, r)
        } finally {
          i && !o && s.end && s.end()
        }
      }
      function us(t, e, n, r, s) {
        const i = Ge()
        try {
          Qe(-1), 2 & r && e.length > Wt && Qr(t, e, Wt, Ve()), n(r, s)
        } finally {
          Qe(i)
        }
      }
      function cs(t, e, n) {
        Ee() &&
          ((function (t, e, n, r) {
            const s = n.directiveStart,
              i = n.directiveEnd
            t.firstCreatePass || mn(n, e), ur(r, e)
            const o = n.initialInputs
            for (let a = s; a < i; a++) {
              const r = t.data[a],
                i = Yt(r)
              i && Cs(e, n, r)
              const l = An(e, t, a, n)
              ur(l, e),
                null !== o && Ss(0, a - s, l, r, 0, o),
                i && (_e(n.index, e)[8] = l)
            }
          })(t, e, n, me(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const r = n.directiveStart,
                s = n.directiveEnd,
                i = n.index,
                o = xe.lFrame.currentDirectiveIndex
              try {
                Qe(i)
                for (let n = r; n < s; n++) {
                  const r = t.data[n],
                    s = e[n]
                  Me(n),
                    (null === r.hostBindings &&
                      0 === r.hostVars &&
                      null === r.hostAttrs) ||
                      ys(r, s)
                }
              } finally {
                Qe(-1), Me(o)
              }
            })(t, e, n))
      }
      function hs(t, e, n = me) {
        const r = e.localNames
        if (null !== r) {
          let s = e.index + 1
          for (let i = 0; i < r.length; i += 2) {
            const o = r[i + 1],
              a = -1 === o ? n(e, t) : t[o]
            t[s++] = a
          }
        }
      }
      function ds(t) {
        const e = t.tView
        return null === e || e.incompleteFirstPass
          ? (t.tView = ps(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts,
            ))
          : e
      }
      function ps(t, e, n, r, s, i, o, a, l, u) {
        const c = Wt + r,
          h = c + s,
          d = (function (t, e) {
            const n = []
            for (let r = 0; r < e; r++) n.push(r < t ? null : Zr)
            return n
          })(c, h),
          p = "function" == typeof u ? u() : u
        return (d[1] = {
          type: t,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: d.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
        })
      }
      function fs(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r]
            ;(n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, s)
              : (n[r] = [e, s])
          }
        return n
      }
      function gs(t, e, n, r) {
        let s = !1
        if (Ee()) {
          const i = (function (t, e, n) {
              const r = t.directiveRegistry
              let s = null
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const o = r[i]
                  Br(n, o.selectors, !1) &&
                    (s || (s = []),
                    wn(mn(n, e), t, o.type),
                    Yt(o) ? (_s(t, n), s.unshift(o)) : s.push(o))
                }
              return s
            })(t, e, n),
            o = null === r ? null : { "": -1 }
          if (null !== i) {
            ;(s = !0), ws(n, t.data.length, i.length)
            for (let t = 0; t < i.length; t++) {
              const e = i[t]
              e.providersResolver && e.providersResolver(e)
            }
            let r = !1,
              a = !1,
              l = is(t, e, i.length, null)
            for (let s = 0; s < i.length; s++) {
              const u = i[s]
              ;(n.mergedAttrs = ln(n.mergedAttrs, u.hostAttrs)),
                bs(t, n, e, l, u),
                vs(l, u, o),
                null !== u.contentQueries && (n.flags |= 8),
                (null === u.hostBindings &&
                  null === u.hostAttrs &&
                  0 === u.hostVars) ||
                  (n.flags |= 128)
              const c = u.type.prototype
              !r &&
                (c.ngOnChanges || c.ngOnInit || c.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index),
                (r = !0)),
                a ||
                  (!c.ngOnChanges && !c.ngDoCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index,
                  ),
                  (a = !0)),
                l++
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                r = t.data,
                s = e.attrs,
                i = []
              let o = null,
                a = null
              for (let l = e.directiveStart; l < n; l++) {
                const t = r[l],
                  n = t.inputs,
                  u = null === s || Fr(e) ? null : xs(n, s)
                i.push(u), (o = fs(n, l, o)), (a = fs(t.outputs, l, a))
              }
              null !== o &&
                (o.hasOwnProperty("class") && (e.flags |= 16),
                o.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = o),
                (e.outputs = a)
            })(t, n)
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const r = (t.localNames = [])
                for (let t = 0; t < e.length; t += 2) {
                  const s = n[e[t + 1]]
                  if (null == s)
                    throw new ee(
                      "301",
                      `Export of name '${e[t + 1]}' not found!`,
                    )
                  r.push(e[t], s)
                }
              }
            })(n, r, o)
        }
        return (n.mergedAttrs = ln(n.mergedAttrs, n.attrs)), s
      }
      function ms(t, e, n, r, s, i) {
        const o = i.hostBindings
        if (o) {
          let n = t.hostBindingOpCodes
          null === n && (n = t.hostBindingOpCodes = [])
          const i = ~e.index
          ;(function (t) {
            let e = t.length
            for (; e > 0; ) {
              const n = t[--e]
              if ("number" == typeof n && n < 0) return n
            }
            return 0
          })(n) != i && n.push(i),
            n.push(r, s, o)
        }
      }
      function ys(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e)
      }
      function _s(t, e) {
        ;(e.flags |= 2), (t.components || (t.components = [])).push(e.index)
      }
      function vs(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t
          Yt(e) && (n[""] = t)
        }
      }
      function ws(t, e, n) {
        ;(t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e)
      }
      function bs(t, e, n, r, s) {
        t.data[r] = s
        const i = s.factory || (s.factory = te(s.type)),
          o = new rn(i, Yt(s), null)
        ;(t.blueprint[r] = o),
          (n[r] = o),
          ms(t, e, 0, r, is(t, n, s.hostVars, Zr), s)
      }
      function Cs(t, e, n) {
        const r = me(e, t),
          s = ds(n),
          i = t[10],
          o = Os(
            t,
            rs(
              t,
              s,
              null,
              n.onPush ? 64 : 16,
              r,
              e,
              i,
              i.createRenderer(r, n),
              null,
              null,
            ),
          )
        t[e.index] = o
      }
      function Ss(t, e, n, r, s, i) {
        const o = i[e]
        if (null !== o) {
          const t = r.setInput
          for (let e = 0; e < o.length; ) {
            const s = o[e++],
              i = o[e++],
              a = o[e++]
            null !== t ? r.setInput(n, a, s, i) : (n[i] = a)
          }
        }
      }
      function xs(t, e) {
        let n = null,
          r = 0
        for (; r < e.length; ) {
          const s = e[r]
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break
              t.hasOwnProperty(s) &&
                (null === n && (n = []), n.push(s, t[s], e[r + 1])),
                (r += 2)
            } else r += 2
          else r += 4
        }
        return n
      }
      function Es(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null)
      }
      function Ts(t, e) {
        const n = _e(e, t)
        if (we(n)) {
          const t = n[1]
          80 & n[2] ? as(t, n, t.template, n[8]) : n[5] > 0 && As(n)
        }
      }
      function As(t) {
        for (let n = gr(t); null !== n; n = mr(n))
          for (let t = Zt; t < n.length; t++) {
            const e = n[t]
            if (1024 & e[2]) {
              const t = e[1]
              as(t, e, t.template, e[8])
            } else e[5] > 0 && As(e)
          }
        const e = t[1].components
        if (null !== e)
          for (let n = 0; n < e.length; n++) {
            const r = _e(e[n], t)
            we(r) && r[5] > 0 && As(r)
          }
      }
      function ks(t, e) {
        const n = _e(e, t),
          r = n[1]
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n])
        })(r, n),
          os(r, n, n[8])
      }
      function Os(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e
      }
      function Rs(t) {
        for (; t; ) {
          t[2] |= 64
          const e = fr(t)
          if (0 != (512 & t[2]) && !e) return t
          t = e
        }
        return null
      }
      function Ps(t, e, n) {
        const r = e[10]
        r.begin && r.begin()
        try {
          as(t, e, t.template, n)
        } catch (s) {
          throw (Us(e, s), s)
        } finally {
          r.end && r.end()
        }
      }
      function Is(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = ve(n),
              s = r[1]
            ls(s, r, s.template, n)
          }
        })(t[8])
      }
      function Vs(t, e, n) {
        Fe(0), e(t, n)
      }
      const js = (() => Promise.resolve(null))()
      function Ds(t) {
        return t[7] || (t[7] = [])
      }
      function Ns(t) {
        return t.cleanup || (t.cleanup = [])
      }
      function Us(t, e) {
        const n = t[9],
          r = n ? n.get(lr, null) : null
        r && r.handleError(e)
      }
      function Ms(t, e, n, r, s) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            l = e[o],
            u = t.data[o]
          null !== u.setInput ? u.setInput(l, s, r, a) : (l[a] = s)
        }
      }
      function Fs(t, e, n) {
        let r = n ? t.styles : null,
          s = n ? t.classes : null,
          i = 0
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const t = e[o]
            "number" == typeof t
              ? (i = t)
              : 1 == i
              ? (s = et(s, t))
              : 2 == i && (r = et(r, t + ": " + e[++o] + ";"))
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = s) : (t.classesWithoutHost = s)
      }
      const Hs = new Nn("INJECTOR", -1)
      class Ls {
        get(t, e = qn) {
          if (e === qn) {
            const e = new Error(`NullInjectorError: No provider for ${tt(t)}!`)
            throw ((e.name = "NullInjectorError"), e)
          }
          return e
        }
      }
      const $s = new Nn("Set Injector scope."),
        zs = {},
        Bs = {},
        qs = []
      let Ws
      function Zs() {
        return void 0 === Ws && (Ws = new Ls()), Ws
      }
      function Gs(t, e = null, n = null, r) {
        return new Qs(t, n, e || Zs(), r)
      }
      class Qs {
        constructor(t, e, n, r = null) {
          ;(this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1)
          const s = []
          e && Fn(e, n => this.processProvider(n, t, e)),
            Fn([t], t => this.processInjectorType(t, [], s)),
            this.records.set(Hs, Xs(void 0, this))
          const i = this.records.get($s)
          ;(this.scope = null != i ? i.value : null),
            (this.source = r || ("object" == typeof t ? null : tt(t)))
        }
        get destroyed() {
          return this._destroyed
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0)
          try {
            this.onDestroy.forEach(t => t.ngOnDestroy())
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear()
          }
        }
        get(t, e = qn, n = gt.Default) {
          this.assertNotDestroyed()
          const r = Kn(this)
          try {
            if (!(n & gt.SkipSelf)) {
              let e = this.records.get(t)
              if (void 0 === e) {
                const n =
                  ("function" == typeof (s = t) ||
                    ("object" == typeof s && s instanceof Nn)) &&
                  lt(t)
                ;(e = n && this.injectableDefInScope(n) ? Xs(Ks(t), zs) : null),
                  this.records.set(t, e)
              }
              if (null != e) return this.hydrate(t, e)
            }
            return (n & gt.Self ? Zs() : this.parent).get(
              t,
              (e = n & gt.Optional && e === qn ? null : e),
            )
          } catch (i) {
            if ("NullInjectorError" === i.name) {
              if (
                ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(tt(t)),
                r)
              )
                throw i
              return (function (t, e, n, r) {
                const s = t.ngTempTokenPath
                throw (
                  (e[Zn] && s.unshift(e[Zn]),
                  (t.message = (function (t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t
                    let s = tt(e)
                    if (Array.isArray(e)) s = e.map(tt).join(" -> ")
                    else if ("object" == typeof e) {
                      let t = []
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let r = e[n]
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof r
                                ? JSON.stringify(r)
                                : tt(r)),
                          )
                        }
                      s = `{${t.join(", ")}}`
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(
                      Wn,
                      "\n  ",
                    )}`
                  })("\n" + t.message, s, n, r)),
                  (t.ngTokenPath = s),
                  (t.ngTempTokenPath = null),
                  t)
                )
              })(i, t, "R3InjectorError", this.source)
            }
            throw i
          } finally {
            Kn(r)
          }
          var s
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach(t => this.get(t))
        }
        toString() {
          const t = []
          return (
            this.records.forEach((e, n) => t.push(tt(n))),
            `R3Injector[${t.join(", ")}]`
          )
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.")
        }
        processInjectorType(t, e, n) {
          if (!(t = st(t))) return !1
          let r = ct(t)
          const s = (null == r && t.ngModule) || void 0,
            i = void 0 === s ? t : s,
            o = -1 !== n.indexOf(i)
          if ((void 0 !== s && (r = ct(s)), null == r)) return !1
          if (null != r.imports && !o) {
            let t
            n.push(i)
            try {
              Fn(r.imports, r => {
                this.processInjectorType(r, e, n) &&
                  (void 0 === t && (t = []), t.push(r))
              })
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: r } = t[e]
                Fn(r, t => this.processProvider(t, n, r || qs))
              }
          }
          this.injectorDefTypes.add(i), this.records.set(i, Xs(r.factory, zs))
          const a = r.providers
          if (null != a && !o) {
            const e = t
            Fn(a, t => this.processProvider(t, e, a))
          }
          return void 0 !== s && void 0 !== t.providers
        }
        processProvider(t, e, n) {
          let r = ti((t = st(t))) ? t : st(t && t.provide)
          const s = (function (t, e, n) {
            return Ys(t) ? Xs(void 0, t.useValue) : Xs(Js(t), zs)
          })(t)
          if (ti(t) || !0 !== t.multi) this.records.get(r)
          else {
            let e = this.records.get(r)
            e ||
              ((e = Xs(void 0, zs, !0)),
              (e.factory = () => Yn(e.multi)),
              this.records.set(r, e)),
              (r = t),
              e.multi.push(t)
          }
          this.records.set(r, s)
        }
        hydrate(t, e) {
          var n
          return (
            e.value === zs && ((e.value = Bs), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          )
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          )
        }
      }
      function Ks(t) {
        const e = lt(t),
          n = null !== e ? e.factory : te(t)
        if (null !== n) return n
        const r = ct(t)
        if (null !== r) return r.factory
        if (t instanceof Nn)
          throw new Error(`Token ${tt(t)} is missing a \u0275prov definition.`)
        if (t instanceof Function)
          return (function (t) {
            const e = t.length
            if (e > 0) {
              const n = (function (t, e) {
                const n = []
                for (let r = 0; r < t; r++) n.push("?")
                return n
              })(e)
              throw new Error(
                `Can't resolve all parameters for ${tt(t)}: (${n.join(", ")}).`,
              )
            }
            const n = (function (t) {
              const e = t && (t[ht] || t[pt])
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name
                  const e = ("" + t).match(/^function\s*([^\s(]+)/)
                  return null === e ? "" : e[1]
                })(t)
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`,
                  ),
                  e
                )
              }
              return null
            })(t)
            return null !== n ? () => n.factory(t) : () => new t()
          })(t)
        throw new Error("unreachable")
      }
      function Js(t, e, n) {
        let r
        if (ti(t)) {
          const e = st(t)
          return te(e) || Ks(e)
        }
        if (Ys(t)) r = () => st(t.useValue)
        else if ((s = t) && s.useFactory)
          r = () => t.useFactory(...Yn(t.deps || []))
        else if (
          (function (t) {
            return !(!t || !t.useExisting)
          })(t)
        )
          r = () => Xn(st(t.useExisting))
        else {
          const e = st(t && (t.useClass || t.provide))
          if (
            !(function (t) {
              return !!t.deps
            })(t)
          )
            return te(e) || Ks(e)
          r = () => new e(...Yn(t.deps))
        }
        var s
        return r
      }
      function Xs(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 }
      }
      function Ys(t) {
        return null !== t && "object" == typeof t && Gn in t
      }
      function ti(t) {
        return "function" == typeof t
      }
      const ei = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const s = Gs(t, e, n, r)
          return s._resolveInjectorDefTypes(), s
        })({ name: n }, e, t, n)
      }
      let ni = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? ei(t, e, "")
              : ei(t.providers, t.parent, t.name || "")
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = qn),
          (t.NULL = new Ls()),
          (t.ɵprov = ot({
            token: t,
            providedIn: "any",
            factory: () => Xn(Hs),
          })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        )
      })()
      function ri(t, e) {
        Ke(ve(t)[1], Oe())
      }
      function si(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0
        const r = [t]
        for (; e; ) {
          let s
          if (Yt(t)) s = e.ɵcmp || e.ɵdir
          else {
            if (e.ɵcmp) throw new Error("Directives cannot inherit Components")
            s = e.ɵdir
          }
          if (s) {
            if (n) {
              r.push(s)
              const e = t
              ;(e.inputs = ii(t.inputs)),
                (e.declaredInputs = ii(t.declaredInputs)),
                (e.outputs = ii(t.outputs))
              const n = s.hostBindings
              n && li(t, n)
              const i = s.viewQuery,
                o = s.contentQueries
              if (
                (i && oi(t, i),
                o && ai(t, o),
                Y(t.inputs, s.inputs),
                Y(t.declaredInputs, s.declaredInputs),
                Y(t.outputs, s.outputs),
                Yt(s) && s.data.animation)
              ) {
                const e = t.data
                e.animation = (e.animation || []).concat(s.data.animation)
              }
            }
            const e = s.features
            if (e)
              for (let r = 0; r < e.length; r++) {
                const s = e[r]
                s && s.ngInherit && s(t), s === si && (n = !1)
              }
          }
          e = Object.getPrototypeOf(e)
        }
        !(function (t) {
          let e = 0,
            n = null
          for (let r = t.length - 1; r >= 0; r--) {
            const s = t[r]
            ;(s.hostVars = e += s.hostVars),
              (s.hostAttrs = ln(s.hostAttrs, (n = ln(n, s.hostAttrs))))
          }
        })(r)
      }
      function ii(t) {
        return t === At ? {} : t === kt ? [] : t
      }
      function oi(t, e) {
        const n = t.viewQuery
        t.viewQuery = n
          ? (t, r) => {
              e(t, r), n(t, r)
            }
          : e
      }
      function ai(t, e) {
        const n = t.contentQueries
        t.contentQueries = n
          ? (t, r, s) => {
              e(t, r, s), n(t, r, s)
            }
          : e
      }
      function li(t, e) {
        const n = t.hostBindings
        t.hostBindings = n
          ? (t, r) => {
              e(t, r), n(t, r)
            }
          : e
      }
      let ui = null
      function ci() {
        if (!ui) {
          const t = Tt.Symbol
          if (t && t.iterator) ui = t.iterator
          else {
            const t = Object.getOwnPropertyNames(Map.prototype)
            for (let e = 0; e < t.length; ++e) {
              const n = t[e]
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (ui = n)
            }
          }
        }
        return ui
      }
      function hi(t) {
        return (
          !!di(t) && (Array.isArray(t) || (!(t instanceof Map) && ci() in t))
        )
      }
      function di(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t)
      }
      function pi(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0)
      }
      function fi(t, e, n, r, s, i, o, a) {
        const l = Te(),
          u = Ae(),
          c = t + Wt,
          h = u.firstCreatePass
            ? (function (t, e, n, r, s, i, o, a, l) {
                const u = e.consts,
                  c = ss(e, t, 4, o || null, be(u, a))
                gs(e, n, c, be(u, l)), Ke(e, c)
                const h = (c.tViews = ps(
                  2,
                  c,
                  r,
                  s,
                  i,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  u,
                ))
                return (
                  null !== e.queries &&
                    (e.queries.template(e, c),
                    (h.queries = e.queries.embeddedTView(c))),
                  c
                )
              })(c, u, l, e, n, r, s, i, o)
            : u.data[c]
        Pe(h, !1)
        const d = l[11].createComment("")
        kr(u, l, d, h),
          ur(d, l),
          Os(l, (l[c] = Es(d, l, d, h))),
          Xt(h) && cs(u, l, h),
          null != o && hs(l, h, a)
      }
      function gi(t, e = gt.Default) {
        const n = Te()
        return null === n ? Xn(t, e) : Sn(Oe(), n, st(t), e)
      }
      function mi(t, e, n) {
        const r = Te()
        return (
          pi(r, De(), e) &&
            (function (t, e, n, r, s, i, o, a) {
              const l = me(e, n)
              let u,
                c = e.inputs
              var h
              null != c && (u = c[r])
                ? (Ms(t, n, u, r, s),
                  Jt(e) &&
                    (function (t, e) {
                      const n = _e(e, t)
                      16 & n[2] || (n[2] |= 64)
                    })(n, e.index))
                : 3 & e.type &&
                  ((r =
                    "class" === (h = r)
                      ? "className"
                      : "for" === h
                      ? "htmlFor"
                      : "formaction" === h
                      ? "formAction"
                      : "innerHtml" === h
                      ? "innerHTML"
                      : "readonly" === h
                      ? "readOnly"
                      : "tabindex" === h
                      ? "tabIndex"
                      : h),
                  (s = null != o ? o(s, e.value || "", r) : s),
                  de(i)
                    ? i.setProperty(l, r, s)
                    : an(r) ||
                      (l.setProperty ? l.setProperty(r, s) : (l[r] = s)))
            })(
              Ae(),
              (function () {
                const t = xe.lFrame
                return ye(t.tView, t.selectedIndex)
              })(),
              r,
              t,
              e,
              r[11],
              n,
            ),
          mi
        )
      }
      function yi(t, e, n, r, s) {
        const i = s ? "class" : "style"
        Ms(t, n, e.inputs[i], i, r)
      }
      function _i(t, e, n, r) {
        const s = Te(),
          i = Ae(),
          o = Wt + t,
          a = s[11],
          l = (s[o] = vr(a, e, xe.lFrame.currentNamespace)),
          u = i.firstCreatePass
            ? (function (t, e, n, r, s, i, o) {
                const a = e.consts,
                  l = ss(e, t, 2, s, be(a, i))
                return (
                  gs(e, n, l, be(a, o)),
                  null !== l.attrs && Fs(l, l.attrs, !1),
                  null !== l.mergedAttrs && Fs(l, l.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, l),
                  l
                )
              })(o, i, s, 0, e, n, r)
            : i.data[o]
        Pe(u, !0)
        const c = u.mergedAttrs
        null !== c && sn(a, l, c)
        const h = u.classes
        null !== h && Dr(a, l, h)
        const d = u.styles
        null !== d && jr(a, l, d),
          64 != (64 & u.flags) && kr(i, s, l, u),
          0 === xe.lFrame.elementDepthCount && ur(l, s),
          xe.lFrame.elementDepthCount++,
          Xt(u) &&
            (cs(i, s, u),
            (function (t, e, n) {
              if (Kt(e)) {
                const r = e.directiveEnd
                for (let s = e.directiveStart; s < r; s++) {
                  const e = t.data[s]
                  e.contentQueries && e.contentQueries(1, n[s], s)
                }
              }
            })(i, u, s)),
          null !== r && hs(s, u)
      }
      function vi() {
        let t = Oe()
        Ie() ? (xe.lFrame.isParent = !1) : ((t = t.parent), Pe(t, !1))
        const e = t
        xe.lFrame.elementDepthCount--
        const n = Ae()
        n.firstCreatePass && (Ke(n, t), Kt(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags)
            })(e) &&
            yi(n, e, Te(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags)
            })(e) &&
            yi(n, e, Te(), e.stylesWithoutHost, !1)
      }
      function wi(t, e, n, r) {
        _i(t, e, n, r), vi()
      }
      function bi() {
        return Te()
      }
      function Ci(t) {
        return !!t && "function" == typeof t.then
      }
      const Si = function (t) {
        return !!t && "function" == typeof t.subscribe
      }
      function xi(t, e, n = !1, r) {
        const s = Te(),
          i = Ae(),
          o = Oe()
        return (
          (function (t, e, n, r, s, i, o = !1, a) {
            const l = Xt(r),
              u = t.firstCreatePass && Ns(t),
              c = Ds(e)
            let h = !0
            if (3 & r.type) {
              const d = me(r, e),
                p = a ? a(d) : At,
                f = p.target || d,
                g = c.length,
                m = a ? t => a(fe(t[r.index])).target : r.index
              if (de(n)) {
                let o = null
                if (
                  (!a &&
                    l &&
                    (o = (function (t, e, n, r) {
                      const s = t.cleanup
                      if (null != s)
                        for (let i = 0; i < s.length - 1; i += 2) {
                          const t = s[i]
                          if (t === n && s[i + 1] === r) {
                            const t = e[7],
                              n = s[i + 2]
                            return t.length > n ? t[n] : null
                          }
                          "string" == typeof t && (i += 2)
                        }
                      return null
                    })(t, e, s, r.index)),
                  null !== o)
                )
                  ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i),
                    (o.__ngLastListenerFn__ = i),
                    (h = !1)
                else {
                  i = Ti(r, e, i, !1)
                  const t = n.listen(p.name || f, s, i)
                  c.push(i, t), u && u.push(s, m, g, g + 1)
                }
              } else
                (i = Ti(r, e, i, !0)),
                  f.addEventListener(s, i, o),
                  c.push(i),
                  u && u.push(s, m, g, o)
            } else i = Ti(r, e, i, !1)
            const d = r.outputs
            let p
            if (h && null !== d && (p = d[s])) {
              const t = p.length
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[p[n]][p[n + 1]].subscribe(i),
                    o = c.length
                  c.push(i, t), u && u.push(s, r.index, o, -(o + 1))
                }
            }
          })(i, s, s[11], o, t, e, n, r),
          xi
        )
      }
      function Ei(t, e, n) {
        try {
          return !1 !== e(n)
        } catch (r) {
          return Us(t, r), !1
        }
      }
      function Ti(t, e, n, r) {
        return function s(i) {
          if (i === Function) return n
          const o = 2 & t.flags ? _e(t.index, e) : e
          0 == (32 & e[2]) && Rs(o)
          let a = Ei(e, n, i),
            l = s.__ngNextListenerFn__
          for (; l; ) (a = Ei(e, l, i) && a), (l = l.__ngNextListenerFn__)
          return r && !1 === a && (i.preventDefault(), (i.returnValue = !1)), a
        }
      }
      function Ai(t = 1) {
        return (function (t) {
          return (xe.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--
            return e
          })(t, xe.lFrame.contextLView))[8]
        })(t)
      }
      const ki = []
      function Oi(t, e, n, r, s) {
        const i = t[n + 1],
          o = null === e
        let a = r ? Jr(i) : Yr(i),
          l = !1
        for (; 0 !== a && (!1 === l || o); ) {
          const n = t[a + 1]
          Ri(t[a], e) && ((l = !0), (t[a + 1] = r ? es(n) : Xr(n))),
            (a = r ? Jr(n) : Yr(n))
        }
        l && (t[n + 1] = r ? Xr(i) : es(i))
      }
      function Ri(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && Bn(t, e) >= 0)
        )
      }
      const Pi = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 }
      function Ii(t) {
        return t.substring(Pi.key, Pi.keyEnd)
      }
      function Vi(t, e) {
        const n = Pi.textEnd
        return n === e
          ? -1
          : ((e = Pi.keyEnd =
              (function (t, e, n) {
                for (; e < n && t.charCodeAt(e) > 32; ) e++
                return e
              })(t, (Pi.key = e), n)),
            ji(t, e, n))
      }
      function ji(t, e, n) {
        for (; e < n && t.charCodeAt(e) <= 32; ) e++
        return e
      }
      function Di(t, e) {
        return (
          (function (t, e, n, r) {
            const s = Te(),
              i = Ae(),
              o = Ne(2)
            i.firstUpdatePass && Mi(i, t, o, true),
              e !== Zr &&
                pi(s, o, e) &&
                Li(
                  i,
                  i.data[Ge()],
                  s,
                  s[11],
                  t,
                  (s[o + 1] = (function (t, e) {
                    return (
                      null == t || ("object" == typeof t && (t = tt(sr(t)))), t
                    )
                  })(e)),
                  true,
                  o,
                )
          })(t, e),
          Di
        )
      }
      function Ni(t, e) {
        for (
          let n = (function (t) {
            return (
              (function (t) {
                ;(Pi.key = 0),
                  (Pi.keyEnd = 0),
                  (Pi.value = 0),
                  (Pi.valueEnd = 0),
                  (Pi.textEnd = t.length)
              })(t),
              Vi(t, ji(t, 0, Pi.textEnd))
            )
          })(e);
          n >= 0;
          n = Vi(e, n)
        )
          $n(t, Ii(e), !0)
      }
      function Ui(t, e) {
        return e >= t.expandoStartIndex
      }
      function Mi(t, e, n, r) {
        const s = t.data
        if (null === s[n + 1]) {
          const i = s[Ge()],
            o = Ui(t, n)
          Bi(i, r) && null === e && !o && (e = !1),
            (e = (function (t, e, n, r) {
              const s = (function (t) {
                const e = xe.lFrame.currentDirectiveIndex
                return -1 === e ? null : t[e]
              })(t)
              let i = r ? e.residualClasses : e.residualStyles
              if (null === s)
                0 === (r ? e.classBindings : e.styleBindings) &&
                  ((n = Hi((n = Fi(null, t, e, n, r)), e.attrs, r)), (i = null))
              else {
                const o = e.directiveStylingLast
                if (-1 === o || t[o] !== s)
                  if (((n = Fi(s, t, e, n, r)), null === i)) {
                    let n = (function (t, e, n) {
                      const r = n ? e.classBindings : e.styleBindings
                      if (0 !== Yr(r)) return t[Jr(r)]
                    })(t, e, r)
                    void 0 !== n &&
                      Array.isArray(n) &&
                      ((n = Fi(null, t, e, n[1], r)),
                      (n = Hi(n, e.attrs, r)),
                      (function (t, e, n, r) {
                        t[Jr(n ? e.classBindings : e.styleBindings)] = r
                      })(t, e, r, n))
                  } else
                    i = (function (t, e, n) {
                      let r
                      const s = e.directiveEnd
                      for (let i = 1 + e.directiveStylingLast; i < s; i++)
                        r = Hi(r, t[i].hostAttrs, n)
                      return Hi(r, e.attrs, n)
                    })(t, e, r)
              }
              return (
                void 0 !== i &&
                  (r ? (e.residualClasses = i) : (e.residualStyles = i)),
                n
              )
            })(s, i, e, r)),
            (function (t, e, n, r, s, i) {
              let o = i ? e.classBindings : e.styleBindings,
                a = Jr(o),
                l = Yr(o)
              t[r] = n
              let u,
                c = !1
              if (Array.isArray(n)) {
                const t = n
                ;(u = t[1]), (null === u || Bn(t, u) > 0) && (c = !0)
              } else u = n
              if (s)
                if (0 !== l) {
                  const e = Jr(t[a + 1])
                  ;(t[r + 1] = Kr(e, a)),
                    0 !== e && (t[e + 1] = ts(t[e + 1], r)),
                    (t[a + 1] = (131071 & t[a + 1]) | (r << 17))
                } else
                  (t[r + 1] = Kr(a, 0)),
                    0 !== a && (t[a + 1] = ts(t[a + 1], r)),
                    (a = r)
              else
                (t[r + 1] = Kr(l, 0)),
                  0 === a ? (a = r) : (t[l + 1] = ts(t[l + 1], r)),
                  (l = r)
              c && (t[r + 1] = Xr(t[r + 1])),
                Oi(t, u, r, !0),
                Oi(t, u, r, !1),
                (function (t, e, n, r, s) {
                  const i = s ? t.residualClasses : t.residualStyles
                  null != i &&
                    "string" == typeof e &&
                    Bn(i, e) >= 0 &&
                    (n[r + 1] = es(n[r + 1]))
                })(e, u, t, r, i),
                (o = Kr(a, l)),
                i ? (e.classBindings = o) : (e.styleBindings = o)
            })(s, i, e, n, o, r)
        }
      }
      function Fi(t, e, n, r, s) {
        let i = null
        const o = n.directiveEnd
        let a = n.directiveStylingLast
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((i = e[a]), (r = Hi(r, i.hostAttrs, s)), i !== t);

        )
          a++
        return null !== t && (n.directiveStylingLast = a), r
      }
      function Hi(t, e, n) {
        const r = n ? 1 : 2
        let s = -1
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const o = e[i]
            "number" == typeof o
              ? (s = o)
              : s === r &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                $n(t, o, !!n || e[++i]))
          }
        return void 0 === t ? null : t
      }
      function Li(t, e, n, r, s, i, o, a) {
        if (!(3 & e.type)) return
        const l = t.data,
          u = l[a + 1]
        zi(1 == (1 & u) ? $i(l, e, n, s, Yr(u), o) : void 0) ||
          (zi(i) || (2 == (2 & u) && (i = $i(l, null, n, s, a, o))),
          (function (t, e, n, r, s) {
            const i = de(t)
            if (e)
              s
                ? i
                  ? t.addClass(n, r)
                  : n.classList.add(r)
                : i
                ? t.removeClass(n, r)
                : n.classList.remove(r)
            else {
              let e = -1 === r.indexOf("-") ? void 0 : dr.DashCase
              if (null == s)
                i ? t.removeStyle(n, r, e) : n.style.removeProperty(r)
              else {
                const o = "string" == typeof s && s.endsWith("!important")
                o && ((s = s.slice(0, -10)), (e |= dr.Important)),
                  i
                    ? t.setStyle(n, r, s, e)
                    : n.style.setProperty(r, s, o ? "important" : "")
              }
            }
          })(r, o, ge(Ge(), n), s, i))
      }
      function $i(t, e, n, r, s, i) {
        const o = null === e
        let a
        for (; s > 0; ) {
          const e = t[s],
            i = Array.isArray(e),
            l = i ? e[1] : e,
            u = null === l
          let c = n[s + 1]
          c === Zr && (c = u ? ki : void 0)
          let h = u ? zn(c, r) : l === r ? c : void 0
          if ((i && !zi(h) && (h = zn(e, r)), zi(h) && ((a = h), o))) return a
          const d = t[s + 1]
          s = o ? Jr(d) : Yr(d)
        }
        if (null !== e) {
          let t = i ? e.residualClasses : e.residualStyles
          null != t && (a = zn(t, r))
        }
        return a
      }
      function zi(t) {
        return void 0 !== t
      }
      function Bi(t, e) {
        return 0 != (t.flags & (e ? 16 : 32))
      }
      function qi(t, e = "") {
        const n = Te(),
          r = Ae(),
          s = t + Wt,
          i = r.firstCreatePass ? ss(r, s, 1, e, null) : r.data[s],
          o = (n[s] = (function (t, e) {
            return de(t) ? t.createText(e) : t.createTextNode(e)
          })(n[11], e))
        kr(r, n, o, i), Pe(i, !1)
      }
      function Wi(t) {
        return Zi("", t, ""), Wi
      }
      function Zi(t, e, n) {
        const r = Te(),
          s = (function (t, e, n, r) {
            return pi(t, De(), n) ? e + ne(n) + r : Zr
          })(r, t, e, n)
        return (
          s !== Zr &&
            (function (t, e, n) {
              const r = ge(e, t)
              !(function (t, e, n) {
                de(t) ? t.setValue(e, n) : (e.textContent = n)
              })(t[11], r, n)
            })(r, Ge(), s),
          Zi
        )
      }
      const Gi = void 0
      var Qi = [
        "en",
        [["a", "p"], ["AM", "PM"], Gi],
        [["AM", "PM"], Gi, Gi],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Gi,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Gi,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Gi, "{1} 'at' {0}", Gi],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length
          return 1 === e && 0 === n ? 1 : 5
        },
      ]
      let Ki = {}
      function Ji(t) {
        return (
          t in Ki ||
            (Ki[t] =
              Tt.ng &&
              Tt.ng.common &&
              Tt.ng.common.locales &&
              Tt.ng.common.locales[t]),
          Ki[t]
        )
      }
      var Xi = (function (t) {
        return (
          (t[(t.LocaleId = 0)] = "LocaleId"),
          (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (t[(t.DaysFormat = 3)] = "DaysFormat"),
          (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
          (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
          (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
          (t[(t.Eras = 7)] = "Eras"),
          (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (t[(t.WeekendRange = 9)] = "WeekendRange"),
          (t[(t.DateFormat = 10)] = "DateFormat"),
          (t[(t.TimeFormat = 11)] = "TimeFormat"),
          (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
          (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
          (t[(t.NumberFormats = 14)] = "NumberFormats"),
          (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
          (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
          (t[(t.CurrencyName = 17)] = "CurrencyName"),
          (t[(t.Currencies = 18)] = "Currencies"),
          (t[(t.Directionality = 19)] = "Directionality"),
          (t[(t.PluralCase = 20)] = "PluralCase"),
          (t[(t.ExtraData = 21)] = "ExtraData"),
          t
        )
      })({})
      const Yi = "en-US"
      let to = Yi
      function eo(t) {
        var e, n
        ;(n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, r) {
              throw new Error(
                `ASSERTION ERROR: ${t} [Expected=> null != ${e} <=Actual]`,
              )
            })(n, e),
          "string" == typeof t && (to = t.toLowerCase().replace(/_/g, "-"))
      }
      function no(t, e, n, r, s) {
        if (((t = st(t)), Array.isArray(t)))
          for (let i = 0; i < t.length; i++) no(t[i], e, n, r, s)
        else {
          const i = Ae(),
            o = Te()
          let a = ti(t) ? t : st(t.provide),
            l = Js(t)
          const u = Oe(),
            c = 1048575 & u.providerIndexes,
            h = u.directiveStart,
            d = u.providerIndexes >> 20
          if (ti(t) || !t.multi) {
            const r = new rn(l, s, gi),
              p = io(a, e, s ? c : c + d, h)
            ;-1 === p
              ? (wn(mn(u, o), i, a),
                ro(i, t, e.length),
                e.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                s && (u.providerIndexes += 1048576),
                n.push(r),
                o.push(r))
              : ((n[p] = r), (o[p] = r))
          } else {
            const p = io(a, e, c + d, h),
              f = io(a, e, c, c + d),
              g = p >= 0 && n[p],
              m = f >= 0 && n[f]
            if ((s && !m) || (!s && !g)) {
              wn(mn(u, o), i, a)
              const c = (function (t, e, n, r, s) {
                const i = new rn(t, n, gi)
                return (
                  (i.multi = []),
                  (i.index = e),
                  (i.componentProviders = 0),
                  so(i, s, r && !n),
                  i
                )
              })(s ? ao : oo, n.length, s, r, l)
              !s && m && (n[f].providerFactory = c),
                ro(i, t, e.length, 0),
                e.push(a),
                u.directiveStart++,
                u.directiveEnd++,
                s && (u.providerIndexes += 1048576),
                n.push(c),
                o.push(c)
            } else ro(i, t, p > -1 ? p : f, so(n[s ? f : p], l, !s && r))
            !s && r && m && n[f].componentProviders++
          }
        }
      }
      function ro(t, e, n, r) {
        const s = ti(e)
        if (s || e.useClass) {
          const i = (e.useClass || e).prototype.ngOnDestroy
          if (i) {
            const o = t.destroyHooks || (t.destroyHooks = [])
            if (!s && e.multi) {
              const t = o.indexOf(n)
              ;-1 === t ? o.push(n, [r, i]) : o[t + 1].push(r, i)
            } else o.push(n, i)
          }
        }
      }
      function so(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1
      }
      function io(t, e, n, r) {
        for (let s = n; s < r; s++) if (e[s] === t) return s
        return -1
      }
      function oo(t, e, n, r) {
        return lo(this.multi, [])
      }
      function ao(t, e, n, r) {
        const s = this.multi
        let i
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = An(n, n[1], this.providerFactory.index, r)
          ;(i = e.slice(0, t)), lo(s, i)
          for (let n = t; n < e.length; n++) i.push(e[n])
        } else (i = []), lo(s, i)
        return i
      }
      function lo(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])())
        return e
      }
      function uo(t, e = []) {
        return n => {
          n.providersResolver = (n, r) =>
            (function (t, e, n) {
              const r = Ae()
              if (r.firstCreatePass) {
                const s = Yt(t)
                no(n, r.data, r.blueprint, s, !0),
                  no(e, r.data, r.blueprint, s, !1)
              }
            })(n, r ? r(t) : t, e)
        }
      }
      class co {}
      class ho {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${tt(
                t,
              )}. Did you add it to @NgModule.entryComponents?`,
            )
            return (e.ngComponent = t), e
          })(t)
        }
      }
      let po = (() => {
        class t {}
        return (t.NULL = new ho()), t
      })()
      function fo(...t) {}
      function go(t, e) {
        return new yo(me(t, e))
      }
      const mo = function () {
        return go(Oe(), Te())
      }
      let yo = (() => {
        class t {
          constructor(t) {
            this.nativeElement = t
          }
        }
        return (t.__NG_ELEMENT_ID__ = mo), t
      })()
      class _o {}
      let vo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => wo()), t
      })()
      const wo = function () {
        const t = Te(),
          e = _e(Oe().index, t)
        return (function (t) {
          return t[11]
        })(Gt(e) ? e : t)
      }
      let bo = (() => {
        class t {}
        return (
          (t.ɵprov = ot({ token: t, providedIn: "root", factory: () => null })),
          t
        )
      })()
      class Co {
        constructor(t) {
          ;(this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."))
        }
      }
      const So = new Co("11.1.0")
      class xo {
        constructor() {}
        supports(t) {
          return hi(t)
        }
        create(t) {
          return new To(t)
        }
      }
      const Eo = (t, e) => e
      class To {
        constructor(t) {
          ;(this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || Eo)
        }
        forEachItem(t) {
          let e
          for (e = this._itHead; null !== e; e = e._next) t(e)
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < Ro(n, r, s)) ? e : n,
              o = Ro(i, r, s),
              a = i.currentIndex
            if (i === n) r--, (n = n._nextRemoved)
            else if (((e = e._next), null == i.previousIndex)) r++
            else {
              s || (s = [])
              const t = o - r,
                e = a - r
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    i = r + n
                  e <= i && i < t && (s[n] = r + 1)
                }
                s[i.previousIndex] = e - t
              }
            }
            o !== a && t(i, o, a)
          }
        }
        forEachPreviousItem(t) {
          let e
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e)
        }
        forEachAddedItem(t) {
          let e
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
        }
        forEachMovedItem(t) {
          let e
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e)
        }
        forEachRemovedItem(t) {
          let e
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
        }
        forEachIdentityChange(t) {
          let e
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e)
        }
        diff(t) {
          if ((null == t && (t = []), !hi(t)))
            throw new Error(
              `Error trying to diff '${tt(
                t,
              )}'. Only arrays and iterables are allowed`,
            )
          return this.check(t) ? this : null
        }
        onDestroy() {}
        check(t) {
          this._reset()
          let e,
            n,
            r,
            s = this._itHead,
            i = !1
          if (Array.isArray(t)) {
            this.length = t.length
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== s && Object.is(s.trackById, r)
                  ? (i && (s = this._verifyReinsertion(s, n, r, e)),
                    Object.is(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (i = !0)),
                (s = s._next)
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t)) for (let n = 0; n < t.length; n++) e(t[n])
                else {
                  const n = t[ci()]()
                  let r
                  for (; !(r = n.next()).done; ) e(r.value)
                }
              })(t, t => {
                ;(r = this._trackByFn(e, t)),
                  null !== s && Object.is(s.trackById, r)
                    ? (i && (s = this._verifyReinsertion(s, t, r, e)),
                      Object.is(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (i = !0)),
                  (s = s._next),
                  e++
              }),
              (this.length = e)
          return this._truncate(s), (this.collection = t), this.isDirty
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          )
        }
        _reset() {
          if (this.isDirty) {
            let t
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex
            ;(this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null)
          }
        }
        _mismatch(t, e, n, r) {
          let s
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, s, r))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, r))
              : (t = this._addAfter(new Ao(e, n), s, r)),
            t
          )
        }
        _verifyReinsertion(t, e, n, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null)
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          )
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next
            this._addToRemovals(this._unlink(t)), (t = e)
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null)
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t)
          const r = t._prevRemoved,
            s = t._nextRemoved
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          )
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          )
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          )
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Oo()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          )
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t))
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t)
          const e = t._prev,
            n = t._next
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          )
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          )
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Oo()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          )
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          )
        }
      }
      class Ao {
        constructor(t, e) {
          ;(this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null)
        }
      }
      class ko {
        constructor() {
          ;(this._head = null), (this._tail = null)
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t))
        }
        get(t, e) {
          let n
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === e || e <= n.currentIndex) &&
              Object.is(n.trackById, t)
            )
              return n
          return null
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          )
        }
      }
      class Oo {
        constructor() {
          this.map = new Map()
        }
        put(t) {
          const e = t.trackById
          let n = this.map.get(e)
          n || ((n = new ko()), this.map.set(e, n)), n.add(t)
        }
        get(t, e) {
          const n = this.map.get(t)
          return n ? n.get(t, e) : null
        }
        remove(t) {
          const e = t.trackById
          return this.map.get(e).remove(t) && this.map.delete(e), t
        }
        get isEmpty() {
          return 0 === this.map.size
        }
        clear() {
          this.map.clear()
        }
      }
      function Ro(t, e, n) {
        const r = t.previousIndex
        if (null === r) return r
        let s = 0
        return n && r < n.length && (s = n[r]), r + e + s
      }
      class Po {
        constructor() {}
        supports(t) {
          return t instanceof Map || di(t)
        }
        create() {
          return new Io()
        }
      }
      class Io {
        constructor() {
          ;(this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null)
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          )
        }
        forEachItem(t) {
          let e
          for (e = this._mapHead; null !== e; e = e._next) t(e)
        }
        forEachPreviousItem(t) {
          let e
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e)
        }
        forEachChangedItem(t) {
          let e
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e)
        }
        forEachAddedItem(t) {
          let e
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e)
        }
        forEachRemovedItem(t) {
          let e
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e)
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || di(t)))
              throw new Error(
                `Error trying to diff '${tt(
                  t,
                )}'. Only maps and objects are allowed`,
              )
          } else t = new Map()
          return this.check(t) ? this : null
        }
        onDestroy() {}
        check(t) {
          this._reset()
          let e = this._mapHead
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next)
              else {
                const r = this._getOrCreateRecordForKey(n, t)
                e = this._insertBeforeOrAppend(e, r)
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e)
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null)
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          )
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            )
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          )
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t)
            this._maybeAddToChanges(n, e)
            const r = n._prev,
              s = n._next
            return (
              r && (r._next = s),
              s && (s._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            )
          }
          const n = new Vo(t)
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          )
        }
        _reset() {
          if (this.isDirty) {
            let t
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue
            ;(this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null)
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t))
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t))
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t))
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach(n => e(t[n], n))
        }
      }
      class Vo {
        constructor(t) {
          ;(this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null)
        }
      }
      function jo() {
        return new Do([new xo()])
      }
      let Do = (() => {
        class t {
          constructor(t) {
            this.factories = t
          }
          static create(e, n) {
            if (null != n) {
              const t = n.factories.slice()
              e = e.concat(t)
            }
            return new t(e)
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: n => t.create(e, n || jo()),
              deps: [[t, new rr(), new nr()]],
            }
          }
          find(t) {
            const e = this.factories.find(e => e.supports(t))
            if (null != e) return e
            throw new Error(
              `Cannot find a differ supporting object '${t}' of type '${
                ((n = t), n.name || typeof n)
              }'`,
            )
            var n
          }
        }
        return (t.ɵprov = ot({ token: t, providedIn: "root", factory: jo })), t
      })()
      function No() {
        return new Uo([new Po()])
      }
      let Uo = (() => {
        class t {
          constructor(t) {
            this.factories = t
          }
          static create(e, n) {
            if (n) {
              const t = n.factories.slice()
              e = e.concat(t)
            }
            return new t(e)
          }
          static extend(e) {
            return {
              provide: t,
              useFactory: n => t.create(e, n || No()),
              deps: [[t, new rr(), new nr()]],
            }
          }
          find(t) {
            const e = this.factories.find(e => e.supports(t))
            if (e) return e
            throw new Error(`Cannot find a differ supporting object '${t}'`)
          }
        }
        return (t.ɵprov = ot({ token: t, providedIn: "root", factory: No })), t
      })()
      function Mo(t, e, n, r, s = !1) {
        for (; null !== n; ) {
          const i = e[n.index]
          if ((null !== i && r.push(fe(i)), Qt(i)))
            for (let t = Zt; t < i.length; t++) {
              const e = i[t],
                n = e[1].firstChild
              null !== n && Mo(e[1], e, n, r)
            }
          const o = n.type
          if (8 & o) Mo(t, e, n.child, r)
          else if (32 & o) {
            const t = pr(n, e)
            let s
            for (; (s = t()); ) r.push(s)
          } else if (16 & o) {
            const t = e[16],
              s = t[6].projection[n.projection]
            if (Array.isArray(s)) r.push(...s)
            else {
              const e = fr(t)
              Mo(e[1], e, s, r, !0)
            }
          }
          n = s ? n.projectionNext : n.next
        }
        return r
      }
      class Fo {
        constructor(t, e) {
          ;(this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1)
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1]
          return Mo(e, t, e.firstChild, [])
        }
        get context() {
          return this._lView[8]
        }
        get destroyed() {
          return 256 == (256 & this._lView[2])
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this)
          else if (this._attachedToViewContainer) {
            const t = this._lView[3]
            if (Qt(t)) {
              const e = t[8],
                n = e ? e.indexOf(this) : -1
              n > -1 && (br(t, n), Ln(e, n))
            }
            this._attachedToViewContainer = !1
          }
          Cr(this._lView[1], this._lView)
        }
        onDestroy(t) {
          !(function (t, e, n, r) {
            const s = Ds(e)
            s.push(r)
          })(0, this._lView, 0, t)
        }
        markForCheck() {
          Rs(this._cdRefInjectingView || this._lView)
        }
        detach() {
          this._lView[2] &= -129
        }
        reattach() {
          this._lView[2] |= 128
        }
        detectChanges() {
          Ps(this._lView[1], this._lView, this.context)
        }
        checkNoChanges() {
          !(function (t, e, n) {
            je(!0)
            try {
              Ps(t, e, n)
            } finally {
              je(!1)
            }
          })(this._lView[1], this._lView, this.context)
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!",
            )
          this._attachedToViewContainer = !0
        }
        detachFromAppRef() {
          var t
          ;(this._appRef = null),
            Ir(this._lView[1], (t = this._lView), t[11], 2, null, null)
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer)
            throw new Error("This view is already attached to a ViewContainer!")
          this._appRef = t
        }
      }
      class Ho extends Fo {
        constructor(t) {
          super(t), (this._view = t)
        }
        detectChanges() {
          Is(this._view)
        }
        checkNoChanges() {
          !(function (t) {
            je(!0)
            try {
              Is(t)
            } finally {
              je(!1)
            }
          })(this._view)
        }
        get context() {
          return null
        }
      }
      const Lo = function (t = !1) {
        return (function (t, e, n) {
          if (!n && Jt(t)) {
            const n = _e(t.index, e)
            return new Fo(n, n)
          }
          return 47 & t.type ? new Fo(e[16], e) : null
        })(Oe(), Te(), t)
      }
      let $o = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Lo), (t.__ChangeDetectorRef__ = !0), t
      })()
      const zo = [new Po()],
        Bo = new Do([new xo()]),
        qo = new Uo(zo),
        Wo = function () {
          return (
            (t = Oe()), (e = Te()), 4 & t.type ? new Qo(e, t, go(t, e)) : null
          )
          var t, e
        }
      let Zo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Wo), t
      })()
      const Go = Zo,
        Qo = class extends Go {
          constructor(t, e, n) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = e),
              (this.elementRef = n)
          }
          createEmbeddedView(t) {
            const e = this._declarationTContainer.tViews,
              n = rs(
                this._declarationLView,
                e,
                t,
                16,
                null,
                e.declTNode,
                null,
                null,
                null,
                null,
              )
            n[17] = this._declarationLView[this._declarationTContainer.index]
            const r = this._declarationLView[19]
            return (
              null !== r && (n[19] = r.createEmbeddedView(e)),
              os(e, n, t),
              new Fo(n)
            )
          }
        }
      class Ko {}
      class Jo {}
      const Xo = function () {
        return (function (t, e) {
          let n
          const r = e[t.index]
          if (Qt(r)) n = r
          else {
            let s
            if (8 & t.type) s = fe(r)
            else {
              const n = e[11]
              s = n.createComment("")
              const r = me(t, e)
              xr(
                n,
                Ar(n, r),
                s,
                (function (t, e) {
                  return de(t) ? t.nextSibling(e) : e.nextSibling
                })(n, r),
                !1,
              )
            }
            ;(e[t.index] = n = Es(r, e, s, t)), Os(e, n)
          }
          return new ea(n, t, e)
        })(Oe(), Te())
      }
      let Yo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Xo), t
      })()
      const ta = Yo,
        ea = class extends ta {
          constructor(t, e, n) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = e),
              (this._hostLView = n)
          }
          get element() {
            return go(this._hostTNode, this._hostLView)
          }
          get injector() {
            return new Rn(this._hostTNode, this._hostLView)
          }
          get parentInjector() {
            const t = vn(this._hostTNode, this._hostLView)
            if (cn(t)) {
              const e = dn(t, this._hostLView),
                n = hn(t)
              return new Rn(e[1].data[n + 8], e)
            }
            return new Rn(null, this._hostLView)
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1)
          }
          get(t) {
            const e = na(this._lContainer)
            return (null !== e && e[t]) || null
          }
          get length() {
            return this._lContainer.length - Zt
          }
          createEmbeddedView(t, e, n) {
            const r = t.createEmbeddedView(e || {})
            return this.insert(r, n), r
          }
          createComponent(t, e, n, r, s) {
            const i = n || this.parentInjector
            if (!s && null == t.ngModule && i) {
              const t = i.get(Ko, null)
              t && (s = t)
            }
            const o = t.create(i, r, void 0, s)
            return this.insert(o.hostView, e), o
          }
          insert(t, e) {
            const n = t._lView,
              r = n[1]
            if (Qt(n[3])) {
              const e = this.indexOf(t)
              if (-1 !== e) this.detach(e)
              else {
                const e = n[3],
                  r = new ea(e, e[6], e[3])
                r.detach(r.indexOf(t))
              }
            }
            const s = this._adjustIndex(e),
              i = this._lContainer
            !(function (t, e, n, r) {
              const s = Zt + r,
                i = n.length
              r > 0 && (n[s - 1][4] = e),
                r < i - Zt
                  ? ((e[4] = n[s]), Hn(n, Zt + r, e))
                  : (n.push(e), (e[4] = null)),
                (e[3] = n)
              const o = e[17]
              null !== o &&
                n !== o &&
                (function (t, e) {
                  const n = t[9]
                  e[16] !== e[3][3][16] && (t[2] = !0),
                    null === n ? (t[9] = [e]) : n.push(e)
                })(o, e)
              const a = e[19]
              null !== a && a.insertView(t), (e[2] |= 128)
            })(r, n, i, s)
            const o = Rr(s, i),
              a = n[11],
              l = Ar(a, i[7])
            return (
              null !== l &&
                (function (t, e, n, r, s, i) {
                  ;(r[0] = s), (r[6] = e), Ir(t, r, n, 1, s, i)
                })(r, i[6], a, n, l, o),
              t.attachToViewContainerRef(),
              Hn(ra(i), s, t),
              t
            )
          }
          move(t, e) {
            return this.insert(t, e)
          }
          indexOf(t) {
            const e = na(this._lContainer)
            return null !== e ? e.indexOf(t) : -1
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              n = br(this._lContainer, e)
            n && (Ln(ra(this._lContainer), e), Cr(n[1], n))
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              n = br(this._lContainer, e)
            return n && null != Ln(ra(this._lContainer), e) ? new Fo(n) : null
          }
          _adjustIndex(t, e = 0) {
            return null == t ? this.length + e : t
          }
        }
      function na(t) {
        return t[8]
      }
      function ra(t) {
        return t[8] || (t[8] = [])
      }
      const sa = {}
      class ia extends po {
        constructor(t) {
          super(), (this.ngModule = t)
        }
        resolveComponentFactory(t) {
          const e = Bt(t)
          return new la(e, this.ngModule)
        }
      }
      function oa(t) {
        const e = []
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n })
        return e
      }
      const aa = new Nn("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => cr,
      })
      class la extends co {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Wr).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e)
        }
        get inputs() {
          return oa(this.componentDef.inputs)
        }
        get outputs() {
          return oa(this.componentDef.outputs)
        }
        create(t, e, n, r) {
          const s = (r = r || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, s) => {
                      const i = t.get(n, sa, s)
                      return i !== sa || r === sa ? i : e.get(n, r, s)
                    },
                  }
                })(t, r.injector)
              : t,
            i = s.get(_o, pe),
            o = s.get(bo, null),
            a = i.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            u = n
              ? (function (t, e, n) {
                  if (de(t)) return t.selectRootElement(e, n === bt.ShadowDom)
                  let r = "string" == typeof e ? t.querySelector(e) : e
                  return (r.textContent = ""), r
                })(a, n, this.componentDef.encapsulation)
              : vr(
                  i.createRenderer(null, this.componentDef),
                  l,
                  (function (t) {
                    const e = t.toLowerCase()
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null
                  })(l),
                ),
            c = this.componentDef.onPush ? 576 : 528,
            h = {
              components: [],
              scheduler: cr,
              clean: js,
              playerHandler: null,
              flags: 0,
            },
            d = ps(0, null, null, 1, 0, null, null, null, null, null),
            p = rs(null, d, h, c, null, null, i, a, o, s)
          let f, g
          $e(p)
          try {
            const t = (function (t, e, n, r, s, i) {
              const o = n[1]
              n[20] = t
              const a = ss(o, 20, 2, "#host", null),
                l = (a.mergedAttrs = e.hostAttrs)
              null !== l &&
                (Fs(a, l, !0),
                null !== t &&
                  (sn(s, t, l),
                  null !== a.classes && Dr(s, t, a.classes),
                  null !== a.styles && jr(s, t, a.styles)))
              const u = r.createRenderer(t, e),
                c = rs(
                  n,
                  ds(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  a,
                  r,
                  u,
                  null,
                  null,
                )
              return (
                o.firstCreatePass &&
                  (wn(mn(a, n), o, e.type), _s(o, a), ws(a, n.length, 1)),
                Os(n, c),
                (n[20] = c)
              )
            })(u, this.componentDef, p, i, a)
            if (u)
              if (n) sn(a, u, ["ng-version", So.full])
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = []
                  let r = 1,
                    s = 2
                  for (; r < t.length; ) {
                    let i = t[r]
                    if ("string" == typeof i)
                      2 === s
                        ? "" !== i && e.push(i, t[++r])
                        : 8 === s && n.push(i)
                    else {
                      if (!$r(s)) break
                      s = i
                    }
                    r++
                  }
                  return { attrs: e, classes: n }
                })(this.componentDef.selectors[0])
                t && sn(a, u, t), e && e.length > 0 && Dr(a, u, e.join(" "))
              }
            if (((g = ye(d, Wt)), void 0 !== e)) {
              const t = (g.projection = [])
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n]
                t.push(null != r ? Array.from(r) : null)
              }
            }
            ;(f = (function (t, e, n, r, s) {
              const i = n[1],
                o = (function (t, e, n) {
                  const r = Oe()
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    bs(t, r, e, is(t, e, 1, null), n))
                  const s = An(e, t, r.directiveStart, r)
                  ur(s, e)
                  const i = me(r, e)
                  return i && ur(i, e), s
                })(i, n, e)
              if (
                (r.components.push(o),
                (t[8] = o),
                s && s.forEach(t => t(o, e)),
                e.contentQueries)
              ) {
                const t = Oe()
                e.contentQueries(1, o, t.directiveStart)
              }
              const a = Oe()
              return (
                !i.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (Qe(a.index),
                  ms(n[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  ys(e, o)),
                o
              )
            })(t, this.componentDef, p, h, [ri])),
              os(d, p, null)
          } finally {
            Ze()
          }
          return new ua(this.componentType, f, go(g, p), p, g)
        }
      }
      class ua extends class {} {
        constructor(t, e, n, r, s) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = s),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new Ho(r)),
            (this.componentType = t)
        }
        get injector() {
          return new Rn(this._tNode, this._rootLView)
        }
        destroy() {
          this.hostView.destroy()
        }
        onDestroy(t) {
          this.hostView.onDestroy(t)
        }
      }
      const ca = new Map()
      class ha extends Ko {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new ia(this))
          const n = qt(t),
            r = t[Vt] || null
          r && eo(r),
            (this._bootstrapComponents = hr(n.bootstrap)),
            (this._r3Injector = Gs(
              t,
              e,
              [
                { provide: Ko, useValue: this },
                { provide: po, useValue: this.componentFactoryResolver },
              ],
              tt(t),
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t))
        }
        get(t, e = ni.THROW_IF_NOT_FOUND, n = gt.Default) {
          return t === ni || t === Ko || t === Hs
            ? this
            : this._r3Injector.get(t, e, n)
        }
        destroy() {
          const t = this._r3Injector
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach(t => t()),
            (this.destroyCbs = null)
        }
        onDestroy(t) {
          this.destroyCbs.push(t)
        }
      }
      class da extends Jo {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== qt(t) &&
              (function (t) {
                const e = new Set()
                !(function t(n) {
                  const r = qt(n, !0),
                    s = r.id
                  null !== s &&
                    ((function (t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${tt(
                            e,
                          )} vs ${tt(e.name)}`,
                        )
                    })(s, ca.get(s), n),
                    ca.set(s, n))
                  const i = hr(r.imports)
                  for (const o of i) e.has(o) || (e.add(o), t(o))
                })(t)
              })(t)
        }
        create(t) {
          return new ha(this.moduleType, t)
        }
      }
      const pa = class extends S {
          constructor(t = !1) {
            super(), (this.__isAsync = t)
          }
          emit(t) {
            super.next(t)
          }
          subscribe(t, e, n) {
            let r,
              s = t => null,
              i = () => null
            t && "object" == typeof t
              ? ((r = this.__isAsync
                  ? e => {
                      setTimeout(() => t.next(e))
                    }
                  : e => {
                      t.next(e)
                    }),
                t.error &&
                  (s = this.__isAsync
                    ? e => {
                        setTimeout(() => t.error(e))
                      }
                    : e => {
                        t.error(e)
                      }),
                t.complete &&
                  (i = this.__isAsync
                    ? () => {
                        setTimeout(() => t.complete())
                      }
                    : () => {
                        t.complete()
                      }))
              : ((r = this.__isAsync
                  ? e => {
                      setTimeout(() => t(e))
                    }
                  : e => {
                      t(e)
                    }),
                e &&
                  (s = this.__isAsync
                    ? t => {
                        setTimeout(() => e(t))
                      }
                    : t => {
                        e(t)
                      }),
                n &&
                  (i = this.__isAsync
                    ? () => {
                        setTimeout(() => n())
                      }
                    : () => {
                        n()
                      }))
            const o = super.subscribe(r, s, i)
            return t instanceof h && t.add(o), o
          }
        },
        fa = new Nn("Application Initializer")
      let ga = (() => {
        class t {
          constructor(t) {
            ;(this.appInits = t),
              (this.resolve = fo),
              (this.reject = fo),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                ;(this.resolve = t), (this.reject = e)
              }))
          }
          runInitializers() {
            if (this.initialized) return
            const t = [],
              e = () => {
                ;(this.done = !0), this.resolve()
              }
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]()
                Ci(e) && t.push(e)
              }
            Promise.all(t)
              .then(() => {
                e()
              })
              .catch(t => {
                this.reject(t)
              }),
              0 === t.length && e(),
              (this.initialized = !0)
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(fa, 8))
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const ma = new Nn("AppId"),
        ya = {
          provide: ma,
          useFactory: function () {
            return `${_a()}${_a()}${_a()}`
          },
          deps: [],
        }
      function _a() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()))
      }
      const va = new Nn("Platform Initializer"),
        wa = new Nn("Platform ID"),
        ba = new Nn("appBootstrapListener")
      let Ca = (() => {
        class t {
          log(t) {
            console.log(t)
          }
          warn(t) {
            console.warn(t)
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)()
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const Sa = new Nn("LocaleId"),
        xa = new Nn("DefaultCurrencyCode")
      class Ea {
        constructor(t, e) {
          ;(this.ngModuleFactory = t), (this.componentFactories = e)
        }
      }
      const Ta = function (t) {
          return new da(t)
        },
        Aa = Ta,
        ka = function (t) {
          return Promise.resolve(Ta(t))
        },
        Oa = function (t) {
          const e = Ta(t),
            n = hr(qt(t).declarations).reduce((t, e) => {
              const n = Bt(e)
              return n && t.push(new la(n)), t
            }, [])
          return new Ea(e, n)
        },
        Ra = Oa,
        Pa = function (t) {
          return Promise.resolve(Oa(t))
        }
      let Ia = (() => {
        class t {
          constructor() {
            ;(this.compileModuleSync = Aa),
              (this.compileModuleAsync = ka),
              (this.compileModuleAndAllComponentsSync = Ra),
              (this.compileModuleAndAllComponentsAsync = Pa)
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)()
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const Va = (() => Promise.resolve(0))()
      function ja(t) {
        "undefined" == typeof Zone
          ? Va.then(() => {
              t && t.apply(null, null)
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t)
      }
      class Da {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: n = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new pa(!1)),
            (this.onMicrotaskEmpty = new pa(!1)),
            (this.onStable = new pa(!1)),
            (this.onError = new pa(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js")
          Zone.assertZonePatched()
          const r = this
          ;(r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !n && e),
            (r.shouldCoalesceRunChangeDetection = n),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function () {
              let t = Tt.requestAnimationFrame,
                e = Tt.cancelAnimationFrame
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")]
                n && (t = n)
                const r = e[Zone.__symbol__("OriginalDelegate")]
                r && (e = r)
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              }
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e = () => {
                !(function (t) {
                  ;-1 === t.lastRequestAnimationFrameId &&
                    ((t.lastRequestAnimationFrameId =
                      t.nativeRequestAnimationFrame.call(Tt, () => {
                        t.fakeTopEventTask ||
                          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              ;(t.lastRequestAnimationFrameId = -1),
                                Ma(t),
                                Ua(t)
                            },
                            void 0,
                            () => {},
                            () => {},
                          )),
                          t.fakeTopEventTask.invoke()
                      })),
                    Ma(t))
                })(t)
              }
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, s, i, o, a) => {
                  try {
                    return Fa(t), n.invokeTask(s, i, o, a)
                  } finally {
                    ;((t.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      Ha(t)
                  }
                },
                onInvoke: (n, r, s, i, o, a, l) => {
                  try {
                    return Fa(t), n.invoke(s, i, o, a, l)
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), Ha(t)
                  }
                },
                onHasTask: (e, n, r, s) => {
                  e.hasTask(r, s),
                    n === r &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          Ma(t),
                          Ua(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask))
                },
                onHandleError: (e, n, r, s) => (
                  e.handleError(r, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              })
            })(r)
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone")
        }
        static assertInAngularZone() {
          if (!Da.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!")
        }
        static assertNotInAngularZone() {
          if (Da.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!")
        }
        run(t, e, n) {
          return this._inner.run(t, e, n)
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + r, t, Na, fo, fo)
          try {
            return s.runTask(i, e, n)
          } finally {
            s.cancelTask(i)
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n)
        }
        runOutsideAngular(t) {
          return this._outer.run(t)
        }
      }
      const Na = {}
      function Ua(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null)
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null))
              } finally {
                t.isStable = !0
              }
          }
      }
      function Ma(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection ||
            t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        )
      }
      function Fa(t) {
        t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null))
      }
      function Ha(t) {
        t._nesting--, Ua(t)
      }
      class La {
        constructor() {
          ;(this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new pa()),
            (this.onMicrotaskEmpty = new pa()),
            (this.onStable = new pa()),
            (this.onError = new pa())
        }
        run(t, e, n) {
          return t.apply(e, n)
        }
        runGuarded(t, e, n) {
          return t.apply(e, n)
        }
        runOutsideAngular(t) {
          return t()
        }
        runTask(t, e, n, r) {
          return t.apply(e, n)
        }
      }
      let $a = (() => {
          class t {
            constructor(t) {
              ;(this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone")
                })
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  ;(this._didWork = !0), (this._isZoneStable = !1)
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Da.assertNotInAngularZone(),
                        ja(() => {
                          ;(this._isZoneStable = !0),
                            this._runCallbacksIfReady()
                        })
                    },
                  })
                })
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              )
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero")
              return this._runCallbacksIfReady(), this._pendingCount
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              )
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                ja(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop()
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                  }
                  this._didWork = !1
                })
              else {
                let t = this.getPendingTasks()
                ;(this._callbacks = this._callbacks.filter(
                  e =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1),
                )),
                  (this._didWork = !0)
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(t => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : []
            }
            addCallback(t, e, n) {
              let r = -1
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  ;(this._callbacks = this._callbacks.filter(
                    t => t.timeoutId !== r,
                  )),
                    t(this._didWork, this.getPendingTasks())
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n })
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?',
                )
              this.addCallback(t, e, n), this._runCallbacksIfReady()
            }
            getPendingRequestCount() {
              return this._pendingCount
            }
            findProviders(t, e, n) {
              return []
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(Da))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        za = (() => {
          class t {
            constructor() {
              ;(this._applications = new Map()), Wa.addToWindow(this)
            }
            registerApplication(t, e) {
              this._applications.set(t, e)
            }
            unregisterApplication(t) {
              this._applications.delete(t)
            }
            unregisterAllApplications() {
              this._applications.clear()
            }
            getTestability(t) {
              return this._applications.get(t) || null
            }
            getAllTestabilities() {
              return Array.from(this._applications.values())
            }
            getAllRootElements() {
              return Array.from(this._applications.keys())
            }
            findTestabilityInTree(t, e = !0) {
              return Wa.findTestabilityInTree(this, t, e)
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)()
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })()
      class Ba {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null
        }
      }
      let qa,
        Wa = new Ba(),
        Za = !0,
        Ga = !1
      function Qa() {
        return (Ga = !0), Za
      }
      const Ka = new Nn("AllowMultipleToken")
      class Ja {
        constructor(t, e) {
          ;(this.name = t), (this.token = e)
        }
      }
      function Xa(t, e, n = []) {
        const r = `Platform: ${e}`,
          s = new Nn(r)
        return (e = []) => {
          let i = Ya()
          if (!i || i.injector.get(Ka, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }))
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: s, useValue: !0 },
                  { provide: $s, useValue: "platform" },
                )
              !(function (t) {
                if (qa && !qa.destroyed && !qa.injector.get(Ka, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one.",
                  )
                qa = t.get(tl)
                const e = t.get(va, null)
                e && e.forEach(t => t())
              })(ni.create({ providers: t, name: r }))
            }
          return (function (t) {
            const e = Ya()
            if (!e) throw new Error("No platform exists!")
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first.",
              )
            return e
          })(s)
        }
      }
      function Ya() {
        return qa && !qa.destroyed ? qa : null
      }
      let tl = (() => {
        class t {
          constructor(t) {
            ;(this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1)
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n
                return (
                  (n =
                    "noop" === t
                      ? new La()
                      : ("zone.js" === t ? void 0 : t) ||
                        new Da({
                          enableLongStackTrace: Qa(),
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  n
                )
              })(e ? e.ngZone : void 0, {
                ngZoneEventCoalescing: (e && e.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (e && e.ngZoneRunCoalescing) || !1,
              }),
              r = [{ provide: Da, useValue: n }]
            return n.run(() => {
              const e = ni.create({
                  providers: r,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                s = t.create(e),
                i = s.injector.get(lr, null)
              if (!i)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?",
                )
              return (
                n.runOutsideAngular(() => {
                  const t = n.onError.subscribe({
                    next: t => {
                      i.handleError(t)
                    },
                  })
                  s.onDestroy(() => {
                    rl(this._modules, s), t.unsubscribe()
                  })
                }),
                (function (t, e, n) {
                  try {
                    const r = n()
                    return Ci(r)
                      ? r.catch(n => {
                          throw (e.runOutsideAngular(() => t.handleError(n)), n)
                        })
                      : r
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r)
                  }
                })(i, n, () => {
                  const t = s.injector.get(ga)
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        eo(s.injector.get(Sa, Yi) || Yi),
                        this._moduleDoBootstrap(s),
                        s
                      ),
                    )
                  )
                })
              )
            })
          }
          bootstrapModule(t, e = []) {
            const n = el({}, e)
            return (function (t, e, n) {
              const r = new da(n)
              return Promise.resolve(r)
            })(0, 0, t).then(t => this.bootstrapModuleFactory(t, n))
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(nl)
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach(t => e.bootstrap(t))
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${tt(
                    t.instance.constructor,
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`,
                )
              t.instance.ngDoBootstrap(e)
            }
            this._modules.push(t)
          }
          onDestroy(t) {
            this._destroyListeners.push(t)
          }
          get injector() {
            return this._injector
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!")
            this._modules.slice().forEach(t => t.destroy()),
              this._destroyListeners.forEach(t => t()),
              (this._destroyed = !0)
          }
          get destroyed() {
            return this._destroyed
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(ni))
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      function el(t, e) {
        return Array.isArray(e)
          ? e.reduce(el, t)
          : Object.assign(Object.assign({}, t), e)
      }
      let nl = (() => {
        class t {
          constructor(t, e, n, r, s, i) {
            ;(this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick()
                    })
                  },
                }))
            const o = new _(t => {
                ;(this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete()
                  })
              }),
              a = new _(t => {
                let e
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    Da.assertNotInAngularZone(),
                      ja(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0))
                      })
                  })
                })
                const n = this._zone.onUnstable.subscribe(() => {
                  Da.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1)
                      }))
                })
                return () => {
                  e.unsubscribe(), n.unsubscribe()
                }
              })
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1]
              return (
                E(r)
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      "number" == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : "number" == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof _
                  ? t[0]
                  : z(e)(B(t, n))
              )
            })(
              o,
              a.pipe(t => {
                return q()(
                  ((e = J),
                  function (t) {
                    let n
                    n =
                      "function" == typeof e
                        ? e
                        : function () {
                            return e
                          }
                    const r = Object.create(t, Q)
                    return (r.source = t), (r.subjectFactory = n), r
                  })(t),
                )
                var e
              }),
            )
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.",
              )
            let n
            ;(n =
              t instanceof co
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType)
            const r = n.isBoundToModule ? void 0 : this._injector.get(Ko),
              s = n.create(ni.NULL, [], e || n.selector, r),
              i = s.location.nativeElement,
              o = s.injector.get($a, null),
              a = o && s.injector.get(za)
            return (
              o && a && a.registerApplication(i, o),
              s.onDestroy(() => {
                this.detachView(s.hostView),
                  rl(this.components, s),
                  a && a.unregisterApplication(i)
              }),
              this._loadComponent(s),
              Qa() &&
                this._console.log(
                  "Angular is running in development mode. Call enableProdMode() to enable production mode.",
                ),
              s
            )
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively")
            try {
              this._runningTick = !0
              for (let t of this._views) t.detectChanges()
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t),
              )
            } finally {
              this._runningTick = !1
            }
          }
          attachView(t) {
            const e = t
            this._views.push(e), e.attachToAppRef(this)
          }
          detachView(t) {
            const e = t
            rl(this._views, e), e.detachFromAppRef()
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(ba, [])
                .concat(this._bootstrapListeners)
                .forEach(e => e(t))
          }
          ngOnDestroy() {
            this._views.slice().forEach(t => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe()
          }
          get viewCount() {
            return this._views.length
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(Da), Xn(Ca), Xn(ni), Xn(lr), Xn(po), Xn(ga))
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      function rl(t, e) {
        const n = t.indexOf(e)
        n > -1 && t.splice(n, 1)
      }
      class sl {}
      class il {}
      const ol = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" }
      let al = (() => {
        class t {
          constructor(t, e) {
            ;(this._compiler = t), (this._config = e || ol)
          }
          load(t) {
            return this.loadAndCompile(t)
          }
          loadAndCompile(t) {
            let [e, r] = t.split("#")
            return (
              void 0 === r && (r = "default"),
              n("zn8P")(e)
                .then(t => t[r])
                .then(t => ll(t, e, r))
                .then(t => this._compiler.compileModuleAsync(t))
            )
          }
          loadFactory(t) {
            let [e, r] = t.split("#"),
              s = "NgFactory"
            return (
              void 0 === r && ((r = "default"), (s = "")),
              n("zn8P")(
                this._config.factoryPathPrefix +
                  e +
                  this._config.factoryPathSuffix,
              )
                .then(t => t[r + s])
                .then(t => ll(t, e, r))
            )
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(Ia), Xn(il, 8))
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      function ll(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`)
        return t
      }
      const ul = Xa(null, "core", [
          { provide: wa, useValue: "unknown" },
          { provide: tl, deps: [ni] },
          { provide: za, deps: [] },
          { provide: Ca, deps: [] },
        ]),
        cl = [
          { provide: nl, useClass: nl, deps: [Da, Ca, ni, lr, po, ga] },
          {
            provide: aa,
            deps: [Da],
            useFactory: function (t) {
              let e = []
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()()
                }),
                function (t) {
                  e.push(t)
                }
              )
            },
          },
          { provide: ga, useClass: ga, deps: [[new nr(), fa]] },
          { provide: Ia, useClass: Ia, deps: [] },
          ya,
          {
            provide: Do,
            useFactory: function () {
              return Bo
            },
            deps: [],
          },
          {
            provide: Uo,
            useFactory: function () {
              return qo
            },
            deps: [],
          },
          {
            provide: Sa,
            useFactory: function (t) {
              return (
                eo(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    Yi),
                ),
                t
              )
            },
            deps: [[new er(Sa), new nr(), new rr()]],
          },
          { provide: xa, useValue: "USD" },
        ]
      let hl = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵmod = Lt({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)(Xn(nl))
              },
              providers: cl,
            })),
            t
          )
        })(),
        dl = null
      function pl() {
        return dl
      }
      const fl = new Nn("DocumentToken")
      let gl = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)()
          }),
          (t.ɵprov = ot({ factory: ml, token: t, providedIn: "platform" })),
          t
        )
      })()
      function ml() {
        return Xn(_l)
      }
      const yl = new Nn("Location Initialized")
      let _l = (() => {
        class t extends gl {
          constructor(t) {
            super(), (this._doc = t), this._init()
          }
          _init() {
            ;(this.location = pl().getLocation()),
              (this._history = pl().getHistory())
          }
          getBaseHrefFromDOM() {
            return pl().getBaseHref(this._doc)
          }
          onPopState(t) {
            pl()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("popstate", t, !1)
          }
          onHashChange(t) {
            pl()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("hashchange", t, !1)
          }
          get href() {
            return this.location.href
          }
          get protocol() {
            return this.location.protocol
          }
          get hostname() {
            return this.location.hostname
          }
          get port() {
            return this.location.port
          }
          get pathname() {
            return this.location.pathname
          }
          get search() {
            return this.location.search
          }
          get hash() {
            return this.location.hash
          }
          set pathname(t) {
            this.location.pathname = t
          }
          pushState(t, e, n) {
            vl() ? this._history.pushState(t, e, n) : (this.location.hash = n)
          }
          replaceState(t, e, n) {
            vl()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n)
          }
          forward() {
            this._history.forward()
          }
          back() {
            this._history.back()
          }
          getState() {
            return this._history.state
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(fl))
          }),
          (t.ɵprov = ot({ factory: wl, token: t, providedIn: "platform" })),
          t
        )
      })()
      function vl() {
        return !!window.history.pushState
      }
      function wl() {
        return new _l(Xn(fl))
      }
      function bl(t, e) {
        if (0 == t.length) return e
        if (0 == e.length) return t
        let n = 0
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        )
      }
      function Cl(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n)
      }
      function Sl(t) {
        return t && "?" !== t[0] ? "?" + t : t
      }
      let xl = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)()
          }),
          (t.ɵprov = ot({ factory: El, token: t, providedIn: "root" })),
          t
        )
      })()
      function El(t) {
        const e = Xn(fl).location
        return new Al(Xn(gl), (e && e.origin) || "")
      }
      const Tl = new Nn("appBaseHref")
      let Al = (() => {
          class t extends xl {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.",
                )
              this._baseHref = e
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
            }
            getBaseHref() {
              return this._baseHref
            }
            prepareExternalUrl(t) {
              return bl(this._baseHref, t)
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  Sl(this._platformLocation.search),
                n = this._platformLocation.hash
              return n && t ? `${e}${n}` : e
            }
            pushState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + Sl(r))
              this._platformLocation.pushState(t, e, s)
            }
            replaceState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + Sl(r))
              this._platformLocation.replaceState(t, e, s)
            }
            forward() {
              this._platformLocation.forward()
            }
            back() {
              this._platformLocation.back()
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(gl), Xn(Tl, 8))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        kl = (() => {
          class t extends xl {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                null != e && (this._baseHref = e)
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t)
            }
            getBaseHref() {
              return this._baseHref
            }
            path(t = !1) {
              let e = this._platformLocation.hash
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e
            }
            prepareExternalUrl(t) {
              const e = bl(this._baseHref, t)
              return e.length > 0 ? "#" + e : e
            }
            pushState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + Sl(r))
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, s)
            }
            replaceState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + Sl(r))
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, s)
            }
            forward() {
              this._platformLocation.forward()
            }
            back() {
              this._platformLocation.back()
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(gl), Xn(Tl, 8))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        Ol = (() => {
          class t {
            constructor(t, e) {
              ;(this._subject = new pa()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t)
              const n = this._platformStrategy.getBaseHref()
              ;(this._platformLocation = e),
                (this._baseHref = Cl(Pl(n))),
                this._platformStrategy.onPopState(t => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  })
                })
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t))
            }
            getState() {
              return this._platformLocation.getState()
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + Sl(e))
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e
                })(this._baseHref, Pl(e)),
              )
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              )
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Sl(e)),
                  n,
                )
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + Sl(e)),
                  n,
                )
            }
            forward() {
              this._platformStrategy.forward()
            }
            back() {
              this._platformStrategy.back()
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe(t => {
                    this._notifyUrlChangeListeners(t.url, t.state)
                  }))
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach(n => n(t, e))
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({ next: t, error: e, complete: n })
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(xl), Xn(gl))
            }),
            (t.normalizeQueryParams = Sl),
            (t.joinWithSlash = bl),
            (t.stripTrailingSlash = Cl),
            (t.ɵprov = ot({ factory: Rl, token: t, providedIn: "root" })),
            t
          )
        })()
      function Rl() {
        return new Ol(Xn(xl), Xn(gl))
      }
      function Pl(t) {
        return t.replace(/\/index.html$/, "")
      }
      var Il = (function (t) {
        return (
          (t[(t.Zero = 0)] = "Zero"),
          (t[(t.One = 1)] = "One"),
          (t[(t.Two = 2)] = "Two"),
          (t[(t.Few = 3)] = "Few"),
          (t[(t.Many = 4)] = "Many"),
          (t[(t.Other = 5)] = "Other"),
          t
        )
      })({})
      class Vl {}
      let jl = (() => {
        class t extends Vl {
          constructor(t) {
            super(), (this.locale = t)
          }
          getPluralCategory(t, e) {
            switch (
              (function (t) {
                return (function (t) {
                  const e = (function (t) {
                    return t.toLowerCase().replace(/_/g, "-")
                  })(t)
                  let n = Ji(e)
                  if (n) return n
                  const r = e.split("-")[0]
                  if (((n = Ji(r)), n)) return n
                  if ("en" === r) return Qi
                  throw new Error(`Missing locale data for the locale "${t}".`)
                })(t)[Xi.PluralCase]
              })(e || this.locale)(t)
            ) {
              case Il.Zero:
                return "zero"
              case Il.One:
                return "one"
              case Il.Two:
                return "two"
              case Il.Few:
                return "few"
              case Il.Many:
                return "many"
              default:
                return "other"
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(Sa))
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      function Dl(t, e) {
        e = encodeURIComponent(e)
        for (const n of t.split(";")) {
          const t = n.indexOf("="),
            [r, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)]
          if (r.trim() === e) return decodeURIComponent(s)
        }
        return null
      }
      class Nl {
        constructor(t, e, n, r) {
          ;(this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = r)
        }
        get first() {
          return 0 === this.index
        }
        get last() {
          return this.index === this.count - 1
        }
        get even() {
          return this.index % 2 == 0
        }
        get odd() {
          return !this.even
        }
      }
      let Ul = (() => {
        class t {
          constructor(t, e, n) {
            ;(this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null)
          }
          set ngForOf(t) {
            ;(this._ngForOf = t), (this._ngForOfDirty = !0)
          }
          set ngForTrackBy(t) {
            this._trackByFn = t
          }
          get ngForTrackBy() {
            return this._trackByFn
          }
          set ngForTemplate(t) {
            t && (this._template = t)
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1
              const n = this._ngForOf
              if (!this._differ && n)
                try {
                  this._differ = this._differs.find(n).create(this.ngForTrackBy)
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`,
                  )
                }
            }
            var t
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf)
              t && this._applyChanges(t)
            }
          }
          _applyChanges(t) {
            const e = []
            t.forEachOperation((t, n, r) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new Nl(null, this._ngForOf, -1, -1),
                    null === r ? void 0 : r,
                  ),
                  s = new Ml(t, n)
                e.push(s)
              } else if (null == r)
                this._viewContainer.remove(null === n ? void 0 : n)
              else if (null !== n) {
                const s = this._viewContainer.get(n)
                this._viewContainer.move(s, r)
                const i = new Ml(t, s)
                e.push(i)
              }
            })
            for (let n = 0; n < e.length; n++)
              this._perViewChange(e[n].view, e[n].record)
            for (let n = 0, r = this._viewContainer.length; n < r; n++) {
              const t = this._viewContainer.get(n)
              ;(t.context.index = n),
                (t.context.count = r),
                (t.context.ngForOf = this._ngForOf)
            }
            t.forEachIdentityChange(t => {
              this._viewContainer.get(t.currentIndex).context.$implicit = t.item
            })
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item
          }
          static ngTemplateContextGuard(t, e) {
            return !0
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(gi(Yo), gi(Zo), gi(Do))
          }),
          (t.ɵdir = zt({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        )
      })()
      class Ml {
        constructor(t, e) {
          ;(this.record = t), (this.view = e)
        }
      }
      let Fl = (() => {
          class t {}
          return (
            (t.ɵmod = Lt({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)()
              },
              providers: [{ provide: Vl, useClass: jl }],
            })),
            t
          )
        })(),
        Hl = (() => {
          class t {}
          return (
            (t.ɵprov = ot({
              token: t,
              providedIn: "root",
              factory: () => new Ll(Xn(fl), window),
            })),
            t
          )
        })()
      class Ll {
        constructor(t, e) {
          ;(this.document = t), (this.window = e), (this.offset = () => [0, 0])
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0]
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1])
        }
        scrollToAnchor(t) {
          var e
          if (!this.supportsScrolling()) return
          const n =
            null !== (e = this.document.getElementById(t)) && void 0 !== e
              ? e
              : this.document.getElementsByName(t)[0]
          void 0 !== n && (this.scrollToElement(n), this.attemptFocus(n))
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history
            e && e.scrollRestoration && (e.scrollRestoration = t)
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset()
          this.window.scrollTo(n - s[0], r - s[1])
        }
        attemptFocus(t) {
          return t.focus(), this.document.activeElement === t
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1
            const t =
              $l(this.window.history) ||
              $l(Object.getPrototypeOf(this.window.history))
            return !(!t || (!t.writable && !t.set))
          } catch (t) {
            return !1
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            )
          } catch (t) {
            return !1
          }
        }
      }
      function $l(t) {
        return Object.getOwnPropertyDescriptor(t, "scrollRestoration")
      }
      class zl extends class extends class {} {
        constructor() {
          super()
        }
        supportsDOMEvents() {
          return !0
        }
      } {
        static makeCurrent() {
          var t
          ;(t = new zl()), dl || (dl = t)
        }
        getProperty(t, e) {
          return t[e]
        }
        log(t) {
          window.console && window.console.log && window.console.log(t)
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t)
        }
        logGroupEnd() {
          window.console && window.console.groupEnd && window.console.groupEnd()
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1)
            }
          )
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e)
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t
        }
        getValue(t) {
          return t.value
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t)
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle")
        }
        getDefaultDocument() {
          return document
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null
        }
        getHistory() {
          return window.history
        }
        getLocation() {
          return window.location
        }
        getBaseHref(t) {
          const e =
            ql || ((ql = document.querySelector("base")), ql)
              ? ql.getAttribute("href")
              : null
          return null == e
            ? null
            : ((n = e),
              Bl || (Bl = document.createElement("a")),
              Bl.setAttribute("href", n),
              "/" === Bl.pathname.charAt(0) ? Bl.pathname : "/" + Bl.pathname)
          var n
        }
        resetBaseElement() {
          ql = null
        }
        getUserAgent() {
          return window.navigator.userAgent
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime()
        }
        supportsCookies() {
          return !0
        }
        getCookie(t) {
          return Dl(document.cookie, t)
        }
      }
      let Bl,
        ql = null
      const Wl = new Nn("TRANSITION_ID"),
        Zl = [
          {
            provide: fa,
            useFactory: function (t, e, n) {
              return () => {
                n.get(ga).donePromise.then(() => {
                  const n = pl()
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter(e => e.getAttribute("ng-transition") === t)
                    .forEach(t => n.remove(t))
                })
              }
            },
            deps: [Wl, fl, ni],
            multi: !0,
          },
        ]
      class Gl {
        static init() {
          var t
          ;(t = new Gl()), (Wa = t)
        }
        addToWindow(t) {
          ;(Tt.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n)
            if (null == r)
              throw new Error("Could not find testability for element.")
            return r
          }),
            (Tt.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Tt.getAllAngularRootElements = () => t.getAllRootElements()),
            Tt.frameworkStabilizers || (Tt.frameworkStabilizers = []),
            Tt.frameworkStabilizers.push(t => {
              const e = Tt.getAllAngularTestabilities()
              let n = e.length,
                r = !1
              const s = function (e) {
                ;(r = r || e), n--, 0 == n && t(r)
              }
              e.forEach(function (t) {
                t.whenStable(s)
              })
            })
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null
          const r = t.getTestability(e)
          return null != r
            ? r
            : n
            ? pl().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null
        }
      }
      const Ql = new Nn("EventManagerPlugins")
      let Kl = (() => {
        class t {
          constructor(t, e) {
            ;(this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach(t => (t.manager = this)),
              (this._plugins = t.slice().reverse())
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n)
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n)
          }
          getZone() {
            return this._zone
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t)
            if (e) return e
            const n = this._plugins
            for (let r = 0; r < n.length; r++) {
              const e = n[r]
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e
            }
            throw new Error(`No event manager plugin found for event ${t}`)
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(Ql), Xn(Da))
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      class Jl {
        constructor(t) {
          this._doc = t
        }
        addGlobalEventListener(t, e, n) {
          const r = pl().getGlobalEventTarget(this._doc, t)
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`)
          return this.addEventListener(r, e, n)
        }
      }
      let Xl = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set()
            }
            addStyles(t) {
              const e = new Set()
              t.forEach(t => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t))
              }),
                this.onStylesAdded(e)
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet)
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)()
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        Yl = (() => {
          class t extends Xl {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head)
            }
            _addStylesToHost(t, e) {
              t.forEach(t => {
                const n = this._doc.createElement("style")
                ;(n.textContent = t), this._styleNodes.add(e.appendChild(n))
              })
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t)
            }
            removeHost(t) {
              this._hostNodes.delete(t)
            }
            onStylesAdded(t) {
              this._hostNodes.forEach(e => this._addStylesToHost(t, e))
            }
            ngOnDestroy() {
              this._styleNodes.forEach(t => pl().remove(t))
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(fl))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })()
      const tu = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        eu = /%COMP%/g
      function nu(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r]
          Array.isArray(s) ? nu(t, s, n) : ((s = s.replace(eu, t)), n.push(s))
        }
        return n
      }
      function ru(t) {
        return e => {
          if ("__ngUnwrap__" === e) return t
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1))
        }
      }
      let su = (() => {
        class t {
          constructor(t, e, n) {
            ;(this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new iu(t))
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer
            switch (e.encapsulation) {
              case bt.Emulated: {
                let n = this.rendererByCompId.get(e.id)
                return (
                  n ||
                    ((n = new ou(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId,
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                )
              }
              case 1:
              case bt.ShadowDom:
                return new au(this.eventManager, this.sharedStylesHost, t, e)
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = nu(e.id, e.styles, [])
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer)
                }
                return this.defaultRenderer
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(Kl), Xn(Yl), Xn(ma))
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      class iu {
        constructor(t) {
          ;(this.eventManager = t), (this.data = Object.create(null))
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(tu[e] || e, t)
            : document.createElement(t)
        }
        createComment(t) {
          return document.createComment(t)
        }
        createText(t) {
          return document.createTextNode(t)
        }
        appendChild(t, e) {
          t.appendChild(e)
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n)
        }
        removeChild(t, e) {
          t && t.removeChild(e)
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`)
          return e || (n.textContent = ""), n
        }
        parentNode(t) {
          return t.parentNode
        }
        nextSibling(t) {
          return t.nextSibling
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ":" + e
            const s = tu[r]
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n)
          } else t.setAttribute(e, n)
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = tu[n]
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`)
          } else t.removeAttribute(e)
        }
        addClass(t, e) {
          t.classList.add(e)
        }
        removeClass(t, e) {
          t.classList.remove(e)
        }
        setStyle(t, e, n, r) {
          r & (dr.DashCase | dr.Important)
            ? t.style.setProperty(e, n, r & dr.Important ? "important" : "")
            : (t.style[e] = n)
        }
        removeStyle(t, e, n) {
          n & dr.DashCase ? t.style.removeProperty(e) : (t.style[e] = "")
        }
        setProperty(t, e, n) {
          t[e] = n
        }
        setValue(t, e) {
          t.nodeValue = e
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, ru(n))
            : this.eventManager.addEventListener(t, e, ru(n))
        }
      }
      class ou extends iu {
        constructor(t, e, n, r) {
          super(t), (this.component = n)
          const s = nu(r + "-" + n.id, n.styles, [])
          e.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              eu,
              r + "-" + n.id,
            )),
            (this.hostAttr = "_nghost-%COMP%".replace(eu, r + "-" + n.id))
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "")
        }
        createElement(t, e) {
          const n = super.createElement(t, e)
          return super.setAttribute(n, this.contentAttr, ""), n
        }
      }
      class au extends iu {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot)
          const s = nu(r.id, r.styles, [])
          for (let i = 0; i < s.length; i++) {
            const t = document.createElement("style")
            ;(t.textContent = s[i]), this.shadowRoot.appendChild(t)
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot)
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e)
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n)
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e)
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t)),
          )
        }
      }
      let lu = (() => {
        class t extends Jl {
          constructor(t) {
            super(t)
          }
          supports(t) {
            return !0
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            )
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n)
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(fl))
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const uu = ["alt", "control", "meta", "shift"],
        cu = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        hu = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        du = {
          alt: t => t.altKey,
          control: t => t.ctrlKey,
          meta: t => t.metaKey,
          shift: t => t.shiftKey,
        }
      let pu = (() => {
        class t extends Jl {
          constructor(t) {
            super(t)
          }
          supports(e) {
            return null != t.parseEventName(e)
          }
          addEventListener(e, n, r) {
            const s = t.parseEventName(n),
              i = t.eventCallback(s.fullKey, r, this.manager.getZone())
            return this.manager
              .getZone()
              .runOutsideAngular(() => pl().onAndCancel(e, s.domEventName, i))
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split("."),
              r = n.shift()
            if (0 === n.length || ("keydown" !== r && "keyup" !== r))
              return null
            const s = t._normalizeKey(n.pop())
            let i = ""
            if (
              (uu.forEach(t => {
                const e = n.indexOf(t)
                e > -1 && (n.splice(e, 1), (i += t + "."))
              }),
              (i += s),
              0 != n.length || 0 === s.length)
            )
              return null
            const o = {}
            return (o.domEventName = r), (o.fullKey = i), o
          }
          static getEventFullKey(t) {
            let e = "",
              n = (function (t) {
                let e = t.key
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified"
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && hu.hasOwnProperty(e) && (e = hu[e]))
                }
                return cu[e] || e
              })(t)
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              uu.forEach(r => {
                r != n && (0, du[r])(t) && (e += r + ".")
              }),
              (e += n),
              e
            )
          }
          static eventCallback(e, n, r) {
            return s => {
              t.getEventFullKey(s) === e && r.runGuarded(() => n(s))
            }
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape"
              default:
                return t
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(fl))
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const fu = Xa(ul, "browser", [
          { provide: wa, useValue: "browser" },
          {
            provide: va,
            useValue: function () {
              zl.makeCurrent(), Gl.init()
            },
            multi: !0,
          },
          {
            provide: fl,
            useFactory: function () {
              return (
                (function (t) {
                  he = t
                })(document),
                document
              )
            },
            deps: [],
          },
        ]),
        gu = [
          [],
          { provide: $s, useValue: "root" },
          {
            provide: lr,
            useFactory: function () {
              return new lr()
            },
            deps: [],
          },
          { provide: Ql, useClass: lu, multi: !0, deps: [fl, Da, wa] },
          { provide: Ql, useClass: pu, multi: !0, deps: [fl] },
          [],
          { provide: su, useClass: su, deps: [Kl, Yl, ma] },
          { provide: _o, useExisting: su },
          { provide: Xl, useExisting: Yl },
          { provide: Yl, useClass: Yl, deps: [fl] },
          { provide: $a, useClass: $a, deps: [Da] },
          { provide: Kl, useClass: Kl, deps: [Ql, Da] },
          [],
        ]
      let mu = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.",
              )
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: ma, useValue: e.appId },
                { provide: Wl, useExisting: ma },
                Zl,
              ],
            }
          }
        }
        return (
          (t.ɵmod = Lt({ type: t })),
          (t.ɵinj = at({
            factory: function (e) {
              return new (e || t)(Xn(t, 12))
            },
            providers: gu,
            imports: [Fl, hl],
          })),
          t
        )
      })()
      function yu(...t) {
        let e = t[t.length - 1]
        return E(e) ? (t.pop(), D(t, e)) : B(t)
      }
      "undefined" != typeof window && window
      class _u extends S {
        constructor(t) {
          super(), (this._value = t)
        }
        get value() {
          return this.getValue()
        }
        _subscribe(t) {
          const e = super._subscribe(t)
          return e && !e.closed && t.next(this._value), e
        }
        getValue() {
          if (this.hasError) throw this.thrownError
          if (this.closed) throw new w()
          return this._value
        }
        next(t) {
          super.next((this._value = t))
        }
      }
      class vu extends f {
        notifyNext(t, e, n, r, s) {
          this.destination.next(e)
        }
        notifyError(t, e) {
          this.destination.error(t)
        }
        notifyComplete(t) {
          this.destination.complete()
        }
      }
      class wu extends f {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0)
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this,
          )
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe()
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe()
        }
      }
      function bu(t, e, n, r, s = new wu(t, n, r)) {
        if (!s.closed) return e instanceof _ ? e.subscribe(s) : j(e)(s)
      }
      const Cu = {}
      class Su {
        constructor(t) {
          this.resultSelector = t
        }
        call(t, e) {
          return e.subscribe(new xu(t, this.resultSelector))
        }
      }
      class xu extends vu {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = [])
        }
        _next(t) {
          this.values.push(Cu), this.observables.push(t)
        }
        _complete() {
          const t = this.observables,
            e = t.length
          if (0 === e) this.destination.complete()
          else {
            ;(this.active = e), (this.toRespond = e)
            for (let n = 0; n < e; n++) this.add(bu(this, t[n], void 0, n))
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete()
        }
        notifyNext(t, e, n) {
          const r = this.values,
            s = this.toRespond
              ? r[n] === Cu
                ? --this.toRespond
                : this.toRespond
              : 0
          ;(r[n] = e),
            0 === s &&
              (this.resultSelector
                ? this._tryResultSelector(r)
                : this.destination.next(r.slice()))
        }
        _tryResultSelector(t) {
          let e
          try {
            e = this.resultSelector.apply(this, t)
          } catch (n) {
            return void this.destination.error(n)
          }
          this.destination.next(e)
        }
      }
      const Eu = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "no elements in sequence"),
            (this.name = "EmptyError"),
            this
          )
        }
        return (t.prototype = Object.create(Error.prototype)), t
      })()
      function Tu(...t) {
        return z(1)(yu(...t))
      }
      const Au = new _(t => t.complete())
      function ku(t) {
        return t
          ? (function (t) {
              return new _(e => t.schedule(() => e.complete()))
            })(t)
          : Au
      }
      function Ou(t) {
        return new _(e => {
          let n
          try {
            n = t()
          } catch (r) {
            return void e.error(r)
          }
          return (n ? N(n) : ku()).subscribe(e)
        })
      }
      function Ru(t, e) {
        return "function" == typeof e
          ? n =>
              n.pipe(Ru((n, r) => N(t(n, r)).pipe(T((t, s) => e(n, t, r, s)))))
          : e => e.lift(new Pu(t))
      }
      class Pu {
        constructor(t) {
          this.project = t
        }
        call(t, e) {
          return e.subscribe(new Iu(t, this.project))
        }
      }
      class Iu extends M {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0)
        }
        _next(t) {
          let e
          const n = this.index++
          try {
            e = this.project(t, n)
          } catch (r) {
            return void this.destination.error(r)
          }
          this._innerSub(e)
        }
        _innerSub(t) {
          const e = this.innerSubscription
          e && e.unsubscribe()
          const n = new U(this),
            r = this.destination
          r.add(n),
            (this.innerSubscription = F(t, n)),
            this.innerSubscription !== n && r.add(this.innerSubscription)
        }
        _complete() {
          const { innerSubscription: t } = this
          ;(t && !t.closed) || super._complete(), this.unsubscribe()
        }
        _unsubscribe() {
          this.innerSubscription = void 0
        }
        notifyComplete() {
          ;(this.innerSubscription = void 0),
            this.isStopped && super._complete()
        }
        notifyNext(t) {
          this.destination.next(t)
        }
      }
      const Vu = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          )
        }
        return (t.prototype = Object.create(Error.prototype)), t
      })()
      function ju(t) {
        return e => (0 === t ? ku() : e.lift(new Du(t)))
      }
      class Du {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Vu()
        }
        call(t, e) {
          return e.subscribe(new Nu(t, this.total))
        }
      }
      class Nu extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0)
        }
        _next(t) {
          const e = this.total,
            n = ++this.count
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()))
        }
      }
      function Uu(t, e) {
        let n = !1
        return (
          arguments.length >= 2 && (n = !0),
          function (r) {
            return r.lift(new Mu(t, e, n))
          }
        )
      }
      class Mu {
        constructor(t, e, n = !1) {
          ;(this.accumulator = t), (this.seed = e), (this.hasSeed = n)
        }
        call(t, e) {
          return e.subscribe(
            new Fu(t, this.accumulator, this.seed, this.hasSeed),
          )
        }
      }
      class Fu extends f {
        constructor(t, e, n, r) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = r),
            (this.index = 0)
        }
        get seed() {
          return this._seed
        }
        set seed(t) {
          ;(this.hasSeed = !0), (this._seed = t)
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t)
          ;(this.seed = t), this.destination.next(t)
        }
        _tryNext(t) {
          const e = this.index++
          let n
          try {
            n = this.accumulator(this.seed, t, e)
          } catch (r) {
            this.destination.error(r)
          }
          ;(this.seed = n), this.destination.next(n)
        }
      }
      function Hu(t, e) {
        return function (n) {
          return n.lift(new Lu(t, e))
        }
      }
      class Lu {
        constructor(t, e) {
          ;(this.predicate = t), (this.thisArg = e)
        }
        call(t, e) {
          return e.subscribe(new $u(t, this.predicate, this.thisArg))
        }
      }
      class $u extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0)
        }
        _next(t) {
          let e
          try {
            e = this.predicate.call(this.thisArg, t, this.count++)
          } catch (n) {
            return void this.destination.error(n)
          }
          e && this.destination.next(t)
        }
      }
      function zu(t) {
        return function (e) {
          const n = new Bu(t),
            r = e.lift(n)
          return (n.caught = r)
        }
      }
      class Bu {
        constructor(t) {
          this.selector = t
        }
        call(t, e) {
          return e.subscribe(new qu(t, this.selector, this.caught))
        }
      }
      class qu extends M {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n)
        }
        error(t) {
          if (!this.isStopped) {
            let n
            try {
              n = this.selector(t, this.caught)
            } catch (e) {
              return void super.error(e)
            }
            this._unsubscribeAndRecycle()
            const r = new U(this)
            this.add(r)
            const s = F(n, r)
            s !== r && this.add(s)
          }
        }
      }
      function Wu(t, e) {
        return H(t, e, 1)
      }
      function Zu(t) {
        return function (e) {
          return 0 === t ? ku() : e.lift(new Gu(t))
        }
      }
      class Gu {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new Vu()
        }
        call(t, e) {
          return e.subscribe(new Qu(t, this.total))
        }
      }
      class Qu extends f {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0)
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++
          e.length < n ? e.push(t) : (e[r % n] = t)
        }
        _complete() {
          const t = this.destination
          let e = this.count
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring
            for (let s = 0; s < n; s++) {
              const s = e++ % n
              t.next(r[s])
            }
          }
          t.complete()
        }
      }
      function Ku(t = Yu) {
        return e => e.lift(new Ju(t))
      }
      class Ju {
        constructor(t) {
          this.errorFactory = t
        }
        call(t, e) {
          return e.subscribe(new Xu(t, this.errorFactory))
        }
      }
      class Xu extends f {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1)
        }
        _next(t) {
          ;(this.hasValue = !0), this.destination.next(t)
        }
        _complete() {
          if (this.hasValue) return this.destination.complete()
          {
            let e
            try {
              e = this.errorFactory()
            } catch (t) {
              e = t
            }
            this.destination.error(e)
          }
        }
      }
      function Yu() {
        return new Eu()
      }
      function tc(t = null) {
        return e => e.lift(new ec(t))
      }
      class ec {
        constructor(t) {
          this.defaultValue = t
        }
        call(t, e) {
          return e.subscribe(new nc(t, this.defaultValue))
        }
      }
      class nc extends f {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0)
        }
        _next(t) {
          ;(this.isEmpty = !1), this.destination.next(t)
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete()
        }
      }
      function rc(t, e) {
        const n = arguments.length >= 2
        return r =>
          r.pipe(
            t ? Hu((e, n) => t(e, n, r)) : y,
            ju(1),
            n ? tc(e) : Ku(() => new Eu()),
          )
      }
      function sc() {}
      function ic(t, e, n) {
        return function (r) {
          return r.lift(new oc(t, e, n))
        }
      }
      class oc {
        constructor(t, e, n) {
          ;(this.nextOrObserver = t), (this.error = e), (this.complete = n)
        }
        call(t, e) {
          return e.subscribe(
            new ac(t, this.nextOrObserver, this.error, this.complete),
          )
        }
      }
      class ac extends f {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = sc),
            (this._tapError = sc),
            (this._tapComplete = sc),
            (this._tapError = n || sc),
            (this._tapComplete = s || sc),
            r(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || sc),
                (this._tapError = e.error || sc),
                (this._tapComplete = e.complete || sc))
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t)
          } catch (e) {
            return void this.destination.error(e)
          }
          this.destination.next(t)
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t)
          } catch (t) {
            return void this.destination.error(t)
          }
          this.destination.error(t)
        }
        _complete() {
          try {
            this._tapComplete.call(this._context)
          } catch (t) {
            return void this.destination.error(t)
          }
          return this.destination.complete()
        }
      }
      class lc {
        constructor(t) {
          this.callback = t
        }
        call(t, e) {
          return e.subscribe(new uc(t, this.callback))
        }
      }
      class uc extends f {
        constructor(t, e) {
          super(t), this.add(new h(e))
        }
      }
      class cc {
        constructor(t, e) {
          ;(this.id = t), (this.url = e)
        }
      }
      class hc extends cc {
        constructor(t, e, n = "imperative", r = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = r)
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`
        }
      }
      class dc extends cc {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n)
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
        }
      }
      class pc extends cc {
        constructor(t, e, n) {
          super(t, e), (this.reason = n)
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
        }
      }
      class fc extends cc {
        constructor(t, e, n) {
          super(t, e), (this.error = n)
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
        }
      }
      class gc extends cc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r)
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class mc extends cc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r)
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class yc extends cc {
        constructor(t, e, n, r, s) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = r),
            (this.shouldActivate = s)
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
        }
      }
      class _c extends cc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r)
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class vc extends cc {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r)
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
        }
      }
      class wc {
        constructor(t) {
          this.route = t
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`
        }
      }
      class bc {
        constructor(t) {
          this.route = t
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`
        }
      }
      class Cc {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`
        }
      }
      class Sc {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`
        }
      }
      class xc {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`
        }
      }
      class Ec {
        constructor(t) {
          this.snapshot = t
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`
        }
      }
      class Tc {
        constructor(t, e, n) {
          ;(this.routerEvent = t), (this.position = e), (this.anchor = n)
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`
        }
      }
      const Ac = "primary"
      class kc {
        constructor(t) {
          this.params = t || {}
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t)
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t]
            return Array.isArray(e) ? e[0] : e
          }
          return null
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t]
            return Array.isArray(e) ? e : [e]
          }
          return []
        }
        get keys() {
          return Object.keys(this.params)
        }
      }
      function Oc(t) {
        return new kc(t)
      }
      function Rc(t) {
        const e = Error("NavigationCancelingError: " + t)
        return (e.ngNavigationCancelingError = !0), e
      }
      function Pc(t, e, n) {
        const r = n.path.split("/")
        if (r.length > t.length) return null
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
          return null
        const s = {}
        for (let i = 0; i < r.length; i++) {
          const e = r[i],
            n = t[i]
          if (e.startsWith(":")) s[e.substring(1)] = n
          else if (e !== n.path) return null
        }
        return { consumed: t.slice(0, r.length), posParams: s }
      }
      function Ic(t, e) {
        const n = Object.keys(t),
          r = Object.keys(e)
        if (!n || !r || n.length != r.length) return !1
        let s
        for (let i = 0; i < n.length; i++)
          if (((s = n[i]), !Vc(t[s], e[s]))) return !1
        return !0
      }
      function Vc(t, e) {
        if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1
          const n = [...t].sort(),
            r = [...e].sort()
          return n.every((t, e) => r[e] === t)
        }
        return t === e
      }
      function jc(t) {
        return Array.prototype.concat.apply([], t)
      }
      function Dc(t) {
        return t.length > 0 ? t[t.length - 1] : null
      }
      function Nc(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n)
      }
      function Uc(t) {
        return Si(t) ? t : Ci(t) ? N(Promise.resolve(t)) : yu(t)
      }
      function Mc(t, e, n) {
        return n
          ? (function (t, e) {
              return Ic(t, e)
            })(t.queryParams, e.queryParams) && Fc(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every(n => Vc(t[n], e[n]))
              )
            })(t.queryParams, e.queryParams) && Hc(t.root, e.root)
      }
      function Fc(t, e) {
        if (!qc(t.segments, e.segments)) return !1
        if (t.numberOfChildren !== e.numberOfChildren) return !1
        for (const n in e.children) {
          if (!t.children[n]) return !1
          if (!Fc(t.children[n], e.children[n])) return !1
        }
        return !0
      }
      function Hc(t, e) {
        return Lc(t, e, e.segments)
      }
      function Lc(t, e, n) {
        if (t.segments.length > n.length)
          return !!qc(t.segments.slice(0, n.length), n) && !e.hasChildren()
        if (t.segments.length === n.length) {
          if (!qc(t.segments, n)) return !1
          for (const n in e.children) {
            if (!t.children[n]) return !1
            if (!Hc(t.children[n], e.children[n])) return !1
          }
          return !0
        }
        {
          const r = n.slice(0, t.segments.length),
            s = n.slice(t.segments.length)
          return (
            !!qc(t.segments, r) &&
            !!t.children.primary &&
            Lc(t.children.primary, e, s)
          )
        }
      }
      class $c {
        constructor(t, e, n) {
          ;(this.root = t), (this.queryParams = e), (this.fragment = n)
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Oc(this.queryParams)),
            this._queryParamMap
          )
        }
        toString() {
          return Gc.serialize(this)
        }
      }
      class zc {
        constructor(t, e) {
          ;(this.segments = t),
            (this.children = e),
            (this.parent = null),
            Nc(e, (t, e) => (t.parent = this))
        }
        hasChildren() {
          return this.numberOfChildren > 0
        }
        get numberOfChildren() {
          return Object.keys(this.children).length
        }
        toString() {
          return Qc(this)
        }
      }
      class Bc {
        constructor(t, e) {
          ;(this.path = t), (this.parameters = e)
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Oc(this.parameters)),
            this._parameterMap
          )
        }
        toString() {
          return nh(this)
        }
      }
      function qc(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path)
      }
      class Wc {}
      class Zc {
        parse(t) {
          const e = new ah(t)
          return new $c(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment(),
          )
        }
        serialize(t) {
          var e
          return `/${Kc(t.root, !0)}${(function (t) {
            const e = Object.keys(t).map(e => {
              const n = t[e]
              return Array.isArray(n)
                ? n.map(t => `${Xc(e)}=${Xc(t)}`).join("&")
                : `${Xc(e)}=${Xc(n)}`
            })
            return e.length ? `?${e.join("&")}` : ""
          })(t.queryParams)}${
            "string" == typeof t.fragment
              ? `#${((e = t.fragment), encodeURI(e))}`
              : ""
          }`
        }
      }
      const Gc = new Zc()
      function Qc(t) {
        return t.segments.map(t => nh(t)).join("/")
      }
      function Kc(t, e) {
        if (!t.hasChildren()) return Qc(t)
        if (e) {
          const e = t.children.primary ? Kc(t.children.primary, !1) : "",
            n = []
          return (
            Nc(t.children, (t, e) => {
              e !== Ac && n.push(`${e}:${Kc(t, !1)}`)
            }),
            n.length > 0 ? `${e}(${n.join("//")})` : e
          )
        }
        {
          const e = (function (t, e) {
            let n = []
            return (
              Nc(t.children, (t, r) => {
                r === Ac && (n = n.concat(e(t, r)))
              }),
              Nc(t.children, (t, r) => {
                r !== Ac && (n = n.concat(e(t, r)))
              }),
              n
            )
          })(t, (e, n) =>
            n === Ac ? [Kc(t.children.primary, !1)] : [`${n}:${Kc(e, !1)}`],
          )
          return 1 === Object.keys(t.children).length &&
            null != t.children.primary
            ? `${Qc(t)}/${e[0]}`
            : `${Qc(t)}/(${e.join("//")})`
        }
      }
      function Jc(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",")
      }
      function Xc(t) {
        return Jc(t).replace(/%3B/gi, ";")
      }
      function Yc(t) {
        return Jc(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&")
      }
      function th(t) {
        return decodeURIComponent(t)
      }
      function eh(t) {
        return th(t.replace(/\+/g, "%20"))
      }
      function nh(t) {
        return `${Yc(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map(t => `;${Yc(t)}=${Yc(e[t])}`)
            .join(""))
        }`
        var e
      }
      const rh = /^[^\/()?;=#]+/
      function sh(t) {
        const e = t.match(rh)
        return e ? e[0] : ""
      }
      const ih = /^[^=?&#]+/,
        oh = /^[^?&#]+/
      class ah {
        constructor(t) {
          ;(this.url = t), (this.remaining = t)
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new zc([], {})
              : new zc([], this.parseChildren())
          )
        }
        parseQueryParams() {
          const t = {}
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t)
            } while (this.consumeOptional("&"))
          return t
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null
        }
        parseChildren() {
          if ("" === this.remaining) return {}
          this.consumeOptional("/")
          const t = []
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment())
          let e = {}
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)))
          let n = {}
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n.primary = new zc(t, e)),
            n
          )
        }
        parseSegment() {
          const t = sh(this.remaining)
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`,
            )
          return this.capture(t), new Bc(th(t), this.parseMatrixParams())
        }
        parseMatrixParams() {
          const t = {}
          for (; this.consumeOptional(";"); ) this.parseParam(t)
          return t
        }
        parseParam(t) {
          const e = sh(this.remaining)
          if (!e) return
          this.capture(e)
          let n = ""
          if (this.consumeOptional("=")) {
            const t = sh(this.remaining)
            t && ((n = t), this.capture(n))
          }
          t[th(e)] = th(n)
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(ih)
            return e ? e[0] : ""
          })(this.remaining)
          if (!e) return
          this.capture(e)
          let n = ""
          if (this.consumeOptional("=")) {
            const t = (function (t) {
              const e = t.match(oh)
              return e ? e[0] : ""
            })(this.remaining)
            t && ((n = t), this.capture(n))
          }
          const r = eh(e),
            s = eh(n)
          if (t.hasOwnProperty(r)) {
            let e = t[r]
            Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s)
          } else t[r] = s
        }
        parseParens(t) {
          const e = {}
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = sh(this.remaining),
              r = this.remaining[n.length]
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`)
            let s
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = Ac)
            const i = this.parseChildren()
            ;(e[s] = 1 === Object.keys(i).length ? i.primary : new zc([], i)),
              this.consumeOptional("//")
          }
          return e
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t)
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          )
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`)
        }
      }
      class lh {
        constructor(t) {
          this._root = t
        }
        get root() {
          return this._root.value
        }
        parent(t) {
          const e = this.pathFromRoot(t)
          return e.length > 1 ? e[e.length - 2] : null
        }
        children(t) {
          const e = uh(t, this._root)
          return e ? e.children.map(t => t.value) : []
        }
        firstChild(t) {
          const e = uh(t, this._root)
          return e && e.children.length > 0 ? e.children[0].value : null
        }
        siblings(t) {
          const e = ch(t, this._root)
          return e.length < 2
            ? []
            : e[e.length - 2].children.map(t => t.value).filter(e => e !== t)
        }
        pathFromRoot(t) {
          return ch(t, this._root).map(t => t.value)
        }
      }
      function uh(t, e) {
        if (t === e.value) return e
        for (const n of e.children) {
          const e = uh(t, n)
          if (e) return e
        }
        return null
      }
      function ch(t, e) {
        if (t === e.value) return [e]
        for (const n of e.children) {
          const r = ch(t, n)
          if (r.length) return r.unshift(e), r
        }
        return []
      }
      class hh {
        constructor(t, e) {
          ;(this.value = t), (this.children = e)
        }
        toString() {
          return `TreeNode(${this.value})`
        }
      }
      function dh(t) {
        const e = {}
        return t && t.children.forEach(t => (e[t.value.outlet] = t)), e
      }
      class ph extends lh {
        constructor(t, e) {
          super(t), (this.snapshot = e), vh(this, t)
        }
        toString() {
          return this.snapshot.toString()
        }
      }
      function fh(t, e) {
        const n = (function (t, e) {
            const n = new yh([], {}, {}, "", {}, Ac, e, null, t.root, -1, {})
            return new _h("", new hh(n, []))
          })(t, e),
          r = new _u([new Bc("", {})]),
          s = new _u({}),
          i = new _u({}),
          o = new _u({}),
          a = new _u(""),
          l = new gh(r, s, o, a, i, Ac, e, n.root)
        return (l.snapshot = n.root), new ph(new hh(l, []), n)
      }
      class gh {
        constructor(t, e, n, r, s, i, o, a) {
          ;(this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this._futureSnapshot = a)
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig
        }
        get root() {
          return this._routerState.root
        }
        get parent() {
          return this._routerState.parent(this)
        }
        get firstChild() {
          return this._routerState.firstChild(this)
        }
        get children() {
          return this._routerState.children(this)
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(T(t => Oc(t)))),
            this._paramMap
          )
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(T(t => Oc(t)))),
            this._queryParamMap
          )
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`
        }
      }
      function mh(t, e = "emptyOnly") {
        const n = t.pathFromRoot
        let r = 0
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const t = n[r],
              e = n[r - 1]
            if (t.routeConfig && "" === t.routeConfig.path) r--
            else {
              if (e.component) break
              r--
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData,
              ),
            }),
            { params: {}, data: {}, resolve: {} },
          )
        })(n.slice(r))
      }
      class yh {
        constructor(t, e, n, r, s, i, o, a, l, u, c) {
          ;(this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = i),
            (this.component = o),
            (this.routeConfig = a),
            (this._urlSegment = l),
            (this._lastPathIndex = u),
            (this._resolve = c)
        }
        get root() {
          return this._routerState.root
        }
        get parent() {
          return this._routerState.parent(this)
        }
        get firstChild() {
          return this._routerState.firstChild(this)
        }
        get children() {
          return this._routerState.children(this)
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this)
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Oc(this.params)), this._paramMap
          )
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Oc(this.queryParams)),
            this._queryParamMap
          )
        }
        toString() {
          return `Route(url:'${this.url
            .map(t => t.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`
        }
      }
      class _h extends lh {
        constructor(t, e) {
          super(e), (this.url = t), vh(this, e)
        }
        toString() {
          return wh(this._root)
        }
      }
      function vh(t, e) {
        ;(e.value._routerState = t), e.children.forEach(e => vh(t, e))
      }
      function wh(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(wh).join(", ")} } ` : ""
        return `${t.value}${e}`
      }
      function bh(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot
          ;(t.snapshot = n),
            Ic(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            Ic(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1
              for (let n = 0; n < t.length; ++n) if (!Ic(t[n], e[n])) return !1
              return !0
            })(e.url, n.url) || t.url.next(n.url),
            Ic(e.data, n.data) || t.data.next(n.data)
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data)
      }
      function Ch(t, e) {
        var n, r
        return (
          Ic(t.params, e.params) &&
          qc((n = t.url), (r = e.url)) &&
          n.every((t, e) => Ic(t.parameters, r[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || Ch(t.parent, e.parent))
        )
      }
      function Sh(t, e, n) {
        if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
          const r = n.value
          r._futureSnapshot = e.value
          const s = (function (t, e, n) {
            return e.children.map(e => {
              for (const r of n.children)
                if (t.shouldReuseRoute(e.value, r.value.snapshot))
                  return Sh(t, e, r)
              return Sh(t, e)
            })
          })(t, e, n)
          return new hh(r, s)
        }
        {
          const n = t.retrieve(e.value)
          if (n) {
            const t = n.route
            return xh(e, t), t
          }
          {
            const n = new gh(
                new _u((r = e.value).url),
                new _u(r.params),
                new _u(r.queryParams),
                new _u(r.fragment),
                new _u(r.data),
                r.outlet,
                r.component,
                r,
              ),
              s = e.children.map(e => Sh(t, e))
            return new hh(n, s)
          }
        }
        var r
      }
      function xh(t, e) {
        if (t.value.routeConfig !== e.value.routeConfig)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot created from a different route",
          )
        if (t.children.length !== e.children.length)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot with a different number of children",
          )
        e.value._futureSnapshot = t.value
        for (let n = 0; n < t.children.length; ++n)
          xh(t.children[n], e.children[n])
      }
      function Eh(t) {
        return "object" == typeof t && null != t && !t.outlets && !t.segmentPath
      }
      function Th(t) {
        return "object" == typeof t && null != t && t.outlets
      }
      function Ah(t, e, n, r, s) {
        let i = {}
        return (
          r &&
            Nc(r, (t, e) => {
              i[e] = Array.isArray(t) ? t.map(t => `${t}`) : `${t}`
            }),
          new $c(n.root === t ? e : kh(n.root, t, e), i, s)
        )
      }
      function kh(t, e, n) {
        const r = {}
        return (
          Nc(t.children, (t, s) => {
            r[s] = t === e ? n : kh(t, e, n)
          }),
          new zc(t.segments, r)
        )
      }
      class Oh {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && Eh(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters")
          const r = n.find(Th)
          if (r && r !== Dc(n))
            throw new Error("{outlets:{}} has to be the last command")
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          )
        }
      }
      class Rh {
        constructor(t, e, n) {
          ;(this.segmentGroup = t), (this.processChildren = e), (this.index = n)
        }
      }
      function Ph(t, e, n) {
        if (
          (t || (t = new zc([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return Ih(t, e, n)
        const r = (function (t, e, n) {
            let r = 0,
              s = e
            const i = { match: !1, pathIndex: 0, commandIndex: 0 }
            for (; s < t.segments.length; ) {
              if (r >= n.length) return i
              const e = t.segments[s],
                o = n[r]
              if (Th(o)) break
              const a = `${o}`,
                l = r < n.length - 1 ? n[r + 1] : null
              if (s > 0 && void 0 === a) break
              if (a && l && "object" == typeof l && void 0 === l.outlets) {
                if (!Nh(a, l, e)) return i
                r += 2
              } else {
                if (!Nh(a, {}, e)) return i
                r++
              }
              s++
            }
            return { match: !0, pathIndex: s, commandIndex: r }
          })(t, e, n),
          s = n.slice(r.commandIndex)
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new zc(t.segments.slice(0, r.pathIndex), {})
          return (
            (e.children.primary = new zc(
              t.segments.slice(r.pathIndex),
              t.children,
            )),
            Ih(e, 0, s)
          )
        }
        return r.match && 0 === s.length
          ? new zc(t.segments, {})
          : r.match && !t.hasChildren()
          ? Vh(t, e, n)
          : r.match
          ? Ih(t, 0, s)
          : Vh(t, e, n)
      }
      function Ih(t, e, n) {
        if (0 === n.length) return new zc(t.segments, {})
        {
          const r = (function (t) {
              return Th(t[0]) ? t[0].outlets : { [Ac]: t }
            })(n),
            s = {}
          return (
            Nc(r, (n, r) => {
              "string" == typeof n && (n = [n]),
                null !== n && (s[r] = Ph(t.children[r], e, n))
            }),
            Nc(t.children, (t, e) => {
              void 0 === r[e] && (s[e] = t)
            }),
            new zc(t.segments, s)
          )
        }
      }
      function Vh(t, e, n) {
        const r = t.segments.slice(0, e)
        let s = 0
        for (; s < n.length; ) {
          const i = n[s]
          if (Th(i)) {
            const t = jh(i.outlets)
            return new zc(r, t)
          }
          if (0 === s && Eh(n[0])) {
            r.push(new Bc(t.segments[e].path, n[0])), s++
            continue
          }
          const o = Th(i) ? i.outlets.primary : `${i}`,
            a = s < n.length - 1 ? n[s + 1] : null
          o && a && Eh(a)
            ? (r.push(new Bc(o, Dh(a))), (s += 2))
            : (r.push(new Bc(o, {})), s++)
        }
        return new zc(r, {})
      }
      function jh(t) {
        const e = {}
        return (
          Nc(t, (t, n) => {
            "string" == typeof t && (t = [t]),
              null !== t && (e[n] = Vh(new zc([], {}), 0, t))
          }),
          e
        )
      }
      function Dh(t) {
        const e = {}
        return Nc(t, (t, n) => (e[n] = `${t}`)), e
      }
      function Nh(t, e, n) {
        return t == n.path && Ic(e, n.parameters)
      }
      class Uh {
        constructor(t, e, n, r) {
          ;(this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = r)
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null
          this.deactivateChildRoutes(e, n, t),
            bh(this.futureState.root),
            this.activateChildRoutes(e, n, t)
        }
        deactivateChildRoutes(t, e, n) {
          const r = dh(e)
          t.children.forEach(t => {
            const e = t.value.outlet
            this.deactivateRoutes(t, r[e], n), delete r[e]
          }),
            Nc(r, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n)
            })
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet)
              s && this.deactivateChildRoutes(t, e, s.children)
            } else this.deactivateChildRoutes(t, e, n)
          else s && this.deactivateRouteAndItsChildren(e, n)
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e)
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet)
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated()
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: r,
            })
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet),
            r = n && t.value.component ? n.children : e,
            s = dh(t)
          for (const i of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[i], r)
          n &&
            n.outlet &&
            (n.outlet.deactivate(), n.children.onOutletDeactivated())
        }
        activateChildRoutes(t, e, n) {
          const r = dh(e)
          t.children.forEach(t => {
            this.activateRoutes(t, r[t.value.outlet], n),
              this.forwardEvent(new Ec(t.value.snapshot))
          }),
            t.children.length && this.forwardEvent(new Sc(t.value.snapshot))
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null
          if ((bh(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet)
              this.activateChildRoutes(t, e, s.children)
            } else this.activateChildRoutes(t, e, n)
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet)
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot)
              this.routeReuseStrategy.store(r.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                Mh(t.route)
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig
                    if (t && t._loadedConfig) return t._loadedConfig
                    if (t && t.component) return null
                  }
                  return null
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null
              ;(e.attachRef = null),
                (e.route = r),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(r, s),
                this.activateChildRoutes(t, null, e.children)
            }
          } else this.activateChildRoutes(t, null, n)
        }
      }
      function Mh(t) {
        bh(t.value), t.children.forEach(Mh)
      }
      class Fh {
        constructor(t, e) {
          ;(this.routes = t), (this.module = e)
        }
      }
      function Hh(t) {
        return "function" == typeof t
      }
      function Lh(t) {
        return t instanceof $c
      }
      const $h = Symbol("INITIAL_VALUE")
      function zh() {
        return Ru(t =>
          (function (...t) {
            let e, n
            return (
              E(t[t.length - 1]) && (n = t.pop()),
              "function" == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && l(t[0]) && (t = t[0]),
              B(t, n).lift(new Su(e))
            )
          })(
            t.map(t =>
              t.pipe(
                ju(1),
                (function (...t) {
                  const e = t[t.length - 1]
                  return E(e) ? (t.pop(), n => Tu(t, n, e)) : e => Tu(t, e)
                })($h),
              ),
            ),
          ).pipe(
            Uu((t, e) => {
              let n = !1
              return e.reduce((t, r, s) => {
                if (t !== $h) return t
                if ((r === $h && (n = !0), !n)) {
                  if (!1 === r) return r
                  if (s === e.length - 1 || Lh(r)) return r
                }
                return t
              }, t)
            }, $h),
            Hu(t => t !== $h),
            T(t => (Lh(t) ? t : !0 === t)),
            ju(1),
          ),
        )
      }
      let Bh = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)()
          }),
          (t.ɵcmp = Ut({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && wi(0, "router-outlet")
            },
            directives: function () {
              return [Ud]
            },
            encapsulation: 2,
          })),
          t
        )
      })()
      function qh(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n]
          Wh(r, Zh(e, r))
        }
      }
      function Wh(t, e) {
        t.children && qh(t.children, e)
      }
      function Zh(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? `${t}/`
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t
      }
      function Gh(t) {
        const e = t.children && t.children.map(Gh),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t)
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            n.outlet !== Ac &&
            (n.component = Bh),
          n
        )
      }
      function Qh(t) {
        return t.outlet || Ac
      }
      function Kh(t, e) {
        const n = t.filter(t => Qh(t) === e)
        return n.push(...t.filter(t => Qh(t) !== e)), n
      }
      const Jh = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      }
      function Xh(t, e, n) {
        var r
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? Object.assign({}, Jh)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              }
        const s = (e.matcher || Pc)(n, t, e)
        if (!s) return Object.assign({}, Jh)
        const i = {}
        Nc(s.posParams, (t, e) => {
          i[e] = t.path
        })
        const o =
          s.consumed.length > 0
            ? Object.assign(
                Object.assign({}, i),
                s.consumed[s.consumed.length - 1].parameters,
              )
            : i
        return {
          matched: !0,
          consumedSegments: s.consumed,
          lastChild: s.consumed.length,
          parameters: o,
          positionalParamSegments:
            null !== (r = s.posParams) && void 0 !== r ? r : {},
        }
      }
      function Yh(t, e, n, r, s = "corrected") {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some(n => td(t, e, n) && Qh(n) !== Ac)
          })(t, n, r)
        ) {
          const s = new zc(
            e,
            (function (t, e, n, r) {
              const s = {}
              ;(s.primary = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length)
              for (const i of n)
                if ("" === i.path && Qh(i) !== Ac) {
                  const n = new zc([], {})
                  ;(n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (s[Qh(i)] = n)
                }
              return s
            })(t, e, r, new zc(n, t.children)),
          )
          return (
            (s._sourceSegment = t),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: [] }
          )
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some(n => td(t, e, n))
          })(t, n, r)
        ) {
          const i = new zc(
            t.segments,
            (function (t, e, n, r, s, i) {
              const o = {}
              for (const a of r)
                if (td(t, n, a) && !s[Qh(a)]) {
                  const n = new zc([], {})
                  ;(n._sourceSegment = t),
                    (n._segmentIndexShift =
                      "legacy" === i ? t.segments.length : e.length),
                    (o[Qh(a)] = n)
                }
              return Object.assign(Object.assign({}, s), o)
            })(t, e, n, r, t.children, s),
          )
          return (
            (i._sourceSegment = t),
            (i._segmentIndexShift = e.length),
            { segmentGroup: i, slicedSegments: n }
          )
        }
        const i = new zc(t.segments, t.children)
        return (
          (i._sourceSegment = t),
          (i._segmentIndexShift = e.length),
          { segmentGroup: i, slicedSegments: n }
        )
      }
      function td(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        )
      }
      function ed(t, e, n, r) {
        return (
          !!(Qh(t) === r || (r !== Ac && td(e, n, t))) &&
          ("**" === t.path || Xh(e, t, n).matched)
        )
      }
      function nd(t, e, n) {
        return 0 === e.length && !t.children[n]
      }
      class rd {
        constructor(t) {
          this.segmentGroup = t || null
        }
      }
      class sd {
        constructor(t) {
          this.urlTree = t
        }
      }
      function id(t) {
        return new _(e => e.error(new rd(t)))
      }
      function od(t) {
        return new _(e => e.error(new sd(t)))
      }
      function ad(t) {
        return new _(e =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`,
            ),
          ),
        )
      }
      class ld {
        constructor(t, e, n, r, s) {
          ;(this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(Ko))
        }
        apply() {
          const t = Yh(this.urlTree.root, [], [], this.config).segmentGroup,
            e = new zc(t.segments, t.children)
          return this.expandSegmentGroup(this.ngModule, this.config, e, Ac)
            .pipe(
              T(t =>
                this.createUrlTree(
                  ud(t),
                  this.urlTree.queryParams,
                  this.urlTree.fragment,
                ),
              ),
            )
            .pipe(
              zu(t => {
                if (t instanceof sd)
                  return (this.allowRedirects = !1), this.match(t.urlTree)
                if (t instanceof rd) throw this.noMatchError(t)
                throw t
              }),
            )
        }
        match(t) {
          return this.expandSegmentGroup(this.ngModule, this.config, t.root, Ac)
            .pipe(T(e => this.createUrlTree(ud(e), t.queryParams, t.fragment)))
            .pipe(
              zu(t => {
                if (t instanceof rd) throw this.noMatchError(t)
                throw t
              }),
            )
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`,
          )
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new zc([], { [Ac]: t }) : t
          return new $c(r, e, n)
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(T(t => new zc([], t)))
            : this.expandSegment(t, n, e, n.segments, r, !0)
        }
        expandChildren(t, e, n) {
          const r = []
          for (const s of Object.keys(n.children))
            "primary" === s ? r.unshift(s) : r.push(s)
          return N(r).pipe(
            Wu(r => {
              const s = n.children[r],
                i = Kh(e, r)
              return this.expandSegmentGroup(t, i, s, r).pipe(
                T(t => ({ segment: t, outlet: r })),
              )
            }),
            Uu((t, e) => ((t[e.outlet] = e.segment), t), {}),
            (function (t, e) {
              const n = arguments.length >= 2
              return r =>
                r.pipe(
                  t ? Hu((e, n) => t(e, n, r)) : y,
                  Zu(1),
                  n ? tc(e) : Ku(() => new Eu()),
                )
            })(),
          )
        }
        expandSegment(t, e, n, r, s, i) {
          return N(n).pipe(
            Wu(o =>
              this.expandSegmentAgainstRoute(t, e, n, o, r, s, i).pipe(
                zu(t => {
                  if (t instanceof rd) return yu(null)
                  throw t
                }),
              ),
            ),
            rc(t => !!t),
            zu((t, n) => {
              if (t instanceof Eu || "EmptyError" === t.name) {
                if (nd(e, r, s)) return yu(new zc([], {}))
                throw new rd(e)
              }
              throw t
            }),
          )
        }
        expandSegmentAgainstRoute(t, e, n, r, s, i, o) {
          return ed(r, e, s, i)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, e, r, s, i)
              : o && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i)
              : id(e)
            : id(e)
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                r,
                s,
                i,
              )
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {})
          return n.redirectTo.startsWith("/")
            ? od(s)
            : this.lineralizeSegments(n, s).pipe(
                H(n => {
                  const s = new zc(n, {})
                  return this.expandSegment(t, s, e, n, r, !1)
                }),
              )
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, i) {
          const {
            matched: o,
            consumedSegments: a,
            lastChild: l,
            positionalParamSegments: u,
          } = Xh(e, r, s)
          if (!o) return id(e)
          const c = this.applyRedirectCommands(a, r.redirectTo, u)
          return r.redirectTo.startsWith("/")
            ? od(c)
            : this.lineralizeSegments(r, c).pipe(
                H(r =>
                  this.expandSegment(t, e, n, r.concat(s.slice(l)), i, !1),
                ),
              )
        }
        matchSegmentAgainstRoute(t, e, n, r, s) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(t.injector, n)
                  .pipe(T(t => ((n._loadedConfig = t), new zc(r, {}))))
              : yu(new zc(r, {}))
          const { matched: i, consumedSegments: o, lastChild: a } = Xh(e, n, r)
          if (!i) return id(e)
          const l = r.slice(a)
          return this.getChildConfig(t, n, r).pipe(
            H(t => {
              const r = t.module,
                i = t.routes,
                { segmentGroup: a, slicedSegments: u } = Yh(e, o, l, i),
                c = new zc(a.segments, a.children)
              if (0 === u.length && c.hasChildren())
                return this.expandChildren(r, i, c).pipe(T(t => new zc(o, t)))
              if (0 === i.length && 0 === u.length) return yu(new zc(o, {}))
              const h = Qh(n) === s
              return this.expandSegment(r, c, i, u, h ? Ac : s, !0).pipe(
                T(t => new zc(o.concat(t.segments), t.children)),
              )
            }),
          )
        }
        getChildConfig(t, e, n) {
          return e.children
            ? yu(new Fh(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? yu(e._loadedConfig)
              : this.runCanLoadGuards(t.injector, e, n).pipe(
                  H(n =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(T(t => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new _(e =>
                            e.error(
                              Rc(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`,
                              ),
                            ),
                          )
                        })(e),
                  ),
                )
            : yu(new Fh([], t))
        }
        runCanLoadGuards(t, e, n) {
          const r = e.canLoad
          return r && 0 !== r.length
            ? yu(
                r.map(r => {
                  const s = t.get(r)
                  let i
                  if (
                    (function (t) {
                      return t && Hh(t.canLoad)
                    })(s)
                  )
                    i = s.canLoad(e, n)
                  else {
                    if (!Hh(s)) throw new Error("Invalid CanLoad guard")
                    i = s(e, n)
                  }
                  return Uc(i)
                }),
              ).pipe(
                zh(),
                ic(t => {
                  if (!Lh(t)) return
                  const e = Rc(
                    `Redirecting to "${this.urlSerializer.serialize(t)}"`,
                  )
                  throw ((e.url = t), e)
                }),
                T(t => !0 === t),
              )
            : yu(!0)
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
              return yu(n)
            if (r.numberOfChildren > 1 || !r.children.primary)
              return ad(t.redirectTo)
            r = r.children.primary
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n,
          )
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const s = this.createSegmentGroup(t, e.root, n, r)
          return new $c(
            s,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment,
          )
        }
        createQueryParams(t, e) {
          const n = {}
          return (
            Nc(t, (t, r) => {
              if ("string" == typeof t && t.startsWith(":")) {
                const s = t.substring(1)
                n[r] = e[s]
              } else n[r] = t
            }),
            n
          )
        }
        createSegmentGroup(t, e, n, r) {
          const s = this.createSegments(t, e.segments, n, r)
          let i = {}
          return (
            Nc(e.children, (e, s) => {
              i[s] = this.createSegmentGroup(t, e, n, r)
            }),
            new zc(s, i)
          )
        }
        createSegments(t, e, n, r) {
          return e.map(e =>
            e.path.startsWith(":")
              ? this.findPosParam(t, e, r)
              : this.findOrReturn(e, n),
          )
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)]
          if (!r)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`,
            )
          return r
        }
        findOrReturn(t, e) {
          let n = 0
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r
            n++
          }
          return t
        }
      }
      function ud(t) {
        const e = {}
        for (const n of Object.keys(t.children)) {
          const r = ud(t.children[n])
          ;(r.segments.length > 0 || r.hasChildren()) && (e[n] = r)
        }
        return (function (t) {
          if (1 === t.numberOfChildren && t.children.primary) {
            const e = t.children.primary
            return new zc(t.segments.concat(e.segments), e.children)
          }
          return t
        })(new zc(t.segments, e))
      }
      class cd {
        constructor(t) {
          ;(this.path = t), (this.route = this.path[this.path.length - 1])
        }
      }
      class hd {
        constructor(t, e) {
          ;(this.component = t), (this.route = e)
        }
      }
      function dd(t, e, n) {
        const r = t._root
        return fd(r, e ? e._root : null, n, [r.value])
      }
      function pd(t, e, n) {
        const r = (function (t) {
          if (!t) return null
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig
            if (t && t._loadedConfig) return t._loadedConfig
          }
          return null
        })(e)
        return (r ? r.module.injector : n).get(t)
      }
      function fd(
        t,
        e,
        n,
        r,
        s = { canDeactivateChecks: [], canActivateChecks: [] },
      ) {
        const i = dh(e)
        return (
          t.children.forEach(t => {
            !(function (
              t,
              e,
              n,
              r,
              s = { canDeactivateChecks: [], canActivateChecks: [] },
            ) {
              const i = t.value,
                o = e ? e.value : null,
                a = n ? n.getContext(t.value.outlet) : null
              if (o && i.routeConfig === o.routeConfig) {
                const l = (function (t, e, n) {
                  if ("function" == typeof n) return n(t, e)
                  switch (n) {
                    case "pathParamsChange":
                      return !qc(t.url, e.url)
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !qc(t.url, e.url) || !Ic(t.queryParams, e.queryParams)
                      )
                    case "always":
                      return !0
                    case "paramsOrQueryParamsChange":
                      return !Ch(t, e) || !Ic(t.queryParams, e.queryParams)
                    case "paramsChange":
                    default:
                      return !Ch(t, e)
                  }
                })(o, i, i.routeConfig.runGuardsAndResolvers)
                l
                  ? s.canActivateChecks.push(new cd(r))
                  : ((i.data = o.data), (i._resolvedData = o._resolvedData)),
                  fd(t, e, i.component ? (a ? a.children : null) : n, r, s),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    s.canDeactivateChecks.push(new hd(a.outlet.component, o))
              } else
                o && gd(e, a, s),
                  s.canActivateChecks.push(new cd(r)),
                  fd(t, null, i.component ? (a ? a.children : null) : n, r, s)
            })(t, i[t.value.outlet], n, r.concat([t.value]), s),
              delete i[t.value.outlet]
          }),
          Nc(i, (t, e) => gd(t, n.getContext(e), s)),
          s
        )
      }
      function gd(t, e, n) {
        const r = dh(t),
          s = t.value
        Nc(r, (t, r) => {
          gd(t, s.component ? (e ? e.children.getContext(r) : null) : e, n)
        }),
          n.canDeactivateChecks.push(
            new hd(
              s.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              s,
            ),
          )
      }
      class md {}
      function yd(t) {
        return new _(e => e.error(t))
      }
      class _d {
        constructor(t, e, n, r, s, i) {
          ;(this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = i)
        }
        recognize() {
          const t = Yh(
              this.urlTree.root,
              [],
              [],
              this.config.filter(t => void 0 === t.redirectTo),
              this.relativeLinkResolution,
            ).segmentGroup,
            e = this.processSegmentGroup(this.config, t, Ac)
          if (null === e) return null
          const n = new yh(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              Ac,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {},
            ),
            r = new hh(n, e),
            s = new _h(this.url, r)
          return this.inheritParamsAndData(s._root), s
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = mh(e, this.paramsInheritanceStrategy)
          ;(e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach(t => this.inheritParamsAndData(t))
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n)
        }
        processChildren(t, e) {
          const n = []
          for (const s of Object.keys(e.children)) {
            const r = e.children[s],
              i = Kh(t, s),
              o = this.processSegmentGroup(i, r, s)
            if (null === o) return null
            n.push(...o)
          }
          const r = (function (t) {
            const e = []
            for (const n of t) {
              if (!vd(n)) {
                e.push(n)
                continue
              }
              const t = e.find(t => n.value.routeConfig === t.value.routeConfig)
              void 0 !== t ? t.children.push(...n.children) : e.push(n)
            }
            return e
          })(n)
          return (
            r.sort((t, e) =>
              t.value.outlet === Ac
                ? -1
                : e.value.outlet === Ac
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet),
            ),
            r
          )
        }
        processSegment(t, e, n, r) {
          for (const s of t) {
            const t = this.processSegmentAgainstRoute(s, e, n, r)
            if (null !== t) return t
          }
          return nd(e, n, r) ? [] : null
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo || !ed(t, e, n, r)) return null
          let s,
            i = [],
            o = []
          if ("**" === t.path) {
            const r = n.length > 0 ? Dc(n).parameters : {}
            s = new yh(
              n,
              r,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              Cd(t),
              Qh(t),
              t.component,
              t,
              wd(e),
              bd(e) + n.length,
              Sd(t),
            )
          } else {
            const r = Xh(e, t, n)
            if (!r.matched) return null
            ;(i = r.consumedSegments),
              (o = n.slice(r.lastChild)),
              (s = new yh(
                i,
                r.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Cd(t),
                Qh(t),
                t.component,
                t,
                wd(e),
                bd(e) + i.length,
                Sd(t),
              ))
          }
          const a = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : []
            })(t),
            { segmentGroup: l, slicedSegments: u } = Yh(
              e,
              i,
              o,
              a.filter(t => void 0 === t.redirectTo),
              this.relativeLinkResolution,
            )
          if (0 === u.length && l.hasChildren()) {
            const t = this.processChildren(a, l)
            return null === t ? null : [new hh(s, t)]
          }
          if (0 === a.length && 0 === u.length) return [new hh(s, [])]
          const c = Qh(t) === r,
            h = this.processSegment(a, l, u, c ? Ac : r)
          return null === h ? null : [new hh(s, h)]
        }
      }
      function vd(t) {
        const e = t.value.routeConfig
        return e && "" === e.path && void 0 === e.redirectTo
      }
      function wd(t) {
        let e = t
        for (; e._sourceSegment; ) e = e._sourceSegment
        return e
      }
      function bd(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0)
        return n - 1
      }
      function Cd(t) {
        return t.data || {}
      }
      function Sd(t) {
        return t.resolve || {}
      }
      function xd(t) {
        return Ru(e => {
          const n = t(e)
          return n ? N(n).pipe(T(() => e)) : yu(e)
        })
      }
      class Ed extends class {
        shouldDetach(t) {
          return !1
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1
        }
        retrieve(t) {
          return null
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig
        }
      } {}
      const Td = new Nn("ROUTES")
      class Ad {
        constructor(t, e, n, r) {
          ;(this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = r)
        }
        load(t, e) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(e),
            this.loadModuleFactory(e.loadChildren).pipe(
              T(n => {
                this.onLoadEndListener && this.onLoadEndListener(e)
                const r = n.create(t)
                return new Fh(
                  jc(r.injector.get(Td, void 0, gt.Self | gt.Optional)).map(Gh),
                  r,
                )
              }),
            )
          )
        }
        loadModuleFactory(t) {
          return "string" == typeof t
            ? N(this.loader.load(t))
            : Uc(t()).pipe(
                H(t =>
                  t instanceof Jo
                    ? yu(t)
                    : N(this.compiler.compileModuleAsync(t)),
                ),
              )
        }
      }
      class kd {
        constructor() {
          ;(this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new Od()),
            (this.attachRef = null)
        }
      }
      class Od {
        constructor() {
          this.contexts = new Map()
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t)
          ;(n.outlet = e), this.contexts.set(t, n)
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t)
          e && (e.outlet = null)
        }
        onOutletDeactivated() {
          const t = this.contexts
          return (this.contexts = new Map()), t
        }
        onOutletReAttached(t) {
          this.contexts = t
        }
        getOrCreateContext(t) {
          let e = this.getContext(t)
          return e || ((e = new kd()), this.contexts.set(t, e)), e
        }
        getContext(t) {
          return this.contexts.get(t) || null
        }
      }
      class Rd {
        shouldProcessUrl(t) {
          return !0
        }
        extract(t) {
          return t
        }
        merge(t, e) {
          return t
        }
      }
      function Pd(t) {
        throw t
      }
      function Id(t, e, n) {
        return e.parse("/")
      }
      function Vd(t, e) {
        return yu(null)
      }
      let jd = (() => {
          class t {
            constructor(t, e, n, r, s, i, o, a) {
              ;(this.rootComponentType = t),
                (this.urlSerializer = e),
                (this.rootContexts = n),
                (this.location = r),
                (this.config = a),
                (this.lastSuccessfulNavigation = null),
                (this.currentNavigation = null),
                (this.lastLocationChangeInfo = null),
                (this.navigationId = 0),
                (this.isNgZoneEnabled = !1),
                (this.events = new S()),
                (this.errorHandler = Pd),
                (this.malformedUriErrorHandler = Id),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.hooks = {
                  beforePreactivation: Vd,
                  afterPreactivation: Vd,
                }),
                (this.urlHandlingStrategy = new Rd()),
                (this.routeReuseStrategy = new Ed()),
                (this.onSameUrlNavigation = "ignore"),
                (this.paramsInheritanceStrategy = "emptyOnly"),
                (this.urlUpdateStrategy = "deferred"),
                (this.relativeLinkResolution = "corrected"),
                (this.ngModule = s.get(Ko)),
                (this.console = s.get(Ca))
              const l = s.get(Da)
              ;(this.isNgZoneEnabled = l instanceof Da && Da.isInAngularZone()),
                this.resetConfig(a),
                (this.currentUrlTree = new $c(new zc([], {}), {}, null)),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.configLoader = new Ad(
                  i,
                  o,
                  t => this.triggerEvent(new wc(t)),
                  t => this.triggerEvent(new bc(t)),
                )),
                (this.routerState = fh(
                  this.currentUrlTree,
                  this.rootComponentType,
                )),
                (this.transitions = new _u({
                  id: 0,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  extractedUrl: this.urlHandlingStrategy.extract(
                    this.currentUrlTree,
                  ),
                  urlAfterRedirects: this.urlHandlingStrategy.extract(
                    this.currentUrlTree,
                  ),
                  rawUrl: this.currentUrlTree,
                  extras: {},
                  resolve: null,
                  reject: null,
                  promise: Promise.resolve(!0),
                  source: "imperative",
                  restoredState: null,
                  currentSnapshot: this.routerState.snapshot,
                  targetSnapshot: null,
                  currentRouterState: this.routerState,
                  targetRouterState: null,
                  guards: { canActivateChecks: [], canDeactivateChecks: [] },
                  guardsResult: null,
                })),
                (this.navigations = this.setupNavigations(this.transitions)),
                this.processNavigations()
            }
            setupNavigations(t) {
              const e = this.events
              return t.pipe(
                Hu(t => 0 !== t.id),
                T(t =>
                  Object.assign(Object.assign({}, t), {
                    extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
                  }),
                ),
                Ru(t => {
                  let n = !1,
                    r = !1
                  return yu(t).pipe(
                    ic(t => {
                      this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? Object.assign(
                              Object.assign({}, this.lastSuccessfulNavigation),
                              { previousNavigation: null },
                            )
                          : null,
                      }
                    }),
                    Ru(t => {
                      const n =
                        !this.navigated ||
                        t.extractedUrl.toString() !==
                          this.browserUrlTree.toString()
                      if (
                        ("reload" === this.onSameUrlNavigation || n) &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return yu(t).pipe(
                          Ru(t => {
                            const n = this.transitions.getValue()
                            return (
                              e.next(
                                new hc(
                                  t.id,
                                  this.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState,
                                ),
                              ),
                              n !== this.transitions.getValue()
                                ? Au
                                : Promise.resolve(t)
                            )
                          }),
                          ((r = this.ngModule.injector),
                          (s = this.configLoader),
                          (i = this.urlSerializer),
                          (o = this.config),
                          Ru(t =>
                            (function (t, e, n, r, s) {
                              return new ld(t, e, n, r, s).apply()
                            })(r, s, i, t.extractedUrl, o).pipe(
                              T(e =>
                                Object.assign(Object.assign({}, t), {
                                  urlAfterRedirects: e,
                                }),
                              ),
                            ),
                          )),
                          ic(t => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: t.urlAfterRedirects },
                            )
                          }),
                          (function (t, e, n, r, s) {
                            return H(i =>
                              (function (
                                t,
                                e,
                                n,
                                r,
                                s = "emptyOnly",
                                i = "legacy",
                              ) {
                                try {
                                  const o = new _d(t, e, n, r, s, i).recognize()
                                  return null === o ? yd(new md()) : yu(o)
                                } catch (o) {
                                  return yd(o)
                                }
                              })(
                                t,
                                e,
                                i.urlAfterRedirects,
                                n(i.urlAfterRedirects),
                                r,
                                s,
                              ).pipe(
                                T(t =>
                                  Object.assign(Object.assign({}, i), {
                                    targetSnapshot: t,
                                  }),
                                ),
                              ),
                            )
                          })(
                            this.rootComponentType,
                            this.config,
                            t => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution,
                          ),
                          ic(t => {
                            "eager" === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                this.setBrowserUrl(
                                  t.urlAfterRedirects,
                                  !!t.extras.replaceUrl,
                                  t.id,
                                  t.extras.state,
                                ),
                              (this.browserUrlTree = t.urlAfterRedirects))
                            const n = new gc(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot,
                            )
                            e.next(n)
                          }),
                        )
                      var r, s, i, o
                      if (
                        n &&
                        this.rawUrlTree &&
                        this.urlHandlingStrategy.shouldProcessUrl(
                          this.rawUrlTree,
                        )
                      ) {
                        const {
                            id: n,
                            extractedUrl: r,
                            source: s,
                            restoredState: i,
                            extras: o,
                          } = t,
                          a = new hc(n, this.serializeUrl(r), s, i)
                        e.next(a)
                        const l = fh(r, this.rootComponentType).snapshot
                        return yu(
                          Object.assign(Object.assign({}, t), {
                            targetSnapshot: l,
                            urlAfterRedirects: r,
                            extras: Object.assign(Object.assign({}, o), {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          }),
                        )
                      }
                      return (
                        (this.rawUrlTree = t.rawUrl),
                        (this.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        Au
                      )
                    }),
                    xd(t => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t
                      return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      })
                    }),
                    ic(t => {
                      const e = new mc(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                      )
                      this.triggerEvent(e)
                    }),
                    T(t =>
                      Object.assign(Object.assign({}, t), {
                        guards: dd(
                          t.targetSnapshot,
                          t.currentSnapshot,
                          this.rootContexts,
                        ),
                      }),
                    ),
                    (function (t, e) {
                      return H(n => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: s,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: o,
                          },
                        } = n
                        return 0 === o.length && 0 === i.length
                          ? yu(
                              Object.assign(Object.assign({}, n), {
                                guardsResult: !0,
                              }),
                            )
                          : (function (t, e, n, r) {
                              return N(t).pipe(
                                H(t =>
                                  (function (t, e, n, r, s) {
                                    const i =
                                      e && e.routeConfig
                                        ? e.routeConfig.canDeactivate
                                        : null
                                    return i && 0 !== i.length
                                      ? yu(
                                          i.map(i => {
                                            const o = pd(i, e, s)
                                            let a
                                            if (
                                              (function (t) {
                                                return t && Hh(t.canDeactivate)
                                              })(o)
                                            )
                                              a = Uc(
                                                o.canDeactivate(t, e, n, r),
                                              )
                                            else {
                                              if (!Hh(o))
                                                throw new Error(
                                                  "Invalid CanDeactivate guard",
                                                )
                                              a = Uc(o(t, e, n, r))
                                            }
                                            return a.pipe(rc())
                                          }),
                                        ).pipe(zh())
                                      : yu(!0)
                                  })(t.component, t.route, n, e, r),
                                ),
                                rc(t => !0 !== t, !0),
                              )
                            })(o, r, s, t).pipe(
                              H(n =>
                                n && "boolean" == typeof n
                                  ? (function (t, e, n, r) {
                                      return N(e).pipe(
                                        Wu(e =>
                                          Tu(
                                            (function (t, e) {
                                              return (
                                                null !== t && e && e(new Cc(t)),
                                                yu(!0)
                                              )
                                            })(e.route.parent, r),
                                            (function (t, e) {
                                              return (
                                                null !== t && e && e(new xc(t)),
                                                yu(!0)
                                              )
                                            })(e.route, r),
                                            (function (t, e, n) {
                                              const r = e[e.length - 1],
                                                s = e
                                                  .slice(0, e.length - 1)
                                                  .reverse()
                                                  .map(t =>
                                                    (function (t) {
                                                      const e = t.routeConfig
                                                        ? t.routeConfig
                                                            .canActivateChild
                                                        : null
                                                      return e && 0 !== e.length
                                                        ? { node: t, guards: e }
                                                        : null
                                                    })(t),
                                                  )
                                                  .filter(t => null !== t)
                                                  .map(e =>
                                                    Ou(() =>
                                                      yu(
                                                        e.guards.map(s => {
                                                          const i = pd(
                                                            s,
                                                            e.node,
                                                            n,
                                                          )
                                                          let o
                                                          if (
                                                            (function (t) {
                                                              return (
                                                                t &&
                                                                Hh(
                                                                  t.canActivateChild,
                                                                )
                                                              )
                                                            })(i)
                                                          )
                                                            o = Uc(
                                                              i.canActivateChild(
                                                                r,
                                                                t,
                                                              ),
                                                            )
                                                          else {
                                                            if (!Hh(i))
                                                              throw new Error(
                                                                "Invalid CanActivateChild guard",
                                                              )
                                                            o = Uc(i(r, t))
                                                          }
                                                          return o.pipe(rc())
                                                        }),
                                                      ).pipe(zh()),
                                                    ),
                                                  )
                                              return yu(s).pipe(zh())
                                            })(t, e.path, n),
                                            (function (t, e, n) {
                                              const r = e.routeConfig
                                                ? e.routeConfig.canActivate
                                                : null
                                              return r && 0 !== r.length
                                                ? yu(
                                                    r.map(r =>
                                                      Ou(() => {
                                                        const s = pd(r, e, n)
                                                        let i
                                                        if (
                                                          (function (t) {
                                                            return (
                                                              t &&
                                                              Hh(t.canActivate)
                                                            )
                                                          })(s)
                                                        )
                                                          i = Uc(
                                                            s.canActivate(e, t),
                                                          )
                                                        else {
                                                          if (!Hh(s))
                                                            throw new Error(
                                                              "Invalid CanActivate guard",
                                                            )
                                                          i = Uc(s(e, t))
                                                        }
                                                        return i.pipe(rc())
                                                      }),
                                                    ),
                                                  ).pipe(zh())
                                                : yu(!0)
                                            })(t, e.route, n),
                                          ),
                                        ),
                                        rc(t => !0 !== t, !0),
                                      )
                                    })(r, i, t, e)
                                  : yu(n),
                              ),
                              T(t =>
                                Object.assign(Object.assign({}, n), {
                                  guardsResult: t,
                                }),
                              ),
                            )
                      })
                    })(this.ngModule.injector, t => this.triggerEvent(t)),
                    ic(t => {
                      if (Lh(t.guardsResult)) {
                        const e = Rc(
                          `Redirecting to "${this.serializeUrl(
                            t.guardsResult,
                          )}"`,
                        )
                        throw ((e.url = t.guardsResult), e)
                      }
                      const e = new yc(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult,
                      )
                      this.triggerEvent(e)
                    }),
                    Hu(t => {
                      if (!t.guardsResult) {
                        this.resetUrlToCurrentUrlTree()
                        const n = new pc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          "",
                        )
                        return e.next(n), t.resolve(!1), !1
                      }
                      return !0
                    }),
                    xd(t => {
                      if (t.guards.canActivateChecks.length)
                        return yu(t).pipe(
                          ic(t => {
                            const e = new _c(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot,
                            )
                            this.triggerEvent(e)
                          }),
                          Ru(t => {
                            let n = !1
                            return yu(t).pipe(
                              ((r = this.paramsInheritanceStrategy),
                              (s = this.ngModule.injector),
                              H(t => {
                                const {
                                  targetSnapshot: e,
                                  guards: { canActivateChecks: n },
                                } = t
                                if (!n.length) return yu(t)
                                let i = 0
                                return N(n).pipe(
                                  Wu(t =>
                                    (function (t, e, n, r) {
                                      return (function (t, e, n, r) {
                                        const s = Object.keys(t)
                                        if (0 === s.length) return yu({})
                                        const i = {}
                                        return N(s).pipe(
                                          H(s =>
                                            (function (t, e, n, r) {
                                              const s = pd(t, e, r)
                                              return Uc(
                                                s.resolve
                                                  ? s.resolve(e, n)
                                                  : s(e, n),
                                              )
                                            })(t[s], e, n, r).pipe(
                                              ic(t => {
                                                i[s] = t
                                              }),
                                            ),
                                          ),
                                          Zu(1),
                                          H(() =>
                                            Object.keys(i).length === s.length
                                              ? yu(i)
                                              : Au,
                                          ),
                                        )
                                      })(t._resolve, t, e, r).pipe(
                                        T(
                                          e => (
                                            (t._resolvedData = e),
                                            (t.data = Object.assign(
                                              Object.assign({}, t.data),
                                              mh(t, n).resolve,
                                            )),
                                            null
                                          ),
                                        ),
                                      )
                                    })(t.route, e, r, s),
                                  ),
                                  ic(() => i++),
                                  Zu(1),
                                  H(e => (i === n.length ? yu(t) : Au)),
                                )
                              })),
                              ic({
                                next: () => (n = !0),
                                complete: () => {
                                  if (!n) {
                                    const n = new pc(
                                      t.id,
                                      this.serializeUrl(t.extractedUrl),
                                      "At least one route resolver didn't emit any value.",
                                    )
                                    e.next(n), t.resolve(!1)
                                  }
                                },
                              }),
                            )
                            var r, s
                          }),
                          ic(t => {
                            const e = new vc(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot,
                            )
                            this.triggerEvent(e)
                          }),
                        )
                    }),
                    xd(t => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: i, replaceUrl: o },
                      } = t
                      return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!i,
                        replaceUrl: !!o,
                      })
                    }),
                    T(t => {
                      const e = (function (t, e, n) {
                        const r = Sh(t, e._root, n ? n._root : void 0)
                        return new ph(r, e)
                      })(
                        this.routeReuseStrategy,
                        t.targetSnapshot,
                        t.currentRouterState,
                      )
                      return Object.assign(Object.assign({}, t), {
                        targetRouterState: e,
                      })
                    }),
                    ic(t => {
                      ;(this.currentUrlTree = t.urlAfterRedirects),
                        (this.rawUrlTree = this.urlHandlingStrategy.merge(
                          this.currentUrlTree,
                          t.rawUrl,
                        )),
                        (this.routerState = t.targetRouterState),
                        "deferred" === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              this.rawUrlTree,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state,
                            ),
                          (this.browserUrlTree = t.urlAfterRedirects))
                    }),
                    ((i = this.rootContexts),
                    (o = this.routeReuseStrategy),
                    (a = t => this.triggerEvent(t)),
                    T(
                      t => (
                        new Uh(
                          o,
                          t.targetRouterState,
                          t.currentRouterState,
                          a,
                        ).activate(i),
                        t
                      ),
                    )),
                    ic({
                      next() {
                        n = !0
                      },
                      complete() {
                        n = !0
                      },
                    }),
                    ((s = () => {
                      if (!n && !r) {
                        this.resetUrlToCurrentUrlTree()
                        const n = new pc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`,
                        )
                        e.next(n), t.resolve(!1)
                      }
                      this.currentNavigation = null
                    }),
                    t => t.lift(new lc(s))),
                    zu(n => {
                      if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                        const r = Lh(n.url)
                        r ||
                          ((this.navigated = !0),
                          this.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl,
                          ))
                        const s = new pc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n.message,
                        )
                        e.next(s),
                          r
                            ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(
                                  n.url,
                                  this.rawUrlTree,
                                )
                                this.scheduleNavigation(
                                  e,
                                  "imperative",
                                  null,
                                  {
                                    skipLocationChange:
                                      t.extras.skipLocationChange,
                                    replaceUrl:
                                      "eager" === this.urlUpdateStrategy,
                                  },
                                  {
                                    resolve: t.resolve,
                                    reject: t.reject,
                                    promise: t.promise,
                                  },
                                )
                              }, 0)
                            : t.resolve(!1)
                      } else {
                        this.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl,
                        )
                        const r = new fc(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n,
                        )
                        e.next(r)
                        try {
                          t.resolve(this.errorHandler(n))
                        } catch (i) {
                          t.reject(i)
                        }
                      }
                      var s
                      return Au
                    }),
                  )
                  var s, i, o, a
                }),
              )
            }
            resetRootComponentType(t) {
              ;(this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType)
            }
            getTransition() {
              const t = this.transitions.value
              return (t.urlAfterRedirects = this.browserUrlTree), t
            }
            setTransition(t) {
              this.transitions.next(
                Object.assign(Object.assign({}, this.getTransition()), t),
              )
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 })
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe(t => {
                  const e = this.extractLocationChangeInfoFromEvent(t)
                  this.shouldScheduleNavigation(
                    this.lastLocationChangeInfo,
                    e,
                  ) &&
                    setTimeout(() => {
                      const { source: t, state: n, urlTree: r } = e,
                        s = { replaceUrl: !0 }
                      if (n) {
                        const t = Object.assign({}, n)
                        delete t.navigationId,
                          0 !== Object.keys(t).length && (s.state = t)
                      }
                      this.scheduleNavigation(r, t, n, s)
                    }, 0),
                    (this.lastLocationChangeInfo = e)
                }))
            }
            extractLocationChangeInfoFromEvent(t) {
              var e
              return {
                source: "popstate" === t.type ? "popstate" : "hashchange",
                urlTree: this.parseUrl(t.url),
                state: (
                  null === (e = t.state) || void 0 === e
                    ? void 0
                    : e.navigationId
                )
                  ? t.state
                  : null,
                transitionId: this.getTransition().id,
              }
            }
            shouldScheduleNavigation(t, e) {
              if (!t) return !0
              const n = e.urlTree.toString() === t.urlTree.toString()
              return !(
                e.transitionId === t.transitionId &&
                n &&
                (("hashchange" === e.source && "popstate" === t.source) ||
                  ("popstate" === e.source && "hashchange" === t.source))
              )
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree)
            }
            getCurrentNavigation() {
              return this.currentNavigation
            }
            triggerEvent(t) {
              this.events.next(t)
            }
            resetConfig(t) {
              qh(t),
                (this.config = t.map(Gh)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1)
            }
            ngOnDestroy() {
              this.dispose()
            }
            dispose() {
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0))
            }
            createUrlTree(t, e = {}) {
              const {
                  relativeTo: n,
                  queryParams: r,
                  fragment: s,
                  queryParamsHandling: i,
                  preserveFragment: o,
                } = e,
                a = n || this.routerState.root,
                l = o ? this.currentUrlTree.fragment : s
              let u = null
              switch (i) {
                case "merge":
                  u = Object.assign(
                    Object.assign({}, this.currentUrlTree.queryParams),
                    r,
                  )
                  break
                case "preserve":
                  u = this.currentUrlTree.queryParams
                  break
                default:
                  u = r || null
              }
              return (
                null !== u && (u = this.removeEmptyProps(u)),
                (function (t, e, n, r, s) {
                  if (0 === n.length) return Ah(e.root, e.root, e, r, s)
                  const i = (function (t) {
                    if (
                      "string" == typeof t[0] &&
                      1 === t.length &&
                      "/" === t[0]
                    )
                      return new Oh(!0, 0, t)
                    let e = 0,
                      n = !1
                    const r = t.reduce((t, r, s) => {
                      if ("object" == typeof r && null != r) {
                        if (r.outlets) {
                          const e = {}
                          return (
                            Nc(r.outlets, (t, n) => {
                              e[n] = "string" == typeof t ? t.split("/") : t
                            }),
                            [...t, { outlets: e }]
                          )
                        }
                        if (r.segmentPath) return [...t, r.segmentPath]
                      }
                      return "string" != typeof r
                        ? [...t, r]
                        : 0 === s
                        ? (r.split("/").forEach((r, s) => {
                            ;(0 == s && "." === r) ||
                              (0 == s && "" === r
                                ? (n = !0)
                                : ".." === r
                                ? e++
                                : "" != r && t.push(r))
                          }),
                          t)
                        : [...t, r]
                    }, [])
                    return new Oh(n, e, r)
                  })(n)
                  if (i.toRoot()) return Ah(e.root, new zc([], {}), e, r, s)
                  const o = (function (t, e, n) {
                      if (t.isAbsolute) return new Rh(e.root, !0, 0)
                      if (-1 === n.snapshot._lastPathIndex) {
                        const t = n.snapshot._urlSegment
                        return new Rh(t, t === e.root, 0)
                      }
                      const r = Eh(t.commands[0]) ? 0 : 1
                      return (function (t, e, n) {
                        let r = t,
                          s = e,
                          i = n
                        for (; i > s; ) {
                          if (((i -= s), (r = r.parent), !r))
                            throw new Error("Invalid number of '../'")
                          s = r.segments.length
                        }
                        return new Rh(r, !1, s - i)
                      })(
                        n.snapshot._urlSegment,
                        n.snapshot._lastPathIndex + r,
                        t.numberOfDoubleDots,
                      )
                    })(i, e, t),
                    a = o.processChildren
                      ? Ih(o.segmentGroup, o.index, i.commands)
                      : Ph(o.segmentGroup, o.index, i.commands)
                  return Ah(o.segmentGroup, a, e, r, s)
                })(a, this.currentUrlTree, t, u, l)
              )
            }
            navigateByUrl(t, e = { skipLocationChange: !1 }) {
              const n = Lh(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree)
              return this.scheduleNavigation(r, "imperative", null, e)
            }
            navigate(t, e = { skipLocationChange: !1 }) {
              return (
                (function (t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e]
                    if (null == n)
                      throw new Error(
                        `The requested path contains ${n} segment at index ${e}`,
                      )
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              )
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t)
            }
            parseUrl(t) {
              let e
              try {
                e = this.urlSerializer.parse(t)
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t)
              }
              return e
            }
            isActive(t, e) {
              if (Lh(t)) return Mc(this.currentUrlTree, t, e)
              const n = this.parseUrl(t)
              return Mc(this.currentUrlTree, n, e)
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const r = t[n]
                return null != r && (e[n] = r), e
              }, {})
            }
            processNavigations() {
              this.navigations.subscribe(
                t => {
                  ;(this.navigated = !0),
                    (this.lastSuccessfulId = t.id),
                    this.events.next(
                      new dc(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(this.currentUrlTree),
                      ),
                    ),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    (this.currentNavigation = null),
                    t.resolve(!0)
                },
                t => {
                  this.console.warn("Unhandled Navigation Error: ")
                },
              )
            }
            scheduleNavigation(t, e, n, r, s) {
              const i = this.getTransition(),
                o =
                  "imperative" !== e &&
                  "imperative" === (null == i ? void 0 : i.source),
                a =
                  (this.lastSuccessfulId === i.id || this.currentNavigation
                    ? i.rawUrl
                    : i.urlAfterRedirects
                  ).toString() === t.toString()
              if (o && a) return Promise.resolve(!0)
              let l, u, c
              s
                ? ((l = s.resolve), (u = s.reject), (c = s.promise))
                : (c = new Promise((t, e) => {
                    ;(l = t), (u = e)
                  }))
              const h = ++this.navigationId
              return (
                this.setTransition({
                  id: h,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: r,
                  resolve: l,
                  reject: u,
                  promise: c,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                c.catch(t => Promise.reject(t))
              )
            }
            setBrowserUrl(t, e, n, r) {
              const s = this.urlSerializer.serialize(t)
              ;(r = r || {}),
                this.location.isCurrentPathEqualTo(s) || e
                  ? this.location.replaceState(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n }),
                    )
                  : this.location.go(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n }),
                    )
            }
            resetStateAndUrl(t, e, n) {
              ;(this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n,
                )),
                this.resetUrlToCurrentUrlTree()
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                { navigationId: this.lastSuccessfulId },
              )
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Xn(Mn),
                Xn(Wc),
                Xn(Od),
                Xn(Ol),
                Xn(ni),
                Xn(sl),
                Xn(Ia),
                Xn(void 0),
              )
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        Dd = (() => {
          class t {
            constructor(t, e, n, r, s) {
              ;(this.router = t),
                (this.route = e),
                (this.commands = []),
                (this.onChanges = new S()),
                null == n && r.setAttribute(s.nativeElement, "tabindex", "0")
            }
            ngOnChanges(t) {
              this.onChanges.next(this)
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : []
            }
            onClick() {
              const t = {
                skipLocationChange: Nd(this.skipLocationChange),
                replaceUrl: Nd(this.replaceUrl),
                state: this.state,
              }
              return this.router.navigateByUrl(this.urlTree, t), !0
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo:
                  void 0 !== this.relativeTo ? this.relativeTo : this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: Nd(this.preserveFragment),
              })
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                gi(jd),
                gi(gh),
                Vn("tabindex"),
                gi(vo),
                gi(yo),
              )
            }),
            (t.ɵdir = zt({
              type: t,
              selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
              hostBindings: function (t, e) {
                1 & t &&
                  xi("click", function () {
                    return e.onClick()
                  })
              },
              inputs: {
                routerLink: "routerLink",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                state: "state",
                relativeTo: "relativeTo",
              },
              features: [oe],
            })),
            t
          )
        })()
      function Nd(t) {
        return "" === t || !!t
      }
      let Ud = (() => {
        class t {
          constructor(t, e, n, r, s) {
            ;(this.parentContexts = t),
              (this.location = e),
              (this.resolver = n),
              (this.changeDetector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new pa()),
              (this.deactivateEvents = new pa()),
              (this.name = r || Ac),
              t.onChildOutletCreated(this.name, this)
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name)
          }
          ngOnInit() {
            if (!this.activated) {
              const t = this.parentContexts.getContext(this.name)
              t &&
                t.route &&
                (t.attachRef
                  ? this.attach(t.attachRef, t.route)
                  : this.activateWith(t.route, t.resolver || null))
            }
          }
          get isActivated() {
            return !!this.activated
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated")
            return this.activated.instance
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated")
            return this._activatedRoute
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {}
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated")
            this.location.detach()
            const t = this.activated
            return (this.activated = null), (this._activatedRoute = null), t
          }
          attach(t, e) {
            ;(this.activated = t),
              (this._activatedRoute = e),
              this.location.insert(t.hostView)
          }
          deactivate() {
            if (this.activated) {
              const t = this.component
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t)
            }
          }
          activateWith(t, e) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet")
            this._activatedRoute = t
            const n = (e = e || this.resolver).resolveComponentFactory(
                t._futureSnapshot.routeConfig.component,
              ),
              r = this.parentContexts.getOrCreateContext(this.name).children,
              s = new Md(t, r, this.location.injector)
            ;(this.activated = this.location.createComponent(
              n,
              this.location.length,
              s,
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance)
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(gi(Od), gi(Yo), gi(po), Vn("name"), gi($o))
          }),
          (t.ɵdir = zt({
            type: t,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
            },
            exportAs: ["outlet"],
          })),
          t
        )
      })()
      class Md {
        constructor(t, e, n) {
          ;(this.route = t), (this.childContexts = e), (this.parent = n)
        }
        get(t, e) {
          return t === gh
            ? this.route
            : t === Od
            ? this.childContexts
            : this.parent.get(t, e)
        }
      }
      class Fd {}
      class Hd {
        preload(t, e) {
          return yu(null)
        }
      }
      let Ld = (() => {
          class t {
            constructor(t, e, n, r, s) {
              ;(this.router = t),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new Ad(
                  e,
                  n,
                  e => t.triggerEvent(new wc(e)),
                  e => t.triggerEvent(new bc(e)),
                ))
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  Hu(t => t instanceof dc),
                  Wu(() => this.preload()),
                )
                .subscribe(() => {})
            }
            preload() {
              const t = this.injector.get(Ko)
              return this.processRoutes(t, this.router.config)
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe()
            }
            processRoutes(t, e) {
              const n = []
              for (const r of e)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                  const t = r._loadedConfig
                  n.push(this.processRoutes(t.module, t.routes))
                } else
                  r.loadChildren && !r.canLoad
                    ? n.push(this.preloadConfig(t, r))
                    : r.children && n.push(this.processRoutes(t, r.children))
              return N(n).pipe(
                z(),
                T(t => {}),
              )
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                this.loader
                  .load(t.injector, e)
                  .pipe(
                    H(
                      t => (
                        (e._loadedConfig = t),
                        this.processRoutes(t.module, t.routes)
                      ),
                    ),
                  ),
              )
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(jd), Xn(sl), Xn(Ia), Xn(ni), Xn(Fd))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        $d = (() => {
          class t {
            constructor(t, e, n = {}) {
              ;(this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration =
                  n.scrollPositionRestoration || "disabled"),
                (n.anchorScrolling = n.anchorScrolling || "disabled")
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents())
            }
            createScrollEvents() {
              return this.router.events.subscribe(t => {
                t instanceof hc
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof dc &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment,
                    ))
              })
            }
            consumeScrollEvents() {
              return this.router.events.subscribe(t => {
                t instanceof Tc &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]))
              })
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new Tc(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e,
                ),
              )
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe()
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(jd), Xn(Hl), Xn(void 0))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })()
      const zd = new Nn("ROUTER_CONFIGURATION"),
        Bd = new Nn("ROUTER_FORROOT_GUARD"),
        qd = [
          Ol,
          { provide: Wc, useClass: Zc },
          {
            provide: jd,
            useFactory: function (t, e, n, r, s, i, o, a = {}, l, u) {
              const c = new jd(null, t, e, n, r, s, i, jc(o))
              if (
                (l && (c.urlHandlingStrategy = l),
                u && (c.routeReuseStrategy = u),
                (function (t, e) {
                  t.errorHandler && (e.errorHandler = t.errorHandler),
                    t.malformedUriErrorHandler &&
                      (e.malformedUriErrorHandler = t.malformedUriErrorHandler),
                    t.onSameUrlNavigation &&
                      (e.onSameUrlNavigation = t.onSameUrlNavigation),
                    t.paramsInheritanceStrategy &&
                      (e.paramsInheritanceStrategy =
                        t.paramsInheritanceStrategy),
                    t.relativeLinkResolution &&
                      (e.relativeLinkResolution = t.relativeLinkResolution),
                    t.urlUpdateStrategy &&
                      (e.urlUpdateStrategy = t.urlUpdateStrategy)
                })(a, c),
                a.enableTracing)
              ) {
                const t = pl()
                c.events.subscribe(e => {
                  t.logGroup(`Router Event: ${e.constructor.name}`),
                    t.log(e.toString()),
                    t.log(e),
                    t.logGroupEnd()
                })
              }
              return c
            },
            deps: [
              Wc,
              Od,
              Ol,
              ni,
              sl,
              Ia,
              Td,
              zd,
              [class {}, new nr()],
              [class {}, new nr()],
            ],
          },
          Od,
          {
            provide: gh,
            useFactory: function (t) {
              return t.routerState.root
            },
            deps: [jd],
          },
          { provide: sl, useClass: al },
          Ld,
          Hd,
          class {
            preload(t, e) {
              return e().pipe(zu(() => yu(null)))
            }
          },
          { provide: zd, useValue: { enableTracing: !1 } },
        ]
      function Wd() {
        return new Ja("Router", jd)
      }
      let Zd = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                qd,
                Jd(e),
                {
                  provide: Bd,
                  useFactory: Kd,
                  deps: [[jd, new nr(), new rr()]],
                },
                { provide: zd, useValue: n || {} },
                {
                  provide: xl,
                  useFactory: Qd,
                  deps: [gl, [new er(Tl), new nr()], zd],
                },
                { provide: $d, useFactory: Gd, deps: [jd, Hl, zd] },
                {
                  provide: Fd,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : Hd,
                },
                { provide: Ja, multi: !0, useFactory: Wd },
                [
                  Xd,
                  { provide: fa, multi: !0, useFactory: Yd, deps: [Xd] },
                  { provide: ep, useFactory: tp, deps: [Xd] },
                  { provide: ba, multi: !0, useExisting: ep },
                ],
              ],
            }
          }
          static forChild(e) {
            return { ngModule: t, providers: [Jd(e)] }
          }
        }
        return (
          (t.ɵmod = Lt({ type: t })),
          (t.ɵinj = at({
            factory: function (e) {
              return new (e || t)(Xn(Bd, 8), Xn(jd, 8))
            },
          })),
          t
        )
      })()
      function Gd(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new $d(t, e, n)
      }
      function Qd(t, e, n = {}) {
        return n.useHash ? new kl(t, e) : new Al(t, e)
      }
      function Kd(t) {
        return "guarded"
      }
      function Jd(t) {
        return [
          { provide: Un, multi: !0, useValue: t },
          { provide: Td, multi: !0, useValue: t },
        ]
      }
      let Xd = (() => {
        class t {
          constructor(t) {
            ;(this.injector = t),
              (this.initNavigation = !1),
              (this.resultOfPreactivationDone = new S())
          }
          appInitializer() {
            return this.injector.get(yl, Promise.resolve(null)).then(() => {
              let t = null
              const e = new Promise(e => (t = e)),
                n = this.injector.get(jd),
                r = this.injector.get(zd)
              return (
                "disabled" === r.initialNavigation
                  ? (n.setUpLocationChangeListener(), t(!0))
                  : "enabled" === r.initialNavigation ||
                    "enabledBlocking" === r.initialNavigation
                  ? ((n.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? yu(null)
                        : ((this.initNavigation = !0),
                          t(!0),
                          this.resultOfPreactivationDone)),
                    n.initialNavigation())
                  : t(!0),
                e
              )
            })
          }
          bootstrapListener(t) {
            const e = this.injector.get(zd),
              n = this.injector.get(Ld),
              r = this.injector.get($d),
              s = this.injector.get(jd),
              i = this.injector.get(nl)
            t === i.components[0] &&
              (("enabledNonBlocking" !== e.initialNavigation &&
                void 0 !== e.initialNavigation) ||
                s.initialNavigation(),
              n.setUpPreloading(),
              r.init(),
              s.resetRootComponentType(i.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete())
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(ni))
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      function Yd(t) {
        return t.appInitializer.bind(t)
      }
      function tp(t) {
        return t.bootstrapListener.bind(t)
      }
      const ep = new Nn("Router Initializer"),
        np = []
      let rp = (() => {
          class t {}
          return (
            (t.ɵmod = Lt({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)()
              },
              imports: [[Zd.forRoot(np)], Zd],
            })),
            t
          )
        })(),
        sp = (() => {
          class t {
            constructor() {
              ;(this.title = "angularapp"),
                (this.names = ["Bob", "Alice", "Dora"])
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)()
            }),
            (t.ɵcmp = Ut({
              type: t,
              selectors: [["app-root"]],
              decls: 1,
              vars: 0,
              template: function (t, e) {
                1 & t && wi(0, "router-outlet")
              },
              directives: [Ud],
              styles: [""],
            })),
            t
          )
        })()
      function ip(t, e) {
        return new _(n => {
          const r = t.length
          if (0 === r) return void n.complete()
          const s = new Array(r)
          let i = 0,
            o = 0
          for (let a = 0; a < r; a++) {
            const l = N(t[a])
            let u = !1
            n.add(
              l.subscribe({
                next: t => {
                  u || ((u = !0), o++), (s[a] = t)
                },
                error: t => n.error(t),
                complete: () => {
                  i++,
                    (i !== r && u) ||
                      (o === r &&
                        n.next(
                          e ? e.reduce((t, e, n) => ((t[e] = s[n]), t), {}) : s,
                        ),
                      n.complete())
                },
              }),
            )
          }
        })
      }
      const op = new Nn("NgValueAccessor"),
        ap = { provide: op, useExisting: rt(() => lp), multi: !0 }
      let lp = (() => {
        class t {
          constructor(t, e) {
            ;(this._renderer = t),
              (this._elementRef = e),
              (this.onChange = t => {}),
              (this.onTouched = () => {})
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "checked",
              t,
            )
          }
          registerOnChange(t) {
            this.onChange = t
          }
          registerOnTouched(t) {
            this.onTouched = t
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t,
            )
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(gi(vo), gi(yo))
          }),
          (t.ɵdir = zt({
            type: t,
            selectors: [
              ["input", "type", "checkbox", "formControlName", ""],
              ["input", "type", "checkbox", "formControl", ""],
              ["input", "type", "checkbox", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                xi("change", function (t) {
                  return e.onChange(t.target.checked)
                })("blur", function () {
                  return e.onTouched()
                })
            },
            features: [uo([ap])],
          })),
          t
        )
      })()
      const up = { provide: op, useExisting: rt(() => hp), multi: !0 },
        cp = new Nn("CompositionEventMode")
      let hp = (() => {
        class t {
          constructor(t, e, n) {
            ;(this._renderer = t),
              (this._elementRef = e),
              (this._compositionMode = n),
              (this.onChange = t => {}),
              (this.onTouched = () => {}),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function () {
                  const t = pl() ? pl().getUserAgent() : ""
                  return /android (\d+)/.test(t.toLowerCase())
                })())
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              null == t ? "" : t,
            )
          }
          registerOnChange(t) {
            this.onChange = t
          }
          registerOnTouched(t) {
            this.onTouched = t
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t,
            )
          }
          _handleInput(t) {
            ;(!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(t)
          }
          _compositionStart() {
            this._composing = !0
          }
          _compositionEnd(t) {
            ;(this._composing = !1), this._compositionMode && this.onChange(t)
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(gi(vo), gi(yo), gi(cp, 8))
          }),
          (t.ɵdir = zt({
            type: t,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                xi("input", function (t) {
                  return e._handleInput(t.target.value)
                })("blur", function () {
                  return e.onTouched()
                })("compositionstart", function () {
                  return e._compositionStart()
                })("compositionend", function (t) {
                  return e._compositionEnd(t.target.value)
                })
            },
            features: [uo([up])],
          })),
          t
        )
      })()
      function dp(t) {
        return null == t || 0 === t.length
      }
      function pp(t) {
        return null != t && "number" == typeof t.length
      }
      const fp = new Nn("NgValidators"),
        gp = new Nn("NgAsyncValidators"),
        mp =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      class yp {
        static min(t) {
          return e => {
            if (dp(e.value) || dp(t)) return null
            const n = parseFloat(e.value)
            return !isNaN(n) && n < t
              ? { min: { min: t, actual: e.value } }
              : null
          }
        }
        static max(t) {
          return e => {
            if (dp(e.value) || dp(t)) return null
            const n = parseFloat(e.value)
            return !isNaN(n) && n > t
              ? { max: { max: t, actual: e.value } }
              : null
          }
        }
        static required(t) {
          return dp(t.value) ? { required: !0 } : null
        }
        static requiredTrue(t) {
          return !0 === t.value ? null : { required: !0 }
        }
        static email(t) {
          return dp(t.value) || mp.test(t.value) ? null : { email: !0 }
        }
        static minLength(t) {
          return e =>
            dp(e.value) || !pp(e.value)
              ? null
              : e.value.length < t
              ? {
                  minlength: {
                    requiredLength: t,
                    actualLength: e.value.length,
                  },
                }
              : null
        }
        static maxLength(t) {
          return e =>
            pp(e.value) && e.value.length > t
              ? {
                  maxlength: {
                    requiredLength: t,
                    actualLength: e.value.length,
                  },
                }
              : null
        }
        static pattern(t) {
          if (!t) return yp.nullValidator
          let e, n
          return (
            "string" == typeof t
              ? ((n = ""),
                "^" !== t.charAt(0) && (n += "^"),
                (n += t),
                "$" !== t.charAt(t.length - 1) && (n += "$"),
                (e = new RegExp(n)))
              : ((n = t.toString()), (e = t)),
            t => {
              if (dp(t.value)) return null
              const r = t.value
              return e.test(r)
                ? null
                : { pattern: { requiredPattern: n, actualValue: r } }
            }
          )
        }
        static nullValidator(t) {
          return null
        }
        static compose(t) {
          if (!t) return null
          const e = t.filter(_p)
          return 0 == e.length
            ? null
            : function (t) {
                return wp(bp(t, e))
              }
        }
        static composeAsync(t) {
          if (!t) return null
          const e = t.filter(_p)
          return 0 == e.length
            ? null
            : function (t) {
                return (function (...t) {
                  if (1 === t.length) {
                    const e = t[0]
                    if (l(e)) return ip(e, null)
                    if (u(e) && Object.getPrototypeOf(e) === Object.prototype) {
                      const t = Object.keys(e)
                      return ip(
                        t.map(t => e[t]),
                        t,
                      )
                    }
                  }
                  if ("function" == typeof t[t.length - 1]) {
                    const e = t.pop()
                    return ip(
                      (t = 1 === t.length && l(t[0]) ? t[0] : t),
                      null,
                    ).pipe(T(t => e(...t)))
                  }
                  return ip(t, null)
                })(bp(t, e).map(vp)).pipe(T(wp))
              }
        }
      }
      function _p(t) {
        return null != t
      }
      function vp(t) {
        const e = Ci(t) ? N(t) : t
        return Si(e), e
      }
      function wp(t) {
        let e = {}
        return (
          t.forEach(t => {
            e = null != t ? Object.assign(Object.assign({}, e), t) : e
          }),
          0 === Object.keys(e).length ? null : e
        )
      }
      function bp(t, e) {
        return e.map(e => e(t))
      }
      function Cp(t) {
        return t.map(t =>
          (function (t) {
            return !t.validate
          })(t)
            ? t
            : e => t.validate(e),
        )
      }
      function Sp(t) {
        return null != t ? yp.compose(Cp(t)) : null
      }
      function xp(t) {
        return null != t ? yp.composeAsync(Cp(t)) : null
      }
      function Ep(t, e) {
        return null === t ? [e] : Array.isArray(t) ? [...t, e] : [t, e]
      }
      let Tp = (() => {
          class t {
            constructor() {
              ;(this._rawValidators = []),
                (this._rawAsyncValidators = []),
                (this._onDestroyCallbacks = [])
            }
            get value() {
              return this.control ? this.control.value : null
            }
            get valid() {
              return this.control ? this.control.valid : null
            }
            get invalid() {
              return this.control ? this.control.invalid : null
            }
            get pending() {
              return this.control ? this.control.pending : null
            }
            get disabled() {
              return this.control ? this.control.disabled : null
            }
            get enabled() {
              return this.control ? this.control.enabled : null
            }
            get errors() {
              return this.control ? this.control.errors : null
            }
            get pristine() {
              return this.control ? this.control.pristine : null
            }
            get dirty() {
              return this.control ? this.control.dirty : null
            }
            get touched() {
              return this.control ? this.control.touched : null
            }
            get status() {
              return this.control ? this.control.status : null
            }
            get untouched() {
              return this.control ? this.control.untouched : null
            }
            get statusChanges() {
              return this.control ? this.control.statusChanges : null
            }
            get valueChanges() {
              return this.control ? this.control.valueChanges : null
            }
            get path() {
              return null
            }
            _setValidators(t) {
              ;(this._rawValidators = t || []),
                (this._composedValidatorFn = Sp(this._rawValidators))
            }
            _setAsyncValidators(t) {
              ;(this._rawAsyncValidators = t || []),
                (this._composedAsyncValidatorFn = xp(this._rawAsyncValidators))
            }
            get validator() {
              return this._composedValidatorFn || null
            }
            get asyncValidator() {
              return this._composedAsyncValidatorFn || null
            }
            _registerOnDestroy(t) {
              this._onDestroyCallbacks.push(t)
            }
            _invokeOnDestroyCallbacks() {
              this._onDestroyCallbacks.forEach(t => t()),
                (this._onDestroyCallbacks = [])
            }
            reset(t) {
              this.control && this.control.reset(t)
            }
            hasError(t, e) {
              return !!this.control && this.control.hasError(t, e)
            }
            getError(t, e) {
              return this.control ? this.control.getError(t, e) : null
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)()
            }),
            (t.ɵdir = zt({ type: t })),
            t
          )
        })(),
        Ap = (() => {
          class t extends Tp {
            get formDirective() {
              return null
            }
            get path() {
              return null
            }
          }
          return (
            (t.ɵfac = function (e) {
              return kp(e || t)
            }),
            (t.ɵdir = zt({ type: t, features: [si] })),
            t
          )
        })()
      const kp = In(Ap)
      class Op extends Tp {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null)
        }
      }
      let Rp = (() => {
        class t extends class {
          constructor(t) {
            this._cd = t
          }
          get ngClassUntouched() {
            var t, e, n
            return (
              null !==
                (n =
                  null ===
                    (e =
                      null === (t = this._cd) || void 0 === t
                        ? void 0
                        : t.control) || void 0 === e
                    ? void 0
                    : e.untouched) &&
              void 0 !== n &&
              n
            )
          }
          get ngClassTouched() {
            var t, e, n
            return (
              null !==
                (n =
                  null ===
                    (e =
                      null === (t = this._cd) || void 0 === t
                        ? void 0
                        : t.control) || void 0 === e
                    ? void 0
                    : e.touched) &&
              void 0 !== n &&
              n
            )
          }
          get ngClassPristine() {
            var t, e, n
            return (
              null !==
                (n =
                  null ===
                    (e =
                      null === (t = this._cd) || void 0 === t
                        ? void 0
                        : t.control) || void 0 === e
                    ? void 0
                    : e.pristine) &&
              void 0 !== n &&
              n
            )
          }
          get ngClassDirty() {
            var t, e, n
            return (
              null !==
                (n =
                  null ===
                    (e =
                      null === (t = this._cd) || void 0 === t
                        ? void 0
                        : t.control) || void 0 === e
                    ? void 0
                    : e.dirty) &&
              void 0 !== n &&
              n
            )
          }
          get ngClassValid() {
            var t, e, n
            return (
              null !==
                (n =
                  null ===
                    (e =
                      null === (t = this._cd) || void 0 === t
                        ? void 0
                        : t.control) || void 0 === e
                    ? void 0
                    : e.valid) &&
              void 0 !== n &&
              n
            )
          }
          get ngClassInvalid() {
            var t, e, n
            return (
              null !==
                (n =
                  null ===
                    (e =
                      null === (t = this._cd) || void 0 === t
                        ? void 0
                        : t.control) || void 0 === e
                    ? void 0
                    : e.invalid) &&
              void 0 !== n &&
              n
            )
          }
          get ngClassPending() {
            var t, e, n
            return (
              null !==
                (n =
                  null ===
                    (e =
                      null === (t = this._cd) || void 0 === t
                        ? void 0
                        : t.control) || void 0 === e
                    ? void 0
                    : e.pending) &&
              void 0 !== n &&
              n
            )
          }
        } {
          constructor(t) {
            super(t)
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(gi(Op, 2))
          }),
          (t.ɵdir = zt({
            type: t,
            selectors: [
              ["", "formControlName", ""],
              ["", "ngModel", ""],
              ["", "formControl", ""],
            ],
            hostVars: 14,
            hostBindings: function (t, e) {
              2 & t &&
                Di("ng-untouched", e.ngClassUntouched)(
                  "ng-touched",
                  e.ngClassTouched,
                )("ng-pristine", e.ngClassPristine)("ng-dirty", e.ngClassDirty)(
                  "ng-valid",
                  e.ngClassValid,
                )("ng-invalid", e.ngClassInvalid)(
                  "ng-pending",
                  e.ngClassPending,
                )
            },
            features: [si],
          })),
          t
        )
      })()
      const Pp = { provide: op, useExisting: rt(() => Ip), multi: !0 }
      let Ip = (() => {
        class t {
          constructor(t, e) {
            ;(this._renderer = t),
              (this._elementRef = e),
              (this.onChange = t => {}),
              (this.onTouched = () => {})
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              null == t ? "" : t,
            )
          }
          registerOnChange(t) {
            this.onChange = e => {
              t("" == e ? null : parseFloat(e))
            }
          }
          registerOnTouched(t) {
            this.onTouched = t
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t,
            )
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(gi(vo), gi(yo))
          }),
          (t.ɵdir = zt({
            type: t,
            selectors: [
              ["input", "type", "number", "formControlName", ""],
              ["input", "type", "number", "formControl", ""],
              ["input", "type", "number", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                xi("input", function (t) {
                  return e.onChange(t.target.value)
                })("blur", function () {
                  return e.onTouched()
                })
            },
            features: [uo([Pp])],
          })),
          t
        )
      })()
      const Vp = { provide: op, useExisting: rt(() => Dp), multi: !0 }
      let jp = (() => {
          class t {
            constructor() {
              this._accessors = []
            }
            add(t, e) {
              this._accessors.push([t, e])
            }
            remove(t) {
              for (let e = this._accessors.length - 1; e >= 0; --e)
                if (this._accessors[e][1] === t)
                  return void this._accessors.splice(e, 1)
            }
            select(t) {
              this._accessors.forEach(e => {
                this._isSameGroup(e, t) &&
                  e[1] !== t &&
                  e[1].fireUncheck(t.value)
              })
            }
            _isSameGroup(t, e) {
              return (
                !!t[0].control &&
                t[0]._parent === e._control._parent &&
                t[1].name === e.name
              )
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)()
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        Dp = (() => {
          class t {
            constructor(t, e, n, r) {
              ;(this._renderer = t),
                (this._elementRef = e),
                (this._registry = n),
                (this._injector = r),
                (this.onChange = () => {}),
                (this.onTouched = () => {})
            }
            ngOnInit() {
              ;(this._control = this._injector.get(Op)),
                this._checkName(),
                this._registry.add(this._control, this)
            }
            ngOnDestroy() {
              this._registry.remove(this)
            }
            writeValue(t) {
              ;(this._state = t === this.value),
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "checked",
                  this._state,
                )
            }
            registerOnChange(t) {
              ;(this._fn = t),
                (this.onChange = () => {
                  t(this.value), this._registry.select(this)
                })
            }
            fireUncheck(t) {
              this.writeValue(t)
            }
            registerOnTouched(t) {
              this.onTouched = t
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t,
              )
            }
            _checkName() {
              !this.name &&
                this.formControlName &&
                (this.name = this.formControlName)
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(gi(vo), gi(yo), gi(jp), gi(ni))
            }),
            (t.ɵdir = zt({
              type: t,
              selectors: [
                ["input", "type", "radio", "formControlName", ""],
                ["input", "type", "radio", "formControl", ""],
                ["input", "type", "radio", "ngModel", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  xi("change", function () {
                    return e.onChange()
                  })("blur", function () {
                    return e.onTouched()
                  })
              },
              inputs: {
                name: "name",
                formControlName: "formControlName",
                value: "value",
              },
              features: [uo([Vp])],
            })),
            t
          )
        })()
      const Np = { provide: op, useExisting: rt(() => Up), multi: !0 }
      let Up = (() => {
        class t {
          constructor(t, e) {
            ;(this._renderer = t),
              (this._elementRef = e),
              (this.onChange = t => {}),
              (this.onTouched = () => {})
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              parseFloat(t),
            )
          }
          registerOnChange(t) {
            this.onChange = e => {
              t("" == e ? null : parseFloat(e))
            }
          }
          registerOnTouched(t) {
            this.onTouched = t
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t,
            )
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(gi(vo), gi(yo))
          }),
          (t.ɵdir = zt({
            type: t,
            selectors: [
              ["input", "type", "range", "formControlName", ""],
              ["input", "type", "range", "formControl", ""],
              ["input", "type", "range", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                xi("change", function (t) {
                  return e.onChange(t.target.value)
                })("input", function (t) {
                  return e.onChange(t.target.value)
                })("blur", function () {
                  return e.onTouched()
                })
            },
            features: [uo([Np])],
          })),
          t
        )
      })()
      const Mp = { provide: op, useExisting: rt(() => Hp), multi: !0 }
      function Fp(t, e) {
        return null == t
          ? `${e}`
          : (e && "object" == typeof e && (e = "Object"),
            `${t}: ${e}`.slice(0, 50))
      }
      let Hp = (() => {
          class t {
            constructor(t, e) {
              ;(this._renderer = t),
                (this._elementRef = e),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this.onChange = t => {}),
                (this.onTouched = () => {}),
                (this._compareWith = Object.is)
            }
            set compareWith(t) {
              this._compareWith = t
            }
            writeValue(t) {
              this.value = t
              const e = this._getOptionId(t)
              null == e &&
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "selectedIndex",
                  -1,
                )
              const n = Fp(e, t)
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                n,
              )
            }
            registerOnChange(t) {
              this.onChange = e => {
                ;(this.value = this._getOptionValue(e)), t(this.value)
              }
            }
            registerOnTouched(t) {
              this.onTouched = t
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t,
              )
            }
            _registerOption() {
              return (this._idCounter++).toString()
            }
            _getOptionId(t) {
              for (const e of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(e), t)) return e
              return null
            }
            _getOptionValue(t) {
              const e = (function (t) {
                return t.split(":")[0]
              })(t)
              return this._optionMap.has(e) ? this._optionMap.get(e) : t
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(gi(vo), gi(yo))
            }),
            (t.ɵdir = zt({
              type: t,
              selectors: [
                ["select", "formControlName", "", 3, "multiple", ""],
                ["select", "formControl", "", 3, "multiple", ""],
                ["select", "ngModel", "", 3, "multiple", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  xi("change", function (t) {
                    return e.onChange(t.target.value)
                  })("blur", function () {
                    return e.onTouched()
                  })
              },
              inputs: { compareWith: "compareWith" },
              features: [uo([Mp])],
            })),
            t
          )
        })(),
        Lp = (() => {
          class t {
            constructor(t, e, n) {
              ;(this._element = t),
                (this._renderer = e),
                (this._select = n),
                this._select && (this.id = this._select._registerOption())
            }
            set ngValue(t) {
              null != this._select &&
                (this._select._optionMap.set(this.id, t),
                this._setElementValue(Fp(this.id, t)),
                this._select.writeValue(this._select.value))
            }
            set value(t) {
              this._setElementValue(t),
                this._select && this._select.writeValue(this._select.value)
            }
            _setElementValue(t) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "value",
                t,
              )
            }
            ngOnDestroy() {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value))
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(gi(yo), gi(vo), gi(Hp, 9))
            }),
            (t.ɵdir = zt({
              type: t,
              selectors: [["option"]],
              inputs: { ngValue: "ngValue", value: "value" },
            })),
            t
          )
        })()
      const $p = { provide: op, useExisting: rt(() => Bp), multi: !0 }
      function zp(t, e) {
        return null == t
          ? `${e}`
          : ("string" == typeof e && (e = `'${e}'`),
            e && "object" == typeof e && (e = "Object"),
            `${t}: ${e}`.slice(0, 50))
      }
      let Bp = (() => {
          class t {
            constructor(t, e) {
              ;(this._renderer = t),
                (this._elementRef = e),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this.onChange = t => {}),
                (this.onTouched = () => {}),
                (this._compareWith = Object.is)
            }
            set compareWith(t) {
              this._compareWith = t
            }
            writeValue(t) {
              let e
              if (((this.value = t), Array.isArray(t))) {
                const n = t.map(t => this._getOptionId(t))
                e = (t, e) => {
                  t._setSelected(n.indexOf(e.toString()) > -1)
                }
              } else
                e = (t, e) => {
                  t._setSelected(!1)
                }
              this._optionMap.forEach(e)
            }
            registerOnChange(t) {
              this.onChange = e => {
                const n = []
                if (void 0 !== e.selectedOptions) {
                  const t = e.selectedOptions
                  for (let e = 0; e < t.length; e++) {
                    const r = t.item(e),
                      s = this._getOptionValue(r.value)
                    n.push(s)
                  }
                } else {
                  const t = e.options
                  for (let e = 0; e < t.length; e++) {
                    const r = t.item(e)
                    if (r.selected) {
                      const t = this._getOptionValue(r.value)
                      n.push(t)
                    }
                  }
                }
                ;(this.value = n), t(n)
              }
            }
            registerOnTouched(t) {
              this.onTouched = t
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t,
              )
            }
            _registerOption(t) {
              const e = (this._idCounter++).toString()
              return this._optionMap.set(e, t), e
            }
            _getOptionId(t) {
              for (const e of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(e)._value, t))
                  return e
              return null
            }
            _getOptionValue(t) {
              const e = (function (t) {
                return t.split(":")[0]
              })(t)
              return this._optionMap.has(e) ? this._optionMap.get(e)._value : t
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(gi(vo), gi(yo))
            }),
            (t.ɵdir = zt({
              type: t,
              selectors: [
                ["select", "multiple", "", "formControlName", ""],
                ["select", "multiple", "", "formControl", ""],
                ["select", "multiple", "", "ngModel", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  xi("change", function (t) {
                    return e.onChange(t.target)
                  })("blur", function () {
                    return e.onTouched()
                  })
              },
              inputs: { compareWith: "compareWith" },
              features: [uo([$p])],
            })),
            t
          )
        })(),
        qp = (() => {
          class t {
            constructor(t, e, n) {
              ;(this._element = t),
                (this._renderer = e),
                (this._select = n),
                this._select && (this.id = this._select._registerOption(this))
            }
            set ngValue(t) {
              null != this._select &&
                ((this._value = t),
                this._setElementValue(zp(this.id, t)),
                this._select.writeValue(this._select.value))
            }
            set value(t) {
              this._select
                ? ((this._value = t),
                  this._setElementValue(zp(this.id, t)),
                  this._select.writeValue(this._select.value))
                : this._setElementValue(t)
            }
            _setElementValue(t) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "value",
                t,
              )
            }
            _setSelected(t) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "selected",
                t,
              )
            }
            ngOnDestroy() {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value))
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(gi(yo), gi(vo), gi(Bp, 9))
            }),
            (t.ɵdir = zt({
              type: t,
              selectors: [["option"]],
              inputs: { ngValue: "ngValue", value: "value" },
            })),
            t
          )
        })()
      function Wp(t, e) {
        t.forEach(t => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(e)
        })
      }
      function Zp(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1)
      }
      const Gp = [lp, Up, Ip, Hp, Bp, Dp]
      function Qp(t, e) {
        const n = t.indexOf(e)
        n > -1 && t.splice(n, 1)
      }
      const Kp = "VALID",
        Jp = "INVALID",
        Xp = "PENDING",
        Yp = "DISABLED"
      function tf(t) {
        return (sf(t) ? t.validators : t) || null
      }
      function ef(t) {
        return Array.isArray(t) ? Sp(t) : t || null
      }
      function nf(t, e) {
        return (sf(e) ? e.asyncValidators : t) || null
      }
      function rf(t) {
        return Array.isArray(t) ? xp(t) : t || null
      }
      function sf(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t
      }
      class of {
        constructor(t, e) {
          ;(this._hasOwnPendingAsyncValidator = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = t),
            (this._rawAsyncValidators = e),
            (this._composedValidatorFn = ef(this._rawValidators)),
            (this._composedAsyncValidatorFn = rf(this._rawAsyncValidators))
        }
        get validator() {
          return this._composedValidatorFn
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t
        }
        get parent() {
          return this._parent
        }
        get valid() {
          return this.status === Kp
        }
        get invalid() {
          return this.status === Jp
        }
        get pending() {
          return this.status == Xp
        }
        get disabled() {
          return this.status === Yp
        }
        get enabled() {
          return this.status !== Yp
        }
        get dirty() {
          return !this.pristine
        }
        get untouched() {
          return !this.touched
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change"
        }
        setValidators(t) {
          ;(this._rawValidators = t), (this._composedValidatorFn = ef(t))
        }
        setAsyncValidators(t) {
          ;(this._rawAsyncValidators = t),
            (this._composedAsyncValidatorFn = rf(t))
        }
        clearValidators() {
          this.validator = null
        }
        clearAsyncValidators() {
          this.asyncValidator = null
        }
        markAsTouched(t = {}) {
          ;(this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t)
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild(t => t.markAllAsTouched())
        }
        markAsUntouched(t = {}) {
          ;(this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild(t => {
              t.markAsUntouched({ onlySelf: !0 })
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t)
        }
        markAsDirty(t = {}) {
          ;(this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t)
        }
        markAsPristine(t = {}) {
          ;(this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild(t => {
              t.markAsPristine({ onlySelf: !0 })
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t)
        }
        markAsPending(t = {}) {
          ;(this.status = Xp),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t)
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf)
          ;(this.status = Yp),
            (this.errors = null),
            this._forEachChild(e => {
              e.disable(Object.assign(Object.assign({}, t), { onlySelf: !0 }))
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e }),
            ),
            this._onDisabledChange.forEach(t => t(!0))
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf)
          ;(this.status = Kp),
            this._forEachChild(e => {
              e.enable(Object.assign(Object.assign({}, t), { onlySelf: !0 }))
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e }),
            ),
            this._onDisabledChange.forEach(t => t(!1))
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched())
        }
        setParent(t) {
          this._parent = t
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status !== Kp && this.status !== Xp) ||
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t)
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild(e => e._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            })
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Yp : Kp
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            ;(this.status = Xp), (this._hasOwnPendingAsyncValidator = !0)
            const e = vp(this.asyncValidator(this))
            this._asyncValidationSubscription = e.subscribe(e => {
              ;(this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(e, { emitEvent: t })
            })
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1))
        }
        setErrors(t, e = {}) {
          ;(this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent)
        }
        get(t) {
          return (function (t, e, n) {
            if (null == e) return null
            if (
              (Array.isArray(e) || (e = e.split(".")),
              Array.isArray(e) && 0 === e.length)
            )
              return null
            let r = t
            return (
              e.forEach(t => {
                r =
                  r instanceof lf
                    ? r.controls.hasOwnProperty(t)
                      ? r.controls[t]
                      : null
                    : (r instanceof uf && r.at(t)) || null
              }),
              r
            )
          })(this, t)
        }
        getError(t, e) {
          const n = e ? this.get(e) : this
          return n && n.errors ? n.errors[t] : null
        }
        hasError(t, e) {
          return !!this.getError(t, e)
        }
        get root() {
          let t = this
          for (; t._parent; ) t = t._parent
          return t
        }
        _updateControlsErrors(t) {
          ;(this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t)
        }
        _initObservables() {
          ;(this.valueChanges = new pa()), (this.statusChanges = new pa())
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Yp
            : this.errors
            ? Jp
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Xp)
            ? Xp
            : this._anyControlsHaveStatus(Jp)
            ? Jp
            : Kp
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls(e => e.status === t)
        }
        _anyControlsDirty() {
          return this._anyControls(t => t.dirty)
        }
        _anyControlsTouched() {
          return this._anyControls(t => t.touched)
        }
        _updatePristine(t = {}) {
          ;(this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t)
        }
        _updateTouched(t = {}) {
          ;(this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t)
        }
        _isBoxedValue(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            2 === Object.keys(t).length &&
            "value" in t &&
            "disabled" in t
          )
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t
        }
        _setUpdateStrategy(t) {
          sf(t) && null != t.updateOn && (this._updateOn = t.updateOn)
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          )
        }
      }
      class af extends of {
        constructor(t = null, e, n) {
          super(tf(e), nf(n, e)),
            (this._onChange = []),
            this._applyFormState(t),
            this._setUpdateStrategy(e),
            this._initObservables(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!n })
        }
        setValue(t, e = {}) {
          ;(this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== e.emitModelToViewChange &&
              this._onChange.forEach(t =>
                t(this.value, !1 !== e.emitViewToModelChange),
              ),
            this.updateValueAndValidity(e)
        }
        patchValue(t, e = {}) {
          this.setValue(t, e)
        }
        reset(t = null, e = {}) {
          this._applyFormState(t),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1)
        }
        _updateValue() {}
        _anyControls(t) {
          return !1
        }
        _allControlsDisabled() {
          return this.disabled
        }
        registerOnChange(t) {
          this._onChange.push(t)
        }
        _unregisterOnChange(t) {
          Qp(this._onChange, t)
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t)
        }
        _unregisterOnDisabledChange(t) {
          Qp(this._onDisabledChange, t)
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          )
        }
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t)
        }
      }
      class lf extends of {
        constructor(t, e, n) {
          super(tf(e), nf(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!n })
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e),
              e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange),
              e)
        }
        addControl(t, e) {
          this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange()
        }
        removeControl(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity(),
            this._onCollectionChange()
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange()
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            Object.keys(t).forEach(n => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(t[n], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                })
            }),
            this.updateValueAndValidity(e)
        }
        patchValue(t, e = {}) {
          Object.keys(t).forEach(n => {
            this.controls[n] &&
              this.controls[n].patchValue(t[n], {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              })
          }),
            this.updateValueAndValidity(e)
        }
        reset(t = {}, e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent })
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e)
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => (
              (t[n] = e instanceof af ? e.value : e.getRawValue()), t
            ),
          )
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (t, e) => !!e._syncPendingControls() || t,
          )
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t
        }
        _throwIfControlMissing(t) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ",
            )
          if (!this.controls[t])
            throw new Error(`Cannot find form control with name: ${t}.`)
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach(e => {
            const n = this.controls[e]
            n && t(n, e)
          })
        }
        _setUpControls() {
          this._forEachChild(t => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange)
          })
        }
        _updateValue() {
          this.value = this._reduceValue()
        }
        _anyControls(t) {
          for (const e of Object.keys(this.controls)) {
            const n = this.controls[e]
            if (this.contains(e) && t(n)) return !0
          }
          return !1
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t),
          )
        }
        _reduceChildren(t, e) {
          let n = t
          return (
            this._forEachChild((t, r) => {
              n = e(n, t, r)
            }),
            n
          )
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1
          return Object.keys(this.controls).length > 0 || this.disabled
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`,
              )
          })
        }
      }
      class uf extends of {
        constructor(t, e, n) {
          super(tf(e), nf(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!n })
        }
        at(t) {
          return this.controls[t]
        }
        push(t) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity(),
            this._onCollectionChange()
        }
        insert(t, e) {
          this.controls.splice(t, 0, e),
            this._registerControl(e),
            this.updateValueAndValidity()
        }
        removeAt(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity()
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            e && (this.controls.splice(t, 0, e), this._registerControl(e)),
            this.updateValueAndValidity(),
            this._onCollectionChange()
        }
        get length() {
          return this.controls.length
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            t.forEach((t, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(t, { onlySelf: !0, emitEvent: e.emitEvent })
            }),
            this.updateValueAndValidity(e)
        }
        patchValue(t, e = {}) {
          t.forEach((t, n) => {
            this.at(n) &&
              this.at(n).patchValue(t, { onlySelf: !0, emitEvent: e.emitEvent })
          }),
            this.updateValueAndValidity(e)
        }
        reset(t = [], e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent })
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e)
        }
        getRawValue() {
          return this.controls.map(t =>
            t instanceof af ? t.value : t.getRawValue(),
          )
        }
        clear() {
          this.controls.length < 1 ||
            (this._forEachChild(t => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity())
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (t, e) => !!e._syncPendingControls() || t,
            !1,
          )
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t
        }
        _throwIfControlMissing(t) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ",
            )
          if (!this.at(t))
            throw new Error(`Cannot find form control at index ${t}`)
        }
        _forEachChild(t) {
          this.controls.forEach((e, n) => {
            t(e, n)
          })
        }
        _updateValue() {
          this.value = this.controls
            .filter(t => t.enabled || this.disabled)
            .map(t => t.value)
        }
        _anyControls(t) {
          return this.controls.some(e => e.enabled && t(e))
        }
        _setUpControls() {
          this._forEachChild(t => this._registerControl(t))
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`,
              )
          })
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1
          return this.controls.length > 0 || this.disabled
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange)
        }
      }
      const cf = { provide: Op, useExisting: rt(() => df) },
        hf = (() => Promise.resolve(null))()
      let df = (() => {
          class t extends Op {
            constructor(t, e, n, r) {
              super(),
                (this.control = new af()),
                (this._registered = !1),
                (this.update = new pa()),
                (this._parent = t),
                this._setValidators(e),
                this._setAsyncValidators(n),
                (this.valueAccessor = (function (t, e) {
                  if (!e) return null
                  let n, r, s
                  return (
                    Array.isArray(e),
                    e.forEach(t => {
                      var e
                      t.constructor === hp
                        ? (n = t)
                        : ((e = t),
                          Gp.some(t => e.constructor === t) ? (r = t) : (s = t))
                    }),
                    s || r || n || null
                  )
                })(0, r))
            }
            ngOnChanges(t) {
              this._checkForErrors(),
                this._registered || this._setUpControl(),
                "isDisabled" in t && this._updateDisabled(t),
                (function (t, e) {
                  if (!t.hasOwnProperty("model")) return !1
                  const n = t.model
                  return !!n.isFirstChange() || !Object.is(e, n.currentValue)
                })(t, this.viewModel) &&
                  (this._updateValue(this.model), (this.viewModel = this.model))
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this)
            }
            get path() {
              return this._parent
                ? [...this._parent.path, this.name]
                : [this.name]
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null
            }
            viewToModelUpdate(t) {
              ;(this.viewModel = t), this.update.emit(t)
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0)
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn)
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              )
            }
            _setUpStandalone() {
              var t, e
              ;(function (t, e, n) {
                const r = (function (t) {
                  return t._rawValidators
                })(t)
                null !== e.validator
                  ? t.setValidators(Ep(r, e.validator))
                  : "function" == typeof r && t.setValidators([r])
                const s = (function (t) {
                  return t._rawAsyncValidators
                })(t)
                null !== e.asyncValidator
                  ? t.setAsyncValidators(Ep(s, e.asyncValidator))
                  : "function" == typeof s && t.setAsyncValidators([s])
                {
                  const n = () => t.updateValueAndValidity()
                  Wp(e._rawValidators, n), Wp(e._rawAsyncValidators, n)
                }
              })((t = this.control), (e = this)),
                e.valueAccessor.writeValue(t.value),
                (function (t, e) {
                  e.valueAccessor.registerOnChange(n => {
                    ;(t._pendingValue = n),
                      (t._pendingChange = !0),
                      (t._pendingDirty = !0),
                      "change" === t.updateOn && Zp(t, e)
                  })
                })(t, e),
                (function (t, e) {
                  const n = (t, n) => {
                    e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t)
                  }
                  t.registerOnChange(n),
                    e._registerOnDestroy(() => {
                      t._unregisterOnChange(n)
                    })
                })(t, e),
                (function (t, e) {
                  e.valueAccessor.registerOnTouched(() => {
                    ;(t._pendingTouched = !0),
                      "blur" === t.updateOn && t._pendingChange && Zp(t, e),
                      "submit" !== t.updateOn && t.markAsTouched()
                  })
                })(t, e),
                (function (t, e) {
                  if (e.valueAccessor.setDisabledState) {
                    const n = t => {
                      e.valueAccessor.setDisabledState(t)
                    }
                    t.registerOnDisabledChange(n),
                      e._registerOnDestroy(() => {
                        t._unregisterOnDisabledChange(n)
                      })
                  }
                })(t, e),
                this.control.updateValueAndValidity({ emitEvent: !1 })
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(), this._checkName()
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone()
            }
            _updateValue(t) {
              hf.then(() => {
                this.control.setValue(t, { emitViewToModelChange: !1 })
              })
            }
            _updateDisabled(t) {
              const e = t.isDisabled.currentValue,
                n = "" === e || (e && "false" !== e)
              hf.then(() => {
                n && !this.control.disabled
                  ? this.control.disable()
                  : !n && this.control.disabled && this.control.enable()
              })
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(gi(Ap, 9), gi(fp, 10), gi(gp, 10), gi(op, 10))
            }),
            (t.ɵdir = zt({
              type: t,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [uo([cf]), si, oe],
            })),
            t
          )
        })(),
        pf = (() => {
          class t {}
          return (
            (t.ɵmod = Lt({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)()
              },
            })),
            t
          )
        })(),
        ff = (() => {
          class t {}
          return (
            (t.ɵmod = Lt({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)()
              },
              providers: [jp],
              imports: [pf],
            })),
            t
          )
        })()
      class gf {}
      class mf {}
      class yf {
        constructor(t) {
          ;(this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        ;(this.headers = new Map()),
                          t.split("\n").forEach(t => {
                            const e = t.indexOf(":")
                            if (e > 0) {
                              const n = t.slice(0, e),
                                r = n.toLowerCase(),
                                s = t.slice(e + 1).trim()
                              this.maybeSetNormalizedName(n, r),
                                this.headers.has(r)
                                  ? this.headers.get(r).push(s)
                                  : this.headers.set(r, [s])
                            }
                          })
                      }
                    : () => {
                        ;(this.headers = new Map()),
                          Object.keys(t).forEach(e => {
                            let n = t[e]
                            const r = e.toLowerCase()
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(r, n),
                                this.maybeSetNormalizedName(e, r))
                          })
                      })
              : (this.headers = new Map())
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase())
        }
        get(t) {
          this.init()
          const e = this.headers.get(t.toLowerCase())
          return e && e.length > 0 ? e[0] : null
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values())
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: "a" })
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: "s" })
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: "d" })
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t)
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof yf
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach(t => this.applyUpdate(t)),
              (this.lazyUpdate = null)))
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach(e => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e))
            })
        }
        clone(t) {
          const e = new yf()
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof yf
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          )
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase()
          switch (t.op) {
            case "a":
            case "s":
              let n = t.value
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return
              this.maybeSetNormalizedName(t.name, e)
              const r = ("a" === t.op ? this.headers.get(e) : void 0) || []
              r.push(...n), this.headers.set(e, r)
              break
            case "d":
              const s = t.value
              if (s) {
                let t = this.headers.get(e)
                if (!t) return
                ;(t = t.filter(t => -1 === s.indexOf(t))),
                  0 === t.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, t)
              } else this.headers.delete(e), this.normalizedNames.delete(e)
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach(e =>
              t(this.normalizedNames.get(e), this.headers.get(e)),
            )
        }
      }
      class _f {
        encodeKey(t) {
          return vf(t)
        }
        encodeValue(t) {
          return vf(t)
        }
        decodeKey(t) {
          return decodeURIComponent(t)
        }
        decodeValue(t) {
          return decodeURIComponent(t)
        }
      }
      function vf(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/")
      }
      class wf {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new _f()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.")
            this.map = (function (t, e) {
              const n = new Map()
              return (
                t.length > 0 &&
                  t.split("&").forEach(t => {
                    const r = t.indexOf("="),
                      [s, i] =
                        -1 == r
                          ? [e.decodeKey(t), ""]
                          : [
                              e.decodeKey(t.slice(0, r)),
                              e.decodeValue(t.slice(r + 1)),
                            ],
                      o = n.get(s) || []
                    o.push(i), n.set(s, o)
                  }),
                n
              )
            })(t.fromString, this.encoder)
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach(e => {
                  const n = t.fromObject[e]
                  this.map.set(e, Array.isArray(n) ? n : [n])
                }))
              : (this.map = null)
        }
        has(t) {
          return this.init(), this.map.has(t)
        }
        get(t) {
          this.init()
          const e = this.map.get(t)
          return e ? e[0] : null
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null
        }
        keys() {
          return this.init(), Array.from(this.map.keys())
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: "a" })
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: "s" })
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: "d" })
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map(t => {
                const e = this.encoder.encodeKey(t)
                return this.map
                  .get(t)
                  .map(t => e + "=" + this.encoder.encodeValue(t))
                  .join("&")
              })
              .filter(t => "" !== t)
              .join("&")
          )
        }
        clone(t) {
          const e = new wf({ encoder: this.encoder })
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat([t])),
            e
          )
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach(t => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach(t => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const e =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || []
                    e.push(t.value), this.map.set(t.param, e)
                    break
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param)
                      break
                    }
                    {
                      let e = this.map.get(t.param) || []
                      const n = e.indexOf(t.value)
                      ;-1 !== n && e.splice(n, 1),
                        e.length > 0
                          ? this.map.set(t.param, e)
                          : this.map.delete(t.param)
                    }
                }
              }),
              (this.cloneFrom = this.updates = null))
        }
      }
      function bf(t) {
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
      }
      function Cf(t) {
        return "undefined" != typeof Blob && t instanceof Blob
      }
      function Sf(t) {
        return "undefined" != typeof FormData && t instanceof FormData
      }
      class xf {
        constructor(t, e, n, r) {
          let s
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function (t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1
                default:
                  return !0
              }
            })(this.method) || r
              ? ((this.body = void 0 !== n ? n : null), (s = r))
              : (s = n),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new yf()),
            this.params)
          ) {
            const t = this.params.toString()
            if (0 === t.length) this.urlWithParams = e
            else {
              const n = e.indexOf("?")
              this.urlWithParams =
                e + (-1 === n ? "?" : n < e.length - 1 ? "&" : "") + t
            }
          } else (this.params = new wf()), (this.urlWithParams = e)
        }
        serializeBody() {
          return null === this.body
            ? null
            : bf(this.body) ||
              Cf(this.body) ||
              Sf(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof wf
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString()
        }
        detectContentTypeHeader() {
          return null === this.body || Sf(this.body)
            ? null
            : Cf(this.body)
            ? this.body.type || null
            : bf(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof wf
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null
        }
        clone(t = {}) {
          const e = t.method || this.method,
            n = t.url || this.url,
            r = t.responseType || this.responseType,
            s = void 0 !== t.body ? t.body : this.body,
            i =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            o =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress
          let a = t.headers || this.headers,
            l = t.params || this.params
          return (
            void 0 !== t.setHeaders &&
              (a = Object.keys(t.setHeaders).reduce(
                (e, n) => e.set(n, t.setHeaders[n]),
                a,
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (e, n) => e.set(n, t.setParams[n]),
                l,
              )),
            new xf(e, n, s, {
              params: l,
              headers: a,
              reportProgress: o,
              responseType: r,
              withCredentials: i,
            })
          )
        }
      }
      var Ef = (function (t) {
        return (
          (t[(t.Sent = 0)] = "Sent"),
          (t[(t.UploadProgress = 1)] = "UploadProgress"),
          (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
          (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
          (t[(t.Response = 4)] = "Response"),
          (t[(t.User = 5)] = "User"),
          t
        )
      })({})
      class Tf {
        constructor(t, e = 200, n = "OK") {
          ;(this.headers = t.headers || new yf()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300)
        }
      }
      class Af extends Tf {
        constructor(t = {}) {
          super(t), (this.type = Ef.ResponseHeader)
        }
        clone(t = {}) {
          return new Af({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          })
        }
      }
      class kf extends Tf {
        constructor(t = {}) {
          super(t),
            (this.type = Ef.Response),
            (this.body = void 0 !== t.body ? t.body : null)
        }
        clone(t = {}) {
          return new kf({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          })
        }
      }
      class Of extends Tf {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null)
        }
      }
      function Rf(t, e) {
        return {
          body: e,
          headers: t.headers,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        }
      }
      let Pf = (() => {
        class t {
          constructor(t) {
            this.handler = t
          }
          request(t, e, n = {}) {
            let r
            if (t instanceof xf) r = t
            else {
              let s, i
              ;(s = n.headers instanceof yf ? n.headers : new yf(n.headers)),
                n.params &&
                  (i =
                    n.params instanceof wf
                      ? n.params
                      : new wf({ fromObject: n.params })),
                (r = new xf(t, e, void 0 !== n.body ? n.body : null, {
                  headers: s,
                  params: i,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || "json",
                  withCredentials: n.withCredentials,
                }))
            }
            const s = yu(r).pipe(Wu(t => this.handler.handle(t)))
            if (t instanceof xf || "events" === n.observe) return s
            const i = s.pipe(Hu(t => t instanceof kf))
            switch (n.observe || "body") {
              case "body":
                switch (r.responseType) {
                  case "arraybuffer":
                    return i.pipe(
                      T(t => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.")
                        return t.body
                      }),
                    )
                  case "blob":
                    return i.pipe(
                      T(t => {
                        if (null !== t.body && !(t.body instanceof Blob))
                          throw new Error("Response is not a Blob.")
                        return t.body
                      }),
                    )
                  case "text":
                    return i.pipe(
                      T(t => {
                        if (null !== t.body && "string" != typeof t.body)
                          throw new Error("Response is not a string.")
                        return t.body
                      }),
                    )
                  case "json":
                  default:
                    return i.pipe(T(t => t.body))
                }
              case "response":
                return i
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${n.observe}}`,
                )
            }
          }
          delete(t, e = {}) {
            return this.request("DELETE", t, e)
          }
          get(t, e = {}) {
            return this.request("GET", t, e)
          }
          head(t, e = {}) {
            return this.request("HEAD", t, e)
          }
          jsonp(t, e) {
            return this.request("JSONP", t, {
              params: new wf().append(e, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            })
          }
          options(t, e = {}) {
            return this.request("OPTIONS", t, e)
          }
          patch(t, e, n = {}) {
            return this.request("PATCH", t, Rf(n, e))
          }
          post(t, e, n = {}) {
            return this.request("POST", t, Rf(n, e))
          }
          put(t, e, n = {}) {
            return this.request("PUT", t, Rf(n, e))
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Xn(gf))
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      class If {
        constructor(t, e) {
          ;(this.next = t), (this.interceptor = e)
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next)
        }
      }
      const Vf = new Nn("HTTP_INTERCEPTORS")
      let jf = (() => {
        class t {
          intercept(t, e) {
            return e.handle(t)
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)()
          }),
          (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
          t
        )
      })()
      const Df = /^\)\]\}',?\n/
      class Nf {}
      let Uf = (() => {
          class t {
            constructor() {}
            build() {
              return new XMLHttpRequest()
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)()
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        Mf = (() => {
          class t {
            constructor(t) {
              this.xhrFactory = t
            }
            handle(t) {
              if ("JSONP" === t.method)
                throw new Error(
                  "Attempted to construct Jsonp request without HttpClientJsonpModule installed.",
                )
              return new _(e => {
                const n = this.xhrFactory.build()
                if (
                  (n.open(t.method, t.urlWithParams),
                  t.withCredentials && (n.withCredentials = !0),
                  t.headers.forEach((t, e) =>
                    n.setRequestHeader(t, e.join(",")),
                  ),
                  t.headers.has("Accept") ||
                    n.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*",
                    ),
                  !t.headers.has("Content-Type"))
                ) {
                  const e = t.detectContentTypeHeader()
                  null !== e && n.setRequestHeader("Content-Type", e)
                }
                if (t.responseType) {
                  const e = t.responseType.toLowerCase()
                  n.responseType = "json" !== e ? e : "text"
                }
                const r = t.serializeBody()
                let s = null
                const i = () => {
                    if (null !== s) return s
                    const e = 1223 === n.status ? 204 : n.status,
                      r = n.statusText || "OK",
                      i = new yf(n.getAllResponseHeaders()),
                      o =
                        (function (t) {
                          return "responseURL" in t && t.responseURL
                            ? t.responseURL
                            : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                            ? t.getResponseHeader("X-Request-URL")
                            : null
                        })(n) || t.url
                    return (
                      (s = new Af({
                        headers: i,
                        status: e,
                        statusText: r,
                        url: o,
                      })),
                      s
                    )
                  },
                  o = () => {
                    let { headers: r, status: s, statusText: o, url: a } = i(),
                      l = null
                    204 !== s &&
                      (l = void 0 === n.response ? n.responseText : n.response),
                      0 === s && (s = l ? 200 : 0)
                    let u = s >= 200 && s < 300
                    if ("json" === t.responseType && "string" == typeof l) {
                      const t = l
                      l = l.replace(Df, "")
                      try {
                        l = "" !== l ? JSON.parse(l) : null
                      } catch (c) {
                        ;(l = t), u && ((u = !1), (l = { error: c, text: l }))
                      }
                    }
                    u
                      ? (e.next(
                          new kf({
                            body: l,
                            headers: r,
                            status: s,
                            statusText: o,
                            url: a || void 0,
                          }),
                        ),
                        e.complete())
                      : e.error(
                          new Of({
                            error: l,
                            headers: r,
                            status: s,
                            statusText: o,
                            url: a || void 0,
                          }),
                        )
                  },
                  a = t => {
                    const { url: r } = i(),
                      s = new Of({
                        error: t,
                        status: n.status || 0,
                        statusText: n.statusText || "Unknown Error",
                        url: r || void 0,
                      })
                    e.error(s)
                  }
                let l = !1
                const u = r => {
                    l || (e.next(i()), (l = !0))
                    let s = { type: Ef.DownloadProgress, loaded: r.loaded }
                    r.lengthComputable && (s.total = r.total),
                      "text" === t.responseType &&
                        n.responseText &&
                        (s.partialText = n.responseText),
                      e.next(s)
                  },
                  c = t => {
                    let n = { type: Ef.UploadProgress, loaded: t.loaded }
                    t.lengthComputable && (n.total = t.total), e.next(n)
                  }
                return (
                  n.addEventListener("load", o),
                  n.addEventListener("error", a),
                  t.reportProgress &&
                    (n.addEventListener("progress", u),
                    null !== r &&
                      n.upload &&
                      n.upload.addEventListener("progress", c)),
                  n.send(r),
                  e.next({ type: Ef.Sent }),
                  () => {
                    n.removeEventListener("error", a),
                      n.removeEventListener("load", o),
                      t.reportProgress &&
                        (n.removeEventListener("progress", u),
                        null !== r &&
                          n.upload &&
                          n.upload.removeEventListener("progress", c)),
                      n.readyState !== n.DONE && n.abort()
                  }
                )
              })
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(Nf))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })()
      const Ff = new Nn("XSRF_COOKIE_NAME"),
        Hf = new Nn("XSRF_HEADER_NAME")
      class Lf {}
      let $f = (() => {
          class t {
            constructor(t, e, n) {
              ;(this.doc = t),
                (this.platform = e),
                (this.cookieName = n),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0)
            }
            getToken() {
              if ("server" === this.platform) return null
              const t = this.doc.cookie || ""
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = Dl(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              )
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(fl), Xn(wa), Xn(Ff))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        zf = (() => {
          class t {
            constructor(t, e) {
              ;(this.tokenService = t), (this.headerName = e)
            }
            intercept(t, e) {
              const n = t.url.toLowerCase()
              if (
                "GET" === t.method ||
                "HEAD" === t.method ||
                n.startsWith("http://") ||
                n.startsWith("https://")
              )
                return e.handle(t)
              const r = this.tokenService.getToken()
              return (
                null === r ||
                  t.headers.has(this.headerName) ||
                  (t = t.clone({ headers: t.headers.set(this.headerName, r) })),
                e.handle(t)
              )
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(Lf), Xn(Hf))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        Bf = (() => {
          class t {
            constructor(t, e) {
              ;(this.backend = t), (this.injector = e), (this.chain = null)
            }
            handle(t) {
              if (null === this.chain) {
                const t = this.injector.get(Vf, [])
                this.chain = t.reduceRight((t, e) => new If(t, e), this.backend)
              }
              return this.chain.handle(t)
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(mf), Xn(ni))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        qf = (() => {
          class t {
            static disable() {
              return { ngModule: t, providers: [{ provide: zf, useClass: jf }] }
            }
            static withOptions(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.cookieName ? { provide: Ff, useValue: e.cookieName } : [],
                  e.headerName ? { provide: Hf, useValue: e.headerName } : [],
                ],
              }
            }
          }
          return (
            (t.ɵmod = Lt({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)()
              },
              providers: [
                zf,
                { provide: Vf, useExisting: zf, multi: !0 },
                { provide: Lf, useClass: $f },
                { provide: Ff, useValue: "XSRF-TOKEN" },
                { provide: Hf, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            t
          )
        })(),
        Wf = (() => {
          class t {}
          return (
            (t.ɵmod = Lt({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)()
              },
              providers: [
                Pf,
                { provide: gf, useClass: Bf },
                Mf,
                { provide: mf, useExisting: Mf },
                Uf,
                { provide: Nf, useExisting: Uf },
              ],
              imports: [
                [
                  qf.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            t
          )
        })()
      class Zf {
        constructor(t, e) {
          ;(this.product = t), (this.quantity = e)
        }
        get total() {
          return this.product.price * this.quantity
        }
      }
      class Gf {
        constructor(t) {
          ;(this.lines = new Map()),
            t && t.forEach(t => this.lines.set(t.product.id, t))
        }
        addProduct(t, e) {
          this.lines.has(t.id)
            ? 0 === e
              ? this.removeProduct(t.id)
              : (this.lines.get(t.id).quantity += e)
            : this.lines.set(t.id, new Zf(t, e))
        }
        removeProduct(t) {
          this.lines.delete(t)
        }
        get orderLines() {
          return [...this.lines.values()]
        }
        get productCount() {
          return [...this.lines.values()].reduce((t, e) => t + e.quantity, 0)
        }
        get total() {
          return [...this.lines.values()].reduce((t, e) => t + e.total, 0)
        }
      }
      class Qf {}
      let Kf = (() => {
          class t {
            constructor(t) {
              ;(this.impl = t),
                (this._products = []),
                (this._categories = new Set()),
                (this.order = new Gf()),
                this.getData()
            }
            getProducts(t = "id", e) {
              return this.selectProducts(this._products, t, e)
            }
            getData() {
              ;(this._products = []),
                this._categories.clear(),
                this.impl.loadProducts().subscribe(t => {
                  t.forEach(t => {
                    this._products.push(t), this._categories.add(t.category)
                  })
                })
            }
            selectProducts(t, e, n) {
              return t
                .filter(t => void 0 === n || t.category === n)
                .sort((t, n) => (t[e] < n[e] ? -1 : t[e] > n[e] ? 1 : 0))
            }
            getCategories() {
              return [...this._categories.values()]
            }
            storeOrder() {
              return this.impl.storeOrder(this.order)
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(Qf))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        Jf = (() => {
          class t extends Qf {
            constructor(t) {
              super(), (this.http = t)
            }
            loadProducts() {
              return this.http.get("/api/products")
            }
            storeOrder(t) {
              let e = {
                lines: [...t.orderLines.values()].map(t => ({
                  productId: t.product.id,
                  productName: t.product.name,
                  quantity: t.quantity,
                })),
              }
              return this.http.post("/api/orders", e).pipe(T(t => t.id))
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Xn(Pf))
            }),
            (t.ɵprov = ot({ token: t, factory: t.ɵfac })),
            t
          )
        })(),
        Xf = (() => {
          class t {}
          return (
            (t.ɵmod = Lt({ type: t })),
            (t.ɵinj = at({
              factory: function (e) {
                return new (e || t)()
              },
              providers: [Kf, { provide: Qf, useClass: Jf }],
              imports: [[Wf]],
            })),
            t
          )
        })(),
        Yf = (() => {
          class t {
            constructor() {
              this.submit = new pa()
            }
            get headerText() {
              let t = this.order.productCount
              return 0 === t
                ? "(No Selection)"
                : `${t} product(s), $${this.order.total.toFixed(2)}`
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)()
            }),
            (t.ɵcmp = Ut({
              type: t,
              selectors: [["header"]],
              inputs: { order: "order" },
              outputs: { submit: "submit" },
              decls: 4,
              vars: 1,
              consts: [
                [1, "p-1", "bg-secondary", "text-white", "text-right"],
                [1, "btn", "btn-sm", "btn-primary", "m-1", 3, "click"],
              ],
              template: function (t, e) {
                1 & t &&
                  (_i(0, "div", 0),
                  qi(1),
                  _i(2, "button", 1),
                  xi("click", function () {
                    return e.submit.emit()
                  }),
                  qi(3, " Submit Order "),
                  vi(),
                  vi()),
                  2 & t && (Gr(1), Zi(" ", e.headerText, " "))
              },
              encapsulation: 2,
            })),
            t
          )
        })()
      function tg(t, e) {
        if (1 & t) {
          const t = bi()
          _i(0, "button", 1),
            xi("click", function () {
              ke(t)
              const n = e.$implicit
              return Ai().selectCategory.emit(n)
            }),
            qi(1),
            vi()
        }
        if (2 & t) {
          const t = e.$implicit
          ;(function (t, e, n, r) {
            const s = Ae(),
              i = Ne(2)
            s.firstUpdatePass && Mi(s, null, i, r)
            const o = Te()
            if (n !== Zr && pi(o, i, n)) {
              const a = s.data[Ge()]
              if (Bi(a, r) && !Ui(s, i)) {
                let t = a.classesWithoutHost
                null !== t && (n = et(t, n || "")), yi(s, a, o, n, r)
              } else
                !(function (t, e, n, r, s, i, o, a) {
                  s === Zr && (s = ki)
                  let l = 0,
                    u = 0,
                    c = 0 < s.length ? s[0] : null,
                    h = 0 < i.length ? i[0] : null
                  for (; null !== c || null !== h; ) {
                    const o = l < s.length ? s[l + 1] : void 0,
                      d = u < i.length ? i[u + 1] : void 0
                    let p,
                      f = null
                    c === h
                      ? ((l += 2), (u += 2), o !== d && ((f = h), (p = d)))
                      : null === h || (null !== c && c < h)
                      ? ((l += 2), (f = c))
                      : ((u += 2), (f = h), (p = d)),
                      null !== f && Li(t, e, n, r, f, p, !0, a),
                      (c = l < s.length ? s[l] : null),
                      (h = u < i.length ? i[u] : null)
                  }
                })(
                  s,
                  a,
                  o,
                  o[11],
                  o[i + 1],
                  (o[i + 1] = (function (t, e, n) {
                    if (null == n || "" === n) return ki
                    const r = [],
                      s = sr(n)
                    if (Array.isArray(s))
                      for (let i = 0; i < s.length; i++) t(r, s[i], !0)
                    else if ("object" == typeof s)
                      for (const i in s) s.hasOwnProperty(i) && t(r, i, s[i])
                    else "string" == typeof s && e(r, s)
                    return r
                  })(t, e, n)),
                  0,
                  i,
                )
            }
          })($n, Ni, Ai().getBtnClass(t), !0),
            Gr(1),
            Zi(" ", t, "\n")
        }
      }
      let eg = (() => {
          class t {
            constructor() {
              this.selectCategory = new pa()
            }
            getBtnClass(t) {
              return (
                "btn btn-block " +
                (t === this.selected ? "btn-primary" : "btn-secondary")
              )
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)()
            }),
            (t.ɵcmp = Ut({
              type: t,
              selectors: [["category-list"]],
              inputs: { selected: "selected", categories: "categories" },
              outputs: { selectCategory: "selectCategory" },
              decls: 1,
              vars: 1,
              consts: [
                [3, "class", "click", 4, "ngFor", "ngForOf"],
                [3, "click"],
              ],
              template: function (t, e) {
                1 & t && fi(0, tg, 2, 3, "button", 0),
                  2 & t && mi("ngForOf", e.categories)
              },
              directives: [Ul],
              encapsulation: 2,
            })),
            t
          )
        })(),
        ng = (() => {
          class t {
            constructor() {
              ;(this.quantity = 1), (this.addToCart = new pa())
            }
            handleAddToCart() {
              this.addToCart.emit({
                product: this.product,
                quantity: Number(this.quantity),
              })
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)()
            }),
            (t.ɵcmp = Ut({
              type: t,
              selectors: [["product-item"]],
              inputs: { product: "product" },
              outputs: { addToCart: "addToCart" },
              decls: 16,
              vars: 4,
              consts: [
                [1, "card", "m-1", "p-1", "bg-light"],
                [1, "badge", "badge-pill", "badge-primary", "float-right"],
                [1, "card-text", "bg-white", "p-1"],
                [1, "btn", "btn-success", "btn-sm", "float-right", 3, "click"],
                [
                  1,
                  "form-control-inline",
                  "float-right",
                  "m-1",
                  3,
                  "ngModel",
                  "ngModelChange",
                ],
              ],
              template: function (t, e) {
                1 & t &&
                  (_i(0, "div", 0),
                  _i(1, "h4"),
                  qi(2),
                  _i(3, "span", 1),
                  qi(4),
                  vi(),
                  vi(),
                  _i(5, "div", 2),
                  qi(6),
                  _i(7, "button", 3),
                  xi("click", function () {
                    return e.handleAddToCart()
                  }),
                  qi(8, " Add To Cart "),
                  vi(),
                  _i(9, "select", 4),
                  xi("ngModelChange", function (t) {
                    return (e.quantity = t)
                  }),
                  _i(10, "option"),
                  qi(11, "1"),
                  vi(),
                  _i(12, "option"),
                  qi(13, "2"),
                  vi(),
                  _i(14, "option"),
                  qi(15, "3"),
                  vi(),
                  vi(),
                  vi(),
                  vi()),
                  2 & t &&
                    (Gr(2),
                    Zi(" ", e.product.name, " "),
                    Gr(2),
                    Zi(" $", e.product.price.toFixed(2), " "),
                    Gr(2),
                    Zi(" ", e.product.description, " "),
                    Gr(3),
                    mi("ngModel", e.quantity))
              },
              directives: [Hp, Rp, df, Lp, qp],
              encapsulation: 2,
            })),
            t
          )
        })()
      function rg(t, e) {
        if (1 & t) {
          const t = bi()
          _i(0, "product-item", 7),
            xi("addToCart", function (e) {
              return ke(t), Ai().handleAdd(e)
            }),
            vi()
        }
        2 & t && mi("product", e.$implicit)
      }
      function sg(t, e) {
        if (
          (1 & t &&
            (_i(0, "tr"),
            _i(1, "td"),
            qi(2),
            vi(),
            _i(3, "td"),
            qi(4),
            vi(),
            _i(5, "td", 3),
            qi(6),
            vi(),
            _i(7, "td", 3),
            qi(8),
            vi(),
            vi()),
          2 & t)
        ) {
          const t = e.$implicit
          Gr(2),
            Wi(t.quantity),
            Gr(2),
            Wi(t.product.name),
            Gr(2),
            Zi("$", t.product.price.toFixed(2), ""),
            Gr(2),
            Zi("$", t.total.toFixed(2), "")
        }
      }
      const ig = Zd.forRoot([
        {
          path: "products",
          component: (() => {
            class t {
              constructor(t, e) {
                ;(this.dataSource = t),
                  (this.router = e),
                  (this.selectedCategory = "All")
              }
              get products() {
                return this.dataSource.getProducts(
                  "id",
                  "All" === this.selectedCategory
                    ? void 0
                    : this.selectedCategory,
                )
              }
              get categories() {
                return ["All", ...this.dataSource.getCategories()]
              }
              handleCategorySelect(t) {
                this.selectedCategory = t
              }
              handleAdd(t) {
                this.dataSource.order.addProduct(t.product, t.quantity)
              }
              handleSubmit() {
                this.router.navigateByUrl("/order")
              }
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)(gi(Kf), gi(jd))
              }),
              (t.ɵcmp = Ut({
                type: t,
                selectors: [["product-list"]],
                decls: 7,
                vars: 4,
                consts: [
                  [3, "order", "submit"],
                  [1, "container-fluid"],
                  [1, "row"],
                  [1, "col-3", "p-2"],
                  [3, "selected", "categories", "selectCategory"],
                  [1, "col-9", "p-2"],
                  [3, "product", "addToCart", 4, "ngFor", "ngForOf"],
                  [3, "product", "addToCart"],
                ],
                template: function (t, e) {
                  1 & t &&
                    (_i(0, "header", 0),
                    xi("submit", function () {
                      return e.handleSubmit()
                    }),
                    vi(),
                    _i(1, "div", 1),
                    _i(2, "div", 2),
                    _i(3, "div", 3),
                    _i(4, "category-list", 4),
                    xi("selectCategory", function (t) {
                      return e.handleCategorySelect(t)
                    }),
                    vi(),
                    vi(),
                    _i(5, "div", 5),
                    fi(6, rg, 1, 1, "product-item", 6),
                    vi(),
                    vi(),
                    vi()),
                    2 & t &&
                      (mi("order", e.dataSource.order),
                      Gr(4),
                      mi("selected", e.selectedCategory)(
                        "categories",
                        e.categories,
                      ),
                      Gr(2),
                      mi("ngForOf", e.products))
                },
                directives: [Yf, eg, Ul, ng],
                encapsulation: 2,
              })),
              t
            )
          })(),
        },
        {
          path: "order",
          component: (() => {
            class t {
              constructor(t, e) {
                ;(this.dataSource = t), (this.router = e)
              }
              get order() {
                return this.dataSource.order
              }
              submit() {
                this.dataSource
                  .storeOrder()
                  .subscribe(t => this.router.navigateByUrl(`/summary/${t}`))
              }
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)(gi(Kf), gi(jd))
              }),
              (t.ɵcmp = Ut({
                type: t,
                selectors: [["order-details"]],
                decls: 27,
                vars: 2,
                consts: [
                  [1, "text-center", "bg-primary", "text-white", "p-2"],
                  [1, "p-3"],
                  [1, "table", "table-sm", "table-striped"],
                  [1, "text-right"],
                  [4, "ngFor", "ngForOf"],
                  ["colSpan", "3", 1, "text-right"],
                  [1, "text-center"],
                  ["routerLink", "/products", 1, "btn", "btn-secondary", "m-1"],
                  [1, "btn", "btn-primary", "m-1", 3, "click"],
                ],
                template: function (t, e) {
                  1 & t &&
                    (_i(0, "h3", 0),
                    qi(1, "Order Summary"),
                    vi(),
                    _i(2, "div", 1),
                    _i(3, "table", 2),
                    _i(4, "thead"),
                    _i(5, "tr"),
                    _i(6, "th"),
                    qi(7, "Quantity"),
                    vi(),
                    _i(8, "th"),
                    qi(9, "Product"),
                    vi(),
                    _i(10, "th", 3),
                    qi(11, "Price"),
                    vi(),
                    _i(12, "th", 3),
                    qi(13, "Subtotal"),
                    vi(),
                    vi(),
                    vi(),
                    _i(14, "tbody"),
                    fi(15, sg, 9, 4, "tr", 4),
                    vi(),
                    _i(16, "tfoot"),
                    _i(17, "tr"),
                    _i(18, "th", 5),
                    qi(19, "Total:"),
                    vi(),
                    _i(20, "th", 3),
                    qi(21),
                    vi(),
                    vi(),
                    vi(),
                    vi(),
                    vi(),
                    _i(22, "div", 6),
                    _i(23, "button", 7),
                    qi(24, "Back"),
                    vi(),
                    _i(25, "button", 8),
                    xi("click", function () {
                      return e.submit()
                    }),
                    qi(26, "Submit Order"),
                    vi(),
                    vi()),
                    2 & t &&
                      (Gr(15),
                      mi("ngForOf", e.order.orderLines),
                      Gr(6),
                      Zi(" $", e.order.total.toFixed(2), " "))
                },
                directives: [Ul, Dd],
                encapsulation: 2,
              })),
              t
            )
          })(),
        },
        {
          path: "summary/:id",
          component: (() => {
            class t {
              constructor(t) {
                this.activatedRoute = t
              }
              get id() {
                return this.activatedRoute.snapshot.params.id
              }
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)(gi(gh))
              }),
              (t.ɵcmp = Ut({
                type: t,
                selectors: [["summary"]],
                decls: 11,
                vars: 1,
                consts: [
                  [1, "m-2", "text-center"],
                  ["routerLink", "/products", 1, "btn", "btn-primary"],
                ],
                template: function (t, e) {
                  1 & t &&
                    (_i(0, "div", 0),
                    _i(1, "h2"),
                    qi(2, "Thanks!"),
                    vi(),
                    _i(3, "p"),
                    qi(4, "Thanks for placing your order."),
                    vi(),
                    _i(5, "p"),
                    qi(6),
                    vi(),
                    _i(7, "p"),
                    qi(8, "We'll ship your goods as soon as possible."),
                    vi(),
                    _i(9, "button", 1),
                    qi(10, "OK"),
                    vi(),
                    vi()),
                    2 & t && (Gr(6), Zi("Your order is #", e.id, ""))
                },
                directives: [Dd],
                encapsulation: 2,
              })),
              t
            )
          })(),
        },
        { path: "", redirectTo: "/products", pathMatch: "full" },
      ])
      let og = (() => {
        class t {}
        return (
          (t.ɵmod = Lt({ type: t, bootstrap: [sp] })),
          (t.ɵinj = at({
            factory: function (e) {
              return new (e || t)()
            },
            providers: [],
            imports: [[mu, rp, ff, Xf, ig]],
          })),
          t
        )
      })()
      ;(function () {
        if (Ga) throw new Error("Cannot enable prod mode after platform setup.")
        Za = !1
      })(),
        fu()
          .bootstrapModule(og)
          .catch(t => console.error(t))
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'")
          throw ((e.code = "MODULE_NOT_FOUND"), e)
        })
      }
      ;(n.keys = function () {
        return []
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P")
    },
  },
  [[0, 0]],
])
