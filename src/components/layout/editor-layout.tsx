
"use client"; // This component manages state for sidebars, so it's a client component

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { AppHeader } from '@/components/editor/app-header';
import { LeftPanel } from '@/components/editor/panels/left-panel';
import { MainContentPanel } from '@/components/editor/main-content-panel';
import { RightPanel } from '@/components/editor/panels/right-panel';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import type { UploadedMediaItem } from '@/components/editor/panels/media-library-panel'; // Import type

// Helper component to access sidebar context for toggling
function EditorHeaderWithToggle({ onToggleRightSidebar }: { onToggleRightSidebar: () => void }) {
  const leftSidebarContext = useSidebar();

  return (
    <AppHeader
      onToggleLeftSidebar={() => {
        if (leftSidebarContext.isMobile) {
          leftSidebarContext.setOpenMobile(!leftSidebarContext.openMobile);
        } else {
          leftSidebarContext.setOpen(!leftSidebarContext.open);
        }
      }}
      onToggleRightSidebar={onToggleRightSidebar}
    />
  );
}

export interface TimelineClip {
  id: string;
  name: string;
  start: number;
  duration: number;
  color: string;
  dataUri: string;
  mediaType: 'video' | 'image' | 'audio';
}

export interface TimelineTrack {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'text';
  clips: TimelineClip[];
}

const initialTracks: TimelineTrack[] = [
  {
    id: 'track1-video',
    name: 'Video Track 1',
    type: 'video',
    clips: [],
  },
  {
    id: 'track2-audio',
    name: 'Audio Track 1',
    type: 'audio',
    clips: [],
  },
  {
    id: 'track3-text',
    name: 'Text Layer 1',
    type: 'text',
    clips: [],
  },
];


export default function EditorLayout() {
  const [isClient, setIsClient] = React.useState(false);
  const [rightSidebarOpenMobile, setRightSidebarOpenMobile] = React.useState(false);
  const [activeLeftPanelTab, setActiveLeftPanelTab] = React.useState<string>("core");
  const [timelineTracks, setTimelineTracks] = React.useState<TimelineTrack[]>(initialTracks);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const addClipToTimeline = (mediaItem: UploadedMediaItem) => {
    setTimelineTracks(prevTracks => {
      const newTracks = [...prevTracks];
      let targetTrackType: 'video' | 'audio' = 'video';
      let clipColor = 'bg-primary/70'; // Default for video/image

      if (mediaItem.type.startsWith('audio/')) {
        targetTrackType = 'audio';
        clipColor = 'bg-green-500/70';
      } else if (mediaItem.type.startsWith('video/')) {
        targetTrackType = 'video';
        clipColor = 'bg-primary/70';
      } else if (mediaItem.type.startsWith('image/')) {
        targetTrackType = 'video'; // Images go on video tracks
        clipColor = 'bg-accent/70'; // Different color for images
      }

      let track = newTracks.find(t => t.type === targetTrackType);

      if (!track) { // Create a new track if none exists of this type
        track = {
          id: `track-${targetTrackType}-${Date.now()}`,
          name: `${targetTrackType.charAt(0).toUpperCase() + targetTrackType.slice(1)} Track ${newTracks.filter(t => t.type === targetTrackType).length + 1}`,
          type: targetTrackType,
          clips: [],
        };
        newTracks.push(track);
      }

      // Find the end time of the last clip on the target track
      const lastClipEndTime = track.clips.reduce((maxEnd, clip) => Math.max(maxEnd, clip.start + clip.duration), 0);

      const newClip: TimelineClip = {
        id: `clip-${mediaItem.id}-${Date.now()}`,
        name: mediaItem.title,
        start: lastClipEndTime, // Append to the end of the track
        duration: 5, // Default duration of 5 seconds
        color: clipColor,
        dataUri: mediaItem.dataUri,
        mediaType: mediaItem.type.startsWith('audio/') ? 'audio' : (mediaItem.type.startsWith('video/') ? 'video' : 'image'),
      };

      track.clips.push(newClip);
      return newTracks;
    });
  };


  if (!isClient) {
    return <div className="h-screen w-screen bg-background" />;
  }

  const toggleRightSidebarMobile = () => {
    setRightSidebarOpenMobile(prev => !prev);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <EditorHeaderWithToggle onToggleRightSidebar={toggleRightSidebarMobile} />
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <Sidebar side="left" variant="sidebar" collapsible="icon" className="w-80 md:w-72 lg:w-80 border-r">
            <LeftPanel
              activeTab={activeLeftPanelTab}
              onTabChange={setActiveLeftPanelTab}
              onAddClipToTimeline={addClipToTimeline}
            />
          </Sidebar>

          {/* Main Content Area */}
          <SidebarInset className="flex-1 overflow-auto">
            <MainContentPanel
              setActiveLeftPanelTab={setActiveLeftPanelTab}
              timelineTracks={timelineTracks}
            />
          </SidebarInset>

          {/* Right Sidebar - Desktop */}
          <div className="hidden md:flex md:w-72 lg:w-80 border-l flex-col bg-card/50">
            <RightPanel />
          </div>

          {/* Right Sidebar - Mobile (Sheet) */}
          {isClient && (
            <Sheet open={rightSidebarOpenMobile} onOpenChange={setRightSidebarOpenMobile}>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0 bg-card/50">
                <RightPanel />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
