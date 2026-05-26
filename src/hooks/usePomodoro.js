/**
 * usePomodoro — Custom hook for all Pomodoro timer logic
 *
 * Manages:
 *  - Countdown timer (second-by-second)
 *  - Focus / Break mode auto-switching
 *  - Start, Pause, Resume, Reset controls
 *  - Session history via localStorage
 *  - Audio notification on session complete
 *  - Configurable focus & break durations
 */

import { useState, useRef, useCallback, useEffect } from 'react'
import { formatTime, formatMinutes, getCurrentTimeFormatted } from '../utils/date'
import { loadSessions, saveSession } from '../utils/storage'

/**
 * Generate a short beep using the Web Audio API
 * Plays two ascending tones for a pleasant notification
 */
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()

    const playTone = (frequency, startTime, duration) => {
      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()

      oscillator.connect(gain)
      gain.connect(ctx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(frequency, startTime)

      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02)
      gain.gain.linearRampToValueAtTime(0, startTime + duration)

      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
    }

    const now = ctx.currentTime
    playTone(587.33, now, 0.15)        // D5
    playTone(880, now + 0.15, 0.15)    // A5
    playTone(1174.66, now + 0.3, 0.3)  // D6

    // Close context after sounds finish
    setTimeout(() => ctx.close(), 1000)
  } catch {
    // Audio not supported — fail silently
  }
}

export default function usePomodoro(initialFocus = 25, initialBreak = 5) {
  // ----- Configuration -----
  const [focusDuration, setFocusDuration] = useState(initialFocus)
  const [breakDuration, setBreakDuration] = useState(initialBreak)

  // ----- Timer State -----
  const [isFocusMode, setIsFocusMode] = useState(true)
  const [secondsLeft, setSecondsLeft] = useState(initialFocus * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // ----- Session History -----
  const [sessions, setSessions] = useState(() => loadSessions())

  // ----- Refs -----
  const intervalRef = useRef(null)
  const totalSecondsRef = useRef(initialFocus * 60)
  const focusDurationRef = useRef(initialFocus)

  // Keep refs in sync
  useEffect(() => {
    focusDurationRef.current = focusDuration
  }, [focusDuration])

  // ----- Derived Values -----
  const totalSeconds = isFocusMode ? focusDuration * 60 : breakDuration * 60
  const progress = totalSeconds > 0 ? secondsLeft / totalSeconds : 1
  const timeDisplay = formatTime(secondsLeft)

  // ----- Clear any running interval -----
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // ----- Handle session completion -----
  const handleSessionComplete = useCallback((wasFocusMode) => {
    clearTimer()
    playNotificationSound()

    if (wasFocusMode) {
      // Save the completed focus session
      const duration = formatMinutes(focusDurationRef.current)
      const completedAt = getCurrentTimeFormatted()
      const updatedSessions = saveSession(duration, completedAt)
      setSessions(updatedSessions)

      // Switch to break mode
      setIsFocusMode(false)
      setSecondsLeft(breakDuration * 60)
      totalSecondsRef.current = breakDuration * 60
    } else {
      // Break is over — switch back to focus mode
      setIsFocusMode(true)
      setSecondsLeft(focusDurationRef.current * 60)
      totalSecondsRef.current = focusDurationRef.current * 60
    }

    // Auto-stop after transition so user can start next session manually
    setIsRunning(false)
    setIsPaused(false)
  }, [clearTimer, breakDuration])

  // ----- Start the countdown interval -----
  const startInterval = useCallback(() => {
    clearTimer()

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Will complete on next tick — determine current mode from state
          // We use a ref-based approach via the callback
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [clearTimer])

  // ----- Watch for timer hitting zero -----
  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      handleSessionComplete(isFocusMode)
    }
  }, [secondsLeft, isRunning, isFocusMode, handleSessionComplete])

  // ----- Controls -----
  const start = useCallback(() => {
    setIsRunning(true)
    setIsPaused(false)
    startInterval()
  }, [startInterval])

  const pause = useCallback(() => {
    clearTimer()
    setIsRunning(false)
    setIsPaused(true)
  }, [clearTimer])

  const resume = useCallback(() => {
    setIsRunning(true)
    setIsPaused(false)
    startInterval()
  }, [startInterval])

  const reset = useCallback(() => {
    clearTimer()
    setIsRunning(false)
    setIsPaused(false)

    if (isFocusMode) {
      setSecondsLeft(focusDuration * 60)
      totalSecondsRef.current = focusDuration * 60
    } else {
      setSecondsLeft(breakDuration * 60)
      totalSecondsRef.current = breakDuration * 60
    }
  }, [clearTimer, isFocusMode, focusDuration, breakDuration])

  // ----- Mode Toggle (manual) -----
  const toggleMode = useCallback(() => {
    clearTimer()
    setIsRunning(false)
    setIsPaused(false)

    setIsFocusMode((prev) => {
      const next = !prev
      const newSeconds = next ? focusDuration * 60 : breakDuration * 60
      setSecondsLeft(newSeconds)
      totalSecondsRef.current = newSeconds
      return next
    })
  }, [clearTimer, focusDuration, breakDuration])

  // ----- Duration Changes (only when not running) -----
  const updateFocusDuration = useCallback((newVal) => {
    const clamped = Math.max(1, Math.min(120, newVal))
    setFocusDuration(clamped)
    if (isFocusMode && !isRunning && !isPaused) {
      setSecondsLeft(clamped * 60)
      totalSecondsRef.current = clamped * 60
    }
  }, [isFocusMode, isRunning, isPaused])

  const updateBreakDuration = useCallback((newVal) => {
    const clamped = Math.max(1, Math.min(60, newVal))
    setBreakDuration(clamped)
    if (!isFocusMode && !isRunning && !isPaused) {
      setSecondsLeft(clamped * 60)
      totalSecondsRef.current = clamped * 60
    }
  }, [isFocusMode, isRunning, isPaused])

  // ----- Cleanup on unmount -----
  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  // ----- Reload sessions from storage (e.g. on day change) -----
  useEffect(() => {
    setSessions(loadSessions())
  }, [])

  return {
    // State
    isFocusMode,
    isRunning,
    isPaused,
    timeDisplay,
    progress,
    secondsLeft,

    // Config
    focusDuration,
    breakDuration,

    // History
    sessions,

    // Actions
    start,
    pause,
    resume,
    reset,
    toggleMode,
    updateFocusDuration,
    updateBreakDuration,
  }
}
