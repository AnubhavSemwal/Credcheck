import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import VerifierDashboard from "./pages/VerifierDashboard";
import PublicCertificate from "./pages/PublicCertificate";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyRequest from "./pages/VerifyRequest";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================================
            HOME
        ================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* ================================
            AUTHENTICATION
        ================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================================
            STUDENT DASHBOARD
        ================================= */}

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />


        {/* ================================
            VERIFIER DASHBOARD
        ================================= */}

        <Route
          path="/verifier-dashboard"
          element={<VerifierDashboard />}
        />


        {/* ================================
            ADMIN DASHBOARD
        ================================= */}

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />


        {/* ================================
            PUBLIC CERTIFICATE
        ================================= */}

        <Route
          path="/cert/:publicLinkId"
          element={<PublicCertificate />}
        />
        <Route
         path="/verify-request"
         element={<VerifyRequest />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;