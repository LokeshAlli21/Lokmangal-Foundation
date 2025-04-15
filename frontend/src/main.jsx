import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css";
import App from "./App.jsx"

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home, SignUp, Login, Dashboard ,Profile , Interests, Chat, Setting, Logout, EditProfile,Profiledetails, Contact, About} from "./pages/index.js"

import store from "./store/store.js"
import { Provider } from "react-redux"

import AuthLayout from "./components/AuthLayout.jsx"

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
            <AuthLayout currentpath="/login" authentication={false}>
              <Login />
             </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout currentpath="/signup" authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout  authentication={true}>
            <Dashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
            <AuthLayout  authentication={true}>
              <Profile />
            </AuthLayout>
        ),
      },
      {
        path: "/interests",
        element: (
            <AuthLayout  authentication={true}>
              <Interests />
            </AuthLayout>
        ),
      },
      {
        path: "/chat",
        element: (
            <AuthLayout   authentication={true}>
              <Chat />
            </AuthLayout>
        ),
      },
      {
        path: "/setting",
        element: (
            <AuthLayout  authentication={true}>
              <Setting />
            </AuthLayout>
        ),
      },
      {
        path: "/contact",
        element: (
            <AuthLayout  authentication={false}>
              <Contact />
            </AuthLayout>
        ),
      },
      {
        path: "/about",
        element: (
            <AuthLayout  authentication={false}>
              <About />
            </AuthLayout>
        ),
      },
      {
        path: "/edit-profile",
        element: (
            <AuthLayout  authentication={true}>
              <EditProfile />
            </AuthLayout>
        ),
      },
      {
        path: "/profile-details/:id",
        element: (
            <AuthLayout  authentication={true}>
              <Profiledetails />
            </AuthLayout>
        ),
      },
      {
        path: "/log-out",
        element: (
              <Logout />
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
