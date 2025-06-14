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
    prompt: `Analyze this image and extract the dominant color palette containing at least 4 distinct colors.

Return ONLY a valid JSON array
(e.g. 
[
  {"color": string, "percentage": number},
  {"color": string, "percentage": number},
  {"color": string, "percentage": number},
  {"color": string, "percentage": number}
]
)

Requirements:
- Use hex color codes (e.g., #FF5733)
- Percentage is a whole number
- Total percentage of all the colors must be 100
- Order by percentage in descending order
- Return only the JSON array, no other text or explanations`,
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
