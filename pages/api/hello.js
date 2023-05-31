import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // API logic goes here
    // Example: Get data from a database or perform some computation

    // Make API call to OpenAI API
    const apiKey = process.env.OPENAI_API_KEY; // Read API key from environment variable
    const endpoint = "https://api.openai.com/v1/engines/davinci/completions";

    // Get the prompt from the query parameters
    const prompt = req.query.prompt;
    const maxTokens = 100;
    const temperature = 0.7;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const requestBody = {
      prompt,
      max_tokens: maxTokens,
      temperature,
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    // Send a successful response with OpenAI API result
    res.status(200).json({ success: true, data });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error:", error);

    // Send an error response
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
