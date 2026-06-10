export function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="text-sm p-0 text-red-600 dark:text-red-400 mt-1">{message}</p>
  );
}
