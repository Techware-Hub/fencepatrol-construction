import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import LockedService from "./pages/LockedService.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/services/:slug" element={<LockedService />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
