import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import Video from "./pages/video/Video";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/video/:id" element={<Video />} />
      </Route>
    </Routes>
  );
}

export default App;
