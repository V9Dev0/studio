import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CoreToolsPanel } from './core-tools-panel';
import { AiToolsPanel } from './ai-tools-panel';
import { AudioLibraryPanel } from './audio-library-panel';
import { Icons } from '@/components/icons';
import { ScrollArea } from '@/components/ui/scroll-area';

export function LeftPanel() {
  return (
    <div className="h-full flex flex-col bg-card/50">
      <Tabs defaultValue="core" className="flex flex-col flex-grow">
        <TabsList className="grid w-full grid-cols-3 rounded-none border-b h-12">
          <TabsTrigger value="core" className="text-xs rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Icons.edit className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
            Tools
          </TabsTrigger>
          <TabsTrigger value="ai" className="text-xs rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Icons.wand2 className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
            AI Magic
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
          <TabsContent value="audio" className="mt-0 h-[calc(100vh-theme(spacing.16)-theme(spacing.12)-1px)]"> {/* Adjust height based on header and tabslist */}
            <AudioLibraryPanel />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
