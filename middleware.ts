import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/' , '/blogs', '/blog/:id', '/sign-in(.*)'])



export default clerkMiddleware(async (auth, req) => {
  
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
},{
  authorizedParties:["http://localhost:3000","https://quietpages.ashutosh007.xyz"]
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};