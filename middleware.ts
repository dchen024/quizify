import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, response } = await updateSession(request);

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get the current path
  const path = new URL(request.url).pathname;

  // Define routes
  const publicRoutes = ['/', '/api'];
  const authRoutes = ['/login', '/signup', '/(auth).*'];
  const protectedRoutes = ['/quizz', '/quizz/.*'];

  // If user is authenticated and trying to access auth routes, redirect to /quizz
  if (
    user &&
    authRoutes.some((route) => path.match(new RegExp(`^${route}$`)))
  ) {
    return NextResponse.redirect(new URL('/quizz', request.url));
  }

  // If user is not authenticated and trying to access protected routes, redirect to /login
  if (
    !user &&
    protectedRoutes.some((route) => path.match(new RegExp(`^${route}$`)))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/.*|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
