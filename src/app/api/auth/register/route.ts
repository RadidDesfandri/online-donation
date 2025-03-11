import prisma from "@/lib/prismadb";
import { responseError } from "@/lib/responseError";
import { supabase } from "@/lib/supabase/supabaseClient";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return responseError(
        "Email already exist, please change your email",
        400,
      );
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return responseError(error.message, 400);

    const newUser = await prisma.user.create({
      data: {
        email,
      },
    });

    return NextResponse.json({
      msg: "Register succesfully",
      response: newUser,
    });
  } catch (error) {
    console.log("ERROR SAAT MENDAPATKAN DATA:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
