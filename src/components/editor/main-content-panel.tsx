import { VideoPreview } from './video-preview';
import { TimelineEditor } from './timeline-editor';

export function MainContentPanel() {
  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex-grow-[2] min-h-0"> {/* Video preview takes more space */}
        <VideoPreview />
      </div>
      <div className="flex-grow-[1] min-h-0"> {/* Timeline takes less space */}
        <TimelineEditor />
      </div>
    </div>
  );
}
