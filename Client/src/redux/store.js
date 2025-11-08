import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";

// Add a sample user to localStorage for getInitials function
if (!localStorage.getItem("userInfo")) {
    localStorage.setItem(
        "userInfo",
        JSON.stringify({ name: "Sample Gser", email: "sample@example.com", isAdmin: true })
    );
}

const store = configureStore(
    {
        reducer:{
            [apiSlice.reducerPath]: apiSlice.reducer,
            auth: authReducer
        },
        middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
        devTools:true,
    }
)
export default store;
