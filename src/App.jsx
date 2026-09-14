// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/customer/HomePage';
import ShopDetailPage from './pages/customer/ShopDetailPage';
import { Store, Shield, ArrowLeft } from 'lucide-react';

function PlaceholderPortal({ title, phase, role, linkText }) {
  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center space-y-4 max-w-md mx-auto my-12 shadow-sm">
      <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
        {role === 'seller' ? <Store className="w-8 h-8" /> : <Shield className="w-8 h-8" />}
      </div>
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
          {phase}
        </span>
        <h3 className="text-xl font-bold text-slate-900 mt-3">{title}</h3>
        <p className="text-sm text-slate-500 mt-2">
          This portal will be fully unlocked during {phase} implementation.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition shadow-sm active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Marketplace</span>
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop/:id" element={<ShopDetailPage />} />
          <Route
            path="/seller/login"
            element={
              <PlaceholderPortal
                title="Seller Portal"
                phase="Phase 3"
                role="seller"
                linkText="Back to Market"
              />
            }
          />
          <Route
            path="/admin/login"
            element={
              <PlaceholderPortal
                title="Admin Portal"
                phase="Phase 4"
                role="admin"
                linkText="Back to Market"
              />
            }
          />
          {/* Catch-all */}
          <Route
            path="*"
            element={
              <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 my-8">
                <h3 className="text-xl font-bold text-slate-800">Page Not Found</h3>
                <p className="text-sm text-slate-500">The requested page does not exist.</p>
                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
