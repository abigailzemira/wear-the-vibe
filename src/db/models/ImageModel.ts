import main from "@/src/helpers/ibm-ai";
import streamMood from "@/src/helpers/ibm-ai-mood";

export type ColorPalette = {
  color: string;
  percentage: number;
};
export default class ImageModel {
  static async analyzeImageColor({ imageUrl }: { imageUrl: string }) {
    try {
      console.log("masukkkkk model");
      let colorPalette = await main(imageUrl);
      // console.log(colorPalette, "<<< ini colo palet")
      if (!colorPalette)
        throw { message: "ai failed to generate color palette" };

      return colorPalette;
    } catch (error) {
      console.log(error);
    }
  }

  static async analyzeMood(palette: { palette: ColorPalette[] }) {
    try {
      console.log(palette, "<<<<< palette di mood model");
      let mood = await streamMood(palette);
      console.log(mood, "<<<< mood ceunah");
      return mood;
    } catch (error) {}
  }
}
