type BrandIconProps = {
  className?: string;
  fit?: boolean;
  sizePx?: number;
};

export function BrandIcon({
  className,
  fit = false,
  sizePx = 32,
}: BrandIconProps) {
  return (
    <div
      className={className}
      style={{
        width: fit ? '100%' : sizePx,
        height: fit ? '100%' : sizePx,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #9B5E2A 0%, #7A4520 100%)',
        borderRadius: fit ? 14 : Math.max(8, Math.round(sizePx * 0.32)),
        padding: fit ? 5 : Math.max(3, Math.round(sizePx * 0.16)),
      }}
    >
      <svg
        viewBox="0 0 64 64"
        width="100%"
        height="100%"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M20 34l6 6 18-18"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}