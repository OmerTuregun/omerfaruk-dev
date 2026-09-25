import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') ?? ''

  // Port'u temizle: "restoran.localhost:3000" → "restoran.localhost"
  const host = hostname.split(':')[0] ?? ''

  // Parçala: ["restoran", "localhost"]
  const parts = host.split('.')

  // Subdomain var mı?
  // "localhost" → parts = ["localhost"] → length 1 → subdomain yok
  // "restoran.localhost" → parts = ["restoran", "localhost"] → length 2 → subdomain var
  const hasSubdomain =
    parts.length >= 2 && parts[parts.length - 1] === 'localhost'
  const subdomain = hasSubdomain ? parts[0] : null

  // www veya boş ise ana site
  if (!subdomain || subdomain === 'www' || subdomain === 'localhost') {
    return NextResponse.next()
  }

  // Mevcut path'i al
  const pathname = request.nextUrl.pathname

  // Zaten /subdomain ile başlıyorsa tekrar rewrite etme
  if (pathname.startsWith(`/${subdomain}`)) {
    return NextResponse.next()
  }

  // Rewrite: restoran.localhost/ → /restoran
  // dashboard.localhost → /dashboard
  // ajans.localhost → /ajans
  // mimari.localhost → /mimari
  const url = request.nextUrl.clone()
  url.pathname = `/${subdomain}${pathname === '/' ? '' : pathname}`

  console.log(`[middleware] host: ${host} → rewrite to: ${url.pathname}`)

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
