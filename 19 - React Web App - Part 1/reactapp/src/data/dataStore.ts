import { StoreReducer } from "./reducer"
import { StoreData, StoreAction } from "./types"
import { createStore, Store } from "redux"

export const dataStore: Store<StoreData, StoreAction> =
  createStore(StoreReducer)
