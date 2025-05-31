
import { VideoPreview } from './video-preview';
import { TimelineEditor } from './timeline-editor';
import type { TimelineTrack } from '@/components/layout/editor-layout'; // Import type

interface MainContentPanelProps {
  setActiveLeftPanelTab: (tab: string) => void;
  timelineTracks: TimelineTrack[];
}

export function MainContentPanel({ setActiveLeftPanelTab, timelineTracks }: MainContentPanelProps) {
  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex-grow-[2] min-h-0"> {/* Video preview takes more space */}
        <VideoPreview />
      </div>
      <div className="flex-grow-[1] min-h-0"> {/* Timeline takes less space */}
        <TimelineEditor setActiveLeftPanelTab={setActiveLeftPanelTab} tracks={timelineTracks} />
      </div>
    </div>
  );
}
