/**
 * Controls — Timer action buttons
 *
 * Renders Start/Pause/Resume/Reset buttons with proper
 * visual states and accessibility labels.
 *
 * @param {boolean} isRunning — whether the timer is currently running
 * @param {boolean} isPaused — whether the timer is paused (was running, now stopped)
 * @param {boolean} isFocusMode — for theming the primary button
 * @param {function} onStart — called when Start is pressed
 * @param {function} onPause — called when Pause is pressed
 * @param {function} onResume — called when Resume is pressed
 * @param {function} onReset — called when Reset is pressed
 */
export default function Controls({
  isRunning = false,
  isPaused = false,
  isFocusMode = true,
  onStart = () => {},
  onPause = () => {},
  onResume = () => {},
  onReset = () => {},
}) {
  const primaryBg = isFocusMode
    ? 'bg-[var(--color-focus)] hover:bg-[var(--color-focus)]/90 shadow-[0_0_24px_var(--color-focus-glow)]'
    : 'bg-[var(--color-break)] hover:bg-[var(--color-break)]/90 shadow-[0_0_24px_var(--color-break-glow)]'

  return (
    <div
      className="flex items-center justify-center gap-3 animate-[slide-up_0.5s_ease-out] sm:gap-4"
      role="group"
      aria-label="Timer controls"
    >
      {/* Main action button */}
      {!isRunning && !isPaused && (
        <button
          onClick={onStart}
          className={`
            btn-base flex items-center gap-2 px-8 py-3 rounded-2xl
            text-base font-semibold text-white
            ${primaryBg}
            active:scale-95 transition-all duration-200
            cursor-pointer
          `}
          aria-label="Start timer"
          id="btn-start"
        >
          <PlayIcon />
          Start
        </button>
      )}

      {isRunning && (
        <button
          onClick={onPause}
          className={`
            btn-base flex items-center gap-2 px-8 py-3 rounded-2xl
            text-base font-semibold text-white
            bg-[var(--color-bg-elevated)] border border-[var(--color-border)]
            hover:border-[var(--color-border-hover)]
            active:scale-95 transition-all duration-200
            cursor-pointer
          `}
          aria-label="Pause timer"
          id="btn-pause"
        >
          <PauseIcon />
          Pause
        </button>
      )}

      {isPaused && !isRunning && (
        <button
          onClick={onResume}
          className={`
            btn-base flex items-center gap-2 px-8 py-3 rounded-2xl
            text-base font-semibold text-white
            ${primaryBg}
            active:scale-95 transition-all duration-200
            cursor-pointer
          `}
          aria-label="Resume timer"
          id="btn-resume"
        >
          <PlayIcon />
          Resume
        </button>
      )}

      {/* Reset button — visible when running or paused */}
      {(isRunning || isPaused) && (
        <button
          onClick={onReset}
          className={`
            btn-base flex items-center gap-2 px-6 py-3 rounded-2xl
            text-base font-medium text-[var(--color-text-secondary)]
            bg-[var(--color-bg-elevated)] border border-[var(--color-border)]
            hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]
            active:scale-95 transition-all duration-200
            cursor-pointer
          `}
          aria-label="Reset timer"
          id="btn-reset"
        >
          <ResetIcon />
          Reset
        </button>
      )}
    </div>
  )
}

/* ---- Inline SVG Icons ---- */

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11-7.36a1 1 0 0 0 0-1.72l-11-7.36A1 1 0 0 0 8 5.14z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  )
}
