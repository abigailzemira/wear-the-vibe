import main from "@/src/helpers/ibm-ai";
import streamMood from "@/src/helpers/ibm-ai-mood";

export type ColorPalette = {
    color: string,
    percentage: number
}
export default class ImageModel {
    static async analyzeImageColor({imageUrl}: {imageUrl: string}) {
       try {
         console.log("masukkkkk model")
        let colorPalette = await main(imageUrl)
        // console.log(colorPalette, "<<< ini colo palet")
        return colorPalette
       } catch (error) {
        console.log(error)
       }
    }

    static async analyzeMood({ palette }: { palette: ColorPalette[] }) {
        try {
            let mood = await streamMood()
            console.log(mood, "<<<< mood ceunah")
            return mood
        } catch (error) {
            
        }
    }
}