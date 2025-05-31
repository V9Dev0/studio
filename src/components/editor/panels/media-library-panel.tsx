
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

const sampleMedia = [
  { id: 'media1', title: 'Sunset_Drone_Shot.mp4', type: 'video', duration: '0:45', thumbnailUrl: 'https://placehold.co/100x60.png?text=Vid1', dataAiHint: "sunset drone" },
  { id: 'media2', title: 'Podcast_Intro_Music.mp3', type: 'audio', duration: '0:15', thumbnailUrl: 'https://placehold.co/100x60.png?text=Audio1', dataAiHint: "music waveform" },
  { id: 'media3', title: 'Product_Demo_Screen_Record.mov', type: 'video', duration: '2:10', thumbnailUrl: 'https://placehold.co/100x60.png?text=Vid2', dataAiHint: "screen record" },
  { id: 'media4', title: 'Overlay_Logo.png', type: 'image', thumbnailUrl: 'https://placehold.co/100x60.png?text=Img1', dataAiHint: "company logo" },
  { id: 'media5', title: 'Interview_Clip_Cam1.mp4', type: 'video', duration: '5:30', thumbnailUrl: 'https://placehold.co/100x60.png?text=Vid3', dataAiHint: "interview setup" },
];

export function MediaLibraryPanel() {
  const { toast } = useToast();

  const handleAddMediaToTimeline = (mediaTitle: string) => {
    toast({
      title: "Media Action",
      description: `Added "${mediaTitle}" to timeline. (Placeholder)`,
    });
  };
  
  const handleUploadMedia = () => {
    toast({
      title: "Media Upload",
      description: "Open file dialog to upload media. (Placeholder)",
    });
    // In a real app, this would trigger a file input.
  };

  return (
    <div className="p-4 space-y-3 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="font-headline text-sm font-medium text-muted-foreground px-1">Media Library</h3>
        <Button size="sm" onClick={handleUploadMedia}>
          <Icons.uploadCloud className="mr-2 h-4 w-4" /> Upload Media
        </Button>
      </div>
      <Input type="search" placeholder="Search media..." className="h-8 text-xs" />
      <ScrollArea className="flex-grow">
        <div className="space-y-2 pr-3">
          {sampleMedia.map((media) => (
            <div
              key={media.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Image 
                  src={media.thumbnailUrl} 
                  alt={media.title} 
                  width={64} // Adjusted for better fit
                  height={36} // Adjusted for 16:9 aspect ratio
                  className="rounded-sm border aspect-video object-cover"
                  data-ai-hint={media.dataAiHint}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" title={media.title}>{media.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
                    {media.duration && ` - ${media.duration}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {media.type === 'video' && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={(e) => {e.stopPropagation(); toast({title: `Preview ${media.title}`})}}>
                    <Icons.play className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={(e) => {e.stopPropagation(); handleAddMediaToTimeline(media.title);}}>
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
