import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import OrderPage from "./pages/OrderPage";
import SuccessPage from "./pages/SuccessPage";
import AdminLogin from "./pages/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import AdminProtectedRoute from "./pages/AdminProtectedRoute";
import HomePage from "./pages/HomePage";
import MenuSection from "./pages/MenuSection";
import LocationsPage from "./pages/LocationsPage";
import ContactPage from "./pages/ContactPage";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/home" element={<HomePage />} />

        <Route path="/menu" element={<MenuSection />} />
        <Route
  path="/locations"
  element={<LocationsPage />}
/>
<Route
  path="/contact"
  element={<ContactPage />}
/>
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route path="/" element={<OrderPage />} />

        <Route path="/success/:orderId" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
