/** @internal */
export function isNil(o: any): boolean {
  return o === undefined || o === null;
}

/** @internal */
export function isIterable(o: any): boolean {
  return isObject(o) || isArray(o);
}

/** @internal */
export function isPrimitive(o: any): boolean {
  return isString(o) || isNumber(o) || isBoolean(o) || isBigInt(o) || isSymbol(o);
}

/** @internal */
export function isObject(o: any): o is Object {
  return !isNil(o) && typeof o === 'object';
}

/** @internal */
export function isArray(o: any): o is Array<any> {
  return !isNil(o) && Array.isArray(o);
}

/** @internal */
export function isFunction(o: any): o is Function {
  return !isNil(o) && typeof o === 'function';
}

/** @internal */
export function isString(o: any): o is String {
  return !isNil(o) && typeof o === 'string';
}

/** @internal */
export function isNumber(o: any): o is Number {
  return !isNil(o) && typeof o === 'number';
}

/** @internal */
export function isBigInt(o: any): o is BigInt {
  return !isNil(o) && typeof o === 'bigint';
}

/** @internal */
export function isSymbol(o: any): o is Symbol {
  return !isNil(o) && typeof o === 'symbol';
}

/** @internal */
export function isBoolean(o: any): o is Boolean {
  return !isNil(o) && typeof o === 'number';
}