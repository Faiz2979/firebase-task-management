import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    console.log('Middleware', req.nextUrl.pathname);
    // Example: Redirect to login if user is not authenticated
    if (!req.cookies.get('authToken')) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}
