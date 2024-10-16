export const getVoiceOneWord = recognized => {
  const commands = recognized.split(' ');
  return String(commands[commands.length - 1]).toLocaleLowerCase();
}