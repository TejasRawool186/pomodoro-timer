/**
 * History — Daily session history list
 *
 * Displays a list of completed focus sessions for the current day.
 * Shows session duration, completion time, and total focus time.
 *
 * @param {Array} sessions — array of { duration: string, completedAt: string }
 */
export default function History({ sessions = [] }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  // Calculate total focus minutes from sessions
  const totalMinutes = sessions.reduce((sum, session) => {
    const parts = session.duration.split(':')
    return sum + (parseInt(parts[0], 10) || 0)
  }, 0)

  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMins = totalMinutes % 60
  const totalTimeLabel = totalHours > 0
    ? `${totalHours}h ${remainingMins}m`
    : `${remainingMins}m`

  return (
    <div className="w-full max-w-md mx-auto animate-[slide-up_0.5s_ease-out]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Today's Sessions
        </h2>
        <span className="text-xs text-[var(--color-text-muted)]">{today}</span>
      </div>

      {/* Session list */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 px-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center mb-3">
              <ClockIcon />
            </div>
            <p className="text-sm text-[var(--color-text-muted)] text-center">
              No sessions completed yet today.
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Start a focus session to build your streak!
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[var(--color-border)]" role="list" aria-label="Completed focus sessions">
            {sessions.map((session, index) => (
              <li
                key={index}
                className="
                  flex items-center gap-3 px-4 py-3.5
                  hover:bg-[var(--color-bg-elevated)]/40
                  transition-colors duration-150
                  animate-[scale-in_0.3s_ease-out]
                "
                style={{ animationDelay: `${index * 60}ms`, animationFillMode: 'backwards' }}
              >
                {/* Checkmark */}
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-break-soft)] border border-[var(--color-break-ring)] flex items-center justify-center">
                  <CheckIcon />
                </div>

                {/* Session info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {session.duration} Focus
                  </p>
                </div>

                {/* Timestamp */}
                <span className="text-xs font-mono text-[var(--color-text-muted)] flex-shrink-0">
                  {session.completedAt}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Summary footer */}
        {sessions.length > 0 && (
          <div className="px-4 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg-elevated)]/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'} completed
              </span>
              <span className="text-xs font-semibold text-[var(--color-break)] font-mono">
                {totalTimeLabel} focused
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---- Inline SVG Icons ---- */

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-break)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
