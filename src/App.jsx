import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import AdminDashboard from "./page/AdminDashboard";
import AdminAddMovie from "./page/AdminAddMovie";
import EditMovie from "./page/EditMovie";
import SingleMovie from "./page/SingleMovie";
import Watchlist from "./page/Watchlist";
import Profile from "./page/Profile";
import Movies from "./page/Movies";
import AdminMovies from "./page/AdminMovies";
import AdminUsers from "./page/AdminUsers";
import { Toaster } from "react-hot-toast";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #333",
          },
        }}
      />

      <BrowserRouter>
        <Routes>


          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />


          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />


          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />


          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />


          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />


          <Route
            path="/admin/add-movie"
            element={
              <ProtectedRoute role="admin">
                <AdminAddMovie />
              </ProtectedRoute>
            }
          />



          <Route
            path="/admin/movies"
            element={
              <ProtectedRoute role="admin">
                <AdminMovies />
              </ProtectedRoute>
            }
          />


          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />


          <Route
            path="/admin/edit-movie/:id"
            element={
              <ProtectedRoute role="admin">
                <EditMovie />
              </ProtectedRoute>
            }
          />


          <Route
            path="/movie/:id"
            element={user ? <SingleMovie /> : <Navigate to="/login" />}
          />

          <Route
            path="/watchlist"
            element={user ? <Watchlist /> : <Navigate to="/login" />}
          />


          <Route
            path="/movies"
            element={<Movies />}
          />

        </Routes>


      </BrowserRouter>

    </>
  );
}

export default App;