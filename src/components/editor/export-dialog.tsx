import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Icons } from "@/components/icons"
import React from "react";

interface ExportDialogProps {
  children: React.ReactNode;
}

export function ExportDialog({ children }: ExportDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center"><Icons.uploadCloud className="mr-2 h-5 w-5" /> Export Video</DialogTitle>
          <DialogDescription>
            Choose your desired export settings for the final video.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="filename" className="text-right text-xs">
              Filename
            </Label>
            <Input id="filename" defaultValue="my_awesome_video.mp4" className="col-span-3 h-8 text-xs" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="format" className="text-right text-xs">
              Format
            </Label>
            <Select defaultValue="mp4">
              <SelectTrigger id="format" className="col-span-3 h-8 text-xs">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mp4" className="text-xs">MP4 (H.264)</SelectItem>
                <SelectItem value="mov" className="text-xs">MOV (QuickTime)</SelectItem>
                <SelectItem value="avi" className="text-xs">AVI</SelectItem>
                <SelectItem value="webm" className="text-xs">WebM (VP9)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resolution" className="text-right text-xs">
              Resolution
            </Label>
            <Select defaultValue="1080p">
              <SelectTrigger id="resolution" className="col-span-3 h-8 text-xs">
                <SelectValue placeholder="Select resolution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="480p" className="text-xs">480p (SD)</SelectItem>
                <SelectItem value="720p" className="text-xs">720p (HD)</SelectItem>
                <SelectItem value="1080p" className="text-xs">1080p (Full HD)</SelectItem>
                <SelectItem value="1440p" className="text-xs">1440p (QHD/2K)</SelectItem>
                <SelectItem value="2160p" className="text-xs">2160p (UHD/4K)</SelectItem>
                <SelectItem value="4320p" className="text-xs">4320p (8K)</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="preset" className="text-right text-xs">
              Preset
            </Label>
            <Select defaultValue="default">
              <SelectTrigger id="preset" className="col-span-3 h-8 text-xs">
                <SelectValue placeholder="Social Media Preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default" className="text-xs">Default (Best Quality)</SelectItem>
                <SelectItem value="youtube" className="text-xs">YouTube Optimized</SelectItem>
                <SelectItem value="tiktok" className="text-xs">TikTok Optimized</SelectItem>
                <SelectItem value="instagram" className="text-xs">Instagram Reels Optimized</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <Icons.download className="mr-2 h-4 w-4" />
            Start Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
