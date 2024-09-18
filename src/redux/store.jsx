import { configureStore } from '@reduxjs/toolkit'
import navReducer from './slices/navSlice';
import systemReducer from "./slices/systemSlice"
// import reducers from './Slicer'

// const rootReducers= combineReducers({
//     nav: NavigationSlice.reducer
// })

export const store= configureStore({
    // reducer: rootReducers
    reducer: {
        navigation: navReducer,
        system: systemReducer
    }
});