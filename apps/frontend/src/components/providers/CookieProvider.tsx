'use client';

import React, { createContext, useCallback, useContext } from 'react';
import {
  Cookies,
  CookiesProvider,
  useCookies as libUseCookies,
} from 'react-cookie';

/* COOKIE KEYS */

export const LANG = 'i18nextLng';
export const NEXT_URL = 'nextUrl';

/* TYPES */

export type CookieSchema = {
  [LANG]: string;
  [NEXT_URL]: string;
};

type CookieKey = keyof CookieSchema;

type CookieContextType = {
  setCookie: <K extends CookieKey>(key: K, value: CookieSchema[K]) => void;
  getCookie: <K extends CookieKey>(key: K) => CookieSchema[K] | null;
  removeTypedCookie: (key: CookieKey) => void;
};

const CookieContext = createContext<CookieContextType | null>(null);

/* HOOK */

export function useCookies() {
  const ctx = useContext(CookieContext);

  if (!ctx) {
    throw new Error('useTypedCookies must be used inside AppCookieProvider');
  }

  return ctx;
}

/* INTERNAL PROVIDER */

function CookieProviderInternal({ children }: { children: React.ReactNode }) {
  const [cookies, setCookieFn, removeCookieFn] = libUseCookies();

  const setCookie = useCallback(
    <K extends CookieKey>(key: K, value: CookieSchema[K]) => {
      const serialized =
        typeof value === 'string' ? value : JSON.stringify(value);
      setCookieFn(key, serialized, {
        path: '/',
        sameSite: 'lax',
      });
    },
    [setCookieFn],
  );

  const getCookie = useCallback(
    <K extends CookieKey>(key: K): CookieSchema[K] | null => {
      const value = cookies[key];
      if (!value) return null;
      try {
        return JSON.parse(value);
      } catch {
        return value as CookieSchema[K];
      }
    },
    [cookies],
  );

  const removeTypedCookie = useCallback(
    (key: CookieKey) => {
      removeCookieFn(key, { path: '/' });
    },
    [removeCookieFn],
  );

  return (
    <CookieContext.Provider
      value={{
        setCookie,
        getCookie,
        removeTypedCookie,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

/* ROOT PROVIDER */

export function AppCookieProvider({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <CookieProviderInternal>{children}</CookieProviderInternal>
    </CookiesProvider>
  );
}

/* UTILITY FUNCTIONS (for non-React contexts) */

const cookiesInstance = new Cookies();

type CookieOptions = {
  path?: string;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
  /** Number = days; Date = exact expiry (e.g. from API) */
  expires?: number | Date;
};

const DEFAULT_OPTIONS: CookieOptions = {
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
};

export function setCookie<K extends CookieKey>(
  key: K,
  value: CookieSchema[K],
  options?: CookieOptions,
): void {
  if (typeof window === 'undefined') return;

  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  const cookieOptions: {
    path?: string;
    sameSite?: 'strict' | 'lax' | 'none';
    secure?: boolean;
    expires?: Date;
  } = {
    path: mergedOptions.path,
    sameSite: mergedOptions.sameSite,
    secure: mergedOptions.secure,
  };

  if (typeof mergedOptions.expires === 'number') {
    const days = mergedOptions.expires;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    cookieOptions.expires = date;
  } else if (mergedOptions.expires instanceof Date) {
    cookieOptions.expires = mergedOptions.expires;
  }

  const serialized = typeof value === 'string' ? value : JSON.stringify(value);

  cookiesInstance.set(key, serialized, cookieOptions);
}

export function getCookie<K extends CookieKey>(key: K): CookieSchema[K] | null {
  if (typeof window === 'undefined') return null;

  const value = cookiesInstance.get(key);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return value as CookieSchema[K];
  }
}

export function removeCookie(key: CookieKey): void {
  if (typeof window === 'undefined') return;

  cookiesInstance.remove(key, { path: '/' });
}
