import mock from "@/data/mock.json";

/**
 * Every screen reads through this file, never from mock.json directly.
 * When the real API arrives, only this file changes.
 *
 * Scenarios exist so the four required edge cases are real application
 * states rather than hardcoded variants of a screen:
 *   default  day 12, on an 11 night streak
 *   fresh    day 1, no streak, empty shelf, no rank
 *   missed   day 11 went dark, streak paused, repair available
 *   shipped  day 12 already submitted, day closed
 */

export const SCENARIOS = ["default", "fresh", "missed", "shipped"];

export function getScenario(key) {
  return mock.scenarios[key] ? key : "default";
}

export function getStudent(key = "default") {
  return mock.scenarios[getScenario(key)].student;
}

export function getScenarioLabel(key = "default") {
  return mock.scenarios[getScenario(key)].label;
}

export function getCohort() {
  return mock.cohort;
}

export function getTracks() {
  return mock.tracks;
}

export function getTrack(id) {
  return mock.tracks.find((t) => t.id === id) ?? mock.tracks[0];
}

export function getGraduates() {
  return mock.graduates;
}

export function getHonesty() {
  return mock.honesty;
}

export function getHowItWorks() {
  return mock.howItWorks;
}

export function getDay(day) {
  const n = Number(day);
  return mock.days.find((d) => d.day === n) ?? null;
}

export function getTotalDays() {
  return mock.days.length;
}

/** Recent builds, newest first, capped. Empty on day one. */
export function getShelf(student, limit = 3) {
  if (!student.shipped) return [];
  return mock.shelf.filter((i) => i.day <= student.shipped).slice(0, limit);
}

/**
 * Turns a student into 60 marks for the tally strip.
 * lit      shipped
 * dark     missed and not repaired
 * repaired recovered with a shield
 * now      tonight, still open
 * ahead    not reached yet
 */
export function getMarks(student, total = getTotalDays()) {
  const marks = [];
  for (let n = 1; n <= total; n += 1) {
    if (student.missedDays.includes(n)) marks.push("dark");
    else if (student.repairedDays.includes(n)) marks.push("repaired");
    else if (n === student.currentDay) marks.push(student.todayShipped ? "lit" : "now");
    else if (n < student.currentDay) marks.push("lit");
    else marks.push("ahead");
  }
  return marks;
}

/** The previous cohort's strip, used as live proof on the landing page. */
export function getCohortMarks() {
  const prev = mock.cohort.previous;
  return getMarks(
    {
      currentDay: prev.currentDay,
      missedDays: prev.missedDays,
      repairedDays: prev.repairedDays,
      todayShipped: true,
    },
    getTotalDays()
  );
}
