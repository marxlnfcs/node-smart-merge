import * as jp from 'jsonpath';
import { isIterable, isNil } from './common.utils';

export class JsonPath {

  /**
   * Returns a list of all matches
   */
  static all(obj: any, path: string): any[] {
    if(isIterable(obj)) {
      path = !path.startsWith('$') ? `\$.${path}` : path;
      return jp.query(obj, path);
    }
    return [];
  }

  /**
   * Returns true if the object has the path
   */
  static has(obj: any, path: string): boolean {
    return this.all(obj, path).length > 0;
  }

  /**
   * Returns true if the object has all provided paths
   */
  static hasAll(obj: any, paths: string[], allowNil: boolean = false): boolean {
    if(!allowNil) {
      for(let path of paths) {
        if(!this.has(obj, path) || isNil(this.get(obj, path))){
          return false;
        }
      }
      return true;
    }
    return paths.filter(_ => this.has(_, obj)).length === paths.length;
  }

  /**
   * Returns true if the object has one of the provided paths
   */
  static hasOne(obj: any, paths: string[]): boolean {
    return paths.filter(_ => this.has(_, obj)).length > 0;
  }

  /**
   * Returns the value of a specific path
   */
  static get(obj: any, path: string, fallback?: any): any {
    const results = this.all(obj, path);
    return results.length ? results[0] : fallback ?? null;
  }

  /**
   * Returns the first element that matches on of the paths
   */
  static getFirst(obj: any, paths: string[], fallback?: any): any {
    for(let path of paths) {
      if (this.has(obj, path)) {
        return this.get(obj, path);
      }
    }
    return fallback ?? null;
  }

}