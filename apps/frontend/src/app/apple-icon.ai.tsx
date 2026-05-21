import { ImageResponse } from 'next/og';
import { BrandIcon } from '@/components/brand/BrandIcon';

export const runtime = 'nodejs';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * AI-maintained Apple touch icon source file.
 * Keep this icon visually aligned with the app brand icon.
 */
export default function AppleIcon() {
  return new ImageResponse(<BrandIcon fit />, { ...size });
}
