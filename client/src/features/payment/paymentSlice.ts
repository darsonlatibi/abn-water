import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import api from "../../api/axios";

// =====================================================
// TYPES
// =====================================================

export interface CreatePaymentPayload {
  /**
   * Primary key dari tabel orders.
   *
   * BUKAN order_number.
   */
  orderId: number | string;
}

export interface PaymentResult {
  success?: boolean;

  /**
   * Primary key dari tabel orders.
   */
  orderId: number;

  /**
   * Nomor order untuk display/logging.
   */
  orderNumber?: string;

  /**
   * Primary key dari tabel payments.
   */
  paymentId?: number;

  /**
   * Midtrans Snap Token.
   */
  snapToken: string;

  /**
   * URL redirect jika tersedia.
   */
  redirectUrl?: string | null;

  /**
   * Nominal transaksi dari backend.
   */
  grossAmount?: number;

  /**
   * True jika payment/token sebelumnya digunakan kembali.
   */
  reused?: boolean;

  /**
   * Transaction ID dari Midtrans jika tersedia.
   */
  transactionId?: string | null;
}

interface PaymentErrorResponse {
  success?: boolean;
  message?: string;
}

interface PaymentState {
  loading: boolean;
  error: string | null;
  payment: PaymentResult | null;
}

// =====================================================
// INITIAL STATE
// =====================================================

const initialState: PaymentState = {
  loading: false,
  error: null,
  payment: null,
};

// =====================================================
// ERROR HELPER
// =====================================================

const getPaymentErrorMessage = (error: unknown, fallback: string): string => {
  // ===================================================
  // OBJECT ERROR
  // ===================================================

  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosLikeError = error as {
      response?: {
        data?: PaymentErrorResponse;
      };
      message?: string;
    };

    return (
      axiosLikeError.response?.data?.message ||
      axiosLikeError.message ||
      fallback
    );
  }

  // ===================================================
  // STANDARD ERROR
  // ===================================================

  if (error instanceof Error) {
    return error.message;
  }

  // ===================================================
  // FALLBACK
  // ===================================================

  return fallback;
};

// =====================================================
// CREATE MIDTRANS PAYMENT
//
// POST /api/payments/create
//
// REQUEST:
//
// {
//   orderId: 123
// }
//
// IMPORTANT:
//
// amount TIDAK dikirim dari frontend.
//
// Backend mengambil nominal langsung dari:
//
// orders.grand_total
//
// sehingga frontend tidak dapat memanipulasi
// nominal transaksi.
// =====================================================

export const createPayment = createAsyncThunk<
  PaymentResult,
  CreatePaymentPayload,
  { rejectValue: string }
>(
  "payment/createPayment",

  async ({ orderId }, { rejectWithValue }) => {
    try {
      // =================================================
      // VALIDATION
      // =================================================

      if (
        orderId === undefined ||
        orderId === null ||
        String(orderId).trim() === ""
      ) {
        return rejectWithValue("Order ID tidak valid.");
      }

      console.log("====================================");

      console.log("CREATE PAYMENT");

      console.log("ORDER ID:", orderId);

      console.log("====================================");

      // =================================================
      // API REQUEST
      //
      // HANYA ORDER ID
      // =================================================

      const response = await api.post<PaymentResult>("/payments/create", {
        orderId,
      });

      console.log("CREATE PAYMENT RESPONSE:", response.data);

      // =================================================
      // VALIDATE RESPONSE
      // =================================================

      if (!response.data) {
        return rejectWithValue("Response payment tidak diterima dari server.");
      }

      if (!response.data.snapToken) {
        return rejectWithValue("Snap token tidak diterima dari server.");
      }

      // =================================================
      // SUCCESS
      // =================================================

      return response.data;
    } catch (error: unknown) {
      console.error("CREATE PAYMENT ERROR:", error);

      return rejectWithValue(
        getPaymentErrorMessage(error, "Gagal membuat transaksi pembayaran."),
      );
    }
  },
);

// =====================================================
// SLICE
// =====================================================

const paymentSlice = createSlice({
  name: "payment",

  initialState,

  reducers: {
    // =================================================
    // CLEAR PAYMENT
    // =================================================

    clearPayment(state) {
      state.payment = null;
      state.error = null;
    },

    // =================================================
    // CLEAR ERROR
    // =================================================

    clearPaymentError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // =================================================
    // PENDING
    // =================================================

    builder.addCase(createPayment.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.payment = null;
    });

    // =================================================
    // SUCCESS
    // =================================================

    builder.addCase(
      createPayment.fulfilled,
      (state, action: PayloadAction<PaymentResult>) => {
        state.loading = false;
        state.payment = action.payload;
        state.error = null;
      },
    );

    // =================================================
    // ERROR
    // =================================================

    builder.addCase(createPayment.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload || action.error.message || "Payment gagal.";

      state.payment = null;
    });
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const { clearPayment, clearPaymentError } = paymentSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default paymentSlice.reducer;
