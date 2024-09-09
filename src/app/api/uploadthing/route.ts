import { createRouteHandler } from "uploadthing/next";
 
import { CulinaraRouter } from "./core";
 
// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: CulinaraRouter,
 
  // Apply an (optional) custom config:
  // config: { ... },
});
