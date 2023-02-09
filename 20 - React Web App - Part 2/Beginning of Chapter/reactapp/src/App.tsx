import { addProduct } from "./data/actionCreators"
//import { Product, Order } from './data/entities';
//import { ProductList } from './productList';
import { dataStore } from "./data/dataStore"
import { HttpHandler } from "./data/httpHandler"
import { ConnectedProductList } from "./data/productListConnector"
import React, { Component } from "react"
import { Provider } from "react-redux"

interface Props {
  // no props required
}

export default class App extends Component<Props> {
  private httpHandler = new HttpHandler()

  // constructor(props: Props) {
  //     super(props);
  //     this.state = {
  //         order: new Order()
  //     }
  // }

  componentDidMount = () =>
    this.httpHandler.loadProducts(data => {
      dataStore.dispatch(addProduct(...data))
    })

  render = () => (
    <div className="App">
      <Provider store={dataStore}>
        <ConnectedProductList />
      </Provider>
    </div>
  )

  submitCallback = () => {
    console.log("Submit order")
  }
}
