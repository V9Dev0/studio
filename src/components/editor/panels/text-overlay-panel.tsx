import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icons } from '@/components/icons';

const fontFamilies = ['Inter', 'Space Grotesk', 'Arial', 'Verdana', 'Georgia'];
const fontStyles = ['Normal', 'Bold', 'Italic', 'Bold Italic'];
const animations = ['None', 'Fade In', 'Slide Up', 'Zoom In'];

export function TextOverlayPanel() {
  return (
    <div className="p-4 space-y-4">
      <h3 className="font-headline text-sm font-medium text-muted-foreground px-1">Text Overlay</h3>
      
      <div>
        <Label htmlFor="text-content" className="text-xs">Text</Label>
        <Textarea id="text-content" placeholder="Enter your text..." rows={3} className="mt-1 text-xs" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="font-family" className="text-xs">Font</Label>
          <Select defaultValue="Inter">
            <SelectTrigger id="font-family" className="h-8 text-xs mt-1">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map(font => <SelectItem key={font} value={font} className="text-xs">{font}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="font-style" className="text-xs">Style</Label>
          <Select defaultValue="Normal">
            <SelectTrigger id="font-style" className="h-8 text-xs mt-1">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {fontStyles.map(style => <SelectItem key={style} value={style} className="text-xs">{style}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="font-size" className="text-xs">Size (px)</Label>
          <Input id="font-size" type="number" defaultValue={24} className="h-8 text-xs mt-1" />
        </div>
        <div>
          <Label htmlFor="font-color" className="text-xs">Color</Label>
          <Input id="font-color" type="color" defaultValue="#FFFFFF" className="h-8 w-full mt-1 p-1" />
        </div>
      </div>
      
      <div>
        <Label htmlFor="text-animation" className="text-xs">Animation</Label>
        <Select defaultValue="None">
          <SelectTrigger id="text-animation" className="h-8 text-xs mt-1">
            <SelectValue placeholder="Select animation" />
          </SelectTrigger>
          <SelectContent>
            {animations.map(anim => <SelectItem key={anim} value={anim} className="text-xs">{anim}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Button size="sm" className="w-full">
        <Icons.add className="mr-2 h-4 w-4" /> Add Text to Timeline
      </Button>
    </div>
  );
}
