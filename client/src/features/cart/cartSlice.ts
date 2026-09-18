import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Product } from "../product/productsSlice";
import type { RootState } from "../../stores/store";

/* =========================================================
   CART ITEM
   ========================================================= */

export interface CartItem {
  product: Product;
  quantity: number;
}

/* =========================================================
   CART STATE
   ========================================================= */

export interface CartState {
  items: CartItem[];
}

/* =========================================================
   INITIAL STATE
   ========================================================= */

const initialState: CartState = {
  items: [],
};

/* =========================================================
   CART SLICE
   ========================================================= */

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    /* =====================================================
       ADD TO CART
       ===================================================== */

    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;

        console.log(
          "🛒 CART ADD:",
          product.product_name,
          "| Product ID:",
          product.id,
          "| Qty:",
          existingItem.quantity,
        );
      } else {
        state.items.push({
          product,
          quantity: 1,
        });

        console.log(
          "🛒 CART ADD:",
          product.product_name,
          "| Product ID:",
          product.id,
          "| Qty: 1",
        );
      }
    },

    /* =====================================================
       REMOVE ONE QUANTITY
       ===================================================== */

    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      const item = state.items.find((item) => item.product.id === productId);

      if (!item) {
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.product.id !== productId,
        );
      }
    },

    /* =====================================================
       REMOVE ITEM COMPLETELY
       ===================================================== */

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      state.items = state.items.filter((item) => item.product.id !== productId);
    },

    /* =====================================================
       SET QUANTITY
       ===================================================== */

    setCartItemQuantity: (
      state,
      action: PayloadAction<{
        productId: number;
        quantity: number;
      }>,
    ) => {
      const { productId, quantity } = action.payload;

      const item = state.items.find((item) => item.product.id === productId);

      if (!item) {
        return;
      }

      /* ===============================================
         QUANTITY 0 = REMOVE
         =============================================== */

      if (quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.product.id !== productId,
        );

        return;
      }

      item.quantity = quantity;
    },

    /* =====================================================
       CLEAR CART
       ===================================================== */

    clearCart: (state) => {
      state.items = [];
    },
  },
});

/* =========================================================
   ACTIONS
   ========================================================= */

export const {
  addToCart,
  removeFromCart,
  removeItemFromCart,
  setCartItemQuantity,
  clearCart,
} = cartSlice.actions;

/* =========================================================
   SELECT CART ITEMS
   ========================================================= */

export const selectCartItems = (state: RootState): CartItem[] => {
  return state.cart.items;
};

/* =========================================================
   TOTAL DIFFERENT PRODUCTS
   =========================================================
   
   Contoh:
   
   Galon 19L x 3
   Aqua 600ml x 2
   
   result = 2
   
   ========================================================= */

export const selectCartItemCount = (state: RootState): number => {
  return state.cart.items.length;
};

/* =========================================================
   TOTAL QUANTITY
   =========================================================
   
   Contoh:
   
   Galon x 3
   Aqua x 2
   
   result = 5
   
   Cocok untuk badge 🛒
   
   ========================================================= */

export const selectCartTotalQuantity = (state: RootState): number => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

/* =========================================================
   SUBTOTAL
   ========================================================= */

export const selectCartSubtotal = (state: RootState): number => {
  return state.cart.items.reduce(
    (total, item) => total + Number(item.product.price || 0) * item.quantity,
    0,
  );
};

/* =========================================================
   CART TOTAL
   ========================================================= */

export const selectCartTotal = (state: RootState): number => {
  return selectCartSubtotal(state);
};

/* =========================================================
   QUANTITY BY PRODUCT
   =========================================================
   
   Contoh:
   
   selectCartQuantity(state, 1)
   
   result:
   3
   
   ========================================================= */

export const selectCartQuantity = (
  state: RootState,
  productId: number,
): number => {
  const item = state.cart.items.find((item) => item.product.id === productId);

  return item?.quantity ?? 0;
};

/* =========================================================
   FIND CART ITEM
   ========================================================= */

export const selectCartItem = (
  state: RootState,
  productId: number,
): CartItem | undefined => {
  return state.cart.items.find((item) => item.product.id === productId);
};

/* =========================================================
   CART EMPTY
   ========================================================= */

export const selectIsCartEmpty = (state: RootState): boolean => {
  return state.cart.items.length === 0;
};

/* =========================================================
   REDUCER
   ========================================================= */

export default cartSlice.reducer;
