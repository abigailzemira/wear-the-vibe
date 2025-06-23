import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const cookieStore = await cookies();
  try {
    console.log(cookieStore, "<<<< cookie store from middleware");
    const auth = cookieStore.get("spotify_access_token");
    if (!auth) {
      throw {
        message: "Please login first!",
        status: 401,
        type: "AUTHENTICATION_ERROR",
      };
    }

    // If auth exists, continue to the route
    return NextResponse.next();
  } catch (error: { message: string; status?: number; type?: string } | any) {
    console.log(error, "<<<< error from middleware");

    // Return structured error response that can be handled by client
    return NextResponse.json(
      {
        error: {
          message: error.message || "An unexpected error occurred",
          type: error.type || "GENERAL_ERROR",
          status: error.status || 500,
        },
      },
      { status: error.status || 500 }
    );
  }
}

export const config = {
  matcher: ["/api/generate-playlist"],
};
