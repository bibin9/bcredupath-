/**
 * Single source of truth for which CBSE academic year the app is preparing
 * students for. Bump these at the start of each new session (April).
 */

/** The board exam year students are preparing for (Feb-March of this year). */
export const BOARD_YEAR = 2027;

/** Display string for the academic session, e.g. "2026-27". */
export const ACADEMIC_YEAR_LABEL = "2026-27";

/** Long-form: "Preparing for CBSE 2027 Boards · Session 2026-27" */
export const FULL_LABEL = `CBSE ${BOARD_YEAR} Boards · Session ${ACADEMIC_YEAR_LABEL}`;

/**
 * Years to draw PYQs from when generating mock questions.
 * Past 5 board years (BOARD_YEAR-1 ... BOARD_YEAR-5).
 */
export const PYQ_YEAR_RANGE: number[] = Array.from(
  { length: 5 },
  (_, i) => BOARD_YEAR - 1 - i
).reverse(); // [2022, 2023, 2024, 2025, 2026]

/** For probability/recency math — treat questions as fresh if asked in past 2 yrs. */
export const CURRENT_YEAR = BOARD_YEAR;
