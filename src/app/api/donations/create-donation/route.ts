import { getUserId } from "@/lib/api/getUserId";
import { responseError } from "@/lib/api/responseError";
import prisma from "@/lib/prismadb";
import { supabase } from "@/lib/supabase/supabaseClient";
import { NextResponse } from "next/server";

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

    const filename = `${Date.now()}-${thumbnail.name}`;

    const bytes = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error } = await supabase.storage
      .from("donations")
      .upload(filename, buffer, {
        contentType: thumbnail.type,
        upsert: false,
      });

    if (error) return responseError(error.message, 400);

    const { data: urlData } = supabase.storage
      .from("donations")
      .getPublicUrl(filename);

    const imageUrl = urlData.publicUrl;

    const donation = await prisma.donation.create({
      data: {
        title,
        content,
        tag,
        thumbnail: imageUrl,
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
