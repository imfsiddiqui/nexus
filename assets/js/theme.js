/**
 * Theme Controller Module
 *
 * Handles light/dark theme toggling, persistence, and system preference sync.
 *
 * Usage:
 *   Import and call themeController() once on page load.
 */

// DOM Elements
const themeToggle = document.getElementById("themeToggle"); // Button to toggle theme
const themeIcon = document.getElementById("themeIcon"); // Icon element for theme indicator
const body = document.body; // Document body

// Theme and Icon Constants
const THEMES = { LIGHT: "light", DARK: "dark" };
const ICONS = { LIGHT: "🌙", DARK: "☀️" };

/**
 * Get the user's preferred theme.
 * Checks localStorage first, then system preference.
 * @returns {string} - "light" or "dark"
 */
function getPreferredTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? THEMES.LIGHT
    : THEMES.DARK;
}

/**
 * Apply the specified theme to the document.
 * Sets data-theme attribute and updates the icon.
 * @param {string} theme - "light" or "dark"
 */
function applyTheme(theme) {
  if (theme === THEMES.DARK) {
    body.setAttribute("data-theme", THEMES.DARK);
    themeIcon.innerHTML = ICONS.DARK;
  } else {
    body.removeAttribute("data-theme");
    themeIcon.innerHTML = ICONS.LIGHT;
  }
}

/**
 * Toggle between light and dark themes.
 * Updates the theme and persists the choice in localStorage.
 */
function toggleTheme() {
  const isDark = body.hasAttribute("data-theme");
  const newTheme = isDark ? THEMES.LIGHT : THEMES.DARK;
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

/**
 * Handle system theme changes.
 * If the user hasn't set a preference, sync with system.
 * @param {MediaQueryListEvent} e
 */
function handleSystemThemeChange(e) {
  if (!localStorage.getItem("theme")) {
    applyTheme(e.matches ? THEMES.LIGHT : THEMES.DARK);
  }
}

/**
 * Initialize the theme controller.
 * Sets up the initial theme and event listeners.
 */
export function themeController() {
  // Initial theme setup
  applyTheme(getPreferredTheme());

  // Event listeners
  themeToggle.addEventListener("click", toggleTheme);
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", handleSystemThemeChange);
}
