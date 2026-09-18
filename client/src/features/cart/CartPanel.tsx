import { useState } from "react";

import { Plus, Minus, Trash2, X } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "../../stores/store";

import {
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotal,
  removeFromCart,
  removeItemFromCart,
  addToCart,
  clearCart,
} from "../../features/cart/cartSlice";

import { createOrder, type Order } from "../../features/order/ordersSlice";

import WaterGallon from "../../components/MimicRO/WaterGallon";
import PaymentButton from "../../components/MimicRO/buttons/PaymentButton";

import "./CartPanel.css";

interface CartPanelProps {
  open: boolean;
  onClose: () => void;
}

function CartPanel({ open, onClose }: CartPanelProps) {
  const dispatch = useDispatch<AppDispatch>();

  // =====================================================
  // CART
  // =====================================================

  const cartItems = useSelector(selectCartItems);

  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const cartTotal = useSelector(selectCartTotal);

  const cartEmpty = cartItems.length === 0;

  // =====================================================
  // CREATED ORDER
  //
  // null  = cart masih draft / memory
  // object = order sudah dibuat di database
  // =====================================================

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const [creatingOrder, setCreatingOrder] = useState(false);

  // =====================================================
  // BUYER FORM
  // =====================================================

  const [customerName, setCustomerName] = useState("");

  const [customerPhone, setCustomerPhone] = useState("");

  const [customerEmail, setCustomerEmail] = useState("");

  const [notes, setNotes] = useState("");

  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // =====================================================
  // VALIDATE CUSTOMER
  // =====================================================

  const validateCustomer = () => {
    const name = customerName.trim();

    const phone = customerPhone.trim();

    const email = customerEmail.trim();

    // ---------------------------------------------------
    // NAME
    // ---------------------------------------------------

    if (!name) {
      alert("Nama pembeli wajib diisi.");

      return false;
    }

    if (name.length < 2) {
      alert("Nama pembeli terlalu pendek.");

      return false;
    }

    // ---------------------------------------------------
    // PHONE
    // ---------------------------------------------------

    if (!phone) {
      alert("Nomor HP wajib diisi.");

      return false;
    }

    const normalizedPhone = phone.replace(/\D/g, "");

    if (normalizedPhone.length < 8 || normalizedPhone.length > 15) {
      alert("Nomor HP tidak valid.");

      return false;
    }

    // ---------------------------------------------------
    // EMAIL
    // ---------------------------------------------------

    if (!email) {
      alert("Email wajib diisi.");

      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Format email tidak valid.");

      return false;
    }

    return true;
  };

  // =====================================================
  // CHECKOUT
  //
  // Cart masih memory sampai tombol CHECKOUT ditekan.
  // =====================================================

  const handleCheckout = async () => {
    if (creatingOrder) {
      return;
    }

    // ---------------------------------------------------
    // CART VALIDATION
    // ---------------------------------------------------

    if (cartEmpty) {
      alert("Keranjang masih kosong.");

      return;
    }

    if (!Number.isFinite(cartTotal) || cartTotal <= 0) {
      alert("Total keranjang tidak valid.");

      return;
    }

    // ---------------------------------------------------
    // CUSTOMER VALIDATION
    // ---------------------------------------------------

    if (!validateCustomer()) {
      return;
    }

    try {
      setCreatingOrder(true);

      // =================================================
      // DEBUG CHECKOUT
      // =================================================

      console.log("====================================");

      console.log("🛒 CHECKOUT ORDER");

      console.log("CUSTOMER:", {
        name: customerName.trim(),

        phone: customerPhone.trim(),

        email: customerEmail.trim(),
      });

      console.log("CART ITEMS:", cartItems);

      console.log("CART TOTAL DISPLAY:", cartTotal);

      console.log("====================================");

      // =================================================
      // CREATE ORDER
      //
      // Frontend hanya mengirim:
      // - customer
      // - product_id
      // - quantity
      //
      // Backend menghitung:
      // - price
      // - subtotal
      // - grand_total
      // - order_number
      // - order_items snapshot
      // =================================================

      const result = await dispatch(
        createOrder({
          customer_name: customerName.trim(),

          customer_phone: customerPhone.trim(),

          customer_email: customerEmail.trim(),

          notes: notes.trim() || null,

          items: cartItems.map((item) => ({
            product_id: Number(item.product.id),

            quantity: Number(item.quantity),
          })),
        }),
      ).unwrap();

      // =================================================
      // VALIDATE RESPONSE
      // =================================================

      if (!result.data) {
        throw new Error("Data order tidak diterima dari server.");
      }

      // =================================================
      // SAVE CREATED ORDER
      // =================================================

      setCreatedOrder(result.data);

      console.log("✅ ORDER CREATED:", result.data);

      console.log("🧾 DATABASE ORDER ID:", result.data.id);

      console.log("🧾 ORDER NUMBER:", result.data.order_number);

      console.log("💰 SERVER GRAND TOTAL:", result.data.grand_total);
    } catch (error) {
      console.error("❌ CHECKOUT ERROR:", error);

      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : "Gagal membuat order.";

      alert(message);
    } finally {
      setCreatingOrder(false);
    }
  };

  // =====================================================
  // PANEL CLOSED
  // =====================================================

  if (!open) {
    return null;
  }

  return (
    <div className="cart-overlay">
      <div className="cart-panel">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="cart-panel-header">
          <div>
            <strong>🛒 BELANJA</strong>

            <span>
              {cartTotalQuantity} item
              {cartTotalQuantity !== 1 ? "s" : ""}
            </span>
          </div>

          <button
            type="button"
            className="cart-close-button"
            onClick={onClose}
            aria-label="Close cart"
            title="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            ITEMS
        ================================================= */}

        <div className="cart-panel-body">
          {cartEmpty ? (
            <div className="cart-empty">
              <ShoppingCartIcon />

              <strong>Keranjang masih kosong</strong>

              <span>Belum ada produk yang ditambahkan.</span>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.product.id}>
                {/* =======================================
                      PRODUCT VISUAL
                  ======================================= */}

                <div className="cart-item-image">
                  <svg
                    width="70"
                    height="90"
                    viewBox="0 0 90 120"
                    aria-hidden="true"
                  >
                    <WaterGallon
                      x={0}
                      y={0}
                      w={90}
                      h={120}
                      label="19 L"
                      productId={item.product.id}
                      onClick={() => {}}
                    />
                  </svg>
                </div>

                {/* =======================================
                      PRODUCT INFO
                  ======================================= */}

                <div className="cart-item-info">
                  <strong>{item.product.product_name}</strong>

                  <span>{item.product.product_code}</span>

                  <small>
                    {formatCurrency(Number(item.product.price || 0))}
                  </small>
                </div>

                {/* =======================================
                      ACTIONS
                  ======================================= */}

                <div className="cart-item-actions">
                  {/* MINUS */}

                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    aria-label={`Kurangi ${item.product.product_name}`}
                    title="Kurangi"
                  >
                    <Minus size={14} />
                  </button>

                  {/* QUANTITY */}

                  <strong>{item.quantity}</strong>

                  {/* PLUS */}

                  <button
                    type="button"
                    onClick={() => dispatch(addToCart(item.product))}
                    aria-label={`Tambah ${item.product.product_name}`}
                    title="Tambah"
                  >
                    <Plus size={14} />
                  </button>

                  {/* DELETE */}

                  <button
                    type="button"
                    className="cart-delete-button"
                    onClick={() =>
                      dispatch(removeItemFromCart(item.product.id))
                    }
                    aria-label={`Hapus ${item.product.product_name}`}
                    title="Hapus"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* =================================================
            CUSTOMER FORM
        ================================================= */}

        {!cartEmpty && !createdOrder && (
          <div
            style={{
              padding: "16px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <strong
              style={{
                display: "block",
                marginBottom: "12px",
              }}
            >
              DATA PEMBELI
            </strong>

            <div
              style={{
                display: "grid",
                gap: "10px",
              }}
            >
              {/* NAMA */}

              <input
                type="text"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                placeholder="Nama pembeli"
                autoComplete="name"
              />

              {/* PHONE */}

              <input
                type="tel"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                placeholder="Nomor HP"
                autoComplete="tel"
              />

              {/* EMAIL */}

              <input
                type="email"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
                placeholder="Email"
                autoComplete="email"
              />

              {/* NOTES */}

              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Catatan pesanan (opsional)"
                rows={3}
              />
            </div>
          </div>
        )}

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="cart-panel-footer">
          {/* ===============================================
              TOTAL
          =============================================== */}

          <div className="cart-total">
            <span>TOTAL</span>

            <strong>
              {formatCurrency(
                createdOrder
                  ? Number(createdOrder.grand_total || 0)
                  : cartTotal,
              )}
            </strong>
          </div>

          {/* ===============================================
              CHECKOUT
          =============================================== */}

          {!cartEmpty && !createdOrder && (
            <button
              type="button"
              disabled={creatingOrder}
              onClick={handleCheckout}
              style={{
                width: "200px",
                minHeight: "45px",
                border: "1px solid #2563eb",
                borderRadius: "8px",
                background: creatingOrder ? "#94a3b8" : "#2563eb",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 700,
                cursor: creatingOrder ? "not-allowed" : "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {creatingOrder ? "MEMBUAT ORDER..." : "CHECKOUT"}
            </button>
          )}

          {/* ===============================================
              PAYMENT
          =============================================== */}

          {createdOrder && (
            <PaymentButton
              mode="html"
              width={200}
              height={45}
              amount={Number(createdOrder.grand_total || 0)}
              orderId={createdOrder.id}
              label="BAYAR SEKARANG"
              onSuccess={(result) => {
                console.log("💰 PAYMENT SUCCESS:", result);

                console.log("🧾 ORDER:", createdOrder);

                // =========================================
                // RESET CART
                // =========================================

                dispatch(clearCart());

                // =========================================
                // RESET BUYER FORM
                // =========================================

                setCustomerName("");

                setCustomerPhone("");

                setCustomerEmail("");

                setNotes("");

                // =========================================
                // RESET CREATED ORDER
                // =========================================

                setCreatedOrder(null);

                // =========================================
                // CLOSE CART PANEL
                // =========================================

                onClose();
              }}
              onPending={(result) => {
                console.log("⏳ PAYMENT PENDING:", result);
              }}
              onError={(result) => {
                console.error("❌ PAYMENT ERROR:", result);
              }}
              onClose={() => {
                console.log("🚪 PAYMENT WINDOW CLOSED");
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   EMPTY CART ICON
========================================================= */

function ShoppingCartIcon() {
  return <div className="cart-empty-icon">🛒</div>;
}

export default CartPanel;
