
import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {authAPI} from "../service/AuthService";
import {productAPI} from "../service/ProductService";

const rootReducer= combineReducers({
    [authAPI.reducerPath]:authAPI.reducer,
    [productAPI.reducerPath]:productAPI.reducer
})
export const setupStore=()=>{
    return configureStore({
        reducer:rootReducer,
        middleware:(getDefaultMiddleware)=>
            getDefaultMiddleware().concat(authAPI.middleware, productAPI.middleware)
    })
}
export type RootState=ReturnType<typeof rootReducer>
export type AppStore=ReturnType<typeof setupStore>
export type AppDispatch =AppStore['dispatch']