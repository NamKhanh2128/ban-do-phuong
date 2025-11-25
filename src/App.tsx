import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResidentHome from "./pages/resident/ResidentHome";
import ResidentProfile from "./pages/resident/ResidentProfile";
import ResidentDeclaration from "./pages/resident/ResidentDeclaration";
import ResidentBooking from "./pages/resident/ResidentBooking";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminResidents from "./pages/admin/AdminResidents";
import AdminBooking from "./pages/admin/AdminBooking";
import AdminAssets from "./pages/admin/AdminAssets";
import AdminReports from "./pages/admin/AdminReports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Resident Routes */}
          <Route path="/resident/home" element={<ResidentHome />} />
          <Route path="/resident/profile" element={<ResidentProfile />} />
          <Route path="/resident/declaration" element={<ResidentDeclaration />} />
          <Route path="/resident/booking" element={<ResidentBooking />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/residents" element={<AdminResidents />} />
          <Route path="/admin/booking" element={<AdminBooking />} />
          <Route path="/admin/assets" element={<AdminAssets />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
