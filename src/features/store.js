import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user'

const persistedUser = JSON.parse(localStorage.getItem('user'));

const store =configureStore({
    reducer:{
        user: userReducer,
    },
    preloadedState: {
        user: { user: persistedUser },
      }
})

export default store