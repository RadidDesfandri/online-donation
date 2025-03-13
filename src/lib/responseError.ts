import { NextResponse } from "next/server";

export const responseError = (message: string, status: number) => {
  return NextResponse.json(message, { status });
};
