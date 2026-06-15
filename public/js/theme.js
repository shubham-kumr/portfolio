const themes = ["dark", "dracula", "neon", "solarized-dark", "gruvbox", "retro", "solarized-light", "light"];

function changeTheme() {
  const element = document.documentElement;
  const currentTheme = element.getAttribute("data-theme") || "gruvbox";
  const currentIndex = themes.indexOf(currentTheme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `* {
           -webkit-transition: none !important;
           -moz-transition: none !important;
           -o-transition: none !important;
           -ms-transition: none !important;
           transition: none !important;
        }`
    )
  );
  document.head.appendChild(css);

  element.setAttribute("data-theme", nextTheme);
  
  // Keep standard dark class for Tailwind typography plugin or other unforeseen dependencies
  if (nextTheme === "dark" || nextTheme === "dracula" || nextTheme === "neon" || nextTheme === "solarized-dark" || nextTheme === "gruvbox") {
     element.classList.add("dark")
  } else {
     element.classList.remove("dark")
  }

  window.getComputedStyle(css).opacity;
  document.head.removeChild(css);
  localStorage.theme = nextTheme;
}

function preloadTheme() {
  const theme = (() => {
    const userTheme = localStorage.theme;
    if (themes.includes(userTheme)) {
      return userTheme;
    } else {
      return "gruvbox"; // Default theme
    }
  })();

  const element = document.documentElement;
  element.setAttribute("data-theme", theme);
  
  if (theme === "dark" || theme === "dracula" || theme === "neon" || theme === "solarized-dark" || theme === "gruvbox") {
     element.classList.add("dark")
  } else {
     element.classList.remove("dark")
  }

  localStorage.theme = theme;
}

function initializeThemeButtons() {
  const headerThemeButton = document.getElementById("header-theme-button");
  const drawerThemeButton = document.getElementById("drawer-theme-button");
  const mobileThemeBtn = document.getElementById("mobile-theme-btn");
  headerThemeButton?.addEventListener("click", changeTheme);
  drawerThemeButton?.addEventListener("click", changeTheme);
  mobileThemeBtn?.addEventListener("click", changeTheme);
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeThemeButtons);
} else {
  initializeThemeButtons();
}

document.addEventListener("astro:after-swap", preloadTheme);
document.addEventListener("astro:after-swap", initializeThemeButtons);

preloadTheme();
