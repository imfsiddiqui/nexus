// Countdown timer
export function countdown() {
  function setTargetDate() {
    // Set target date (30 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    localStorage.setItem("targetDate", targetDate.toISOString());
  }

  if (!localStorage.getItem("targetDate")) {
    // If no target date is set, initialize it
    setTargetDate();
  }

  const targetDate = new Date(localStorage.getItem("targetDate"));

  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update countdown display
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

  if (distance < 0) {
    // If countdown is over, reset target date
    setTargetDate();
  }

  // Update countdown every second
  setInterval(countdown, 1000);
}
