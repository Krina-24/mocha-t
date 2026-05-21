'use client';

import Link from 'next/link';
import useMultiLanguage from '@/hooks/useMultiLanguage';

export default function NotFound() {
  const { NOT_FOUND } = useMultiLanguage();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{NOT_FOUND.CODE}</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {NOT_FOUND.MESSAGE}
        </p>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          {NOT_FOUND.RETURN_HOME}
        </Link>
      </div>
    </div>
  );
}
