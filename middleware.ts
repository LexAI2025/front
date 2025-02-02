import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value
  const isLoginPage = request.nextUrl.pathname === "/"

  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/audits", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/audits", "/settings", "/audit-result", "/gidebot"],
}

