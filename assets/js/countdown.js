/**
 * Countdown Timer Module
 *
 * This module provides a countdown timer that counts down to a target date.
 * The target date is stored in localStorage and resets automatically when reached.
 * The timer updates the DOM elements with IDs: "days", "hours", "minutes", "seconds".
 */

const TARGET_DATE_KEY = "targetDate"; // Key for storing target date in localStorage
const DEFAULT_DAYS_FROM_NOW = 30; // Default countdown duration in days
const COUNTDOWN_INTERVAL = 1000; // Timer update interval in milliseconds

/**
 * Retrieves the target date from localStorage.
 * @returns {Date|null} The stored target date, or null if not set.
 */
function getTargetDate() {
  const storedDate = localStorage.getItem(TARGET_DATE_KEY);
  return storedDate ? new Date(storedDate) : null;
}

/**
 * Sets a new target date a specified number of days from now and stores it.
 * @param {number} [daysFromNow=DEFAULT_DAYS_FROM_NOW] - Days from now for the countdown.
 * @returns {Date} The new target date.
 */
function setTargetDate(daysFromNow = DEFAULT_DAYS_FROM_NOW) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysFromNow);
  localStorage.setItem(TARGET_DATE_KEY, targetDate.toISOString());
  return targetDate;
}

/**
 * Calculates the time left until the target date.
 * @param {Date} targetDate - The target date to count down to.
 * @returns {Object|null} An object with days, hours, minutes, seconds left, or null if expired.
 */
function calculateTimeLeft(targetDate) {
  const now = Date.now();
  const distance = targetDate.getTime() - now;

  if (distance < 0) {
    return null;
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

/**
 * Updates the countdown display in the DOM.
 * Expects elements with IDs: "days", "hours", "minutes", "seconds".
 * @param {Object} time - Object with days, hours, minutes, seconds.
 */
function updateDisplay({ days, hours, minutes, seconds }) {
  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

/**
 * Performs a single countdown tick: calculates time left, updates display,
 * and resets the target date if expired.
 * @param {Date} targetDate - The current target date.
 */
function tick(targetDate) {
  let timeLeft = calculateTimeLeft(targetDate);

  if (!timeLeft) {
    targetDate = setTargetDate();
    timeLeft = calculateTimeLeft(targetDate);
  }

  updateDisplay(timeLeft);
}

/**
 * Initializes and starts the countdown timer.
 * Should be called once on page load.
 * The timer will update every second.
 */
export function countdownTimer() {
  let targetDate = getTargetDate() || setTargetDate();
  tick(targetDate); // Initial call to set display immediately
  setInterval(tick, COUNTDOWN_INTERVAL, targetDate);
}
