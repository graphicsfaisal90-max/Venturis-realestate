"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  currentImage?: string;
  onUpload: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ currentImage, onUpload, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        onUpload(data.url);
      }
    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const remove = () => {
    setPreview("");
    onUpload("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-sm text-[#888] mb-1">{label}</label>
      {preview ? (
        <div className="relative w-full h-32 rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#333] group">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button type="button" onClick={() => inputRef.current?.click()} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors">
              Change
            </button>
            <button type="button" onClick={remove} className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 rounded-lg border-2 border-dashed border-[#333] hover:border-[#555] transition-colors flex flex-col items-center justify-center gap-2 text-[#666] hover:text-[#888] disabled:opacity-50"
        >
          {uploading ? (
            <div className="w-5 h-5 border-2 border-[#988060] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Upload size={20} />
              <span className="text-xs">Click to upload {label.toLowerCase()}</span>
            </>
          )}
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}

interface GalleryUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  label?: string;
}

export function GalleryUpload({ images, onImagesChange, label = "Gallery Images" }: GalleryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) newUrls.push(data.url);
      } catch {
        console.error("Upload failed for", file.name);
      }
    }

    onImagesChange([...images, ...newUrls]);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block text-sm text-[#888] mb-1">{label}</label>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-2">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#333] group">
            <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="aspect-square rounded-lg border-2 border-dashed border-[#333] hover:border-[#555] transition-colors flex flex-col items-center justify-center gap-1 text-[#666] hover:text-[#888] disabled:opacity-50"
        >
          {uploading ? (
            <div className="w-5 h-5 border-2 border-[#988060] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <ImageIcon size={16} />
              <span className="text-[10px]">Add</span>
            </>
          )}
        </button>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
    </div>
  );
}
