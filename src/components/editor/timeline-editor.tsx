import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast'; 

export function TimelineEditor() {
  const { toast } = useToast(); 

  // Placeholder data for tracks and clips
  const tracks = [
    { 
      id: 'track1', 
      name: 'Video Track 1', 
      type: 'video', 
      clips: [
        { id: 'clipA', start: 0, duration: 5, color: 'bg-primary/70', name: 'Scene 1' },
        { id: 'clipB', start: 6, duration: 8, color: 'bg-accent/70', name: 'Interview' },
      ] 
    },
    { 
      id: 'track2', 
      name: 'Audio Track 1', 
      type: 'audio', 
      clips: [
        { id: 'clipC', start: 2, duration: 10, color: 'bg-green-500/70', name: 'Background Music' },
      ] 
    },
     { 
      id: 'track3', 
      name: 'Text Layer 1', 
      type: 'text', 
      clips: [
        { id: 'clipD', start: 1, duration: 4, color: 'bg-yellow-500/70', name: 'Title Card' },
      ] 
    },
  ];

  const totalDuration = 20; // seconds
  const pixelsPerSecond = 50;

  const handleTimelineAction = (actionName: string) => {
    toast({
      title: 'Timeline Action',
      description: `${actionName} clicked. (Placeholder)`,
    });
  };

  return (
    <div className="h-64 bg-muted/30 rounded-lg p-2 flex flex-col shadow-inner">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleTimelineAction('Split/Cut')}>
            <Icons.scissors className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleTimelineAction('Manage Layers')}>
            <Icons.layers className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleTimelineAction('Add Track/Media')}>
            <Icons.add className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">Zoom: 100%</div>
      </div>
      <ScrollArea className="flex-grow w-full relative"> {/* orientation="both" is not a direct prop for our ui/ScrollArea, Viewport handles overflow */}
        {/* Ruler */}
        <div className="sticky top-0 z-10 h-6 bg-background/50 border-b" style={{ width: `${totalDuration * pixelsPerSecond}px` }}>
          {Array.from({ length: totalDuration + 1 }).map((_, i) => (
            <div key={`ruler-${i}`} className="absolute top-0 h-full flex flex-col items-center" style={{ left: `${i * pixelsPerSecond - (i > 0 ? 0.5 : 0)}px` }}>
              <div className={`h-2 w-px ${i % 5 === 0 ? 'bg-foreground' : 'bg-muted-foreground/50'}`}></div>
              {i % 5 === 0 && (
                <span 
                  className="text-[10px] text-muted-foreground mt-0.5"
                  style={
                    i === 0 ? { transform: 'translateX(50%)' } : 
                    (i === totalDuration && totalDuration % 5 === 0) ? { transform: 'translateX(-50%)' } : {}
                  }
                >
                  {i}s
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Tracks */}
        <div className="pt-1 space-y-1" style={{ width: `${totalDuration * pixelsPerSecond}px` }}>
          {tracks.map(track => (
            <div key={track.id} className="h-12 rounded bg-background/30 relative flex items-center pl-2 border border-transparent hover:border-primary/50 group">
              <div className="absolute left-1 top-1 text-[10px] text-muted-foreground font-medium group-hover:text-primary">
                {track.type === 'video' && <Icons.video className="h-3 w-3 inline mr-1" />}
                {track.type === 'audio' && <Icons.volume2 className="h-3 w-3 inline mr-1" />}
                {track.type === 'text' && <Icons.type className="h-3 w-3 inline mr-1" />}
                {track.name}
              </div>
              {track.clips.map(clip => (
                <div
                  key={clip.id}
                  className={`absolute h-10 top-1/2 -translate-y-1/2 rounded-sm ${clip.color} flex items-center justify-center text-white text-[10px] px-1 overflow-hidden shadow-sm hover:ring-2 hover:ring-accent ring-offset-1 ring-offset-background/30`}
                  style={{ 
                    left: `${clip.start * pixelsPerSecond}px`, 
                    width: `${clip.duration * pixelsPerSecond}px` 
                  }}
                  title={clip.name}
                  onClick={() => toast({ title: 'Clip Selected', description: `${clip.name} on ${track.name} clicked.`})} 
                >
                  <span className="truncate">{clip.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
        {/* The default ScrollArea component already includes a vertical ScrollBar, so we don't need to add another one here. */}
      </ScrollArea>
    </div>
  );
}
