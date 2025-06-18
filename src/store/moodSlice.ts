import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { createSelector } from "reselect";

// Define types for the mood state
interface ColorSwatch {
  color: string;
  percentage: number;
}

interface MoodData {
  mood: string;
  confidence?: number;
  description?: string;
}

interface MoodState {
  colorPalette: ColorSwatch[];
  mood: MoodData | null;
  isAnalyzing: boolean;
  error: string | null;
  imageUrl: string | null;
}

// Define the initial state
const initialState: MoodState = {
  colorPalette: [],
  mood: null,
  isAnalyzing: false,
  error: null,
  imageUrl:
    typeof window !== "undefined" ? localStorage.getItem("imageUrl") : null,
};

// Async thunk for getting color palette
export const getColorPalette = createAsyncThunk(
  "mood/getColorPalette",
  async (imageUrl: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/color-palette`,
        {
          method: "POST",
          body: imageUrl,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get color palette");
      }

      const data = await response.json();
      return JSON.parse(data);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Async thunk for mood analysis
export const analyzeMood = createAsyncThunk(
  "mood/analyzeMood",
  async (colors: ColorSwatch[], { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/mood-analysis`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(colors),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to analyze mood");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const moodSlice = createSlice({
  name: "mood",
  initialState,
  reducers: {
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("imageUrl", action.payload);
      }
    },
    setColorPalette: (state, action: PayloadAction<ColorSwatch[]>) => {
      state.colorPalette = action.payload;
    },
    setMood: (state, action: PayloadAction<MoodData>) => {
      state.mood = action.payload;
    },
    setIsAnalyzing: (state, action: PayloadAction<boolean>) => {
      state.isAnalyzing = action.payload;
    },
    clearMoodData: (state) => {
      state.colorPalette = [];
      state.mood = null;
      state.isAnalyzing = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getColorPalette
      .addCase(getColorPalette.pending, (state) => {
        state.isAnalyzing = true;
        state.error = null;
      })
      .addCase(getColorPalette.fulfilled, (state, action) => {
        state.colorPalette = action.payload;
        state.isAnalyzing = false;
      })
      .addCase(getColorPalette.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAnalyzing = false;
      })
      // Handle analyzeMood
      .addCase(analyzeMood.pending, (state) => {
        state.isAnalyzing = true;
        state.error = null;
      })
      .addCase(analyzeMood.fulfilled, (state, action) => {
        state.mood = action.payload;
        state.isAnalyzing = false;
      })
      .addCase(analyzeMood.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isAnalyzing = false;
      });
  },
});

// Action creators
export const {
  setImageUrl,
  setColorPalette,
  setMood,
  setIsAnalyzing,
  clearMoodData,
  clearError,
} = moodSlice.actions;

// Selectors
export const selectColorPalette = (state: RootState) => state.mood.colorPalette;
export const selectMood = (state: RootState) => state.mood.mood;
export const selectIsAnalyzing = (state: RootState) => state.mood.isAnalyzing;
export const selectMoodError = (state: RootState) => state.mood.error;
export const selectImageUrl = (state: RootState) => state.mood.imageUrl;

// Input selectors
const getMoodState = (state: RootState) => state.mood;

// Memoized selector
export const selectMoodData = createSelector([getMoodState], (moodState) => {
  // Your transformation logic here
  // This will only recalculate when moodState changes
  return {
    // Return your transformed data
    mood: moodState.mood,
    // ... other properties
  };
});

export default moodSlice.reducer;
