import { getUserId } from "@/lib/api/getUserId";
import prisma from "@/lib/prismadb";
import { responseError } from "@/lib/api/responseError";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const user = await getUserId(req);

    if (user.error) {
      return responseError(user.message, user.status);
    }

    const { userId } = user;

    const donations = await prisma.donation.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json({ status: "ok", response: donations });
  } catch (error) {
    console.log("Internal error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
