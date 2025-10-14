import apper from "https://cdn.apper.io/actions/apper-actions.js";

apper.serve(async (req) => {
  // Validate request method
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Method not allowed. Use POST."
      }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    // Parse and validate request body
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Name is required and must be a non-empty string"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Retrieve OpenAI API key from secrets
    const apiKey = await apper.getSecret("OPENAI_API_KEY");
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "OpenAI API key not configured"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Construct professional avatar generation prompt
    const prompt = `Professional business headshot portrait of ${name.trim()}, high quality, professional lighting, neutral background, business attire, photorealistic, corporate style, studio photography`;

    // Call OpenAI DALL-E API
    const openaiResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "standard",
        response_format: "url"
      })
    });

    // Handle OpenAI API errors
    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json().catch(() => ({}));
      
      let errorMessage = "Failed to generate avatar";
      let statusCode = 500;

      if (openaiResponse.status === 401) {
        errorMessage = "Invalid OpenAI API key";
        statusCode = 401;
      } else if (openaiResponse.status === 429) {
        errorMessage = "Rate limit exceeded. Please try again later.";
        statusCode = 429;
      } else if (openaiResponse.status === 400) {
        errorMessage = errorData.error?.message || "Invalid request to OpenAI API";
        statusCode = 400;
      } else if (errorData.error?.message) {
        errorMessage = errorData.error.message;
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: errorMessage
        }),
        {
          status: statusCode,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Parse successful response
    const data = await openaiResponse.json();

    // Validate response structure
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid response from OpenAI API - no image generated"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const imageUrl = data.data[0].url;

    if (!imageUrl || typeof imageUrl !== "string") {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid image URL received from OpenAI API"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Return success response with generated image URL
    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: imageUrl
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    // Handle any unexpected errors
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "An unexpected error occurred while generating avatar"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
});