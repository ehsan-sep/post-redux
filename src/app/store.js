import { configureStore, } from '@reduxjs/toolkit'
import postsReducer from "../features/posts/postSlice"
import usersReducer from "../features/users/userSlice"
import notificationsReducer from "../features/notifications/notificationSlice"
import {apiSlice} from "../features/api/apiSlice"
export default configureStore({
  reducer: {
    posts:postsReducer,
    users:usersReducer,
    notifications:notificationsReducer,
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})
