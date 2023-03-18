import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PaginationType {
    currentPage: number;
}

const initialState: PaginationType = {
    currentPage: 1
}

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
    },
});

export const { setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;