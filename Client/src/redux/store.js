import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authreducer";
import {apiSlice} from "./appslice";


const store = configureStore(
    {
        reduce:{
            [apiSlice.reducerPath]: apiSlice.reducer,
            auth: authReducer
        },
        middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true,
    }
)
