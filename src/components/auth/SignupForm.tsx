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
import { Label } from '@/components/ui/label'; // Corrected: FormLabel is part of a Form context, use Label directly
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus } from 'lucide-react';

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupForm() {
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
      toast({ title: 'Signup Successful', description: 'Redirecting to dashboard...' });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
       let errorMessage = 'An unexpected error occurred.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast({
        title: 'Signup Failed',
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
        <Label htmlFor="email-signup">Email Address</Label> {/* Changed ID to avoid conflict if on same page as login */}
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
        <Label htmlFor="password-signup">Password</Label> {/* Changed ID */}
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
        <Label htmlFor="confirmPassword">Confirm Password</Label>
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
        Sign Up
      </Button>
    </form>
  );
}
