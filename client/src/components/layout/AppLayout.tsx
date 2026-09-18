import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

import "./AppLayout.css";

import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={handleCloseSidebar}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <div className={sidebarOpen ? "sidebar-wrapper open" : "sidebar-wrapper"}>
        <Sidebar onClose={handleCloseSidebar} />
      </div>

      {/* =====================================================
          MAIN APPLICATION
      ===================================================== */}

      <div className="app-main">
        <Header onMenuClick={handleOpenSidebar} />

        <main className="app-content">
          <Outlet />
        </main>

        <Footer />

        <WhatsAppButton />
      </div>
    </div>
  );
}

export default AppLayout;
