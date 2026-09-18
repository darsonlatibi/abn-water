/* =========================================================
   ABN WATER / E-COMMERCE
   ORDERS SLICE
   ========================================================= */

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import axios from "axios";

import api from "../../api/axios";

/* =========================================================
   TYPES
========================================================= */

export interface OrderItem {
  id?: number;

  order_id?: number;

  product_id: number;

  product_code?: string;

  product_name?: string;

  quantity: number;

  unit_price?: number;

  discount?: number;

  subtotal?: number;

  created_at?: string;

  updated_at?: string;

  [key: string]: unknown;
}

export interface Order {
  id: number;

  order_number?: string;

  user_id?: number | null;

  customer_id?: number | null;

  customer_name?: string | null;

  customer_phone?: string | null;

  customer_email?: string | null;

  status?: string;

  subtotal?: number;

  discount?: number;

  tax?: number;

  shipping_cost?: number;

  grand_total?: number;

  payment_status?: string;

  payment_method?: string | null;

  notes?: string | null;

  items?: OrderItem[];

  created_at?: string;

  updated_at?: string;

  [key: string]: unknown;
}

export interface OrderPagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface OrdersResponse {
  success: boolean;

  data: Order[];

  pagination?: OrderPagination;

  message?: string;
}

export interface OrderResponse {
  success: boolean;

  data: Order;

  message?: string;
}

/* =========================================================
   PAYLOAD TYPES
========================================================= */

export interface GetOrdersParams {
  page?: number;

  limit?: number;

  search?: string;

  status?: string;

  customer_id?: number | string;

  user_id?: number | string;

  sort?: string;

  order?: "ASC" | "DESC";
}

/* =========================================================
   CREATE ORDER ITEM
========================================================= */

export interface CreateOrderItemPayload {
  product_id: number;

  quantity: number;
}

/* =========================================================
   CREATE ORDER
========================================================= */

export interface CreateOrderPayload {
  user_id?: number | null;

  customer_name?: string;

  customer_phone?: string;

  customer_email?: string;

  items: CreateOrderItemPayload[];

  notes?: string | null;
}

/* =========================================================
   UPDATE ORDER
========================================================= */

export interface UpdateOrderPayload {
  user_id?: number | null;

  customer_name?: string;

  customer_phone?: string;

  customer_email?: string;

  customer_id?: number | null;

  status?: string;

  discount?: number;

  tax?: number;

  shipping_cost?: number;

  payment_status?: string;

  payment_method?: string | null;

  notes?: string | null;
}

export interface UpdateOrderStatusPayload {
  id: number;

  status: string;
}

/* =========================================================
   ERROR HELPER
========================================================= */

const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

/* =========================================================
   STATE
========================================================= */

interface OrdersState {
  items: Order[];

  selectedOrder: Order | null;

  pagination: OrderPagination;

  loading: boolean;

  error: string | null;

  successMessage: string | null;
}

/* =========================================================
   INITIAL STATE
========================================================= */

const initialState: OrdersState = {
  items: [],

  selectedOrder: null,

  pagination: {
    page: 1,

    limit: 50,

    total: 0,

    totalPages: 0,
  },

  loading: false,

  error: null,

  successMessage: null,
};

/* =========================================================
   GET ORDERS
   GET /api/orders
========================================================= */

export const fetchOrders = createAsyncThunk<
  OrdersResponse,
  GetOrdersParams | undefined,
  { rejectValue: string }
>(
  "orders/fetchOrders",

  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get<OrdersResponse>("/orders", {
        params,
      });

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        getApiErrorMessage(error, "Gagal mengambil orders."),
      );
    }
  },
);

/* =========================================================
   GET ORDER BY ID
   GET /api/orders/:id
========================================================= */

export const fetchOrderById = createAsyncThunk<
  OrderResponse,
  number | string,
  { rejectValue: string }
>(
  "orders/fetchOrderById",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get<OrderResponse>(`/orders/${id}`);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        getApiErrorMessage(error, "Gagal mengambil order."),
      );
    }
  },
);

