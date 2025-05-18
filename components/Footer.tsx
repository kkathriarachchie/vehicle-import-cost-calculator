// filepath: components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0 sm:justify-center">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href="https://github.com/kkathriarachchie"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Kavishka Kathriarachchie.{" "}
            </a>
            The source code is available on{" "}
            <a
              href="https://github.com/kkathriarachchie/vehicle-import-cost-calculator"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
