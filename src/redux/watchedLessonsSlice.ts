import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WatchedLessonsState {
    watchedLessons: ObjState[];
}
interface ObjState {
    id: string
    progress: number
}

const initialState: WatchedLessonsState = {
    watchedLessons: []
}

export const watchedLessonsSlice = createSlice({
    name: 'watchedLessons',
    initialState,
    reducers: {
        setWatchedLessons: (state, action: PayloadAction<ObjState>) => {
            const { id, progress } = action.payload;
            const lessonIndex = state.watchedLessons.findIndex((lesson) => lesson.id === id)
            if (lessonIndex >= 0) {
                if (progress > state.watchedLessons[lessonIndex].progress){
                    state.watchedLessons[lessonIndex].progress = progress;
                }
            } else {
                state.watchedLessons.push(action.payload);
            }
        },
    },
});

export const { setWatchedLessons } = watchedLessonsSlice.actions;
export default watchedLessonsSlice.reducer;