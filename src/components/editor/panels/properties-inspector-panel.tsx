import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

export function PropertiesInspectorPanel() {
  // Placeholder state - in a real app, this would come from selected element
  const selectedElement = {
    type: 'video_clip',
    name: 'Clip_001.mp4',
    duration: '10.5s',
    opacity: 80,
    scale: 100,
    positionX: 0,
    positionY: 0,
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-headline text-sm font-medium text-muted-foreground px-1">Properties</h3>
      
      {selectedElement ? (
        <div className="space-y-4">
          <div>
            <Label className="text-xs">Name</Label>
            <Input defaultValue={selectedElement.name} className="h-8 text-xs mt-1" readOnly />
          </div>
          <div>
            <Label className="text-xs">Duration</Label>
            <Input defaultValue={selectedElement.duration} className="h-8 text-xs mt-1" readOnly />
          </div>
          
          <Separator />

          <div className="space-y-1">
            <Label htmlFor="opacity-slider" className="text-xs">Opacity: {selectedElement.opacity}%</Label>
            <Slider
              id="opacity-slider"
              defaultValue={[selectedElement.opacity]}
              max={100}
              step={1}
              className="my-2"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="scale-slider" className="text-xs">Scale: {selectedElement.scale}%</Label>
            <Slider
              id="scale-slider"
              defaultValue={[selectedElement.scale]}
              max={200}
              min={10}
              step={1}
              className="my-2"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="position-x" className="text-xs">Position X</Label>
              <Input id="position-x" type="number" defaultValue={selectedElement.positionX} className="h-8 text-xs mt-1" />
            </div>
            <div>
              <Label htmlFor="position-y" className="text-xs">Position Y</Label>
              <Input id="position-y" type="number" defaultValue={selectedElement.positionY} className="h-8 text-xs mt-1" />
            </div>
          </div>

        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center py-8">Select an element on the timeline to see its properties.</p>
      )}
    </div>
  );
}
