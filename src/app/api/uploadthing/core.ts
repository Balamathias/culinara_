import { getUser } from "@/services/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
 
export const CulinaraRouter = {
  upload: f({ image: { maxFileSize: "4MB" }, video: { maxFileSize: '16MB'} })
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
  video: f({ image: { maxFileSize: "2MB", maxFileCount: 1 }, video: { maxFileSize: '16MB', minFileCount: 1 } })
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