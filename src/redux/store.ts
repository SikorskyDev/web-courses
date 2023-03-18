import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { courseListApi } from './courseListApi';
import watchedLessonsSlice from './watchedLessonsSlice';
import paginationSlice from './paginationSlice';


const rootReducer = combineReducers({
    watchedLessonsSlice, paginationSlice, [courseListApi.reducerPath]: courseListApi.reducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['paginationSlice']
}

export const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(courseListApi.middleware),

})

export const persister = persistStore(store);



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;