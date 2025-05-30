import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

const tools = [
  { name: 'Trim', icon: Icons.scissors, action: () => console.log('Trim action') },
  { name: 'Cut', icon: Icons.scissors, action: () => console.log('Cut action') },
  { name: 'Merge', icon: Icons.gitMerge, action: () => console.log('Merge action') },
  { name: 'Crop', icon: Icons.crop, action: () => console.log('Crop action') },
  { name: 'Rotate', icon: Icons.rotateCcw, action: () => console.log('Rotate action') },
  { name: 'Speed', icon: Icons.gauge, action: () => console.log('Speed action') },
];

export function CoreToolsPanel() {
  return (
    <TooltipProvider>
      <div className="p-4 space-y-3">
        <h3 className="font-headline text-sm font-medium text-muted-foreground px-1">Editing Tools</h3>
        <div className="grid grid-cols-3 gap-2">
          {tools.map((tool) => (
            <Tooltip key={tool.name}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex flex-col items-center justify-center h-auto aspect-square p-2"
                  onClick={tool.action}
                >
                  <tool.icon className="h-6 w-6 mb-1" />
                  <span className="text-xs">{tool.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tool.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}
