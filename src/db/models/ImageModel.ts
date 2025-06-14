import main from "@/src/helpers/ibm-ai";

export default class ImageModel {
    static async analyzeImageColor({imageUrl}: {imageUrl: string}) {
        console.log("masukkkkk model")
        let colorPalette = await main(imageUrl)
        // console.log(colorPalette, "<<< ini colo palet")
        return colorPalette
    }
}