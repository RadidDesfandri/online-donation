import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search")?.toLowerCase();
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const skip = (page - 1) * limit;

    const whereCondition: Prisma.DonationWhereInput = {};

    if (category) {
      whereCondition.category = {
        contains: category,
        mode: "insensitive",
      };
    }

    if (search) {
      whereCondition.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { tag: { has: search } },
      ];
    }

    const donations = await prisma.donation.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        transactions: true,
      },
    });

    const totalData = await prisma.donation.count({ where: whereCondition });
    const totalPages = Math.ceil(totalData / limit);

    return NextResponse.json({
      status: "ok",
      pagination: {
        totalData,
        totalPages,
        currentPage: page,
        perPage: limit,
      },
      response: donations,
    });
  } catch (error) {
    console.log("Internal error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
