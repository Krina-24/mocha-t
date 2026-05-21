import { toast } from '@/hooks/useToast';
import { translate } from '@/lib/i18n/translate';
import { Common } from '@/lib/i18n/localization-enum';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export const showToast = ({
  title,
  description,
  variant = 'default',
}: ToastOptions) => {
  toast({
    title,
    description,
    variant,
  });
};

export const showSuccessToast = (title?: string, description?: string) => {
  showToast({
    title: title || translate(Common.SUCCESS),
    description,
  });
};

export const showErrorToast = (description: string, title?: string) => {
  showToast({
    title: title || translate(Common.ERROR),
    description,
    variant: 'destructive',
  });
};
