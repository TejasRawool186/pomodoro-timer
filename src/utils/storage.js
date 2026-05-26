/**
 * storage.js — LocalStorage persistence for session history
 *
 * Data shape:
 * {
 *   "date": "2026-05-26",
 *   "sessions": [
 *     { "duration": "25:00", "completedAt": "3:42 PM" }
 *   ]
 * }
 */

import { getTodayDateString } from './date'

const STORAGE_KEY = 'pomodoro-history'

/**
 * Load today's sessions from localStorage.
 * Automatically clears data if it's from a previous day.
 * @returns {Array<{duration: string, completedAt: string}>}
 */
export function loadSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    const data = JSON.parse(raw)
    const today = getTodayDateString()

    // Clear stale data from a previous day
    if (data.date !== today) {
      localStorage.removeItem(STORAGE_KEY)
      return []
    }

    return Array.isArray(data.sessions) ? data.sessions : []
  } catch {
    return []
  }
}

/**
 * Save a completed focus session to localStorage.
 * @param {string} duration — e.g. "25:00"
 * @param {string} completedAt — e.g. "3:42 PM"
 * @returns {Array} updated sessions array
 */
export function saveSession(duration, completedAt) {
  const today = getTodayDateString()
  const sessions = loadSessions()

  const newSession = { duration, completedAt }
  sessions.push(newSession)

  const data = { date: today, sessions }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))

  return sessions
}

/**
 * Clear all session history from localStorage.
 */
export function clearSessions() {
  localStorage.removeItem(STORAGE_KEY)
}
