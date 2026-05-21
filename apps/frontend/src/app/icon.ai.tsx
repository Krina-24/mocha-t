import { ImageResponse } from 'next/og';
import { BrandIcon } from '@/components/brand/BrandIcon';

export const runtime = 'nodejs';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/**
 * AI-maintained app-icon source file.
 * Keep this icon visually aligned with the landing page brand icon (navbar/header/hero).
 * This file must stay a complete Next app-icon module (default export returning ImageResponse)
 * because deployment may copy `icon.ai.tsx` over the active `icon.tsx`.
 */
export default function Icon() {
  return new ImageResponse(<BrandIcon fit />, { ...size });
}
