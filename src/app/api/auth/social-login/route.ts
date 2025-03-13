import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, username, avatar } = body;

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          username,
          avatar,
        },
      });
    } else {
      user = await prisma.user.update({
        where: {
          email,
        },
        data: {
          email,
          username,
          avatar,
        },
      });
    }

    return NextResponse.json({ msg: "Login successfully" });
  } catch (error) {
    console.log("ERROR ROUTE API:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
