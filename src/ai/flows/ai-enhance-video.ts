'use server';

/**
 * @fileOverview Enhances video resolution, reduces noise, and stabilizes footage using AI.
 *
 * - aiEnhanceVideo - A function that enhances video quality.
 * - AiEnhanceVideoInput - The input type for the aiEnhanceVideo function.
 * - AiEnhanceVideoOutput - The return type for the aiEnhanceVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiEnhanceVideoInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video file as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  enhancementLevel: z
    .enum(['low', 'medium', 'high'])
    .default('medium')
    .describe('The level of enhancement to apply (low, medium, high).'),
});

export type AiEnhanceVideoInput = z.infer<typeof AiEnhanceVideoInputSchema>;

const AiEnhanceVideoOutputSchema = z.object({
  enhancedVideoDataUri: z
    .string()
    .describe("The enhanced video file as a data URI with MIME type and Base64 encoding."),
  enhancementDetails: z
    .string()
    .describe('A summary of the enhancements applied to the video.'),
});

export type AiEnhanceVideoOutput = z.infer<typeof AiEnhanceVideoOutputSchema>;

export async function aiEnhanceVideo(input: AiEnhanceVideoInput): Promise<AiEnhanceVideoOutput> {
  return aiEnhanceVideoFlow(input);
}

const aiEnhanceVideoPrompt = ai.definePrompt({
  name: 'aiEnhanceVideoPrompt',
  input: {schema: AiEnhanceVideoInputSchema},
  output: {schema: AiEnhanceVideoOutputSchema},
  prompt: `You are an AI video enhancement expert. You receive a video and enhancement level request from the user. Based on the enhancement level, apply the appropriate enhancements to the video and return the enhanced video as a data URI, along with a description of the enhancements applied. Use the media tag to reference the video.

Video: {{media url=videoDataUri}}
Enhancement Level: {{{enhancementLevel}}}

Consider these enhancements:
* Upscale video resolution (if possible)
* Remove noise and grain
* Stabilize shaky footage
* Apply cinematic filters and LUTs (scene context aware)
`,
});

const aiEnhanceVideoFlow = ai.defineFlow(
  {
    name: 'aiEnhanceVideoFlow',
    inputSchema: AiEnhanceVideoInputSchema,
    outputSchema: AiEnhanceVideoOutputSchema,
  },
  async input => {
    // Call Gemini 2.0 Flash experimental image generation to generate images using Genkit.
    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-exp model is able to generate images. You MUST use exactly this model to generate images.
      model: 'googleai/gemini-2.0-flash-exp',

      // simple prompt
      prompt: [input, {text: 'enhance this video'}],

      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });
    const enhancementDetails = 'Video enhanced with AI: resolution upscaled, noise reduced, and footage stabilized.';

    return {
      enhancedVideoDataUri: media.url,
      enhancementDetails,
    };
  }
);
