import { useState } from 'react'
import Timer from './components/Timer'
import Controls from './components/Controls'
import Settings from './components/Settings'
import History from './components/History'
import usePomodoro from './hooks/usePomodoro'

/**
 * App — Root layout for the Pomodoro Timer
 *
 * Single-screen layout with:
 *  1. Header branding + mode toggle
 *  2. Timer display with progress ring
 *  3. Control buttons
 *  4. Collapsible settings
 *  5. Daily session history (persisted via localStorage)
 *
 * All timer logic is driven by the usePomodoro hook.
 */
export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const {
    isFocusMode,
    isRunning,
    isPaused,
    timeDisplay,
    progress,
    focusDuration,
    breakDuration,
    sessions,
    start,
    pause,
    resume,
    reset,
    toggleMode,
    updateFocusDuration,
    updateBreakDuration,
  } = usePomodoro(25, 5)

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* ===== Background Effects ===== */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Radial gradient glow */}
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl transition-all duration-1000"
          style={{
            background: isFocusMode
              ? 'radial-gradient(circle, var(--color-focus) 0%, transparent 70%)'
              : 'radial-gradient(circle, var(--color-break) 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-muted) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ===== Main Content ===== */}
      <div className="relative z-10 flex flex-col flex-1 w-full max-w-lg mx-auto px-4 sm:px-6">

        {/* --- Header --- */}
        <header className="flex items-center justify-between py-5 sm:py-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--color-focus)] to-[var(--color-break)] flex items-center justify-center shadow-lg">
              <span className="text-white text-sm" aria-hidden="true">🍅</span>
            </div>
            <h1 className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
              Focusly
            </h1>
          </div>

          {/* Mode toggle chip */}
          <button
            onClick={toggleMode}
            disabled={isRunning}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
              bg-[var(--color-bg-card)] border border-[var(--color-border)]
              text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]
              hover:border-[var(--color-border-hover)]
              transition-all duration-200 cursor-pointer
              ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            aria-label={`Switch to ${isFocusMode ? 'break' : 'focus'} mode`}
            id="btn-mode-toggle"
          >
            <span
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: isFocusMode ? 'var(--color-focus)' : 'var(--color-break)',
              }}
              aria-hidden="true"
            />
            {isFocusMode ? 'Focus' : 'Break'}
          </button>
        </header>

        {/* --- Timer Section --- */}
        <main className="flex-1 flex flex-col items-center justify-center gap-8 py-4 sm:py-8">
          <Timer
            timeDisplay={timeDisplay}
            isFocusMode={isFocusMode}
            progress={progress}
            isRunning={isRunning}
          />

          <Controls
            isRunning={isRunning}
            isPaused={isPaused}
            isFocusMode={isFocusMode}
            onStart={start}
            onPause={pause}
            onResume={resume}
            onReset={reset}
          />

          <Settings
            focusDuration={focusDuration}
            breakDuration={breakDuration}
            onFocusChange={updateFocusDuration}
            onBreakChange={updateBreakDuration}
            isOpen={settingsOpen}
            onToggle={() => setSettingsOpen((v) => !v)}
          />
        </main>

        {/* --- History Section --- */}
        <section className="pb-8 sm:pb-12" aria-label="Session history">
          <History sessions={sessions} />
        </section>

        {/* --- Footer --- */}
        <footer className="py-4 text-center border-t border-[var(--color-border)]/30">
          <p className="text-xs text-[var(--color-text-muted)]">
            Built with focus. Powered by discipline.
          </p>
        </footer>
      </div>
    </div>
  )
}
