import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const guestOnlyRoutes = ["/auth"];
  const protectedRoutes = ["/dashboard"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );
  const isGuestOnlyRoute = guestOnlyRoutes.includes(req.nextUrl.pathname);

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (session && isGuestOnlyRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
