import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export default async function IBMSongGenerator(mood: string) {
  try {
    const input = {
      top_k: 50,
      top_p: 0.9,
      prompt: `Give me a minimum of 7 song recommendations based on the following one-word mood: "happy". \n\nOutput the result as an array in the format: { title: string; artist: string }[]
      
      Return only a valid JSON array
      `,
      max_tokens: 512,
      min_tokens: 0,
      temperature: 0.6,
      system_prompt: "please don't talk",
      presence_penalty: 0,
      frequency_penalty: 0,
    };

    let response = "";
    for await (const event of replicate.stream(
      "ibm-granite/granite-3.3-8b-instruct",
      { input }
    )) {
      //   process.stdout.write(event.toString());
      response += event.toString();
    }

    console.log(response, "<<< response");
    return response;
  } catch (error) {
    console.log(error, "<<<< error for generate songs with ai");
  }
}
