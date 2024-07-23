import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session/getSession';

interface Routes {
  [key: string]: boolean;
}

const publicOnlyRoutes: Routes = {
  '/': true,
  '/login': true,
  '/create-account': true,
  '/sms': true,
  '/github/start': true,
  '/github/complete': true,
  '/google/start': true,
  '/google/complete': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicOnlyRoute = publicOnlyRoutes[request.nextUrl.pathname];

  if (!session.id) {
    if (!isPublicOnlyRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (isPublicOnlyRoute) {
      return NextResponse.redirect(new URL('/products', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|iamges|favicon.ico).*)'],
};
