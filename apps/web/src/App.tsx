import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Benchmarks from "./pages/Benchmarks";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/benchmarks"
          element={<Benchmarks />}
        />
      </Routes>
    </BrowserRouter>
  );
}