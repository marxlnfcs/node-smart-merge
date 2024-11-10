import { isArray, isNil, isObject, isPrimitive } from './common.utils';
import { JsonPath } from './json-path.utils';

/** @internal */
export function isMergeable(target: any, source: any): boolean {
  return (
    (isNil(target) || isNil(source)) ||
    (target === source) ||
    (isArray(target) && isArray(source)) ||
    (isObject(target) && isObject(source)) ||
    (isPrimitive(target) && isObject(source))
  );
}

/** @internal */
export function hasAllKeys(keys: string[], a: any, b: any): boolean {
  return JsonPath.hasAll(a, keys, false) && JsonPath.hasAll(b, keys, false);
}

/** @internal */
export function compareKeys(keys: string[], a: any, b: any): boolean {
  if(hasAllKeys(keys, a, b)) {
    for(let key of keys) {
      const valueA = JsonPath.get(a, key);
      const valueB = JsonPath.get(b, key);
      if(valueA !== valueB) {
        return false;
      }
    }
    return true;
  }
  return false;
}

/** @internal */
export function hasSimilarKeys(a: any, b: any, prioritizedKeys: Array<string[]>, matchSimilarKeys: boolean): boolean {

  // check for prioritized keys
  for(let keys of prioritizedKeys) {
    if(hasAllKeys(keys, a, b)){
      return compareKeys(keys, a, b);
    }
  }

  // check for similar keys
  if(matchSimilarKeys){
    for(let key of Object.keys(a)) {
      if(isPrimitive(a[key]) && isPrimitive(b[key])){
        if(a[key] === b[key]) {
          return true;
        }
      }
    }
  }

  // no results found
  return false;

}