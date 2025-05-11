'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/getDictionary';

interface LoginFormProps {
  lang: Locale;
  dictionary: Pick<Dictionary, 
    'formEmailAddress' | 'signupPassword' | 'loginSignInButton' | 
    'toastLoginSuccessfulTitle' | 'toastLoginSuccessfulDescription' | 
    'toastLoginFailedTitle' | 'toastInvalidEmailPassword' | 'toastUnexpectedError'
  >;
}

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }), // This message could be translated too if schema is lang-dependent
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginForm({ lang, dictionary }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({ title: dictionary.toastLoginSuccessfulTitle, description: dictionary.toastLoginSuccessfulDescription });
      router.push(`/${lang}/dashboard`);
    } catch (error: any) {
      console.error('Login error:', error);
      let errorMessage = dictionary.toastUnexpectedError;
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = dictionary.toastInvalidEmailPassword;
      } else if (error.message) {
        // Firebase often provides localized messages, but we might prefer our own for consistency
        // For now, let's use our generic one if it's not a known code.
      }
      toast({
        title: dictionary.toastLoginFailedTitle,
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
        <Label htmlFor="email">{dictionary.formEmailAddress}</Label>
        <Input
          id="email"
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
        <Label htmlFor="password">{dictionary.signupPassword}</Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          className="mt-1"
          disabled={isLoading}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && <p className="mt-1 text-sm text-destructive" role="alert">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <LogIn className="mr-2 h-4 w-4" />
        )}
        {dictionary.loginSignInButton}
      </Button>
    </form>
  );
}