import { createSlice } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        resumeId: null,
    },
    reducers: {
        setResumeId: (state, action) => {
            state.resumeId = action.payload;
        },
    },
});

export const { setResumeId } = resumeSlice.actions;

export default resumeSlice.reducer;
