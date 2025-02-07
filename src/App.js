import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { fetchVideos } from "./redux/slice/videoSlice";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./pages/home";
import VideoDetail from "./pages/videoDetail";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

const PrivateRoute = ({ element }) => {
  const [user] = useAuthState(auth);
  if (!user) {
    return <Navigate to="/" />;
  }
  return element;
};

const App = () => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route
          path="/signup"
          element={user ? <Navigate to="/home" /> : <Signup />}
        />

        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/video/:id"
          element={<PrivateRoute element={<VideoDetail />} />}
        />
      </Routes>
    </Router>
  );
};

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
