
const dropSlashes = new RegExp("/", "g");

export default (prefix: string, value: string): string => `${prefix}-${value.replace(dropSlashes,"")}`

