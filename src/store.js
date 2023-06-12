import { configureStore, createSlice } from '@reduxjs/toolkit'

let isClicked = createSlice({
    name: 'isClicked',
    initialState: 0,
    reducers: {
        clickedFunction(state) {
            return !state
        }
    }

})
export let { clickedFunction } = isClicked.actions
export default configureStore({
    reducer: {
        isClicked: isClicked.reducer
    }
}) 