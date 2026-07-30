import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = crypto.randomUUID();

  const isDev = process.env.NODE_ENV !== 'production';
  
  // CSP Header without 'unsafe-inline' for scripts
  // We allow 'unsafe-inline' for styles because many UI libraries (like Tailwind via style tags in dev) need it,
  // but strictly use nonce for scripts.
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https: http: ${isDev ? "'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://placehold.co https://ik.imagekit.io https://megapress.co.id https://*.googleusercontent.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' http://localhost:* ws://localhost:* https://megapress.co.id https://app.sandbox.midtrans.com https://api.sandbox.midtrans.com https://app.midtrans.com https://api.midtrans.com;
    frame-src 'self' https://app.sandbox.midtrans.com https://app.midtrans.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Create response headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  // Auth logic
  const token = request.cookies.get('aksaranusa_token')?.value;
  const userCookie = request.cookies.get('aksaranusa_user')?.value;
  const path = request.nextUrl.pathname;

  const isProtectedRoute = path.startsWith('/dashboard') || path.startsWith('/admin');
  const isAuthRoute = path.startsWith('/login') || path.startsWith('/register');

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (isProtectedRoute && !token) {
    response = NextResponse.redirect(new URL('/login', request.url));
  } else if (path.startsWith('/admin') && token && userCookie) {
    try {
      const user = JSON.parse(userCookie);
      if (user.role !== 'admin') {
        response = NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (e) {
      response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('aksaranusa_token');
      response.cookies.delete('aksaranusa_user');
    }
  } else if (isAuthRoute && token) {
    let role = 'user';
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        role = user.role;
      } catch(e) {}
    }
    const redirectPath = role === 'admin' ? '/admin/dashboard' : '/dashboard';
    response = NextResponse.redirect(new URL(redirectPath, request.url));
  }

  // Set CSP headers on the response
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('x-nonce', nonce);

  return response;
}

export const config = {
  matcher: [
    // Apply middleware to all routes except api, static assets, and images
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
