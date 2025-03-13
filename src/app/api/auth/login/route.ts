import prisma from "@/lib/prismadb";
import { responseError } from "@/lib/responseError";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  console.log("Incoming request:", req.method); // Cek metode request

  try {
    const supabase = createRouteHandlerClient({ cookies });
    // const tes = createServerActionClient({ cookies });

    const body = await req.json();
    console.log("Request body:", body); // Debug data yang dikirim
    const { email, password } = body;

    const existUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existUser) return responseError("User not found", 404);

    const { error, data } = await supabase.auth.signInWithPassword({
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
