import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { responseError } from "@/lib/api/responseError";
import { uuidRegex } from "@/lib/uuidRegex";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ donationId: string }> },
) => {
  const { donationId } = await params;
  try {
    if (!uuidRegex.test(donationId)) {
      return responseError("Invalid donation ID format!", 400);
    }

    const donation = await prisma.donation.findUnique({
      where: {
        id: donationId,
      },
    });

    if (!donation) return responseError("Donation notfound!", 404);

    return NextResponse.json({ status: "ok", response: donation });
  } catch (error) {
    console.log("Internal error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
