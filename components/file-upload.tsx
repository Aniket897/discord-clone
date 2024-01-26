"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";


interface fileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage"
}
const FileUpload = (
    {
        onChange,
        value,
        endpoint
    }: fileUploadProps
) => {

    const fileType = value?.split(".").pop();
    if (value && fileType !== "pdf") {
        return (
            <div className="h-20 w-20 relative">
                <Image
                    className="rounded-full"
                    src={value}
                    alt="upload"
                    fill />
                <button
                    title="remove picture"
                    onClick={() => onChange("")}
                    className="absolute top-0 right-0 bg-red-500 p-1 rounded-full">
                    <X size={14} />
                </button>
            </div>
        )
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    )
}

export default FileUpload;