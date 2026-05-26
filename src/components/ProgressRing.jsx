/**
 * ProgressRing — Circular SVG progress indicator
 *
 * Renders an animated ring that fills based on the progress prop.
 * Changes color based on whether we're in focus or break mode.
 *
 * @param {number} progress — 0 to 1 representing completion
 * @param {boolean} isFocusMode — true for focus (red), false for break (green)
 * @param {number} size — diameter in pixels (default 280)
 * @param {number} strokeWidth — ring thickness (default 8)
 */
export default function ProgressRing({
  progress = 0.75,
  isFocusMode = true,
  size = 280,
  strokeWidth = 8,
  children,
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  const accentColor = isFocusMode ? 'var(--color-focus)' : 'var(--color-break)'
  const glowColor = isFocusMode ? 'var(--color-focus-glow)' : 'var(--color-break-glow)'

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Timer progress: ${Math.round(progress * 100)}%`}
    >
      {/* Glow effect behind the ring */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-30 transition-all duration-500"
        style={{ backgroundColor: glowColor }}
      />

      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          opacity={0.4}
        />

        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={accentColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring-circle"
          style={{
            filter: `drop-shadow(0 0 8px ${glowColor})`,
          }}
        />
      </svg>

      {/* Center content (timer display) */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
