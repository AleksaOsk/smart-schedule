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
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaLabel}
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12h10M12 7v10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}