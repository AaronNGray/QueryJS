interface Object {
    from(objectLike: any): any;
}
interface String {
    kebabToCamelCase(): string;
}
interface Array<T> {
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][][][][], depth: 7): U[];
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][][][], depth: 6): U[];
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][][], depth: 5): U[];
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][][], depth: 4): U[];
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][][], depth: 3): U[];
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][][], depth: 2): U[];
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[][], depth?: 1): U[];
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(this: U[], depth: 0): U[];
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth. If no depth is provided, flat method defaults to the depth of 1.
     *
     * @param depth The maximum recursion depth
     */
    flat<U>(depth?: number): any[];
}
//# sourceMappingURL=utils.d.ts.map