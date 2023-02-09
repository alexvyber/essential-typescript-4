import { addProduct } from "./data/actionCreators"
import { dataStore } from "./data/dataStore"
import { HttpHandler } from "./data/httpHandler"
import { ConnectedProductList } from "./data/productListConnector"
import { OrderDetails } from "./orderDetails"
import { Summary } from "./summary"
import React, { Component } from "react"
import { Provider } from "react-redux"
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
  RouteComponentProps,
} from "react-router-dom"

interface Props {
  // no props required
}

export default class App extends Component<Props> {
  private httpHandler = new HttpHandler()

  componentDidMount = () =>
    this.httpHandler.loadProducts(data => {
      dataStore.dispatch(addProduct(...data))
    })

  render = () => (
    <div className="App">
      <Provider store={dataStore}>
        <BrowserRouter>
          <Switch>
            <Route path="/products" component={ConnectedProductList} />
            <Route
              path="/order"
              render={props => (
                <OrderDetails
                  {...props}
                  submitCallback={() => this.submitCallback(props)}
                />
              )}
            />
            <Route path="/summary/:id" component={Summary} />
            <Redirect to="/products" />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  )

  submitCallback = (routeProps: RouteComponentProps) => {
    this.httpHandler.storeOrder(dataStore.getState().order, id =>
      routeProps.history.push(`/summary/${id}`),
    )
  }
}
