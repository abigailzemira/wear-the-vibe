    import Replicate from "replicate";
import { readFile } from "node:fs/promises";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

let data: string;
let image: string;

export default async function main(imageUrl: string) {
    console.log("masukkkkkkk")
//   data = (await readFile(imageUrl)).toString("base64");
//   image = `data:application/octet-stream;base64,${data}`;
  const input = {
    image: imageUrl,
    prompt: `> Analyze the image from this image URL
> Extract the **dominant color palette** from the image.
> The color palette must contain **at least 4 distinct colors**.
> Return the result in the following **JSON format**:
>
> 
> type ColorPalette = [{ color: "string", percentage: "string" } ]
> 
>
> Where:
>
> * "color" is the hex code of the color (e.g., "#FF5733")
> * "percentage" is the **approximate proportion** of the color in the image (e.g., "23%")
//order it by the percentage in descend
>
> Output only valid JSON corresponding to the "ColorPalette" type.
`,
  };
  let fullResponse = ""
  for await (const event of replicate.stream(
    "ibm-granite/granite-vision-3.2-2b",
    { input }
  )) {
    process.stdout.write(`${event}`);
    fullResponse += event
  }
//   console.log("\nFull response:", fullResponse);
  return fullResponse
}

//=> "The image depicts a detailed view of the Moon, showcasin...
