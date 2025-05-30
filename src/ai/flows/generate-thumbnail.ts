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
      'A representative frame from the video, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'    ),
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

const prompt = ai.definePrompt({
  name: 'generateThumbnailPrompt',
  input: {schema: GenerateThumbnailInputSchema},
  output: {schema: GenerateThumbnailOutputSchema},
  prompt: `You are an expert in creating engaging video thumbnails.

  Given the following video description and a representative frame, generate three different thumbnail suggestions. 
  Each suggestion should include a data URI for the thumbnail and a brief explanation of why it would make a good thumbnail.

  Video Description: {{{videoDescription}}}
  Representative Frame: {{media url=videoDataUri}}

  Ensure that the thumbnails are visually appealing and relevant to the video content.
  Format your response as a JSON object with a 'thumbnailSuggestions' field. This field should be an array of objects. Each object should contain 'thumbnailDataUri' (the data URI of the thumbnail) and 'reason' (the AI reason for suggesting this thumbnail).
  `,
});

const generateThumbnailFlow = ai.defineFlow(
  {
    name: 'generateThumbnailFlow',
    inputSchema: GenerateThumbnailInputSchema,
    outputSchema: GenerateThumbnailOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
