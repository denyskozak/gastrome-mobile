export const cutText = (size, text) => text.length > size ? `${text.slice(0, size)}...` : text;
