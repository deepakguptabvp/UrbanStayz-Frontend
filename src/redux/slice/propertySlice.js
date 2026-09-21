import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as propertyApi from "../../services/propertyApi";

// Async thunk to fetch all properties (with optional filter/search query params)
export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await propertyApi.getAllProperties(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch properties"
      );
    }
  }
);

// Async thunk to fetch featured properties
export const fetchFeaturedProperties = createAsyncThunk(
  "properties/fetchFeaturedProperties",
  async (_, { rejectWithValue }) => {
    try {
      const response = await propertyApi.getFeaturedProperties();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch featured properties"
      );
    }
  }
);

// Async thunk to fetch a single property by ID
export const fetchPropertyById = createAsyncThunk(
  "properties/fetchPropertyById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await propertyApi.getPropertyById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch property"
      );
    }
  }
);

// Async thunk to create a new property
export const addProperty = createAsyncThunk(
  "properties/addProperty",
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await propertyApi.createProperty(propertyData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create property"
      );
    }
  }
);

// Async thunk to update a property
export const editProperty = createAsyncThunk(
  "properties/editProperty",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await propertyApi.updateProperty(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update property"
      );
    }
  }
);

// Async thunk to delete a property
export const removeProperty = createAsyncThunk(
  "properties/removeProperty",
  async (id, { rejectWithValue }) => {
    try {
      await propertyApi.deleteProperty(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete property"
      );
    }
  }
);

const initialState = {
  properties: [],
  featuredProperties: [],
  selectedProperty: null,
  similarProperties: [],
  total: 0,
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    clearPropertyError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        // Handle both `{ success: true, data: [...], total, page }` and raw `[...]`
        if (action.payload && Array.isArray(action.payload.data)) {
          state.properties = action.payload.data;
          state.total = action.payload.total || action.payload.data.length;
          state.page = action.payload.page || 1;
          state.totalPages = action.payload.totalPages || 1;
        } else if (Array.isArray(action.payload)) {
          state.properties = action.payload;
          state.total = action.payload.length;
        } else {
          state.properties = action.payload?.data || [];
        }
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Featured
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        if (action.payload && Array.isArray(action.payload.data)) {
          state.featuredProperties = action.payload.data;
        } else if (Array.isArray(action.payload)) {
          state.featuredProperties = action.payload;
        }
      })

      // Fetch by ID
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload?.data || action.payload;
        state.similarProperties = action.payload?.similar || [];
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Property
      .addCase(addProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.loading = false;
        const newProp = action.payload?.data || action.payload;
        if (newProp) {
          state.properties.unshift(newProp);
        }
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Property
      .addCase(editProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload?.data || action.payload;
        if (updated) {
          const index = state.properties.findIndex(
            (p) => (p._id || p.id) === (updated._id || updated.id)
          );
          if (index !== -1) {
            state.properties[index] = updated;
          }
          if (
            state.selectedProperty &&
            (state.selectedProperty._id || state.selectedProperty.id) ===
              (updated._id || updated.id)
          ) {
            state.selectedProperty = updated;
          }
        }
      })
      .addCase(editProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove Property
      .addCase(removeProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter(
          (p) => (p._id || p.id) !== action.payload
        );
      })
      .addCase(removeProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedProperty, clearPropertyError } =
  propertySlice.actions;
export default propertySlice.reducer;
