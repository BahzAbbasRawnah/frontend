import SignupForm from '@/components/auth/SignupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-14rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
         <Card className="shadow-xl rounded-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-primary">Create an Account</CardTitle>
            <CardDescription className="mt-2 text-foreground/80">
              Join CodeCanvas to manage your projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <SignupForm />
             <p className="mt-8 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-accent hover:text-accent/90">
                Sign in here
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
