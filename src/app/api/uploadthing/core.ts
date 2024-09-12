import { getUser } from "@/services/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
 
// FileRouter for your app, can contain multiple FileRoutes
export const CulinaraRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  upload: f({ image: { maxFileSize: "4MB" }, video: { maxFileSize: '16MB' } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({}) => {
      // This code runs on your server before upload
      const user = await getUser()
 
      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
 
      return { uploadedBy: metadata.userId, url: file.url };
    }),
  profile: f({ image: { maxFileSize: "2MB" } })
    .middleware(async ({}) => {
      const user = await getUser()
 
      if (!user) throw new UploadThingError("Unauthorized");
 
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
 
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;
 
export type CulinaraRouter =  (typeof CulinaraRouter);