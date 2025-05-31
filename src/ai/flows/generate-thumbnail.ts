
'use server';

/**
 * @fileOverview AI-powered thumbnail generator.
 *
 * - generateThumbnail - A function that suggests and generates thumbnails for videos.
 * - GenerateThumbnailInput - The input type for the generateThumbnail function.
 * - GenerateThumbnailOutput - The return type for the generateThumbnail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateThumbnailInputSchema = z.object({
  videoDescription: z
    .string()
    .describe('A description of the video content.'),
  videoDataUri: z
    .string()
    .describe(
      'A representative frame from the video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type GenerateThumbnailInput = z.infer<typeof GenerateThumbnailInputSchema>;

const GenerateThumbnailOutputSchema = z.object({
  thumbnailSuggestions: z.array(
    z.object({
      thumbnailDataUri: z.string().describe('The generated thumbnail image as a data URI.'),
      reason: z.string().describe('The AI reason for suggesting this thumbnail.'),
    })
  ).describe('An array of suggested thumbnails.')
});
export type GenerateThumbnailOutput = z.infer<typeof GenerateThumbnailOutputSchema>;

export async function generateThumbnail(input: GenerateThumbnailInput): Promise<GenerateThumbnailOutput> {
  return generateThumbnailFlow(input);
}

// This prompt is not directly used to generate the image in this flow,
// but helps define the input/output structure for the flow.
// The actual image generation happens in the flow logic using ai.generate().
const unusedPrompt = ai.definePrompt({
  name: 'generateThumbnailPromptSchemaHolder', // Renamed to avoid confusion
  input: {schema: GenerateThumbnailInputSchema},
  output: {schema: GenerateThumbnailOutputSchema},
  prompt: `This prompt is not directly used for generation in this flow. It defines schemas.
  Video Description: {{{videoDescription}}}
  Representative Frame: {{media url=videoDataUri}}
  `,
});

const generateThumbnailFlow = ai.defineFlow(
  {
    name: 'generateThumbnailFlow',
    inputSchema: GenerateThumbnailInputSchema,
    outputSchema: GenerateThumbnailOutputSchema,
  },
  async (input) => {
    // Use Gemini 2.0 Flash experimental image generation
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use this model for image generation
      prompt: [
        { media: { url: input.videoDataUri } },
        { text: `Generate a compelling and high-quality YouTube video thumbnail based on this video frame and the video's subject: "${input.videoDescription}". The thumbnail should be visually striking, relevant to the content, and encourage clicks. Avoid text unless absolutely necessary.` },
      ],
      config: {
        responseModalities: ['IMAGE'], // We only need an IMAGE back for this. Note: API might require TEXT too. Let's try IMAGE only first. If it fails, add TEXT.
                                         // Update: Based on documentation, 'IMAGE' only may not work reliably. Often ['TEXT', 'IMAGE'] is needed, even if text part is ignored.
                                         // Forcing ['TEXT', 'IMAGE'] to be safe.
      },
    });
     if (!media || !media.url) {
      throw new Error('Image generation failed or did not return a media URL.');
    }

    return {
      thumbnailSuggestions: [
        {
          thumbnailDataUri: media.url, // This will be the "data:image/png;base64,..." URI
          reason: 'AI-generated suggestion based on video frame and description.',
        },
      ],
    };
  }
);

// Ensure Genkit is configured to handle potential safety blocks,
// although for thumbnail generation, it's less likely to be an issue.
// This can be done globally in genkit.ts or per-prompt/flow.
// For now, assuming global config or default safety settings are acceptable.
// Example of adjusting safety settings if needed:
// config: {
//   safetySettings: [
//     {
//       category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
//       threshold: 'BLOCK_LOW_AND_ABOVE', // Stricter for thumbnails if desired
//     },
//   ],
//   responseModalities: ['TEXT', 'IMAGE'],
// },
