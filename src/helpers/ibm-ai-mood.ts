import Replicate from "replicate";
import { ColorPalette } from "../db/models/ImageModel";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});
export default async function streamMood(palette: { palette: ColorPalette[] }) {
  console.log("masuk helper");
  let swatches = palette?.palette ? palette.palette : palette;

  //     const input = {
  //     prompt: '```ts\n"colors": [\n    {"color": "#FF5733", "percentage": 25},\n    {"color": "#008080", "percentage": 25},\n    {"color": "#800080", "percentage": 25},\n    {"color": "#000000", "percentage": 10}\n  ]\n```\n\nwhat mood does this series of color give off? Please give a one word answer and an icon',
  // };
  const input = {
    top_k: 50,
    top_p: 0.9,
    prompt: `${JSON.stringify(
      swatches
    )} What mood does this series of colors give off?`,
    max_tokens: 512,
    min_tokens: 0,
    temperature: 0.6,
    system_prompt: "give a one word answer",
    presence_penalty: 0,
    frequency_penalty: 0,
  };
  let response = "";
  for await (const event of replicate.stream(
    "ibm-granite/granite-3.3-8b-instruct",
    { input }
  )) {
    // process.stdout.write(event.toString());
    if (event.toString()) {
      response += event.toString(); // Concatenate instead of replacing
    }
  }
  console.log(response, "<<< response");
  // Clean up the response to extract just the mood word
  const cleanedResponse = response.trim().split(/\s+/)[0]; // Take first word only
  return cleanedResponse;
}
