/* =========================================================
   ABN WATER
   WATER QUALITY SLICE
   ========================================================= */

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/* =========================================================
   TYPES
   ========================================================= */

export type WaterQualityStatus = "NORMAL" | "WARNING" | "CRITICAL" | "OFFLINE";

/* =========================================================
   WATER QUALITY DATA
   ========================================================= */

export interface WaterQualityData {
  siteId: number | null;

  siteName: string | null;

  deviceId: string | null;

  measuredAt: string | null;

  ph: number | null;

  turbidity: number | null;

  freeChlorine: number | null;

  tds: number | null;

  conductivity: number | null;

  orp: number | null;

  temperature: number | null;

  pressure: number | null;

  status: WaterQualityStatus;

  updatedAt: string;
}

/* =========================================================
   HISTORY
   ========================================================= */

export interface WaterQualityHistory {
  id?: number;

  siteId?: number | null;

  siteName?: string | null;

  deviceId?: string | null;

  timestamp: string;

  ph: number | null;

  turbidity: number | null;

  freeChlorine: number | null;

  tds: number | null;

  conductivity: number | null;

  orp: number | null;

  temperature: number | null;

  pressure: number | null;

  status?: WaterQualityStatus;
}

/* =========================================================
   SENSOR STATUS
   ========================================================= */

export interface WaterQualitySensorStatus {
  ph: boolean;

  turbidity: boolean;

  freeChlorine: boolean;

  tds: boolean;

  conductivity: boolean;

  orp: boolean;

  temperature: boolean;

  pressure: boolean;
}

/* =========================================================
   STATE
   ========================================================= */

export interface WaterQualityState {
  data: WaterQualityData;

  history: WaterQualityHistory[];

  selectedSite: string;

  deviceId: string | null;

  overallStatus: WaterQualityStatus;

  sensors: WaterQualitySensorStatus;

  loading: boolean;

  connected: boolean;

  error: string | null;

  lastUpdated: string | null;
}

/* =========================================================
   DEFAULT DATA
   ========================================================= */

const defaultWaterQuality: WaterQualityData = {
  siteId: null,

  siteName: null,

  deviceId: null,

  measuredAt: null,

  ph: null,

  turbidity: null,

  freeChlorine: null,

  tds: null,

  conductivity: null,

  orp: null,

  temperature: null,

  pressure: null,

  status: "OFFLINE",

  updatedAt: new Date(0).toISOString(),
};

/* =========================================================
   INITIAL STATE
   ========================================================= */

const initialState: WaterQualityState = {
  data: defaultWaterQuality,

  history: [],

  selectedSite: "PDAM Surabaya",

  deviceId: null,

  overallStatus: "OFFLINE",

  sensors: {
    ph: false,

    turbidity: false,

    freeChlorine: false,

    tds: false,

    conductivity: false,

    orp: false,

    temperature: false,

    pressure: false,
  },

  loading: false,

  connected: false,

  error: null,

  lastUpdated: null,
};

/* =========================================================
   SLICE
   ========================================================= */

