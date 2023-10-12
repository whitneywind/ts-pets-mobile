import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import petsReducer from "./slices/petsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist"

// the redux-persist library is used here as an efficient way of combining the state data and the data persisted to the async-storge
// this improves upon the first draft app which manually pulled from and  saved to async-storage throughout the app usage

// persist config
const persistConfig = {
    key: "root",
    storage: AsyncStorage
};

// wrapping root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, petsReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;