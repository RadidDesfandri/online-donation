import prisma from "@/lib/prismadb";
import { responseError } from "@/lib/responseError";
import { supabaseRouteHandler } from "@/lib/supabase/supabaseRouteHandler";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existUser) return responseError("User not found", 404);

    const { error, data } = await supabaseRouteHandler.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return responseError(error.message, 400);

    return NextResponse.json({ msg: "Login successfully", data });
  } catch (error) {
    console.log("ERROR ROUTE API:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
