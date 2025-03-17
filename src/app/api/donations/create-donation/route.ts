import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import prisma from "@/lib/prismadb";
import { responseError } from "@/lib/responseError";
import { decodeToken } from "@/actions/decodeToken";

export const POST = async (req: Request) => {
  try {
    const { user, error, status } = await decodeToken(req);

    if (error) return responseError(error, status);

    const findUser = await prisma.user.findUnique({
      where: {
        email: user?.email,
      },
    });

    if (!findUser) return responseError("User notfound", 404);

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = JSON.parse(formData.get("tag") as string);
    const thumbnail = formData.get("thumbnail") as File;
    const amount = Number(formData.get("amount"));

    const filePath = path.join(process.cwd(), "public/uploads", thumbnail.name);
    const buffer = Buffer.from(await thumbnail.arrayBuffer());
    await writeFile(filePath, buffer);

    const donation = await prisma.donation.create({
      data: {
        title,
        content,
        tag,
        thumbnail: `/uploads/${thumbnail.name}`,
        amount,
        userId: findUser.id,
      },
    });

    return NextResponse.json({
      msg: "Donation created successfully",
      donation,
    });
  } catch (error) {
    console.log("Internal error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
