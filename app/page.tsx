import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2 font-bold">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">
              A
            </div>
            <span>AuthApp</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">
                  Get started
                </Button>
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Secure Authentication for Your Application
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Fast, secure, and reliable authentication powered by Supabase. Get started in minutes.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" className="h-12 px-6">
                      Get started
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button size="lg" variant="outline" className="h-12 px-6">
                      Sign in
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden rounded-lg bg-card p-6 shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-background border-2 border-border rounded-lg"></div>
                  <div className="relative z-10 h-full flex flex-col items-center justify-center gap-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                        A
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">AuthApp</h3>
                      <p className="text-sm text-muted-foreground max-w-[20rem]">
                        Simple, secure, and scalable authentication for your applications
                      </p>
                    </div>
                    <div className="w-full max-w-[250px] h-12 bg-card border rounded-md flex items-center px-4 gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20"></div>
                      <div className="h-4 w-full bg-muted rounded-sm"></div>
                    </div>
                    <div className="w-full max-w-[250px] h-12 bg-card border rounded-md flex items-center px-4 gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20"></div>
                      <div className="h-4 w-full bg-muted rounded-sm"></div>
                    </div>
                    <div className="w-full max-w-[250px]">
                      <div className="h-10 bg-primary rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our authentication system provides all the features you need to build secure applications.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Email Authentication",
                  description: "Secure email and password authentication with validation and password reset."
                },
                {
                  title: "Social Login",
                  description: "Allow users to sign in with their favorite social providers."
                },
                {
                  title: "Two-Factor Auth",
                  description: "Add an extra layer of security with two-factor authentication."
                },
                {
                  title: "Role-Based Access",
                  description: "Control what users can access with fine-grained permissions."
                },
                {
                  title: "Session Management",
                  description: "Manage user sessions with automatic token refresh."
                },
                {
                  title: "User Profiles",
                  description: "Store and manage user profile information securely."
                }
              ].map((feature, index) => (
                <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <div className="h-5 w-5 rounded-full bg-primary"></div>
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} AuthApp. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}