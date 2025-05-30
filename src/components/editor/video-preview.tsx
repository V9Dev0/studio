import Image from 'next/image';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function VideoPreview() {
  return (
    <div className="aspect-video bg-muted/30 rounded-lg overflow-hidden relative flex items-center justify-center shadow-inner">
      <Image 
        src="https://placehold.co/1280x720.png" 
        alt="Video placeholder" 
        layout="fill" 
        objectFit="cover"
        data-ai-hint="video placeholder" 
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <Button variant="ghost" size="icon" className="h-20 w-20 text-white/70 hover:text-white hover:bg-white/10">
          <Icons.play className="h-12 w-12 fill-current" />
        </Button>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon" className="h-8 w-8"><Icons.play className="h-4 w-4" /></Button>
          <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">00:00 / 00:00</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="icon" className="h-8 w-8"><Icons.volume2 className="h-4 w-4" /></Button>
          <Button variant="secondary" size="icon" className="h-8 w-8"><Icons.settings className="h-4 w-4" /></Button>
          <Button variant="secondary" size="icon" className="h-8 w-8"><Icons.maximize className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}
