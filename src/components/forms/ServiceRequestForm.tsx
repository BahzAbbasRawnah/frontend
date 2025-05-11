'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { submitServiceRequest, ServiceRequestInput } from '@/lib/actions';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { Dictionary } from '@/lib/getDictionary';

interface ServiceRequestFormProps {
  dictionary: Pick<Dictionary, 
    'formFullName' | 'formEmailAddress' | 'formCompanyOptional' | 'formProjectDescription' |
    'formProjectDescriptionHint' | 'formBudgetOptional' | 'formTimelineOptional' |
    'formSendRequestButton' | 'formSubmittingButton' |
    'toastRequestSubmittedTitle' | 'toastSubmissionFailedTitle' | 'toastUnexpectedError'
  >;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  company: z.string().optional(),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }).max(2000, {message: 'Description must be less than 2000 characters.'}),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export default function ServiceRequestForm({ dictionary }: ServiceRequestFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ServiceRequestInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      description: '',
      budget: '',
      timeline: '',
    },
  });

  async function onSubmit(values: ServiceRequestInput) {
    setIsLoading(true);
    try {
      const result = await submitServiceRequest(values);
      if (result.success) {
        toast({
          title: dictionary.toastRequestSubmittedTitle,
          description: result.message, // Message from action can be translated there or be generic
        });
        form.reset();
      } else {
        toast({
          title: dictionary.toastSubmissionFailedTitle,
          description: result.message || dictionary.toastUnexpectedError,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: dictionary.toastErrorTitle || "Error", // Fallback if not in picked dictionary
        description: dictionary.toastUnexpectedError,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary.formFullName}</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary.formEmailAddress}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.formCompanyOptional}</FormLabel>
              <FormControl>
                <Input placeholder="Your Company Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.formProjectDescription}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {dictionary.formProjectDescriptionHint}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary.formBudgetOptional}</FormLabel>
                <FormControl>
                  <Input placeholder="$5,000 - $10,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary.formTimelineOptional}</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3-6 months" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 rtl:ml-2 h-4 w-4 animate-spin" />
              {dictionary.formSubmittingButton}
            </>
          ) : (
            dictionary.formSendRequestButton
          )}
        </Button>
      </form>
    </Form>
  );
}