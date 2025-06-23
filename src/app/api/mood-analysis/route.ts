import ImageModel from "@/src/db/models/ImageModel";

export async function POST(request: Request) {
  try {
    let body = await request.json();
    
    if (!body) {
      return Response.json({ 
        error: {
          message: "Image data is required for mood analysis",
          type: "VALIDATION_ERROR",
          status: 400
        }
      }, { status: 400 });
    }

    let mood = await ImageModel.analyzeMood(body);
    
    if (!mood) {
      throw { 
        message: "Unable to analyze mood from the provided image. Please try with a clearer image or different photo.",
        type: "MOOD_ANALYSIS_ERROR",
        status: 500
      };
    }
    
    console.log(mood, "<<<< mood from api");
    return Response.json({ mood: mood });
  } catch (error: any) {
    console.log(error, "<<<< error in mood-analysis api");
    
    // Handle custom errors
    if (error.type) {
      return Response.json({ 
        error: {
          message: error.message,
          type: error.type,
          status: error.status || 500
        }
      }, { status: error.status || 500 });
    }
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return Response.json({ 
        error: {
          message: "Invalid image data format",
          type: "VALIDATION_ERROR",
          status: 400
        }
      }, { status: 400 });
    }
    
    // Generic error handling
    return Response.json({ 
      error: {
        message: "Failed to analyze mood. Please try again with a different image.",
        type: "MOOD_ANALYSIS_ERROR",
        status: 500
      }
    }, { status: 500 });
  }
}
