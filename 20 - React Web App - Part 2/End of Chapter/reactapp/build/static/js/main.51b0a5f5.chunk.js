;(this.webpackJsonpreactapp = this.webpackJsonpreactapp || []).push([
  [0],
  {
    46: function (t, e, r) {},
    71: function (t, e, r) {
      "use strict"
      r.r(e)
      var c,
        n = r(1),
        a = r(0),
        s = r.n(a),
        i = r(20),
        o = r.n(i),
        d = (r(46), r(14)),
        u = r(6),
        l = r(4),
        j = r(12),
        b = r(11),
        p = r(23)
      !(function (t) {
        ;(t[(t.ADD_PRODUCTS = 0)] = "ADD_PRODUCTS"),
          (t[(t.MODIFY_ORDER = 1)] = "MODIFY_ORDER"),
          (t[(t.RESET_ORDER = 2)] = "RESET_ORDER")
      })(c || (c = {}))
      var h = r(5),
        O = (function () {
          function t(e, r) {
            Object(l.a)(this, t), (this.product = e), (this.quantity = r)
          }
          return (
            Object(h.a)(t, [
              {
                key: "total",
                get: function () {
                  return this.product.price * this.quantity
                },
              },
            ]),
            t
          )
        })(),
        m = (function () {
          function t(e) {
            var r = this
            Object(l.a)(this, t),
              (this.lines = new Map()),
              e &&
                e.forEach(function (t) {
                  return r.lines.set(t.product.id, t)
                })
          }
          return (
            Object(h.a)(t, [
              {
                key: "addProduct",
                value: function (t, e) {
                  this.lines.has(t.id)
                    ? 0 === e
                      ? this.removeProduct(t.id)
                      : (this.lines.get(t.id).quantity += e)
                    : this.lines.set(t.id, new O(t, e))
                },
              },
              {
                key: "removeProduct",
                value: function (t) {
                  this.lines.delete(t)
                },
              },
              {
                key: "orderLines",
                get: function () {
                  return Object(u.a)(this.lines.values())
                },
              },
              {
                key: "productCount",
                get: function () {
                  return Object(u.a)(this.lines.values()).reduce(function (
                    t,
                    e,
                  ) {
                    return t + e.quantity
                  },
                  0)
                },
              },
              {
                key: "total",
                get: function () {
                  return Object(u.a)(this.lines.values()).reduce(function (
                    t,
                    e,
                  ) {
                    return t + e.total
                  },
                  0)
                },
              },
            ]),
            t
          )
        })(),
        x = Object(p.b)(function (t, e) {
          switch (((t = t || { products: [], order: new m() }), e.type)) {
            case c.ADD_PRODUCTS:
              return Object(d.a)(
                Object(d.a)({}, t),
                {},
                {
                  products: [].concat(
                    Object(u.a)(t.products),
                    Object(u.a)(e.payload),
                  ),
                },
              )
            case c.MODIFY_ORDER:
              return (
                t.order.addProduct(e.payload.product, e.payload.quantity),
                Object(d.a)({}, t)
              )
            case c.RESET_ORDER:
              return Object(d.a)(Object(d.a)({}, t), {}, { order: new m() })
            default:
              return t
          }
        }),
        f = r(17),
        y = r(27),
        g = r.n(y),
        v = "/api/products",
        C = "/api/orders",
        N = (function () {
          function t() {
            Object(l.a)(this, t)
          }
          return (
            Object(h.a)(t, [
              {
                key: "loadProducts",
                value: function (t) {
                  g.a.get(v).then(function (e) {
                    return t(e.data)
                  })
                },
              },
              {
                key: "storeOrder",
                value: function (t, e) {
                  var r = {
                    lines: Object(u.a)(t.orderLines.values()).map(function (t) {
                      return {
                        productId: t.product.id,
                        productName: t.product.name,
                        quantity: t.quantity,
                      }
                    }),
                  }
                  g.a.post(C, r).then(function (t) {
                    return e(t.data.id)
                  })
                },
              },
            ]),
            t
          )
        })(),
        k = function () {
          for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
            e[r] = arguments[r]
          return { type: c.ADD_PRODUCTS, payload: e }
        },
        D = r(15),
        R = (function (t) {
          Object(j.a)(r, t)
          var e = Object(b.a)(r)
          function r() {
            return Object(l.a)(this, r), e.apply(this, arguments)
          }
          return (
            Object(h.a)(r, [
              {
                key: "render",
                value: function () {
                  var t = this.props.order.productCount
                  return Object(n.jsxs)("div", {
                    className: "p-1 bg-secondary text-white text-right",
                    children: [
                      0 === t
                        ? "(No Selection)"
                        : ""
                            .concat(t, " product(s), $")
                            .concat(this.props.order.total.toFixed(2)),
                      Object(n.jsx)(D.b, {
                        to: "/order",
                        className: "btn btn-sm btn-primary m-1",
                        children: "Submit Order",
                      }),
                    ],
                  })
                },
              },
            ]),
            r
          )
        })(a.Component),
        S = r(40),
        w = function (t) {
          var e = Object(a.useState)(1),
            r = Object(S.a)(e, 2),
            c = r[0],
            s = r[1]
          return Object(n.jsxs)("div", {
            className: "card m-1 p-1 bg-light",
            children: [
              Object(n.jsxs)("h4", {
                children: [
                  t.product.name,
                  Object(n.jsxs)("span", {
                    className: "badge badge-pill badge-primary float-right",
                    children: ["$", t.product.price.toFixed(2)],
                  }),
                ],
              }),
              Object(n.jsxs)("div", {
                className: "card-text bg-white p-1",
                children: [
                  t.product.description,
                  Object(n.jsx)("button", {
                    className: "btn btn-success btn-sm float-right",
                    onClick: function () {
                      return t.callback(t.product, c)
                    },
                    children: "Add To Cart",
                  }),
                  Object(n.jsxs)("select", {
                    className: "form-control-inline float-right m-1",
                    onChange: function (t) {
                      return s(Number(t.target.value))
                    },
                    children: [
                      Object(n.jsx)("option", { children: "1" }),
                      Object(n.jsx)("option", { children: "2" }),
                      Object(n.jsx)("option", { children: "3" }),
                    ],
                  }),
                ],
              }),
            ],
          })
        },
        E = (function (t) {
          Object(j.a)(r, t)
          var e = Object(b.a)(r)
          function r() {
            return Object(l.a)(this, r), e.apply(this, arguments)
          }
          return (
            Object(h.a)(r, [
              {
                key: "render",
                value: function () {
                  var t = this
                  return Object(n.jsx)("div", {
                    children: ["All"]
                      .concat(Object(u.a)(this.props.categories))
                      .map(function (e) {
                        var r =
                          t.props.selected === e
                            ? "btn-primary"
                            : "btn-secondary"
                        return Object(n.jsx)(
                          "button",
                          {
                            className: "btn btn-block ".concat(r),
                            onClick: function () {
                              return t.props.selectCategory(e)
                            },
                            children: e,
                          },
                          e,
                        )
                      }),
                  })
                },
              },
            ]),
            r
          )
        })(a.Component),
        T = (function (t) {
          Object(j.a)(r, t)
          var e = Object(b.a)(r)
          function r(t) {
            var c
            return (
              Object(l.a)(this, r),
              ((c = e.call(this, t)).selectCategory = function (t) {
                c.setState({ selectedCategory: t })
              }),
              (c.state = { selectedCategory: "All" }),
              c
            )
          }
          return (
            Object(h.a)(r, [
              {
                key: "render",
                value: function () {
                  var t = this
                  return Object(n.jsxs)("div", {
                    children: [
                      Object(n.jsx)(R, { order: this.props.order }),
                      Object(n.jsx)("div", {
                        className: "container-fluid",
                        children: Object(n.jsxs)("div", {
                          className: "row",
                          children: [
                            Object(n.jsx)("div", {
                              className: "col-3 p-2",
                              children: Object(n.jsx)(E, {
                                categories: this.props.categories,
                                selected: this.state.selectedCategory,
                                selectCategory: this.selectCategory,
                              }),
                            }),
                            Object(n.jsx)("div", {
                              className: "col-9 p-2",
                              children: this.products.map(function (e) {
                                return Object(n.jsx)(
                                  w,
                                  { product: e, callback: t.props.addToOrder },
                                  e.id,
                                )
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  })
                },
              },
              {
                key: "products",
                get: function () {
                  var t = this
                  return this.props.products.filter(function (e) {
                    return (
                      "All" === t.state.selectedCategory ||
                      e.category === t.state.selectedCategory
                    )
                  })
                },
              },
            ]),
            r
          )
        })(a.Component),
        P = {
          addToOrder: function (t, e) {
            return {
              type: c.MODIFY_ORDER,
              payload: { product: t, quantity: e },
            }
          },
        },
        F = Object(f.b)(function (t) {
          return {
            products: t.products,
            categories: Object(u.a)(
              new Set(
                t.products.map(function (t) {
                  return t.category
                }),
              ),
            ),
            order: t.order,
          }
        }, P)(T),
        A = r(3),
        _ = Object(f.b)(function (t) {
          return { order: t.order }
        })(
          (function (t) {
            Object(j.a)(r, t)
            var e = Object(b.a)(r)
            function r() {
              return Object(l.a)(this, r), e.apply(this, arguments)
            }
            return (
              Object(h.a)(r, [
                {
                  key: "render",
                  value: function () {
                    return Object(n.jsxs)("div", {
                      children: [
                        Object(n.jsx)("h3", {
                          className: "text-center bg-primary text-white p-2",
                          children: "Order Summary",
                        }),
                        Object(n.jsx)("div", {
                          className: "p-3",
                          children: Object(n.jsxs)("table", {
                            className: "table table-sm table-striped",
                            children: [
                              Object(n.jsx)("thead", {
                                children: Object(n.jsxs)("tr", {
                                  children: [
                                    Object(n.jsx)("th", {
                                      children: "Quantity",
                                    }),
                                    Object(n.jsx)("th", {
                                      children: "Product",
                                    }),
                                    Object(n.jsx)("th", {
                                      className: "text-right",
                                      children: "Price",
                                    }),
                                    Object(n.jsx)("th", {
                                      className: "text-right",
                                      children: "Subtotal",
                                    }),
                                  ],
                                }),
                              }),
                              Object(n.jsx)("tbody", {
                                children: this.props.order.orderLines.map(
                                  function (t) {
                                    return Object(n.jsxs)(
                                      "tr",
                                      {
                                        children: [
                                          Object(n.jsx)("td", {
                                            children: t.quantity,
                                          }),
                                          Object(n.jsx)("td", {
                                            children: t.product.name,
                                          }),
                                          Object(n.jsxs)("td", {
                                            className: "text-right",
                                            children: [
                                              "$",
                                              t.product.price.toFixed(2),
                                            ],
                                          }),
                                          Object(n.jsxs)("td", {
                                            className: "text-right",
                                            children: ["$", t.total.toFixed(2)],
                                          }),
                                        ],
                                      },
                                      t.product.id,
                                    )
                                  },
                                ),
                              }),
                              Object(n.jsx)("tfoot", {
                                children: Object(n.jsxs)("tr", {
                                  children: [
                                    Object(n.jsx)("th", {
                                      className: "text-right",
                                      colSpan: 3,
                                      children: "Total:",
                                    }),
                                    Object(n.jsxs)("th", {
                                      className: "text-right",
                                      children: [
                                        "$",
                                        this.props.order.total.toFixed(2),
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                        }),
                        Object(n.jsxs)("div", {
                          className: "text-center",
                          children: [
                            Object(n.jsx)(D.b, {
                              to: "/products",
                              className: "btn btn-secondary m-1",
                              children: "Back",
                            }),
                            Object(n.jsx)("button", {
                              className: "btn btn-primary m-1",
                              onClick: this.props.submitCallback,
                              children: "Submit Order",
                            }),
                          ],
                        }),
                      ],
                    })
                  },
                },
              ]),
              r
            )
          })(a.Component),
        ),
        q = (function (t) {
          Object(j.a)(r, t)
          var e = Object(b.a)(r)
          function r() {
            return Object(l.a)(this, r), e.apply(this, arguments)
          }
          return (
            Object(h.a)(r, [
              {
                key: "render",
                value: function () {
                  var t = this.props.match.params.id
                  return Object(n.jsxs)("div", {
                    className: "m-2 text-center",
                    children: [
                      Object(n.jsx)("h2", { children: "Thanks!" }),
                      Object(n.jsx)("p", {
                        children: "Thanks for placing your order.",
                      }),
                      Object(n.jsxs)("p", { children: ["Your order is #", t] }),
                      Object(n.jsx)("p", {
                        children: "We'll ship your goods as soon as possible.",
                      }),
                      Object(n.jsx)(D.b, {
                        to: "/products",
                        className: "btn btn-primary",
                        children: "OK",
                      }),
                    ],
                  })
                },
              },
            ]),
            r
          )
        })(a.Component),
        I = (function (t) {
          Object(j.a)(r, t)
          var e = Object(b.a)(r)
          function r() {
            var t
            Object(l.a)(this, r)
            for (var c = arguments.length, a = new Array(c), s = 0; s < c; s++)
              a[s] = arguments[s]
            return (
              ((t = e.call.apply(e, [this].concat(a))).httpHandler = new N()),
              (t.componentDidMount = function () {
                return t.httpHandler.loadProducts(function (t) {
                  x.dispatch(k.apply(void 0, Object(u.a)(t)))
                })
              }),
              (t.render = function () {
                return Object(n.jsx)("div", {
                  className: "App",
                  children: Object(n.jsx)(f.a, {
                    store: x,
                    children: Object(n.jsx)(D.a, {
                      children: Object(n.jsxs)(A.d, {
                        children: [
                          Object(n.jsx)(A.b, {
                            path: "/products",
                            component: F,
                          }),
                          Object(n.jsx)(A.b, {
                            path: "/order",
                            render: function (e) {
                              return Object(n.jsx)(
                                _,
                                Object(d.a)(
                                  Object(d.a)({}, e),
                                  {},
                                  {
                                    submitCallback: function () {
                                      return t.submitCallback(e)
                                    },
                                  },
                                ),
                              )
                            },
                          }),
                          Object(n.jsx)(A.b, {
                            path: "/summary/:id",
                            component: q,
                          }),
                          Object(n.jsx)(A.a, { to: "/products" }),
                        ],
                      }),
                    }),
                  }),
                })
              }),
              (t.submitCallback = function (e) {
                t.httpHandler.storeOrder(x.getState().order, function (t) {
                  return e.history.push("/summary/".concat(t))
                })
              }),
              t
            )
          }
          return r
        })(a.Component),
        M = function (t) {
          t &&
            t instanceof Function &&
            r
              .e(3)
              .then(r.bind(null, 72))
              .then(function (e) {
                var r = e.getCLS,
                  c = e.getFID,
                  n = e.getFCP,
                  a = e.getLCP,
                  s = e.getTTFB
                r(t), c(t), n(t), a(t), s(t)
              })
        }
      r(70)
      o.a.render(
        Object(n.jsx)(s.a.StrictMode, { children: Object(n.jsx)(I, {}) }),
        document.getElementById("root"),
      ),
        M()
    },
  },
  [[71, 1, 2]],
])
//# sourceMappingURL=main.51b0a5f5.chunk.js.map
