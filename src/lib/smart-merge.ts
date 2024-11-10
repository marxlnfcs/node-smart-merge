import { ISmartMergeOptions } from './interfaces/options.interface';
import { DeepPartial } from './interfaces/types.interface';
import { cloneDeep } from 'lodash';
import { hasSimilarKeys, isMergeable } from './utils/merging.utils';
import { isArray, isIterable, isNil, isObject, isPrimitive } from './utils/common.utils';

export function smartMerge<TargetObject = any, SourceObject = DeepPartial<TargetObject>>(target: TargetObject, source: SourceObject, options?: DeepPartial<ISmartMergeOptions>): TargetObject {
  return SmartMerge.create(options).merge(target, source);
}

export class SmartMerge {
  constructor(
    private options: DeepPartial<ISmartMergeOptions>,
  ){}

  /**
   * Global options
   */
  private static globalOptions: ISmartMergeOptions = {
    prioritizedKeys: [],
    matchSimilarKeys: true,
    cloneObject: true,
  };

  /**
   * Returns the global options
   */
  static getGlobalOptions(): ISmartMergeOptions {
    return this.globalOptions;
  }

  /**
   * Set global options
   */
  static setGlobalOptions(options?: DeepPartial<ISmartMergeOptions>): ISmartMergeOptions {
    this.globalOptions = {
      prioritizedKeys: options?.prioritizedKeys || [],
      matchSimilarKeys: options?.matchSimilarKeys ?? true,
      cloneObject: options?.cloneObject ?? true,
    }
    return this.globalOptions;
  }

  /**
   * Create a new instance of SmartMerge
   */
  static create(options?: DeepPartial<ISmartMergeOptions>): SmartMerge {
    return new SmartMerge(options || {});
  }

  /**
   * Returns the options of the current instance
   */
  getOptions(): ISmartMergeOptions {
    return {
      prioritizedKeys: this.options?.prioritizedKeys || SmartMerge.globalOptions.prioritizedKeys || [],
      matchSimilarKeys: this.options?.matchSimilarKeys ?? SmartMerge.globalOptions.matchSimilarKeys ?? true,
      cloneObject: this.options?.cloneObject ?? SmartMerge.globalOptions.cloneObject ?? true,
    };
  }

  /**
   * Sets current instance options
   */
  setOptions(options?: DeepPartial<ISmartMergeOptions>): ISmartMergeOptions {
    this.options = {
      prioritizedKeys: options?.prioritizedKeys,
      matchSimilarKeys: options?.matchSimilarKeys,
      cloneObject: options?.cloneObject,
    };
    return this.getOptions();
  }

  /**
   * Merge objects or arrays
   * @param target
   * @param source
   */
  merge<TargetObject = any, SourceObject = DeepPartial<TargetObject>>(target: TargetObject, source: SourceObject): TargetObject {

    // return target/source if neither target nor source are mergeable
    if(!isIterable(target) || !isIterable(source)){
      return (target ?? source) as any;
    }

    // return target if target and source are not the same type
    if((isObject(target) !== isObject(source)) || (isArray(target) !== isArray(source))){
      return target;
    }

    // merge lists
    if(isArray(target)){
      return this.mergeArray(target, source as any) as any;
    }

    // merge objects
    return this.mergeObject(target, source as any);

  }

  /**
   * Merge objects
   * @param target
   * @param source
   * @private
   */
  private mergeObject(target: any, source: any): any {

    // create empty object
    const output = this.getOptions().cloneObject ? cloneDeep(target) : target;

    // merge source into target
    Object.entries(source).map(([key, value]) => {

      // skip if not mergeable or value is nil
      if(!isMergeable(output[key], value) || isNil(value)) {
        return;
      }

      // merge arrays
      if(isArray(output[key])) {
        output[key] = this.merge(output[key], value);
        return;
      }

      // merge object
      if(isObject(output[key])) {
        output[key] = this.merge(output[key], value);
        return;
      }

      // merge primitive value into output
      output[key] = value;

    });

    // return output
    return output;

  }

  /**
   * Merge arrays
   * @private
   * @param items
   */
  private mergeArray(...items: Array<any[]>): any[] {

    // create output
    const output: any[] = [];

    // merge items
    items.map(_ => _.map(item => {

      // add to array if not an object nor array
      if(isPrimitive(item)) {
        if(!output.includes(item)){
          output.push(item);
        }
        return;
      }

      // find similar item in the output
      const similarItemIndex = output.findIndex(_ => hasSimilarKeys(_, item, this.getOptions().prioritizedKeys, this.getOptions().matchSimilarKeys));

      // merge item if similar item exists
      if(similarItemIndex >= 0){
        output[similarItemIndex] = this.merge(output[similarItemIndex], item);
      }else{
        output.push(item);
      }

    }));

    // return output
    return output;

  }

}