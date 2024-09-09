import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
 
import type { CulinaraRouter } from "@/app/api/uploadthing/core";
 
export const UploadButton = generateUploadButton<CulinaraRouter>();
export const UploadDropzone = generateUploadDropzone<CulinaraRouter>();
