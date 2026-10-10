import './Logo.css'

interface LogoProps {
  size?: number
  ariaLabel?: string
}

export function Logo({ size = 40, ariaLabel = 'SmartSchedule' }: LogoProps) {
  return (
    <svg
      className="logo"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      {/* Vector 1 - horizontal line */}
      <path
        d="M42.5 58.5H58.5"
        stroke="#111827"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vector 2 - large shape */}
      <path
        d="M28.5 70.5C28.5 55.5 40.5 43.5 55.5 43.5C70.5 43.5 82.5 55.5 82.5 70.5"
        stroke="#111827"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vector 3 - small curve */}
      <path
        d="M44.5 50.5C44.5 44.5 49.5 39.5 55.5 39.5C61.5 39.5 66.5 44.5 66.5 50.5"
        stroke="#111827"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}