/* =========================================================
   GET ORDER BY NUMBER
   GET /api/orders/number/:orderNumber
========================================================= */

export const fetchOrderByNumber = createAsyncThunk<
  OrderResponse,
  string,
  { rejectValue: string }
>(
  "orders/fetchOrderByNumber",

  async (orderNumber, { rejectWithValue }) => {
    try {
      const response = await api.get<OrderResponse>(
        `/orders/number/${encodeURIComponent(orderNumber)}`,
      );

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        getApiErrorMessage(error, "Gagal mengambil order berdasarkan nomor."),
      );
    }
  },
);

/* =========================================================
   CREATE ORDER
   POST /api/orders

   IMPORTANT:
   Backend akan menghitung:
   - subtotal
   - grand_total
   - product price
   - product snapshot
   - order_number

   Frontend hanya mengirim item/product + quantity.
========================================================= */

export const createOrder = createAsyncThunk<
  OrderResponse,
  CreateOrderPayload,
  { rejectValue: string }
>(
  "orders/createOrder",

  async (payload, { rejectWithValue }) => {
    try {
      /* ===================================================
         VALIDATION FRONTEND
      =================================================== */

      if (
        !payload.items ||
        !Array.isArray(payload.items) ||
        payload.items.length === 0
      ) {
        return rejectWithValue("Keranjang order masih kosong.");
      }

      for (const item of payload.items) {
        if (
          !Number.isInteger(Number(item.product_id)) ||
          Number(item.product_id) <= 0
        ) {
          return rejectWithValue(`Product ID tidak valid: ${item.product_id}`);
        }

        if (
          !Number.isInteger(Number(item.quantity)) ||
          Number(item.quantity) <= 0
        ) {
          return rejectWithValue(
            `Quantity tidak valid untuk product ${item.product_id}.`,
          );
        }
      }

      /* ===================================================
         API
      =================================================== */

      const response = await api.post<OrderResponse>("/orders", payload);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(getApiErrorMessage(error, "Gagal membuat order."));
    }
  },
);

/* =========================================================
   UPDATE ORDER
   PUT /api/orders/:id
========================================================= */

export const updateOrder = createAsyncThunk<
  OrderResponse,
  {
    id: number | string;

    data: UpdateOrderPayload;
  },
  { rejectValue: string }
>(
  "orders/updateOrder",

  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put<OrderResponse>(`/orders/${id}`, data);

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        getApiErrorMessage(error, "Gagal memperbarui order."),
      );
    }
  },
);

/* =========================================================
   UPDATE ORDER STATUS
   PATCH /api/orders/:id/status
========================================================= */

export const updateOrderStatus = createAsyncThunk<
  OrderResponse,
  UpdateOrderStatusPayload,
  { rejectValue: string }
>(
  "orders/updateOrderStatus",

  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch<OrderResponse>(`/orders/${id}/status`, {
        status,
      });

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        getApiErrorMessage(error, "Gagal memperbarui status order."),
      );
    }
  },
);

/* =========================================================
   DELETE ORDER
   DELETE /api/orders/:id
========================================================= */

export const deleteOrder = createAsyncThunk<
  number,
  number | string,
  { rejectValue: string }
