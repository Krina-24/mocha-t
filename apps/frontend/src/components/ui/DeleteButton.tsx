'use client';

import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './AlertDialog';
import { Button, ButtonProps } from './Button';
import { ButtonWithLoader } from './ButtonWithLoader';
import useMultiLanguage from '@/hooks/useMultiLanguage';

interface DeleteMutationResult<T = unknown, R = unknown> {
  mutate: (data: T) => void;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  data: R | undefined;
  reset: () => void;
}

interface DeleteButtonProps<T = unknown, R = unknown> {
  deleteMutation: DeleteMutationResult<T, R>;
  deletePayload: T;
  dialogTitle?: string;
  dialogDescription?: string;
  confirmText?: string;
  cancelText?: string;
  loadingText?: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  className?: string;
  children?: React.ReactNode;
  onSuccess?: (response: R) => void;
  onError?: (error: Error) => void;
}

export function DeleteButton<T = unknown, R = unknown>({
  deleteMutation: { mutate, isPending, isSuccess, isError, error, data, reset },
  deletePayload,
  dialogTitle,
  dialogDescription,
  confirmText,
  cancelText,
  loadingText,
  variant = 'destructive',
  size = 'sm',
  className,
  children,
  onSuccess,
  onError,
}: DeleteButtonProps<T, R>) {
  const [open, setOpen] = useState(false);
  const { BUTTONS, DELETE_DIALOG } = useMultiLanguage();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      if (data) {
        onSuccess?.(data);
      }
      reset();
    }
  }, [isSuccess, data, onSuccess, reset]);

  useEffect(() => {
    if (isError && error) {
      onError?.(error);
      reset();
    }
  }, [isError, error, onError, reset]);

  const handleDelete = () => {
    mutate(deletePayload);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {children ?? <Trash2 className="h-4 w-4" />}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {dialogTitle ?? DELETE_DIALOG.TITLE}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {dialogDescription ?? DELETE_DIALOG.DESCRIPTION}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {cancelText ?? BUTTONS.CANCEL}
          </AlertDialogCancel>
          <ButtonWithLoader
            variant="destructive"
            isLoading={isPending}
            loadingText={loadingText ?? DELETE_DIALOG.DELETING}
            onClick={handleDelete}
          >
            {confirmText ?? BUTTONS.DELETE}
          </ButtonWithLoader>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
