import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import api from "../../api/axios";
import type { RootState } from "../../stores/store";
/* =========================================================
   TYPES
   ========================================================= */

export type ProductStatus = "ACTIVE" | "INACTIVE";

/* =========================================================
   PRODUCT
   ========================================================= */

export interface Product {
  id: number;

  product_code: string;
  product_name: string;

  category: string;
  description: string | null;

  unit: string;
  volume_liter: number;

  price: number;
  cost_price: number;

  stock: number;
  min_stock: number;

  status: ProductStatus;

  image_url: string | null;

  createdAt?: string;
  updatedAt?: string;
}

/* =========================================================
   PAGINATION
   ========================================================= */

export interface ProductPagination {
  page: number;
  limit: number;

  total: number;
  totalPages: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/* =========================================================
   API RESPONSE
   ========================================================= */

export interface ProductListResponse {
  success: boolean;
  message: string;

  data: Product[];

  pagination: ProductPagination;
}

export interface ProductResponse {
  success: boolean;
  message: string;

  data: Product;
}

export interface LowStockResponse {
  success: boolean;
  message: string;

  data: Product[];
  count: number;
}

/* =========================================================
   QUERY
   ========================================================= */

export interface ProductQuery {
  page?: number;
  limit?: number;

  search?: string;
  category?: string;

  status?: ProductStatus | "";
}

/* =========================================================
   CREATE PAYLOAD
   ========================================================= */

export interface CreateProductPayload {
  product_code: string;
  product_name: string;

  category?: string;
  description?: string | null;

  unit?: string;
  volume_liter?: number;

  price?: number;
  cost_price?: number;

  stock?: number;
  min_stock?: number;

  status?: ProductStatus;

  image_url?: string | null;
}

/* =========================================================
   UPDATE PAYLOAD
   ========================================================= */

export interface UpdateProductPayload {
  id: number;

  product_code?: string;
  product_name?: string;

  category?: string;
  description?: string | null;

  unit?: string;
  volume_liter?: number;

  price?: number;
  cost_price?: number;

  stock?: number;
  min_stock?: number;

  status?: ProductStatus;

  image_url?: string | null;
}

/* =========================================================
   STATE
   ========================================================= */

interface ProductsState {
  products: Product[];

  selectedProduct: Product | null;

  lowStockProducts: Product[];

  pagination: ProductPagination;

  loading: boolean;
  detailLoading: boolean;
  lowStockLoading: boolean;

  error: string | null;
  detailError: string | null;
  lowStockError: string | null;
}

/* =========================================================
   INITIAL STATE
   ========================================================= */

const initialState: ProductsState = {
  products: [],

  selectedProduct: null,

  lowStockProducts: [],

  pagination: {
    page: 1,
    limit: 20,

    total: 0,
    totalPages: 0,

    hasNextPage: false,
    hasPreviousPage: false,
  },

  loading: false,
  detailLoading: false,
  lowStockLoading: false,

  error: null,
  detailError: null,
  lowStockError: null,
};

/* =========================================================
   GET PRODUCTS
   GET /api/products
   ========================================================= */

export const fetchProducts = createAsyncThunk<
  ProductListResponse,
  ProductQuery | undefined,
  { rejectValue: string }
>("products/fetchProducts", async (params, thunkAPI) => {
  try {
    const response = await api.get<ProductListResponse>("/products", {
      params: {
        page: params?.page ?? 1,

        limit: params?.limit ?? 20,

        ...(params?.search
          ? {
              search: params.search,
            }
          : {}),

        ...(params?.category
          ? {
              category: params.category,
            }
          : {}),

        ...(params?.status
          ? {
              status: params.status,
            }
          : {}),
      },
    });

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to retrieve products",
    );
  }
});

/* =========================================================
   GET PRODUCT BY ID
   GET /api/products/:id
   ========================================================= */

export const fetchProductById = createAsyncThunk<
  ProductResponse,
  number,
  { rejectValue: string }
>("products/fetchProductById", async (id, thunkAPI) => {
  try {
    const response = await api.get<ProductResponse>(`/products/${id}`);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to retrieve product",
    );
  }
});

/* =========================================================
   CREATE PRODUCT
   POST /api/products
   ========================================================= */

export const createProduct = createAsyncThunk<
  ProductResponse,
  CreateProductPayload,
  { rejectValue: string }
>("products/createProduct", async (payload, thunkAPI) => {
  try {
    const response = await api.post<ProductResponse>("/products", payload);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to create product",
    );
  }
});

/* =========================================================
   UPDATE PRODUCT
   PUT /api/products/:id
   ========================================================= */

export const updateProduct = createAsyncThunk<
  ProductResponse,
  UpdateProductPayload,
  { rejectValue: string }
>("products/updateProduct", async ({ id, ...payload }, thunkAPI) => {
  try {
    const response = await api.put<ProductResponse>(`/products/${id}`, payload);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to update product",
    );
  }
});

/* =========================================================
   DELETE PRODUCT
   DELETE /api/products/:id
   Soft delete -> INACTIVE
   ========================================================= */

export const deleteProduct = createAsyncThunk<
  ProductResponse,
  number,
  { rejectValue: string }
>("products/deleteProduct", async (id, thunkAPI) => {
  try {
    const response = await api.delete<ProductResponse>(`/products/${id}`);

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to deactivate product",
    );
  }
});

/* =========================================================
   UPDATE PRODUCT STATUS
   PATCH /api/products/:id/status
   ========================================================= */

export const updateProductStatus = createAsyncThunk<
  ProductResponse,
  {
    id: number;
    status: ProductStatus;
  },
  { rejectValue: string }
