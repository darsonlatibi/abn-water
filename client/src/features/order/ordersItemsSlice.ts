/* =========================================================
   ABN WATER / E-COMMERCE
   ORDER ITEMS SLICE
   ========================================================= */

import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import api from "../../api/axios";

/* =========================================================
   TYPES
========================================================= */

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_code: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  discount: number;
  subtotal: number;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface OrderItemOrder {
  id: number;
  order_number?: string;
  status?: string;
  subtotal?: number;
  discount?: number;
  tax?: number;
  shipping_cost?: number;
  grand_total?: number;
  [key: string]: unknown;
}

export interface OrderItemsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface OrderItemsResponse {
  success: boolean;
  data: OrderItem[];
  pagination?: OrderItemsPagination;
  message?: string;
}

export interface OrderItemsByOrderResponse {
  success: boolean;
  data: OrderItem[];
  meta?: {
    order_id: number;
    order_number?: string;
    item_count: number;
  };
  message?: string;
}

export interface OrderItemResponse {
  success: boolean;
  data: OrderItem;
  order?: OrderItemOrder | null;
  message?: string;
}

export interface OrderItemMutationResponse {
  success: boolean;
  message?: string;
  data?: OrderItem;
  order?: OrderItemOrder | null;
}

export interface DeleteOrderItemResponse {
  success: boolean;
  message?: string;
  order?: OrderItemOrder | null;
}

/* =========================================================
   PAYLOAD TYPES
========================================================= */

export interface GetOrderItemsParams {
  page?: number;
  limit?: number;
  order_id?: number | string;
  product_id?: number | string;
  search?: string;
}

export interface CreateOrderItemPayload {
  order_id: number | string;
  product_id: number | string;
  product_code: string;
  product_name: string;
  quantity?: number;
  unit_price: number;
  discount?: number;
}

export interface UpdateOrderItemPayload {
  product_id?: number | string;
  product_code?: string;
  product_name?: string;
  quantity?: number;
  unit_price?: number;
  discount?: number;
}

export interface UpdateOrderItemRequest {
  id: number | string;
  data: UpdateOrderItemPayload;
}

/* =========================================================
   API ERROR
========================================================= */

interface ApiErrorResponse {
  message?: string;
}

const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = (
      error as {
        response?: {
          data?: ApiErrorResponse;
        };
      }
    ).response;

    return response?.data?.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

/* =========================================================
   STATE
========================================================= */

interface OrdersItemsState {
  items: OrderItem[];
  selectedItem: OrderItem | null;
  selectedOrderId: number | null;
  pagination: OrderItemsPagination;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

/* =========================================================
   INITIAL STATE
========================================================= */

const initialState: OrdersItemsState = {
  items: [],
  selectedItem: null,
  selectedOrderId: null,

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
   GET ALL ORDER ITEMS
   GET /api/orderItems
========================================================= */

export const fetchOrderItems = createAsyncThunk<
  OrderItemsResponse,
  GetOrderItemsParams | undefined,
  { rejectValue: string }
>("ordersItems/fetchOrderItems", async (params = {}, { rejectWithValue }) => {
  try {
    const response = await api.get<OrderItemsResponse>("/orderItems", {
      params,
    });

    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      getApiErrorMessage(error, "Gagal mengambil order items."),
    );
  }
});

/* =========================================================
   GET ITEMS BY ORDER
   GET /api/orderItems/order/:orderId
========================================================= */

export const fetchOrderItemsByOrder = createAsyncThunk<
  OrderItemsByOrderResponse,
  number | string,
  { rejectValue: string }
>(
  "ordersItems/fetchOrderItemsByOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get<OrderItemsByOrderResponse>(
        `/orderItems/order/${orderId}`,
      );

      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        getApiErrorMessage(error, "Gagal mengambil item berdasarkan order."),
      );
    }
  },
);

