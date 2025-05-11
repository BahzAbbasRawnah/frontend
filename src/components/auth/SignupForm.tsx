'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionaryClient';

interface SignupFormProps {
  lang: Locale;
  dictionary: Pick<Dictionary,
    'formEmailAddress' | 'signupPassword' | 'signupConfirmPassword' | 'signupButton' |
    'toastSignupSuccessfulTitle' | 'toastLoginSuccessfulDescription' | // using login redirect desc
    'toastSignupFailedTitle' | 'toastEmailInUse' | 'toastUnexpectedError'
  >;
}

// These messages from zod would ideally be translated too if the schema is built dynamically
const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupForm({ lang, dictionary }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormInputs) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: dictionary.toastSignupSuccessfulTitle, description: dictionary.toastLoginSuccessfulDescription });
      router.push(`/${lang}/dashboard`);
    } catch (error: any) {
      console.error('Signup error:', error);
       let errorMessage = dictionary.toastUnexpectedError;
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = dictionary.toastEmailInUse;
      }
      toast({
        title: dictionary.toastSignupFailedTitle,
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="email-signup">{dictionary.formEmailAddress}</Label>
        <Input
          id="email-signup"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="mt-1"
          disabled={isLoading}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive" role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="password-signup">{dictionary.signupPassword}</Label>
        <Input
          id="password-signup"
          type="password"
          autoComplete="new-password"
          {...register('password')}
          className="mt-1"
          disabled={isLoading}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && <p className="mt-1 text-sm text-destructive" role="alert">{errors.password.message}</p>}
      </div>

      <div>
        <Label htmlFor="confirmPassword">{dictionary.signupConfirmPassword}</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register('confirmPassword')}
          className="mt-1"
          disabled={isLoading}
          aria-invalid={errors.confirmPassword ? "true" : "false"}
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-destructive" role="alert">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <UserPlus className="mr-2 h-4 w-4" />
        )}
        {dictionary.signupButton}
      </Button>
    </form>
  );
}