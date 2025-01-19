import ora from "ora";

export function spinner(text, options = {}) {
  return ora({
    text,
    isSilent: options.silent,
  });
}