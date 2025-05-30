import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

const sampleTracks = [
  { id: '1', title: 'Epic Adventure', artist: 'AI Composer', duration: '2:30' },
  { id: '2', title: 'Chill Lo-fi Beats', artist: 'GrooveBot', duration: '3:15' },
  { id: '3', title: 'Corporate Uplift', artist: 'SoundWave AI', duration: '1:45' },
  { id: '4', title: 'Mysterious Ambiance', artist: 'SynthMind', duration: '4:02' },
  { id: '5', title: 'Upbeat Pop Fun', artist: 'MelodyGen', duration: '2:55' },
];

export function AudioLibraryPanel() {
  return (
    <div className="p-4 space-y-3 h-full flex flex-col">
      <h3 className="font-headline text-sm font-medium text-muted-foreground px-1">Audio Library</h3>
      <Input type="search" placeholder="Search music..." className="h-8 text-xs" />
      <ScrollArea className="flex-grow">
        <div className="space-y-2 pr-3">
          {sampleTracks.map((track) => (
            <div
              key={track.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div>
                <p className="text-xs font-medium">{track.title}</p>
                <p className="text-xs text-muted-foreground">{track.artist}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{track.duration}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Icons.play className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
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
