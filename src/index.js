import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import {BrowserRouter , Route,Routes} from "react-router-dom"
import { worker } from './api/server'
import {SinglePagePost} from "./features/posts/SinglePostPage"
import {EditPostForm} from "./features/posts/EditPostForm"
// import {fetchUsers} from "./features/users/userSlice"
import {UsersList} from "./features/users/UserList"
import {UserPage} from "./features/users/UserPage"
import {NotificationsList} from "./features/notifications/NotificationsList"
import {apiSlice} from "./features/api/apiSlice"
import {extendedApiSlice} from "./features/users/userSlice"
// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })
//  store.dispatch(fetchUsers());
store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())
  ReactDOM.render(
   
    <React.StrictMode>
   
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/post/:postId" element={<SinglePagePost/>}/>
        <Route path="/editPost/:postId" element={<EditPostForm/>}/>
        {/* <Route path="/users" element={<UsersList/>}></Route>
        <Route path="/users/:userId" element={<UserPage/>}></Route> */}
      </Routes>
      <Routes>
      
        <Route path="/users" element={<UsersList/>}>
        <Route path=":userId" element={<UserPage/>}></Route>
        </Route>
        <Route path="/notifications" element={<NotificationsList/>}></Route>
        {/* <Route path="/users/:userId" element={<UserPage/>}></Route> */}
      </Routes>
        
        </BrowserRouter>
      </Provider>

    </React.StrictMode>,
    document.getElementById('root')
  )
}

start()
