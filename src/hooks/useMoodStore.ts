import { useSelector, useDispatch } from "react-redux";
import {
  selectMood,
  selectColorPalette,
  selectIsAnalyzing,
  selectMoodError,
  selectImageUrl,
  selectMoodData,
  getColorPalette,
  analyzeMood,
  setImageUrl,
  setColorPalette,
  setMood,
  setIsAnalyzing,
  clearMoodData,
  clearError,
} from "../store/moodSlice";
import type { AppDispatch } from "../store/index";

export function useMoodStore() {
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const mood = useSelector(selectMood);
  const colorPalette = useSelector(selectColorPalette);
  const isAnalyzing = useSelector(selectIsAnalyzing);
  const error = useSelector(selectMoodError);
  const imageUrl = useSelector(selectImageUrl);
  const allMoodData = useSelector(selectMoodData);

  // Action dispatchers
  const actions = {
    setImageUrl: (url: string) => dispatch(setImageUrl(url)),
    setColorPalette: (palette: { color: string; percentage: number }[]) =>
      dispatch(setColorPalette(palette)),
    setMood: (moodData: {
      mood: string;
      confidence?: number;
      description?: string;
    }) => dispatch(setMood(moodData)),
    setIsAnalyzing: (analyzing: boolean) => dispatch(setIsAnalyzing(analyzing)),
    clearMoodData: () => dispatch(clearMoodData()),
    clearError: () => dispatch(clearError()),

    // Async actions
    getColorPalette: (imageUrl: string) => dispatch(getColorPalette(imageUrl)),
    analyzeMood: (colors: { color: string; percentage: number }[]) =>
      dispatch(analyzeMood(colors)),
  };

  return {
    // State
    mood,
    colorPalette,
    isAnalyzing,
    error,
    imageUrl,
    allMoodData,

    // Actions
    ...actions,

    // Convenience methods
    hasMoodData: !!mood,
    hasColorPalette: colorPalette.length > 0,
    isReady: !isAnalyzing && !!mood && colorPalette.length > 0,
  };
}
