import {
  CompassIcon,
  HomeIcon,
  Loader2Icon,
  SparkleIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUp,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Suspense } from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
        <SparkleIcon className="size-4 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold ">
        i<span className="text-primary">Built</span>
        This
      </span>
    </Link>
  );
};
export default function Header() {
  const isSignedIn = false;
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-background-filter:bg-background/60">
      <div className="wrapper px-12">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-1">
            <Link
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
              href="/"
            >
              <HomeIcon className="size-4" />
              <span>Home</span>
            </Link>
            <Link
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
              href="/explore"
            >
              <CompassIcon className="size-4" />
              <span>Explore</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3 ">
            <Suspense
              fallback={
                <div>
                  <Loader2Icon className="size-4 animate-spin"></Loader2Icon>
                </div>
              }
            >
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <Button>Sign Up</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Button asChild>
                  <Link href="/submit">
                    <SparklesIcon className="size-4" />
                    <span>Submit Project</span>
                  </Link>
                </Button>
                <UserButton />
              </SignedIn>
            </Suspense>
            <></>
          </div>
        </div>
      </div>
    </header>
  );
}
