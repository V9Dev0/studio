
import React from 'react'; // Added React import
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { TimelineTrack } from '@/components/layout/editor-layout'; // Import type

interface TimelineEditorProps {
  setActiveLeftPanelTab?: (tab: string) => void;
  tracks: TimelineTrack[];
}

export function TimelineEditor({ setActiveLeftPanelTab, tracks = [] }: TimelineEditorProps) {
  const { toast } = useToast();

  const pixelsPerSecond = 50;

  // Calculate total duration based on the maximum end time of all clips across all tracks
  const totalDuration = React.useMemo(() => {
    let maxEndTime = 20; // Default minimum duration
    tracks.forEach(track => {
      track.clips.forEach(clip => {
        maxEndTime = Math.max(maxEndTime, clip.start + clip.duration);
      });
    });
    return Math.ceil(maxEndTime); // Round up to the nearest second
  }, [tracks]);


  const handleTimelineAction = (actionName: string, tabToOpen?: string) => {
    if (tabToOpen && setActiveLeftPanelTab) {
      setActiveLeftPanelTab(tabToOpen);
      toast({
        title: 'Navigation',
        description: `Opened ${actionName} panel.`,
      });
    } else {
      toast({
        title: 'Timeline Action',
        description: `${actionName} clicked. (Placeholder)`,
      });
    }
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
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleTimelineAction('Media Library', 'media')}>
            <Icons.add className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">Zoom: 100%</div> {/* This could be dynamic later */}
      </div>
      <ScrollArea className="flex-grow w-full relative" orientation="both"> {/* Ensure orientation="both" or remove if ScrollBar specifies */}
        <div className="sticky top-0 z-10 h-6 bg-muted/50 border-b" style={{ width: `${totalDuration * pixelsPerSecond}px` }}>
          {Array.from({ length: totalDuration + 1 }).map((_, i) => (
            <div key={`ruler-${i}`} className="absolute top-0 h-full flex flex-col items-center" style={{ left: `${i * pixelsPerSecond - (i > 0 ? 0.5 : 0)}px` }}>
              <div className={`h-2 w-px ${i % 5 === 0 ? 'bg-foreground' : 'bg-muted-foreground/50'}`}></div>
              {i % 5 === 0 && (
                <span
                  className="text-[10px] text-muted-foreground mt-0.5 select-none"
                   style={
                    i === 0 && totalDuration > 0 ? { transform: 'translateX(calc(50% - 1px))', paddingLeft: '2px' } :
                    (i === totalDuration && totalDuration > 0 && totalDuration % 5 === 0) ? { transform: 'translateX(calc(-50% + 1px))', paddingRight: '2px' } :
                    (i > 0 && i < totalDuration && totalDuration > 0) ? { transform: 'translateX(-50%)' } : {}
                  }
                >
                  {i}s
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="pt-1 space-y-1" style={{ width: `${totalDuration * pixelsPerSecond}px`, minHeight: 'calc(100% - 1.5rem)' /* Ensure tracks take up space */ }}>
          {tracks.map(track => (
            <div key={track.id} className="h-12 rounded bg-background/30 relative flex items-center pl-2 border border-transparent hover:border-primary/50 group">
              <div className="absolute left-1 top-1 text-[10px] text-muted-foreground font-medium group-hover:text-primary select-none">
                {track.type === 'video' && <Icons.video className="h-3 w-3 inline mr-1" />}
                {track.type === 'audio' && <Icons.volume2 className="h-3 w-3 inline mr-1" />}
                {track.type === 'text' && <Icons.type className="h-3 w-3 inline mr-1" />}
                {track.name}
              </div>
              {track.clips.map(clip => (
                <div
                  key={clip.id}
                  className={`absolute h-10 top-1/2 -translate-y-1/2 rounded-sm ${clip.color} flex items-center justify-center text-white text-[10px] px-1 overflow-hidden shadow-sm hover:ring-2 hover:ring-accent ring-offset-1 ring-offset-background/30 cursor-pointer`}
                  style={{
                    left: `${clip.start * pixelsPerSecond}px`,
                    width: `${Math.max(10, clip.duration * pixelsPerSecond)}px` // Ensure minimum clip width for visibility
                  }}
                  title={clip.name}
                  onClick={() => toast({ title: 'Clip Selected', description: `${clip.name} on ${track.name} clicked.`})}
                >
                  <span className="truncate select-none">{clip.name}</span>
                </div>
              ))}
            </div>
          ))}
          {tracks.length === 0 && (
            <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
              Timeline is empty. Add media from the Media Library.
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
        {/* Removed explicit vertical ScrollBar as ScrollArea handles it if content overflows */}
      </ScrollArea>
    </div>
  );
}