>("products/updateProductStatus", async ({ id, status }, thunkAPI) => {
  try {
    const response = await api.patch<ProductResponse>(
      `/products/${id}/status`,
      {
        status,
      },
    );

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to update product status",
    );
  }
});

/* =========================================================
   GET LOW STOCK PRODUCTS
   GET /api/products/low-stock
   ========================================================= */

export const fetchLowStockProducts = createAsyncThunk<
  LowStockResponse,
  void,
  { rejectValue: string }
>("products/fetchLowStockProducts", async (_, thunkAPI) => {
  try {
    const response = await api.get<LowStockResponse>("/products/low-stock");

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to retrieve low stock products",
    );
  }
});

/* =========================================================
   SLICE
   ========================================================= */

const productsSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    /* =====================================================
       CLEAR ERROR
       ===================================================== */

    clearProductError: (state) => {
      state.error = null;
    },

    clearProductDetailError: (state) => {
      state.detailError = null;
    },

    clearLowStockError: (state) => {
      state.lowStockError = null;
    },

    /* =====================================================
       SELECTED PRODUCT
       ===================================================== */

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.detailError = null;
    },

    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },

    /* =====================================================
       CLEAR PRODUCTS
       ===================================================== */

    clearProducts: (state) => {
      state.products = [];

      state.pagination = {
        ...initialState.pagination,
      };
    },
  },

  /* =======================================================
     EXTRA REDUCERS
     ======================================================= */

  extraReducers: (builder) => {
    /* =====================================================
       FETCH PRODUCTS
       ===================================================== */

    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload.data;

        state.pagination = action.payload.pagination;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to retrieve products";
      });

    /* =====================================================
       FETCH PRODUCT BY ID
       ===================================================== */

    builder
      .addCase(fetchProductById.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailLoading = false;

        state.selectedProduct = action.payload.data;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailLoading = false;

        state.detailError = action.payload || "Failed to retrieve product";
      });

    /* =====================================================
       CREATE PRODUCT
       ===================================================== */

    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.products.unshift(action.payload.data);

        state.pagination.total += 1;

        state.pagination.totalPages = Math.ceil(
          state.pagination.total / state.pagination.limit,
        );
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to create product";
      });

    /* =====================================================
       UPDATE PRODUCT
       ===================================================== */

    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        const updatedProduct = action.payload.data;

        const index = state.products.findIndex(
          (product) => product.id === updatedProduct.id,
        );

        if (index !== -1) {
          state.products[index] = updatedProduct;
        }

        if (
          state.selectedProduct &&
          state.selectedProduct.id === updatedProduct.id
        ) {
          state.selectedProduct = updatedProduct;
        }
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to update product";
      });

    /* =====================================================
       DELETE PRODUCT
       ===================================================== */

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        const updatedProduct = action.payload.data;

        const index = state.products.findIndex(
          (product) => product.id === updatedProduct.id,
        );

        if (index !== -1) {
          state.products[index] = updatedProduct;
        }

        if (
          state.selectedProduct &&
          state.selectedProduct.id === updatedProduct.id
        ) {
          state.selectedProduct = updatedProduct;
        }
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to deactivate product";
      });

    /* =====================================================
       UPDATE PRODUCT STATUS
       ===================================================== */

    builder
      .addCase(updateProductStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProductStatus.fulfilled, (state, action) => {
        state.loading = false;

        const updatedProduct = action.payload.data;

        const index = state.products.findIndex(
          (product) => product.id === updatedProduct.id,
        );

        if (index !== -1) {
          state.products[index] = updatedProduct;
        }

        if (
          state.selectedProduct &&
          state.selectedProduct.id === updatedProduct.id
        ) {
          state.selectedProduct = updatedProduct;
        }
      })

      .addCase(updateProductStatus.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to update product status";
      });

    /* =====================================================
       LOW STOCK
       ===================================================== */

    builder
      .addCase(fetchLowStockProducts.pending, (state) => {
        state.lowStockLoading = true;
        state.lowStockError = null;
      })

      .addCase(fetchLowStockProducts.fulfilled, (state, action) => {
        state.lowStockLoading = false;

        state.lowStockProducts = action.payload.data;
      })

      .addCase(fetchLowStockProducts.rejected, (state, action) => {
        state.lowStockLoading = false;

        state.lowStockError =
          action.payload || "Failed to retrieve low stock products";
      });
  },
});

/* =========================================================
   ACTIONS
   ========================================================= */

export const {
  clearProductError,
  clearProductDetailError,
  clearLowStockError,
  clearSelectedProduct,
  setSelectedProduct,
  clearProducts,
} = productsSlice.actions;

/* =========================================================
   SELECTORS
   ========================================================= */

export const selectProducts = (state: RootState) => state.products.products;

export const selectSelectedProduct = (state: RootState) =>
  state.products.selectedProduct;

export const selectLowStockProducts = (state: RootState) =>
  state.products.lowStockProducts;

export const selectProductsPagination = (state: RootState) =>
  state.products.pagination;

export const selectProductsLoading = (state: RootState) =>
  state.products.loading;

export const selectProductDetailLoading = (state: RootState) =>
  state.products.detailLoading;

export const selectLowStockLoading = (state: RootState) =>
  state.products.lowStockLoading;

export const selectProductsError = (state: RootState) => state.products.error;

export const selectProductDetailError = (state: RootState) =>
  state.products.detailError;

export const selectLowStockError = (state: RootState) =>
  state.products.lowStockError;

/* =========================================================
   REDUCER
   ========================================================= */

export default productsSlice.reducer;
