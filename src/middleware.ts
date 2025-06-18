import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyWithJose } from "./helpers/jwt";

export async function middleware(req: Request) {
  const cookieStore = await cookies();
  try {
    console.log(cookieStore, "<<<< cookie store from middleware");
    const auth = cookieStore.get("spotify_access_token");
    if (!auth) throw { message: "Please login first!", status: 401 };

    // // requestHeaders.set("x-user-id", decoded._id);

    // const response = NextResponse.next({
    //   request: {
    //     headers: requestHeaders,
    //   },
    // });

    // You can add more logic here if needed
    //   return Response.json({ message: "Middleware executed", headers });
  } catch (error: { message: string; status?: number } | any) {
    console.log(error, "<<<< error from middleware");
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
}

export const config = {
  matcher: ["/api/generate-playlist"],
};
