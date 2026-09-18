import { useEffect, useState } from "react";

import {
  Bell,
  Home,
  LogOut,
  Menu,
  Radio,
  Server,
  UserCircle,
  Contact,
  Sun,
  Moon,
  ShoppingCart,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "../../stores/store";

import { clearAuth } from "../../features/auth/authSlice";

import { selectCartTotalQuantity } from "../../features/cart/cartSlice";

import CartPanel from "../../features/cart/CartPanel";

import api from "../../api/axios";

import "./Header.css";

interface HeaderProps {
  onMenuClick?: () => void;
}

/* =========================================================
   ABN FLEET SYSTEM
   APPLICATION HEADER
   ========================================================= */

function Header({ onMenuClick }: HeaderProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  /* =====================================================
     CART
  ===================================================== */

  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const [cartOpen, setCartOpen] = useState(false);

  /* =====================================================
     THEME
  ===================================================== */

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("abn-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      console.log("ABN LOGOUT: server logout success");
    } catch (error) {
      console.error("ABN LOGOUT ERROR:", error);
    } finally {
      dispatch(clearAuth());

      navigate("/login", {
        replace: true,
      });
    }
  };

  /* =====================================================
     THEME EFFECT
  ===================================================== */

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("abn-theme", theme);
  }, [theme]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <>
      <header className="app-header">
        {/* =================================================
            LEFT
        ================================================= */}

        <div className="header-left">
          {/* MENU */}

          <button
            type="button"
            className="header-menu-button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            title="Open navigation"
          >
            <Menu size={21} strokeWidth={2} />
          </button>

          {/* =================================================
              QUICK NAVIGATION
          ================================================= */}

          <nav className="header-nav" aria-label="Quick navigation">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "active" : ""}`
              }
            >
              <Home size={16} strokeWidth={2} />

              <span>HOME</span>
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `header-nav-link ${isActive ? "active" : ""}`
              }
            >
              <Contact size={18} strokeWidth={2} />

              <span>CONTACT</span>
            </NavLink>
          </nav>
        </div>

        {/* =================================================
            RIGHT
        ================================================= */}

        <div className="header-right">
          {/* =================================================
              SERVER
          ================================================= */}

          <div className="header-server">
            <div className="header-server-icon">
              <Server size={16} />
            </div>

            <div className="header-server-info">
              <div className="header-server-top">
                <span className="header-status-dot" />

                <strong>SERVER ONLINE</strong>
              </div>

              <span>ABN SERVER :5000</span>
            </div>
          </div>

          {/* =================================================
              WEBSOCKET
          ================================================= */}

          <div className="header-connection" title="WebSocket connection">
            <Radio size={17} />

            <span>REALTIME</span>

            <i />
          </div>

          {/* =================================================
              CART
          ================================================= */}

          {cartTotalQuantity > 0 && (
            <button
              type="button"
              className="header-cart-button"
              onClick={() => setCartOpen(true)}
              aria-label="Shopping cart"
              title="Belanja"
            >
              <ShoppingCart size={19} strokeWidth={2} />

              <span className="header-cart-count">{cartTotalQuantity}</span>
            </button>
          )}

          {/* =================================================
              THEME
          ================================================= */}

          <button
            type="button"
            className="header-icon-button theme-button"
            onClick={() => {
              setTheme((current) => (current === "dark" ? "light" : "dark"));
            }}
            aria-label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            title={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
          >
            {theme === "dark" ? (
              <Sun size={18} strokeWidth={2} />
            ) : (
              <Moon size={18} strokeWidth={2} />
            )}
          </button>

          {/* =================================================
              NOTIFICATION
          ================================================= */}

          <button
            type="button"
            className="header-icon-button notification-button"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={18} strokeWidth={2} />

            <span className="notification-badge">2</span>
          </button>

          {/* =================================================
              USER
          ================================================= */}

          <div className="header-user">
            <div className="header-user-avatar">
              <UserCircle size={32} strokeWidth={1.7} />
            </div>

            <div className="header-user-info">
              <strong>{user?.full_name || user?.username || "ABN User"}</strong>

              <span>{user?.role || "VIEWER"}</span>
            </div>
          </div>

          {/* =================================================
              LOGOUT
          ================================================= */}

          <button
            type="button"
            className="header-logout-button"
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
          >
            <LogOut size={18} strokeWidth={2} />

            <span>LOGOUT</span>
          </button>
        </div>
      </header>

      {/* =====================================================
          CART PANEL
      ===================================================== */}

      <CartPanel open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export default Header;
