import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}

const publicOnlyRoutes: Routes = {
  '/': true,
  '/login': true,
  '/create-account': true,
  '/sms': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyRoutes[request.nextUrl.pathname];

  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL('/products', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
