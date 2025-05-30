import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertiesInspectorPanel } from './properties-inspector-panel';
import { TextOverlayPanel } from './text-overlay-panel';
import { ThumbnailGeneratorPanel } from './thumbnail-generator-panel';
import { Icons } from '@/components/icons';
import { ScrollArea } from '@/components/ui/scroll-area';

export function RightPanel() {
  return (
    <div className="h-full flex flex-col bg-card/50">
      <Tabs defaultValue="properties" className="flex flex-col flex-grow">
        <TabsList className="grid w-full grid-cols-3 rounded-none border-b h-12">
          <TabsTrigger value="properties" className="text-xs rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Icons.sliders className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
            Inspect
          </TabsTrigger>
          <TabsTrigger value="text" className="text-xs rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Icons.type className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
            Text
          </TabsTrigger>
          <TabsTrigger value="thumbnail" className="text-xs rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
            <Icons.image className="h-4 w-4 mr-1.5 hidden sm:inline-block" />
            Thumbnail
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-grow">
          <TabsContent value="properties" className="mt-0">
            <PropertiesInspectorPanel />
          </TabsContent>
          <TabsContent value="text" className="mt-0">
            <TextOverlayPanel />
          </TabsContent>
          <TabsContent value="thumbnail" className="mt-0">
            <ThumbnailGeneratorPanel />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
