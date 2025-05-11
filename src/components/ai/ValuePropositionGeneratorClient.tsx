'use client';

import { useState } from 'react';
import { valuePropGenerator, ValuePropGeneratorInput } from '@/ai/flows/value-prop-generator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';

export default function ValuePropositionGeneratorClient() {
  const [technologies, setTechnologies] = useState('');
  const [valuePropositions, setValuePropositions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!technologies.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please enter some technologies.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setValuePropositions(''); // Clear previous results

    try {
      const input: ValuePropGeneratorInput = { technologies };
      const result = await valuePropGenerator(input);
      if (result && result.valuePropositions) {
        setValuePropositions(result.valuePropositions);
        toast({
          title: 'Success!',
          description: 'Value propositions generated.',
        });
      } else {
        throw new Error('No propositions returned from AI.');
      }
    } catch (error) {
      console.error('Error generating value propositions:', error);
      toast({
        title: 'Error',
        description: (error as Error).message || 'Failed to generate value propositions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" />
          <CardTitle className="text-2xl font-semibold text-primary">AI Value Proposition Generator</CardTitle>
        </div>
        <CardDescription>
          Enter technologies used in your project idea to see why clients might prefer your team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-foreground mb-1">
              Technologies (comma-separated)
            </label>
            <Input
              id="technologies"
              type="text"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="e.g., React, Next.js, Python, Docker"
              className="w-full"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Propositions
              </>
            )}
          </Button>
        </form>

        {valuePropositions && (
          <div className="mt-8 p-6 border border-border rounded-md bg-secondary/30">
            <h3 className="text-lg font-semibold mb-2 text-primary">Generated Value Propositions:</h3>
            <Textarea
              readOnly
              value={valuePropositions}
              className="min-h-[150px] bg-background text-sm"
              rows={Math.min(15, valuePropositions.split('\n').length + 2)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
