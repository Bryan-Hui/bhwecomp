//determine whether it is a function
export function isFunction(val: unknown): val is Function {
  return typeof val === "function";
}

// determine whether it is a object
export function isPlainObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

// determine whether it is a Promise
export function isPromise<T = unknown>(val: unknown): val is Promise<T> {
  return isPlainObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isDef(value: unknown): boolean {
  return value !== null && value !== undefined;
}

//determine whether the value is an object or a function
export function isObj(x: unknown): x is Record<string, unknown> {
  let type = typeof x;
  return x !== null && (type === "object" || type === "function");
}

//determine whether a string is a number
export function isNumber(val: string): boolean {
  return /^\d+(\.\d+)?$/.test(val);
}

//determine whether the value is a boolean type
export function isBoolean(val: unknown): val is boolean {
  return typeof val === "boolean";
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;

//determine whether the url is a picture address
export function isImageUrl(url: string): boolean {
  return IMAGE_REGEXP.test(url);
}

//determine whether the url is a video address
export function isVideoUrl(url: string): boolean {
  return VIDEO_REGEXP.test(url);
}

const url = "dsadsds.mp4";

console.log(isVideoUrl(url));
