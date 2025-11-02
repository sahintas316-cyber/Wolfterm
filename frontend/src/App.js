import React from "react";
import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Reviews from "./pages/Reviews";

// Admin imports
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import ProductsManagement from "./pages/admin/ProductsManagement";
import ReviewsManagement from "./pages/admin/ReviewsManagement";
import CategoriesManagement from "./pages/admin/CategoriesManagement";
import HeroSlidesManagement from "./pages/admin/HeroSlidesManagement";
import CatalogsManagement from "./pages/admin/CatalogsManagement";
import SiteSettings from "./pages/admin/SiteSettings";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <HashRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            } />
            <Route path="/catalog" element={
              <>
                <Header />
                <Catalog />
                <Footer />
              </>
            } />
            <Route path="/catalog/:categoryId" element={
              <>
                <Header />
                <Catalog />
                <Footer />
              </>
            } />
            <Route path="/product/:id" element={
              <>
                <Header />
                <ProductDetail />
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            } />
            <Route path="/reviews" element={
              <>
                <Header />
                <Reviews />
                <Footer />
              </>
            } />
            <Route path="/support" element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            } />
            <Route path="/videos" element={
              <>
                <Header />
                <Reviews />
                <Footer />
              </>
            } />
            <Route path="/warranty" element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            } />
            <Route path="/become-dealer" element={
              <>
                <Header />
                <About />
                <Footer />
              </>
            } />
            <Route path="/equipment" element={
              <>
                <Header />
                <Catalog />
                <Footer />
              </>
            } />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<ProductsManagement />} />
              <Route path="reviews" element={<ReviewsManagement />} />
              <Route path="categories" element={<CategoriesManagement />} />
              <Route path="hero-slides" element={<HeroSlidesManagement />} />
              <Route path="catalogs" element={<CatalogsManagement />} />
              <Route path="settings" element={<SiteSettings />} />
            </Route>
          </Routes>
          <Toaster />
        </HashRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
