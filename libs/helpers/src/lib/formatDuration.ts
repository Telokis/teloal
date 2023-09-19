import { pad } from "./formatDate";

/**
 * Formatting options:
 *   %ms : Remainder of miliseconds
 *   %MS : Elapsed time in miliseconds
 *   %s  : Remainder of seconds
 *   %S  : Elapsed time in seconds (rounded down)
 *   %m  : Remainder of minutes
 *   %M  : Elapsed time in minutes (rounded down)
 *   %h  : Remainder of hours
 *   %H  : Elapsed time in hours (rounded down)
 *
 * @example
 *  formatDuration(1234, "%S.%ms") // "1.234"
 *  formatDuration(1234, "%s.%ms") // "01.234"
 *  formatDuration(71234, "%Mm %ss %msms") // "1m 11s 234ms"
 *
 * @param duration Elapsed time in miliseconds
 * @param format Format string. See description for details
 * @returns Formatted string
 */
export const formatDuration = (duration: number, format = "%S.%mss") => {
  const seconds = Math.floor(duration / 1000);
  const minutes = Math.floor(duration / (1000 * 60));
  const hours = Math.floor(duration / (1000 * 60 * 60));

  return format
    .replace(/%ms/g, `${pad(duration % 1000)}`)
    .replace(/%MS/g, `${duration}`)
    .replace(/%s/g, `${pad(seconds % 60)}`)
    .replace(/%S/g, `${seconds}`)
    .replace(/%m/g, `${pad(minutes % 60)}`)
    .replace(/%M/g, `${minutes}`)
    .replace(/%h/g, `${pad(hours % 24)}`)
    .replace(/%H/g, `${hours}`);
};
