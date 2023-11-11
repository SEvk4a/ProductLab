import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardAPI } from "../services/CardService";
import { authAPI } from "../services/AuthService";
import { userAPI } from "../services/UserService";

const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [cardAPI.reducerPath]: cardAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(userAPI.middleware, cardAPI.middleware, authAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']