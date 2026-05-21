import './global.css';
import Script from 'next/script';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { SonnerToaster, Toaster } from '@/components';
import { Routes } from '@/constants/routes';

const appineventoFeUrl =
  process.env.NEXT_PUBLIC_APPINEVENTO_FE_URL ?? 'https://appinvento.io/';
const appineventoBadgeScriptUrl = `${appineventoFeUrl}appinevento-badge.js`;
const previewScriptUrl = `${appineventoFeUrl}appinevento-preview-bridge.js`;

export const metadata = {
  title: 'Brownie Todo — Simple Task Manager',
  description:
    'A clean and simple todo application with a warm brown aesthetic. Organize your tasks effortlessly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script id="appinevento-badge-config" strategy="beforeInteractive">
          {`window.__APPINEVENTO_BADGE_CONFIG__=${JSON.stringify({
            feUrl: appineventoFeUrl,
          })};`}
        </Script>
        <Script src={appineventoBadgeScriptUrl} strategy="afterInteractive" />
        <Script
          id="appinevento-preview-bridge-config"
          strategy="beforeInteractive"
        >
          {`window.__APPINEVENTO_PREVIEW_BRIDGE_CONFIG__=${JSON.stringify({
            routes: Object.values(Routes),
          })};`}
        </Script>
        <Script src={previewScriptUrl} strategy="beforeInteractive" />
        <QueryProvider>
          <LanguageProvider>
            {children}
            <SonnerToaster />
            <Toaster />
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}