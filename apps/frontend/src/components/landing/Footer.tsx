import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border py-8 flex items-center justify-center">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
            <Zap className="size-3 text-white" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            {/* TODO: Replace APP_NAME with the actual app name. */}
            APP_NAME
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {/* TODO: Replace APP_NAME with the actual app name / legal name. */}
          © {new Date().getFullYear()} APP_NAME. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
