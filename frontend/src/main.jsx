import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, SignUp, Login } from './pages/index.js';

import store from './store/store.js';
import { Provider } from 'react-redux';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
          path: "/login",
          element: (

                  <Login />

          ),
        },
        {
          path: "/signup",
          element: (

                  <SignUp  />
          ),
        },
    ],
  },  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
