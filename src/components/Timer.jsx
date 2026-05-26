/**
 * Timer — Main timer display component
 *
 * Shows the large countdown in mm:ss format along with
 * a label indicating the current mode (Focus / Break).
 * Wraps content inside the ProgressRing.
 *
 * @param {string} timeDisplay — formatted time string e.g. "25:00"
 * @param {boolean} isFocusMode — current mode
 * @param {number} progress — 0 to 1 progress value
 * @param {boolean} isRunning — whether the timer is active
 */
import ProgressRing from './ProgressRing'

export default function Timer({
  timeDisplay = '25:00',
  isFocusMode = true,
  progress = 0.75,
  isRunning = false,
}) {
  const modeLabel = isFocusMode ? 'Focus' : 'Break'
  const modeColor = isFocusMode
    ? 'text-[var(--color-focus)]'
    : 'text-[var(--color-break)]'

  return (
    <div className="flex flex-col items-center gap-6 animate-[fade-in_0.5s_ease-out]">
      {/* Mode badge */}
      <div
        className={`
          inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
          transition-all duration-500 ${modeColor}
          ${isFocusMode
            ? 'bg-[var(--color-focus-soft)] border border-[var(--color-focus-ring)]'
            : 'bg-[var(--color-break-soft)] border border-[var(--color-break-ring)]'
          }
        `}
        role="status"
        aria-live="polite"
        aria-label={`Current mode: ${modeLabel}`}
      >
        <span
          className={`w-2 h-2 rounded-full ${isRunning ? 'animate-[pulse-glow_2s_ease-in-out_infinite]' : ''}`}
          style={{
            backgroundColor: isFocusMode ? 'var(--color-focus)' : 'var(--color-break)',
          }}
          aria-hidden="true"
        />
        {modeLabel} Session
      </div>

      {/* Circular progress + countdown */}
      <ProgressRing
        progress={progress}
        isFocusMode={isFocusMode}
        size={280}
        strokeWidth={8}
      >
        <time
          className="font-mono text-6xl font-bold tracking-tight text-[var(--color-text-primary)] tabular-nums select-none sm:text-7xl"
          dateTime={`PT${timeDisplay.replace(':', 'M')}S`}
          aria-label={`Time remaining: ${timeDisplay}`}
        >
          {timeDisplay}
        </time>
        <span className="mt-1 text-xs font-medium uppercase tracking-widest text-[var(--color-text-muted)]">
          remaining
        </span>
      </ProgressRing>
    </div>
  )
}
