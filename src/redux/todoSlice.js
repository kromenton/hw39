import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Замените на правильный URL вашего ресурса todos
const API_URL = 'https://665bc4ef3e4ac90a04d7f263.mockapi.io/todos/Todo';

// Async thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async (text) => {
    const response = await axios.post(API_URL, { todo: text, completed: false });
    return response.data;
});

export const toggleTodo = createAsyncThunk('todos/toggleTodo', async (id) => {
    const todo = await axios.get(`${API_URL}/${id}`);
    const updatedTodo = { ...todo.data, completed: !todo.data.completed };
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
    return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload.map(todo => ({
                    id: todo.id,
                    text: todo.todo,
                    completed: todo.completed || false
                }));
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push({
                    id: action.payload.id,
                    text: action.payload.todo,
                    completed: action.payload.completed
                });
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = {
                        ...state.todos[index],
                        completed: action.payload.completed
                    };
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            });
    },
});

export default todoSlice.reducer;
