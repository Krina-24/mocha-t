import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from './Button';
import { cn } from '@/utils/cn';

export interface ButtonWithLoaderProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

const ButtonWithLoader = React.forwardRef<
  HTMLButtonElement,
  ButtonWithLoaderProps
>(({ isLoading = false, loadingText, disabled, children, ...props }, ref) => {
  const isDisabled = isLoading || disabled;
  const displayContent = isLoading && loadingText ? loadingText : children;

  return (
    <Button ref={ref} disabled={isDisabled} {...props}>
      {isLoading && (
        <Loader2 className={cn('size-4 animate-spin', children && 'mr-2')} />
      )}
      {displayContent}
    </Button>
  );
});

ButtonWithLoader.displayName = 'ButtonWithLoader';

export { ButtonWithLoader };
