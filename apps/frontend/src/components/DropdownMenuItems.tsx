import * as React from 'react';
import { LucideIcon } from 'lucide-react';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';

export interface DropdownMenuItemConfig {
  id: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  separatorBefore?: boolean;
  children?: React.ReactNode; // For custom content (like workspace name + role)
}

interface DropdownMenuItemsProps {
  items: DropdownMenuItemConfig[];
  isLoading?: boolean;
  loadingText?: string;
  error?: Error | null;
  errorText?: string;
  errorSubtext?: string;
  emptyText?: string;
  showEmpty?: boolean;
}

export function DropdownMenuItems({
  items,
  isLoading = false,
  loadingText = 'Loading...',
  error = null,
  errorText,
  errorSubtext,
  emptyText = 'No items found',
  showEmpty = false,
}: DropdownMenuItemsProps) {
  // Loading state
  if (isLoading) {
    return (
      <DropdownMenuItem disabled>
        <div className="flex-1">
          <p className="text-sm">{loadingText}</p>
        </div>
      </DropdownMenuItem>
    );
  }

  // Error state
  if (error) {
    return (
      <DropdownMenuItem disabled>
        <div className="flex-1">
          <p className="text-sm text-destructive">
            {errorText || 'Failed to load'}
          </p>
          {(errorSubtext || error.message) && (
            <p className="text-xs text-muted-foreground">
              {errorSubtext || error.message}
            </p>
          )}
        </div>
      </DropdownMenuItem>
    );
  }

  // Empty state
  if (showEmpty && items.length === 0) {
    return (
      <DropdownMenuItem disabled>
        <div className="flex-1">
          <p className="text-sm">{emptyText}</p>
        </div>
      </DropdownMenuItem>
    );
  }

  // Render items
  return (
    <>
      {items.map((menuItem) => {
        const IconComponent = menuItem.icon;
        const content = menuItem.children ? (
          menuItem.children
        ) : (
          <>
            {IconComponent && (
              <IconComponent className="size-4 mr-2 text-white" />
            )}
            <span>{menuItem.label}</span>
          </>
        );

        return (
          <React.Fragment key={menuItem.id}>
            {menuItem.separatorBefore && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={menuItem.onClick}
              disabled={menuItem.disabled}
              className={menuItem.className}
            >
              {content}
            </DropdownMenuItem>
          </React.Fragment>
        );
      })}
    </>
  );
}
