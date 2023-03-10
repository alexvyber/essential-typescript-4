;(function (t) {
  function e(e) {
    for (
      var n, u, a = e[0], d = e[1], i = e[2], l = 0, b = [];
      l < a.length;
      l++
    )
      (u = a[l]),
        Object.prototype.hasOwnProperty.call(c, u) && c[u] && b.push(c[u][0]),
        (c[u] = 0)
    for (n in d) Object.prototype.hasOwnProperty.call(d, n) && (t[n] = d[n])
    s && s(e)
    while (b.length) b.shift()()
    return o.push.apply(o, i || []), r()
  }
  function r() {
    for (var t, e = 0; e < o.length; e++) {
      for (var r = o[e], n = !0, a = 1; a < r.length; a++) {
        var d = r[a]
        0 !== c[d] && (n = !1)
      }
      n && (o.splice(e--, 1), (t = u((u.s = r[0]))))
    }
    return t
  }
  var n = {},
    c = { app: 0 },
    o = []
  function u(e) {
    if (n[e]) return n[e].exports
    var r = (n[e] = { i: e, l: !1, exports: {} })
    return t[e].call(r.exports, r, r.exports, u), (r.l = !0), r.exports
  }
  ;(u.m = t),
    (u.c = n),
    (u.d = function (t, e, r) {
      u.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r })
    }),
    (u.r = function (t) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 })
    }),
    (u.t = function (t, e) {
      if ((1 & e && (t = u(t)), 8 & e)) return t
      if (4 & e && "object" === typeof t && t && t.__esModule) return t
      var r = Object.create(null)
      if (
        (u.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var n in t)
          u.d(
            r,
            n,
            function (e) {
              return t[e]
            }.bind(null, n),
          )
      return r
    }),
    (u.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t["default"]
            }
          : function () {
              return t
            }
      return u.d(e, "a", e), e
    }),
    (u.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }),
    (u.p = "/")
  var a = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    d = a.push.bind(a)
  ;(a.push = e), (a = a.slice())
  for (var i = 0; i < a.length; i++) e(a[i])
  var s = d
  o.push([0, "chunk-vendors"]), r()
})({
  0: function (t, e, r) {
    t.exports = r("cd49")
  },
  cd49: function (t, e, r) {
    "use strict"
    r.r(e)
    r("e260"), r("e6cf"), r("cca6"), r("a79d")
    var n = r("7a23")
    function c(t, e, r, c, o, u) {
      var a = Object(n["u"])("router-view")
      return Object(n["p"])(), Object(n["d"])(a)
    }
    r("d81d"), r("b0c0"), r("d3b7"), r("ddb0")
    var o = r("2909"),
      u = r("d4ec"),
      a = r("bee2"),
      d = r("bc3a"),
      i = r.n(d),
      s = { products: "/api/products", orders: "/api/orders" },
      l = (function () {
        function t() {
          Object(u["a"])(this, t)
        }
        return (
          Object(a["a"])(t, [
            {
              key: "loadProducts",
              value: function () {
                return i.a.get(s.products).then(function (t) {
                  return t.data
                })
              },
            },
            {
              key: "storeOrder",
              value: function (t) {
                var e = {
                  lines: Object(o["a"])(t.orderLines.values()).map(function (
                    t,
                  ) {
                    return {
                      productId: t.product.id,
                      productName: t.product.name,
                      quantity: t.quantity,
                    }
                  }),
                }
                return i.a.post(s.orders, e).then(function (t) {
                  return t.data.id
                })
              },
            },
          ]),
          t
        )
      })(),
      b = r("5502"),
      f = Object(n["g"])({
        name: "App",
        setup: function () {
          var t = Object(b["f"])(),
            e = new l()
          Object(n["n"])(function () {
            return t.dispatch("loadProducts", e.loadProducts)
          })
        },
      })
    f.render = c
    var p = f,
      O = r("6c02"),
      j = { class: "container-fluid" },
      h = { class: "row" },
      y = { class: "col-3 p-2" },
      m = { class: "col-9 p-2" }
    function g(t, e, r, c, o, u) {
      var a = Object(n["u"])("Header"),
        d = Object(n["u"])("CategoryList"),
        i = Object(n["u"])("ProductItem")
      return (
        Object(n["p"])(),
        Object(n["d"])("div", null, [
          Object(n["f"])(a),
          Object(n["f"])("div", j, [
            Object(n["f"])("div", h, [
              Object(n["f"])("div", y, [
                Object(n["f"])(
                  d,
                  {
                    categories: t.categories,
                    selected: t.selectedCategory,
                    onSelectCategory: t.handleSelectCategory,
                  },
                  null,
                  8,
                  ["categories", "selected", "onSelectCategory"],
                ),
              ]),
              Object(n["f"])("div", m, [
                (Object(n["p"])(!0),
                Object(n["d"])(
                  n["a"],
                  null,
                  Object(n["t"])(t.filteredProducts, function (e) {
                    return (
                      Object(n["p"])(),
                      Object(n["d"])(
                        i,
                        {
                          key: e.id,
                          product: e,
                          onAddToCart: t.handleAddToCart,
                        },
                        null,
                        8,
                        ["product", "onAddToCart"],
                      )
                    )
                  }),
                  128,
                )),
              ]),
            ]),
          ]),
        ])
      )
    }
    var v = r("5530"),
      w = (r("a4d3"), r("e01a"), r("b680"), { class: "card m-1 p-1 bg-light" }),
      C = { class: "badge badge-pill badge-primary float-right" },
      x = { class: "card-text bg-white p-1" },
      k = Object(n["f"])("option", null, "1", -1),
      P = Object(n["f"])("option", null, "2", -1),
      S = Object(n["f"])("option", null, "3", -1)
    function T(t, e, r, c, o, u) {
      return (
        Object(n["p"])(),
        Object(n["d"])("div", w, [
          Object(n["f"])("h4", null, [
            Object(n["e"])(Object(n["w"])(t.product.name) + " ", 1),
            Object(n["f"])(
              "span",
              C,
              " $" + Object(n["w"])(t.product.price.toFixed(2)),
              1,
            ),
          ]),
          Object(n["f"])("div", x, [
            Object(n["e"])(Object(n["w"])(t.product.description) + " ", 1),
            Object(n["f"])(
              "button",
              {
                class: "btn btn-success btn-sm float-right",
                onClick:
                  e[1] ||
                  (e[1] = function () {
                    return (
                      t.handleAddToCart && t.handleAddToCart.apply(t, arguments)
                    )
                  }),
              },
              " Add To Cart ",
            ),
            Object(n["B"])(
              Object(n["f"])(
                "select",
                {
                  class: "form-control-inline float-right m-1",
                  "onUpdate:modelValue":
                    e[2] ||
                    (e[2] = function (e) {
                      return (t.quantity = e)
                    }),
                },
                [k, P, S],
                512,
              ),
              [[n["y"], t.quantity, void 0, { number: !0 }]],
            ),
          ]),
        ])
      )
    }
    var A = Object(n["g"])({
      name: "ProductItem",
      props: { product: { type: Object } },
      data: function () {
        return { quantity: 1 }
      },
      methods: {
        handleAddToCart: function () {
          this.$emit("addToCart", {
            product: this.product,
            quantity: this.quantity,
          })
        },
      },
    })
    A.render = T
    var q = A
    function I(t, e, r, c, o, u) {
      return (
        Object(n["p"])(),
        Object(n["d"])("div", null, [
          (Object(n["p"])(!0),
          Object(n["d"])(
            n["a"],
            null,
            Object(n["t"])(t.categories, function (e) {
              return (
                Object(n["p"])(),
                Object(n["d"])(
                  "button",
                  {
                    key: e,
                    class: t.getButtonClasses(e),
                    onClick: function (r) {
                      return t.selectCategory(e)
                    },
                  },
                  Object(n["w"])(e),
                  11,
                  ["onClick"],
                )
              )
            }),
            128,
          )),
        ])
      )
    }
    var _ = Object(n["g"])({
      name: "CategoryList",
      props: { categories: { type: Object }, selected: { type: String } },
      methods: {
        selectCategory: function (t) {
          this.$emit("selectCategory", t)
        },
        getButtonClasses: function (t) {
          var e = this.selected === t ? "btn-primary" : "btn-secondary"
          return "btn btn-block ".concat(e)
        },
      },
    })
    _.render = I
    var $ = _,
      L = { class: "p-1 bg-secondary text-white text-right" },
      F = Object(n["e"])(" Submit Order ")
    function B(t, e, r, c, o, u) {
      var a = Object(n["u"])("router-link")
      return (
        Object(n["p"])(),
        Object(n["d"])("div", L, [
          Object(n["e"])(Object(n["w"])(t.displayText) + " ", 1),
          Object(n["f"])(
            a,
            { to: "/order", class: "btn btn-sm btn-primary m-1" },
            {
              default: Object(n["A"])(function () {
                return [F]
              }),
              _: 1,
            },
          ),
        ])
      )
    }
    var M = Object(n["g"])({
      name: "Header",
      setup: function () {
        return { store: Object(b["f"])() }
      },
      computed: {
        displayText: function () {
          var t = this.store.state.order.productCount
          return 0 === t
            ? "(No Selection)"
            : "".concat(t, " product(s), ") +
                "$".concat(this.store.state.order.total.toFixed(2))
        },
      },
    })
    M.render = B
    var R = M,
      H = Object(n["g"])({
        name: "ProductList",
        components: { ProductItem: q, CategoryList: $, Header: R },
        computed: Object(v["a"])(
          Object(v["a"])(
            {},
            Object(b["e"])({
              selectedCategory: function (t) {
                return t.selectedCategory
              },
              products: function (t) {
                return t.products
              },
              order: function (t) {
                return t.order
              },
            }),
          ),
          Object(b["c"])(["filteredProducts", "categories"]),
        ),
        methods: Object(v["a"])(
          {},
          Object(b["d"])({
            handleSelectCategory: "selectCategory",
            handleAddToCart: "addToOrder",
          }),
        ),
      })
    H.render = g
    var J = H,
      N = Object(n["f"])(
        "h3",
        { class: "text-center bg-primary text-white p-2" },
        "Order Summary",
        -1,
      ),
      D = { class: "p-3" },
      K = { class: "table table-sm table-striped" },
      Q = Object(n["f"])(
        "thead",
        null,
        [
          Object(n["f"])("tr", null, [
            Object(n["f"])("th", null, "Quantity"),
            Object(n["f"])("th", null, "Product"),
            Object(n["f"])("th", { class: "text-right" }, "Price"),
            Object(n["f"])("th", { class: "text-right" }, "Subtotal"),
          ]),
        ],
        -1,
      ),
      U = { class: "text-right" },
      V = { class: "text-right" },
      W = Object(n["f"])(
        "th",
        { class: "text-right", colSpan: "3" },
        "Total:",
        -1,
      ),
      Y = { class: "text-right" },
      z = { class: "text-center" },
      E = Object(n["e"])(" Back ")
    function G(t, e, r, c, o, u) {
      var a = Object(n["u"])("router-link")
      return (
        Object(n["p"])(),
        Object(n["d"])("div", null, [
          N,
          Object(n["f"])("div", D, [
            Object(n["f"])("table", K, [
              Q,
              Object(n["f"])("tbody", null, [
                (Object(n["p"])(!0),
                Object(n["d"])(
                  n["a"],
                  null,
                  Object(n["t"])(t.order.lines, function (t) {
                    return (
                      Object(n["p"])(),
                      Object(n["d"])("tr", { key: t.product.id }, [
                        Object(n["f"])(
                          "td",
                          null,
                          Object(n["w"])(t.quantity),
                          1,
                        ),
                        Object(n["f"])(
                          "td",
                          null,
                          Object(n["w"])(t.product.name),
                          1,
                        ),
                        Object(n["f"])(
                          "td",
                          U,
                          " $" + Object(n["w"])(t.product.price.toFixed(2)),
                          1,
                        ),
                        Object(n["f"])(
                          "td",
                          V,
                          " $" + Object(n["w"])(t.total.toFixed(2)),
                          1,
                        ),
                      ])
                    )
                  }),
                  128,
                )),
              ]),
              Object(n["f"])("tfoot", null, [
                Object(n["f"])("tr", null, [
                  W,
                  Object(n["f"])(
                    "th",
                    Y,
                    " $" + Object(n["w"])(t.order.total.toFixed(2)),
                    1,
                  ),
                ]),
              ]),
            ]),
          ]),
          Object(n["f"])("div", z, [
            Object(n["f"])(
              a,
              { to: "/products", class: "btn btn-secondary m-1" },
              {
                default: Object(n["A"])(function () {
                  return [E]
                }),
                _: 1,
              },
            ),
            Object(n["f"])(
              "button",
              {
                class: "btn btn-primary m-1",
                onClick:
                  e[1] ||
                  (e[1] = function () {
                    return t.submit && t.submit.apply(t, arguments)
                  }),
              },
              " Submit Order ",
            ),
          ]),
        ])
      )
    }
    var X = Object(n["g"])({
      name: "OrderDetails",
      computed: Object(v["a"])(
        {},
        Object(b["e"])({
          order: function (t) {
            return t.order
          },
        }),
      ),
      methods: Object(v["a"])(
        Object(v["a"])({}, Object(b["b"])(["storeOrder"])),
        {},
        {
          submit: function () {
            var t = this
            this.storeOrder(function (e) {
              return new l().storeOrder(e).then(function (e) {
                return t.$router.push("/summary"), e
              })
            })
          },
        },
      ),
    })
    X.render = G
    var Z = X,
      tt = { class: "m-2 text-center" },
      et = Object(n["f"])("h2", null, "Thanks!", -1),
      rt = Object(n["f"])("p", null, "Thanks for placing your order.", -1),
      nt = Object(n["f"])(
        "p",
        null,
        "We'll ship your goods as soon as possible.",
        -1,
      ),
      ct = Object(n["e"])("OK")
    function ot(t, e, r, c, o, u) {
      var a = Object(n["u"])("router-link")
      return (
        Object(n["p"])(),
        Object(n["d"])("div", tt, [
          et,
          rt,
          Object(n["f"])(
            "p",
            null,
            "Your order is #" + Object(n["w"])(t.id),
            1,
          ),
          nt,
          Object(n["f"])(
            a,
            { to: "/products", class: "btn btn-primary" },
            {
              default: Object(n["A"])(function () {
                return [ct]
              }),
              _: 1,
            },
          ),
        ])
      )
    }
    var ut = Object(n["g"])({
      name: "Summary",
      computed: Object(v["a"])(
        {},
        Object(b["e"])({
          id: function (t) {
            return t.storedId
          },
        }),
      ),
    })
    ut.render = ot
    var at = ut,
      dt = [
        { path: "/products", component: J },
        { path: "/order", component: Z },
        { path: "/summary", component: at },
        { path: "/", redirect: "/products" },
      ],
      it = Object(O["a"])({ history: Object(O["b"])("/"), routes: dt }),
      st = it,
      lt = (r("99af"), r("4de4"), r("6062"), r("3ca3"), r("96cf"), r("1da1")),
      bt =
        (r("c740"),
        r("13d5"),
        (function () {
          function t(e, r) {
            Object(u["a"])(this, t), (this.product = e), (this.quantity = r)
          }
          return (
            Object(a["a"])(t, [
              {
                key: "total",
                get: function () {
                  return this.product.price * this.quantity
                },
              },
            ]),
            t
          )
        })()),
      ft = (function () {
        function t(e) {
          var r
          ;(Object(u["a"])(this, t), (this.lines = []), e) &&
            (r = this.lines).push.apply(r, Object(o["a"])(e))
        }
        return (
          Object(a["a"])(t, [
            {
              key: "addProduct",
              value: function (t, e) {
                var r = this.lines.findIndex(function (e) {
                  return e.product.id === t.id
                })
                r > -1
                  ? 0 === e
                    ? this.removeProduct(t.id)
                    : (this.lines[r].quantity += e)
                  : this.lines.push(new bt(t, e))
              },
            },
            {
              key: "removeProduct",
              value: function (t) {
                this.lines = this.lines.filter(function (e) {
                  return e.product.id !== t
                })
              },
            },
            {
              key: "orderLines",
              get: function () {
                return this.lines
              },
            },
            {
              key: "productCount",
              get: function () {
                return this.lines.reduce(function (t, e) {
                  return t + e.quantity
                }, 0)
              },
            },
            {
              key: "total",
              get: function () {
                return this.lines.reduce(function (t, e) {
                  return t + e.total
                }, 0)
              },
            },
          ]),
          t
        )
      })(),
      pt = Object(b["a"])({
        state: {
          products: [],
          order: new ft(),
          selectedCategory: "All",
          storedId: -1,
        },
        mutations: {
          selectCategory: function (t, e) {
            t.selectedCategory = e
          },
          addToOrder: function (t, e) {
            t.order.addProduct(e.product, e.quantity)
          },
          addProducts: function (t, e) {
            t.products = e
          },
          setOrderId: function (t, e) {
            t.storedId = e
          },
          resetOrder: function (t) {
            t.order = new ft()
          },
        },
        getters: {
          categories: function (t) {
            return ["All"].concat(
              Object(o["a"])(
                new Set(
                  t.products.map(function (t) {
                    return t.category
                  }),
                ),
              ),
            )
          },
          filteredProducts: function (t) {
            return t.products.filter(function (e) {
              return (
                "All" === t.selectedCategory ||
                t.selectedCategory === e.category
              )
            })
          },
        },
        actions: {
          loadProducts: function (t, e) {
            return Object(lt["a"])(
              regeneratorRuntime.mark(function r() {
                var n
                return regeneratorRuntime.wrap(function (r) {
                  while (1)
                    switch ((r.prev = r.next)) {
                      case 0:
                        return (r.next = 2), e()
                      case 2:
                        ;(n = r.sent), t.commit("addProducts", n)
                      case 4:
                      case "end":
                        return r.stop()
                    }
                }, r)
              }),
            )()
          },
          storeOrder: function (t, e) {
            return Object(lt["a"])(
              regeneratorRuntime.mark(function r() {
                return regeneratorRuntime.wrap(function (r) {
                  while (1)
                    switch ((r.prev = r.next)) {
                      case 0:
                        return (r.t0 = t), (r.next = 3), e(t.state.order)
                      case 3:
                        ;(r.t1 = r.sent),
                          r.t0.commit.call(r.t0, "setOrderId", r.t1),
                          t.commit("resetOrder")
                      case 6:
                      case "end":
                        return r.stop()
                    }
                }, r)
              }),
            )()
          },
        },
        modules: {},
      })
    r("ab8b")
    Object(n["c"])(p).use(pt).use(st).mount("#app")
  },
})
//# sourceMappingURL=app.12b0b6c7.js.map
