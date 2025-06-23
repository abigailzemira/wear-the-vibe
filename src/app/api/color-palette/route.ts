import ImageModel from "@/src/db/models/ImageModel";

export async function POST(request: Request) {
  try {
    console.log("masuk ke api");

    // Check content type and handle accordingly
    const contentType = request.headers.get("Content-Type");

    let body;
    if (contentType?.includes("application/json")) {
      body = await request.json();
    } else if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = formData.get("image"); // or whatever field name you're using
    } else {
      // Handle text/plain or other formats (like data URLs)
      body = await request.text();
    }

    if (!body) {
      return Response.json(
        {
          error: {
            message: "No image data provided",
            type: "VALIDATION_ERROR",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    let colorAnalysis = await ImageModel.analyzeImageColor(body);

    if (!colorAnalysis) {
      throw {
        message:
          "Failed to analyze image colors. Please try again with a different image.",
        type: "ANALYSIS_ERROR",
        status: 500,
      };
    }

    console.log(colorAnalysis, "<<<< color palette ready to send");
    return Response.json(colorAnalysis);
  } catch (error: any) {
    console.log(error, "<<<< error in color-palette api");

    // Handle different types of errors
    if (error.type) {
      return Response.json(
        {
          error: {
            message: error.message,
            type: error.type,
            status: error.status || 500,
          },
        },
        { status: error.status || 500 }
      );
    }

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return Response.json(
        {
          error: {
            message: "Invalid image data format",
            type: "VALIDATION_ERROR",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    // Generic error handling
    return Response.json(
      {
        error: {
          message: "Failed to process image. Please try again.",
          type: "PROCESSING_ERROR",
          status: 500,
        },
      },
      { status: 500 }
    );
  }
}
