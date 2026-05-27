/**
 * Settings — Focus & Break duration configuration
 *
 * Collapsible settings panel where users can adjust
 * the duration for focus and break sessions.
 * Stepper buttons are disabled while timer is running/paused.
 *
 * @param {number} focusDuration — focus time in minutes
 * @param {number} breakDuration — break time in minutes
 * @param {function} onFocusChange — called with new focus duration
 * @param {function} onBreakChange — called with new break duration
 * @param {boolean} isOpen — whether the settings panel is expanded
 * @param {function} onToggle — called to toggle settings visibility
 * @param {boolean} isDisabled — disables inputs when timer is running/paused
 */
export default function Settings({
  focusDuration = 25,
  breakDuration = 5,
  onFocusChange = () => {},
  onBreakChange = () => {},
  isOpen = false,
  onToggle = () => {},
  isDisabled = false,
}) {
  const disabledClass = isDisabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <div className="w-full max-w-md mx-auto animate-[slide-up_0.5s_ease-out]">
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="
          flex items-center justify-center gap-2 w-full py-2.5
          text-sm font-medium text-[var(--color-text-muted)]
          hover:text-[var(--color-text-secondary)]
          transition-colors duration-200 cursor-pointer
        "
        aria-expanded={isOpen}
        aria-controls="settings-panel"
        id="btn-settings-toggle"
      >
        <SettingsIcon />
        Settings
        <ChevronIcon isOpen={isOpen} />
      </button>

      {/* Settings panel */}
      <div
        id="settings-panel"
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-60 opacity-100 mt-3' : 'max-h-0 opacity-0'}
        `}
        role="region"
        aria-label="Timer settings"
      >
        <div className="glass-card rounded-2xl p-5 space-y-4">
          {/* Disabled notice */}
          {isDisabled && (
            <p className="text-xs text-[var(--color-paused)] text-center pb-1" role="alert">
              Reset the timer to change durations
            </p>
          )}

          {/* Focus duration */}
          <fieldset className={`flex items-center justify-between gap-4 ${disabledClass}`} disabled={isDisabled}>
            <label
              htmlFor="focus-duration"
              className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]"
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-[var(--color-focus)]"
                aria-hidden="true"
              />
              Focus Duration
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onFocusChange(Math.max(1, focusDuration - 5))}
                className="
                  w-8 h-8 flex items-center justify-center rounded-lg
                  bg-[var(--color-bg-elevated)] border border-[var(--color-border)]
                  text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                  hover:border-[var(--color-border-hover)]
                  transition-all duration-200 text-lg cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-[var(--color-text-secondary)]
                "
                aria-label="Decrease focus duration by 5 minutes"
                disabled={isDisabled}
              >
                −
              </button>
              <input
                id="focus-duration"
                type="number"
                min="1"
                max="120"
                value={focusDuration}
                onChange={(e) => onFocusChange(Number(e.target.value))}
                disabled={isDisabled}
                className="
                  w-16 h-8 text-center rounded-lg font-mono text-sm font-semibold
                  bg-[var(--color-bg-primary)] border border-[var(--color-border)]
                  text-[var(--color-text-primary)]
                  focus:border-[var(--color-focus)] focus:outline-none
                  transition-colors duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  [appearance:textfield]
                  [&::-webkit-outer-spin-button]:appearance-none
                  [&::-webkit-inner-spin-button]:appearance-none
                "
                aria-label="Focus duration in minutes"
              />
              <button
                onClick={() => onFocusChange(Math.min(120, focusDuration + 5))}
                className="
                  w-8 h-8 flex items-center justify-center rounded-lg
                  bg-[var(--color-bg-elevated)] border border-[var(--color-border)]
                  text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                  hover:border-[var(--color-border-hover)]
                  transition-all duration-200 text-lg cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-[var(--color-text-secondary)]
                "
                aria-label="Increase focus duration by 5 minutes"
                disabled={isDisabled}
              >
                +
              </button>
              <span className="text-xs text-[var(--color-text-muted)] w-8">min</span>
            </div>
          </fieldset>

          {/* Break duration */}
          <fieldset className={`flex items-center justify-between gap-4 ${disabledClass}`} disabled={isDisabled}>
            <label
              htmlFor="break-duration"
              className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)]"
            >
              <span
                className="w-2.5 h-2.5 rounded-full bg-[var(--color-break)]"
                aria-hidden="true"
              />
              Break Duration
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onBreakChange(Math.max(1, breakDuration - 1))}
                className="
                  w-8 h-8 flex items-center justify-center rounded-lg
                  bg-[var(--color-bg-elevated)] border border-[var(--color-border)]
                  text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                  hover:border-[var(--color-border-hover)]
                  transition-all duration-200 text-lg cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-[var(--color-text-secondary)]
                "
                aria-label="Decrease break duration by 1 minute"
                disabled={isDisabled}
              >
                −
              </button>
              <input
                id="break-duration"
                type="number"
                min="1"
                max="60"
                value={breakDuration}
                onChange={(e) => onBreakChange(Number(e.target.value))}
                disabled={isDisabled}
                className="
                  w-16 h-8 text-center rounded-lg font-mono text-sm font-semibold
                  bg-[var(--color-bg-primary)] border border-[var(--color-border)]
                  text-[var(--color-text-primary)]
                  focus:border-[var(--color-break)] focus:outline-none
                  transition-colors duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  [appearance:textfield]
                  [&::-webkit-outer-spin-button]:appearance-none
                  [&::-webkit-inner-spin-button]:appearance-none
                "
                aria-label="Break duration in minutes"
              />
              <button
                onClick={() => onBreakChange(Math.min(60, breakDuration + 1))}
                className="
                  w-8 h-8 flex items-center justify-center rounded-lg
                  bg-[var(--color-bg-elevated)] border border-[var(--color-border)]
                  text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]
                  hover:border-[var(--color-border-hover)]
                  transition-all duration-200 text-lg cursor-pointer
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-[var(--color-text-secondary)]
                "
                aria-label="Increase break duration by 1 minute"
                disabled={isDisabled}
              >
                +
              </button>
              <span className="text-xs text-[var(--color-text-muted)] w-8">min</span>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

/* ---- Inline SVG Icons ---- */

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function ChevronIcon({ isOpen }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
