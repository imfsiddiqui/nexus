// Theme Controller Module

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

const THEMES = { LIGHT: "light", DARK: "dark" };
const ICONS = { LIGHT: "🌙", DARK: "☀️" };

function getPreferredTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? THEMES.LIGHT
    : THEMES.DARK;
}

function applyTheme(theme) {
  if (theme === THEMES.DARK) {
    body.setAttribute("data-theme", THEMES.DARK);
    themeIcon.innerHTML = ICONS.DARK;
  } else {
    body.removeAttribute("data-theme");
    themeIcon.innerHTML = ICONS.LIGHT;
  }
}

function toggleTheme() {
  const isDark = body.hasAttribute("data-theme");
  const newTheme = isDark ? THEMES.LIGHT : THEMES.DARK;
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
}

function handleSystemThemeChange(e) {
  if (!localStorage.getItem("theme")) {
    applyTheme(e.matches ? THEMES.LIGHT : THEMES.DARK);
  }
}

export function themeController() {
  // Initial theme setup
  applyTheme(getPreferredTheme());

  // Event listeners
  themeToggle.addEventListener("click", toggleTheme);
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", handleSystemThemeChange);
}
