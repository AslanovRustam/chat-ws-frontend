import { ROUTES } from "@/constants/constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = [
  ROUTES.chat,
  ROUTES.contacts,
  ROUTES.dashboard,
  ROUTES.phone,
  ROUTES.settings,
  ROUTES.user,
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (!token && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && (pathname === "/" || pathname === "/login")) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    `${ROUTES.chat}/:path*`,
    `${ROUTES.contacts}/:path*`,
    "/",
    `${ROUTES.dashboard}/:path*`,
    `${ROUTES.phone}/:path*`,
    `${ROUTES.settings}/:path*`,
    `${ROUTES.user}/:path*`,
  ],
};
