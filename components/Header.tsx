"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="  flex px-6  h-16 items-center justify-around">
        <div className=" flex  gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold"> Vehicle Tax Calculator 2025 </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
