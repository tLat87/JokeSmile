import { createSlice } from '@reduxjs/toolkit';

const jokeSlice = createSlice({
    name: 'jokes',
    initialState: {
        list: []
    },
    reducers: {
        addJoke: (state, action) => {
            state.list.push({
                id: Date.now(),
                ...action.payload
            });
        },
        removeJoke: (state, action) => {
            state.list = state.list.filter(joke => joke.id !== action.payload);
        },
        deleteAll: (state, action) => {
            state.list = []
        }
    }
});

export const { addJoke, removeJoke , deleteAll} = jokeSlice.actions;
export default jokeSlice.reducer;
