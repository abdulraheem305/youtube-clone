import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { fetchVideos } from "./redux/slice/videoSlice";
import Home from "./pages/home";
import VideoDetail from "./pages/videoDetail";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/video/:id" element={<VideoDetail />} /> */}
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
