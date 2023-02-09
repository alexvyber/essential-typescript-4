import { ProductList } from "../productList"
import { modifyOrder } from "./actionCreators"
import { StoreData } from "./types"
import { connect } from "react-redux"

const mapStateToProps = (data: StoreData) => ({
  products: data.products,
  categories: [...new Set(data.products.map(p => p.category))],
  order: data.order,
})

const mapDispatchToProps = {
  addToOrder: modifyOrder,
}

const connectFunction = connect(mapStateToProps, mapDispatchToProps)
export const ConnectedProductList = connectFunction(ProductList)
