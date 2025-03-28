import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const POST = async (req: Request) => {
  try {
    const { status, external_id } = await req.json();

    switch (status) {
      case "PAID":
        await prisma.transaction.update({
          where: { id: external_id },
          data: { status: "COMPLETED" },
        });
        break;
      case "EXPIRED":
        await prisma.transaction.update({
          where: { id: external_id },
          data: { status: "FAILED" },
        });
        break;
    }

    return NextResponse.json({ status });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