/* =========================================================
   GET ORDER ITEM BY ID
   GET /api/orderItems/:id
========================================================= */

export const fetchOrderItemById = createAsyncThunk<
  OrderItemResponse,
  number | string,
  { rejectValue: string }
>("ordersItems/fetchOrderItemById", async (id, { rejectWithValue }) => {
  try {
    const response = await api.get<OrderItemResponse>(`/orderItems/${id}`);

    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      getApiErrorMessage(error, "Gagal mengambil order item."),
    );
  }
});

/* =========================================================
   CREATE ORDER ITEM
   POST /api/orderItems
========================================================= */

export const createOrderItem = createAsyncThunk<
  OrderItemMutationResponse,
  CreateOrderItemPayload,
  { rejectValue: string }
>("ordersItems/createOrderItem", async (payload, { rejectWithValue }) => {
  try {
    const response = await api.post<OrderItemMutationResponse>(
      "/orderItems",
      payload,
    );

    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      getApiErrorMessage(error, "Gagal membuat order item."),
    );
  }
});

/* =========================================================
   UPDATE ORDER ITEM
   PUT /api/orderItems/:id
========================================================= */

export const updateOrderItem = createAsyncThunk<
  OrderItemMutationResponse,
  UpdateOrderItemRequest,
  { rejectValue: string }
>("ordersItems/updateOrderItem", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await api.put<OrderItemMutationResponse>(
      `/orderItems/${id}`,
      data,
    );

    return response.data;
  } catch (error: unknown) {
    return rejectWithValue(
      getApiErrorMessage(error, "Gagal memperbarui order item."),
    );
  }
});

/* =========================================================
   DELETE ORDER ITEM
   DELETE /api/orderItems/:id
========================================================= */

export const deleteOrderItem = createAsyncThunk<
  {
    id: number;
    response: DeleteOrderItemResponse;
  },
  number | string,
  { rejectValue: string }
>("ordersItems/deleteOrderItem", async (id, { rejectWithValue }) => {
  try {
    const response = await api.delete<DeleteOrderItemResponse>(
      `/orderItems/${id}`,
    );

    return {
      id: Number(id),
      response: response.data,
    };
  } catch (error: unknown) {
    return rejectWithValue(
      getApiErrorMessage(error, "Gagal menghapus order item."),
    );
  }
});

/* =========================================================
   SLICE
========================================================= */

