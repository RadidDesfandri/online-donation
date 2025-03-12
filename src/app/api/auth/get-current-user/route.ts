import { decodeToken } from "@/actions/decodeToken";
import prisma from "@/lib/prismadb";
import { responseError } from "@/lib/responseError";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { user, error, status } = await decodeToken(req);

    if (error) return responseError(error, status);

    const currentUser = await prisma.user.findUnique({
      where: { email: user?.email },
    });

    if (!currentUser) return responseError("User notfound in db", 404);

    return NextResponse.json(currentUser);
  } catch (error) {
    console.log("ERROR ROUTE API:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
