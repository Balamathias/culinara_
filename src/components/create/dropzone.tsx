'use client'

import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

interface DropzoneProps {
  onUploadFinish: (url: string | undefined) => void,
  endpoint?: 'profile'
}

const Dropzone = ({onUploadFinish, endpoint}: DropzoneProps) => (
  <UploadDropzone
    endpoint={endpoint ?? "upload"}
    onClientUploadComplete={(res) => {
      onUploadFinish(res.at(0)?.url)
    }}
    onUploadError={(error: Error) => {
      console.error(`ERROR! ${error}`);
      toast.error('An error occured, please try again.')
    }}
    onUploadBegin={() => {
    }}
    onChange={(acceptedFiles) => {
      console.log("Accepted files: ", acceptedFiles);
    }}
    onUploadProgress={(p) => {console.log(p)}}
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