'use client'

import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";


const Dropzone = () => (
  <UploadDropzone
    endpoint="upload"
    onClientUploadComplete={(res) => {
      // Do something with the response
      console.log("Files: ", res);
      toast.success("Upload Completed");
    }}
    onUploadError={(error: Error) => {
      toast.error(`ERROR! ${error.message}`);
    }}
    onUploadBegin={(name) => {
      // Do something once upload begins
      toast.loading("uploading: " + name);
    }}
    onChange={(acceptedFiles) => {
      // Do something with the accepted files
      console.log("Accepted files: ", acceptedFiles);
    }}
    className=""
    appearance={{
      button: {
        backgroundColor: 'hsla(var(--primary))'
      },
      label: {
        color: 'hsla(var(--primary))'
      }
    }}
  />
);

export default Dropzone