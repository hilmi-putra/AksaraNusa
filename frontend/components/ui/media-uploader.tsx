"use client";

import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Attachment,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
} from "@/components/ui/attachment";
import { Image as ImageIcon, Link as LinkIcon, Upload, Trash2, X } from "lucide-react";
import { uploadFile } from "@/lib/api/books";

interface MediaUploaderProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function MediaUploader({ value, onChange, placeholder = "URL gambar", label = "Gambar" }: MediaUploaderProps) {
  const [mode, setMode] = useState<"url" | "upload" | "none">("none");
  const [loading, setLoading] = useState(false);
  const [urlInput, setUrlInput] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const response: any = await uploadFile(file);
      if (response?.success) {
        onChange(response.url);
        setUrlInput(response.url);
      } else {
        alert("Gagal mengunggah gambar");
      }
    } catch (error) {
      console.error("Upload error", error);
      alert("Terjadi kesalahan saat mengunggah gambar");
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUrlSubmit = () => {
    onChange(urlInput);
    setMode("none");
  };

  if (value) {
    return (
      <Attachment state="done" size="default">
        <AttachmentMedia variant="image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>{label}</AttachmentTitle>
          <AttachmentDescription>{value.split('/').pop() || 'image'}</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction variant="outline" onClick={() => { onChange(""); setUrlInput(""); }}>
            <Trash2 className="size-4" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    );
  }

  if (loading) {
    return (
      <Attachment state="uploading" size="default">
        <AttachmentMedia variant="icon">
          <Upload className="size-4 animate-bounce text-muted-foreground" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Mengunggah...</AttachmentTitle>
          <AttachmentDescription>Mohon tunggu sebentar</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    );
  }

  return (
    <div className="space-y-3 p-3 border border-dashed rounded-lg bg-gray-50/50">
      {mode === "none" && (
        <div className="flex gap-2 justify-center">
          <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="flex gap-2">
            <Upload className="size-4" />
            Upload File
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => setMode("url")} className="flex gap-2">
            <LinkIcon className="size-4" />
            Gunakan URL
          </Button>
        </div>
      )}

      {mode === "url" && (
        <div className="flex items-center gap-2">
          <Input 
            placeholder={placeholder} 
            value={urlInput} 
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 text-sm h-8"
          />
          <Button type="button" size="sm" onClick={handleUrlSubmit} className="h-8">Terapkan</Button>
          <Button type="button" variant="ghost" size="icon" onClick={() => setMode("none")} className="h-8 w-8 text-muted-foreground">
            <X className="size-4" />
          </Button>
        </div>
      )}

      <input 
        type="file" 
        accept="image/*,.pdf,.epub,.mobi" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        className="hidden" 
      />
    </div>
  );
}
