export interface ISmartMergeOptions {

  /**
   * The prioritized keys checking for keys in arrays that are the same. If one of the prioritized keys matches, the array will
   * be merged based of the keys as identifiers. Otherwise, is searches for "similar" keys and merges them if enabled.
   * @default []
   */
  prioritizedKeys: Array<string[]>;

  /**
   * If true and no key of the prioritizedKeys matches, it searches for a similar key used in the array. If false, it will just append the item to the array.
   * @default true
   */
  matchSimilarKeys: boolean;

  /**
   * Set to true, if the output object should be cloned or not.
   * @default true
   */
  cloneObject: boolean;

}