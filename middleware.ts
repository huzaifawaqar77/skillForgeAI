// middleware.ts
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
    const cookieToken = request.cookies.get('token'); // Get the token from cookies
    const {pathname} = request.nextUrl;

    // Define paths that require authentication
    const protectedPaths = ['/dashboard', '/profile', '/settings'];

    // If the path is protected and no token is found, redirect to login
    if (protectedPaths.includes(pathname) && !cookieToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Allow the request to continue if the token exists or the path is not protected
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'], // Apply middleware to these paths
};