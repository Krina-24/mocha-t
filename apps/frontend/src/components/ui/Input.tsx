'use client';
import * as React from 'react';

import { cn } from '@/utils/cn';
import { Label } from '@/components/ui/Label';
import { FormError } from '@/components/FormError';

export interface InputProps extends React.ComponentProps<'input'> {
  label?: React.ReactNode;
  error?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, label, error, errorMessage, id, onChange, ...props },
    ref,
  ) => {
    const errorText = error || errorMessage;
    const inputId =
      id ||
      (typeof label === 'string'
        ? label.toLowerCase().replace(/\s+/g, '-')
        : undefined);

    const inputElement = (
      <input
        type={type}
        id={inputId}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          errorText && 'border-destructive focus-visible:ring-destructive',
          className,
        )}
        ref={ref}
        onChange={onChange}
        aria-invalid={errorText ? 'true' : 'false'}
        {...props}
      />
    );

    if (label || errorText) {
      return (
        <div className="space-y-2">
          {label && <Label htmlFor={inputId}>{label}</Label>}
          {inputElement}
          {errorText && <FormError message={errorText} />}
        </div>
      );
    }

    return inputElement;
  },
);
Input.displayName = 'Input';

export { Input };
