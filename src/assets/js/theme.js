export function themeManager() {
  // Theme management
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const body = document.body;

  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  let currentTheme;
  if (savedTheme) {
    currentTheme = savedTheme;
  } else {
    currentTheme = systemPrefersLight ? "light" : "dark";
  }

  // Apply initial theme
  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    themeIcon.innerHTML = "☀️";
  } else {
    body.removeAttribute("data-theme");
    themeIcon.innerHTML = "🌙";
  }

  // Theme toggle functionality
  themeToggle.addEventListener("click", () => {
    const isDark = body.hasAttribute("data-theme");

    if (isDark) {
      body.removeAttribute("data-theme");
      themeIcon.innerHTML = "🌙";
      localStorage.setItem("theme", "light");
    } else {
      body.setAttribute("data-theme", "dark");
      themeIcon.innerHTML = "☀️";
      localStorage.setItem("theme", "dark");
    }
  });

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        if (e.matches) {
          body.removeAttribute("data-theme");
          themeIcon.innerHTML = "🌙";
        } else {
          body.setAttribute("data-theme", "light");
          themeIcon.innerHTML = "☀️";
        }
      }
    });
}