>(
  "orders/deleteOrder",

  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/orders/${id}`);

      return Number(id);
    } catch (error: unknown) {
      return rejectWithValue(
        getApiErrorMessage(error, "Gagal menghapus order."),
      );
    }
  },
);

/* =========================================================
   SLICE
========================================================= */

const ordersSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    /* =====================================================
       CLEAR ERROR
    ===================================================== */

    clearOrderError: (state) => {
      state.error = null;
    },

    /* =====================================================
       CLEAR SUCCESS
    ===================================================== */

    clearOrderSuccess: (state) => {
      state.successMessage = null;
    },

    /* =====================================================
       CLEAR SELECTED ORDER
    ===================================================== */

    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },

    /* =====================================================
       SET SELECTED ORDER
    ===================================================== */

    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },

    /* =====================================================
       RESET
    ===================================================== */

    resetOrders: (state) => {
      state.items = [];

      state.selectedOrder = null;

      state.pagination = {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0,
      };

      state.loading = false;

      state.error = null;

      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    /* =====================================================
       FETCH ORDERS
    ===================================================== */

    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.items = action.payload.data || [];

        state.pagination = action.payload.pagination || {
          page: 1,
          limit: 50,
          total: action.payload.data?.length || 0,
          totalPages: 1,
        };
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Gagal mengambil orders.";
      });

    /* =====================================================
       FETCH ORDER BY ID
    ===================================================== */

    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedOrder = action.payload.data || null;
      })

      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Gagal mengambil order.";
      });

    /* =====================================================
       FETCH ORDER BY NUMBER
    ===================================================== */

    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedOrder = action.payload.data || null;
      })

      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Gagal mengambil order berdasarkan nomor.";
      });

    /* =====================================================
       CREATE ORDER
    ===================================================== */

    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.successMessage = null;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.successMessage =
          action.payload.message || "Order berhasil dibuat.";

        if (action.payload.data) {
          state.items.unshift(action.payload.data);

          state.selectedOrder = action.payload.data;
        }
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Gagal membuat order.";
      });

    /* =====================================================
       UPDATE ORDER
    ===================================================== */

    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.successMessage = null;
      })

      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.successMessage =
          action.payload.message || "Order berhasil diperbarui.";

        const updatedOrder = action.payload.data;

        if (!updatedOrder) {
          return;
        }

        const index = state.items.findIndex(
          (order) => order.id === updatedOrder.id,
        );

        if (index !== -1) {
          state.items[index] = updatedOrder;
        }

        if (state.selectedOrder?.id === updatedOrder.id) {
          state.selectedOrder = updatedOrder;
        }
      })

      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Gagal memperbarui order.";
      });

    /* =====================================================
       UPDATE ORDER STATUS
    ===================================================== */

    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.successMessage = null;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.successMessage =
          action.payload.message || "Status order berhasil diperbarui.";

        const updatedOrder = action.payload.data;

        if (!updatedOrder) {
          return;
        }

        const index = state.items.findIndex(
          (order) => order.id === updatedOrder.id,
        );

        if (index !== -1) {
          state.items[index] = updatedOrder;
        }

        if (state.selectedOrder?.id === updatedOrder.id) {
          state.selectedOrder = updatedOrder;
        }
      })

      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Gagal memperbarui status order.";
      });

    /* =====================================================
       DELETE ORDER
    ===================================================== */

    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;

        state.error = null;

        state.successMessage = null;
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;

        const deletedId = action.payload;

        state.items = state.items.filter((order) => order.id !== deletedId);

        if (state.selectedOrder?.id === deletedId) {
          state.selectedOrder = null;
        }

        state.pagination.total = Math.max(state.pagination.total - 1, 0);

        state.successMessage = "Order berhasil dihapus.";
      })

      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Gagal menghapus order.";
      });
  },
});

/* =========================================================
   ACTIONS
========================================================= */

export const {
  clearOrderError,
  clearOrderSuccess,
  clearSelectedOrder,
  setSelectedOrder,
  resetOrders,
} = ordersSlice.actions;

/* =========================================================
   SELECTORS
========================================================= */

export const selectOrders = (state: { orders: OrdersState }) =>
  state.orders.items;

export const selectSelectedOrder = (state: { orders: OrdersState }) =>
  state.orders.selectedOrder;

export const selectOrdersPagination = (state: { orders: OrdersState }) =>
  state.orders.pagination;

export const selectOrdersLoading = (state: { orders: OrdersState }) =>
  state.orders.loading;

export const selectOrdersError = (state: { orders: OrdersState }) =>
  state.orders.error;

export const selectOrdersSuccessMessage = (state: { orders: OrdersState }) =>
  state.orders.successMessage;

/* =========================================================
   EXPORT
========================================================= */

export default ordersSlice.reducer;
