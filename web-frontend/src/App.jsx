import HomeRoot from "./layout/HomeRoot";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ProfileRoot from "./layout/ProfileRoot";
import Profile from "./pages/Profile";
import NewPost from "./features/NewPost";
import Post from "./pages/Post";
import SearchRoot from "./layout/SearchRoot";
import ProtectedRoute from "./features/ProtectedRoute";
import PersistLogin from "./components/PersistLogin";
import Search from "./pages/Search";
import Dummy from "./Dummy";
import ChatPage from "./chat/ChatPage";

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <PersistLogin>
        <HomeRoot />
      </PersistLogin>
    ),
    children: [
      { path: "", element: <Home /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfileRoot />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Profile />,
          },
          { path: "edit/:id" },
          { path: "chat/:chatterId", element: <ChatPage /> },
          { path: "new-post", element: <NewPost /> },
          { path: "*", exact: true, element: <p>Invalid Url</p> },
        ],
      },
      {
        path: "search",
        element: <SearchRoot />,
        children: [
          {
            path: "",
            element: (
              <div className="flex justify-center my-12">
                <p>Search to explore...</p>
              </div>
            ),
          },
          { path: ":searchkey", element: <Search /> },
        ],
      },
      { path: "*", element: <p>Invalid Url</p> },
      { path: "viewpost/:id", element: <Post /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
