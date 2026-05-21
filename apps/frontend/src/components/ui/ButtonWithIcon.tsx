import * as React from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';
import { Button, ButtonProps } from './Button';
import { cn } from '@/utils/cn';

export interface ButtonWithIconProps extends Omit<ButtonProps, 'children'> {
  icon: LucideIcon;
  iconOnly?: boolean;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  iconClassName?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const iconSizeMap = {
  sm: 'size-3.5',
  default: 'size-4',
  lg: 'size-4',
  xl: 'size-4',
  icon: 'size-4',
};

const ButtonWithIcon = React.forwardRef<HTMLButtonElement, ButtonWithIconProps>(
  (
    {
      icon: Icon,
      iconOnly = false,
      iconPosition = 'left',
      children,
      className,
      iconClassName,
      size = 'default',
      isLoading = false,
      loadingText,
      disabled,
      ...props
    },
    ref,
  ) => {
    const iconSize = iconSizeMap[size || 'default'];
    const iconClasses = cn(iconSize, iconClassName);
    const isDisabled = isLoading || disabled;

    // Determine which icon to show
    const DisplayIcon = isLoading ? Loader2 : Icon;
    const displayIconClasses = isLoading
      ? cn(iconSize, iconClassName, 'animate-spin')
      : iconClasses;

    // Determine content to show
    const displayContent = isLoading && loadingText ? loadingText : children;

    if (iconOnly) {
      return (
        <Button
          ref={ref}
          size={size === 'icon' ? 'icon' : size}
          className={cn(className)}
          disabled={isDisabled}
          {...props}
        >
          <DisplayIcon className={displayIconClasses} />
        </Button>
      );
    }

    const iconElement = <DisplayIcon className={displayIconClasses} />;

    return (
      <Button
        ref={ref}
        size={size}
        className={cn(className)}
        disabled={isDisabled}
        {...props}
      >
        {iconPosition === 'left' && iconElement}
        {displayContent && <span>{displayContent}</span>}
        {iconPosition === 'right' && iconElement}
      </Button>
    );
  },
);

ButtonWithIcon.displayName = 'ButtonWithIcon';

export { ButtonWithIcon };
