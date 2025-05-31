
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
      const newTracks = [...prevTracks]; // Create a mutable copy of the tracks array
      let targetTrackType: 'video' | 'audio' = 'video';
      let clipColor = 'bg-primary/70';

      // Determine target track type and color based on media type
      if (mediaItem.type.startsWith('audio/')) {
        targetTrackType = 'audio';
        clipColor = 'bg-green-500/70';
      } else if (mediaItem.type.startsWith('image/')) {
        // Images go on video tracks but can have a different color
        targetTrackType = 'video';
        clipColor = 'bg-accent/70'; 
      }
      // Video remains default bg-primary/70

      // Find the target track or create it if it doesn't exist
      let trackIndex = newTracks.findIndex(t => t.type === targetTrackType);
      let trackToUpdate: TimelineTrack;

      if (trackIndex === -1) {
        // Create a new track if none of the target type exists
        const newTrackId = `track-${targetTrackType}-${Date.now()}`;
        trackToUpdate = {
          id: newTrackId,
          name: `${targetTrackType.charAt(0).toUpperCase() + targetTrackType.slice(1)} Track ${newTracks.filter(t => t.type === targetTrackType).length + 1}`,
          type: targetTrackType,
          clips: [],
        };
        newTracks.push(trackToUpdate);
        trackIndex = newTracks.length - 1; // Update trackIndex to the new track's index
      } else {
        // Important: Create a shallow copy of the track and its clips to ensure immutability
        trackToUpdate = {
          ...newTracks[trackIndex],
          clips: [...newTracks[trackIndex].clips],
        };
      }

      // Calculate the start time for the new clip (append to the end of the track)
      const lastClipEndTime = trackToUpdate.clips.reduce((maxEnd, clip) => Math.max(maxEnd, clip.start + clip.duration), 0);

      const newClip: TimelineClip = {
        id: `clip-${mediaItem.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, // Enhanced unique ID
        name: mediaItem.title,
        start: lastClipEndTime,
        duration: 5, // Default duration
        color: clipColor,
        dataUri: mediaItem.dataUri,
        mediaType: mediaItem.type.startsWith('audio/') ? 'audio' : (mediaItem.type.startsWith('video/') ? 'video' : 'image'),
      };

      // Add the new clip to the (copied) track's clips array
      trackToUpdate.clips.push(newClip);

      // Replace the old track with the updated track in the newTracks array
      newTracks[trackIndex] = trackToUpdate;

      return newTracks; // Return the new state
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
