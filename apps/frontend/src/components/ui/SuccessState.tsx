import * as React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SuccessStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export function SuccessState({
  title = 'Success',
  message,
  className,
}: SuccessStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-8 text-center',
        className,
      )}
    >
      <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
        <CheckCircle2 className="h-6 w-6 text-success" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {message && (
          <p className="text-sm text-muted-foreground max-w-md">{message}</p>
        )}
      </div>
    </div>
  );
}
