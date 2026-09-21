import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as propertyApi from "../../services/propertyApi";
import pgData from "../../data/pgData";

// Normalize fallback data to ensure _id and id are present
const defaultProperties = pgData.map((item) => ({
  ...item,
  _id: item.id,
  isVerified: true,
  isAvailable: true,
}));

// Async thunk to fetch all properties (with optional filter/search query params)
export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await propertyApi.getAllProperties(params);
      return response.data;
    } catch (error) {
      // Return filtered local fallback data if backend is offline/unreachable on Vercel
      let fallbackList = [...defaultProperties];
      if (params.search || params.city) {
        const query = (params.search || params.city).toLowerCase().trim();
        fallbackList = fallbackList.filter(
          (p) =>
            (p.location || "").toLowerCase().includes(query) ||
            (p.name || "").toLowerCase().includes(query)
        );
      }
      if (params.type && params.type !== "All") {
        fallbackList = fallbackList.filter(
          (p) => (p.type || "").toLowerCase() === params.type.toLowerCase()
        );
      }
      if (params.maxPrice && params.maxPrice < 40000) {
        fallbackList = fallbackList.filter((p) => p.price <= params.maxPrice);
      }
      if (params.amenities) {
        const reqAmenities = params.amenities.split(",");
        fallbackList = fallbackList.filter((p) =>
          reqAmenities.every((a) => (p.amenities || []).includes(a))
        );
      }
      if (params.sort === "price_low_high") {
        fallbackList.sort((a, b) => a.price - b.price);
      } else if (params.sort === "price_high_low") {
        fallbackList.sort((a, b) => b.price - a.price);
      } else if (params.sort === "rating") {
        fallbackList.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }

      return {
        success: true,
        isFallback: true,
        data: fallbackList,
        total: fallbackList.length,
      };
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
      return {
        success: true,
        isFallback: true,
        data: defaultProperties.slice(0, 9),
      };
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
      const found = defaultProperties.find(
        (p) => (p._id || p.id).toString() === id.toString()
      );
      if (found) {
        return {
          success: true,
          data: found,
          similar: defaultProperties.filter(
            (p) =>
              (p._id || p.id).toString() !== id.toString() &&
              p.location?.includes(found.location?.split(",")[1]?.trim() || "")
          ).slice(0, 3),
        };
      }
      return rejectWithValue("Property not found");
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
  properties: defaultProperties,
  featuredProperties: defaultProperties.slice(0, 9),
  selectedProperty: null,
  similarProperties: [],
  total: defaultProperties.length,
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
        if (action.payload && Array.isArray(action.payload.data)) {
          state.properties = action.payload.data;
          state.total = action.payload.total || action.payload.data.length;
          state.page = action.payload.page || 1;
          state.totalPages = action.payload.totalPages || 1;
        } else if (Array.isArray(action.payload)) {
          state.properties = action.payload;
          state.total = action.payload.length;
        } else {
          state.properties = action.payload?.data || defaultProperties;
        }
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (state.properties.length === 0) {
          state.properties = defaultProperties;
        }
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
