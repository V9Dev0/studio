
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CoreToolsPanel } from './core-tools-panel';
import { AiToolsPanel } from './ai-tools-panel';
import { AudioLibraryPanel } from './audio-library-panel';
import { MediaLibraryPanel } from './media-library-panel'; // Import MediaLibraryPanel
import { Icons } from '@/components/icons';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LeftPanelProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function LeftPanel({ activeTab, onTabChange }: LeftPanelProps) {
  const panelContentHeight = "h-[calc(100vh-theme(spacing.16)-theme(spacing.12)-1px)]"; // Calculated height for scrollable content

  return (
    <div className="h-full flex flex-col bg-card/50">
      <Tabs value={activeTab} onValueChange={onTabChange} className="flex flex-col flex-grow">
        <TabsList className="grid w-full grid-cols-4 rounded-none border-b h-12"> {/* Changed to grid-cols-4 */}
          <TabsTrigger value="core" className="text-xs rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Icons.edit className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
            Tools
          </TabsTrigger>
          <TabsTrigger value="ai" className="text-xs rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Icons.wand2 className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
            AI Magic
          </TabsTrigger>
          <TabsTrigger value="media" className="text-xs rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"> {/* New Media Tab */}
            <Icons.fileVideo className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
            Media
          </TabsTrigger>
          <TabsTrigger value="audio" className="text-xs rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Icons.music2 className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
            Audio
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-grow">
          <TabsContent value="core" className="mt-0">
            <CoreToolsPanel />
          </TabsContent>
          <TabsContent value="ai" className="mt-0">
            <AiToolsPanel />
          </TabsContent>
          <TabsContent value="media" className={`mt-0 ${panelContentHeight}`}> {/* New Media Content */}
            <MediaLibraryPanel />
          </TabsContent>
          <TabsContent value="audio" className={`mt-0 ${panelContentHeight}`}>
            <AudioLibraryPanel />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
