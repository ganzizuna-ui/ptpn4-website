import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "ptpn4_admin_session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Biarkan halaman login diakses tanpa session
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get(SESSION_COOKIE);
    if (!session || session.value !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
