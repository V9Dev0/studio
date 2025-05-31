
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export interface UploadedMediaItem { // Exporting the interface
  id: string;
  title: string;
  type: string; // e.g., 'video/mp4', 'image/png'
  duration?: string; // Optional, for video/audio
  thumbnailUrl: string; // This will be a data URI for uploaded items
  dataUri: string; // The actual data URI of the media
  dataAiHint?: string;
}

interface MediaLibraryPanelProps {
  onAddClipToTimeline: (mediaItem: UploadedMediaItem) => void;
}

export function MediaLibraryPanel({ onAddClipToTimeline }: MediaLibraryPanelProps) {
  const { toast } = useToast();
  const [mediaItems, setMediaItems] = useState<UploadedMediaItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddMediaToTimeline = (mediaItem: UploadedMediaItem) => {
    onAddClipToTimeline(mediaItem);
    toast({
      title: "Media Added",
      description: `"${mediaItem.title}" has been added to the timeline.`,
    });
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        
        // Create a basic thumbnail. For videos, this is just a placeholder.
        // For images, it's the image itself.
        let thumbnailUrl = dataUri;
        if (file.type.startsWith('video/')) {
          thumbnailUrl = 'https://placehold.co/100x60.png?text=Video';
        } else if (file.type.startsWith('audio/')) {
            thumbnailUrl = 'https://placehold.co/100x60.png?text=Audio';
        }


        const newMediaItem: UploadedMediaItem = {
          id: `media-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, "")}`, // Ensure somewhat unique ID
          title: file.name,
          type: file.type,
          thumbnailUrl: thumbnailUrl,
          dataUri: dataUri,
          dataAiHint: file.type.startsWith('image/') ? "uploaded image" : (file.type.startsWith('video/') ? "uploaded video" : "uploaded audio"),
        };
        setMediaItems(prevItems => [newMediaItem, ...prevItems]);
        toast({
          title: "Media Uploaded",
          description: `${file.name} has been added to the library.`,
        });
      };
      reader.onerror = () => {
        toast({
          title: "Upload Error",
          description: "Could not read the selected file.",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    }
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <div className="p-4 space-y-3 h-full flex flex-col">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="video/*,image/*,audio/*"
        style={{ display: 'none' }}
      />
      <div className="flex items-center justify-between">
        <h3 className="font-headline text-sm font-medium text-muted-foreground px-1">Media Library</h3>
        <Button size="sm" onClick={handleUploadButtonClick}>
          <Icons.uploadCloud className="mr-2 h-4 w-4" /> Upload Media
        </Button>
      </div>
      <Input type="search" placeholder="Search media..." className="h-8 text-xs" />
      <ScrollArea className="flex-grow">
        <div className="space-y-2 pr-3">
          {mediaItems.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">No media uploaded yet. Click "Upload Media" to begin.</p>
          )}
          {mediaItems.map((media) => (
            <div
              key={media.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Image
                  src={media.thumbnailUrl}
                  alt={media.title}
                  width={64}
                  height={36}
                  className="rounded-sm border aspect-video object-cover bg-muted/20" // Added bg-muted/20 for placeholder images
                  data-ai-hint={media.dataAiHint || (media.type.startsWith('image/') ? "image file" : "video file")}
                  unoptimized={media.thumbnailUrl.startsWith('data:')} // Important for data URIs
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" title={media.title}>{media.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {media.type.split('/')[0].charAt(0).toUpperCase() + media.type.split('/')[0].slice(1)}
                    {media.duration && ` - ${media.duration}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {(media.type.startsWith('video/') || media.type.startsWith('audio/')) && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); toast({ title: `Preview ${media.title}` }) }}>
                    <Icons.play className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={(e) => { e.stopPropagation(); handleAddMediaToTimeline(media); }}>
                  <Icons.add className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
