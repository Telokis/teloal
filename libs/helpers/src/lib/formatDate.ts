export const pad = (num: string | number, padLength = 2, padStr = "0") =>
  String(num).padStart(padLength, padStr);

// prettier-ignore
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatDate = (date = new Date(), format = "%Y-%M-%D") =>
  format
    .replace(/%Mon/g, `${months[date.getMonth()]}`)
    .replace(/%Y/g, `${date.getFullYear()}`)
    .replace(/%M/g, pad(date.getMonth() + 1))
    .replace(/%D/g, pad(date.getDate()))
    .replace(/%h/g, pad(date.getHours()))
    .replace(/%m/g, pad(date.getMinutes()))
    .replace(/%s/g, pad(date.getSeconds()))
    .replace(/%S/g, pad(date.getMilliseconds(), 3));