const waterQualitySlice = createSlice({
  name: "waterQuality",

  initialState,

  reducers: {
    /* =====================================================
       SET ALL DATA
       ===================================================== */

    setWaterQuality: (
      state,
      action: PayloadAction<Partial<WaterQualityData>>,
    ) => {
      state.data = {
        ...state.data,

        ...action.payload,

        updatedAt:
          action.payload.updatedAt ??
          state.data.updatedAt ??
          new Date().toISOString(),
      };

      state.lastUpdated = state.data.updatedAt;

      /* -----------------------------------------------
         Update site
         ----------------------------------------------- */

      if (action.payload.siteName) {
        state.selectedSite = action.payload.siteName;
      }

      /* -----------------------------------------------
         Update device
         ----------------------------------------------- */

      if (action.payload.deviceId) {
        state.deviceId = action.payload.deviceId;
      }

      /* -----------------------------------------------
         Update overall status
         ----------------------------------------------- */

      if (action.payload.status) {
        state.overallStatus = action.payload.status;
      }
    },

    /* =====================================================
       SINGLE PARAMETER
       ===================================================== */

    setWaterQualityParameter: (
      state,
      action: PayloadAction<{
        key:
          | "ph"
          | "turbidity"
          | "freeChlorine"
          | "tds"
          | "conductivity"
          | "orp"
          | "temperature"
          | "pressure";

        value: number | null;
      }>,
    ) => {
      const { key, value } = action.payload;

      state.data[key] = value;

      state.data.updatedAt = new Date().toISOString();

      state.lastUpdated = state.data.updatedAt;
    },

    /* =====================================================
       ADD HISTORY
       ===================================================== */

    addWaterQualityHistory: (
      state,
      action: PayloadAction<WaterQualityHistory>,
    ) => {
      state.history.unshift(action.payload);

      if (state.history.length > 1000) {
        state.history.pop();
      }
    },

    /* =====================================================
       SET HISTORY
       ===================================================== */

    setWaterQualityHistory: (
      state,
      action: PayloadAction<WaterQualityHistory[]>,
    ) => {
      state.history = action.payload;
    },

    /* =====================================================
       CLEAR HISTORY
       ===================================================== */

    clearWaterQualityHistory: (state) => {
      state.history = [];
    },

    /* =====================================================
       SITE
       ===================================================== */

    setSelectedWaterQualitySite: (state, action: PayloadAction<string>) => {
      state.selectedSite = action.payload;

      state.data.siteName = action.payload;
    },

    /* =====================================================
       DEVICE
       ===================================================== */

    setWaterQualityDevice: (state, action: PayloadAction<string | null>) => {
      state.deviceId = action.payload;

      state.data.deviceId = action.payload;
    },

    /* =====================================================
       STATUS
       ===================================================== */

    setWaterQualityStatus: (
      state,
      action: PayloadAction<WaterQualityStatus>,
    ) => {
      state.overallStatus = action.payload;

      state.data.status = action.payload;
    },

    /* =====================================================
       SENSOR STATUS
       ===================================================== */

    setSensorStatus: (
      state,
      action: PayloadAction<{
        sensor: keyof WaterQualitySensorStatus;

        online: boolean;
      }>,
    ) => {
      const { sensor, online } = action.payload;

      state.sensors[sensor] = online;
    },

    /* =====================================================
       ALL SENSOR STATUS
       ===================================================== */

    setAllSensorStatus: (
      state,
      action: PayloadAction<WaterQualitySensorStatus>,
    ) => {
      state.sensors = action.payload;
    },

    /* =====================================================
       CONNECTION
       ===================================================== */

    setWaterQualityConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;

      if (!action.payload) {
        state.overallStatus = "OFFLINE";

        state.data.status = "OFFLINE";

        /*
         * Jangan menghapus data terakhir.
         * Data terakhir tetap ditampilkan,
         * tetapi status koneksi menjadi OFFLINE.
         */
      }
    },

    /* =====================================================
       LOADING
       ===================================================== */

    setWaterQualityLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    /* =====================================================
       ERROR
       ===================================================== */

    setWaterQualityError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    /* =====================================================
       CLEAR ERROR
       ===================================================== */

    clearWaterQualityError: (state) => {
      state.error = null;
    },

    /* =====================================================
       RESET
       ===================================================== */

    resetWaterQualityState: () => {
      return {
        ...initialState,

        data: {
          ...defaultWaterQuality,

          updatedAt: new Date(0).toISOString(),
        },

        history: [],
      };
    },
  },
});

/* =========================================================
   ACTIONS
   ========================================================= */

export const {
  setWaterQuality,
  setWaterQualityParameter,
  addWaterQualityHistory,
  setWaterQualityHistory,
  clearWaterQualityHistory,
  setSelectedWaterQualitySite,
  setWaterQualityDevice,
  setWaterQualityStatus,
  setSensorStatus,
  setAllSensorStatus,
  setWaterQualityConnected,
  setWaterQualityLoading,
  setWaterQualityError,
  clearWaterQualityError,
  resetWaterQualityState,
} = waterQualitySlice.actions;

/* =========================================================
   SELECTORS
   ========================================================= */

export const selectWaterQuality = (state: {
  waterQuality: WaterQualityState;
}) => state.waterQuality;

export const selectWaterQualityData = (state: {
  waterQuality: WaterQualityState;
}) => state.waterQuality.data;

export const selectWaterQualityHistory = (state: {
  waterQuality: WaterQualityState;
}) => state.waterQuality.history;

export const selectWaterQualitySite = (state: {
  waterQuality: WaterQualityState;
}) => state.waterQuality.selectedSite;

export const selectWaterQualityDevice = (state: {
  waterQuality: WaterQualityState;
}) => state.waterQuality.deviceId;

export const selectWaterQualityStatus = (state: {
  waterQuality: WaterQualityState;
}) => state.waterQuality.overallStatus;

export const selectWaterQualitySensors = (state: {
  waterQuality: WaterQualityState;
}) => state.waterQuality.sensors;

export const selectWaterQualityConnected = (state: {
  waterQuality: WaterQualityState;
}) => state.waterQuality.connected;

export const selectWaterQualityLoading = (state: {
  waterQuality: WaterQualityState;
}) => state.waterQuality.loading;

export const selectWaterQualityError = (state: {
  waterQuality: WaterQualityState;
}) => state.waterQuality.error;

export const selectWaterQualityLastUpdated = (state: {
  waterQuality: WaterQualityState;
}) => state.waterQuality.lastUpdated;

/* =========================================================
   EXPORT
   ========================================================= */

export default waterQualitySlice.reducer;
