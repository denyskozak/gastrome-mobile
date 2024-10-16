const parseSecondsToMinutes = (value) => {
  const amount = Number(value);
  const hours = Math.floor(amount / 3600);
  const minutes = Math.floor(amount % 3600 / 60);
  const seconds = Math.floor(amount % 3600 % 60);

  return [hours, minutes, seconds];
};

const defaultTranslates = {
  hour: 'hour',
  hours: 'hours',
  minute: 'minute',
  minutes: 'minutes',
  second: 'second',
  seconds: 'seconds',
};

export const secondsToMinutesWithTranslations = (value, translates = defaultTranslates) => {
  const [hours, minutes, seconds] = parseSecondsToMinutes(value)

  const hDisplay = hours > 0 ? hours + (hours === 1 ? ` ${translates.hour}` : ` ${translates.hours}`) : '';
  const mDisplay = minutes > 0 ? minutes + (minutes === 1 ? ` ${translates.minute}` : ` ${translates.minutes}`) : '';
  const sDisplay = seconds > 0 ? seconds + (seconds === 1 ? ` ${translates.second}` : ` ${translates.seconds}`) : '';

  if (hDisplay) return hDisplay;
  if (mDisplay) return mDisplay;
  if (sDisplay) return sDisplay;
}

export const secondsToMinutesTimer = (value) => {
  const [hours, minutes, seconds] = parseSecondsToMinutes(value)

  const getColon = (need) => need ? ':' : '';
  const getValue = (value) => value > 9 ? value : `0${value}`

  const parse = (value, disableColon = false) => value > 0
    ? `${getValue(value)}${getColon(!disableColon)}`
    : `00${getColon(!disableColon)}`;

  return `${parse(hours)}${parse(minutes)}${parse(seconds, true)} `
}