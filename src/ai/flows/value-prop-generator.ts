'use server';
/**
 * @fileOverview A value proposition generator AI agent.
 *
 * - valuePropGenerator - A function that handles the value proposition generation process.
 * - ValuePropGeneratorInput - The input type for the valuePropGenerator function.
 * - ValuePropGeneratorOutput - The return type for the valuePropGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValuePropGeneratorInputSchema = z.object({
  technologies: z
    .string()
    .describe('A comma separated list of technologies used in the project idea.'),
});
export type ValuePropGeneratorInput = z.infer<typeof ValuePropGeneratorInputSchema>;

const ValuePropGeneratorOutputSchema = z.object({
  valuePropositions: z
    .string()
    .describe('Reasons why a client might prefer our programming team over others.'),
});
export type ValuePropGeneratorOutput = z.infer<typeof ValuePropGeneratorOutputSchema>;

export async function valuePropGenerator(input: ValuePropGeneratorInput): Promise<ValuePropGeneratorOutput> {
  return valuePropGeneratorFlow(input);
}

const persuasiveReasons = ai.defineTool({
  name: 'persuasiveReasons',
  description: 'Identifies which reasons for preference are more persuasive to clients.',
  inputSchema: z.object({
    reasons: z.string().describe('A list of reasons to evaluate for persuasiveness.'),
  }),
  outputSchema: z.string().describe('The most persuasive reasons for preferring our team.'),
},
async (input) => {
  // Placeholder implementation - replace with actual logic to evaluate persuasiveness
  return `The most persuasive reasons are: ${input.reasons}`;
});

const valuePropGeneratorPrompt = ai.definePrompt({
  name: 'valuePropGeneratorPrompt',
  input: {schema: ValuePropGeneratorInputSchema},
  output: {schema: ValuePropGeneratorOutputSchema},
  tools: [persuasiveReasons],
  prompt: `You are a marketing expert tasked with creating compelling value propositions for a programming team.

  Given the technologies used in a client's project idea, generate reasons why the client might prefer our programming team over others.

  Use the persuasiveReasons tool to identify the most persuasive reasons from the generated list.

  Technologies: {{{technologies}}}
  `,
});

const valuePropGeneratorFlow = ai.defineFlow(
  {
    name: 'valuePropGeneratorFlow',
    inputSchema: ValuePropGeneratorInputSchema,
    outputSchema: ValuePropGeneratorOutputSchema,
  },
  async input => {
    const {output} = await valuePropGeneratorPrompt(input);
    return output!;
  }
);
