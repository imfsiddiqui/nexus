// Countdown Timer Module

const TARGET_DATE_KEY = "targetDate";
const DEFAULT_DAYS_FROM_NOW = 30;
const COUNTDOWN_INTERVAL = 1000;

function getTargetDate() {
  const storedDate = localStorage.getItem(TARGET_DATE_KEY);
  return storedDate ? new Date(storedDate) : null;
}

function setTargetDate(daysFromNow = DEFAULT_DAYS_FROM_NOW) {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysFromNow);
  localStorage.setItem(TARGET_DATE_KEY, targetDate.toISOString());
  return targetDate;
}

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

function tick(targetDate) {
  let timeLeft = calculateTimeLeft(targetDate);

  if (!timeLeft) {
    targetDate = setTargetDate();
    timeLeft = calculateTimeLeft(targetDate);
  }

  updateDisplay(timeLeft);
}

export function countdownTimer() {
  let targetDate = getTargetDate() || setTargetDate();
  tick(targetDate); // Initial call to set display immediately
  setInterval(tick, COUNTDOWN_INTERVAL, targetDate);
}
