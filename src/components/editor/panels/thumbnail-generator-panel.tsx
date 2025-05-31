
import React, { useState } from 'react'; // Added import for React
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea'; // Import Textarea
import { Label } from '@/components/ui/label'; // Import Label
import { generateThumbnail, type GenerateThumbnailOutput } from '@/ai/flows/generate-thumbnail'; // Import the actual flow

export function ThumbnailGeneratorPanel() {
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<GenerateThumbnailOutput['thumbnailSuggestions']>([]);
  const [videoDescription, setVideoDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateThumbnails = async () => {
    if (!videoDescription.trim()) {
      toast({
        title: "Missing Description",
        description: "Please enter a video description to generate thumbnails.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    toast({
      title: "Generating Thumbnails...",
      description: "AI is working its magic. This might take a moment.",
    });

    // --- Placeholder for videoDataUri ---
    // In a real app, you would get this from the selected media item in the MediaLibraryPanel
    // or allow the user to pick a frame from a video.
    // For now, using a generic placeholder image data URI.
    // This is a 1x1 transparent PNG. Replace with a more meaningful placeholder or actual frame data.
    const placeholderVideoFrameDataUri = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    // --- End Placeholder ---

    try {
      const result = await generateThumbnail({
        videoDataUri: placeholderVideoFrameDataUri, // Using placeholder for now
        videoDescription: videoDescription,
      });
      setSuggestions(result.thumbnailSuggestions);
      toast({ title: "Thumbnails Generated!", description: "Choose your favorite or generate more." });
    } catch (error) {
      console.error("Thumbnail generation error:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: "Thumbnail Generation Failed",
        description: `Could not generate thumbnails: ${errorMessage}`,
        variant: "destructive",
      });
      setSuggestions([]); // Clear previous suggestions on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseThumbnail = (index: number) => {
    toast({
      title: "Thumbnail Selected",
      description: `Using thumbnail suggestion ${index + 1}. (Placeholder for applying it)`,
    });
    // In a real app, this would set the project's thumbnail,
    // potentially saving the selected data URI or uploading it.
  };

  return (
    <div className="p-4 space-y-4">
      <h3 className="font-headline text-sm font-medium text-muted-foreground px-1">AI Thumbnail Generator</h3>

      <div className="space-y-1">
        <Label htmlFor="video-description-thumb" className="text-xs">Video Description</Label>
        <Textarea
          id="video-description-thumb"
          placeholder="e.g., Epic drone shots of a mountain range at sunset."
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
          rows={3}
          className="text-xs"
        />
      </div>

      <Button size="sm" className="w-full" onClick={handleGenerateThumbnails} disabled={isLoading}>
        {isLoading ? (
          <>
            <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Icons.image className="mr-2 h-4 w-4" /> Generate Thumbnails
          </>
        )}
      </Button>

      {suggestions.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-medium">Suggestions:</h4>
          {suggestions.map((suggestion, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Image
                    src={suggestion.thumbnailDataUri}
                    alt={`Suggested thumbnail ${index + 1}`}
                    width={160} // Increased size for better preview
                    height={90}  // Maintain 16:9 aspect ratio
                    className="rounded-sm border aspect-video object-contain bg-muted/20" // object-contain to see full image
                    data-ai-hint={suggestion.dataAiHint || `ai generated thumbnail ${index + 1}`}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <p className="text-xs text-muted-foreground italic mb-1 sm:mb-0">{suggestion.reason}</p>
                    <Button variant="outline" size="xs" className="text-xs w-full sm:w-auto mt-2 sm:mt-0" onClick={() => handleUseThumbnail(index)}>Use this thumbnail</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {isLoading && suggestions.length === 0 && (
         <div className="text-center text-xs text-muted-foreground py-4">
            <Icons.loader className="mx-auto h-6 w-6 animate-spin mb-2" />
            AI is crafting your thumbnails...
        </div>
      )}
    </div>
  );
}
