import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { cookies } from "next/headers";

// Define a type for the slice state

interface ImageUrlState {
  imageDataUrl: string;
}

// Define the initial state using that type
// const initialState: CounterState = {
//   value: 0,
// }

const initialState: ImageUrlState = {
  imageDataUrl:
    typeof window !== "undefined"
      ? (localStorage.getItem("imageUrl") as string)
      : "",
};

// export const counterSlice = createSlice({
//   name: 'counter',
//   // `createSlice` will infer the state type from the `initialState` argument
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1
//     },
//     decrement: (state) => {
//       state.value -= 1
//     },
//     // Use the PayloadAction type to declare the contents of `action.payload`
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload
//     },
//   },
// })

export const colorPaletteAnalysis = createAsyncThunk(
  "imageUrl/colorPaletteAnalysis",
  async (imageDataUrl: string) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    if (!url) throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    const response = await fetch(`${url}/api/color-palette`, {
      method: "POST",
      body: JSON.stringify({ value: imageDataUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }
);

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type

// export default counterSlice.reducer
