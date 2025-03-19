import { getUserId } from "@/lib/api/getUserId";
import prisma from "@/lib/prismadb";
import { responseError } from "@/lib/api/responseError";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req: Request) => {
  try {
    const user = await getUserId(req);

    if (user.error) {
      return responseError(user.message, user.status);
    }

    const { userId } = user;

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = JSON.parse(formData.get("tag") as string);
    const thumbnail = formData.get("thumbnail") as File;
    const amount = Number(formData.get("amount"));
    const category = formData.get("category") as string;

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
        category,
        userId: userId as string,
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