const ordersItemsSlice = createSlice({
  name: "ordersItems",
  initialState,

  reducers: {
    clearOrdersItemsError: (state) => {
      state.error = null;
    },

    clearOrdersItemsSuccess: (state) => {
      state.successMessage = null;
    },

    clearSelectedOrderItem: (state) => {
      state.selectedItem = null;
    },

    setSelectedOrderItem: (state, action: PayloadAction<OrderItem | null>) => {
      state.selectedItem = action.payload;
    },

    setSelectedOrderId: (state, action: PayloadAction<number | null>) => {
      state.selectedOrderId = action.payload;
    },

    resetOrdersItems: (state) => {
      state.items = [];
      state.selectedItem = null;
      state.selectedOrderId = null;

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
       FETCH ALL
    ===================================================== */

    builder
      .addCase(fetchOrderItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrderItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];

        state.pagination = action.payload.pagination || {
          page: 1,
          limit: 50,
          total: action.payload.data?.length || 0,
          totalPages: action.payload.data?.length ? 1 : 0,
        };
      })

      .addCase(fetchOrderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil order items.";
      });

    /* =====================================================
       FETCH BY ORDER
    ===================================================== */

    builder
      .addCase(fetchOrderItemsByOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrderItemsByOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || [];

        state.selectedOrderId = action.payload.meta?.order_id ?? null;

        const itemCount = action.payload.data?.length || 0;

        state.pagination = {
          page: 1,
          limit: itemCount || 50,
          total: itemCount,
          totalPages: itemCount ? 1 : 0,
        };
      })

      .addCase(fetchOrderItemsByOrder.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Gagal mengambil item berdasarkan order.";
      });

    /* =====================================================
       FETCH BY ID
    ===================================================== */

    builder
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload.data || null;
      })

      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal mengambil order item.";
      });

    /* =====================================================
       CREATE
    ===================================================== */

    builder
      .addCase(createOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(createOrderItem.fulfilled, (state, action) => {
        state.loading = false;

        state.successMessage =
          action.payload.message || "Order item berhasil dibuat.";

        const item = action.payload.data;

        if (!item) {
          return;
        }

        state.items.push(item);
        state.selectedItem = item;
        state.selectedOrderId = item.order_id;

        state.pagination.total += 1;

        state.pagination.totalPages =
          state.pagination.limit > 0
            ? Math.ceil(state.pagination.total / state.pagination.limit)
            : 1;
      })

      .addCase(createOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal membuat order item.";
      });

    /* =====================================================
       UPDATE
    ===================================================== */

    builder
      .addCase(updateOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(updateOrderItem.fulfilled, (state, action) => {
        state.loading = false;

        state.successMessage =
          action.payload.message || "Order item berhasil diperbarui.";

        const updatedItem = action.payload.data;

        if (!updatedItem) {
          return;
        }

        const index = state.items.findIndex(
          (item) => item.id === updatedItem.id,
        );

        if (index !== -1) {
          state.items[index] = updatedItem;
        }

        if (state.selectedItem?.id === updatedItem.id) {
          state.selectedItem = updatedItem;
        }

        state.selectedOrderId = updatedItem.order_id;
      })

      .addCase(updateOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal memperbarui order item.";
      });

    /* =====================================================
       DELETE
    ===================================================== */

    builder
      .addCase(deleteOrderItem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(deleteOrderItem.fulfilled, (state, action) => {
        state.loading = false;

        const deletedId = action.payload.id;

        state.items = state.items.filter((item) => item.id !== deletedId);

        if (state.selectedItem?.id === deletedId) {
          state.selectedItem = null;
        }

        state.pagination.total = Math.max(state.pagination.total - 1, 0);

        state.pagination.totalPages =
          state.pagination.total > 0 && state.pagination.limit > 0
            ? Math.ceil(state.pagination.total / state.pagination.limit)
            : 0;

        state.successMessage =
          action.payload.response.message || "Order item berhasil dihapus.";
      })

      .addCase(deleteOrderItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Gagal menghapus order item.";
      });
  },
});

/* =========================================================
   ACTIONS
========================================================= */

export const {
  clearOrdersItemsError,
  clearOrdersItemsSuccess,
  clearSelectedOrderItem,
  setSelectedOrderItem,
  setSelectedOrderId,
  resetOrdersItems,
} = ordersItemsSlice.actions;

/* =========================================================
   SELECTORS
========================================================= */

export const selectOrdersItems = (state: { ordersItems: OrdersItemsState }) =>
  state.ordersItems.items;

export const selectSelectedOrderItem = (state: {
  ordersItems: OrdersItemsState;
}) => state.ordersItems.selectedItem;

export const selectSelectedOrderId = (state: {
  ordersItems: OrdersItemsState;
}) => state.ordersItems.selectedOrderId;

export const selectOrdersItemsPagination = (state: {
  ordersItems: OrdersItemsState;
}) => state.ordersItems.pagination;

export const selectOrdersItemsLoading = (state: {
  ordersItems: OrdersItemsState;
}) => state.ordersItems.loading;

export const selectOrdersItemsError = (state: {
  ordersItems: OrdersItemsState;
}) => state.ordersItems.error;

export const selectOrdersItemsSuccessMessage = (state: {
  ordersItems: OrdersItemsState;
}) => state.ordersItems.successMessage;

/* =========================================================
   EXPORT
========================================================= */

export default ordersItemsSlice.reducer;
