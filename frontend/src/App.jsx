import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function Dashboard() {
  return <h1>Dashboard</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;