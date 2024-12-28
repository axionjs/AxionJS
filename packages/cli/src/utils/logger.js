import { highlighter } from "./highlighter.js"

export const logger = {
  error(...args) {
    console.log(highlighter.error(args.join(" ")))
  },
  warn(...args) {
    console.log(highlighter.warn(args.join(" ")))
  },
  info(...args) {
    console.log(highlighter.info(args.join(" ")))
  },
  success(...args) {
    console.log(highlighter.success(args.join(" ")))
  },
  log(...args) {
    console.log(args.join(" "))
  },
  break() {
    console.log("")
  },
}
