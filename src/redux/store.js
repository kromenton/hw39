import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { thunk } from 'redux-thunk'; // Используем именованный импорт

const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
