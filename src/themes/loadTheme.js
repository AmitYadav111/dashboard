// Load theme CSS based on URL parameter or environment variable
// Usage: ?theme=clientA or REACT_APP_THEME=clientA

import { VALID_THEMES, DEFAULT_THEME, THEME_CLASS_PREFIX } from "./constants";

// Import all theme CSS files
import "./styles/default.css";
import "./styles/clientA.css";
import "./styles/clientB.css";

/**
 * Validates if a theme name is valid
 * @param {string} themeName - Theme name to validate
 * @returns {boolean} - True if theme is valid
 */
const isValidTheme = (themeName) => {
  return VALID_THEMES.includes(themeName);
};

/**
 * Gets theme from URL parameter or environment variable
 * @returns {string} - Valid theme name
 */
const getThemeName = () => {
  // Priority: URL parameter > Environment variable > Default
  const params = new URLSearchParams(window.location.search);
  const urlTheme = params.get("theme");
  const envTheme = process.env.REACT_APP_THEME;

  const themeName = urlTheme || envTheme || DEFAULT_THEME;

  // Validate theme
  if (!isValidTheme(themeName)) {
    console.warn(
      `Invalid theme "${themeName}". Using default theme. Valid themes: ${VALID_THEMES.join(
        ", "
      )}`
    );
    return DEFAULT_THEME;
  }

  return themeName;
};

/**
 * Removes all theme classes from document element
 */
const removeThemeClasses = () => {
  const classList = document.documentElement.classList;
  VALID_THEMES.forEach((theme) => {
    classList.remove(`${THEME_CLASS_PREFIX}${theme}`);
  });
};

/**
 * Loads theme based on URL parameter or environment variable
 * @returns {string} - The loaded theme name
 */
export const loadTheme = () => {
  const themeName = getThemeName();

  // Remove existing theme classes
  removeThemeClasses();

  // Add theme class to root element
  document.documentElement.classList.add(`${THEME_CLASS_PREFIX}${themeName}`);

  return themeName;
};
