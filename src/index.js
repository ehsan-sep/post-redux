import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import {BrowserRouter , Route,Routes} from "react-router-dom"
import { worker } from './api/server'

// Wrap app rendering so we can wait for the mock API to initialize
async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: 'bypass' })

  ReactDOM.render(
   
    <React.StrictMode>
   
      <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
      </Routes>
        
        </BrowserRouter>
      </Provider>

    </React.StrictMode>,
    document.getElementById('root')
  )
}

start()
