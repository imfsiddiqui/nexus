/**
 * Entry point for initializing core features of the application.
 *
 * - Initializes the countdown timer functionality.
 * - Sets up the theme controller for light/dark mode switching.
 *
 * Dependencies:
 * - countdown.js: Exports countdownTimer() to handle countdown logic.
 * - theme.js: Exports themeController() to manage theme switching.
 */

import { countdownTimer } from "./countdown.js";
import { themeController } from "./theme.js";

// Initialize the countdown timer feature
countdownTimer();

// Initialize the theme controller feature
themeController();
