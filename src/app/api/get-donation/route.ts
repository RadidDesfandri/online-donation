import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await prisma.user.findMany();
    return NextResponse.json(user);
  } catch (error) {
    console.log("ERROR SAAT MENDAPATKAN DATA:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
