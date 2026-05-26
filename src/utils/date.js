/**
 * date.js — Date & time formatting utilities
 */

/**
 * Get today's date as YYYY-MM-DD string
 * @returns {string}
 */
export function getTodayDateString() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Format current time as h:mm AM/PM
 * @returns {string} e.g. "3:42 PM"
 */
export function getCurrentTimeFormatted() {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Format total seconds into mm:ss string
 * @param {number} totalSeconds
 * @returns {string} e.g. "25:00"
 */
export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

/**
 * Format minutes into mm:ss string (for display in history)
 * @param {number} minutes
 * @returns {string} e.g. "25:00"
 */
export function formatMinutes(minutes) {
  return `${String(minutes).padStart(2, '0')}:00`
}
