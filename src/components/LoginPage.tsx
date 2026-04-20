import { FormEvent, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useLoginMutation } from '@/features/auth/authApi';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Missing credentials', {
        description: 'Please enter both email and password.',
      });
      return;
    }

    try {
      await login({ email: email.trim(), password }).unwrap();
      toast.success('Signed in successfully', {
        description: `Welcome back, ${email.trim()}.`,
      });
    } catch (error) {
      let message = 'Unable to sign in right now.';

      if (
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof error.data === 'object' &&
        error.data !== null
      ) {
        const errorData = error.data as { detail?: string; message?: string };
        message = errorData.detail || errorData.message || message;
      }

      toast.error('Sign in failed', { description: message });
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center">
        <Card className="w-full">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                Gigbook Super Admin
              </p>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>
                Enter your credentials to access the admin dashboard.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  autoComplete="email"
                  id="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@gigbook.com"
                  type="email"
                  value={email}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <Input
                  autoComplete="current-password"
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                />
              </div>
              <Button className="w-full" disabled={isLoading} type="submit">
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
